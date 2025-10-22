import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabaseClient';

export default function AuthGate({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  if (loading) return null;
  if (!user) {
    return (
      <div style={{ maxWidth: 420, margin: '48px auto' }}>
        <Auth supabaseClient={supabase!} appearance={{ theme: ThemeSupa }} providers={['google']} magicLink redirectTo={window.location.origin} />
      </div>
    );
  }
  return <>{children}</>;
}
