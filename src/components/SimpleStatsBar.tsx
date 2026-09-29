'use client';

import { useState, useEffect, useRef } from 'react';
import { Users, Building2, TrendingUp, Award } from 'lucide-react';

function StatCounter({
  target,
  suffix = '',
  prefix = '',
}: {
  target: number;
  suffix?: string;
  prefix?: string;
}) {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const elementRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          let startTime: number | null = null;
          const duration = 1600;

          const step = (timestamp: number) => {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / duration, 1);
            // Ease-out cubic: 1 - (1 - progress)^3
            const easeOut = 1 - Math.pow(1 - progress, 3);
            setCount(Math.round(easeOut * target));

            if (progress < 1) {
              requestAnimationFrame(step);
            }
          };

          requestAnimationFrame(step);
        }
      },
      { threshold: 0.15 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, [hasAnimated, target]);

  return (
    <span ref={elementRef}>
      {prefix}
      {count >= 1000 ? count.toLocaleString() : count}
      {suffix}
    </span>
  );
}

const statsData = [
  {
    icon: Users,
    target: 25000,
    suffix: '+',
    label: 'Students Trained',
    subtext: 'Across 18 Tech Domains',
    color: 'text-blue-600 dark:text-blue-400',
    iconBg: 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20',
    borderColor: 'hover:border-blue-500/40',
  },
  {
    icon: Building2,
    target: 450,
    suffix: '+',
    label: 'Hiring Partners',
    subtext: 'MNCs & Unicorn Startups',
    color: 'text-cyan-600 dark:text-cyan-400',
    iconBg: 'bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border-cyan-500/20',
    borderColor: 'hover:border-cyan-500/40',
  },
  {
    icon: TrendingUp,
    target: 32,
    suffix: ' LPA',
    label: 'Highest Salary Package',
    subtext: 'Average 8.5 LPA Package',
    color: 'text-amber-600 dark:text-amber-400',
    iconBg: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20',
    borderColor: 'hover:border-amber-500/40',
  },
  {
    icon: Award,
    target: 12,
    suffix: '+ Yrs',
    label: 'Academic Excellence',
    subtext: 'ISO 9001:2015 Certified',
    color: 'text-purple-600 dark:text-purple-400',
    iconBg: 'bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20',
    borderColor: 'hover:border-purple-500/40',
  },
];

export default function SimpleStatsBar() {
  return (
    <div className="w-full">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
        {statsData.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.label}
              className={`glass-card rounded-2xl p-4 sm:p-5 border border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-slate-900/90 shadow-md hover:shadow-xl transition-all duration-200 ${stat.borderColor} group flex flex-col justify-between`}
            >
              <div className="flex items-center justify-between mb-2">
                <div className={`p-2 rounded-xl border ${stat.iconBg}`}>
                  <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <div className="w-1.5 h-1.5 rounded-full bg-slate-300 dark:bg-slate-700 group-hover:scale-150 group-hover:bg-blue-500 transition-all" />
              </div>

              <div className="space-y-0.5">
                <div className={`text-2xl sm:text-3xl font-black tracking-tight ${stat.color}`}>
                  <StatCounter target={stat.target} suffix={stat.suffix} />
                </div>
                <div className="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-100">
                  {stat.label}
                </div>
                <div className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">
                  {stat.subtext}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
