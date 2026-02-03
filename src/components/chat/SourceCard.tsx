import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileText, ChevronDown } from 'lucide-react';
import { cn } from '@/utils/cn';
import Badge from '@/components/ui/Badge';
import type { Source } from '@/types';

interface SourceCardProps {
  source: Source;
  index: number;
}

export default function SourceCard({ source, index }: SourceCardProps) {
  const [expanded, setExpanded] = useState(false);

  const relevancePercent = Math.round(source.relevance_score * 100);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className={cn(
        'rounded-lg border border-border bg-secondary/30',
        'hover:bg-secondary/50 transition-colors'
      )}
    >
      <button
        onClick={() => setExpanded(!expanded)}
        className="flex w-full items-center gap-3 p-3 text-left"
      >
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
          <FileText className="h-4 w-4" />
        </div>

        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium truncate">{source.document_title}</p>
          <p className="text-xs text-muted-foreground">
            {source.page_number ? `Page ${source.page_number}` : ''}
            {source.section_header && ` - ${source.section_header}`}
          </p>
        </div>

        <Badge
          variant={
            relevancePercent > 80
              ? 'success'
              : relevancePercent > 60
              ? 'warning'
              : 'secondary'
          }
          className="flex-shrink-0"
        >
          {relevancePercent}%
        </Badge>

        <ChevronDown
          className={cn(
            'h-4 w-4 text-muted-foreground transition-transform',
            expanded && 'rotate-180'
          )}
        />
      </button>

      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="border-t border-border p-3">
              <p className="text-sm text-muted-foreground whitespace-pre-wrap leading-relaxed">
                {source.content}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
