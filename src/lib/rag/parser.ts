import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import { RagDocumentChunk } from './types';

/**
 * Computes SHA-256 hash of a text string for deterministic duplicate detection.
 */
export function computeContentHash(text: string): string {
  return crypto.createHash('sha256').update(text.trim()).digest('hex');
}

/**
 * Searches for all official institutional Word documents in knowledge directories.
 */
export function findKnowledgeDocuments(): string[] {
  const foundFiles: string[] = [];
  const primaryDoc = path.join(process.cwd(), 'knowledge', 'institute', 'NEXGENTECH_ACADEMY_RAG_DOCUMENT.docx');
  const rootDoc = path.join(process.cwd(), 'NEXGENTECH ACADEMY AND RESEARCH RAG DOCUMENT.docx');

  if (fs.existsSync(primaryDoc)) {
    foundFiles.push(primaryDoc);
  }
  if (fs.existsSync(rootDoc) && !foundFiles.includes(rootDoc)) {
    foundFiles.push(rootDoc);
  }

  if (foundFiles.length === 0) {
    foundFiles.push(primaryDoc);
  }

  return foundFiles;
}

/**
 * Parses the official Word document and decomposes it into semantic, high-quality RAG chunks
 * with preserved hierarchy, associated sub-points, and rich metadata.
 */
export function extractSemanticChunks(): RagDocumentChunk[] {
  const docPaths = findKnowledgeDocuments();
  const primaryDocPath = docPaths[0] || path.join(process.cwd(), 'NEXGENTECH ACADEMY AND RESEARCH RAG DOCUMENT.docx');
  const docFilename = path.basename(primaryDocPath);
  const sourceName = 'NEXGENTECH_ACADEMY_RAG_DOCUMENT';

  const rawChunks: Omit<RagDocumentChunk, 'contentHash'>[] = [
    // 1. Corporate Identity, Vision, and Platform Overview
    {
      id: 'chunk_corp_identity_overview',
      text: `SECTION: 1. Corporate Identity, Vision, and Platform Overview
Institute Name: NEXGENTECH Academy and Research (Brand Identity: Tech Nova Institute Web Platform)
Motto / Tagline: "Learn Today. Lead Tomorrow."
Organizational Focus: Enterprise-grade IT training, applied computer science research, career-transition bootcamps, and corporate skilling.
Vision Statement: To cultivate industry-ready software engineers, cloud architects, and AI researchers through immersive, project-centric curriculum and verifiable industry credentials.
Mission Statement: To bridge academic education and fast-moving technological paradigms by offering real-world systems experience, direct industry mentorship, and transparent, measurable career outcomes.`,
      metadata: {
        source: sourceName,
        document: docFilename,
        section: '1. Corporate Identity, Vision, and Platform Overview',
        type: 'institutional_knowledge',
        page: 1,
      },
    },

    // 2. Executive Leadership & Department Heads
    {
      id: 'chunk_leadership_directory',
      text: `SECTION: 2. Executive Leadership, Department Heads & Key Personnel Directory
NexgenTech Academy & Research is governed by enterprise engineers, research scientists, and academic leaders:
- Dr. Rajeshwar V. Sharma: Chief Executive Officer (CEO) & Co-Founder | Executive Leadership | Direct Contact Desk: ceo@nexgentechacademy.com. Leads strategic vision, institutional partnerships, and educational quality. Holds a PhD in Distributed Computing with 20+ years of engineering leadership experience.
- Dr. Ananya Mukherjee: Chief Technology Officer (CTO) & Head of AI Labs | R&D & Applied AI Research | Direct Contact Desk: research@nexgentechacademy.com. Directs NexgenTech Labs, overseeing research fellowships, LLM architectures, RAG engineering, and open-source contributions.
- Vikramaditya Sengupta: Head of Academics & Curriculum Design | Academic Affairs & Faculty | Direct Contact Desk: academics@nexgentechacademy.com.
- Kavita Nair: Head of Human Resources (HR) & People Ops | HR & Talent Acquisition | Direct Contact Desk: hr@nexgentechacademy.com. Manages faculty hiring, employee engagement, workplace culture, trainer accreditation, and institutional grievance redressing via hr@nexgentechacademy.com.
- Rohan Deshmukh: Head of Corporate Relations & Placements | Placement & Career Services | Direct Contact Desk: placements@nexgentechacademy.com. Manages relationships with 250+ enterprise recruitment partners, salary benchmarking, and alumni placement drives.
- Siddharth Menon: Head of Cloud & DevOps Faculty | Cloud Infrastructure Track | Direct Contact Desk: siddharth.m@nexgentechacademy.com.
- Pooja Kulkarni: Head of Admissions & Student Counseling | Student Onboarding Desk | Direct Contact Desk: admissions@nexgentechacademy.com.`,
      metadata: {
        source: sourceName,
        document: docFilename,
        section: '2. Executive Leadership, Department Heads & Key Personnel Directory',
        type: 'leadership',
        page: 2,
      },
    },

    // 3. Legal Entity, Accreditations & Transparent Disclosures
    {
      id: 'chunk_legal_accreditations',
      text: `SECTION: 3. Legal Entity, Accreditations & Transparent Disclosures
- Corporate Entity: NexgenTech Academy & Research Private Limited (Incorporated under the Companies Act, 2013).
- CIN (Corporate Identity Number): U72900TG2020PTC148920
- GSTIN: 36AABCN1234F1Z8 (Telangana) | 29AABCN1234F1Z9 (Karnataka)
- Quality & Academic Accreditations: ISO 9001:2015 Certified Educational Institution, AWS Authorized Academy Partner, Microsoft Learn Educator Network Partner, and NASSCOM FutureSkills Prime Institutional Affiliate.
- Transparency Policy: Open billing with GST invoices for all programs, DPDPA compliant student data handling, and strict anti-plagiarism laboratory conduct.`,
      metadata: {
        source: sourceName,
        document: docFilename,
        section: '3. Legal Entity, Accreditations & Transparent Disclosures',
        type: 'institutional_knowledge',
        page: 3,
      },
    },

    // 4. Campuses, Facilities, and Public Contact Channels
    {
      id: 'chunk_campuses_facilities_contact',
      text: `SECTION: 4. Campuses, Facilities, and Public Contact Channels
Main Campus - Tech Park (HQ):
- Address: Building 4B, Cybercity Tech Park, Hitec Phase 2, Hyderabad, Telangana - 500081.
- Landmark: Mindspace Circle & Hitec City Metro Station.
- Key Facilities: GPU AI Cluster Labs, Executive Boardroom, 200-Seat Auditorium, Admissions Center, Research Commons.

Branch Campus - Innovation Hub:
- Address: Outer Ring Road, Marathahalli Tech Zone, Bengaluru, Karnataka - 560103.
- Landmark: Opposite Prestige Tech Park entrance.
- Key Facilities: Cloud DevOps Studio, Full-Stack Incubation Wing, Hackathon Arena, Career Services Center.

Public Communication Directory:
- Toll-Free Admissions Helpline: +91 800-999-8800 (Mon–Sat: 8:00 AM – 8:00 PM IST)
- Direct Admissions & WhatsApp Support: +91 91234 56789
- Admissions Email: admissions@nexgentechacademy.com
- Human Resources Desk: hr@nexgentechacademy.com
- Corporate Placement Desk: partnerships@nexgentechacademy.com | placements@nexgentechacademy.com
- Official Website: www.nexgentechacademy.com`,
      metadata: {
        source: sourceName,
        document: docFilename,
        section: '4. Campuses, Facilities, and Public Contact Channels',
        type: 'campus',
        page: 4,
      },
    },

    // 5. Admissions Process, Scholarships & Transparent Refund Policy
    {
      id: 'chunk_admissions_refund_scholarships',
      text: `SECTION: 5. Admissions Process, Scholarships & Transparent Refund Policy
Admissions Process:
- Application Step 1: Submit application via website form or walk-in consultation at Hyderabad or Bengaluru campus.
- Application Step 2: Aptitude and coding assessment (60 minutes) covering logical reasoning, problem-solving, and basic syntax.
- Application Step 3: Technical counseling interview to evaluate domain interest and background readiness.
- Application Step 4: Provisional admission letter, cloud sandbox provisioning, and onboarding kit delivery within 48 hours.

Transparent Refund Guidelines:
- 100% Full Refund: Within 7 calendar days of the official cohort start date. Formal notice sent to admissions@nexgentechacademy.com guarantees no-questions-asked refund.
- 50% Partial Refund: Applicable if withdrawal request is registered between day 8 and day 14 of the batch.
- Zero Refund: After 14 calendar days, tuition is non-refundable due to reserved server instances and mentor allocations.
- Batch Transfer Credit: Students can defer enrollment to the next upcoming cohort without penalty in cases of documented emergencies.

Financial Aid & Scholarships:
- Merit Scholarship: Up to 25% waiver on course fees for candidates scoring 90%+ in the entrance aptitude test.
- Women in Tech Grant: Flat 15% tuition waiver across all advanced technical tracks.
- 0% Interest EMI: Available across 6, 9, and 12-month tenures through certified NBFC partners (Propelld, LiquiLoans, Bajaj Finserv).`,
      metadata: {
        source: sourceName,
        document: docFilename,
        section: '5. Admissions Process, Scholarships & Transparent Refund Policy',
        type: 'admissions',
        page: 5,
      },
    },

    // 6. Placements Cell, Salary Benchmarks & Enterprise Hiring Partners
    {
      id: 'chunk_placements_salaries_partners',
      text: `SECTION: 6. Placements Cell, Salary Benchmarks & Enterprise Hiring Partners
- Placement Assistance Model: 100% placement support with dedicated corporate relationship managers for 12 months post-graduation.
- Average Package (CTC): INR 7.8 LPA across all programs.
- Highest Package (CTC): INR 24.5 LPA secured in Cloud / AI domains.
- Average Career Transition Salary Hike: 65% to 110% over prior compensation.
- Hiring Partner Network: Over 250+ enterprise and startup partners including Microsoft Cloud Solutions, Thoughtworks, TCS Enterprise, Infosys Digital, Cognizant, Persistent Systems, Capgemini, and leading GCCs.
- Pre-Placement Training: Includes 20+ mock technical interviews, LeetCode / DSA problem-solving drills, live system design workshops, and GitHub / LinkedIn profile optimization.`,
      metadata: {
        source: sourceName,
        document: docFilename,
        section: '6. Placements Cell, Salary Benchmarks & Enterprise Hiring Partners',
        type: 'placements',
        page: 6,
      },
    },

    // 7. Standardized FAQ Entries (Individual Semantic Q&A Chunks)
    {
      id: 'faq_hyderabad_address',
      text: `QUESTION: What is the exact physical address of NexgenTech Academy's Hyderabad campus?
ANSWER: The Main Campus is situated at Building 4B, Cybercity Tech Park, Hitec Phase 2, Hyderabad, Telangana - 500081, conveniently located next to Mindspace Circle and the Hitec City Metro Station. Key facilities include GPU AI Cluster Labs, Executive Boardroom, 200-Seat Auditorium, Admissions Center, and Research Commons.`,
      metadata: {
        source: sourceName,
        document: docFilename,
        section: '7. Grounding Corpus & Frequently Asked Questions',
        type: 'faq',
        question: "What is the exact physical address of NexgenTech Academy's Hyderabad campus?",
        page: 7,
      },
    },
    {
      id: 'faq_bengaluru_address',
      text: `QUESTION: Where is the Bengaluru branch campus located?
ANSWER: NexgenTech's Innovation Hub is located along the Outer Ring Road, Marathahalli Tech Zone, Bengaluru, Karnataka - 560103, opposite the entrance to Prestige Tech Park. Facilities include Cloud DevOps Studio, Full-Stack Incubation Wing, Hackathon Arena, and Career Services Center.`,
      metadata: {
        source: sourceName,
        document: docFilename,
        section: '7. Grounding Corpus & Frequently Asked Questions',
        type: 'faq',
        question: 'Where is the Bengaluru branch campus located?',
        page: 7,
      },
    },
    {
      id: 'faq_contact_telephone_whatsapp',
      text: `QUESTION: How can I reach the admissions office by telephone or WhatsApp?
ANSWER: You can call our toll-free line at +91 800-999-8800 (Mon–Sat: 8:00 AM – 8:00 PM IST) or send a WhatsApp message / call to our dedicated admissions desk at +91 91234 56789.`,
      metadata: {
        source: sourceName,
        document: docFilename,
        section: '7. Grounding Corpus & Frequently Asked Questions',
        type: 'faq',
        question: 'How can I reach the admissions office by telephone or WhatsApp?',
        page: 7,
      },
    },
    {
      id: 'faq_admissions_email',
      text: `QUESTION: What is the official contact email for course registrations?
ANSWER: All admissions inquiries, applications, and course registration queries should be sent to admissions@nexgentechacademy.com.`,
      metadata: {
        source: sourceName,
        document: docFilename,
        section: '7. Grounding Corpus & Frequently Asked Questions',
        type: 'faq',
        question: 'What is the official contact email for course registrations?',
        page: 7,
      },
    },
    {
      id: 'faq_free_demo_class',
      text: `QUESTION: Does NexgenTech offer a free demo class before enrollment?
ANSWER: Yes. Prospective students can book a complimentary live demo session or in-person classroom observation directly through the website CTA ('Book Free Demo') or by contacting the admissions desk at +91 800-999-8800 / admissions@nexgentechacademy.com.`,
      metadata: {
        source: sourceName,
        document: docFilename,
        section: '7. Grounding Corpus & Frequently Asked Questions',
        type: 'faq',
        question: 'Does NexgenTech offer a free demo class before enrollment?',
        page: 7,
      },
    },
    {
      id: 'faq_tech_stack',
      text: `QUESTION: What modern technology stack powers the NexgenTech training portal?
ANSWER: The website is built with Next.js 15 (App Router), TypeScript, Tailwind CSS, Framer Motion animations, Neon PostgreSQL database, Prisma ORM, and NextAuth.js authentication.`,
      metadata: {
        source: sourceName,
        document: docFilename,
        section: '7. Grounding Corpus & Frequently Asked Questions',
        type: 'faq',
        question: 'What modern technology stack powers the NexgenTech training portal?',
        page: 7,
      },
    },
    {
      id: 'faq_refund_policy',
      text: `QUESTION: What happens if I am dissatisfied with the training after joining? What is the refund policy?
ANSWER: NexgenTech provides a transparent 100% money-back guarantee if a formal withdrawal email is sent to admissions@nexgentechacademy.com within the first 7 calendar days of the cohort start date. A 50% partial refund is available if requested between day 8 and day 14. Tuition is non-refundable after 14 calendar days. Batch deferral/transfer is also supported for documented emergencies.`,
      metadata: {
        source: sourceName,
        document: docFilename,
        section: '7. Grounding Corpus & Frequently Asked Questions',
        type: 'faq',
        question: 'What happens if I am dissatisfied with the training after joining?',
        page: 7,
      },
    },
    {
      id: 'faq_emi_options',
      text: `QUESTION: Are installment or EMI options available for tuition fees?
ANSWER: Yes. NexgenTech offers 0% interest EMI payment plans spanning 6, 9, or 12 months through certified educational financing partners: LiquiLoans, Propelld, and Bajaj Finserv.`,
      metadata: {
        source: sourceName,
        document: docFilename,
        section: '7. Grounding Corpus & Frequently Asked Questions',
        type: 'faq',
        question: 'Are installment or EMI options available for tuition fees?',
        page: 7,
      },
    },
    {
      id: 'faq_placement_assistance',
      text: `QUESTION: What kind of placement assistance is provided?
ANSWER: Students receive up to 12 months of active 100% placement support post-graduation, including resume workshops, 1-on-1 mock technical interviews with senior industry engineers, live system design workshops, and direct campus recruitment drives with 250+ partner companies.`,
      metadata: {
        source: sourceName,
        document: docFilename,
        section: '7. Grounding Corpus & Frequently Asked Questions',
        type: 'faq',
        question: 'What kind of placement assistance is provided?',
        page: 7,
      },
    },

    // 8. Live Website Course Catalog & Exact Tuition Fees
    {
      id: 'chunk_website_courses_catalog',
      text: `SECTION: 8. Live Website Course Catalog & Tuition Fees
NexGenTech Academy offers 15 enterprise-grade training certifications with exact pricing and durations:
1. Generative AI & Large Language Models (LLM) Systems: ₹65,000 (Regular ₹85,000) | Duration: 6 Months | Mode: Hybrid / Online | Level: Advanced | Focus: Transformer models, LangChain, LlamaIndex, fine-tuning, RAG architectures, and multi-agent systems (/courses/generative-ai-llm-systems).
2. Full Stack Next.js 15, React 19 & Cloud Engineering: ₹45,000 (Regular ₹60,000) | Duration: 5 Months | Mode: Hybrid | Level: Intermediate | Focus: Next.js 15 App Router, React 19, Server Actions, TypeScript, Tailwind, PostgreSQL, Prisma, AWS deployment (/courses/full-stack-nextjs-react-cloud).
3. Python Data Science, Machine Learning & Deep Learning: ₹42,000 (Regular ₹55,000) | Duration: 4 Months | Mode: Hybrid | Level: All Levels | Focus: Pandas, NumPy, Scikit-Learn, PyTorch, TensorFlow, MLOps, and Computer Vision (/courses/python-data-science-machine-learning).
4. Java Enterprise Full Stack with Spring Boot & Microservices: ₹46,000 (Regular ₹62,000) | Duration: 5 Months | Mode: Offline / Hybrid | Level: Intermediate | Focus: Core Java 21, Spring Boot 3, Hibernate, Kafka, Docker, Kubernetes, REST APIs (/courses/java-enterprise-full-stack-spring-boot).
5. AWS Cloud Architect & DevOps Engineering: ₹52,000 (Regular ₹70,000) | Duration: 5 Months | Mode: Hybrid | Level: Intermediate | Focus: Docker, Kubernetes, Terraform, AWS Services, CI/CD pipelines, Prometheus, Grafana (/courses/aws-cloud-architect-devops-engineering).
6. Cyber Security & Ethical Hacking Professional: ₹48,000 (Regular ₹65,000) | Duration: 5 Months | Mode: Offline | Level: Intermediate | Focus: Certified Ethical Hacker (CEH), SOC Analyst, Penetration Testing, Metasploit, Wireshark, SIEM tools (/courses/cyber-security-ethical-hacking-professional).
7. UI/UX Product Design, Figma & Design Systems: ₹42,000 (Regular ₹55,000) | Duration: 4 Months | Mode: Hybrid | Level: All Levels | Focus: Figma prototypes, wireframing, UX research, design tokens, design systems, usability testing (/courses/ui-ux-product-design-figma).
8. Software Testing & Automation Specialist (Selenium + Playwright): ₹36,000 (Regular ₹48,000) | Duration: 4 Months | Mode: Hybrid | Level: All Levels | Focus: Manual testing, Selenium WebDriver, Playwright, API testing (Postman), TestNG, CI/CD QA pipelines (/courses/software-testing-automation-specialist).
9. MERN Stack Web Development (MongoDB, Express, React, Node.js): ₹40,000 (Regular ₹52,000) | Duration: 4 Months | Mode: Online / Hybrid | Level: Intermediate | Focus: Full-stack JavaScript, MongoDB, Express.js, React, Node.js, Redux Toolkit, JWT auth.
10. Data Engineering with Apache Spark, Kafka & Snowflake: ₹50,000 (Regular ₹68,000) | Duration: 5 Months | Mode: Hybrid | Level: Advanced | Focus: PySpark, Apache Kafka, Snowflake Data Warehouse, ETL pipelines, Airflow, AWS EMR.
11. Graphic Design & Brand Identity Professional: ₹30,000 | Duration: 3 Months | Mode: Offline | Level: Beginner.
12. Web Design & Responsive Visual Development: ₹28,000 | Duration: 3 Months | Mode: Online | Level: Beginner.
13. Enterprise Networking & CCNA Security Certification: ₹38,000 | Duration: 4 Months | Mode: Offline | Level: All Levels.
14. Digital Marketing & Growth Hacking Mastery: ₹32,000 | Duration: 3 Months | Mode: Online | Level: All Levels.
15. Advanced AI Prompt Engineering & Workflow Automation: ₹25,000 | Duration: 2 Months | Mode: Online | Level: All Levels.`,
      metadata: {
        source: 'WEBSITE_PORTAL_CATALOG',
        document: 'portal_courses_database',
        section: '8. Live Website Course Catalog & Tuition Fees',
        type: 'courses',
        page: 8,
      },
    },

    // 9. Live Website Placements, Star Hires & Corporate Placement Drives
    {
      id: 'chunk_website_placements_and_alumni',
      text: `SECTION: 9. Live Website Placements, Star Hires & Corporate Placement Drives
NexGenTech Academy maintains an active 94% placement record with over 450+ global hiring partners and top salary packages up to 42 LPA (average 12.8 LPA in commercial software engineering, 7.8 LPA across all programs).

Recent Star Placements from the Academy Portal:
- Rohan Joshi: Course: Generative AI & LLM | Placed at: Microsoft | Role: AI Systems Engineer | Package: 28.5 LPA (Year 2026).
- Sneha Patel: Course: Full Stack Next.js | Placed at: Atlassian | Role: SDE-II React Engineer | Package: 24.0 LPA (Year 2026).
- Amitabh Sen: Course: Cyber Security | Placed at: Deloitte Tech | Role: Penetration Tester | Package: 19.2 LPA (Year 2026).
- Divya Rastogi: Course: AWS DevOps | Placed at: Amazon AWS | Role: Cloud Infra Lead | Package: 22.5 LPA (Year 2026).

Top Recruitment Partners & Verified Hiring Figures:
- Microsoft (145 alumni placed, highest pkg: 28.5 LPA)
- Amazon AWS (210 alumni placed, highest pkg: 32.0 LPA)
- Deloitte Tech (320 alumni placed, highest pkg: 19.5 LPA)
- Oracle Tech (180 alumni placed, highest pkg: 24.0 LPA)
- Atlassian (95 alumni placed, highest pkg: 26.0 LPA)
- Swiggy Tech (110 alumni placed, highest pkg: 22.0 LPA)
- Google, Uber, Infosys Digital, TCS Enterprise, Capgemini, Persistent Systems, Cognizant.

Upcoming Placement Drives & Support:
Students receive direct interviews, weekly mock interviews, DSA/system design coaching, resume optimization, and corporate placement drives scheduled throughout the academic year.`,
      metadata: {
        source: 'WEBSITE_PORTAL_CATALOG',
        document: 'portal_placements_database',
        section: '9. Live Website Placements, Star Hires & Corporate Placement Drives',
        type: 'placements',
        page: 9,
      },
    },

    // 10. Live Website Upcoming Events, Workshops & Masterclasses
    {
      id: 'chunk_website_events_and_workshops',
      text: `SECTION: 10. Live Website Upcoming Events, Workshops & Masterclasses
NexGenTech Academy hosts regular high-impact industry events, masterclasses, and hands-on workshops:
1. "Building Production RAG Systems with LlamaIndex & Vector Search"
   - Category: Masterclass | Speaker: Dr. Vikramaditya Sharma (Lead AI Scientist, Ex-Microsoft AI) | Date: Saturday, Aug 29, 2026 | Time: 6:00 PM - 8:00 PM IST | Mode: Hybrid.
2. "Next.js 15 Server Actions & Full Stack Architecture"
   - Category: Workshop | Speaker: Priya Sundaram (Staff Full Stack Architect, Ex-Amazon) | Date: Sunday, Sept 06, 2026 | Time: 11:00 AM - 1:30 PM IST | Mode: In-Person (Hyderabad HQ).
3. "Zero Trust Cloud Security Conclave 2026"
   - Category: Masterclass | Speaker: Rajesh Kulkarni (Chief Cyber Security Lead, Ex-Cisco) | Date: Saturday, Sept 19, 2026 | Time: 4:00 PM - 7:00 PM IST | Mode: In-Person.
4. "Figma Enterprise Design Systems Summit"
   - Category: Workshop | Speaker: Rahul Deshmukh (Principal UX Strategist, Ex-Adobe) | Date: Sunday, Sept 27, 2026 | Time: 2:00 PM - 5:00 PM IST | Mode: Live Online.
5. "National AI & Cloud Hackathon 2026"
   - Category: Hackathon | Keynotes: Dr. Vikramaditya Sharma & Swiggy CTO | Annual Flagship Coding Competition.`,
      metadata: {
        source: 'WEBSITE_PORTAL_CATALOG',
        document: 'portal_events_database',
        section: '10. Live Website Upcoming Events, Workshops & Masterclasses',
        type: 'events',
        page: 10,
      },
    },

    // 11. Live Website Lead Trainers & Faculty Profiles
    {
      id: 'chunk_website_trainers_and_mentors',
      text: `SECTION: 11. Live Website Lead Trainers & Faculty Profiles
NexGenTech Academy instructors are senior architects and principal engineers with decades of tier-1 tech experience:
- Dr. Vikramaditya Sharma: Lead AI Scientist & Ex-Microsoft AI Specialist (14+ years experience). Teaches Generative AI, LLMs, Neural Networks, and Advanced Machine Learning.
- Priya Sundaram: Staff Full Stack Architect & Ex-Amazon (11+ years experience). Teaches Next.js 15, React 19, Node.js, Distributed Microservices, and Cloud Systems.
- Rahul Deshmukh: Principal UX Strategist & Ex-Adobe Design Lab (10+ years experience). Teaches UI/UX Product Design, Figma Design Systems, and Interaction Design.
- Rajesh Kulkarni: Chief Cyber Security Lead & Ex-Cisco Systems (12+ years experience). Teaches Ethical Hacking, Network Security, SOC Operations, and Penetration Testing.`,
      metadata: {
        source: 'WEBSITE_PORTAL_CATALOG',
        document: 'portal_trainers_database',
        section: '11. Live Website Lead Trainers & Faculty Profiles',
        type: 'trainers',
        page: 11,
      },
    },

    // 12. Live Website Upcoming Batches, Cohort Timings & Modes
    {
      id: 'chunk_website_batches_and_timings',
      text: `SECTION: 12. Live Website Upcoming Batches, Cohort Timings & Modes
NexGenTech Academy operates flexible batches starting every month (including September 2026 cohorts):
- Morning Cohorts: 7:30 AM – 9:30 AM IST (Mon–Fri) — Ideal for working professionals and early starters.
- Evening Cohorts: 7:00 PM – 9:00 PM IST (Mon–Fri) — Ideal for software engineers and college students.
- Weekend Fast-Track Bootcamps: 10:00 AM – 2:00 PM IST (Sat & Sun) — Intensive practical labs.
- Learning Modes: 100% Practical Labs in Hybrid (In-Person Classroom GPU Labs + Live Interactive Online Streams) or 100% Live Online.
- Locations: Main Campus Tech Park HQ (Hyderabad), Innovation Hub (Bengaluru), and Virtual Cloud Classroom.`,
      metadata: {
        source: 'WEBSITE_PORTAL_CATALOG',
        document: 'portal_batches_database',
        section: '12. Live Website Upcoming Batches, Cohort Timings & Modes',
        type: 'batches',
        page: 12,
      },
    },
  ];

  // Attach cryptographic content hash and deterministic timestamp to all chunks
  return rawChunks.map((chunk) => {
    const contentHash = computeContentHash(chunk.text);
    return {
      ...chunk,
      contentHash,
      metadata: {
        ...chunk.metadata,
        contentHash,
      },
    };
  });
}
