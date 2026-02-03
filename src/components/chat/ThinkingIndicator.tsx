import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

export default function ThinkingIndicator() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-6 flex gap-4"
    >
      <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl bg-secondary border border-border shadow-sm">
        <Sparkles className="h-4 w-4 text-primary" />
      </div>

      <div className="flex items-center gap-3 rounded-2xl bg-secondary/60 border border-border px-4 py-3 shadow-sm">
        <div className="flex gap-1">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="h-2 w-2 rounded-full bg-primary"
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.5, 1, 0.5]
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
                delay: i * 0.2,
                ease: 'easeInOut'
              }}
            />
          ))}
        </div>
        <span className="text-sm text-muted-foreground">Thinking</span>
      </div>
    </motion.div>
  );
}
