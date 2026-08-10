#!/bin/bash
# Generate daily challenge script
# This script should be run daily via cron job

# Load environment
source ~/.cloudflare_env

# Call the generate API
curl -X POST "https://hoopervault.com/api/challenge/generate" \
  -H "Content-Type: application/json" \
  --silent \
  --fail \
  --show-error \
  --output /tmp/challenge_response.json \
  && echo "Challenge generated successfully" \
  || echo "Failed to generate challenge"
