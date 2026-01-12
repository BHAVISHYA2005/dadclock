'use client';

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
  const trendColor = trend === 'up' ? 'text-red-400' : trend === 'down' ? 'text-green-400' : 'text-slate-400';
  const trendIcon = trend === 'up' ? '↑' : trend === 'down' ? '↓' : '→';

  return (
    <div className="bg-gradient-to-br from-slate-800 to-slate-700 rounded-lg p-6 border border-slate-600">
      <p className="text-slate-400 text-sm mb-2">{label}</p>
      <div className="flex items-end justify-between">
        <div>
          <p className="text-3xl font-bold text-white">{value}</p>
          <p className="text-slate-400 text-sm mt-1">{unit}</p>
        </div>
        <span className={`text-2xl ${trendColor}`}>{trendIcon}</span>
      </div>
    </div>
  );
}
