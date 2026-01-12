/**
 * TypeScript types for the Analytics feature
 */

/**
 * A single screentime log entry
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

/**
 * Aggregated app usage statistics
 */
export interface AppStats {
  app_name: string;
  total_minutes: number;
  count: number; // Number of sessions
}

/**
 * Daily aggregated screentime statistics
 */
export interface DailyStats {
  date: string;
  total_minutes: number;
}

/**
 * Daily analytics summary from database
 */
export interface AnalyticsSummary {
  id: string;
  user_id: string;
  summary_date: string;
  total_screentime_minutes: number;
  app_count: number;
  most_used_app: string | null;
  created_at: string;
  updated_at: string;
}

/**
 * Props for ScreenTimeChart component
 */
export interface ScreenTimeChartProps {
  data: DailyStats[];
}

/**
 * Props for TopAppsCard component
 */
export interface TopAppsCardProps {
  apps: AppStats[];
}

/**
 * Props for DailyStatsCard component
 */
export interface DailyStatsCardProps {
  label: string;
  value: number;
  unit: string;
  trend: 'up' | 'down' | 'neutral';
}

/**
 * Props for WeeklyTrendChart component
 */
export interface WeeklyTrendChartProps {
  data: DailyStats[];
}

/**
 * Trend analysis result
 */
export interface TrendAnalysis {
  direction: 'increasing' | 'decreasing' | 'stable';
  percentChange: number;
  peakMinutes: number;
  lowMinutes: number;
  averageMinutes: number;
  totalMinutes: number;
}

/**
 * API request/response types
 */
export namespace API {
  /**
   * POST /api/screentime/logs request body
   */
  export interface LogScreentimeRequest {
    app_name: string;
    category: 'app' | 'website';
    duration_minutes: number;
    logged_date?: string;
  }

  /**
   * API error response
   */
  export interface ErrorResponse {
    error: string;
  }
}

/**
 * Filter options for analytics queries
 */
export interface AnalyticsFilterOptions {
  days?: number;
  startDate?: string;
  endDate?: string;
  category?: 'app' | 'website' | 'all';
  appName?: string;
}

/**
 * Complete analytics data set
 */
export interface AnalyticsData {
  todayScreentime: number;
  weeklyScreentime: number;
  topApps: AppStats[];
  dailyStats: DailyStats[];
  averageDaily: number;
  peakDay: {
    date: string;
    minutes: number;
  };
}

/**
 * Analytics dashboard state
 */
export interface AnalyticsDashboardState {
  loading: boolean;
  error: string | null;
  data: AnalyticsData | null;
  lastUpdated: Date | null;
}
