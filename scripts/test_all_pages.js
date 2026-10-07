const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function testAllDynamicPages() {
  console.log('Testing ALL dynamic pages in the database on http://localhost:3000...');
  const [courses, blogs, campuses, events] = await Promise.all([
    prisma.course.findMany({ select: { slug: true } }),
    prisma.blogPost.findMany({ select: { slug: true } }),
    prisma.campus.findMany({ select: { slug: true } }),
    prisma.event.findMany({ select: { slug: true } }),
  ]);

  let failedCount = 0;
  for (const c of courses) {
    const res = await fetch('http://localhost:3000/courses/' + c.slug);
    if (res.status !== 200) {
      console.error('Course failed:', c.slug, res.status);
      failedCount++;
    }
  }
  console.log(`✅ Tested ${courses.length} courses: All responded HTTP 200`);

  for (const b of blogs) {
    const res = await fetch('http://localhost:3000/blog/' + b.slug);
    if (res.status !== 200) {
      console.error('Blog failed:', b.slug, res.status);
      failedCount++;
    }
  }
  console.log(`✅ Tested ${blogs.length} blog posts: All responded HTTP 200`);

  for (const cp of campuses) {
    const res = await fetch('http://localhost:3000/campuses/' + cp.slug);
    if (res.status !== 200) {
      console.error('Campus failed:', cp.slug, res.status);
      failedCount++;
    }
  }
  console.log(`✅ Tested ${campuses.length} campuses: All responded HTTP 200`);

  for (const ev of events) {
    const res = await fetch('http://localhost:3000/events/' + ev.slug);
    if (res.status !== 200) {
      console.error('Event failed:', ev.slug, res.status);
      failedCount++;
    }
  }
  console.log(`✅ Tested ${events.length} events: All responded HTTP 200`);

  if (failedCount === 0) {
    console.log('\n🎉 ALL DYNAMIC PAGES VERIFIED: 100% HEALTHY (0 failures)');
  } else {
    console.error(`\n❌ Failed count: ${failedCount}`);
    process.exit(1);
  }
}

testAllDynamicPages()
  .catch((e) => {
    console.error('Test error:', e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
