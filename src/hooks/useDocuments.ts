import { useCallback, useEffect, useRef } from 'react';
import { useAuth } from '@clerk/clerk-react';
import { toast } from 'sonner';
import useDocumentStore from '@/stores/documentStore';
import api from '@/services/api';
import type { Document } from '@/types';

export function useDocuments() {
  const { getToken } = useAuth();
  const getTokenRef = useRef(getToken);
  getTokenRef.current = getToken;

  const {
    documents,
    isLoading,
    error,
    setDocuments,
    setLoading,
    setError,
    addDocument,
    updateDocument,
    removeDocument,
    getReadyDocuments,
  } = useDocumentStore();

  const fetchDocuments = useCallback(async (): Promise<void> => {
    try {
      setLoading(true);
      const token = await getTokenRef.current();
      api.setToken(token);
      const response = await api.listDocuments();
      setDocuments(response.documents);
      setError(null);
    } catch (error) {
      console.error('Failed to fetch documents:', error);
      setError(error instanceof Error ? error.message : 'Failed to load documents');
      toast.error('Failed to load documents');
    } finally {
      setLoading(false);
    }
  }, [setDocuments, setLoading, setError]);

  const uploadDocument = useCallback(
    async (file: File, title?: string, description?: string): Promise<void> => {
      try {
        const token = await getTokenRef.current();
        api.setToken(token);
        const response = await api.uploadDocument(file, title, description);

        const newDoc: Document = {
          id: response.id,
          organization_id: '',
          filename: response.filename,
          title: title || null,
          description: description || null,
          file_path: '',
          file_size: file.size,
          mime_type: file.type,
          status: response.status,
          chunk_count: 0,
          error_message: null,
          created_at: new Date().toISOString(),
          updated_at: null,
        };

        addDocument(newDoc);
        toast.success('Document uploaded! Processing started.');

        pollDocumentStatus(response.id);
      } catch (error) {
        console.error('Upload failed:', error);
        toast.error(error instanceof Error ? error.message : 'Failed to upload document');
        throw error;
      }
    },
    [addDocument]
  );

  const pollDocumentStatus = useCallback(
    async (documentId: string): Promise<void> => {
      const maxAttempts = 60;
      let attempts = 0;
      let consecutiveErrors = 0;

      const poll = async (): Promise<void> => {
        try {
          const token = await getTokenRef.current();
          api.setToken(token);
          const doc = await api.getDocument(documentId);
          consecutiveErrors = 0;

          updateDocument(documentId, {
            status: doc.status,
            chunk_count: doc.chunk_count,
            error_message: doc.error_message,
          });

          if (doc.status === 'completed') {
            toast.success(`"${doc.filename}" is ready!`);
            return;
          }

          if (doc.status === 'failed') {
            toast.error(`"${doc.filename}" processing failed: ${doc.error_message || 'Unknown error'}`);
            return;
          }

          attempts++;
          if (attempts < maxAttempts) {
            setTimeout(poll, 5000);
          } else {
            toast.error('Document processing timed out. Try refreshing later.');
          }
        } catch (error) {
          console.error('Status poll failed:', error);
          consecutiveErrors++;

          if (consecutiveErrors >= 3) {
            toast.error('Lost connection to server. Refresh the page to check document status.');
            return;
          }

          attempts++;
          if (attempts < maxAttempts) {
            const backoff = Math.min(5000 * Math.pow(2, consecutiveErrors - 1), 30000);
            setTimeout(poll, backoff);
          }
        }
      };

      setTimeout(poll, 2000);
    },
    [updateDocument]
  );

  const deleteDocument = useCallback(
    async (documentId: string): Promise<void> => {
      try {
        const token = await getTokenRef.current();
        api.setToken(token);
        await api.deleteDocument(documentId);
        removeDocument(documentId);
        toast.success('Document deleted');
      } catch (error) {
        console.error('Delete failed:', error);
        toast.error('Failed to delete document');
        throw error;
      }
    },
    [removeDocument]
  );

  const reprocessDocument = useCallback(
    async (documentId: string): Promise<void> => {
      try {
        const token = await getTokenRef.current();
        api.setToken(token);
        await api.reprocessDocument(documentId);
        updateDocument(documentId, { status: 'pending' });
        toast.success('Document queued for reprocessing');
        pollDocumentStatus(documentId);
      } catch (error) {
        console.error('Reprocess failed:', error);
        toast.error(error instanceof Error ? error.message : 'Failed to reprocess document');
        throw error;
      }
    },
    [updateDocument, pollDocumentStatus]
  );

  useEffect(() => {
    fetchDocuments();
  }, []);

  return {
    documents,
    isLoading,
    error,
    readyDocuments: getReadyDocuments(),
    fetchDocuments,
    uploadDocument,
    deleteDocument,
    reprocessDocument,
  };
}

export default useDocuments;
