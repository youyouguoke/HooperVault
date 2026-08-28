-- Add published column: 0 = build only, 1 = simulation completed
-- Existing records default to 1 (already visible on leaderboard)
ALTER TABLE hoopers ADD COLUMN published INTEGER DEFAULT 1;
