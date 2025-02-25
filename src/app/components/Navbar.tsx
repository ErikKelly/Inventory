"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const pathname = usePathname();
  
  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between">
        <Link href="/" className="text-white font-bold text-xl">
          Card Site
        </Link>
        <div className="space-x-4">
          <Link 
            href="/" 
            className={`${
              pathname === '/' 
                ? 'text-white font-bold' 
                : 'text-gray-300 hover:text-white'
            }`}
          >
            Home
          </Link>

          <Link 
            href="/inventory" 
            className={`${
              pathname === '/inventory' 
                ? 'text-white font-bold' 
                : 'text-gray-300 hover:text-white'
            }`}
          >
            Available Cards
          </Link>
          <Link 
            href="/pc" 
            className={`${
              pathname === '/pc' 
                ? 'text-white font-bold' 
                : 'text-gray-300 hover:text-white'
            }`}
          >
            Personal Collection
          </Link>
        </div>
      </div>
    </nav>
  );
}