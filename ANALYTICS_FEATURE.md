# Screen Time Analytics Feature

## Overview
The Screen Time Analytics feature allows users to track, monitor, and analyze their device usage patterns. Parents can see detailed reports about how much time is being spent on apps and websites, helping them understand usage habits and set better schedules.

## Components

### Database Schema

#### 1. `screentime_logs` Table
Stores individual screentime entries for tracking actual usage.

```sql
- id: UUID (Primary Key)
- user_id: UUID (References auth.users)
- app_name: TEXT (Name of app/website)
- category: TEXT ('app' or 'website')
- duration_minutes: INTEGER (Time spent in minutes)
- logged_date: DATE (Date of the activity)
- logged_at: TIMESTAMP (When the log was created)
- created_at: TIMESTAMP (Creation timestamp)
```

**Indexes:**
- `screentime_logs_user_id_idx` - For faster user-specific queries
- `screentime_logs_date_idx` - For date-range queries
- `screentime_logs_user_date_idx` - Combined index for user+date queries

**RLS Policies:**
- Users can only view their own logs
- Users can only create their own logs

#### 2. `analytics_summary` Table
Aggregated daily statistics for improved query performance.

```sql
- id: UUID (Primary Key)
- user_id: UUID (References auth.users)
- summary_date: DATE (The date being summarized)
- total_screentime_minutes: INTEGER (Total time that day)
- app_count: INTEGER (Number of unique apps used)
- most_used_app: TEXT (Most used app name)
- created_at: TIMESTAMP
- updated_at: TIMESTAMP
```

**Indexes:**
- `analytics_summary_user_id_idx` - For user queries
- `analytics_summary_date_idx` - For date queries

**RLS Policies:**
- Users can view only their own analytics
- Users can create and update their own analytics

## API Endpoints

### POST/GET `/api/screentime/logs`
**POST:** Log a new screentime entry
- **Body:** `{ app_name, category, duration_minutes, logged_date? }`
- **Response:** Created screentime log

**GET:** Retrieve screentime logs for a period
- **Query:** `?days=7` (default)
- **Response:** Array of screentime logs

### GET `/api/screentime/apps`
Retrieve app usage statistics

- **Query:** `?days=30` (default)
- **Response:** Array of app stats sorted by total minutes
  ```json
  [
    {
      "app_name": "Instagram",
      "total_minutes": 250,
      "count": 12
    }
  ]
  ```

### GET `/api/screentime/daily`
Retrieve daily aggregated statistics

- **Query:** `?days=7` (default)
- **Response:** Array of daily stats
  ```json
  [
    {
      "date": "2026-01-12",
      "total_minutes": 180
    }
  ]
  ```

## Frontend Components

### Analytics Page (`/analytics`)
Main analytics dashboard showing:
- **Today's Screen Time** - Current day usage
- **Weekly Total** - Last 7 days combined
- **Most Used Apps** - Top 5 apps count
- **Daily Screen Time Chart** - 7-day bar chart
- **Top Apps Card** - App usage breakdown
- **Weekly Trend Chart** - Trend analysis with statistics

### Sub-Components

#### `DailyStatsCard`
Displays a single metric with trend indicator (up/down/neutral)
- **Props:** label, value, unit, trend
- **Features:** Color-coded trends, clean metric display

#### `ScreenTimeChart`
Shows daily usage as horizontal bars for last 7 days
- **Props:** data (DailySummary[])
- **Features:** Average calculation, visual comparison

#### `TopAppsCard`
Displays top 5 most used apps with usage bars
- **Props:** apps (AppStats[])
- **Features:** Ranked list, usage percentage bars, session count

#### `WeeklyTrendChart`
Comprehensive trend analysis with statistics
- **Props:** data (DailySummary[])
- **Features:** Peak/low/average usage, trend direction, mini bar chart

## Utility Functions (`lib/analytics.ts`)

```typescript
// Log new screentime entry
logScreentime(appName, category, durationMinutes, loggedDate?)

// Get screentime logs
getScreentimeLogs(days = 7)

// Get app statistics
getAppStats(days = 30)

// Get daily statistics
getDailyStats(days = 7)

// Calculate average screentime
calculateAverage(stats)

// Get today's total
getTodayScreentime()
```

## Usage Examples

### Logging Screentime (from a parent app)
```typescript
import { logScreentime } from '@/lib/analytics';

// Log 30 minutes on Instagram today
await logScreentime('Instagram', 'app', 30);

// Log 45 minutes on YouTube on a specific date
await logScreentime('YouTube', 'app', 45, '2026-01-11');
```

### Fetching Analytics Data
```typescript
import { getAppStats, getDailyStats, getTodayScreentime } from '@/lib/analytics';

// Get app usage for last 30 days
const apps = await getAppStats(30);

// Get daily stats for last week
const daily = await getDailyStats(7);

// Get today's total usage
const todayMinutes = await getTodayScreentime();
```

## Data Aggregation Strategy

The feature uses a two-tier approach:

1. **Real-time Logs** - `screentime_logs` table captures every activity
   - Provides detailed, granular data
   - Used for specific app/session analysis
   - Indexed for efficient queries

2. **Daily Summaries** - `analytics_summary` table for performance
   - Pre-aggregated daily totals
   - Faster dashboard queries
   - Can be updated via background job

## Security

- **Row Level Security (RLS)** enforced on all tables
- Users can only access their own data
- All API endpoints require authentication
- User ID verified on server side

## Future Enhancements

1. **Background Job for Summary Updates** - Automatically aggregate daily stats
2. **Export Reports** - PDF/CSV export of analytics
3. **Alerts/Notifications** - Notify when usage exceeds thresholds
4. **Category Analytics** - Group apps by category (social, gaming, productivity)
5. **Weekly Goals** - Set and track screentime goals
6. **Comparison** - Compare current week to previous weeks
7. **Device Breakdown** - Track usage by device
8. **Time of Day Analysis** - Show when usage peaks

## Integration with Schedules

The analytics data can be correlated with the existing `schedules` table to:
- Show what apps were used during scheduled blocked times
- Identify which schedules are most effective
- Measure compliance with schedule rules
- Generate compliance reports

## Performance Considerations

- Indexes optimized for user_id and date queries
- Daily summary table reduces query load
- Consider archiving old data (>90 days) for storage efficiency
- Cache frequently accessed analytics in frontend

## Testing

Example test data insert:
```sql
INSERT INTO screentime_logs (user_id, app_name, category, duration_minutes, logged_date)
VALUES 
  ('user-uuid', 'Instagram', 'app', 45, '2026-01-12'),
  ('user-uuid', 'YouTube', 'app', 60, '2026-01-12'),
  ('user-uuid', 'GitHub', 'website', 90, '2026-01-12');
```
