import Image from 'next/image';
import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import { MapPin, Phone, Mail, Clock, Building2, ChevronRight, Sparkles, Navigation } from 'lucide-react';
import HomeClientSection from '@/components/HomeClientSection';

export const metadata = {
  title: 'Academy Campuses & Branch Directory | NexGen Tech Academy',
  description: 'Explore our multi-branch campuses in Hyderabad, Bengaluru, and Pune. State-of-the-art computer labs, GPU server rooms, and working hours.',
};

export const revalidate = 60;

export default async function CampusesPage() {
  const campuses = await prisma.campus.findMany({
    orderBy: { isMain: 'desc' },
  });

  return (
    <div className="space-y-16 py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="glass-card rounded-3xl p-8 sm:p-14 border border-blue-500/20 bg-gradient-to-br from-slate-900 via-blue-950/40 to-slate-900 text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-semibold uppercase tracking-wider mx-auto">
          <Building2 className="w-4 h-4" />
          <span>Multi-Branch Physical Network</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-black text-white tracking-tight">
          Visit Our <span className="gradient-text">State-of-the-Art Campuses</span>
        </h1>
        <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
          Equipped with NVIDIA A100 GPU clusters, Cisco network labs, Apple Mac UI/UX design workstations, and 24/7 collaborative hackathon spaces.
        </p>
      </div>

      {/* Campus Cards */}
      <div className="space-y-10">
        {campuses.map((campus) => {
          const gallery: string[] = JSON.parse(campus.galleryJson || '[]');

          return (
            <div key={campus.id} className="glass-card rounded-3xl p-8 border border-slate-800 space-y-8 hover:border-blue-500/40 transition-all">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-6 space-y-4">
                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 rounded-md bg-blue-600/90 text-white font-semibold text-xs">
                      {campus.type}
                    </span>
                    <span className="px-3 py-1 rounded-md bg-slate-800 text-purple-400 font-bold text-xs">
                      {campus.city}
                    </span>
                    {campus.isMain && (
                      <span className="px-3 py-1 rounded-md bg-amber-500 text-slate-950 font-extrabold text-xs uppercase">
                        Global HQ
                      </span>
                    )}
                  </div>

                  <h2 className="text-2xl sm:text-3xl font-black text-white">{campus.name}</h2>

                  <div className="space-y-2.5 text-xs sm:text-sm text-slate-300">
                    <div className="flex items-start gap-2.5">
                      <MapPin className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                      <span>{campus.address}</span>
                    </div>

                    <div className="flex items-start gap-2.5">
                      <Navigation className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-white">Nearby Landmarks:</strong> {campus.landmarks}
                      </div>
                    </div>

                    <div className="flex items-center gap-2.5">
                      <Clock className="w-4 h-4 text-amber-400 shrink-0" />
                      <span>{campus.workingHours}</span>
                    </div>

                    <div className="flex items-center gap-4 pt-1">
                      <span className="flex items-center gap-1.5 font-bold text-emerald-400">
                        <Phone className="w-4 h-4" /> {campus.phone}
                      </span>
                      <span className="flex items-center gap-1.5 text-slate-400">
                        <Mail className="w-4 h-4 text-blue-400" /> {campus.email}
                      </span>
                    </div>
                  </div>

                  <div className="pt-3 flex flex-wrap items-center gap-3">
                    <Link
                      href={`/campuses/${campus.slug}`}
                      className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs transition-all shadow-md shadow-blue-600/20 flex items-center gap-1.5"
                    >
                      <span>Explore Campus Specs</span>
                      <ChevronRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>

                {/* Map Embed */}
                <div className="lg:col-span-6 h-72 rounded-2xl overflow-hidden border border-slate-700 relative bg-slate-900 shadow-xl">
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
              </div>

              {/* Lab Gallery */}
              {gallery.length > 0 && (
                <div className="pt-4 border-t border-slate-800/80">
                  <span className="text-xs font-semibold text-slate-400 block mb-3">Campus Lab Facilities</span>
                  <div className="grid grid-cols-3 gap-3">
                    {gallery.map((imgUrl, gIdx) => (
                      <div key={gIdx} className="relative h-28 rounded-xl overflow-hidden border border-slate-700">
                        <Image src={imgUrl} alt="Campus lab photo" fill className="object-cover" />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
