import { ingestKnowledgeDocument } from '../src/lib/rag/chroma';
import { findKnowledgeDocuments } from '../src/lib/rag/parser';

async function main() {
  const isForce = process.argv.includes('--force') || process.argv.includes('-f');

  console.log('=====================================================');
  console.log('  NexGenTech Academy - RAG Ingestion & Indexing Pipeline');
  console.log('=====================================================');
  
  const documents = findKnowledgeDocuments();
  console.log(`\nDiscovered Knowledge Document Sources (${documents.length}):`);
  documents.forEach((doc, idx) => {
    console.log(`  [${idx + 1}] ${doc}`);
  });

  if (isForce) {
    console.log('\n[MODE] Force re-indexing enabled (re-embedding all chunks)...');
  } else {
    console.log('\n[MODE] Smart incremental indexing with duplicate prevention active...');
  }

  const startTime = Date.now();
  try {
    const result = await ingestKnowledgeDocument({ forceRebuild: isForce });
    const duration = ((Date.now() - startTime) / 1000).toFixed(2);

    console.log('\n-----------------------------------------------------');
    console.log(`[SUCCESS] Ingestion & vector indexing complete in ${duration}s!`);
    console.log(`  • Total Chunks:            ${result.chunks.length}`);
    console.log(`  • Reused Embeddings:       ${result.reusedCount} (Duplicate Prevention)`);
    console.log(`  • Newly Embedded Chunks:   ${result.newEmbeddedCount}`);
    console.log('-----------------------------------------------------\n');

    console.log('Indexed Sections & Semantic Vectors:');
    result.chunks.forEach((chunk, index) => {
      console.log(`  [${index + 1}] ID: ${chunk.id}`);
      console.log(`      Section:      ${chunk.metadata.section}`);
      console.log(`      Type:         ${chunk.metadata.type}`);
      console.log(`      Content Hash: ${chunk.contentHash?.slice(0, 16)}...`);
      console.log(`      Dimensions:   ${chunk.embedding?.length || 0}`);
      console.log(`      Preview:      ${chunk.text.slice(0, 95).replace(/\n/g, ' ')}...\n`);
    });

    console.log('=====================================================');
    console.log('RAG Knowledge Base is up to date and ready for queries.');
    console.log('=====================================================');
  } catch (error: any) {
    console.error('\n[ERROR] Ingestion failed:', error);
    process.exit(1);
  }
}

main();
