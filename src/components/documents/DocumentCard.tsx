import { FileText, Trash2, MoreVertical } from 'lucide-react';
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
        'flex items-center gap-4 p-4 rounded-lg',
        'border border-border bg-secondary/30',
        'hover:bg-secondary/50 transition-colors',
        onClick && 'cursor-pointer'
      )}
    >
      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
        <FileText className="h-5 w-5" />
      </div>

      <div className="flex-1 min-w-0">
        <p className="font-medium truncate">{document.filename}</p>
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <span>{formatRelative(document.created_at)}</span>
          {document.page_count && <span>{document.page_count} pages</span>}
        </div>
      </div>

      <Badge variant={statusColors[document.status]}>{document.status}</Badge>

      <Dropdown
        trigger={
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
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
          className="text-red-500 hover:text-red-600"
        >
          <Trash2 className="h-4 w-4 mr-2" />
          Delete
        </DropdownItem>
      </Dropdown>
    </motion.div>
  );
}
