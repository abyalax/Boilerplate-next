'use client';

import { Bot, User } from 'lucide-react';
import { FC, useEffect, useRef, useState } from 'react';
import { ScrollArea } from '~/components/ui/scroll-area';
import { cn } from '~/lib/utils';
import { initialMessages, mockResponses } from './data';
import { InputChat } from './input-chat';

export type Message = {
  id: string;
  role: 'user' | 'assistant';
  content: string;
};

export const ChatInterface: FC = () => {
  const [files, setFiles] = useState<File[] | undefined>(undefined);
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, []);

  const handleSend = () => {
    if (!input.trim()) return;
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
      <ScrollArea className="sm:px-[5%] lg:px-[10%] xl:px-[20%] min-h-[60vh]">
        <div className="space-y-4 pb-4">
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

      <div className="sticky bottom-0 sm:px-[5%] lg:px-[10%] xl:px-[20%]">
        <InputChat message={input} setMessage={setInput} handleSubmit={handleSend} />
      </div>
    </div>
  );
};
