-- Migration: Add initial_setup_completed column to profiles table
-- This column tracks whether a new user has received their default food list

ALTER TABLE profiles 
ADD COLUMN IF NOT EXISTS initial_setup_completed BOOLEAN DEFAULT FALSE;

-- Set existing users as already completed (they don't need the default list)
UPDATE profiles 
SET initial_setup_completed = TRUE 
WHERE initial_setup_completed IS NULL OR initial_setup_completed = FALSE;

-- Note: New users will have initial_setup_completed = FALSE by default
-- The useFirstTimeSetup hook will create their default list and set it to TRUE
