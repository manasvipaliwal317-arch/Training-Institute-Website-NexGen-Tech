'use client';

import { useState } from 'react';
import { Send, CheckCircle2, ShieldCheck, Sparkles } from 'lucide-react';
import { submitInquiryAction } from '@/app/actions';

export default function ContactClientSection() {
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [message, setMessage] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');

    const formData = new FormData(e.currentTarget);
    formData.append('source', 'Contact Us Page Form');

    const res = await submitInquiryAction(formData);
    setLoading(false);

    if (res.success) {
      setSubmitted(true);
      setMessage(res.message || 'Thank you! We will get back to you shortly.');
    } else {
      setErrorMsg(res.error || 'Failed to send message.');
    }
  }

  return (
    <div className="glass-card rounded-3xl p-8 sm:p-10 border border-blue-500/30 shadow-2xl space-y-6">
      <div>
        <div className="text-xs font-bold uppercase tracking-wider text-blue-400">Direct Academic Inquiry</div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white">Send Us a Message</h2>
        <p className="text-slate-400 text-xs sm:text-sm mt-1">
          Fill out the form below to receive a detailed course syllabus, fee structure, and demo invitation.
        </p>
      </div>

      {submitted ? (
        <div className="py-12 text-center space-y-4">
          <CheckCircle2 className="w-14 h-14 text-emerald-400 mx-auto" />
          <h3 className="text-2xl font-bold text-white">Inquiry Sent Successfully!</h3>
          <p className="text-slate-300 text-sm max-w-md mx-auto leading-relaxed">{message}</p>
          <button
            onClick={() => setSubmitted(false)}
            className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs"
          >
            Send Another Inquiry
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          {errorMsg && (
            <div className="p-3 rounded-lg bg-red-950/40 border border-red-500/30 text-red-400 text-xs">
              {errorMsg}
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">Full Name *</label>
            <input
              type="text"
              name="name"
              required
              placeholder="e.g. Vikramaditya Reddy"
              className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-white placeholder:text-slate-500 text-sm focus:outline-none focus:border-blue-500"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">Email Address *</label>
              <input
                type="email"
                name="email"
                required
                placeholder="vikram@example.com"
                className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-white placeholder:text-slate-500 text-sm focus:outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">Phone Number *</label>
              <input
                type="tel"
                name="phone"
                required
                placeholder="+91 98765 43210"
                className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-white placeholder:text-slate-500 text-sm focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">Program of Interest</label>
              <select
                name="courseName"
                className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm focus:outline-none focus:border-blue-500"
              >
                <option value="Generative AI & LLM Engineering">Generative AI & LLM Engineering</option>
                <option value="Full Stack Development with Next.js">Full Stack Development with Next.js</option>
                <option value="UI/UX Design Masterclass">UI/UX Design Masterclass</option>
                <option value="Cyber Security & Ethical Hacking">Cyber Security & Ethical Hacking</option>
                <option value="AWS DevOps Cloud Architect">AWS DevOps Cloud Architect</option>
                <option value="Data Analytics & Power BI">Data Analytics & Power BI</option>
                <option value="Software Testing & Automation">Software Testing & Automation</option>
                <option value="Digital Marketing & Growth">Digital Marketing & Growth</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">Preferred Mode</label>
              <select
                name="preferredMode"
                className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm focus:outline-none focus:border-blue-500"
              >
                <option value="Hybrid (Classroom + Online)">Hybrid (Classroom + Online)</option>
                <option value="Live Online Interactive">Live Online Interactive</option>
                <option value="Offline Classroom Lab">Offline Classroom Lab</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">Message / Inquiry Details</label>
            <textarea
              name="message"
              rows={4}
              placeholder="Tell us about your background, career goal, or specific batch timing preference..."
              className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-white placeholder:text-slate-500 text-sm focus:outline-none focus:border-blue-500"
            />
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-bold text-sm shadow-xl shadow-blue-500/30 flex items-center justify-center gap-2 transition-all disabled:opacity-50"
            >
              {loading ? (
                <span>Sending Message...</span>
              ) : (
                <>
                  <span>Submit Inquiry Request</span>
                  <Send className="w-4 h-4" />
                </>
              )}
            </button>
          </div>

          <div className="flex items-center justify-between text-xs text-slate-400 pt-1">
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> Privacy Guaranteed
            </span>
            <span>Response Time: &lt; 30 Minutes</span>
          </div>
        </form>
      )}
    </div>
  );
}
