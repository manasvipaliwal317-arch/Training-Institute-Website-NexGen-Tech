import { searchInstituteKnowledge } from '../src/lib/rag/chroma';

async function main() {
  const queries = [
    'Where is your Hyderabad campus located?',
    'Do you offer 0% EMI payment plans?',
    'What is your refund policy if I leave the course?',
    'Where is your Mumbai campus located?',
    'Who is the CEO of NexgenTech?',
    'What are the placement statistics?',
  ];

  for (const q of queries) {
    console.log(`\nQuery: "${q}"`);
    const results = await searchInstituteKnowledge(q, { topK: 3, threshold: 0 });
    for (const r of results) {
      console.log(`  - [${r.chunk.id}] Similarity: ${(r.similarity * 100).toFixed(2)}% | Section: ${r.chunk.metadata.section}`);
    }
  }
}

main();
