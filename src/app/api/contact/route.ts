import { NextResponse } from 'next/server';
import { resend } from '@/lib/resend/client';
import { supabase } from '@/lib/supabase/client';
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

export async function POST(request: Request) {
  try {
    // Parse request body
    const { name, email, subject, message, recaptchaToken } = await request.json();

    // Validate inputs
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: 'Name, email, subject, and message are required' },
        { status: 400 },
      );
    }

    // Verify reCAPTCHA
    if (!recaptchaToken) {
      return NextResponse.json(
        { error: 'reCAPTCHA verification is required' },
        { status: 400 },
      );
    }

    const isValidRecaptcha = await verifyRecaptcha(recaptchaToken);

    if (!isValidRecaptcha) {
      return NextResponse.json(
        { error: 'reCAPTCHA verification failed' },
        { status: 400 },
      );
    }

    // Store in Supabase with initial pending status
    const { error: dbError, data: submission } = await supabase
      .from('contact_messages')
      .insert({
        name,
        email,
        subject,
        message,
        status: 'pending',
      })
      .select()
      .single();

    if (dbError) {
      console.error('Supabase error:', dbError);
      return NextResponse.json(
        { error: 'Failed to store submission' },
        { status: 500 },
      );
    }

    // Send email with Resend
    const { error: emailError } = await resend.emails.send({
      from: 'My Portfolio <portfolio@moilolon.com>',
      to: process.env.NOTIFICATION_EMAIL!,
      subject: `New Contact Message: ${subject}`,
      html: `
        <h2>New Contact Message</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Message:</strong> ${message}</p>
      `,
    });

    // Update the status based on the result
    if (emailError) {
      await supabase
        .from('contact_messages')
        .update({ status: 'failed' })
        .eq('id', submission.id);

      console.error('Email error:', emailError);
      // Still return success since we stored in DB
      return NextResponse.json(
        { success: true, warning: 'Stored but email failed' },
        { status: 200 },
      );
    } else {
      await supabase
        .from('contact_messages')
        .update({ status: 'sent' })
        .eq('id', submission.id);
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 },
    );
  }
}
