import Link from 'next/link';
import Image from 'next/image';
import { prisma } from '@/lib/prisma';
import HomeClientSection from '@/components/HomeClientSection';
import ThemeToggle from '@/components/ThemeToggle';
import HiringPartnersMarquee from '@/components/HiringPartnersMarquee';
import FacultyMovingChain from '@/components/FacultyMovingChain';
import { getCourseTheme } from '@/lib/courseThemes';
import {
  FadeInUp,
  FadeInLeft,
  FadeInRight,
  ZoomIn,
  RotateIn,
  StaggerContainer,
  StaggerItem,
  MotionCard,
} from '@/components/AnimatedSection';
import {
  Sparkles,
  ArrowRight,
  BookOpen,
  Award,
  Users,
  Building2,
  Calendar,
  CheckCircle2,
  Star,
  Clock,
  ShieldCheck,
  TrendingUp,
  MapPin,
  Laptop,
  Check,
  Briefcase,
  Layers,
  ChevronRight,
  MessageSquare,
  HelpCircle,
} from 'lucide-react';

export const revalidate = 60; // Revalidate every 60 seconds

export default async function HomePage() {
  // Fetch data from database
  const courses = await prisma.course.findMany({
    where: { bestseller: true },
    include: { category: true },
    take: 6,
  });

  const batches = await prisma.batch.findMany({
    include: { course: true },
    take: 4,
  });

  const trainers = await prisma.trainer.findMany({
    take: 4,
  });

  const testimonials = await prisma.testimonial.findMany({
    take: 4,
  });

  const placements = await prisma.placement.findMany({
    take: 4,
  });

  const events = await prisma.event.findMany({
    take: 2,
  });

  return (
    <div className="space-y-24 pb-20 overflow-hidden">
      {/* 1. HERO SECTION */}
      <section className="relative min-h-[85vh] flex items-center pt-6 pb-16">
        {/* Background Image with Overlay — high clarity & contrast */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <Image
            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=2000&q=80"
            alt="Students learning in modern computer lab"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center opacity-40 dark:opacity-30 filter contrast-125 saturate-110 scale-105 transition-all duration-700"
          />
          {/* Dark mode overlays */}
          <div className="dark:block hidden absolute inset-0 bg-gradient-to-t from-[#0b0f19] via-[#0b0f19]/80 to-[#0b0f19]/30" />
          <div className="dark:block hidden absolute inset-0 bg-gradient-to-r from-[#0b0f19] via-[#0b0f19]/70 to-transparent" />
          {/* Light mode overlays */}
          <div className="light:block dark:hidden absolute inset-0 bg-gradient-to-t from-white via-white/80 to-white/30" />
          <div className="light:block dark:hidden absolute inset-0 bg-gradient-to-r from-white via-white/70 to-transparent" />
        </div>

        {/* Hero Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Content Column */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <FadeInLeft delay={0.1}>
                {/* Badge */}
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/15 border border-blue-500/30 text-blue-600 dark:text-blue-400 text-xs font-semibold uppercase tracking-wider pulse-badge shadow-sm backdrop-blur-md">
                  <Sparkles className="w-4 h-4 text-amber-500 dark:text-amber-300" />
                  <span>#1 Rated IT Training Academy in India</span>
                </div>
              </FadeInLeft>

              <FadeInLeft delay={0.2}>
                {/* Main Headline */}
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black dark:text-white text-slate-900 tracking-tight leading-[1.1]">
                  Build Your Career in <br className="hidden sm:inline" />
                  <span className="gradient-text">AI, Software</span> & Digital Technologies
                </h1>
              </FadeInLeft>

              <FadeInLeft delay={0.3}>
                {/* Subheadline */}
                <p className="text-base sm:text-lg dark:text-slate-300 text-slate-700 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal">
                  Master high-demand tech roles with 100% hands-on project labs, expert mentorship from Microsoft & Amazon leads, and guaranteed job placement support.
                </p>
              </FadeInLeft>

              <FadeInLeft delay={0.4}>
                {/* CTAs */}
                <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                  <HomeClientSection mode="demo-btn" buttonText="Book Free Demo Class" />

                  <Link
                    href="/courses"
                    className="w-full sm:w-auto px-7 py-3.5 rounded-xl dark:bg-slate-800/80 bg-white border dark:border-slate-700 border-slate-300 dark:text-white text-slate-800 font-semibold text-sm flex items-center justify-center gap-2 hover:border-blue-500/60 transition-all shadow-lg hover:-translate-y-0.5"
                  >
                    <BookOpen className="w-4 h-4 text-blue-500" />
                    <span>Explore All Courses</span>
                  </Link>
                </div>
              </FadeInLeft>

              <FadeInUp delay={0.5}>
                {/* Trust Badges */}
                <div className="pt-6 border-t dark:border-slate-700/80 border-slate-300/80 grid grid-cols-1 sm:grid-cols-3 gap-4 text-left">
                  <div className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                    <span className="text-xs font-semibold dark:text-slate-300 text-slate-700">100% Hands-on Labs</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                    <span className="text-xs font-semibold dark:text-slate-300 text-slate-700">94% Placement Rate</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                    <span className="text-xs font-semibold dark:text-slate-300 text-slate-700">Live 1-on-1 Mentorship</span>
                  </div>
                </div>
              </FadeInUp>
            </div>

            {/* Right Graphic Column: 3D Transparent Illustration Showcase */}
            <div className="lg:col-span-5 relative flex items-center justify-center w-full">
              <FadeInRight delay={0.3} className="w-full flex justify-center">
                <div className="relative w-full max-w-lg aspect-square rounded-3xl overflow-hidden glass-card border border-blue-500/30 p-2 shadow-2xl group hover:border-blue-500/60 transition-all duration-500 min-h-[320px]">
                  <div className="relative w-full h-full rounded-2xl overflow-hidden bg-gradient-to-br from-slate-900/90 via-indigo-950/80 to-slate-950 flex items-center justify-center">
                    <Image
                      src="/hero-ultra-attractive-tech.png"
                      alt="Next-Gen 3D Tech Academy & AI Lab Illustration"
                      fill
                      priority
                      unoptimized
                      sizes="(max-width: 768px) 100vw, 500px"
                      className="object-cover object-center group-hover:scale-105 transition-transform duration-700 filter drop-shadow-2xl"
                    />
                    {/* Subtle Gradient Glow Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/20 to-transparent" />
                    
                    {/* Floating Trust Badges */}
                    <div className="absolute top-4 left-4 bg-slate-900/90 backdrop-blur-md border border-blue-500/40 text-blue-300 text-xs font-bold px-3 py-1.5 rounded-full shadow-lg flex items-center gap-1.5 animate-bounce-slow">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                      <span>Live ISO Certified Tech Lab</span>
                    </div>

                    <div className="absolute bottom-4 right-4 bg-slate-900/90 backdrop-blur-md border border-amber-500/40 text-amber-300 text-xs font-bold px-3.5 py-1.5 rounded-full shadow-lg flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                      <span>Mentorship by Industry Leads</span>
                    </div>
                  </div>
                </div>
              </FadeInRight>
            </div>

          </div>
        </div>
      </section>

      {/* TOP HIRING COMPANY PARTNERS SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ZoomIn>
          <HiringPartnersMarquee />
        </ZoomIn>
      </section>

      {/* 2. STATS SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeInUp>
          <div className="glass-card rounded-3xl p-8 sm:p-10 border border-blue-500/20 bg-gradient-to-r from-slate-900 via-blue-950/30 to-slate-900 shadow-2xl">
            <StaggerContainer className="grid grid-cols-2 md:grid-cols-4 gap-8 divide-y md:divide-y-0 md:divide-x divide-slate-800">
              <StaggerItem className="text-center space-y-1">
                <div className="text-3xl sm:text-4xl font-extrabold gradient-text">25,000+</div>
                <div className="text-xs sm:text-sm font-medium text-slate-300">Students Trained</div>
                <div className="text-[11px] text-slate-500">Across 18 Tech Domains</div>
              </StaggerItem>

              <StaggerItem className="text-center space-y-1 pt-6 md:pt-0">
                <div className="text-3xl sm:text-4xl font-extrabold gradient-text-cyan">450+</div>
                <div className="text-xs sm:text-sm font-medium text-slate-300">Hiring Partners</div>
                <div className="text-[11px] text-slate-500">MNCs & Fast-growing Startups</div>
              </StaggerItem>

              <StaggerItem className="text-center space-y-1 pt-6 md:pt-0">
                <div className="text-3xl sm:text-4xl font-extrabold text-amber-400">32 LPA</div>
                <div className="text-xs sm:text-sm font-medium text-slate-300">Highest Salary Package</div>
                <div className="text-[11px] text-slate-500">Average 8.5 LPA Package</div>
              </StaggerItem>

              <StaggerItem className="text-center space-y-1 pt-6 md:pt-0">
                <div className="text-3xl sm:text-4xl font-extrabold text-purple-400">12+ Yrs</div>
                <div className="text-xs sm:text-sm font-medium text-slate-300">Academic Excellence</div>
                <div className="text-[11px] text-slate-500">ISO 9001:2015 Certified</div>
              </StaggerItem>
            </StaggerContainer>
          </div>
        </FadeInUp>
      </section>

      {/* ABOUT US SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass-card rounded-3xl p-8 sm:p-12 border border-blue-500/20 bg-gradient-to-br from-slate-900 via-blue-950/40 to-slate-900 shadow-2xl relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center relative z-10">
            <div className="lg:col-span-7 space-y-6">
              <FadeInLeft>
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-600 dark:text-blue-400 text-xs font-semibold uppercase tracking-wider">
                  <Sparkles className="w-4 h-4 text-amber-500 dark:text-amber-300" />
                  <span>Empowering Tech Careers Since 2014</span>
                </div>
                <h2 className="text-3xl sm:text-4xl font-black dark:text-white text-slate-900 tracking-tight leading-tight mt-3">
                  Shaping the Next Generation of <span className="gradient-text">Global Tech Leaders</span>
                </h2>
                <p className="dark:text-slate-300 text-slate-700 text-base sm:text-lg leading-relaxed mt-3">
                  NexGen Tech Academy is a premier IT training and research institute. Founded by software architects and AI researchers, our goal is to bridge the gap between academic education and modern industry demands through immersive project-based learning.
                </p>
                <div className="pt-4 flex flex-wrap items-center gap-4">
                  <HomeClientSection mode="demo-btn" buttonText="Book Campus Visit & Demo" />
                  <Link
                    href="/about"
                    className="px-6 py-3.5 rounded-xl border dark:border-slate-700 border-slate-300 hover:border-blue-500/40 dark:text-white text-slate-800 font-semibold text-sm transition-all"
                  >
                    Explore Academic Programs
                  </Link>
                </div>
              </FadeInLeft>
            </div>

            {/* Reception Photo Column */}
            <div className="lg:col-span-5 relative w-full">
              <FadeInRight className="w-full">
                <MotionCard className="w-full">
                  <div className="relative w-full aspect-[4/3] min-h-[260px] rounded-2xl overflow-hidden border border-blue-500/30 shadow-2xl group">
                    <Image
                      src="/institute-reception.png"
                      alt="NexGen Tech Academy Reception Lobby"
                      fill
                      unoptimized
                      sizes="(max-width: 768px) 100vw, 500px"
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                    <div className="absolute bottom-3 left-3 right-3 bg-slate-900/90 backdrop-blur-md border border-white/10 rounded-xl p-3 text-xs text-slate-200 font-medium flex items-center justify-between shadow-lg">
                      <span className="font-bold text-white">NexGen Tech Academy Flagship Reception</span>
                      <span className="text-emerald-400 font-semibold flex items-center gap-1">
                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                        Live Campus
                      </span>
                    </div>
                  </div>
                </MotionCard>
              </FadeInRight>
            </div>
          </div>
        </div>
      </section>

      {/* 3. FEATURED COURSES SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <FadeInUp>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="space-y-2">
              <div className="text-xs font-bold uppercase tracking-wider text-blue-400 flex items-center gap-1.5">
                <BookOpen className="w-4 h-4" />
                <span>Job-Oriented Curriculum</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                Featured Professional <span className="gradient-text">Courses</span>
              </h2>
              <p className="text-slate-400 text-sm max-w-2xl">
                Industry-aligned programs with hands-on capstone projects, certifications, and dedicated placement support.
              </p>
            </div>

            <Link
              href="/courses"
              className="inline-flex items-center gap-2 text-sm font-semibold text-blue-400 hover:text-blue-300 transition-colors"
            >
              <span>Browse All 15+ Courses</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </FadeInUp>

        {/* Courses Grid */}
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course, idx) => {
            const theme = getCourseTheme(idx);
            return (
              <StaggerItem key={course.id}>
                <MotionCard className="h-full">
                  <div
                    className={`glass-card glass-card-hover rounded-2xl overflow-hidden flex flex-col border ${theme.borderColor} ${theme.bgGradient} ${theme.lightCardBg} shadow-xl ${theme.glowColor} transition-all duration-300 group h-full`}
                  >
                    {/* Image Hero */}
                    <div className="relative h-48 w-full bg-slate-800 overflow-hidden">
                      <Image
                        src={course.heroImage}
                        alt={course.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
                      <div className="absolute top-3 left-3 flex items-center gap-2">
                        <span className={`px-2.5 py-1 rounded-md ${theme.badgeBg} ${theme.badgeText} font-semibold text-[11px] shadow-sm`}>
                          {course.category.name}
                        </span>
                        {course.bestseller && (
                          <span className="px-2.5 py-1 rounded-md bg-amber-500 text-slate-950 font-extrabold text-[11px] uppercase tracking-wider shadow-sm">
                            Bestseller
                          </span>
                        )}
                      </div>
                      <div className="absolute bottom-3 right-3 bg-slate-900/90 backdrop-blur-sm px-2.5 py-1 rounded-md text-amber-400 text-xs font-bold flex items-center gap-1">
                        <Star className="w-3.5 h-3.5 fill-amber-400" />
                        <span>{course.rating}</span>
                        <span className="text-slate-400 text-[10px]">({course.ratingsCount})</span>
                      </div>
                    </div>

                    {/* Details */}
                    <div className="p-6 flex-1 flex flex-col justify-between space-y-5">
                      <div className="space-y-2">
                        <h3 className="text-lg font-bold dark:text-white text-slate-900 line-clamp-2 leading-snug group-hover:text-blue-500 transition-colors">
                          {course.title}
                        </h3>
                        <p className="dark:text-slate-400 text-slate-600 text-xs line-clamp-2 leading-relaxed">
                          {course.tagline}
                        </p>
                      </div>

                      {/* Course Meta Pills */}
                      <div className="grid grid-cols-2 gap-2 text-xs dark:text-slate-300 text-slate-700 pt-2 border-t dark:border-slate-800/80 border-slate-300/80">
                        <div className="flex items-center gap-1.5">
                          <Clock className={`w-4 h-4 ${theme.accentIconColor}`} />
                          <span>{course.duration}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Laptop className="w-4 h-4 text-purple-500" />
                          <span>{course.mode}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Layers className="w-4 h-4 text-emerald-500" />
                          <span>{course.level}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Users className="w-4 h-4 text-amber-500" />
                          <span>{course.enrolledStudents}+ Enrolled</span>
                        </div>
                      </div>

                      {/* Fees & CTA */}
                      <div className="pt-4 border-t dark:border-slate-800/80 border-slate-300/80 flex items-center justify-between gap-3">
                        <div>
                          <div className="text-[10px] dark:text-slate-400 text-slate-600 uppercase tracking-wider font-semibold">Course Fee</div>
                          <div className="flex items-baseline gap-2">
                            <span className="text-lg font-black dark:text-white text-slate-900">₹{course.fees.toLocaleString()}</span>
                            <span className="text-xs text-slate-500 line-through">₹{course.originalFees.toLocaleString()}</span>
                          </div>
                        </div>

                        <Link
                          href={`/courses/${course.slug}`}
                          className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs transition-all shadow-md shadow-blue-600/20 flex items-center gap-1"
                        >
                          <span>View Details</span>
                          <ChevronRight className="w-3.5 h-3.5" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </MotionCard>
              </StaggerItem>
            );
          })}
        </StaggerContainer>
      </section>

      {/* 4. UPCOMING BATCHES SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <FadeInUp>
          <div className="text-center space-y-2 max-w-2xl mx-auto">
            <div className="text-xs font-bold uppercase tracking-wider text-purple-400 flex items-center justify-center gap-1.5">
              <Calendar className="w-4 h-4" />
              <span>Live Class Timings</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
              Upcoming Classroom & Online <span className="gradient-text">Batches</span>
            </h2>
            <p className="text-slate-400 text-sm">
              Flexible morning, evening, and weekend batches designed for college students and working professionals.
            </p>
          </div>
        </FadeInUp>

        {/* Batches Table / Grid */}
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {batches.map((batch) => (
            <StaggerItem key={batch.id}>
              <MotionCard>
                <div className="glass-card rounded-2xl p-6 border border-slate-800 space-y-4 hover:border-purple-500/40 transition-all">
                  <div className="flex items-start justify-between gap-2">
                    <span className="text-xs font-bold px-3 py-1 rounded-full bg-slate-800 text-blue-400 border border-slate-700">
                      {batch.course.title.split(' ')[0]} {batch.course.title.split(' ')[1]}
                    </span>
                    <span className="text-[11px] font-extrabold px-2.5 py-0.5 rounded-md bg-amber-500/20 text-amber-300 border border-amber-500/30">
                      {batch.status}
                    </span>
                  </div>

                  <h4 className="font-bold text-white text-base line-clamp-1">{batch.course.title}</h4>

                  <div className="space-y-2 text-xs text-slate-300 pt-2 border-t border-slate-800">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-purple-400" />
                      <span className="font-semibold text-white">Start Date:</span>
                      <span>{batch.startDate}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-blue-400" />
                      <span className="font-semibold text-white">Batch Timing:</span>
                      <span>{batch.timing}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Laptop className="w-4 h-4 text-emerald-400" />
                      <span className="font-semibold text-white">Mode:</span>
                      <span>{batch.mode}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-amber-400" />
                      <span className="font-semibold text-white">Location:</span>
                      <span className="line-clamp-1">{batch.campusLocation}</span>
                    </div>
                  </div>

                  <div className="pt-2 flex items-center justify-between gap-3">
                    <div className="text-[11px] text-emerald-400 font-semibold flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Only {batch.seatsAvailable} Seats Left</span>
                    </div>

                    <HomeClientSection
                      mode="batch-btn"
                      courseSlug={batch.course.slug}
                      courseName={batch.course.title}
                    />
                  </div>
                </div>
              </MotionCard>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </section>

      {/* 5. PLACEMENT HIGHLIGHTS & SALARY RECORDS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <ZoomIn>
          <div className="glass-card rounded-3xl p-8 sm:p-12 border border-emerald-500/20 bg-gradient-to-br from-slate-900 via-emerald-950/20 to-slate-900">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              <div className="lg:col-span-5 space-y-5 text-center lg:text-left">
                <div className="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center justify-center lg:justify-start gap-1.5">
                  <TrendingUp className="w-4 h-4" />
                  <span>360° Placement Support</span>
                </div>
                <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                  Our Alumni Work at <br className="hidden sm:inline" />
                  <span className="gradient-text-cyan">Top Global Companies</span>
                </h2>
                <p className="text-slate-300 text-sm leading-relaxed">
                  From resume building to technical mock interviews and exclusive recruitment drives, our dedicated career cell ensures zero-friction transitions into top tech MNCs.
                </p>

                <div className="pt-2 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                  <Link
                    href="/placements"
                    className="px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-sm transition-all shadow-lg shadow-emerald-600/30 flex items-center justify-center gap-2"
                  >
                    <span>View Full Placement Gallery</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>

              {/* Placements Cards Grid */}
              <StaggerContainer className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
                {placements.map((p) => (
                  <StaggerItem key={p.id}>
                    <MotionCard>
                      <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-3">
                        <div className="flex items-center gap-3">
                          <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-emerald-400/40 shrink-0">
                            <Image src={p.studentPhoto} alt={p.studentName} fill className="object-cover" />
                          </div>
                          <div>
                            <h4 className="font-bold text-white text-sm">{p.studentName}</h4>
                            <p className="text-slate-400 text-xs line-clamp-1">{p.courseTaken}</p>
                          </div>
                        </div>

                        <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-xs">
                          <div>
                            <span className="text-slate-400 block text-[10px]">Hired Role</span>
                            <span className="font-bold text-slate-200">{p.roleAssigned}</span>
                          </div>
                          <div className="text-right">
                            <span className="text-slate-400 block text-[10px]">Package</span>
                            <span className="font-extrabold text-emerald-400 text-sm">{p.packageLpa}</span>
                          </div>
                        </div>

                        <div className="p-2 rounded-lg bg-slate-950 flex items-center justify-between text-xs text-slate-300">
                          <span className="font-semibold text-slate-400">Company:</span>
                          <span className="font-bold text-white">{p.companyName}</span>
                        </div>
                      </div>
                    </MotionCard>
                  </StaggerItem>
                ))}
              </StaggerContainer>
            </div>
          </div>
        </ZoomIn>
      </section>

      {/* 6. WHY CHOOSE US / METHODOLOGY */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <FadeInUp>
          <div className="text-center space-y-2 max-w-2xl mx-auto">
            <div className="text-xs font-bold uppercase tracking-wider text-blue-400">Why NexGen Tech Academy</div>
            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
              Designed for Real-World <span className="gradient-text">Mastery</span>
            </h2>
            <p className="text-slate-400 text-sm">
              Unlike theoretical tutorials, we focus on industry-grade engineering environments.
            </p>
          </div>
        </FadeInUp>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <StaggerItem>
            <MotionCard className="h-full">
              <div className="glass-card rounded-2xl p-8 border border-slate-800 space-y-4 hover:border-blue-500/40 transition-all h-full">
                <div className="w-12 h-12 rounded-xl bg-blue-600/20 text-blue-400 flex items-center justify-center font-bold text-xl border border-blue-500/30">
                  <Laptop className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-white">Live Industry GPU Labs</h3>
                <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
                  Access high-performance NVIDIA GPU clusters for AI model training, dedicated Cisco server racks, and Mac workstations.
                </p>
              </div>
            </MotionCard>
          </StaggerItem>

          <StaggerItem>
            <MotionCard className="h-full">
              <div className="glass-card rounded-2xl p-8 border border-slate-800 space-y-4 hover:border-purple-500/40 transition-all h-full">
                <div className="w-12 h-12 rounded-xl bg-purple-600/20 text-purple-400 flex items-center justify-center font-bold text-xl border border-purple-500/30">
                  <Users className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-white">1-on-1 Senior Mentorship</h3>
                <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
                  Get personalized code reviews, architectural guidance, and career planning directly from practicing leads at top tech firms.
                </p>
              </div>
            </MotionCard>
          </StaggerItem>

          <StaggerItem>
            <MotionCard className="h-full">
              <div className="glass-card rounded-2xl p-8 border border-slate-800 space-y-4 hover:border-emerald-500/40 transition-all h-full">
                <div className="w-12 h-12 rounded-xl bg-emerald-600/20 text-emerald-400 flex items-center justify-center font-bold text-xl border border-emerald-500/30">
                  <Briefcase className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-white">Guaranteed Job Referrals</h3>
                <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
                  Exclusive campus hiring drives, direct HR introductions, and mock interviews with real hiring managers.
                </p>
              </div>
            </MotionCard>
          </StaggerItem>
        </StaggerContainer>
      </section>

      {/* WORLD-CLASS FACULTY MOVING CHAIN SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <FadeInUp>
          <div className="text-center space-y-2 max-w-2xl mx-auto">
            <div className="text-xs font-bold uppercase tracking-wider text-blue-400">World-Class Faculty</div>
            <h2 className="text-3xl sm:text-4xl font-black dark:text-white text-slate-900 tracking-tight">
              Learn from <span className="gradient-text">Industry Leaders</span>
            </h2>
            <p className="dark:text-slate-400 text-slate-600 text-xs sm:text-sm">
              Our mentors bring decades of real enterprise engineering experience from Fortune 500 tech companies.
            </p>
          </div>
        </FadeInUp>

        <ZoomIn>
          <FacultyMovingChain trainers={trainers} />
        </ZoomIn>
      </section>

      {/* 7. REAL STUDENT TESTIMONIALS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <FadeInUp>
          <div className="text-center space-y-2 max-w-2xl mx-auto">
            <div className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center justify-center gap-1.5">
              <MessageSquare className="w-4 h-4" />
              <span>Success Stories</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
              Hear from Our <span className="gradient-text-amber">Transformed Alumni</span>
            </h2>
          </div>
        </FadeInUp>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map((t) => (
            <StaggerItem key={t.id}>
              <MotionCard className="h-full">
                <div className="glass-card rounded-2xl p-8 border border-slate-800 space-y-4 flex flex-col justify-between h-full">
                  <div className="space-y-3">
                    <div className="flex items-center gap-1 text-amber-400">
                      {[...Array(t.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-amber-400" />
                      ))}
                    </div>
                    <p className="text-slate-300 text-sm italic leading-relaxed font-normal">
                      &ldquo;{t.quote}&rdquo;
                    </p>
                  </div>

                  <div className="pt-4 border-t border-slate-800 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-blue-400/40 shrink-0">
                        <Image src={t.photo} alt={t.studentName} fill className="object-cover" />
                      </div>
                      <div>
                        <h4 className="font-bold text-white text-sm">{t.studentName}</h4>
                        <p className="text-xs text-blue-400 font-semibold">{t.currentRole} @ {t.company}</p>
                        <p className="text-[11px] text-slate-500">Ex-{t.previousRole}</p>
                      </div>
                    </div>

                    <div className="px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-bold text-xs shrink-0">
                      {t.salaryHike}
                    </div>
                  </div>
                </div>
              </MotionCard>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </section>

      {/* 8. HIRING PARTNER LOGOS STRIP */}
      <section className="border-y border-slate-800/80 bg-slate-950/60 py-10">
        <ZoomIn>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
            <p className="text-xs font-semibold uppercase tracking-widest text-slate-400">
              Top Hiring Partners Recruiting Our Graduates
            </p>
            <div className="flex flex-wrap items-center justify-center gap-8 md:gap-14 opacity-75 grayscale hover:grayscale-0 transition-all">
              <span className="text-lg font-black tracking-tighter text-white">MICROSOFT</span>
              <span className="text-lg font-black tracking-tighter text-blue-400">AMAZON</span>
              <span className="text-lg font-black tracking-tighter text-emerald-400">ORACLE</span>
              <span className="text-lg font-black tracking-tighter text-purple-400">ATLASSIAN</span>
              <span className="text-lg font-black tracking-tighter text-amber-400">DELOITTE</span>
              <span className="text-lg font-black tracking-tighter text-rose-400">SWIGGY</span>
              <span className="text-lg font-black tracking-tighter text-cyan-400">FLIPKART</span>
            </div>
          </div>
        </ZoomIn>
      </section>

      {/* 9. UPCOMING EVENTS & MASTERCLASSES PREVIEW */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <FadeInUp>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="space-y-2">
              <div className="text-xs font-bold uppercase tracking-wider text-cyan-400">Free Tech Workshops</div>
              <h2 className="text-3xl font-black text-white tracking-tight">
                Upcoming Live Masterclasses
              </h2>
            </div>
          </div>
        </FadeInUp>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {events.map((ev) => (
            <StaggerItem key={ev.id}>
              <MotionCard className="h-full">
                <div className="glass-card rounded-2xl p-6 border border-slate-800 flex flex-col justify-between space-y-4 h-full">
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-1 rounded-md bg-cyan-500/20 text-cyan-300 font-semibold text-xs">
                        {ev.mode}
                      </span>
                      <span className="text-xs text-slate-400">{ev.category}</span>
                    </div>
                    <h3 className="text-xl font-bold text-white leading-snug">{ev.title}</h3>
                    <div className="flex items-center gap-4 text-xs text-slate-300">
                      <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5 text-blue-400" /> {ev.eventDate}</span>
                      <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5 text-purple-400" /> {ev.eventTime}</span>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
                    <div>
                      <span className="text-xs font-bold text-white block">{ev.speakerName}</span>
                      <span className="text-[11px] text-slate-400">{ev.speakerRole}</span>
                    </div>

                    <HomeClientSection mode="event-btn" />
                  </div>
                </div>
              </MotionCard>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </section>

      {/* 10. CAMPUS LOCATION PREVIEW & MAP */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass-card rounded-3xl p-8 sm:p-12 border border-slate-800 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-6 space-y-6">
            <FadeInLeft>
              <div className="text-xs font-bold uppercase tracking-wider text-blue-400 flex items-center gap-1.5">
                <MapPin className="w-4 h-4" />
                <span>State-of-the-Art Infrastructure</span>
              </div>
              <h2 className="text-3xl font-black text-white tracking-tight mt-2">
                Visit Our Tech Campuses
              </h2>
              <p className="text-slate-300 text-sm leading-relaxed mt-2">
                Experience modern computer labs, GPU server rooms, high-speed Wi-Fi, collaborative project hubs, and cafeteria spaces designed for immersive learning.
              </p>

              <div className="space-y-4 pt-4">
                <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 space-y-1">
                  <h4 className="font-bold text-white text-sm">Main Campus - Tech Park</h4>
                  <p className="text-xs text-slate-400">Building 4B, Cybercity Tech Park, Hitec Phase 2, Hyderabad</p>
                  <p className="text-xs text-blue-400 font-medium">Timings: Mon - Sun (8:00 AM - 9:00 PM)</p>
                </div>

                <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 space-y-1">
                  <h4 className="font-bold text-white text-sm">Branch Campus - Innovation Hub</h4>
                  <p className="text-xs text-slate-400">Outer Ring Road, Marathahalli Tech Zone, Bengaluru</p>
                  <p className="text-xs text-purple-400 font-medium">Timings: Mon - Sun (8:00 AM - 9:00 PM)</p>
                </div>
              </div>
            </FadeInLeft>
          </div>

          <div className="lg:col-span-6 h-80 rounded-2xl overflow-hidden relative border border-slate-700 shadow-2xl bg-slate-900">
            <FadeInRight>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3806.311746764516!2d78.3758!3d17.4474!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb93dc8c5d69df%3A0x19688beb557ef0d9!2sHITEC%20City%2C%20Hyderabad%2C%20Telangana!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                width="100%"
                height="320"
                style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg)' }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Campus Map Location"
              />
            </FadeInRight>
          </div>
        </div>
      </section>
    </div>
  );
}
