import { useState, useEffect } from 'react';
import { useAuth } from '@clerk/clerk-react';
import { CreditCard, ExternalLink } from 'lucide-react';
import { toast } from 'sonner';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import PricingCard from '@/components/billing/PricingCard';
import UsageStats from '@/components/billing/UsageStats';
import api from '@/services/api';
import { PLANS } from '@/utils/constants';
import type { Subscription, UsageStats as UsageStatsType, SubscriptionTier } from '@/types';

// Price IDs from Stripe - these would come from environment or config
const PRICE_IDS: Record<string, string> = {
  basic: import.meta.env.VITE_STRIPE_BASIC_PRICE_ID || 'price_basic_monthly',
  pro: import.meta.env.VITE_STRIPE_PRO_PRICE_ID || 'price_pro_monthly',
};

export default function BillingPage() {
  const { getToken } = useAuth();
  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const [usage, setUsage] = useState<UsageStatsType | null>(null);
  const [loading, setLoading] = useState(true);
  const [checkoutLoading, setCheckoutLoading] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const token = await getToken();
        api.setToken(token);

        const [subData, usageData] = await Promise.all([
          api.getSubscription().catch(() => null),
          api.getUsage().catch(() => null),
        ]);

        setSubscription(subData);
        setUsage(usageData);
      } catch (error) {
        console.error('Failed to fetch billing data:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [getToken]);

  const handleUpgrade = async (tier: 'basic' | 'pro') => {
    try {
      setCheckoutLoading(tier);
      const token = await getToken();
      api.setToken(token);

      const priceId = PRICE_IDS[tier];
      const { checkout_url } = await api.createCheckout(
        priceId,
        `${window.location.origin}/billing?success=true`,
        `${window.location.origin}/billing?canceled=true`
      );

      window.location.href = checkout_url;
    } catch (error) {
      toast.error('Failed to start checkout');
    } finally {
      setCheckoutLoading(null);
    }
  };

  const handleManageBilling = async () => {
    try {
      const token = await getToken();
      api.setToken(token);

      const { url } = await api.createPortalSession(window.location.href);
      window.location.href = url;
    } catch (error) {
      toast.error('Failed to open billing portal');
    }
  };

  const isCurrentPlan = (tier: SubscriptionTier): boolean => {
    return subscription?.tier === tier;
  };

  if (loading) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
      </div>
    );
  }

  return (
    <div className="h-full overflow-y-auto">
      <div className="mx-auto max-w-5xl px-4 py-8">
        <h1 className="text-2xl font-semibold mb-8">Billing</h1>

        <div className="space-y-8">
          {usage && (
            <Card>
              <CardHeader>
                <CardTitle>Usage This Month</CardTitle>
              </CardHeader>
              <CardContent>
                <UsageStats
                  queriesUsed={usage.queries_used}
                  queriesLimit={usage.queries_limit}
                  documentsCount={usage.documents_used}
                  documentsLimit={usage.documents_limit}
                />
              </CardContent>
            </Card>
          )}

          {subscription && (
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <CreditCard className="h-5 w-5 text-primary" />
                    <CardTitle>Current Subscription</CardTitle>
                  </div>
                  {subscription.tier !== 'free' && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleManageBilling}
                    >
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Manage Billing
                    </Button>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-4">
                  <div>
                    <p className="font-medium capitalize">{subscription.tier} Plan</p>
                    <p className="text-sm text-muted-foreground">
                      Status: <span className="capitalize">{subscription.status}</span>
                      {subscription.cancel_at_period_end && (
                        <span className="text-yellow-500 ml-2">(Cancels at period end)</span>
                      )}
                    </p>
                    {subscription.current_period_end && (
                      <p className="text-xs text-muted-foreground mt-1">
                        Current period ends: {new Date(subscription.current_period_end).toLocaleDateString()}
                      </p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          <div>
            <h2 className="text-xl font-semibold mb-4">Plans</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <PricingCard
                plan={PLANS.FREE}
                isCurrentPlan={isCurrentPlan('free')}
              />
              <PricingCard
                plan={PLANS.BASIC}
                isCurrentPlan={isCurrentPlan('basic')}
                onSelect={() => handleUpgrade('basic')}
                isLoading={checkoutLoading === 'basic'}
              />
              <PricingCard
                plan={PLANS.PRO}
                isCurrentPlan={isCurrentPlan('pro')}
                onSelect={() => handleUpgrade('pro')}
                isLoading={checkoutLoading === 'pro'}
              />
              <PricingCard
                plan={PLANS.ENTERPRISE}
                isCurrentPlan={isCurrentPlan('enterprise')}
                onSelect={() => window.open('mailto:sales@techdocs.ai', '_blank')}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
