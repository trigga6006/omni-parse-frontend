import { motion } from 'framer-motion';
import { User, Copy, Check, Sparkles } from 'lucide-react';
import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { cn } from '@/utils/cn';
import Button from '@/components/ui/Button';
import type { Message } from '@/types';

interface ChatMessageProps {
  message: Message;
  isStreaming?: boolean;
}

export default function ChatMessage({ message, isStreaming }: ChatMessageProps) {
  const [copied, setCopied] = useState(false);
  const isUser = message.role === 'user';

  const handleCopy = async () => {
    await navigator.clipboard.writeText(message.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3 }}
      className={cn('mb-6 flex gap-4', isUser && 'flex-row-reverse')}
    >
      {/* Avatar */}
      <div
        className={cn(
          'flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl shadow-sm',
          isUser
            ? 'bg-gradient-to-br from-primary to-primary/80'
            : 'bg-secondary border border-border'
        )}
      >
        {isUser ? (
          <User className="h-4 w-4 text-primary-foreground" />
        ) : (
          <Sparkles className="h-4 w-4 text-primary" />
        )}
      </div>

      {/* Message Content */}
      <div className={cn('flex-1 space-y-2 max-w-[85%]', isUser && 'text-right')}>
        <div
          className={cn(
            'inline-block rounded-2xl px-4 py-3',
            isUser
              ? 'bg-gradient-to-br from-primary to-primary/90 text-primary-foreground shadow-sm'
              : 'bg-secondary/60 border border-border shadow-sm'
          )}
        >
          {isUser ? (
            <p className="text-sm whitespace-pre-wrap leading-relaxed">{message.content}</p>
          ) : (
            <div className={cn('markdown-content text-sm', isStreaming && 'streaming-cursor')}>
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                  a: ({ ...props }) => (
                    <a
                      {...props}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline font-medium"
                    />
                  ),
                  code: ({ className, children, ...props }) => {
                    const isInline = !className;
                    if (isInline) {
                      return (
                        <code
                          className="bg-muted/80 px-1.5 py-0.5 rounded text-xs font-mono text-foreground"
                          {...props}
                        >
                          {children}
                        </code>
                      );
                    }
                    return (
                      <pre className="bg-muted/80 rounded-xl p-4 overflow-x-auto my-3 border border-border/50">
                        <code className="text-xs font-mono" {...props}>
                          {children}
                        </code>
                      </pre>
                    );
                  },
                  table: ({ ...props }) => (
                    <div className="overflow-x-auto my-3 rounded-lg border border-border">
                      <table className="min-w-full border-collapse text-sm" {...props} />
                    </div>
                  ),
                  th: ({ ...props }) => (
                    <th
                      className="border-b border-border bg-muted/50 px-3 py-2 text-left font-medium"
                      {...props}
                    />
                  ),
                  td: ({ ...props }) => (
                    <td className="border-b border-border/50 px-3 py-2" {...props} />
                  ),
                  ul: ({ ...props }) => (
                    <ul className="list-disc pl-4 space-y-1 my-2" {...props} />
                  ),
                  ol: ({ ...props }) => (
                    <ol className="list-decimal pl-4 space-y-1 my-2" {...props} />
                  ),
                  li: ({ ...props }) => (
                    <li className="leading-relaxed" {...props} />
                  ),
                  p: ({ ...props }) => (
                    <p className="leading-relaxed mb-3 last:mb-0" {...props} />
                  ),
                }}
              >
                {message.content || ' '}
              </ReactMarkdown>
            </div>
          )}
        </div>

        {/* Actions */}
        {!isUser && !isStreaming && message.content && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="flex items-center gap-1"
          >
            <Button
              variant="ghost"
              size="sm"
              onClick={handleCopy}
              className="h-7 px-2.5 text-xs text-muted-foreground hover:text-foreground rounded-lg"
            >
              {copied ? (
                <Check className="h-3 w-3 mr-1.5 text-green-500" />
              ) : (
                <Copy className="h-3 w-3 mr-1.5" />
              )}
              {copied ? 'Copied!' : 'Copy'}
            </Button>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}
