'use client';

/**
 * NavDrishti - Cyber-HUD Authentication Modal
 * Glassmorphic Supabase modal providing free registration and login with real-time feedback.
 */

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { GlowButton } from '@/components/ui/GlowButton';
import {
  X,
  Lock,
  Mail,
  Eye,
  EyeOff,
  ShieldCheck,
  Zap,
  CheckCircle2,
  AlertCircle,
  Sparkles,
} from 'lucide-react';

export function AuthModal() {
  const {
    isAuthModalOpen,
    closeAuthModal,
    authModalMode,
    modalMessage,
    signInWithEmail,
    signUpWithEmail,
  } = useAuth();

  const [mode, setMode] = useState<'signin' | 'signup'>(authModalMode);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [signupSuccess, setSignupSuccess] = useState(false);
  const [confirmationNotice, setConfirmationNotice] = useState(false);

  useEffect(() => {
    setMode(authModalMode);
    setErrorMsg(null);
    setSignupSuccess(false);
    setConfirmationNotice(false);
  }, [authModalMode, isAuthModalOpen]);

  // Handle Escape key to close modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isAuthModalOpen) {
        closeAuthModal();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isAuthModalOpen, closeAuthModal]);

  if (!isAuthModalOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (!email || !email.includes('@')) {
      setErrorMsg('Please enter a valid email address.');
      return;
    }

    if (!password || password.length < 6) {
      setErrorMsg('Password must be at least 6 characters long.');
      return;
    }

    setLoading(true);

    if (mode === 'signin') {
      const { error } = await signInWithEmail(email, password);
      setLoading(false);
      if (error) {
        setErrorMsg(error.message || 'Failed to sign in. Please verify your credentials.');
      }
    } else {
      const { error, needsConfirmation } = await signUpWithEmail(email, password);
      setLoading(false);
      if (error) {
        setErrorMsg(error.message || 'Failed to create account. Please try again.');
      } else if (needsConfirmation) {
        setConfirmationNotice(true);
      } else {
        setSignupSuccess(true);
      }
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="auth-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn"
      onClick={(e) => {
        if (e.target === e.currentTarget) closeAuthModal();
      }}
    >
      <div className="relative w-full max-w-md bg-[var(--bg-secondary)] border border-[var(--border-subtle)] rounded-2xl shadow-[0_0_50px_rgba(0,240,255,0.15)] overflow-hidden">
        {/* Top Glowing HUD Header Strip */}
        <div className="h-1.5 w-full bg-gradient-to-r from-[var(--accent-cyan)] via-[var(--accent-amber)] to-[var(--success-green)]" />

        {/* Close Button */}
        <button
          onClick={closeAuthModal}
          className="absolute top-4 right-4 p-1.5 rounded-lg border border-[var(--border-subtle)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-glass)] transition-colors"
          aria-label="Close authentication modal"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="p-6 sm:p-7 flex flex-col gap-5">
          {/* Header & Logo */}
          <div className="flex flex-col items-center text-center gap-1.5">
            <div className="w-12 h-12 rounded-full border border-[var(--accent-cyan)] flex items-center justify-center bg-[var(--accent-cyan)]/10 shadow-cyan-glow mb-1">
              <Lock className="w-6 h-6 text-[var(--accent-cyan)]" />
            </div>

            <div className="flex items-center gap-1 font-display font-black text-xl tracking-tight text-[var(--text-primary)]">
              <span>NAV</span>
              <span className="text-[var(--accent-cyan)]">DRISHTI</span>
              <span className="ml-1 px-2 py-0.5 text-[9px] font-mono uppercase bg-[var(--accent-cyan)]/15 text-[var(--accent-cyan)] rounded-full border border-[var(--accent-cyan)]/30">
                Free Access
              </span>
            </div>

            <h2 id="auth-modal-title" className="font-display text-base font-bold text-[var(--text-primary)]">
              {mode === 'signin' ? 'Sign In to Simulation Cockpit' : 'Create Free Research Account'}
            </h2>

            <p className="text-xs text-[var(--text-secondary)] max-w-xs">
              {modalMessage ||
                'Unlock full sensor perception feeds, APF planner tuning, vehicle diagnostics, and telemetry downloads.'}
            </p>
          </div>

          {/* Mode Tabs */}
          <div className="grid grid-cols-2 p-1 rounded-xl bg-[var(--bg-primary)] border border-[var(--border-subtle)] font-mono text-xs">
            <button
              type="button"
              onClick={() => {
                setMode('signin');
                setErrorMsg(null);
              }}
              className={`py-2 rounded-lg font-semibold transition-all ${
                mode === 'signin'
                  ? 'bg-[var(--accent-cyan)]/20 text-[var(--accent-cyan)] border border-[var(--accent-cyan)]/40 shadow-sm'
                  : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
              }`}
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => {
                setMode('signup');
                setErrorMsg(null);
              }}
              className={`py-2 rounded-lg font-semibold transition-all ${
                mode === 'signup'
                  ? 'bg-[var(--accent-cyan)]/20 text-[var(--accent-cyan)] border border-[var(--accent-cyan)]/40 shadow-sm'
                  : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
              }`}
            >
              Sign Up Free
            </button>
          </div>

          {/* Confirmation notice if email verification is required */}
          {confirmationNotice ? (
            <div className="p-4 rounded-xl bg-[var(--accent-cyan)]/10 border border-[var(--accent-cyan)]/30 flex flex-col items-center text-center gap-3 animate-fadeIn">
              <CheckCircle2 className="w-10 h-10 text-[var(--accent-cyan)] animate-pulse" />
              <div className="flex flex-col gap-1">
                <span className="font-bold text-sm text-[var(--text-primary)]">Check Your Email</span>
                <p className="text-xs text-[var(--text-secondary)]">
                  We sent a confirmation link to <strong className="text-[var(--accent-cyan)]">{email}</strong>. Please confirm your email to activate your free access, or sign in directly!
                </p>
              </div>
              <GlowButton
                variant="cyan"
                size="sm"
                className="w-full mt-2"
                onClick={() => setConfirmationNotice(false)}
              >
                Back to Sign In
              </GlowButton>
            </div>
          ) : (
            /* Auth Form */
            <form onSubmit={handleSubmit} className="flex flex-col gap-3.5">
              {/* Error Banner */}
              {errorMsg && (
                <div className="p-3 rounded-lg bg-[var(--danger-red)]/15 border border-[var(--danger-red)]/40 text-[var(--danger-red)] text-xs flex flex-col gap-1.5 animate-shake">
                  <div className="flex items-start gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                    <span>
                      {errorMsg.includes('confirmation email')
                        ? 'Supabase email service could not send the verification message (default rate limit / unverified domain). If your account was already created, try signing in directly!'
                        : errorMsg}
                    </span>
                  </div>
                  {mode === 'signup' && (
                    <button
                      type="button"
                      onClick={() => {
                        setMode('signin');
                        setErrorMsg(null);
                      }}
                      className="text-left font-bold text-[var(--accent-cyan)] hover:underline text-[11px] ml-6"
                    >
                      → Switch to Sign In with your password
                    </button>
                  )}
                </div>
              )}

              {/* Email Input */}
              <div className="flex flex-col gap-1">
                <label className="text-[11px] font-mono uppercase tracking-wider text-[var(--text-secondary)] flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-[var(--accent-cyan)]" /> Email Address
                </label>
                <div className="relative">
                  <input
                    type="email"
                    required
                    placeholder="researcher@autonomous.org"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-[var(--bg-primary)] border border-[var(--border-subtle)] text-[var(--text-primary)] font-mono text-xs focus:outline-none focus:border-[var(--accent-cyan)] focus:shadow-cyan-glow transition-all"
                  />
                </div>
              </div>

              {/* Password Input */}
              <div className="flex flex-col gap-1">
                <label className="text-[11px] font-mono uppercase tracking-wider text-[var(--text-secondary)] flex items-center gap-1.5">
                  <Lock className="w-3.5 h-3.5 text-[var(--accent-cyan)]" /> Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-[var(--bg-primary)] border border-[var(--border-subtle)] text-[var(--text-primary)] font-mono text-xs pr-10 focus:outline-none focus:border-[var(--accent-cyan)] focus:shadow-cyan-glow transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)] hover:text-[var(--text-primary)]"
                    tabIndex={-1}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                {mode === 'signup' && (
                  <span className="text-[10px] text-[var(--text-muted)] font-mono">
                    Minimum 6 characters. Free tier never expires.
                  </span>
                )}
              </div>

              {/* Submit Button */}
              <GlowButton
                type="submit"
                variant="cyan"
                size="md"
                className="w-full mt-2 font-mono"
                disabled={loading}
                icon={loading ? undefined : <Sparkles className="w-4 h-4" />}
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <span className="w-3 h-3 border-2 border-black border-t-transparent rounded-full animate-spin" />
                    {mode === 'signin' ? 'Authenticating...' : 'Creating Free Account...'}
                  </span>
                ) : mode === 'signin' ? (
                  'Sign In to Continue'
                ) : (
                  'Sign Up (100% Free Access)'
                )}
              </GlowButton>
            </form>
          )}

          {/* Feature Badges for Free Account */}
          <div className="pt-3 border-t border-[var(--border-subtle)]/60 grid grid-cols-2 gap-2 text-[10px] font-mono text-[var(--text-secondary)]">
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-[var(--success-green)]" />
              <span>Full Sensor Perception</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-[var(--success-green)]" />
              <span>Vehicle Diagnostics</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-[var(--success-green)]" />
              <span>APF Planner Tuning</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-[var(--success-green)]" />
              <span>Telemetry Downloads</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
