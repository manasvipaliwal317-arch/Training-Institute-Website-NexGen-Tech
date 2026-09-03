'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
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
  TrendingUp,
  Calendar,
  Building2,
  Award,
  Clock,
  Briefcase,
  Star,
  BookOpen,
} from 'lucide-react';
import InquiryModal from './InquiryModal';
import ThemeToggle from './ThemeToggle';
import Logo from './Logo';

const courseCategories = [
  { 
    name: 'AI & Data Science', 
    slug: 'ai-data-science', 
    icon: Brain, 
    desc: 'Generative AI, LLMs, Deep Learning & Analytics',
    badge: 'Trending'
  },
  { 
    name: 'Software Development', 
    slug: 'software-development', 
    icon: Code2, 
    desc: 'Full Stack Next.js 15, React 19, Node.js & APIs',
    badge: 'Hot'
  },
  { 
    name: 'Networking & Cyber Security', 
    slug: 'networking-security', 
    icon: ShieldCheck, 
    desc: 'Ethical Hacking, SOC, Penetration Testing & CCNA',
    badge: 'Govt Certified'
  },
  { 
    name: 'UI/UX & Design', 
    slug: 'designing', 
    icon: Palette, 
    desc: 'Figma Design Systems, Visual UX & Product Thinking',
    badge: 'Creative'
  },
  { 
    name: 'Cloud & DevOps', 
    slug: 'cloud-devops', 
    icon: CloudLightning, 
    desc: 'AWS Cloud, Kubernetes, Docker & CI/CD Pipelines',
    badge: 'High Salary'
  },
  { 
    name: 'Testing & Automation', 
    slug: 'testing-automation', 
    icon: CheckCircle2, 
    desc: 'Selenium, Playwright, API QA & Cypress Automation',
    badge: 'QA'
  },
  { 
    name: 'Digital Marketing', 
    slug: 'digital-marketing', 
    icon: TrendingUp, 
    desc: 'SEO, SEM, Meta Ads, Growth Hacking & GA4 Analytics',
    badge: 'Growth'
  },
];

const outcomesSubmenu = [
  { 
    name: 'Upcoming Cohort Batches', 
    href: '/batches', 
    icon: Clock, 
    desc: 'Live Morning, Evening & Weekend Schedules with Real-Time Seat Status',
    tag: 'Admissions Open',
    accent: 'purple'
  },
  { 
    name: 'Live Workshops & Masterclasses', 
    href: '/events', 
    icon: Calendar, 
    desc: 'Hands-On GenAI, Security Hackathons & Industry Masterclasses',
    tag: 'Free Entry',
    accent: 'cyan'
  },
  { 
    name: 'Multi-City GPU Campuses', 
    href: '/campuses', 
    icon: Building2, 
    desc: 'High-Tech Labs & Infrastructure in Hyderabad, Bengaluru & Pune',
    tag: '3 Hubs',
    accent: 'emerald'
  },
  { 
    name: 'Placements & Hiring Drives', 
    href: '/placements', 
    icon: Briefcase, 
    desc: '94% Placement Success, 450+ Hiring Partners & Salary Breakdowns',
    tag: '94% Hired',
    accent: 'blue'
  },
  { 
    name: 'ISO Certificate Verification', 
    href: '/certificate', 
    icon: ShieldCheck, 
    desc: 'Instant QR Code & Certificate ID Credential Authentication Portal',
    tag: 'Instant Lookup',
    accent: 'amber'
  },
  { 
    name: 'Tech Blog & Research', 
    href: '/blog', 
    icon: BookOpen, 
    desc: 'Engineering Guides, Interview Roadmaps & Technical Architecture Insights',
    tag: 'Latest Articles',
    accent: 'rose'
  },
];

export default function Header() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [coursesDropdownOpen, setCoursesDropdownOpen] = useState(false);
  const [outcomesDropdownOpen, setOutcomesDropdownOpen] = useState(false);
  const [mobileCoursesOpen, setMobileCoursesOpen] = useState(false);
  const [mobileOutcomesOpen, setMobileOutcomesOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const coursesRef = useRef<HTMLDivElement>(null);
  const outcomesRef = useRef<HTMLDivElement>(null);
  const coursesTimerRef = useRef<NodeJS.Timeout | null>(null);
  const outcomesTimerRef = useRef<NodeJS.Timeout | null>(null);

  const isActive = (path: string) => pathname === path;
  const isCoursesActive = pathname.startsWith('/courses');
  const isOutcomesActive = ['/batches', '/events', '/campuses', '/placements', '/certificate'].includes(pathname);

  // Smooth hover handlers with grace timeout
  const handleCoursesMouseEnter = () => {
    if (coursesTimerRef.current) clearTimeout(coursesTimerRef.current);
    setCoursesDropdownOpen(true);
    setOutcomesDropdownOpen(false);
  };

  const handleCoursesMouseLeave = () => {
    coursesTimerRef.current = setTimeout(() => {
      setCoursesDropdownOpen(false);
    }, 200);
  };

  const handleOutcomesMouseEnter = () => {
    if (outcomesTimerRef.current) clearTimeout(outcomesTimerRef.current);
    setOutcomesDropdownOpen(true);
    setCoursesDropdownOpen(false);
  };

  const handleOutcomesMouseLeave = () => {
    outcomesTimerRef.current = setTimeout(() => {
      setOutcomesDropdownOpen(false);
    }, 200);
  };

  // Close dropdowns when clicking outside or pressing Escape
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      const target = event.target as Node;
      if (coursesRef.current && !coursesRef.current.contains(target)) {
        setCoursesDropdownOpen(false);
      }
      if (outcomesRef.current && !outcomesRef.current.contains(target)) {
        setOutcomesDropdownOpen(false);
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setCoursesDropdownOpen(false);
        setOutcomesDropdownOpen(false);
        setMobileMenuOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
      if (coursesTimerRef.current) clearTimeout(coursesTimerRef.current);
      if (outcomesTimerRef.current) clearTimeout(outcomesTimerRef.current);
    };
  }, []);

  // Close menus on page route changes
  useEffect(() => {
    setCoursesDropdownOpen(false);
    setOutcomesDropdownOpen(false);
    setMobileMenuOpen(false);
  }, [pathname]);

  return (
    <>
      {/* Top Flash Announcement Bar */}
      <div className="header-topbar animate-trigger-shimmer bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-800 text-white text-xs py-2 px-4 border-b border-white/10 relative z-50">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2.5 text-center sm:text-left">
          <div className="flex items-center gap-2 font-medium flex-wrap justify-center sm:justify-start">
            <span className="animate-trigger-pulse bg-gradient-to-r from-amber-400 to-orange-500 text-slate-950 font-extrabold px-2.5 py-0.5 rounded-full text-[10px] uppercase tracking-wider flex items-center gap-1 shadow-md">
              <span className="w-1.5 h-1.5 rounded-full bg-red-600 animate-ping inline-block" />
              New Batches
            </span>
            <span className="text-amber-200 font-semibold tracking-wide">
              Admissions Open for September 2026 Cohorts • Early Bird Scholarship Available!
            </span>
          </div>

          <div className="flex items-center gap-3 text-slate-200">
            <a 
              href="tel:+918009998800" 
              className="group flex items-center gap-1.5 bg-white/15 hover:bg-white/25 text-white font-bold px-3 py-1 rounded-full border border-white/20 transition-all duration-300 transform hover:scale-105 shadow-sm"
              title="Call Admissions Office"
            >
              <Phone className="w-3.5 h-3.5 text-amber-300 animate-phone-ring group-hover:text-amber-200" />
              <span className="tracking-wider text-amber-100">+91 800-999-8800</span>
            </a>
            <button
              onClick={() => setModalOpen(true)}
              className="hidden sm:flex bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold px-2.5 py-1 rounded-full text-[11px] transition-all transform hover:scale-105 shadow-md items-center gap-1 cursor-pointer"
            >
              <Sparkles className="w-3 h-3 text-slate-950 fill-slate-950" />
              <span>Claim Scholarship</span>
            </button>
            <span className="hidden md:inline text-slate-400">|</span>
            <Link href="/admin/login" className="hidden md:flex items-center gap-1 text-slate-300 hover:text-white transition-colors">
              <Lock className="w-3 h-3 text-purple-300" />
              <span>Admin</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Main Shimmering Navigation Header */}
      <header className="sticky top-0 z-40 glass-nav-shimmer transition-all">
        {/* Shimmer Light Beam & Neon Bottom Line */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="nav-shimmer-beam" />
          <div className="nav-shimmer-bottom-line" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Logo />

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-6 text-sm font-medium">
              <Link
                href="/"
                className={`transition-colors hover:text-pink-600 dark:hover:text-blue-400 py-2 ${
                  isActive('/') ? 'text-pink-600 dark:text-blue-400 font-semibold' : 'dark:text-slate-300 text-violet-800'
                }`}
              >
                Home
              </Link>

              <Link
                href="/about"
                className={`transition-colors hover:text-pink-600 dark:hover:text-blue-400 py-2 ${
                  isActive('/about') ? 'text-pink-600 dark:text-blue-400 font-semibold' : 'dark:text-slate-300 text-violet-800'
                }`}
              >
                About Us
              </Link>

              {/* Courses Mega Dropdown */}
              <div
                ref={coursesRef}
                className="relative h-20 flex items-center"
                onMouseEnter={handleCoursesMouseEnter}
                onMouseLeave={handleCoursesMouseLeave}
              >
                <button
                  type="button"
                  onClick={() => {
                    setCoursesDropdownOpen((prev) => !prev);
                    setOutcomesDropdownOpen(false);
                  }}
                  aria-expanded={coursesDropdownOpen}
                  aria-haspopup="true"
                  className={`flex items-center gap-1.5 py-2 px-1 cursor-pointer transition-colors hover:text-pink-600 dark:hover:text-blue-400 bg-transparent border-0 font-medium ${
                    isCoursesActive
                      ? 'text-pink-600 dark:text-blue-400 font-semibold'
                      : 'dark:text-slate-300 text-violet-800'
                  }`}
                >
                  <span>Courses</span>
                  <ChevronDown
                    className={`w-4 h-4 transition-transform duration-200 ${
                      coursesDropdownOpen ? 'rotate-180 text-pink-600 dark:text-blue-400' : ''
                    }`}
                  />
                </button>

                {coursesDropdownOpen && (
                  <div
                    className="absolute top-[calc(100%-6px)] left-1/2 -translate-x-1/2 pt-2 w-[680px] z-50 animate-in fade-in slide-in-from-top-2 duration-150"
                    onMouseEnter={handleCoursesMouseEnter}
                    onMouseLeave={handleCoursesMouseLeave}
                  >
                    {/* Invisible Hover Bridge */}
                    <div className="absolute -top-3 left-0 right-0 h-4 bg-transparent" />

                    <div className="p-4 glass-card rounded-2xl border border-blue-500/30 shadow-2xl space-y-3 dark:bg-slate-900/98 bg-white text-slate-900 dark:text-white">
                      <div className="px-2 pb-2 border-b dark:border-slate-800 border-slate-200 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Brain className="w-4 h-4 text-blue-500" />
                          <span className="text-xs font-bold uppercase tracking-wider text-blue-500">
                            Academic Programs & Certifications
                          </span>
                        </div>
                        <Link
                          href="/courses"
                          onClick={() => setCoursesDropdownOpen(false)}
                          className="text-xs font-semibold text-blue-500 hover:text-blue-600 dark:hover:text-blue-400 flex items-center gap-1"
                        >
                          <span>View All Courses</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                      </div>

                      <div className="grid grid-cols-2 gap-2.5">
                        {courseCategories.map((cat) => {
                          const IconComp = cat.icon;
                          const isCatActive = pathname === `/courses` && typeof window !== 'undefined' && window.location.search.includes(cat.slug);

                          return (
                            <Link
                              key={cat.slug}
                              href={`/courses?category=${cat.slug}`}
                              onClick={() => setCoursesDropdownOpen(false)}
                              className={`flex items-start gap-3 p-2.5 rounded-xl border transition-all group/item ${
                                isCatActive
                                  ? 'bg-blue-500/15 border-blue-500/40 text-blue-600 dark:text-blue-400'
                                  : 'dark:border-slate-800/80 border-slate-100 hover:border-blue-500/30 dark:hover:bg-slate-800/80 hover:bg-slate-50'
                              }`}
                            >
                              <div className="p-2.5 rounded-xl bg-blue-500/10 text-blue-500 group-hover/item:bg-blue-600 group-hover/item:text-white transition-all shrink-0 mt-0.5 shadow-sm">
                                <IconComp className="w-4 h-4" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center justify-between gap-1">
                                  <span className="text-xs font-bold dark:text-white text-slate-900 group-hover/item:text-blue-500 transition-colors truncate">
                                    {cat.name}
                                  </span>
                                  <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-blue-500/10 text-blue-500 dark:text-blue-400 shrink-0">
                                    {cat.badge}
                                  </span>
                                </div>
                                <p className="text-[11px] dark:text-slate-400 text-slate-500 line-clamp-1 mt-0.5">
                                  {cat.desc}
                                </p>
                              </div>
                            </Link>
                          );
                        })}
                      </div>

                      <div className="pt-2.5 border-t dark:border-slate-800 border-slate-200 flex items-center justify-between text-xs dark:text-slate-400 text-slate-600 px-2">
                        <span className="flex items-center gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                          <span>100% Practical Labs • Live Industry Mentors • Job Guarantee Support</span>
                        </span>
                        <Link
                          href="/courses"
                          onClick={() => setCoursesDropdownOpen(false)}
                          className="font-bold text-blue-500 hover:text-blue-600 dark:hover:text-blue-400 flex items-center gap-1 shrink-0"
                        >
                          <span>Explore Catalog</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Outcomes Dropdown (Batches, Events, Campuses, Placements, Certificate, Blog) */}
              <div
                ref={outcomesRef}
                className="relative h-20 flex items-center"
                onMouseEnter={handleOutcomesMouseEnter}
                onMouseLeave={handleOutcomesMouseLeave}
              >
                <button
                  type="button"
                  onClick={() => {
                    setOutcomesDropdownOpen((prev) => !prev);
                    setCoursesDropdownOpen(false);
                  }}
                  aria-expanded={outcomesDropdownOpen}
                  aria-haspopup="true"
                  className={`flex items-center gap-1.5 py-2 px-1 cursor-pointer transition-colors hover:text-pink-600 dark:hover:text-blue-400 bg-transparent border-0 font-medium ${
                    isOutcomesActive
                      ? 'text-pink-600 dark:text-blue-400 font-semibold'
                      : 'dark:text-slate-300 text-violet-800'
                  }`}
                >
                  <span>Outcomes</span>
                  <ChevronDown
                    className={`w-4 h-4 transition-transform duration-200 ${
                      outcomesDropdownOpen ? 'rotate-180 text-pink-600 dark:text-blue-400' : ''
                    }`}
                  />
                </button>

                {outcomesDropdownOpen && (
                  <div
                    className="absolute top-[calc(100%-6px)] left-1/2 -translate-x-1/2 pt-2 w-[420px] z-50 animate-in fade-in slide-in-from-top-2 duration-150"
                    onMouseEnter={handleOutcomesMouseEnter}
                    onMouseLeave={handleOutcomesMouseLeave}
                  >
                    {/* Invisible Hover Bridge */}
                    <div className="absolute -top-3 left-0 right-0 h-4 bg-transparent" />

                    <div className="p-3.5 glass-card rounded-2xl border border-emerald-500/30 shadow-2xl space-y-2 dark:bg-slate-900/98 bg-white text-slate-900 dark:text-white">
                      <div className="px-2 pb-2 border-b dark:border-slate-800 border-slate-200 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Sparkles className="w-4 h-4 text-emerald-500" />
                          <span className="text-xs font-bold uppercase tracking-wider text-emerald-500">
                            Academy Ecosystem & Outcomes
                          </span>
                        </div>
                        <span className="text-[10px] font-semibold dark:text-slate-400 text-slate-500">
                          6 Key Portals
                        </span>
                      </div>

                      <div className="space-y-1.5">
                        {outcomesSubmenu.map((item) => {
                          const IconComp = item.icon;
                          const isItemActive = pathname === item.href;

                          return (
                            <Link
                              key={item.name}
                              href={item.href}
                              onClick={() => setOutcomesDropdownOpen(false)}
                              className={`flex items-start gap-3 p-2.5 rounded-xl border transition-all group/item ${
                                isItemActive
                                  ? 'bg-emerald-500/15 border-emerald-500/40 text-emerald-600 dark:text-emerald-400'
                                  : 'dark:border-slate-800/80 border-slate-100 hover:border-emerald-500/30 dark:hover:bg-slate-800/80 hover:bg-slate-50'
                              }`}
                            >
                              <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-500 group-hover/item:bg-emerald-600 group-hover/item:text-white transition-all shrink-0 mt-0.5 shadow-sm">
                                <IconComp className="w-4 h-4" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center justify-between gap-1">
                                  <span className="text-xs font-bold dark:text-white text-slate-900 group-hover/item:text-emerald-500 transition-colors truncate">
                                    {item.name}
                                  </span>
                                  <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-500 dark:text-emerald-400 shrink-0">
                                    {item.tag}
                                  </span>
                                </div>
                                <p className="text-[11px] dark:text-slate-400 text-slate-500 line-clamp-1 mt-0.5">
                                  {item.desc}
                                </p>
                              </div>
                            </Link>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <Link
                href="/placements"
                className={`transition-colors hover:text-pink-600 dark:hover:text-blue-400 py-2 ${
                  isActive('/placements') ? 'text-pink-600 dark:text-blue-400 font-semibold' : 'dark:text-slate-300 text-violet-800'
                }`}
              >
                Placements
              </Link>

              <Link
                href="/blog"
                className={`transition-colors hover:text-pink-600 dark:hover:text-blue-400 py-2 ${
                  isActive('/blog') ? 'text-pink-600 dark:text-blue-400 font-semibold' : 'dark:text-slate-300 text-violet-800'
                }`}
              >
                Blog
              </Link>

              <Link
                href="/contact"
                className={`transition-colors hover:text-pink-600 dark:hover:text-blue-400 py-2 ${
                  isActive('/contact') ? 'text-pink-600 dark:text-blue-400 font-semibold' : 'dark:text-slate-300 text-violet-800'
                }`}
              >
                Contact
              </Link>

              <Link
                href="/certificate"
                className={`transition-colors hover:text-pink-600 dark:hover:text-blue-400 py-2 ${
                  isActive('/certificate') ? 'text-pink-600 dark:text-blue-400 font-semibold' : 'dark:text-slate-300 text-violet-800'
                }`}
              >
                Certificate
              </Link>
            </nav>

            {/* Right Action CTA & Mobile Trigger */}
            <div className="flex items-center gap-3">
              <ThemeToggle />
              <button
                onClick={() => setModalOpen(true)}
                className="hidden sm:flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white text-xs sm:text-sm font-semibold shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 hover:-translate-y-0.5 transition-all cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-amber-300" />
                <span>Book Free Demo</span>
              </button>

              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 rounded-xl text-slate-300 hover:text-white hover:bg-slate-800/80 transition-colors cursor-pointer"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-slate-800 bg-slate-950/98 backdrop-blur-2xl px-4 py-6 space-y-3 animate-in slide-in-from-top-4 duration-200 max-h-[85vh] overflow-y-auto">
            <nav className="flex flex-col space-y-1.5 font-medium text-sm">
              <Link
                href="/"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-lg text-slate-200 hover:bg-slate-800/60"
              >
                Home
              </Link>

              <Link
                href="/about"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-lg text-slate-200 hover:bg-slate-800/60"
              >
                About Us
              </Link>

              {/* Mobile Courses Accordion */}
              <div>
                <button
                  type="button"
                  onClick={() => setMobileCoursesOpen((prev) => !prev)}
                  className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-slate-200 hover:bg-slate-800/60 text-left font-medium cursor-pointer"
                >
                  <span className="flex items-center gap-2">
                    <Brain className="w-4 h-4 text-blue-400" />
                    Courses & Programs
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 transition-transform duration-200 ${
                      mobileCoursesOpen ? 'rotate-180 text-blue-400' : ''
                    }`}
                  />
                </button>

                {mobileCoursesOpen && (
                  <div className="pl-4 pr-2 py-1.5 space-y-1 bg-slate-900/70 rounded-xl mt-1 border border-slate-800/60">
                    <Link
                      href="/courses"
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center justify-between px-3 py-2 rounded-lg text-xs font-bold text-blue-400 hover:bg-slate-800/80"
                    >
                      <span>Explore All 15+ Courses</span>
                      <ArrowRight className="w-3 h-3" />
                    </Link>
                    {courseCategories.map((cat) => {
                      const IconComp = cat.icon;
                      return (
                        <Link
                          key={cat.slug}
                          href={`/courses?category=${cat.slug}`}
                          onClick={() => setMobileMenuOpen(false)}
                          className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs text-slate-300 hover:text-white hover:bg-slate-800/80"
                        >
                          <IconComp className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                          <div className="flex-1 flex items-center justify-between">
                            <span>{cat.name}</span>
                            <span className="text-[9px] px-1.5 py-0.2 rounded bg-blue-500/20 text-blue-300">
                              {cat.badge}
                            </span>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Mobile Outcomes Accordion */}
              <div>
                <button
                  type="button"
                  onClick={() => setMobileOutcomesOpen((prev) => !prev)}
                  className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-slate-200 hover:bg-slate-800/60 text-left font-medium cursor-pointer"
                >
                  <span className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-emerald-400" />
                    Outcomes & Ecosystem
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 transition-transform duration-200 ${
                      mobileOutcomesOpen ? 'rotate-180 text-emerald-400' : ''
                    }`}
                  />
                </button>

                {mobileOutcomesOpen && (
                  <div className="pl-4 pr-2 py-1.5 space-y-1 bg-slate-900/70 rounded-xl mt-1 border border-slate-800/60">
                    {outcomesSubmenu.map((item) => {
                      const IconComp = item.icon;
                      return (
                        <Link
                          key={item.name}
                          href={item.href}
                          onClick={() => setMobileMenuOpen(false)}
                          className="flex items-start gap-2.5 px-3 py-2 rounded-lg text-xs text-slate-300 hover:text-white hover:bg-slate-800/80 transition-colors"
                        >
                          <IconComp className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                          <div>
                            <div className="font-semibold text-white">{item.name}</div>
                            <div className="text-[10px] text-slate-400 leading-tight">
                              {item.desc}
                            </div>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>

              <Link
                href="/placements"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-lg text-slate-200 hover:bg-slate-800/60"
              >
                Placements & Hiring
              </Link>
              <Link
                href="/blog"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-lg text-slate-200 hover:bg-slate-800/60"
              >
                Tech Blog & Guidance
              </Link>
              <Link
                href="/contact"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-lg text-slate-200 hover:bg-slate-800/60"
              >
                Contact Counselors
              </Link>
              <Link
                href="/certificate"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-lg text-amber-300 font-semibold hover:bg-slate-800/60 flex items-center gap-2"
              >
                <Award className="w-4 h-4 text-amber-400" /> Certificate Verification
              </Link>
              <Link
                href="/admin/login"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-lg text-purple-400 hover:bg-slate-800/60 flex items-center gap-2"
              >
                <Lock className="w-4 h-4" /> Admin Portal
              </Link>
            </nav>

            <div className="pt-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setModalOpen(true);
                }}
                className="w-full py-3 rounded-xl bg-blue-600 text-white font-semibold text-sm flex items-center justify-center gap-2 shadow-lg shadow-blue-500/30 cursor-pointer"
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
