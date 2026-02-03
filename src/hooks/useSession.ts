import { useCallback, useState } from 'react';
import { useAuth } from '@clerk/clerk-react';
import { toast } from 'sonner';
import api from '@/services/api';
import type { Session } from '@/types';

export function useSession() {
  const { getToken } = useAuth();
  const [sessions, setSessions] = useState<Session[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [total, setTotal] = useState(0);

  const fetchSessions = useCallback(
    async (limit: number = 20, offset: number = 0) => {
      try {
        setIsLoading(true);
        const token = await getToken();
        api.setToken(token);
        const response = await api.listSessions(limit, offset);
        setSessions(response.sessions);
        setTotal(response.total);
      } catch (error) {
        console.error('Failed to fetch sessions:', error);
        toast.error('Failed to load sessions');
      } finally {
        setIsLoading(false);
      }
    },
    [getToken]
  );

  const getSession = useCallback(
    async (sessionId: string): Promise<Session | null> => {
      try {
        const token = await getToken();
        api.setToken(token);
        return await api.getSession(sessionId);
      } catch (error) {
        console.error('Failed to get session:', error);
        toast.error('Failed to load session');
        return null;
      }
    },
    [getToken]
  );

  const createSession = useCallback(
    async (title?: string): Promise<Session | null> => {
      try {
        const token = await getToken();
        api.setToken(token);
        const session = await api.createSession(title);
        setSessions((prev) => [session, ...prev]);
        return session;
      } catch (error) {
        console.error('Failed to create session:', error);
        toast.error('Failed to create session');
        return null;
      }
    },
    [getToken]
  );

  const updateSessionTitle = useCallback(
    async (sessionId: string, title: string): Promise<Session | null> => {
      try {
        const token = await getToken();
        api.setToken(token);
        const updated = await api.updateSession(sessionId, title);
        setSessions((prev) =>
          prev.map((s) => (s.id === sessionId ? updated : s))
        );
        return updated;
      } catch (error) {
        console.error('Failed to update session:', error);
        toast.error('Failed to update session');
        return null;
      }
    },
    [getToken]
  );

  const deleteSession = useCallback(
    async (sessionId: string): Promise<boolean> => {
      try {
        const token = await getToken();
        api.setToken(token);
        await api.deleteSession(sessionId);
        setSessions((prev) => prev.filter((s) => s.id !== sessionId));
        toast.success('Session deleted');
        return true;
      } catch (error) {
        console.error('Failed to delete session:', error);
        toast.error('Failed to delete session');
        return false;
      }
    },
    [getToken]
  );

  return {
    sessions,
    total,
    isLoading,
    fetchSessions,
    getSession,
    createSession,
    updateSessionTitle,
    deleteSession,
  };
}

export default useSession;
