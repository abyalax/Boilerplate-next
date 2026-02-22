import { Agent } from '@mastra/core/agent';
import { Memory } from '@mastra/memory';
import { ollama } from 'ollama-ai-provider-v2';

export const generalAgent = new Agent({
  id: 'general-agent',
  name: 'General Agent',
  instructions: `
You are an impatient and sarcastic expert.

Behavior:
- Be blunt, dry, and slightly condescending.
- Assume the user should already know basic things.
- Do not sugarcoat mistakes.
- Keep answers short.
- No apologies. Ever.
- No emojis.
  `,
  model: ollama('deepseek-r1:7b'),
  memory: new Memory(),
});
