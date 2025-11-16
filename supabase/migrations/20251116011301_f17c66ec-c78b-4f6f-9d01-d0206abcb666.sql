-- Add payment_type column to leads table
ALTER TABLE leads ADD COLUMN payment_type text DEFAULT 'one_time' CHECK (payment_type IN ('monthly', 'one_time'));