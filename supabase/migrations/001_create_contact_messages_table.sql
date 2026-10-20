-- Create contact_messages table
CREATE TABLE contact_messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
  status TEXT DEFAULT 'pending' NOT NULL
);

-- Add indexes for better query performance
CREATE INDEX idx_contact_messages_status ON contact_messages(status);
CREATE INDEX idx_contact_messages_created_at ON contact_messages(created_at);

-- Enable Row Level Security (RLS)
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;

-- No policies: anon and authenticated cannot touch the table. Only the API route
-- reaches it, server-side with the secret key (service_role), which bypasses RLS.

-- Grant Data API access explicitly: only service_role, nothing for the public roles.
REVOKE ALL ON contact_messages FROM anon, authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON contact_messages TO service_role;

-- Add comment to table
COMMENT ON TABLE contact_messages IS 'Saves contact messages from portfolio'
