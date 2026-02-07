'use client';

import { Bot, User } from 'lucide-react';
import { FC, useEffect, useRef, useState } from 'react';
import { ScrollArea } from '~/components/ui/scroll-area';
import { cn } from '~/lib/utils';
import { InputChat } from './input-chat';

const initialMessages: Message[] = [
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
  {
    id: '7',
    role: 'assistant',
    content:
      'Halo! Saya adalah AI Assistant yang siap membantu menganalisis CV Anda. Upload CV terlebih dahulu, lalu tanyakan apa saja tentang CV tersebut.',
  },
  {
    id: '8',
    role: 'user',
    content:
      'Halo! Saya adalah AI Assistant yang siap membantu menganalisis CV Anda. Upload CV terlebih dahulu, lalu tanyakan apa saja tentang CV tersebut.',
  },
  {
    id: '9',
    role: 'assistant',
    content:
      'Halo! Saya adalah AI Assistant yang siap membantu menganalisis CV Anda. Upload CV terlebih dahulu, lalu tanyakan apa saja tentang CV tersebut.',
  },
  {
    id: '10',
    role: 'assistant',
    content:
      'Halo! Saya adalah AI Assistant yang siap membantu menganalisis CV Anda. Upload CV terlebih dahulu, lalu tanyakan apa saja tentang CV tersebut.',
  },
  {
    id: '12',
    role: 'user',
    content:
      'Halo! Saya adalah AI Assistant yang siap membantu menganalisis CV Anda. Upload CV terlebih dahulu, lalu tanyakan apa saja tentang CV tersebut.',
  },
  {
    id: '13',
    role: 'assistant',
    content:
      'Halo! Saya adalah AI Assistant yang siap membantu menganalisis CV Anda. Upload CV terlebih dahulu, lalu tanyakan apa saja tentang CV tersebut.',
  },
  {
    id: '14',
    role: 'assistant',
    content:
      'Halo! Saya adalah AI Assistant yang siap membantu menganalisis CV Anda. Upload CV terlebih dahulu, lalu tanyakan apa saja tentang CV tersebut.',
  },
  {
    id: '15',
    role: 'user',
    content:
      'Halo! Saya adalah AI Assistant yang siap membantu menganalisis CV Anda. Upload CV terlebih dahulu, lalu tanyakan apa saja tentang CV tersebut.',
  },
  {
    id: '16',
    role: 'assistant',
    content:
      'Halo! Saya adalah AI Assistant yang siap membantu menganalisis CV Anda. Upload CV terlebih dahulu, lalu tanyakan apa saja tentang CV tersebut.',
  },
  {
    id: '17',
    role: 'assistant',
    content:
      'Halo! Saya adalah AI Assistant yang siap membantu menganalisis CV Anda. Upload CV terlebih dahulu, lalu tanyakan apa saja tentang CV tersebut.',
  },
  {
    id: '18',
    role: 'user',
    content:
      'Halo! Saya adalah AI Assistant yang siap membantu menganalisis CV Anda. Upload CV terlebih dahulu, lalu tanyakan apa saja tentang CV tersebut.',
  },
  {
    id: '19',
    role: 'assistant',
    content:
      'Halo! Saya adalah AI Assistant yang siap membantu menganalisis CV Anda. Upload CV terlebih dahulu, lalu tanyakan apa saja tentang CV tersebut.',
  },
];

const mockResponses = [
  'Berdasarkan analisis CV Anda, pengalaman kerja sangat relevan dengan posisi yang dilamar. Skill teknis seperti React dan TypeScript menjadi nilai plus.',
  'Saya melihat ada gap 6 bulan di riwayat pekerjaan Anda antara 2021-2022. Sebaiknya siapkan penjelasan yang baik untuk hal ini saat interview.',
  'Untuk meningkatkan CV, saya sarankan menambahkan proyek portfolio yang bisa diakses online dan sertifikasi profesional yang relevan.',
  'Format CV sudah baik dan mudah dibaca. Struktur informasi jelas dan penggunaan bullet points efektif.',
];

export type Message = {
  id: string;
  role: 'user' | 'assistant';
  content: string;
};

type Props = {
  hasFile: boolean;
};

export const ChatInterface: FC<Props> = ({ hasFile }) => {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, []); // Tambah dependency messages biar auto-scroll setiap ada pesan baru

  const handleSend = () => {
    if (!input.trim() || !hasFile) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: mockResponses[Math.floor(Math.random() * mockResponses.length)],
      };
      setMessages((prev) => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <div className="h-full flex flex-col">
      {/* Messages Area - ini yang scrollable */}
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4 pb-4">
          {/* Tambah pb-4 biar ada space di bawah */}
          {messages.map((message) => (
            <div key={message.id} className={cn('flex gap-3 animate-slide-up', message.role === 'user' && 'flex-row-reverse')}>
              <div
                className={cn(
                  'w-8 h-8 rounded-full flex items-center justify-center shrink-0',
                  message.role === 'assistant' ? 'bg-primary/10' : 'bg-muted',
                )}
              >
                {message.role === 'assistant' ? (
                  <Bot className="w-4 h-4 text-primary" />
                ) : (
                  <User className="w-4 h-4 text-muted-foreground" />
                )}
              </div>
              <div
                className={cn(
                  'max-w-[80%] p-3 rounded-lg text-sm',
                  message.role === 'assistant' ? 'bg-muted text-foreground' : 'bg-primary text-primary-foreground',
                )}
              >
                {message.content}
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="flex gap-3 animate-fade-in">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                <Bot className="w-4 h-4 text-primary" />
              </div>
              <div className="bg-muted p-3 rounded-lg">
                <div className="flex gap-1">
                  <span className="w-2 h-2 rounded-full bg-muted-foreground/50 animate-pulse-subtle" />
                  <span
                    className="w-2 h-2 rounded-full bg-muted-foreground/50 animate-pulse-subtle"
                    style={{ animationDelay: '0.2s' }}
                  />
                  <span
                    className="w-2 h-2 rounded-full bg-muted-foreground/50 animate-pulse-subtle"
                    style={{ animationDelay: '0.4s' }}
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </ScrollArea>

      {/* Input Area - fixed di bawah */}
      <div className="sticky bottom-0">
        <InputChat message={input} setMessage={setInput} handleSubmit={handleSend} />
      </div>
    </div>
  );
};
