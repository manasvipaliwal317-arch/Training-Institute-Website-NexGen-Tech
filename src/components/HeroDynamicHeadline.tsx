'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const TRACKS = [
  { tech: 'AI & Data Science', domain: 'Engineering' },
  { tech: 'Full Stack & Cloud', domain: 'Development' },
  { tech: 'DevOps & Cloud', domain: 'Architecture' },
  { tech: 'Data Analytics & AI', domain: 'Analytics' },
  { tech: 'Cyber Security', domain: 'Defense' },
];

export default function HeroDynamicHeadline() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % TRACKS.length);
    }, 3200);
    return () => clearInterval(interval);
  }, []);

  const current = TRACKS[currentIndex];

  return (
    <h1 className="text-2xl sm:text-4xl lg:text-6xl font-black dark:text-white text-slate-900 tracking-tight leading-[1.18] sm:leading-[1.12]">
      Build Your Career in <br className="hidden sm:inline" />
      <span className="inline-block relative min-w-[170px] sm:min-w-[320px] lg:min-w-[420px] max-w-full h-[1.25em] align-bottom overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.span
            key={current.tech}
            initial={{ y: 40, opacity: 0, filter: 'blur(6px)' }}
            animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
            exit={{ y: -40, opacity: 0, filter: 'blur(6px)' }}
            transition={{
              duration: 0.5,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="inline-block gradient-text whitespace-nowrap"
          >
            {current.tech}
          </motion.span>
        </AnimatePresence>
      </span>{' '}
      <span className="block sm:inline font-black text-slate-900 dark:text-white">
        & {current.domain}
      </span>
    </h1>
  );
}
