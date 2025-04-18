import { Message } from '@/types/chat';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';

interface MessageBubbleProps {
  message: Message;
}

export function MessageBubble({
  message,
}: MessageBubbleProps) {
  const isUser = message.type === 'user';
  const formattedTime = format(
    new Date(message.timestamp),
    'h:mm a'
  );

  return (
    <div
      className={cn(
        'flex w-full mb-4 animate-fade-in',
        isUser ? 'justify-end' : 'justify-start'
      )}
    >
      <div
        className={cn(
          'max-w-[80%] rounded-2xl px-4 py-2 shadow-sm',
          isUser
            ? 'bg-chat-userBg text-chat-user dark:bg-chat-user dark:text-white rounded-tr-none'
            : 'bg-chat-systemBg text-chat-system dark:bg-chat-system dark:text-white rounded-tl-none'
        )}
      >
        <div className="whitespace-pre-wrap break-words">
          {message.content}
        </div>
        <div
          className={cn(
            'text-xs mt-1',
            isUser
              ? 'text-chat-user/70 dark:text-white/70 text-right'
              : 'text-chat-system/70 dark:text-white/70'
          )}
        >
          {formattedTime}
        </div>
      </div>
    </div>
  );
}
