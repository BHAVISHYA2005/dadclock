# Screen Time Analytics - Quick Start Guide

## 🚀 Getting Started

### Step 1: Update Your Database

Run the updated `database-setup.sql` script in your Supabase SQL Editor to create the new tables:

```sql
-- This adds:
-- - screentime_logs table
-- - analytics_summary table
-- - All necessary indexes and RLS policies
```

### Step 2: Access the Analytics Page

Once deployed, navigate to:
```
http://your-app/analytics
```

The page will automatically:
- Load your screentime data
- Calculate daily, weekly, and monthly statistics
- Display visual charts and reports

### Step 3: Start Logging Screentime

From any part of your app where you're tracking device usage:

```typescript
import { logScreentime } from '@/lib/analytics';

// Log Instagram usage - 45 minutes today
await logScreentime('Instagram', 'app', 45);

// Log YouTube - 60 minutes
await logScreentime('YouTube', 'app', 60);

// Log website usage
await logScreentime('github.com', 'website', 90);

// Log with specific date
await logScreentime('TikTok', 'app', 30, '2026-01-11');
```

### Step 4: View Analytics

The dashboard automatically displays:
- **Today's Screen Time** - Current day total
- **This Week** - Last 7 days combined
- **Daily Chart** - Day-by-day breakdown
- **Top Apps** - Most used apps (ranked)
- **Weekly Trends** - Usage patterns and analysis

## 🎯 Key Features

### Real-Time Tracking
- Log any app or website usage
- Automatic timestamp recording
- Flexible date/time parameters

### Visual Analytics
- **Daily Bar Chart** - Easy to spot usage patterns
- **App Rankings** - See which apps consume most time
- **Trend Analysis** - Understand usage direction
- **Statistics Cards** - Quick metrics overview

### Responsive Design
- Mobile-friendly interface
- Works on all screen sizes
- Smooth loading states

### Performance
- Optimized database queries
- Indexed for speed
- Built for scale

## 📊 Dashboard Layout

```
┌─────────────────────────────────────────┐
│  Screen Time Analytics                   │
│  Track and analyze your device usage     │
├─────────────────────────────────────────┤
│                                         │
│  Today        This Week        Apps     │
│  ┌─────────┐  ┌─────────┐  ┌─────────┐ │
│  │ 180 min │  │1260 min │  │ 5 apps  │ │
│  └─────────┘  └─────────┘  └─────────┘ │
│                                         │
│  ┌──────────────────┐ ┌──────────────┐ │
│  │ Daily Chart      │ │ Top Apps     │ │
│  │ (7-day bars)     │ │ (1. Instagram) │
│  │                  │ │ (2. YouTube) │ │
│  └──────────────────┘ └──────────────┘ │
│                                         │
│  ┌──────────────────────────────────┐  │
│  │ Weekly Trend Analysis            │  │
│  │ Peak: 240m | Low: 90m | Avg: 180m│ │
│  └──────────────────────────────────┘  │
│                                         │
│  [Refresh Data]                         │
└─────────────────────────────────────────┘
```

## 🔧 API Reference

### Log Screentime
```bash
POST /api/screentime/logs
Content-Type: application/json

{
  "app_name": "Instagram",
  "category": "app",
  "duration_minutes": 45,
  "logged_date": "2026-01-12"  // optional
}
```

### Get Logs
```bash
GET /api/screentime/logs?days=7
```

### Get App Stats
```bash
GET /api/screentime/apps?days=30

Response:
[
  {
    "app_name": "Instagram",
    "total_minutes": 250,
    "count": 12
  }
]
```

### Get Daily Stats
```bash
GET /api/screentime/daily?days=7

Response:
[
  {
    "date": "2026-01-12",
    "total_minutes": 180
  }
]
```

## 💡 Usage Patterns

### Parent Monitoring
Use analytics to:
- Track child's daily screentime
- Identify problematic apps
- Set informed schedule rules
- Monitor schedule compliance

### Self-Monitoring
Users can:
- See their own usage patterns
- Identify high-usage apps
- Track progress toward goals
- Recognize peak usage times

## 🔐 Privacy & Security

- ✅ All data is user-specific (Row Level Security)
- ✅ Users can only access their own statistics
- ✅ Authentication required for all endpoints
- ✅ Data encrypted in transit
- ✅ Compliant with privacy standards

## ⚡ Integration with Schedules

The analytics feature works alongside existing schedules:

1. **Track During Blocked Times** - Log which apps were used when schedules were active
2. **Measure Effectiveness** - See which schedules actually reduce screentime
3. **Compliance Reports** - Generate reports on schedule adherence
4. **Adjust Schedules** - Use analytics to improve schedule effectiveness

Example:
```
Schedule: "No Apps 9 AM - 5 PM"
Analytics: "Instagram was used 45 minutes during this time"
Action: Strengthen enforcement or investigate technical issues
```

## 🎓 Sample Implementation

Here's a complete example of logging and viewing analytics:

```typescript
// In your schedule enforcement code
import { logScreentime } from '@/lib/analytics';

async function handleAppUsage(appName: string, minutes: number) {
  // Log the usage
  await logScreentime(appName, 'app', minutes);
  
  // Later, view analytics
  const today = await getTodayScreentime();
  console.log(`Today's total: ${today} minutes`);
}
```

## 📱 Mobile Responsiveness

The analytics page is fully responsive:
- **Desktop** - Full dashboard with all charts
- **Tablet** - Optimized layout with stacked sections
- **Mobile** - Single column, scrollable view
- **Landscape** - Adjusted spacing for orientation

## 🐛 Troubleshooting

### No data showing?
1. Ensure you've logged screentime: `await logScreentime(...)`
2. Check dates match: logs use `YYYY-MM-DD` format
3. Verify user is logged in
4. Check browser console for errors

### Slow loading?
1. Dashboard loads data in parallel for speed
2. Consider archiving old data (>90 days)
3. Try reducing date range in queries

### Data not persisting?
1. Verify Supabase credentials are correct
2. Check RLS policies are enabled
3. Ensure user_id matches authenticated user

## 📚 Related Documentation

- [Full Feature Documentation](./ANALYTICS_FEATURE.md)
- [Implementation Details](./ANALYTICS_IMPLEMENTATION.md)
- [Database Schema](./database-setup.sql)

## 🎉 You're Ready!

The analytics feature is fully integrated and ready to use. Start logging screentime data and access the dashboard at `/analytics`!

For questions or improvements, refer to the detailed documentation files.
