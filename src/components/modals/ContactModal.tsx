'use client';

import Modal from '@/components/ui/Modal';
import ContactForm from '@/components/forms/ContactForm';
import { EmailIcon } from '@/components/icons/forms';

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
          <EmailIcon className="h-6 w-6 text-blue-500 mt-0.5" />
          <p className="text-foreground/80">
            Have a question or want to work together? Feel free to reach out using the form below.
          </p>
        </div>
        <ContactForm onSuccess={onClose} />
      </div>
    </Modal>
  );
}
