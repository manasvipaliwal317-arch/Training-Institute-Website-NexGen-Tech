'use client';

import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X, CheckCircle2, Sparkles, Send, PhoneCall, ShieldCheck, UserCheck } from 'lucide-react';
import { submitInquiryAction } from '@/app/actions';

interface InquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  subtitle?: string;
  courseSlug?: string;
  courseName?: string;
  source?: string;
  submitButtonText?: string;
  tagText?: string;
  isPlacementDrive?: boolean;
}

export default function InquiryModal({
  isOpen,
  onClose,
  title = 'Book Your Free Demo & Career Counselling',
  subtitle = 'Get 1-on-1 session with our industry mentor, live course walkthrough & placement roadmap.',
  courseSlug = '',
  courseName = '',
  source = 'Free Demo Booking',
  submitButtonText = 'Reserve My Free Demo Class',
  tagText = 'Free Demo Class & Career Consultation',
  isPlacementDrive = false,
}: InquiryModalProps) {
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [feedbackMsg, setFeedbackMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen || !mounted) return null;

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');

    const formData = new FormData(e.currentTarget);
    formData.append('courseSlug', courseSlug);

    const registeredCourse = formData.get('registeredCourse')?.toString().trim();
    if (registeredCourse) {
      formData.set('courseName', registeredCourse);
    } else if (courseName) {
      formData.set('courseName', courseName);
    }

    const studentId = formData.get('studentId')?.toString().trim();
    const rawMessage = formData.get('message')?.toString() || '';
    if (studentId) {
      formData.set('message', `[Verified Student ID: ${studentId}] ${rawMessage}`.trim());
    }

    formData.append('source', source);

    try {
      const res = await submitInquiryAction(formData);
      setLoading(false);

      if (res.success) {
        setSubmitted(true);
        setFeedbackMsg(
          isPlacementDrive
            ? 'Application received! Your student enrollment has been verified. The placement officer will review your resume and issue your drive admit card.'
            : (res.message || 'Submitted successfully!')
        );
      } else {
        setErrorMsg(res.error || 'Failed to submit. Please check your inputs.');
      }
    } catch (err: any) {
      console.error('Inquiry submission error:', err);
      setLoading(false);
      setErrorMsg('Network or connection issue. Please refresh the page and try again.');
    }
  }

  const modalContent = (
    <div
      className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-in fade-in duration-200"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        className="relative w-full max-w-lg glass-card rounded-3xl p-6 sm:p-8 border border-blue-500/40 shadow-2xl overflow-hidden bg-slate-950 text-white max-h-[92vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Shimmer background orb */}
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-blue-600/20 rounded-full blur-3xl pointer-events-none" />

        <button
          type="button"
          onClick={onClose}
          aria-label="Close modal"
          className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 active:scale-90 transition-all cursor-pointer z-10"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="text-center py-8 space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-500/10 text-emerald-400 flex items-center justify-center mx-auto shadow-inner">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h3 className="text-2xl font-black text-white">
              {isPlacementDrive ? 'Drive Registration Confirmed!' : 'Request Confirmed!'}
            </h3>
            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed max-w-md mx-auto">
              {feedbackMsg}
            </p>
            <div className="pt-2">
              <button
                type="button"
                onClick={() => {
                  setSubmitted(false);
                  onClose();
                }}
                className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 active:scale-95 text-white font-bold text-xs cursor-pointer shadow-lg shadow-blue-500/25 transition-transform"
              >
                Close Window
              </button>
            </div>
          </div>
        ) : (
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-blue-400 mb-1.5">
              <Sparkles className="w-4 h-4 text-blue-400" />
              <span>{tagText}</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white leading-tight">{title}</h2>
            <p className="text-slate-400 text-xs sm:text-sm mt-1 leading-relaxed">{subtitle}</p>

            {isPlacementDrive && (
              <div className="mt-3 p-3 rounded-xl bg-purple-950/40 border border-purple-500/30 text-purple-200 text-xs flex items-center gap-2">
                <UserCheck className="w-4 h-4 text-purple-400 shrink-0" />
                <span>
                  Exclusive for verified students enrolled in NexGen Tech Academy programs.
                </span>
              </div>
            )}

            {courseName && !isPlacementDrive && (
              <div className="mt-3 p-3 rounded-xl bg-blue-950/40 border border-blue-500/20 text-blue-300 text-xs flex items-center gap-2">
                <span className="font-semibold text-slate-300">Selected Course:</span>
                <span className="font-bold text-white">{courseName}</span>
              </div>
            )}

            {errorMsg && (
              <div className="mt-3 p-3 rounded-xl bg-red-950/40 border border-red-500/30 text-red-400 text-xs font-semibold">
                {errorMsg}
              </div>
            )}

            <form onSubmit={handleSubmit} className="mt-5 space-y-3.5">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Full Name *</label>
                <input
                  type="text"
                  name="name"
                  required
                  placeholder="e.g. Rahul Sharma"
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-900/90 border border-slate-700 text-white placeholder:text-slate-500 focus:outline-none focus:border-blue-500 text-xs sm:text-sm"
                />
              </div>

              {/* Student ID field for Placement Drive Registration */}
              {isPlacementDrive && (
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">
                    Student ID *
                  </label>
                  <input
                    type="text"
                    name="studentId"
                    required
                    placeholder="e.g. NGT-2026-8842"
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-900/90 border border-slate-700 text-white placeholder:text-slate-500 focus:outline-none focus:border-blue-500 text-xs sm:text-sm"
                  />
                  <p className="text-[10px] text-slate-400 mt-1">
                    Please provide your 8-digit Student Registration ID issued by NexGen Tech Academy.
                  </p>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Email Address *</label>
                  <input
                    type="email"
                    name="email"
                    required
                    placeholder="rahul@example.com"
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-900/90 border border-slate-700 text-white placeholder:text-slate-500 focus:outline-none focus:border-blue-500 text-xs sm:text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Mobile Phone *</label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    placeholder="+91 98765 43210"
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-900/90 border border-slate-700 text-white placeholder:text-slate-500 focus:outline-none focus:border-blue-500 text-xs sm:text-sm"
                  />
                </div>
              </div>

              {/* For placement drives: Show Registered Course box instead of Learning Mode */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {isPlacementDrive ? (
                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">
                      Registered Course *
                    </label>
                    <select
                      name="registeredCourse"
                      required
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900/90 border border-slate-700 text-white focus:outline-none focus:border-blue-500 text-xs sm:text-sm"
                    >
                      <option value="">Select Enrolled Course...</option>
                      <option value="Executive Program in Generative AI & LLM Engineering">
                        Executive Program in GenAI & LLMs
                      </option>
                      <option value="Full Stack Development with Next.js 15 & Node.js">
                        Full Stack Next.js 15 & Node.js
                      </option>
                      <option value="Machine Learning & Deep Learning Engineer Certification">
                        Machine Learning & Deep Learning
                      </option>
                      <option value="Data Analytics & Business Intelligence with Power BI & Python">
                        Data Analytics & Power BI
                      </option>
                      <option value="Mobile App Development with React Native & Expo">
                        Mobile App Dev (React Native)
                      </option>
                      <option value="UI/UX Design & Product Experience Masterclass">
                        UI/UX Design Masterclass
                      </option>
                      <option value="Cyber Security & Ethical Hacking Professional">
                        Cyber Security & Ethical Hacking
                      </option>
                      <option value="AWS Cloud Architect & DevOps Engineering">
                        AWS Cloud Architect & DevOps
                      </option>
                      <option value="Enterprise Networking & CCNA Security Certification">
                        Enterprise Networking (CCNA)
                      </option>
                      <option value="Software Testing & Automation Specialist (Selenium + Playwright)">
                        Software Testing & Automation
                      </option>
                      <option value="Digital Marketing & Growth Hacking Mastery">
                        Digital Marketing & Growth
                      </option>
                    </select>
                  </div>
                ) : (
                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">Learning Mode</label>
                    <select
                      name="preferredMode"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900/90 border border-slate-700 text-white focus:outline-none focus:border-blue-500 text-xs sm:text-sm"
                    >
                      <option value="Hybrid (Classroom + Online)">Hybrid (Classroom + Online)</option>
                      <option value="Live Interactive Online">Live Interactive Online</option>
                      <option value="Offline In-Campus Lab">Offline In-Campus Lab</option>
                    </select>
                  </div>
                )}

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Preferred Campus</label>
                  <select
                    name="preferredCampus"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900/90 border border-slate-700 text-white focus:outline-none focus:border-blue-500 text-xs sm:text-sm"
                  >
                    <option value="Tech Park Main Campus">Tech Park Main Campus (Hyderabad)</option>
                    <option value="Innovation Hub Branch Campus">Innovation Hub (Bengaluru)</option>
                    <option value="Cyber Security Center Campus">Cyber Security Center (Pune)</option>
                    <option value="Virtual Online Campus">Virtual Online Campus</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">
                  {isPlacementDrive ? 'Primary Technical Skills & GitHub Profile Link' : 'Any specific question or goals?'}
                </label>
                <textarea
                  name="message"
                  rows={2}
                  placeholder={
                    isPlacementDrive
                      ? 'Mention your key tech skills (e.g. Next.js, Python, AWS) and link to your GitHub/Portfolio...'
                      : 'Tell us about your background or career goals...'
                  }
                  className="w-full px-4 py-2 rounded-xl bg-slate-900/90 border border-slate-700 text-white placeholder:text-slate-500 focus:outline-none focus:border-blue-500 text-xs sm:text-sm"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 active:scale-95 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-xl shadow-blue-600/30 transition-all disabled:opacity-50 cursor-pointer"
                >
                  {loading ? (
                    <span>Verifying & Submitting...</span>
                  ) : (
                    <>
                      <span>{submitButtonText}</span>
                      <Send className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>

              <div className="flex items-center justify-center gap-4 text-[10px] text-slate-400 pt-1">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> 100% Confidential
                </span>
                <span className="flex items-center gap-1">
                  <PhoneCall className="w-3.5 h-3.5 text-blue-400" /> Counselor Callback within 30 mins
                </span>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
}
