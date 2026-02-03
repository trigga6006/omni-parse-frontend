import { Upload, RefreshCw } from 'lucide-react';
import Button from '@/components/ui/Button';
import DocumentList from '@/components/documents/DocumentList';
import DocumentUpload from '@/components/documents/DocumentUpload';
import useDocuments from '@/hooks/useDocuments';
import useUIStore from '@/stores/uiStore';

export default function DocumentsPage() {
  const { documents, isLoading, fetchDocuments, deleteDocument } = useDocuments();
  const { setUploadModalOpen } = useUIStore();

  return (
    <div className="h-full overflow-y-auto">
      <div className="mx-auto max-w-4xl px-4 py-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold">Documents</h1>
            <p className="text-muted-foreground mt-1">
              Manage your uploaded documents
            </p>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={() => fetchDocuments()}
              disabled={isLoading}
            >
              <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
              Refresh
            </Button>
            <Button onClick={() => setUploadModalOpen(true)}>
              <Upload className="h-4 w-4 mr-2" />
              Upload
            </Button>
          </div>
        </div>

        <DocumentList
          documents={documents}
          isLoading={isLoading}
          onDelete={deleteDocument}
        />
      </div>

      <DocumentUpload />
    </div>
  );
}
