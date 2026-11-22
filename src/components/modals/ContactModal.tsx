'use client';

import { useTranslations } from 'next-intl';
import Modal from '@/components/ui/Modal';
import ContactForm from '@/components/forms/ContactForm';
import { EmailIcon } from '@/components/icons/forms';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const t = useTranslations('contact');

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={t('title')}
      closeLabel={t('close')}
    >
      <div className="space-y-6">
        <div className="flex items-start space-x-3">
          <EmailIcon className="h-6 w-6 text-blue-500 mt-0.5" />
          <p className="text-foreground/80">
            {t('intro')}
          </p>
        </div>
        <ContactForm onSuccess={onClose} />
      </div>
    </Modal>
  );
}
