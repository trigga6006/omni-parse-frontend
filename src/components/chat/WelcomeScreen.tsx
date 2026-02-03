import { motion } from 'framer-motion';
import { FileText, Search, Zap, MessageSquare, type LucideIcon } from 'lucide-react';

const suggestions = [
  'How do I replace the brake pads?',
  'Torque spec for cylinder head bolts?',
  'Explain the fuel injection system',
];

interface WelcomeScreenProps {
  onSendMessage: (message: string) => void;
}

export default function WelcomeScreen({ onSendMessage }: WelcomeScreenProps) {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center px-4 py-8 sm:py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-2xl text-center"
      >
        {/* Logo */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.1, type: 'spring', stiffness: 200 }}
          className="mb-6 flex justify-center"
        >
          <div className="relative">
            <div className="absolute inset-0 rounded-2xl bg-primary/20 blur-xl" />
            <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-primary/80 text-primary-foreground shadow-lg">
              <FileText className="h-8 w-8" />
            </div>
          </div>
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-2 text-2xl sm:text-3xl font-bold tracking-tight text-foreground"
        >
          Welcome to Omni Docs
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-8 text-sm sm:text-base text-muted-foreground max-w-md mx-auto"
        >
          Your AI assistant for technical documentation
        </motion.p>

        {/* Feature Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-8 grid grid-cols-1 sm:grid-cols-3 gap-3"
        >
          <FeatureCard
            icon={Search}
            title="Smart Search"
            description="Find answers instantly"
          />
          <FeatureCard
            icon={Zap}
            title="Fast & Accurate"
            description="AI-powered results"
          />
          <FeatureCard
            icon={MessageSquare}
            title="Conversational"
            description="Natural follow-ups"
          />
        </motion.div>

        {/* Suggestions - Compact */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="flex flex-wrap justify-center gap-2"
        >
          {suggestions.map((suggestion, index) => (
            <motion.button
              key={suggestion}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 + index * 0.05 }}
              onClick={() => onSendMessage(suggestion)}
              className="rounded-lg border border-border bg-secondary/40 px-3 py-1.5 text-xs text-muted-foreground hover:bg-secondary hover:text-foreground hover:border-primary/30 transition-all"
            >
              {suggestion}
            </motion.button>
          ))}
        </motion.div>
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
    <div className="group rounded-lg border border-border bg-secondary/30 p-4 text-left hover:bg-secondary/50 transition-all">
      <div className="mb-2 inline-flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
        <Icon className="h-4 w-4" />
      </div>
      <h3 className="mb-0.5 text-sm font-semibold text-foreground">{title}</h3>
      <p className="text-xs text-muted-foreground">{description}</p>
    </div>
  );
}
