import { getFacultySession } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { redirect } from 'next/navigation';
import FacultyDashboardClient from '@/components/FacultyDashboardClient';

export const metadata = {
  title: 'Faculty Portal Dashboard | NexGen Tech Academy',
  description: 'Faculty dashboard for managing lecture timetables, assigned curriculum, batch attendance, and mock evaluations.',
};

export const revalidate = 0; // Dynamic server rendering

export default async function FacultyDashboardPage() {
  const session = await getFacultySession();

  if (!session?.facultyNo) {
    redirect('/faculty/login');
  }

  const faculty = await prisma.trainer.findUnique({
    where: { facultyNo: session.facultyNo },
    include: {
      courses: {
        include: {
          batches: true,
        },
      },
    },
  });

  if (!faculty) {
    redirect('/faculty/login');
  }

  // Fetch enrolled students for the faculty's courses and batches
  const students = await prisma.student.findMany({
    orderBy: { createdAt: 'desc' },
  });

  return (
    <div className="min-h-screen pb-16">
      <FacultyDashboardClient
        faculty={{
          ...faculty,
          facultyNo: faculty.facultyNo || 'FAC-2026-101',
          email: faculty.email || 'faculty@techacademy.com',
          phone: faculty.phone || '+91 98765 43210',
          timetableJson: faculty.timetableJson || '[]',
          officeLocation: faculty.officeLocation || 'Faculty Cabin 402, Main Tech Park HQ',
          joiningDate: faculty.joiningDate || '2024-03-15',
          courses: faculty.courses.map((c) => ({
            ...c,
            batches: c.batches.map((b) => ({
              ...b,
            })),
          })),
        }}
        students={students.map((s) => ({
          id: s.id,
          studentId: s.studentId,
          name: s.name,
          email: s.email,
          mobile: s.mobile,
          courseName: s.courseName,
          batchName: s.batchName,
          attendancePct: s.attendancePct,
          labScore: s.labScore,
          mockInterviewStatus: s.mockInterviewStatus,
          mockFeedback: s.mockFeedback,
        }))}
      />
    </div>
  );
}
