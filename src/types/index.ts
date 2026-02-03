// Document types
export interface Document {
  id: string;
  organization_id: string;
  filename: string;
  title: string | null;
  description: string | null;
  file_path: string;
  file_size: number;
  mime_type: string;
  status: DocumentStatus;
  chunk_count: number;
  error_message: string | null;
  created_at: string;
  updated_at: string | null;
}

export type DocumentStatus = 'pending' | 'processing' | 'completed' | 'failed';

// Chat types
export interface Message {
  id: number;
  role: 'user' | 'assistant';
  content: string;
  isStreaming?: boolean;
  timestamp?: string;
  sources?: Source[] | null;
}

export interface Source {
  document_id: string;
  document_title: string;
  chunk_id: string;
  content: string;
  page_number: number | null;
  section_header: string | null;
  relevance_score: number;
}

export interface Session {
  id: string;
  organization_id: string;
  title: string | null;
  created_at: string;
  last_activity: string;
  message_count: number;
  messages?: SessionMessage[];
}

export interface SessionMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
  sources: Source[] | null;
}

// Stream types
export interface StreamChunk {
  type: 'sources' | 'text' | 'done' | 'error';
  content?: string | Source[];
  session_id?: string;
}

// API Response types
export interface ApiError {
  error: string;
  detail?: string;
  code?: string;
}

export interface UploadResponse {
  id: string;
  filename: string;
  status: DocumentStatus;
  message: string;
}

export interface QueryRequest {
  query: string;
  session_id?: string;
  document_ids?: string[];
  top_k?: number;
  include_sources?: boolean;
}

export interface QueryResponse {
  answer: string;
  sources: Source[];
  session_id: string;
  query_id: string;
  cached: boolean;
  processing_time_ms: number;
}

export interface DocumentListResponse {
  documents: Document[];
  total: number;
  page: number;
  page_size: number;
}

export interface SessionListResponse {
  sessions: Session[];
  total: number;
}

// Organization types
export interface Organization {
  id: string;
  clerk_org_id: string;
  name: string;
  subscription_tier: SubscriptionTier;
  document_count: number;
  query_count: number;
  storage_used_mb: number;
  created_at: string;
  updated_at: string | null;
}

export interface OrganizationStats {
  total_documents: number;
  total_chunks: number;
  total_queries: number;
  storage_used_mb: number;
  queries_this_month: number;
  subscription_tier: SubscriptionTier;
}

export interface UsageStats {
  queries_used: number;
  queries_limit: number;
  documents_used: number;
  documents_limit: number;
  storage_used_mb: number;
  storage_limit_mb: number;
}

// Billing types
export type SubscriptionTier = 'free' | 'basic' | 'pro' | 'enterprise';
export type SubscriptionStatus = 'active' | 'past_due' | 'canceled' | 'unpaid';

export interface Subscription {
  tier: SubscriptionTier;
  status: SubscriptionStatus;
  current_period_end: string | null;
  cancel_at_period_end: boolean;
}

export interface CheckoutRequest {
  price_id: string;
  success_url: string;
  cancel_url: string;
}

export interface CheckoutResponse {
  checkout_url: string;
  session_id: string;
}

// UI types
export type Theme = 'light' | 'dark';
