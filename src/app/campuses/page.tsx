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
      <div className="rounded-3xl p-8 sm:p-14 bg-[#dbeafe] dark:bg-[#0c182b] border border-blue-200/60 dark:border-blue-900/40 text-center space-y-4 shadow-sm">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-100 dark:bg-blue-500/10 border border-blue-300 dark:border-blue-500/30 text-blue-700 dark:text-blue-400 text-xs font-black uppercase tracking-wider mx-auto">
          <Building2 className="w-4 h-4" />
          <span>Multi-Branch Physical Network</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-black text-slate-950 dark:text-white tracking-tight">
          Visit Our <span className="gradient-text">State-of-the-Art Campuses</span>
        </h1>
        <p className="text-slate-700 dark:text-slate-300 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed font-medium">
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

                  <div className="space-y-3 text-xs sm:text-sm text-slate-300">
                    {/* Clickable Address / Google Maps */}
                    <a
                      href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(campus.address)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-start gap-2.5 p-2 -ml-2 rounded-xl hover:bg-white/10 active:scale-95 transition-all cursor-pointer"
                      title="Open campus address in Google Maps"
                    >
                      <MapPin className="w-4 h-4 text-blue-400 shrink-0 mt-0.5 group-hover:scale-120 group-hover:text-blue-300 transition-transform" />
                      <span className="group-hover:text-white group-hover:underline transition-colors leading-relaxed">
                        {campus.address}
                      </span>
                    </a>

                    {/* Clickable Nearby Landmarks */}
                    <a
                      href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${campus.name} ${campus.landmarks}`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-start gap-2.5 p-2 -ml-2 rounded-xl hover:bg-white/10 active:scale-95 transition-all cursor-pointer"
                      title="View nearby landmarks on Google Maps"
                    >
                      <Navigation className="w-4 h-4 text-purple-400 shrink-0 mt-0.5 group-hover:scale-120 group-hover:text-purple-300 transition-transform" />
                      <div className="group-hover:text-white transition-colors">
                        <strong className="text-white">Nearby Landmarks:</strong> {campus.landmarks}
                      </div>
                    </a>

                    {/* Working Hours */}
                    <div className="flex items-center gap-2.5 px-2">
                      <Clock className="w-4 h-4 text-amber-400 shrink-0" />
                      <span className="text-slate-300 font-medium">{campus.workingHours}</span>
                    </div>

                    {/* Functional Phone & Email links with tactile click effect */}
                    <div className="flex flex-wrap items-center gap-3 pt-2">
                      <a
                        href={`tel:${campus.phone.replace(/[^0-9+]/g, '')}`}
                        className="group inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-emerald-100/90 dark:bg-emerald-950/60 hover:bg-emerald-200 dark:hover:bg-emerald-900/60 border border-emerald-400 dark:border-emerald-700/60 text-emerald-950 dark:text-emerald-200 font-bold active:scale-90 transition-all cursor-pointer shadow-sm hover:shadow-[0_0_12px_rgba(16,185,129,0.3)]"
                        title={`Call ${campus.name} desk`}
                      >
                        <Phone className="w-4 h-4 text-emerald-800 dark:text-emerald-400 group-hover:scale-115 group-hover:animate-bounce transition-transform shrink-0" />
                        <span className="font-bold tracking-tight text-emerald-950 dark:text-emerald-200">{campus.phone}</span>
                      </a>

                      <a
                        href={`mailto:${campus.email}`}
                        className="group inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-blue-100/90 dark:bg-blue-950/60 hover:bg-blue-200 dark:hover:bg-blue-900/60 border border-blue-400 dark:border-blue-700/60 text-blue-950 dark:text-blue-200 font-bold active:scale-90 transition-all cursor-pointer shadow-sm hover:shadow-[0_0_12px_rgba(59,130,246,0.3)]"
                        title={`Email ${campus.name}`}
                      >
                        <Mail className="w-4 h-4 text-blue-800 dark:text-blue-400 group-hover:scale-115 transition-transform shrink-0" />
                        <span className="font-bold tracking-tight text-blue-950 dark:text-blue-200">{campus.email}</span>
                      </a>
                    </div>
                  </div>

                  <div className="pt-4 flex flex-wrap items-center gap-3">
                    <Link
                      href={`/campuses/${campus.slug}`}
                      className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 active:scale-95 text-white font-bold text-xs transition-all shadow-lg shadow-blue-600/30 flex items-center gap-2 hover:scale-[1.02] cursor-pointer"
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
