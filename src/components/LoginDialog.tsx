
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { Chrome } from 'lucide-react';

interface LoginDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LoginDialog: React.FC<LoginDialogProps> = ({ isOpen, onClose }) => {
  const { signInWithGoogle } = useAuth();

  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle();
      onClose();
    } catch (error) {
      console.error('Error signing in:', error);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center">Sign in to VoiceFlow</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 text-center">
          <p className="text-muted-foreground">
            Sign in to save your transcriptions and access them from anywhere.
          </p>
          <Button onClick={handleGoogleSignIn} className="w-full" size="lg">
            <Chrome className="w-5 h-5 mr-2" />
            Continue with Google
          </Button>
          <p className="text-xs text-muted-foreground">
            By signing in, you agree to our Terms of Service and Privacy Policy.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};
