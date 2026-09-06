import fs from 'fs';
import path from 'path';
import { RagDocumentChunk, RagSearchResult } from './types';
import { extractSemanticChunks } from './parser';
import { generateEmbedding, batchGenerateEmbeddings, cosineSimilarity } from './embeddings';

const CHROMA_COLLECTION =
  process.env.CHROMA_COLLECTION ||
  process.env.RAG_COLLECTION_NAME ||
  'nexgentech_institute_knowledge';

const CHROMA_HOST = process.env.CHROMA_HOST || 'localhost';
const CHROMA_PORT = process.env.CHROMA_PORT || '8000';
const CHROMA_URL =
  process.env.CHROMA_URL || `http://${CHROMA_HOST}:${CHROMA_PORT}`;

const DEFAULT_TOP_K = parseInt(process.env.RAG_TOP_K || '5', 10);
const DEFAULT_SIMILARITY_THRESHOLD = parseFloat(
  process.env.RAG_SIMILARITY_THRESHOLD || '0.55'
);

// File-backed persistent storage path for offline and edge deployment
const PERSISTENT_DATA_DIR = path.join(process.cwd(), 'data');
const PERSISTENT_STORE_FILE = path.join(
  PERSISTENT_DATA_DIR,
  `chroma_${CHROMA_COLLECTION}.json`
);

let memoryStore: RagDocumentChunk[] | null = null;
let initPromise: Promise<RagDocumentChunk[]> | null = null;

/**
 * Loads existing cached vectors from disk if available.
 */
function readPersistentStore(): Map<string, RagDocumentChunk> {
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
 * embeds only new/modified chunks (duplicate prevention), and saves vectors.
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

    // Duplicate prevention: If chunk text hash is identical to cached embedding, reuse it
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

  // Generate embeddings only for new or modified chunks
  if (chunksToEmbed.length > 0) {
    const textsToEmbed = chunksToEmbed.map(
      (item) => `${item.chunk.metadata.section}\n${item.chunk.text}`
    );
    const newEmbeddings = await batchGenerateEmbeddings(textsToEmbed);

    for (let i = 0; i < chunksToEmbed.length; i++) {
      chunksToEmbed[i].chunk.embedding = newEmbeddings[i];
    }
  }

  memoryStore = latestChunks;

  // Persist updated collection to disk
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
 * Performs semantic similarity vector search over the ChromaDB collection.
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

  const collection = await getVectorCollection();
  if (!collection || collection.length === 0) {
    return [];
  }

  // Generate embedding for incoming user question
  const queryEmbedding = await generateEmbedding(query);

  // Compute cosine similarity against all chunks
  const scoredResults: RagSearchResult[] = collection.map((chunk) => {
    const similarity = chunk.embedding
      ? cosineSimilarity(queryEmbedding, chunk.embedding)
      : 0;
    return {
      chunk,
      similarity,
      distance: 1 - similarity,
    };
  });

  // Sort descending by similarity
  scoredResults.sort((a, b) => b.similarity - a.similarity);

  // Filter by threshold
  const filtered = scoredResults.filter((item) => item.similarity >= threshold);

  return filtered.slice(0, topK);
}
