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
        <div className="footer-newsletter-banner rounded-2xl p-5 sm:p-8 mb-16 border border-white/30 bg-black/30 backdrop-blur-md shadow-2xl relative overflow-hidden flex flex-col lg:flex-row items-center justify-between gap-6">
          <div className="space-y-1.5 text-center lg:text-left z-10">
            <div className="inline-flex items-center gap-2 text-xs font-black uppercase text-amber-300 tracking-wider">
              <Sparkles className="w-4 h-4 text-amber-300 fill-amber-300 shrink-0" />
              <span>Subscribe to Career Insights</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight drop-shadow-sm">
              Get Tech Salary Trends & Free Workshop Alerts
            </h3>
            <p className="text-white/95 text-xs sm:text-sm font-medium">
              No spam. Only high-value tech roadmaps and interview prep guides.
            </p>
          </div>

          <form onSubmit={handleSubscribe} className="w-full lg:w-auto flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 max-w-md z-10">
            <div className="relative flex-1 w-full">
              <Mail className="w-4 h-4 text-amber-300/80 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none shrink-0" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address..."
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-black/40 border border-white/40 text-white text-xs sm:text-sm focus:outline-none focus:border-amber-300 focus:ring-2 focus:ring-amber-300/30 placeholder:text-white/70"
              />
            </div>
            <button
              type="submit"
              className="px-5 py-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs sm:text-sm flex items-center justify-center gap-2 shrink-0 shadow-xl shadow-black/30 transition-transform hover:scale-105 active:scale-95 cursor-pointer w-full sm:w-auto"
            >
              <span>Subscribe</span>
              <Send className="w-4 h-4 shrink-0" />
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

          {/* Col 4: Campus Locations & Direct Hotline - Functional Clickable Links */}
          <div className="space-y-3.5">
            <h4 className="text-sm font-black text-white uppercase tracking-wider border-b border-white/25 pb-2">
              Headquarters & Hotline
            </h4>
            <div className="space-y-3 text-xs sm:text-sm">
              <Link
                href="/campuses/hyderabad-tech-park-hq"
                className="group flex items-start gap-2.5 p-2 rounded-xl hover:bg-white/10 active:scale-95 transition-all duration-200 cursor-pointer"
                title="View Hyderabad Main Campus"
              >
                <MapPin className="w-4 h-4 text-amber-300 shrink-0 mt-0.5 group-hover:scale-110 group-hover:text-amber-200 transition-transform" />
                <div>
                  <span className="font-black text-white group-hover:text-amber-300 transition-colors block text-sm">
                    Main Campus - Tech Park
                  </span>
                  <span className="text-white/90 text-xs leading-relaxed font-medium block">
                    Building 4B, Cybercity Tech Park, Hitec Phase 2, Hyderabad - 500081
                  </span>
                </div>
              </Link>

              <Link
                href="/campuses/bengaluru-innovation-hub"
                className="group flex items-start gap-2.5 p-2 rounded-xl hover:bg-white/10 active:scale-95 transition-all duration-200 cursor-pointer"
                title="View Bengaluru Branch Campus"
              >
                <MapPin className="w-4 h-4 text-amber-300 shrink-0 mt-0.5 group-hover:scale-110 group-hover:text-amber-200 transition-transform" />
                <div>
                  <span className="font-black text-white group-hover:text-amber-300 transition-colors block text-sm">
                    Branch Campus - Innovation Hub
                  </span>
                  <span className="text-white/90 text-xs leading-relaxed font-medium block">
                    Outer Ring Road, Marathahalli Tech Zone, Bengaluru - 560103
                  </span>
                </div>
              </Link>

              <a
                href="tel:+918009998800"
                className="footer-pill flex items-center gap-2.5 bg-black/30 hover:bg-black/50 active:scale-95 border border-white/30 px-3 py-2.5 rounded-xl text-white font-black text-xs shadow-sm transition-all duration-200 cursor-pointer group mt-2"
                title="Call Admissions Hotline"
              >
                <Phone className="w-4 h-4 text-amber-300 animate-phone-ring group-hover:text-amber-200 transition-colors" />
                <span className="tracking-wide text-white group-hover:text-amber-200 transition-colors">+91 800-999-8800 / +91 91234 56789</span>
              </a>

              <a
                href="mailto:admissions@nexgentechacademy.com"
                className="footer-pill flex items-center gap-2.5 bg-black/30 hover:bg-black/50 active:scale-95 border border-white/30 px-3 py-2.5 rounded-xl text-white font-bold text-xs shadow-sm transition-all duration-200 cursor-pointer group"
                title="Send Admissions Email"
              >
                <Mail className="w-4 h-4 text-amber-300 shrink-0 group-hover:text-amber-200 transition-colors" />
                <span className="text-white group-hover:text-amber-200 transition-colors break-all sm:break-normal">admissions@nexgentechacademy.com</span>
              </a>
            </div>
          </div>
        </div>

        {/* Social Media Links with Hover-Me Effect (Image 5) */}
        <div className="flex items-center justify-center gap-4 py-8 border-t border-white/20">
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
            className="w-11 h-11 rounded-full bg-white/10 hover:bg-white/25 border border-white/25 hover:border-amber-300 text-white hover:text-amber-300 flex items-center justify-center transition-all duration-200 shadow-md hover:scale-115 active:scale-90 hover:shadow-[0_0_15px_rgba(251,191,36,0.5)] cursor-pointer"
            title="Follow us on Facebook"
          >
            <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
              <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
            </svg>
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="w-11 h-11 rounded-full bg-white/10 hover:bg-white/25 border border-white/25 hover:border-amber-300 text-white hover:text-amber-300 flex items-center justify-center transition-all duration-200 shadow-md hover:scale-115 active:scale-90 hover:shadow-[0_0_15px_rgba(251,191,36,0.5)] cursor-pointer"
            title="Follow us on Instagram"
          >
            <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
              <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
            </svg>
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="w-11 h-11 rounded-full bg-white/10 hover:bg-white/25 border border-white/25 hover:border-amber-300 text-white hover:text-amber-300 flex items-center justify-center transition-all duration-200 shadow-md hover:scale-115 active:scale-90 hover:shadow-[0_0_15px_rgba(251,191,36,0.5)] cursor-pointer"
            title="Connect with us on LinkedIn"
          >
            <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76a1.69 1.69 0 0 0 0-3.38 1.69 1.69 0 0 0 0 3.38m1.4 9.74v-8.37H5.06v8.37h2.8z" />
            </svg>
          </a>
          <a
            href="https://youtube.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="YouTube"
            className="w-11 h-11 rounded-full bg-white/10 hover:bg-white/25 border border-white/25 hover:border-amber-300 text-white hover:text-amber-300 flex items-center justify-center transition-all duration-200 shadow-md hover:scale-115 active:scale-90 hover:shadow-[0_0_15px_rgba(251,191,36,0.5)] cursor-pointer"
            title="Subscribe on YouTube"
          >
            <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
            </svg>
          </a>
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
