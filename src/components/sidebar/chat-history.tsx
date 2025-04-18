
import { Chat } from "@/types/chat";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { MessageSquare, Trash2 } from "lucide-react";
import { format } from "date-fns";

interface ChatHistoryProps {
  chats: Chat[];
  activeChat: string | null;
  onChatSelect: (chatId: string) => void;
  onChatDelete: (chatId: string) => void;
  onNewChat: () => void;
}

export function ChatHistory({
  chats,
  activeChat,
  onChatSelect,
  onChatDelete,
  onNewChat,
}: ChatHistoryProps) {
  return (
    <div className="flex flex-col h-full">
      <div className="p-3">
        <Button 
          onClick={onNewChat} 
          className="w-full justify-start gap-2 bg-chat-user hover:bg-chat-user/90 text-white dark:bg-chat-system dark:hover:bg-chat-system/90"
        >
          <MessageSquare className="h-4 w-4" />
          New Chat
        </Button>
      </div>

      <ScrollArea className="flex-1 p-3">
        <div className="space-y-2">
          {chats.length === 0 ? (
            <div className="text-center text-muted-foreground py-4">
              No chats yet
            </div>
          ) : (
            chats
              .sort((a, b) => b.lastUpdated - a.lastUpdated)
              .map((chat) => {
                const isActive = chat.id === activeChat;
                const lastMessage = chat.messages[chat.messages.length - 1];
                const formattedDate = format(new Date(chat.lastUpdated), "MMM d");
                
                return (
                  <div
                    key={chat.id}
                    className={cn(
                      "flex items-center justify-between group rounded-md p-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 dark:text-gray-200",
                      isActive && "bg-gray-100 dark:bg-gray-800"
                    )}
                  >
                    <div
                      className="flex-1 truncate"
                      onClick={() => onChatSelect(chat.id)}
                    >
                      <div className="font-medium truncate">{chat.title}</div>
                      {lastMessage && (
                        <div className="text-xs text-muted-foreground truncate">
                          {formattedDate} • {lastMessage.content.substring(0, 30)}
                          {lastMessage.content.length > 30 ? "..." : ""}
                        </div>
                      )}
                    </div>
                    <Button
                      size="icon"
                      variant="ghost"
                      className="opacity-0 group-hover:opacity-100 h-8 w-8"
                      onClick={(e) => {
                        e.stopPropagation();
                        onChatDelete(chat.id);
                      }}
                    >
                      <Trash2 className="h-4 w-4" />
                      <span className="sr-only">Delete chat</span>
                    </Button>
                  </div>
                );
              })
          )}
        </div>
      </ScrollArea>
    </div>
  );
}
