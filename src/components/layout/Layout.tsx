import { type ReactNode } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import useUIStore from '@/stores/uiStore';
import { cn } from '@/utils/cn';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const { sidebarOpen } = useUIStore();

  return (
    <div className="flex h-screen w-full bg-background text-foreground">
      <Sidebar />
      <div
        className={cn(
          'flex flex-1 flex-col min-h-screen w-full transition-all duration-300 ease-in-out',
          sidebarOpen ? 'md:pl-64' : 'md:pl-16'
        )}
      >
        <Header />
        <main className="flex-1 overflow-auto">{children}</main>
      </div>
    </div>
  );
}
