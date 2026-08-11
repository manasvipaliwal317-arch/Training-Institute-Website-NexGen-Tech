'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronRight, Home } from 'lucide-react';

export default function Breadcrumbs() {
  const pathname = usePathname();
  if (pathname === '/') return null;

  const pathSegments = pathname.split('/').filter((seg) => seg.length > 0);

  return (
    <nav className="flex items-center gap-2 text-xs text-slate-400 py-2">
      <Link href="/" className="hover:text-white transition-colors flex items-center gap-1">
        <Home className="w-3.5 h-3.5 text-blue-400" />
        <span>Home</span>
      </Link>
      {pathSegments.map((segment, index) => {
        const url = `/${pathSegments.slice(0, index + 1).join('/')}`;
        const isLast = index === pathSegments.length - 1;
        const formattedSegment = segment.replace(/-/g, ' ');

        return (
          <div key={url} className="flex items-center gap-2 capitalize">
            <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
            {isLast ? (
              <span className="font-semibold text-slate-200 line-clamp-1">{formattedSegment}</span>
            ) : (
              <Link href={url} className="hover:text-white transition-colors">
                {formattedSegment}
              </Link>
            )}
          </div>
        );
      })}
    </nav>
  );
}
