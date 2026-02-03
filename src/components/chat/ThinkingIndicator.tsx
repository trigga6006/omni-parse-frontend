import { motion } from 'framer-motion';
import { Bot, Sparkles } from 'lucide-react';

export default function ThinkingIndicator() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-6 flex gap-4"
    >
      <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-secondary border border-border">
        <Bot className="h-4 w-4 text-foreground" />
      </div>

      <div className="flex items-center gap-3 rounded-2xl bg-secondary/50 border border-border px-4 py-3">
        <Sparkles className="h-4 w-4 text-primary animate-pulse-subtle" />
        <div className="flex items-center gap-1">
          <span className="text-sm text-muted-foreground">Thinking</span>
          <motion.span
            animate={{ opacity: [0, 1, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            className="text-muted-foreground"
          >
            ...
          </motion.span>
        </div>
      </div>
    </motion.div>
  );
}
