-- Add season stats and playoff data columns to hoopers table
-- These may already exist from manual additions, so use IF NOT EXISTS patterns
ALTER TABLE hoopers ADD COLUMN season_wins INTEGER DEFAULT 0;
ALTER TABLE hoopers ADD COLUMN season_losses INTEGER DEFAULT 0;
ALTER TABLE hoopers ADD COLUMN ppg REAL DEFAULT 0;
ALTER TABLE hoopers ADD COLUMN rpg REAL DEFAULT 0;
ALTER TABLE hoopers ADD COLUMN apg REAL DEFAULT 0;
ALTER TABLE hoopers ADD COLUMN championship INTEGER DEFAULT 0;
ALTER TABLE hoopers ADD COLUMN playoffs_json TEXT;
