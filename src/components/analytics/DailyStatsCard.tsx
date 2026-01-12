'use client';

import { useTheme } from '@/context/ThemeContext';

interface DailyStatsCardProps {
  label: string;
  value: number;
  unit: string;
  trend: 'up' | 'down' | 'neutral';
}

export default function DailyStatsCard({
  label,
  value,
  unit,
  trend
}: DailyStatsCardProps) {
  const { theme } = useTheme();
  const trendColor = trend === 'up' ? 'text-red-400' : trend === 'down' ? 'text-green-400' : theme === 'dark' ? 'text-slate-400' : 'text-gray-500';
  const trendIcon = trend === 'up' ? '↑' : trend === 'down' ? '↓' : '→';

  return (
    <div className={`rounded-lg p-6 border transition-colors duration-200 ${
      theme === 'dark'
        ? 'bg-gradient-to-br from-slate-800 to-slate-700 border-slate-600'
        : 'bg-gradient-to-br from-gray-100 to-gray-50 border-gray-200'
    }`}>
      <p className={`text-sm mb-2 ${theme === 'dark' ? 'text-slate-400' : 'text-gray-600'}`}>{label}</p>
      <div className="flex items-end justify-between">
        <div>
          <p className={`text-3xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{value}</p>
          <p className={`text-sm mt-1 ${theme === 'dark' ? 'text-slate-400' : 'text-gray-600'}`}>{unit}</p>
        </div>
        <span className={`text-2xl ${trendColor}`}>{trendIcon}</span>
      </div>
    </div>
  );
}
