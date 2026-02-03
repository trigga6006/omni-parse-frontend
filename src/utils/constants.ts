export const APP_NAME = 'Omni Docs';

export const DOCUMENT_STATUS = {
  PENDING: 'pending',
  PROCESSING: 'processing',
  COMPLETED: 'completed',
  FAILED: 'failed',
} as const;

export const MAX_FILE_SIZE = 50 * 1024 * 1024; // 50MB

export const ACCEPTED_FILE_TYPES = {
  'application/pdf': ['.pdf'],
} as const;

export const ROUTES = {
  HOME: '/',
  CHAT: '/chat',
  DOCUMENTS: '/documents',
  SETTINGS: '/settings',
  BILLING: '/billing',
  SIGN_IN: '/sign-in',
  SIGN_UP: '/sign-up',
  ONBOARDING: '/onboarding',
} as const;

export interface Plan {
  name: string;
  tier: 'free' | 'basic' | 'pro' | 'enterprise';
  price: number;
  queries: number;
  documents: number;
  storage: string;
  features: string[];
}

export const PLANS: Record<string, Plan> = {
  FREE: {
    name: 'Free',
    tier: 'free',
    price: 0,
    queries: 100,
    documents: 10,
    storage: '100 MB',
    features: [
      '100 queries per month',
      '10 documents',
      '100 MB storage',
      'Community support',
    ],
  },
  BASIC: {
    name: 'Basic',
    tier: 'basic',
    price: 19,
    queries: 1000,
    documents: 100,
    storage: '1 GB',
    features: [
      '1,000 queries per month',
      '100 documents',
      '1 GB storage',
      'Email support',
    ],
  },
  PRO: {
    name: 'Pro',
    tier: 'pro',
    price: 49,
    queries: 10000,
    documents: 500,
    storage: '10 GB',
    features: [
      '10,000 queries per month',
      '500 documents',
      '10 GB storage',
      'Priority support',
      'API access',
    ],
  },
  ENTERPRISE: {
    name: 'Enterprise',
    tier: 'enterprise',
    price: 199,
    queries: -1,
    documents: -1,
    storage: 'Unlimited',
    features: [
      'Unlimited queries',
      'Unlimited documents',
      'Unlimited storage',
      'Dedicated support',
      'Custom integrations',
      'SSO & SAML',
      'SLA guarantee',
    ],
  },
};

// Tier limits from API
export const TIER_LIMITS = {
  free: {
    queries: 100,
    documents: 10,
    storage_mb: 100,
  },
  basic: {
    queries: 1000,
    documents: 100,
    storage_mb: 1024,
  },
  pro: {
    queries: 10000,
    documents: 500,
    storage_mb: 10240,
  },
  enterprise: {
    queries: -1,
    documents: -1,
    storage_mb: -1,
  },
} as const;
