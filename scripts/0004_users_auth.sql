-- Users table for Google OAuth
CREATE TABLE IF NOT EXISTS users (
  id TEXT PRIMARY KEY,                      -- Google sub (unique user ID)
  email TEXT NOT NULL UNIQUE,
  name TEXT,
  image TEXT,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  last_login_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
