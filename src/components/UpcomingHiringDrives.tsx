'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Building2, Calendar, MapPin, Briefcase, CheckCircle2, Sparkles, ExternalLink } from 'lucide-react';
import HomeClientSection from './HomeClientSection';

interface UpcomingHiringDrivesProps {
  drives?: any[];
}

export default function UpcomingHiringDrives({ drives: initialDrives }: UpcomingHiringDrivesProps) {
  const [selectedStatus, setSelectedStatus] = useState<string>('ALL');

  const drivesList = initialDrives && initialDrives.length > 0 ? initialDrives : [];

  const filteredDrives = selectedStatus === 'ALL'
    ? drivesList
    : drivesList.filter((d) => d.status === selectedStatus);

  return (
    <div className="rounded-3xl p-5 sm:p-8 border dark:border-slate-800 border-indigo-100/90 dark:bg-slate-900/90 bg-gradient-to-br from-indigo-50/60 via-sky-50/40 to-blue-50/60 shadow-xl space-y-6">
      {/* Header Row */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div className="space-y-1 text-left">
          <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full dark:bg-emerald-500/10 bg-emerald-100/80 border dark:border-emerald-500/30 border-emerald-300 text-emerald-700 dark:text-emerald-400 text-[11px] font-bold uppercase tracking-wider">
            <Sparkles className="w-3 h-3 text-emerald-600 dark:text-emerald-400 animate-pulse" />
            <span>Campus Direct Placements</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-black dark:text-white text-slate-900 tracking-tight">
            Upcoming & Active <span className="gradient-text-cyan">Hiring Drives</span>
          </h2>

          <p className="dark:text-slate-300 text-slate-600 text-xs sm:text-sm max-w-xl">
            Exclusive recruitment drives organized by partner MNCs and high-growth scale-ups for NexGen Tech Institute students.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 flex-wrap">
          {['ALL', 'ACTIVE', 'UPCOMING'].map((st) => (
            <button
              key={st}
              onClick={() => setSelectedStatus(st)}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                selectedStatus === st
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'dark:bg-slate-800 bg-white/90 dark:text-slate-300 text-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700'
              }`}
            >
              {st === 'ALL' ? 'All Drives' : st === 'ACTIVE' ? '🟢 Active Today' : '📅 Upcoming'}
            </button>
          ))}
        </div>
      </div>

      {/* Drives Grid */}
      {filteredDrives.length === 0 ? (
        <div className="p-8 text-center glass-card rounded-2xl border border-slate-800 text-slate-400 text-xs">
          No hiring drives found under this category at the moment. Check back soon!
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredDrives.map((drive) => {
            let skills: string[] = [];
            try {
              skills = JSON.parse(drive.skillsRequiredJson || '[]');
            } catch (e) {
              skills = [];
            }

            return (
              <div
                key={drive.id}
                className="rounded-xl p-4 dark:bg-slate-950/80 bg-white/95 border dark:border-slate-800/80 border-indigo-100 shadow-sm hover:shadow-md hover:border-blue-400/60 transition-all duration-300 flex flex-col justify-between space-y-3 group"
              >
                <div className="space-y-3">
                  {/* Top Company & Status Pill */}
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2.5">
                      <div className="relative w-8 h-8 rounded-lg overflow-hidden border border-slate-700 bg-slate-800 shrink-0">
                        {drive.companyLogo ? (
                          <Image
                            src={drive.companyLogo}
                            alt={drive.companyName}
                            fill
                            className="object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center font-bold text-white text-xs bg-blue-600">
                            {drive.companyName.charAt(0)}
                          </div>
                        )}
                      </div>
                      <div className="min-w-0">
                        <h3 className="font-bold dark:text-white text-slate-900 text-xs leading-snug truncate">
                          {drive.companyName}
                        </h3>
                        <span className="text-[10px] font-semibold text-blue-600 dark:text-blue-400 block truncate">
                          {drive.openPositions} Positions Open
                        </span>
                      </div>
                    </div>

                    <span
                      className={`px-2 py-0.5 rounded text-[9.5px] font-bold uppercase tracking-wider border shrink-0 ${
                        drive.status === 'ACTIVE'
                          ? 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-300 dark:border-emerald-500/30'
                          : drive.status === 'UPCOMING'
                          ? 'bg-blue-500/15 text-blue-600 dark:text-blue-400 border-blue-300 dark:border-blue-500/30'
                          : 'bg-slate-500/15 text-slate-400 border-slate-700'
                      }`}
                    >
                      {drive.status}
                    </span>
                  </div>

                  {/* Role Title & Package */}
                  <div className="space-y-0.5 pt-0.5">
                    <h4 className="font-bold dark:text-slate-100 text-slate-900 text-xs leading-snug line-clamp-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {drive.role}
                    </h4>
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-xs font-black text-emerald-600 dark:text-emerald-400">
                        {drive.packageLpa}
                      </span>
                      <span className="text-[10px] text-slate-400 font-medium">CTC Package</span>
                    </div>
                  </div>

                  {/* Meta Info Compact */}
                  <div className="space-y-1 text-[11px] text-slate-500 dark:text-slate-400 pt-1.5 border-t dark:border-slate-800/80 border-slate-100">
                    <div className="flex items-center gap-1.5 truncate">
                      <MapPin className="w-3 h-3 text-blue-500 shrink-0" />
                      <span className="truncate">{drive.location}</span>
                    </div>
                    <div className="flex items-center gap-1.5 truncate">
                      <Briefcase className="w-3 h-3 text-purple-500 shrink-0" />
                      <span className="truncate">{drive.eligibility}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-3 h-3 text-amber-500 shrink-0" />
                      <span>
                        Drive Date: <strong className="dark:text-slate-200 text-slate-800 font-semibold">{drive.driveDate}</strong>
                      </span>
                    </div>
                  </div>

                  {/* Required Skills Badges */}
                  {skills.length > 0 && (
                    <div className="flex items-center gap-1 flex-wrap pt-0.5">
                      {skills.map((skill: string, idx: number) => (
                        <span
                          key={idx}
                          className="px-1.5 py-0.5 rounded dark:bg-slate-800/90 bg-slate-100 dark:text-slate-300 text-slate-700 text-[9.5px] font-medium border dark:border-slate-700/80 border-slate-200/80"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Application Footer Trigger */}
                <div className="pt-2 border-t dark:border-slate-800/80 border-slate-100 flex items-center justify-between gap-2">
                  <span className="text-[10px] text-slate-400 flex items-center gap-1 font-medium">
                    <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                    Verified Drive
                  </span>

                  {drive.applyUrl ? (
                    <a
                      href={drive.applyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-sm flex items-center gap-1 transition-all"
                    >
                      <span>Apply</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  ) : (
                    <HomeClientSection mode="demo-btn" buttonText="Register for Drive" />
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

