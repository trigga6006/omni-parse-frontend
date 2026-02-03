import { useUser, useOrganization } from '@clerk/clerk-react';
import { User, Building2, Bell, Shield, Settings } from 'lucide-react';
import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Toggle from '@/components/ui/Toggle';
import useUIStore from '@/stores/uiStore';

export default function SettingsPage() {
  const { user } = useUser();
  const { organization } = useOrganization();
  const { theme, toggleTheme } = useUIStore();

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.1 },
    }),
  };

  return (
    <div className="h-full overflow-y-auto scrollbar-thin">
      <div className="w-full max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 flex items-center gap-3"
        >
          <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center">
            <Settings className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-foreground">Settings</h1>
            <p className="text-sm text-muted-foreground">
              Manage your account and preferences
            </p>
          </div>
        </motion.div>

        <div className="space-y-6">
          <motion.div custom={0} initial="hidden" animate="visible" variants={cardVariants}>
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center">
                    <User className="h-4 w-4 text-primary" />
                  </div>
                  <CardTitle>Profile</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-foreground">Email</label>
                  <Input
                    value={user?.primaryEmailAddress?.emailAddress || ''}
                    disabled
                    className="mt-1.5"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground">Name</label>
                  <Input
                    value={user?.fullName || ''}
                    disabled
                    className="mt-1.5"
                  />
                </div>
                <Button variant="outline" size="sm" className="rounded-lg">
                  Manage in Clerk
                </Button>
              </CardContent>
            </Card>
          </motion.div>

          {organization && (
            <motion.div custom={1} initial="hidden" animate="visible" variants={cardVariants}>
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Building2 className="h-4 w-4 text-primary" />
                    </div>
                    <CardTitle>Organization</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-foreground">Organization Name</label>
                    <Input
                      value={organization.name}
                      disabled
                      className="mt-1.5"
                    />
                  </div>
                  <Button variant="outline" size="sm" className="rounded-lg">
                    Manage Organization
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          )}

          <motion.div custom={2} initial="hidden" animate="visible" variants={cardVariants}>
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Bell className="h-4 w-4 text-primary" />
                  </div>
                  <CardTitle>Preferences</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-foreground">Dark Mode</p>
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
          </motion.div>

          <motion.div custom={3} initial="hidden" animate="visible" variants={cardVariants}>
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Shield className="h-4 w-4 text-primary" />
                  </div>
                  <CardTitle>Security</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-foreground">Two-Factor Authentication</p>
                    <p className="text-sm text-muted-foreground">
                      Add an extra layer of security
                    </p>
                  </div>
                  <Button variant="outline" size="sm" className="rounded-lg">
                    Configure
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
