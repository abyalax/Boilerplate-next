'use client';

import { useChat } from '@ai-sdk/react';
import { DefaultChatTransport, ToolUIPart } from 'ai';
import { Bot, User } from 'lucide-react';
import { FC, useEffect, useRef, useState } from 'react';
import { Message, MessageContent, MessageResponse } from '~/components/ai-elements/message';
import { Tool, ToolContent, ToolHeader, ToolInput, ToolOutput } from '~/components/ai-elements/tool';
import { ScrollArea } from '~/components/ui/scroll-area';
import { cn } from '~/lib/utils';
import { AttachmentPreviews } from './attachment-preview';
import { Prompt } from './prompt';
import { PromptInput, PromptInputBody } from './prompt-input';

export const ChatInterface: FC = () => {
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, []);

  const { messages, setMessages, sendMessage, status } = useChat({
    transport: new DefaultChatTransport({
      api: '/api/chat',
    }),
  });

  useEffect(() => {
    const fetchMessages = async () => {
      const res = await fetch('/api/chat');
      const data = await res.json();
      setMessages([...data]);
    };
    fetchMessages();
  }, [setMessages]);

  const handleSend = () => {
    if (!input.trim()) return;
    setIsTyping(true);
    sendMessage({ text: input });
    setInput('');
  };

  return (
    <PromptInput onSubmit={handleSend}>
      <PromptInputBody>
        <div className="h-full flex flex-col">
          <ScrollArea className="sm:px-[5%] lg:px-[10%] xl:px-[20%] min-h-[60vh]">
            <div className="space-y-4 pb-4">
              {messages.map((message) => (
                <div key={message.id} className="w-full">
                  {message.parts.map((part, index) => {
                    if (part.type === 'text') {
                      return (
                        <div
                          key={index}
                          className={cn(
                            'flex gap-3 animate-slide-up mb-4',
                            message.role === 'user' ? 'flex-row-reverse' : 'flex-row',
                          )}
                        >
                          {/* AVATAR */}
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

                          {/* BUBBLE TEXT */}
                          <div className="max-w-[80%] text-sm">
                            <Message key={`${message.id}-${index}`} from={message.role}>
                              <MessageContent>
                                <MessageResponse>{part.text}</MessageResponse>
                              </MessageContent>
                            </Message>
                          </div>
                        </div>
                      );
                    }

                    if (part.type?.startsWith('tool-')) {
                      return (
                        <div key={`${message.id}-${index}`} className="flex flex-col gap-2 my-2">
                          <Tool>
                            <ToolHeader
                              type={(part as ToolUIPart).type}
                              state={(part as ToolUIPart).state || 'output-available'}
                              className="cursor-pointer"
                            />
                            <ToolContent>
                              <ToolInput input={(part as ToolUIPart).input || {}} />
                              <ToolOutput output={(part as ToolUIPart).output} errorText={(part as ToolUIPart).errorText} />
                            </ToolContent>
                          </Tool>
                        </div>
                      );
                    }

                    return null;
                  })}
                </div>
              ))}

              {isTyping && (
                <div className="flex gap-3 animate-fade-in">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <Bot className="w-4 h-4 text-primary" />
                  </div>
                  <div className="bg-muted p-3 rounded-lg rounded-tl-none">
                    <div className="flex gap-1">
                      <span className="w-2 h-2 rounded-full bg-muted-foreground/50 animate-pulse" />
                      <span
                        className="w-2 h-2 rounded-full bg-muted-foreground/50 animate-pulse"
                        style={{ animationDelay: '0.2s' }}
                      />
                      <span
                        className="w-2 h-2 rounded-full bg-muted-foreground/50 animate-pulse"
                        style={{ animationDelay: '0.4s' }}
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>

          <div className="sticky bottom-0 sm:px-[5%] lg:px-[10%] xl:px-[20%]">
            <AttachmentPreviews />
            <Prompt status={status} message={input} setMessage={setInput} handleSubmit={handleSend} />
          </div>
        </div>
      </PromptInputBody>
    </PromptInput>
  );
};
