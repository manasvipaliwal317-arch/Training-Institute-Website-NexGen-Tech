import Link from 'next/link';
import { Home, BookOpen, Calendar, Phone, ArrowLeft, Search, Sparkles, Compass } from 'lucide-react';

export const metadata = {
  title: 'Page Not Found | NexGen Tech Academy',
  description: 'The requested page could not be found. Explore our IT courses, batch schedules, and academic programs.',
};

export default function NotFound() {
  return (
    <div className="min-h-[75vh] flex items-center justify-center py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Ambient background glows */}
      <div className="absolute top-1/3 left-1/4 -translate-y-1/2 w-96 h-96 bg-blue-600/15 dark:bg-blue-600/20 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/3 right-1/4 translate-y-1/2 w-96 h-96 bg-purple-600/15 dark:bg-purple-600/20 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-2xl w-full text-center space-y-8 relative z-10">
        {/* Floating 404 Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-600 dark:text-blue-400 text-xs font-bold uppercase tracking-wider shadow-sm">
          <Compass className="w-4 h-4 text-blue-500 animate-spin" style={{ animationDuration: '8s' }} />
          <span>Error 404 • Destination Not Found</span>
        </div>

        {/* 404 Giant Text */}
        <div className="space-y-3">
          <h1 className="text-7xl sm:text-9xl font-black tracking-tight gradient-text drop-shadow-sm select-none">
            404
          </h1>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            We Couldn&apos;t Find That Page
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-lg mx-auto leading-relaxed">
            The page, course link, or URL you were trying to reach may have been moved, renamed, or typed with an extra extension.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <Link
            href="/"
            className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-xl shadow-blue-500/25 transition-all transform hover:-translate-y-0.5 cursor-pointer"
          >
            <Home className="w-4 h-4" />
            <span>Return to Homepage</span>
          </Link>

          <Link
            href="/courses"
            className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 hover:border-blue-500 text-slate-800 dark:text-slate-100 font-bold text-sm flex items-center justify-center gap-2 shadow-sm transition-all transform hover:-translate-y-0.5 cursor-pointer"
          >
            <BookOpen className="w-4 h-4 text-blue-500" />
            <span>Explore All 15+ Courses</span>
          </Link>
        </div>

        {/* Helpful Popular Destinations */}
        <div className="pt-8 border-t border-slate-200 dark:border-slate-800">
          <p className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-4">
            Popular Shortcuts
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-xs font-semibold">
            <Link
              href="/batches"
              className="p-3 rounded-xl bg-white/80 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 hover:border-purple-500 hover:text-purple-600 dark:hover:text-purple-400 transition-all flex flex-col items-center gap-1.5 shadow-2xs"
            >
              <Calendar className="w-4 h-4 text-purple-500" />
              <span>Upcoming Batches</span>
            </Link>

            <Link
              href="/placements"
              className="p-3 rounded-xl bg-white/80 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 hover:border-emerald-500 hover:text-emerald-600 dark:hover:text-emerald-400 transition-all flex flex-col items-center gap-1.5 shadow-2xs"
            >
              <Sparkles className="w-4 h-4 text-emerald-500" />
              <span>Placements Report</span>
            </Link>

            <Link
              href="/certificate"
              className="p-3 rounded-xl bg-white/80 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 hover:border-amber-500 hover:text-amber-600 dark:hover:text-amber-400 transition-all flex flex-col items-center gap-1.5 shadow-2xs"
            >
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span>Verify Certificate</span>
            </Link>

            <Link
              href="/contact"
              className="p-3 rounded-xl bg-white/80 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 hover:border-blue-500 hover:text-blue-600 dark:hover:text-blue-400 transition-all flex flex-col items-center gap-1.5 shadow-2xs"
            >
              <Phone className="w-4 h-4 text-blue-500" />
              <span>Contact Counselors</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
