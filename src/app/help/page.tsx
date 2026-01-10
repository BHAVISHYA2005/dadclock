import Link from 'next/link';

export default function Help() {
  const faqs = [
    {
      question: "How do I set up schedules?",
      answer: "Open the Dad Clock app, click on 'New Schedule', set your desired time, and select which apps or websites you want to block during that period."
    },
    {
      question: "Can I block specific apps?",
      answer: "Yes! Dad Clock allows you to block specific apps, websites, and app categories. You can customize blocking for each schedule."
    },
    {
      question: "Does it work across all devices?",
      answer: "Dad Clock is available on iOS and Android. You can sync your schedules across multiple devices with the same account."
    },
    {
      question: "What if I need to override a block?",
      answer: "Dad Clock enforces your schedules without soft negotiations. The blocks are designed to help you stay committed to your goals."
    },
    {
      question: "Is there a free trial?",
      answer: "Yes! You can use Dad Clock free for 14 days to test all features. After that, a subscription is required."
    },
    {
      question: "How do I contact support?",
      answer: "You can reach our support team at support@dadclock.com or through the help section in the app."
    }
  ];

  return (
    <>
      {/* Header */}
      <header className="border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 py-6 flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold text-gray-900">Dad Clock</Link>
          <nav className="hidden md:flex gap-8 text-gray-700">
            <Link href="/#features" className="hover:text-gray-900">Features</Link>
            <Link href="/help" className="hover:text-gray-900">Help</Link>
            <Link href="/blog" className="hover:text-gray-900">Blog</Link>
            <Link href="/download" className="hover:text-gray-900">Download</Link>
          </nav>
        </div>
      </header>

      {/* Help Section */}
      <section className="max-w-4xl mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Help & Support</h1>
        
        <div className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Frequently Asked Questions</h2>
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <details key={index} className="bg-white border border-gray-200 rounded-lg p-6 cursor-pointer hover:shadow-md transition">
                <summary className="font-semibold text-gray-900 text-lg">
                  {faq.question}
                </summary>
                <p className="text-gray-600 mt-4">{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Still need help?</h2>
          <p className="text-gray-600 mb-6">Contact our support team for personalized assistance.</p>
          <div className="flex flex-col md:flex-row gap-4">
            <a href="mailto:support@dadclock.com" className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition">
              Email Support
            </a>
            <a href="#" className="inline-block bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold border border-blue-600 hover:bg-blue-50 transition">
              Contact Form
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 bg-white mt-16">
        <div className="max-w-6xl mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="font-semibold text-gray-900 mb-4">Dad Clock</h3>
              <p className="text-gray-600 text-sm">Keep your routine on track.</p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-4">Product</h4>
              <ul className="space-y-2">
                <li><Link href="/#features" className="text-gray-600 hover:text-gray-900 text-sm">Features</Link></li>
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
