import { create } from 'zustand';
import type { Message, Source } from '@/types';

interface ChatState {
  sessionId: string | null;
  messages: Message[];
  isStreaming: boolean;
  streamingContent: string;
  sources: Source[];
  selectedDocuments: string[];

  setSessionId: (sessionId: string | null) => void;
  addMessage: (message: Omit<Message, 'id'>) => void;
  updateLastMessage: (content: string) => void;
  setStreaming: (isStreaming: boolean, content?: string) => void;
  appendStreamingContent: (chunk: string) => void;
  setSources: (sources: Source[]) => void;
  setSelectedDocuments: (documents: string[]) => void;
  clearChat: () => void;
  resetSession: () => void;
}

const useChatStore = create<ChatState>((set) => ({
  sessionId: null,
  messages: [],
  isStreaming: false,
  streamingContent: '',
  sources: [],
  selectedDocuments: [],

  setSessionId: (sessionId) => set({ sessionId }),

  addMessage: (message) =>
    set((state) => ({
      messages: [...state.messages, { ...message, id: Date.now() }],
    })),

  updateLastMessage: (content) =>
    set((state) => {
      const messages = [...state.messages];
      if (messages.length > 0) {
        messages[messages.length - 1] = {
          ...messages[messages.length - 1],
          content,
        };
      }
      return { messages };
    }),

  setStreaming: (isStreaming, content = '') =>
    set({ isStreaming, streamingContent: content }),

  appendStreamingContent: (chunk) =>
    set((state) => ({
      streamingContent: state.streamingContent + chunk,
    })),

  setSources: (sources) => set({ sources }),

  setSelectedDocuments: (documents) => set({ selectedDocuments: documents }),

  clearChat: () =>
    set({
      messages: [],
      sources: [],
      streamingContent: '',
      isStreaming: false,
    }),

  resetSession: () =>
    set({
      sessionId: null,
      messages: [],
      sources: [],
      streamingContent: '',
      isStreaming: false,
    }),
}));

export default useChatStore;
