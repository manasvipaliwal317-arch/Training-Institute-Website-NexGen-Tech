import Image from 'next/image';
import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import EventClientSection from '@/components/EventClientSection';
import { Calendar, Clock, MapPin, Sparkles, Users, ArrowRight, CheckCircle2 } from 'lucide-react';
import {
  FadeInUp,
  ZoomIn,
  StaggerContainer,
  StaggerItem,
  MotionCard,
} from '@/components/AnimatedSection';

export const metadata = {
  title: 'Tech Masterclasses, Workshops & Hackathons | NexGen Tech Academy',
  description: 'Join live online webinars, hands-on coding workshops, hackathons, and guest lectures by former Microsoft, Swiggy & Amazon leads.',
};

export const revalidate = 60;

export default async function EventsPage() {
  const upcomingEvents = await prisma.event.findMany({
    where: { isPastEvent: false },
    orderBy: { createdAt: 'desc' },
  });

  const pastEvents = await prisma.event.findMany({
    where: { isPastEvent: true },
    orderBy: { createdAt: 'desc' },
  });

  return (
    <div className="space-y-16 py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <ZoomIn>
        <div className="glass-card rounded-3xl p-8 sm:p-14 border border-cyan-500/20 bg-gradient-to-br from-slate-900 via-cyan-950/30 to-slate-900 text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-semibold uppercase tracking-wider mx-auto">
            <Sparkles className="w-4 h-4 text-amber-300" />
            <span>Industry Exposure & Learning</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-black text-white tracking-tight">
            Tech Workshops & <span className="gradient-text-cyan">Masterclasses</span>
          </h1>
          <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            Upgrade your engineering skills with free live masterclasses, hands-on weekend hackathons, and technical panel discussions with lead architects.
          </p>
        </div>
      </ZoomIn>

      {/* Upcoming Events Grid */}
      <section className="space-y-8">
        <FadeInUp>
          <div>
            <div className="text-xs font-bold uppercase text-cyan-400">Live Registration Open</div>
            <h2 className="text-3xl font-black text-white">Upcoming Masterclasses & Workshops</h2>
          </div>
        </FadeInUp>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {upcomingEvents.map((ev) => (
            <StaggerItem key={ev.id}>
              <MotionCard className="h-full">
                <div className="glass-card rounded-2xl overflow-hidden border border-slate-800 flex flex-col justify-between hover:border-cyan-500/40 transition-all h-full">
                  <div className="relative h-52 w-full bg-slate-800">
                    <Image src={ev.bannerImage} alt={ev.title} fill className="object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
                    <div className="absolute top-3 left-3 flex items-center gap-2">
                      <span className="px-3 py-1 rounded-md bg-cyan-600/90 text-white font-semibold text-xs">
                        {ev.category}
                      </span>
                      <span className="px-3 py-1 rounded-md bg-slate-900/90 text-amber-400 font-bold text-xs">
                        {ev.mode}
                      </span>
                    </div>
                    <div className="absolute bottom-3 right-3 bg-slate-900/90 px-3 py-1 rounded-md text-emerald-400 text-xs font-bold flex items-center gap-1">
                      <Users className="w-3.5 h-3.5" />
                      <span>{ev.registrationsCount}+ Registered</span>
                    </div>
                  </div>

                  <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                    <div className="space-y-2">
                      <h3 className="text-xl font-bold text-white leading-snug">{ev.title}</h3>
                      <p className="text-slate-400 text-xs line-clamp-2 leading-relaxed">{ev.tagline}</p>
                    </div>

                    <div className="space-y-2 text-xs text-slate-300 pt-3 border-t border-slate-800">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-blue-400 shrink-0" />
                        <span>{ev.eventDate} ({ev.eventTime})</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-purple-400 shrink-0" />
                        <span className="line-clamp-1">{ev.venue}</span>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-slate-800 flex items-center justify-between gap-4">
                      <div className="flex items-center gap-2.5">
                        <div className="relative w-10 h-10 rounded-full overflow-hidden border border-cyan-400/40 shrink-0">
                          <Image src={ev.speakerPhoto} alt={ev.speakerName} fill className="object-cover" />
                        </div>
                        <div>
                          <h4 className="font-bold text-white text-xs">{ev.speakerName}</h4>
                          <p className="text-[11px] text-slate-400 line-clamp-1">{ev.speakerRole}</p>
                        </div>
                      </div>

                      <EventClientSection eventId={ev.id} eventTitle={ev.title} eventDate={ev.eventDate} eventTime={ev.eventTime} venue={ev.venue} slug={ev.slug} />
                    </div>
                  </div>
                </div>
              </MotionCard>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </section>

      {/* Past Events & Hackathons Gallery */}
      <section className="space-y-8">
        <div>
          <div className="text-xs font-bold uppercase text-purple-400">Past Event Gallery</div>
          <h2 className="text-3xl font-black text-white">Campus Hackathons & Conclaves</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {pastEvents.map((ev) => {
            const gallery: string[] = JSON.parse(ev.galleryJson || '[]');
            return (
              <div key={ev.id} className="glass-card rounded-2xl p-6 border border-slate-800 space-y-4">
                <div className="relative h-48 rounded-xl overflow-hidden border border-slate-700">
                  <Image src={ev.bannerImage} alt={ev.title} fill className="object-cover" />
                  <div className="absolute top-2 left-2 px-2.5 py-1 rounded bg-slate-900/90 text-purple-400 font-bold text-[11px]">
                    Past Event
                  </div>
                </div>

                <div>
                  <h3 className="font-bold text-white text-base leading-snug">{ev.title}</h3>
                  <p className="text-xs text-slate-400 mt-1">{ev.eventDate} • {ev.venue}</p>
                </div>

                {gallery.length > 0 && (
                  <div className="grid grid-cols-4 gap-2 pt-2 border-t border-slate-800">
                    {gallery.map((imgUrl, gIdx) => (
                      <div key={gIdx} className="relative h-14 rounded-lg overflow-hidden border border-slate-700">
                        <Image src={imgUrl} alt="Past event photo" fill className="object-cover" />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
