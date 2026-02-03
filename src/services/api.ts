import type {
  Document,
  UploadResponse,
  DocumentListResponse,
  QueryRequest,
  QueryResponse,
  Session,
  SessionListResponse,
  Subscription,
  UsageStats,
  Organization,
  OrganizationStats,
  CheckoutResponse,
} from '@/types';

const API_URL = import.meta.env.VITE_API_URL;
const API_PREFIX = '/api/v1';

interface RequestOptions extends RequestInit {
  headers?: Record<string, string>;
}

class ApiClient {
  private baseUrl: string;
  private token: string | null = null;

  constructor() {
    this.baseUrl = `${API_URL}${API_PREFIX}`;
  }

  setToken(token: string | null): void {
    this.token = token;
  }

  async request<T>(endpoint: string, options: RequestOptions = {}): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`;

    const headers: Record<string, string> = {
      ...options.headers,
    };

    if (this.token) {
      headers['Authorization'] = `Bearer ${this.token}`;
    }

    if (!(options.body instanceof FormData)) {
      headers['Content-Type'] = 'application/json';
    }

    const response = await fetch(url, {
      ...options,
      headers,
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      throw new Error(error.error || error.detail || `Request failed: ${response.status}`);
    }

    // Handle 204 No Content
    if (response.status === 204) {
      return {} as T;
    }

    return response.json();
  }

  // Sessions
  async createSession(title?: string): Promise<Session> {
    return this.request('/sessions', {
      method: 'POST',
      body: JSON.stringify({ title }),
    });
  }

  async getSession(sessionId: string): Promise<Session> {
    return this.request(`/sessions/${sessionId}`);
  }

  async listSessions(limit: number = 20, offset: number = 0): Promise<SessionListResponse> {
    return this.request(`/sessions?limit=${limit}&offset=${offset}`);
  }

  async updateSession(sessionId: string, title: string): Promise<Session> {
    return this.request(`/sessions/${sessionId}?title=${encodeURIComponent(title)}`, {
      method: 'PATCH',
    });
  }

  async deleteSession(sessionId: string): Promise<void> {
    return this.request(`/sessions/${sessionId}`, { method: 'DELETE' });
  }

  // Documents
  async uploadDocument(file: File, title?: string, description?: string): Promise<UploadResponse> {
    const formData = new FormData();
    formData.append('file', file);
    if (title) formData.append('title', title);
    if (description) formData.append('description', description);

    return this.request('/documents/upload', {
      method: 'POST',
      body: formData,
    });
  }

  async listDocuments(
    page: number = 1,
    pageSize: number = 20,
    status?: string
  ): Promise<DocumentListResponse> {
    let url = `/documents?page=${page}&page_size=${pageSize}`;
    if (status) url += `&status=${status}`;
    return this.request(url);
  }

  async getDocument(documentId: string): Promise<Document> {
    return this.request(`/documents/${documentId}`);
  }

  async deleteDocument(documentId: string): Promise<void> {
    return this.request(`/documents/${documentId}`, { method: 'DELETE' });
  }

  async reprocessDocument(documentId: string): Promise<UploadResponse> {
    return this.request(`/documents/${documentId}/reprocess`, { method: 'POST' });
  }

  // Query (non-streaming)
  async query(request: QueryRequest): Promise<QueryResponse> {
    return this.request('/query', {
      method: 'POST',
      body: JSON.stringify(request),
    });
  }

  async getQueryHistory(
    limit: number = 20,
    offset: number = 0,
    sessionId?: string
  ): Promise<Array<{ id: string; query: string; answer: string; created_at: string }>> {
    let url = `/query/history?limit=${limit}&offset=${offset}`;
    if (sessionId) url += `&session_id=${sessionId}`;
    return this.request(url);
  }

  // Organizations
  async getCurrentOrganization(): Promise<Organization> {
    return this.request('/organizations/current');
  }

  async getOrgStats(): Promise<OrganizationStats> {
    return this.request('/organizations/current/stats');
  }

  async getUsage(): Promise<UsageStats> {
    return this.request('/organizations/current/usage');
  }

  async updateOrganization(name: string): Promise<Organization> {
    return this.request(`/organizations/current?name=${encodeURIComponent(name)}`, {
      method: 'PATCH',
    });
  }

  // Billing
  async createCheckout(
    priceId: string,
    successUrl: string,
    cancelUrl: string
  ): Promise<CheckoutResponse> {
    return this.request('/billing/checkout', {
      method: 'POST',
      body: JSON.stringify({
        price_id: priceId,
        success_url: successUrl,
        cancel_url: cancelUrl,
      }),
    });
  }

  async getSubscription(): Promise<Subscription> {
    return this.request('/billing/subscription');
  }

  async createPortalSession(returnUrl: string): Promise<{ url: string }> {
    return this.request(`/billing/portal?return_url=${encodeURIComponent(returnUrl)}`, {
      method: 'POST',
    });
  }
}

export const api = new ApiClient();
export default api;
