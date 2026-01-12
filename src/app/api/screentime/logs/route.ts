import { createClient } from '@/lib/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { app_name, category, duration_minutes, logged_date } = body;

    if (!app_name || !category || !duration_minutes) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from('screentime_logs')
      .insert([
        {
          user_id: user.id,
          app_name,
          category,
          duration_minutes,
          logged_date: logged_date || new Date().toISOString().split('T')[0]
        }
      ])
      .select();

    if (error) throw error;

    return NextResponse.json(data);
  } catch (error) {
    console.error('Error logging screentime:', error);
    return NextResponse.json(
      { error: 'Failed to log screentime' },
      { status: 500 }
    );
  }
}

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

    const { data, error } = await supabase
      .from('screentime_logs')
      .select('*')
      .eq('user_id', user.id)
      .gte('logged_date', startDate.toISOString().split('T')[0])
      .order('logged_date', { ascending: false });

    if (error) throw error;

    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching screentime logs:', error);
    return NextResponse.json(
      { error: 'Failed to fetch screentime logs' },
      { status: 500 }
    );
  }
}
