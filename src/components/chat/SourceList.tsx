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
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Mobile backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-black/50 lg:hidden"
            onClick={onClose}
          />

          {/* Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className={cn(
              'fixed right-0 top-0 z-50 h-full w-80',
              'border-l border-border bg-background',
              'flex flex-col shadow-2xl'
            )}
          >
            <div className="flex items-center justify-between border-b border-border px-4 py-4">
              <div className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-primary" />
                <h2 className="font-semibold">Sources</h2>
                <span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
                  {sources.length}
                </span>
              </div>
              <Button variant="ghost" size="icon" onClick={onClose} className="h-8 w-8">
                <X className="h-4 w-4" />
              </Button>
            </div>

            <div className="flex-1 overflow-y-auto scrollbar-thin p-4">
              {sources.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center px-4">
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
        </>
      )}
    </AnimatePresence>
  );
}
