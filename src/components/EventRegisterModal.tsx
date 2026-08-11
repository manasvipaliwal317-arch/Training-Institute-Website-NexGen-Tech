'use client';

import { useState } from 'react';
import { X, CheckCircle2, Send, Sparkles, Calendar, Clock, MapPin } from 'lucide-react';
import { registerEventAction } from '@/app/actions';

interface EventRegisterModalProps {
  isOpen: boolean;
  onClose: () => void;
  eventId: string;
  eventTitle: string;
  eventDate?: string;
  eventTime?: string;
  venue?: string;
}

export default function EventRegisterModal({
  isOpen,
  onClose,
  eventId,
  eventTitle,
  eventDate = '',
  eventTime = '',
  venue = '',
}: EventRegisterModalProps) {
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
    formData.append('eventId', eventId);
    formData.append('eventTitle', eventTitle);

    const res = await registerEventAction(formData);
    setLoading(false);

    if (res.success) {
      setSubmitted(true);
      setFeedbackMsg(res.message || 'Registration successful!');
    } else {
      setErrorMsg(res.error || 'Failed to register. Please try again.');
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg glass-card rounded-2xl p-6 sm:p-8 border border-cyan-500/30 shadow-2xl overflow-hidden">
        {/* Background glow */}
        <div className="absolute -top-20 -right-20 w-40 h-40 bg-cyan-600/30 rounded-full blur-3xl pointer-events-none" />

        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full text-slate-400 hover:text-white hover:bg-slate-800/60 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="text-center py-8 space-y-4">
            <CheckCircle2 className="w-14 h-14 text-emerald-400 mx-auto" />
            <h3 className="text-2xl font-bold text-white">Seat Confirmed!</h3>
            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed max-w-md mx-auto">{feedbackMsg}</p>
            <button
              onClick={() => {
                setSubmitted(false);
                onClose();
              }}
              className="px-6 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-semibold text-xs"
            >
              Close Window
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase text-cyan-400">
              <Sparkles className="w-4 h-4" /> Free Event Registration
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-white leading-snug">{eventTitle}</h2>

            {(eventDate || venue) && (
              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-300 space-y-1">
                {eventDate && <div className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5 text-blue-400" /> {eventDate} ({eventTime})</div>}
                {venue && <div className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5 text-purple-400" /> {venue}</div>}
              </div>
            )}

            {errorMsg && (
              <div className="p-3 rounded-lg bg-red-950/40 border border-red-500/30 text-red-400 text-xs">
                {errorMsg}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-3.5">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Full Name *</label>
                <input
                  type="text"
                  name="name"
                  required
                  placeholder="e.g. Srikant Reddy"
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white placeholder:text-slate-500 text-xs focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Email Address *</label>
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="srikant@example.com"
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white placeholder:text-slate-500 text-xs focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Mobile Phone *</label>
                <input
                  type="tel"
                  name="phone"
                  required
                  placeholder="+91 98765 43210"
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white placeholder:text-slate-500 text-xs focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-bold text-xs shadow-lg shadow-cyan-600/30 flex items-center justify-center gap-2 transition-all disabled:opacity-50"
                >
                  {loading ? <span>Reserving Seat...</span> : <><span>Confirm Free RSVP</span> <Send className="w-4 h-4" /></>}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
