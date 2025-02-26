"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import './globals.css';
import Navbar from './components/Navbar';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <html lang="en">
      <body className="min-h-screen">
        <Navbar />
        <main className="pt-16 container mx-auto"> 
          {children}
        </main>
      </body>
    </html>
  );
}