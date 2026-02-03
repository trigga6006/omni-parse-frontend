import { useCallback, useEffect } from 'react';
import { useAuth } from '@clerk/clerk-react';
import { toast } from 'sonner';
import useDocumentStore from '@/stores/documentStore';
import api from '@/services/api';
import type { Document } from '@/types';

export function useDocuments() {
  const { getToken } = useAuth();
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
      const token = await getToken();
      api.setToken(token);
      const response = await api.listDocuments();
      setDocuments(response.documents);
    } catch (error) {
      console.error('Failed to fetch documents:', error);
      setError(error instanceof Error ? error.message : 'Failed to load documents');
      toast.error('Failed to load documents');
    } finally {
      setLoading(false);
    }
  }, [getToken, setDocuments, setLoading, setError]);

  const uploadDocument = useCallback(
    async (file: File, title?: string, description?: string): Promise<void> => {
      try {
        const token = await getToken();
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
    [getToken, addDocument]
  );

  const pollDocumentStatus = useCallback(
    async (documentId: string): Promise<void> => {
      const maxAttempts = 60;
      let attempts = 0;

      const poll = async (): Promise<void> => {
        try {
          const token = await getToken();
          api.setToken(token);
          const doc = await api.getDocument(documentId);

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
            setTimeout(poll, 3000);
          }
        } catch (error) {
          console.error('Status poll failed:', error);
        }
      };

      setTimeout(poll, 2000);
    },
    [getToken, updateDocument]
  );

  const deleteDocument = useCallback(
    async (documentId: string): Promise<void> => {
      try {
        const token = await getToken();
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
    [getToken, removeDocument]
  );

  const reprocessDocument = useCallback(
    async (documentId: string): Promise<void> => {
      try {
        const token = await getToken();
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
    [getToken, updateDocument, pollDocumentStatus]
  );

  useEffect(() => {
    fetchDocuments();
  }, [fetchDocuments]);

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
