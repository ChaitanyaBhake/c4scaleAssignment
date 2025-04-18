import { useState, useEffect } from 'react';
import {
  Chat,
  Message,
  generateId,
  getRandomResponse,
} from '@/types/chat';

const LOCAL_STORAGE_KEY = 'echo-chat-history';

export const useChats = () => {
  const [chats, setChats] = useState<Chat[]>([]);
  const [activeChat, setActiveChat] = useState<
    string | null
  >(null);
  const [isTyping, setIsTyping] = useState(false);

  // Load chats from local storage on mount
  useEffect(() => {
    const savedChats = localStorage.getItem(
      LOCAL_STORAGE_KEY
    );
    if (savedChats) {
      const parsedChats = JSON.parse(savedChats);
      setChats(parsedChats);

      // Set active chat to the most recent chat
      if (parsedChats.length > 0) {
        const sortedChats = [...parsedChats].sort(
          (a, b) => b.lastUpdated - a.lastUpdated
        );
        setActiveChat(sortedChats[0].id);
      }
    } else {
      // Create a default chat if none exists
      const newChat = createNewChat();
      setChats([newChat]);
      setActiveChat(newChat.id);
    }
  }, []);

  // Save chats to local storage whenever they change
  useEffect(() => {
    if (chats.length > 0) {
      localStorage.setItem(
        LOCAL_STORAGE_KEY,
        JSON.stringify(chats)
      );
    }
  }, [chats]);

  const createNewChat = (): Chat => {
    return {
      id: generateId(),
      title: 'New Chat',
      messages: [],
      lastUpdated: Date.now(),
    };
  };

  const startNewChat = () => {
    const newChat = createNewChat();
    setChats((prevChats) => [newChat, ...prevChats]);
    setActiveChat(newChat.id);
    return newChat.id;
  };

  const sendMessage = async (content: string) => {
    if (!content.trim() || !activeChat) return;

    // Create new chat if there is no active chat
    let currentChatId = activeChat;
    if (!currentChatId) {
      currentChatId = startNewChat();
    }

    // Add user message
    const userMessage: Message = {
      id: generateId(),
      content,
      type: 'user',
      timestamp: Date.now(),
    };

    // Update the chat with the new message
    setChats((prevChats) =>
      prevChats.map((chat) => {
        if (chat.id === currentChatId) {
          const updatedMessages = [
            ...chat.messages,
            userMessage,
          ];

          // Update the chat title if it's the first message
          const title =
            chat.messages.length === 0
              ? content.substring(0, 20) +
                (content.length > 20 ? '...' : '')
              : chat.title;

          return {
            ...chat,
            messages: updatedMessages,
            title,
            lastUpdated: Date.now(),
          };
        }
        return chat;
      })
    );

    // Simulate typing indicator
    setIsTyping(true);

    // Simulate system response after a delay
    setTimeout(() => {
      const systemMessage: Message = {
        id: generateId(),
        content: getRandomResponse(),
        type: 'system',
        timestamp: Date.now(),
      };

      setChats((prevChats) =>
        prevChats.map((chat) => {
          if (chat.id === currentChatId) {
            // Get the updated messages without duplicating the user message
            const existingMessages = chat.messages || [];
            return {
              ...chat,
              messages: [
                ...existingMessages,
                systemMessage,
              ],
              lastUpdated: Date.now(),
            };
          }
          return chat;
        })
      );
      setIsTyping(false);
    }, 1500); // 1.5 second delay for simulated typing
  };

  const deleteChat = (chatId: string) => {
    setChats((prevChats) =>
      prevChats.filter((chat) => chat.id !== chatId)
    );

    if (activeChat === chatId) {
      const remainingChats = chats.filter(
        (chat) => chat.id !== chatId
      );
      if (remainingChats.length > 0) {
        setActiveChat(remainingChats[0].id);
      } else {
        // Create a new chat if all chats were deleted
        const newChat = createNewChat();
        setChats([newChat]);
        setActiveChat(newChat.id);
      }
    }
  };

  const getActiveChat = () => {
    return (
      chats.find((chat) => chat.id === activeChat) || null
    );
  };

  return {
    chats,
    activeChat,
    isTyping,
    getActiveChat,
    setActiveChat,
    sendMessage,
    startNewChat,
    deleteChat,
  };
};
