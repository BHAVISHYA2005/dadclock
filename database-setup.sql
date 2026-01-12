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

-- Create screentime_logs table for tracking actual usage
CREATE TABLE IF NOT EXISTS screentime_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  app_name TEXT NOT NULL,
  category TEXT NOT NULL, -- 'app' or 'website'
  duration_minutes INTEGER NOT NULL,
  logged_date DATE NOT NULL,
  logged_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS screentime_logs_user_id_idx ON screentime_logs(user_id);
CREATE INDEX IF NOT EXISTS screentime_logs_date_idx ON screentime_logs(logged_date);
CREATE INDEX IF NOT EXISTS screentime_logs_user_date_idx ON screentime_logs(user_id, logged_date);

-- Enable RLS on screentime_logs
ALTER TABLE screentime_logs ENABLE ROW LEVEL SECURITY;

-- Policy 1: Users can view only their own screentime logs
CREATE POLICY "Users can view their own screentime logs" ON screentime_logs
  FOR SELECT USING (auth.uid() = user_id);

-- Policy 2: Users can create their own screentime logs
CREATE POLICY "Users can create their own screentime logs" ON screentime_logs
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Create analytics_summary table for daily aggregates
CREATE TABLE IF NOT EXISTS analytics_summary (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  summary_date DATE NOT NULL,
  total_screentime_minutes INTEGER DEFAULT 0,
  app_count INTEGER DEFAULT 0,
  most_used_app TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, summary_date)
);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS analytics_summary_user_id_idx ON analytics_summary(user_id);
CREATE INDEX IF NOT EXISTS analytics_summary_date_idx ON analytics_summary(summary_date);

-- Enable RLS on analytics_summary
ALTER TABLE analytics_summary ENABLE ROW LEVEL SECURITY;

-- Policy 1: Users can view only their own analytics
CREATE POLICY "Users can view their own analytics" ON analytics_summary
  FOR SELECT USING (auth.uid() = user_id);

-- Policy 2: Users can create their own analytics
CREATE POLICY "Users can create their own analytics" ON analytics_summary
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Policy 3: Users can update their own analytics
CREATE POLICY "Users can update their own analytics" ON analytics_summary
  FOR UPDATE USING (auth.uid() = user_id);
