import { motion } from 'framer-motion';
import { FileText, Search, Zap, MessageSquare, ArrowRight, type LucideIcon } from 'lucide-react';

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
          className="mb-8 flex justify-center"
        >
          <div className="relative">
            <div className="absolute inset-0 rounded-2xl bg-primary/20 blur-xl" />
            <div className="relative flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-primary/80 text-primary-foreground shadow-lg">
              <FileText className="h-10 w-10" />
            </div>
          </div>
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-3 text-3xl sm:text-4xl font-bold tracking-tight text-foreground"
        >
          Welcome to TechDocs AI
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-10 text-base sm:text-lg text-muted-foreground max-w-md mx-auto"
        >
          Your AI assistant for technical documentation. Ask questions, get instant answers.
        </motion.p>

        {/* Feature Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-10 grid grid-cols-1 sm:grid-cols-3 gap-4"
        >
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
        </motion.div>

        {/* Suggestions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="space-y-4"
        >
          <p className="text-sm font-medium text-muted-foreground">Try asking:</p>
          <div className="flex flex-wrap justify-center gap-2">
            {suggestions.map((suggestion, index) => (
              <motion.button
                key={suggestion}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6 + index * 0.1 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => onSendMessage(suggestion)}
                className="group flex items-center gap-2 rounded-full border border-border bg-secondary/50 px-4 py-2.5 text-sm text-foreground hover:bg-secondary hover:border-primary/30 hover:shadow-sm transition-all duration-200"
              >
                <span>{suggestion}</span>
                <ArrowRight className="h-3 w-3 text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 transition-all" />
              </motion.button>
            ))}
          </div>
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
    <div className="group rounded-xl border border-border bg-secondary/30 p-5 text-left hover:bg-secondary/50 hover:border-primary/20 transition-all duration-200">
      <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary group-hover:bg-primary/15 transition-colors">
        <Icon className="h-5 w-5" />
      </div>
      <h3 className="mb-1.5 font-semibold text-foreground">{title}</h3>
      <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
    </div>
  );
}
