'use server';

import { prisma } from '@/lib/prisma';
import {
  createSession,
  removeSession,
  getSession,
  createStudentSession,
  removeStudentSession,
  getStudentSession,
  createFacultySession,
  removeFacultySession,
  getFacultySession,
} from '@/lib/auth';
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

    try {
      revalidatePath('/admin/dashboard');
    } catch {
      // non-blocking revalidation
    }

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

    let event = await prisma.event.findUnique({
      where: { id: validated.eventId },
    });
    if (!event) {
      event = await prisma.event.findUnique({
        where: { slug: validated.eventId },
      });
    }
    if (!event) {
      const firstEvent = await prisma.event.findFirst();
      if (firstEvent) event = firstEvent;
    }

    const finalEventId = event ? event.id : validated.eventId;
    const finalEventTitle = event ? event.title : validated.eventTitle;

    await prisma.eventRegistration.create({
      data: {
        eventId: finalEventId,
        eventTitle: finalEventTitle,
        name: validated.name,
        email: validated.email,
        phone: validated.phone,
      },
    });

    if (event) {
      await prisma.event.update({
        where: { id: event.id },
        data: { registrationsCount: { increment: 1 } },
      }).catch(() => {});
    }

    try {
      revalidatePath('/events');
    } catch {
      // non-blocking revalidation
    }

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

// ---------------- STUDENT REGISTRATION & PORTAL ACTIONS ----------------

export async function registerStudentAction(formData: FormData) {
  try {
    const name = formData.get('name')?.toString().trim();
    const email = formData.get('email')?.toString().trim().toLowerCase();
    const mobile = formData.get('mobile')?.toString().trim();
    const guardianName = formData.get('guardianName')?.toString().trim();
    const guardianMobile = formData.get('guardianMobile')?.toString().trim();
    const streetAddress = formData.get('streetAddress')?.toString().trim();
    const city = formData.get('city')?.toString().trim();
    const state = formData.get('state')?.toString().trim();
    const pincode = formData.get('pincode')?.toString().trim();
    const courseSlug = formData.get('courseSlug')?.toString().trim() || 'custom-course';
    const courseName = formData.get('courseName')?.toString().trim();
    const courseMode = formData.get('courseMode')?.toString().trim() || 'Hybrid (Classroom + Online)';
    const campus = formData.get('campus')?.toString().trim() || 'Tech Park Main Campus - Hyderabad';
    const passportPhoto = formData.get('passportPhoto')?.toString().trim() || '';
    const govtIdPhoto = formData.get('govtIdPhoto')?.toString().trim() || '';
    const totalFees = parseInt(formData.get('totalFees')?.toString() || '35000', 10);
    const registrationFee = 1000;
    const paidFees = 1000;
    const remainingFees = Math.max(0, totalFees - 1000);
    const paymentTxnId = 'TXN-' + Date.now().toString(36).toUpperCase() + '-' + Math.floor(1000 + Math.random() * 9000);

    if (!name || !email || !mobile || !guardianName || !guardianMobile || !streetAddress || !city || !state || !pincode || !courseName) {
      return { success: false, error: 'Please fill in all mandatory fields.' };
    }

    // Check if student with email already registered
    const existing = await prisma.student.findUnique({
      where: { email },
    });

    if (existing) {
      return {
        success: false,
        error: `An enrollment with email ${email} already exists with Student ID ${existing.studentId}. Please login via Student Portal.`,
        studentId: existing.studentId,
      };
    }

    // Generate unique student ID: e.g. NXG-2026-XXXX
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const studentId = `NXG-2026-${randomSuffix}`;

    await prisma.student.create({
      data: {
        studentId,
        name,
        email,
        mobile,
        guardianName,
        guardianMobile,
        streetAddress,
        city,
        state,
        pincode,
        passportPhoto: passportPhoto || null,
        govtIdPhoto: govtIdPhoto || 'Govt ID Document Verified',
        courseSlug,
        courseName,
        courseMode,
        campus,
        totalFees,
        registrationFee,
        paidFees,
        remainingFees,
        paymentStatus: 'SEAT_RESERVED',
        paymentTxnId,
        batchName: 'Upcoming Morning Cohort (10:00 AM - 1:00 PM IST)',
        attendancePct: 100,
        assignmentsDone: 0,
        assignmentsTot: 10,
        labScore: 100,
        mockInterviewDate: 'Scheduled after Module 3 completion',
        mockInterviewStatus: 'Eligible after Capstone Project',
        mockFeedback: 'Seat Reserved. Orientation and Tech Lab Access begins this Monday.',
        status: 'ACTIVE',
      },
    });

    // Also auto-record in Inquiry table for unified admin visibility
    try {
      await prisma.inquiry.create({
        data: {
          name,
          email,
          phone: mobile,
          courseSlug,
          courseName,
          preferredMode: courseMode,
          preferredCampus: campus,
          message: `Official Course Enrollment with ₹1,000 Seat Reservation Fee paid. Txn ID: ${paymentTxnId}. Student ID: ${studentId}`,
          source: 'Official Student Enrollment Page (Paid ₹1000)',
          status: 'ENROLLED',
        },
      });
    } catch {
      // non-critical
    }

    // Create session cookie
    await createStudentSession(studentId, email);

    revalidatePath('/student/dashboard');
    revalidatePath('/admin/dashboard');

    return {
      success: true,
      studentId,
      email,
      name,
      courseName,
      remainingFees,
      paymentTxnId,
      message: `Registration successful! Your official Student ID is ${studentId}. ₹1,000 seat reservation fee received.`,
    };
  } catch (error: any) {
    console.error('Error registering student:', error);
    return { success: false, error: error.message || 'Registration failed. Please try again.' };
  }
}

export async function studentLoginAction(formData: FormData) {
  try {
    const studentId = formData.get('studentId')?.toString().trim().toUpperCase();
    const email = formData.get('email')?.toString().trim().toLowerCase();

    if (!studentId || !email) {
      return { success: false, error: 'Student ID and Registered Email are required.' };
    }

    const student = await prisma.student.findFirst({
      where: {
        studentId,
        email,
      },
    });

    if (!student) {
      return {
        success: false,
        error: 'No student record found matching this Student ID and Email. Please check your credentials or register first.',
      };
    }

    await createStudentSession(student.studentId, student.email);
    revalidatePath('/student/dashboard');

    return {
      success: true,
      studentId: student.studentId,
      name: student.name,
    };
  } catch (error: any) {
    console.error('Student login error:', error);
    return { success: false, error: 'Login failed. Please try again.' };
  }
}

export async function studentLogoutAction() {
  await removeStudentSession();
  revalidatePath('/');
  return { success: true };
}

export async function facultyLoginAction(formData: FormData) {
  try {
    const facultyNo = formData.get('facultyNo')?.toString().trim().toUpperCase();
    const email = formData.get('email')?.toString().trim().toLowerCase();

    if (!facultyNo || !email) {
      return { success: false, error: 'Faculty Number (Employee ID) and Official Email are required.' };
    }

    const faculty = await prisma.trainer.findFirst({
      where: {
        facultyNo,
        email,
      },
    });

    if (!faculty) {
      return {
        success: false,
        error: 'No faculty record found matching this Faculty No. and Email. Please check credentials or contact institute administration.',
      };
    }

    await createFacultySession(faculty.facultyNo!, faculty.email!);
    revalidatePath('/faculty/dashboard');

    return {
      success: true,
      facultyNo: faculty.facultyNo,
      name: faculty.name,
      role: faculty.role,
    };
  } catch (error: any) {
    console.error('Faculty login error:', error);
    return { success: false, error: 'Authentication failed. Please try again.' };
  }
}

export async function facultyLogoutAction() {
  await removeFacultySession();
  revalidatePath('/');
  return { success: true };
}

export async function updateStudentAttendanceByFacultyAction(studentId: string, newPct: number) {
  try {
    const facultySession = await getFacultySession();
    if (!facultySession) {
      return { success: false, error: 'Unauthorized faculty session.' };
    }

    await prisma.student.update({
      where: { studentId },
      data: { attendancePct: Math.min(100, Math.max(0, newPct)) },
    });

    revalidatePath('/faculty/dashboard');
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message || 'Failed to update attendance.' };
  }
}

export async function submitMockInterviewFeedbackAction(
  studentId: string,
  feedback: string,
  status: string
) {
  try {
    const facultySession = await getFacultySession();
    if (!facultySession) {
      return { success: false, error: 'Unauthorized faculty session.' };
    }

    await prisma.student.update({
      where: { studentId },
      data: {
        mockFeedback: feedback,
        mockInterviewStatus: status,
      },
    });

    revalidatePath('/faculty/dashboard');
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message || 'Failed to submit evaluation.' };
  }
}

export async function updateFacultyByAdminAction(id: string, formData: FormData) {
  try {
    const session = await getSession();
    if (!session) return { success: false, error: 'Unauthorized.' };

    const name = formData.get('name')?.toString().trim();
    const role = formData.get('role')?.toString().trim();
    const facultyNo = formData.get('facultyNo')?.toString().trim().toUpperCase();
    const email = formData.get('email')?.toString().trim().toLowerCase();
    const phone = formData.get('phone')?.toString().trim();
    const specialization = formData.get('specialization')?.toString().trim();
    const officeLocation = formData.get('officeLocation')?.toString().trim();
    const status = formData.get('status')?.toString().trim() || 'ACTIVE';
    const timetableJson = formData.get('timetableJson')?.toString() || '[]';

    if (!name || !role || !facultyNo || !email) {
      return { success: false, error: 'Name, Role, Faculty No., and Email are required.' };
    }

    // Validate that timetable is valid JSON if provided
    try {
      JSON.parse(timetableJson);
    } catch {
      return { success: false, error: 'Invalid timetable format.' };
    }

    await prisma.trainer.update({
      where: { id },
      data: {
        name,
        role,
        facultyNo,
        email,
        phone,
        specialization,
        officeLocation,
        status,
        timetableJson,
      },
    });

    revalidatePath('/faculty/dashboard');
    revalidatePath('/admin/dashboard');
    return { success: true };
  } catch (error: any) {
    console.error('Update faculty error:', error);
    return { success: false, error: error.message || 'Failed to update faculty profile and timetable.' };
  }
}

export async function updateStudentByAdminAction(id: string, formData: FormData) {
  try {
    const session = await getSession();
    if (!session) return { success: false, error: 'Unauthorized.' };

    const name = formData.get('name')?.toString().trim();
    const email = formData.get('email')?.toString().trim().toLowerCase();
    const mobile = formData.get('mobile')?.toString().trim();
    const courseName = formData.get('courseName')?.toString().trim();
    const batchName = formData.get('batchName')?.toString().trim();
    const courseMode = formData.get('courseMode')?.toString().trim() || 'Hybrid (Classroom + Online)';
    const attendancePct = parseInt(formData.get('attendancePct')?.toString() || '95', 10);
    const labScore = parseInt(formData.get('labScore')?.toString() || '90', 10);
    const mockInterviewDate = formData.get('mockInterviewDate')?.toString().trim() || 'Scheduled';
    const mockInterviewStatus = formData.get('mockInterviewStatus')?.toString().trim() || 'Pending';
    const mockFeedback = formData.get('mockFeedback')?.toString().trim() || '';
    const paymentStatus = formData.get('paymentStatus')?.toString().trim() || 'SEAT_RESERVED';
    const paidFees = parseInt(formData.get('paidFees')?.toString() || '1000', 10);
    const remainingFees = parseInt(formData.get('remainingFees')?.toString() || '0', 10);

    if (!name || !email || !courseName || !batchName) {
      return { success: false, error: 'Name, Email, Course, and Batch are required.' };
    }

    await prisma.student.update({
      where: { id },
      data: {
        name,
        email,
        mobile,
        courseName,
        batchName,
        courseMode,
        attendancePct: Math.min(100, Math.max(0, attendancePct)),
        labScore: Math.min(100, Math.max(0, labScore)),
        mockInterviewDate,
        mockInterviewStatus,
        mockFeedback,
        paymentStatus,
        paidFees,
        remainingFees,
      },
    });

    revalidatePath('/student/dashboard');
    revalidatePath('/faculty/dashboard');
    revalidatePath('/admin/dashboard');
    return { success: true };
  } catch (error: any) {
    console.error('Update student error:', error);
    return { success: false, error: error.message || 'Failed to update student academic and mock data.' };
  }
}




