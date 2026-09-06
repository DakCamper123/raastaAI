import type { Metadata } from 'next';
import './globals.css';
import { ThemeProvider } from '@/context/ThemeContext';
import { AuthProvider } from '@/context/AuthContext';
import { SimulationProvider } from '@/context/SimulationContext';
import { SOSProvider } from '@/context/SOSContext';
import { StickyHeader } from '@/components/layout/StickyHeader';
import { Footer } from '@/components/layout/Footer';
import { SOSModal } from '@/components/emergency/SOSModal';
import { AuthModal } from '@/components/auth/AuthModal';

export const metadata: Metadata = {
  title: 'NavDrishti | Autonomous Path Planning for Unstructured Indian Roads',
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
    'NavDrishti',
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
                <Footer />
              </SOSProvider>
          </SimulationProvider>
        </AuthProvider>
      </ThemeProvider>
      </body>
    </html>
  );
}
