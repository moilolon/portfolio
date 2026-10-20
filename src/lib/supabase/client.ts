import { createClient } from '@supabase/supabase-js';

// Server only: the secret key bypasses Row Level Security, so this client
// must never be imported from a client component.
const supabaseUrl = process.env.SUPABASE_URL!;
const supabaseSecretKey = process.env.SUPABASE_SECRET_KEY!;

export const supabase = createClient(supabaseUrl, supabaseSecretKey, {
  auth: { persistSession: false, autoRefreshToken: false },
});
