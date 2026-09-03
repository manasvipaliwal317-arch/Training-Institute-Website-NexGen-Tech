'use client';

import Link from 'next/link';
import { Award, QrCode, ShieldCheck, ArrowRight, Landmark, Globe } from 'lucide-react';

export default function InteractiveCertificate() {
  return (
    <section className="py-12 sm:py-16 relative overflow-hidden transition-colors duration-300 dark:bg-[#0b0f19] bg-[#fff8f3] border-y dark:border-slate-800 border-orange-100/80">
      {/* Background Ambient Glows */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[500px] h-[500px] bg-blue-600/10 dark:bg-indigo-600/15 blur-[160px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-10 w-[400px] h-[400px] bg-amber-500/10 dark:bg-amber-500/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* TWO-COLUMN LAYOUT: SLOGAN ON LEFT, PIXEL-EXACT COMPACT CERTIFICATE ON RIGHT */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* LEFT COLUMN: STRONG SLOGAN & ACCREDITATION PILLARS */}
          <div className="lg:col-span-5 space-y-6 text-left">
            
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full dark:bg-amber-500/10 bg-orange-500/10 border dark:border-amber-500/30 border-orange-200 text-amber-600 dark:text-amber-400 text-xs font-bold uppercase tracking-wider shadow-sm">
              <Award className="w-4 h-4 text-amber-500" />
              <span>Government & NSDC Accredited</span>
            </div>

            {/* Powerful Main Slogan */}
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black dark:text-white text-slate-900 tracking-tight leading-tight">
              Empowering Careers with <span className="gradient-text">Recognized Credentials</span>
            </h2>

            {/* Sub-slogan Description */}
            <p className="dark:text-slate-300 text-slate-600 text-sm sm:text-base leading-relaxed">
              Every NexGen Tech Academy graduate receives an official completion credential co-branded by <strong className="dark:text-white text-slate-900">Skill India</strong> and <strong className="dark:text-white text-slate-900">NSDC</strong>. Embedded with cryptographic QR codes for 24/7 instant employer validation.
            </p>

            {/* Accreditation Pillars */}
            <div className="space-y-3 pt-1">
              
              <div className="flex items-start gap-3 p-3.5 rounded-2xl dark:bg-slate-900/80 bg-white border dark:border-slate-800 border-orange-100 shadow-sm">
                <div className="p-2 rounded-xl bg-orange-500/10 text-orange-600 shrink-0 mt-0.5">
                  <Landmark className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold dark:text-white text-slate-900 text-sm">NSDC & Skill India Endorsed</h4>
                  <p className="dark:text-slate-400 text-slate-500 text-xs mt-0.5">Aligns with official national skill qualification guidelines for IT & AI roles.</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3.5 rounded-2xl dark:bg-slate-900/80 bg-white border dark:border-slate-800 border-orange-100 shadow-sm">
                <div className="p-2 rounded-xl bg-blue-500/10 text-blue-500 shrink-0 mt-0.5">
                  <QrCode className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold dark:text-white text-slate-900 text-sm">Instant Digital QR Verification</h4>
                  <p className="dark:text-slate-400 text-slate-500 text-xs mt-0.5">Directly verifiable on LinkedIn, tech resumes, and HR verification portals.</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3.5 rounded-2xl dark:bg-slate-900/80 bg-white border dark:border-slate-800 border-orange-100 shadow-sm">
                <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-500 shrink-0 mt-0.5">
                  <Globe className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold dark:text-white text-slate-900 text-sm">300+ Enterprise Hiring Partners</h4>
                  <p className="dark:text-slate-400 text-slate-500 text-xs mt-0.5">Validates real hands-on GPU lab capstone experience and software projects.</p>
                </div>
              </div>

            </div>

            {/* Action Buttons */}
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <Link
                href="/certificate"
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-xs sm:text-sm transition-all shadow-lg shadow-blue-600/20 flex items-center gap-2 transform hover:scale-105"
              >
                <ShieldCheck className="w-4 h-4 text-amber-300" />
                <span>Verify Certificate Online</span>
              </Link>

              <Link
                href="/courses"
                className="px-5 py-3 rounded-xl dark:bg-slate-800 bg-white border dark:border-slate-700 border-orange-200 hover:border-orange-300 text-slate-800 dark:text-white font-bold text-xs sm:text-sm transition-all flex items-center gap-1.5 shadow-sm"
              >
                <span>Browse Programs</span>
                <ArrowRight className="w-4 h-4 text-slate-400" />
              </Link>
            </div>

          </div>

          {/* RIGHT COLUMN: PIXEL-EXACT COMPACT CERTIFICATE CANVAS REPLICA WITH LIGHT SWEEP EFFECT */}
          <div className="lg:col-span-7 flex justify-center">
            
            <div 
              id="certificate-print-area"
              className="w-full max-w-xl bg-[#fdfbf7] text-[#081c3b] rounded-sm p-4 sm:p-6 shadow-2xl relative overflow-hidden select-none border-[10px] border-[#081c3b] animate-light-sweep transition-all duration-300 hover:shadow-[0_25px_60px_-10px_rgba(197,155,39,0.35)] hover:scale-[1.025]"
              style={{
                boxShadow: '0 20px 50px -10px rgba(0, 0, 0, 0.35), 0 0 0 2px #c59b27',
                fontFamily: "'Georgia', 'Times New Roman', serif"
              }}
            >

              {/* Inner Gold Frame Border */}
              <div className="absolute inset-1.5 border-[1.5px] border-[#c59b27] pointer-events-none" />
              <div className="absolute inset-2.5 border-[1px] border-[#081c3b]/25 pointer-events-none" />

              {/* Geometric Dark Navy Outer Corner Accents */}
              <div 
                className="absolute top-0 left-0 w-12 h-12 bg-[#081c3b] pointer-events-none" 
                style={{ clipPath: 'polygon(0 0, 100% 0, 0 100%)' }} 
              />
              <div 
                className="absolute top-0 right-0 w-12 h-12 bg-[#081c3b] pointer-events-none" 
                style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%)' }} 
              />
              <div 
                className="absolute bottom-0 left-0 w-12 h-12 bg-[#081c3b] pointer-events-none" 
                style={{ clipPath: 'polygon(0 0, 0 100%, 100% 100%)' }} 
              />
              <div 
                className="absolute bottom-0 right-0 w-24 h-48 bg-[#081c3b] pointer-events-none" 
                style={{ clipPath: 'polygon(100% 0, 100% 100%, 0 100%)' }} 
              />
              <div 
                className="absolute bottom-0 right-0 w-32 h-36 bg-[#c59b27]/30 pointer-events-none" 
                style={{ clipPath: 'polygon(100% 0, 100% 100%, 0 100%)' }} 
              />

              {/* TOP HEADER SECTION */}
              <div className="relative z-10 mb-5 pt-1">
                
                {/* TOP LEFT: NSDC & SKILL INDIA LOGOS (STACKED & SHIFTED LEFT, NO BG) */}
                <div className="absolute top-1 left-1 flex flex-col items-start gap-0.5 bg-transparent p-0 origin-top-left z-20">
                  
                  {/* NSDC LOGO */}
                  <div className="flex items-center gap-1">
                    <div className="w-4 h-4 relative flex items-center justify-center shrink-0">
                      <svg viewBox="0 0 100 100" className="w-4 h-4">
                        <path d="M50 15 L58 38 L82 38 L62 52 L70 75 L50 60 L30 75 L38 52 L18 38 L42 38 Z" fill="#2563eb" />
                        <circle cx="50" cy="18" r="7" fill="#dc2626" />
                        <circle cx="78" cy="38" r="7" fill="#16a34a" />
                        <circle cx="68" cy="72" r="7" fill="#ea580c" />
                        <circle cx="32" cy="72" r="7" fill="#9333ea" />
                        <circle cx="22" cy="38" r="7" fill="#0284c7" />
                      </svg>
                    </div>
                    <div className="text-left font-sans leading-tight">
                      <span className="text-[7.5px] font-black tracking-tight text-[#081c3b] block">N•S•D•C</span>
                      <span className="text-[5px] font-bold text-blue-900 block">National Skill Dev Corp</span>
                      <span className="text-[4.5px] font-bold text-red-600 block">Transforming the skill landscape</span>
                    </div>
                  </div>

                  {/* Subtle Separator */}
                  <div className="w-full h-[1px] bg-slate-300/40 my-0.5" />

                  {/* SKILL INDIA LOGO */}
                  <div className="flex items-center gap-1">
                    <div className="w-3.5 h-3.5 rounded-full bg-orange-50/80 flex items-center justify-center border border-orange-200/60 shrink-0">
                      <svg className="w-2 h-2 text-orange-600" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2L15 8L22 9L17 14 L18 21L12 17.5L6 21L7 14L2 9L9 8Z" />
                      </svg>
                    </div>
                    <div className="text-left font-sans leading-tight">
                      <span className="text-[8px] font-black tracking-tight text-[#081c3b] block">Skill India</span>
                      <span className="text-[5.5px] font-semibold text-slate-600 block">कौशल भारत - कुशल भारत</span>
                    </div>
                  </div>

                </div>

                {/* TOP RIGHT: GOLD EXCELLENCE BADGE */}
                <div className="absolute top-0 right-2 flex flex-col items-center z-20 scale-90 sm:scale-100 origin-top-right">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-amber-600 via-yellow-400 to-amber-500 p-0.5 shadow-lg flex items-center justify-center border border-amber-700">
                    <div className="w-full h-full rounded-full border border-dashed border-amber-950 bg-[#081c3b] flex flex-col items-center justify-center text-amber-300 text-center p-0.5">
                      <span className="text-[6.5px] text-amber-400 tracking-widest">★★★</span>
                      <span className="text-[6px] font-extrabold tracking-wider uppercase font-sans leading-tight text-amber-200">
                        CERTIFICATE<br />OF<br />EXCELLENCE
                      </span>
                      <span className="text-[6.5px] text-amber-400 tracking-widest">★★★</span>
                    </div>
                  </div>
                  {/* Ribbon Tails */}
                  <div className="flex items-center justify-center gap-0.5 -mt-1.5">
                    <div className="w-2.5 h-5 bg-gradient-to-b from-amber-500 to-amber-700 shadow-sm" style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 50% 80%, 0 100%)' }} />
                    <div className="w-2.5 h-5 bg-gradient-to-b from-amber-500 to-amber-700 shadow-sm" style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 50% 80%, 0 100%)' }} />
                  </div>
                </div>

                {/* EXACT CENTERED INSTITUTE HEADER */}
                <div className="text-center pt-0 px-14 sm:px-20">
                  {/* 1. Institute Name Shifted to Top */}
                  <h1 className="text-sm sm:text-lg font-bold tracking-tight text-[#081c3b] font-serif leading-tight">
                    NexGen Tech Academy & Research
                  </h1>

                  {/* 2. Gold Certificate Crest Logo Placed Below Institute Name */}
                  <div className="flex items-center justify-center my-1">
                    <div className="w-9 h-8 relative flex items-center justify-center">
                      <svg viewBox="0 0 100 80" className="w-9 h-8">
                        <path d="M10 50 Q 50 35 90 50 L 90 70 Q 50 55 10 70 Z" fill="#c59b27" />
                        <path d="M50 40 L 50 62" stroke="#081c3b" strokeWidth="3" />
                        <polygon points="50,10 85,25 50,40 15,25" fill="#081c3b" />
                        <rect x="44" y="32" width="12" height="10" fill="#081c3b" />
                        <path d="M80 27 L 85 45" stroke="#c59b27" strokeWidth="2.5" />
                      </svg>
                    </div>
                  </div>

                  {/* 3. Subtitle Tagline with Arrow Ornaments */}
                  <div className="flex items-center justify-center gap-1.5 text-[#c59b27] text-[9px] font-semibold tracking-wider">
                    <span className="text-[#c59b27]">—►</span>
                    <span className="font-bold text-[#b8860b] uppercase font-sans tracking-[0.15em]">Learn • Innovate • Excel</span>
                    <span className="text-[#c59b27]">◄—</span>
                  </div>
                </div>

              </div>

              {/* MAIN CERTIFICATE TITLE */}
              <div className="text-center mt-9 mb-4 space-y-0.5 relative z-10">
                <h2 className="text-2xl sm:text-3xl font-black text-[#081c3b] tracking-[0.18em] font-serif uppercase">
                  CERTIFICATE
                </h2>
                <div className="flex items-center justify-center gap-2 text-[#c59b27]">
                  <span className="text-xs">—►</span>
                  <span className="text-[10px] font-bold text-[#b8860b] uppercase font-sans tracking-[0.2em]">OF TRAINING</span>
                  <span className="text-xs">◄—</span>
                </div>
              </div>

              {/* CERTIFICATE BODY TEXT */}
              <div className="text-center space-y-2.5 my-4 max-w-lg mx-auto relative z-10 font-serif">
                <p className="text-xs text-slate-700 italic">
                  This is to certify that
                </p>

                {/* RECIPIENT NAME */}
                <div className="py-1 relative inline-block w-full">
                  <h3 className="text-xl sm:text-2xl font-extrabold text-[#a16207] italic tracking-wide font-serif px-2">
                    Name of Recipient
                  </h3>
                  {/* Gold Underline with Center Diamond Ornament */}
                  <div className="flex items-center justify-center gap-1.5 mt-1">
                    <div className="h-[1px] bg-gradient-to-r from-transparent via-[#c59b27] to-transparent w-40" />
                    <div className="w-1.5 h-1.5 rotate-45 border border-[#c59b27] bg-amber-400" />
                    <div className="h-[1px] bg-gradient-to-r from-transparent via-[#c59b27] to-transparent w-40" />
                  </div>
                </div>

                <p className="text-[11px] text-slate-700">
                  has successfully completed the training program in
                </p>

                {/* COURSE NAME */}
                <div>
                  <h4 className="text-sm sm:text-lg font-bold text-[#081c3b] tracking-wide font-serif">
                    Name of Course
                  </h4>
                  <p className="text-[10px] text-slate-600 mt-0.5 font-sans font-medium">
                    from DD MMM YYYY to DD MMM YYYY (Duration)
                  </p>
                </div>

                {/* PROGRAM DESCRIPTION */}
                <p className="text-[10px] text-slate-600 leading-relaxed font-sans max-w-md mx-auto pt-1">
                  The program included comprehensive training, practical sessions and industry-relevant projects. We wish the recipient all the best for a successful career ahead.
                </p>
              </div>

              {/* FOOTER ROW: QR CODE, SIGNATURE & AUTHORIZED SEAL */}
              <div className="mt-6 pt-4 border-t border-slate-300 flex items-end justify-between gap-2 relative z-10 font-sans">
                
                {/* BOTTOM LEFT: QR CODE & ID INFO */}
                <div className="flex items-start gap-2">
                  <div className="p-1 bg-white border border-slate-300 rounded shadow-sm shrink-0">
                    <div className="w-10 h-10 bg-slate-950 p-0.5 rounded flex items-center justify-center text-white">
                      <QrCode className="w-9 h-9 text-white" />
                    </div>
                  </div>

                  <div className="text-[8.5px] text-slate-700 leading-snug space-y-0.5 text-left font-sans">
                    <p className="font-bold text-[#081c3b]">
                      Certificate ID : <span className="font-mono">NGTA/2024/CT/00002</span>
                    </p>
                    <p className="font-medium text-slate-600">
                      Issue Date : <span>DD MMM YYYY</span>
                    </p>
                    <div className="pt-0.5 text-[7.5px] text-slate-500">
                      <p className="font-semibold text-slate-700">Verify this certificate</p>
                      <p>by scanning the QR code</p>
                      <p className="text-blue-900 font-bold underline">or visit: www.nexgentechacademy.com/verify</p>
                    </div>
                  </div>
                </div>

                {/* BOTTOM CENTER: DIRECTOR SIGNATURE */}
                <div className="text-center space-y-0.5 mb-0.5">
                  <div className="font-serif italic text-base sm:text-lg text-[#081c3b] font-extrabold tracking-wide">
                    Rajiv Sharma
                  </div>
                  <div className="w-28 h-[1px] bg-slate-400 mx-auto" />
                  <p className="text-[10px] font-bold text-[#081c3b] font-serif">Director</p>
                </div>

                {/* BOTTOM RIGHT: EMBOSSED AUTHORIZED GOLD SEAL */}
                <div className="relative shrink-0 flex flex-col items-center">
                  <div className="relative w-16 h-16 sm:w-18 sm:h-18 rounded-full bg-gradient-to-tr from-amber-600 via-yellow-400 to-amber-500 p-0.5 shadow-xl flex items-center justify-center border border-amber-700">
                    <div className="w-full h-full rounded-full border border-dashed border-amber-950 bg-gradient-to-b from-amber-300 via-yellow-400 to-amber-500 flex flex-col items-center justify-center text-slate-950 text-center p-0.5">
                      <ShieldCheck className="w-4 h-4 text-[#081c3b]" />
                      <span className="text-[5.5px] font-black uppercase tracking-tight text-[#081c3b] font-sans leading-tight mt-0.5">
                        NEXGEN TECH ACADEMY<br />& RESEARCH<br />AUTHORIZED SEAL
                      </span>
                    </div>
                  </div>
                </div>

              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
