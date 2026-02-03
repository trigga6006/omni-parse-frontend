import { FileText, Upload } from 'lucide-react';
import { motion } from 'framer-motion';
import DocumentCard from './DocumentCard';
import Button from '@/components/ui/Button';
import useUIStore from '@/stores/uiStore';
import type { Document } from '@/types';

interface DocumentListProps {
  documents: Document[];
  isLoading: boolean;
  onDelete: (id: string) => void;
}

export default function DocumentList({
  documents,
  isLoading,
  onDelete,
}: DocumentListProps) {
  const { setUploadModalOpen } = useUIStore();

  if (isLoading) {
    return (
      <div className="space-y-3">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="h-20 animate-pulse rounded-xl bg-secondary/50"
          />
        ))}
      </div>
    );
  }

  if (documents.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col items-center justify-center py-16 px-4 text-center rounded-2xl border-2 border-dashed border-border bg-secondary/20"
      >
        <div className="h-16 w-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-4">
          <FileText className="h-8 w-8 text-primary/50" />
        </div>
        <h3 className="text-lg font-semibold text-foreground mb-2">No documents yet</h3>
        <p className="text-sm text-muted-foreground mb-6 max-w-sm">
          Upload your first technical document to start asking questions
        </p>
        <Button onClick={() => setUploadModalOpen(true)} className="rounded-xl">
          <Upload className="h-4 w-4 mr-2" />
          Upload Document
        </Button>
      </motion.div>
    );
  }

  return (
    <div className="space-y-3">
      {documents.map((doc, index) => (
        <DocumentCard
          key={doc.id}
          document={doc}
          index={index}
          onDelete={() => onDelete(doc.id)}
        />
      ))}
    </div>
  );
}
