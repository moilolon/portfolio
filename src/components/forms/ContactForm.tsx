'use client';

import { useEffect, useRef, useState } from 'react';
import { useTranslations } from 'next-intl';
import Toast from '@/components/ui/Toast';
import {
  CONTACT_HONEYPOT_FIELD,
  CONTACT_LIMITS,
  readContactErrors,
  validateContact,
  type ContactApiError,
  type ContactData,
  type ContactErrors,
  type ContactField,
} from '@/lib/contact';
import { contactEmail } from '@/lib/constants/information';
import { getRecaptchaToken, loadRecaptcha, RECAPTCHA_CONTACT_ACTION } from '@/lib/recaptcha';
import { EmailIcon, LoadingSpinnerIcon, MessageIcon, UserIcon } from '@/components/icons/forms';

interface ContactFormProps {
  onSuccess?: () => void;
}

const RECAPTCHA_SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!;

const EMPTY_FORM: ContactData = { name: '', email: '', subject: '', message: '' };

// The single-line fields, in order; the message is a textarea rendered apart
const INPUTS: { field: Exclude<ContactField, 'message'>; type: string; autoComplete: string; Icon: typeof UserIcon }[] = [
  { field: 'name', type: 'text', autoComplete: 'name', Icon: UserIcon },
  { field: 'email', type: 'email', autoComplete: 'email', Icon: EmailIcon },
  { field: 'subject', type: 'text', autoComplete: 'off', Icon: MessageIcon },
];

const fieldClass = 'block w-full rounded-lg border bg-foreground/5 shadow-sm focus:outline-none focus:ring-2 transition-colors';
const fieldStateClass = (hasError: boolean) => hasError
  ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20'
  : 'border-foreground/10 focus:border-blue-500 focus:ring-blue-500/20';
const linkClass = 'text-blue-500 hover:text-blue-600';

export default function ContactForm({ onSuccess }: ContactFormProps) {
  const t = useTranslations('contact');
  const [values, setValues] = useState<ContactData>(EMPTY_FORM);
  const [errors, setErrors] = useState<ContactErrors>({});
  const [honeypot, setHoneypot] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  // Set when the message could not be sent from here, to offer the email address instead
  const [showEmailFallback, setShowEmailFallback] = useState(false);
  const [toast, setToast] = useState<{
    show: boolean;
    message: string;
    type: 'success' | 'error';
  }>({ show: false, message: '', type: 'success' });
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Load reCAPTCHA when the form opens so the token is ready by the time it is submitted
  useEffect(() => {
    loadRecaptcha(RECAPTCHA_SITE_KEY).catch((error) => console.error(error));
  }, []);

  // Do not close a modal that is already gone
  useEffect(() => () => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
    }
  }, []);

  // The text of the error of a field, in the language of the page
  const errorText = (field: ContactField) => {
    const code = errors[field];
    return code && t(`errors.${code}`, { field: t(`fields.${field}`), max: CONTACT_LIMITS[field] });
  };

  const handleChange = (field: ContactField, value: string) => {
    setValues((current) => ({ ...current, [field]: value }));
    if (errors[field]) {
      setErrors((current) => ({ ...current, [field]: undefined }));
    }
  };

  const showError = (message: string, offerEmail = false) => {
    setToast({ show: true, message, type: 'error' });
    setShowEmailFallback(offerEmail);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const validation = validateContact(values);
    setErrors(validation.errors);
    if (!validation.valid) {
      return;
    }

    setIsSubmitting(true);
    setShowEmailFallback(false);

    try {
      // Get a fresh reCAPTCHA v3 token (tokens expire after two minutes)
      let recaptchaToken: string;
      try {
        recaptchaToken = await getRecaptchaToken(RECAPTCHA_SITE_KEY, RECAPTCHA_CONTACT_ACTION);
      } catch (error) {
        // Usually a content blocker stopping the reCAPTCHA script
        console.error(error);
        showError(t('captchaUnavailable'), true);
        return;
      }

      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...validation.data,
          [CONTACT_HONEYPOT_FIELD]: honeypot,
          recaptchaToken,
        }),
      });

      // A 429 comes from the Vercel Firewall and has no JSON body
      const data: { error?: ContactApiError; fields?: unknown } = await response.json().catch(() => ({}));

      if (!response.ok) {
        if (response.status === 429) {
          showError(t('tooMany'), true);
        } else if (data.error === 'validation') {
          setErrors(readContactErrors(data.fields));
          showError(t('checkFields'));
        } else if (data.error === 'recaptcha_failed' || data.error === 'recaptcha_required') {
          showError(t('captchaFailed'), true);
        } else {
          showError(t('genericError'), true);
        }
        return;
      }

      // Show success toast
      setToast({ show: true, message: t('success'), type: 'success' });

      // Reset form
      setValues(EMPTY_FORM);
      setErrors({});

      // Close modal after delay
      if (onSuccess) {
        closeTimer.current = setTimeout(onSuccess, 2000);
      }
    } catch (error) {
      console.error(error);
      showError(t('genericError'), true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-6 max-w-md mx-auto">
      {INPUTS.map(({ field, type, autoComplete, Icon }) => (
        <div key={field}>
          <label htmlFor={field} className="block text-sm font-medium text-foreground">
            {t(`fields.${field}`)}
          </label>
          <div className="mt-1 relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Icon className="h-5 w-5 text-foreground/40" />
            </div>
            <input
              id={field}
              name={field}
              type={type}
              autoComplete={autoComplete}
              value={values[field]}
              onChange={(e) => handleChange(field, e.target.value)}
              required
              maxLength={CONTACT_LIMITS[field]}
              aria-invalid={Boolean(errors[field])}
              aria-describedby={errors[field] ? `${field}-error` : undefined}
              className={`pl-10 h-10 ${fieldClass} ${fieldStateClass(Boolean(errors[field]))}`}
            />
          </div>
          {errors[field] && (
            <p id={`${field}-error`} className="mt-1 text-sm text-red-600 dark:text-red-400">
              {errorText(field)}
            </p>
          )}
        </div>
      ))}

      <div>
        <div className="flex items-baseline justify-between">
          <label htmlFor="message" className="block text-sm font-medium text-foreground">
            {t('fields.message')}
          </label>
          <span className="text-xs text-foreground/60" aria-hidden="true">
            {values.message.length} / {CONTACT_LIMITS.message}
          </span>
        </div>
        <div className="mt-1 relative rounded-md shadow-sm">
          <textarea
            id="message"
            name="message"
            rows={4}
            value={values.message}
            onChange={(e) => handleChange('message', e.target.value)}
            required
            maxLength={CONTACT_LIMITS.message}
            aria-invalid={Boolean(errors.message)}
            aria-describedby={errors.message ? 'message-error' : undefined}
            className={`p-3 resize-none ${fieldClass} ${fieldStateClass(Boolean(errors.message))}`}
          />
        </div>
        {errors.message && (
          <p id="message-error" className="mt-1 text-sm text-red-600 dark:text-red-400">
            {errorText('message')}
          </p>
        )}
      </div>

      {/* Honeypot: hidden from people and assistive technology, bots fill it */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor={CONTACT_HONEYPOT_FIELD}>Leave this field empty</label>
        <input
          id={CONTACT_HONEYPOT_FIELD}
          name={CONTACT_HONEYPOT_FIELD}
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={honeypot}
          onChange={(e) => setHoneypot(e.target.value)}
        />
      </div>

      {showEmailFallback && (
        <p role="alert" className="rounded-lg border border-red-500/40 bg-red-500/10 p-3 text-sm">
          {t.rich('fallback', {
            email: () => (
              <a href={`mailto:${contactEmail}`} className={`font-medium ${linkClass}`}>
                {contactEmail}
              </a>
            ),
          })}
        </p>
      )}

      <div>
        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex w-full justify-center py-2.5 px-6 border border-transparent shadow-sm text-sm font-medium rounded-full text-background bg-foreground hover:bg-foreground/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-card focus:ring-foreground disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer transition-all duration-200"
        >
          {isSubmitting ? (
            <span className="flex items-center">
              <LoadingSpinnerIcon className="-ml-1 mr-2 text-current" />
              {t('sending')}
            </span>
          ) : t('send')}
        </button>
        <small className="block text-xs text-foreground/60 mt-4">
          {t.rich('recaptcha', {
            privacy: (chunks) => (
              <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className={linkClass}>
                {chunks}
              </a>
            ),
            terms: (chunks) => (
              <a href="https://policies.google.com/terms" target="_blank" rel="noopener noreferrer" className={linkClass}>
                {chunks}
              </a>
            ),
          })}
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
