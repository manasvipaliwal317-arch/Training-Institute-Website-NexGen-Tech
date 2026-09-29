import { getStudentSession } from '@/lib/auth';
import { redirect } from 'next/navigation';
import StudentLoginClient from '@/components/StudentLoginClient';

export const metadata = {
  title: 'Student Portal Login | NexGen Tech Academy',
  description: 'Log into the NexGen Tech Academy student portal to view academic performance, fees, mock interviews, and batch activities.',
};

export default async function StudentLoginPage() {
  const session = await getStudentSession();
  if (session?.studentId) {
    redirect('/student/dashboard');
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12">
      <StudentLoginClient />
    </div>
  );
}
