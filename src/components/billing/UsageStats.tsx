import { cn } from '@/utils/cn';
import { formatNumber } from '@/utils/format';

interface UsageStatsProps {
  queriesUsed: number;
  queriesLimit: number;
  documentsCount: number;
  documentsLimit: number;
}

export default function UsageStats({
  queriesUsed,
  queriesLimit,
  documentsCount,
  documentsLimit,
}: UsageStatsProps) {
  const queryPercent = queriesLimit > 0 ? (queriesUsed / queriesLimit) * 100 : 0;
  const docPercent = documentsLimit > 0 ? (documentsCount / documentsLimit) * 100 : 0;

  return (
    <div className="space-y-6">
      <UsageBar
        label="Queries"
        used={queriesUsed}
        limit={queriesLimit}
        percent={queryPercent}
      />
      <UsageBar
        label="Documents"
        used={documentsCount}
        limit={documentsLimit}
        percent={docPercent}
      />
    </div>
  );
}

interface UsageBarProps {
  label: string;
  used: number;
  limit: number;
  percent: number;
}

function UsageBar({ label, used, limit, percent }: UsageBarProps) {
  const isUnlimited = limit < 0;
  const isWarning = !isUnlimited && percent > 80;
  const isDanger = !isUnlimited && percent > 95;

  return (
    <div>
      <div className="flex justify-between mb-2">
        <span className="text-sm font-medium">{label}</span>
        <span className="text-sm text-muted-foreground">
          {formatNumber(used)} / {isUnlimited ? 'Unlimited' : formatNumber(limit)}
        </span>
      </div>
      <div className="h-2 bg-secondary rounded-full overflow-hidden">
        <div
          className={cn(
            'h-full transition-all duration-500',
            isDanger
              ? 'bg-red-500'
              : isWarning
              ? 'bg-yellow-500'
              : 'bg-primary'
          )}
          style={{ width: isUnlimited ? '10%' : `${Math.min(percent, 100)}%` }}
        />
      </div>
    </div>
  );
}
