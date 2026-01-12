'use client';

interface DailySummary {
  date: string;
  total_minutes: number;
}

interface ScreenTimeChartProps {
  data: DailySummary[];
}

export default function ScreenTimeChart({ data }: ScreenTimeChartProps) {
  const maxMinutes = Math.max(...data.map(d => d.total_minutes), 1);
  const averageMinutes = data.length > 0 
    ? Math.round(data.reduce((sum, d) => sum + d.total_minutes, 0) / data.length)
    : 0;

  return (
    <div className="bg-gradient-to-br from-slate-800 to-slate-700 rounded-lg p-6 border border-slate-600">
      <h3 className="text-xl font-semibold text-white mb-6">Daily Screen Time (Last 7 Days)</h3>
      
      <div className="space-y-4">
        {data.length === 0 ? (
          <p className="text-slate-400 text-center py-8">No data available yet</p>
        ) : (
          data.map((day) => {
            const percentage = (day.total_minutes / maxMinutes) * 100;
            const date = new Date(day.date);
            const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
            
            return (
              <div key={day.date}>
                <div className="flex justify-between mb-2">
                  <span className="text-sm text-slate-300">{dayName} ({day.date})</span>
                  <span className="text-sm font-semibold text-white">{day.total_minutes}m</span>
                </div>
                <div className="w-full bg-slate-600 rounded-full h-2">
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
        <div className="mt-6 pt-6 border-t border-slate-600">
          <p className="text-sm text-slate-400">
            Average Daily Usage: <span className="text-white font-semibold">{averageMinutes} minutes</span>
          </p>
        </div>
      )}
    </div>
  );
}
