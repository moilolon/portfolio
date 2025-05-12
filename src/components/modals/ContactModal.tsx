'use client';

import Modal from '@/components/ui/Modal';
import ContactForm from '@/components/forms/ContactForm';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ContactModal({ isOpen, onClose }: ContactModalProps) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Contact Me"
    >
      <div className="space-y-6">
        <div className="flex items-start space-x-3">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-500 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
          <p className="text-foreground/80">
            Have a question or want to work together? Feel free to reach out using the form below.
          </p>
        </div>
        <ContactForm onSuccess={onClose} />
      </div>
    </Modal>
  );
}
