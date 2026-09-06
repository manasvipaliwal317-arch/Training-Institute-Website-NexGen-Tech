# 📚 NexGenTech Academy — RAG Knowledge System Documentation

This document describes the architecture, setup, configuration, ingestion, and maintenance of the **Retrieval-Augmented Generation (RAG)** knowledge system integrated into the **NexGenTech Academy AI Counselor Chatbot**.

---

## 🏛️ System Architecture

The RAG pipeline operates as a modular, non-destructive layer around the existing Gemini AI Counselor:

```text
User Question + History
          ↓
   /api/chat Route
          ↓
 Intent Classifier & Router
 ┌────────┴────────┐
 │                 │
General Tech   Institute Query / Mixed
 │                 │
 │          Generate Query Vector (gemini-embedding-001)
 │                 ↓
 │          ChromaDB Vector Retrieval (nexgentech_institute_knowledge)
 │                 ↓
 │          Similarity Filter (Cosine Sim >= RAG_SIMILARITY_THRESHOLD)
 │                 ├──────────────┐
 │                 │              │
 │          (Below Threshold)  (Above Threshold)
 │                 │              │
 │          "Not Available"    Strict Grounded Prompt
 │                 │              │
 └─────────────────┼──────────────┘
                   ↓
           Gemini Flash Inference
                   ↓
         Unified Chat Response (with Source Badge)
```

---

## 📦 Prerequisites & Installation

1. **Install Dependencies:**
   ```bash
   npm install
   ```

2. **Verify Environment Variables:**
   Copy `.env.example` to `.env` if not already present:
   ```bash
   cp .env.example .env
   ```

---

## ⚙️ Environment Variables Configuration

| Variable | Default Value | Description |
| :--- | :--- | :--- |
| `GEMINI_API_KEY` | *(Configured)* | Google Generative AI API key used for text generation and embeddings. |
| `GEMINI_MODEL` | `gemini-3.6-flash` | Primary Gemini model for counselor chat responses. |
| `GEMINI_EMBEDDING_MODEL` | `models/gemini-embedding-001` | High-dimensional (3072 dims) embedding model. |
| `CHROMA_COLLECTION` | `nexgentech_institute_knowledge` | ChromaDB vector collection name. |
| `CHROMA_HOST` | `localhost` | ChromaDB service hostname. |
| `CHROMA_PORT` | `8000` | ChromaDB service port. |
| `RAG_TOP_K` | `5` | Maximum number of relevant chunks retrieved per query. |
| `RAG_SIMILARITY_THRESHOLD` | `0.55` | Minimum cosine similarity threshold required for grounding. |
| `RAG_DEBUG` | `false` | Enable verbose server-side RAG intent and retrieval logging. |

---

## 📑 Knowledge Document Structure & Ingestion

### Knowledge Directory
Place institutional Word documents (`.docx`) in:
- `knowledge/institute/` (e.g. `knowledge/institute/NEXGENTECH_ACADEMY_RAG_DOCUMENT.docx`)
- Or the workspace root directory.

### Running the Ingestion Pipeline
To parse documents, compute cryptographic content hashes, and generate/update vector embeddings:
```bash
npm run rag:ingest
```

### Smart Duplicate Prevention & Incremental Indexing
- Every chunk's text is hashed using **SHA-256**.
- When re-running `npm run rag:ingest`, unchanged chunks reuse existing embeddings instantly ($0.01\text{s}$ execution time).
- Only modified or new sections trigger new embedding API calls.

### Force Re-indexing
To invalidate the cache and force fresh embeddings for all chunks:
```bash
npx tsx scripts/ingest-rag.ts --force
```

---

## 🔍 How Retrieval & Grounding Works

1. **Multi-Turn Intent Classification (`src/lib/rag/router.ts`):**
   - Detects whether the query asks about the institute (campuses, fees, leadership, refunds, scholarships, EMI, placements, policies).
   - Automatically expands follow-up references using chat history (e.g. *"What is the refund policy?"* followed by *"What happens after that?"*).

2. **Similarity Search (`src/lib/rag/chroma.ts`):**
   - Computes cosine similarity between the query embedding and all indexed chunks in `nexgentech_institute_knowledge`.
   - Ranks chunks and filters out those below `RAG_SIMILARITY_THRESHOLD` ($0.55$).

3. **Strict Zero-Hallucination Grounding (`src/app/api/chat/route.ts`):**
   - Context is injected into Gemini with strict rules prohibiting fabrication of unlisted fees, fake campuses (e.g. Mumbai), or unverified details.
   - If missing from the knowledge base, the system responds:
     > *"The information for this query is not available in my institute knowledge base."*

4. **Source Badges in Chatbot UI (`src/components/AIChatbot.tsx`):**
   - 📚 **Answered from Institute Knowledge** (for grounded RAG answers)
   - 🔒 **Institute Knowledge Base** (for verified absence of information)
   - 🤖 **AI Counselor Answer** (for general programming/technical topics)

---

## 🧪 Running the Test Suite

Run the comprehensive automated test suite (positive RAG retrieval, negative hallucination checks, multi-turn follow-ups, and general tech questions):
```bash
npx tsx scripts/test-rag.ts
```

---

## 🛠️ Troubleshooting & Maintenance

### 1. What if ChromaDB / Vector Store is offline?
The system includes an automatic file-backed vector cache at `data/chroma_nexgentech_institute_knowledge.json`. Even if a separate ChromaDB daemon is not running, vector similarity search operates with zero latency. If the knowledge store is inaccessible during an institute query, the chatbot responds:
> *"I'm currently unable to access the institute knowledge base. Please try again shortly."*

### 2. Updating Knowledge Documents
When institute policies, fees, or leadership change:
1. Update or replace the `.docx` document in `knowledge/institute/`.
2. Run `npm run rag:ingest`.
3. The chatbot will immediately start serving the updated facts.

### 3. Adjusting Retrieval Sensitivity
- To retrieve more context chunks, increase `RAG_TOP_K` in `.env` (e.g. `RAG_TOP_K="6"`).
- To make matching stricter or more lenient, adjust `RAG_SIMILARITY_THRESHOLD` (e.g. `0.60` for stricter matching).
