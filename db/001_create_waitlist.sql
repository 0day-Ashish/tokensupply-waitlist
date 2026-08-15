-- Waitlist signups.
-- Idempotent: safe to run more than once.

CREATE TABLE IF NOT EXISTS waitlist (
  id            bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,

  -- Stored lower-cased and trimmed by the app so uniqueness is meaningful:
  -- Alex@Store.com and alex@store.com are the same signup. citext would do
  -- this in the database, but it needs an extension the service user may not
  -- be able to create, so the constraint below enforces it instead.
  email         text        NOT NULL,

  -- Where the signup came from, e.g. 'hero', 'contact'. Useful for knowing
  -- which surface actually converts.
  source        text,

  -- Light attribution. Nullable: most signups will have none.
  referrer      text,
  utm_source    text,
  utm_medium    text,
  utm_campaign  text,

  created_at    timestamptz NOT NULL DEFAULT now(),

  CONSTRAINT waitlist_email_lowercase CHECK (email = lower(email)),
  CONSTRAINT waitlist_email_trimmed   CHECK (email = btrim(email)),
  -- Deliberately loose: real validation belongs in the app. This only rejects
  -- values that are obviously not addresses.
  CONSTRAINT waitlist_email_shape     CHECK (email ~ '^[^@[:space:]]+@[^@[:space:]]+\.[^@[:space:]]+$'),
  CONSTRAINT waitlist_email_length    CHECK (char_length(email) BETWEEN 3 AND 320)
);

-- One row per address. Also gives us the index for existence checks.
CREATE UNIQUE INDEX IF NOT EXISTS waitlist_email_key ON waitlist (email);

-- "Who joined recently" is the common read.
CREATE INDEX IF NOT EXISTS waitlist_created_at_idx ON waitlist (created_at DESC);
