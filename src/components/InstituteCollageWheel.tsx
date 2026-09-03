'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Sparkles, 
  ChevronLeft, 
  ChevronRight, 
  Maximize2, 
  X, 
  GraduationCap, 
  Building2, 
  Trophy, 
  Briefcase, 
  Users, 
  Zap 
} from 'lucide-react';

interface CollageItem {
  id: string;
  title: string;
  category: string;
  description: string;
  image: string;
  badge: string;
  badgeBg: string;
  icon: typeof GraduationCap;
  stats: string;
}

const collageItems: CollageItem[] = [
  {
    id: 'classroom',
    title: 'Interactive Live Classroom Sessions',
    category: 'Live Classroom',
    description: 'Students engaged in hands-on coding, architecture design, and direct mentorship with industry tech leads.',
    image: '/images/collage/classroom_session.png',
    badge: 'Daily Interactive Coding',
    badgeBg: 'from-blue-600 to-indigo-600',
    icon: GraduationCap,
    stats: '1:1 Mentor Support'
  },
  {
    id: 'event',
    title: 'Annual Tech Hackathon & Workshops',
    category: 'Institute Event',
    description: 'Lively hackathons where student teams present innovative full-stack and AI apps to venture mentors and judges.',
    image: '/images/collage/tech_event.png',
    badge: '36-Hour Hackathon',
    badgeBg: 'from-purple-600 to-pink-600',
    icon: Trophy,
    stats: '₹2.5 Lakh Prize Pool'
  },
  {
    id: 'placement',
    title: 'Placement Drives & Offer Celebrations',
    category: 'Placements',
    description: 'Celebrating high-package offer letters with global IT recruitment partners and alumni mentors.',
    image: '/images/collage/placement_celebration.png',
    badge: '100% Placement Support',
    badgeBg: 'from-emerald-600 to-teal-600',
    icon: Briefcase,
    stats: 'Highest 32 LPA Package'
  },
  {
    id: 'industrial-visit',
    title: 'Industrial Exposure Visit to Tech Hubs',
    category: 'Industrial Visit',
    description: 'Field visits to leading corporate campuses, cloud server facilities, and corporate AI innovation centers.',
    image: '/images/collage/industrial_visit.png',
    badge: 'Corporate Campus Tour',
    badgeBg: 'from-amber-600 to-orange-600',
    icon: Building2,
    stats: 'Tier-1 IT Infrastructure'
  },
  {
    id: 'reception',
    title: 'Flagship Campus Reception & Student Lounge',
    category: 'Campus Infrastructure',
    description: 'Modern reception lobby and collaborative discussion lounges equipped for group brainstorming.',
    image: '/institute-reception.png',
    badge: 'State-of-the-Art Infra',
    badgeBg: 'from-cyan-600 to-blue-600',
    icon: Users,
    stats: 'Open 7 Days a Week'
  },
  {
    id: 'gpulab',
    title: 'Advanced AI & High-Performance GPU Labs',
    category: 'Research Labs',
    description: 'Dedicated workstations with NVIDIA GPUs for model training, cloud DevOps, and heavy software simulation.',
    image: '/hero-trusted-students-lab.png',
    badge: 'NVIDIA GPU Accelerated',
    badgeBg: 'from-emerald-500 to-green-700',
    icon: Zap,
    stats: 'Dedicated AI Workstations'
  }
];

export default function InstituteCollageWheel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoSpin, setIsAutoSpin] = useState(true);
  const [selectedItem, setSelectedItem] = useState<CollageItem | null>(null);

  // Auto rotation wheel timer (2-second interval)
  useEffect(() => {
    if (!isAutoSpin) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % collageItems.length);
    }, 2000);
    return () => clearInterval(interval);
  }, [isAutoSpin]);

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + collageItems.length) % collageItems.length);
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % collageItems.length);
  };

  const total = collageItems.length;

  return (
    <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 overflow-hidden">
      {/* Background Ambient Glow */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[140px] animate-pulse" />
        <div className="absolute top-1/3 left-1/4 w-[400px] h-[400px] bg-purple-600/10 rounded-full blur-[120px]" />
      </div>

      {/* Header Badge & Title */}
      <div className="text-center space-y-4 max-w-3xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-emerald-500/10 border border-blue-500/30 text-blue-400 text-xs font-bold uppercase tracking-wider shadow-lg">
          <Sparkles className="w-4 h-4 text-amber-400 animate-spin" style={{ animationDuration: '6s' }} />
          <span>Real Campus Life & Achievements</span>
        </div>
        
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
          Experience Life at <span className="gradient-text">NexGen Tech Institute</span>
        </h2>

        <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
          From live classroom sessions and hackathons to placement celebrations and corporate industrial visits—see our campus in action.
        </p>

        {/* Wheel Control Nav Arrows */}
        <div className="pt-2 flex items-center justify-center gap-3">
          <button
            onClick={handlePrev}
            className="p-2.5 rounded-full bg-slate-900/80 hover:bg-slate-800 text-white border border-slate-700 hover:border-blue-500/50 transition-all shadow-md active:scale-95 flex items-center justify-center"
            title="Rotate Left"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <button
            onClick={handleNext}
            className="p-2.5 rounded-full bg-slate-900/80 hover:bg-slate-800 text-white border border-slate-700 hover:border-blue-500/50 transition-all shadow-md active:scale-95 flex items-center justify-center"
            title="Rotate Right"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* 3D Wheel Motion Carousel Container */}
      <div 
        className="relative w-full h-[480px] sm:h-[540px] flex items-center justify-center perspective-[1200px]"
        onMouseEnter={() => setIsAutoSpin(false)}
        onMouseLeave={() => setIsAutoSpin(true)}
      >
        <div className="relative w-full max-w-4xl h-full flex items-center justify-center">
          {collageItems.map((item, index) => {
            // Calculate circular relative offset (-2, -1, 0, 1, 2, etc.)
            let offset = index - activeIndex;
            if (offset > total / 2) offset -= total;
            if (offset < -total / 2) offset += total;

            const isCenter = offset === 0;
            const absOffset = Math.abs(offset);

            // 3D Arc Transformation Parameters
            const rotateY = offset * 28; // Degree tilt around Y axis
            const translateX = offset * (typeof window !== 'undefined' && window.innerWidth < 640 ? 120 : 210); // Horizontal spacing
            const translateZ = -absOffset * 160; // Depth push back
            const scale = Math.max(0.65, 1 - absOffset * 0.15);
            const opacity = absOffset > 2 ? 0 : Math.max(0.3, 1 - absOffset * 0.35);
            const zIndex = 30 - absOffset * 10;

            const IconComponent = item.icon;

            return (
              <motion.div
                key={item.id}
                onClick={() => {
                  if (isCenter) {
                    setSelectedItem(item);
                  } else {
                    setActiveIndex(index);
                  }
                }}
                initial={false}
                animate={{
                  transform: `translateX(${translateX}px) translateZ(${translateZ}px) rotateY(${rotateY}deg) scale(${scale})`,
                  opacity,
                  zIndex,
                }}
                transition={{
                  type: 'spring',
                  stiffness: 120,
                  damping: 18,
                  mass: 0.8
                }}
                className={`absolute w-[290px] sm:w-[360px] cursor-pointer group select-none ${
                  isCenter ? 'ring-2 ring-blue-500/80 shadow-2xl shadow-blue-500/20' : ''
                }`}
                style={{
                  transformStyle: 'preserve-3d',
                }}
              >
                <div className="glass-card rounded-2xl overflow-hidden border border-slate-700/80 bg-slate-900/90 shadow-2xl transition-all duration-300">
                  {/* Image Container with Badge Overlay */}
                  <div className="relative h-56 sm:h-64 w-full overflow-hidden">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      unoptimized
                      sizes="(max-width: 768px) 300px, 400px"
                      className="object-cover group-hover:scale-108 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-90" />

                    {/* Category Top Badge */}
                    <div className="absolute top-3 left-3 flex items-center gap-2">
                      <span className={`px-3 py-1 rounded-full bg-gradient-to-r ${item.badgeBg} text-white font-extrabold text-[10px] uppercase tracking-wider shadow-md flex items-center gap-1.5`}>
                        <IconComponent className="w-3.5 h-3.5 text-white" />
                        <span>{item.category}</span>
                      </span>
                    </div>

                    {/* Expand Zoom Icon Button */}
                    <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="p-2 rounded-full bg-slate-900/80 text-white border border-white/20 backdrop-blur-md hover:bg-blue-600 transition-colors shadow-lg">
                        <Maximize2 className="w-4 h-4" />
                      </div>
                    </div>

                    {/* Bottom Stats Pill */}
                    <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-white">
                      <span className="bg-slate-900/80 backdrop-blur-md px-2.5 py-1 rounded-lg border border-white/10 font-medium">
                        {item.stats}
                      </span>
                      <span className="text-[11px] font-semibold text-blue-400 group-hover:underline flex items-center gap-1">
                        {isCenter ? 'Click to Enlarge' : 'Rotate Here'}
                      </span>
                    </div>
                  </div>

                  {/* Card Content Footer */}
                  <div className="p-4 sm:p-5 space-y-2">
                    <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-blue-400 transition-colors line-clamp-1">
                      {item.title}
                    </h3>
                    <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Wheel Indicators Dots */}
      <div className="flex items-center justify-center gap-2 mt-4">
        {collageItems.map((_, idx) => (
          <button
            key={idx}
            onClick={() => {
              setActiveIndex(idx);
            }}
            className={`h-2.5 rounded-full transition-all duration-300 ${
              idx === activeIndex
                ? 'w-8 bg-gradient-to-r from-blue-500 to-purple-500 shadow-md shadow-blue-500/30'
                : 'w-2.5 bg-slate-700 hover:bg-slate-500'
            }`}
            title={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>

      {/* Fullscreen Lightbox / Modal for Item Detail */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md"
            onClick={() => setSelectedItem(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-2xl glass-card rounded-3xl overflow-hidden border border-blue-500/30 bg-slate-900 p-6 sm:p-8 space-y-6 shadow-2xl"
            >
              <button
                onClick={() => setSelectedItem(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="relative w-full h-72 rounded-2xl overflow-hidden border border-slate-700">
                <Image
                  src={selectedItem.image}
                  alt={selectedItem.title}
                  fill
                  unoptimized
                  className="object-cover"
                />
                <div className="absolute top-4 left-4">
                  <span className={`px-3 py-1 rounded-full bg-gradient-to-r ${selectedItem.badgeBg} text-white font-extrabold text-xs shadow-lg uppercase tracking-wider`}>
                    {selectedItem.badge}
                  </span>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-blue-400">
                  <selectedItem.icon className="w-4 h-4" />
                  <span>{selectedItem.category} • {selectedItem.stats}</span>
                </div>
                <h3 className="text-2xl font-black text-white">{selectedItem.title}</h3>
                <p className="text-sm text-slate-300 leading-relaxed">{selectedItem.description}</p>
              </div>

              <div className="pt-4 border-t border-slate-800 flex justify-end">
                <button
                  onClick={() => setSelectedItem(null)}
                  className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs transition-all shadow-lg"
                >
                  Close Preview
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
