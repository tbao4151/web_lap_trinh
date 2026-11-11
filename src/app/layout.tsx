import type { Metadata } from 'next';
import './globals.css';
import { BRAND_CONFIG } from '@/config/brand';
import { AppStateProvider } from '@/providers/AppStateProvider';
import { RoleSwitcherBar } from '@/components/layout/RoleSwitcherBar';
import { ToastRegion } from '@/components/ui/ToastRegion';

export const metadata: Metadata = {
  title: `${BRAND_CONFIG.name} — ${BRAND_CONFIG.tagline}`,
  description: BRAND_CONFIG.description,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" suppressHydrationWarning>
      <body className="min-h-screen antialiased selection:bg-indigo-600 selection:text-white">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 focus:rounded-lg focus:bg-indigo-600 focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white"
        >
          Chuyển tới nội dung chính
        </a>
        <AppStateProvider>
          <RoleSwitcherBar />
          {children}
          <ToastRegion />
        </AppStateProvider>
      </body>
    </html>
  );
}
