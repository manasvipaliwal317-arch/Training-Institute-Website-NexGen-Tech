import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const existing = await prisma.student.findUnique({
    where: { studentId: 'NXG-2026-1001' },
  });

  if (!existing) {
    await prisma.student.create({
      data: {
        studentId: 'NXG-2026-1001',
        name: 'Rahul Sharma',
        email: 'rahul.sharma@example.com',
        mobile: '+91 98765 43210',
        guardianName: 'Rajesh Sharma',
        guardianMobile: '+91 98765 11223',
        streetAddress: 'Flat 402, Green Valley Enclave, HITEC City',
        city: 'Hyderabad',
        state: 'Telangana',
        pincode: '500081',
        passportPhoto: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
        govtIdPhoto: 'Aadhaar Verified (XXXX-XXXX-8921)',
        courseSlug: 'full-stack-web-development-nextjs',
        courseName: 'Full Stack Development with Next.js 15 & Node.js',
        courseMode: 'Hybrid (Classroom + Online)',
        campus: 'Tech Park Main Campus - Hyderabad',
        totalFees: 35000,
        registrationFee: 1000,
        paidFees: 1000,
        remainingFees: 34000,
        paymentStatus: 'SEAT_RESERVED',
        paymentTxnId: 'TXN-UPI-9842104829',
        batchName: 'Morning Cohort (10:00 AM - 1:00 PM IST)',
        attendancePct: 96,
        assignmentsDone: 8,
        assignmentsTot: 10,
        labScore: 94,
        mockInterviewDate: 'Oct 15, 2026 · 11:30 AM IST',
        mockInterviewStatus: 'Scheduled with Amazon Tech Lead',
        mockFeedback: 'Strong fundamentals in React Server Components, TypeScript & PostgreSQL. Excellent problem-solving in DSA mock.',
        status: 'ACTIVE',
      },
    });
    console.log('Sample student NXG-2026-1001 created successfully!');
  } else {
    console.log('Sample student already exists.');
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
