'use client';

import { ReactNode } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

interface AnimationProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
}

// Fade in & Fly Up
export function FadeInUp({
  children,
  className = '',
  delay = 0,
  duration = 0.6,
}: AnimationProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 35 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{
        duration,
        delay,
        ease: [0.22, 1, 0.36, 1], // Custom cubic-bezier for buttery smooth entrance
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Fly In from Left
export function FadeInLeft({
  children,
  className = '',
  delay = 0,
  duration = 0.6,
}: AnimationProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={shouldReduceMotion ? { opacity: 1, x: 0 } : { opacity: 0, x: -45 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{
        duration,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Fly In from Right
export function FadeInRight({
  children,
  className = '',
  delay = 0,
  duration = 0.6,
}: AnimationProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={shouldReduceMotion ? { opacity: 1, x: 0 } : { opacity: 0, x: 45 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{
        duration,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Subtle Zoom In Reveal
export function ZoomIn({
  children,
  className = '',
  delay = 0,
  duration = 0.6,
}: AnimationProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={shouldReduceMotion ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.92 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{
        duration,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Rotate / Wheel In Reveal
export function RotateIn({
  children,
  className = '',
  delay = 0,
  duration = 0.7,
}: AnimationProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={
        shouldReduceMotion
          ? { opacity: 1, rotate: 0, scale: 1 }
          : { opacity: 0, rotate: -4, scale: 0.95 }
      }
      whileInView={{ opacity: 1, rotate: 0, scale: 1 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{
        duration,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Staggered Container for Grid Cards
export function StaggerContainer({
  children,
  className = '',
  staggerDelay = 0.1,
}: {
  children: ReactNode;
  className?: string;
  staggerDelay?: number;
}) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-50px' }}
      variants={{
        hidden: { opacity: 0 },
        show: {
          opacity: 1,
          transition: {
            staggerChildren: shouldReduceMotion ? 0 : staggerDelay,
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Staggered Child Item
export function StaggerItem({
  children,
  className = '',
}: {
  children: ReactNode;
  className?: string;
}) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      variants={{
        hidden: shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 30, scale: 0.96 },
        show: {
          opacity: 1,
          y: 0,
          scale: 1,
          transition: {
            duration: 0.5,
            ease: [0.22, 1, 0.36, 1],
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Interactive Hover Card Wrapper (Lift + Glow + Scale Zoom In)
export function MotionCard({
  children,
  className = '',
  hoverScale = 1.045,
  hoverY = -8,
}: {
  children: ReactNode;
  className?: string;
  hoverScale?: number;
  hoverY?: number;
}) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      whileHover={
        shouldReduceMotion
          ? {}
          : {
              y: hoverY,
              scale: hoverScale,
              transition: { duration: 0.22, ease: [0.16, 1, 0.3, 1] },
            }
      }
      whileTap={{ scale: 0.97 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}


// Fast Pop-in Scale Effect
export function ScalePop({
  children,
  className = '',
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={shouldReduceMotion ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.88, y: 15 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{
        type: 'spring',
        stiffness: 280,
        damping: 22,
        delay,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Fast Snappy Hover Button Effect
export function FastHoverButton({
  children,
  className = '',
  onClick,
}: {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}) {
  return (
    <motion.div
      whileHover={{ scale: 1.04, y: -2 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: 'spring', stiffness: 400, damping: 17 }}
      className={className}
      onClick={onClick}
    >
      {children}
    </motion.div>
  );
}

