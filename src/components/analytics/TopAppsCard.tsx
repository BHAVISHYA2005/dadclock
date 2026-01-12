'use client';

import { useTheme } from '@/context/ThemeContext';

interface ScreentimeData {
  app_name: string;
  total_minutes: number;
  count: number;
}

interface TopAppsCardProps {
  apps: ScreentimeData[];
}

export default function TopAppsCard({ apps }: TopAppsCardProps) {
  const { theme } = useTheme();
  const maxMinutes = Math.max(...apps.map(a => a.total_minutes), 1);

  return (
    <div className={`rounded-lg p-6 border transition-colors duration-200 ${
      theme === 'dark'
        ? 'bg-gradient-to-br from-slate-800 to-slate-700 border-slate-600'
        : 'bg-gradient-to-br from-gray-100 to-gray-50 border-gray-200'
    }`}>
      <h3 className={`text-xl font-semibold mb-6 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
        Top Apps (Last 30 Days)
      </h3>
      
      {apps.length === 0 ? (
        <p className={`text-center py-8 ${theme === 'dark' ? 'text-slate-400' : 'text-gray-500'}`}>
          No app data available yet
        </p>
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
                    <p className={`text-sm font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                      {index + 1}. {app.app_name}
                    </p>
                    <p className={`text-xs ${theme === 'dark' ? 'text-slate-400' : 'text-gray-600'}`}>
                      {app.count} sessions
                    </p>
                  </div>
                  <span className={`text-sm font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                    {app.total_minutes}m
                  </span>
                </div>
                <div className={`w-full rounded-full h-2 ${theme === 'dark' ? 'bg-slate-600' : 'bg-gray-300'}`}>
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
