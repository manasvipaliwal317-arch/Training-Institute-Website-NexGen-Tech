const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const courseData = {
  'data-analytics-power-bi-python': {
    projects: [
      {
        name: 'E-Commerce Revenue Analytics Dashboard',
        description: 'End-to-end sales performance tracker with multi-dimensional slicing, customer retention cohorts, and basket analysis in Power BI.',
        tech: ['Power BI', 'SQL Server', 'DAX', 'Excel'],
      },
      {
        name: 'Financial Risk & Customer Churn Prediction',
        description: 'Predictive analytics pipeline identifying churn probability with statistical models in Python and executive KPI visualizations.',
        tech: ['Python', 'Pandas', 'Seaborn', 'Scikit-Learn'],
      },
    ],
    roles: [
      { title: 'Data Analyst', salary: '5.5 - 12 LPA' },
      { title: 'Power BI Specialist', salary: '6.5 - 14 LPA' },
      { title: 'Business Intelligence Engineer', salary: '8 - 18 LPA' },
    ],
    faqs: [
      {
        q: 'Is a background in advanced mathematics or coding required?',
        a: 'No, this program starts from spreadsheet and SQL fundamentals before advancing to Python analysis and DAX. Basic logical thinking and arithmetic are all you need.',
      },
      {
        q: 'What real tools and datasets will I work on during the program?',
        a: 'You will work with Microsoft Power BI Desktop, Microsoft SQL Server, Python (Pandas/NumPy), Tableau, and advanced Excel on live retail, banking, and SaaS datasets.',
      },
      {
        q: 'Do you provide placement assistance and portfolio review?',
        a: 'Yes! Our dedicated placement cell conducts mock technical interviews, optimizes your GitHub and LinkedIn profiles, and connects you directly with 250+ hiring partner companies.',
      },
      {
        q: 'What if I miss a live scheduled class?',
        a: 'All live sessions are recorded in 1080p HD and uploaded to your NexGen Student Portal LMS within 2 hours, complete with lecture notes, source datasets, and code files.',
      },
      {
        q: 'Are EMI or split installment options available for course fees?',
        a: 'Yes, we provide 0% interest monthly EMI options starting at ₹3,999/month through our partner financial institutions with instant paperless approval.',
      },
    ],
  },

  'generative-ai-llm-engineering': {
    projects: [
      {
        name: 'Enterprise Document Q&A RAG Bot',
        description: 'High-precision hybrid retrieval system querying over 50,000+ proprietary PDF docs with citation grounding, re-ranking, and low latency.',
        tech: ['LangChain', 'LlamaIndex', 'Pinecone', 'OpenAI'],
      },
      {
        name: 'Autonomous Multi-Agent DevOps Incident Responder',
        description: 'Stateful LangGraph agent that analyzes cloud error logs, identifies root cause, and executes automated infrastructure remediation steps.',
        tech: ['LangGraph', 'Python', 'FastAPI', 'Docker'],
      },
    ],
    roles: [
      { title: 'Generative AI Engineer', salary: '14 - 28 LPA' },
      { title: 'LLM Systems Architect', salary: '18 - 36 LPA' },
      { title: 'AI Research & Solutions Specialist', salary: '12 - 24 LPA' },
    ],
    faqs: [
      {
        q: 'Is prior coding experience required for this GenAI program?',
        a: 'Yes, foundational proficiency in Python or object-oriented programming is recommended to get maximum value from the hands-on engineering labs.',
      },
      {
        q: 'Do we get cloud GPU access for model fine-tuning and inference?',
        a: 'Yes, learners receive dedicated cloud GPU compute credits (NVIDIA A100/H100 clusters) to train, quantize, and deploy models during labs and capstone projects.',
      },
      {
        q: 'Will this program cover local open-source LLMs like LLaMA 3 and Mistral?',
        a: 'Absolutely. We cover both closed-source APIs (OpenAI, Anthropic) and private local deployments using Ollama, vLLM, and Hugging Face.',
      },
      {
        q: 'What certification will I receive upon completing the course?',
        a: 'You receive an ISO 9001:2015 & NSDC aligned Certificate of Completion with a unique verifiable cryptographic credential ID for your resume and LinkedIn.',
      },
    ],
  },

  'mobile-app-development-react-native': {
    projects: [
      {
        name: 'Cross-Platform FinTech Banking & Crypto Wallet',
        description: 'Production mobile app featuring biometric authentication, real-time charts, push notifications, offline SQLite sync, and secure token storage.',
        tech: ['React Native', 'Expo Router', 'TypeScript', 'SQLite'],
      },
      {
        name: 'On-Demand Hyperlocal Food Delivery App',
        description: 'UberEats-style mobile application with real-time GPS tracking, interactive maps, Razorpay/Stripe payments, and gesture animations.',
        tech: ['React Native', 'Mapbox', 'Zustand', 'Reanimated 3'],
      },
    ],
    roles: [
      { title: 'React Native Developer', salary: '6.5 - 15 LPA' },
      { title: 'Cross-Platform Mobile Engineer', salary: '8 - 18 LPA' },
      { title: 'Mobile Solutions Architect', salary: '14 - 28 LPA' },
    ],
    faqs: [
      {
        q: 'Do I need a Mac computer to learn iOS app development in this course?',
        a: 'No! With modern Expo Application Services (EAS), cloud builds allow you to develop and test iOS apps on Windows or Linux and test directly on your iPhone or Android phone.',
      },
      {
        q: 'Will we learn how to publish apps to Google Play and Apple App Store?',
        a: 'Yes, the final capstone module guides you through generating app certificates, privacy manifests, screenshots, and live deployment to both App Store Connect and Google Play Console.',
      },
      {
        q: 'Are placement drives conducted for mobile app developers?',
        a: 'Yes, NexGen conducts monthly campus hiring drives with leading tech startups, IT service giants, and product companies specifically hiring React Native developers.',
      },
      {
        q: 'What is the format of doubts clearing and mentor code reviews?',
        a: 'Every student receives 1-on-1 weekly code review sessions on GitHub and daily real-time doubt clearing assistance on our private Discord/Slack community.',
      },
    ],
  },

  'full-stack-web-development-nextjs': {
    projects: [
      {
        name: 'Enterprise Multi-Tenant SaaS Platform',
        description: 'Complete SaaS software with organization billing via Stripe, Server Actions, PostgreSQL with Prisma ORM, role-based access control, and edge caching.',
        tech: ['Next.js 15', 'TypeScript', 'Prisma', 'PostgreSQL', 'Tailwind CSS'],
      },
      {
        name: 'Real-Time Collaborative Project Workspace',
        description: 'Figma/Notion-inspired collaborative workspace with WebSockets, optimistic UI updates, Markdown editor, and secure file attachments on AWS S3.',
        tech: ['React 19', 'Next.js', 'WebSockets', 'Zustand', 'AWS S3'],
      },
    ],
    roles: [
      { title: 'Full Stack Next.js Developer', salary: '7 - 16 LPA' },
      { title: 'Frontend Engineer (React 19)', salary: '6 - 14 LPA' },
      { title: 'Senior Software Engineer', salary: '12 - 25 LPA' },
    ],
    faqs: [
      {
        q: 'Can beginners with zero web development background join this course?',
        a: 'Yes! We start with foundational HTML5, CSS3, JavaScript ESNext, and TypeScript before advancing into React 19, Next.js App Router, and database architecture.',
      },
      {
        q: 'Does this course teach backend engineering as well as frontend?',
        a: 'Yes, this is a true full-stack curriculum covering PostgreSQL databases, Prisma ORM, Next.js Route Handlers, Server Actions, authentication, and cloud deployment.',
      },
      {
        q: 'How many capstone projects will I have on my GitHub by graduation?',
        a: 'You will build and deploy 4 industry-grade portfolio projects live on Vercel and AWS, complete with professional README documentation and CI/CD pipelines.',
      },
    ],
  },
};

// Generic filler function for all other courses so NONE of them have empty sections
function getGenericEnrichment(course) {
  const cName = course.title;
  return {
    projects: [
      {
        name: `Production-Grade Enterprise ${cName.split(' ')[0]} Solution`,
        description: `Comprehensive industry capstone addressing high-throughput workflows, scalable architecture, automated validation, and cloud deployment.`,
        tech: course.toolsJson ? JSON.parse(course.toolsJson).slice(0, 4) : ['Core Tools', 'Industry Standard'],
      },
      {
        name: `Real-Time Monitoring & Analytics Engine for ${cName.split(' ')[0]}`,
        description: `Modular application implementing enterprise security best practices, telemetry metrics, and high-reliability operational design.`,
        tech: course.toolsJson ? JSON.parse(course.toolsJson).slice(2, 6) : ['Cloud', 'Frameworks'],
      },
    ],
    roles: [
      { title: `${course.title.split(' ')[0]} Specialist`, salary: '6.5 - 14 LPA' },
      { title: `Senior Associate Consultant`, salary: '8.5 - 18 LPA' },
      { title: `Lead Technical Architect`, salary: '14 - 28 LPA' },
    ],
    faqs: [
      {
        q: `What are the eligibility requirements for this ${course.title} program?`,
        a: 'Students and working professionals from any technical or analytical background are welcome. We cover foundational concepts before progressing to advanced modules.',
      },
      {
        q: 'Will I get practical hands-on lab access during the training?',
        a: 'Yes, 80% of class time is dedicated to live hands-on coding labs, peer pairing sessions, and guided mentor-led architectural implementations.',
      },
      {
        q: 'How does NexGen assist with campus placements and hiring drives?',
        a: 'Our placement team provides resume building, GitHub portfolio curation, technical mock interviews, and exclusive referral drives to 250+ partner tech companies.',
      },
      {
        q: 'Can I pay the course fee in monthly installments?',
        a: 'Yes, zero-interest EMI options starting from ₹3,999/month are available with instant digital verification.',
      },
    ],
  };
}

async function main() {
  console.log('Enriching all course projects, career roles, and FAQs in dev.db...');
  const courses = await prisma.course.findMany();

  for (const c of courses) {
    const data = courseData[c.slug] || getGenericEnrichment(c);

    // Merge or set projects
    const existingProjects = JSON.parse(c.projectsJson || '[]');
    const finalProjects = existingProjects.length >= 2 ? existingProjects : data.projects;

    // Merge or set roles
    const existingRoles = JSON.parse(c.careerRolesJson || '[]');
    const finalRoles = existingRoles.length >= 3 ? existingRoles : data.roles;

    // Merge or set faqs
    const existingFaqs = JSON.parse(c.faqsJson || '[]');
    const finalFaqs = existingFaqs.length >= 4 ? existingFaqs : data.faqs;

    await prisma.course.update({
      where: { id: c.id },
      data: {
        projectsJson: JSON.stringify(finalProjects),
        careerRolesJson: JSON.stringify(finalRoles),
        faqsJson: JSON.stringify(finalFaqs),
      },
    });
    console.log(`Enriched [${c.slug}]: ${finalProjects.length} projects, ${finalRoles.length} roles, ${finalFaqs.length} FAQs`);
  }

  console.log('Successfully enriched all course metadata in database!');
  await prisma.$disconnect();
}

main();
