'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { getTodayScreentime, getAppStats } from '@/lib/analytics';

export default function AnalyticsWidget() {
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
    <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg p-6 text-white">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-lg font-semibold">Today's Activity</h3>
        <Link href="/analytics" className="text-blue-100 hover:text-white text-sm">View all →</Link>
      </div>

      {loading ? (
        <div className="animate-pulse space-y-3">
          <div className="h-8 bg-blue-500 rounded w-1/2"></div>
          <div className="h-4 bg-blue-500 rounded w-2/3"></div>
        </div>
      ) : (
        <div className="space-y-4">
          <div>
            <p className="text-blue-100 text-sm">Screen Time</p>
            <p className="text-3xl font-bold">{todayScreentime}m</p>
          </div>
          {topApp && (
            <div>
              <p className="text-blue-100 text-sm">Most Used</p>
              <p className="text-lg font-semibold truncate">{topApp}</p>
            </div>
          )}
          <button
            onClick={loadQuickStats}
            className="w-full mt-4 bg-white/20 hover:bg-white/30 text-white py-2 rounded-lg transition text-sm font-medium"
          >
            Refresh
          </button>
        </div>
      )}
    </div>
  );
}
