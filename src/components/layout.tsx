import { useState } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';
import { useChats } from '@/hooks/use-chat-store';
import { Sidebar } from './sidebar/sidebar';
import { ChatContainer } from './chat/chat-container';

export function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const isMobile = useIsMobile();

  const {
    chats,
    activeChat,
    isTyping,
    getActiveChat,
    setActiveChat,
    sendMessage,
    startNewChat,
    deleteChat,
  } = useChats();

  const currentChat = getActiveChat();
  const messages = currentChat?.messages || [];

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-950">
      <Sidebar
        chats={chats}
        activeChat={activeChat}
        onChatSelect={setActiveChat}
        onChatDelete={deleteChat}
        onNewChat={startNewChat}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <main className="flex-1 flex flex-col overflow-hidden">
        <ChatContainer
          messages={messages}
          isTyping={isTyping}
          onSendMessage={sendMessage}
          onMenuToggle={() => setSidebarOpen(true)}
          isMobile={isMobile}
        />
      </main>
    </div>
  );
}
