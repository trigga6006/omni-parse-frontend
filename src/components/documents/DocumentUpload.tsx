import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, X, FileText, Loader2, CheckCircle, AlertCircle } from 'lucide-react';
import Button from '@/components/ui/Button';
import useUIStore from '@/stores/uiStore';
import useDocuments from '@/hooks/useDocuments';
import { cn } from '@/utils/cn';

export default function DocumentUpload() {
  const { uploadModalOpen, setUploadModalOpen } = useUIStore();
  const { uploadDocument } = useDocuments();
  const [uploading, setUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<'success' | 'error' | null>(null);

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];
      if (!file) return;

      setUploading(true);
      setUploadStatus(null);

      try {
        await uploadDocument(file);
        setUploadStatus('success');
        setTimeout(() => {
          setUploadModalOpen(false);
          setUploadStatus(null);
        }, 1500);
      } catch {
        setUploadStatus('error');
      } finally {
        setUploading(false);
      }
    },
    [uploadDocument, setUploadModalOpen]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
    },
    maxFiles: 1,
    maxSize: 50 * 1024 * 1024,
    disabled: uploading,
  });

  if (!uploadModalOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
        onClick={() => !uploading && setUploadModalOpen(false)}
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
          className="w-full max-w-lg rounded-2xl border border-border bg-background p-6 shadow-xl"
        >
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-xl font-semibold">Upload Document</h2>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setUploadModalOpen(false)}
              disabled={uploading}
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          <div
            {...getRootProps()}
            className={cn(
              'relative flex flex-col items-center justify-center',
              'rounded-xl border-2 border-dashed p-12',
              'transition-colors cursor-pointer',
              isDragActive
                ? 'border-primary bg-primary/5'
                : 'border-border hover:border-primary/50 hover:bg-secondary/30',
              uploading && 'pointer-events-none opacity-50'
            )}
          >
            <input {...getInputProps()} />

            {uploadStatus === 'success' ? (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="flex flex-col items-center"
              >
                <CheckCircle className="h-12 w-12 text-green-500 mb-3" />
                <p className="text-sm font-medium">Upload successful!</p>
              </motion.div>
            ) : uploadStatus === 'error' ? (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="flex flex-col items-center"
              >
                <AlertCircle className="h-12 w-12 text-red-500 mb-3" />
                <p className="text-sm font-medium">Upload failed</p>
                <p className="text-xs text-muted-foreground mt-1">Please try again</p>
              </motion.div>
            ) : uploading ? (
              <div className="flex flex-col items-center">
                <Loader2 className="h-12 w-12 text-primary animate-spin mb-3" />
                <p className="text-sm font-medium">Uploading...</p>
              </div>
            ) : (
              <>
                <div className="mb-4 rounded-full bg-primary/10 p-4">
                  {isDragActive ? (
                    <FileText className="h-8 w-8 text-primary" />
                  ) : (
                    <Upload className="h-8 w-8 text-primary" />
                  )}
                </div>
                <p className="mb-1 text-sm font-medium">
                  {isDragActive ? 'Drop your file here' : 'Drop your PDF here'}
                </p>
                <p className="text-xs text-muted-foreground">
                  or click to browse (max 50MB)
                </p>
              </>
            )}
          </div>

          <div className="mt-4 flex justify-end gap-2">
            <Button
              variant="ghost"
              onClick={() => setUploadModalOpen(false)}
              disabled={uploading}
            >
              Cancel
            </Button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
