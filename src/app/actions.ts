'use server';

import { prisma } from '@/lib/prisma';
import { createSession, removeSession, getSession } from '@/lib/auth';
import { revalidatePath } from 'next/cache';
import {
  InquirySchema,
  EventRegistrationSchema,
  CourseSchema,
  EventSchema,
  BlogPostSchema,
  CampusSchema,
  HiringDriveSchema,
  BatchSchema,
} from '@/lib/validations';

export async function submitInquiryAction(formData: FormData) {
  try {
    const rawData = {
      name: formData.get('name')?.toString().trim(),
      email: formData.get('email')?.toString().trim(),
      phone: formData.get('phone')?.toString().trim(),
      courseSlug: formData.get('courseSlug')?.toString().trim() || null,
      courseName: formData.get('courseName')?.toString().trim() || null,
      preferredMode: formData.get('preferredMode')?.toString().trim() || 'Hybrid',
      preferredCampus: formData.get('preferredCampus')?.toString().trim() || 'Main Tech Park HQ',
      message: formData.get('message')?.toString().trim() || null,
      source: formData.get('source')?.toString().trim() || 'Website Form',
    };

    const validated = InquirySchema.parse(rawData);

    await prisma.inquiry.create({
      data: {
        ...validated,
        status: 'NEW',
      },
    });

    revalidatePath('/admin/dashboard');

    return {
      success: true,
      message: 'Thank you! Your request has been received. Our senior academic counselor will call you within 30 minutes to confirm your seat/demo session.',
    };
  } catch (error: any) {
    console.error('Error submitting inquiry:', error);
    const errorMsg = error?.errors?.[0]?.message || 'An unexpected error occurred. Please check your inputs.';
    return { success: false, error: errorMsg };
  }
}

export async function registerEventAction(formData: FormData) {
  try {
    const rawData = {
      eventId: formData.get('eventId')?.toString().trim(),
      eventTitle: formData.get('eventTitle')?.toString().trim(),
      name: formData.get('name')?.toString().trim(),
      email: formData.get('email')?.toString().trim(),
      phone: formData.get('phone')?.toString().trim(),
    };

    const validated = EventRegistrationSchema.parse(rawData);

    await prisma.eventRegistration.create({
      data: validated,
    });

    await prisma.event.update({
      where: { id: validated.eventId },
      data: { registrationsCount: { increment: 1 } },
    });

    revalidatePath('/events');
    return {
      success: true,
      message: 'Registration successful! Check your email for calendar invite, venue details, and repository access links.',
    };
  } catch (error: any) {
    console.error('Event registration error:', error);
    const errorMsg = error?.errors?.[0]?.message || 'Failed to complete registration.';
    return { success: false, error: errorMsg };
  }
}

export async function adminLoginAction(formData: FormData) {
  try {
    const email = formData.get('email')?.toString().trim();
    const password = formData.get('password')?.toString().trim();

    if (!email || !password) {
      return { success: false, error: 'Please enter both email and password.' };
    }

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user || user.password !== password) {
      return { success: false, error: 'Invalid admin email or password credentials.' };
    }

    await createSession(user.email, user.role);
    return { success: true };
  } catch (error) {
    console.error('Admin login error:', error);
    return { success: false, error: 'Authentication failed. Please try again.' };
  }
}

export async function adminLogoutAction() {
  await removeSession();
  revalidatePath('/admin');
  revalidatePath('/admin/dashboard');
  revalidatePath('/admin/login');
  return { success: true };
}

export async function updateInquiryStatusAction(id: string, status: string) {
  try {
    const session = await getSession();
    if (!session) return { success: false, error: 'Unauthorized.' };

    await prisma.inquiry.update({
      where: { id },
      data: { status },
    });

    revalidatePath('/admin/dashboard');
    return { success: true };
  } catch (error) {
    return { success: false, error: 'Failed to update lead status.' };
  }
}

export async function deleteInquiryAction(id: string) {
  try {
    const session = await getSession();
    if (!session) return { success: false, error: 'Unauthorized.' };

    await prisma.inquiry.delete({ where: { id } });
    revalidatePath('/admin/dashboard');
    return { success: true };
  } catch (error) {
    return { success: false, error: 'Failed to delete lead.' };
  }
}

export async function updateInquiryAction(id: string, formData: FormData) {
  try {
    const session = await getSession();
    if (!session) return { success: false, error: 'Unauthorized.' };

    const rawData = {
      name: formData.get('name')?.toString().trim(),
      email: formData.get('email')?.toString().trim(),
      phone: formData.get('phone')?.toString().trim(),
      courseName: formData.get('courseName')?.toString().trim() || null,
      preferredMode: formData.get('preferredMode')?.toString().trim() || 'Hybrid',
      preferredCampus: formData.get('preferredCampus')?.toString().trim() || 'Main Tech Park HQ',
      status: formData.get('status')?.toString().trim() || 'NEW',
      notes: formData.get('notes')?.toString().trim() || null,
      message: formData.get('message')?.toString().trim() || null,
    };

    await prisma.inquiry.update({
      where: { id },
      data: rawData,
    });

    revalidatePath('/admin/dashboard');
    return { success: true };
  } catch (error: any) {
    console.error('Update inquiry error:', error);
    return { success: false, error: error?.message || 'Failed to update inquiry.' };
  }
}

export async function createCourseAction(formData: FormData) {
  try {
    const session = await getSession();
    if (!session) return { success: false, error: 'Unauthorized.' };

    const rawData = {
      title: formData.get('title')?.toString().trim(),
      slug: formData.get('slug')?.toString().trim(),
      tagline: formData.get('tagline')?.toString().trim(),
      description: formData.get('description')?.toString().trim(),
      categoryId: formData.get('categoryId')?.toString().trim(),
      level: formData.get('level')?.toString().trim() || 'All Levels',
      mode: formData.get('mode')?.toString().trim() || 'Hybrid',
      duration: formData.get('duration')?.toString().trim(),
      hoursCount: Number(formData.get('hoursCount')) || 120,
      fees: Number(formData.get('fees')) || 45000,
      originalFees: Number(formData.get('originalFees')) || 60000,
      heroImage: formData.get('heroImage')?.toString().trim(),
      featured: formData.get('featured') === 'on' || formData.get('featured') === 'true',
      bestseller: formData.get('bestseller') === 'on' || formData.get('bestseller') === 'true',
    };

    const validated = CourseSchema.parse(rawData);

    await prisma.course.create({
      data: {
        ...validated,
        syllabusJson: JSON.stringify([{ module: 'Module 1', title: 'Core Foundations', details: ['Overview & Core Concepts', 'Hands-on Lab'] }]),
        toolsJson: JSON.stringify(['Modern Tech Stack', 'Enterprise CLI', 'DevOps Tools']),
        projectsJson: JSON.stringify([{ name: 'Production Capstone', description: 'Industry-grade implementation.' }]),
        careerRolesJson: JSON.stringify([{ title: 'Specialist Engineer', salary: '8 - 18 LPA' }]),
        faqsJson: JSON.stringify([{ q: 'Is placement assistance included?', a: 'Yes, 100% placement drive access.' }]),
      },
    });

    revalidatePath('/courses');
    revalidatePath(`/courses/${validated.slug}`);
    revalidatePath('/admin/dashboard');
    return { success: true };
  } catch (error: any) {
    console.error('Create course error:', error);
    const errorMsg = error?.errors?.[0]?.message || 'Failed to create course.';
    return { success: false, error: errorMsg };
  }
}

export async function updateCourseAction(id: string, formData: FormData) {
  try {
    const session = await getSession();
    if (!session) return { success: false, error: 'Unauthorized.' };

    const rawData = {
      title: formData.get('title')?.toString().trim(),
      slug: formData.get('slug')?.toString().trim(),
      tagline: formData.get('tagline')?.toString().trim(),
      description: formData.get('description')?.toString().trim(),
      categoryId: formData.get('categoryId')?.toString().trim(),
      level: formData.get('level')?.toString().trim() || 'All Levels',
      mode: formData.get('mode')?.toString().trim() || 'Hybrid',
      duration: formData.get('duration')?.toString().trim(),
      hoursCount: Number(formData.get('hoursCount')) || 120,
      fees: Number(formData.get('fees')) || 45000,
      originalFees: Number(formData.get('originalFees')) || 60000,
      heroImage: formData.get('heroImage')?.toString().trim(),
      featured: formData.get('featured') === 'on' || formData.get('featured') === 'true',
      bestseller: formData.get('bestseller') === 'on' || formData.get('bestseller') === 'true',
    };

    const validated = CourseSchema.parse(rawData);

    await prisma.course.update({
      where: { id },
      data: validated,
    });

    revalidatePath('/courses');
    revalidatePath(`/courses/${validated.slug}`);
    revalidatePath('/admin/dashboard');
    return { success: true };
  } catch (error: any) {
    console.error('Update course error:', error);
    const errorMsg = error?.errors?.[0]?.message || 'Failed to update course.';
    return { success: false, error: errorMsg };
  }
}

export async function deleteCourseAction(id: string) {
  try {
    const session = await getSession();
    if (!session) return { success: false, error: 'Unauthorized.' };

    await prisma.course.delete({ where: { id } });
    revalidatePath('/courses');
    revalidatePath('/admin/dashboard');
    return { success: true };
  } catch (error) {
    return { success: false, error: 'Failed to delete course.' };
  }
}

export async function createEventAction(formData: FormData) {
  try {
    const session = await getSession();
    if (!session) return { success: false, error: 'Unauthorized.' };

    const rawData = {
      title: formData.get('title')?.toString().trim(),
      slug: formData.get('slug')?.toString().trim(),
      tagline: formData.get('tagline')?.toString().trim(),
      description: formData.get('description')?.toString().trim(),
      bannerImage: formData.get('bannerImage')?.toString().trim(),
      eventDate: formData.get('eventDate')?.toString().trim(),
      eventTime: formData.get('eventTime')?.toString().trim(),
      venue: formData.get('venue')?.toString().trim(),
      mode: formData.get('mode')?.toString().trim() || 'Live Online',
      speakerName: formData.get('speakerName')?.toString().trim(),
      speakerRole: formData.get('speakerRole')?.toString().trim(),
      speakerPhoto: formData.get('speakerPhoto')?.toString().trim(),
      speakerBio: formData.get('speakerBio')?.toString().trim(),
      category: formData.get('category')?.toString().trim() || 'Masterclass',
      isPastEvent: formData.get('isPastEvent') === 'on' || formData.get('isPastEvent') === 'true',
    };

    const validated = EventSchema.parse(rawData);

    await prisma.event.create({
      data: validated,
    });

    revalidatePath('/events');
    revalidatePath(`/events/${validated.slug}`);
    revalidatePath('/admin/dashboard');
    return { success: true };
  } catch (error: any) {
    console.error('Create event error:', error);
    const errorMsg = error?.errors?.[0]?.message || 'Failed to create event.';
    return { success: false, error: errorMsg };
  }
}

export async function updateEventAction(id: string, formData: FormData) {
  try {
    const session = await getSession();
    if (!session) return { success: false, error: 'Unauthorized.' };

    const rawData = {
      title: formData.get('title')?.toString().trim(),
      slug: formData.get('slug')?.toString().trim(),
      tagline: formData.get('tagline')?.toString().trim(),
      description: formData.get('description')?.toString().trim(),
      bannerImage: formData.get('bannerImage')?.toString().trim(),
      eventDate: formData.get('eventDate')?.toString().trim(),
      eventTime: formData.get('eventTime')?.toString().trim(),
      venue: formData.get('venue')?.toString().trim(),
      mode: formData.get('mode')?.toString().trim() || 'Live Online',
      speakerName: formData.get('speakerName')?.toString().trim(),
      speakerRole: formData.get('speakerRole')?.toString().trim(),
      speakerPhoto: formData.get('speakerPhoto')?.toString().trim(),
      speakerBio: formData.get('speakerBio')?.toString().trim(),
      category: formData.get('category')?.toString().trim() || 'Masterclass',
      isPastEvent: formData.get('isPastEvent') === 'on' || formData.get('isPastEvent') === 'true',
    };

    const validated = EventSchema.parse(rawData);

    await prisma.event.update({
      where: { id },
      data: validated,
    });

    revalidatePath('/events');
    revalidatePath(`/events/${validated.slug}`);
    revalidatePath('/admin/dashboard');
    return { success: true };
  } catch (error: any) {
    console.error('Update event error:', error);
    const errorMsg = error?.errors?.[0]?.message || 'Failed to update event.';
    return { success: false, error: errorMsg };
  }
}

export async function deleteEventAction(id: string) {
  try {
    const session = await getSession();
    if (!session) return { success: false, error: 'Unauthorized.' };

    await prisma.event.delete({ where: { id } });
    revalidatePath('/events');
    revalidatePath('/admin/dashboard');
    return { success: true };
  } catch (error) {
    return { success: false, error: 'Failed to delete event.' };
  }
}

export async function createBlogAction(formData: FormData) {
  try {
    const session = await getSession();
    if (!session) return { success: false, error: 'Unauthorized.' };

    const rawData = {
      title: formData.get('title')?.toString().trim(),
      slug: formData.get('slug')?.toString().trim(),
      excerpt: formData.get('excerpt')?.toString().trim(),
      content: formData.get('content')?.toString().trim(),
      category: formData.get('category')?.toString().trim() || 'AI',
      featuredImage: formData.get('featuredImage')?.toString().trim(),
      authorName: formData.get('authorName')?.toString().trim(),
      authorRole: formData.get('authorRole')?.toString().trim(),
      authorPhoto: formData.get('authorPhoto')?.toString().trim(),
      readTime: formData.get('readTime')?.toString().trim() || '5 min read',
      isFeatured: formData.get('isFeatured') === 'on' || formData.get('isFeatured') === 'true',
    };

    const validated = BlogPostSchema.parse(rawData);

    await prisma.blogPost.create({
      data: {
        ...validated,
        tagsJson: JSON.stringify(['Tech', 'Engineering', 'Guide']),
      },
    });

    revalidatePath('/blog');
    revalidatePath(`/blog/${validated.slug}`);
    revalidatePath('/admin/dashboard');
    return { success: true };
  } catch (error: any) {
    console.error('Create blog error:', error);
    const errorMsg = error?.errors?.[0]?.message || 'Failed to publish blog post.';
    return { success: false, error: errorMsg };
  }
}

export async function updateBlogAction(id: string, formData: FormData) {
  try {
    const session = await getSession();
    if (!session) return { success: false, error: 'Unauthorized.' };

    const rawData = {
      title: formData.get('title')?.toString().trim(),
      slug: formData.get('slug')?.toString().trim(),
      excerpt: formData.get('excerpt')?.toString().trim(),
      content: formData.get('content')?.toString().trim(),
      category: formData.get('category')?.toString().trim() || 'AI',
      featuredImage: formData.get('featuredImage')?.toString().trim(),
      authorName: formData.get('authorName')?.toString().trim(),
      authorRole: formData.get('authorRole')?.toString().trim(),
      authorPhoto: formData.get('authorPhoto')?.toString().trim(),
      readTime: formData.get('readTime')?.toString().trim() || '5 min read',
      isFeatured: formData.get('isFeatured') === 'on' || formData.get('isFeatured') === 'true',
    };

    const validated = BlogPostSchema.parse(rawData);

    await prisma.blogPost.update({
      where: { id },
      data: validated,
    });

    revalidatePath('/blog');
    revalidatePath(`/blog/${validated.slug}`);
    revalidatePath('/admin/dashboard');
    return { success: true };
  } catch (error: any) {
    console.error('Update blog error:', error);
    const errorMsg = error?.errors?.[0]?.message || 'Failed to update blog post.';
    return { success: false, error: errorMsg };
  }
}

export async function deleteBlogAction(id: string) {
  try {
    const session = await getSession();
    if (!session) return { success: false, error: 'Unauthorized.' };

    await prisma.blogPost.delete({ where: { id } });
    revalidatePath('/blog');
    revalidatePath('/admin/dashboard');
    return { success: true };
  } catch (error) {
    return { success: false, error: 'Failed to delete blog post.' };
  }
}

export async function createCampusAction(formData: FormData) {
  try {
    const session = await getSession();
    if (!session) return { success: false, error: 'Unauthorized.' };

    const rawData = {
      name: formData.get('name')?.toString().trim(),
      slug: formData.get('slug')?.toString().trim(),
      type: formData.get('type')?.toString().trim() || 'Regional Branch',
      address: formData.get('address')?.toString().trim(),
      city: formData.get('city')?.toString().trim(),
      phone: formData.get('phone')?.toString().trim(),
      email: formData.get('email')?.toString().trim(),
      workingHours: formData.get('workingHours')?.toString().trim() || 'Mon - Sun: 8:00 AM - 9:00 PM',
      landmarks: formData.get('landmarks')?.toString().trim(),
      mapEmbedUrl: formData.get('mapEmbedUrl')?.toString().trim(),
      coverImage: formData.get('coverImage')?.toString().trim(),
      isMain: formData.get('isMain') === 'on' || formData.get('isMain') === 'true',
    };

    const validated = CampusSchema.parse(rawData);

    await prisma.campus.create({
      data: {
        ...validated,
        galleryJson: JSON.stringify([]),
      },
    });

    revalidatePath('/contact');
    revalidatePath('/about');
    revalidatePath('/admin/dashboard');
    return { success: true };
  } catch (error: any) {
    console.error('Create campus error:', error);
    const errorMsg = error?.errors?.[0]?.message || 'Failed to create campus branch.';
    return { success: false, error: errorMsg };
  }
}

export async function updateCampusAction(id: string, formData: FormData) {
  try {
    const session = await getSession();
    if (!session) return { success: false, error: 'Unauthorized.' };

    const rawData = {
      name: formData.get('name')?.toString().trim(),
      slug: formData.get('slug')?.toString().trim(),
      type: formData.get('type')?.toString().trim() || 'Regional Branch',
      address: formData.get('address')?.toString().trim(),
      city: formData.get('city')?.toString().trim(),
      phone: formData.get('phone')?.toString().trim(),
      email: formData.get('email')?.toString().trim(),
      workingHours: formData.get('workingHours')?.toString().trim() || 'Mon - Sun: 8:00 AM - 9:00 PM',
      landmarks: formData.get('landmarks')?.toString().trim(),
      mapEmbedUrl: formData.get('mapEmbedUrl')?.toString().trim(),
      coverImage: formData.get('coverImage')?.toString().trim(),
      isMain: formData.get('isMain') === 'on' || formData.get('isMain') === 'true',
    };

    const validated = CampusSchema.parse(rawData);

    await prisma.campus.update({
      where: { id },
      data: validated,
    });

    revalidatePath('/contact');
    revalidatePath('/about');
    revalidatePath('/admin/dashboard');
    return { success: true };
  } catch (error: any) {
    console.error('Update campus error:', error);
    const errorMsg = error?.errors?.[0]?.message || 'Failed to update campus branch.';
    return { success: false, error: errorMsg };
  }
}

export async function deleteCampusAction(id: string) {
  try {
    const session = await getSession();
    if (!session) return { success: false, error: 'Unauthorized.' };

    await prisma.campus.delete({ where: { id } });
    revalidatePath('/contact');
    revalidatePath('/about');
    revalidatePath('/admin/dashboard');
    return { success: true };
  } catch (error) {
    return { success: false, error: 'Failed to delete campus.' };
  }
}

export async function createHiringDriveAction(formData: FormData) {
  try {
    const session = await getSession();
    if (!session) return { success: false, error: 'Unauthorized.' };

    const rawData = {
      companyName: formData.get('companyName')?.toString().trim(),
      slug: formData.get('slug')?.toString().trim(),
      companyLogo: formData.get('companyLogo')?.toString().trim(),
      role: formData.get('role')?.toString().trim(),
      packageLpa: formData.get('packageLpa')?.toString().trim(),
      jobType: formData.get('jobType')?.toString().trim() || 'Full-Time',
      eligibility: formData.get('eligibility')?.toString().trim(),
      location: formData.get('location')?.toString().trim(),
      experience: formData.get('experience')?.toString().trim() || 'Fresher - 2 Yrs',
      driveDate: formData.get('driveDate')?.toString().trim(),
      registrationDeadline: formData.get('registrationDeadline')?.toString().trim(),
      status: formData.get('status')?.toString().trim() || 'ACTIVE',
      openPositions: Number(formData.get('openPositions')) || 10,
      description: formData.get('description')?.toString().trim(),
      applyUrl: formData.get('applyUrl')?.toString().trim() || null,
    };

    const validated = HiringDriveSchema.parse(rawData);

    const skillsRaw = formData.get('skills')?.toString().trim();
    const skillsArray = skillsRaw ? skillsRaw.split(',').map((s) => s.trim()).filter(Boolean) : [];

    await prisma.hiringDrive.create({
      data: {
        ...validated,
        skillsRequiredJson: JSON.stringify(skillsArray),
      },
    });

    revalidatePath('/placements');
    revalidatePath('/hiring-drives');
    revalidatePath('/admin/dashboard');
    return { success: true };
  } catch (error: any) {
    console.error('Create hiring drive error:', error);
    const errorMsg = error?.errors?.[0]?.message || 'Failed to create hiring drive.';
    return { success: false, error: errorMsg };
  }
}

export async function updateHiringDriveAction(id: string, formData: FormData) {
  try {
    const session = await getSession();
    if (!session) return { success: false, error: 'Unauthorized.' };

    const rawData = {
      companyName: formData.get('companyName')?.toString().trim(),
      slug: formData.get('slug')?.toString().trim(),
      companyLogo: formData.get('companyLogo')?.toString().trim(),
      role: formData.get('role')?.toString().trim(),
      packageLpa: formData.get('packageLpa')?.toString().trim(),
      jobType: formData.get('jobType')?.toString().trim() || 'Full-Time',
      eligibility: formData.get('eligibility')?.toString().trim(),
      location: formData.get('location')?.toString().trim(),
      experience: formData.get('experience')?.toString().trim() || 'Fresher - 2 Yrs',
      driveDate: formData.get('driveDate')?.toString().trim(),
      registrationDeadline: formData.get('registrationDeadline')?.toString().trim(),
      status: formData.get('status')?.toString().trim() || 'ACTIVE',
      openPositions: Number(formData.get('openPositions')) || 10,
      description: formData.get('description')?.toString().trim(),
      applyUrl: formData.get('applyUrl')?.toString().trim() || null,
    };

    const validated = HiringDriveSchema.parse(rawData);

    const skillsRaw = formData.get('skills')?.toString().trim();
    const skillsArray = skillsRaw ? skillsRaw.split(',').map((s) => s.trim()).filter(Boolean) : [];

    await prisma.hiringDrive.update({
      where: { id },
      data: {
        ...validated,
        skillsRequiredJson: JSON.stringify(skillsArray),
      },
    });

    revalidatePath('/placements');
    revalidatePath('/hiring-drives');
    revalidatePath('/admin/dashboard');
    return { success: true };
  } catch (error: any) {
    console.error('Update hiring drive error:', error);
    const errorMsg = error?.errors?.[0]?.message || 'Failed to update hiring drive.';
    return { success: false, error: errorMsg };
  }
}

export async function deleteHiringDriveAction(id: string) {
  try {
    const session = await getSession();
    if (!session) return { success: false, error: 'Unauthorized.' };

    await prisma.hiringDrive.delete({ where: { id } });
    revalidatePath('/placements');
    revalidatePath('/hiring-drives');
    revalidatePath('/admin/dashboard');
    return { success: true };
  } catch (error) {
    return { success: false, error: 'Failed to delete hiring drive.' };
  }
}

export async function createBatchAction(formData: FormData) {
  try {
    const session = await getSession();
    if (!session) return { success: false, error: 'Unauthorized.' };

    const rawData = {
      courseId: formData.get('courseId')?.toString().trim(),
      startDate: formData.get('startDate')?.toString().trim(),
      timing: formData.get('timing')?.toString().trim(),
      mode: formData.get('mode')?.toString().trim() || 'Hybrid',
      seatsTotal: Number(formData.get('seatsTotal')) || 20,
      seatsAvailable: Number(formData.get('seatsAvailable')) || 5,
      status: formData.get('status')?.toString().trim() || 'Filling Fast',
      campusLocation: formData.get('campusLocation')?.toString().trim() || 'Main Campus - Tech Park HQ',
    };

    const validated = BatchSchema.parse(rawData);

    await prisma.batch.create({
      data: validated,
    });

    revalidatePath('/batches');
    revalidatePath('/courses');
    revalidatePath('/admin/dashboard');
    return { success: true };
  } catch (error: any) {
    console.error('Create batch error:', error);
    const errorMsg = error?.errors?.[0]?.message || 'Failed to create batch schedule.';
    return { success: false, error: errorMsg };
  }
}

export async function updateBatchAction(id: string, formData: FormData) {
  try {
    const session = await getSession();
    if (!session) return { success: false, error: 'Unauthorized.' };

    const rawData = {
      courseId: formData.get('courseId')?.toString().trim(),
      startDate: formData.get('startDate')?.toString().trim(),
      timing: formData.get('timing')?.toString().trim(),
      mode: formData.get('mode')?.toString().trim() || 'Hybrid',
      seatsTotal: Number(formData.get('seatsTotal')) || 20,
      seatsAvailable: Number(formData.get('seatsAvailable')) || 5,
      status: formData.get('status')?.toString().trim() || 'Filling Fast',
      campusLocation: formData.get('campusLocation')?.toString().trim() || 'Main Campus - Tech Park HQ',
    };

    const validated = BatchSchema.parse(rawData);

    await prisma.batch.update({
      where: { id },
      data: validated,
    });

    revalidatePath('/batches');
    revalidatePath('/courses');
    revalidatePath('/admin/dashboard');
    return { success: true };
  } catch (error: any) {
    console.error('Update batch error:', error);
    const errorMsg = error?.errors?.[0]?.message || 'Failed to update batch schedule.';
    return { success: false, error: errorMsg };
  }
}

export async function deleteBatchAction(id: string) {
  try {
    const session = await getSession();
    if (!session) return { success: false, error: 'Unauthorized.' };

    await prisma.batch.delete({ where: { id } });
    revalidatePath('/batches');
    revalidatePath('/courses');
    revalidatePath('/admin/dashboard');
    return { success: true };
  } catch (error) {
    return { success: false, error: 'Failed to delete batch.' };
  }
}


