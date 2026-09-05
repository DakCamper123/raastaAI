import type { Metadata } from 'next';
import './globals.css';
import { ThemeProvider } from '@/context/ThemeContext';
import { AuthProvider } from '@/context/AuthContext';
import { SimulationProvider } from '@/context/SimulationContext';
import { SOSProvider } from '@/context/SOSContext';
import { StickyHeader } from '@/components/layout/StickyHeader';
import { SOSModal } from '@/components/emergency/SOSModal';
import { AuthModal } from '@/components/auth/AuthModal';

export const metadata: Metadata = {
  title: 'Raasta.AI | Autonomous Path Planning for Unstructured Indian Roads',
  description:
    'Level 4+ autonomous motion planning, 360° sensor fusion HUD, and ASIL-D safety architecture engineered for unstructured, chaotic Indian road corridors.',
  keywords: [
    'Autonomous Vehicles',
    'Indian Roads',
    'Motion Planning',
    'Artificial Potential Fields',
    'Dynamic Window Approach',
    'C-V2X',
    'Self-Driving Cars India',
    'Raasta AI',
    'BharatNav',
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-theme="dark" className="dark">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body className="min-h-screen flex flex-col bg-[var(--bg-primary)] text-[var(--text-primary)] antialiased transition-colors duration-300">
        <ThemeProvider>
          <AuthProvider>
            <SimulationProvider>
              <SOSProvider>
                <StickyHeader />
                <SOSModal />
                <AuthModal />
                <main id="main-content" className="flex-1 w-full flex flex-col">
                  {children}
                </main>
              {/* Footer */}
              <footer className="w-full border-t border-[var(--border-subtle)] bg-[var(--bg-secondary)]/80 py-8 px-4 sm:px-6 font-mono text-xs text-[var(--text-secondary)]">
                <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
                  <div className="flex flex-col gap-1">
                    <span className="font-display font-bold text-sm text-[var(--text-primary)]">
                      RAASTA.AI • AUTONOMOUS SYSTEMS LABORATORY
                    </span>
                    <span className="text-[11px] text-[var(--text-muted)]">
                      ISO 26262 ASIL-D Aligned Kinodynamic Safety Platform • 2026
                    </span>
                  </div>
                  <div className="flex items-center gap-4 text-[11px]">
                    <span>NH-48 GNSS RTK: ±1.4 CM</span>
                    <span>•</span>
                    <span className="text-[var(--accent-cyan)]">5G NR C-V2X 60 HZ</span>
                  </div>
                </div>
              </footer>
            </SOSProvider>
          </SimulationProvider>
        </AuthProvider>
      </ThemeProvider>
      </body>
    </html>
  );
}
