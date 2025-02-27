"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import './globals.css';
import Navbar from './components/Navbar';
import { Inter, Play } from 'next/font/google';

const play = Play({
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '700'],
});

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <html lang="en">
      <body className="min-h-screen {inter.className}">
        <header className={play.className}>
          <Navbar />
        </header>        <main className="pt-16  mx-auto">
          {children}
        </main>
      </body>
    </html>
  );
}