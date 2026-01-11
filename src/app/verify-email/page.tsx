'use client';

import { useEffect, useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';

function VerifyEmailContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get('email');
  const [counter, setCounter] = useState(5);

  useEffect(() => {
    const timer = setInterval(() => {
      setCounter((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          router.push('/dashboard');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [router]);

  return (
    <>
      {/* Header */}
      <header className="border-b border-gray-200 backdrop-blur-sm bg-white/80">
        <div className="max-w-6xl mx-auto px-4 py-6 flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent">
            Dad Clock
          </Link>
        </div>
      </header>

      {/* Verify Email */}
      <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-blue-50">
        <div className="w-full max-w-md px-4">
          <div className="bg-white border border-gray-200 rounded-xl p-8 shadow-lg text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-amber-400 to-amber-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>

            <h1 className="text-3xl font-bold text-gray-900 mb-2">Verify your email</h1>
            <p className="text-gray-600 mb-6">
              We've sent a verification link to <span className="font-semibold text-gray-900">{email}</span>
            </p>

            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6 text-left">
              <p className="text-gray-700 text-sm leading-relaxed">
                <strong>Check your inbox:</strong> Look for an email from Dad Clock and click the verification link. Make sure to check your spam folder if you don't see it within a few minutes.
              </p>
            </div>

            <p className="text-gray-600 text-sm mb-6">
              Once verified, you'll be able to access your dashboard and start creating schedules.
            </p>

            <Link
              href="/login"
              className="inline-block bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
            >
              Back to Login
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

export default function VerifyEmail() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-gray-50" />}>
      <VerifyEmailContent />
    </Suspense>
  );
}
