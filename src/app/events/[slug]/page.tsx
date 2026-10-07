import { notFound } from 'next/navigation';
import Image from 'next/image';
import { prisma } from '@/lib/prisma';
import EventClientSection from '@/components/EventClientSection';
import {
  Calendar,
  Clock,
  MapPin,
  Users,
  Sparkles,
  CheckCircle2,
  Award,
  BookOpen,
  Code2,
  Share2,
  PhoneCall,
  MessageCircle,
  Laptop,
  Check,
} from 'lucide-react';

export const revalidate = 60;

export async function generateStaticParams() {
  const events = await prisma.event.findMany({ select: { slug: true } });
  return events.map((e) => ({ slug: e.slug }));
}

interface EventPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: EventPageProps) {
  const { slug } = await params;
  const event = await prisma.event.findUnique({
    where: { slug },
  });

  if (!event) return { title: 'Event Not Found | NexGen Tech Academy' };

  return {
    title: `${event.title} | NexGen Tech Academy Events`,
    description: event.tagline,
  };
}

export default async function SingleEventPage({ params }: EventPageProps) {
  const { slug } = await params;
  const event = await prisma.event.findUnique({
    where: { slug },
  });

  if (!event) notFound();

  const gallery: string[] = JSON.parse(event.galleryJson || '[]');

  // Dynamic agenda builder based on event type
  const agendaItems = [
    {
      time: 'Phase 01 (30 Mins)',
      title: 'Architectural Foundations & Mental Models',
      desc: 'Industry landscape, core problem statement, system architecture design patterns, and modern production benchmarks.',
    },
    {
      time: 'Phase 02 (45 Mins)',
      title: 'Live Hands-On Code-Along Lab',
      desc: 'Live pair programming session with step-by-step implementation of real-world pipelines, API integrations, and edge cases.',
    },
    {
      time: 'Phase 03 (30 Mins)',
      title: 'Production Optimization & Deployment',
      desc: 'Monitoring latency, throughput profiling, error boundary handling, and zero-downtime deployment strategies.',
    },
    {
      time: 'Phase 04 (25 Mins)',
      title: 'Interactive Q&A & Career Growth Roadmap',
      desc: 'Direct open floor with keynote speaker, code review feedback, and hiring partner interview advice.',
    },
  ];

  const takeaways = [
    'Complete end-to-end working repository with documented boilerplate and deployment scripts',
    'Understanding production trade-offs, scalability bottlenecks, and architectural failure modes',
    'Verifiable ISO 9001:2015 & NSDC aligned Certificate of Masterclass Completion',
    'Lifetime access to the 1080p HD workshop recording and curated reference slides',
    'Direct invite to our private Discord/Slack engineering channel with staff mentors',
  ];

  return (
    <div className="space-y-12 py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Event Hero */}
      <div className="glass-card rounded-3xl p-8 sm:p-12 border border-cyan-200 dark:border-cyan-500/20 bg-gradient-to-br from-cyan-50/70 via-sky-50/50 to-slate-50/80 dark:from-slate-900 dark:via-cyan-950/30 dark:to-slate-900 shadow-sm">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-8 space-y-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 rounded-md bg-cyan-600/90 text-white font-bold text-xs shadow-xs">
                {event.category}
              </span>
              <span className="px-3 py-1 rounded-md bg-slate-900/90 text-amber-300 font-bold text-xs shadow-xs">
                {event.mode}
              </span>
              <span className="px-3 py-1 rounded-md bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 font-bold text-xs border border-emerald-500/20">
                100% Free RSVP
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">
              {event.title}
            </h1>

            <p className="text-slate-700 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
              {event.tagline}
            </p>

            <div className="flex flex-wrap items-center gap-6 pt-2 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
              <div className="flex items-center gap-1.5 font-semibold">
                <Calendar className="w-4 h-4 text-blue-500 dark:text-blue-400" />
                <span>{event.eventDate}</span>
              </div>
              <div className="flex items-center gap-1.5 font-semibold">
                <Clock className="w-4 h-4 text-purple-500 dark:text-purple-400" />
                <span>{event.eventTime}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Users className="w-4 h-4 text-emerald-600 dark:text-emerald-400 font-bold" />
                <span>{event.registrationsCount}+ Registered</span>
              </div>
              <div className="flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-rose-500 dark:text-rose-400" />
                <span className="line-clamp-1">{event.venue}</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-4 h-64 sm:h-72 rounded-2xl overflow-hidden relative border border-slate-700 shadow-2xl">
            <Image
              src={event.bannerImage || 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=1200&q=80'}
              alt={event.title}
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>

      {/* Main Details & Agenda */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        <div className="lg:col-span-8 space-y-10">
          {/* In-Depth About This Event */}
          <div className="glass-card rounded-3xl p-6 sm:p-8 border border-slate-200/80 dark:border-slate-800 bg-white/90 dark:bg-slate-900/85 space-y-4 shadow-sm">
            <div className="flex items-center gap-2 text-xs font-bold uppercase text-cyan-600 dark:text-cyan-400">
              <BookOpen className="w-4 h-4" />
              <span>Masterclass Overview</span>
            </div>
            <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">
              About This Masterclass & Workshop
            </h2>
            <div className="text-slate-700 dark:text-slate-300 text-sm sm:text-base leading-relaxed space-y-3">
              <p>{event.description}</p>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
                This intensive masterclass is curated by our distinguished industry faculty to provide you with actionable, production-ready engineering insights. You will write code alongside industry leaders, analyze architectural decision trees, and gain real-world perspective not taught in standard video tutorials.
              </p>
            </div>
          </div>

          {/* Detailed Agenda Breakdown */}
          <div className="glass-card rounded-3xl p-6 sm:p-8 border border-slate-200/80 dark:border-slate-800 bg-white/90 dark:bg-slate-900/85 space-y-6 shadow-sm">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-xs font-bold uppercase text-purple-600 dark:text-purple-400">
                <Clock className="w-4 h-4" />
                <span>Session Timeline</span>
              </div>
              <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">
                Live Workshop Schedule & Agenda
              </h2>
            </div>

            <div className="space-y-4">
              {agendaItems.map((item, idx) => (
                <div
                  key={idx}
                  className="p-4 sm:p-5 rounded-2xl bg-slate-50/80 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800 space-y-1.5 shadow-2xs"
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="px-2.5 py-0.5 rounded-md bg-purple-500/10 text-purple-700 dark:text-purple-400 text-xs font-black uppercase">
                      {item.time}
                    </span>
                    <span className="text-xs font-bold text-slate-500 dark:text-slate-400">
                      Step 0{idx + 1}
                    </span>
                  </div>
                  <h3 className="font-extrabold text-slate-900 dark:text-white text-base">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Key Takeaways & What You'll Learn */}
          <div className="glass-card rounded-3xl p-6 sm:p-8 border border-slate-200/80 dark:border-slate-800 bg-white/90 dark:bg-slate-900/85 space-y-6 shadow-sm">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-xs font-bold uppercase text-emerald-600 dark:text-emerald-400">
                <Award className="w-4 h-4" />
                <span>Key Deliverables</span>
              </div>
              <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">
                What You Will Take Away & Build Live
              </h2>
            </div>

            <div className="space-y-3">
              {takeaways.map((takeaway, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-50/60 dark:bg-slate-950/60 border border-slate-200/80 dark:border-slate-800 text-xs sm:text-sm text-slate-700 dark:text-slate-300"
                >
                  <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                  <span className="font-medium leading-relaxed">{takeaway}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Speaker Bio */}
          <div className="glass-card rounded-3xl p-6 sm:p-8 border border-slate-200/80 dark:border-slate-800 bg-white/90 dark:bg-slate-900/85 space-y-4 shadow-sm">
            <div className="flex items-center gap-2 text-xs font-bold uppercase text-blue-600 dark:text-blue-400">
              <Sparkles className="w-4 h-4" />
              <span>Keynote Speaker</span>
            </div>
            <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">
              Meet Your Keynote Mentor
            </h2>
            <div className="flex flex-col sm:flex-row items-start gap-5 p-5 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
              <div className="relative w-24 h-24 rounded-2xl overflow-hidden border-2 border-cyan-400/50 shrink-0 shadow-md">
                <Image src={event.speakerPhoto} alt={event.speakerName} fill className="object-cover" />
              </div>
              <div className="space-y-1.5">
                <h3 className="font-black text-slate-900 dark:text-white text-lg sm:text-xl">
                  {event.speakerName}
                </h3>
                <p className="text-xs text-cyan-600 dark:text-cyan-400 font-extrabold uppercase tracking-wide">
                  {event.speakerRole}
                </p>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed pt-1">
                  {event.speakerBio}
                </p>
              </div>
            </div>
          </div>

          {/* Past Event Photo Gallery */}
          {gallery.length > 0 && (
            <div className="glass-card rounded-3xl p-6 sm:p-8 border border-slate-200/80 dark:border-slate-800 bg-white/90 dark:bg-slate-900/85 space-y-4 shadow-sm">
              <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">
                Past Campus Hackathon & Workshop Highlights
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                {gallery.map((imgUrl, gIdx) => (
                  <div
                    key={gIdx}
                    className="relative h-32 rounded-xl overflow-hidden border border-slate-200 dark:border-slate-700 shadow-2xs"
                  >
                    <Image src={imgUrl} alt="Past event photo" fill className="object-cover" />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Sticky Registration Sidebar */}
        <div className="lg:col-span-4 space-y-6">
          <div className="sticky top-28 glass-card rounded-3xl p-6 sm:p-7 border border-cyan-500/30 bg-white dark:bg-slate-900/95 space-y-6 shadow-2xl">
            <div className="space-y-1">
              <span className="text-xs text-slate-500 dark:text-slate-400 uppercase font-black tracking-wider block">
                Confirmed Venue & Format
              </span>
              <h3 className="font-black text-slate-900 dark:text-white text-base mt-1">
                {event.venue}
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                Mode: <span className="font-bold text-amber-500">{event.mode}</span>
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 text-center space-y-1">
              <span className="text-xs font-black uppercase text-cyan-700 dark:text-cyan-300">
                Admission Fee
              </span>
              <div className="text-2xl font-black text-emerald-600 dark:text-emerald-400">
                FREE REGISTRATION
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                Limited to first 500 RSVPs per session
              </p>
            </div>

            <div className="space-y-3 pt-1">
              <EventClientSection
                eventId={event.id}
                eventTitle={event.title}
                eventDate={event.eventDate}
                eventTime={event.eventTime}
                venue={event.venue}
                slug={event.slug}
                hideDetails={true}
              />
            </div>

            <div className="space-y-2.5 pt-4 border-t border-slate-200 dark:border-slate-800 text-xs text-slate-700 dark:text-slate-300">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>100% Free Entry & Verifiable Certificate</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>GitHub Starter Repo & Architecture Diagram</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>1-on-1 Mentor Code Review & Q&A Session</span>
              </div>
            </div>

            {/* Quick Contact & WhatsApp */}
            <div className="pt-4 border-t border-slate-200 dark:border-slate-800 space-y-2 text-xs">
              <a
                href={`https://wa.me/918009998800?text=${encodeURIComponent(
                  `Hi NexGen Tech! I have a question about attending the upcoming masterclass: ${event.title}`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 rounded-xl border border-emerald-500/30 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 font-bold flex items-center justify-center gap-2 active:scale-95 transition-all cursor-pointer"
              >
                <MessageCircle className="w-4 h-4 text-emerald-500" />
                <span>Questions? Ask on WhatsApp</span>
              </a>

              <a
                href="tel:+918009998800"
                className="w-full py-2 rounded-xl text-slate-600 dark:text-slate-400 font-medium flex items-center justify-center gap-1.5 hover:text-blue-500 transition-colors"
              >
                <PhoneCall className="w-3.5 h-3.5 text-blue-500" />
                <span>Helpline: +91 800-999-8800</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
