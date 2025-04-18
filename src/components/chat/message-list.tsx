import { useEffect, useRef } from 'react';
import { Message } from '@/types/chat';
import { MessageBubble } from './message-bubble';
import { TypingIndicator } from './typing-indicator';

interface MessageListProps {
  messages: Message[];
  isTyping: boolean;
}

export function MessageList({
  messages,
  isTyping,
}: MessageListProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4">
      {messages.length === 0 ? (
        <div className="h-full flex flex-col items-center justify-center text-center p-8">
          <h2 className="text-2xl font-bold text-gray-700 dark:text-gray-300 mb-2">
            Welcome to Chat GPT
          </h2>
          <p className="text-gray-500 dark:text-gray-400 max-w-md">
            Start a conversation by typing a message below.
            I'll respond to whatever you send!
          </p>
        </div>
      ) : (
        <>
          {messages.map((message) => (
            <MessageBubble
              key={message.id}
              message={message}
            />
          ))}
        </>
      )}

      {isTyping && (
        <div className="flex w-full justify-start mb-4">
          <TypingIndicator />
        </div>
      )}

      <div ref={messagesEndRef} />
    </div>
  );
}
