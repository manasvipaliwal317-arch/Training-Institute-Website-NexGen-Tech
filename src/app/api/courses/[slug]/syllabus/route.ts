import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { generateSyllabusPdf } from '@/lib/pdf/syllabus-generator';

export const dynamic = 'force-dynamic';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;

    if (!slug) {
      return new NextResponse('Course slug is required', { status: 400 });
    }

    const course = await prisma.course.findUnique({
      where: { slug },
      include: {
        category: true,
        trainer: true,
      },
    });

    if (!course) {
      return new NextResponse('Course not found', { status: 404 });
    }

    let syllabus = [];
    let tools = [];
    let projects = [];
    let careerRoles = [];

    try {
      syllabus = JSON.parse(course.syllabusJson || '[]');
    } catch {
      syllabus = [];
    }

    try {
      tools = JSON.parse(course.toolsJson || '[]');
    } catch {
      tools = [];
    }

    try {
      projects = JSON.parse(course.projectsJson || '[]');
    } catch {
      projects = [];
    }

    try {
      careerRoles = JSON.parse(course.careerRolesJson || '[]');
    } catch {
      careerRoles = [];
    }

    const pdfBytes = await generateSyllabusPdf({
      title: course.title,
      tagline: course.tagline,
      description: course.description,
      categoryName: course.category?.name || 'Technology & Engineering',
      level: course.level,
      mode: course.mode,
      duration: course.duration,
      hoursCount: course.hoursCount,
      fees: course.fees,
      originalFees: course.originalFees,
      rating: course.rating,
      ratingsCount: course.ratingsCount,
      enrolledStudents: course.enrolledStudents,
      syllabus,
      tools,
      projects,
      careerRoles,
      trainerName: course.trainer?.name,
      trainerRole: course.trainer?.role,
      trainerCompany: course.trainer?.formerCompany,
    });

    const url = new URL(request.url);
    const isDownload =
      url.searchParams.get('download') === '1' ||
      url.searchParams.get('download') === 'true';

    const safeFilename = `${course.slug}-syllabus.pdf`;
    const disposition = isDownload
      ? `attachment; filename="${safeFilename}"`
      : `inline; filename="${safeFilename}"`;

    return new Response(Buffer.from(pdfBytes), {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': disposition,
        'Content-Length': pdfBytes.byteLength.toString(),
        'Cache-Control': 'public, max-age=3600, stale-while-revalidate=86400',
      },
    });
  } catch (error) {
    console.error('Failed to generate syllabus PDF:', error);
    return new NextResponse('Internal Server Error generating syllabus PDF', {
      status: 500,
    });
  }
}
