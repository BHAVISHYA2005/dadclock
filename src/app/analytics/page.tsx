'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { useTheme } from '@/context/ThemeContext';
import ThemeToggle from '@/components/ThemeToggle';
import ScreenTimeChart from '@/components/analytics/ScreenTimeChart';
import TopAppsCard from '@/components/analytics/TopAppsCard';
import DailyStatsCard from '@/components/analytics/DailyStatsCard';
import WeeklyTrendChart from '@/components/analytics/WeeklyTrendChart';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
);

interface ScreentimeData {
  app_name: string;
  total_minutes: number;
  count: number;
}

interface DailySummary {
  date: string;
  total_minutes: number;
}

export default function AnalyticsPage() {
  const { theme } = useTheme();
  const [loading, setLoading] = useState(true);
  const [todayScreentime, setTodayScreentime] = useState(0);
  const [weeklyScreentime, setWeeklyScreentime] = useState(0);
  const [topApps, setTopApps] = useState<ScreentimeData[]>([]);
  const [dailyData, setDailyData] = useState<DailySummary[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchAnalyticsData();
  }, []);

  const fetchAnalyticsData = async () => {
    try {
      setLoading(true);
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        setError('Please log in to view analytics');
        return;
      }

      // Fetch today's screentime
      const today = new Date().toISOString().split('T')[0];
      const { data: todayData, error: todayError } = await supabase
        .from('screentime_logs')
        .select('duration_minutes')
        .eq('user_id', user.id)
        .eq('logged_date', today);

      if (!todayError && todayData) {
        const totalMinutes = todayData.reduce((sum, log) => sum + log.duration_minutes, 0);
        setTodayScreentime(totalMinutes);
      }

      // Fetch last 7 days screentime
      const weekAgo = new Date();
      weekAgo.setDate(weekAgo.getDate() - 7);
      const weekAgoStr = weekAgo.toISOString().split('T')[0];

      const { data: weekData, error: weekError } = await supabase
        .from('screentime_logs')
        .select('duration_minutes, logged_date')
        .eq('user_id', user.id)
        .gte('logged_date', weekAgoStr);

      if (!weekError && weekData) {
        const weekTotal = weekData.reduce((sum, log) => sum + log.duration_minutes, 0);
        setWeeklyScreentime(weekTotal);

        // Process daily data
        const dailyMap = new Map<string, number>();
        weekData.forEach(log => {
          const current = dailyMap.get(log.logged_date) || 0;
          dailyMap.set(log.logged_date, current + log.duration_minutes);
        });

        const sortedDaily = Array.from(dailyMap.entries())
          .map(([date, minutes]) => ({ date, total_minutes: minutes }))
          .sort((a, b) => a.date.localeCompare(b.date));

        setDailyData(sortedDaily);
      }

      // Fetch top apps (last 30 days)
      const monthAgo = new Date();
      monthAgo.setDate(monthAgo.getDate() - 30);
      const monthAgoStr = monthAgo.toISOString().split('T')[0];

      const { data: appsData, error: appsError } = await supabase
        .from('screentime_logs')
        .select('app_name, duration_minutes')
        .eq('user_id', user.id)
        .gte('logged_date', monthAgoStr);

      if (!appsError && appsData) {
        const appMap = new Map<string, { total: number; count: number }>();
        appsData.forEach(log => {
          const current = appMap.get(log.app_name) || { total: 0, count: 0 };
          appMap.set(log.app_name, {
            total: current.total + log.duration_minutes,
            count: current.count + 1
          });
        });

        const topAppsList = Array.from(appMap.entries())
          .map(([name, data]) => ({
            app_name: name,
            total_minutes: data.total,
            count: data.count
          }))
          .sort((a, b) => b.total_minutes - a.total_minutes)
          .slice(0, 5);

        setTopApps(topAppsList);
      }

      setError(null);
    } catch (err) {
      console.error('Error fetching analytics:', err);
      setError('Failed to load analytics data');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className={`min-h-screen transition-colors duration-200 p-8 ${
        theme === 'dark' 
          ? 'bg-gradient-to-br from-slate-900 to-slate-800' 
          : 'bg-gradient-to-br from-gray-50 to-gray-100'
      }`}>
        <div className="max-w-6xl mx-auto">
          <div className="animate-pulse">
            <div className={`h-12 rounded w-1/3 mb-8 ${theme === 'dark' ? 'bg-slate-700' : 'bg-gray-300'}`}></div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className={`h-40 rounded ${theme === 'dark' ? 'bg-slate-700' : 'bg-gray-300'}`}></div>
              <div className={`h-40 rounded ${theme === 'dark' ? 'bg-slate-700' : 'bg-gray-300'}`}></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`min-h-screen transition-colors duration-200 p-8 ${
        theme === 'dark' 
          ? 'bg-gradient-to-br from-slate-900 to-slate-800' 
          : 'bg-gradient-to-br from-gray-50 to-gray-100'
      }`}>
        <div className="max-w-6xl mx-auto">
          <div className={`border px-6 py-4 rounded-lg ${
            theme === 'dark'
              ? 'bg-red-900/20 border-red-700 text-red-200'
              : 'bg-red-100 border-red-400 text-red-800'
          }`}>
            {error}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen transition-colors duration-200 p-8 ${
      theme === 'dark' 
        ? 'bg-gradient-to-br from-slate-900 to-slate-800' 
        : 'bg-gradient-to-br from-gray-50 to-gray-100'
    }`}>
      <div className="max-w-6xl mx-auto">
        <div className="mb-8 flex justify-between items-start">
          <div>
            <h1 className={`text-4xl font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              Screen Time Analytics
            </h1>
            <p className={theme === 'dark' ? 'text-slate-400' : 'text-gray-600'}>
              Track and analyze your device usage patterns
            </p>
          </div>
          <ThemeToggle />
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <DailyStatsCard
            label="Today's Screen Time"
            value={todayScreentime}
            unit="minutes"
            trend={Math.random() > 0.5 ? 'up' : 'down'}
          />
          <DailyStatsCard
            label="This Week"
            value={weeklyScreentime}
            unit="minutes"
            trend="down"
          />
          <DailyStatsCard
            label="Most Used Apps"
            value={topApps.length}
            unit="apps tracked"
            trend="neutral"
          />
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <ScreenTimeChart data={dailyData} />
          <TopAppsCard apps={topApps} />
        </div>

        {/* Weekly Trend */}
        <div className="mb-8">
          <WeeklyTrendChart data={dailyData} />
        </div>

        {/* Refresh Button */}
        <button
          onClick={fetchAnalyticsData}
          className={`px-6 py-2 rounded-lg transition-colors ${
            theme === 'dark'
              ? 'bg-blue-600 hover:bg-blue-700 text-white'
              : 'bg-blue-500 hover:bg-blue-600 text-white'
          }`}
        >
          Refresh Data
        </button>
      </div>
    </div>
  );
}
