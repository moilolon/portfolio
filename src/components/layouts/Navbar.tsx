'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import ContactModal from '@/components/modals/ContactModal';
import { MenuIcon } from '@/components/icons/navigation';

const navItems = [
  { name: 'Technologies', href: '#technologies' },
  { name: 'Experience', href: '#experience' },
  { name: 'Projects', href: '#projects' },
  { name: 'Training', href: '#training' },
  { name: 'About Me', href: '#about' },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-background/80 backdrop-blur-md shadow-sm'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <Link href="/" className="font-bold text-xl">
              My Portfolio
            </Link>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="px-3 py-2 rounded-md text-sm font-medium hover:bg-foreground/10 transition-colors"
                >
                  {item.name}
                </Link>
              ))}
              <button
                onClick={() => setIsContactModalOpen(true)}
                className="px-3 py-2 rounded-md text-sm font-medium hover:bg-foreground/10 transition-colors disabled:cursor-not-allowed cursor-pointer"
              >
                Contact
              </button>
            </div>
          </div>
          <div className="md:hidden">
            <MobileMenu />
          </div>
        </div>
      </div>

      <ContactModal
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
      />
    </nav>
  );
}

function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  return (
    <div>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex items-center justify-center p-2 rounded-md hover:bg-foreground/10 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
        aria-expanded="false"
      >
        <span className="sr-only">Open main menu</span>
        <MenuIcon isOpen={isOpen} />
      </button>

      {isOpen && (
        <div className="absolute top-16 left-0 right-0 bg-background shadow-lg p-4">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="block px-3 py-2 rounded-md text-base font-medium hover:bg-foreground/10"
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <button
              onClick={() => {
                setIsOpen(false);
                setIsContactModalOpen(true);
              }}
              className="block w-full text-left px-3 py-2 rounded-md text-base font-medium hover:bg-foreground/10"
            >
              Contact
            </button>
          </div>
        </div>
      )}

      <ContactModal
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
      />
    </div>
  );
}
