-- Daily Challenge v2.0 Schema
-- Supports seed-driven draft, simulation-based scoring, daily podium

-- Drop old tables if they exist
DROP TABLE IF EXISTS challenge_entries;
DROP TABLE IF EXISTS daily_challenges;

-- Daily Challenge entity
CREATE TABLE IF NOT EXISTS daily_challenges (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  challenge_id TEXT UNIQUE NOT NULL,      -- YYYYMMDD format
  title TEXT NOT NULL,                    -- "Defensive Dynasty", "Dynasty Builder"
  seed INTEGER NOT NULL,                  -- Deterministic seed for draft pool
  status TEXT NOT NULL DEFAULT 'active',  -- 'active', 'completed', 'archived'
  start_time DATETIME NOT NULL,           -- Challenge start time (UTC)
  end_time DATETIME NOT NULL,             -- Challenge end time (UTC)
  theme TEXT,                             -- Theme description for marketing
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Challenge entries with simulation results
CREATE TABLE IF NOT EXISTS challenge_entries (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  challenge_id TEXT NOT NULL,             -- YYYYMMDD format
  hooper_slug TEXT NOT NULL,
  overall INTEGER NOT NULL,
  archetype TEXT NOT NULL,
  first_name TEXT,
  last_name TEXT,
  
  -- Simulation results (required for submission)
  season_wins INTEGER DEFAULT 0,          -- Regular season wins
  season_losses INTEGER DEFAULT 0,        -- Regular season losses
  playoff_wins INTEGER DEFAULT 0,         -- Playoff wins
  championship INTEGER DEFAULT 0,         -- 1 if champion, 0 otherwise
  
  -- Calculated scores
  season_score REAL DEFAULT 0,            -- Season Performance score (70%)
  build_score REAL DEFAULT 0,             -- Build Quality score (20%)
  challenge_bonus REAL DEFAULT 0,         -- Challenge Bonus (10%)
  total_score REAL DEFAULT 0,             -- Final weighted score
  
  submitted_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  
  FOREIGN KEY (challenge_id) REFERENCES daily_challenges(challenge_id),
  UNIQUE(challenge_id, hooper_slug)
);

-- Index for fast podium queries
CREATE INDEX IF NOT EXISTS idx_challenge_entries_score 
  ON challenge_entries(challenge_id, total_score DESC, submitted_at ASC);

CREATE INDEX IF NOT EXISTS idx_challenge_entries_challenge 
  ON challenge_entries(challenge_id);

-- Index for challenge date lookup
CREATE INDEX IF NOT EXISTS idx_challenges_date 
  ON daily_challenges(challenge_id, status);
