export function TypingIndicator() {
  return (
    <div className="flex items-center space-x-2 p-2 rounded-full bg-chat-systemBg dark:bg-chat-system/30 max-w-max animate-fade-in">
      <div className="flex space-x-1">
        <div
          className="w-2 h-2 rounded-full bg-chat-system animate-bounce"
          style={{ animationDelay: '0ms' }}
        ></div>
        <div
          className="w-2 h-2 rounded-full bg-chat-system animate-bounce"
          style={{ animationDelay: '150ms' }}
        ></div>
        <div
          className="w-2 h-2 rounded-full bg-chat-system animate-bounce"
          style={{ animationDelay: '300ms' }}
        ></div>
      </div>
      <span className="text-sm text-chat-system font-medium">
        GPT is thinking...
      </span>
    </div>
  );
}
