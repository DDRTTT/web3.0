'use client';

import React, { createContext, useContext, useState, useCallback } from 'react';

interface Message {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
}

interface XContextType {
  messages: Message[];
  isTyping: boolean;
  addMessage: (message: Omit<Message, 'id' | 'timestamp'>) => void;
  setIsTyping: (typing: boolean) => void;
  clearMessages: () => void;
}

const XContext = createContext<XContextType | undefined>(undefined);

export function XProvider({ children }: { children: React.ReactNode }) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);

  const addMessage = useCallback((message: Omit<Message, 'id' | 'timestamp'>) => {
    const newMessage: Message = {
      ...message,
      id: Date.now().toString(),
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, newMessage]);
  }, []);

  const clearMessages = useCallback(() => {
    setMessages([]);
  }, []);

  const value = {
    messages,
    isTyping,
    addMessage,
    setIsTyping,
    clearMessages,
  };

  return <XContext.Provider value={value}>{children}</XContext.Provider>;
}

export function useX() {
  const context = useContext(XContext);
  if (context === undefined) {
    throw new Error('useX must be used within a XProvider');
  }
  return context;
}

// 导出类型
export type { Message };
