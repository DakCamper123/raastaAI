'use client';

/**
 * NavDrishti - Supabase Authentication Context
 * Manages user auth state, free registration, login, logout, and auth modal triggers across the platform.
 */

import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, Session, AuthError } from '@supabase/supabase-js';
import { supabase } from '@/lib/supabaseClient';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  isAuthenticated: boolean;
  isAuthModalOpen: boolean;
  authModalMode: 'signin' | 'signup';
  modalMessage: string | null;
  openAuthModal: (mode?: 'signin' | 'signup', customMessage?: string) => void;
  closeAuthModal: () => void;
  signInWithEmail: (email: string, password: string) => Promise<{ error: AuthError | null }>;
  signUpWithEmail: (email: string, password: string) => Promise<{ error: AuthError | null; user: User | null; needsConfirmation: boolean }>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState<'signin' | 'signup'>('signin');
  const [modalMessage, setModalMessage] = useState<string | null>(null);

  useEffect(() => {
    // 1. Check existing session on mount
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    // 2. Listen to real-time auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const openAuthModal = (mode: 'signin' | 'signup' = 'signin', customMessage?: string) => {
    setAuthModalMode(mode);
    setModalMessage(customMessage || null);
    setIsAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    setIsAuthModalOpen(false);
    setModalMessage(null);
  };

  const signInWithEmail = async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (!error && data.user) {
        setUser(data.user);
        setSession(data.session);
        closeAuthModal();
      }
      return { error };
    } catch (err: any) {
      return { error: err };
    }
  };

  const signUpWithEmail = async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) {
        // If Supabase mailer failed with "Error sending confirmation email" or "User already registered",
        // attempt instant sign-in since the user might already be created/auto-confirmed in PostgreSQL
        if (
          error.message?.toLowerCase().includes('confirmation email') ||
          error.message?.toLowerCase().includes('already registered')
        ) {
          const signInRes = await supabase.auth.signInWithPassword({
            email,
            password,
          });

          if (!signInRes.error && signInRes.data.user) {
            setUser(signInRes.data.user);
            setSession(signInRes.data.session);
            closeAuthModal();
            return { error: null, user: signInRes.data.user, needsConfirmation: false };
          }
        }
        return { error, user: null, needsConfirmation: false };
      }

      if (data) {
        if (data.session) {
          setUser(data.user);
          setSession(data.session);
          closeAuthModal();
          return { error: null, user: data.user, needsConfirmation: false };
        } else {
          // Attempt immediate login in case user was auto-confirmed via PostgreSQL trigger
          const autoSignIn = await supabase.auth.signInWithPassword({ email, password });
          if (!autoSignIn.error && autoSignIn.data.user) {
            setUser(autoSignIn.data.user);
            setSession(autoSignIn.data.session);
            closeAuthModal();
            return { error: null, user: autoSignIn.data.user, needsConfirmation: false };
          }
          return { error: null, user: data.user, needsConfirmation: true };
        }
      }
      return { error: null, user: null, needsConfirmation: false };
    } catch (err: any) {
      return { error: err, user: null, needsConfirmation: false };
    }
  };

  const signOut = async () => {
    try {
      await supabase.auth.signOut();
      setUser(null);
      setSession(null);
    } catch (err) {
      console.error('Sign out error:', err);
    }
  };

  const value: AuthContextType = {
    user,
    session,
    loading,
    isAuthenticated: !!user,
    isAuthModalOpen,
    authModalMode,
    modalMessage,
    openAuthModal,
    closeAuthModal,
    signInWithEmail,
    signUpWithEmail,
    signOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
