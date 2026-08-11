'use client';

import { useState } from 'react';
import Image from 'next/image';
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
          {/* Course Overview & Description */}
          <div className="glass-card rounded-2xl p-8 border border-slate-800 space-y-4">
            <h2 className="text-2xl font-extrabold text-white">Course Overview</h2>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">{course.description}</p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-slate-800 text-xs">
              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                <span className="text-slate-400 block font-medium">Duration</span>
                <span className="font-bold text-white text-sm">{course.duration} ({course.hoursCount} Hrs)</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                <span className="text-slate-400 block font-medium">Format</span>
                <span className="font-bold text-white text-sm">{course.mode}</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                <span className="text-slate-400 block font-medium">Skill Level</span>
                <span className="font-bold text-white text-sm">{course.level}</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                <span className="text-slate-400 block font-medium">Pre-requisites</span>
                <span className="font-bold text-emerald-400 text-sm">Basic Math / CS</span>
              </div>
            </div>
          </div>

          {/* Detailed Syllabus Accordion */}
          <div className="glass-card rounded-2xl p-8 border border-slate-800 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div className="text-xs font-bold uppercase text-blue-400">Curriculum</div>
                <h2 className="text-2xl font-extrabold text-white">Syllabus & Modules Breakdown</h2>
              </div>
              <button
                onClick={() => {
                  setModalSource('Download Syllabus PDF');
                  setModalOpen(true);
                }}
                className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs flex items-center gap-2 border border-slate-700 transition-colors shrink-0"
              >
                <Download className="w-4 h-4 text-blue-400" />
                <span>Download Detailed Syllabus PDF</span>
              </button>
            </div>

            <div className="space-y-3">
              {course.syllabus.map((mod, idx) => (
                <div
                  key={idx}
                  className="rounded-xl bg-slate-900/90 border border-slate-800 overflow-hidden transition-colors"
                >
                  <button
                    onClick={() => setOpenModuleIndex(openModuleIndex === idx ? null : idx)}
                    className="w-full px-6 py-4 flex items-center justify-between text-left text-sm font-bold text-white hover:bg-slate-800/60"
                  >
                    <div className="flex items-center gap-3">
                      <span className="px-2.5 py-1 rounded bg-blue-600/20 text-blue-400 text-xs font-semibold">
                        {mod.module}
                      </span>
                      <span>{mod.title}</span>
                    </div>
                    <ChevronDown
                      className={`w-4 h-4 text-slate-400 transition-transform ${
                        openModuleIndex === idx ? 'rotate-180 text-blue-400' : ''
                      }`}
                    />
                  </button>

                  {openModuleIndex === idx && (
                    <div className="px-6 pb-4 pt-1 border-t border-slate-800/80 space-y-2">
                      {mod.details.map((detail, dIdx) => (
                        <div key={dIdx} className="flex items-center gap-2.5 text-xs text-slate-300">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                          <span>{detail}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Tools & Technologies Covered */}
          <div className="glass-card rounded-2xl p-8 border border-slate-800 space-y-4">
            <div className="flex items-center gap-2 text-xs font-bold uppercase text-purple-400">
              <Wrench className="w-4 h-4" />
              <span>Tech Stack</span>
            </div>
            <h2 className="text-2xl font-extrabold text-white">Tools & Frameworks Covered</h2>

            <div className="flex flex-wrap gap-2.5 pt-2">
              {course.tools.map((t, idx) => (
                <span
                  key={idx}
                  className="px-4 py-2 rounded-xl bg-slate-900 border border-slate-700/80 text-white font-semibold text-xs flex items-center gap-1.5 shadow-sm"
                >
                  <Sparkles className="w-3 h-3 text-purple-400" />
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* Hands-on Capstone Projects */}
          <div className="glass-card rounded-2xl p-8 border border-slate-800 space-y-6">
            <div>
              <div className="text-xs font-bold uppercase text-emerald-400">Portfolio Building</div>
              <h2 className="text-2xl font-extrabold text-white">Real-World Capstone Projects</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {course.projects.map((proj, idx) => (
                <div key={idx} className="p-5 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
                  <div className="text-xs font-semibold text-emerald-400">Project 0{idx + 1}</div>
                  <h4 className="font-bold text-white text-base">{proj.name}</h4>
                  <p className="text-xs text-slate-400 leading-relaxed">{proj.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Career Opportunities & Salary Expectations */}
          <div className="glass-card rounded-2xl p-8 border border-slate-800 space-y-6">
            <div>
              <div className="text-xs font-bold uppercase text-amber-400">Career Growth</div>
              <h2 className="text-2xl font-extrabold text-white">Target Job Roles & Salary Packages</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {course.careerRoles.map((role, idx) => (
                <div key={idx} className="p-5 rounded-xl bg-slate-900 border border-slate-800 text-center space-y-1">
                  <Briefcase className="w-6 h-6 text-amber-400 mx-auto mb-2" />
                  <h4 className="font-bold text-white text-sm">{role.title}</h4>
                  <p className="text-xs text-slate-400">Avg. Salary</p>
                  <p className="text-sm font-extrabold text-emerald-400">{role.salary}</p>
                </div>
              ))}
            </div>
          </div>

          {/* FAQs Accordion */}
          <div className="glass-card rounded-2xl p-8 border border-slate-800 space-y-6">
            <div>
              <div className="text-xs font-bold uppercase text-blue-400">Common Questions</div>
              <h2 className="text-2xl font-extrabold text-white">Frequently Asked Questions</h2>
            </div>

            <div className="space-y-3">
              {course.faqs.map((faq, idx) => (
                <div key={idx} className="rounded-xl bg-slate-900 border border-slate-800 overflow-hidden">
                  <button
                    onClick={() => setOpenFaqIndex(openFaqIndex === idx ? null : idx)}
                    className="w-full px-6 py-4 flex items-center justify-between text-left text-sm font-bold text-white hover:bg-slate-800/60"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown
                      className={`w-4 h-4 text-slate-400 transition-transform ${
                        openFaqIndex === idx ? 'rotate-180 text-blue-400' : ''
                      }`}
                    />
                  </button>
                  {openFaqIndex === idx && (
                    <div className="px-6 pb-4 pt-1 text-xs text-slate-300 leading-relaxed border-t border-slate-800/80">
                      {faq.a}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Sticky Enrollment Card */}
        <div className="lg:col-span-4">
          <div className="sticky top-28 glass-card rounded-2xl p-6 sm:p-8 border border-blue-500/30 space-y-6 shadow-2xl">
            {/* Price Box */}
            <div className="space-y-1">
              <div className="text-xs text-slate-400 uppercase font-semibold">Total Tuition Fee</div>
              <div className="flex items-baseline gap-3">
                <span className="text-3xl font-black text-white">₹{course.fees.toLocaleString()}</span>
                <span className="text-sm text-slate-500 line-through">₹{course.originalFees.toLocaleString()}</span>
                <span className="text-xs font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400">
                  Save {Math.round(((course.originalFees - course.fees) / course.originalFees) * 100)}%
                </span>
              </div>
              <p className="text-[11px] text-slate-400">EMI options available starting at ₹3,999/month</p>
            </div>

            {/* Main Action CTAs */}
            <div className="space-y-3">
              <button
                onClick={() => {
                  setModalSource('Course Enrollment Request');
                  setModalOpen(true);
                }}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-bold text-sm shadow-xl shadow-blue-500/30 flex items-center justify-center gap-2 transition-all"
              >
                <Sparkles className="w-4 h-4 text-amber-300" />
                <span>Enroll in Course</span>
              </button>

              <button
                onClick={() => {
                  setModalSource('Book Free Demo Class');
                  setModalOpen(true);
                }}
                className="w-full py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 font-semibold text-xs border border-slate-700 transition-colors"
              >
                Book Free Demo Session
              </button>
            </div>

            {/* Key Features List */}
            <div className="space-y-3 pt-4 border-t border-slate-800 text-xs text-slate-300">
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>ISO Certified Course Completion Certificate</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Guaranteed Placement Referral Drive</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>1-on-1 Mentor Code Review</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Lifetime Access to LMS & Recordings</span>
              </div>
            </div>

            {/* Helpline Box */}
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-center space-y-1">
              <p className="text-xs text-slate-400">Need help deciding?</p>
              <p className="text-xs font-bold text-white">Call Counselor: +91 800-999-8800</p>
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
