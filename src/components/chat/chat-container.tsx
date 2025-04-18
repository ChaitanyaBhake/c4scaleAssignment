import { useRef } from 'react';
import { Message } from '@/types/chat';
import { MessageList } from './message-list';
import { ChatInput } from './chat-input';
import { Button } from '@/components/ui/button';
import { Menu } from 'lucide-react';

interface ChatContainerProps {
  messages: Message[];
  isTyping: boolean;
  onSendMessage: (message: string) => void;
  onMenuToggle: () => void;
  isMobile: boolean;
}

export function ChatContainer({
  messages,
  isTyping,
  onSendMessage,
  onMenuToggle,
  isMobile,
}: ChatContainerProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div
      className="flex flex-col h-full overflow-hidden bg-white dark:bg-gray-900"
      ref={containerRef}
    >
      {isMobile && (
        <div className="border-b dark:border-gray-700 p-3 flex items-center gap-3">
          <Button
            size="icon"
            variant="ghost"
            onClick={onMenuToggle}
          >
            <Menu className="h-5 w-5" />
            <span className="sr-only">Open menu</span>
          </Button>
          <h1 className="text-lg font-semibold dark:text-white">
            Chat GPT
          </h1>
        </div>
      )}

      <MessageList
        messages={messages}
        isTyping={isTyping}
      />
      <ChatInput
        onSendMessage={onSendMessage}
        isTyping={isTyping}
      />
    </div>
  );
}
