import { QueryCategory, RagQueryClassification } from './types';

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
  'hostel',
  'accommodation',
  'motto',
  'tagline',
  'vision',
  'mission',
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
 * Classifies the incoming query into:
 * - INSTITUTE_KNOWLEDGE: specifically about NexgenTech Academy
 * - GENERAL_KNOWLEDGE: generic technical / conversational question
 * - MIXED: questions involving both institute offerings and broad technical concepts
 */
export function classifyQuery(
  query: string,
  history: HistoryItem[] = []
): RagQueryClassification {
  const reformulated = reformulateQueryWithHistory(query, history);
  const qLower = reformulated.toLowerCase();

  const matchedInstituteTerms = INSTITUTE_TERMS.filter((term) =>
    qLower.includes(term)
  );

  const matchedGeneralTerms = GENERAL_TECH_TERMS.filter((term) =>
    qLower.includes(term)
  );

  const isInstituteRelated = matchedInstituteTerms.length > 0;
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
    reformulatedQuery: reformulated,
    detectedEntities: matchedInstituteTerms,
  };
}
