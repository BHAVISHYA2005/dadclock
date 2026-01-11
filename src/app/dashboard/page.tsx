'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';
import { User } from '@supabase/supabase-js';

interface Schedule {
  id: string;
  title: string;
  description: string | null;
  start_time: string;
  end_time: string;
  days: string;
  blocked_apps: string[];
  blocked_websites: string[];
  enabled: boolean;
}

export default function Dashboard() {
  const [user, setUser] = useState<User | null>(null);
  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    const getUser = async () => {
      try {
        const {
          data: { user },
          error: authError,
        } = await supabase.auth.getUser();

        if (authError || !user) {
          router.push('/login');
          return;
        }

        setUser(user);

        // Fetch schedules
        const { data: schedulesData, error: schedulesError } = await supabase
          .from('schedules')
          .select('*')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false });

        if (schedulesError) {
          console.error('Error fetching schedules:', schedulesError);
        } else {
          setSchedules(schedulesData || []);
        }

        setLoading(false);
      } catch (err) {
        setError('Failed to load user data');
        console.error(err);
        setLoading(false);
      }
    };

    getUser();
  }, [router, supabase]);

  const handleDelete = async (scheduleId: string) => {
    if (!confirm('Are you sure you want to delete this schedule?')) return;

    try {
      const { error } = await supabase.from('schedules').delete().eq('id', scheduleId);

      if (error) {
        setError(error.message);
        return;
      }

      setSchedules(schedules.filter((s) => s.id !== scheduleId));
    } catch (err) {
      setError('Failed to delete schedule');
      console.error(err);
    }
  };

  const handleToggle = async (schedule: Schedule) => {
    try {
      const { error } = await supabase
        .from('schedules')
        .update({ enabled: !schedule.enabled })
        .eq('id', schedule.id);

      if (error) {
        setError(error.message);
        return;
      }

      setSchedules(
        schedules.map((s) => (s.id === schedule.id ? { ...s, enabled: !s.enabled } : s))
      );
    } catch (err) {
      setError('Failed to update schedule');
      console.error(err);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Header */}
      <header className="border-b border-gray-200 backdrop-blur-sm bg-white/80">
        <div className="max-w-6xl mx-auto px-4 py-6 flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent">
            Dad Clock
          </Link>
          <div className="flex items-center gap-4">
            <span className="text-gray-700">
              Welcome, <span className="font-semibold">{user?.user_metadata?.full_name || user?.email}</span>
            </span>
            <button
              onClick={handleLogout}
              className="bg-red-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-red-700 transition"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Dashboard Content */}
      <section className="bg-gradient-to-b from-gray-50 to-white min-h-screen">
        <div className="max-w-6xl mx-auto px-4 py-16">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">Your Schedules</h1>
              <p className="text-gray-600">{schedules.length} schedule{schedules.length !== 1 ? 's' : ''} created</p>
            </div>
            <Link
              href="/schedules"
              className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition"
            >
              + Create Schedule
            </Link>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
              {error}
            </div>
          )}

          {schedules.length === 0 ? (
            <div className="bg-white border border-gray-200 rounded-xl p-12 text-center">
              <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6v6m0 0v6m0-6h6m0 0h6m0 0h6M6 12a6 6 0 11-12 0 6 6 0 0112 0z" />
              </svg>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No schedules yet</h3>
              <p className="text-gray-600 mb-6">Create your first schedule to start blocking distractions</p>
              <Link
                href="/schedules"
                className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
              >
                Create Your First Schedule
              </Link>
            </div>
          ) : (
            <div className="grid gap-6">
              {schedules.map((schedule) => (
                <div
                  key={schedule.id}
                  className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-xl font-bold text-gray-900">{schedule.title}</h3>
                        <button
                          onClick={() => handleToggle(schedule)}
                          className={`px-3 py-1 rounded-full text-sm font-semibold transition ${
                            schedule.enabled
                              ? 'bg-green-100 text-green-700'
                              : 'bg-gray-100 text-gray-700'
                          }`}
                        >
                          {schedule.enabled ? 'Enabled' : 'Disabled'}
                        </button>
                      </div>
                      {schedule.description && (
                        <p className="text-gray-600 mb-3">{schedule.description}</p>
                      )}
                    </div>
                    <div className="flex gap-2">
                      <Link
                        href={`/schedules/${schedule.id}`}
                        className="text-blue-600 hover:text-blue-700 font-semibold transition"
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => handleDelete(schedule.id)}
                        className="text-red-600 hover:text-red-700 font-semibold transition"
                      >
                        Delete
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div>
                      <p className="text-xs text-gray-600 uppercase tracking-wide">Time</p>
                      <p className="font-semibold text-gray-900">
                        {schedule.start_time} - {schedule.end_time}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-600 uppercase tracking-wide">Days</p>
                      <p className="font-semibold text-gray-900">{schedule.days}</p>
                    </div>
                    {schedule.blocked_apps.length > 0 && (
                      <div>
                        <p className="text-xs text-gray-600 uppercase tracking-wide">Apps Blocked</p>
                        <p className="font-semibold text-gray-900">{schedule.blocked_apps.length}</p>
                      </div>
                    )}
                    {schedule.blocked_websites.length > 0 && (
                      <div>
                        <p className="text-xs text-gray-600 uppercase tracking-wide">Sites Blocked</p>
                        <p className="font-semibold text-gray-900">{schedule.blocked_websites.length}</p>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
