'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Users,
  Building2,
  TrendingUp,
  Award,
  Sparkles,
  Layers,
  ArrowRightLeft,
  ChevronRight,
} from 'lucide-react';

interface StatCard {
  id: number;
  icon: typeof Users;
  value: string;
  label: string;
  subtext: string;
  badge: string;
  color: string;
  glowColor: string;
  borderColor: string;
  accentBg: string;
}

const stats: StatCard[] = [
  {
    id: 0,
    icon: Users,
    value: '25,000+',
    label: 'Students Trained',
    subtext: 'Across 18 Tech Domains',
    badge: 'Alumni Network',
    color: 'text-blue-600 dark:text-blue-400',
    glowColor: 'shadow-blue-500/25 border-blue-500/50',
    borderColor: 'group-hover:border-blue-500/50',
    accentBg: 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20',
  },
  {
    id: 1,
    icon: Building2,
    value: '450+',
    label: 'Hiring Partners',
    subtext: 'MNCs & Unicorn Startups',
    badge: 'Industry Tie-ups',
    color: 'text-cyan-600 dark:text-cyan-400',
    glowColor: 'shadow-cyan-500/25 border-cyan-500/50',
    borderColor: 'group-hover:border-cyan-500/50',
    accentBg: 'bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border-cyan-500/20',
  },
  {
    id: 2,
    icon: TrendingUp,
    value: '32 LPA',
    label: 'Highest Salary Package',
    subtext: 'Average 8.5 LPA Package',
    badge: 'Career Elevation',
    color: 'text-amber-600 dark:text-amber-400',
    glowColor: 'shadow-amber-500/25 border-amber-500/50',
    borderColor: 'group-hover:border-amber-500/50',
    accentBg: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20',
  },
  {
    id: 3,
    icon: Award,
    value: '12+ Yrs',
    label: 'Academic Excellence',
    subtext: 'ISO 9001:2015 Certified',
    badge: 'Global Standard',
    color: 'text-purple-600 dark:text-purple-400',
    glowColor: 'shadow-purple-500/25 border-purple-500/50',
    borderColor: 'group-hover:border-purple-500/50',
    accentBg: 'bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20',
  },
];

export default function CardFanStats() {
  const [isFanned, setIsFanned] = useState(false);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Deck transformations for stacked state (Desktop)
  const stackedConfigsDesktop = [
    { rotate: -8, x: -55, y: 6, zIndex: 10 },
    { rotate: -3, x: -18, y: 0, zIndex: 20 },
    { rotate: 3, x: 18, y: 0, zIndex: 30 },
    { rotate: 8, x: 55, y: 6, zIndex: 40 },
  ];

  // Deck transformations for stacked state (Mobile)
  const stackedConfigsMobile = [
    { rotate: -7, x: -35, y: 4, zIndex: 10 },
    { rotate: -2, x: -12, y: 0, zIndex: 20 },
    { rotate: 2, x: 12, y: 0, zIndex: 30 },
    { rotate: 7, x: 35, y: 4, zIndex: 40 },
  ];

  // Wide spread transformations for fanned state (Desktop)
  const spreadConfigsDesktop = [
    { rotate: -4, x: -340, y: 0, zIndex: 15 },
    { rotate: -1.5, x: -115, y: -6, zIndex: 25 },
    { rotate: 1.5, x: 115, y: -6, zIndex: 35 },
    { rotate: 4, x: 340, y: 0, zIndex: 45 },
  ];

  // Mobile spread transformations
  const spreadConfigsMobile = [
    { rotate: -6, x: -95, y: -2, zIndex: 15 },
    { rotate: -2, x: -32, y: -6, zIndex: 25 },
    { rotate: 2, x: 32, y: -6, zIndex: 35 },
    { rotate: 6, x: 95, y: -2, zIndex: 45 },
  ];

  return (
    <div className="w-full flex flex-col items-center">
      {/* Top Controller Bar */}
      <div className="w-full flex items-center justify-between px-2 sm:px-4 mb-3 max-w-5xl">
        <div className="flex items-center gap-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-600 dark:text-blue-400 text-xs font-bold shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-amber-500 dark:text-amber-300" />
            <span className="uppercase tracking-wider text-[10px]">Track Record Milestones</span>
          </div>
          <span className="text-xs text-slate-500 dark:text-slate-400 hidden sm:inline">
            • Hover or tap cards to fan out
          </span>
        </div>

        {/* Interactive Fan / Stack Toggle Button */}
        <button
          type="button"
          onClick={() => setIsFanned((prev) => !prev)}
          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white/90 dark:bg-slate-900/90 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 text-xs font-semibold shadow-sm transition-all cursor-pointer"
        >
          <Layers className="w-3.5 h-3.5 text-blue-500" />
          <span>{isFanned ? 'Gather Cards' : 'Fan Out Cards'}</span>
        </button>
      </div>

      {/* Interactive Card Fan Stage */}
      <div
        className="relative w-full max-w-5xl h-60 sm:h-64 flex items-center justify-center select-none overflow-visible"
        onMouseEnter={() => setIsFanned(true)}
        onMouseLeave={() => {
          setIsFanned(false);
          setHoveredCard(null);
        }}
      >
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          const isCurrentHovered = hoveredCard === stat.id;

          // Determine current transform config based on screen & state
          const stacked = isMobile ? stackedConfigsMobile[idx] : stackedConfigsDesktop[idx];
          const spread = isMobile ? spreadConfigsMobile[idx] : spreadConfigsDesktop[idx];

          let targetX = isFanned ? spread.x : stacked.x;
          let targetY = isFanned ? spread.y : stacked.y;
          let targetRotate = isFanned ? spread.rotate : stacked.rotate;
          let targetScale = 1;
          let targetZIndex = isFanned ? spread.zIndex : stacked.zIndex;

          if (isCurrentHovered) {
            targetScale = isMobile ? 1.05 : 1.08;
            targetY = isMobile ? -14 : -18;
            targetRotate = 0;
            targetZIndex = 60;
            if (isMobile) targetX = 0;
          } else if (hoveredCard !== null) {
            targetScale = 0.95;
            targetZIndex = 10;
          }

          return (
            <motion.div
              key={stat.id}
              onClick={() => {
                setIsFanned(true);
                setHoveredCard(stat.id);
              }}
              onMouseEnter={() => setHoveredCard(stat.id)}
              onMouseLeave={() => setHoveredCard(null)}
              animate={{
                x: targetX,
                y: targetY,
                rotate: targetRotate,
                scale: targetScale,
                zIndex: targetZIndex,
              }}
              transition={{
                type: 'spring',
                stiffness: 260,
                damping: 24,
                mass: 0.8,
              }}
              style={{
                position: 'absolute',
                transformOrigin: 'bottom center',
              }}
              className={`w-52 sm:w-60 md:w-64 h-48 sm:h-52 rounded-2xl p-4 sm:p-5 cursor-pointer glass-card border backdrop-blur-2xl transition-shadow duration-300 flex flex-col justify-between ${
                isCurrentHovered
                  ? `border-2 ${stat.glowColor} bg-white dark:bg-slate-900 shadow-2xl`
                  : 'border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-slate-900/90 shadow-xl'
              }`}
            >
              {/* Card Header: Icon Badge & Metric Category */}
              <div className="flex items-center justify-between">
                <div className={`p-2 sm:p-2.5 rounded-xl border ${stat.accentBg}`}>
                  <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                  {stat.badge}
                </span>
              </div>

              {/* Card Body: Highlighted Stat Number & Title */}
              <div className="space-y-1 my-auto">
                <div className={`text-2xl sm:text-3xl md:text-4xl font-black tracking-tight ${stat.color}`}>
                  {stat.value}
                </div>
                <div className="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-100 leading-tight">
                  {stat.label}
                </div>
              </div>

              {/* Card Footer: Subtext with Subtle Arrow */}
              <div className="pt-2 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400 font-medium">
                <span className="truncate">{stat.subtext}</span>
                <ChevronRight className={`w-3.5 h-3.5 shrink-0 transition-transform ${isCurrentHovered ? 'translate-x-1 text-blue-500' : 'text-slate-400'}`} />
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
