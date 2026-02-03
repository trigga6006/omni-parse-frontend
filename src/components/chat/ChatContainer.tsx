import { useRef, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import ChatMessage from './ChatMessage';
import ChatInput from './ChatInput';
import WelcomeScreen from './WelcomeScreen';
import SourcePanel from './SourceList';
import ThinkingIndicator from './ThinkingIndicator';
import useChat from '@/hooks/useChat';
import useUIStore from '@/stores/uiStore';

export default function ChatContainer() {
  const { messages, isStreaming, sources, sendMessage } = useChat();
  const { sourcePanelOpen, setSourcePanelOpen } = useUIStore();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isStreaming]);

  useEffect(() => {
    if (sources.length > 0) {
      setSourcePanelOpen(true);
    }
  }, [sources, setSourcePanelOpen]);

  const isEmpty = messages.length === 0;

  return (
    <div className="flex h-full">
      <div className="flex flex-1 flex-col">
        <div className="flex-1 overflow-y-auto scrollbar-thin">
          {isEmpty ? (
            <WelcomeScreen onSendMessage={sendMessage} />
          ) : (
            <div className="mx-auto max-w-3xl px-4 py-8">
              <AnimatePresence mode="popLayout">
                {messages.map((message) => (
                  <ChatMessage
                    key={message.id}
                    message={message}
                    isStreaming={message.isStreaming && isStreaming}
                  />
                ))}
              </AnimatePresence>

              {isStreaming && messages[messages.length - 1]?.role === 'user' && (
                <ThinkingIndicator />
              )}

              <div ref={messagesEndRef} />
            </div>
          )}
        </div>

        <div className="border-t border-border bg-background p-4">
          <div className="mx-auto max-w-3xl">
            <ChatInput onSendMessage={sendMessage} disabled={isStreaming} />
          </div>
        </div>
      </div>

      <SourcePanel
        sources={sources}
        isOpen={sourcePanelOpen}
        onClose={() => setSourcePanelOpen(false)}
      />
    </div>
  );
}
