'use client';

import { useState } from 'react';
import { X, CheckCircle2, Sparkles, Send, PhoneCall, ShieldCheck } from 'lucide-react';
import { submitInquiryAction } from '@/app/actions';

interface InquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  subtitle?: string;
  courseSlug?: string;
  courseName?: string;
  source?: string;
}

export default function InquiryModal({
  isOpen,
  onClose,
  title = 'Book Your Free Demo & Career Counselling',
  subtitle = 'Get 1-on-1 session with our industry mentor, live course walkthrough & placement roadmap.',
  courseSlug = '',
  courseName = '',
  source = 'Free Demo Booking',
}: InquiryModalProps) {
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [feedbackMsg, setFeedbackMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');

    const formData = new FormData(e.currentTarget);
    formData.append('courseSlug', courseSlug);
    if (courseName) formData.append('courseName', courseName);
    formData.append('source', source);

    const res = await submitInquiryAction(formData);
    setLoading(false);

    if (res.success) {
      setSubmitted(true);
      setFeedbackMsg(res.message || 'Submitted successfully!');
    } else {
      setErrorMsg(res.error || 'Failed to submit. Please check your inputs.');
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl glass-card rounded-2xl p-6 sm:p-8 border border-blue-500/30 shadow-2xl overflow-hidden">
        {/* Decorative background glow */}
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-blue-600/30 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-purple-600/30 rounded-full blur-3xl pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full text-slate-400 hover:text-white hover:bg-slate-800/60 transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="text-center py-8 space-y-4">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h3 className="text-2xl font-bold text-white">Application Received!</h3>
            <p className="text-slate-300 text-sm max-w-md mx-auto leading-relaxed">{feedbackMsg}</p>
            <div className="pt-4">
              <button
                onClick={() => {
                  setSubmitted(false);
                  onClose();
                }}
                className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-medium transition-all shadow-lg shadow-blue-500/20"
              >
                Close Window
              </button>
            </div>
          </div>
        ) : (
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-blue-400 mb-2">
              <Sparkles className="w-4 h-4 text-blue-400" />
              <span>Instant Seat Reservation</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white leading-tight">{title}</h2>
            <p className="text-slate-400 text-xs sm:text-sm mt-1.5 leading-relaxed">{subtitle}</p>

            {courseName && (
              <div className="mt-4 p-3 rounded-lg bg-blue-950/40 border border-blue-500/20 text-blue-300 text-xs flex items-center gap-2">
                <span className="font-semibold text-slate-300">Selected Course:</span>
                <span className="font-bold text-white">{courseName}</span>
              </div>
            )}

            {errorMsg && (
              <div className="mt-3 p-3 rounded-lg bg-red-950/40 border border-red-500/30 text-red-400 text-xs">
                {errorMsg}
              </div>
            )}

            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">Full Name *</label>
                <input
                  type="text"
                  name="name"
                  required
                  placeholder="e.g. Rahul Sharma"
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-900/80 border border-slate-700/80 text-white placeholder:text-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-sm"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">Email Address *</label>
                  <input
                    type="email"
                    name="email"
                    required
                    placeholder="rahul@example.com"
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-900/80 border border-slate-700/80 text-white placeholder:text-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">Mobile Phone *</label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    placeholder="+91 98765 43210"
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-900/80 border border-slate-700/80 text-white placeholder:text-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">Learning Mode</label>
                  <select
                    name="preferredMode"
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-900/80 border border-slate-700/80 text-white focus:outline-none focus:border-blue-500 text-sm"
                  >
                    <option value="Hybrid (Classroom + Online)">Hybrid (Classroom + Online)</option>
                    <option value="Live Interactive Online">Live Interactive Online</option>
                    <option value="Offline In-Campus Lab">Offline In-Campus Lab</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">Preferred Campus</label>
                  <select
                    name="preferredCampus"
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-900/80 border border-slate-700/80 text-white focus:outline-none focus:border-blue-500 text-sm"
                  >
                    <option value="Tech Park Main Campus">Tech Park Main Campus</option>
                    <option value="Cyber Hub Branch Campus">Cyber Hub Branch Campus</option>
                    <option value="Virtual Online Campus">Virtual Online Campus</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">Any specific question or goals?</label>
                <textarea
                  name="message"
                  rows={2}
                  placeholder="Tell us about your background or career goals..."
                  className="w-full px-4 py-2 rounded-xl bg-slate-900/80 border border-slate-700/80 text-white placeholder:text-slate-500 focus:outline-none focus:border-blue-500 text-sm"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 px-6 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-semibold text-sm flex items-center justify-center gap-2 shadow-xl shadow-blue-600/30 transition-all disabled:opacity-50"
                >
                  {loading ? (
                    <span>Submitting Request...</span>
                  ) : (
                    <>
                      <span>Reserve My Free Demo Class</span>
                      <Send className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>

              <div className="flex items-center justify-between text-slate-400 text-xs pt-1">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  100% Free & No Commitment
                </span>
                <span className="flex items-center gap-1">
                  <PhoneCall className="w-3.5 h-3.5 text-blue-400" />
                  Call: +91 800-999-8800
                </span>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
