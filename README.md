# NexGen Tech Academy - Production Full-Stack IT Training Institute Website

NexGen Tech Academy is a commercial-grade, production-ready web platform for a modern IT Training and Research Academy offering professional tech courses in Generative AI, Full Stack Development, Cyber Security, UI/UX Design, Cloud DevOps, Testing, and Digital Marketing.

---

## 🚀 Key Features & Highlights

- **Next.js 15 (App Router) & React 19**: Built with server-side rendering, streaming, and Server Actions.
- **Tailwind CSS & Glassmorphism System**: Custom curated color tokens (`#2563EB` Primary, `#0F172A` Secondary, `#14B8A6` Accent, `#F8FAFC` Light Background) with Framer Motion animations.
- **Light / Dark Mode Theme Switcher**: Toggle themes with persistent localStorage preference.
- **Prisma ORM & SQLite / Neon PostgreSQL**: 13 database models (`User`, `CourseCategory`, `Course`, `Trainer`, `Event`, `EventRegistration`, `Campus`, `BlogCategory`, `BlogPost`, `Inquiry`, `Testimonial`, `GalleryImage`, `PlacementPartner`, `Batch`).
- **Zod Schema Validation**: Strict input validation for all form submissions and Server Actions.
- **Admin Panel Suite (`/admin/dashboard`)**: Sidebar layout supporting tabbed CRUD operations for Courses, Events, Blogs, Campuses, Inquiries, Testimonials, and Gallery Images.
- **JSON-LD & SEO Optimization**: Automated Schema.org `EducationalOrganization`, `Course`, `Event`, and `BlogPosting` structured data, sitemap.xml, and robots.txt.
- **Realistic Photographic Imagery**: High-res Unsplash tech visuals for classrooms, GPU labs, Cisco server rooms, and hackathons.

---

## 🛠️ Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript, Tailwind CSS, Lucide Icons, Framer Motion
- **Backend**: Next.js Server Actions & Route Handlers
- **Database**: SQLite (Local Dev) / Neon PostgreSQL (Production) with Prisma ORM v6
- **Auth**: JWT HTTP-Only Cookies via `jose`
- **Validation**: Zod v3

---

## ⚡ Quick Start & Local Setup

### 1. Environment Setup
Clone the repository and ensure `.env` file exists with:

```env
DATABASE_URL="file:./dev.db"
JWT_SECRET="tech-academy-super-secret-jwt-key-2026-production"
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Initialize Database & Seed Content
```bash
npx prisma db push --force-reset
npx tsx prisma/seed.ts
```

This populates:
- **15+ Realistic Courses** across all tech domains
- **5 Masterclasses & Hackathons**
- **3 Physical Campuses** (Hyderabad HQ, Bengaluru Hub, Pune Security Center)
- **6 Detailed Blog Posts** across 7 domains
- **8 Student Testimonials & 12 Placement Partner Logos**
- **Default Admin Credentials**:
  - Email: `admin@techacademy.com`
  - Password: `Admin@123456`

### 4. Run Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🔑 Admin Portal Access

Navigate to [http://localhost:3000/admin/login](http://localhost:3000/admin/login) and sign in with:
- **Email**: `admin@techacademy.com`
- **Password**: `Admin@123456`

Access the interactive sidebar dashboard at [http://localhost:3000/admin/dashboard](http://localhost:3000/admin/dashboard) to manage leads, courses, events, blogs, and campus branches.

---

## 📦 Production Deployment (Vercel + Neon)

1. Push code to GitHub repository.
2. Provision a free PostgreSQL database on [Neon.tech](https://neon.tech).
3. Update `DATABASE_URL` in Vercel project settings with your Neon connection string.
4. Set `provider = "postgresql"` in `prisma/schema.prisma` before Vercel build.
5. Deploy to Vercel with zero configuration needed!
