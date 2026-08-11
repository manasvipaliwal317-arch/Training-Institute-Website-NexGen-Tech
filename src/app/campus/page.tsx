import Image from 'next/image';
import { Laptop, Cpu, ShieldCheck, Palette, Wifi, Coffee, Users, MapPin, Sparkles } from 'lucide-react';
import HomeClientSection from '@/components/HomeClientSection';

export const metadata = {
  title: 'Campus & High-Tech Lab Infrastructure | NexGen Tech Academy',
  description: 'Tour our world-class campus infrastructure featuring NVIDIA GPU AI labs, Cisco hardware security server rooms, and Mac UI/UX design studios.',
};

export default function CampusPage() {
  return (
    <div className="space-y-16 py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Hero Header */}
      <div className="glass-card rounded-3xl p-8 sm:p-14 border border-blue-500/20 bg-gradient-to-br from-slate-900 via-blue-950/40 to-slate-900 text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-semibold uppercase tracking-wider mx-auto">
          <Sparkles className="w-4 h-4 text-amber-300" />
          <span>Next-Generation Infrastructure</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-black text-white tracking-tight">
          World-Class <span className="gradient-text">Lab Infrastructure</span>
        </h1>
        <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
          Designed to replicate high-tech corporate R&D environments. Experience hands-on computing with enterprise hardware.
        </p>
      </div>

      {/* Labs Showcase Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="glass-card rounded-2xl overflow-hidden border border-slate-800 space-y-4">
          <div className="relative h-64 w-full">
            <Image
              src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1000&q=80"
              alt="AI Supercomputing Lab"
              fill
              className="object-cover"
            />
          </div>
          <div className="p-6 space-y-3">
            <div className="flex items-center gap-2 text-blue-400 text-xs font-bold uppercase">
              <Cpu className="w-4 h-4" /> AI & Deep Learning Lab
            </div>
            <h3 className="text-xl font-bold text-white">NVIDIA A100 Tensor Core GPU Cluster</h3>
            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
              Dedicated high-performance multi-GPU rigs for training PyTorch models, fine-tuning Llama 3 LLMs, and performing computer vision inferencing.
            </p>
            <div className="flex items-center gap-4 text-xs text-slate-300 pt-2 border-t border-slate-800">
              <span>• 64GB High-Bandwidth VRAM</span>
              <span>• CUDA 12 Parallel Accelerator</span>
            </div>
          </div>
        </div>

        <div className="glass-card rounded-2xl overflow-hidden border border-slate-800 space-y-4">
          <div className="relative h-64 w-full">
            <Image
              src="https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1000&q=80"
              alt="Cisco Hardware Security Lab"
              fill
              className="object-cover"
            />
          </div>
          <div className="p-6 space-y-3">
            <div className="flex items-center gap-2 text-purple-400 text-xs font-bold uppercase">
              <ShieldCheck className="w-4 h-4" /> Cyber Security & Networking Lab
            </div>
            <h3 className="text-xl font-bold text-white">Cisco Hardware Server & Firewall Racks</h3>
            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
              Isolated sandboxed network racks equipped with Cisco Catalyst switches, Fortinet enterprise firewalls, and Kali Linux penetration testing stations.
            </p>
            <div className="flex items-center gap-4 text-xs text-slate-300 pt-2 border-t border-slate-800">
              <span>• Hardware Air-gapped SOC</span>
              <span>• SIEM Splunk Log Engine</span>
            </div>
          </div>
        </div>

        <div className="glass-card rounded-2xl overflow-hidden border border-slate-800 space-y-4">
          <div className="relative h-64 w-full">
            <Image
              src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1000&q=80"
              alt="UI UX Studio"
              fill
              className="object-cover"
            />
          </div>
          <div className="p-6 space-y-3">
            <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase">
              <Palette className="w-4 h-4" /> UI/UX Product Design Studio
            </div>
            <h3 className="text-xl font-bold text-white">Apple Mac Studio & Color-Accurate Displays</h3>
            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
              Equipped with Apple M2 Max Mac Studios, 5K Studio Displays, and enterprise software licenses for Figma, Adobe Creative Cloud, and Principle.
            </p>
            <div className="flex items-center gap-4 text-xs text-slate-300 pt-2 border-t border-slate-800">
              <span>• P3 Wide Color Displays</span>
              <span>• Ergonomic Wacom Tablets</span>
            </div>
          </div>
        </div>

        <div className="glass-card rounded-2xl overflow-hidden border border-slate-800 space-y-4">
          <div className="relative h-64 w-full">
            <Image
              src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1000&q=80"
              alt="Collaborative Lounge"
              fill
              className="object-cover"
            />
          </div>
          <div className="p-6 space-y-3">
            <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase">
              <Coffee className="w-4 h-4" /> Student Innovation Lounge
            </div>
            <h3 className="text-xl font-bold text-white">Hackathon & Collaboration Hub</h3>
            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
              24/7 accessible breakout rooms, high-speed 1Gbps fiber Wi-Fi, tech library, and cafeteria for group projects and weekend hackathons.
            </p>
            <div className="flex items-center gap-4 text-xs text-slate-300 pt-2 border-t border-slate-800">
              <span>• 1Gbps Dedicated Fiber</span>
              <span>• Soundproof Discussion Pods</span>
            </div>
          </div>
        </div>
      </div>

      {/* Book Visit CTA */}
      <div className="glass-card rounded-3xl p-8 sm:p-12 border border-slate-800 text-center space-y-4">
        <h2 className="text-2xl sm:text-3xl font-bold text-white">Want to Experience Our Labs in Person?</h2>
        <p className="text-slate-400 text-xs sm:text-sm max-w-xl mx-auto">
          Book a free campus walk-through with our counselors and test-drive our lab workstations.
        </p>
        <div className="pt-2 flex justify-center">
          <HomeClientSection mode="demo-btn" buttonText="Schedule Physical Campus Visit" />
        </div>
      </div>
    </div>
  );
}
