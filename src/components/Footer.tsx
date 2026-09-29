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
    <footer className="site-footer text-white text-sm pt-16 pb-12 relative overflow-hidden">
      {/* Top Shimmer Highlight Border */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-white/40 shadow-[0_0_15px_rgba(255,255,255,0.6)] z-20 pointer-events-none" />

      {/* Decorative Soft Ambient Glow Orbs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-white/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-amber-400/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Top Newsletter CTA Banner - Styled with frosted card and high contrast */}
        <div className="footer-newsletter-banner rounded-2xl p-8 mb-16 border border-white/30 bg-black/30 backdrop-blur-md shadow-2xl relative overflow-hidden flex flex-col lg:flex-row items-center justify-between gap-6">
          <div className="space-y-1.5 text-center lg:text-left z-10">
            <div className="inline-flex items-center gap-2 text-xs font-black uppercase text-amber-300 tracking-wider">
              <Sparkles className="w-4 h-4 text-amber-300 fill-amber-300" />
              <span>Subscribe to Career Insights</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight drop-shadow-sm">
              Get Tech Salary Trends & Free Workshop Alerts
            </h3>
            <p className="text-white/95 text-xs sm:text-sm font-medium">
              No spam. Only high-value tech roadmaps and interview prep guides.
            </p>
          </div>

          <form onSubmit={handleSubscribe} className="w-full lg:w-auto flex items-center gap-2 max-w-md z-10">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address..."
              className="px-4 py-3 rounded-xl bg-black/40 border border-white/40 text-white text-sm focus:outline-none focus:border-amber-300 focus:ring-2 focus:ring-amber-300/30 w-full lg:w-80 placeholder:text-white/70"
            />
            <button
              type="submit"
              className="px-5 py-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-sm flex items-center gap-2 shrink-0 shadow-xl shadow-black/30 transition-transform hover:scale-105 cursor-pointer"
            >
              <span>Subscribe</span>
              <Send className="w-4 h-4" />
            </button>
          </form>

          {subscribed && (
            <div className="w-full text-center lg:text-right text-xs text-amber-300 font-extrabold z-10">
              ✓ Subscribed successfully! Welcome aboard.
            </div>
          )}
        </div>

        {/* Main 4-Column Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Col 1: Brand & Overview */}
          <div className="space-y-4">
            <div className="inline-block bg-white/10 backdrop-blur-md p-2 rounded-xl border border-white/20">
              <Logo size="md" />
            </div>
            <p className="text-xs sm:text-sm leading-relaxed text-white font-medium">
              India&apos;s premier advanced technology academy delivering hands-on industry training in AI & Data Science, Software Engineering, Cyber Security, UI/UX Design, and DevOps.
            </p>
            <div className="flex flex-wrap items-center gap-2.5 pt-2 text-xs">
              <div className="footer-badge flex items-center gap-1.5 bg-black/30 border border-white/30 px-3 py-1.5 rounded-lg text-white font-bold shadow-sm">
                <ShieldCheck className="w-4 h-4 text-emerald-300" />
                <span>ISO 9001:2015 Certified</span>
              </div>
              <div className="footer-badge flex items-center gap-1.5 bg-black/30 border border-white/30 px-3 py-1.5 rounded-lg text-white font-bold shadow-sm">
                <Award className="w-4 h-4 text-amber-300" />
                <span>NASSCOM Partner</span>
              </div>
            </div>
          </div>

          {/* Col 2: Popular Programs */}
          <div className="space-y-3.5">
            <h4 className="text-sm font-black text-white uppercase tracking-wider border-b border-white/25 pb-2">
              Popular Programs
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm font-medium">
              <li>
                <Link href="/courses/generative-ai-llm-engineering" className="text-white hover:text-amber-300 transition-colors flex items-center justify-between group">
                  <span>GenAI & LLM Engineering</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-amber-300 opacity-80 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
              <li>
                <Link href="/courses/full-stack-web-development-nextjs" className="text-white hover:text-amber-300 transition-colors flex items-center justify-between group">
                  <span>Full Stack Next.js 15</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-amber-300 opacity-80 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
              <li>
                <Link href="/courses/ui-ux-design-masterclass" className="text-white hover:text-amber-300 transition-colors flex items-center justify-between group">
                  <span>UI/UX Design Masterclass</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-amber-300 opacity-80 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
              <li>
                <Link href="/courses/cyber-security-ethical-hacking" className="text-white hover:text-amber-300 transition-colors flex items-center justify-between group">
                  <span>Cyber Security & Hacking</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-amber-300 opacity-80 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
              <li>
                <Link href="/courses/aws-devops-cloud-architect" className="text-white hover:text-amber-300 transition-colors flex items-center justify-between group">
                  <span>AWS DevOps Cloud Architect</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-amber-300 opacity-80 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Quick Navigation */}
          <div className="space-y-3.5">
            <h4 className="text-sm font-black text-white uppercase tracking-wider border-b border-white/25 pb-2">
              Quick Links
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm font-medium">
              <li>
                <Link href="/about" className="text-white hover:text-amber-300 transition-colors">
                  About NexGen Tech Academy
                </Link>
              </li>
              <li>
                <Link href="/batches" className="text-white hover:text-amber-300 transition-colors">
                  Upcoming Batch Schedules
                </Link>
              </li>
              <li>
                <Link href="/certificate" className="text-amber-300 font-bold hover:text-amber-200 transition-colors flex items-center gap-1.5">
                  <Award className="w-3.5 h-3.5 text-amber-300" />
                  <span>Verify NSDC Certificate</span>
                </Link>
              </li>
              <li>
                <Link href="/placements" className="text-white hover:text-amber-300 transition-colors">
                  Placement Records & Salary Reports
                </Link>
              </li>
              <li>
                <Link href="/campuses" className="text-white hover:text-amber-300 transition-colors">
                  Campus Infrastructure & GPU Labs
                </Link>
              </li>
              <li>
                <Link href="/faculty/login" className="text-amber-300 font-bold hover:text-amber-200 transition-colors flex items-center gap-1">
                  <span>👨‍🏫 Faculty & Mentor Portal</span>
                </Link>
              </li>
              <li>
                <Link href="/events" className="text-white hover:text-amber-300 transition-colors">
                  Free Masterclasses & Events
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Campus Locations & Direct Hotline - 100% High Contrast */}
          <div className="space-y-3.5">
            <h4 className="text-sm font-black text-white uppercase tracking-wider border-b border-white/25 pb-2">
              Headquarters & Hotline
            </h4>
            <div className="space-y-3 text-xs sm:text-sm">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-amber-300 shrink-0 mt-0.5" />
                <div>
                  <span className="font-black text-white block text-sm">Main Campus - Tech Park</span>
                  <span className="text-white text-xs leading-relaxed font-medium block">
                    Building 4B, Cybercity Tech Park, Hitec Phase 2, Hyderabad - 500081
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-amber-300 shrink-0 mt-0.5" />
                <div>
                  <span className="font-black text-white block text-sm">Branch Campus - Innovation Hub</span>
                  <span className="text-white text-xs leading-relaxed font-medium block">
                    Outer Ring Road, Marathahalli Tech Zone, Bengaluru - 560103
                  </span>
                </div>
              </div>

              <div className="footer-pill flex items-center gap-2.5 bg-black/30 border border-white/30 px-3 py-2 rounded-xl text-white font-black text-xs shadow-sm mt-2">
                <Phone className="w-4 h-4 text-amber-300 animate-phone-ring" />
                <span className="tracking-wide text-white">+91 800-999-8800 / +91 91234 56789</span>
              </div>

              <div className="footer-pill flex items-center gap-2.5 bg-black/30 border border-white/30 px-3 py-2 rounded-xl text-white font-bold text-xs shadow-sm">
                <Mail className="w-4 h-4 text-amber-300" />
                <span className="text-white">admissions@nexgentechacademy.com</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Copyright & Legal Links */}
        <div className="footer-bottom-bar pt-8 border-t border-white/25 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white font-medium">
          <div>
            © {new Date().getFullYear()} NexGen Tech Academy & Research Institute. All rights reserved.
          </div>
          <div className="flex items-center gap-6">
            <Link href="#" className="text-white hover:text-amber-300 transition-colors">Privacy Policy</Link>
            <Link href="#" className="text-white hover:text-amber-300 transition-colors">Terms of Service</Link>
            <Link href="#" className="text-white hover:text-amber-300 transition-colors">Refund & Cancellation</Link>
            <Link href="/sitemap.xml" className="text-white hover:text-amber-300 transition-colors">Sitemap</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
