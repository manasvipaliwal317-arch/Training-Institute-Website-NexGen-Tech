const EMBEDDING_MODEL = process.env.GEMINI_EMBEDDING_MODEL || 'models/gemini-embedding-001';

/**
 * Calculates cosine similarity between two numeric vectors.
 */
export function cosineSimilarity(vecA: number[], vecB: number[]): number {
  if (!vecA || !vecB || vecA.length !== vecB.length || vecA.length === 0) {
    return 0;
  }

  let dotProduct = 0;
  let normA = 0;
  let normB = 0;

  for (let i = 0; i < vecA.length; i++) {
    dotProduct += vecA[i] * vecB[i];
    normA += vecA[i] * vecA[i];
    normB += vecB[i] * vecB[i];
  }

  if (normA === 0 || normB === 0) return 0;
  return dotProduct / (Math.sqrt(normA) * Math.sqrt(normB));
}

/**
 * Generates an embedding vector for a single text using Gemini API.
 */
export async function generateEmbedding(
  text: string,
  apiKey?: string
): Promise<number[]> {
  const activeKey = apiKey || process.env.GEMINI_API_KEY || '';
  const rawModel = process.env.GEMINI_EMBEDDING_MODEL || EMBEDDING_MODEL || 'models/gemini-embedding-001';
  const modelName = rawModel.startsWith('models/') ? rawModel : `models/${rawModel}`;

  const res = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/${modelName}:embedContent?key=${activeKey}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        content: { parts: [{ text: text.trim() }] },
      }),
      signal: AbortSignal.timeout(10000),
    }
  );

  const json = await res.json();

  if (!res.ok) {
    throw new Error(
      json.error?.message || `Embedding API error: ${res.status} ${res.statusText}`
    );
  }

  if (json.embedding?.values && Array.isArray(json.embedding.values)) {
    return json.embedding.values;
  }

  throw new Error('Unexpected embedding response format from Gemini API');
}

/**
 * Generates embeddings for multiple texts in batch using Gemini API.
 */
export async function batchGenerateEmbeddings(
  texts: string[],
  apiKey?: string
): Promise<number[][]> {
  if (texts.length === 0) return [];

  const activeKey = apiKey || process.env.GEMINI_API_KEY || '';
  const rawModel = process.env.GEMINI_EMBEDDING_MODEL || EMBEDDING_MODEL || 'gemini-embedding-001';
  const modelName = rawModel.startsWith('models/') ? rawModel : `models/${rawModel}`;

  // Batch in chunks of 50 to respect API payload limits
  const BATCH_SIZE = 50;
  const allEmbeddings: number[][] = [];

  for (let i = 0; i < texts.length; i += BATCH_SIZE) {
    const chunk = texts.slice(i, i + BATCH_SIZE);
    const requests = chunk.map((t) => ({
      model: modelName,
      content: { parts: [{ text: t.trim() }] },
    }));

    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/${modelName}:batchEmbedContents?key=${activeKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ requests }),
        signal: AbortSignal.timeout(25000),
      }
    );

    const json = await res.json();

    if (!res.ok) {
      throw new Error(
        json.error?.message || `Batch embedding API error: ${res.status}`
      );
    }

    if (json.embeddings && Array.isArray(json.embeddings)) {
      for (const item of json.embeddings) {
        if (item.values && Array.isArray(item.values)) {
          allEmbeddings.push(item.values);
        } else {
          throw new Error('Missing embedding values in batch response');
        }
      }
    } else {
      throw new Error('Unexpected batch embedding response format');
    }
  }

  return allEmbeddings;
}
