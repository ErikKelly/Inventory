"use client";

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { SITE_NAME, PRIMARY_COLOR } from '@/config/siteConfig';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  return (
    <nav className="fixed top-0 left-0 right-0 p-4 z-10"  style={{ backgroundColor: PRIMARY_COLOR }} >
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-white font-bold text-xl">
        {SITE_NAME}
        </Link>
      </div>
    </nav>
  );
}