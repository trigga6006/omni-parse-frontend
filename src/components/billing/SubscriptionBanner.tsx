import { AlertCircle, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import Button from '@/components/ui/Button';
import { cn } from '@/utils/cn';

interface SubscriptionBannerProps {
  type: 'upgrade' | 'limit' | 'expiring';
  message?: string;
}

export default function SubscriptionBanner({ type, message }: SubscriptionBannerProps) {
  const config = {
    upgrade: {
      icon: Zap,
      title: 'Upgrade to Pro',
      defaultMessage: 'Get more queries and documents with our Pro plan.',
      buttonText: 'View Plans',
      className: 'bg-primary/10 border-primary/20',
      iconClass: 'text-primary',
    },
    limit: {
      icon: AlertCircle,
      title: 'Usage Limit Reached',
      defaultMessage: 'You\'ve reached your monthly limit. Upgrade to continue.',
      buttonText: 'Upgrade Now',
      className: 'bg-yellow-500/10 border-yellow-500/20',
      iconClass: 'text-yellow-500',
    },
    expiring: {
      icon: AlertCircle,
      title: 'Subscription Expiring',
      defaultMessage: 'Your subscription will expire soon. Renew to keep access.',
      buttonText: 'Renew',
      className: 'bg-red-500/10 border-red-500/20',
      iconClass: 'text-red-500',
    },
  };

  const { icon: Icon, title, defaultMessage, buttonText, className, iconClass } = config[type];

  return (
    <div className={cn('rounded-lg border p-4', className)}>
      <div className="flex items-start gap-3">
        <Icon className={cn('h-5 w-5 flex-shrink-0 mt-0.5', iconClass)} />
        <div className="flex-1">
          <h4 className="font-medium">{title}</h4>
          <p className="text-sm text-muted-foreground mt-1">
            {message || defaultMessage}
          </p>
        </div>
        <Link to="/billing">
          <Button size="sm">{buttonText}</Button>
        </Link>
      </div>
    </div>
  );
}
