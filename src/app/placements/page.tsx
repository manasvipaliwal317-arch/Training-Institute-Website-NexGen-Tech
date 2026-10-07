import Image from 'next/image';
import { prisma } from '@/lib/prisma';
import {
  TrendingUp,
  Award,
  Building2,
  Users,
  Briefcase,
  Sparkles,
  CheckCircle2,
  FileCheck,
  UserCheck,
  Target,
  ArrowRight,
} from 'lucide-react';
import HiringPartnersMarquee from '@/components/HiringPartnersMarquee';
import UpcomingHiringDrives from '@/components/UpcomingHiringDrives';
import HomeClientSection from '@/components/HomeClientSection';
import {
  FadeInUp,
  FadeInLeft,
  FadeInRight,
  StaggerContainer,
  StaggerItem,
  MotionCard,
  ScalePop,
} from '@/components/AnimatedSection';

export const metadata = {
  title: 'Placement Process & Alumni Salary Reports | NexGen Tech Academy',
  description: 'Explore placement statistics, hiring company partners, salary packages, mock interview preparation, upcoming campus recruitment drives, and alumni success stories.',
};

export const revalidate = 0;

export default async function PlacementsPage() {
  const placements = await prisma.placement.findMany({
    orderBy: { createdAt: 'desc' },
  });

  const hiringDrives = await prisma.hiringDrive.findMany({
    orderBy: { createdAt: 'desc' },
  });

  return (
    <div className="space-y-16 py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* 1. HERO HEADER: WHERE OUR GRADUATES GET HIRED */}
      <FadeInUp duration={0.4}>
        <div className="glass-card rounded-3xl p-8 sm:p-14 border border-emerald-200/80 dark:border-emerald-500/20 bg-gradient-to-br from-emerald-50/70 via-teal-50/50 to-slate-50/80 dark:from-slate-900 dark:via-emerald-950/30 dark:to-slate-900 text-center space-y-6 shadow-md">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-xs font-semibold uppercase tracking-wider mx-auto">
            <TrendingUp className="w-4 h-4" />
            <span>360° Placement Acceleration Ecosystem</span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
            Where Our Graduates <span className="gradient-text-cyan">Get Hired</span>
          </h1>

          <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            Our dedicated placement cell has empowered over 25,000 students to secure software engineering, AI, cyber security, and design roles at top global MNCs and unicorns.
          </p>

          {/* Stats Grid */}
          <StaggerContainer staggerDelay={0.08} className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-slate-200 dark:border-slate-800">
            <StaggerItem>
              <div className="p-4 rounded-2xl bg-white/80 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 hover:border-emerald-500/40 transition-colors shadow-xs">
                <span className="text-2xl sm:text-3xl font-extrabold text-emerald-600 dark:text-emerald-400">32 LPA</span>
                <span className="text-xs text-slate-500 dark:text-slate-400 block font-medium">Highest Package</span>
              </div>
            </StaggerItem>
            <StaggerItem>
              <div className="p-4 rounded-2xl bg-white/80 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 hover:border-blue-500/40 transition-colors shadow-xs">
                <span className="text-2xl sm:text-3xl font-extrabold text-blue-600 dark:text-blue-400">8.5 LPA</span>
                <span className="text-xs text-slate-500 dark:text-slate-400 block font-medium">Average Package</span>
              </div>
            </StaggerItem>
            <StaggerItem>
              <div className="p-4 rounded-2xl bg-white/80 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 hover:border-purple-500/40 transition-colors shadow-xs">
                <span className="text-2xl sm:text-3xl font-extrabold text-purple-600 dark:text-purple-400">94%</span>
                <span className="text-xs text-slate-500 dark:text-slate-400 block font-medium">Placement Success</span>
              </div>
            </StaggerItem>
            <StaggerItem>
              <div className="p-4 rounded-2xl bg-white/80 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 hover:border-amber-500/40 transition-colors shadow-xs">
                <span className="text-2xl sm:text-3xl font-extrabold text-amber-600 dark:text-amber-400">450+</span>
                <span className="text-xs text-slate-500 dark:text-slate-400 block font-medium">Hiring Partners</span>
              </div>
            </StaggerItem>
          </StaggerContainer>
        </div>
      </FadeInUp>

      {/* 2. PLACEMENT PROCESS TIMELINE */}
      <section className="relative w-full py-14 px-4 sm:px-6 lg:px-8 bg-[#cffafe] dark:bg-[#05232e] overflow-hidden">
        <div className="max-w-7xl mx-auto space-y-8">
          <FadeInUp duration={0.4}>
            <div className="text-center space-y-2 max-w-2xl mx-auto">
              <div className="text-xs font-black uppercase tracking-wider text-cyan-900 dark:text-cyan-400">Step-by-Step Roadmap</div>
              <h2 className="text-3xl sm:text-4xl font-black dark:text-white text-slate-950">5-Stage Placement Process Timeline</h2>
            </div>
          </FadeInUp>

          <StaggerContainer staggerDelay={0.08} className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <StaggerItem>
              <MotionCard className="p-5 rounded-2xl bg-white dark:bg-slate-900/95 border-2 border-cyan-200 dark:border-slate-800 space-y-2 h-full hover:-translate-y-1 hover:shadow-xl hover:border-cyan-400 transition-all duration-300 group shadow-md">
                <div className="w-8 h-8 rounded-lg bg-blue-100 dark:bg-blue-600/20 text-blue-700 dark:text-blue-400 flex items-center justify-center font-black text-xs border border-blue-300 dark:border-blue-500/30 group-hover:scale-115 transition-transform duration-200">01</div>
                <h4 className="font-black dark:text-white text-slate-950 text-sm">Skill Evaluation</h4>
                <p className="text-xs dark:text-slate-300 text-slate-700 font-medium">Technical diagnostic assessment to identify core strengths & gaps.</p>
              </MotionCard>
            </StaggerItem>

            <StaggerItem>
              <MotionCard className="p-5 rounded-2xl bg-white dark:bg-slate-900/95 border-2 border-cyan-200 dark:border-slate-800 space-y-2 h-full hover:-translate-y-1 hover:shadow-xl hover:border-purple-400 transition-all duration-300 group shadow-md">
                <div className="w-8 h-8 rounded-lg bg-purple-100 dark:bg-purple-600/20 text-purple-700 dark:text-purple-400 flex items-center justify-center font-black text-xs border border-purple-300 dark:border-purple-500/30 group-hover:scale-115 transition-transform duration-200">02</div>
                <h4 className="font-black dark:text-white text-slate-950 text-sm">Portfolio Build</h4>
                <p className="text-xs dark:text-slate-300 text-slate-700 font-medium">Publishing 3+ real-world capstone projects on GitHub & Vercel.</p>
              </MotionCard>
            </StaggerItem>

            <StaggerItem>
              <MotionCard className="p-5 rounded-2xl bg-white dark:bg-slate-900/95 border-2 border-cyan-200 dark:border-slate-800 space-y-2 h-full hover:-translate-y-1 hover:shadow-xl hover:border-emerald-400 transition-all duration-300 group shadow-md">
                <div className="w-8 h-8 rounded-lg bg-emerald-100 dark:bg-emerald-600/20 text-emerald-700 dark:text-emerald-400 flex items-center justify-center font-black text-xs border border-emerald-300 dark:border-emerald-500/30 group-hover:scale-115 transition-transform duration-200">03</div>
                <h4 className="font-black dark:text-white text-slate-950 text-sm">Mock Interviews</h4>
                <p className="text-xs dark:text-slate-300 text-slate-700 font-medium">Simulated technical rounds & behavioral HR coaching sessions.</p>
              </MotionCard>
            </StaggerItem>

            <StaggerItem>
              <MotionCard className="p-5 rounded-2xl bg-white dark:bg-slate-900/95 border-2 border-cyan-200 dark:border-slate-800 space-y-2 h-full hover:-translate-y-1 hover:shadow-xl hover:border-amber-400 transition-all duration-300 group shadow-md">
                <div className="w-8 h-8 rounded-lg bg-amber-100 dark:bg-amber-600/20 text-amber-700 dark:text-amber-400 flex items-center justify-center font-black text-xs border border-amber-300 dark:border-amber-500/30 group-hover:scale-115 transition-transform duration-200">04</div>
                <h4 className="font-black dark:text-white text-slate-950 text-sm">Hiring Drives</h4>
                <p className="text-xs dark:text-slate-300 text-slate-700 font-medium">Direct fast-track interview schedules with 450+ partner companies.</p>
              </MotionCard>
            </StaggerItem>

            <StaggerItem>
              <MotionCard className="p-5 rounded-2xl bg-white dark:bg-slate-900/95 border-2 border-cyan-200 dark:border-slate-800 space-y-2 h-full hover:-translate-y-1 hover:shadow-xl hover:border-cyan-400 transition-all duration-300 group shadow-md">
                <div className="w-8 h-8 rounded-lg bg-cyan-100 dark:bg-cyan-600/20 text-cyan-700 dark:text-cyan-400 flex items-center justify-center font-black text-xs border border-cyan-300 dark:border-cyan-500/30 group-hover:scale-115 transition-transform duration-200">05</div>
                <h4 className="font-black dark:text-white text-slate-950 text-sm">Offer Negotiation</h4>
                <p className="text-xs dark:text-slate-300 text-slate-700 font-medium">Evaluating salary compensation packages & onboarding support.</p>
              </MotionCard>
            </StaggerItem>
          </StaggerContainer>
        </div>
      </section>

      {/* 3. MOVING HIRING PARTNERS MARQUEE */}
      <FadeInUp duration={0.4}>
        <section>
          <HiringPartnersMarquee />
        </section>
      </FadeInUp>

      {/* 4. UPCOMING & ACTIVE CAMPUS HIRING DRIVES */}
      <FadeInUp duration={0.4}>
        <section>
          <UpcomingHiringDrives drives={hiringDrives} />
        </section>
      </FadeInUp>

      {/* 6. RECENT STUDENT SUCCESS STORIES */}
      <section className="relative w-full py-14 px-4 sm:px-6 lg:px-8 bg-[#fef3c7] dark:bg-[#1f1708] overflow-hidden">
        <div className="max-w-7xl mx-auto space-y-8">
          <FadeInUp duration={0.4}>
            <div>
              <div className="text-xs font-black uppercase text-amber-950 dark:text-blue-400">Verified Alumni Records</div>
              <h2 className="text-3xl font-black dark:text-white text-slate-950">Student Placement Success Stories</h2>
            </div>
          </FadeInUp>

          <StaggerContainer staggerDelay={0.08} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {placements.map((p) => (
              <StaggerItem key={p.id}>
                <MotionCard className="rounded-2xl p-6 border-2 border-amber-300 dark:border-slate-800 bg-white dark:bg-slate-900/95 space-y-4 hover:border-amber-500 hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between h-full group shadow-md">
                  <div className="space-y-3">
                    <div className="relative w-full h-48 rounded-xl overflow-hidden border-2 border-amber-400/80">
                      <Image src={p.studentPhoto} alt={p.studentName} fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
                    </div>
                    <div>
                      <h3 className="font-extrabold dark:text-white text-slate-950 text-base">{p.studentName}</h3>
                      <p className="text-xs text-blue-700 dark:text-blue-400 font-bold">{p.courseTaken}</p>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-amber-200 dark:border-slate-800 space-y-2 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-600 dark:text-slate-400 font-medium">Role:</span>
                      <span className="font-bold dark:text-white text-slate-950">{p.roleAssigned}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-600 dark:text-slate-400 font-medium">Company:</span>
                      <span className="font-bold text-purple-700 dark:text-purple-400">{p.companyName}</span>
                    </div>
                    <div className="p-2.5 rounded-lg bg-emerald-100 border border-emerald-300 text-emerald-800 dark:bg-emerald-500/20 dark:border-emerald-500/30 dark:text-emerald-300 text-center font-black text-sm group-hover:scale-102 transition-transform shadow-xs">
                      {p.packageLpa} Package
                    </div>
                  </div>
                </MotionCard>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* 7. BOTTOM CTA */}
      <ScalePop>
        <div className="glass-card rounded-3xl p-8 sm:p-12 border border-slate-800 text-center space-y-4 shadow-2xl">
          <h2 className="text-2xl sm:text-3xl font-bold dark:text-white text-slate-900">Ready to Transform Your Tech Career?</h2>
          <p className="dark:text-slate-400 text-slate-600 text-xs sm:text-sm max-w-xl mx-auto">
            Connect with our senior career advisors to get a free profile audit and personalized placement roadmap.
          </p>
          <div className="pt-2 flex justify-center">
            <HomeClientSection mode="demo-btn" buttonText="Book Free Career Counseling" />
          </div>
        </div>
      </ScalePop>
    </div>
  );
}

