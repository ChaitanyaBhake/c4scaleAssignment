import { useIsMobile } from '@/hooks/use-mobile';
import { Button } from '@/components/ui/button';
import { ChatHistory } from './chat-history';
import { SidebarFooter } from './sidebar-footer';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Chat } from '@/types/chat';

interface SidebarProps {
  chats: Chat[];
  activeChat: string | null;
  onChatSelect: (chatId: string) => void;
  onChatDelete: (chatId: string) => void;
  onNewChat: () => void;
  isOpen: boolean;
  onClose: () => void;
}

export function Sidebar({
  chats,
  activeChat,
  onChatSelect,
  onChatDelete,
  onNewChat,
  isOpen,
  onClose,
}: SidebarProps) {
  const isMobile = useIsMobile();

  return (
    <aside
      className={cn(
        'flex flex-col w-80 border-r dark:border-gray-700 bg-white dark:bg-gray-900 h-full',
        isMobile && 'fixed inset-0 z-50',
        isMobile && !isOpen && 'hidden'
      )}
    >
      <div className="flex items-center justify-between px-3 py-2 border-b dark:border-gray-700">
        <h2 className="font-semibold text-lg">Chat Gpt</h2>
        {isMobile && (
          <Button
            size="icon"
            variant="ghost"
            onClick={onClose}
          >
            <X className="h-5 w-5" />
            <span className="sr-only">Close sidebar</span>
          </Button>
        )}
      </div>

      <div className="flex-1 overflow-hidden">
        <ChatHistory
          chats={chats}
          activeChat={activeChat}
          onChatSelect={(chatId) => {
            onChatSelect(chatId);
            if (isMobile) onClose();
          }}
          onChatDelete={onChatDelete}
          onNewChat={onNewChat}
        />
      </div>

      <SidebarFooter />
    </aside>
  );
}
