import Link from 'next/link';
import Image from 'next/image';
import { prisma } from '@/lib/prisma';
import HomeClientSection from '@/components/HomeClientSection';
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

  const trainers = await prisma.trainer.findMany({
    take: 4,
  });

  const testimonials = await prisma.testimonial.findMany({
    take: 4,
  });

  const placements = await prisma.placement.findMany({
    orderBy: { packageLpa: 'desc' },
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
      <section className="relative w-full py-20 px-4 sm:px-6 lg:px-8 bg-[#dbeafe] dark:bg-[#0c182b] overflow-hidden">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-400/20 dark:bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-7xl mx-auto space-y-10 relative z-10">
          <FadeInUp>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div className="space-y-2">
                <div className="text-xs font-black uppercase tracking-wider text-blue-700 dark:text-blue-400 flex items-center gap-1.5">
                  <BookOpen className="w-4 h-4 text-blue-700 dark:text-blue-400" />
                  <span>Job-Oriented Curriculum</span>
                </div>
                <h2 className="text-3xl sm:text-4xl font-black text-slate-950 dark:text-white tracking-tight">
                  Featured Professional <span className="gradient-text">Courses</span>
                </h2>
                <p className="text-slate-700 dark:text-slate-300 text-sm max-w-2xl font-medium">
                  Industry-aligned programs with hands-on capstone projects, certifications, and dedicated placement support.
                </p>
              </div>

              <Link
                href="/courses"
                className="inline-flex items-center gap-2 text-sm font-bold text-blue-700 dark:text-blue-400 hover:text-blue-900 dark:hover:text-blue-300 transition-colors"
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
                          <h3 className="text-sm font-extrabold dark:text-white text-slate-900 line-clamp-2 leading-tight group-hover:text-blue-500 transition-colors">
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
        </div>
      </section>

      {/* 5. PLACEMENT HIGHLIGHTS (SINGLE ROW MOVING IN-LINE EFFECT) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2">
        <MovingPlacementsRow placements={placements} />
      </section>

      {/* 6. WHY CHOOSE US / METHODOLOGY */}
      <section className="relative w-full py-20 px-4 sm:px-6 lg:px-8 bg-[#d1fae5] dark:bg-[#06241a] overflow-hidden">
        <div className="absolute top-1/2 left-10 w-96 h-96 bg-emerald-400/20 dark:bg-emerald-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-7xl mx-auto space-y-12 relative z-10">
          <FadeInUp>
            <div className="text-center space-y-2 max-w-2xl mx-auto">
              <div className="text-xs font-black uppercase tracking-wider text-emerald-900 dark:text-emerald-400">Why NexGen Tech Academy</div>
              <h2 className="text-3xl sm:text-4xl font-black text-slate-950 dark:text-white tracking-tight">
                Designed for Real-World <span className="gradient-text">Mastery</span>
              </h2>
              <p className="text-slate-700 dark:text-slate-300 text-sm font-medium">
                Unlike theoretical tutorials, we focus on industry-grade engineering environments.
              </p>
            </div>
          </FadeInUp>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <StaggerItem>
              <MotionCard className="h-full">
                <div className="rounded-2xl p-8 border-2 border-emerald-300/80 dark:border-slate-800 bg-white dark:bg-slate-900/95 space-y-4 hover:border-blue-500 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 h-full group shadow-md">
                  <div className="w-12 h-12 rounded-xl bg-blue-100 dark:bg-blue-600/20 text-blue-700 dark:text-blue-400 flex items-center justify-center font-bold text-xl border border-blue-300 dark:border-blue-500/30 group-hover:scale-115 group-hover:rotate-6 transition-all duration-300 shadow-sm">
                    <Laptop className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-black text-slate-950 dark:text-white">Live Industry GPU Labs</h3>
                  <p className="text-slate-700 dark:text-slate-300 text-xs sm:text-sm leading-relaxed font-normal">
                    Access high-performance NVIDIA GPU clusters for AI model training, dedicated Cisco server racks, and Mac workstations.
                  </p>
                </div>
              </MotionCard>
            </StaggerItem>

            <StaggerItem>
              <MotionCard className="h-full">
                <div className="rounded-2xl p-8 border-2 border-emerald-300/80 dark:border-slate-800 bg-white dark:bg-slate-900/95 space-y-4 hover:border-purple-500 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 h-full group shadow-md">
                  <div className="w-12 h-12 rounded-xl bg-purple-100 dark:bg-purple-600/20 text-purple-700 dark:text-purple-400 flex items-center justify-center font-bold text-xl border border-purple-300 dark:border-purple-500/30 group-hover:scale-115 group-hover:rotate-6 transition-all duration-300 shadow-sm">
                    <Users className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-black text-slate-950 dark:text-white">1-on-1 Senior Mentorship</h3>
                  <p className="text-slate-700 dark:text-slate-300 text-xs sm:text-sm leading-relaxed font-normal">
                    Get personalized code reviews, architectural guidance, and career planning directly from practicing leads at top tech firms.
                  </p>
                </div>
              </MotionCard>
            </StaggerItem>

            <StaggerItem>
              <MotionCard className="h-full">
                <div className="rounded-2xl p-8 border-2 border-emerald-300/80 dark:border-slate-800 bg-white dark:bg-slate-900/95 space-y-4 hover:border-emerald-500 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 h-full group shadow-md">
                  <div className="w-12 h-12 rounded-xl bg-emerald-100 dark:bg-emerald-600/20 text-emerald-700 dark:text-emerald-400 flex items-center justify-center font-bold text-xl border border-emerald-300 dark:border-emerald-500/30 group-hover:scale-115 group-hover:rotate-6 transition-all duration-300 shadow-sm">
                    <Briefcase className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-black text-slate-950 dark:text-white">Guaranteed Job Referrals</h3>
                  <p className="text-slate-700 dark:text-slate-300 text-xs sm:text-sm leading-relaxed font-normal">
                    Exclusive campus hiring drives, direct HR introductions, and mock interviews with real hiring managers.
                  </p>
                </div>
              </MotionCard>
            </StaggerItem>
          </StaggerContainer>
        </div>
      </section>

      {/* WORLD-CLASS FACULTY MOVING CHAIN SECTION */}
      <section className="relative w-full py-20 px-4 sm:px-6 lg:px-8 bg-[#ede9fe] dark:bg-[#13102d] overflow-hidden">
        <div className="absolute top-0 right-10 w-96 h-96 bg-indigo-400/20 dark:bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-7xl mx-auto space-y-8 relative z-10">
          <FadeInUp>
            <div className="text-center space-y-2 max-w-2xl mx-auto">
              <div className="text-xs font-black uppercase tracking-wider text-indigo-900 dark:text-indigo-400">World-Class Faculty</div>
              <h2 className="text-3xl sm:text-4xl font-black dark:text-white text-slate-950 tracking-tight">
                Learn from <span className="gradient-text">Industry Leaders</span>
              </h2>
              <p className="dark:text-slate-300 text-slate-700 text-xs sm:text-sm font-medium">
                Our mentors bring decades of real enterprise engineering experience from Fortune 500 tech companies.
              </p>
            </div>
          </FadeInUp>

          <ZoomIn>
            <FacultyMovingChain trainers={trainers} />
          </ZoomIn>
        </div>
      </section>

      {/* OFFICIAL INTERACTIVE NSDC CERTIFICATE PREVIEW */}
      <InteractiveCertificate />

      {/* 7. REAL STUDENT TESTIMONIALS (Image 3) */}
      <section className="relative w-full py-20 px-4 sm:px-6 lg:px-8 bg-[#fef3c7] dark:bg-[#1f1708] overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-amber-400/20 dark:bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-7xl mx-auto space-y-10 relative z-10">
          <FadeInUp>
            <div className="text-center space-y-2 max-w-2xl mx-auto">
              <div className="text-xs font-black uppercase tracking-wider text-amber-950 dark:text-amber-400 flex items-center justify-center gap-1.5">
                <MessageSquare className="w-4 h-4 text-amber-900 dark:text-amber-400" />
                <span>Success Stories</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-black text-slate-950 dark:text-white tracking-tight">
                Hear from Our <span className="gradient-text-amber">Transformed Alumni</span>
              </h2>
            </div>
          </FadeInUp>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {testimonials.map((t) => (
              <StaggerItem key={t.id}>
                <MotionCard className="h-full">
                  <div className="rounded-2xl p-8 border-2 border-amber-300 dark:border-slate-800 bg-white dark:bg-slate-900/95 shadow-xl hover:border-amber-500 hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between h-full group">
                    <div className="space-y-3">
                      <div className="flex items-center gap-1 text-amber-500">
                        {[...Array(t.rating)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-amber-500 text-amber-500 group-hover:scale-115 transition-transform duration-200" />
                        ))}
                      </div>
                      <p className="text-slate-900 dark:text-slate-100 text-sm italic leading-relaxed font-normal">
                        &ldquo;{t.quote}&rdquo;
                      </p>
                    </div>

                    <div className="pt-4 border-t border-amber-200 dark:border-slate-800 flex items-center justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-amber-500 shrink-0 group-hover:scale-105 transition-transform duration-300 shadow-sm">
                          <Image src={t.photo} alt={t.studentName} fill className="object-cover" />
                        </div>
                        <div>
                          <h4 className="font-extrabold text-slate-950 dark:text-white text-sm">{t.studentName}</h4>
                          <p className="text-xs text-blue-700 dark:text-blue-400 font-bold">{t.currentRole} @ {t.company}</p>
                          <p className="text-[11px] text-slate-600 dark:text-slate-400 font-medium">Ex-{t.previousRole}</p>
                        </div>
                      </div>

                      <div className="px-3 py-1.5 rounded-lg bg-emerald-100 border border-emerald-300 text-emerald-800 dark:bg-emerald-500/20 dark:border-emerald-500/30 dark:text-emerald-300 font-black text-xs shrink-0 shadow-sm group-hover:scale-105 transition-transform">
                        {t.salaryHike}
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
