import { useUser, useOrganization } from '@clerk/clerk-react';
import { User, Building2, Bell, Shield } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Toggle from '@/components/ui/Toggle';
import useUIStore from '@/stores/uiStore';

export default function SettingsPage() {
  const { user } = useUser();
  const { organization } = useOrganization();
  const { theme, toggleTheme } = useUIStore();

  return (
    <div className="h-full overflow-y-auto">
      <div className="mx-auto max-w-2xl px-4 py-8">
        <h1 className="text-2xl font-semibold mb-8">Settings</h1>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <User className="h-5 w-5 text-primary" />
                <CardTitle>Profile</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium">Email</label>
                <Input
                  value={user?.primaryEmailAddress?.emailAddress || ''}
                  disabled
                  className="mt-1"
                />
              </div>
              <div>
                <label className="text-sm font-medium">Name</label>
                <Input
                  value={user?.fullName || ''}
                  disabled
                  className="mt-1"
                />
              </div>
              <Button variant="outline" size="sm">
                Manage in Clerk
              </Button>
            </CardContent>
          </Card>

          {organization && (
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Building2 className="h-5 w-5 text-primary" />
                  <CardTitle>Organization</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Organization Name</label>
                  <Input
                    value={organization.name}
                    disabled
                    className="mt-1"
                  />
                </div>
                <Button variant="outline" size="sm">
                  Manage Organization
                </Button>
              </CardContent>
            </Card>
          )}

          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Bell className="h-5 w-5 text-primary" />
                <CardTitle>Preferences</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Dark Mode</p>
                  <p className="text-sm text-muted-foreground">
                    Toggle between light and dark theme
                  </p>
                </div>
                <Toggle
                  pressed={theme === 'dark'}
                  onPressedChange={toggleTheme}
                >
                  {theme === 'dark' ? 'Dark' : 'Light'}
                </Toggle>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-primary" />
                <CardTitle>Security</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Two-Factor Authentication</p>
                  <p className="text-sm text-muted-foreground">
                    Add an extra layer of security
                  </p>
                </div>
                <Button variant="outline" size="sm">
                  Configure
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
