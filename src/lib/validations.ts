import { z } from 'zod';

export const InquirySchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters long'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().min(8, 'Phone number must be at least 8 digits'),
  courseSlug: z.string().optional().nullable(),
  courseName: z.string().optional().nullable(),
  preferredMode: z.string().default('Hybrid'),
  preferredCampus: z.string().default('Main Tech Park HQ'),
  message: z.string().optional().nullable(),
  source: z.string().default('Website Inquiry'),
});

export const EventRegistrationSchema = z.object({
  eventId: z.string().min(1, 'Event ID is required'),
  eventTitle: z.string().min(1, 'Event title is required'),
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().min(8, 'Phone number must be at least 8 digits'),
});

export const CourseSchema = z.object({
  title: z.string().min(5, 'Title must be at least 5 characters'),
  slug: z.string().min(3, 'Slug is required'),
  tagline: z.string().min(10, 'Tagline must be at least 10 characters'),
  description: z.string().min(20, 'Description must be at least 20 characters'),
  categoryId: z.string().min(1, 'Category is required'),
  level: z.string().default('All Levels'),
  mode: z.string().default('Hybrid'),
  duration: z.string().min(1, 'Duration is required'),
  hoursCount: z.number().positive(),
  fees: z.number().positive('Fees must be a positive number'),
  originalFees: z.number().positive('Original fees must be positive'),
  heroImage: z.string().url('Please enter a valid image URL'),
  featured: z.boolean().default(false),
  bestseller: z.boolean().default(false),
});

export const EventSchema = z.object({
  title: z.string().min(5, 'Title must be at least 5 characters'),
  slug: z.string().min(3, 'Slug is required'),
  tagline: z.string().min(5, 'Tagline is required'),
  description: z.string().min(15, 'Description is required'),
  bannerImage: z.string().url('Valid image URL required'),
  eventDate: z.string().min(3, 'Date is required'),
  eventTime: z.string().min(3, 'Time is required'),
  venue: z.string().min(3, 'Venue is required'),
  mode: z.string().default('Live Online'),
  speakerName: z.string().min(2, 'Speaker name is required'),
  speakerRole: z.string().min(2, 'Speaker role is required'),
  speakerPhoto: z.string().url('Valid photo URL required'),
  speakerBio: z.string().min(10, 'Speaker bio is required'),
  category: z.string().default('Masterclass'),
  isPastEvent: z.boolean().default(false),
});

export const BlogPostSchema = z.object({
  title: z.string().min(5, 'Title must be at least 5 characters'),
  slug: z.string().min(3, 'Slug is required'),
  excerpt: z.string().min(10, 'Excerpt is required'),
  content: z.string().min(20, 'Content is required'),
  category: z.string().min(2, 'Category is required'),
  featuredImage: z.string().url('Valid image URL required'),
  authorName: z.string().min(2, 'Author name is required'),
  authorRole: z.string().min(2, 'Author role is required'),
  authorPhoto: z.string().url('Valid photo URL required'),
  readTime: z.string().default('5 min read'),
  isFeatured: z.boolean().default(false),
});

export const CampusSchema = z.object({
  name: z.string().min(3, 'Campus name is required'),
  slug: z.string().min(3, 'Slug is required'),
  type: z.string().default('Regional Branch'),
  address: z.string().min(10, 'Address is required'),
  city: z.string().min(2, 'City is required'),
  phone: z.string().min(8, 'Phone is required'),
  email: z.string().email('Valid email required'),
  workingHours: z.string().default('Mon - Sun: 8:00 AM - 9:00 PM'),
  landmarks: z.string().min(3, 'Landmarks are required'),
  mapEmbedUrl: z.string().url('Valid Google Maps URL required'),
  coverImage: z.string().url('Valid image URL required'),
  isMain: z.boolean().default(false),
});
