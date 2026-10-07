import {
  QueryCategory,
  QueryIntent,
  QueryAnalysis,
  RagQueryClassification,
} from './types';

interface HistoryItem {
  role: 'user' | 'model';
  text: string;
}

// Regex and keyword patterns for institute intent detection
const INSTITUTE_TERMS = [
  'nexgentech',
  'nexgen',
  'academy',
  'institute',
  'campus',
  'campuses',
  'hyderabad',
  'bengaluru',
  'bangalore',
  'pune',
  'mumbai',
  'delhi',
  'hitec',
  'mindspace',
  'marathahalli',
  'rajeshwar',
  'sharma',
  'ananya',
  'mukherjee',
  'vikramaditya',
  'kavita nair',
  'rohan deshmukh',
  'siddharth menon',
  'pooja kulkarni',
  'ceo',
  'cto',
  'leadership',
  'founder',
  'faculty',
  'trainer',
  'trainers',
  'teacher',
  'teachers',
  'instructor',
  'instructors',
  'mentor',
  'mentors',
  'professor',
  'admissions',
  'admission',
  'enroll',
  'enrolment',
  'enrollment',
  'aptitude test',
  'refund',
  'money back',
  'cancellation',
  'withdraw',
  'scholarship',
  'women in tech',
  'merit scholarship',
  'emi',
  'installment',
  'liquiloans',
  'propelld',
  'bajaj finserv',
  'placement',
  'placements',
  'package',
  'ctc',
  'lpa',
  'salary',
  'hiring partner',
  'partners',
  'recruiter',
  'accreditation',
  'iso 9001',
  'cin',
  'gstin',
  'gst',
  'demo class',
  'free demo',
  'helpline',
  'phone number',
  'contact number',
  'whatsapp',
  'email',
  'batch timings',
  'batches',
  'tuition',
  'fees',
  'fee',
  'cost of course',
  'fee structure',
  'address',
  'landmark',
  'location',
  'facilities',
  'auditorium',
  'gpu',
  'digital marketing',
  'marketing',
  'growth hacking',
  'seo',
  'google ads',
  'meta ads',
  'full stack',
  'mern',
  'generative ai',
  'gen ai',
  'prompt engineering',
  'devops',
  'aws',
  'cloud computing',
  'cyber security',
  'data science',
  'data engineering',
  'software testing',
  'ui/ux',
  'course',
  'courses',
  'program',
  'programs',
  'syllabus',
  'curriculum',
  'module',
  'modules',
  'subjects',
  'duration',
  'certification',
  'certifications',
  'certificate',
  'training',
  'classes',
  'class',
  'learning mode',
  'offline',
  'online',
  'hybrid',
  'projects',
  'project',
  'tools',
  'tech stack',
  'technologies',
  'beginner',
  'beginners',
  'job',
  'jobs',
  'career',
  'careers',
  'internship',
  'hostel',
  'accommodation',
  'motto',
  'tagline',
  'vision',
  'mission',
  'pg',
  'pgs',
];

// General tech patterns that don't indicate institute intent unless coupled with institute keywords
const GENERAL_TECH_TERMS = [
  'what is react',
  'what is python',
  'what is javascript',
  'what is typescript',
  'explain machine learning',
  'explain rag',
  'what is an api',
  'how does docker work',
  'what is cloud computing',
  'what is nodejs',
  'explain neural network',
  'write code for',
  'how to learn coding',
  'what is polymorphism',
  'explain oop',
];

/**
 * Resolves context references from multi-turn history into a unified query.
 * For example:
 * - "What is the refund policy?" -> "What happens after that?"
 *   => "What happens after that in the refund policy? (50% refund day 8-14, zero refund after 14 days)"
 * - "Where is Hyderabad campus?" -> "What facilities are available there?"
 *   => "What facilities are available at Hyderabad campus?"
 */
export function reformulateQueryWithHistory(
  currentQuery: string,
  history: HistoryItem[] = []
): string {
  const queryLower = currentQuery.toLowerCase().trim();

  // Referential pronouns / contextual follow-up indicators
  const followUpIndicators = [
    'there',
    'after that',
    'after 7 days',
    'after this',
    'that campus',
    'this campus',
    'their',
    'that course',
    'they',
    'the same',
    'how much',
    'what about',
    'and then',
    'what else',
    'tell me more',
  ];

  const hasFollowUp = followUpIndicators.some((ind) =>
    queryLower.includes(ind)
  );

  if (!hasFollowUp || history.length === 0) {
    return currentQuery;
  }

  // Inspect recent turns (last 4 turns) to identify the anchor topic
  const recentTurns = history.slice(-4);
  let contextSubject = '';

  for (let i = recentTurns.length - 1; i >= 0; i--) {
    const text = recentTurns[i].text.toLowerCase();

    if (text.includes('refund') || text.includes('money-back') || text.includes('withdrawal')) {
      contextSubject = 'refund policy terms (100% in 7 days, 50% between 8 and 14 days, zero refund after 14 days)';
      break;
    } else if (text.includes('hyderabad')) {
      contextSubject = 'Hyderabad campus location and facilities';
      break;
    } else if (text.includes('bengaluru') || text.includes('bangalore')) {
      contextSubject = 'Bengaluru campus location and facilities';
      break;
    } else if (text.includes('emi') || text.includes('installment') || text.includes('financing')) {
      contextSubject = '0% EMI payment options (6, 9, 12 months with LiquiLoans, Propelld, Bajaj Finserv)';
      break;
    } else if (text.includes('placement') || text.includes('salary') || text.includes('package') || text.includes('ctc')) {
      contextSubject = 'placement support, salary benchmarks, and hiring partners';
      break;
    } else if (text.includes('ceo') || text.includes('rajeshwar')) {
      contextSubject = 'CEO Dr. Rajeshwar V. Sharma and executive leadership';
      break;
    } else if (text.includes('cto') || text.includes('ananya')) {
      contextSubject = 'CTO Dr. Ananya Mukherjee and AI research labs';
      break;
    } else if (text.includes('admission') || text.includes('apply')) {
      contextSubject = 'admissions process and application steps';
      break;
    } else if (text.includes('digital marketing') || text.includes('marketing')) {
      contextSubject = 'Digital Marketing & Growth Hacking Mastery course, fees (₹32,000), batches, tools, and placement';
      break;
    } else if (text.includes('scholarship') || text.includes('women in tech')) {
      contextSubject = 'scholarships and fee waivers';
      break;
    }
  }

  if (contextSubject) {
    return `${currentQuery} (Context from conversation: ${contextSubject})`;
  }

  return currentQuery;
}

/**
 * Automatically corrects common spelling typos in user queries before vector and keyword processing.
 */
export function normalizeQueryTypos(text: string): string {
  let s = text.toLowerCase();
  const replacements: [RegExp, string][] = [
    [/\bupcominh\b/g, 'upcoming'],
    [/\bupcomin\b/g, 'upcoming'],
    [/\bcoures\b/g, 'course'],
    [/\bcourses\b/g, 'courses'],
    [/\bdigtal\b/g, 'digital'],
    [/\bmaketing\b/g, 'marketing'],
    [/\bmarketting\b/g, 'marketing'],
    [/\bpythn\b/g, 'python'],
    [/\bfeee\b/g, 'fees'],
    [/\bfeees\b/g, 'fees'],
    [/\bsyllbus\b/g, 'syllabus'],
    [/\bbatches\b/g, 'batches'],
    [/\bbathc\b/g, 'batch'],
    [/\btimng\b/g, 'timing'],
    [/\btimings\b/g, 'timings'],
    [/\bplcmnt\b/g, 'placement'],
    [/\brefnd\b/g, 'refund'],
  ];
  for (const [pattern, repl] of replacements) {
    s = s.replace(pattern, repl);
  }
  return s;
}

/**
 * Performs semantic decomposition of the user query into:
 * 1. Target Course & Domain (if applicable)
 * 2. Intent category
 * 3. What exact facts must be extracted from RAG/Database (Factual Grounding)
 * 4. What conceptual, educational, or mentoring elements must be generated by LLM reasoning
 */
export function analyzeQuery(
  rawQuery: string,
  reformulatedQuery: string
): QueryAnalysis {
  const normalized = normalizeQueryTypos(reformulatedQuery);
  const qLower = normalized.toLowerCase();

  // 1. Detect target course
  let targetCourseSlug: string | undefined;
  let targetCourseName: string | undefined;

  if (
    qLower.includes('digital marketing') ||
    qLower.includes('growth hacking') ||
    qLower.includes('seo') ||
    qLower.includes('google ads') ||
    qLower.includes('meta ads') ||
    qLower.includes('semrush')
  ) {
    targetCourseSlug = 'digital-marketing-growth-mastery';
    targetCourseName = 'Digital Marketing & Growth Hacking Mastery';
  } else if (
    qLower.includes('generative ai') ||
    qLower.includes('gen ai') ||
    qLower.includes('llm') ||
    qLower.includes('rag pipeline')
  ) {
    targetCourseSlug = 'generative-ai-llm-engineering';
    targetCourseName = 'Generative AI & LLM Systems';
  } else if (
    qLower.includes('prompt engineering') ||
    qLower.includes('prompt')
  ) {
    targetCourseSlug = 'prompt-engineering-automation';
    targetCourseName = 'Advanced AI Prompt Engineering & Workflow Automation';
  } else if (
    qLower.includes('full stack') ||
    qLower.includes('next.js') ||
    qLower.includes('react 19') ||
    qLower.includes('app router')
  ) {
    targetCourseSlug = 'full-stack-nextjs-react-cloud';
    targetCourseName = 'Full Stack Next.js 15, React 19 & Cloud Engineering';
  } else if (qLower.includes('mern') || qLower.includes('mongodb')) {
    targetCourseSlug = 'mern-stack-development';
    targetCourseName = 'MERN Stack Web Development';
  } else if (
    qLower.includes('data science') ||
    qLower.includes('machine learning') ||
    qLower.includes('pytorch') ||
    qLower.includes('scikit')
  ) {
    targetCourseSlug = 'python-data-science-machine-learning';
    targetCourseName = 'Python Data Science, Machine Learning & Deep Learning';
  } else if (
    qLower.includes('data engineering') ||
    qLower.includes('spark') ||
    qLower.includes('snowflake') ||
    qLower.includes('kafka')
  ) {
    targetCourseSlug = 'data-engineering-spark-snowflake';
    targetCourseName = 'Data Engineering with Apache Spark, Kafka & Snowflake';
  } else if (
    qLower.includes('cloud') ||
    qLower.includes('devops') ||
    qLower.includes('aws') ||
    qLower.includes('kubernetes') ||
    qLower.includes('docker') ||
    qLower.includes('terraform')
  ) {
    targetCourseSlug = 'aws-cloud-architect-devops-engineering';
    targetCourseName = 'AWS Cloud Architect & DevOps Engineering';
  } else if (
    qLower.includes('cyber') ||
    qLower.includes('security') ||
    qLower.includes('ethical hacking') ||
    qLower.includes('penetration testing') ||
    qLower.includes('ceh')
  ) {
    targetCourseSlug = 'cyber-security-ethical-hacking-professional';
    targetCourseName = 'Cyber Security & Ethical Hacking Professional';
  } else if (
    qLower.includes('ui/ux') ||
    qLower.includes('ui ux') ||
    qLower.includes('figma') ||
    qLower.includes('design systems')
  ) {
    targetCourseSlug = 'ui-ux-product-design-figma';
    targetCourseName = 'UI/UX Product Design, Figma & Design Systems';
  } else if (
    qLower.includes('testing') ||
    qLower.includes('selenium') ||
    qLower.includes('playwright') ||
    qLower.includes('qa')
  ) {
    targetCourseSlug = 'software-testing-automation-specialist';
    targetCourseName = 'Software Testing & Automation Specialist';
  } else if (
    qLower.includes('java') ||
    qLower.includes('spring boot') ||
    qLower.includes('microservices')
  ) {
    targetCourseSlug = 'java-enterprise-full-stack-spring-boot';
    targetCourseName = 'Java Enterprise Full Stack with Spring Boot & Microservices';
  } else if (
    qLower.includes('graphic design') ||
    qLower.includes('photoshop') ||
    qLower.includes('brand identity')
  ) {
    targetCourseSlug = 'graphic-design-brand-identity';
    targetCourseName = 'Graphic Design & Brand Identity Professional';
  } else if (
    qLower.includes('web design') ||
    qLower.includes('responsive design')
  ) {
    targetCourseSlug = 'web-design-responsive-visual';
    targetCourseName = 'Web Design & Responsive Visual Development';
  } else if (
    qLower.includes('networking') ||
    qLower.includes('ccna') ||
    qLower.includes('cisco')
  ) {
    targetCourseSlug = 'enterprise-networking-ccna-security';
    targetCourseName = 'Enterprise Networking & CCNA Security Certification';
  }

  // 2. Detect Intent & Decompose Requirements
  let intent: QueryIntent = 'general_counseling';
  const ragExtractionFields: string[] = [];
  const llmGenerationGoals: string[] = [];

  const isAskingBatches =
    qLower.includes('batch') ||
    qLower.includes('timing') ||
    qLower.includes('upcoming') ||
    qLower.includes('start date') ||
    qLower.includes('when');
  const isAskingFees =
    qLower.includes('fee') ||
    qLower.includes('cost') ||
    qLower.includes('price') ||
    qLower.includes('tuition') ||
    qLower.includes('emi') ||
    qLower.includes('scholarship');
  const isAskingRefund =
    qLower.includes('refund') ||
    qLower.includes('money back') ||
    qLower.includes('cancellation') ||
    qLower.includes('withdraw');
  const isAskingPlacement =
    qLower.includes('placement') ||
    qLower.includes('salary') ||
    qLower.includes('package') ||
    qLower.includes('ctc') ||
    qLower.includes('hire') ||
    qLower.includes('company');
  const isAskingCampus =
    qLower.includes('campus') ||
    qLower.includes('location') ||
    qLower.includes('address') ||
    qLower.includes('hyderabad') ||
    qLower.includes('bengaluru') ||
    qLower.includes('pune');
  const isAskingTechnical =
    qLower.includes('how does') ||
    qLower.includes('what is') ||
    qLower.includes('explain') ||
    qLower.includes('difference between') ||
    qLower.includes('write code') ||
    qLower.includes('tutorial');

  if (targetCourseName) {
    if (isAskingBatches && isAskingFees) {
      intent = 'batches_and_timings';
      ragExtractionFields.push(
        'Exact tuition fee and regular price',
        'Upcoming batch start dates and timings',
        'Available seats and mode (Hybrid/Online)',
        'Campus location or virtual stream access'
      );
      llmGenerationGoals.push(
        'Brief overview of what makes this cohort valuable',
        'Encouraging guidance on scheduling a free demo session'
      );
    } else if (isAskingBatches) {
      intent = 'batches_and_timings';
      ragExtractionFields.push(
        'Upcoming batch start dates (morning and evening)',
        'Timing and duration of sessions',
        'Available mode (In-person HQ / Online Live)',
        'Seats remaining'
      );
      llmGenerationGoals.push(
        'Counseling encouragement on batch selection based on student schedule',
        'Clear next step to book free demo or reserve seat'
      );
    } else if (isAskingFees) {
      intent = 'fees_and_scholarships';
      ragExtractionFields.push(
        'Exact current tuition fee in INR',
        'Regular fee and current discount/waiver',
        '0% Interest EMI options (6, 9, 12 months)',
        'Merit scholarship (up to 25%) and Women in Tech grant (15%)'
      );
      llmGenerationGoals.push(
        'Career ROI perspective for this skill set in the job market',
        'Counseling guidance on financial aid and installment options'
      );
    } else {
      intent = 'course_inquiry';
      ragExtractionFields.push(
        'Official program title and certification',
        'Exact tuition fees and duration',
        'Core curriculum tools and software taught',
        'Hands-on capstone projects',
        'Upcoming cohort schedule',
        'Target career roles and benchmark salary packages'
      );
      llmGenerationGoals.push(
        'Clear technical explanation of what this field covers and why it is vital today',
        'Career transformation advice and learning roadmap',
        'Actionable next steps to book a free demo class'
      );
    }
  } else if (isAskingRefund) {
    intent = 'admissions_and_refunds';
    ragExtractionFields.push(
      '100% full money-back guarantee within 7 calendar days',
      '50% partial refund between day 8 and day 14',
      'Zero refund after 14 calendar days',
      'Batch deferral transfer credit for emergencies',
      'Admissions email desk (admissions@nexgentechacademy.com)'
    );
    llmGenerationGoals.push(
      'Transparent, reassuring, and professional explanation of institutional policy',
      'Clear steps on how a student initiates a withdrawal or deferral'
    );
  } else if (isAskingCampus) {
    intent = 'campus_and_facilities';
    ragExtractionFields.push(
      'Main Campus - Tech Park (HQ) address in Hyderabad Hitec Phase 2',
      'Branch Campus - Innovation Hub address along Outer Ring Road Bengaluru',
      'Lab facilities (GPU AI clusters, cloud devops studio, auditorium)',
      'Admissions phone and visiting hours'
    );
    llmGenerationGoals.push(
      'Warm invitation to visit campus or attend an in-person demo session'
    );
  } else if (isAskingPlacement) {
    intent = 'placements_and_careers';
    ragExtractionFields.push(
      'Average CTC (₹7.8 LPA overall, ₹12.8 LPA in software engineering)',
      'Highest CTC (₹24.5 LPA up to ₹42.0 LPA)',
      'Top hiring partners (Microsoft, Amazon AWS, Deloitte, Oracle, Atlassian, Swiggy)',
      '12-month dedicated career support and mock technical interviews'
    );
    llmGenerationGoals.push(
      'Inspirational perspective on career transition readiness and alumni outcomes'
    );
  } else if (isAskingFees) {
    intent = 'fees_and_scholarships';
    ragExtractionFields.push(
      'Tuition fee benchmarks across core tracks',
      '0% Interest EMI financing (LiquiLoans, Propelld, Bajaj Finserv)',
      'Merit scholarship and entrance assessment'
    );
    llmGenerationGoals.push(
      'Value analysis of enterprise skilling and return on investment'
    );
  } else if (isAskingBatches) {
    intent = 'batches_and_timings';
    ragExtractionFields.push(
      'Standard cohort timing slots (Morning, Evening, Weekend)',
      'Cohort frequency (starts 1st and 15th of every month)',
      'Hybrid vs 100% Live Online options'
    );
    llmGenerationGoals.push(
      'Practical advice for working professionals vs students'
    );
  } else if (isAskingTechnical) {
    intent = 'technical_explanation';
    ragExtractionFields.push(
      'Relevant tools and frameworks included in the institute curriculum'
    );
    llmGenerationGoals.push(
      'Authoritative technical explanation with architectural clarity',
      'Clean code snippet or conceptual breakdown',
      'Connection to corresponding practical industry projects'
    );
  } else {
    intent = 'general_counseling';
    ragExtractionFields.push(
      'Core training programs offered',
      'Accreditations (ISO 9001:2015, AWS, Microsoft, NASSCOM)',
      'Admissions helpline (+91 800-999-8800)'
    );
    llmGenerationGoals.push(
      'Warm greeting and holistic academic counseling to discover student goals'
    );
  }

  return {
    intent,
    targetCourseSlug,
    targetCourseName,
    ragExtractionFields,
    llmGenerationGoals,
    normalizedQuery: normalized,
  };
}

/**
 * Classifies the incoming query into:
 * - INSTITUTE_KNOWLEDGE: specifically about NexgenTech Academy
 * - GENERAL_KNOWLEDGE: generic technical / conversational question
 * - MIXED: questions involving both institute offerings and broad technical concepts
 * and attaches detailed query decomposition analysis.
 */
export function classifyQuery(
  query: string,
  history: HistoryItem[] = []
): RagQueryClassification {
  const reformulated = reformulateQueryWithHistory(query, history);
  const analysis = analyzeQuery(query, reformulated);
  const qLower = analysis.normalizedQuery;

  const matchedInstituteTerms = INSTITUTE_TERMS.filter((term) =>
    qLower.includes(term)
  );

  const matchedGeneralTerms = GENERAL_TECH_TERMS.filter((term) =>
    qLower.includes(term)
  );

  const isInstituteRelated =
    matchedInstituteTerms.length > 0 || Boolean(analysis.targetCourseName);
  const isGeneralTech = matchedGeneralTerms.length > 0;

  let category: QueryCategory = 'GENERAL_KNOWLEDGE';
  let confidence = 0.5;

  if (isInstituteRelated && isGeneralTech) {
    category = 'MIXED';
    confidence = 0.88;
  } else if (isInstituteRelated) {
    category = 'INSTITUTE_KNOWLEDGE';
    confidence = Math.min(0.98, 0.65 + matchedInstituteTerms.length * 0.1);
  } else {
    category = 'GENERAL_KNOWLEDGE';
    confidence = 0.85;
  }

  return {
    category,
    isInstituteQuery: category === 'INSTITUTE_KNOWLEDGE' || category === 'MIXED',
    isGeneralQuery: category === 'GENERAL_KNOWLEDGE',
    isMixed: category === 'MIXED',
    confidence,
    reformulatedQuery: analysis.normalizedQuery,
    detectedEntities: matchedInstituteTerms,
    analysis,
  };
}
