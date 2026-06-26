import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import AppNavBar from '@/app/components/AppNavBar';
import ThemeRegistry from '@/app/ThemeRegistry';
import './globals.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Hannah Kimball | Composer & Choral Director',
  description:
    'Official website of Hannah Kimball — award-winning composer, choral conductor, and music educator based in Colorado.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body>
        {/* Skip-navigation link for screen readers and keyboard users */}
        <a className="skip-link" href="#main-content">
          Skip to main content
        </a>
        <ThemeRegistry>
          <AppNavBar />
          <main id="main-content" tabIndex={-1}>
            {children}
          </main>
        </ThemeRegistry>
      </body>
    </html>
  );
}
