'use client';

import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { CloseIcon } from '@/components/icons/navigation';
import { useIsClient } from '@/lib/use-is-client';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  // Text of the close button, for screen readers
  closeLabel: string;
  children: React.ReactNode;
}

export default function Modal({ isOpen, onClose, title, closeLabel, children }: ModalProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const isClient = useIsClient();
  // Stays true after closing until the exit transition ends, so the modal can fade out
  const [isAnimating, setIsAnimating] = useState(false);

  if (isOpen && !isAnimating) {
    setIsAnimating(true);
  }

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    const handleClickOutside = (e: MouseEvent) => {
      if (overlayRef.current === e.target) onClose();
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.addEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.removeEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  if (!isClient) return null;
  if (!isOpen && !isAnimating) return null;

  const handleAnimationEnd = () => {
    if (!isOpen) {
      setIsAnimating(false);
    }
  };

  return createPortal(
    <div
      ref={overlayRef}
      className={`fixed inset-0 bg-black/60 backdrop-blur-md z-50 flex items-center justify-center p-4 transition-opacity duration-300 ${
        isOpen ? 'opacity-100' : 'opacity-0'
      }`}
      onTransitionEnd={handleAnimationEnd}
    >
      <div
        className={`bg-card dark:border dark:border-border rounded-lg shadow-lg max-w-md w-full max-h-[90vh] overflow-y-auto transition-all duration-300 ${
          isOpen ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
        }`}
      >
        <div className="flex items-center justify-between px-6 pt-6">
          <h2 className="text-2xl font-bold">{title}</h2>
          <button
            onClick={onClose}
            className="p-1 rounded-md text-foreground/60 hover:text-foreground hover:bg-foreground/10 transition-colors disabled:cursor-not-allowed cursor-pointer"
          >
            <CloseIcon />
            <span className="sr-only">{closeLabel}</span>
          </button>
        </div>
        <div className="p-6">
          {children}
        </div>
      </div>
    </div>,
    document.body,
  );
}
