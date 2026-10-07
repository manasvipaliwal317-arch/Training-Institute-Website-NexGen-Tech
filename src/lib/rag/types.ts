export type RagSectionType =
  | 'institutional_knowledge'
  | 'faq'
  | 'leadership'
  | 'campus'
  | 'policy'
  | 'admissions'
  | 'placements';

export interface RagMetadata {
  source: string;
  document: string;
  section: string;
  type: RagSectionType | string;
  page?: number;
  question?: string;
  contentHash?: string;
  updatedAt?: string;
  [key: string]: unknown;
}

export interface RagDocumentChunk {
  id: string;
  text: string;
  metadata: RagMetadata;
  embedding?: number[];
  contentHash?: string;
}

export interface RagSearchResult {
  chunk: RagDocumentChunk;
  similarity: number;
  distance?: number;
}

export type QueryCategory =
  | 'INSTITUTE_KNOWLEDGE'
  | 'GENERAL_KNOWLEDGE'
  | 'MIXED'
  | 'UNSUPPORTED';

export type QueryIntent =
  | 'course_inquiry'
  | 'fees_and_scholarships'
  | 'batches_and_timings'
  | 'technical_explanation'
  | 'placements_and_careers'
  | 'admissions_and_refunds'
  | 'campus_and_facilities'
  | 'general_counseling';

export interface QueryAnalysis {
  intent: QueryIntent;
  targetCourseSlug?: string;
  targetCourseName?: string;
  ragExtractionFields: string[]; // e.g., ['tuition_fees', 'batch_schedules', 'tools', 'curriculum']
  llmGenerationGoals: string[]; // e.g., ['explain_concepts', 'mentor_career_path', 'code_solution']
  normalizedQuery: string;
}

export interface RagQueryClassification {
  category: QueryCategory;
  isInstituteQuery: boolean;
  isGeneralQuery: boolean;
  isMixed: boolean;
  confidence: number;
  reformulatedQuery: string;
  detectedEntities?: string[];
  analysis: QueryAnalysis;
}

export type ResponseSource = 'rag' | 'general' | 'rag_unavailable';

export interface RagDebugInfo {
  intent: QueryCategory;
  isInstitute: boolean;
  reformulatedQuery: string;
  topK: number;
  retrievedCount: number;
  topSimilarity: number;
  topChunkId?: string;
  topSection?: string;
  modelUsed: string;
}

export interface ChatResponsePayload {
  success: boolean;
  reply: string;
  model?: string;
  source?: ResponseSource;
  retrievedChunksCount?: number;
  topSimilarity?: number;
  debug?: RagDebugInfo;
  error?: string;
}
