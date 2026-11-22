'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import ContactModal from '@/components/modals/ContactModal';
import LanguageSwitcher from '@/components/ui/LanguageSwitcher';
import ThemeToggle from '@/components/ui/ThemeToggle';
import { MenuIcon } from '@/components/icons/navigation';
import { Link } from '@/i18n/navigation';

// The section anchors; their label is the message "nav.<id>"
const navItems = ['technologies', 'experience', 'projects', 'training', 'about'] as const;

export default function Navbar() {
  const t = useTranslations('nav');
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
      className={`fixed top-0 left-0 right-0 z-50 bg-background transition-shadow duration-300 ${
        isScrolled ? 'shadow-sm dark:shadow-none dark:border-b dark:border-border' : ''
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0 font-bold text-xl">
            {/* The site switcher shared by every moilolon.com site; the link shows if its script does not load */}
            <moilolon-nav current="portfolio">
              <Link href="/">Portfolio</Link>
            </moilolon-nav>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-4">
              {navItems.map((item) => (
                <a
                  key={item}
                  href={`#${item}`}
                  className="px-3 py-2 rounded-md text-sm font-medium hover:bg-foreground/10 transition-colors"
                >
                  {t(item)}
                </a>
              ))}
              <button
                onClick={() => setIsContactModalOpen(true)}
                className="px-3 py-2 rounded-md text-sm font-medium hover:bg-foreground/10 transition-colors disabled:cursor-not-allowed cursor-pointer"
              >
                {t('contact')}
              </button>
              <LanguageSwitcher />
              <ThemeToggle />
            </div>
          </div>
          <div className="md:hidden flex items-center gap-1">
            <LanguageSwitcher />
            <ThemeToggle />
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
  const t = useTranslations('nav');
  const [isOpen, setIsOpen] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  return (
    <div>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex items-center justify-center p-2 rounded-md hover:bg-foreground/10 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
        aria-expanded={isOpen}
      >
        <span className="sr-only">{t('openMenu')}</span>
        <MenuIcon isOpen={isOpen} />
      </button>

      {isOpen && (
        <div className="absolute top-16 left-0 right-0 bg-background shadow-lg p-4 dark:border-b dark:border-border">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navItems.map((item) => (
              <a
                key={item}
                href={`#${item}`}
                className="block px-3 py-2 rounded-md text-base font-medium hover:bg-foreground/10"
                onClick={() => setIsOpen(false)}
              >
                {t(item)}
              </a>
            ))}
            <button
              onClick={() => {
                setIsOpen(false);
                setIsContactModalOpen(true);
              }}
              className="block w-full text-left px-3 py-2 rounded-md text-base font-medium hover:bg-foreground/10"
            >
              {t('contact')}
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
