'use client';

import { useEffect, useState } from 'react';
import { Building2, Sparkles, TrendingUp, CheckCircle2 } from 'lucide-react';

interface Partner {
  name: string;
  tag: string;
  color: string;
  borderColor: string;
  bgColor: string;
  textColor: string;
}

const PARTNERS: Partner[] = [
  {
    name: 'Microsoft',
    tag: 'Cloud & AI Division',
    color: 'from-blue-500 to-indigo-600',
    borderColor: 'border-blue-500/40 hover:border-blue-400',
    bgColor: 'bg-blue-500/10',
    textColor: 'text-blue-600 dark:text-blue-400',
  },
  {
    name: 'Amazon AWS',
    tag: 'Cloud & Solutions',
    color: 'from-amber-500 to-orange-600',
    borderColor: 'border-amber-500/40 hover:border-amber-400',
    bgColor: 'bg-amber-500/10',
    textColor: 'text-amber-600 dark:text-amber-400',
  },
  {
    name: 'Oracle Tech',
    tag: 'Database & Cloud',
    color: 'from-red-500 to-rose-600',
    borderColor: 'border-red-500/40 hover:border-red-400',
    bgColor: 'bg-red-500/10',
    textColor: 'text-red-600 dark:text-red-400',
  },
  {
    name: 'Atlassian',
    tag: 'DevOps & Tooling',
    color: 'from-cyan-500 to-blue-600',
    borderColor: 'border-cyan-500/40 hover:border-cyan-400',
    bgColor: 'bg-cyan-500/10',
    textColor: 'text-cyan-600 dark:text-cyan-400',
  },
  {
    name: 'Deloitte',
    tag: 'Cyber & Enterprise',
    color: 'from-emerald-500 to-green-600',
    borderColor: 'border-emerald-500/40 hover:border-emerald-400',
    bgColor: 'bg-emerald-500/10',
    textColor: 'text-emerald-600 dark:text-emerald-400',
  },
  {
    name: 'Flipkart',
    tag: 'E-Commerce Tech',
    color: 'from-yellow-500 to-amber-600',
    borderColor: 'border-yellow-500/40 hover:border-yellow-400',
    bgColor: 'bg-yellow-500/10',
    textColor: 'text-yellow-600 dark:text-yellow-400',
  },
  {
    name: 'Swiggy',
    tag: 'Consumer Platforms',
    color: 'from-orange-500 to-amber-600',
    borderColor: 'border-orange-500/40 hover:border-orange-400',
    bgColor: 'bg-orange-500/10',
    textColor: 'text-orange-600 dark:text-orange-400',
  },
  {
    name: 'Zomato',
    tag: 'Hyperlocal & AI',
    color: 'from-rose-500 to-red-600',
    borderColor: 'border-rose-500/40 hover:border-rose-400',
    bgColor: 'bg-rose-500/10',
    textColor: 'text-rose-600 dark:text-rose-400',
  },
  {
    name: 'Capgemini',
    tag: 'Digital Transformation',
    color: 'from-indigo-500 to-purple-600',
    borderColor: 'border-indigo-500/40 hover:border-indigo-400',
    bgColor: 'bg-indigo-500/10',
    textColor: 'text-indigo-600 dark:text-indigo-400',
  },
  {
    name: 'IBM Tech',
    tag: 'Hybrid Cloud & Quantum',
    color: 'from-sky-500 to-blue-600',
    borderColor: 'border-sky-500/40 hover:border-sky-400',
    bgColor: 'bg-sky-500/10',
    textColor: 'text-sky-600 dark:text-sky-400',
  },
  {
    name: 'Infosys',
    tag: 'Enterprise Systems',
    color: 'from-blue-600 to-cyan-600',
    borderColor: 'border-blue-600/40 hover:border-blue-400',
    bgColor: 'bg-blue-600/10',
    textColor: 'text-blue-600 dark:text-blue-400',
  },
  {
    name: 'TCS Digital',
    tag: 'Advanced Engineering',
    color: 'from-purple-500 to-pink-600',
    borderColor: 'border-purple-500/40 hover:border-purple-400',
    bgColor: 'bg-purple-500/10',
    textColor: 'text-purple-600 dark:text-purple-400',
  },
];

export default function HiringPartnersMarquee() {
  const [randomHeights, setRandomHeights] = useState<number[]>([]);

  // Generate dynamic random equalizer heights for the moving bars effect
  useEffect(() => {
    const interval = setInterval(() => {
      const heights = Array.from({ length: 32 }, () => Math.floor(Math.random() * 28) + 8);
      setRandomHeights(heights);
    }, 250);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="glass-card rounded-3xl p-6 sm:p-10 border border-blue-500/20 bg-gradient-to-br from-slate-900 via-indigo-950/40 to-slate-950 shadow-2xl relative overflow-hidden space-y-8">
      {/* Background Animated Random Equalizer Bars */}
      <div className="absolute inset-0 pointer-events-none opacity-25 flex items-end justify-between px-4 z-0">
        {randomHeights.map((h, i) => (
          <div
            key={i}
            className="w-1.5 rounded-t-full bg-gradient-to-t from-blue-600 via-indigo-500 to-purple-400 transition-all duration-300 ease-out"
            style={{ height: `${h}px` }}
          />
        ))}
      </div>

      {/* Header Info */}
      <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-600 dark:text-blue-400 text-xs font-semibold uppercase tracking-wider">
            <Building2 className="w-3.5 h-3.5 text-amber-500 dark:text-amber-300" />
            <span>Active Placement Network</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-black dark:text-white text-slate-900 tracking-tight">
            Top Hiring <span className="gradient-text">Company Partners</span>
          </h3>
          <p className="dark:text-slate-400 text-slate-600 text-xs sm:text-sm">
            450+ enterprise MNCs & high-growth startups recruit directly from our graduating cohorts.
          </p>
        </div>

        {/* Live Status Pill */}
        <div className="flex items-center gap-3 px-4 py-2 rounded-2xl dark:bg-slate-900/90 bg-white/90 border dark:border-slate-800 border-slate-300 shadow-md">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
          <span className="text-xs font-bold dark:text-emerald-400 text-emerald-600 uppercase tracking-wider">
            Direct Recruitment Active
          </span>
        </div>
      </div>

      {/* Moving Cycle Ticker 1: Leftward Infinite Cycle */}
      <div className="relative z-10 overflow-hidden py-2 mask-linear-gradient">
        <div className="flex items-center gap-5 animate-marquee whitespace-nowrap">
          {[...PARTNERS, ...PARTNERS].map((p, i) => (
            <div
              key={`${p.name}-${i}`}
              className={`inline-flex items-center gap-3 px-5 py-3 rounded-2xl dark:bg-slate-900/90 bg-white border ${p.borderColor} ${p.bgColor} shadow-lg hover:-translate-y-1 transition-all duration-300 shrink-0 group cursor-pointer`}
            >
              <div className={`w-8 h-8 rounded-xl bg-gradient-to-br ${p.color} text-white flex items-center justify-center font-black text-xs shadow-md group-hover:scale-110 transition-transform`}>
                {p.name.charAt(0)}
              </div>
              <div className="text-left">
                <div className={`text-sm font-black ${p.textColor} tracking-tight group-hover:underline`}>
                  {p.name}
                </div>
                <div className="text-[10px] dark:text-slate-400 text-slate-500 font-medium">
                  {p.tag}
                </div>
              </div>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 ml-1" />
            </div>
          ))}
        </div>
      </div>

      {/* Moving Cycle Ticker 2: Rightward Infinite Cycle */}
      <div className="relative z-10 overflow-hidden py-2 mask-linear-gradient">
        <div className="flex items-center gap-5 animate-marquee-reverse whitespace-nowrap">
          {[...PARTNERS.slice().reverse(), ...PARTNERS.slice().reverse()].map((p, i) => (
            <div
              key={`rev-${p.name}-${i}`}
              className={`inline-flex items-center gap-3 px-5 py-3 rounded-2xl dark:bg-slate-900/90 bg-white border ${p.borderColor} ${p.bgColor} shadow-lg hover:-translate-y-1 transition-all duration-300 shrink-0 group cursor-pointer`}
            >
              <div className={`w-8 h-8 rounded-xl bg-gradient-to-br ${p.color} text-white flex items-center justify-center font-black text-xs shadow-md group-hover:scale-110 transition-transform`}>
                {p.name.charAt(0)}
              </div>
              <div className="text-left">
                <div className={`text-sm font-black ${p.textColor} tracking-tight group-hover:underline`}>
                  {p.name}
                </div>
                <div className="text-[10px] dark:text-slate-400 text-slate-500 font-medium">
                  {p.tag}
                </div>
              </div>
              <span className="w-1.5 h-1.5 rounded-full bg-blue-400 ml-1" />
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Cycle Indicator Bar */}
      <div className="relative z-10 pt-2 border-t dark:border-slate-800/80 border-slate-300/80 flex flex-wrap items-center justify-between gap-4 text-xs text-slate-400">
        <div className="flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-500" />
          <span className="dark:text-slate-300 text-slate-700 font-medium">Average package: ₹8.5 LPA</span>
        </div>
        <div className="flex items-center gap-2">
          <TrendingUp className="w-4 h-4 text-blue-500" />
          <span className="dark:text-slate-300 text-slate-700 font-medium">Highest package: ₹32 LPA</span>
        </div>
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-amber-500" />
          <span className="dark:text-slate-300 text-slate-700 font-medium">100% Placement Drives Included</span>
        </div>
      </div>
    </div>
  );
}
