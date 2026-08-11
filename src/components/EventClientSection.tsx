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
}

export default function EventClientSection({
  eventId,
  eventTitle,
  eventDate,
  eventTime,
  venue,
  slug,
}: EventClientSectionProps) {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className="flex items-center gap-2">
      <Link
        href={`/events/${slug}`}
        className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold text-xs transition-colors"
      >
        Details
      </Link>

      <button
        onClick={() => setModalOpen(true)}
        className="px-4 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-semibold text-xs transition-all shadow-md shadow-cyan-600/20 flex items-center gap-1"
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
