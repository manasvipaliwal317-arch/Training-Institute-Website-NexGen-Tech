'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronRight, Home } from 'lucide-react';

export default function Breadcrumbs() {
  const pathname = usePathname();
  if (pathname === '/' || pathname === '/_not-found' || pathname.includes('not-found')) return null;

  const pathSegments = pathname.split('/').filter((seg) => seg.length > 0);

  return (
    <nav className="flex items-center flex-wrap gap-x-2 gap-y-1 text-xs text-slate-600 dark:text-slate-400 py-2">
      <Link href="/" className="hover:text-blue-600 dark:hover:text-white transition-colors flex items-center gap-1 font-semibold text-slate-700 dark:text-slate-300">
        <Home className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400 stroke-[2.2]" />
        <span>Home</span>
      </Link>
      {pathSegments.map((segment, index) => {
        const url = `/${pathSegments.slice(0, index + 1).join('/')}`;
        const isLast = index === pathSegments.length - 1;
        const formattedSegment = segment.replace(/-/g, ' ');

        return (
          <div key={url} className="flex items-center gap-2 capitalize">
            <ChevronRight className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500 stroke-[2]" />
            {isLast ? (
              <span className="font-bold text-slate-800 dark:text-slate-100 line-clamp-1">{formattedSegment}</span>
            ) : (
              <Link href={url} className="hover:text-blue-600 dark:hover:text-white transition-colors font-medium text-slate-700 dark:text-slate-300">
                {formattedSegment}
              </Link>
            )}
          </div>
        );
      })}
    </nav>
  );
}
