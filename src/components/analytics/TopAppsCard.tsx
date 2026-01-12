'use client';

interface ScreentimeData {
  app_name: string;
  total_minutes: number;
  count: number;
}

interface TopAppsCardProps {
  apps: ScreentimeData[];
}

export default function TopAppsCard({ apps }: TopAppsCardProps) {
  const maxMinutes = Math.max(...apps.map(a => a.total_minutes), 1);

  return (
    <div className="bg-gradient-to-br from-slate-800 to-slate-700 rounded-lg p-6 border border-slate-600">
      <h3 className="text-xl font-semibold text-white mb-6">Top Apps (Last 30 Days)</h3>
      
      {apps.length === 0 ? (
        <p className="text-slate-400 text-center py-8">No app data available yet</p>
      ) : (
        <div className="space-y-4">
          {apps.map((app, index) => {
            const percentage = (app.total_minutes / maxMinutes) * 100;
            const colors = [
              'from-red-500 to-red-600',
              'from-orange-500 to-orange-600',
              'from-yellow-500 to-yellow-600',
              'from-green-500 to-green-600',
              'from-purple-500 to-purple-600'
            ];
            const colorClass = colors[index % colors.length];
            
            return (
              <div key={app.app_name}>
                <div className="flex justify-between mb-2">
                  <div className="flex-1">
                    <p className="text-sm font-medium text-white">{index + 1}. {app.app_name}</p>
                    <p className="text-xs text-slate-400">{app.count} sessions</p>
                  </div>
                  <span className="text-sm font-semibold text-white">{app.total_minutes}m</span>
                </div>
                <div className="w-full bg-slate-600 rounded-full h-2">
                  <div
                    className={`bg-gradient-to-r ${colorClass} h-2 rounded-full transition-all duration-300`}
                    style={{ width: `${percentage}%` }}
                  ></div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
