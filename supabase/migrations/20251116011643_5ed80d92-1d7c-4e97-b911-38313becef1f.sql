-- Add commission_value column to leads table to track the actual value after partnerships
ALTER TABLE leads ADD COLUMN commission_value numeric DEFAULT NULL;