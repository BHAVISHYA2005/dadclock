-- Dad Clock Schedule Management Database Setup
-- Copy and paste this entire script into your Supabase SQL Editor

-- Create schedules table
CREATE TABLE IF NOT EXISTS schedules (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  start_time TIME NOT NULL,
  end_time TIME NOT NULL,
  days TEXT NOT NULL DEFAULT 'SMTWFS',
  blocked_apps TEXT[] DEFAULT '{}',
  blocked_websites TEXT[] DEFAULT '{}',
  enabled BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS schedules_user_id_idx ON schedules(user_id);

-- Enable RLS (Row Level Security)
ALTER TABLE schedules ENABLE ROW LEVEL SECURITY;

-- Policy 1: Users can view only their own schedules
CREATE POLICY "Users can view their own schedules" ON schedules
  FOR SELECT USING (auth.uid() = user_id);

-- Policy 2: Users can create their own schedules
CREATE POLICY "Users can create their own schedules" ON schedules
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Policy 3: Users can update their own schedules
CREATE POLICY "Users can update their own schedules" ON schedules
  FOR UPDATE USING (auth.uid() = user_id);

-- Policy 4: Users can delete their own schedules
CREATE POLICY "Users can delete their own schedules" ON schedules
  FOR DELETE USING (auth.uid() = user_id);
