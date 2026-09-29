import Link from 'next/link';
import Image from 'next/image';
import { prisma } from '@/lib/prisma';
import HomeClientSection from '@/components/HomeClientSection';
import EventClientSection from '@/components/EventClientSection';
import ThemeToggle from '@/components/ThemeToggle';
import HiringPartnersMarquee from '@/components/HiringPartnersMarquee';
import FacultyMovingChain from '@/components/FacultyMovingChain';
import InteractiveCertificate from '@/components/InteractiveCertificate';
import InstituteCollageWheel from '@/components/InstituteCollageWheel';
import SimpleStatsBar from '@/components/SimpleStatsBar';
import MovingPlacementsRow from '@/components/MovingPlacementsRow';
import HeroDynamicHeadline from '@/components/HeroDynamicHeadline';
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
  TiltCard,
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
    orderBy: { packageLpa: 'desc' },
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
      <section className="relative min-h-[85vh] sm:min-h-[90vh] flex items-center pt-10 pb-20 overflow-hidden">
        {/* Real Students Lab Background Image - fully visible */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <Image
            src="/hero-real-students-bg.jpg"
            alt="Real Students Learning in Modern IT Computer Lab"
            fill
            priority
            sizes="100vw"
            className="object-cover object-[75%_center] lg:object-right scale-100"
          />
          {/* Directional gradient on the left text area only — right side has ZERO overlay for 100% clear photographic visibility */}
          <div className="dark:block hidden w-full md:w-3/4 lg:w-3/5 absolute inset-y-0 left-0 bg-gradient-to-r from-slate-950 via-slate-950/85 to-transparent z-[1]" />
          <div className="dark:hidden w-full md:w-3/4 lg:w-3/5 absolute inset-y-0 left-0 bg-gradient-to-r from-white via-white/85 to-transparent z-[1]" />
          
          {/* Subtle bottom edge transition */}
          <div className="absolute bottom-0 inset-x-0 h-16 bg-gradient-to-t from-white dark:from-slate-950 to-transparent z-[1] pointer-events-none" />
        </div>

        {/* Hero Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <div className="max-w-2xl lg:max-w-3xl space-y-6 text-left">
            <FadeInLeft delay={0.1}>
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/15 border border-blue-500/30 text-blue-600 dark:text-blue-400 text-xs font-semibold uppercase tracking-wider pulse-badge shadow-sm backdrop-blur-md">
                <Sparkles className="w-4 h-4 text-amber-500 dark:text-amber-300" />
                <span>#1 Rated IT Training Academy in India</span>
              </div>
            </FadeInLeft>

            <FadeInLeft delay={0.2}>
              <HeroDynamicHeadline />
            </FadeInLeft>

            <FadeInLeft delay={0.3}>
              {/* Subheadline */}
              <p className="text-base sm:text-lg dark:text-slate-300 text-slate-700 max-w-2xl leading-relaxed font-normal">
                Master high-demand tech roles with 100% hands-on project labs, expert mentorship from Microsoft & Amazon leads, and guaranteed job placement support.
              </p>
            </FadeInLeft>

            <FadeInLeft delay={0.4}>
              {/* CTAs */}
              <div className="flex flex-col sm:flex-row items-center justify-start gap-4 pt-2">
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
        </div>
      </section>

      {/* 2. SIMPLE STATS SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2">
        <SimpleStatsBar />
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
                <TiltCard className="h-full">
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
                </TiltCard>
              </StaggerItem>
            );
          })}
        </StaggerContainer>
      </section>

      {/* 5. PLACEMENT HIGHLIGHTS (SINGLE ROW MOVING IN-LINE EFFECT) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <MovingPlacementsRow placements={placements} />
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
                      <span className="text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        {batch.seatsAvailable} Seats Left
                      </span>
                      <Link
                        href={`/enroll?course=${batch.course?.slug || ''}`}
                        className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold text-xs shadow-md shadow-purple-600/20 inline-flex items-center gap-1 transition-all"
                      >
                        <span>Book My Seat</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </Link>
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
                          <EventClientSection
                            eventId={ev.id}
                            eventTitle={ev.title}
                            eventDate={ev.eventDate}
                            eventTime={ev.eventTime}
                            venue={ev.venue}
                            slug={ev.slug}
                          />
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
