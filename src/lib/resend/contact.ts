import { resend } from './client';
import type { ContactData } from '@/lib/contact';

// Server only: reads NOTIFICATION_EMAIL and sends through Resend.

const escapeHtml = (value: string) => value
  .replace(/&/g, '&amp;')
  .replace(/</g, '&lt;')
  .replace(/>/g, '&gt;')
  .replace(/"/g, '&quot;')
  .replace(/'/g, '&#39;');

// Sends me the notification of a contact message. Returns whether it was sent.
export async function sendContactNotification({ name, email, subject, message }: ContactData): Promise<boolean> {
  try {
    const { error } = await resend.emails.send({
      from: 'My Portfolio <portfolio@moilolon.com>',
      to: process.env.NOTIFICATION_EMAIL!,
      // Replying to the notification answers the visitor
      replyTo: email,
      subject: `New Contact Message: ${subject}`,
      text: `New Contact Message\n\nName: ${name}\nEmail: ${email}\nSubject: ${subject}\n\n${message}\n`,
      html: `
        <h2>New Contact Message</h2>
        <p><strong>Name:</strong> ${escapeHtml(name)}</p>
        <p><strong>Email:</strong> ${escapeHtml(email)}</p>
        <p><strong>Subject:</strong> ${escapeHtml(subject)}</p>
        <p><strong>Message:</strong></p>
        <p style="white-space: pre-wrap;">${escapeHtml(message)}</p>
      `,
    });

    if (error) {
      console.error('Email error:', error);
      return false;
    }
    return true;
  } catch (error) {
    console.error('Email error:', error);
    return false;
  }
}
