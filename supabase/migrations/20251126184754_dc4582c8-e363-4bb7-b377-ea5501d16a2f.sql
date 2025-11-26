-- Add business context columns to audit_access_codes table
ALTER TABLE audit_access_codes 
  ADD COLUMN IF NOT EXISTS business_reach TEXT CHECK (business_reach IN ('local', 'regional', 'national', 'international')),
  ADD COLUMN IF NOT EXISTS business_model TEXT CHECK (business_model IN ('b2b', 'b2c', 'both')),
  ADD COLUMN IF NOT EXISTS industry TEXT,
  ADD COLUMN IF NOT EXISTS primary_goals TEXT[],
  ADD COLUMN IF NOT EXISTS target_audience TEXT,
  ADD COLUMN IF NOT EXISTS questionnaire_completed BOOLEAN DEFAULT FALSE;