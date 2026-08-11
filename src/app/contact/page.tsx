import ContactClientSection from '@/components/ContactClientSection';
import { MapPin, Phone, Mail, Clock, Sparkles, MessageCircle, Globe } from 'lucide-react';

export const metadata = {
  title: 'Contact Academic Counselors & WhatsApp Chat | NexGen Tech Academy',
  description: 'Connect with NexGen Tech Academy counselors via phone, email, contact form, or direct WhatsApp chat.',
};

export default function ContactPage() {
  return (
    <div className="space-y-16 py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="glass-card rounded-3xl p-8 sm:p-14 border border-blue-500/20 bg-gradient-to-br from-slate-900 via-blue-950/40 to-slate-900 text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-semibold uppercase tracking-wider mx-auto">
          <Sparkles className="w-4 h-4 text-amber-300" />
          <span>Get Instant Admissions Guidance</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-black text-white tracking-tight">
          We Are Here to <span className="gradient-text">Guide Your Tech Journey</span>
        </h1>
        <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
          Have questions about course fees, batch timings, or syllabus details? Our academic counselors are available 7 days a week.
        </p>

        {/* WhatsApp Direct CTA */}
        <div className="pt-2 flex justify-center">
          <a
            href="https://wa.me/918009998800?text=Hi%20NexGen%20Tech%20Academy,%20I%20want%20to%20know%20more%20about%20upcoming%20batches"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm shadow-xl shadow-emerald-600/30 flex items-center gap-2 transition-all hover:scale-105"
          >
            <MessageCircle className="w-5 h-5 fill-white text-emerald-600" />
            <span>Chat Directly on WhatsApp (+91 800-999-8800)</span>
          </a>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Contact Info Cards */}
        <div className="lg:col-span-5 space-y-6">
          <div className="glass-card rounded-2xl p-6 border border-slate-800 space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-xl bg-blue-600/20 text-blue-400">
                <MapPin className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-white text-base">Main Campus - Tech Park HQ</h3>
                <p className="text-xs text-slate-400">Building 4B, Cybercity Tech Park, Hitec Phase 2, Hyderabad - 500081</p>
              </div>
            </div>
            <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs text-slate-300">
              <span className="flex items-center gap-1.5"><Phone className="w-3.5 h-3.5 text-emerald-400" /> +91 800-999-8800</span>
              <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5 text-blue-400" /> 8 AM - 9 PM</span>
            </div>
          </div>

          <div className="glass-card rounded-2xl p-6 border border-slate-800 space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-xl bg-purple-600/20 text-purple-400">
                <MapPin className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-white text-base">Branch Campus - Innovation Hub</h3>
                <p className="text-xs text-slate-400">Outer Ring Road, Marathahalli Tech Zone, Bengaluru - 560103</p>
              </div>
            </div>
            <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs text-slate-300">
              <span className="flex items-center gap-1.5"><Phone className="w-3.5 h-3.5 text-emerald-400" /> +91 91234 56789</span>
              <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5 text-purple-400" /> 8 AM - 9 PM</span>
            </div>
          </div>

          <div className="glass-card rounded-2xl p-6 border border-slate-800 space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-xl bg-emerald-600/20 text-emerald-400">
                <Globe className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-white text-base">Connect on Social Media</h3>
                <p className="text-xs text-slate-400">Follow us for weekly tech roadmaps & free webinars.</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-2 pt-2 text-xs">
              <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 hover:text-blue-400 text-slate-300 font-semibold">LinkedIn</a>
              <a href="https://youtube.com" target="_blank" rel="noreferrer" className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 hover:text-rose-400 text-slate-300 font-semibold">YouTube</a>
              <a href="https://twitter.com" target="_blank" rel="noreferrer" className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 hover:text-cyan-400 text-slate-300 font-semibold">Twitter (X)</a>
              <a href="https://github.com" target="_blank" rel="noreferrer" className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 hover:text-purple-400 text-slate-300 font-semibold">GitHub</a>
            </div>
          </div>

          {/* Embedded Map */}
          <div className="h-64 rounded-2xl overflow-hidden border border-slate-800 relative bg-slate-900 shadow-xl">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3806.311746764516!2d78.3758!3d17.4474!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb93dc8c5d69df%3A0x19688beb557ef0d9!2sHITEC%20City%2C%20Hyderabad%2C%20Telangana!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg)' }}
              allowFullScreen={false}
              loading="lazy"
              title="Campus Location Map"
            />
          </div>
        </div>

        {/* Contact Client Form */}
        <div className="lg:col-span-7">
          <ContactClientSection />
        </div>
      </div>
    </div>
  );
}
