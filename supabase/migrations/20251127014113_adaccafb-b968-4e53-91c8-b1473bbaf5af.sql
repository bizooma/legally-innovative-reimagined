-- Add new columns to audit_access_codes for executive summary and action plan
ALTER TABLE audit_access_codes
ADD COLUMN IF NOT EXISTS executive_summary_strengths TEXT,
ADD COLUMN IF NOT EXISTS executive_summary_gaps TEXT,
ADD COLUMN IF NOT EXISTS action_plan JSONB;

-- Add comment for documentation
COMMENT ON COLUMN audit_access_codes.executive_summary_strengths IS 'AI-generated bullet points highlighting what the website is doing well';
COMMENT ON COLUMN audit_access_codes.executive_summary_gaps IS 'AI-generated bullet points highlighting key areas needing attention';
COMMENT ON COLUMN audit_access_codes.action_plan IS 'Tiered action plan with prioritized recommendations (Tier 1: Foundation, Tier 2: Growth, Tier 3: Advanced)';