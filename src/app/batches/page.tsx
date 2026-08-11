import { prisma } from '@/lib/prisma';
import HomeClientSection from '@/components/HomeClientSection';
import { Calendar, Clock, Laptop, MapPin, CheckCircle2, Sparkles } from 'lucide-react';

export const metadata = {
  title: 'Upcoming Batches & Class Timings | NexGen Tech Academy',
  description: 'View upcoming classroom and live online batches for AI, Full Stack Development, Cyber Security, UI/UX, Cloud DevOps, and Data Analytics.',
};

export const revalidate = 60;

export default async function BatchesPage() {
  const batches = await prisma.batch.findMany({
    include: { course: true },
    orderBy: { createdAt: 'desc' },
  });

  return (
    <div className="space-y-12 py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="glass-card rounded-3xl p-8 sm:p-12 border border-purple-500/20 bg-gradient-to-br from-slate-900 via-purple-950/30 to-slate-900 text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-400 text-xs font-semibold uppercase tracking-wider mx-auto">
          <Calendar className="w-4 h-4" />
          <span>Live Admissions Open</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-black text-white tracking-tight">
          Upcoming <span className="gradient-text">Batch Schedules</span>
        </h1>
        <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
          Select from morning, evening, or weekend batches. Small batch sizes (max 25 students) ensure individual instructor attention.
        </p>
      </div>

      {/* Batches Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {batches.map((b) => (
          <div key={b.id} className="glass-card rounded-2xl p-6 border border-slate-800 space-y-4 hover:border-purple-500/40 transition-all flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between gap-2">
                <span className="text-xs font-bold px-3 py-1 rounded-full bg-slate-800 text-blue-400 border border-slate-700">
                  {b.mode}
                </span>
                <span className="text-[11px] font-extrabold px-2.5 py-0.5 rounded-md bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  {b.status}
                </span>
              </div>

              <h3 className="font-bold text-white text-lg leading-snug">{b.course.title}</h3>
            </div>

            <div className="space-y-2 text-xs text-slate-300 pt-3 border-t border-slate-800">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-purple-400" />
                <span className="font-semibold text-white">Start Date:</span>
                <span>{b.startDate}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-blue-400" />
                <span className="font-semibold text-white">Timing:</span>
                <span>{b.timing}</span>
              </div>
              <div className="flex items-center gap-2">
                <Laptop className="w-4 h-4 text-emerald-400" />
                <span className="font-semibold text-white">Duration:</span>
                <span>{b.course.duration}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-amber-400" />
                <span className="font-semibold text-white">Campus:</span>
                <span className="line-clamp-1">{b.campusLocation}</span>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-800 flex items-center justify-between gap-3">
              <div className="text-[11px] text-emerald-400 font-semibold flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>{b.seatsAvailable} Seats Available</span>
              </div>

              <HomeClientSection
                mode="batch-btn"
                courseSlug={b.course.slug}
                courseName={b.course.title}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
