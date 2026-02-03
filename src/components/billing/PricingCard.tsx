import { Check } from 'lucide-react';
import Button from '@/components/ui/Button';
import { cn } from '@/utils/cn';
import type { Plan } from '@/utils/constants';

interface PricingCardProps {
  plan: Plan;
  isCurrentPlan?: boolean;
  onSelect?: () => void;
  isLoading?: boolean;
}

export default function PricingCard({
  plan,
  isCurrentPlan,
  onSelect,
  isLoading,
}: PricingCardProps) {
  const isPopular = plan.tier === 'pro';
  const isEnterprise = plan.tier === 'enterprise';

  return (
    <div
      className={cn(
        'relative rounded-2xl border p-6',
        'transition-all duration-200',
        isPopular
          ? 'border-primary bg-primary/5 shadow-lg'
          : 'border-border bg-secondary/30'
      )}
    >
      {isPopular && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
          <span className="bg-primary text-primary-foreground text-xs font-medium px-3 py-1 rounded-full">
            Popular
          </span>
        </div>
      )}

      <div className="mb-4">
        <h3 className="text-lg font-semibold">{plan.name}</h3>
        <div className="mt-2 flex items-baseline gap-1">
          {isEnterprise ? (
            <span className="text-2xl font-bold">Custom</span>
          ) : (
            <>
              <span className="text-3xl font-bold">${plan.price}</span>
              <span className="text-muted-foreground">/month</span>
            </>
          )}
        </div>
      </div>

      <ul className="mb-6 space-y-3">
        {plan.features.map((feature) => (
          <li key={feature} className="flex items-center gap-2 text-sm">
            <Check className="h-4 w-4 text-primary flex-shrink-0" />
            {feature}
          </li>
        ))}
      </ul>

      <Button
        className="w-full"
        variant={isPopular ? 'primary' : 'outline'}
        onClick={onSelect}
        disabled={isCurrentPlan || isLoading || (plan.tier === 'free' && !isCurrentPlan)}
      >
        {isLoading ? (
          <span className="flex items-center gap-2">
            <span className="h-4 w-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
            Processing...
          </span>
        ) : isCurrentPlan ? (
          'Current Plan'
        ) : isEnterprise ? (
          'Contact Sales'
        ) : plan.tier === 'free' ? (
          'Free Plan'
        ) : (
          'Upgrade'
        )}
      </Button>
    </div>
  );
}
