'use client';

import { useState } from 'react';
import { Building2, Calendar, MapPin, Briefcase, CheckCircle2, Sparkles } from 'lucide-react';
import HomeClientSection from './HomeClientSection';

interface Drive {
  id: string;
  company: string;
  logoBg: string;
  role: string;
  category: string;
  packageLpa: string;
  location: string;
  eligibleBatches: string;
  driveDate: string;
  status: 'Active Today' | 'Registration Open' | 'Upcoming Drive';
  statusColor: string;
  skills: string[];
  openings: number;
}

const DRIVES: Drive[] = [
  {
    id: 'd1',
    company: 'Microsoft Tech',
    logoBg: 'from-blue-600 to-indigo-600',
    role: 'Full-Stack Software Engineer (SDE-1)',
    category: 'Software Engineering',
    packageLpa: '₹14 - ₹22 LPA',
    location: 'Hybrid (Bangalore / Remote)',
    eligibleBatches: 'Full-Stack & AI Cohorts 2024 - 2026',
    driveDate: '18 Aug 2026',
    status: 'Active Today',
    statusColor: 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-300 dark:border-emerald-500/30',
    skills: ['React.js', 'TypeScript', 'Node.js', 'Azure'],
    openings: 28,
  },
  {
    id: 'd2',
    company: 'Amazon AWS',
    logoBg: 'from-amber-500 to-orange-600',
    role: 'Cloud DevOps & Systems Architect',
    category: 'Cloud & DevOps',
    packageLpa: '₹12 - ₹18 LPA',
    location: 'Bangalore Campus / Onsite Drive',
    eligibleBatches: 'Cloud & Cyber Security Cohorts',
    driveDate: '22 Aug 2026',
    status: 'Registration Open',
    statusColor: 'bg-blue-500/15 text-blue-600 dark:text-blue-400 border-blue-300 dark:border-blue-500/30',
    skills: ['AWS', 'Docker', 'Kubernetes', 'CI/CD'],
    openings: 35,
  },
  {
    id: 'd3',
    company: 'Swiggy AI Labs',
    logoBg: 'from-orange-500 to-amber-600',
    role: 'Generative AI & ML Engineer',
    category: 'AI & Data Science',
    packageLpa: '₹16 - ₹26 LPA',
    location: 'Remote / Gurgaon Office',
    eligibleBatches: 'Autonomous School of AI Cohorts',
    driveDate: '25 Aug 2026',
    status: 'Registration Open',
    statusColor: 'bg-blue-500/15 text-blue-600 dark:text-blue-400 border-blue-300 dark:border-blue-500/30',
    skills: ['Python', 'PyTorch', 'LLMs', 'FastAPI'],
    openings: 18,
  },
  {
    id: 'd4',
    company: 'Deloitte Digital',
    logoBg: 'from-emerald-600 to-green-600',
    role: 'Cyber Security & Risk Analyst',
    category: 'Cyber Security',
    packageLpa: '₹9 - ₹15 LPA',
    location: 'Noida / Pune Tech Campus',
    eligibleBatches: 'Ethical Hacking & Cyber Security Students',
    driveDate: '28 Aug 2026',
    status: 'Upcoming Drive',
    statusColor: 'bg-purple-500/15 text-purple-600 dark:text-purple-400 border-purple-300 dark:border-purple-500/30',
    skills: ['Ethical Hacking', 'SOC Analysis', 'SIEM'],
    openings: 42,
  },
  {
    id: 'd5',
    company: 'Flipkart Tech',
    logoBg: 'from-yellow-500 to-amber-600',
    role: 'UI/UX Product Designer & Web Specialist',
    category: 'Design & UI/UX',
    packageLpa: '₹10 - ₹16 LPA',
    location: 'Bangalore / Remote',
    eligibleBatches: 'UI/UX & Master Design Students',
    driveDate: '02 Sep 2026',
    status: 'Upcoming Drive',
    statusColor: 'bg-purple-500/15 text-purple-600 dark:text-purple-400 border-purple-300 dark:border-purple-500/30',
    skills: ['Figma', 'Design Systems', 'Prototyping'],
    openings: 15,
  },
  {
    id: 'd6',
    company: 'Oracle Enterprise',
    logoBg: 'from-red-600 to-rose-600',
    role: 'Java Backend & Microservices Developer',
    category: 'Software Engineering',
    packageLpa: '₹11 - ₹17 LPA',
    location: 'Hyderabad Campus',
    eligibleBatches: 'Java Full-Stack & Backend Cohorts',
    driveDate: '05 Sep 2026',
    status: 'Upcoming Drive',
    statusColor: 'bg-purple-500/15 text-purple-600 dark:text-purple-400 border-purple-300 dark:border-purple-500/30',
    skills: ['Java 21', 'Spring Boot', 'PostgreSQL'],
    openings: 24,
  },
];

export default function UpcomingHiringDrives() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'Software Engineering', 'AI & Data Science', 'Cloud & DevOps', 'Cyber Security', 'Design & UI/UX'];

  const filteredDrives = selectedCategory === 'All'
    ? DRIVES
    : DRIVES.filter(d => d.category === selectedCategory);

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
            Exclusive campus recruitment drives organized by partner MNCs for NexGen Tech Institute students.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 flex-wrap">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all ${
                selectedCategory === cat
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'dark:bg-slate-800 bg-white/90 dark:text-slate-300 text-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Drives Grid (Compressed Cards & Light Color Background) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredDrives.map((drive) => (
          <div
            key={drive.id}
            className="rounded-xl p-4 dark:bg-slate-950/80 bg-white/95 border dark:border-slate-800/80 border-indigo-100 shadow-sm hover:shadow-md hover:border-blue-400/60 transition-all duration-300 flex flex-col justify-between space-y-3 group"
          >
            <div className="space-y-3">
              
              {/* Top Company & Status Pill */}
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${drive.logoBg} text-white flex items-center justify-center font-extrabold text-xs shadow-xs shrink-0`}>
                    {drive.company.charAt(0)}
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-bold dark:text-white text-slate-900 text-xs leading-snug truncate">
                      {drive.company}
                    </h3>
                    <span className="text-[10px] font-semibold text-blue-600 dark:text-blue-400 block truncate">
                      {drive.openings} Positions Open
                    </span>
                  </div>
                </div>

                <span className={`px-2 py-0.5 rounded text-[9.5px] font-bold uppercase tracking-wider border shrink-0 ${drive.statusColor}`}>
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
                  <span className="truncate">{drive.eligibleBatches}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-3 h-3 text-amber-500 shrink-0" />
                  <span>Date: <strong className="dark:text-slate-200 text-slate-800 font-semibold">{drive.driveDate}</strong></span>
                </div>
              </div>

              {/* Required Skills Badges */}
              <div className="flex items-center gap-1 flex-wrap pt-0.5">
                {drive.skills.map((skill, idx) => (
                  <span
                    key={idx}
                    className="px-1.5 py-0.5 rounded dark:bg-slate-800/90 bg-slate-100 dark:text-slate-300 text-slate-700 text-[9.5px] font-medium border dark:border-slate-700/80 border-slate-200/80"
                  >
                    {skill}
                  </span>
                ))}
              </div>

            </div>

            {/* Application Footer Trigger */}
            <div className="pt-2 border-t dark:border-slate-800/80 border-slate-100 flex items-center justify-between gap-2">
              <span className="text-[10px] text-slate-400 flex items-center gap-1 font-medium">
                <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                Verified Drive
              </span>

              <HomeClientSection mode="demo-btn" buttonText="Apply Now" />
            </div>

          </div>
        ))}
      </div>

    </div>
  );
}
