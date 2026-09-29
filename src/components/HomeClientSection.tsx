'use client';

import { useState } from 'react';
import { Sparkles, Send, CheckCircle2, ShieldCheck, PhoneCall } from 'lucide-react';
import InquiryModal from './InquiryModal';
import { submitInquiryAction } from '@/app/actions';

interface HomeClientSectionProps {
  mode: 'demo-btn' | 'hero-form' | 'batch-btn' | 'event-btn';
  buttonText?: string;
  courseSlug?: string;
  courseName?: string;
}

export default function HomeClientSection({
  mode,
  buttonText = 'Book Free Demo Class',
  courseSlug = '',
  courseName = '',
}: HomeClientSectionProps) {
  const [modalOpen, setModalOpen] = useState(false);
  const [formLoading, setFormLoading] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formMsg, setFormMsg] = useState('');
  const [formError, setFormError] = useState('');

  if (mode === 'demo-btn') {
    return (
      <>
        <button
          onClick={() => setModalOpen(true)}
          className="btn-shimmer w-full sm:w-auto px-8 py-3.5 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-semibold text-sm flex items-center justify-center gap-2 shadow-xl shadow-blue-500/30 hover:shadow-blue-500/50 hover:-translate-y-0.5 transition-all cursor-pointer"
        >
          <Sparkles className="w-4 h-4 text-amber-300" />
          <span>{buttonText}</span>
        </button>
        <InquiryModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
      </>
    );
  }

  if (mode === 'batch-btn') {
    return (
      <>
        <button
          onClick={() => setModalOpen(true)}
          className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-semibold text-xs transition-all shadow-md shadow-purple-600/20"
        >
          Reserve Seat
        </button>
        <InquiryModal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          title="Reserve Your Seat for Next Batch"
          subtitle={`Batch for ${courseName || 'Selected Program'}`}
          courseSlug={courseSlug}
          courseName={courseName}
          source="Upcoming Batch Reservation"
        />
      </>
    );
  }

  if (mode === 'event-btn') {
    return (
      <>
        <button
          onClick={() => setModalOpen(true)}
          className="px-4 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-semibold text-xs transition-all shadow-md shadow-cyan-600/20"
        >
          Register Free RSVP
        </button>
        <InquiryModal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          title="Register for Free Masterclass"
          subtitle="Get calendar invite, access link, and code repository links."
          source="Free Masterclass RSVP"
        />
      </>
    );
  }

  // Hero Form Mode
  async function handleHeroForm(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setFormLoading(true);
    setFormError('');

    try {
      const formData = new FormData(e.currentTarget);
      formData.append('source', 'Hero Quick Booking Form');

      const res = await submitInquiryAction(formData);
      setFormLoading(false);

      if (res?.success) {
        setFormSubmitted(true);
        setFormMsg(res.message || 'Submitted successfully!');
      } else {
        setFormError(res?.error || 'Submission failed. Please check your entries.');
      }
    } catch (err: any) {
      console.error('Error submitting hero form:', err);
      setFormLoading(false);
      setFormError('Unable to connect to server right now. Please refresh the page or call +91 800-999-8800.');
    }
  }

  return (
    <>
      <div className="relative w-full max-w-md mx-auto">
        {/* Glow ambient background behind the card */}
        <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-3xl blur-xl opacity-30 group-hover:opacity-60 transition duration-1000 -z-10" />

        <div className="rounded-3xl p-6 sm:p-7 border border-white/20 dark:border-blue-500/30 dark:bg-slate-900/85 bg-white/90 backdrop-blur-xl shadow-2xl relative overflow-hidden">
          {/* Top Live Banner */}
          <div className="flex items-center justify-between gap-2 pb-4 mb-4 border-b border-slate-200/80 dark:border-slate-800">
            <div className="flex items-center gap-2">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
              </span>
              <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                Live Cohort Open
              </span>
            </div>
            <div className="px-2.5 py-1 rounded-full bg-blue-500/10 dark:bg-blue-400/10 border border-blue-500/20 text-[11px] font-semibold text-blue-600 dark:text-blue-400">
              Only 4 Seats Left
            </div>
          </div>

          <div className="mb-4">
            <h3 className="text-xl font-bold dark:text-white text-slate-900">
              Book 1-on-1 Free Session
            </h3>
            <p className="text-xs dark:text-slate-300 text-slate-600 mt-1">
              Live tech demo, career roadmapping & lab tour with lead mentors.
            </p>
          </div>

          {formSubmitted ? (
            <div className="py-8 text-center space-y-3">
              <div className="w-14 h-14 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/30">
                <CheckCircle2 className="w-8 h-8 text-emerald-400" />
              </div>
              <h4 className="text-lg font-bold dark:text-white text-slate-900">Free Demo Booked!</h4>
              <p className="text-xs dark:text-slate-300 text-slate-600 leading-relaxed max-w-xs mx-auto">
                {formMsg || 'Our senior academic advisor will reach out to you within 30 minutes.'}
              </p>
              <button
                onClick={() => setFormSubmitted(false)}
                className="text-xs font-semibold text-blue-500 hover:underline pt-2"
              >
                Submit another request
              </button>
            </div>
          ) : (
            <form onSubmit={handleHeroForm} className="space-y-3">
              {formError && (
                <div className="p-2.5 rounded-xl bg-red-500/10 border border-red-500/30 text-red-500 text-xs">
                  {formError}
                </div>
              )}
              <div>
                <input
                  type="text"
                  name="name"
                  required
                  placeholder="Full Name *"
                  className="w-full px-3.5 py-2.5 rounded-xl dark:bg-slate-950/80 bg-slate-50 border border-slate-300/80 dark:border-slate-700/80 dark:text-white text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-blue-500 text-xs sm:text-sm transition-all"
                />
              </div>
              <div>
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="Email Address *"
                  className="w-full px-3.5 py-2.5 rounded-xl dark:bg-slate-950/80 bg-slate-50 border border-slate-300/80 dark:border-slate-700/80 dark:text-white text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-blue-500 text-xs sm:text-sm transition-all"
                />
              </div>
              <div>
                <input
                  type="tel"
                  name="phone"
                  required
                  placeholder="Phone / WhatsApp Number *"
                  className="w-full px-3.5 py-2.5 rounded-xl dark:bg-slate-950/80 bg-slate-50 border border-slate-300/80 dark:border-slate-700/80 dark:text-white text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-blue-500 text-xs sm:text-sm transition-all"
                />
              </div>
              <div>
                <select
                  name="courseName"
                  className="w-full px-3.5 py-2.5 rounded-xl dark:bg-slate-950/80 bg-slate-50 border border-slate-300/80 dark:border-slate-700/80 dark:text-white text-slate-900 focus:outline-none focus:border-blue-500 text-xs sm:text-sm transition-all"
                >
                  <option value="Generative AI & LLM Engineering">Generative AI & LLM Engineering</option>
                  <option value="Full Stack Development with Next.js">Full Stack Development with Next.js</option>
                  <option value="UI/UX Design Masterclass">UI/UX Design Masterclass</option>
                  <option value="Cyber Security & Ethical Hacking">Cyber Security & Ethical Hacking</option>
                  <option value="AWS DevOps Cloud Architect">AWS DevOps Cloud Architect</option>
                  <option value="Data Analytics & Power BI">Data Analytics & Power BI</option>
                </select>
              </div>

              <button
                type="submit"
                disabled={formLoading}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 hover:-translate-y-0.5 transition-all"
              >
                <Sparkles className="w-4 h-4 text-amber-300" />
                {formLoading ? <span>Reserving Seat...</span> : <span>Reserve Free Demo Seat 🚀</span>}
              </button>

              <div className="pt-2 flex items-center justify-between text-[11px] dark:text-slate-400 text-slate-500 border-t border-slate-200/80 dark:border-slate-800">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-blue-500" />
                  100% Free · No obligation
                </span>
                <span className="text-emerald-500 font-semibold">⚡ Instant Confirmation</span>
              </div>
            </form>
          )}
        </div>
      </div>

      <InquiryModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
}
