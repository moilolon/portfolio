import { NextResponse } from 'next/server';
import { sendContactNotification } from '@/lib/resend/contact';
import { supabase } from '@/lib/supabase/client';

// Called once a day by Vercel Cron (vercel.json): retries the notifications
// of the contact messages that were not sent.

export const dynamic = 'force-dynamic';

// A notification is retried at most this many times (once a day)
const MAX_ATTEMPTS = 5;

// Messages retried per run
const RETRY_BATCH = 20;

// Messages younger than this may still be in flight in the contact route
const MIN_AGE_MINUTES = 10;

export async function GET(request: Request) {
  // Vercel Cron sends the CRON_SECRET of the project as a bearer token
  const secret = process.env.CRON_SECRET;

  if (!secret || request.headers.get('authorization') !== `Bearer ${secret}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    // Retry the notifications that failed or never finished
    const settledBefore = new Date(Date.now() - MIN_AGE_MINUTES * 60 * 1000).toISOString();

    const { data: messages, error: selectError } = await supabase
      .from('contact_messages')
      .select('id, name, email, subject, message, attempts')
      .in('status', ['pending', 'failed'])
      .lt('attempts', MAX_ATTEMPTS)
      .lt('created_at', settledBefore)
      .order('created_at')
      .limit(RETRY_BATCH);

    if (selectError) {
      throw selectError;
    }

    let sentCount = 0;

    for (const { id, attempts, ...message } of messages) {
      const sent = await sendContactNotification(message);

      const { error: updateError } = await supabase
        .from('contact_messages')
        .update({ status: sent ? 'sent' : 'failed', attempts: attempts + 1 })
        .eq('id', id);

      if (updateError) {
        console.error('Supabase status update error:', updateError);
      }
      if (sent) {
        sentCount += 1;
      }
    }

    return NextResponse.json(
      { retried: messages.length, sent: sentCount },
      { status: 200 },
    );
  } catch (error) {
    console.error('Contact cron error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
