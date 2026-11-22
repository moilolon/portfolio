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
export type ContactErrors = Partial<Record<ContactField, string>>;

// Hidden field that people never see and bots tend to fill
export const CONTACT_HONEYPOT_FIELD = 'contact_reference';

const LABELS: Record<ContactField, string> = {
  name: 'Name',
  email: 'Email',
  subject: 'Subject',
  message: 'Message',
};

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
      errors[field] = `${LABELS[field]} is required`;
    } else if (value.length > CONTACT_LIMITS[field]) {
      errors[field] = `${LABELS[field]} must be ${CONTACT_LIMITS[field]} characters or fewer`;
    } else if (field === 'email' && !EMAIL_PATTERN.test(value)) {
      errors[field] = 'Enter a valid email address';
    }
  }

  return { data, errors, valid: Object.keys(errors).length === 0 };
}
