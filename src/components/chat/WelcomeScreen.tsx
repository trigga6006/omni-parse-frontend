import { motion } from 'framer-motion';
import { FileText, Search, Zap, MessageSquare, type LucideIcon } from 'lucide-react';

const suggestions = [
  'How do I replace the brake pads?',
  "What's the torque spec for the cylinder head bolts?",
  'Explain the fuel injection system',
  'What tools do I need for a timing belt replacement?',
];

interface WelcomeScreenProps {
  onSendMessage: (message: string) => void;
}

export default function WelcomeScreen({ onSendMessage }: WelcomeScreenProps) {
  return (
    <div className="flex h-full flex-col items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-2xl text-center"
      >
        <div className="mb-6 flex justify-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary">
            <FileText className="h-8 w-8" />
          </div>
        </div>

        <h1 className="mb-2 text-3xl font-semibold tracking-tight">TechDocs AI</h1>
        <p className="mb-8 text-lg text-muted-foreground">
          Your AI assistant for technical documentation
        </p>

        <div className="mb-8 grid grid-cols-1 md:grid-cols-3 gap-4 text-left">
          <FeatureCard
            icon={Search}
            title="Smart Search"
            description="Find answers across all your documents instantly"
          />
          <FeatureCard
            icon={Zap}
            title="Fast & Accurate"
            description="Powered by advanced AI for precise results"
          />
          <FeatureCard
            icon={MessageSquare}
            title="Natural Conversation"
            description="Ask follow-up questions naturally"
          />
        </div>

        <div className="space-y-3">
          <p className="text-sm text-muted-foreground">Try asking:</p>
          <div className="flex flex-wrap justify-center gap-2">
            {suggestions.map((suggestion, index) => (
              <motion.button
                key={suggestion}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
                onClick={() => onSendMessage(suggestion)}
                className="rounded-full border border-border bg-secondary/50 px-4 py-2 text-sm
                           hover:bg-secondary hover:border-primary/50 transition-colors"
              >
                {suggestion}
              </motion.button>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

function FeatureCard({ icon: Icon, title, description }: FeatureCardProps) {
  return (
    <div className="rounded-xl border border-border bg-secondary/30 p-4">
      <Icon className="mb-2 h-5 w-5 text-primary" />
      <h3 className="mb-1 font-medium">{title}</h3>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  );
}
