'use client';

import { useEffect, useEffectEvent, useState } from 'react';
import { createPortal } from 'react-dom';
import { useIsClient } from '@/lib/use-is-client';

interface ToastProps {
  message: string;
  type: 'success' | 'error';
  duration?: number;
  onClose: () => void;
}

export default function Toast({ message, type, duration = 3000, onClose }: ToastProps) {
  const [isVisible, setIsVisible] = useState(true);
  const isClient = useIsClient();

  // The latest onClose without restarting the countdown each time the parent re-renders
  const close = useEffectEvent(onClose);

  useEffect(() => {
    let exit: ReturnType<typeof setTimeout>;

    const timer = setTimeout(() => {
      setIsVisible(false);
      exit = setTimeout(close, 300); // Allow time for exit animation
    }, duration);

    return () => {
      clearTimeout(timer);
      clearTimeout(exit);
    };
  }, [duration]);

  if (!isClient) return null;

  return createPortal(
    // An error interrupts the screen reader, a confirmation waits its turn
    <div
      role={type === 'error' ? 'alert' : 'status'}
      className={`fixed bottom-4 right-4 z-50 p-4 rounded-lg shadow-lg transform transition-all duration-300 ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0'
      } ${type === 'success' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`}
    >
      {message}
    </div>,
    document.body,
  );
}
