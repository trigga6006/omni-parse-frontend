import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FileText, Upload, MessageSquare, ArrowRight, Check } from 'lucide-react';
import Button from '@/components/ui/Button';
import useUIStore from '@/stores/uiStore';
import { cn } from '@/utils/cn';

const steps = [
  {
    icon: FileText,
    title: 'Welcome to TechDocs AI',
    description:
      'Your AI-powered assistant for technical documentation. Ask questions about your manuals and get instant, accurate answers with source citations.',
  },
  {
    icon: Upload,
    title: 'Upload Your Documents',
    description:
      'Start by uploading your technical documents in PDF format. We support manuals, guides, specifications, and more.',
  },
  {
    icon: MessageSquare,
    title: 'Start Asking Questions',
    description:
      'Once your documents are processed, simply ask questions in natural language. Our AI will find the relevant information and cite its sources.',
  },
];

export default function OnboardingPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const navigate = useNavigate();
  const { setUploadModalOpen } = useUIStore();

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setUploadModalOpen(true);
      navigate('/');
    }
  };

  const step = steps[currentStep];
  const Icon = step.icon;

  return (
    <div className="flex h-full items-center justify-center px-4">
      <motion.div
        key={currentStep}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className="max-w-md text-center"
      >
        <div className="mb-6 flex justify-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary">
            <Icon className="h-8 w-8" />
          </div>
        </div>

        <h1 className="mb-4 text-2xl font-semibold">{step.title}</h1>
        <p className="mb-8 text-muted-foreground">{step.description}</p>

        <div className="mb-8 flex justify-center gap-2">
          {steps.map((_, index) => (
            <div
              key={index}
              className={cn(
                'h-2 w-2 rounded-full transition-colors',
                index === currentStep ? 'bg-primary' : 'bg-muted'
              )}
            />
          ))}
        </div>

        <div className="flex justify-center gap-4">
          {currentStep > 0 && (
            <Button
              variant="outline"
              onClick={() => setCurrentStep(currentStep - 1)}
            >
              Back
            </Button>
          )}
          <Button onClick={handleNext}>
            {currentStep === steps.length - 1 ? (
              <>
                Get Started
                <Check className="ml-2 h-4 w-4" />
              </>
            ) : (
              <>
                Next
                <ArrowRight className="ml-2 h-4 w-4" />
              </>
            )}
          </Button>
        </div>
      </motion.div>
    </div>
  );
}
