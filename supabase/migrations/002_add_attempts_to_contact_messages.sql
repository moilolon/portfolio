-- Count the retries of the email notification, so the daily cron
-- (src/app/api/cron/contact/route.ts) stops retrying a message that keeps failing.
ALTER TABLE contact_messages
  ADD COLUMN attempts INTEGER DEFAULT 0 NOT NULL;

COMMENT ON COLUMN contact_messages.attempts IS 'Retries of the email notification made by the daily cron';
