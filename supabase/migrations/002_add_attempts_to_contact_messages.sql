-- Count the retries of the email notification, so the daily cron
-- (src/app/api/cron/contact/route.ts) stops retrying a message that keeps failing.
ALTER TABLE contact_messages
  ADD COLUMN attempts INTEGER DEFAULT 0 NOT NULL;

COMMENT ON COLUMN contact_messages.attempts IS 'Retries of the email notification made by the daily cron';

-- The rate limit of the contact form counts the recent messages of an email address
CREATE INDEX idx_contact_messages_email_created_at ON contact_messages(email, created_at);
