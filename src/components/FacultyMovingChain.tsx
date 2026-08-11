'use client';

import Image from 'next/image';
import { Award, Link2, Sparkles, Star, Users } from 'lucide-react';

interface Trainer {
  id: string;
  name: string;
  role: string;
  formerCompany: string;
  bio: string;
  photo: string;
  experienceYrs: number;
  rating: number;
}

interface FacultyMovingChainProps {
  trainers: Trainer[];
}

export default function FacultyMovingChain({ trainers }: FacultyMovingChainProps) {
  // Duplicate trainers list for seamless infinite loop chain
  const chainList = [...trainers, ...trainers];

  return (
    <div className="space-y-6">
      {/* Moving Chain Marquee Banner */}
      <div className="relative overflow-hidden py-4 mask-linear-gradient">
        {/* Animated Moving Chain */}
        <div className="flex items-center gap-6 animate-marquee whitespace-nowrap">
          {chainList.map((t, idx) => (
            <div key={`${t.id}-${idx}`} className="flex items-center gap-6 shrink-0">
              {/* Faculty Card Link in the Chain */}
              <div className="w-80 glass-card glass-card-hover rounded-2xl p-6 border border-blue-500/30 bg-gradient-to-br from-slate-900 via-indigo-950/40 to-slate-950 shadow-xl space-y-4 hover:border-blue-400 transition-all duration-300 whitespace-normal group">
                <div className="flex items-center gap-4">
                  <div className="relative w-16 h-16 rounded-2xl overflow-hidden border-2 border-blue-500/40 shrink-0 shadow-md group-hover:scale-105 transition-transform duration-500">
                    <Image src={t.photo} alt={t.name} fill className="object-cover" />
                  </div>
                  <div>
                    <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-blue-500/10 border border-blue-500/30 text-blue-600 dark:text-blue-400 text-[10px] font-bold uppercase tracking-wider">
                      Ex-{t.formerCompany}
                    </div>
                    <h3 className="text-base font-black dark:text-white text-slate-900 group-hover:text-blue-500 transition-colors">
                      {t.name}
                    </h3>
                    <p className="text-xs font-semibold text-purple-600 dark:text-purple-400 line-clamp-1">
                      {t.role}
                    </p>
                  </div>
                </div>

                <p className="dark:text-slate-400 text-slate-600 text-xs line-clamp-2 leading-relaxed font-normal">
                  {t.bio}
                </p>

                <div className="pt-3 border-t dark:border-slate-800/80 border-slate-300/80 flex items-center justify-between text-xs">
                  <span className="font-semibold dark:text-slate-300 text-slate-700 flex items-center gap-1">
                    <Award className="w-3.5 h-3.5 text-blue-500" />
                    {t.experienceYrs}+ Yrs Experience
                  </span>
                  <span className="font-extrabold text-amber-500 dark:text-amber-400 flex items-center gap-1">
                    <Star className="w-3.5 h-3.5 fill-amber-400" />
                    {t.rating}
                  </span>
                </div>
              </div>

              {/* Glowing Chain Link Connector Icon */}
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 shadow-md animate-pulse shrink-0">
                <Link2 className="w-5 h-5 rotate-45" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
