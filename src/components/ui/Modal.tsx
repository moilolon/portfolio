'use client';

import { useEffect, useEffectEvent, useId, useRef, useState } from 'react';
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

// What Tab can land on inside the dialog
const FOCUSABLE = 'a[href], button:not([disabled]), input:not([disabled]), textarea:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';

export default function Modal({ isOpen, onClose, title, closeLabel, children }: ModalProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const titleId = useId();
  const isClient = useIsClient();
  // Stays true after closing until the exit transition ends, so the modal can fade out
  const [isAnimating, setIsAnimating] = useState(false);

  if (isOpen && !isAnimating) {
    setIsAnimating(true);
  }

  // The latest onClose without making the effect below run again when the parent re-renders
  const close = useEffectEvent(onClose);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const dialog = dialogRef.current;
    // Where the focus was, to give it back when the dialog closes
    const opener = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    dialog?.focus();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        close();
        return;
      }
      if (e.key !== 'Tab' || !dialog) {
        return;
      }

      // Keep Tab inside the dialog: from the last control it goes to the first, and back
      const controls = [...dialog.querySelectorAll<HTMLElement>(FOCUSABLE)].filter((control) => control.offsetParent !== null);
      const first = controls[0];
      const last = controls[controls.length - 1];
      const active = document.activeElement;

      if (!first || !last) {
        e.preventDefault();
      } else if (e.shiftKey && (active === first || active === dialog)) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && active === last) {
        e.preventDefault();
        first.focus();
      } else if (!dialog.contains(active)) {
        e.preventDefault();
        first.focus();
      }
    };

    const handleClickOutside = (e: MouseEvent) => {
      if (overlayRef.current === e.target) close();
    };

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('mousedown', handleClickOutside);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = '';
      opener?.focus();
    };
  }, [isOpen]);

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
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        tabIndex={-1}
        className={`bg-card dark:border dark:border-border rounded-lg shadow-lg max-w-md w-full max-h-[90vh] overflow-y-auto transition-all duration-300 focus:outline-none ${
          isOpen ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
        }`}
      >
        <div className="flex items-center justify-between px-6 pt-6">
          <h2 id={titleId} className="text-2xl font-bold">{title}</h2>
          <button
            type="button"
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
