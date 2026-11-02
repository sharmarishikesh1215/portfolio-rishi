import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase, isSupabaseConfigured } from '../lib/supabase';

interface User {
  id: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  isAdmin: boolean;
  isSupabaseConnected: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const LOCAL_ADMIN_KEY = 'rishi_admin_session';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function initAuth() {
      if (isSupabaseConfigured && supabase) {
        try {
          const { data: { session } } = await supabase.auth.getSession();
          if (session?.user) {
            setUser({
              id: session.user.id,
              email: session.user.email || '',
            });
          }
          const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            if (session?.user) {
              setUser({
                id: session.user.id,
                email: session.user.email || '',
              });
            } else {
              setUser(null);
            }
          });
          setLoading(false);
          return () => {
            subscription.unsubscribe();
          };
        } catch (err) {
          console.warn('Supabase auth check failed:', err);
        }
      }

      // Local admin session check fallback
      try {
        const localSession = localStorage.getItem(LOCAL_ADMIN_KEY);
        if (localSession) {
          const parsed = JSON.parse(localSession);
          if (parsed && parsed.email) {
            setUser(parsed);
          }
        }
      } catch (err) {
        console.error(err);
      }
      setLoading(false);
    }

    initAuth();
  }, []);

  const login = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    // If Supabase is configured, use real Supabase authentication
    if (isSupabaseConfigured && supabase) {
      try {
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) {
          return { success: false, error: error.message };
        }
        if (data.user) {
          setUser({
            id: data.user.id,
            email: data.user.email || '',
          });
          return { success: true };
        }
      } catch (err: any) {
        return { success: false, error: err.message || 'Authentication failed' };
      }
    }

    // Default built-in local administrator credentials for initial evaluation / offline use
    // Default admin: admin@rishi.dev / admin123 or QualityEngineer2026!
    const validEmails = ['admin@rishi.dev', 'rishi.sqe@example.com', 'admin@example.com'];
    if (validEmails.includes(email.toLowerCase()) && (password === 'QualityFirst2026!' || password === 'admin123' || password === 'rishi2026')) {
      const adminUser: User = {
        id: 'usr_admin_local',
        email: email.toLowerCase(),
      };
      setUser(adminUser);
      localStorage.setItem(LOCAL_ADMIN_KEY, JSON.stringify(adminUser));
      return { success: true };
    }

    return {
      success: false,
      error: 'Invalid credentials. Please use admin@rishi.dev / QualityFirst2026! or your Supabase credentials.',
    };
  };

  const logout = async () => {
    if (isSupabaseConfigured && supabase) {
      try {
        await supabase.auth.signOut();
      } catch (err) {
        console.error('Logout error:', err);
      }
    }
    localStorage.removeItem(LOCAL_ADMIN_KEY);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isAdmin: Boolean(user),
        isSupabaseConnected: isSupabaseConfigured,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

