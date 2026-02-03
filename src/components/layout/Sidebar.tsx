import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MessageSquare,
  FileText,
  Settings,
  CreditCard,
  PanelLeftClose,
  PanelLeft,
  Plus,
  Upload,
} from 'lucide-react';
import { cn } from '@/utils/cn';
import Button from '@/components/ui/Button';
import useUIStore from '@/stores/uiStore';
import useChatStore from '@/stores/chatStore';

const navItems = [
  { icon: MessageSquare, label: 'Chat', path: '/' },
  { icon: FileText, label: 'Documents', path: '/documents' },
  { icon: Settings, label: 'Settings', path: '/settings' },
  { icon: CreditCard, label: 'Billing', path: '/billing' },
];

export default function Sidebar() {
  const location = useLocation();
  const { sidebarOpen, toggleSidebar, setUploadModalOpen } = useUIStore();
  const { resetSession } = useChatStore();

  const handleNewChat = () => {
    resetSession();
  };

  return (
    <>
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-black/50 md:hidden"
            onClick={toggleSidebar}
          />
        )}
      </AnimatePresence>

      <motion.aside
        initial={false}
        animate={{ width: sidebarOpen ? 256 : 64 }}
        className={cn(
          'fixed left-0 top-0 z-50 flex h-full flex-col',
          'bg-secondary border-r border-border',
          'transition-all duration-300',
          !sidebarOpen && 'items-center'
        )}
      >
        <div className="flex h-16 items-center justify-between px-4 border-b border-border">
          {sidebarOpen ? (
            <Link to="/" className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
                <FileText className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="font-semibold">TechDocs AI</span>
            </Link>
          ) : (
            <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
              <FileText className="h-5 w-5 text-primary-foreground" />
            </div>
          )}

          <Button
            variant="ghost"
            size="icon"
            onClick={toggleSidebar}
            className={cn('h-8 w-8', !sidebarOpen && 'hidden md:flex')}
          >
            {sidebarOpen ? (
              <PanelLeftClose className="h-4 w-4" />
            ) : (
              <PanelLeft className="h-4 w-4" />
            )}
          </Button>
        </div>

        <div className="p-3 space-y-2">
          <Button
            onClick={handleNewChat}
            className={cn(
              'w-full justify-start gap-2',
              !sidebarOpen && 'justify-center px-0'
            )}
          >
            <Plus className="h-4 w-4" />
            {sidebarOpen && 'New Chat'}
          </Button>

          <Button
            variant="outline"
            onClick={() => setUploadModalOpen(true)}
            className={cn(
              'w-full justify-start gap-2',
              !sidebarOpen && 'justify-center px-0'
            )}
          >
            <Upload className="h-4 w-4" />
            {sidebarOpen && 'Upload'}
          </Button>
        </div>

        <nav className="flex-1 p-3">
          <ul className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;

              return (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className={cn(
                      'flex items-center gap-3 rounded-lg px-3 py-2',
                      'text-sm font-medium transition-colors',
                      isActive
                        ? 'bg-accent text-accent-foreground'
                        : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground',
                      !sidebarOpen && 'justify-center px-0'
                    )}
                  >
                    <Icon className="h-5 w-5 flex-shrink-0" />
                    {sidebarOpen && item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {sidebarOpen && (
          <div className="p-4 border-t border-border">
            <p className="text-xs text-muted-foreground">
              TechDocs AI
            </p>
          </div>
        )}
      </motion.aside>
    </>
  );
}
