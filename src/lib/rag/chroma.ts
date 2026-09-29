import fs from 'fs';
import path from 'path';
import { RagDocumentChunk, RagSearchResult } from './types';
import { extractSemanticChunks } from './parser';
import { generateEmbedding, batchGenerateEmbeddings, cosineSimilarity } from './embeddings';

const CHROMA_COLLECTION =
  process.env.CHROMA_COLLECTION ||
  process.env.RAG_COLLECTION_NAME ||
  'nexgentech_institute_knowledge';

const PERSISTENT_DATA_DIR = path.join(process.cwd(), 'data');
const PERSISTENT_STORE_FILE = path.join(
  PERSISTENT_DATA_DIR,
  `chroma_${CHROMA_COLLECTION}.json`
);

const DEFAULT_TOP_K = parseInt(process.env.RAG_TOP_K || '6', 10);
const DEFAULT_SIMILARITY_THRESHOLD = 0.35;

let memoryStore: RagDocumentChunk[] | null = null;
let initPromise: Promise<RagDocumentChunk[]> | null = null;

/**
 * Loads existing cached vectors from disk if available.
 */
export function readPersistentStore(): Map<string, RagDocumentChunk> {
  const storeMap = new Map<string, RagDocumentChunk>();
  if (fs.existsSync(PERSISTENT_STORE_FILE)) {
    try {
      const raw = fs.readFileSync(PERSISTENT_STORE_FILE, 'utf-8');
      const parsed = JSON.parse(raw) as RagDocumentChunk[];
      if (Array.isArray(parsed)) {
        for (const item of parsed) {
          if (item.id && item.embedding) {
            storeMap.set(item.id, item);
          }
        }
      }
    } catch (err) {
      console.warn('[RAG] Warning reading cached vector store:', err);
    }
  }
  return storeMap;
}

/**
 * Parses documents, computes diffs against cached content hashes,
 * embeds only new/modified chunks, and saves vectors.
 */
export async function ingestKnowledgeDocument(options?: {
  forceRebuild?: boolean;
}): Promise<{
  chunks: RagDocumentChunk[];
  reusedCount: number;
  newEmbeddedCount: number;
}> {
  const latestChunks = extractSemanticChunks();
  const existingMap = options?.forceRebuild ? new Map() : readPersistentStore();

  let reusedCount = 0;
  const chunksToEmbed: { chunk: RagDocumentChunk; index: number }[] = [];

  for (let i = 0; i < latestChunks.length; i++) {
    const chunk = latestChunks[i];
    const existing = existingMap.get(chunk.id);

    if (
      existing &&
      existing.contentHash === chunk.contentHash &&
      existing.embedding &&
      existing.embedding.length > 0
    ) {
      chunk.embedding = existing.embedding;
      chunk.metadata.updatedAt = existing.metadata.updatedAt || new Date().toISOString();
      reusedCount++;
    } else {
      chunk.metadata.updatedAt = new Date().toISOString();
      chunksToEmbed.push({ chunk, index: i });
    }
  }

  if (chunksToEmbed.length > 0) {
    try {
      const textsToEmbed = chunksToEmbed.map(
        (item) => `${item.chunk.metadata.section}\n${item.chunk.text}`
      );
      const newEmbeddings = await batchGenerateEmbeddings(textsToEmbed);

      for (let i = 0; i < chunksToEmbed.length; i++) {
        chunksToEmbed[i].chunk.embedding = newEmbeddings[i];
      }
    } catch (embedErr) {
      console.warn('[RAG] Batch embedding creation failed during ingest:', embedErr);
    }
  }

  memoryStore = latestChunks;

  try {
    if (!fs.existsSync(PERSISTENT_DATA_DIR)) {
      fs.mkdirSync(PERSISTENT_DATA_DIR, { recursive: true });
    }
    fs.writeFileSync(
      PERSISTENT_STORE_FILE,
      JSON.stringify(latestChunks, null, 2),
      'utf-8'
    );
  } catch (err) {
    console.warn('[RAG] Failed to write vector store to disk:', err);
  }

  return {
    chunks: latestChunks,
    reusedCount,
    newEmbeddedCount: chunksToEmbed.length,
  };
}

/**
 * Initializes or loads the persistent vector collection.
 */
export async function getVectorCollection(): Promise<RagDocumentChunk[]> {
  if (memoryStore && memoryStore.length > 0) {
    return memoryStore;
  }

  if (initPromise) {
    return initPromise;
  }

  initPromise = (async () => {
    // 1. Check if persistent JSON vector index exists on disk
    const existingMap = readPersistentStore();
    if (existingMap.size > 0) {
      memoryStore = Array.from(existingMap.values());
      return memoryStore;
    }

    // 2. Ingest document if cache is empty
    const result = await ingestKnowledgeDocument();
    return result.chunks;
  })();

  try {
    const result = await initPromise;
    return result;
  } finally {
    initPromise = null;
  }
}

/**
 * Calculates keyword relevance score between a query and chunk text.
 */
function computeKeywordScore(query: string, text: string): number {
  const stopWords = new Set([
    'what', 'when', 'where', 'which', 'who', 'whom', 'whose', 'why', 'how',
    'is', 'are', 'was', 'were', 'the', 'a', 'an', 'and', 'or', 'but', 'in',
    'on', 'at', 'to', 'for', 'of', 'with', 'about', 'can', 'you', 'tell',
    'me', 'i', 'my', 'please', 'give', 'details', 'know'
  ]);
  const tokens = query
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, ' ')
    .split(/\s+/)
    .filter((w) => w.length > 2 && !stopWords.has(w));

  if (tokens.length === 0) return 0;

  const textLower = text.toLowerCase();
  let matches = 0;
  for (const token of tokens) {
    if (textLower.includes(token)) {
      matches++;
    }
  }
  return matches / tokens.length;
}

/**
 * Performs semantic similarity vector search over the ChromaDB collection
 * with hybrid keyword boosting and resilient keyword fallback.
 */
export async function searchInstituteKnowledge(
  query: string,
  options?: {
    topK?: number;
    threshold?: number;
  }
): Promise<RagSearchResult[]> {
  const topK = options?.topK ?? DEFAULT_TOP_K;
  const threshold = options?.threshold ?? DEFAULT_SIMILARITY_THRESHOLD;

  if (!query || query.trim().length === 0) {
    return [];
  }

  let collection: RagDocumentChunk[] = [];
  try {
    collection = await getVectorCollection();
  } catch (colErr) {
    console.warn('[RAG] Error reading vector collection, falling back to parsed chunks:', colErr);
    collection = extractSemanticChunks();
  }

  if (!collection || collection.length === 0) {
    collection = extractSemanticChunks();
  }

  let queryEmbedding: number[] | null = null;
  try {
    queryEmbedding = await generateEmbedding(query);
  } catch (embedErr) {
    console.warn('[RAG] Vector embedding generation skipped/failed:', embedErr);
  }

  const scoredResults: RagSearchResult[] = collection.map((chunk) => {
    const fullChunkText = `${chunk.metadata.section} ${chunk.metadata.question || ''} ${chunk.text}`;
    const kwScore = computeKeywordScore(query, fullChunkText);

    let similarity = 0;
    if (queryEmbedding && chunk.embedding && chunk.embedding.length > 0) {
      const vecSim = cosineSimilarity(queryEmbedding, chunk.embedding);
      // Hybrid scoring: 65% semantic vector + 35% exact term matching
      similarity = vecSim * 0.65 + kwScore * 0.35;
    } else {
      // Fallback purely to keyword match
      similarity = kwScore;
    }

    return {
      chunk,
      similarity,
      distance: 1 - similarity,
    };
  });

  // Sort descending by similarity
  scoredResults.sort((a, b) => b.similarity - a.similarity);

  // Filter by threshold
  let filtered = scoredResults.filter((item) => item.similarity >= threshold);

  // Guarantee at least the top matching chunks
  if (filtered.length === 0 && scoredResults.length > 0) {
    filtered = scoredResults.slice(0, 3);
  }

  return (filtered.length > 0 ? filtered : scoredResults).slice(0, topK);
}
