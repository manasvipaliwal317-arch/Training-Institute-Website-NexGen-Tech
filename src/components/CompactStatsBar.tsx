'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Users,
  Building2,
  TrendingUp,
  Award,
  ChevronDown,
  ChevronUp,
  Sparkles,
  BarChart3,
} from 'lucide-react';

const statsData = [
  {
    icon: Users,
    value: '25,000+',
    label: 'Students Trained',
    subtext: 'Across 18 Tech Domains',
    color: 'text-blue-500 dark:text-blue-400',
    bgColor: 'bg-blue-500/10 border-blue-500/20',
  },
  {
    icon: Building2,
    value: '450+',
    label: 'Hiring Partners',
    subtext: 'MNCs & Fast-growing Startups',
    color: 'text-cyan-500 dark:text-cyan-400',
    bgColor: 'bg-cyan-500/10 border-cyan-500/20',
  },
  {
    icon: TrendingUp,
    value: '32 LPA',
    label: 'Highest Salary Package',
    subtext: 'Average 8.5 LPA Package',
    color: 'text-amber-500 dark:text-amber-400',
    bgColor: 'bg-amber-500/10 border-amber-500/20',
  },
  {
    icon: Award,
    value: '12+ Yrs',
    label: 'Academic Excellence',
    subtext: 'ISO 9001:2015 Certified',
    color: 'text-purple-500 dark:text-purple-400',
    bgColor: 'bg-purple-500/10 border-purple-500/20',
  },
];

export default function CompactStatsBar() {
  const [isRevealed, setIsRevealed] = useState(false);

  return (
    <div className="w-full">
      <div className="glass-card rounded-2xl border border-slate-200 dark:border-blue-500/20 bg-white/95 dark:bg-slate-900/90 shadow-xl overflow-hidden backdrop-blur-xl transition-all">
        {/* Compact Header Ribbon / Menu Reveal Trigger */}
        <div
          onClick={() => setIsRevealed(!isRevealed)}
          className="flex items-center justify-between px-4 sm:px-6 py-3 cursor-pointer hover:bg-slate-100/70 dark:hover:bg-slate-800/40 transition-colors select-none"
        >
          {/* Left: Highlight Pill & Condensed Metric Summary */}
          <div className="flex items-center gap-2 sm:gap-4 overflow-x-auto no-scrollbar py-0.5">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-600 dark:text-blue-400 text-xs font-bold shrink-0">
              <Sparkles className="w-3.5 h-3.5 text-amber-500 dark:text-amber-300" />
              <span className="uppercase tracking-wider text-[10px]">Academy Milestones</span>
            </div>

            {/* Quick Preview Chips (Visible when collapsed) */}
            <div className="flex items-center gap-3 sm:gap-5 text-xs text-slate-700 dark:text-slate-300 whitespace-nowrap">
              <span className="flex items-center gap-1">
                <span className="font-extrabold text-blue-600 dark:text-blue-400">25,000+</span>
                <span className="text-slate-500 dark:text-slate-400 hidden md:inline">Alumni</span>
              </span>
              <span className="text-slate-300 dark:text-slate-700 hidden sm:inline">•</span>
              <span className="flex items-center gap-1">
                <span className="font-extrabold text-cyan-600 dark:text-cyan-400">450+</span>
                <span className="text-slate-500 dark:text-slate-400 hidden md:inline">Partners</span>
              </span>
              <span className="text-slate-300 dark:text-slate-700 hidden sm:inline">•</span>
              <span className="flex items-center gap-1">
                <span className="font-extrabold text-amber-600 dark:text-amber-400">32 LPA</span>
                <span className="text-slate-500 dark:text-slate-400 hidden md:inline">Max Package</span>
              </span>
              <span className="text-slate-300 dark:text-slate-700 hidden sm:inline">•</span>
              <span className="flex items-center gap-1">
                <span className="font-extrabold text-purple-600 dark:text-purple-400">12+ Yrs</span>
                <span className="text-slate-500 dark:text-slate-400 hidden md:inline">Excellence</span>
              </span>
            </div>
          </div>

          {/* Right: Menu Reveal Button */}
          <div className="flex items-center gap-1.5 shrink-0 pl-3 border-l border-slate-200 dark:border-slate-800">
            <span className="text-[11px] font-semibold text-blue-600 dark:text-blue-400 hidden sm:inline">
              {isRevealed ? 'Hide Details' : 'Reveal Stats Menu'}
            </span>
            <div className="p-1 rounded-lg bg-blue-500/10 text-blue-600 dark:text-blue-400 group-hover:bg-blue-500/20 transition-colors">
              {isRevealed ? (
                <ChevronUp className="w-4 h-4 transition-transform" />
              ) : (
                <ChevronDown className="w-4 h-4 transition-transform" />
              )}
            </div>
          </div>
        </div>

        {/* Menu Reveal Effect - Dropdown Drawer Animation */}
        <AnimatePresence>
          {isRevealed && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.28, ease: 'easeInOut' }}
              className="overflow-hidden border-t border-slate-200 dark:border-slate-800/80 bg-slate-50/80 dark:bg-slate-950/40"
            >
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 p-4 sm:p-5">
                {statsData.map((stat, idx) => {
                  const Icon = stat.icon;
                  return (
                    <motion.div
                      key={stat.label}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.05 }}
                      className="p-3.5 sm:p-4 rounded-xl border border-slate-200 dark:border-slate-800/80 bg-white dark:bg-slate-900/60 hover:bg-slate-50 dark:hover:bg-slate-900 hover:border-blue-500/30 transition-all text-center space-y-1.5 shadow-sm"
                    >
                      <div className="inline-flex p-2 rounded-xl bg-slate-100 dark:bg-slate-800/80 text-blue-600 dark:text-blue-400 mb-1">
                        <Icon className={`w-4 h-4 ${stat.color}`} />
                      </div>
                      <div className={`text-2xl sm:text-3xl font-black ${stat.color}`}>
                        {stat.value}
                      </div>
                      <div className="text-xs font-semibold text-slate-800 dark:text-slate-200">
                        {stat.label}
                      </div>
                      <div className="text-[10px] text-slate-500 dark:text-slate-400 font-medium">
                        {stat.subtext}
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
