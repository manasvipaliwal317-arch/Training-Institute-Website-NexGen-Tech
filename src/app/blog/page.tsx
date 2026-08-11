import Image from 'next/image';
import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import BlogClientSection from '@/components/BlogClientSection';
import { BookOpen, Sparkles, ArrowRight, Clock, User } from 'lucide-react';

export const metadata = {
  title: 'Tech Blog & Career Guidance | NexGen Tech Academy',
  description: 'Read the latest technical tutorials, industry insights, and career switching guides in AI, Web Dev, Cyber Security, Cloud, Testing, and Digital Marketing.',
};

export const revalidate = 60;

export default async function BlogIndexPage() {
  const posts = await prisma.blogPost.findMany({
    orderBy: { publishedAt: 'desc' },
  });

  const featuredPost = posts.find((p) => p.isFeatured) || posts[0];

  const categories = [
    'AI',
    'Programming',
    'Cyber Security',
    'Cloud',
    'Testing',
    'Career Guidance',
    'Digital Marketing',
  ];

  return (
    <div className="space-y-16 py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="glass-card rounded-3xl p-8 sm:p-14 border border-blue-500/20 bg-gradient-to-br from-slate-900 via-blue-950/40 to-slate-900 text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-semibold uppercase tracking-wider mx-auto">
          <BookOpen className="w-4 h-4" />
          <span>Engineering Insights & Roadmaps</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-black text-white tracking-tight">
          Tech Blog & <span className="gradient-text">Career Guidance</span>
        </h1>
        <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
          Deep-dive technical guides, architecture breakdowns, and career growth strategies written by senior engineers and faculty leads.
        </p>
      </div>

      {/* Featured Article Banner */}
      {featuredPost && (
        <div className="glass-card rounded-3xl p-8 border border-blue-500/30 bg-gradient-to-r from-slate-900 via-slate-900/90 to-slate-900 relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4">
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-md bg-amber-500 text-slate-950 font-extrabold text-xs uppercase tracking-wider">
                  Featured Guide
                </span>
                <span className="px-3 py-1 rounded-md bg-blue-600/90 text-white font-semibold text-xs">
                  {featuredPost.category}
                </span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-black text-white leading-tight">
                {featuredPost.title}
              </h2>

              <p className="text-slate-300 text-sm leading-relaxed line-clamp-3">
                {featuredPost.excerpt}
              </p>

              <div className="pt-2 flex items-center gap-4 text-xs text-slate-300">
                <span className="flex items-center gap-1.5 font-bold text-white">
                  <User className="w-4 h-4 text-blue-400" /> {featuredPost.authorName}
                </span>
                <span className="flex items-center gap-1.5 text-slate-400">
                  <Clock className="w-4 h-4 text-purple-400" /> {featuredPost.readTime}
                </span>
              </div>

              <div className="pt-3">
                <Link
                  href={`/blog/${featuredPost.slug}`}
                  className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs shadow-lg shadow-blue-600/30 flex items-center gap-2 w-fit transition-all"
                >
                  <span>Read Full Article</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            <div className="lg:col-span-5 h-64 rounded-2xl overflow-hidden relative border border-slate-700">
              <Image src={featuredPost.featuredImage} alt={featuredPost.title} fill className="object-cover" />
            </div>
          </div>
        </div>
      )}

      {/* Main Blog Directory */}
      <BlogClientSection posts={posts} categories={categories} />
    </div>
  );
}
