import Link from 'next/link';

export default function Home() {
  const schedules = [
    {
      title: "Keep up with your studies",
      time: "2:00 PM",
      items: "3 apps and 5 websites",
      days: "SMTWSFS"
    },
    {
      title: "Maintain fitness",
      time: "6:00 AM",
      items: "2 apps",
      days: "SMTWSFS"
    },
    {
      title: "Don't skip workouts",
      time: "5:00 PM",
      items: "13 categories",
      days: "SMTWSFS"
    },
    {
      title: "Relax and unwind",
      time: "8:00 PM",
      items: "4 apps",
      days: "SMTWSFS"
    }
  ];

  const features = [
    {
      title: "He decides when it's time",
      description: "Set strict alarms that don't negotiate. When it's time, it's time."
    },
    {
      title: "He takes your phone away",
      description: "Dad Clock blocks apps and websites that keep you from doing what you should be doing."
    },
    {
      title: "He knows your routine",
      description: "Different schedules for sleep, work, study, fitness — all enforced without asking how you feel today."
    },
    {
      title: "He doesn't remind. He insists.",
      description: "No soft nudges. No 'maybe later.' Just action."
    }
  ];

  return (
    <>
      {/* Header */}
      <header className="border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 py-6 flex items-center justify-between">
          <div className="text-2xl font-bold text-gray-900">Dad Clock</div>
          <nav className="hidden md:flex gap-8 text-gray-700">
            <Link href="#features" className="hover:text-gray-900">Features</Link>
            <Link href="/help" className="hover:text-gray-900">Help</Link>
            <Link href="/blog" className="hover:text-gray-900">Blog</Link>
            <Link href="/download" className="hover:text-gray-900">Download</Link>
            <Link href="/login" className="text-blue-600 hover:text-blue-700 font-semibold">Login</Link>
            <Link href="/signup" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">Sign Up</Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-white">
        <div className="max-w-6xl mx-auto px-4 py-20 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Dad said it's time
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Dad Clock keeps you on schedule — by blocking distractions and making sure you do what you said you would.
          </p>
          <Link href="/download" className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition">
            Download App
          </Link>
        </div>
      </section>

      {/* Schedules Grid */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {schedules.map((schedule, index) => (
            <div key={index} className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">{schedule.title}</h3>
              <div className="flex items-center justify-between mb-4">
                <span className="text-3xl font-bold text-blue-600">{schedule.time}</span>
                <button className="text-gray-400 hover:text-gray-600">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                </button>
              </div>
              <p className="text-sm text-gray-600 mb-3">{schedule.items}</p>
              <div className="flex gap-1 text-sm text-gray-700 font-medium">
                {schedule.days.split('').map((day, i) => (
                  <span key={i} className="w-6 h-6 flex items-center justify-center bg-gray-100 rounded text-xs">{day}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="bg-gray-50 py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-gray-900 text-center mb-4">What he does for you</h2>
          <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
            Everything you need to take control of your time and focus
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {features.map((feature, index) => (
              <div key={index} className="flex flex-col">
                <div className="bg-gradient-to-br from-blue-100 to-blue-50 rounded-lg h-64 mb-6 flex items-center justify-center border border-blue-200">
                  <span className="text-blue-400 font-medium">Feature Illustration</span>
                </div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600 text-lg">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-600 text-white py-16">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-4">You don't need more motivation</h2>
          <p className="text-lg text-blue-100 mb-8 max-w-2xl mx-auto">
            Start doing what you said you would. He shouldn't have to ask twice.
          </p>
          <Link href="/download" className="inline-block bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition">
            Download App
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 bg-white">
        <div className="max-w-6xl mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="font-semibold text-gray-900 mb-4">Dad Clock</h3>
              <p className="text-gray-600 text-sm">Keep your routine on track.</p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-4">Product</h4>
              <ul className="space-y-2">
                <li><Link href="#features" className="text-gray-600 hover:text-gray-900 text-sm">Features</Link></li>
                <li><Link href="/download" className="text-gray-600 hover:text-gray-900 text-sm">Download</Link></li>
                <li><Link href="/blog" className="text-gray-600 hover:text-gray-900 text-sm">Blog</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-4">Resources</h4>
              <ul className="space-y-2">
                <li><Link href="/help" className="text-gray-600 hover:text-gray-900 text-sm">Help</Link></li>
                <li><Link href="/about" className="text-gray-600 hover:text-gray-900 text-sm">About</Link></li>
                <li><Link href="/contact" className="text-gray-600 hover:text-gray-900 text-sm">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-4">Legal</h4>
              <ul className="space-y-2">
                <li><Link href="/privacy" className="text-gray-600 hover:text-gray-900 text-sm">Privacy Policy</Link></li>
                <li><Link href="/terms" className="text-gray-600 hover:text-gray-900 text-sm">Terms of Service</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-200 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-600 text-sm">© 2025 Dad Clock. All rights reserved.</p>
            <div className="flex gap-6 mt-4 md:mt-0">
              <a href="https://twitter.com" className="text-gray-400 hover:text-gray-600 text-sm">Twitter</a>
              <a href="https://github.com" className="text-gray-400 hover:text-gray-600 text-sm">GitHub</a>
              <a href="https://instagram.com" className="text-gray-400 hover:text-gray-600 text-sm">Instagram</a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
