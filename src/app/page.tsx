import Link from 'next/link';
import Image from 'next/image';
import { prisma } from '@/lib/prisma';
import HomeClientSection from '@/components/HomeClientSection';
import ThemeToggle from '@/components/ThemeToggle';
import HiringPartnersMarquee from '@/components/HiringPartnersMarquee';
import FacultyMovingChain from '@/components/FacultyMovingChain';
import InteractiveCertificate from '@/components/InteractiveCertificate';
import InstituteCollageWheel from '@/components/InstituteCollageWheel';
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
    take: 4,
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
    take: 3,
  });

  const campuses = await prisma.campus.findMany({
    take: 3,
  });

  const blogPosts = await prisma.blogPost.findMany({
    take: 3,
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
                      src="/hero-realistic-students.png"
                      alt="NexGen Tech Academy Real Student Coding Session"
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

      {/* TOP HIRING COMPANY PARTNERS SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ZoomIn>
          <HiringPartnersMarquee />
        </ZoomIn>
      </section>


      {/* 3. REAL CAMPUS LIFE COLLAGE WHEEL */}
      <InstituteCollageWheel />

      {/* 4. FEATURED COURSES SECTION */}
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

        {/* Courses Grid - Compressed to fit 4 in a line with Hover Zoom Effect */}
        <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {courses.map((course, idx) => {
            const theme = getCourseTheme(idx);
            return (
              <StaggerItem key={course.id}>
                <MotionCard hoverScale={1.05} hoverY={-8} className="h-full">
                  <div
                    className={`glass-card glass-card-hover rounded-2xl overflow-hidden flex flex-col border ${theme.borderColor} ${theme.bgGradient} ${theme.lightCardBg} shadow-xl ${theme.glowColor} transition-all duration-300 group h-full hover:shadow-2xl hover:border-blue-500/50`}
                  >
                    {/* Image Hero - Compact Height with Image Zoom */}
                    <div className="relative h-36 sm:h-40 w-full bg-slate-800 overflow-hidden">
                      <Image
                        src={course.heroImage}
                        alt={course.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
                      <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5">
                        <span className={`px-2 py-0.5 rounded-md ${theme.badgeBg} ${theme.badgeText} font-semibold text-[10px] shadow-sm`}>
                          {course.category.name}
                        </span>
                        {course.bestseller && (
                          <span className="px-2 py-0.5 rounded-md bg-amber-500 text-slate-950 font-extrabold text-[10px] uppercase tracking-wider shadow-sm">
                            Bestseller
                          </span>
                        )}
                      </div>
                      <div className="absolute bottom-2.5 right-2.5 bg-slate-900/90 backdrop-blur-sm px-2 py-0.5 rounded-md text-amber-400 text-[11px] font-bold flex items-center gap-1">
                        <Star className="w-3 h-3 fill-amber-400" />
                        <span>{course.rating}</span>
                        <span className="text-slate-400 text-[9px]">({course.ratingsCount})</span>
                      </div>
                    </div>

                    {/* Details - Compressed Padding */}
                    <div className="p-4 flex-1 flex flex-col justify-between space-y-3.5">
                      <div className="space-y-1.5">
                        <h3 className="text-sm font-extrabold dark:text-white text-slate-900 line-clamp-2 leading-tight group-hover:text-blue-400 transition-colors">
                          {course.title}
                        </h3>
                        <p className="dark:text-slate-400 text-slate-600 text-[11px] line-clamp-2 leading-snug">
                          {course.tagline}
                        </p>
                      </div>

                      {/* Course Meta Pills */}
                      <div className="grid grid-cols-2 gap-1.5 text-[11px] dark:text-slate-300 text-slate-700 pt-2 border-t dark:border-slate-800/80 border-slate-300/80">
                        <div className="flex items-center gap-1">
                          <Clock className={`w-3.5 h-3.5 ${theme.accentIconColor}`} />
                          <span className="truncate">{course.duration}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Laptop className="w-3.5 h-3.5 text-purple-500" />
                          <span className="truncate">{course.mode}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Layers className="w-3.5 h-3.5 text-emerald-500" />
                          <span className="truncate">{course.level}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Users className="w-3.5 h-3.5 text-amber-500" />
                          <span className="truncate">{course.enrolledStudents}+ Enrolled</span>
                        </div>
                      </div>

                      {/* Fees & CTA */}
                      <div className="pt-2.5 border-t dark:border-slate-800/80 border-slate-300/80 flex items-center justify-between gap-2">
                        <div>
                          <div className="text-[9px] dark:text-slate-400 text-slate-600 uppercase tracking-wider font-semibold">Course Fee</div>
                          <div className="flex items-baseline gap-1.5">
                            <span className="text-base font-black dark:text-white text-slate-900">₹{course.fees.toLocaleString()}</span>
                            <span className="text-[10px] text-slate-500 line-through">₹{course.originalFees.toLocaleString()}</span>
                          </div>
                        </div>

                        <Link
                          href={`/courses/${course.slug}`}
                          className="px-3 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-[11px] transition-all shadow-md shadow-blue-600/20 flex items-center gap-1 shrink-0"
                        >
                          <span>View Details</span>
                          <ChevronRight className="w-3 h-3" />
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

      {/* OFFICIAL INTERACTIVE NSDC CERTIFICATE PREVIEW */}
      <InteractiveCertificate />

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

      {/* 9. ACADEMY OUTCOMES & ECOSYSTEM (SUBSECTIONS: EVENTS, CAMPUSES, BLOGS) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Main Section Header */}
        <FadeInUp>
          <div className="text-center space-y-3 max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold uppercase tracking-wider">
              <TrendingUp className="w-4 h-4 text-emerald-400" />
              <span>Academy Outcomes & Ecosystem</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black dark:text-white text-slate-900 tracking-tight">
              Real Impact & <span className="gradient-text">Tech Ecosystem</span>
            </h2>
            <p className="dark:text-slate-300 text-slate-600 text-sm sm:text-base leading-relaxed">
              Explore our live technical workshops, state-of-the-art GPU lab campuses, and engineering research publications.
            </p>
          </div>
        </FadeInUp>

        {/* SUBSECTION 1: UPCOMING BATCHES (BATCHES) */}
        <div className="space-y-6">
          <div className="flex items-center justify-between border-b dark:border-slate-800 border-slate-200 pb-4">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-purple-500/10 text-purple-400">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xl font-bold dark:text-white text-slate-900">Subsection 1: Upcoming Cohort Batches</h3>
                <p className="text-xs dark:text-slate-400 text-slate-500">Flexible morning, evening, and weekend live batches</p>
              </div>
            </div>
            <Link href="/batches" className="text-xs font-bold text-purple-400 hover:text-purple-300 flex items-center gap-1">
              <span>View All Batches</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {batches.map((batch) => (
              <StaggerItem key={batch.id}>
                <MotionCard className="h-full">
                  <div className="glass-card rounded-2xl p-5 border dark:border-slate-800 border-slate-200 space-y-4 hover:border-purple-500/40 transition-all flex flex-col justify-between h-full">
                    <div className="space-y-3">
                      <div className="flex items-start justify-between gap-2">
                        <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20">
                          {batch.mode}
                        </span>
                        <span className="text-[10px] font-extrabold px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                          {batch.status}
                        </span>
                      </div>

                      <h4 className="font-bold dark:text-white text-slate-900 text-sm line-clamp-1">{batch.course?.title || 'Tech Specialization'}</h4>

                      <div className="space-y-2 text-xs text-slate-300 pt-2 border-t dark:border-slate-800/80 border-slate-200">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-3.5 h-3.5 text-purple-400" />
                          <span className="font-semibold dark:text-white text-slate-800">Start Date:</span>
                          <span className="dark:text-slate-300 text-slate-600">{batch.startDate}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="w-3.5 h-3.5 text-blue-400" />
                          <span className="font-semibold dark:text-white text-slate-800">Timing:</span>
                          <span className="dark:text-slate-300 text-slate-600">{batch.timing}</span>
                        </div>
                      </div>
                    </div>

                    <div className="pt-3 border-t dark:border-slate-800 border-slate-200 flex items-center justify-between text-xs">
                      <span className="text-emerald-400 font-bold">{batch.seatsAvailable} Seats Left</span>
                      <HomeClientSection mode="event-btn" />
                    </div>
                  </div>
                </MotionCard>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>

        {/* SUBSECTION 2: LIVE WORKSHOPS & MASTERCLASSES (EVENTS) */}
        <div className="space-y-6">
          <div className="flex items-center justify-between border-b dark:border-slate-800 border-slate-200 pb-4">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-cyan-500/10 text-cyan-400">
                <Calendar className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xl font-bold dark:text-white text-slate-900">Subsection 2: Live Workshops & Masterclasses</h3>
                <p className="text-xs dark:text-slate-400 text-slate-500">Interactive live coding, RAG pipelines, and cloud architecture sessions</p>
              </div>
            </div>
            <Link href="/events" className="text-xs font-bold text-cyan-400 hover:text-cyan-300 flex items-center gap-1">
              <span>View All Events</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {events.map((ev) => (
              <StaggerItem key={ev.id}>
                <MotionCard className="h-full">
                  <div className="glass-card rounded-2xl overflow-hidden border dark:border-slate-800 border-slate-200 flex flex-col justify-between hover:border-cyan-500/40 transition-all h-full group">
                    {/* Event Banner Image */}
                    <div className="relative h-48 w-full bg-slate-800 overflow-hidden">
                      <Image 
                        src={ev.bannerImage || 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=1200&q=80'} 
                        alt={ev.title} 
                        fill 
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-500" 
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
                      <div className="absolute top-3 left-3 flex items-center gap-2">
                        <span className="px-2.5 py-1 rounded-md bg-cyan-600/90 text-white font-bold text-[11px] uppercase tracking-wide shadow-sm">
                          {ev.category}
                        </span>
                        <span className="px-2.5 py-1 rounded-md bg-slate-900/90 text-amber-300 font-bold text-[11px] shadow-sm">
                          {ev.mode}
                        </span>
                      </div>
                      <div className="absolute bottom-3 right-3 bg-slate-900/90 px-2.5 py-1 rounded-md text-emerald-400 text-xs font-bold flex items-center gap-1 border border-slate-800 shadow-md">
                        <Users className="w-3.5 h-3.5" />
                        <span>{ev.registrationsCount}+ Registered</span>
                      </div>
                    </div>

                    <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
                      <div className="space-y-2">
                        <h4 className="text-base font-bold dark:text-white text-slate-900 leading-snug line-clamp-2">{ev.title}</h4>
                        <p className="text-xs dark:text-slate-400 text-slate-600 line-clamp-2">{ev.tagline}</p>
                      </div>

                      <div className="space-y-3 pt-3 border-t dark:border-slate-800/80 border-slate-200">
                        <div className="flex flex-wrap items-center justify-between gap-2 text-xs dark:text-slate-300 text-slate-600">
                          <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5 text-blue-400" /> {ev.eventDate}</span>
                          <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5 text-purple-400" /> {ev.eventTime}</span>
                        </div>

                        <div className="flex items-center justify-between pt-1">
                          <div className="flex items-center gap-2">
                            <div className="relative w-8 h-8 rounded-full overflow-hidden border border-slate-700">
                              <Image src={ev.speakerPhoto} alt={ev.speakerName} fill className="object-cover" />
                            </div>
                            <div>
                              <span className="text-xs font-bold dark:text-white text-slate-900 block">{ev.speakerName}</span>
                              <span className="text-[10px] dark:text-slate-400 text-slate-500 block line-clamp-1">{ev.speakerRole}</span>
                            </div>
                          </div>
                          <HomeClientSection mode="event-btn" />
                        </div>
                      </div>
                    </div>
                  </div>
                </MotionCard>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>

        {/* SUBSECTION 3: INNOVATION TECH CAMPUSES (CAMPUSES) */}
        <div className="space-y-6">
          <div className="flex items-center justify-between border-b dark:border-slate-800 border-slate-200 pb-4">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-blue-500/10 text-blue-400">
                <Building2 className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xl font-bold dark:text-white text-slate-900">Subsection 3: Innovation Tech Campuses</h3>
                <p className="text-xs dark:text-slate-400 text-slate-500">NVIDIA GPU server rooms, high-speed Wi-Fi, and 24/7 collaborative labs</p>
              </div>
            </div>
            <Link href="/campuses" className="text-xs font-bold text-blue-400 hover:text-blue-300 flex items-center gap-1">
              <span>View All Campuses</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {campuses.map((campus) => (
              <StaggerItem key={campus.id}>
                <MotionCard className="h-full">
                  <div className="glass-card rounded-2xl overflow-hidden border dark:border-slate-800 border-slate-200 space-y-4 hover:border-blue-500/40 transition-all h-full group">
                    <div className="relative h-44 w-full bg-slate-800 overflow-hidden">
                      <Image 
                        src={campus.coverImage || 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80'} 
                        alt={campus.name} 
                        fill 
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-500" 
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent" />
                      <span className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-blue-600/90 text-white font-bold text-xs shadow-sm">
                        {campus.city}
                      </span>
                    </div>

                    <div className="p-5 pt-0 space-y-3">
                      <h4 className="font-bold dark:text-white text-slate-900 text-base">{campus.name}</h4>
                      <p className="text-xs dark:text-slate-400 text-slate-600 flex items-start gap-1">
                        <MapPin className="w-3.5 h-3.5 text-blue-400 shrink-0 mt-0.5" />
                        <span>{campus.address}</span>
                      </p>
                      <div className="pt-2 border-t dark:border-slate-800 border-slate-200 flex items-center justify-between text-xs">
                        <span className="dark:text-slate-400 text-slate-500">Timings:</span>
                        <span className="font-bold dark:text-white text-slate-900">{campus.workingHours}</span>
                      </div>
                    </div>
                  </div>
                </MotionCard>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>

      </section>

    </div>
  );
}
