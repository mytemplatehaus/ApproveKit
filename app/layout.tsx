import type {Metadata} from 'next';
import { Inter, Space_Grotesk } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-display',
});

export const metadata: Metadata = {
  title: 'ApproveKit | Client feedback and approvals',
  description: 'Client feedback and approvals without messy email threads.',
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${spaceGrotesk.variable} font-sans text-slate-900 antialiased bg-slate-50 overflow-x-hidden`} suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
