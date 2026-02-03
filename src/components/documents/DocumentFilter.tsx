import { useState } from 'react';
import { Filter, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import { cn } from '@/utils/cn';
import type { Document } from '@/types';

interface DocumentFilterProps {
  documents: Document[];
  selectedIds: string[];
  onSelectionChange: (ids: string[]) => void;
}

export default function DocumentFilter({
  documents,
  selectedIds,
  onSelectionChange,
}: DocumentFilterProps) {
  const [isOpen, setIsOpen] = useState(false);

  const readyDocuments = documents.filter((doc) => doc.status === 'completed');

  const toggleDocument = (docId: string) => {
    if (selectedIds.includes(docId)) {
      onSelectionChange(selectedIds.filter((id) => id !== docId));
    } else {
      onSelectionChange([...selectedIds, docId]);
    }
  };

  const clearSelection = () => {
    onSelectionChange([]);
  };

  return (
    <div className="relative">
      <Button
        variant="outline"
        size="sm"
        onClick={() => setIsOpen(!isOpen)}
        className="gap-2"
      >
        <Filter className="h-4 w-4" />
        Filter
        {selectedIds.length > 0 && (
          <Badge variant="default" className="ml-1">
            {selectedIds.length}
          </Badge>
        )}
      </Button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            className={cn(
              'absolute top-full left-0 mt-2 z-50',
              'w-72 rounded-lg border border-border bg-secondary p-3 shadow-lg'
            )}
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-medium">Filter by document</span>
              {selectedIds.length > 0 && (
                <button
                  onClick={clearSelection}
                  className="text-xs text-muted-foreground hover:text-foreground"
                >
                  Clear all
                </button>
              )}
            </div>

            {readyDocuments.length === 0 ? (
              <p className="text-sm text-muted-foreground py-2">
                No documents available
              </p>
            ) : (
              <div className="space-y-1 max-h-48 overflow-y-auto">
                {readyDocuments.map((doc) => (
                  <label
                    key={doc.id}
                    className={cn(
                      'flex items-center gap-2 rounded-md px-2 py-1.5',
                      'hover:bg-accent cursor-pointer'
                    )}
                  >
                    <input
                      type="checkbox"
                      checked={selectedIds.includes(doc.id)}
                      onChange={() => toggleDocument(doc.id)}
                      className="rounded border-border"
                    />
                    <span className="text-sm truncate">{doc.filename}</span>
                  </label>
                ))}
              </div>
            )}

            <div className="mt-3 pt-3 border-t border-border">
              <Button
                size="sm"
                className="w-full"
                onClick={() => setIsOpen(false)}
              >
                Apply
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {selectedIds.length > 0 && (
        <div className="flex flex-wrap gap-1 mt-2">
          {selectedIds.map((id) => {
            const doc = documents.find((d) => d.id === id);
            if (!doc) return null;
            return (
              <Badge key={id} variant="secondary" className="gap-1">
                {doc.filename}
                <button
                  onClick={() => toggleDocument(id)}
                  className="ml-1 hover:text-foreground"
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            );
          })}
        </div>
      )}
    </div>
  );
}
