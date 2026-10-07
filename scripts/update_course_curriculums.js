const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const updatedCurriculums = {
  // 1. Modern Frontend Engineering with React 19 & TypeScript (3.5 Months -> 5 Modules)
  'frontend-development-react-typescript': [
    {
      module: 'Module 1',
      title: 'Modern JavaScript (ES6+), TypeScript Foundations & Strict Typing',
      details: [
        'Advanced ES6+: closures, prototypes, event loop, promises, and async/await',
        'TypeScript types, interfaces, generics, union types, and type narrowing',
        'Strict type checking, utility types (Partial, Pick, Omit, Record), and tsconfig optimization',
        'Modern build tooling with Vite, ESLint flat config, and Prettier integration',
        'Setting up production developer environments and Git branch workflows',
      ],
    },
    {
      module: 'Module 2',
      title: 'React 19 Core, JSX, Component Architecture & Advanced Hooks',
      details: [
        'React 19 compiler paradigms, JSX deep dive, and Virtual DOM reconciliation',
        'Functional component lifecycle, state, and props management',
        'Essential and advanced hooks: useState, useEffect, useMemo, useCallback, useRef',
        'React 19 new hooks: useActionState, useOptimistic, and use() hook with Promises',
        'Creating robust reusable custom hooks for API calls, window listeners, and local storage',
      ],
    },
    {
      module: 'Module 3',
      title: 'Scalable Styling with Tailwind CSS v4, Responsive Design & UI Systems',
      details: [
        'Tailwind CSS v4 engine, CSS variables, utility-first design principles',
        'Mobile-first responsive layouts, flexbox, and CSS grid mastery',
        'Dark mode implementation, theme toggles, and color contrast accessibility',
        'Building reusable accessible UI component libraries with Radix UI / Headless UI',
        'Micro-interactions and fluid CSS transitions for polished user experience',
      ],
    },
    {
      module: 'Module 4',
      title: 'State Management with Zustand, TanStack Query & Client Performance',
      details: [
        'Global client state management with Zustand: stores, selectors, and persistence',
        'Server state synchronization, caching, and background refetching with TanStack Query',
        'Optimistic UI updates, mutations, and pagination / infinite scroll implementation',
        'Performance profiling with React DevTools, code splitting with React.lazy and Suspense',
        'Web Vitals optimization (LCP, FID, CLS) and bundle size reduction techniques',
      ],
    },
    {
      module: 'Module 5',
      title: 'Testing with Vitest, Production Bundling & Cloud Deployment',
      details: [
        'Unit and component testing with Vitest and React Testing Library',
        'User event simulation, mocking network requests with MSW (Mock Service Worker)',
        'Production build optimization, tree-shaking, and static asset compression',
        'Continuous Integration (CI) test workflows with GitHub Actions',
        'Deploying scalable Single Page Applications to Vercel, Netlify, and AWS S3/CloudFront',
      ],
    },
  ],

  // 2. Backend Engineering with Node.js, Express & Microservices (4 Months -> 6 Modules)
  'backend-engineering-nodejs-microservices': [
    {
      module: 'Module 1',
      title: 'Node.js Runtime Architecture, V8 Engine & Asynchronous I/O',
      details: [
        'Node.js architecture: V8 engine, Libuv thread pool, and non-blocking event loop',
        'Streams, Buffers, and high-throughput file system operations',
        'Event-driven programming with EventEmitter and custom process handlers',
        'Process management, clustering, and worker threads for CPU-heavy computing',
      ],
    },
    {
      module: 'Module 2',
      title: 'RESTful API Engineering with Express.js & Schema Validation',
      details: [
        'Architecting RESTful APIs following enterprise standards and semantic HTTP verbs',
        'Robust middleware pipelines: logging, CORS, rate limiting, and centralized error handling',
        'Strict payload validation and sanitization using Zod and Joi',
        'API documentation with Swagger / OpenAPI 3.0 specifications',
      ],
    },
    {
      module: 'Module 3',
      title: 'Relational & NoSQL Database Engineering (PostgreSQL & MongoDB)',
      details: [
        'Relational schema design, normalization, foreign keys, and indexing in PostgreSQL',
        'Prisma ORM: schema modeling, migrations, relationships, and raw SQL queries',
        'MongoDB NoSQL database design with Mongoose ODM for flexible schema documents',
        'Database connection pooling, transaction isolation levels, and query performance tuning',
      ],
    },
    {
      module: 'Module 4',
      title: 'Authentication, Authorization, RBAC & API Security Hardening',
      details: [
        'Secure password hashing with Argon2 / bcrypt and salted secrets',
        'Stateless authentication with JSON Web Tokens (JWT) and refresh token rotation',
        'Role-Based Access Control (RBAC) and fine-grained permissions middleware',
        'OAuth 2.0 social login integration (Google, GitHub)',
        'API security hardening: Helmet, CSRF protection, SQL injection prevention, and API key auth',
      ],
    },
    {
      module: 'Module 5',
      title: 'In-Memory Caching with Redis & Message Queues (RabbitMQ/BullMQ)',
      details: [
        'High-speed in-memory caching strategies with Redis (cache-aside, write-through, TTL)',
        'Redis data structures: hashes, sorted sets, pub/sub, and distributed locks',
        'Asynchronous job queues and background workers with BullMQ',
        'Event-driven decoupled messaging with RabbitMQ exchanges and message acknowledgments',
      ],
    },
    {
      module: 'Module 6',
      title: 'Microservices Architecture, Docker Containerization & Cloud Deployment',
      details: [
        'Monolith to microservices decomposition patterns and API Gateway routing',
        'Inter-service communication with gRPC, Protocol Buffers, and REST',
        'Multi-stage Dockerfile creation and multi-container orchestration with Docker Compose',
        'Health checks, graceful server shutdowns, and structured logging with Winston/Pino',
        'Production deployment on AWS (EC2, ECS Fargate) with automated CI/CD pipelines',
      ],
    },
  ],

  // 3. Digital Marketing & Growth Hacking Mastery (3 Months -> 5 Modules)
  'digital-marketing-growth-mastery': [
    {
      module: 'Module 1',
      title: 'Digital Marketing Strategy, Funnel Architecture & Brand Positioning',
      details: [
        'Foundations of modern digital marketing, digital buyer personas, and audience segmentation',
        'Full-funnel marketing architecture: TOFU (Awareness), MOFU (Consideration), BOFU (Conversion)',
        'Competitive analysis and market intelligence with Similarweb and Semrush',
        'Value proposition creation, brand positioning, and customer acquisition cost (CAC) economics',
      ],
    },
    {
      module: 'Module 2',
      title: 'Search Engine Optimization (SEO) Mastery: On-Page, Off-Page & Technical',
      details: [
        'Keyword research methodology: search intent, difficulty scores, and topic clusters',
        'On-page SEO: title tags, meta descriptions, heading hierarchy, and internal linking strategies',
        'Technical SEO: XML sitemaps, robots.txt, Core Web Vitals, and mobile indexing audits',
        'Off-page SEO: high-authority backlink outreach, digital PR, and guest blogging campaigns',
        'Local SEO: Google Business Profile optimization, citations, and local map pack rankings',
      ],
    },
    {
      module: 'Module 3',
      title: 'Performance Marketing & Paid Advertising (Google Ads & Meta Ads)',
      details: [
        'Google Ads: Search campaigns, Quality Score optimization, Ad copy, and bidding strategies',
        'Google Display Network, Video (YouTube) advertising, and Performance Max (PMax) campaigns',
        'Meta Ads Manager: Campaign budget optimization (CBO), audience targeting, and Lookalike audiences',
        'Creative ad design, dynamic product ads (DPA), and high-converting video hook frameworks',
        'Conversion tracking: Meta Pixel setup, Conversions API (CAPI), and custom event tracking',
      ],
    },
    {
      module: 'Module 4',
      title: 'Social Media Growth, Content Marketing & Automated Email Marketing',
      details: [
        'Organic social media strategy for LinkedIn, Instagram, X (Twitter), and YouTube Shorts',
        'Content calendar creation, copywriting frameworks (AIDA, PAS), and storytelling for brands',
        'Email marketing automation: lead magnets, welcome sequences, abandoned cart triggers, and newsletters',
        'Email deliverability, list segmentation, A/B testing subject lines, and Mailchimp/HubSpot setups',
      ],
    },
    {
      module: 'Module 5',
      title: 'Web Analytics (GA4), Conversion Rate Optimization (CRO) & Growth Hacking',
      details: [
        'Google Analytics 4 (GA4): events, custom parameters, user journey exploration, and attribution models',
        'Google Tag Manager (GTM): triggers, tags, data layers, and custom JavaScript variables',
        'Conversion Rate Optimization (CRO): landing page optimization, heatmaps (Hotjar), and scroll mapping',
        'A/B split testing methodology, statistical significance, and viral referral loops',
        'Comprehensive capstone: designing and executing an end-to-end digital growth campaign with live ROI tracking',
      ],
    },
  ],

  // 4. Enterprise Networking & CCNA Security Certification (4 Months -> 5 Modules)
  'networking-ccna-enterprise-routing': [
    {
      module: 'Module 1',
      title: 'Network Fundamentals, OSI Model & IPv4/IPv6 Subnetting Mastery',
      details: [
        'Network architectures: client-server, peer-to-peer, topologies, cables, and optical fiber',
        'OSI 7-layer reference model vs TCP/IP protocol suite comparison',
        'TCP vs UDP protocols, three-way handshakes, port numbers, and socket connections',
        'Binary mathematics, IPv4 addressing classes, and Variable Length Subnet Masking (VLSM)',
        'IPv6 address architecture, global unicast, link-local addresses, and SLAAC autoconfiguration',
      ],
    },
    {
      module: 'Module 2',
      title: 'Ethernet Switching, VLANs, Trunking & Spanning Tree Protocol (STP)',
      details: [
        'Cisco IOS command line interface (CLI) navigation and initial switch configuration',
        'MAC address learning, frame forwarding, and broadcast domain segmentation',
        'VLAN configuration, 802.1Q trunking, Native VLANs, and VTP protocols',
        'Inter-VLAN routing using Router-on-a-Stick and Layer 3 Switch SVIs',
        'Spanning Tree Protocol (STP 802.1D) and Rapid PVST+ (802.1w) loop prevention mechanisms',
      ],
    },
    {
      module: 'Module 3',
      title: 'Enterprise IP Routing Technologies & OSPF Dynamic Routing',
      details: [
        'Routing concepts: routing table lookup, static routing, default routes, and administrative distance',
        'Open Shortest Path First (OSPFv2): single-area and multi-area OSPF configurations',
        'OSPF neighbor adjacencies, Link-State Advertisements (LSAs), DR/BDR election, and metric calculations',
        'OSPFv3 for IPv6 network routing and dual-stack operations',
        'First Hop Redundancy Protocols (HSRP and VRRP) for gateway high availability',
      ],
    },
    {
      module: 'Module 4',
      title: 'IP Services, Enterprise Security & Access Control Lists (ACLs)',
      details: [
        'Dynamic Host Configuration Protocol (DHCP) server and DHCP relay agent configuration',
        'Network Address Translation: Static NAT, Dynamic NAT, and Port Address Translation (PAT)',
        'Standard and Extended Access Control Lists (ACLs) for IPv4 traffic filtering',
        'Network Time Protocol (NTP), DNS, Syslog, and SNMP monitoring setup',
        'Layer 2 switch security: Port Security, DHCP Snooping, Dynamic ARP Inspection (DAI)',
      ],
    },
    {
      module: 'Module 5',
      title: 'Network Automation, Software-Defined Networking & CCNA Exam Preparation',
      details: [
        'Software-Defined Networking (SDN) concepts, control plane vs data plane separation',
        'Cisco DNA Center, REST APIs, JSON/YAML data serialization formats',
        'Configuration management tools: Ansible playbooks and Python scripting for network devices',
        'Wireless network architectures: Autonomous APs, Cloud-based APs, and WLC configurations',
        'Comprehensive Cisco Certified Network Associate (CCNA 200-301) practice exam simulations',
      ],
    },
  ],

  // 5. Graphic Design & Brand Identity Professional (3 Months -> 4 Modules)
  'graphic-design-branding-suite': [
    {
      module: 'Module 1',
      title: 'Design Foundations, Color Theory, Typography & Visual Composition',
      details: [
        'Elements of design: line, shape, form, texture, space, value, and color',
        'Color psychology, RGB vs CMYK color spaces, and Pantone matching systems',
        'Typography fundamentals: font classifications, kerning, tracking, leading, and hierarchy',
        'Grid systems, rule of thirds, balance, contrast, alignment, and visual pacing',
      ],
    },
    {
      module: 'Module 2',
      title: 'Vector Art, Logo Design & Brand Identity Systems in Adobe Illustrator',
      details: [
        'Mastering the Pen Tool, curvature tool, shape builder, and pathfinder panels',
        'Creating scalable vector icons, badges, illustrations, and typography treatments',
        'Logo design process: moodboarding, sketching, vector digitizing, and negative space exploration',
        'Building complete brand identity systems: color palettes, type pairings, and brand guidelines manuals',
      ],
    },
    {
      module: 'Module 3',
      title: 'Advanced Photo Manipulation, Retouching & Compositing in Adobe Photoshop',
      details: [
        'Non-destructive workflows: adjustment layers, layer masks, and smart objects',
        'Advanced selection techniques: pen tool paths, select subject, and refine edge / select and mask',
        'High-end portrait and product retouching, frequency separation, and color grading',
        'Creative photo manipulation: lighting matching, perspective blending, shadows, and textures',
      ],
    },
    {
      module: 'Module 4',
      title: 'Editorial Layouts with InDesign, Social Collateral & Professional Portfolio',
      details: [
        'Multi-page publication design in Adobe InDesign: master pages, paragraph styles, and preflighting',
        'Designing print-ready assets: brochures, magazines, business cards, and packaging mockups',
        'Social media campaign kit creation: carousel graphics, banners, and advertising templates',
        'Assembling a high-impact Behance and Dribbble portfolio to attract freelance clients and agencies',
      ],
    },
  ],

  // 6. Software Testing & Automation Specialist (Selenium + Playwright) (4 Months -> 5 Modules)
  'software-testing-automation-selenium': [
    {
      module: 'Module 1',
      title: 'Manual Testing Fundamentals, STLC, Agile Methodologies & Jira Tracking',
      details: [
        'Software Testing Life Cycle (STLC) and Software Development Life Cycle (SDLC) models',
        'Test planning, test scenario identification, and test case writing with boundary value analysis',
        'Defect lifecycle, bug reporting, triage, and agile project tracking using Atlassian Jira',
        'Regression testing, sanity testing, smoke testing, and cross-browser test matrices',
      ],
    },
    {
      module: 'Module 2',
      title: 'Programming Foundations for Automation Engineers (Java & TypeScript)',
      details: [
        'Object-Oriented Programming (OOP): classes, inheritance, polymorphism, abstraction, and encapsulation',
        'Collections framework (List, Set, Map) and stream operations in Java / TypeScript',
        'Exception handling, file I/O operations (JSON, CSV, Excel), and Maven / npm dependency management',
        'Git version control, branching strategies, and collaboration workflows for QA teams',
      ],
    },
    {
      module: 'Module 3',
      title: 'Web UI Automation with Selenium WebDriver & TestNG Framework',
      details: [
        'Selenium WebDriver architecture, browser drivers, and locator strategies (XPath, CSS selectors)',
        'Handling dynamic elements, explicit waits, fluent waits, alerts, iframes, and multi-window tabs',
        'TestNG framework: annotations, assertions, parameterization, and data providers',
        'Page Object Model (POM) architectural pattern with PageFactory for modular automation code',
        'Generating interactive test execution reports with ExtentReports and Allure',
      ],
    },
    {
      module: 'Module 4',
      title: 'Modern End-to-End Automation with Playwright & Cypress',
      details: [
        'Playwright architecture: auto-waiting, multi-tab execution, network interception, and traces',
        'Writing resilient E2E web automation scripts with Playwright in TypeScript',
        'API mocking, request interception, and visual regression snapshot testing',
        'Parallel test execution and headless browser testing in containerized Docker setups',
      ],
    },
    {
      module: 'Module 5',
      title: 'API Testing with Postman & RestAssured, CI/CD Integration with Jenkins',
      details: [
        'RESTful API testing fundamentals, HTTP methods, headers, query params, and JSON schema validation',
        'Postman automation: environments, collections, pre-request scripts, and Newman test runner',
        'Automated API testing with RestAssured in Java: payload serialization and deserialization',
        'Integrating automated test suites into CI/CD pipelines using Jenkins and GitHub Actions',
      ],
    },
  ],

  // 7. Web Design & Responsive Visual Development (3 Months -> 4 Modules)
  'web-design-responsive-frontend': [
    {
      module: 'Module 1',
      title: 'Semantic HTML5 Architecture, CSS3 Modern Layouts & Flexbox/Grid',
      details: [
        'Semantic HTML5 markup: header, nav, main, article, section, aside, and footer',
        'CSS3 box model, positioning, pseudo-classes, pseudo-elements, and modern specificity rules',
        'Mastering CSS Flexbox: axis alignments, flex-grow/shrink, and responsive navigation bars',
        'Mastering CSS Grid: grid-template-areas, auto-fill, auto-fit, and complex asymmetric layouts',
      ],
    },
    {
      module: 'Module 2',
      title: 'Responsive Web Design, Mobile-First Workflow & Tailwind CSS',
      details: [
        'Mobile-first responsive philosophy, media queries, and fluid typography with clamp()',
        'Tailwind CSS essentials: utility classes, configuration, custom colors, and dark mode styling',
        'Responsive images: srcset, picture element, and modern image formats (WebP, AVIF)',
        'Web accessibility (WCAG 2.2): ARIA attributes, semantic landmarks, and keyboard navigation',
      ],
    },
    {
      module: 'Module 3',
      title: 'UI Prototyping in Figma, Design Handoff & Translating Mockups to Code',
      details: [
        'Figma interface basics, wireframing, typography scales, and color style libraries',
        'Auto Layout, responsive constraints, and design-to-code translation methodologies',
        'Exporting SVG assets, icons, and CSS variables directly from Figma prototypes',
        'Building pixel-perfect responsive landing pages based on enterprise client mockups',
      ],
    },
    {
      module: 'Module 4',
      title: 'Interactive Web Experiences with Vanilla JavaScript & Live Hosting',
      details: [
        'DOM manipulation: query selectors, event listeners, form validation, and interactive menus',
        'CSS transitions, keyframe animations, and scroll-triggered micro-interactions',
        'Working with third-party web APIs, fetch requests, and dynamic data rendering',
        'Version control with Git/GitHub and deploying live production websites to Vercel and Netlify',
      ],
    },
  ],
};

async function main() {
  console.log('--- Updating Course Curriculums with Authentic, Valid Modules ---');
  for (const [slug, syllabus] of Object.entries(updatedCurriculums)) {
    const updated = await prisma.course.updateMany({
      where: { slug },
      data: {
        syllabusJson: JSON.stringify(syllabus),
      },
    });
    console.log(`Updated [${slug}]: ${syllabus.length} valid modules (Affected: ${updated.count})`);
  }
  console.log('--- Successfully completed curriculum upgrade! ---');
}

main().catch(console.error).finally(() => prisma.$disconnect());
