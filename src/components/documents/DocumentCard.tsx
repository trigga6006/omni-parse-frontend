import { FileText, Trash2, MoreVertical, Clock, Layers } from 'lucide-react';
import { motion } from 'framer-motion';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import { Dropdown, DropdownItem } from '@/components/ui/Dropdown';
import { formatRelative } from '@/utils/format';
import { cn } from '@/utils/cn';
import type { Document } from '@/types';

interface DocumentCardProps {
  document: Document;
  index?: number;
  onDelete: () => void;
  onClick?: () => void;
}

export default function DocumentCard({
  document,
  index = 0,
  onDelete,
  onClick,
}: DocumentCardProps) {
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
      onClick={onClick}
      className={cn(
        'group flex items-center gap-4 p-4 rounded-xl',
        'border border-border bg-secondary/30',
        'hover:bg-secondary/50 hover:shadow-md hover:border-primary/20',
        'transition-all duration-200',
        onClick && 'cursor-pointer'
      )}
    >
      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary group-hover:bg-primary/15 transition-colors">
        <FileText className="h-6 w-6" />
      </div>

      <div className="flex-1 min-w-0">
        <p className="font-semibold text-foreground truncate">{document.filename}</p>
        <div className="flex items-center gap-3 text-xs text-muted-foreground mt-1">
          <span className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            {formatRelative(document.created_at)}
          </span>
          {document.chunk_count > 0 && (
            <span className="flex items-center gap-1">
              <Layers className="h-3 w-3" />
              {document.chunk_count} chunks
            </span>
          )}
        </div>
      </div>

      <Badge variant={statusColors[document.status]}>{document.status}</Badge>

      <Dropdown
        trigger={
          <Button
            variant="ghost"
            size="icon"
            className="h-9 w-9 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
            onClick={(e) => e.stopPropagation()}
          >
            <MoreVertical className="h-4 w-4" />
          </Button>
        }
        align="right"
      >
        <DropdownItem
          onClick={(e) => {
            e.stopPropagation();
            onDelete();
          }}
          className="text-red-500 hover:text-red-600 hover:bg-red-500/10"
        >
          <Trash2 className="h-4 w-4 mr-2" />
          Delete
        </DropdownItem>
      </Dropdown>
    </motion.div>
  );
}
