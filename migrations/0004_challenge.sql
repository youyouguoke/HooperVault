-- Daily Challenge tables

CREATE TABLE IF NOT EXISTS daily_challenges (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  date TEXT UNIQUE NOT NULL,          -- YYYY-MM-DD
  seed INTEGER NOT NULL,              -- YYYYMMDD integer
  prompt TEXT NOT NULL,               -- "Create a Champion Point Guard without Elite Shooting"
  position TEXT,                      -- constrained position (NULL = any)
  banned_skills TEXT,                 -- JSON array of banned skill IDs (NULL = none)
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_challenge_date ON daily_challenges(date);

CREATE TABLE IF NOT EXISTS challenge_entries (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  challenge_id INTEGER NOT NULL,
  hooper_slug TEXT NOT NULL,
  overall INTEGER NOT NULL,
  archetype TEXT NOT NULL,
  first_name TEXT,
  last_name TEXT,
  submitted_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (challenge_id) REFERENCES daily_challenges(id),
  UNIQUE(challenge_id, hooper_slug)
);

CREATE INDEX IF NOT EXISTS idx_entries_challenge ON challenge_entries(challenge_id, overall DESC, submitted_at ASC);
