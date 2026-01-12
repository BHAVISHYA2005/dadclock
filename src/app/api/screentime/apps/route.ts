import { createClient } from '@/lib/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const searchParams = request.nextUrl.searchParams;
    const days = parseInt(searchParams.get('days') || '30');
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);

    // Get all screentime logs for the period
    const { data: logs, error: logsError } = await supabase
      .from('screentime_logs')
      .select('app_name, duration_minutes')
      .eq('user_id', user.id)
      .gte('logged_date', startDate.toISOString().split('T')[0]);

    if (logsError) throw logsError;

    // Process and aggregate data
    const appStats = new Map<string, { total_minutes: number; count: number }>();

    logs?.forEach(log => {
      const current = appStats.get(log.app_name) || { total_minutes: 0, count: 0 };
      appStats.set(log.app_name, {
        total_minutes: current.total_minutes + log.duration_minutes,
        count: current.count + 1
      });
    });

    const apps = Array.from(appStats.entries())
      .map(([app_name, stats]) => ({
        app_name,
        total_minutes: stats.total_minutes,
        count: stats.count
      }))
      .sort((a, b) => b.total_minutes - a.total_minutes);

    return NextResponse.json(apps);
  } catch (error) {
    console.error('Error fetching app stats:', error);
    return NextResponse.json(
      { error: 'Failed to fetch app statistics' },
      { status: 500 }
    );
  }
}
