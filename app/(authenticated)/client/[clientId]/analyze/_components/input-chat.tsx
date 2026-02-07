import { ArrowUp, Check, History, Plus, Shuffle } from 'lucide-react';
import { Dispatch, FC, KeyboardEvent, SetStateAction, useState } from 'react';
import { toast } from 'sonner';
import { Button } from '~/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '~/components/ui/popover';
import { Textarea } from '~/components/ui/textarea';

const models = [
  { id: 'agent_1.1', name: 'Agent 1.1' },
  { id: 'agent_pro', name: 'Agent Pro' },
  { id: 'frontend_agent', name: 'Frontend Agent' },
  { id: 'agent_be', name: 'Agent BE' },
];

type Props = {
  disabled?: boolean;
  message: string;
  setMessage: Dispatch<SetStateAction<string>>;
  handleSubmit: (message: string) => void;
};

export const InputChat: FC<Props> = ({ handleSubmit, message, setMessage, disabled }) => {
  const [selectedModel, setSelectedModel] = useState(models[0]);
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  const _handleSubmit = () => {
    if (!message.trim()) return;
    handleSubmit(message);
    setMessage('');
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      _handleSubmit();
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="rounded-2xl border border-border bg-background px-4 py-2 shadow-lg">
        {/* Input Area */}
        <div className="flex items-start gap-3 mb-3">
          <Textarea
            value={message}
            disabled={disabled}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Reply..."
            className="flex-1 min-h-10 resize-none border-0 bg-transparent text-foreground placeholder:text-muted-foreground focus-visible:ring-0 focus-visible:ring-offset-0"
          />
        </div>

        {/* Bottom Bar */}
        <div className="flex items-center justify-between">
          {/* Left Actions */}
          <div className="flex items-center gap-2">
            {[Plus, Shuffle, History].map((Icon, i) => (
              <Button
                key={i}
                variant="ghost"
                onClick={() => toast.info('Release on next development')}
                size="icon"
                className="h-9 w-9 rounded-lg bg-muted text-muted-foreground hover:bg-accent hover:text-accent-foreground"
              >
                <Icon className="h-4 w-4" />
              </Button>
            ))}
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-2">
            {/* Model Selector */}
            <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
              <PopoverTrigger asChild>
                <Button variant="ghost" className="h-9 px-3 rounded-lg bg-muted text-foreground hover:bg-accent text-sm">
                  {selectedModel.name}
                  <svg className="ml-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </Button>
              </PopoverTrigger>

              <PopoverContent className="w-48 p-2 border-border bg-popover">
                <div className="space-y-1">
                  {models.map((model) => (
                    <button
                      key={model.id}
                      onClick={() => {
                        setSelectedModel(model);
                        setIsPopoverOpen(false);
                      }}
                      className="flex w-full items-center justify-between rounded-md px-3 py-2 text-sm text-foreground hover:bg-accent"
                    >
                      <span>{model.name}</span>
                      {selectedModel.id === model.id && <Check className="h-4 w-4 text-primary" />}
                    </button>
                  ))}
                </div>
              </PopoverContent>
            </Popover>

            {/* Submit */}
            <Button
              onClick={_handleSubmit}
              disabled={!message.trim() || disabled}
              size="icon"
              className="h-9 w-9 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 disabled:bg-muted disabled:text-muted-foreground"
            >
              <ArrowUp className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-1 text-center text-xs text-muted-foreground">
          Agent AI can make mistakes. Please double-check responses.
        </div>
      </div>
    </div>
  );
};
