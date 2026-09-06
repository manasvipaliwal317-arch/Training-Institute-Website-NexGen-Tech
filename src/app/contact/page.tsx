import { prisma } from '@/lib/prisma';
import ContactClientSection from '@/components/ContactClientSection';
import { MapPin, Phone, Mail, Clock, Sparkles, MessageCircle, Globe, Building2 } from 'lucide-react';
import {
  FadeInUp,
  StaggerContainer,
  StaggerItem,
  MotionCard,
  ScalePop,
} from '@/components/AnimatedSection';

export const metadata = {
  title: 'Contact Academic Counselors & Campus Branches | NexGen Tech Academy',
  description: 'Connect with NexGen Tech Academy counselors via phone, email, contact form, WhatsApp, or visit any of our regional tech campuses.',
};

export const revalidate = 0;

export default async function ContactPage() {
  const campuses = await prisma.campus.findMany({
    orderBy: { isMain: 'desc' },
  });

  const mainCampus = campuses.find((c) => c.isMain) || campuses[0];

  return (
    <div className="space-y-16 py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <FadeInUp duration={0.4}>
        <div className="glass-card rounded-3xl p-8 sm:p-14 border border-blue-500/20 bg-gradient-to-br from-slate-900 via-blue-950/40 to-slate-900 text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-semibold uppercase tracking-wider mx-auto">
            <Sparkles className="w-4 h-4 text-amber-300" />
            <span>Get Instant Admissions Guidance</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-black text-white tracking-tight">
            We Are Here to <span className="gradient-text">Guide Your Tech Journey</span>
          </h1>
          <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            Have questions about course fees, batch timings, or syllabus details? Our academic counselors are available 7 days a week.
          </p>

          {/* WhatsApp Direct CTA */}
          <div className="pt-2 flex justify-center">
            <a
              href="https://wa.me/918009998800?text=Hi%20NexGen%20Tech%20Academy,%20I%20want%20to%20know%20more%20about%20upcoming%20batches"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm shadow-xl shadow-emerald-600/30 flex items-center gap-2 transition-all hover:scale-105"
            >
              <MessageCircle className="w-5 h-5 fill-white text-emerald-600" />
              <span>Chat Directly on WhatsApp (+91 800-999-8800)</span>
            </a>
          </div>
        </div>
      </FadeInUp>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Dynamic Campus Branches List */}
        <StaggerContainer staggerDelay={0.1} className="lg:col-span-5 space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <Building2 className="w-5 h-5 text-purple-400" /> Campus Branches ({campuses.length})
              </h2>
              <span className="text-xs text-slate-400">Open 7 Days a Week</span>
            </div>

            {campuses.map((camp) => (
              <StaggerItem key={camp.id}>
                <MotionCard className="glass-card rounded-2xl p-5 border border-slate-800 space-y-3 hover:border-purple-500/40 transition-all">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2.5">
                      <div className="p-2.5 rounded-xl bg-blue-600/20 text-blue-400 shrink-0">
                        <MapPin className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="font-bold text-white text-base leading-tight">{camp.name}</h3>
                        <p className="text-[11px] text-purple-300 font-semibold">{camp.type} • {camp.city}</p>
                      </div>
                    </div>
                    {camp.isMain && (
                      <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-400 font-bold text-[10px] border border-amber-500/30 shrink-0">
                        HQ
                      </span>
                    )}
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed">{camp.address}</p>

                  <div className="pt-2 border-t border-slate-800/80 grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-300">
                    <span className="flex items-center gap-1.5">
                      <Phone className="w-3.5 h-3.5 text-emerald-400 shrink-0" /> {camp.phone}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-amber-400 shrink-0" /> {camp.workingHours}
                    </span>
                  </div>
                </MotionCard>
              </StaggerItem>
            ))}
          </div>

          <StaggerItem>
            <MotionCard className="glass-card rounded-2xl p-5 border border-slate-800 space-y-3">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-purple-600/20 text-purple-400">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-white text-sm">Admissions & Counseling Support</h3>
                  <p className="text-xs text-slate-400">admissions@nexgentechacademy.com</p>
                </div>
              </div>
              <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
                <span className="flex items-center gap-1.5"><Globe className="w-3.5 h-3.5 text-purple-400" /> Digital Desk Online</span>
                <span className="text-amber-400 font-semibold">Response &lt; 15 mins</span>
              </div>
            </MotionCard>
          </StaggerItem>

          {/* Embedded Map */}
          {mainCampus && (
            <StaggerItem>
              <div className="h-60 rounded-2xl overflow-hidden border border-slate-800 relative bg-slate-900 shadow-xl">
                <iframe
                  src={mainCampus.mapEmbedUrl || "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3806.311746764516!2d78.3758!3d17.4474!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb93dc8c5d69df%3A0x19688beb557ef0d9!2sHITEC%20City%2C%20Hyderabad%2C%20Telangana!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"}
                  width="100%"
                  height="100%"
                  style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg)' }}
                  allowFullScreen={false}
                  loading="lazy"
                  title="Campus Location Map"
                />
              </div>
            </StaggerItem>
          )}
        </StaggerContainer>

        {/* Contact Form Client Section */}
        <div className="lg:col-span-7">
          <ScalePop>
            <ContactClientSection />
          </ScalePop>
        </div>
      </div>
    </div>
  );
}

