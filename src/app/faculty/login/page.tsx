import { getFacultySession } from '@/lib/auth';
import { redirect } from 'next/navigation';
import FacultyLoginClient from '@/components/FacultyLoginClient';

export const metadata = {
  title: 'Faculty & Mentor Portal Login | NexGen Tech Academy',
  description: 'Faculty login to view assigned courses, lecture timetables, batch student rosters, and mock interview evaluations.',
};

export default async function FacultyLoginPage() {
  const session = await getFacultySession();
  if (session?.facultyNo) {
    redirect('/faculty/dashboard');
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12 px-4">
      <FacultyLoginClient />
    </div>
  );
}
