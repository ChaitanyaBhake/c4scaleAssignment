export type MessageType = 'user' | 'system';

export interface Message {
  id: string;
  content: string;
  type: MessageType;
  timestamp: number;
}

export interface Chat {
  id: string;
  title: string;
  messages: Message[];
  lastUpdated: number;
}

export const generateId = (): string => {
  return Math.random().toString(36).substring(2, 15);
};

export const DUMMY_RESPONSES = [
  'Thanks for your message! How can I help you today?',
  "That's an interesting point. Tell me more about that.",
  "I understand what you're saying. Let me think about that for a moment.",
  'Great question! The answer depends on several factors.',
  'I appreciate your patience. Let me provide some information on that topic.',
  "That's a common concern. Here's what you should know...",
  "I'm here to help with any questions you might have.",
  'Let me check that information for you.',
  "That's a great observation! You're absolutely right.",
  "I'm processing your request. This will just take a moment.",
  "I'd be happy to assist with that. Could you provide more details?",
  "That's a challenging question. Let me offer some perspective.",
  "I'm glad you asked about that. It's an important topic.",
  "Your question is quite thought-provoking. Here's my take on it...",
  "I'm analyzing your request and will respond shortly.",
];

export const getRandomResponse = (): string => {
  const randomIndex = Math.floor(
    Math.random() * DUMMY_RESPONSES.length
  );
  return DUMMY_RESPONSES[randomIndex];
};
