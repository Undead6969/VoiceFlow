
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useTheme } from '@/components/ThemeProvider';
import { useAuth } from '@/contexts/AuthContext';
import { ApiSettings } from '@/components/ApiSettings';
import { Settings, LogOut, Sun, Moon, User, History, Key } from 'lucide-react';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';

interface ProfileDropdownProps {
  apiKey: string;
  model: string;
  onApiKeyChange: (key: string) => void;
  onModelChange: (model: string) => void;
  onHistoryClick?: () => void;
}

export const ProfileDropdown: React.FC<ProfileDropdownProps> = ({
  apiKey,
  model,
  onApiKeyChange,
  onModelChange,
  onHistoryClick
}) => {
  const { theme, setTheme } = useTheme();
  const { user, signOut } = useAuth();
  const [apiSettingsOpen, setApiSettingsOpen] = useState(false);

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  const getUserInitials = () => {
    if (!user?.user_metadata?.full_name) return 'U';
    return user.user_metadata.full_name
      .split(' ')
      .map((name: string) => name[0])
      .join('')
      .toUpperCase();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-10 w-10 rounded-full">
          <Avatar className="h-10 w-10">
            <AvatarImage src={user?.user_metadata?.avatar_url} />
            <AvatarFallback>{getUserInitials()}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <div className="flex items-center justify-start gap-2 p-2">
          <div className="flex flex-col space-y-1 leading-none">
            <p className="font-medium">{user?.user_metadata?.full_name || user?.email}</p>
            <p className="w-[200px] truncate text-sm text-muted-foreground">
              {user?.email}
            </p>
          </div>
        </div>
        <DropdownMenuSeparator />
        {onHistoryClick && (
          <DropdownMenuItem onClick={onHistoryClick}>
            <History className="mr-2 h-4 w-4" />
            <span>History</span>
          </DropdownMenuItem>
        )}
        <Dialog open={apiSettingsOpen} onOpenChange={setApiSettingsOpen}>
          <DialogTrigger asChild>
            <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
              <Key className="mr-2 h-4 w-4" />
              <span>API Settings</span>
            </DropdownMenuItem>
          </DialogTrigger>
          <DialogContent>
            <ApiSettings
              apiKey={apiKey}
              model={model}
              onApiKeyChange={onApiKeyChange}
              onModelChange={onModelChange}
            />
          </DialogContent>
        </Dialog>
        <DropdownMenuItem onClick={toggleTheme}>
          {theme === 'light' ? (
            <Moon className="mr-2 h-4 w-4" />
          ) : (
            <Sun className="mr-2 h-4 w-4" />
          )}
          <span>{theme === 'light' ? 'Dark' : 'Light'} mode</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={signOut}>
          <LogOut className="mr-2 h-4 w-4" />
          <span>Sign out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
