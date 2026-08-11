import { notFound } from 'next/navigation';
import Image from 'next/image';
import { prisma } from '@/lib/prisma';
import EventClientSection from '@/components/EventClientSection';
import { Calendar, Clock, MapPin, Users, Sparkles, CheckCircle2, Award } from 'lucide-react';

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

  return (
    <div className="space-y-12 py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Event Hero */}
      <div className="glass-card rounded-3xl p-8 sm:p-12 border border-cyan-500/20 bg-gradient-to-br from-slate-900 via-cyan-950/30 to-slate-900">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-8 space-y-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 rounded-md bg-cyan-600/90 text-white font-semibold text-xs">
                {event.category}
              </span>
              <span className="px-3 py-1 rounded-md bg-slate-800 text-amber-400 font-bold text-xs">
                {event.mode}
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
              {event.title}
            </h1>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">{event.tagline}</p>

            <div className="flex flex-wrap items-center gap-6 pt-2 text-xs sm:text-sm text-slate-300">
              <div className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-blue-400" />
                <span>{event.eventDate}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-purple-400" />
                <span>{event.eventTime}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Users className="w-4 h-4 text-emerald-400" />
                <span>{event.registrationsCount}+ Registered</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-4 h-64 rounded-2xl overflow-hidden relative border border-slate-700 shadow-2xl">
            <Image src={event.bannerImage} alt={event.title} fill className="object-cover" />
          </div>
        </div>
      </div>

      {/* Main Details & Speaker */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        <div className="lg:col-span-8 space-y-10">
          <div className="glass-card rounded-2xl p-8 border border-slate-800 space-y-4">
            <h2 className="text-2xl font-bold text-white">About This Event</h2>
            <p className="text-slate-300 text-sm leading-relaxed">{event.description}</p>
          </div>

          {/* Speaker Bio */}
          <div className="glass-card rounded-2xl p-8 border border-slate-800 space-y-4">
            <h2 className="text-2xl font-bold text-white">Featured Keynote Speaker</h2>
            <div className="flex flex-col sm:flex-row items-start gap-4 p-4 rounded-xl bg-slate-900 border border-slate-800">
              <div className="relative w-20 h-20 rounded-xl overflow-hidden border border-cyan-400/40 shrink-0">
                <Image src={event.speakerPhoto} alt={event.speakerName} fill className="object-cover" />
              </div>
              <div className="space-y-1">
                <h3 className="font-bold text-white text-lg">{event.speakerName}</h3>
                <p className="text-xs text-cyan-400 font-semibold">{event.speakerRole}</p>
                <p className="text-xs text-slate-400 leading-relaxed pt-1">{event.speakerBio}</p>
              </div>
            </div>
          </div>

          {/* Past Event Photo Gallery */}
          {gallery.length > 0 && (
            <div className="glass-card rounded-2xl p-8 border border-slate-800 space-y-4">
              <h2 className="text-2xl font-bold text-white">Past Event Photo Highlights</h2>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {gallery.map((imgUrl, gIdx) => (
                  <div key={gIdx} className="relative h-32 rounded-xl overflow-hidden border border-slate-700">
                    <Image src={imgUrl} alt="Past event photo" fill className="object-cover" />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Action Sidebar */}
        <div className="lg:col-span-4 space-y-6">
          <div className="sticky top-28 glass-card rounded-2xl p-6 border border-cyan-500/30 space-y-6 shadow-2xl">
            <div>
              <span className="text-xs text-slate-400 font-medium block">Event Venue</span>
              <h3 className="font-bold text-white text-base mt-1">{event.venue}</h3>
            </div>

            <div className="space-y-3 pt-2">
              <EventClientSection
                eventId={event.id}
                eventTitle={event.title}
                eventDate={event.eventDate}
                eventTime={event.eventTime}
                venue={event.venue}
                slug={event.slug}
              />
            </div>

            <div className="space-y-2 pt-4 border-t border-slate-800 text-xs text-slate-300">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>100% Free Entry & Certificate of Participation</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>GitHub Repository & Slidedeck Provided</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
