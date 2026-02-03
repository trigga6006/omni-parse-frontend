import { useRef, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import ChatMessage from './ChatMessage';
import ChatInput from './ChatInput';
import WelcomeScreen from './WelcomeScreen';
import SourcePanel from './SourceList';
import ThinkingIndicator from './ThinkingIndicator';
import useChat from '@/hooks/useChat';
import useUIStore from '@/stores/uiStore';
import { cn } from '@/utils/cn';

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
    <div className="flex h-full w-full">
      <div className={cn(
        'flex flex-1 flex-col h-full transition-all duration-300',
        sourcePanelOpen ? 'lg:pr-80' : ''
      )}>
        <div className="flex-1 overflow-y-auto scrollbar-thin">
          {isEmpty ? (
            <WelcomeScreen onSendMessage={sendMessage} />
          ) : (
            <div className="w-full max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
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

              <div ref={messagesEndRef} className="h-4" />
            </div>
          )}
        </div>

        <div className="sticky bottom-0 border-t border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 p-4 sm:p-6">
          <div className="w-full max-w-3xl mx-auto">
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
