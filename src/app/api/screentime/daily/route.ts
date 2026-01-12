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
    const days = parseInt(searchParams.get('days') || '7');
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);

    // Get all screentime logs for the period
    const { data: logs, error: logsError } = await supabase
      .from('screentime_logs')
      .select('logged_date, duration_minutes')
      .eq('user_id', user.id)
      .gte('logged_date', startDate.toISOString().split('T')[0]);

    if (logsError) throw logsError;

    // Aggregate by date
    const dailyStats = new Map<string, number>();

    logs?.forEach(log => {
      const current = dailyStats.get(log.logged_date) || 0;
      dailyStats.set(log.logged_date, current + log.duration_minutes);
    });

    const dailyData = Array.from(dailyStats.entries())
      .map(([date, total_minutes]) => ({ date, total_minutes }))
      .sort((a, b) => a.date.localeCompare(b.date));

    return NextResponse.json(dailyData);
  } catch (error) {
    console.error('Error fetching daily stats:', error);
    return NextResponse.json(
      { error: 'Failed to fetch daily statistics' },
      { status: 500 }
    );
  }
}
