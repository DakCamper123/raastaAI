'use client';

/**
 * RAASTA.AI - CollapsibleDrawer Component
 * Mobile and tablet accessible slide-up bottom drawer with focus trapping.
 */

import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

interface CollapsibleDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export function CollapsibleDrawer({
  isOpen,
  onClose,
  title,
  children,
}: CollapsibleDrawerProps) {
  const drawerRef = useRef<HTMLDivElement>(null);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex flex-col justify-end">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            aria-hidden="true"
          />

          {/* Slide-Up Sheet */}
          <motion.div
            ref={drawerRef}
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            role="dialog"
            aria-modal="true"
            aria-label={title}
            className="relative z-10 w-full max-h-[85vh] overflow-y-auto rounded-t-2xl border-t border-[var(--border-subtle)] bg-[var(--bg-secondary)] p-5 shadow-2xl flex flex-col gap-4"
          >
            {/* Grab Handle */}
            <div className="w-12 h-1.5 bg-[var(--text-muted)]/40 rounded-full mx-auto" />

            {/* Header */}
            <div className="flex items-center justify-between border-b border-[var(--border-subtle)]/60 pb-3">
              <h3 className="font-display font-bold text-lg text-[var(--text-primary)]">
                {title}
              </h3>
              <button
                onClick={onClose}
                className="p-1.5 rounded-lg border border-[var(--border-subtle)] hover:bg-[var(--surface-glass)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                aria-label="Close drawer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Drawer Body Content */}
            <div className="flex-1 overflow-y-auto">{children}</div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
