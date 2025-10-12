-- Add columns to user_signups table (only if they don't exist)
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='user_signups' AND column_name='arrival_date') THEN
        ALTER TABLE user_signups ADD COLUMN arrival_date DATE;
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='user_signups' AND column_name='departure_date') THEN
        ALTER TABLE user_signups ADD COLUMN departure_date DATE;
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='user_signups' AND column_name='additional_notes') THEN
        ALTER TABLE user_signups ADD COLUMN additional_notes TEXT;
    END IF;
END $$;

-- Add columns to partial_signups table (only if they don't exist)
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='partial_signups' AND column_name='arrival_date') THEN
        ALTER TABLE partial_signups ADD COLUMN arrival_date DATE;
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='partial_signups' AND column_name='departure_date') THEN
        ALTER TABLE partial_signups ADD COLUMN departure_date DATE;
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='partial_signups' AND column_name='additional_notes') THEN
        ALTER TABLE partial_signups ADD COLUMN additional_notes TEXT;
    END IF;
END $$;

-- Optional: Add a check constraint to ensure departure is after arrival (only if doesn't exist)
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'check_dates_valid') THEN
        ALTER TABLE user_signups
        ADD CONSTRAINT check_dates_valid 
        CHECK (departure_date > arrival_date OR departure_date IS NULL OR arrival_date IS NULL);
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'check_partial_dates_valid') THEN
        ALTER TABLE partial_signups
        ADD CONSTRAINT check_partial_dates_valid 
        CHECK (departure_date > arrival_date OR departure_date IS NULL OR arrival_date IS NULL);
    END IF;
END $$;

-- Optional: Add indexes for better query performance (only if don't exist)
CREATE INDEX IF NOT EXISTS idx_user_signups_arrival_date ON user_signups(arrival_date);
CREATE INDEX IF NOT EXISTS idx_user_signups_departure_date ON user_signups(departure_date);
CREATE INDEX IF NOT EXISTS idx_partial_signups_arrival_date ON partial_signups(arrival_date);
CREATE INDEX IF NOT EXISTS idx_partial_signups_departure_date ON partial_signups(departure_date);
