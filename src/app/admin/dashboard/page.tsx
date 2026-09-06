import { redirect } from 'next/navigation';
import { getSession } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import AdminPanel from '@/components/AdminPanel';

export const revalidate = 0; // Dynamic server rendering

export default async function AdminDashboardPage() {
  const session = await getSession();
  if (!session) {
    redirect('/admin/login');
  }

  const inquiries = await prisma.inquiry.findMany({
    orderBy: { createdAt: 'desc' },
  });

  const courses = await prisma.course.findMany({
    include: { category: true },
    orderBy: { createdAt: 'desc' },
  });

  const categories = await prisma.courseCategory.findMany({
    orderBy: { name: 'asc' },
  });

  const events = await prisma.event.findMany({
    orderBy: { createdAt: 'desc' },
  });

  const blogs = await prisma.blogPost.findMany({
    orderBy: { publishedAt: 'desc' },
  });

  const campuses = await prisma.campus.findMany({
    orderBy: { isMain: 'desc' },
  });

  const hiringDrives = await prisma.hiringDrive.findMany({
    orderBy: { createdAt: 'desc' },
  });

  const batches = await prisma.batch.findMany({
    include: { course: true },
    orderBy: { createdAt: 'desc' },
  });

  return (
    <AdminPanel
      inquiries={inquiries.map((i) => ({
        ...i,
        createdAt: i.createdAt.toISOString(),
      }))}
      courses={courses}
      categories={categories}
      events={events}
      blogs={blogs}
      campuses={campuses}
      hiringDrives={hiringDrives}
      batches={batches}
      userEmail={session.email}
    />
  );
}
