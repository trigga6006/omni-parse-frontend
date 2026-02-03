import { useState, useRef, useEffect, type FormEvent, type KeyboardEvent } from 'react';
import { Send, Sparkles, ChevronDown, FileText, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '@/components/ui/Button';
import useDocumentStore from '@/stores/documentStore';
import useChatStore from '@/stores/chatStore';
import { cn } from '@/utils/cn';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  disabled?: boolean;
}

export default function ChatInput({ onSendMessage, disabled }: ChatInputProps) {
  const [input, setInput] = useState('');
  const [showDocFilter, setShowDocFilter] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const { documents } = useDocumentStore();
  const { selectedDocuments, setSelectedDocuments } = useChatStore();

  const readyDocs = documents.filter((d) => d.status === 'completed');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!input.trim() || disabled) return;

    onSendMessage(input.trim());
    setInput('');
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = `${Math.min(textarea.scrollHeight, 200)}px`;
    }
  }, [input]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setShowDocFilter(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleDocument = (docId: string) => {
    setSelectedDocuments(
      selectedDocuments.includes(docId)
        ? selectedDocuments.filter((id) => id !== docId)
        : [...selectedDocuments, docId]
    );
  };

  return (
    <div className="space-y-3">
      {/* Document Filter */}
      {readyDocs.length > 0 && (
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setShowDocFilter(!showDocFilter)}
            className={cn(
              'flex items-center gap-2 text-sm px-3 py-1.5 rounded-lg',
              'text-muted-foreground hover:text-foreground hover:bg-secondary/50',
              'transition-all duration-200',
              showDocFilter && 'bg-secondary/50 text-foreground'
            )}
          >
            <Sparkles className="h-4 w-4 text-primary" />
            <span>
              {selectedDocuments.length === 0
                ? 'Searching all documents'
                : `Searching ${selectedDocuments.length} document${selectedDocuments.length > 1 ? 's' : ''}`}
            </span>
            <ChevronDown
              className={cn('h-4 w-4 transition-transform duration-200', showDocFilter && 'rotate-180')}
            />
          </button>

          <AnimatePresence>
            {showDocFilter && (
              <motion.div
                initial={{ opacity: 0, y: 8, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 8, scale: 0.96 }}
                transition={{ duration: 0.15 }}
                className="absolute bottom-full left-0 mb-2 w-72 rounded-xl border border-border bg-background p-2 shadow-xl z-50"
              >
                <div className="flex items-center justify-between px-2 pb-2 border-b border-border mb-2">
                  <span className="text-xs font-semibold text-foreground">Filter documents</span>
                  {selectedDocuments.length > 0 && (
                    <button
                      onClick={() => setSelectedDocuments([])}
                      className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1"
                    >
                      <X className="h-3 w-3" />
                      Clear
                    </button>
                  )}
                </div>
                <div className="max-h-48 overflow-y-auto scrollbar-thin space-y-0.5">
                  {readyDocs.map((doc) => (
                    <label
                      key={doc.id}
                      className={cn(
                        'flex items-center gap-3 rounded-lg px-2 py-2 cursor-pointer transition-colors',
                        selectedDocuments.includes(doc.id)
                          ? 'bg-primary/10 text-foreground'
                          : 'hover:bg-secondary text-muted-foreground hover:text-foreground'
                      )}
                    >
                      <input
                        type="checkbox"
                        checked={selectedDocuments.includes(doc.id)}
                        onChange={() => toggleDocument(doc.id)}
                        className="rounded border-border text-primary focus:ring-primary/20"
                      />
                      <FileText className="h-4 w-4 flex-shrink-0" />
                      <span className="text-sm truncate">{doc.filename}</span>
                    </label>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}

      {/* Input Form */}
      <form onSubmit={handleSubmit} className="relative">
        <div
          className={cn(
            'flex items-end gap-3 rounded-2xl border border-border',
            'bg-secondary/30 p-3 transition-all duration-200',
            'focus-within:border-primary/40 focus-within:bg-secondary/50',
            'shadow-sm hover:shadow-md'
          )}
        >
          <textarea
            ref={textareaRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask a question about your documents..."
            disabled={disabled}
            rows={1}
            className={cn(
              'flex-1 resize-none bg-transparent px-1 py-1.5',
              'text-sm text-foreground placeholder:text-muted-foreground',
              'focus:outline-none focus:ring-0 disabled:opacity-50',
              'max-h-[200px] leading-relaxed'
            )}
          />

          <Button
            type="submit"
            size="icon"
            disabled={disabled || !input.trim()}
            className={cn(
              'h-10 w-10 rounded-xl flex-shrink-0 shadow-sm',
              'disabled:opacity-30 disabled:shadow-none',
              'hover:shadow-md transition-all duration-200'
            )}
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </form>

      {/* Disclaimer */}
      <p className="text-center text-xs text-muted-foreground/70">
        Omni Docs can make mistakes. Verify important information.
      </p>
    </div>
  );
}
