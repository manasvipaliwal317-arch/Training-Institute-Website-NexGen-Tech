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
          className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-semibold text-sm flex items-center justify-center gap-2 shadow-xl shadow-blue-500/30 hover:shadow-blue-500/50 hover:-translate-y-0.5 transition-all"
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

    const formData = new FormData(e.currentTarget);
    formData.append('source', 'Hero Quick Booking Form');

    const res = await submitInquiryAction(formData);
    setFormLoading(false);

    if (res.success) {
      setFormSubmitted(true);
      setFormMsg(res.message || 'Submitted!');
    } else {
      setFormError(res.error || 'Submission failed.');
    }
  }

  return (
    <>
      <div className="glass-card rounded-3xl p-6 sm:p-8 border border-blue-500/30 shadow-2xl relative">
        <div className="flex items-center justify-between mb-4">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-blue-400">Quick Counseling</div>
            <h3 className="text-xl font-bold text-white">Book 1-on-1 Free Session</h3>
          </div>
          <div className="w-10 h-10 rounded-full bg-blue-600/20 text-blue-400 flex items-center justify-center font-bold text-xs border border-blue-500/30">
            Free
          </div>
        </div>

        {formSubmitted ? (
          <div className="py-6 text-center space-y-3">
            <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
            <h4 className="text-lg font-bold text-white">Success!</h4>
            <p className="text-xs text-slate-300 leading-relaxed">{formMsg}</p>
            <button
              onClick={() => setFormSubmitted(false)}
              className="text-xs text-blue-400 underline pt-2"
            >
              Submit another inquiry
            </button>
          </div>
        ) : (
          <form onSubmit={handleHeroForm} className="space-y-3.5">
            {formError && (
              <div className="p-2.5 rounded-lg bg-red-950/40 border border-red-500/30 text-red-400 text-xs">
                {formError}
              </div>
            )}
            <div>
              <input
                type="text"
                name="name"
                required
                placeholder="Your Full Name *"
                className="w-full px-4 py-2.5 rounded-xl bg-slate-900/90 border border-slate-700/80 text-white placeholder:text-slate-500 focus:outline-none focus:border-blue-500 text-xs sm:text-sm"
              />
            </div>
            <div>
              <input
                type="email"
                name="email"
                required
                placeholder="Your Email Address *"
                className="w-full px-4 py-2.5 rounded-xl bg-slate-900/90 border border-slate-700/80 text-white placeholder:text-slate-500 focus:outline-none focus:border-blue-500 text-xs sm:text-sm"
              />
            </div>
            <div>
              <input
                type="tel"
                name="phone"
                required
                placeholder="Your Phone Number *"
                className="w-full px-4 py-2.5 rounded-xl bg-slate-900/90 border border-slate-700/80 text-white placeholder:text-slate-500 focus:outline-none focus:border-blue-500 text-xs sm:text-sm"
              />
            </div>
            <div>
              <select
                name="courseName"
                className="w-full px-4 py-2.5 rounded-xl bg-slate-900/90 border border-slate-700/80 text-white focus:outline-none focus:border-blue-500 text-xs sm:text-sm"
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
              className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-blue-500/25 transition-all"
            >
              {formLoading ? <span>Submitting...</span> : <span>Claim Free Demo Seat</span>}
            </button>

            <p className="text-[11px] text-slate-400 text-center pt-1">
              🔒 No spam. Our counselor will contact you within 30 minutes.
            </p>
          </form>
        )}
      </div>

      <InquiryModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
}
