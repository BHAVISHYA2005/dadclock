'use client';

import { useTheme } from '@/context/ThemeContext';

interface DailySummary {
  date: string;
  total_minutes: number;
}

interface WeeklyTrendChartProps {
  data: DailySummary[];
}

export default function WeeklyTrendChart({ data }: WeeklyTrendChartProps) {
  const { theme } = useTheme();
  
  if (data.length === 0) {
    return (
      <div className={`rounded-lg p-6 border transition-colors duration-200 ${
        theme === 'dark'
          ? 'bg-gradient-to-br from-slate-800 to-slate-700 border-slate-600'
          : 'bg-gradient-to-br from-gray-100 to-gray-50 border-gray-200'
      }`}>
        <h3 className={`text-xl font-semibold mb-6 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
          Weekly Trend Analysis
        </h3>
        <p className={`text-center py-8 ${theme === 'dark' ? 'text-slate-400' : 'text-gray-500'}`}>
          No data available yet
        </p>
      </div>
    );
  }

  // Calculate statistics
  const minutes = data.map(d => d.total_minutes);
  const maxMinutes = Math.max(...minutes);
  const minMinutes = Math.min(...minutes);
  const avgMinutes = Math.round(minutes.reduce((a, b) => a + b, 0) / minutes.length);
  const totalMinutes = minutes.reduce((a, b) => a + b, 0);

  // Calculate trend
  const firstHalf = minutes.slice(0, Math.floor(minutes.length / 2));
  const secondHalf = minutes.slice(Math.floor(minutes.length / 2));
  const firstAvg = firstHalf.reduce((a, b) => a + b, 0) / firstHalf.length;
  const secondAvg = secondHalf.reduce((a, b) => a + b, 0) / secondHalf.length;
  const trendDirection = secondAvg > firstAvg ? 'increasing' : 'decreasing';
  const trendPercent = Math.round(Math.abs(((secondAvg - firstAvg) / firstAvg) * 100));

  return (
    <div className={`rounded-lg p-6 border transition-colors duration-200 ${
      theme === 'dark'
        ? 'bg-gradient-to-br from-slate-800 to-slate-700 border-slate-600'
        : 'bg-gradient-to-br from-gray-100 to-gray-50 border-gray-200'
    }`}>
      <h3 className={`text-xl font-semibold mb-6 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
        Weekly Trend Analysis
      </h3>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className={`rounded-lg p-4 ${theme === 'dark' ? 'bg-slate-700/50' : 'bg-gray-200/50'}`}>
          <p className={`text-xs mb-1 ${theme === 'dark' ? 'text-slate-400' : 'text-gray-600'}`}>Peak Usage</p>
          <p className={`text-2xl font-bold ${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'}`}>{maxMinutes}m</p>
        </div>
        
        <div className={`rounded-lg p-4 ${theme === 'dark' ? 'bg-slate-700/50' : 'bg-gray-200/50'}`}>
          <p className={`text-xs mb-1 ${theme === 'dark' ? 'text-slate-400' : 'text-gray-600'}`}>Lowest Usage</p>
          <p className={`text-2xl font-bold ${theme === 'dark' ? 'text-green-400' : 'text-green-600'}`}>{minMinutes}m</p>
        </div>
        
        <div className={`rounded-lg p-4 ${theme === 'dark' ? 'bg-slate-700/50' : 'bg-gray-200/50'}`}>
          <p className={`text-xs mb-1 ${theme === 'dark' ? 'text-slate-400' : 'text-gray-600'}`}>Weekly Average</p>
          <p className={`text-2xl font-bold ${theme === 'dark' ? 'text-purple-400' : 'text-purple-600'}`}>{avgMinutes}m</p>
        </div>
        
        <div className={`rounded-lg p-4 ${theme === 'dark' ? 'bg-slate-700/50' : 'bg-gray-200/50'}`}>
          <p className={`text-xs mb-1 ${theme === 'dark' ? 'text-slate-400' : 'text-gray-600'}`}>Total Weekly</p>
          <p className={`text-2xl font-bold ${theme === 'dark' ? 'text-orange-400' : 'text-orange-600'}`}>{totalMinutes}m</p>
        </div>
      </div>

      <div className={`mt-6 pt-6 border-t ${theme === 'dark' ? 'border-slate-600' : 'border-gray-300'}`}>
        <p className={`text-sm ${theme === 'dark' ? 'text-slate-400' : 'text-gray-600'}`}>
          Usage is <span className={`font-semibold ${trendDirection === 'increasing' ? 'text-red-400' : 'text-green-400'}`}>
            {trendDirection} {trendPercent}%
          </span> compared to earlier in the week
        </p>
      </div>

      {/* Mini bar chart */}
      <div className="mt-6 flex items-end justify-between h-32 gap-1">
        {data.map((day) => {
          const height = (day.total_minutes / maxMinutes) * 100;
          const date = new Date(day.date);
          const dayName = date.toLocaleDateString('en-US', { weekday: 'narrow' });
          
          return (
            <div key={day.date} className="flex-1 flex flex-col items-center">
              <div className={`w-full rounded-t-lg ${theme === 'dark' ? 'bg-slate-600' : 'bg-gray-300'}`} style={{ height: `${Math.max(height, 10)}%` }}>
                <div
                  className="w-full bg-gradient-to-t from-blue-500 to-blue-400 rounded-t-lg transition-all"
                  style={{ height: `${height}%` }}
                ></div>
              </div>
              <span className={`text-xs mt-2 ${theme === 'dark' ? 'text-slate-400' : 'text-gray-600'}`}>{dayName}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
