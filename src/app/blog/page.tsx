import Link from 'next/link';

export default function Blog() {
  const posts = [
    {
      id: 1,
      title: "How to Build Better Habits with Dad Clock",
      excerpt: "Learn practical strategies for creating lasting habits using consistent scheduling and accountability.",
      date: "January 8, 2025",
      author: "Dad Clock Team"
    },
    {
      id: 2,
      title: "Breaking Free from Digital Distractions",
      excerpt: "Understanding the science behind distractions and how Dad Clock helps you regain focus.",
      date: "January 5, 2025",
      author: "Dad Clock Team"
    },
    {
      id: 3,
      title: "The Power of Routine: Case Studies from Dad Clock Users",
      excerpt: "Real stories from users who transformed their lives by sticking to their schedules.",
      date: "December 28, 2024",
      author: "Dad Clock Team"
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

      {/* Blog Section */}
      <section className="max-w-4xl mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Dad Clock Blog</h1>
        <p className="text-gray-600 text-lg mb-12">Tips, stories, and insights on building better habits and staying focused.</p>
        
        <div className="grid grid-cols-1 gap-8">
          {posts.map((post) => (
            <article key={post.id} className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition">
              <h2 className="text-2xl font-semibold text-gray-900 mb-3">{post.title}</h2>
              <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                <span>{post.date}</span>
                <span>•</span>
                <span>{post.author}</span>
              </div>
              <p className="text-gray-600 mb-4">{post.excerpt}</p>
              <Link href={`/blog/${post.id}`} className="text-blue-600 font-semibold hover:text-blue-700">
                Read More →
              </Link>
            </article>
          ))}
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
