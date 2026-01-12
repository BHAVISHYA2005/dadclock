'use client';

import { useTheme } from '@/context/ThemeContext';

interface DailySummary {
  date: string;
  total_minutes: number;
}

interface ScreenTimeChartProps {
  data: DailySummary[];
}

export default function ScreenTimeChart({ data }: ScreenTimeChartProps) {
  const { theme } = useTheme();
  const maxMinutes = Math.max(...data.map(d => d.total_minutes), 1);
  const averageMinutes = data.length > 0 
    ? Math.round(data.reduce((sum, d) => sum + d.total_minutes, 0) / data.length)
    : 0;

  return (
    <div className={`rounded-lg p-6 border transition-colors duration-200 ${
      theme === 'dark'
        ? 'bg-gradient-to-br from-slate-800 to-slate-700 border-slate-600'
        : 'bg-gradient-to-br from-gray-100 to-gray-50 border-gray-200'
    }`}>
      <h3 className={`text-xl font-semibold mb-6 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
        Daily Screen Time (Last 7 Days)
      </h3>
      
      <div className="space-y-4">
        {data.length === 0 ? (
          <p className={`text-center py-8 ${theme === 'dark' ? 'text-slate-400' : 'text-gray-500'}`}>
            No data available yet
          </p>
        ) : (
          data.map((day) => {
            const percentage = (day.total_minutes / maxMinutes) * 100;
            const date = new Date(day.date);
            const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
            
            return (
              <div key={day.date}>
                <div className="flex justify-between mb-2">
                  <span className={`text-sm ${theme === 'dark' ? 'text-slate-300' : 'text-gray-700'}`}>
                    {dayName} ({day.date})
                  </span>
                  <span className={`text-sm font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                    {day.total_minutes}m
                  </span>
                </div>
                <div className={`w-full rounded-full h-2 ${theme === 'dark' ? 'bg-slate-600' : 'bg-gray-300'}`}>
                  <div
                    className="bg-gradient-to-r from-blue-500 to-blue-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${percentage}%` }}
                  ></div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {data.length > 0 && (
        <div className={`mt-6 pt-6 border-t ${theme === 'dark' ? 'border-slate-600' : 'border-gray-300'}`}>
          <p className={`text-sm ${theme === 'dark' ? 'text-slate-400' : 'text-gray-600'}`}>
            Average Daily Usage: <span className={`font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              {averageMinutes} minutes
            </span>
          </p>
        </div>
      )}
    </div>
  );
}
