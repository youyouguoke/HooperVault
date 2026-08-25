-- Link hoopers to authenticated users
ALTER TABLE hoopers ADD COLUMN user_id TEXT;

-- Index for fast user profile queries
CREATE INDEX IF NOT EXISTS idx_hoopers_user_id ON hoopers(user_id);
