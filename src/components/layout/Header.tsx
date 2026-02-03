import { UserButton, useOrganization } from '@clerk/clerk-react';
import { Moon, Sun } from 'lucide-react';
import Button from '@/components/ui/Button';
import useUIStore from '@/stores/uiStore';

export default function Header() {
  const { theme, toggleTheme } = useUIStore();
  const { organization } = useOrganization();

  return (
    <header className="h-16 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-full items-center justify-between px-4">
        <div className="flex items-center gap-4">
          {organization && (
            <span className="text-sm font-medium text-muted-foreground">
              {organization.name}
            </span>
          )}
        </div>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={toggleTheme}>
            {theme === 'dark' ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
          </Button>

          <UserButton
            appearance={{
              elements: {
                avatarBox: 'h-9 w-9',
              },
            }}
          />
        </div>
      </div>
    </header>
  );
}
