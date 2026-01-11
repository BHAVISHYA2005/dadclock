// Database setup script - Run once to initialize schedules table
const { createClient } = require('@supabase/supabase-js');

const SUPABASE_URL = 'https://xewxquiikibqwszepwlp.supabase.co';
const SERVICE_ROLE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inhld3hxdWlpa2licXdzemVwd2xwIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2ODA0OTM3NiwiZXhwIjoyMDgzNjI1Mzc2fQ.KZ5LBv4d_hCLUAskS0PuqLf_hHBD054xdwFl061O-po';

const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY);

async function setupDatabase() {
  try {
    console.log('Starting database setup...');

    // Create schedules table
    const { error: createError } = await supabase.rpc('execute_sql', {
      query: `
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

        -- Enable RLS
        ALTER TABLE schedules ENABLE ROW LEVEL SECURITY;

        -- Allow users to see only their own schedules
        CREATE POLICY "Users can view their own schedules" ON schedules
          FOR SELECT USING (auth.uid() = user_id);

        -- Allow users to insert their own schedules
        CREATE POLICY "Users can create their own schedules" ON schedules
          FOR INSERT WITH CHECK (auth.uid() = user_id);

        -- Allow users to update their own schedules
        CREATE POLICY "Users can update their own schedules" ON schedules
          FOR UPDATE USING (auth.uid() = user_id);

        -- Allow users to delete their own schedules
        CREATE POLICY "Users can delete their own schedules" ON schedules
          FOR DELETE USING (auth.uid() = user_id);
      `
    });

    if (createError) {
      console.error('Error setting up database:', createError);
    } else {
      console.log('Database setup complete!');
    }
  } catch (error) {
    console.error('Error:', error);
  }
}

setupDatabase();
