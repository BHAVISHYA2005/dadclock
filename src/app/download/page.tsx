import Link from 'next/link';

export default function Download() {
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

      {/* Download Section */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Download Dad Clock</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="bg-white border border-gray-200 rounded-lg p-8 text-center hover:shadow-lg transition">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">iOS App</h2>
            <p className="text-gray-600 mb-6">Available on Apple App Store</p>
            <a href="#" className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition">
              Download on App Store
            </a>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-8 text-center hover:shadow-lg transition">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Android App</h2>
            <p className="text-gray-600 mb-6">Available on Google Play Store</p>
            <a href="#" className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition">
              Download on Play Store
            </a>
          </div>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Requirements</h2>
          <ul className="text-gray-600 space-y-2">
            <li>• iOS 14 or later</li>
            <li>• Android 8 or later</li>
            <li>• 50MB free storage</li>
          </ul>
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
