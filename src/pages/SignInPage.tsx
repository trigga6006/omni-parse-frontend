import { SignIn } from '@clerk/clerk-react';
import { FileText } from 'lucide-react';

export default function SignInPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4">
      {/* Logo */}
      <div className="mb-8 flex flex-col items-center">
        <div className="mb-4 h-14 w-14 rounded-2xl bg-primary flex items-center justify-center shadow-lg">
          <FileText className="h-7 w-7 text-primary-foreground" />
        </div>
        <h1 className="text-2xl font-bold text-foreground">Omni Docs</h1>
        <p className="text-sm text-muted-foreground mt-1">Sign in to your account</p>
      </div>

      <SignIn
        routing="path"
        path="/sign-in"
        signUpUrl="/sign-up"
        appearance={{
          elements: {
            rootBox: 'mx-auto w-full max-w-md',
            card: 'bg-secondary/50 border border-border shadow-xl rounded-2xl',
            headerTitle: 'text-foreground',
            headerSubtitle: 'text-muted-foreground',
            formButtonPrimary: 'bg-primary hover:bg-primary/90 text-primary-foreground',
            footerActionLink: 'text-primary hover:text-primary/80',
            formFieldInput: 'bg-background border-border text-foreground',
            formFieldLabel: 'text-foreground',
            identityPreviewText: 'text-foreground',
            identityPreviewEditButton: 'text-primary',
          },
        }}
      />
    </div>
  );
}
