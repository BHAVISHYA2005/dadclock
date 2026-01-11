'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';

const DAYS = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
const DAY_NAMES = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

export default function CreateSchedule() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [startTime, setStartTime] = useState('09:00');
  const [endTime, setEndTime] = useState('17:00');
  const [selectedDays, setSelectedDays] = useState('SMTWFS');
  const [blockedApps, setBlockedApps] = useState('');
  const [blockedWebsites, setBlockedWebsites] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const router = useRouter();
  const supabase = createClient();

  const toggleDay = (dayIndex: number) => {
    const daysArray = selectedDays.split('');
    daysArray[dayIndex] = daysArray[dayIndex] === DAYS[dayIndex] ? '-' : DAYS[dayIndex];
    setSelectedDays(daysArray.join(''));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const { data: userData } = await supabase.auth.getUser();
      if (!userData.user) {
        setError('Please log in first');
        setLoading(false);
        return;
      }

      const appsArray = blockedApps
        .split(',')
        .map((app) => app.trim())
        .filter((app) => app);

      const websitesArray = blockedWebsites
        .split(',')
        .map((website) => website.trim())
        .filter((website) => website);

      const { error: insertError } = await supabase.from('schedules').insert({
        user_id: userData.user.id,
        title,
        description: description || null,
        start_time: startTime,
        end_time: endTime,
        days: selectedDays,
        blocked_apps: appsArray,
        blocked_websites: websitesArray,
        enabled: true,
      });

      if (insertError) {
        setError(insertError.message);
        setLoading(false);
        return;
      }

      setSuccess(true);
      setTimeout(() => {
        router.push('/dashboard');
      }, 1500);
    } catch (err) {
      setError('An unexpected error occurred');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Header */}
      <header className="border-b border-gray-200 backdrop-blur-sm bg-white/80">
        <div className="max-w-6xl mx-auto px-4 py-6 flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent">
            Dad Clock
          </Link>
          <Link href="/dashboard" className="text-blue-600 hover:text-blue-700 font-semibold">
            Back to Dashboard
          </Link>
        </div>
      </header>

      {/* Create Schedule Form */}
      <section className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 py-12">
        <div className="max-w-2xl mx-auto px-4">
          <div className="bg-white border border-gray-200 rounded-xl p-8 shadow-lg">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Create Schedule</h1>
            <p className="text-gray-600 mb-8">Set up a new schedule to block apps and websites</p>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6 flex items-center gap-3">
                <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
                <span>{error}</span>
              </div>
            )}

            {success && (
              <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg mb-6 flex items-center gap-3">
                <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Schedule created! Redirecting...</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Title */}
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">Schedule Title</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g., Study Time, Workout, Sleep"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-gray-900"
                  required
                  disabled={loading}
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">Description (Optional)</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="e.g., Focus on coursework"
                  rows={3}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-gray-900 resize-none"
                  disabled={loading}
                />
              </div>

              {/* Time Range */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">Start Time</label>
                  <input
                    type="time"
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-gray-900"
                    required
                    disabled={loading}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">End Time</label>
                  <input
                    type="time"
                    value={endTime}
                    onChange={(e) => setEndTime(e.target.value)}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-gray-900"
                    required
                    disabled={loading}
                  />
                </div>
              </div>

              {/* Days Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-3">Apply on Days</label>
                <div className="grid grid-cols-7 gap-2">
                  {DAYS.map((day, index) => (
                    <button
                      key={index}
                      type="button"
                      onClick={() => toggleDay(index)}
                      disabled={loading}
                      className={`py-3 rounded-lg font-semibold transition ${
                        selectedDays[index] === day
                          ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      } disabled:opacity-50`}
                    >
                      {DAY_NAMES[index][0]}
                    </button>
                  ))}
                </div>
              </div>

              {/* Blocked Apps */}
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">Blocked Apps (comma-separated)</label>
                <input
                  type="text"
                  value={blockedApps}
                  onChange={(e) => setBlockedApps(e.target.value)}
                  placeholder="e.g., Instagram, TikTok, Twitter"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-gray-900"
                  disabled={loading}
                />
              </div>

              {/* Blocked Websites */}
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">Blocked Websites (comma-separated)</label>
                <input
                  type="text"
                  value={blockedWebsites}
                  onChange={(e) => setBlockedWebsites(e.target.value)}
                  placeholder="e.g., youtube.com, reddit.com, netflix.com"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-gray-900"
                  disabled={loading}
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 rounded-lg font-bold hover:shadow-lg transition disabled:from-gray-400 disabled:to-gray-400 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Creating...
                  </span>
                ) : (
                  'Create Schedule'
                )}
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
