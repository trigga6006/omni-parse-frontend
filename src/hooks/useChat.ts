import { useCallback } from 'react';
import { useAuth } from '@clerk/clerk-react';
import { toast } from 'sonner';
import useChatStore from '@/stores/chatStore';
import { streamQuery, extractSources, extractText } from '@/services/streaming';
import api from '@/services/api';
import type { Source } from '@/types';

export function useChat() {
  const { getToken } = useAuth();
  const {
    sessionId,
    messages,
    isStreaming,
    streamingContent,
    sources,
    selectedDocuments,
    setSessionId,
    addMessage,
    updateLastMessage,
    setStreaming,
    appendStreamingContent,
    setSources,
    clearChat,
    resetSession,
  } = useChatStore();

  const ensureSession = useCallback(async (): Promise<string> => {
    if (sessionId) return sessionId;

    try {
      const token = await getToken();
      api.setToken(token);
      const response = await api.createSession();
      setSessionId(response.id);
      return response.id;
    } catch (error) {
      toast.error('Failed to create session');
      throw error;
    }
  }, [sessionId, getToken, setSessionId]);

  const sendMessage = useCallback(
    async (question: string): Promise<void> => {
      if (isStreaming) return;

      try {
        addMessage({
          role: 'user',
          content: question,
        });

        const currentSessionId = await ensureSession();

        setStreaming(true, '');

        addMessage({
          role: 'assistant',
          content: '',
          isStreaming: true,
        });

        const token = await getToken();
        if (!token) throw new Error('No auth token');

        const docIds = selectedDocuments.length > 0 ? selectedDocuments : undefined;

        let fullContent = '';
        let receivedSources: Source[] = [];

        for await (const chunk of streamQuery(token, {
          query: question,
          session_id: currentSessionId,
          document_ids: docIds,
        })) {
          // Handle sources
          const chunkSources = extractSources(chunk);
          if (chunkSources) {
            receivedSources = chunkSources;
            setSources(chunkSources);
          }

          // Handle text content
          const text = extractText(chunk);
          if (text) {
            fullContent += text;
            appendStreamingContent(text);
            updateLastMessage(fullContent);
          }

          // Handle completion
          if (chunk.type === 'done') {
            if (chunk.session_id) {
              setSessionId(chunk.session_id);
            }
          }

          // Handle errors
          if (chunk.type === 'error') {
            throw new Error(typeof chunk.content === 'string' ? chunk.content : 'Query failed');
          }
        }

        setStreaming(false, '');
        updateLastMessage(fullContent);
      } catch (error) {
        console.error('Chat error:', error);
        toast.error(error instanceof Error ? error.message : 'Failed to get response');
        setStreaming(false, '');

        useChatStore.setState((state) => ({
          messages: state.messages.slice(0, -1),
        }));
      }
    },
    [
      isStreaming,
      ensureSession,
      getToken,
      selectedDocuments,
      addMessage,
      setStreaming,
      appendStreamingContent,
      updateLastMessage,
      setSources,
      setSessionId,
    ]
  );

  const startNewChat = useCallback((): void => {
    resetSession();
  }, [resetSession]);

  return {
    messages,
    isStreaming,
    streamingContent,
    sources,
    sessionId,
    sendMessage,
    startNewChat,
    clearChat,
  };
}

export default useChat;
