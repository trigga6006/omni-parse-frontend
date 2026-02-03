import { UserButton, useOrganization, OrganizationSwitcher } from '@clerk/clerk-react';
import { Moon, Sun, Sparkles } from 'lucide-react';
import Button from '@/components/ui/Button';
import useUIStore from '@/stores/uiStore';

export default function Header() {
  const { theme, toggleTheme } = useUIStore();
  const { organization } = useOrganization();

  return (
    <header className="sticky top-0 z-30 h-16 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="flex h-full items-center justify-between px-4 sm:px-6">
        <div className="flex items-center gap-3">
          <OrganizationSwitcher
            appearance={{
              elements: {
                rootBox: 'flex items-center',
                organizationSwitcherTrigger: 'px-3 py-2 rounded-lg border border-border hover:bg-secondary transition-colors',
              },
            }}
            hidePersonal={true}
            afterSelectOrganizationUrl="/"
          />
          {organization && (
            <div className="hidden sm:flex items-center gap-2 text-xs text-muted-foreground">
              <Sparkles className="h-3 w-3" />
              <span>AI-powered docs</span>
            </div>
          )}
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            className="h-9 w-9 rounded-lg"
          >
            {theme === 'dark' ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
          </Button>

          <UserButton
            appearance={{
              elements: {
                avatarBox: 'h-9 w-9 rounded-lg',
              },
            }}
          />
        </div>
      </div>
    </header>
  );
}
