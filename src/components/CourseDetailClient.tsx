'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  ChevronDown,
  CheckCircle2,
  Download,
  Sparkles,
  Award,
  Briefcase,
  Layers,
  Wrench,
  HelpCircle,
  Clock,
  Laptop,
  Users,
  ShieldCheck,
  Star,
  FileText,
  MessageCircle,
} from 'lucide-react';
import InquiryModal from './InquiryModal';

interface SyllabusModule {
  module: string;
  title: string;
  details: string[];
}

interface Project {
  name: string;
  description: string;
}

interface Role {
  title: string;
  salary: string;
}

interface FAQ {
  q: string;
  a: string;
}

interface CourseDetailClientProps {
  course: {
    id: string;
    slug: string;
    title: string;
    tagline: string;
    description: string;
    level: string;
    mode: string;
    duration: string;
    hoursCount: number;
    fees: number;
    originalFees: number;
    heroImage: string;
    bestseller: boolean;
    rating: number;
    ratingsCount: number;
    enrolledStudents: number;
    categoryName: string;
    syllabus: SyllabusModule[];
    tools: string[];
    projects: Project[];
    careerRoles: Role[];
    faqs: FAQ[];
  };
}

export default function CourseDetailClient({ course }: CourseDetailClientProps) {
  const [openModuleIndex, setOpenModuleIndex] = useState<number | null>(0);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalSource, setModalSource] = useState('Course Detail Demo Booking');

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Left Main Content */}
        <div className="lg:col-span-8 space-y-12">
          {/* Course Overview & In-Depth Academic Scope */}
          <div className="glass-card rounded-3xl p-6 sm:p-8 border border-slate-200/80 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 space-y-5 shadow-sm">
            <div className="space-y-1.5 text-center max-w-xl mx-auto">
              <div className="flex items-center justify-center gap-2 text-xs font-bold uppercase text-blue-600 dark:text-blue-400">
                <Layers className="w-4 h-4" />
                <span>Program Curriculum & Overview</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">Course Overview</h2>
            </div>
            
            <div className="text-slate-700 dark:text-slate-300 text-sm sm:text-base leading-relaxed space-y-3.5 text-center max-w-3xl mx-auto">
              <p>{course.description}</p>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                Throughout this comprehensive certification, learners transition from core architectural fundamentals to building enterprise-scale distributed systems. You will build production applications, participate in live code-pairing sessions with staff architects from top tech firms, and graduate with an industry-grade portfolio verified on GitHub.
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-slate-200/80 dark:border-slate-800 text-xs text-center">
              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
                <span className="text-slate-500 dark:text-slate-400 block font-semibold mb-1">Duration</span>
                <span className="font-extrabold text-slate-900 dark:text-white text-sm">{course.duration} ({course.hoursCount} Hrs)</span>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
                <span className="text-slate-500 dark:text-slate-400 block font-semibold mb-1">Format</span>
                <span className="font-extrabold text-slate-900 dark:text-white text-sm">{course.mode}</span>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
                <span className="text-slate-500 dark:text-slate-400 block font-semibold mb-1">Skill Level</span>
                <span className="font-extrabold text-slate-900 dark:text-white text-sm">{course.level}</span>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
                <span className="text-slate-500 dark:text-slate-400 block font-semibold mb-1">Pre-requisites</span>
                <span className="font-extrabold text-emerald-600 dark:text-emerald-400 text-sm">Basic Math / CS</span>
              </div>
            </div>
          </div>

          {/* Detailed Syllabus Accordion */}
          <div className="glass-card rounded-3xl p-6 sm:p-8 border border-slate-200/80 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 space-y-6 shadow-sm">
            <div className="space-y-2 text-center max-w-2xl mx-auto">
              <div className="text-[11px] font-black uppercase tracking-wider text-blue-600 dark:text-cyan-400">
                CURRICULUM · {course.syllabus.length} MODULES · INDUSTRY-ALIGNED
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 dark:text-white tracking-tight leading-snug">
                What you&apos;ll learn — <span className="text-blue-600 dark:text-blue-400">and build</span> — module by module.
              </h2>
            </div>

            {/* Tech Tags Row - Centered */}
            {course.tools && course.tools.length > 0 && (
              <div className="flex flex-wrap items-center justify-center gap-2 pt-1 pb-1">
                {course.tools.map((tag, tIdx) => (
                  <span
                    key={tIdx}
                    className="px-3.5 py-1.5 rounded-full bg-slate-100 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 text-xs font-semibold border border-slate-200/80 dark:border-slate-700 shadow-2xs"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}

            {/* Accordion Section List */}
            <div className="space-y-3">
              {course.syllabus.map((mod, idx) => {
                const isOpen = openModuleIndex === idx;
                const unitsCount = mod.details?.length || 4;
                return (
                  <div
                    key={idx}
                    className={`rounded-2xl transition-all duration-200 border ${
                      isOpen
                        ? 'border-blue-400/60 dark:border-blue-500/50 shadow-md bg-white dark:bg-slate-900'
                        : 'border-slate-200/90 dark:border-slate-800 bg-white/90 dark:bg-slate-900/80 hover:border-slate-300 dark:hover:border-slate-700'
                    } overflow-hidden`}
                  >
                    <button
                      type="button"
                      onClick={() => setOpenModuleIndex(isOpen ? null : idx)}
                      className="w-full px-5 sm:px-6 py-4.5 flex items-center justify-between text-left transition-colors hover:bg-slate-50 dark:hover:bg-slate-800/40 cursor-pointer"
                    >
                      <div className="flex items-center gap-3 min-w-0 pr-2">
                        <span className="px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/70 text-blue-700 dark:text-cyan-300 text-xs font-black border border-blue-200 dark:border-blue-800/60 shrink-0">
                          Module {idx + 1}
                        </span>
                        <span className="font-extrabold text-slate-900 dark:text-white text-sm sm:text-base truncate">
                          {mod.title}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                          {unitsCount} units
                        </span>
                        <ChevronDown
                          className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${
                            isOpen ? 'rotate-180 text-blue-600 dark:text-cyan-400' : ''
                          }`}
                        />
                      </div>
                    </button>

                    {isOpen && (
                      <div className="px-6 pb-5 pt-2 border-t border-slate-100 dark:border-slate-800/80 space-y-2.5 bg-slate-50/50 dark:bg-slate-950/40 animate-in fade-in duration-150">
                        {mod.details.map((detail, dIdx) => (
                          <div key={dIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                            <CheckCircle2 className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
                            <span className="leading-snug">{detail}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Bottom Curriculum Action Buttons (Download Syllabus & WhatsApp) */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-6 border-t border-slate-200/80 dark:border-slate-800">
              <a
                href={`/api/courses/${course.slug}/syllabus`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-7 py-3 rounded-full bg-slate-950 dark:bg-slate-850 hover:bg-slate-800 dark:hover:bg-slate-750 text-white font-bold text-xs flex items-center justify-center gap-2 border border-slate-800 shadow-md active:scale-95 transition-all cursor-pointer"
                title="Download syllabus brochure PDF"
              >
                <FileText className="w-4 h-4 text-white" />
                <span>Download syllabus</span>
              </a>

              <a
                href={`https://wa.me/918009998800?text=${encodeURIComponent(
                  `Hello NexGen Tech Academy! I would like to get the full curriculum and syllabus for ${course.title}. Please share the brochure and upcoming batch details.`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-7 py-3 rounded-full bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-900 dark:text-white border border-slate-300 dark:border-slate-700 font-bold text-xs flex items-center justify-center gap-2 shadow-sm active:scale-95 transition-all cursor-pointer"
                title="Request syllabus directly on WhatsApp"
              >
                <MessageCircle className="w-4 h-4 text-emerald-500 fill-emerald-500/20" />
                <span>Get full syllabus on WhatsApp</span>
              </a>
            </div>
          </div>

          {/* Unified Tech Stack & Career Outcomes Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Tools & Frameworks Covered */}
            <div className="glass-card rounded-3xl p-6 sm:p-7 border border-slate-200/80 dark:border-slate-800 bg-white/90 dark:bg-slate-900/85 space-y-4 shadow-sm flex flex-col justify-between">
              <div className="space-y-1.5 text-center">
                <div className="flex items-center justify-center gap-2 text-xs font-bold uppercase text-purple-600 dark:text-purple-400">
                  <Wrench className="w-4 h-4" />
                  <span>Tech Stack & Tooling</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
                  Tools & Frameworks Covered
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 max-w-md mx-auto">
                  Industry-standard tools, frameworks, and APIs mastered through daily guided lab exercises.
                </p>
              </div>

              <div className="flex flex-wrap justify-center gap-2 pt-2">
                {course.tools.map((t, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 font-semibold text-xs flex items-center gap-1.5 shadow-2xs hover:border-purple-400 transition-colors"
                  >
                    <Sparkles className="w-3 h-3 text-purple-500" />
                    {t}
                  </span>
                ))}
              </div>

              <div className="pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-center gap-2 text-xs text-slate-600 dark:text-slate-400 font-medium">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>100% Practical Labs • Cloud Sandbox Environments</span>
              </div>
            </div>

            {/* Target Job Roles & Salary Packages */}
            <div className="glass-card rounded-3xl p-6 sm:p-7 border border-slate-200/80 dark:border-slate-800 bg-white/90 dark:bg-slate-900/85 space-y-4 shadow-sm flex flex-col justify-between">
              <div className="space-y-1.5 text-center">
                <div className="flex items-center justify-center gap-2 text-xs font-bold uppercase text-amber-600 dark:text-amber-400">
                  <Briefcase className="w-4 h-4" />
                  <span>Career Growth & Compensation</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
                  Target Roles & Salary Packages
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 max-w-md mx-auto">
                  High-growth technical profiles you become directly qualified for upon graduation.
                </p>
              </div>

              <div className="space-y-2.5 pt-1">
                {course.careerRoles.map((role, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-2xl bg-slate-50/80 dark:bg-slate-950/80 border border-slate-200/90 dark:border-slate-800 flex items-center justify-between gap-3 shadow-2xs hover:border-amber-400/50 transition-colors"
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div className="w-8 h-8 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0">
                        <Briefcase className="w-4 h-4" />
                      </div>
                      <span className="font-extrabold text-slate-900 dark:text-white text-xs sm:text-sm truncate">
                        {role.title}
                      </span>
                    </div>
                    <div className="text-right shrink-0">
                      <span className="block text-[10px] text-slate-500 dark:text-slate-400 font-medium">
                        Avg. CTC Package
                      </span>
                      <span className="text-xs sm:text-sm font-black text-emerald-600 dark:text-emerald-400">
                        {role.salary}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-center gap-2 text-xs text-slate-600 dark:text-slate-400 font-medium">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>Dedicated Placement Drives with 250+ Partner MNCs</span>
              </div>
            </div>
          </div>

          {/* Hands-on Capstone Projects */}
          <div className="glass-card rounded-3xl p-6 sm:p-8 border border-slate-200/80 dark:border-slate-800 bg-white/90 dark:bg-slate-900/85 space-y-6 shadow-sm">
            <div className="space-y-1 text-center max-w-xl mx-auto">
              <div className="text-xs font-bold uppercase text-emerald-600 dark:text-emerald-400">
                Portfolio Building & Live Deployments
              </div>
              <h3 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">
                Real-World Capstone Projects
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
                Build and deploy enterprise-grade applications to establish a rock-solid, verified GitHub portfolio.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {course.projects.map((proj, idx) => (
                <div
                  key={idx}
                  className="p-5 rounded-2xl bg-slate-50/70 dark:bg-slate-950/70 border border-slate-200 dark:border-slate-800 space-y-3 shadow-sm hover:border-emerald-500/40 transition-all flex flex-col justify-between"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="px-2.5 py-0.5 rounded-md bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 text-[11px] font-black uppercase tracking-wider">
                        Capstone 0{idx + 1}
                      </span>
                      <span className="text-[10px] font-semibold text-slate-500 dark:text-slate-400">
                        Live Cloud Deploy
                      </span>
                    </div>
                    <h4 className="font-extrabold text-slate-900 dark:text-white text-base leading-snug">
                      {proj.name}
                    </h4>
                    <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                      {proj.description}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-slate-200/60 dark:border-slate-800 flex items-center justify-between text-[11px] text-slate-600 dark:text-slate-400">
                    <span className="font-semibold text-emerald-600 dark:text-emerald-400">
                      ✓ GitHub Repository Ready
                    </span>
                    <span className="font-medium text-slate-500">1-on-1 Code Review</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* FAQs Accordion */}
          <div className="glass-card rounded-3xl p-6 sm:p-8 border border-slate-200/80 dark:border-slate-800 bg-white/90 dark:bg-slate-900/85 space-y-6 shadow-sm">
            <div className="space-y-1 text-center max-w-xl mx-auto">
              <div className="text-xs font-bold uppercase text-blue-600 dark:text-blue-400">
                Academic Doubts & Admissions Guide
              </div>
              <h3 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">
                Frequently Asked Questions
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
                Everything you need to know about eligibility, course recordings, placement drives, and certifications.
              </p>
            </div>

            <div className="space-y-3">
              {course.faqs.map((faq, idx) => (
                <div
                  key={idx}
                  className="rounded-2xl bg-slate-50/70 dark:bg-slate-950/70 border border-slate-200 dark:border-slate-800 overflow-hidden shadow-2xs transition-colors"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaqIndex(openFaqIndex === idx ? null : idx)}
                    className="w-full px-5 py-4 flex items-center justify-between text-left text-xs sm:text-sm font-bold text-slate-900 dark:text-white hover:bg-slate-100/60 dark:hover:bg-slate-800/40 transition-colors cursor-pointer"
                  >
                    <span className="text-slate-900 dark:text-white pr-3">{faq.q}</span>
                    <ChevronDown
                      className={`w-4 h-4 text-slate-500 dark:text-slate-400 shrink-0 transition-transform ${
                        openFaqIndex === idx ? 'rotate-180 text-blue-600 dark:text-blue-400' : ''
                      }`}
                    />
                  </button>
                  {openFaqIndex === idx && (
                    <div className="px-5 pb-4 pt-1 text-xs text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-200/70 dark:border-slate-800/80 bg-white/50 dark:bg-slate-900/40">
                      {faq.a}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Sticky Enrollment Card - Matching Image 3 */}
        <div className="lg:col-span-4">
          <div className="sticky top-28 glass-card rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-blue-500/30 bg-white dark:bg-slate-900/90 space-y-6 shadow-2xl">
            {/* Price Box */}
            <div className="space-y-1.5 pb-2">
              <div className="text-xs text-slate-500 dark:text-slate-400 uppercase font-bold tracking-wider">Total Tuition Fee</div>
              <div className="flex items-baseline gap-3">
                <span className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white">₹{course.fees.toLocaleString('en-IN')}</span>
                <span className="text-base text-slate-400 line-through">₹{course.originalFees.toLocaleString('en-IN')}</span>
                <span className="text-xs font-bold px-2 py-0.5 rounded-md bg-emerald-100 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-400">
                  Save {Math.round(((course.originalFees - course.fees) / course.originalFees) * 100)}%
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">EMI options available starting at ₹3,999/month</p>
            </div>

            {/* Main Action CTAs with Click-Me Effects */}
            <div className="space-y-3">
              <Link
                href={`/enroll?course=${course.slug}`}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-bold text-sm shadow-xl shadow-blue-500/25 flex items-center justify-center gap-2 active:scale-95 hover:scale-[1.02] transition-all cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-amber-300" />
                <span>Enroll in Course</span>
              </Link>

              <button
                type="button"
                onClick={() => {
                  setModalSource('Book Free Demo Class');
                  setModalOpen(true);
                }}
                className="w-full py-3 rounded-xl bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 font-bold text-xs border border-slate-300 dark:border-slate-700 active:scale-95 transition-all shadow-xs cursor-pointer"
              >
                Book Free Demo Session
              </button>
            </div>

            {/* Key Features List */}
            <div className="space-y-3 pt-4 border-t border-slate-200 dark:border-slate-800 text-xs text-slate-700 dark:text-slate-300">
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                <span>ISO Certified Course Completion Certificate</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                <span>Guaranteed Placement Referral Drive</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                <span>1-on-1 Mentor Code Review</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                <span>Lifetime Access to LMS & Recordings</span>
              </div>
            </div>

            {/* Helpline Box */}
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-center space-y-1">
              <p className="text-xs text-slate-500 dark:text-slate-400">Need help deciding?</p>
              <a
                href="tel:+918009998800"
                className="text-xs font-bold text-blue-600 dark:text-cyan-400 hover:underline block active:scale-95 transition-transform"
              >
                Call Counselor: +91 800-999-8800
              </a>
            </div>
          </div>
        </div>
      </div>

      <InquiryModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={`Inquiry for ${course.title}`}
        courseSlug={course.slug}
        courseName={course.title}
        source={modalSource}
      />
    </>
  );
}
