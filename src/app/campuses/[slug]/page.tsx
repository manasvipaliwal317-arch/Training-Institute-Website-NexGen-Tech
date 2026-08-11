import { notFound } from 'next/navigation';
import Image from 'next/image';
import { prisma } from '@/lib/prisma';
import { MapPin, Phone, Mail, Clock, Navigation, CheckCircle2, Sparkles, Building2 } from 'lucide-react';
import HomeClientSection from '@/components/HomeClientSection';

export const revalidate = 60;

export async function generateStaticParams() {
  const campuses = await prisma.campus.findMany({ select: { slug: true } });
  return campuses.map((c) => ({ slug: c.slug }));
}

interface CampusPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: CampusPageProps) {
  const { slug } = await params;
  const campus = await prisma.campus.findUnique({
    where: { slug },
  });

  if (!campus) return { title: 'Campus Not Found | NexGen Tech Academy' };

  return {
    title: `${campus.name} | NexGen Tech Academy`,
    description: `Visit ${campus.name} in ${campus.city}. High-tech lab workstations, GPU clusters, and admissions.`,
  };
}

export default async function SingleCampusPage({ params }: CampusPageProps) {
  const { slug } = await params;
  const campus = await prisma.campus.findUnique({
    where: { slug },
  });

  if (!campus) notFound();

  const gallery: string[] = JSON.parse(campus.galleryJson || '[]');

  return (
    <div className="space-y-12 py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Campus Hero */}
      <div className="glass-card rounded-3xl p-8 sm:p-12 border border-blue-500/20 bg-gradient-to-br from-slate-900 via-blue-950/40 to-slate-900">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-8 space-y-4">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-md bg-blue-600 text-white font-semibold text-xs">
                {campus.type}
              </span>
              <span className="px-3 py-1 rounded-md bg-slate-800 text-purple-400 font-bold text-xs">
                {campus.city}
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
              {campus.name}
            </h1>

            <p className="text-slate-300 text-sm leading-relaxed">{campus.address}</p>

            <div className="flex flex-wrap items-center gap-6 pt-2 text-xs sm:text-sm text-slate-300">
              <span className="flex items-center gap-1.5 font-bold text-emerald-400">
                <Phone className="w-4 h-4" /> {campus.phone}
              </span>
              <span className="flex items-center gap-1.5 text-blue-400 font-medium">
                <Mail className="w-4 h-4" /> {campus.email}
              </span>
              <span className="flex items-center gap-1.5 text-amber-400">
                <Clock className="w-4 h-4" /> {campus.workingHours}
              </span>
            </div>
          </div>

          <div className="lg:col-span-4 h-64 rounded-2xl overflow-hidden relative border border-slate-700 shadow-2xl">
            <Image src={campus.coverImage} alt={campus.name} fill className="object-cover" />
          </div>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 space-y-8">
          <div className="glass-card rounded-2xl p-8 border border-slate-800 space-y-4">
            <h2 className="text-2xl font-bold text-white">Nearby Landmarks & Transit Access</h2>
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 text-sm flex items-start gap-3">
              <Navigation className="w-5 h-5 text-purple-400 shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-white">Getting Here:</p>
                <p className="text-xs text-slate-400 mt-1">{campus.landmarks}</p>
              </div>
            </div>
          </div>

          {/* Photo Gallery */}
          {gallery.length > 0 && (
            <div className="glass-card rounded-2xl p-8 border border-slate-800 space-y-4">
              <h2 className="text-2xl font-bold text-white">Campus Labs & Infrastructure Gallery</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {gallery.map((imgUrl, gIdx) => (
                  <div key={gIdx} className="relative h-44 rounded-xl overflow-hidden border border-slate-700">
                    <Image src={imgUrl} alt="Campus photo" fill className="object-cover" />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Map Sidebar */}
        <div className="lg:col-span-4 space-y-6">
          <div className="h-80 rounded-2xl overflow-hidden border border-slate-700 relative bg-slate-900 shadow-2xl">
            <iframe
              src={campus.mapEmbedUrl}
              width="100%"
              height="100%"
              style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg)' }}
              allowFullScreen={false}
              loading="lazy"
              title={`${campus.name} Map`}
            />
          </div>

          <div className="glass-card rounded-2xl p-6 border border-slate-800 text-center space-y-3">
            <h3 className="font-bold text-white text-base">Schedule a Visit</h3>
            <p className="text-xs text-slate-400">Book a personal lab walkthrough with an academic counselor.</p>
            <HomeClientSection mode="demo-btn" buttonText="Schedule Campus Tour" />
          </div>
        </div>
      </div>
    </div>
  );
}
