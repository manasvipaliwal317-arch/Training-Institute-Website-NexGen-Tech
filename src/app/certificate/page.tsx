import { Metadata } from 'next';
import Link from 'next/link';
import InteractiveCertificate from '@/components/InteractiveCertificate';
import Breadcrumbs from '@/components/Breadcrumbs';
import { Award, ShieldCheck, QrCode, Search, Landmark, Globe } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Official Certificate Verification | Skill India & NSDC Accredited | NexGen Tech Institute',
  description: 'Verify authentic NexGen Tech Institute completion certificates accredited by Skill India and NSDC. Access instant QR verification and employer validation.',
};

export default function CertificatePage() {
  return (
    <div className="space-y-16 pb-20 overflow-hidden dark:bg-[#0b0f19] bg-[#fff8f3] transition-colors duration-300">
      
      {/* 1. Page Header & Hero matching website theme */}
      <section className="relative py-16 dark:bg-gradient-to-b dark:from-slate-900 dark:via-slate-950 dark:to-[#0b0f19] bg-gradient-to-b from-orange-50/80 via-[#fff8f3] to-white border-b dark:border-slate-800 border-orange-100/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <Breadcrumbs />

          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full dark:bg-amber-500/10 bg-orange-500/10 border dark:border-amber-500/20 border-orange-200 text-amber-600 dark:text-amber-400 text-xs font-bold uppercase tracking-wider">
              <Award className="w-4 h-4 text-amber-500" />
              <span>Official Accreditation Portal</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-black dark:text-white text-slate-900 tracking-tight leading-tight">
              Government & Industry <span className="gradient-text">Accredited Certificates</span>
            </h1>
            <p className="dark:text-slate-300 text-slate-700 text-base sm:text-lg leading-relaxed">
              Every NexGen Tech Academy graduate receives an official completion credential co-branded by <strong className="dark:text-white text-slate-900">Skill India</strong> and <strong className="dark:text-white text-slate-900">NSDC</strong>. Certificates are embedded with tamper-proof cryptographic QR codes for instant 24/7 online verification.
            </p>
          </div>
        </div>
      </section>

      {/* 2. Interactive Certificate Showcase */}
      <InteractiveCertificate />

      {/* 3. Certificate Verification Portal & Search Bar */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass-card rounded-3xl p-8 sm:p-12 border dark:border-blue-500/20 border-orange-200/80 dark:bg-gradient-to-r dark:from-slate-900 dark:via-blue-950/40 dark:to-slate-900 bg-gradient-to-r from-white via-orange-50/50 to-white shadow-2xl space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase dark:text-cyan-400 text-blue-600 tracking-wider">
              <Search className="w-4 h-4" />
              <span>Instant Credential Verification</span>
            </div>
            <h2 className="text-3xl font-black dark:text-white text-slate-900">Verify a Student Certificate</h2>
            <p className="dark:text-slate-300 text-slate-600 text-sm">
              Employers, HR recruiters, and partners can enter any unique Certificate ID (e.g. <code className="dark:text-amber-300 text-orange-600 font-mono font-bold">NGTA/2024/CT/00002</code>) to validate issuance status.
            </p>
          </div>

          {/* Lookup Input Form */}
          <div className="max-w-xl mx-auto flex flex-col sm:flex-row items-center gap-3">
            <div className="relative w-full">
              <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Enter Certificate ID (e.g. NGTA/2024/CT/00002)..."
                className="w-full pl-12 pr-4 py-3.5 rounded-xl dark:bg-slate-950 bg-white border dark:border-slate-700 border-slate-300 dark:text-white text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 shadow-sm"
              />
            </div>
            <button className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm shrink-0 shadow-lg shadow-blue-500/25 transition-all flex items-center justify-center gap-2">
              <ShieldCheck className="w-4 h-4" />
              <span>Verify ID</span>
            </button>
          </div>
        </div>
      </section>

      {/* 4. Accreditation Pillars */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <h2 className="text-3xl font-black dark:text-white text-slate-900">Why Our Accreditation Matters</h2>
          <p className="dark:text-slate-400 text-slate-600 text-sm">Recognized by national skills councils and top tech enterprises.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="glass-card rounded-2xl p-8 dark:border-slate-800 border-orange-100 space-y-4">
            <div className="p-3 rounded-xl bg-orange-500/10 text-orange-600 dark:text-orange-400 w-fit">
              <Landmark className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold dark:text-white text-slate-900">Skill India Compliant</h3>
            <p className="dark:text-slate-400 text-slate-600 text-sm leading-relaxed">
              Curriculum aligned with the National Skills Qualification Framework (NSQF) for industry job roles.
            </p>
          </div>

          <div className="glass-card rounded-2xl p-8 dark:border-slate-800 border-orange-100 space-y-4">
            <div className="p-3 rounded-xl bg-blue-500/10 text-blue-500 dark:text-blue-400 w-fit">
              <QrCode className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold dark:text-white text-slate-900">24/7 QR Verification</h3>
            <p className="dark:text-slate-400 text-slate-600 text-sm leading-relaxed">
              Scannable QR badge embedded on physical and digital certificates linking directly to our secure database.
            </p>
          </div>

          <div className="glass-card rounded-2xl p-8 dark:border-slate-800 border-orange-100 space-y-4">
            <div className="p-3 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 w-fit">
              <Globe className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold dark:text-white text-slate-900">300+ Enterprise Hiring Recognition</h3>
            <p className="dark:text-slate-400 text-slate-600 text-sm leading-relaxed">
              Trusted by top MNC hiring partners including Microsoft, Amazon AWS, Deloitte, and Swiggy.
            </p>
          </div>
        </div>
      </section>

    </div>
  );
}
