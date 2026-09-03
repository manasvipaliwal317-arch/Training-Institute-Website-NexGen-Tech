'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { ReactNode } from 'react';

export default function Template({ children }: { children: ReactNode }) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <>{children}</>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 14, scale: 0.995 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{
        duration: 0.35,
        ease: [0.16, 1, 0.3, 1],
      }}
      className="w-full flex-1"
    >
      {children}
    </motion.div>
  );
}
