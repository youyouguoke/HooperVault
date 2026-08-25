UPDATE hoopers SET
  season_wins = CASE
    WHEN overall >= 90 THEN 55 + ABS(RANDOM()) % 18
    WHEN overall >= 80 THEN 40 + ABS(RANDOM()) % 20
    WHEN overall >= 70 THEN 30 + ABS(RANDOM()) % 15
    ELSE 20 + ABS(RANDOM()) % 15
  END,
  ppg = CASE
    WHEN overall >= 90 THEN 24.0 + (ABS(RANDOM()) % 80) / 10.0
    WHEN overall >= 80 THEN 18.0 + (ABS(RANDOM()) % 70) / 10.0
    WHEN overall >= 70 THEN 12.0 + (ABS(RANDOM()) % 80) / 10.0
    ELSE 8.0 + (ABS(RANDOM()) % 60) / 10.0
  END,
  rpg = CASE
    WHEN position IN ('C','PF','PF/C','C/PF') THEN
      CASE
        WHEN overall >= 90 THEN 10.0 + (ABS(RANDOM()) % 60) / 10.0
        WHEN overall >= 80 THEN 7.0 + (ABS(RANDOM()) % 60) / 10.0
        ELSE 5.0 + (ABS(RANDOM()) % 50) / 10.0
      END
    ELSE
      CASE
        WHEN overall >= 90 THEN 5.0 + (ABS(RANDOM()) % 50) / 10.0
        WHEN overall >= 80 THEN 3.5 + (ABS(RANDOM()) % 40) / 10.0
        ELSE 2.5 + (ABS(RANDOM()) % 30) / 10.0
      END
  END,
  apg = CASE
    WHEN position IN ('PG','PG/SG') THEN
      CASE
        WHEN overall >= 90 THEN 8.0 + (ABS(RANDOM()) % 50) / 10.0
        WHEN overall >= 80 THEN 6.0 + (ABS(RANDOM()) % 40) / 10.0
        ELSE 4.0 + (ABS(RANDOM()) % 30) / 10.0
      END
    ELSE
      CASE
        WHEN overall >= 90 THEN 4.0 + (ABS(RANDOM()) % 40) / 10.0
        WHEN overall >= 80 THEN 2.5 + (ABS(RANDOM()) % 30) / 10.0
        ELSE 1.5 + (ABS(RANDOM()) % 20) / 10.0
      END
  END,
  championship = CASE
    WHEN overall >= 90 AND (ABS(RANDOM()) % 100) < 30 THEN 1
    WHEN overall >= 80 AND (ABS(RANDOM()) % 100) < 15 THEN 1
    WHEN overall >= 70 AND (ABS(RANDOM()) % 100) < 5 THEN 1
    ELSE 0
  END
WHERE season_wins = 0 AND season_losses = 0;
