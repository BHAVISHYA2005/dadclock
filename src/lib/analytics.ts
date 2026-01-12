/**
 * Utility functions for screentime analytics API calls
 */

export interface ScreentimeLog {
  id: string;
  user_id: string;
  app_name: string;
  category: 'app' | 'website';
  duration_minutes: number;
  logged_date: string;
  logged_at: string;
  created_at: string;
}

export interface AppStats {
  app_name: string;
  total_minutes: number;
  count: number;
}

export interface DailyStats {
  date: string;
  total_minutes: number;
}

/**
 * Log a new screentime entry
 */
export async function logScreentime(
  appName: string,
  category: 'app' | 'website',
  durationMinutes: number,
  loggedDate?: string
): Promise<ScreentimeLog[]> {
  const response = await fetch('/api/screentime/logs', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      app_name: appName,
      category,
      duration_minutes: durationMinutes,
      logged_date: loggedDate,
    }),
  });

  if (!response.ok) {
    throw new Error('Failed to log screentime');
  }

  return response.json();
}

/**
 * Get screentime logs for a specific period
 */
export async function getScreentimeLogs(days: number = 7): Promise<ScreentimeLog[]> {
  const response = await fetch(`/api/screentime/logs?days=${days}`);

  if (!response.ok) {
    throw new Error('Failed to fetch screentime logs');
  }

  return response.json();
}

/**
 * Get app usage statistics
 */
export async function getAppStats(days: number = 30): Promise<AppStats[]> {
  const response = await fetch(`/api/screentime/apps?days=${days}`);

  if (!response.ok) {
    throw new Error('Failed to fetch app statistics');
  }

  return response.json();
}

/**
 * Get daily screentime statistics
 */
export async function getDailyStats(days: number = 7): Promise<DailyStats[]> {
  const response = await fetch(`/api/screentime/daily?days=${days}`);

  if (!response.ok) {
    throw new Error('Failed to fetch daily statistics');
  }

  return response.json();
}

/**
 * Calculate average screentime for a period
 */
export function calculateAverage(stats: DailyStats[]): number {
  if (stats.length === 0) return 0;
  const total = stats.reduce((sum, stat) => sum + stat.total_minutes, 0);
  return Math.round(total / stats.length);
}

/**
 * Get today's total screentime
 */
export async function getTodayScreentime(): Promise<number> {
  const today = new Date().toISOString().split('T')[0];
  const logs = await getScreentimeLogs(1);
  
  return logs
    .filter(log => log.logged_date === today)
    .reduce((sum, log) => sum + log.duration_minutes, 0);
}
