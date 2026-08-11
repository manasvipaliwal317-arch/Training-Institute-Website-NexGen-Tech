'use client';

import { useState } from 'react';
import Link from 'next/link';
import Logo from './Logo';
import {
  Mail,
  Phone,
  MapPin,
  Send,
  ShieldCheck,
  Award,
  CheckCircle2,
  ArrowUpRight,
  Sparkles,
} from 'lucide-react';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  function handleSubscribe(e: React.FormEvent) {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
    }
  }

  return (
    <footer className="bg-slate-950 border-t border-slate-800 text-slate-400 text-sm pt-16 pb-12 relative overflow-hidden">
      {/* Decorative Glow */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Top Newsletter CTA Banner */}
        <div className="glass-card rounded-2xl p-8 mb-16 border border-blue-500/20 bg-gradient-to-r from-slate-900 via-blue-950/40 to-slate-900 flex flex-col lg:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase text-blue-400 tracking-wider">
              <Sparkles className="w-4 h-4" />
              <span>Subscribe to Career Insights</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-white">Get Tech Salary Trends & Free Workshop Alerts</h3>
            <p className="text-slate-400 text-xs sm:text-sm">No spam. Only high-value tech roadmaps and interview prep guides.</p>
          </div>

          <form onSubmit={handleSubscribe} className="w-full lg:w-auto flex items-center gap-2 max-w-md">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your work or personal email..."
              className="px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm focus:outline-none focus:border-blue-500 w-full lg:w-80 placeholder:text-slate-500"
            />
            <button
              type="submit"
              className="px-5 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm flex items-center gap-2 shrink-0 shadow-lg shadow-blue-500/20 transition-all"
            >
              <span>Subscribe</span>
              <Send className="w-4 h-4" />
            </button>
          </form>

          {subscribed && (
            <div className="w-full text-center lg:text-right text-xs text-emerald-400 font-semibold">
              ✓ Subscribed successfully! Welcome aboard.
            </div>
          )}
        </div>

        {/* Main 4-Column Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Col 1: Brand & Overview */}
          <div className="space-y-4">
            <Logo size="md" />
            <p className="text-xs sm:text-sm leading-relaxed text-slate-400">
              India&apos;s premier advanced technology academy delivering hands-on industry training in AI & Data Science, Software Engineering, Cyber Security, UI/UX Design, and DevOps.
            </p>
            <div className="flex items-center gap-3 pt-2 text-xs text-slate-300">
              <div className="flex items-center gap-1.5 bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-lg">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>ISO 9001:2015 Certified</span>
              </div>
              <div className="flex items-center gap-1.5 bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-lg">
                <Award className="w-4 h-4 text-amber-400" />
                <span>NASSCOM Partner</span>
              </div>
            </div>
          </div>

          {/* Col 2: Popular Programs */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">Popular Programs</h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li>
                <Link href="/courses/generative-ai-llm-engineering" className="hover:text-blue-400 transition-colors flex items-center justify-between group">
                  <span>GenAI & LLM Engineering</span>
                  <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
              <li>
                <Link href="/courses/full-stack-web-development-nextjs" className="hover:text-blue-400 transition-colors flex items-center justify-between group">
                  <span>Full Stack Next.js 15</span>
                  <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
              <li>
                <Link href="/courses/ui-ux-design-masterclass" className="hover:text-blue-400 transition-colors flex items-center justify-between group">
                  <span>UI/UX Design Masterclass</span>
                  <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
              <li>
                <Link href="/courses/cyber-security-ethical-hacking" className="hover:text-blue-400 transition-colors flex items-center justify-between group">
                  <span>Cyber Security & Hacking</span>
                  <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
              <li>
                <Link href="/courses/aws-devops-cloud-architect" className="hover:text-blue-400 transition-colors flex items-center justify-between group">
                  <span>AWS DevOps Cloud Architect</span>
                  <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Quick Navigation */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">Quick Links</h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li><Link href="/about" className="hover:text-blue-400 transition-colors">About NexGen Tech Academy</Link></li>
              <li><Link href="/batches" className="hover:text-blue-400 transition-colors">Upcoming Batch Schedules</Link></li>
              <li><Link href="/placements" className="hover:text-blue-400 transition-colors">Placement Records & Salary Reports</Link></li>
              <li><Link href="/campus" className="hover:text-blue-400 transition-colors">Campus Infrastructure & GPU Labs</Link></li>
              <li><Link href="/contact" className="hover:text-blue-400 transition-colors">Contact Academic Counselors</Link></li>
              <li><Link href="/admin/login" className="text-purple-400 hover:text-purple-300 font-semibold">Admin Login Portal</Link></li>
            </ul>
          </div>

          {/* Col 4: Campus Locations & Direct Hotline */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">Headquarters & Hotline</h4>
            <div className="space-y-3 text-xs sm:text-sm">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-white block">Main Campus - Tech Park</span>
                  <span>Building 4B, Cybercity Tech Park, Hitec Phase 2, Hyderabad - 500081</span>
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-white block">Branch Campus - Innovation Hub</span>
                  <span>Outer Ring Road, Marathahalli Tech Zone, Bengaluru - 560103</span>
                </div>
              </div>
              <div className="flex items-center gap-2 text-slate-300 pt-1">
                <Phone className="w-4 h-4 text-emerald-400" />
                <span className="font-medium text-white">+91 800-999-8800 / +91 91234 56789</span>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <Mail className="w-4 h-4 text-blue-400" />
                <span>admissions@nexgentechacademy.com</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Copyright & Legal Links */}
        <div className="pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            © {new Date().getFullYear()} NexGen Tech Academy & Research Institute. All rights reserved.
          </div>
          <div className="flex items-center gap-6">
            <Link href="#" className="hover:text-slate-400 transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-slate-400 transition-colors">Terms of Service</Link>
            <Link href="#" className="hover:text-slate-400 transition-colors">Refund & Cancellation</Link>
            <Link href="/sitemap.xml" className="hover:text-slate-400 transition-colors">Sitemap</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
