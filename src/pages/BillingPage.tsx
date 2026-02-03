import { useState, useEffect } from 'react';
import { useAuth } from '@clerk/clerk-react';
import { CreditCard, ExternalLink, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
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
        <div className="animate-spin rounded-full h-10 w-10 border-2 border-primary border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="h-full overflow-y-auto scrollbar-thin">
      <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 flex items-center gap-3"
        >
          <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center">
            <CreditCard className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-foreground">Billing</h1>
            <p className="text-sm text-muted-foreground">
              Manage your subscription and usage
            </p>
          </div>
        </motion.div>

        <div className="space-y-8">
          {/* Usage Stats */}
          {usage && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Sparkles className="h-4 w-4 text-primary" />
                    </div>
                    <CardTitle>Usage This Month</CardTitle>
                  </div>
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
            </motion.div>
          )}

          {/* Current Subscription */}
          {subscription && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center">
                        <CreditCard className="h-4 w-4 text-primary" />
                      </div>
                      <CardTitle>Current Subscription</CardTitle>
                    </div>
                    {subscription.tier !== 'free' && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={handleManageBilling}
                        className="rounded-lg"
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
                      <p className="font-semibold text-foreground capitalize">{subscription.tier} Plan</p>
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
            </motion.div>
          )}

          {/* Plans */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h2 className="text-xl font-bold text-foreground mb-4">Plans</h2>
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
          </motion.div>
        </div>
      </div>
    </div>
  );
}
