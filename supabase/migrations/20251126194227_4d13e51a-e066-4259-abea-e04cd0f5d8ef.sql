-- Add positive_feedback column to audit_results table
ALTER TABLE audit_results ADD COLUMN IF NOT EXISTS positive_feedback TEXT;