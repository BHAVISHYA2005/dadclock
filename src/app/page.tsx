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
      <header className="border-b border-gray-200 backdrop-blur-sm bg-white/80">
        <div className="max-w-6xl mx-auto px-4 py-6 flex items-center justify-between">
          <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent">Dad Clock</div>
          <nav className="hidden md:flex gap-8 text-gray-700">
            <Link href="#features" className="hover:text-gray-900 transition">Features</Link>
            <Link href="/help" className="hover:text-gray-900 transition">Help</Link>
            <Link href="/blog" className="hover:text-gray-900 transition">Blog</Link>
            <Link href="/login" className="text-blue-600 hover:text-blue-700 font-semibold transition">Login</Link>
            <Link href="/signup" className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-4 py-2 rounded-lg hover:shadow-lg transition">Sign Up</Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative min-h-[600px] bg-gradient-to-br from-blue-600 via-blue-500 to-purple-600 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 right-10 w-72 h-72 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-10 w-96 h-96 bg-blue-300 rounded-full blur-3xl"></div>
        </div>
        <div className="relative max-w-6xl mx-auto px-4 py-32 text-center">
          <div className="inline-block bg-white/20 backdrop-blur-md border border-white/30 rounded-full px-4 py-2 mb-6">
            <span className="text-white text-sm font-medium">✨ The smarter way to stay on track</span>
          </div>
          <h1 className="text-6xl md:text-7xl font-bold text-white mb-6 leading-tight">
            Dad said it's time
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-10 max-w-3xl mx-auto leading-relaxed">
            Dad Clock keeps you on schedule — by blocking distractions and making sure you do what you said you would.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link href="/signup" className="inline-block bg-white text-blue-600 px-8 py-4 rounded-lg font-bold hover:shadow-2xl transition transform hover:scale-105">
              Get Started
            </Link>
            <Link href="#features" className="inline-block bg-white/20 backdrop-blur-md text-white border border-white/40 px-8 py-4 rounded-lg font-bold hover:bg-white/30 transition">
              Learn More
            </Link>
          </div>
        </div>
      </section>

      {/* Schedules Grid */}
      <section className="bg-gradient-to-b from-white to-gray-50 max-w-6xl mx-auto px-4 py-20">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Create Your Schedule</h2>
          <p className="text-gray-600 text-lg">Set different rules for every part of your day</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {schedules.map((schedule, index) => (
            <div key={index} className="group bg-white border border-gray-200 rounded-xl p-6 hover:shadow-xl hover:border-blue-300 transition duration-300 transform hover:-translate-y-1">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">{schedule.title}</h3>
              <div className="flex items-center justify-between mb-4">
                <span className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">{schedule.time}</span>
                <button className="text-gray-300 hover:text-blue-600 transition transform group-hover:scale-110">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                </button>
              </div>
              <p className="text-sm text-gray-600 mb-4 font-medium">{schedule.items}</p>
              <div className="flex gap-1 text-sm text-gray-700 font-medium">
                {schedule.days.split('').map((day, i) => (
                  <span key={i} className="w-6 h-6 flex items-center justify-center bg-gradient-to-br from-blue-100 to-purple-100 rounded text-xs text-gray-700 font-bold">{day}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="relative py-24 bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-400 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-400 rounded-full blur-3xl"></div>
        </div>
        <div className="relative max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-4">What he does for you</h2>
            <p className="text-blue-100 text-lg max-w-2xl mx-auto">
              Everything you need to take control of your time and focus
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="group bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-8 hover:bg-white/20 transition hover:border-white/40">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-purple-400 rounded-lg mb-6 flex items-center justify-center group-hover:scale-110 transition">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold mb-3">{feature.title}</h3>
                <p className="text-blue-100 text-lg leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative min-h-96 bg-gradient-to-r from-blue-600 to-purple-600 text-white overflow-hidden py-20">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-1/4 w-80 h-80 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-300 rounded-full blur-3xl"></div>
        </div>
        <div className="relative max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-5xl font-bold mb-6">You don't need more motivation</h2>
          <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto leading-relaxed">
            Start doing what you said you would. He shouldn't have to ask twice.
          </p>
          <Link href="/signup" className="inline-block bg-white text-blue-600 px-10 py-4 rounded-lg font-bold hover:shadow-2xl transition transform hover:scale-105">
            Start Now
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-6xl mx-auto px-4 py-16">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            <div>
              <h3 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">Dad Clock</h3>
              <p className="text-gray-600 text-sm leading-relaxed">Keep your routine on track. The smarter parental control for modern life.</p>
            </div>
            <div>
              <h4 className="font-bold text-gray-900 mb-4">Product</h4>
              <ul className="space-y-3">
                <li><Link href="#features" className="text-gray-600 hover:text-blue-600 text-sm transition">Features</Link></li>
                <li><Link href="/signup" className="text-gray-600 hover:text-blue-600 text-sm transition">Get Started</Link></li>
                <li><Link href="/blog" className="text-gray-600 hover:text-blue-600 text-sm transition">Blog</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-gray-900 mb-4">Resources</h4>
              <ul className="space-y-3">
                <li><Link href="/help" className="text-gray-600 hover:text-blue-600 text-sm transition">Help</Link></li>
                <li><Link href="/about" className="text-gray-600 hover:text-blue-600 text-sm transition">About</Link></li>
                <li><Link href="/contact" className="text-gray-600 hover:text-blue-600 text-sm transition">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-gray-900 mb-4">Legal</h4>
              <ul className="space-y-3">
                <li><Link href="/privacy" className="text-gray-600 hover:text-blue-600 text-sm transition">Privacy Policy</Link></li>
                <li><Link href="/terms" className="text-gray-600 hover:text-blue-600 text-sm transition">Terms of Service</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-200 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-600 text-sm">© 2025 Dad Clock. All rights reserved.</p>
            <div className="flex gap-6 mt-6 md:mt-0">
              <a href="https://twitter.com" className="text-gray-400 hover:text-blue-600 text-sm transition font-medium">Twitter</a>
              <a href="https://github.com" className="text-gray-400 hover:text-blue-600 text-sm transition font-medium">GitHub</a>
              <a href="https://instagram.com" className="text-gray-400 hover:text-blue-600 text-sm transition font-medium">Instagram</a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
