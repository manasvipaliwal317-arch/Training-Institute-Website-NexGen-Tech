import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import { Clock, User, ArrowLeft, Tag, Calendar, Share2, Sparkles } from 'lucide-react';
import HomeClientSection from '@/components/HomeClientSection';

export const revalidate = 60;

interface BlogPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: BlogPageProps) {
  const { slug } = await params;
  const post = await prisma.blogPost.findUnique({
    where: { slug },
  });

  if (!post) return { title: 'Post Not Found | NexGen Tech Academy Blog' };

  return {
    title: `${post.title} | NexGen Tech Blog`,
    description: post.excerpt,
  };
}

export default async function SingleBlogPostPage({ params }: BlogPageProps) {
  const { slug } = await params;
  const post = await prisma.blogPost.findUnique({
    where: { slug },
  });

  if (!post) notFound();

  const tags: string[] = JSON.parse(post.tagsJson || '[]');

  const relatedPosts = await prisma.blogPost.findMany({
    where: { category: post.category, NOT: { id: post.id } },
    take: 2,
  });

  return (
    <div className="space-y-12 py-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Back Link */}
      <Link
        href="/blog"
        className="inline-flex items-center gap-2 text-xs font-semibold text-blue-400 hover:text-blue-300 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Tech Blog Index
      </Link>

      {/* Header */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <span className="px-3 py-1 rounded-md bg-blue-600/90 text-white font-semibold text-xs">
            {post.category}
          </span>
          <span className="text-xs text-slate-400 font-medium">{post.readTime}</span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-black text-white leading-tight">
          {post.title}
        </h1>

        <div className="flex items-center gap-4 pt-2 border-y border-slate-800 py-3 text-xs text-slate-300">
          <div className="flex items-center gap-2">
            <div className="relative w-9 h-9 rounded-full overflow-hidden border border-blue-400/40 shrink-0">
              <Image src={post.authorPhoto} alt={post.authorName} fill className="object-cover" />
            </div>
            <div>
              <span className="font-bold text-white block">{post.authorName}</span>
              <span className="text-[11px] text-slate-400">{post.authorRole}</span>
            </div>
          </div>

          <div className="ml-auto text-slate-400 flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5" />
            <span>{new Date(post.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
          </div>
        </div>
      </div>

      {/* Featured Cover Image */}
      <div className="relative h-80 sm:h-96 rounded-2xl overflow-hidden border border-slate-700 shadow-2xl">
        <Image src={post.featuredImage} alt={post.title} fill className="object-cover" />
      </div>

      {/* Article Markdown Content */}
      <div className="glass-card rounded-2xl p-8 sm:p-10 border border-slate-800 space-y-6 text-slate-200 text-sm sm:text-base leading-relaxed">
        <div className="prose prose-invert max-w-none space-y-4">
          {post.content.split('\n\n').map((paragraph, pIdx) => (
            <p key={pIdx} className="text-slate-300 leading-relaxed">
              {paragraph.replace(/^#+\s*/, '')}
            </p>
          ))}
        </div>

        {tags.length > 0 && (
          <div className="pt-6 border-t border-slate-800 flex flex-wrap items-center gap-2">
            <Tag className="w-4 h-4 text-purple-400 mr-1" />
            {tags.map((t, idx) => (
              <span key={idx} className="px-3 py-1 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 text-xs font-semibold">
                #{t}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* CTA Box */}
      <div className="glass-card rounded-3xl p-8 border border-blue-500/30 text-center space-y-3">
        <h3 className="text-xl font-bold text-white">Want to Master These Skills Hands-On?</h3>
        <p className="text-xs text-slate-400 max-w-md mx-auto">
          Enroll in our industry-accredited training programs with live mentorship and placement drives.
        </p>
        <div className="pt-2 flex justify-center">
          <HomeClientSection mode="demo-btn" buttonText="Book Free Counseling Session" />
        </div>
      </div>
    </div>
  );
}
