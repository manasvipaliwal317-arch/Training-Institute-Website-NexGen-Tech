import { getStudentSession } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { redirect } from 'next/navigation';
import StudentDashboardClient from '@/components/StudentDashboardClient';

export const metadata = {
  title: 'My Student Portal | NexGen Tech Academy',
  description: 'View your academic performance, remaining fees, mock interviews, and batch activities.',
};

export default async function StudentDashboardPage() {
  const session = await getStudentSession();

  if (!session?.studentId) {
    redirect('/student/login');
  }

  const student = await prisma.student.findUnique({
    where: { studentId: session.studentId },
  });

  if (!student) {
    redirect('/student/login');
  }

  return (
    <div className="min-h-screen pb-16">
      <StudentDashboardClient student={student} />
    </div>
  );
}
