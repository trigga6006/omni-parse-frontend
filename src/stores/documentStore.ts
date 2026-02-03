import { create } from 'zustand';
import type { Document } from '@/types';

interface DocumentState {
  documents: Document[];
  isLoading: boolean;
  error: string | null;

  setDocuments: (documents: Document[]) => void;
  setLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;
  addDocument: (document: Document) => void;
  updateDocument: (documentId: string, updates: Partial<Document>) => void;
  removeDocument: (documentId: string) => void;
  getReadyDocuments: () => Document[];
}

const useDocumentStore = create<DocumentState>((set, get) => ({
  documents: [],
  isLoading: false,
  error: null,

  setDocuments: (documents) => set({ documents }),

  setLoading: (isLoading) => set({ isLoading }),

  setError: (error) => set({ error }),

  addDocument: (document) =>
    set((state) => ({
      documents: [document, ...state.documents],
    })),

  updateDocument: (documentId, updates) =>
    set((state) => ({
      documents: state.documents.map((doc) =>
        doc.id === documentId ? { ...doc, ...updates } : doc
      ),
    })),

  removeDocument: (documentId) =>
    set((state) => ({
      documents: state.documents.filter((doc) => doc.id !== documentId),
    })),

  getReadyDocuments: () =>
    get().documents.filter((doc) => doc.status === 'completed'),
}));

export default useDocumentStore;
