import { motion } from 'framer-motion';
import { Bot } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { cn } from '@/utils/cn';

interface StreamingMessageProps {
  content: string;
}

export default function StreamingMessage({ content }: StreamingMessageProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-6 flex gap-4"
    >
      <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-secondary border border-border">
        <Bot className="h-4 w-4 text-foreground" />
      </div>

      <div className="flex-1 space-y-2">
        <div
          className={cn(
            'inline-block rounded-2xl px-4 py-3',
            'bg-secondary/50 border border-border'
          )}
        >
          <div className="markdown-content text-sm streaming-cursor">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                a: ({ ...props }) => (
                  <a
                    {...props}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                  />
                ),
                code: ({ className, children, ...props }) => {
                  const isInline = !className;
                  if (isInline) {
                    return (
                      <code
                        className="bg-muted px-1.5 py-0.5 rounded text-xs font-mono"
                        {...props}
                      >
                        {children}
                      </code>
                    );
                  }
                  return (
                    <pre className="bg-muted rounded-lg p-4 overflow-x-auto my-3">
                      <code className="text-xs font-mono" {...props}>
                        {children}
                      </code>
                    </pre>
                  );
                },
              }}
            >
              {content || ' '}
            </ReactMarkdown>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
