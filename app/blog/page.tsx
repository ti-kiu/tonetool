import Link from 'next/link';
import { getAllPostsMeta } from '../lib/blog';

export const metadata = {
  title: 'Blog — Tone Generator',
  description: 'Guides on headphone testing, tinnitus matching, instrument tuning, and audio frequency tools.',
  alternates: {
    canonical: 'https://tonetool.org/blog',
  },
};

export default function BlogPage() {
  const posts = getAllPostsMeta();

  return (
    <main className="min-h-screen bg-[#08080F]">
      {/* Header */}
      <header className="border-b border-[#1E1E2E]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="font-['Space_Grotesk',sans-serif] text-xl font-bold text-[#E8ECF0]">
              Tone Generator
            </span>
          </Link>
          <nav className="flex items-center gap-6">
            <Link href="/" className="text-sm text-[#6B7280] hover:text-[#E8ECF0] transition-colors">
              Home
            </Link>
            <Link href="/blog" className="text-sm text-[#00E5CC]">
              Blog
            </Link>
          </nav>
        </div>
      </header>

      {/* Content */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="text-center mb-16">
          <p className="font-['JetBrains_Mono',monospace] text-xs uppercase tracking-widest text-[#00E5CC] mb-4">
            Blog
          </p>
          <h1 className="font-['Space_Grotesk',sans-serif] text-3xl sm:text-4xl font-bold text-[#E8ECF0] mb-4">
            Audio Testing Guides
          </h1>
          <p className="text-[#6B7280] max-w-xl mx-auto">
            Practical guides on headphone testing, tinnitus matching, instrument tuning, and working with audio frequencies.
          </p>
        </div>

        {posts.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-[#6B7280]">No posts yet. Check back soon.</p>
          </div>
        ) : (
          <div className="space-y-8">
            {posts.map((post) => (
              <article
                key={post.slug}
                className="bg-[#0F0F1A] border border-[#1E1E2E] rounded-xl p-6 hover:border-[#00E5CC]/30 transition-colors"
              >
                <div className="flex flex-wrap gap-2 mb-3">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 bg-[#00E5CC]/10 text-[#00E5CC] text-xs font-['JetBrains_Mono',monospace] rounded"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <Link href={`/blog/${post.slug}`}>
                  <h2 className="font-['Space_Grotesk',sans-serif] text-xl font-semibold text-[#E8ECF0] hover:text-[#00E5CC] transition-colors mb-2">
                    {post.title}
                  </h2>
                </Link>
                <p className="text-[#6B7280] text-sm mb-3">{post.description}</p>
                <time className="text-xs text-[#6B7280] font-['JetBrains_Mono',monospace]">
                  {post.date}
                </time>
              </article>
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="border-t border-[#1E1E2E] py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm text-[#6B7280]">
            © {new Date().getFullYear()} Tone Generator. All rights reserved.
          </p>
        </div>
      </footer>
    </main>
  );
}
