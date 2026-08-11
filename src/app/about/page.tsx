import Image from 'next/image';
import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import {
  GraduationCap,
  Target,
  Eye,
  ShieldCheck,
  Award,
  Users,
  Building2,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  Laptop,
  BookOpen,
} from 'lucide-react';
import HomeClientSection from '@/components/HomeClientSection';
import FacultyMovingChain from '@/components/FacultyMovingChain';
import {
  FadeInUp,
  FadeInLeft,
  FadeInRight,
  ZoomIn,
  StaggerContainer,
  StaggerItem,
  MotionCard,
} from '@/components/AnimatedSection';

export const metadata = {
  title: 'About Us | NexGen Tech Academy',
  description: 'Learn about India premier IT training institute, our mission, expert faculty, hi-tech infrastructure, and 360 placement support ecosystem.',
};

export default async function AboutPage() {
  const trainers = await prisma.trainer.findMany();

  return (
    <div className="space-y-24 py-12">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass-card rounded-3xl p-8 sm:p-12 border border-blue-500/20 bg-gradient-to-br from-slate-900 via-blue-950/40 to-slate-900 shadow-2xl relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center relative z-10">
            <div className="lg:col-span-7 space-y-6">
              <FadeInLeft>
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-semibold uppercase tracking-wider">
                  <Sparkles className="w-4 h-4 text-amber-300" />
                  <span>Empowering Tech Careers Since 2014</span>
                </div>
                <h1 className="text-4xl sm:text-5xl font-black text-white tracking-tight leading-tight mt-3">
                  Shaping the Next Generation of <span className="gradient-text">Global Tech Leaders</span>
                </h1>
                <p className="text-slate-300 text-base sm:text-lg leading-relaxed mt-3">
                  NexGen Tech Academy is a premier IT training and research institute. Founded by software architects and AI researchers, our goal is to bridge the gap between academic education and modern industry demands through immersive project-based learning.
                </p>
                <div className="pt-4 flex flex-wrap items-center gap-4">
                  <HomeClientSection mode="demo-btn" buttonText="Book Campus Visit & Demo" />
                  <Link
                    href="/courses"
                    className="px-6 py-3.5 rounded-xl border border-slate-700 hover:border-blue-500/40 text-white font-semibold text-sm transition-all"
                  >
                    Explore Academic Programs
                  </Link>
                </div>
              </FadeInLeft>
            </div>

            {/* Reception Photo Column */}
            <div className="lg:col-span-5 relative">
              <FadeInRight>
                <MotionCard>
                  <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden border border-blue-500/30 shadow-2xl group">
                    <Image
                      src="/institute-reception.png"
                      alt="NexGen Tech Academy Reception Lobby"
                      fill
                      sizes="(max-width: 768px) 100vw, 500px"
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                    <div className="absolute bottom-3 left-3 right-3 bg-slate-900/90 backdrop-blur-md border border-white/10 rounded-xl p-3 text-xs text-slate-200 font-medium flex items-center justify-between shadow-lg">
                      <span className="font-bold text-white">NexGen Tech Academy Flagship Reception</span>
                      <span className="text-emerald-400 font-semibold flex items-center gap-1">
                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                        Open Today
                      </span>
                    </div>
                  </div>
                </MotionCard>
              </FadeInRight>
            </div>
          </div>
        </div>
      </section>

      {/* Mission, Vision & Values */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <StaggerItem>
            <MotionCard className="h-full">
              <div className="glass-card rounded-2xl p-8 border border-slate-800 space-y-4 h-full">
                <div className="w-12 h-12 rounded-xl bg-blue-600/20 text-blue-400 flex items-center justify-center">
                  <Target className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-white">Our Mission</h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  To empower students and working professionals with deep technical expertise, practical project exposure, and soft skills needed to excel in top tech organizations worldwide.
                </p>
              </div>
            </MotionCard>
          </StaggerItem>

          <StaggerItem>
            <MotionCard className="h-full">
              <div className="glass-card rounded-2xl p-8 border border-slate-800 space-y-4 h-full">
                <div className="w-12 h-12 rounded-xl bg-purple-600/20 text-purple-400 flex items-center justify-center">
                  <Eye className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-white">Our Vision</h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  To be recognized globally as the gold standard in hands-on IT education, pioneering new learning methodologies in AI, Cloud Computing, Cyber Defense, and Software Engineering.
                </p>
              </div>
            </MotionCard>
          </StaggerItem>

          <StaggerItem>
            <MotionCard className="h-full">
              <div className="glass-card rounded-2xl p-8 border border-slate-800 space-y-4 h-full">
                <div className="w-12 h-12 rounded-xl bg-emerald-600/20 text-emerald-400 flex items-center justify-center">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-white">Our Core Values</h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  Uncompromising quality, hands-on rigor, continuous innovation, mentor transparency, and unwavering commitment to student career outcomes.
                </p>
              </div>
            </MotionCard>
          </StaggerItem>
        </StaggerContainer>
      </section>

      {/* Trainer Profiles Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <FadeInUp>
          <div className="text-center space-y-2 max-w-2xl mx-auto">
            <div className="text-xs font-bold uppercase tracking-wider text-blue-400">World-Class Faculty</div>
            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
              Learn from <span className="gradient-text">Industry Leaders</span>
            </h2>
            <p className="text-slate-400 text-sm">
              Our mentors bring decades of real enterprise engineering experience from Fortune 500 tech companies.
            </p>
          </div>
        </FadeInUp>

        <ZoomIn>
          <FacultyMovingChain trainers={trainers} />
        </ZoomIn>
      </section>

      {/* High-Tech Campus Infrastructure Gallery */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="text-center space-y-2 max-w-2xl mx-auto">
          <div className="text-xs font-bold uppercase tracking-wider text-purple-400">Infrastructure</div>
          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            Hi-Tech Learning <span className="gradient-text">Environments</span>
          </h2>
          <p className="text-slate-400 text-sm">
            Equipped with state-of-the-art workstations, high-performance servers, and collaborative breakout spaces.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="relative h-64 rounded-2xl overflow-hidden border border-slate-700 group">
            <Image
              src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=800&q=80"
              alt="High-Tech AI GPU Workstation Lab"
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent" />
            <div className="absolute bottom-4 left-4 right-4">
              <h4 className="font-bold text-white text-base">AI & Supercomputing Lab</h4>
              <p className="text-xs text-slate-300">NVIDIA A100 Tensor GPU clusters for Deep Learning labs.</p>
            </div>
          </div>

          <div className="relative h-64 rounded-2xl overflow-hidden border border-slate-700 group">
            <Image
              src="https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=800&q=80"
              alt="Cyber Security Hardware & Server Room"
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent" />
            <div className="absolute bottom-4 left-4 right-4">
              <h4 className="font-bold text-white text-base">Cisco Hardware & Cyber Security Lab</h4>
              <p className="text-xs text-slate-300">Real enterprise router stacks, firewalls, and SOC monitoring screens.</p>
            </div>
          </div>

          <div className="relative h-64 rounded-2xl overflow-hidden border border-slate-700 group">
            <Image
              src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80"
              alt="UI/UX Mac Studio & Collaboration Room"
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent" />
            <div className="absolute bottom-4 left-4 right-4">
              <h4 className="font-bold text-white text-base">UI/UX Mac Studio & Design Hub</h4>
              <p className="text-xs text-slate-300">Apple Studio Displays with licensed Figma Enterprise & Adobe Suite.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Placement Assistance Ecosystem */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass-card rounded-3xl p-8 sm:p-12 border border-slate-800 space-y-8">
          <div className="text-center space-y-2 max-w-2xl mx-auto">
            <div className="text-xs font-bold uppercase tracking-wider text-emerald-400">Career Assistance</div>
            <h2 className="text-3xl font-black text-white">Our 4-Step Placement Accelerator</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="p-6 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
              <div className="text-xs font-extrabold text-blue-400 uppercase">Step 01</div>
              <h4 className="font-bold text-white text-base">Profile & Portfolio Building</h4>
              <p className="text-xs text-slate-400">Crafting ATS-friendly resumes, GitHub portfolios, and Behance design showcases.</p>
            </div>

            <div className="p-6 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
              <div className="text-xs font-extrabold text-purple-400 uppercase">Step 02</div>
              <h4 className="font-bold text-white text-base">Technical Mock Interviews</h4>
              <p className="text-xs text-slate-400">1-on-1 coding rounds and System Design mock sessions with senior engineers.</p>
            </div>

            <div className="p-6 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
              <div className="text-xs font-extrabold text-emerald-400 uppercase">Step 03</div>
              <h4 className="font-bold text-white text-base">Direct Recruitment Drives</h4>
              <p className="text-xs text-slate-400">Exclusive hiring drives with 450+ partner companies and fast-track interviews.</p>
            </div>

            <div className="p-6 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
              <div className="text-xs font-extrabold text-amber-400 uppercase">Step 04</div>
              <h4 className="font-bold text-white text-base">Offer Negotiation & Onboarding</h4>
              <p className="text-xs text-slate-400">Guidance on CTC negotiation, offer evaluation, and workplace transition.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
