import { prisma } from '@/lib/prisma';
import CourseCatalogClient from '@/components/CourseCatalogClient';
import { Sparkles, BookOpen } from 'lucide-react';

export const metadata = {
  title: 'Professional IT Courses & Certifications | NexGen Tech Academy',
  description: 'Explore industry-leading courses in Generative AI, Full Stack Development, Cyber Security, UI/UX Design, DevOps, Cloud, and Data Analytics.',
};

export const revalidate = 60;

interface PageProps {
  searchParams: Promise<{ category?: string }>;
}

export default async function CoursesPage({ searchParams }: PageProps) {
  const resolvedParams = await searchParams;
  const initialCategory = resolvedParams?.category || '';

  const courses = await prisma.course.findMany({
    include: { category: true },
    orderBy: { enrolledStudents: 'desc' },
  });

  const categories = await prisma.courseCategory.findMany({
    orderBy: { name: 'asc' },
  });

  return (
    <div className="space-y-12 py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header Banner */}
      <div className="glass-card rounded-3xl p-8 sm:p-12 border border-blue-500/20 bg-gradient-to-br from-slate-900 via-blue-950/40 to-slate-900 text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-semibold uppercase tracking-wider mx-auto">
          <Sparkles className="w-4 h-4 text-amber-300" />
          <span>Next-Gen Tech Curriculum</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-black text-white tracking-tight">
          Explore Our <span className="gradient-text">Professional Programs</span>
        </h1>
        <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
          From Generative AI and Next.js 15 to Cyber Security and Cloud DevOps. Learn through hands-on capstone projects and earn industry-recognized certifications.
        </p>
      </div>

      {/* Dynamic Catalog */}
      <CourseCatalogClient
        courses={courses}
        categories={categories}
        initialCategory={initialCategory}
      />
    </div>
  );
}
