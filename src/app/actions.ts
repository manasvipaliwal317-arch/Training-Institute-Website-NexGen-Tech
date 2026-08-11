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
  revalidatePath('/admin/dashboard');
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
      featured: formData.get('featured') === 'on',
      bestseller: formData.get('bestseller') === 'on',
    };

    const validated = CourseSchema.parse(rawData);

    await prisma.course.create({
      data: {
        ...validated,
        syllabusJson: JSON.stringify([{ module: 'Module 1', title: 'Foundations', details: ['Overview & Prerequisites'] }]),
        toolsJson: JSON.stringify(['Industry Tools']),
        projectsJson: JSON.stringify([{ name: 'Capstone Project', description: 'Real-world project.' }]),
        careerRolesJson: JSON.stringify([{ title: 'Specialist Role', salary: '8 - 16 LPA' }]),
        faqsJson: JSON.stringify([{ q: 'Is certification provided?', a: 'Yes, ISO certified certificate.' }]),
      },
    });

    revalidatePath('/courses');
    revalidatePath('/admin/dashboard');
    return { success: true };
  } catch (error: any) {
    console.error('Create course error:', error);
    const errorMsg = error?.errors?.[0]?.message || 'Failed to create course.';
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
      isPastEvent: formData.get('isPastEvent') === 'on',
    };

    const validated = EventSchema.parse(rawData);

    await prisma.event.create({
      data: validated,
    });

    revalidatePath('/events');
    revalidatePath('/admin/dashboard');
    return { success: true };
  } catch (error: any) {
    console.error('Create event error:', error);
    const errorMsg = error?.errors?.[0]?.message || 'Failed to create event.';
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
      isFeatured: formData.get('isFeatured') === 'on',
    };

    const validated = BlogPostSchema.parse(rawData);

    await prisma.blogPost.create({
      data: {
        ...validated,
        tagsJson: JSON.stringify(['Tech', 'Career', 'Tutorial']),
      },
    });

    revalidatePath('/blog');
    revalidatePath('/admin/dashboard');
    return { success: true };
  } catch (error: any) {
    console.error('Create blog error:', error);
    const errorMsg = error?.errors?.[0]?.message || 'Failed to publish blog post.';
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
