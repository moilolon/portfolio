// Rules of the contact form, shared by the form (client) and the API (server).
// No secrets here: this file is shipped to the browser.

// Maximum length of each field
export const CONTACT_LIMITS = {
  name: 100,
  email: 254,
  subject: 150,
  message: 5000,
} as const;

export type ContactField = keyof typeof CONTACT_LIMITS;
export type ContactData = Record<ContactField, string>;

// What is wrong with a field. The form turns it into a text: messages "contact.errors.<code>"
export const CONTACT_ERROR_CODES = ['required', 'tooLong', 'invalidEmail'] as const;
export type ContactErrorCode = (typeof CONTACT_ERROR_CODES)[number];
export type ContactErrors = Partial<Record<ContactField, ContactErrorCode>>;

// Why the API rejected a message: the "error" of its response
export type ContactApiError =
  | 'invalid_request'
  | 'validation'
  | 'recaptcha_required'
  | 'recaptcha_failed'
  | 'store_failed'
  | 'internal';

// Hidden field that people never see and bots tend to fill
export const CONTACT_HONEYPOT_FIELD = 'contact_reference';

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const clean = (field: ContactField, value: unknown): string => {
  if (typeof value !== 'string') {
    return '';
  }
  if (field === 'message') {
    return value.replace(/\r\n?/g, '\n').trim();
  }
  // Single-line fields: no line breaks, so they are safe in the email subject
  const singleLine = value.replace(/\s+/g, ' ').trim();
  return field === 'email' ? singleLine.toLowerCase() : singleLine;
};

export function validateContact(input: unknown): { data: ContactData; errors: ContactErrors; valid: boolean } {
  const source = (typeof input === 'object' && input !== null ? input : {}) as Record<string, unknown>;
  const fields = Object.keys(CONTACT_LIMITS) as ContactField[];
  const data = {} as ContactData;
  const errors: ContactErrors = {};

  for (const field of fields) {
    const value = clean(field, source[field]);
    data[field] = value;

    if (!value) {
      errors[field] = 'required';
    } else if (value.length > CONTACT_LIMITS[field]) {
      errors[field] = 'tooLong';
    } else if (field === 'email' && !EMAIL_PATTERN.test(value)) {
      errors[field] = 'invalidEmail';
    }
  }

  return { data, errors, valid: Object.keys(errors).length === 0 };
}

// Keeps only the field errors of an API response that the form knows how to show
export function readContactErrors(input: unknown): ContactErrors {
  const source = (typeof input === 'object' && input !== null ? input : {}) as Record<string, unknown>;
  const errors: ContactErrors = {};

  for (const field of Object.keys(CONTACT_LIMITS) as ContactField[]) {
    const code = source[field] as ContactErrorCode;
    if (CONTACT_ERROR_CODES.includes(code)) {
      errors[field] = code;
    }
  }

  return errors;
}
