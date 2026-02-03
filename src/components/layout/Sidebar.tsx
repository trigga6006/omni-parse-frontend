import { Link, useLocation, useNavigate } from 'react-router-dom';
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
  const navigate = useNavigate();
  const { sidebarOpen, toggleSidebar, setUploadModalOpen } = useUIStore();
  const { resetSession } = useChatStore();

  const handleNewChat = () => {
    resetSession();
    navigate('/');
  };

  return (
    <>
      {/* Mobile overlay */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm md:hidden"
            onClick={toggleSidebar}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.aside
        initial={false}
        animate={{ width: sidebarOpen ? 256 : 64 }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        className={cn(
          'fixed left-0 top-0 z-50 flex h-full flex-col',
          'bg-secondary/95 backdrop-blur-sm border-r border-border',
          !sidebarOpen && 'items-center',
          // Hide collapsed sidebar on mobile
          !sidebarOpen && 'hidden md:flex'
        )}
      >
        {/* Logo & Toggle */}
        <div className="flex h-16 items-center justify-between px-4 border-b border-border">
          {sidebarOpen ? (
            <Link to="/" className="flex items-center gap-2.5 group">
              <div className="h-9 w-9 rounded-xl bg-primary flex items-center justify-center shadow-sm group-hover:shadow-md transition-shadow">
                <FileText className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="font-semibold text-foreground">TechDocs AI</span>
            </Link>
          ) : (
            <Link to="/" className="group">
              <div className="h-9 w-9 rounded-xl bg-primary flex items-center justify-center shadow-sm group-hover:shadow-md transition-shadow">
                <FileText className="h-5 w-5 text-primary-foreground" />
              </div>
            </Link>
          )}

          <Button
            variant="ghost"
            size="icon"
            onClick={toggleSidebar}
            className={cn('h-8 w-8 rounded-lg', !sidebarOpen && 'hidden md:flex mt-2')}
          >
            {sidebarOpen ? (
              <PanelLeftClose className="h-4 w-4" />
            ) : (
              <PanelLeft className="h-4 w-4" />
            )}
          </Button>
        </div>

        {/* Action Buttons */}
        <div className="p-3 space-y-2">
          <Button
            onClick={handleNewChat}
            className={cn(
              'w-full justify-start gap-2.5 h-10 rounded-xl shadow-sm',
              !sidebarOpen && 'justify-center px-0 w-10'
            )}
          >
            <Plus className="h-4 w-4" />
            {sidebarOpen && <span>New Chat</span>}
          </Button>

          <Button
            variant="outline"
            onClick={() => setUploadModalOpen(true)}
            className={cn(
              'w-full justify-start gap-2.5 h-10 rounded-xl',
              !sidebarOpen && 'justify-center px-0 w-10'
            )}
          >
            <Upload className="h-4 w-4" />
            {sidebarOpen && <span>Upload</span>}
          </Button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-3 pt-2">
          <ul className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;

              return (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className={cn(
                      'flex items-center gap-3 rounded-xl px-3 py-2.5',
                      'text-sm font-medium transition-all duration-200',
                      isActive
                        ? 'bg-primary/10 text-primary shadow-sm'
                        : 'text-muted-foreground hover:bg-accent hover:text-foreground',
                      !sidebarOpen && 'justify-center px-0 w-10'
                    )}
                  >
                    <Icon className={cn('h-5 w-5 flex-shrink-0', isActive && 'text-primary')} />
                    {sidebarOpen && item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Footer */}
        {sidebarOpen && (
          <div className="p-4 border-t border-border">
            <p className="text-xs text-muted-foreground">
              Powered by AI
            </p>
          </div>
        )}
      </motion.aside>
    </>
  );
}
