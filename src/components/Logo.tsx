import Image from 'next/image';
import Link from 'next/link';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
}

export default function Logo({ size = 'md', showText = true }: LogoProps) {
  const dimensions = {
    sm: { width: 32, height: 32, textClass: 'text-base' },
    md: { width: 40, height: 40, textClass: 'text-xl' },
    lg: { width: 52, height: 52, textClass: 'text-2xl' },
  }[size];

  return (
    <Link href="/" className="flex items-center gap-3 group">
      <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-blue-600/20 to-purple-600/20 p-1 border border-blue-500/30 group-hover:border-blue-400 transition-all shadow-md shadow-blue-600/10">
        <Image
          src="/logo.png"
          alt="NexGen Tech Academy Logo"
          width={dimensions.width}
          height={dimensions.height}
          className="object-contain transition-transform group-hover:scale-105 rounded-lg mix-blend-multiply dark:mix-blend-screen dark:brightness-110"
        />
      </div>

      {showText && (
        <div className="flex flex-col">
          <span className={`font-black tracking-tight text-white dark:text-white light:text-slate-900 group-hover:text-blue-400 transition-colors ${dimensions.textClass}`}>
            NEXGEN<span className="gradient-text ml-1">TECH</span>
          </span>
          <span className="text-[10px] uppercase font-bold tracking-widest text-blue-400 light:text-blue-600 -mt-1">
            Academy & Research
          </span>
        </div>
      )}
    </Link>
  );
}
