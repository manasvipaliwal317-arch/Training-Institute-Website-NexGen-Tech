import { notFound } from 'next/navigation';
import Image from 'next/image';
import { prisma } from '@/lib/prisma';
import CourseDetailClient from '@/components/CourseDetailClient';
import JsonLd, { getCourseSchema } from '@/components/JsonLd';
import { Star, Clock, Laptop, Layers, Users, Sparkles } from 'lucide-react';

export const revalidate = 60;

interface CoursePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: CoursePageProps) {
  const { slug } = await params;
  const course = await prisma.course.findUnique({
    where: { slug },
  });

  if (!course) return { title: 'Course Not Found | NexGen Tech Academy' };

  return {
    title: `${course.title} | NexGen Tech Academy`,
    description: course.tagline,
  };
}

export default async function SingleCoursePage({ params }: CoursePageProps) {
  const { slug } = await params;
  const course = await prisma.course.findUnique({
    where: { slug },
    include: { category: true },
  });

  if (!course) notFound();

  const syllabus = JSON.parse(course.syllabusJson || '[]');
  const tools = JSON.parse(course.toolsJson || '[]');
  const projects = JSON.parse(course.projectsJson || '[]');
  const careerRoles = JSON.parse(course.careerRolesJson || '[]');
  const faqs = JSON.parse(course.faqsJson || '[]');

  return (
    <div className="space-y-12 py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <JsonLd
        data={getCourseSchema({
          title: course.title,
          description: course.description,
          categoryName: course.category.name,
          fees: course.fees,
          slug: course.slug,
        })}
      />

      {/* Course Hero Banner */}
      <div className="glass-card rounded-3xl p-8 sm:p-12 border border-blue-500/20 bg-gradient-to-br from-slate-900 via-blue-950/40 to-slate-900 relative overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-8 space-y-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 rounded-md bg-blue-600/90 text-white font-semibold text-xs">
                {course.category.name}
              </span>
              {course.bestseller && (
                <span className="px-3 py-1 rounded-md bg-amber-500 text-slate-950 font-extrabold text-xs uppercase tracking-wider">
                  Bestseller
                </span>
              )}
              <span className="px-3 py-1 rounded-md bg-slate-800 text-slate-300 text-xs font-medium">
                ISO Certified
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
              {course.title}
            </h1>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              {course.tagline}
            </p>

            <div className="flex flex-wrap items-center gap-6 pt-2 text-xs sm:text-sm text-slate-300">
              <div className="flex items-center gap-1.5 text-amber-400 font-bold">
                <Star className="w-4 h-4 fill-amber-400" />
                <span>{course.rating}</span>
                <span className="text-slate-400 font-normal">({course.ratingsCount} ratings)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Users className="w-4 h-4 text-blue-400" />
                <span>{course.enrolledStudents}+ Enrolled Students</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-purple-400" />
                <span>{course.duration} ({course.hoursCount} Hours)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Laptop className="w-4 h-4 text-emerald-400" />
                <span>{course.mode}</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-4 h-64 sm:h-72 rounded-2xl overflow-hidden relative border border-slate-700 shadow-2xl">
            <Image src={course.heroImage} alt={course.title} fill className="object-cover" />
          </div>
        </div>
      </div>

      {/* Main Course Client Breakdown */}
      <CourseDetailClient
        course={{
          id: course.id,
          slug: course.slug,
          title: course.title,
          tagline: course.tagline,
          description: course.description,
          level: course.level,
          mode: course.mode,
          duration: course.duration,
          hoursCount: course.hoursCount,
          fees: course.fees,
          originalFees: course.originalFees,
          heroImage: course.heroImage,
          bestseller: course.bestseller,
          rating: course.rating,
          ratingsCount: course.ratingsCount,
          enrolledStudents: course.enrolledStudents,
          categoryName: course.category.name,
          syllabus,
          tools,
          projects,
          careerRoles,
          faqs,
        }}
      />
    </div>
  );
}
