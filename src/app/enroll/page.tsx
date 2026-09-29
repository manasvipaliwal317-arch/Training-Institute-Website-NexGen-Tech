import { prisma } from '@/lib/prisma';
import StudentEnrollmentClient from '@/components/StudentEnrollmentClient';

export const metadata = {
  title: 'Official Course Enrollment & Seat Reservation | NexGen Tech Academy',
  description: 'Complete your official admission registration and reserve your cohort seat with a ₹1,000 fee.',
};

interface PageProps {
  searchParams: Promise<{ course?: string }>;
}

export default async function EnrollPage({ searchParams }: PageProps) {
  const resolvedParams = await searchParams;
  const initialCourseSlug = resolvedParams?.course || '';

  const courses = await prisma.course.findMany({
    select: {
      id: true,
      slug: true,
      title: true,
      fees: true,
      originalFees: true,
      duration: true,
      heroImage: true,
    },
    orderBy: { enrolledStudents: 'desc' },
  });

  const campuses = await prisma.campus.findMany({
    select: {
      id: true,
      slug: true,
      name: true,
      city: true,
    },
    orderBy: { isMain: 'desc' },
  });

  return (
    <div className="min-h-screen pb-16">
      <StudentEnrollmentClient
        courses={courses}
        campuses={campuses}
        initialCourseSlug={initialCourseSlug}
      />
    </div>
  );
}
