import { NextResponse } from 'next/server';
import { sendContactNotification } from '@/lib/resend/contact';
import { supabase } from '@/lib/supabase/client';
import { CONTACT_HONEYPOT_FIELD, validateContact, type ContactApiError, type ContactErrors } from '@/lib/contact';
import { RECAPTCHA_CONTACT_ACTION } from '@/lib/recaptcha';

type RecaptchaVerification = {
  'success': boolean;
  'score'?: number;
  'action'?: string;
  'hostname'?: string;
  'error-codes'?: string[];
};

// Minimum reCAPTCHA v3 score accepted (0.5 is moderate confidence)
const RECAPTCHA_MIN_SCORE = 0.5;

// Function to verify reCAPTCHA token
async function verifyRecaptcha(token: string) {
  const response = await fetch(
    'https://www.google.com/recaptcha/api/siteverify',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        secret: process.env.RECAPTCHA_SECRET_KEY!,
        response: token,
      }),
      signal: AbortSignal.timeout(5000),
    },
  );

  const data: RecaptchaVerification = await response.json();

  if (!data.success) {
    console.error('reCAPTCHA verification failed:', data['error-codes']);
    return false;
  }

  // The token must come from the contact form and look human enough
  if (data.action !== RECAPTCHA_CONTACT_ACTION || (data.score ?? 0) < RECAPTCHA_MIN_SCORE) {
    console.error('reCAPTCHA rejected:', { action: data.action, score: data.score });
    return false;
  }

  return true;
}

// The API answers with codes, not texts: the form shows them in the visitor's language
const reject = (error: ContactApiError, status: number, fields?: ContactErrors) =>
  NextResponse.json(fields ? { error, fields } : { error }, { status });

// The rate limit is not here: a Vercel Firewall rule limits POST /api/contact per IP
// and answers 429 before the request reaches this function.
export async function POST(request: Request) {
  try {
    // Parse request body
    let body: Record<string, unknown>;
    try {
      const parsed: unknown = await request.json();
      if (typeof parsed !== 'object' || parsed === null) {
        throw new Error('Body is not an object');
      }
      body = parsed as Record<string, unknown>;
    } catch {
      return reject('invalid_request', 400);
    }

    // Honeypot: a filled hidden field means a bot. Answer as if it worked.
    if (body[CONTACT_HONEYPOT_FIELD]) {
      console.warn('Contact form honeypot filled, message discarded');
      return NextResponse.json({ success: true }, { status: 200 });
    }

    // Validate inputs
    const { data, errors, valid } = validateContact(body);

    if (!valid) {
      return reject('validation', 400, errors);
    }

    // Verify reCAPTCHA
    const { recaptchaToken } = body;

    if (typeof recaptchaToken !== 'string' || !recaptchaToken) {
      return reject('recaptcha_required', 400);
    }

    const isValidRecaptcha = await verifyRecaptcha(recaptchaToken);

    if (!isValidRecaptcha) {
      return reject('recaptcha_failed', 400);
    }

    // Store in Supabase with initial pending status
    const { error: dbError, data: submission } = await supabase
      .from('contact_messages')
      .insert({ ...data, status: 'pending' })
      .select('id')
      .single();

    if (dbError) {
      console.error('Supabase error:', dbError);
      return reject('store_failed', 500);
    }

    // Send the notification email and record the result. A message that fails here
    // is stored, so the visitor gets a success and the daily cron retries it.
    const sent = await sendContactNotification(data);

    const { error: statusError } = await supabase
      .from('contact_messages')
      .update({ status: sent ? 'sent' : 'failed' })
      .eq('id', submission.id);

    if (statusError) {
      console.error('Supabase status update error:', statusError);
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error('Contact form error:', error);
    return reject('internal', 500);
  }
}
