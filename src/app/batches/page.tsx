import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import HomeClientSection from '@/components/HomeClientSection';
import { Calendar, Clock, Laptop, MapPin, CheckCircle2, Sparkles } from 'lucide-react';
import {
  FadeInUp,
  StaggerContainer,
  StaggerItem,
  MotionCard,
} from '@/components/AnimatedSection';

export const metadata = {
  title: 'Upcoming Batches & Class Timings | NexGen Tech Academy',
  description: 'View upcoming classroom and live online batches for AI, Full Stack Development, Cyber Security, UI/UX, Cloud DevOps, and Data Analytics.',
};

export const revalidate = 0;

export default async function BatchesPage() {
  const batches = await prisma.batch.findMany({
    include: { course: true },
    orderBy: { createdAt: 'desc' },
  });

  return (
    <div className="space-y-12 py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <FadeInUp duration={0.4}>
        <div className="glass-card rounded-3xl p-8 sm:p-12 border border-purple-200/80 dark:border-purple-500/20 bg-gradient-to-br from-purple-50/80 via-indigo-50/60 to-sky-50/70 dark:from-slate-900 dark:via-purple-950/30 dark:to-slate-900 text-center space-y-4 shadow-sm">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-600 dark:text-purple-400 text-xs font-semibold uppercase tracking-wider mx-auto">
            <Calendar className="w-4 h-4" />
            <span>Live Admissions Open</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
            Upcoming <span className="gradient-text">Batch Schedules</span>
          </h1>
          <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            Select from morning, evening, or weekend batches. Small batch sizes (max 25 students) ensure individual instructor attention.
          </p>
        </div>
      </FadeInUp>

      {/* Batches Cards Grid */}
      <StaggerContainer staggerDelay={0.08} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {batches.map((b) => (
          <StaggerItem key={b.id}>
            <MotionCard className="glass-card rounded-2xl p-6 border border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/60 space-y-4 hover:border-purple-500/40 transition-all flex flex-col justify-between h-full shadow-xs hover:shadow-md">
              <div className="space-y-3">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs font-bold px-3 py-1 rounded-full bg-blue-50 dark:bg-slate-800 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-slate-700">
                    {b.mode}
                  </span>
                  <span className="text-[11px] font-extrabold px-2.5 py-0.5 rounded-md bg-amber-500/20 text-amber-700 dark:text-amber-300 border border-amber-500/30">
                    {b.status}
                  </span>
                </div>

                <h3 className="font-bold text-slate-900 dark:text-white text-lg leading-snug">{b.course.title}</h3>
              </div>

              <div className="space-y-2 text-xs text-slate-600 dark:text-slate-300 pt-3 border-t border-slate-200 dark:border-slate-800">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-purple-500 dark:text-purple-400" />
                  <span className="font-semibold text-slate-900 dark:text-white">Start Date:</span>
                  <span>{b.startDate}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-blue-500 dark:text-blue-400" />
                  <span className="font-semibold text-slate-900 dark:text-white">Timing:</span>
                  <span>{b.timing}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Laptop className="w-4 h-4 text-emerald-500 dark:text-emerald-400" />
                  <span className="font-semibold text-slate-900 dark:text-white">Duration:</span>
                  <span>{b.course.duration}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-amber-500 dark:text-amber-400" />
                  <span className="font-semibold text-slate-900 dark:text-white">Campus:</span>
                  <span className="line-clamp-1">{b.campusLocation}</span>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between gap-3">
                <div className="text-[11px] text-emerald-400 font-semibold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>{b.seatsAvailable} Seats Available</span>
                </div>

                <Link
                  href={`/enroll?course=${b.course.slug}`}
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold text-xs shadow-md shadow-purple-600/20 inline-flex items-center gap-1.5 transition-all"
                >
                  <span>Book My Seat</span>
                  <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                </Link>
              </div>
            </MotionCard>
          </StaggerItem>
        ))}
      </StaggerContainer>
    </div>
  );
}

