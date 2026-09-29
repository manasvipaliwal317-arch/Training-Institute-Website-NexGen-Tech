'use client';

import Image from 'next/image';
import Link from 'next/link';
import { TrendingUp, ArrowRight, CheckCircle2, Building2, Briefcase, Award } from 'lucide-react';

interface PlacementItem {
  id: string;
  studentName: string;
  courseTaken: string;
  roleAssigned: string;
  companyName: string;
  companyLogo: string;
  studentPhoto: string;
  packageLpa: string;
  year: number;
}

interface MovingPlacementsRowProps {
  placements: PlacementItem[];
}

export default function MovingPlacementsRow({ placements }: MovingPlacementsRowProps) {
  // If fewer than 8, duplicate to ensure smooth continuous marquee loop
  const displayPlacements = [...placements, ...placements, ...placements];

  return (
    <div className="w-full space-y-8">
      {/* Section Header */}
      <div className="glass-card rounded-3xl p-6 sm:p-10 border border-emerald-200/80 dark:border-emerald-500/20 bg-gradient-to-br from-emerald-50/70 via-teal-50/40 to-slate-50/80 dark:from-slate-900/90 dark:via-emerald-950/20 dark:to-slate-900/90 flex flex-col md:flex-row md:items-end justify-between gap-6 shadow-md">
        <div className="space-y-3 max-w-2xl text-center md:text-left">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-xs font-bold uppercase tracking-wider">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>360° Placement Support</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">
            Our Alumni Work at <span className="gradient-text-cyan">Top Global Companies</span>
          </h2>
          <p className="text-slate-600 dark:text-slate-300 text-xs sm:text-sm leading-relaxed">
            From resume building to technical mock interviews and exclusive recruitment drives, our dedicated career cell ensures zero-friction transitions into top tech MNCs.
          </p>
        </div>

        <div className="shrink-0 flex justify-center md:justify-end">
          <Link
            href="/placements"
            className="px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm transition-all shadow-lg shadow-emerald-600/30 flex items-center gap-2 group"
          >
            <span>View Full Placement Gallery</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>

      {/* Moving In-Line Single Row Marquee */}
      <div className="relative w-full overflow-hidden py-3 group select-none">
        {/* Left & Right Smooth Gradient Fades */}
        <div className="absolute left-0 top-0 bottom-0 w-12 sm:w-20 bg-gradient-to-r from-white dark:from-slate-950 to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-12 sm:w-20 bg-gradient-to-l from-white dark:from-slate-950 to-transparent z-10 pointer-events-none" />

        {/* Continuous Moving Track */}
        <div className="flex gap-4 sm:gap-6 w-max animate-marquee group-hover:[animation-play-state:paused]">
          {displayPlacements.map((p, idx) => (
            <div
              key={`${p.id}-${idx}`}
              className="w-72 sm:w-80 shrink-0 p-4 sm:p-5 rounded-2xl bg-white/95 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 shadow-md hover:shadow-2xl hover:border-emerald-500/50 hover:-translate-y-1 transition-all duration-300 space-y-3 cursor-pointer"
            >
              {/* Top: Student Avatar + Info */}
              <div className="flex items-center gap-3">
                <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-emerald-400/50 shrink-0 shadow-sm">
                  <Image
                    src={p.studentPhoto}
                    alt={p.studentName}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-1">
                    <h4 className="font-extrabold text-slate-900 dark:text-white text-sm truncate">
                      {p.studentName}
                    </h4>
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                  </div>
                  <p className="text-slate-500 dark:text-slate-400 text-xs truncate">
                    {p.courseTaken}
                  </p>
                </div>
              </div>

              {/* Middle: Hired Role & Package Highlight */}
              <div className="pt-2 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs">
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-semibold">Hired Role</span>
                  <span className="font-bold text-slate-800 dark:text-slate-200 truncate block max-w-[130px]">
                    {p.roleAssigned}
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-slate-400 block text-[10px] uppercase font-semibold">Package</span>
                  <span className="font-black text-emerald-600 dark:text-emerald-400 text-sm">
                    {p.packageLpa}
                  </span>
                </div>
              </div>

              {/* Bottom: Company Name Pill */}
              <div className="p-2 rounded-xl bg-slate-50 dark:bg-slate-950/80 border border-slate-200/60 dark:border-slate-800/60 flex items-center justify-between text-xs">
                <span className="font-semibold text-slate-500 dark:text-slate-400 flex items-center gap-1">
                  <Building2 className="w-3.5 h-3.5 text-blue-500" />
                  <span>Company:</span>
                </span>
                <span className="font-bold text-slate-900 dark:text-white">
                  {p.companyName}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
