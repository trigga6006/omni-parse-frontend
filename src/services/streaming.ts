import type { StreamChunk, Source } from '@/types';

const API_URL = import.meta.env.VITE_API_URL;
const API_PREFIX = '/api/v1';

export interface StreamQueryOptions {
  query: string;
  session_id?: string | null;
  document_ids?: string[] | null;
  top_k?: number;
  include_sources?: boolean;
}

export async function* streamQuery(
  token: string,
  options: StreamQueryOptions
): AsyncGenerator<StreamChunk> {
  const { query, session_id, document_ids, top_k = 5, include_sources = true } = options;

  const response = await fetch(`${API_URL}${API_PREFIX}/query/stream`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query,
      session_id,
      document_ids,
      top_k,
      include_sources,
    }),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.error || error.detail || `Query failed: ${response.status}`);
  }

  const reader = response.body?.getReader();
  if (!reader) {
    throw new Error('No response body');
  }

  const decoder = new TextDecoder();
  let buffer = '';

  while (true) {
    const { done, value } = await reader.read();

    if (done) break;

    buffer += decoder.decode(value, { stream: true });
    const lines = buffer.split('\n');

    // Keep the last potentially incomplete line in buffer
    buffer = lines.pop() || '';

    for (const line of lines) {
      if (line.startsWith('data: ')) {
        try {
          const data = JSON.parse(line.slice(6));
          yield data as StreamChunk;
        } catch (e) {
          console.error('Failed to parse SSE data:', e);
        }
      }
    }
  }

  // Process any remaining data
  if (buffer.startsWith('data: ')) {
    try {
      const data = JSON.parse(buffer.slice(6));
      yield data as StreamChunk;
    } catch {
      // Ignore incomplete data
    }
  }
}

// Helper to extract sources from stream chunk
export function extractSources(chunk: StreamChunk): Source[] | null {
  if (chunk.type === 'sources' && Array.isArray(chunk.content)) {
    return chunk.content as Source[];
  }
  return null;
}

// Helper to extract text content from stream chunk
export function extractText(chunk: StreamChunk): string | null {
  if (chunk.type === 'text' && typeof chunk.content === 'string') {
    return chunk.content;
  }
  return null;
}
