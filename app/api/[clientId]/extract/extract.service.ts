import Ollama from 'ollama';
import { ServiceUnavailableException, UnprocessableEntity } from '~/lib/handler/error';
import { ReturnExtracted } from '~/lib/pdf/client';
import { CV } from '~/modules/cv/cv.type';

const buildCVParsingPrompt = (rawText: string, clientId: number): string => {
  return `
        Kamu adalah parser CV. Tugas kamu: ekstrak informasi dari teks berikut menjadi JSON VALID.
        Format wajib mengikuti struktur ini:

        {
          "name": "",
          "email": "",
          "user_id": ${clientId},
          "address": "",
          "linkedin": "",
          "about": "",
          "interest": [""],
          "skill": [""],
          "education": [
              {
                "name": "",
                "major": ""
              }
          ],
          "experience": [
              {
                "role": "",
                "company": "",
                "description": "",
                "start": "",
                "end": ""
              }
          ],
          "projects": [
              {
                "title": "",
                "description": ""
              }
          ],
          "certificate": [
              {
                "title": "",
                "issuer": "",
                "year": "",
                "url": ""
              }
          ]
        }

        Catatan:
        - Pastikan JSON valid (tidak boleh ada komentar, trailing comma, atau text lain).
        - Jika tidak ada data, isi kosong: "", [].
        - Data harus seakurat mungkin berdasarkan raw text.

        RAW TEXT:
        """
        ${rawText}
        """
        Output: Hanya JSON murni.
    `.trim();
};

const parseRawTextWithLLM = async (rawText: string, clientId: number): Promise<CV> => {
  const prompt = buildCVParsingPrompt(rawText, clientId);

  const response = await Ollama.chat({
    model: 'qwen2.5:7b-instruct-q3_K_M',
    messages: [{ role: 'user', content: prompt }],
    stream: false,
    think: false,
  });

  const content = response.message?.content;

  if (!content) throw new ServiceUnavailableException('Empty response from LLM');

  // Clean potential markdown code blocks
  const cleanedContent = content
    .replaceAll(/```json\s*/g, '')
    .replaceAll(/```\s*/g, '')
    .trim();

  try {
    const parsed = JSON.parse(cleanedContent);
    return parsed as CV;
  } catch (err) {
    throw new UnprocessableEntity(`Invalid JSON from LLM. Content: ${cleanedContent.substring(0, 200)}...`, err as Error);
  }
};

/**
 * Parse multiple raw CV texts in parallel
 */
export const parseMultipleCVs = async (rawCVs: ReturnExtracted[], clientId: number): Promise<CV[]> => {
  const parsePromises = rawCVs.map((cv) =>
    parseRawTextWithLLM(cv.text, clientId)
      .then((parsed) => ({ success: true, data: parsed, file: cv.file }))
      .catch((error) => ({ success: false, error, file: cv.file })),
  );

  const results = await Promise.all(parsePromises);

  // Collect failures
  const failures = results.filter((r) => !r.success);
  if (failures.length > 0) {
    console.error('Failed to parse some CVs:', failures);
    throw new UnprocessableEntity(`Failed to parse ${failures.map((f) => f.file).join(', ')}`);
  }

  // Return only successful parses
  return results.filter((r): r is { success: true; data: CV; file: string } => r.success).map((r) => r.data);
};
