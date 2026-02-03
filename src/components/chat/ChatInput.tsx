import { useState, useRef, useEffect, type FormEvent, type KeyboardEvent } from 'react';
import { Send, Sparkles, ChevronDown } from 'lucide-react';
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

  const toggleDocument = (docId: string) => {
    setSelectedDocuments(
      selectedDocuments.includes(docId)
        ? selectedDocuments.filter((id) => id !== docId)
        : [...selectedDocuments, docId]
    );
  };

  return (
    <div className="space-y-3">
      {readyDocs.length > 0 && (
        <div className="relative">
          <button
            onClick={() => setShowDocFilter(!showDocFilter)}
            className={cn(
              'flex items-center gap-2 text-sm',
              'text-muted-foreground hover:text-foreground',
              'transition-colors'
            )}
          >
            <Sparkles className="h-4 w-4" />
            {selectedDocuments.length === 0
              ? 'Searching all documents'
              : `Searching ${selectedDocuments.length} document${selectedDocuments.length > 1 ? 's' : ''}`}
            <ChevronDown
              className={cn('h-4 w-4 transition-transform', showDocFilter && 'rotate-180')}
            />
          </button>

          {showDocFilter && (
            <div className="absolute bottom-full left-0 mb-2 w-64 rounded-lg border border-border bg-secondary p-2 shadow-lg">
              <div className="mb-2 px-2 text-xs font-medium text-muted-foreground">
                Filter documents
              </div>
              <div className="max-h-48 overflow-y-auto">
                {readyDocs.map((doc) => (
                  <label
                    key={doc.id}
                    className="flex items-center gap-2 rounded-md px-2 py-1.5 hover:bg-accent cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={selectedDocuments.includes(doc.id)}
                      onChange={() => toggleDocument(doc.id)}
                      className="rounded border-border"
                    />
                    <span className="text-sm truncate">{doc.filename}</span>
                  </label>
                ))}
              </div>
              {selectedDocuments.length > 0 && (
                <button
                  onClick={() => setSelectedDocuments([])}
                  className="mt-2 w-full text-xs text-muted-foreground hover:text-foreground"
                >
                  Clear selection
                </button>
              )}
            </div>
          )}
        </div>
      )}

      <form onSubmit={handleSubmit} className="relative">
        <div
          className={cn(
            'flex items-end gap-2 rounded-2xl border border-border',
            'bg-secondary/50 p-2 transition-colors',
            'focus-within:border-primary/50 focus-within:ring-1 focus-within:ring-primary/20'
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
              'flex-1 resize-none bg-transparent px-2 py-2',
              'text-sm placeholder:text-muted-foreground',
              'focus:outline-none disabled:opacity-50',
              'max-h-[200px]'
            )}
          />

          <Button
            type="submit"
            size="icon"
            disabled={disabled || !input.trim()}
            className="h-10 w-10 rounded-xl flex-shrink-0"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </form>

      <p className="text-center text-xs text-muted-foreground">
        TechDocs AI can make mistakes. Verify important information.
      </p>
    </div>
  );
}
