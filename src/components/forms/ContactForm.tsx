'use client';

import { useState, useRef } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import Toast from '@/components/ui/Toast';
import { EmailIcon, LoadingSpinnerIcon, MessageIcon, UserIcon } from '@/components/icons/forms';

interface ContactFormProps {
  onSuccess?: () => void;
}

export default function ContactForm({ onSuccess }: ContactFormProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toast, setToast] = useState<{
    show: boolean;
    message: string;
    type: 'success' | 'error';
  }>({ show: false, message: '', type: 'success' });

  // Reference to reCAPTCHA component
  const recaptchaRef = useRef<ReCAPTCHA>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Execute reCAPTCHA and get token
      const recaptchaToken = await recaptchaRef.current?.executeAsync();

      // Reset reCAPTCHA for next submission
      recaptchaRef.current?.reset();

      if (!recaptchaToken) {
        throw new Error('reCAPTCHA verification failed');
      }

      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          email,
          subject,
          message,
          recaptchaToken
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to submit form');
      }

      // Show success toast
      setToast({
        show: true,
        message: 'Thank you for your message! I will get back to you soon.',
        type: 'success'
      });

      // Reset form
      setName('');
      setEmail('');
      setSubject('');
      setMessage('');

      // Close modal after delay
      if (onSuccess) {
        setTimeout(() => {
          onSuccess();
        }, 2000);
      }
    } catch (error) {
      setToast({
        show: true,
        message: error instanceof Error ? error.message : 'Something went wrong',
        type: 'error'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-md mx-auto">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-foreground">
          Name
        </label>
        <div className="mt-1 relative rounded-md shadow-sm">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <UserIcon className="h-5 w-5 text-foreground/40" />
          </div>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="pl-10 block w-full h-10 rounded-lg border-none bg-foreground/5 shadow-sm focus:ring-2 focus:ring-blue-500/20 transition-colors"
          />
        </div>
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-foreground">
          Email
        </label>
        <div className="mt-1 relative rounded-md shadow-sm">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <EmailIcon className="h-5 w-5 text-foreground/40" />
          </div>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="pl-10 block w-full h-10 rounded-lg border-none bg-foreground/5 shadow-sm focus:ring-2 focus:ring-blue-500/20 transition-colors"
          />
        </div>
      </div>

      <div>
        <label htmlFor="subject" className="block text-sm font-medium text-foreground">
          Subject
        </label>
        <div className="mt-1 relative rounded-md shadow-sm">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <MessageIcon className="h-5 w-5 text-foreground/40" />
          </div>
          <input
            id="subject"
            type="text"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            required
            className="pl-10 block w-full h-10 rounded-lg border-none bg-foreground/5 shadow-sm focus:ring-2 focus:ring-blue-500/20 transition-colors"
          />
        </div>
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium text-foreground">
          Message
        </label>
        <div className="mt-1 relative rounded-md shadow-sm">
          <textarea
            id="message"
            rows={4}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
            className="block w-full rounded-lg border-none bg-foreground/5 shadow-sm focus:ring-2 focus:ring-blue-500/20 transition-colors p-3 resize-none"
          />
        </div>
      </div>

      {/* Invisible reCAPTCHA */}
      <ReCAPTCHA
        ref={recaptchaRef}
        size="invisible"
        sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!}
      />

      <div>
        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex w-full justify-center py-2 px-6 border border-transparent shadow-sm text-sm font-medium rounded-lg text-white bg-black hover:bg-black/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer transition-all duration-200"
        >
          {isSubmitting ? (
            <span className="flex items-center">
              <LoadingSpinnerIcon className="-ml-1 mr-2 text-white" />
              Sending...
            </span>
          ) : 'Send Message'}
        </button>
        <small className="block text-xs text-foreground/60 mt-4">
          This site is protected by reCAPTCHA and the Google{' '}
          <a
            href="https://policies.google.com/privacy"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:text-blue-600"
          >
            Privacy Policy
          </a>{' '}
          and{' '}
          <a
            href="https://policies.google.com/terms"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:text-blue-600"
          >
            Terms of Service
          </a>{' '}
          apply.
        </small>
      </div>

      {toast.show && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast({ ...toast, show: false })}
        />
      )}
    </form>
  );
}
