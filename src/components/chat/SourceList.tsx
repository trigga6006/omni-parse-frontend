import { motion, AnimatePresence } from 'framer-motion';
import { X, FileText } from 'lucide-react';
import Button from '@/components/ui/Button';
import SourceCard from './SourceCard';
import { cn } from '@/utils/cn';
import type { Source } from '@/types';

interface SourcePanelProps {
  sources: Source[];
  isOpen: boolean;
  onClose: () => void;
}

export default function SourcePanel({ sources, isOpen, onClose }: SourcePanelProps) {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ width: 0, opacity: 0 }}
        animate={{ width: 384, opacity: 1 }}
        exit={{ width: 0, opacity: 0 }}
        className={cn(
          'h-full border-l border-border bg-background',
          'flex flex-col overflow-hidden'
        )}
      >
        <div className="flex items-center justify-between border-b border-border px-4 py-3">
          <div className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-primary" />
            <h2 className="font-semibold">Sources</h2>
            <span className="text-sm text-muted-foreground">({sources.length})</span>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose} className="h-8 w-8">
            <X className="h-4 w-4" />
          </Button>
        </div>

        <div className="flex-1 overflow-y-auto scrollbar-thin p-4">
          {sources.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <FileText className="h-12 w-12 text-muted-foreground/30 mb-3" />
              <p className="text-sm text-muted-foreground">
                Sources will appear here when you ask a question
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {sources.map((source, index) => (
                <SourceCard
                  key={`${source.document_id}-${source.page_number}-${index}`}
                  source={source}
                  index={index}
                />
              ))}
            </div>
          )}
        </div>

        {sources.length > 0 && (
          <div className="border-t border-border p-4">
            <p className="text-xs text-muted-foreground text-center">
              Click a source to expand and view the relevant excerpt
            </p>
          </div>
        )}
      </motion.div>
    </AnimatePresence>
  );
}
