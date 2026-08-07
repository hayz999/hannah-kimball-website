import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import AppNavBar from "@/app/components/AppNavBar";
import ThemeRegistry from "@/app/ThemeRegistry";
import "./globals.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl = "https://hannahkimballmusic.com";
const siteDescription =
  "Official website of Hannah Kimball — composer, choral conductor, musician, and music educator based in Colorado.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Hannah Kimball | Composer, Musician & Choral Director",
    template: "%s | Hannah Kimball",
  },
  description: siteDescription,
  keywords: [
    "Hannah Kimball",
    "composer",
    "choral director",
    "choral conductor",
    "vocalist",
    "music educator",
    "Colorado musician",
    "mezzo soprano",
  ],
  openGraph: {
    title: "Hannah Kimball | Composer, Musician & Choral Director",
    description: siteDescription,
    url: siteUrl,
    siteName: "Hannah Kimball",
    type: "website",
  },
  verification: {
    google: "1n-cxCiKsqoOBqI_5AMxs4W8xbnL5V6q7cnTwEDdCSs",
  },
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
