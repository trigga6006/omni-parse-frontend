import { FileText, Trash2, MoreVertical } from 'lucide-react';
import { motion } from 'framer-motion';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import { Dropdown, DropdownItem } from '@/components/ui/Dropdown';
import { formatRelative } from '@/utils/format';
import { cn } from '@/utils/cn';
import type { Document } from '@/types';

interface DocumentListProps {
  documents: Document[];
  isLoading: boolean;
  onDelete: (id: string) => void;
}

export default function DocumentList({
  documents,
  isLoading,
  onDelete,
}: DocumentListProps) {
  if (isLoading) {
    return (
      <div className="space-y-3">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="h-20 animate-pulse rounded-lg bg-secondary/50"
          />
        ))}
      </div>
    );
  }

  if (documents.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <FileText className="h-12 w-12 text-muted-foreground/30 mb-4" />
        <h3 className="text-lg font-medium mb-2">No documents yet</h3>
        <p className="text-sm text-muted-foreground">
          Upload a PDF to get started
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {documents.map((doc, index) => (
        <DocumentCard
          key={doc.id}
          document={doc}
          index={index}
          onDelete={() => onDelete(doc.id)}
        />
      ))}
    </div>
  );
}

interface DocumentCardProps {
  document: Document;
  index: number;
  onDelete: () => void;
}

function DocumentCard({ document, index, onDelete }: DocumentCardProps) {
  const statusColors = {
    pending: 'warning',
    processing: 'default',
    completed: 'success',
    failed: 'error',
  } as const;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className={cn(
        'flex items-center gap-4 p-4 rounded-lg',
        'border border-border bg-secondary/30',
        'hover:bg-secondary/50 transition-colors'
      )}
    >
      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
        <FileText className="h-5 w-5" />
      </div>

      <div className="flex-1 min-w-0">
        <p className="font-medium truncate">{document.filename}</p>
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <span>{formatRelative(document.created_at)}</span>
          {document.chunk_count > 0 && <span>{document.chunk_count} chunks</span>}
        </div>
      </div>

      <Badge variant={statusColors[document.status]}>
        {document.status}
      </Badge>

      <Dropdown
        trigger={
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <MoreVertical className="h-4 w-4" />
          </Button>
        }
        align="right"
      >
        <DropdownItem
          onClick={onDelete}
          className="text-red-500 hover:text-red-600"
        >
          <Trash2 className="h-4 w-4 mr-2" />
          Delete
        </DropdownItem>
      </Dropdown>
    </motion.div>
  );
}
