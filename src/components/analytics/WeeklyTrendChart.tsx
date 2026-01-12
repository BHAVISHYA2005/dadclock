'use client';

interface DailySummary {
  date: string;
  total_minutes: number;
}

interface WeeklyTrendChartProps {
  data: DailySummary[];
}

export default function WeeklyTrendChart({ data }: WeeklyTrendChartProps) {
  if (data.length === 0) {
    return (
      <div className="bg-gradient-to-br from-slate-800 to-slate-700 rounded-lg p-6 border border-slate-600">
        <h3 className="text-xl font-semibold text-white mb-6">Weekly Trend Analysis</h3>
        <p className="text-slate-400 text-center py-8">No data available yet</p>
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
    <div className="bg-gradient-to-br from-slate-800 to-slate-700 rounded-lg p-6 border border-slate-600">
      <h3 className="text-xl font-semibold text-white mb-6">Weekly Trend Analysis</h3>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-slate-700/50 rounded-lg p-4">
          <p className="text-xs text-slate-400 mb-1">Peak Usage</p>
          <p className="text-2xl font-bold text-blue-400">{maxMinutes}m</p>
        </div>
        
        <div className="bg-slate-700/50 rounded-lg p-4">
          <p className="text-xs text-slate-400 mb-1">Lowest Usage</p>
          <p className="text-2xl font-bold text-green-400">{minMinutes}m</p>
        </div>
        
        <div className="bg-slate-700/50 rounded-lg p-4">
          <p className="text-xs text-slate-400 mb-1">Weekly Average</p>
          <p className="text-2xl font-bold text-purple-400">{avgMinutes}m</p>
        </div>
        
        <div className="bg-slate-700/50 rounded-lg p-4">
          <p className="text-xs text-slate-400 mb-1">Total Weekly</p>
          <p className="text-2xl font-bold text-orange-400">{totalMinutes}m</p>
        </div>
      </div>

      <div className="mt-6 pt-6 border-t border-slate-600">
        <p className="text-sm text-slate-400">
          Usage is <span className={`${trendDirection === 'increasing' ? 'text-red-400' : 'text-green-400'} font-semibold`}>
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
              <div className="w-full bg-slate-600 rounded-t-lg" style={{ height: `${Math.max(height, 10)}%` }}>
                <div
                  className="w-full bg-gradient-to-t from-blue-500 to-blue-400 rounded-t-lg transition-all"
                  style={{ height: `${height}%` }}
                ></div>
              </div>
              <span className="text-xs text-slate-400 mt-2">{dayName}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
