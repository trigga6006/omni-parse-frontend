import { Upload, RefreshCw, FileText } from 'lucide-react';
import { motion } from 'framer-motion';
import Button from '@/components/ui/Button';
import DocumentList from '@/components/documents/DocumentList';
import DocumentUpload from '@/components/documents/DocumentUpload';
import useDocuments from '@/hooks/useDocuments';
import useUIStore from '@/stores/uiStore';
import { cn } from '@/utils/cn';

export default function DocumentsPage() {
  const { documents, isLoading, fetchDocuments, deleteDocument } = useDocuments();
  const { setUploadModalOpen } = useUIStore();

  return (
    <div className="h-full overflow-y-auto scrollbar-thin">
      <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
        >
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center">
              <FileText className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground">Documents</h1>
              <p className="text-sm text-muted-foreground">
                Manage your uploaded technical documents
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={() => fetchDocuments()}
              disabled={isLoading}
              className="rounded-xl"
            >
              <RefreshCw className={cn('h-4 w-4 mr-2', isLoading && 'animate-spin')} />
              Refresh
            </Button>
            <Button onClick={() => setUploadModalOpen(true)} className="rounded-xl shadow-sm">
              <Upload className="h-4 w-4 mr-2" />
              Upload
            </Button>
          </div>
        </motion.div>

        {/* Document List */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <DocumentList
            documents={documents}
            isLoading={isLoading}
            onDelete={deleteDocument}
          />
        </motion.div>
      </div>

      <DocumentUpload />
    </div>
  );
}
