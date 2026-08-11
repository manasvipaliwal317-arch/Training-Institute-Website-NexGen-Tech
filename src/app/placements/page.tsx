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
import HomeClientSection from '@/components/HomeClientSection';

export const metadata = {
  title: 'Placement Process & Alumni Salary Reports | NexGen Tech Academy',
  description: 'Explore placement statistics, hiring company partners, salary packages, mock interview preparation, and career success stories.',
};

export const revalidate = 60;

export default async function PlacementsPage() {
  const placements = await prisma.placement.findMany({
    orderBy: { createdAt: 'desc' },
  });

  return (
    <div className="space-y-16 py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Hero Header */}
      <div className="glass-card rounded-3xl p-8 sm:p-14 border border-emerald-500/20 bg-gradient-to-br from-slate-900 via-emerald-950/30 to-slate-900 text-center space-y-6">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold uppercase tracking-wider mx-auto">
          <TrendingUp className="w-4 h-4" />
          <span>360° Placement Acceleration Ecosystem</span>
        </div>

        <h1 className="text-4xl sm:text-5xl font-black text-white tracking-tight">
          Where Our Graduates <span className="gradient-text-cyan">Get Hired</span>
        </h1>

        <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
          Our dedicated placement cell has empowered over 25,000 students to secure software engineering, AI, cyber security, and design roles at top global MNCs and unicorns.
        </p>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-slate-800">
          <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800">
            <span className="text-2xl sm:text-3xl font-extrabold text-emerald-400">32 LPA</span>
            <span className="text-xs text-slate-400 block font-medium">Highest Package</span>
          </div>
          <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800">
            <span className="text-2xl sm:text-3xl font-extrabold text-blue-400">8.5 LPA</span>
            <span className="text-xs text-slate-400 block font-medium">Average Package</span>
          </div>
          <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800">
            <span className="text-2xl sm:text-3xl font-extrabold text-purple-400">94%</span>
            <span className="text-xs text-slate-400 block font-medium">Placement Success</span>
          </div>
          <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800">
            <span className="text-2xl sm:text-3xl font-extrabold text-amber-400">450+</span>
            <span className="text-xs text-slate-400 block font-medium">Hiring Partners</span>
          </div>
        </div>
      </div>

      {/* Corporate Interview & Preparation Showcase */}
      <section className="glass-card rounded-3xl p-8 sm:p-12 border border-slate-800 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        <div className="lg:col-span-6 space-y-4">
          <div className="text-xs font-bold uppercase text-blue-400">Personalized Mentorship</div>
          <h2 className="text-3xl font-black text-white">Resume Reviews & 1-on-1 Mock Interviews</h2>
          <p className="text-slate-300 text-sm leading-relaxed">
            Before appearing for company placement drives, every student undergoes intensive technical mock interviews, ATS resume audits, and live coding challenges under practicing industry engineers.
          </p>

          <div className="space-y-2 text-xs text-slate-300 pt-2">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>ATS Resume Building & GitHub Portfolio Optimization</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>DSA & System Design Mock Interviews</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Behance / Figma Design System Case Studies</span>
            </div>
          </div>
        </div>

        <div className="lg:col-span-6 h-72 rounded-2xl overflow-hidden relative border border-slate-700 shadow-2xl">
          <Image
            src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=1000&q=80"
            alt="Corporate Interview Support Session"
            fill
            className="object-cover"
          />
        </div>
      </section>

      {/* Placement Process Timeline */}
      <section className="space-y-8">
        <div className="text-center space-y-2 max-w-2xl mx-auto">
          <div className="text-xs font-bold uppercase tracking-wider text-emerald-400">Step-by-Step Roadmap</div>
          <h2 className="text-3xl sm:text-4xl font-black text-white">5-Stage Placement Process Timeline</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <div className="p-5 rounded-2xl glass-card border border-slate-800 space-y-2">
            <div className="w-8 h-8 rounded-lg bg-blue-600/20 text-blue-400 flex items-center justify-center font-bold text-xs">01</div>
            <h4 className="font-bold text-white text-sm">Skill Evaluation</h4>
            <p className="text-xs text-slate-400">Technical diagnostic assessment to identify core strengths & gaps.</p>
          </div>

          <div className="p-5 rounded-2xl glass-card border border-slate-800 space-y-2">
            <div className="w-8 h-8 rounded-lg bg-purple-600/20 text-purple-400 flex items-center justify-center font-bold text-xs">02</div>
            <h4 className="font-bold text-white text-sm">Portfolio Build</h4>
            <p className="text-xs text-slate-400">Publishing 3+ real-world capstone projects on GitHub & Vercel.</p>
          </div>

          <div className="p-5 rounded-2xl glass-card border border-slate-800 space-y-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-600/20 text-emerald-400 flex items-center justify-center font-bold text-xs">03</div>
            <h4 className="font-bold text-white text-sm">Mock Interviews</h4>
            <p className="text-xs text-slate-400">Simulated technical rounds & behavioral HR coaching sessions.</p>
          </div>

          <div className="p-5 rounded-2xl glass-card border border-slate-800 space-y-2">
            <div className="w-8 h-8 rounded-lg bg-amber-600/20 text-amber-400 flex items-center justify-center font-bold text-xs">04</div>
            <h4 className="font-bold text-white text-sm">Hiring Drives</h4>
            <p className="text-xs text-slate-400">Direct fast-track interview schedules with 450+ partner companies.</p>
          </div>

          <div className="p-5 rounded-2xl glass-card border border-slate-800 space-y-2">
            <div className="w-8 h-8 rounded-lg bg-cyan-600/20 text-cyan-400 flex items-center justify-center font-bold text-xs">05</div>
            <h4 className="font-bold text-white text-sm">Offer Negotiation</h4>
            <p className="text-xs text-slate-400">Evaluating salary compensation packages & onboarding support.</p>
          </div>
        </div>
      </section>

      {/* Hiring Partners Logos */}
      <section className="space-y-6">
        <h2 className="text-2xl font-extrabold text-white text-center">Top Hiring Company Partners</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-4">
          {['Microsoft', 'Amazon AWS', 'Oracle Tech', 'Atlassian', 'Deloitte', 'Flipkart', 'Swiggy', 'Zomato', 'Capgemini', 'IBM Tech', 'Infosys', 'TCS Digital'].map((company, idx) => (
            <div key={idx} className="p-4 rounded-xl glass-card border border-slate-800 flex items-center justify-center text-center font-bold text-sm text-slate-300 hover:border-blue-500/40 hover:text-white transition-colors">
              {company}
            </div>
          ))}
        </div>
      </section>

      {/* Recent Student Success Stories */}
      <section className="space-y-8">
        <div>
          <div className="text-xs font-bold uppercase text-blue-400">Verified Alumni Records</div>
          <h2 className="text-3xl font-black text-white">Student Placement Success Stories</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {placements.map((p) => (
            <div key={p.id} className="glass-card rounded-2xl p-6 border border-slate-800 space-y-4 hover:border-emerald-500/40 transition-all flex flex-col justify-between">
              <div className="space-y-3">
                <div className="relative w-full h-48 rounded-xl overflow-hidden border border-slate-700">
                  <Image src={p.studentPhoto} alt={p.studentName} fill className="object-cover" />
                </div>
                <div>
                  <h3 className="font-bold text-white text-base">{p.studentName}</h3>
                  <p className="text-xs text-blue-400 font-semibold">{p.courseTaken}</p>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-800 space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Role:</span>
                  <span className="font-bold text-white">{p.roleAssigned}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Company:</span>
                  <span className="font-bold text-purple-400">{p.companyName}</span>
                </div>
                <div className="p-2.5 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-center font-extrabold text-sm">
                  {p.packageLpa} Package
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <div className="glass-card rounded-3xl p-8 sm:p-12 border border-slate-800 text-center space-y-4">
        <h2 className="text-2xl sm:text-3xl font-bold text-white">Ready to Transform Your Tech Career?</h2>
        <p className="text-slate-400 text-xs sm:text-sm max-w-xl mx-auto">
          Connect with our senior career advisors to get a free profile audit and personalized placement roadmap.
        </p>
        <div className="pt-2 flex justify-center">
          <HomeClientSection mode="demo-btn" buttonText="Book Free Career Counseling" />
        </div>
      </div>
    </div>
  );
}
