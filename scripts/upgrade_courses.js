const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const detailedCourseUpdates = {
  'generative-ai-llm-engineering': {
    description: `An industry-leading executive specialization designed for software engineers, data scientists, and technical leads looking to build, fine-tune, and deploy enterprise-grade Generative AI systems. 

Throughout this intensive curriculum, you master Transformer architectures, tokenization mechanics, modern OpenAI/Anthropic/Gemini APIs, advanced prompt engineering paradigms, production RAG pipelines with hybrid vector search, and Parameter-Efficient Fine-Tuning (PEFT/LoRA). 

Students gain hands-on mastery building autonomous multi-agent workflows using LangGraph and CrewAI, deploying quantized models via Ollama and vLLM, and securing LLM workloads against prompt injection and data exfiltration. Every cohort is paired 1-on-1 with Staff AI Architects from Microsoft, AWS, and Google.`,
    syllabusJson: JSON.stringify([
      {
        module: 'Section 1',
        title: 'Getting Started with LLMs',
        details: [
          'Open source vs closed source LLMs (Llama 3, Mistral, GPT-4o, Gemini)',
          'Tools to get started with LLMs & environment configuration',
          'Introduction to Hugging Face Hub, model cards & Google Colab',
          'Introduction to LangChain framework & memory constructs',
          'Running your first local LLM with Ollama & token streaming'
        ]
      },
      {
        module: 'Section 2',
        title: 'Prompt Engineering for LLMs',
        details: [
          'Principles of effective prompt design & system instruction architecture',
          'Zero-shot, Few-shot & Chain-of-Thought (CoT) prompting techniques',
          'Directional stimulus prompting & ReAct reasoning patterns',
          'Structured JSON outputs, Pydantic schema validation & tool calling',
          'Mitigating hallucinations, jailbreaks & prompt injection defense'
        ]
      },
      {
        module: 'Section 3',
        title: 'Retrieval Augmented Generation (RAG) - Part 1',
        details: [
          'Semantic search mechanics, dense vector embeddings & distance metrics',
          'Document ingestion pipelines (PDFs, Markdown, Web crawlers)',
          'Chunking strategies (Fixed, Recursive, Semantic & Agentic splitters)',
          'Vector database architecture (ChromaDB, Pinecone, Qdrant, Milvus)',
          'Cosine similarity, dot product & approximate nearest neighbor (HNSW)'
        ]
      },
      {
        module: 'Section 4',
        title: 'Retrieval Augmented Generation (RAG) - Part 2',
        details: [
          'Hybrid search combining BM25 keyword matching with dense vectors',
          'Cross-encoder reranking algorithms (Cohere Rerank, BGE-Reranker)',
          'Multi-query generation, sub-question query engine & context compression',
          'Production RAG evaluation with RAGAS metrics & ground-truth validation'
        ]
      },
      {
        module: 'Section 5',
        title: 'Fine-tuning in Generative AI - Part 1',
        details: [
          'Strategic decision matrix: Prompting vs RAG vs Model Fine-Tuning',
          'Dataset preparation, instruction formatting & deduplication pipelines',
          'Parameter-Efficient Fine-Tuning (PEFT) & Low-Rank Adaptation (LoRA)',
          'QLoRA 4-bit quantization on consumer GPUs with bitsandbytes',
          'Supervised Fine-Tuning (SFT) workflows using Hugging Face TRL & SFTTrainer'
        ]
      },
      {
        module: 'Section 6',
        title: 'Fine-tuning in Generative AI - Part 2',
        details: [
          'Alignment techniques: Direct Preference Optimization (DPO) & ORPO',
          'Model evaluation benchmarks (MMLU, HumanEval, GSM8K benchmarks)',
          'Merging LoRA adapters with base model & GGUF format quantization',
          'High-throughput deployment with vLLM, TensorRT-LLM & Triton Server',
          'Continuous monitoring for model drift and toxicity degradation'
        ]
      },
      {
        module: 'Section 7',
        title: 'Generative AI for Business Applications',
        details: [
          'Autonomous multi-agent workflows with LangGraph & CrewAI hierarchies',
          'Enterprise LLM security standards (OWASP Top 10 for LLM Applications)',
          'Cost optimization, token caching & batch inference architecture',
          'Deploying scalable production endpoints on AWS ECS, SageMaker & GCP'
        ]
      }
    ]),
    toolsJson: JSON.stringify(['Python', 'PyTorch', 'LangChain', 'LlamaIndex', 'LangGraph', 'Pinecone', 'ChromaDB', 'Ollama', 'vLLM', 'Hugging Face', 'Docker', 'AWS Bedrock'])
  },

  'full-stack-web-development-nextjs': {
    description: `A comprehensive, production-grade Full Stack Software Engineering program designed to take you from core programming concepts to architecting enterprise web applications with Next.js 15, React 19, TypeScript, Node.js, and PostgreSQL.

You will master modern client and server paradigms including React Server Components (RSC), Server Actions, streaming server-side rendering, Prisma ORM, distributed database design, JWT/OAuth authentication, and microservices. 

Every student builds 4 production web applications with live payment gateways (Razorpay/Stripe), automated CI/CD pipelines, Docker containerization, and AWS deployment. The course features intensive mock interview drills and direct referral placement drives with 450+ partner tech companies.`,
    syllabusJson: JSON.stringify([
      {
        module: 'Section 1',
        title: 'Modern Web Foundations & TypeScript',
        details: [
          'Semantic HTML5 markup, WCAG AA accessibility & SEO architecture',
          'Tailwind CSS design systems, responsive utilities & dark mode setup',
          'Advanced TypeScript: Generics, utility types, unions & strict type safety',
          'Modern JavaScript ES2024 (Async/Await, Closures, Event Loop & Promises)',
          'Git workflows, GitHub branch protections & clean commit conventions'
        ]
      },
      {
        module: 'Section 2',
        title: 'React 19 Architecture & Server Components',
        details: [
          'React 19 fundamentals: Hooks (useActionState, useOptimistic, use)',
          'Component lifecycle, state management & performance memoization',
          'Server Components (RSC) vs Client Components boundaries',
          'Building reusable accessible UI component libraries',
          'Forms handling, client-side validation with Zod & custom inputs'
        ]
      },
      {
        module: 'Section 3',
        title: 'Next.js 15 App Router & Streaming SSR',
        details: [
          'Next.js 15 App Router architecture, nested layouts & route groups',
          'Static Site Generation (SSG), Incremental Static Regeneration (ISR)',
          'Streaming SSR with React Suspense & instant loading skeletons',
          'Dynamic routing, parallel routes, intercepting routes & route handlers',
          'SEO optimization, OpenGraph metadata generation & dynamic sitemaps'
        ]
      },
      {
        module: 'Section 4',
        title: 'Server Actions & Full Stack Architecture',
        details: [
          'Next.js Server Actions: Mutations, revalidation & error handling',
          'Optimistic UI updates with instant user feedback transitions',
          'Secure cookie management, session handling & CSRF mitigation',
          'File uploads to cloud buckets (AWS S3 & Cloudinary) with signed URLs',
          'API rate limiting, middleware request filtering & security headers'
        ]
      },
      {
        module: 'Section 5',
        title: 'Database Engineering with Prisma & PostgreSQL',
        details: [
          'Relational database schema modeling with PostgreSQL & SQLite',
          'Prisma ORM schema definitions, relations, indices & migrations',
          'Complex SQL queries, database indexing & transaction isolation',
          'Database connection pooling with PgBouncer & Prisma Accelerate',
          'Database seeding, synthetic test datasets & backup automation'
        ]
      },
      {
        module: 'Section 6',
        title: 'Authentication, Payments & Microservices',
        details: [
          'Full-featured authentication: JWT tokens, HTTP-only cookies & NextAuth',
          'Role-Based Access Control (RBAC) across protected portals',
          'Integrating Payment Gateways (Stripe & Razorpay) with webhook verification',
          'RESTful API architecture & GraphQL endpoint design',
          'WebSockets for real-time bidirectional messaging & notifications'
        ]
      },
      {
        module: 'Section 7',
        title: 'Cloud Deployment, Docker & CI/CD on AWS',
        details: [
          'Containerizing Next.js and Node.js applications with multi-stage Dockerfiles',
          'Automated CI/CD pipelines with GitHub Actions (Lint, Test, Build)',
          'Deploying full-stack stacks on AWS (EC2, ECS, Amplify & S3/CloudFront)',
          'Application performance monitoring with Sentry & OpenTelemetry',
          'System architecture interview preparation & live coding walkthroughs'
        ]
      }
    ]),
    toolsJson: JSON.stringify(['TypeScript', 'React 19', 'Next.js 15', 'Node.js', 'Tailwind CSS', 'Prisma', 'PostgreSQL', 'Docker', 'AWS', 'Stripe', 'Zod', 'Git'])
  },

  'cyber-security-ethical-hacking': {
    description: `A rigorous, hands-on Cyber Security & Ethical Hacking certification built for students and IT professionals aspiring to become Certified Ethical Hackers (CEH) and SOC Cyber Defense Analysts.

The program immerses students into real cyber attack and defense simulations in isolated sandbox environments. You master network traffic analysis with Wireshark, penetration testing with Kali Linux and Metasploit, web application vulnerabilities (OWASP Top 10, SQLi, XSS, CSRF), defensive SOC monitoring using Splunk and SIEM, and cloud security architecture.

Guided by veteran security consultants with 12+ years of defense and banking auditing experience, students complete live vulnerability assessments and write professional red-team audit reports.`,
    syllabusJson: JSON.stringify([
      {
        module: 'Section 1',
        title: 'Cyber Security Fundamentals & Linux Administration',
        details: [
          'Cyber security threat landscapes, CIA triad & defense-in-depth principles',
          'Linux CLI mastery, file system permissions & Kali Linux environment setup',
          'Networking protocols deep-dive: TCP/IP, OSI model, DNS, DHCP & ARP',
          'Building isolated virtual labs with VirtualBox, VMware & Docker',
          'Cyber ethics, legal frameworks & scope of authorized security testing'
        ]
      },
      {
        module: 'Section 2',
        title: 'Reconnaissance & Network Footprinting',
        details: [
          'Passive information gathering using OSINT tools (Shodan, Maltego, WHOIS)',
          'Active reconnaissance, port scanning & service detection with Nmap',
          'Vulnerability scanning with Nessus, OpenVAS & Nikto',
          'Analyzing packet captures & inspecting encrypted traffic with Wireshark',
          'Identifying firewall defenses, IDS/IPS evasion & honeypot detection'
        ]
      },
      {
        module: 'Section 3',
        title: 'System & Network Penetration Testing',
        details: [
          'Exploitation methodologies using Metasploit Framework & custom payloads',
          'Password cracking techniques with Hashcat & John the Ripper',
          'Privilege escalation on Linux (SUID, sudo rights) and Windows systems',
          'Wireless network auditing: WPA2/WPA3 handshake capture & cracking',
          'Social engineering attack vectors & credential harvesting simulation'
        ]
      },
      {
        module: 'Section 4',
        title: 'Web Application Security (OWASP Top 10)',
        details: [
          'Web architecture reconnaissance & proxy interception using Burp Suite',
          'SQL Injection (SQLi): Union-based, Error-based & Blind exploitation',
          'Cross-Site Scripting (XSS): Stored, Reflected & DOM-based attacks',
          'Broken Access Control, IDOR & Server-Side Request Forgery (SSRF)',
          'Automated security audits with OWASP ZAP & remediation coding'
        ]
      },
      {
        module: 'Section 5',
        title: 'SOC Analytics, SIEM & Threat Hunting',
        details: [
          'Security Operations Center (SOC) workflows, triage & alert handling',
          'SIEM log aggregation, correlation rules & dashboards in Splunk & ELK',
          'Endpoint Detection & Response (EDR) analysis with Sysmon & Wazuh',
          'Malware analysis basics: Static vs dynamic sandboxing techniques',
          'MITRE ATT&CK framework mapping & threat hunting playbooks'
        ]
      },
      {
        module: 'Section 6',
        title: 'Cloud Security & Zero-Trust Architecture',
        details: [
          'AWS & Azure security configurations: IAM policies, VPCs & Security Groups',
          'Securing Kubernetes clusters & container image vulnerability scanning',
          'Zero-Trust network architecture, micro-segmentation & mTLS authentication',
          'Secrets management using HashiCorp Vault & AWS Secrets Manager',
          'Compliance frameworks: ISO 27001, SOC 2 Type II & GDPR essentials'
        ]
      },
      {
        module: 'Section 7',
        title: 'Incident Response & Capstone Red Team Audit',
        details: [
          'Incident Response Lifecycle (NIST SP 800-61): Containment & eradication',
          'Forensic artifact acquisition (RAM dumps, disk imaging & event logs)',
          'Conducting full-scale red team vs blue team enterprise cyber simulation',
          'Authoring professional executive vulnerability assessment reports'
        ]
      }
    ]),
    toolsJson: JSON.stringify(['Kali Linux', 'Wireshark', 'Burp Suite', 'Nmap', 'Metasploit', 'Splunk', 'Nessus', 'Hashcat', 'Wazuh', 'Snort', 'Docker', 'AWS GuardDuty'])
  },

  'ui-ux-design-masterclass': {
    description: `A master-level UI/UX Design and Product Strategy program engineered for creative problem solvers, visual designers, and aspiring product designers aiming to build enterprise digital products in Figma.

You will master user research methodologies, empathy mapping, interactive wireframing, high-fidelity UI design, atomic design systems, interactive micro-animations, usability testing, and developer handoff. 

Students create 3 complete design portfolio case studies from scratch—including mobile apps and complex SaaS web applications—ready for presentation to design recruiters and product managers.`,
    syllabusJson: JSON.stringify([
      {
        module: 'Section 1',
        title: 'UX Research & Design Thinking Foundations',
        details: [
          'Design thinking methodology: Empathize, Define, Ideate, Prototype, Test',
          'User research techniques: Qualitative interviews, surveys & competitor auditing',
          'Crafting data-driven user personas, journey maps & empathy diagrams',
          'Information architecture (IA): Card sorting, sitemaps & user navigation flows',
          'Defining problem statements & feature prioritization matrices'
        ]
      },
      {
        module: 'Section 2',
        title: 'Wireframing & Low-Fidelity Prototyping',
        details: [
          'Paper sketching techniques for rapid visual brainstorming',
          'Low-fidelity digital wireframing in Figma with layout grids',
          'UX copywriting principles, microcopy & visual hierarchy rules',
          'Mapping user decision trees and error state fallback scenarios',
          'Validating structural layout usability prior to visual styling'
        ]
      },
      {
        module: 'Section 3',
        title: 'Visual Design Fundamentals & Color Theory',
        details: [
          'Visual hierarchy, the 8pt spatial grid system & whitespace balance',
          'Color psychology, 60-30-10 palette rules & contrast accessibility (WCAG AA/AAA)',
          'Typography hierarchy, pairing display fonts with readable body text',
          'Iconography design, elevation shadows & modern glassmorphic aesthetics',
          'Designing for both Light and Dark themes with semantic tokens'
        ]
      },
      {
        module: 'Section 4',
        title: 'Figma Mastery: Auto Layout & Design Systems',
        details: [
          'Mastering Figma Auto Layout 5.0 (Resizing, padding, wrap & alignment)',
          'Component variants, properties (Boolean, text, instance swap) & slots',
          'Building scalable atomic design systems (Atoms, Molecules, Organisms)',
          'Figma Variables: Color modes, typography scales & spatial spacing tokens',
          'Organizing team libraries and component documentation standards'
        ]
      },
      {
        module: 'Section 5',
        title: 'Advanced Interactive Prototyping & Micro-interactions',
        details: [
          'Smart Animate transitions, state changes & fluid easing curves',
          'Interactive component prototypes (Toggles, dropdowns, modal sheets)',
          'Prototyping dynamic mobile gestures (Swipe, drag, scroll parallax)',
          'Using variables and conditional logic for realistic prototype flows',
          'Designing delightful micro-interactions with feedback indicators'
        ]
      },
      {
        module: 'Section 6',
        title: 'Usability Testing & Product Analytics',
        details: [
          'Planning and executing moderated & unmoderated usability tests',
          'Analyzing usability metrics: Task completion rate, time-on-task, SUS score',
          'Heatmap analysis (Hotjar, Maze) & A/B testing design alternatives',
          'Synthesizing usability feedback into actionable iterative improvements',
          'Accessibility auditing with Stark & screen reader testing'
        ]
      },
      {
        module: 'Section 7',
        title: 'Developer Handoff & Portfolio Presentation',
        details: [
          'Figma Dev Mode mastery, CSS token inspection & asset export rules',
          'Creating pixel-perfect redline specs and design documentation',
          'Communicating design rationale to product managers and engineers',
          'Publishing case studies on Behance, Dribbble & personal portfolio',
          'Design portfolio critique sessions & design challenge interview prep'
        ]
      }
    ]),
    toolsJson: JSON.stringify(['Figma', 'FigJam', 'Auto Layout', 'Design Systems', 'Maze', 'Miro', 'Hotjar', 'Stark', 'Notion', 'Adobe Illustrator'])
  },

  'aws-devops-cloud-architect': {
    description: `An enterprise-grade Cloud Architecture & DevOps Engineering program designed to transform developers and systems engineers into certified AWS Solutions Architects and DevOps Leads.

You will master AWS cloud infrastructure (VPC, EC2, ECS, S3, RDS, Lambda), Infrastructure as Code with Terraform, Docker containerization, Kubernetes cluster orchestration, and automated CI/CD pipelines with GitHub Actions and GitLab CI. 

Students deploy resilient, self-healing, multi-region architectures with auto-scaling, cloud monitoring via Prometheus and Grafana, and GitOps workflows using ArgoCD.`,
    syllabusJson: JSON.stringify([
      {
        module: 'Section 1',
        title: 'Linux Fundamentals & GitOps Workflows',
        details: [
          'Enterprise Linux system administration, bash scripting & cron jobs',
          'Networking in Linux: IP routing, firewall iptables & DNS troubleshooting',
          'Advanced Git branching strategies (GitFlow, Trunk-based development)',
          'SSH key configuration, bastion hosts & secure remote administration',
          'Version controlling infrastructure configurations and environments'
        ]
      },
      {
        module: 'Section 2',
        title: 'AWS Core Infrastructure & Cloud Architecture',
        details: [
          'Designing custom Virtual Private Clouds (VPC) with public/private subnets',
          'Compute architecture: EC2 instance families, AMIs & Auto Scaling Groups',
          'Storage services: S3 bucket policies, EBS block storage & EFS shared volumes',
          'Database management: Amazon RDS Multi-AZ failover & Aurora Serverless',
          'Serverless computing with AWS Lambda, API Gateway & EventBridge'
        ]
      },
      {
        module: 'Section 3',
        title: 'Infrastructure as Code (IaC) with Terraform',
        details: [
          'Declarative Infrastructure as Code principles vs manual provisioning',
          'Terraform syntax, providers, resources & state file management',
          'Remote state locking with S3 and DynamoDB for team collaboration',
          'Building reusable Terraform modules for VPC, compute & databases',
          'Automated terraform plan checks in CI/CD pull requests'
        ]
      },
      {
        module: 'Section 4',
        title: 'Docker Containerization & Multi-Stage Builds',
        details: [
          'Containerization fundamentals: Namespaces, cgroups & image layers',
          'Authoring optimized multi-stage Dockerfiles for Node, Python & Go',
          'Docker Compose for multi-container development environments',
          'Container networking, volume mounts & persistent data storage',
          'Scanning container images for vulnerabilities with Trivy'
        ]
      },
      {
        module: 'Section 5',
        title: 'Kubernetes (K8s) Cluster Orchestration',
        details: [
          'Kubernetes architecture: Control plane, worker nodes, kubelet & etcd',
          'Deploying Pods, Deployments, ReplicaSets & DaemonSets',
          'Cluster networking: Services (ClusterIP, NodePort, LoadBalancer) & Ingress',
          'ConfigMaps, Secrets management & persistent volumes (PV/PVC)',
          'Managed Kubernetes on AWS using Amazon EKS and eksctl'
        ]
      },
      {
        module: 'Section 6',
        title: 'Automated CI/CD Pipelines & GitOps',
        details: [
          'Designing enterprise CI/CD pipelines with GitHub Actions & GitLab CI',
          'Automated unit testing, static code analysis (SonarQube) & security gates',
          'Blue/Green and Canary deployment strategies for zero-downtime releases',
          'Helm chart packaging for standardized Kubernetes application releases',
          'GitOps continuous delivery implementation with ArgoCD'
        ]
      },
      {
        module: 'Section 7',
        title: 'Cloud Monitoring, Observability & Site Reliability',
        details: [
          'Metrics collection and alerting with Prometheus and Grafana dashboards',
          'Distributed log aggregation using AWS CloudWatch and the ELK stack',
          'Tracing application latency and bottlenecks using AWS X-Ray',
          'Chaos engineering principles & disaster recovery multi-region failover',
          'AWS Certified Solutions Architect & CKA exam preparation guide'
        ]
      }
    ]),
    toolsJson: JSON.stringify(['AWS', 'Docker', 'Kubernetes', 'Terraform', 'GitHub Actions', 'ArgoCD', 'Prometheus', 'Grafana', 'Helm', 'Linux', 'Ansible', 'SonarQube'])
  }
};

async function run() {
  console.log('Upgrading detailed descriptions and comprehensive syllabi in database...');

  for (const [slug, data] of Object.entries(detailedCourseUpdates)) {
    try {
      const updated = await prisma.course.update({
        where: { slug },
        data: {
          description: data.description,
          syllabusJson: data.syllabusJson,
          toolsJson: data.toolsJson
        }
      });
      console.log('✓ Successfully upgraded course:', updated.title);
    } catch (err) {
      console.error('Error updating course slug ' + slug + ':', err.message);
    }
  }

  console.log('All course detail descriptions and 7-section curriculum modules upgraded successfully!');
  await prisma.$disconnect();
}

run();
