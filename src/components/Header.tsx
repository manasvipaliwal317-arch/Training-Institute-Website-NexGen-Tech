'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  GraduationCap,
  ChevronDown,
  Menu,
  X,
  Phone,
  Sparkles,
  Lock,
  ArrowRight,
  Brain,
  Code2,
  ShieldCheck,
  Palette,
  CloudLightning,
  CheckCircle2,
  Calendar,
  Building2,
  FileText,
} from 'lucide-react';
import InquiryModal from './InquiryModal';
import ThemeToggle from './ThemeToggle';
import Logo from './Logo';

const courseCategories = [
  { name: 'AI & Data Science', slug: 'ai-data-science', icon: Brain, desc: 'GenAI, LLMs, Machine Learning & Analytics' },
  { name: 'Software Development', slug: 'software-development', icon: Code2, desc: 'Full Stack, React 19, Next.js 15, Node.js' },
  { name: 'Networking & Cyber Security', slug: 'networking-security', icon: ShieldCheck, desc: 'Ethical Hacking, SOC, Penetration Testing' },
  { name: 'UI/UX & Design', slug: 'designing', icon: Palette, desc: 'Figma Systems, Visual UX & Design Thinking' },
  { name: 'Cloud & DevOps', slug: 'cloud-devops', icon: CloudLightning, desc: 'AWS, Kubernetes, Docker & CI/CD Pipelines' },
  { name: 'Testing & Automation', slug: 'testing-automation', icon: CheckCircle2, desc: 'Selenium, Playwright & API QA Testing' },
];

export default function Header() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [coursesDropdownOpen, setCoursesDropdownOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const isActive = (path: string) => pathname === path;

  return (
    <>
      {/* Top Flash Announcement Bar */}
      <div className="header-topbar bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-700 text-white text-xs py-2 px-4 border-b border-white/10">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-center sm:text-left">
          <div className="flex items-center gap-2 font-medium">
            <span className="bg-amber-400 text-slate-950 font-bold px-2 py-0.5 rounded-full text-[10px] uppercase tracking-wide">
              New Batches
            </span>
            <span>Admissions Open for September 2026 Cohorts • Early Bird Scholarship Available!</span>
          </div>
          <div className="flex items-center gap-4 text-slate-200">
            <a href="tel:+918009998800" className="flex items-center gap-1 hover:text-white transition-colors">
              <Phone className="w-3.5 h-3.5 text-blue-300" />
              <span>+91 800-999-8800</span>
            </a>
            <span className="hidden md:inline text-slate-400">|</span>
            <Link href="/admin/login" className="hidden md:flex items-center gap-1 text-slate-300 hover:text-white transition-colors">
              <Lock className="w-3 h-3 text-purple-300" />
              <span>Admin Login</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Main Glass Navigation Header */}
      <header className="sticky top-0 z-40 glass-nav transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Logo />

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-6 text-sm font-medium">
              <Link
                href="/"
                className={`transition-colors hover:text-pink-600 dark:hover:text-blue-400 ${isActive('/') ? 'text-pink-600 dark:text-blue-400 font-semibold' : 'dark:text-slate-300 text-violet-800'}`}
              >
                Home
              </Link>

              <Link
                href="/about"
                className={`transition-colors hover:text-pink-600 dark:hover:text-blue-400 ${isActive('/about') ? 'text-pink-600 dark:text-blue-400 font-semibold' : 'dark:text-slate-300 text-violet-800'}`}
              >
                About Us
              </Link>

              {/* Courses Mega Dropdown */}
              <div
                className="relative"
                onMouseEnter={() => setCoursesDropdownOpen(true)}
                onMouseLeave={() => setCoursesDropdownOpen(false)}
              >
                <Link
                  href="/courses"
                  className={`flex items-center gap-1 py-2 transition-colors hover:text-pink-600 dark:hover:text-blue-400 ${
                    pathname.startsWith('/courses') ? 'text-pink-600 dark:text-blue-400 font-semibold' : 'dark:text-slate-300 text-violet-800'
                  }`}
                >
                  <span>Courses</span>
                  <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${coursesDropdownOpen ? 'rotate-180 text-pink-600 dark:text-blue-400' : ''}`} />
                </Link>

                {coursesDropdownOpen && (
                  <div className="absolute top-full left-1/2 -translate-x-1/2 w-[620px] p-4 glass-card rounded-2xl border border-blue-500/20 shadow-2xl animate-in fade-in slide-in-from-top-2 duration-200 grid grid-cols-2 gap-3">
                    {courseCategories.map((cat) => {
                      const IconComp = cat.icon;
                      return (
                        <Link
                          key={cat.slug}
                          href={`/courses?category=${cat.slug}`}
                          className="flex items-start gap-3 p-3 rounded-xl hover:bg-slate-800/80 border border-transparent hover:border-blue-500/30 transition-all group/cat"
                          onClick={() => setCoursesDropdownOpen(false)}
                        >
                          <div className="p-2.5 rounded-lg bg-blue-500/10 text-blue-400 group-hover/cat:bg-blue-600 group-hover/cat:text-white transition-colors">
                            <IconComp className="w-5 h-5" />
                          </div>
                          <div>
                            <div className="text-sm font-semibold text-white group-hover/cat:text-blue-400 transition-colors">
                              {cat.name}
                            </div>
                            <div className="text-xs text-slate-400 line-clamp-1 mt-0.5">{cat.desc}</div>
                          </div>
                        </Link>
                      );
                    })}

                    <div className="col-span-2 mt-2 pt-3 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
                      <span>15+ Specialized Industry Certifications</span>
                      <Link href="/courses" className="text-blue-400 hover:text-blue-300 font-semibold flex items-center gap-1">
                        View All Courses <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                )}
              </div>

              <Link
                href="/batches"
                className={`transition-colors hover:text-blue-400 ${isActive('/batches') ? 'text-pink-600 dark:text-blue-400 font-semibold' : 'dark:text-slate-300 text-violet-800'}`}
              >
                Batches
              </Link>

              <Link
                href="/events"
                className={`transition-colors hover:text-blue-400 ${isActive('/events') ? 'text-pink-600 dark:text-blue-400 font-semibold' : 'dark:text-slate-300 text-violet-800'}`}
              >
                Events
              </Link>

              <Link
                href="/campuses"
                className={`transition-colors hover:text-blue-400 ${isActive('/campuses') ? 'text-pink-600 dark:text-blue-400 font-semibold' : 'dark:text-slate-300 text-violet-800'}`}
              >
                Campuses
              </Link>

              <Link
                href="/placements"
                className={`transition-colors hover:text-blue-400 ${isActive('/placements') ? 'text-pink-600 dark:text-blue-400 font-semibold' : 'dark:text-slate-300 text-violet-800'}`}
              >
                Placements
              </Link>

              <Link
                href="/blog"
                className={`transition-colors hover:text-blue-400 ${isActive('/blog') ? 'text-pink-600 dark:text-blue-400 font-semibold' : 'dark:text-slate-300 text-violet-800'}`}
              >
                Blog
              </Link>

              <Link
                href="/contact"
                className={`transition-colors hover:text-blue-400 ${isActive('/contact') ? 'text-pink-600 dark:text-blue-400 font-semibold' : 'dark:text-slate-300 text-violet-800'}`}
              >
                Contact
              </Link>
            </nav>

            {/* Right Action CTA & Mobile Trigger */}
            <div className="flex items-center gap-3">
              <ThemeToggle />
              <button
                onClick={() => setModalOpen(true)}
                className="hidden sm:flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white text-xs sm:text-sm font-semibold shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 hover:-translate-y-0.5 transition-all"
              >
                <Sparkles className="w-4 h-4 text-amber-300" />
                <span>Book Free Demo</span>
              </button>

              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 rounded-xl text-slate-300 hover:text-white hover:bg-slate-800/80 transition-colors"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-slate-800 bg-slate-950/95 backdrop-blur-xl px-4 py-6 space-y-4 animate-in slide-in-from-top-4 duration-200">
            <nav className="flex flex-col space-y-3 font-medium text-sm">
              <Link href="/" onClick={() => setMobileMenuOpen(false)} className="px-3 py-2 rounded-lg text-slate-200 hover:bg-slate-800/60">
                Home
              </Link>
              <Link href="/about" onClick={() => setMobileMenuOpen(false)} className="px-3 py-2 rounded-lg text-slate-200 hover:bg-slate-800/60">
                About Us
              </Link>
              <Link href="/courses" onClick={() => setMobileMenuOpen(false)} className="px-3 py-2 rounded-lg text-slate-200 hover:bg-slate-800/60">
                All Courses & Categories
              </Link>
              <Link href="/batches" onClick={() => setMobileMenuOpen(false)} className="px-3 py-2 rounded-lg text-slate-200 hover:bg-slate-800/60">
                Upcoming Batches
              </Link>
              <Link href="/events" onClick={() => setMobileMenuOpen(false)} className="px-3 py-2 rounded-lg text-slate-200 hover:bg-slate-800/60">
                Workshops & Events
              </Link>
              <Link href="/campuses" onClick={() => setMobileMenuOpen(false)} className="px-3 py-2 rounded-lg text-slate-200 hover:bg-slate-800/60">
                Multi-Branch Campuses
              </Link>
              <Link href="/placements" onClick={() => setMobileMenuOpen(false)} className="px-3 py-2 rounded-lg text-slate-200 hover:bg-slate-800/60">
                Placements & Hiring
              </Link>
              <Link href="/blog" onClick={() => setMobileMenuOpen(false)} className="px-3 py-2 rounded-lg text-slate-200 hover:bg-slate-800/60">
                Tech Blog & Guidance
              </Link>
              <Link href="/contact" onClick={() => setMobileMenuOpen(false)} className="px-3 py-2 rounded-lg text-slate-200 hover:bg-slate-800/60">
                Contact Counselors
              </Link>
              <Link href="/admin/login" onClick={() => setMobileMenuOpen(false)} className="px-3 py-2 rounded-lg text-purple-400 hover:bg-slate-800/60 flex items-center gap-2">
                <Lock className="w-4 h-4" /> Admin Portal
              </Link>
            </nav>

            <div className="pt-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setModalOpen(true);
                }}
                className="w-full py-3 rounded-xl bg-blue-600 text-white font-semibold text-sm flex items-center justify-center gap-2 shadow-lg shadow-blue-500/30"
              >
                <Sparkles className="w-4 h-4 text-amber-300" />
                <span>Book Free Demo Class</span>
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Reusable Demo Booking Modal */}
      <InquiryModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
}
