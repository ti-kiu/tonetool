import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getPostBySlug, getAllPostSlugs } from '../../lib/blog';

import Navigation from "../../../components/Navigation";
export async function generateStaticParams() {
  const slugs = getAllPostSlugs();
  if (slugs.length === 0) {
    return [{ slug: 'placeholder' }];
  }
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const post = await getPostBySlug(params.slug);
  if (!post) return { title: 'Not Found' };
  return {
    title: `${post.title} — Tone Generator Blog`,
    description: post.description,
    alternates: {
      canonical: `https://tonetool.org/blog/${params.slug}`,
    },
  };
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = await getPostBySlug(params.slug);
  if (!post) notFound();

  return (
    <main className="min-h-screen bg-[#08080F]">
      {/* Header */}
      <Navigation />

      {/* Article */}
      <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        {/* Meta */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-2 mb-4">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="px-2 py-0.5 bg-[#00E5CC]/10 text-[#00E5CC] text-xs font-['JetBrains_Mono',monospace] rounded"
              >
                {tag}
              </span>
            ))}
          </div>
          <h1 className="font-['Space_Grotesk',sans-serif] text-3xl sm:text-4xl font-bold text-[#E8ECF0] mb-3">
            {post.title}
          </h1>
          <time className="text-sm text-[#6B7280] font-['JetBrains_Mono',monospace]">
            {post.date}
          </time>
        </div>

        {/* Content */}
        <div
          className="prose prose-invert prose-lg max-w-none
            prose-headings:font-['Space_Grotesk',sans-serif]
            prose-headings:text-[#E8ECF0]
            prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4
            prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3
            prose-p:text-[#9CA3AF] prose-p:leading-relaxed
            prose-a:text-[#00E5CC] prose-a:no-underline hover:prose-a:underline
            prose-strong:text-[#E8ECF0]
            prose-ul:text-[#9CA3AF]
            prose-ol:text-[#9CA3AF]
            prose-li:marker:text-[#00E5CC]
            prose-blockquote:border-l-[#00E5CC] prose-blockquote:bg-[#0F0F1A] prose-blockquote:py-2 prose-blockquote:px-4 prose-blockquote:rounded-r-lg
            prose-blockquote:text-[#9CA3AF]
            prose-code:text-[#00E5CC] prose-code:bg-[#0F0F1A] prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded
            prose-pre:bg-[#0F0F1A] prose-pre:border prose-pre:border-[#1E1E2E]
            prose-hr:border-[#1E1E2E]"
          dangerouslySetInnerHTML={{ __html: post.contentHtml }}
        />

        {/* Back */}
        <div className="mt-16 pt-8 border-t border-[#1E1E2E]">
          <Link
            href="/blog"
            className="text-[#00E5CC] hover:underline text-sm"
          >
            ← Back to all guides
          </Link>
        </div>
      </article>

      {/* Footer */}
      <footer className="border-t border-[#1E1E2E] py-8">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm text-[#6B7280]">
            © {new Date().getFullYear()} Tone Generator. All rights reserved.
          </p>
        </div>
      </footer>
    </main>
  );
}
