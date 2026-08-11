import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding Enterprise IT Training Academy Database...');

  // Clean tables
  await prisma.eventRegistration.deleteMany();
  await prisma.inquiry.deleteMany();
  await prisma.batch.deleteMany();
  await prisma.course.deleteMany();
  await prisma.courseCategory.deleteMany();
  await prisma.trainer.deleteMany();
  await prisma.testimonial.deleteMany();
  await prisma.placementPartner.deleteMany();
  await prisma.placement.deleteMany();
  await prisma.event.deleteMany();
  await prisma.campus.deleteMany();
  await prisma.blogPost.deleteMany();
  await prisma.blogCategory.deleteMany();
  await prisma.galleryImage.deleteMany();
  await prisma.user.deleteMany();

  // 1. Create Admin User
  await prisma.user.create({
    data: {
      email: 'admin@techacademy.com',
      name: 'Academy Executive Administrator',
      password: 'Admin@123456',
      role: 'ADMIN',
    },
  });

  // 2. Create Course Categories
  const catAI = await prisma.courseCategory.create({
    data: { slug: 'ai-data-science', name: 'AI & Data Science', description: 'Generative AI, LLMs, Deep Learning & Analytics', icon: 'Brain' },
  });
  const catSoftware = await prisma.courseCategory.create({
    data: { slug: 'software-development', name: 'Software Development', description: 'Full Stack Next.js, Node.js, Frontend & Mobile Apps', icon: 'Code2' },
  });
  const catDesign = await prisma.courseCategory.create({
    data: { slug: 'designing', name: 'UI/UX & Design', description: 'Figma Design Systems, Web Design & Visual Product UX', icon: 'Palette' },
  });
  const catCyber = await prisma.courseCategory.create({
    data: { slug: 'networking-security', name: 'Networking & Cyber Security', description: 'Ethical Hacking, SOC, Penetration Testing & CCNA', icon: 'ShieldCheck' },
  });
  const catCloud = await prisma.courseCategory.create({
    data: { slug: 'cloud-devops', name: 'Cloud & DevOps', description: 'AWS Cloud Architecture, Kubernetes, Docker & CI/CD', icon: 'CloudLightning' },
  });
  const catTesting = await prisma.courseCategory.create({
    data: { slug: 'testing-automation', name: 'Testing & Automation', description: 'Selenium, Playwright, API Testing & QA Engineering', icon: 'CheckCircle2' },
  });
  const catMarketing = await prisma.courseCategory.create({
    data: { slug: 'digital-marketing', name: 'Digital Marketing', description: 'SEO, SEM, Meta Ads, Growth Hacking & GA4 Analytics', icon: 'TrendingUp' },
  });

  // 3. Create Trainers
  const t1 = await prisma.trainer.create({
    data: {
      name: 'Dr. Vikramaditya Sharma',
      role: 'Lead AI Scientist & Ex-Microsoft Specialist',
      bio: '14+ years in Machine Learning, GenAI, and Deep Learning research. Holds 5 US patents in AI NLP architectures.',
      photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
      experienceYrs: 14,
      formerCompany: 'Microsoft AI',
      specialization: 'Generative AI & LLM Systems',
      rating: 4.98,
    },
  });

  const t2 = await prisma.trainer.create({
    data: {
      name: 'Priya Sundaram',
      role: 'Staff Full Stack Architect',
      bio: 'Engineered scalable micro-frontends and cloud backends at Amazon Web Services. Trained over 4,000 developers.',
      photo: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
      experienceYrs: 11,
      formerCompany: 'Amazon',
      specialization: 'Next.js, Node.js & Distributed Systems',
      rating: 4.95,
    },
  });

  const t3 = await prisma.trainer.create({
    data: {
      name: 'Rahul Deshmukh',
      role: 'Principal UX Strategist',
      bio: 'Former Lead Product Designer at Adobe & Swiggy. Expert in human-centered design and Figma design systems.',
      photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
      experienceYrs: 10,
      formerCompany: 'Adobe Design Lab',
      specialization: 'UI/UX & Product Design',
      rating: 4.91,
    },
  });

  const t4 = await prisma.trainer.create({
    data: {
      name: 'Rajesh Kulkarni',
      role: 'Chief Cyber Security Lead',
      bio: 'Certified Ethical Hacker (CEH) & CISSP with 12 years auditing banking networks and defense enterprise systems.',
      photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
      experienceYrs: 12,
      formerCompany: 'Cisco Systems',
      specialization: 'Ethical Hacking & Network Defense',
      rating: 4.96,
    },
  });

  // Images
  const imgGenAI = '/blog-genai.png';
  const imgML = 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?auto=format&fit=crop&w=1200&q=80';
  const imgAnalytics = 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80';
  const imgFullStack = 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80';
  const imgFrontend = 'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?auto=format&fit=crop&w=1200&q=80';
  const imgBackend = 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=80';
  const imgMobile = 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=1200&q=80';
  const imgUIUX = 'https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?auto=format&fit=crop&w=1200&q=80';
  const imgGraphic = 'https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&w=1200&q=80';
  const imgWebDesign = 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1200&q=80';
  const imgCyber = 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=1200&q=80';
  const imgNet = 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=1200&q=80';
  const imgDevOps = 'https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?auto=format&fit=crop&w=1200&q=80';
  const imgCloud = 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80';
  const imgTesting = 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80';
  const imgMarketing = 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80';

  // 4. Seed 15 Realistic Courses
  const fifteenCourses = [
    {
      slug: 'generative-ai-llm-engineering',
      title: 'Executive Program in Generative AI & LLM Engineering',
      tagline: 'Master OpenAI APIs, LangChain, LlamaIndex, RAG Pipelines & Fine-Tuning',
      description: 'An industry-leading program designed for software engineers and data professionals to build, fine-tune, and deploy custom GenAI solutions, multi-agent frameworks, and vector search systems.',
      categoryId: catAI.id,
      trainerId: t1.id,
      level: 'Advanced',
      mode: 'Hybrid',
      duration: '6 Months',
      hoursCount: 160,
      fees: 65000,
      originalFees: 85000,
      heroImage: imgGenAI,
      featured: true,
      bestseller: true,
      rating: 4.95,
      ratingsCount: 840,
      enrolledStudents: 2450,
      syllabusJson: JSON.stringify([
        { module: 'Module 1', title: 'Python for AI & Foundations of LLMs', details: ['Advanced Python async', 'Transformer Architectures', 'Tokenization & Embeddings', 'Prompt Engineering Patterns'] },
        { module: 'Module 2', title: 'LangChain & LlamaIndex Frameworks', details: ['Chains & Agents', 'Custom Output Parsers', 'Memory Persistence', 'Document Loaders & Indexing'] },
        { module: 'Module 3', title: 'RAG (Retrieval-Augmented Generation)', details: ['Vector DBs (Pinecone, Qdrant, Chroma)', 'Hybrid Search & Re-ranking', 'Chunking Strategies', 'Evaluating RAG Precision'] }
      ]),
      toolsJson: JSON.stringify(['Python', 'PyTorch', 'LangChain', 'LlamaIndex', 'Pinecone', 'Ollama', 'HuggingFace', 'Docker']),
      projectsJson: JSON.stringify([{ name: 'Enterprise Document Q&A Bot', description: 'RAG system for 50,000+ internal PDF docs with citation grounding.' }]),
      careerRolesJson: JSON.stringify([{ title: 'Generative AI Engineer', salary: '14 - 28 LPA' }]),
      faqsJson: JSON.stringify([{ q: 'Is prior coding experience required?', a: 'Yes, basic proficiency in Python or OOP programming is recommended.' }])
    },
    {
      slug: 'machine-learning-deep-learning-mastery',
      title: 'Machine Learning & Deep Learning Engineer Certification',
      tagline: 'Master Scikit-Learn, TensorFlow, Neural Networks, Computer Vision & PyTorch',
      description: 'Build production ML pipelines, train Convolutional & Recurrent Neural Networks, and deploy models on cloud endpoints.',
      categoryId: catAI.id,
      trainerId: t1.id,
      level: 'Intermediate',
      mode: 'Hybrid',
      duration: '5 Months',
      hoursCount: 140,
      fees: 52000,
      originalFees: 70000,
      heroImage: imgML,
      featured: true,
      bestseller: false,
      rating: 4.91,
      ratingsCount: 650,
      enrolledStudents: 1800,
      syllabusJson: JSON.stringify([
        { module: 'Module 1', title: 'Statistical Modeling & Scikit-Learn', details: ['Linear & Logistic Regression', 'Decision Trees & Random Forests', 'XGBoost & Gradient Boosting'] }
      ]),
      toolsJson: JSON.stringify(['Python', 'TensorFlow', 'PyTorch', 'Scikit-Learn', 'NumPy', 'Pandas']),
      projectsJson: JSON.stringify([{ name: 'Medical Image Classification System', description: 'CNN model predicting X-ray diagnostics with 96% accuracy.' }]),
      careerRolesJson: JSON.stringify([{ title: 'Machine Learning Engineer', salary: '10 - 22 LPA' }]),
      faqsJson: JSON.stringify([{ q: 'Does this cover neural networks?', a: 'Yes, both CNNs for computer vision and Transformers for NLP are taught.' }])
    },
    {
      slug: 'data-analytics-power-bi-python',
      title: 'Data Analytics & Business Intelligence with Power BI & Python',
      tagline: 'Turn raw business data into actionable insights using SQL, Excel, Python & Power BI',
      description: 'Master data cleaning, exploratory data analysis, SQL queries, interactive dashboarding in Power BI, and statistical forecasting.',
      categoryId: catAI.id,
      level: 'Beginner',
      mode: 'Online',
      duration: '4 Months',
      hoursCount: 110,
      fees: 38000,
      originalFees: 52000,
      heroImage: imgAnalytics,
      featured: false,
      bestseller: true,
      rating: 4.88,
      ratingsCount: 1620,
      enrolledStudents: 4200,
      syllabusJson: JSON.stringify([
        { module: 'Module 1', title: 'Advanced Excel & SQL Analytics', details: ['Pivot Tables & VLOOKUP', 'Complex SQL Joins & CTEs', 'Window Functions'] }
      ]),
      toolsJson: JSON.stringify(['Power BI', 'SQL Server', 'Python', 'Pandas', 'Excel', 'Tableau']),
      projectsJson: JSON.stringify([{ name: 'E-Commerce Revenue Analytics Dashboard', description: 'Real-time sales performance tracker in Power BI.' }]),
      careerRolesJson: JSON.stringify([{ title: 'Data Analyst', salary: '5.5 - 12 LPA' }]),
      faqsJson: JSON.stringify([{ q: 'Is math background required?', a: 'Basic arithmetic and problem-solving skills are sufficient.' }])
    },
    {
      slug: 'full-stack-web-development-nextjs',
      title: 'Full Stack Development with Next.js 15 & Node.js',
      tagline: 'Become a job-ready Full Stack Engineer building modern React & Node applications',
      description: 'Comprehensive boot camp covering HTML5, CSS3, Tailwind CSS, TypeScript, React 19, Next.js App Router, Prisma ORM, PostgreSQL, and AWS deployment.',
      categoryId: catSoftware.id,
      trainerId: t2.id,
      level: 'All Levels',
      mode: 'Hybrid',
      duration: '6 Months',
      hoursCount: 200,
      fees: 55000,
      originalFees: 75000,
      heroImage: imgFullStack,
      featured: true,
      bestseller: true,
      rating: 4.92,
      ratingsCount: 1950,
      enrolledStudents: 5400,
      syllabusJson: JSON.stringify([
        { module: 'Module 1', title: 'Modern Frontend Foundations', details: ['HTML5 & Semantic Markup', 'Tailwind CSS & Responsive Layouts', 'TypeScript'] }
      ]),
      toolsJson: JSON.stringify(['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Node.js', 'PostgreSQL', 'Prisma', 'Docker', 'Vercel']),
      projectsJson: JSON.stringify([{ name: 'SaaS E-Learning Platform', description: 'Full course platform with Stripe payments and video streaming.' }]),
      careerRolesJson: JSON.stringify([{ title: 'Full Stack Developer', salary: '8 - 18 LPA' }]),
      faqsJson: JSON.stringify([{ q: 'Can non-CS students join?', a: 'Yes, we start from fundamental programming concepts.' }])
    },
    {
      slug: 'frontend-development-react-typescript',
      title: 'Modern Frontend Engineering with React 19 & TypeScript',
      tagline: 'Craft blazing-fast web applications, custom component libraries & state management',
      description: 'Master component lifecycle, custom React hooks, Redux Toolkit, React Query, Tailwind CSS, and Webpack/Vite bundlers.',
      categoryId: catSoftware.id,
      trainerId: t2.id,
      level: 'Intermediate',
      mode: 'Online',
      duration: '3.5 Months',
      hoursCount: 100,
      fees: 35000,
      originalFees: 48000,
      heroImage: imgFrontend,
      featured: false,
      bestseller: false,
      rating: 4.89,
      ratingsCount: 810,
      enrolledStudents: 2200,
      syllabusJson: JSON.stringify([
        { module: 'Module 1', title: 'React 19 Deep Dive', details: ['Hooks, Suspense & Concurrent React', 'State Management Patterns'] }
      ]),
      toolsJson: JSON.stringify(['React 19', 'TypeScript', 'Tailwind CSS', 'Redux', 'Vite', 'Storybook']),
      projectsJson: JSON.stringify([{ name: 'Trading Dashboard App', description: 'Real-time WebSocket stock tracker with interactive charts.' }]),
      careerRolesJson: JSON.stringify([{ title: 'Frontend Developer', salary: '7 - 15 LPA' }]),
      faqsJson: JSON.stringify([{ q: 'Is HTML/CSS covered?', a: 'Basic HTML/CSS is expected, but modern CSS architecture is taught.' }])
    },
    {
      slug: 'backend-engineering-nodejs-microservices',
      title: 'Backend Engineering with Node.js, Express & Microservices',
      tagline: 'Architect distributed systems, REST APIs, GraphQL, Redis Caching & Docker',
      description: 'Master server-side JavaScript, async Event Loop, database indexing, JWT auth, gRPC, and microservice communication patterns.',
      categoryId: catSoftware.id,
      trainerId: t2.id,
      level: 'Intermediate',
      mode: 'Hybrid',
      duration: '4 Months',
      hoursCount: 120,
      fees: 42000,
      originalFees: 58000,
      heroImage: imgBackend,
      featured: false,
      bestseller: false,
      rating: 4.90,
      ratingsCount: 720,
      enrolledStudents: 1900,
      syllabusJson: JSON.stringify([
        { module: 'Module 1', title: 'Node.js Architecture', details: ['Event Loop & Streams', 'Express REST API Design', 'PostgreSQL & Prisma ORM'] }
      ]),
      toolsJson: JSON.stringify(['Node.js', 'Express', 'PostgreSQL', 'Redis', 'GraphQL', 'Docker', 'RabbitMQ']),
      projectsJson: JSON.stringify([{ name: 'High-Throughput Payment Gateway API', description: 'Distributed transaction engine with Redis caching.' }]),
      careerRolesJson: JSON.stringify([{ title: 'Backend Engineer', salary: '8 - 16 LPA' }]),
      faqsJson: JSON.stringify([{ q: 'Do you cover SQL & NoSQL?', a: 'Yes, PostgreSQL and MongoDB are both covered.' }])
    },
    {
      slug: 'mobile-app-development-react-native',
      title: 'Mobile App Development with React Native & Expo',
      tagline: 'Build cross-platform iOS & Android mobile applications with a single codebase',
      description: 'Learn native device APIs, push notifications, offline storage, mobile UI navigation, and App Store / Play Store deployment.',
      categoryId: catSoftware.id,
      level: 'Intermediate',
      mode: 'Hybrid',
      duration: '4 Months',
      hoursCount: 110,
      fees: 40000,
      originalFees: 55000,
      heroImage: imgMobile,
      featured: false,
      bestseller: false,
      rating: 4.87,
      ratingsCount: 540,
      enrolledStudents: 1500,
      syllabusJson: JSON.stringify([
        { module: 'Module 1', title: 'React Native & Expo Router', details: ['Native UI Components', 'Device Hardware Access (Camera, GPS)'] }
      ]),
      toolsJson: JSON.stringify(['React Native', 'Expo', 'TypeScript', 'Firebase', 'Redux Toolkit']),
      projectsJson: JSON.stringify([{ name: 'On-Demand Food Delivery Mobile App', description: 'iOS and Android app with real-time GPS courier tracking.' }]),
      careerRolesJson: JSON.stringify([{ title: 'Mobile App Developer', salary: '7 - 16 LPA' }]),
      faqsJson: JSON.stringify([{ q: 'Do I need a Mac for iOS apps?', a: 'Using Expo, you can build for both iOS and Android on Windows or Mac.' }])
    },
    {
      slug: 'ui-ux-design-masterclass',
      title: 'UI/UX Design & Product Experience Masterclass',
      tagline: 'Design intuitive digital products, wireframes, component libraries, and Figma prototypes',
      description: 'Master User Research, Information Architecture, Interactive Prototyping, Usability Testing, and Figma Design Systems under top product design leads.',
      categoryId: catDesign.id,
      trainerId: t3.id,
      level: 'All Levels',
      mode: 'Hybrid',
      duration: '4 Months',
      hoursCount: 120,
      fees: 42000,
      originalFees: 60000,
      heroImage: imgUIUX,
      featured: true,
      bestseller: false,
      rating: 4.89,
      ratingsCount: 1120,
      enrolledStudents: 3100,
      syllabusJson: JSON.stringify([
        { module: 'Module 1', title: 'Design Thinking & UX Research', details: ['User Interviews & Personas', 'Journey Mapping', 'Information Architecture'] }
      ]),
      toolsJson: JSON.stringify(['Figma', 'Adobe XD', 'Miro', 'Balsamiq', 'LottieFiles', 'Zeplin']),
      projectsJson: JSON.stringify([{ name: 'Fintech Banking Mobile App UI', description: 'End-to-end design case study focusing on simplified onboarding.' }]),
      careerRolesJson: JSON.stringify([{ title: 'UI/UX Designer', salary: '6 - 15 LPA' }]),
      faqsJson: JSON.stringify([{ q: 'Do I need drawing skills?', a: 'No fine arts experience is required. UX/UI focuses on digital problem solving.' }])
    },
    {
      slug: 'graphic-design-branding-suite',
      title: 'Graphic Design & Brand Identity Professional',
      tagline: 'Master Photoshop, Illustrator, InDesign, Branding Systems & Vector Graphics',
      description: 'Learn visual typography, logo design, corporate branding assets, advertising creatives, and print media design.',
      categoryId: catDesign.id,
      trainerId: t3.id,
      level: 'Beginner',
      mode: 'Offline',
      duration: '3 Months',
      hoursCount: 90,
      fees: 30000,
      originalFees: 42000,
      heroImage: imgGraphic,
      featured: false,
      bestseller: false,
      rating: 4.85,
      ratingsCount: 620,
      enrolledStudents: 1700,
      syllabusJson: JSON.stringify([
        { module: 'Module 1', title: 'Vector Illustration & Branding', details: ['Adobe Illustrator Paths', 'Logo Grid Systems', 'Brand Style Guides'] }
      ]),
      toolsJson: JSON.stringify(['Adobe Photoshop', 'Adobe Illustrator', 'InDesign', 'Canva Pro']),
      projectsJson: JSON.stringify([{ name: 'Corporate Brand Identity Package', description: 'Complete logo, stationery, and social media brand identity guide.' }]),
      careerRolesJson: JSON.stringify([{ title: 'Graphic Designer', salary: '4.5 - 9 LPA' }]),
      faqsJson: JSON.stringify([{ q: 'Is portfolio guidance provided?', a: 'Yes, students build a Behance portfolio throughout the course.' }])
    },
    {
      slug: 'web-design-responsive-frontend',
      title: 'Web Design & Responsive Visual Development',
      tagline: 'Build stunning HTML5/CSS3 visual websites, CSS Grid, animations & Webflow',
      description: 'Master modern CSS layout engines, responsive breakpoints, SVG animations, Webflow visual builder, and landing page conversion principles.',
      categoryId: catDesign.id,
      trainerId: t3.id,
      level: 'Beginner',
      mode: 'Online',
      duration: '3 Months',
      hoursCount: 80,
      fees: 28000,
      originalFees: 38000,
      heroImage: imgWebDesign,
      featured: false,
      bestseller: false,
      rating: 4.86,
      ratingsCount: 490,
      enrolledStudents: 1400,
      syllabusJson: JSON.stringify([
        { module: 'Module 1', title: 'HTML5 & CSS Grid Layouts', details: ['Flexbox & Grid Systems', 'CSS Animations & Transitions', 'Webflow Visual Builder'] }
      ]),
      toolsJson: JSON.stringify(['HTML5', 'CSS3', 'Webflow', 'Tailwind CSS', 'Figma', 'Framer']),
      projectsJson: JSON.stringify([{ name: 'Agency Interactive Landing Page', description: 'Responsive high-converting web landing page.' }]),
      careerRolesJson: JSON.stringify([{ title: 'Web Designer', salary: '5 - 10 LPA' }]),
      faqsJson: JSON.stringify([{ q: 'Is coding required?', a: 'We teach HTML/CSS step-by-step alongside visual builders.' }])
    },
    {
      slug: 'cyber-security-ethical-hacking',
      title: 'Cyber Security & Ethical Hacking Professional',
      tagline: 'Become a certified Security Specialist, Penetration Tester & SOC Analyst',
      description: 'Comprehensive hands-on training in network defense, ethical hacking techniques, web application penetration testing, vulnerability assessment, and incident response.',
      categoryId: catCyber.id,
      trainerId: t4.id,
      level: 'Intermediate',
      mode: 'Offline',
      duration: '5 Months',
      hoursCount: 150,
      fees: 48000,
      originalFees: 68000,
      heroImage: imgCyber,
      featured: true,
      bestseller: true,
      rating: 4.91,
      ratingsCount: 980,
      enrolledStudents: 2800,
      syllabusJson: JSON.stringify([
        { module: 'Module 1', title: 'Networking Fundamentals & Linux Security', details: ['TCP/IP & OSI Model', 'Nmap Scanning & Reconnaissance', 'Linux Bash Security'] }
      ]),
      toolsJson: JSON.stringify(['Kali Linux', 'Wireshark', 'Burp Suite', 'Metasploit', 'Nmap', 'Splunk', 'OWASP ZAP']),
      projectsJson: JSON.stringify([{ name: 'Red Team Penetration Test Lab', description: 'Simulated penetration test of a corporate infrastructure network.' }]),
      careerRolesJson: JSON.stringify([{ title: 'Cyber Security Analyst', salary: '7 - 16 LPA' }]),
      faqsJson: JSON.stringify([{ q: 'Is this training in physical labs?', a: 'Yes! Students train in our hardware cyber security lab with real router stacks.' }])
    },
    {
      slug: 'networking-ccna-enterprise-routing',
      title: 'Enterprise Networking & CCNA Security Certification',
      tagline: 'Master Cisco Routers, Switches, Subnetting, IPv6, VPNs & Network Security',
      description: 'Hands-on network administration course preparing students for Cisco CCNA and CCNP certification exams.',
      categoryId: catCyber.id,
      trainerId: t4.id,
      level: 'All Levels',
      mode: 'Offline',
      duration: '4 Months',
      hoursCount: 120,
      fees: 38000,
      originalFees: 52000,
      heroImage: imgNet,
      featured: false,
      bestseller: false,
      rating: 4.88,
      ratingsCount: 590,
      enrolledStudents: 1650,
      syllabusJson: JSON.stringify([
        { module: 'Module 1', title: 'Routing & Switching', details: ['VLANs & Trunking', 'OSPF & BGP Protocols', 'ACL Access Control Lists'] }
      ]),
      toolsJson: JSON.stringify(['Cisco Packet Tracer', 'GNS3', 'Wireshark', 'Cisco IOS', 'Putty']),
      projectsJson: JSON.stringify([{ name: 'Multi-Site Enterprise WAN Architecture', description: 'Configuring OSPF routing across 3 corporate branch offices.' }]),
      careerRolesJson: JSON.stringify([{ title: 'Network Engineer', salary: '5.5 - 11 LPA' }]),
      faqsJson: JSON.stringify([{ q: 'Does this prepare for CCNA exam 200-301?', a: 'Yes, syllabus aligns 100% with the official Cisco CCNA blueprint.' }])
    },
    {
      slug: 'aws-devops-cloud-architect',
      title: 'AWS Cloud Architect & DevOps Engineering',
      tagline: 'Master Docker, Kubernetes, Terraform, AWS Services & CI/CD Pipelines',
      description: 'Transform into an in-demand DevOps Engineer. Learn to automate IT infrastructure, containerize microservices, orchestrate cluster deployments, and manage AWS multi-region architectures.',
      categoryId: catCloud.id,
      level: 'Intermediate',
      mode: 'Hybrid',
      duration: '5 Months',
      hoursCount: 140,
      fees: 52000,
      originalFees: 72000,
      heroImage: imgDevOps,
      featured: true,
      bestseller: false,
      rating: 4.94,
      ratingsCount: 1350,
      enrolledStudents: 3800,
      syllabusJson: JSON.stringify([
        { module: 'Module 1', title: 'AWS Infrastructure', details: ['VPC & IAM Security', 'EC2, S3, RDS & Auto Scaling', 'CloudWatch Monitoring'] }
      ]),
      toolsJson: JSON.stringify(['AWS', 'Docker', 'Kubernetes', 'Terraform', 'Ansible', 'Jenkins', 'GitHub Actions', 'Grafana']),
      projectsJson: JSON.stringify([{ name: 'Multi-Region High Availability Infra', description: 'Architecting zero-downtime AWS infrastructure managed via Terraform code.' }]),
      careerRolesJson: JSON.stringify([{ title: 'DevOps Engineer', salary: '9 - 22 LPA' }]),
      faqsJson: JSON.stringify([{ q: 'Does this prepare for AWS certifications?', a: 'Yes, aligns with AWS Solutions Architect Associate & CKA exams.' }])
    },
    {
      slug: 'software-testing-automation-selenium',
      title: 'Software Testing & Automation Specialist (Selenium + Playwright)',
      tagline: 'Master Manual QA, API Testing, Java/Python Automation, and Playwright',
      description: 'Become a certified QA Automation Lead. Learn STLC, Agile testing methodologies, JIRA, Postman API testing, Selenium WebDriver, and Playwright framework development.',
      categoryId: catTesting.id,
      level: 'All Levels',
      mode: 'Hybrid',
      duration: '4 Months',
      hoursCount: 120,
      fees: 36000,
      originalFees: 50000,
      heroImage: imgTesting,
      featured: false,
      bestseller: false,
      rating: 4.87,
      ratingsCount: 750,
      enrolledStudents: 2100,
      syllabusJson: JSON.stringify([
        { module: 'Module 1', title: 'Manual Testing & Agile STLC', details: ['Test Case Execution', 'Bug Life Cycle in JIRA', 'Regression Testing'] }
      ]),
      toolsJson: JSON.stringify(['Selenium', 'Playwright', 'Postman', 'JIRA', 'Java', 'TestNG', 'Jenkins']),
      projectsJson: JSON.stringify([{ name: 'Automated E-Banking Test Suite', description: 'End-to-end regression automation framework covering 150+ user workflows.' }]),
      careerRolesJson: JSON.stringify([{ title: 'QA Automation Engineer', salary: '6 - 14 LPA' }]),
      faqsJson: JSON.stringify([{ q: 'Do you teach Java/Python from scratch?', a: 'Yes, core programming concepts needed for automation scripts are covered.' }])
    },
    {
      slug: 'digital-marketing-growth-mastery',
      title: 'Digital Marketing & Growth Hacking Mastery',
      tagline: 'Master SEO, Google Ads, Meta Marketing, Email Automation & Performance Marketing',
      description: 'Master digital customer acquisition channels. Learn search engine optimization, pay-per-click advertising, social media strategy, content marketing, and Google Analytics 4.',
      categoryId: catMarketing.id,
      level: 'All Levels',
      mode: 'Online',
      duration: '3 Months',
      hoursCount: 90,
      fees: 32000,
      originalFees: 45000,
      heroImage: imgMarketing,
      featured: false,
      bestseller: false,
      rating: 4.85,
      ratingsCount: 890,
      enrolledStudents: 2600,
      syllabusJson: JSON.stringify([
        { module: 'Module 1', title: 'Search Engine Optimization (SEO)', details: ['On-Page & Off-Page SEO', 'Technical Audit with Ahrefs', 'Keyword Strategy'] }
      ]),
      toolsJson: JSON.stringify(['Google Ads', 'Meta Ads Manager', 'Ahrefs', 'Google Analytics 4', 'Semrush', 'Mailchimp']),
      projectsJson: JSON.stringify([{ name: 'Live E-Commerce Ad Campaign', description: 'Managing a live budget campaign to achieve 3.5x Return on Ad Spend (ROAS).' }]),
      careerRolesJson: JSON.stringify([{ title: 'Digital Marketing Specialist', salary: '4.5 - 10 LPA' }]),
      faqsJson: JSON.stringify([{ q: 'Is live ad spend budget provided?', a: 'Yes, students manage real ad budgets for practical campaign optimization.' }])
    }
  ];

  for (const cData of fifteenCourses) {
    const course = await prisma.course.create({ data: cData });

    await prisma.batch.createMany({
      data: [
        {
          courseId: course.id,
          startDate: 'August 25, 2026',
          timing: 'Morning (7:30 AM - 9:30 AM)',
          mode: 'Hybrid',
          seatsTotal: 25,
          seatsAvailable: 4,
          status: 'Filling Fast',
          campusLocation: 'Tech Park Main Campus HQ',
        },
        {
          courseId: course.id,
          startDate: 'September 08, 2026',
          timing: 'Evening (6:30 PM - 8:30 PM)',
          mode: 'Online Live',
          seatsTotal: 30,
          seatsAvailable: 8,
          status: 'Open',
          campusLocation: 'Online Virtual Classroom',
        },
      ],
    });
  }

  // 5. Seed 8 Testimonials
  await prisma.testimonial.createMany({
    data: [
      { studentName: 'Ananya Verma', courseName: 'Generative AI & LLM', previousRole: 'Python Dev', currentRole: 'GenAI Engineer', company: 'Oracle', salaryHike: '+160% Hike', photo: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=300&q=80', quote: 'The hands-on RAG pipeline and fine-tuning projects gave me practical confidence.', rating: 5 },
      { studentName: 'Karthik Raja', courseName: 'Full Stack Next.js', previousRole: 'Tech Support', currentRole: 'Frontend Dev', company: 'Zomato', salaryHike: '+190% Hike', photo: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=300&q=80', quote: 'Switching from non-coding support to a core Full Stack developer role felt impossible until I joined this academy.', rating: 5 },
      { studentName: 'Megha Nair', courseName: 'UI/UX Design', previousRole: 'Graphic Associate', currentRole: 'Product UX Designer', company: 'Flipkart', salaryHike: '+120% Hike', photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80', quote: 'Learning Figma design systems and presenting case studies directly got me hired at Flipkart.', rating: 5 },
      { studentName: 'Arjun Mehta', courseName: 'AWS DevOps', previousRole: 'Sys Admin', currentRole: 'Senior DevOps Architect', company: 'Capgemini', salaryHike: '+140% Hike', photo: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=300&q=80', quote: 'The real-world Kubernetes and Terraform automation labs mirror actual enterprise challenges.', rating: 5 },
      { studentName: 'Rohan Joshi', courseName: 'Generative AI & LLM', previousRole: 'Data Associate', currentRole: 'AI Systems Engineer', company: 'Microsoft', salaryHike: '+180% Hike', photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80', quote: 'World-class AI lab infrastructure and patent-holding faculty.', rating: 5 },
      { studentName: 'Sneha Patel', courseName: 'Full Stack Next.js', previousRole: 'Junior Frontend', currentRole: 'SDE-II React Engineer', company: 'Atlassian', salaryHike: '+150% Hike', photo: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80', quote: 'Cracked Atlassian SDE-II interview thanks to 1-on-1 mock technical interviews.', rating: 5 },
      { studentName: 'Amitabh Sen', courseName: 'Cyber Security', previousRole: 'Network Assistant', currentRole: 'Penetration Tester', company: 'Deloitte Tech', salaryHike: '+130% Hike', photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80', quote: 'Hardware router stacks and red team labs were incredible.', rating: 5 },
      { studentName: 'Divya Rastogi', courseName: 'Cloud DevOps', previousRole: 'Cloud Admin', currentRole: 'Cloud Infra Lead', company: 'Amazon AWS', salaryHike: '+170% Hike', photo: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=300&q=80', quote: 'Hands-on ArgoCD and EKS Kubernetes GitOps pipelines prepared me for AWS.', rating: 5 },
    ],
  });

  // 6. Seed 12 Placement Partners
  await prisma.placementPartner.createMany({
    data: [
      { name: 'Microsoft', logo: 'https://images.unsplash.com/photo-1642132652075-2b8109c4883d?auto=format&fit=crop&w=150&q=80', highestPkg: '28.5 LPA', placedCount: 145 },
      { name: 'Amazon AWS', logo: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=150&q=80', highestPkg: '32.0 LPA', placedCount: 210 },
      { name: 'Oracle Tech', logo: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=150&q=80', highestPkg: '24.0 LPA', placedCount: 180 },
      { name: 'Atlassian', logo: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=150&q=80', highestPkg: '26.0 LPA', placedCount: 95 },
      { name: 'Deloitte', logo: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=150&q=80', highestPkg: '19.5 LPA', placedCount: 320 },
      { name: 'Swiggy', logo: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=150&q=80', highestPkg: '22.0 LPA', placedCount: 110 },
    ],
  });

  // 7. Seed Placements
  await prisma.placement.createMany({
    data: [
      { studentName: 'Rohan Joshi', courseTaken: 'Generative AI & LLM', roleAssigned: 'AI Systems Engineer', companyName: 'Microsoft', companyLogo: 'https://images.unsplash.com/photo-1642132652075-2b8109c4883d?auto=format&fit=crop&w=150&q=80', studentPhoto: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80', packageLpa: '28.5 LPA', year: 2026 },
      { studentName: 'Sneha Patel', courseTaken: 'Full Stack Next.js', roleAssigned: 'SDE-II React Engineer', companyName: 'Atlassian', companyLogo: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=150&q=80', studentPhoto: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80', packageLpa: '24.0 LPA', year: 2026 },
      { studentName: 'Amitabh Sen', courseTaken: 'Cyber Security', roleAssigned: 'Penetration Tester', companyName: 'Deloitte Tech', companyLogo: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=150&q=80', studentPhoto: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80', packageLpa: '19.2 LPA', year: 2026 },
      { studentName: 'Divya Rastogi', courseTaken: 'AWS DevOps', roleAssigned: 'Cloud Infra Lead', companyName: 'Amazon AWS', companyLogo: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=150&q=80', studentPhoto: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=300&q=80', packageLpa: '22.5 LPA', year: 2026 },
    ],
  });

  // 8. Seed 5 Events
  await prisma.event.createMany({
    data: [
      {
        slug: 'building-production-rag-systems-llamaindex',
        title: 'Building Production RAG Systems with LlamaIndex & Vector Search',
        tagline: 'Master vector embeddings, hybrid retrieval, and multi-document Q&A agents.',
        description: 'Join Dr. Vikramaditya Sharma for an intensive 2-hour masterclass on building enterprise-grade RAG pipelines.',
        bannerImage: imgGenAI,
        eventDate: 'Saturday, Aug 29, 2026',
        eventTime: '6:00 PM - 8:00 PM IST',
        venue: 'Live Virtual Auditorium + Hyderabad Campus Tech Park',
        mode: 'Hybrid',
        speakerName: 'Dr. Vikramaditya Sharma',
        speakerRole: 'Lead AI Scientist & Ex-Microsoft',
        speakerPhoto: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
        speakerBio: '14+ years in Machine Learning & GenAI research.',
        isPastEvent: false,
        category: 'Masterclass',
        registrationsCount: 420,
        galleryJson: JSON.stringify(['https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=800&q=80']),
      },
      {
        slug: 'nextjs-15-server-actions-architecture',
        title: 'Next.js 15 Server Actions & Full Stack Architecture',
        tagline: 'Hands-on live coding: build end-to-end full stack app with Prisma & Next.js 15.',
        description: 'Learn React 19 Server Components, Server Actions, Optimistic UI updates, and production deployment on Vercel.',
        bannerImage: imgFullStack,
        eventDate: 'Sunday, Sept 06, 2026',
        eventTime: '11:00 AM - 1:30 PM IST',
        venue: 'Bengaluru Innovation Hub Auditorium',
        mode: 'In-Person',
        speakerName: 'Priya Sundaram',
        speakerRole: 'Staff Software Architect & Ex-Amazon',
        speakerPhoto: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80',
        speakerBio: 'Author of popular Next.js microservices guides.',
        isPastEvent: false,
        category: 'Workshop',
        registrationsCount: 280,
        galleryJson: JSON.stringify(['https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=800&q=80']),
      },
      {
        slug: 'zero-trust-cloud-security-conclave',
        title: 'Zero Trust Cloud Security Conclave 2026',
        tagline: 'Protecting hybrid cloud infrastructure & Kubernetes clusters from zero-day threats.',
        description: 'Keynote discussions on Splunk SIEM threat hunting and ethical hacking.',
        bannerImage: imgCyber,
        eventDate: 'Saturday, Sept 19, 2026',
        eventTime: '4:00 PM - 7:00 PM IST',
        venue: 'Pune Cyber Security Center',
        mode: 'In-Person',
        speakerName: 'Rajesh Kulkarni',
        speakerRole: 'Chief Cyber Security Lead',
        speakerPhoto: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80',
        speakerBio: '12 years auditing banking networks and defense systems.',
        isPastEvent: false,
        category: 'Masterclass',
        registrationsCount: 310,
        galleryJson: JSON.stringify(['https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=800&q=80']),
      },
      {
        slug: 'figma-design-systems-summit',
        title: 'Figma Enterprise Design Systems Summit',
        tagline: 'Designing accessible token systems and component libraries for scale.',
        description: 'Interactive session on auto-layout, variants, and design handoff.',
        bannerImage: imgUIUX,
        eventDate: 'Sunday, Sept 27, 2026',
        eventTime: '2:00 PM - 5:00 PM IST',
        venue: 'Live Online Stream',
        mode: 'Live Online',
        speakerName: 'Rahul Deshmukh',
        speakerRole: 'Principal UX Strategist',
        speakerPhoto: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
        speakerBio: 'Former Lead Product Designer at Adobe.',
        isPastEvent: false,
        category: 'Workshop',
        registrationsCount: 490,
        galleryJson: JSON.stringify(['https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?auto=format&fit=crop&w=800&q=80']),
      },
      {
        slug: 'national-ai-hackathon-2026',
        title: 'National AI & Cloud Hackathon 2026 (Past Event)',
        tagline: '48-Hour non-stop hackathon with 120+ teams competing for ₹5,000,000 cash prizes.',
        description: 'Over 500 developers gathered at our Hyderabad HQ campus to build generative AI solutions.',
        bannerImage: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1200&q=80',
        eventDate: 'July 14-16, 2026',
        eventTime: 'Concluded Event',
        venue: 'Main Campus - Tech Park HQ',
        mode: 'In-Person',
        speakerName: 'Dr. Vikramaditya Sharma & Swiggy CTO',
        speakerRole: 'Jury Leads',
        speakerPhoto: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
        speakerBio: 'Industry jury evaluating top 10 AI startups.',
        isPastEvent: true,
        category: 'Hackathon',
        registrationsCount: 1250,
        galleryJson: JSON.stringify(['https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=800&q=80', 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=800&q=80']),
      },
    ],
  });

  // 9. Seed 3 Campuses
  await prisma.campus.createMany({
    data: [
      {
        slug: 'hyderabad-tech-park-hq',
        name: 'Main Campus - Tech Park HQ',
        type: 'Headquarters',
        address: 'Building 4B, Cybercity Tech Park, Hitec Phase 2, Hyderabad, Telangana - 500081',
        city: 'Hyderabad',
        phone: '+91 800-999-8800',
        email: 'hyderabad@nexgentechacademy.com',
        workingHours: 'Mon - Sun: 8:00 AM - 9:00 PM IST',
        landmarks: 'Opposite Mindspace Cyber Towers, Near Hitec City Metro Station (Gate 2)',
        mapEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3806.311746764516!2d78.3758!3d17.4474!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb93dc8c5d69df%3A0x19688beb557ef0d9!2sHITEC%20City%2C%20Hyderabad%2C%20Telangana!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin',
        coverImage: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80',
        galleryJson: JSON.stringify(['https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=800&q=80', 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=800&q=80']),
        isMain: true,
      },
      {
        slug: 'bengaluru-innovation-hub',
        name: 'Innovation Hub Branch Campus',
        type: 'Regional Branch',
        address: '4th Floor, Salarpuria Tech Zone, Outer Ring Road, Marathahalli, Bengaluru, Karnataka - 560103',
        city: 'Bengaluru',
        phone: '+91 91234 56789',
        email: 'bengaluru@nexgentechacademy.com',
        workingHours: 'Mon - Sun: 8:00 AM - 9:00 PM IST',
        landmarks: 'Adjacent to Embassy TechVillage, 5 mins from Bellandur Signal',
        mapEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.852445!2d77.6974!3d12.9279!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae13b730000000%3A0x6b4ef72d73!2sMarathahalli%2C%20Bengaluru%2C%20Karnataka!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin',
        coverImage: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80',
        galleryJson: JSON.stringify(['https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80']),
        isMain: false,
      },
      {
        slug: 'pune-cyber-security-center',
        name: 'Cyber Security & Cloud Center Campus',
        type: 'Specialized Center',
        address: 'Suite 201, Hinjewadi Phase 1 Tech Park, Hinjawadi, Pune, Maharashtra - 411057',
        city: 'Pune',
        phone: '+91 98765 11223',
        email: 'pune@nexgentechacademy.com',
        workingHours: 'Mon - Sat: 9:00 AM - 8:00 PM IST',
        landmarks: 'Near Wipro Circle, Opposite Quadron Business Park',
        mapEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3781.8021!2d73.7388!3d18.5912!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2bbf06!2sHinjawadi%20Phase%201%2C%20Pune!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin',
        coverImage: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=1200&q=80',
        galleryJson: JSON.stringify(['https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=800&q=80']),
        isMain: false,
      },
    ],
  });

  // 10. Seed 6 Blog Posts
  await prisma.blogPost.createMany({
    data: [
      {
        slug: 'evolution-of-generative-ai-llms-2026',
        title: 'The Evolution of Generative AI & Large Language Models in Enterprise Architecture',
        excerpt: 'How multi-agent frameworks, RAG pipelines, and local LLMs are reshaping software engineering and data strategy.',
        content: `Generative AI has evolved from simple text prompts to sophisticated multi-agent orchestration frameworks. Organizations worldwide are replacing monolithic search systems with Retrieval-Augmented Generation (RAG) pipelines backed by vector databases like Pinecone and Qdrant.`,
        category: 'AI',
        featuredImage: imgGenAI,
        authorName: 'Dr. Vikramaditya Sharma',
        authorRole: 'Lead AI Scientist',
        authorPhoto: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
        readTime: '6 min read',
        tagsJson: JSON.stringify(['Generative AI', 'LLM', 'RAG', 'Python']),
        isFeatured: true,
        publishedAt: new Date('2026-08-01'),
      },
      {
        slug: 'nextjs-15-app-router-architecture-guide',
        title: 'Next.js 15 App Router vs Pages Router: The Production Developer Guide',
        excerpt: 'Explore React 19 Server Components, Server Actions, Caching strategies, and Turbopack optimizations.',
        content: `Next.js 15 introduces groundbreaking primitives including React Server Components (RSC), asynchronous request APIs, and instant Server Actions for high performance applications.`,
        category: 'Programming',
        featuredImage: imgFullStack,
        authorName: 'Priya Sundaram',
        authorRole: 'Staff Software Architect',
        authorPhoto: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80',
        readTime: '8 min read',
        tagsJson: JSON.stringify(['Next.js 15', 'React 19', 'TypeScript']),
        isFeatured: false,
        publishedAt: new Date('2026-07-28'),
      },
      {
        slug: 'zero-trust-cyber-security-architecture',
        title: 'Understanding Zero Trust Cyber Security Architecture in Corporate Networks',
        excerpt: 'Never trust, always verify: How SOC analysts and ethical hackers protect hybrid cloud environments.',
        content: `In traditional security models, everything inside the corporate firewall was trusted. Zero Trust enforces strict identity verification for every user and device.`,
        category: 'Cyber Security',
        featuredImage: imgCyber,
        authorName: 'Rajesh Kulkarni',
        authorRole: 'Chief Cyber Security Lead',
        authorPhoto: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80',
        readTime: '5 min read',
        tagsJson: JSON.stringify(['Cyber Security', 'Zero Trust', 'SOC Analyst']),
        isFeatured: false,
        publishedAt: new Date('2026-07-20'),
      },
      {
        slug: 'aws-vs-azure-vs-gcp-cloud-comparison-2026',
        title: 'AWS vs Azure vs GCP: Which Cloud Platform Should You Master First?',
        excerpt: 'A comprehensive breakdown of cloud certification roadmaps, job demand, and DevOps tooling.',
        content: `Cloud computing is the backbone of modern tech infrastructure. Choosing the right provider depends on your target industry and existing skills.`,
        category: 'Cloud',
        featuredImage: imgCloud,
        authorName: 'Arjun Mehta',
        authorRole: 'Senior Cloud DevOps Specialist',
        authorPhoto: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=300&q=80',
        readTime: '7 min read',
        tagsJson: JSON.stringify(['Cloud', 'AWS', 'DevOps']),
        isFeatured: false,
        publishedAt: new Date('2026-07-15'),
      },
      {
        slug: 'shift-left-testing-selenium-playwright',
        title: 'Shift-Left Testing: How Automated Playwright & Selenium Frameworks Save QA Hours',
        excerpt: 'Why modern software development teams integrate API and UI automation tests directly into CI/CD pipelines.',
        content: `Shift-left testing means testing early and testing often. Automated regression suites trigger automatically on every commit.`,
        category: 'Testing',
        featuredImage: imgTesting,
        authorName: 'Kavita Menon',
        authorRole: 'Lead Automation Engineer',
        authorPhoto: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=300&q=80',
        readTime: '4 min read',
        tagsJson: JSON.stringify(['Testing', 'Playwright', 'Selenium']),
        isFeatured: false,
        publishedAt: new Date('2026-07-10'),
      },
      {
        slug: 'performance-marketing-meta-google-ads-4x-roas',
        title: 'Performance Marketing Strategies: Driving 4x ROAS with Meta & Google Ads',
        excerpt: 'Master conversion funnel tracking, custom audience segmentation, and GA4 analytics for growth campaigns.',
        content: `Modern marketing is scientific. Combining search intent (Google Ads) with behavioral retargeting (Meta Ads) drives maximum ROAS.`,
        category: 'Digital Marketing',
        featuredImage: imgMarketing,
        authorName: 'Siddharth Varma',
        authorRole: 'Growth Marketing Director',
        authorPhoto: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
        readTime: '5 min read',
        tagsJson: JSON.stringify(['Digital Marketing', 'SEO', 'Google Ads']),
        isFeatured: false,
        publishedAt: new Date('2026-07-01'),
      },
    ],
  });

  // 11. Seed Gallery Images
  await prisma.galleryImage.createMany({
    data: [
      { title: 'AI Supercomputing GPU Station', category: 'Campus & Labs', imageUrl: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=800&q=80', caption: 'NVIDIA A100 GPU workstation lab.' },
      { title: 'Cisco Hardware Server Room', category: 'Campus & Labs', imageUrl: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=800&q=80', caption: 'Isolated hardware rack lab for cyber security.' },
      { title: 'UI/UX Mac Design Studio', category: 'Campus & Labs', imageUrl: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80', caption: 'Apple 5K Display workstations for Figma design.' },
      { title: 'National Hackathon 2026', category: 'Hackathons', imageUrl: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=800&q=80', caption: '48-hour student hackathon at Hyderabad HQ.' },
      { title: 'Corporate Hiring Drive', category: 'Events', imageUrl: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80', caption: 'Direct recruitment interviews with MNC hiring leads.' },
    ],
  });

  console.log('Seeding 15+ Courses, 5 Events, 3 Campuses, 6 Blogs, 8 Testimonials & Gallery completed!');
}

main()
  .catch((e) => {
    console.error('Seeding error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
