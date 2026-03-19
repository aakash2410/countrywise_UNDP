import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AccessibilityProvider, AccessibilityToggle } from '@/components/dashboard/AccessibilityContext';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "UNDP Digital Transformation Dashboard",
  description: "Mapping of digital capabilities across APAC country offices",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Load OpenDyslexic font */}
        <link href="https://fonts.cdnfonts.com/css/open-dyslexic" rel="stylesheet" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-mesh-pattern min-h-screen selection:bg-blue-200 selection:text-slate-900`}
      >
        <AccessibilityProvider>
          <AccessibilityToggle />
          {children}
        </AccessibilityProvider>
      </body>
    </html>
  );
}
