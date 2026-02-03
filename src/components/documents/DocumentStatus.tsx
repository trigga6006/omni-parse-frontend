import { Loader2, CheckCircle, XCircle, Clock } from 'lucide-react';
import { cn } from '@/utils/cn';
import type { DocumentStatus as DocStatus } from '@/types';

interface DocumentStatusProps {
  status: DocStatus;
  showLabel?: boolean;
  size?: 'sm' | 'md';
}

export default function DocumentStatus({
  status,
  showLabel = true,
  size = 'md',
}: DocumentStatusProps) {
  const config = {
    pending: {
      icon: Clock,
      label: 'Pending',
      className: 'text-yellow-500',
    },
    processing: {
      icon: Loader2,
      label: 'Processing',
      className: 'text-blue-500 animate-spin',
    },
    completed: {
      icon: CheckCircle,
      label: 'Ready',
      className: 'text-green-500',
    },
    failed: {
      icon: XCircle,
      label: 'Failed',
      className: 'text-red-500',
    },
  };

  const { icon: Icon, label, className } = config[status];
  const iconSize = size === 'sm' ? 'h-4 w-4' : 'h-5 w-5';

  return (
    <div className="flex items-center gap-2">
      <Icon className={cn(iconSize, className)} />
      {showLabel && (
        <span className={cn('text-sm', size === 'sm' && 'text-xs')}>
          {label}
        </span>
      )}
    </div>
  );
}
