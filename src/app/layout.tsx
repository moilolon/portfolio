import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { themeInitScript } from '@/lib/theme';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Moisés López López | Salesforce Full Stack Developer',
  description: 'Portfolio of Moisés López López, Salesforce Commerce Cloud developer building the Guess online stores for Europe and North America.',
  keywords: ['Salesforce Commerce Cloud', 'SFCC', 'SFRA', 'Salesforce developer', 'e-commerce', 'full stack', 'Node.js', 'JavaScript', 'Java', 'portfolio', 'A Coruña'],
  authors: [{ name: 'moilolon' }],
  creator: 'Moisés López López',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // suppressHydrationWarning: data-theme is set by the inline script before React hydrates
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
