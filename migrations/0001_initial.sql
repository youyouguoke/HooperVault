CREATE TABLE IF NOT EXISTS hoopers (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  slug TEXT UNIQUE NOT NULL,
  position TEXT NOT NULL,
  mode TEXT NOT NULL,
  seed INTEGER NOT NULL,
  history TEXT NOT NULL,
  overall INTEGER NOT NULL,
  archetype TEXT NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_hoopers_slug ON hoopers(slug);
CREATE INDEX IF NOT EXISTS idx_hoopers_created ON hoopers(created_at);
