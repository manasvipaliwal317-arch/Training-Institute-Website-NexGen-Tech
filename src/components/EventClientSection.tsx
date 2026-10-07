'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Send, ArrowRight } from 'lucide-react';
import EventRegisterModal from './EventRegisterModal';

interface EventClientSectionProps {
  eventId: string;
  eventTitle: string;
  eventDate: string;
  eventTime: string;
  venue: string;
  slug: string;
  hideDetails?: boolean;
}

export default function EventClientSection({
  eventId,
  eventTitle,
  eventDate,
  eventTime,
  venue,
  slug,
  hideDetails = false,
}: EventClientSectionProps) {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className="flex items-center gap-2">
      {!hideDetails && (
        <Link
          href={`/events/${slug}`}
          className="px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 active:scale-95 text-slate-800 dark:bg-slate-800 dark:hover:bg-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 font-bold text-xs transition-all shrink-0 cursor-pointer"
        >
          Details
        </Link>
      )}

      <button
        type="button"
        onClick={() => setModalOpen(true)}
        className="px-4 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 active:scale-95 text-white font-bold text-xs transition-all shadow-md shadow-cyan-600/25 flex items-center gap-1.5 cursor-pointer shrink-0"
      >
        <span>Free RSVP</span>
        <Send className="w-3.5 h-3.5" />
      </button>

      <EventRegisterModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        eventId={eventId}
        eventTitle={eventTitle}
        eventDate={eventDate}
        eventTime={eventTime}
        venue={venue}
      />
    </div>
  );
}
