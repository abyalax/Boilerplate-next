import { Message } from './chat-interface';

export const initialMessages: Message[] = [
  {
    id: '1',
    role: 'assistant',
    content:
      'Halo! Saya adalah AI Assistant yang siap membantu menganalisis CV Anda. Upload CV terlebih dahulu, lalu tanyakan apa saja tentang CV tersebut.',
  },
  {
    id: '2',
    role: 'user',
    content:
      'Halo! Saya adalah AI Assistant yang siap membantu menganalisis CV Anda. Upload CV terlebih dahulu, lalu tanyakan apa saja tentang CV tersebut.',
  },
  {
    id: '3',
    role: 'assistant',
    content:
      'Halo! Saya adalah AI Assistant yang siap membantu menganalisis CV Anda. Upload CV terlebih dahulu, lalu tanyakan apa saja tentang CV tersebut.',
  },
  {
    id: '4',
    role: 'assistant',
    content:
      'Halo! Saya adalah AI Assistant yang siap membantu menganalisis CV Anda. Upload CV terlebih dahulu, lalu tanyakan apa saja tentang CV tersebut.',
  },
  {
    id: '5',
    role: 'user',
    content:
      'Halo! Saya adalah AI Assistant yang siap membantu menganalisis CV Anda. Upload CV terlebih dahulu, lalu tanyakan apa saja tentang CV tersebut.',
  },
  {
    id: '6',
    role: 'assistant',
    content:
      'Halo! Saya adalah AI Assistant yang siap membantu menganalisis CV Anda. Upload CV terlebih dahulu, lalu tanyakan apa saja tentang CV tersebut.',
  },
];

export const mockResponses = [
  'Berdasarkan analisis CV Anda, pengalaman kerja sangat relevan dengan posisi yang dilamar. Skill teknis seperti React dan TypeScript menjadi nilai plus.',
  'Saya melihat ada gap 6 bulan di riwayat pekerjaan Anda antara 2021-2022. Sebaiknya siapkan penjelasan yang baik untuk hal ini saat interview.',
  'Untuk meningkatkan CV, saya sarankan menambahkan proyek portfolio yang bisa diakses online dan sertifikasi profesional yang relevan.',
  'Format CV sudah baik dan mudah dibaca. Struktur informasi jelas dan penggunaan bullet points efektif.',
];
