"use client";

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const [backgroundColor, setBackgroundColor] = useState('rgb(75, 31, 31)');

  return (
    <nav className="fixed top-0 left-0 right-0 p-4 z-10" style={{ backgroundColor }} >
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-white font-bold text-xl">
          EK's Cards
        </Link>
        
        {/* Mobile menu button */}
        <button 
          className="md:hidden text-gray-300 hover:text-white"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
        
        {/* Desktop navigation */}
        <div className="hidden md:flex md:items-center md:space-x-4">
          <Link 
            href="/" 
            className={`${pathname === '/' ? 'text-white' : 'text-gray-300 hover:text-white'} px-3 py-2`}
          >
            Home
          </Link>
          <Link 
            href="/pc-graded" 
            className={`${pathname === '/pc-graded' ? 'text-white' : 'text-gray-300 hover:text-white'} px-3 py-2`}
          >
            Graded Cards
          </Link>
          <Link 
            href="/pc-sets" 
            className={`${pathname === '/pc-sets' ? 'text-white' : 'text-gray-300 hover:text-white'} px-3 py-2`}
          >
            Complete Sets
          </Link>
          <Link 
            href="/pc-raw" 
            className={`${pathname === '/pc-raw' ? 'text-white' : 'text-gray-300 hover:text-white'} px-3 py-2`}
          >
            Ungraded Cards
          </Link>
        </div>
      </div>
      
      {/* Mobile navigation */}
      {isOpen && (
        <div className="md:hidden mt-2">
          <div className="flex flex-col space-y-2 px-2 pt-2 pb-3">
            <Link 
              href="/" 
              className={`${pathname === '/' ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'} px-3 py-2 rounded-md`}
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>

            <Link 
              href="/pc-graded" 
              className={`${pathname === '/pc-graded' ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'} px-3 py-2 rounded-md`}
              onClick={() => setIsOpen(false)}
            >
              Graded Cards
            </Link>
            <Link 
              href="/pc-sets" 
              className={`${pathname === '/pc-sets' ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'} px-3 py-2 rounded-md`}
              onClick={() => setIsOpen(false)}
            >
              Complete Sets
            </Link>
            <Link 
              href="/pc-raw" 
              className={`${pathname === '/pc-raw' ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'} px-3 py-2 rounded-md`}
              onClick={() => setIsOpen(false)}
            >
              Ungraded Cards
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}