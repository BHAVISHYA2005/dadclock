'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useTheme } from '@/context/ThemeContext';
import { getTodayScreentime, getAppStats } from '@/lib/analytics';

export default function AnalyticsWidget() {
  const { theme } = useTheme();
  const [todayScreentime, setTodayScreentime] = useState(0);
  const [topApp, setTopApp] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadQuickStats();
  }, []);

  const loadQuickStats = async () => {
    try {
      setLoading(true);
      const [todayMinutes, appStats] = await Promise.all([
        getTodayScreentime(),
        getAppStats(1)
      ]);

      setTodayScreentime(todayMinutes);
      if (appStats.length > 0) {
        setTopApp(appStats[0].app_name);
      }
    } catch (error) {
      console.error('Error loading analytics widget:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`rounded-lg p-6 transition-colors duration-200 ${
      theme === 'dark'
        ? 'bg-gradient-to-br from-blue-900 to-blue-800 text-white'
        : 'bg-gradient-to-br from-blue-50 to-blue-100 text-blue-900'
    }`}>
      <div className="flex justify-between items-start mb-4">
        <h3 className={`text-lg font-semibold ${theme === 'dark' ? 'text-white' : 'text-blue-900'}`}>
          Today's Activity
        </h3>
        <Link 
          href="/analytics" 
          className={`text-sm transition-colors ${
            theme === 'dark'
              ? 'text-blue-300 hover:text-white'
              : 'text-blue-700 hover:text-blue-900'
          }`}
        >
          View all →
        </Link>
      </div>

      {loading ? (
        <div className="animate-pulse space-y-3">
          <div className={`h-8 rounded w-1/2 ${theme === 'dark' ? 'bg-blue-700' : 'bg-blue-200'}`}></div>
          <div className={`h-4 rounded w-2/3 ${theme === 'dark' ? 'bg-blue-700' : 'bg-blue-200'}`}></div>
        </div>
      ) : (
        <div className="space-y-4">
          <div>
            <p className={`text-sm ${theme === 'dark' ? 'text-blue-300' : 'text-blue-700'}`}>
              Screen Time
            </p>
            <p className={`text-3xl font-bold ${theme === 'dark' ? 'text-white' : 'text-blue-900'}`}>
              {todayScreentime}m
            </p>
          </div>
          {topApp && (
            <div>
              <p className={`text-sm ${theme === 'dark' ? 'text-blue-300' : 'text-blue-700'}`}>
                Most Used
              </p>
              <p className={`text-lg font-semibold truncate ${theme === 'dark' ? 'text-white' : 'text-blue-900'}`}>
                {topApp}
              </p>
            </div>
          )}
          <button
            onClick={loadQuickStats}
            className={`w-full mt-4 py-2 rounded-lg transition text-sm font-medium ${
              theme === 'dark'
                ? 'bg-white/20 hover:bg-white/30 text-white'
                : 'bg-blue-200 hover:bg-blue-300 text-blue-900'
            }`}
          >
            Refresh
          </button>
        </div>
      )}
    </div>
  );
}
