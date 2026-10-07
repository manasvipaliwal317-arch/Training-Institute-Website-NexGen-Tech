const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const coursesSyllabus = {
  'generative-ai-llm-engineering': [
    {
      module: 'Section 1',
      title: 'Getting Started with LLMs & Generative Models',
      details: [
        'Open source vs closed source LLMs (OpenAI, Anthropic, LLaMA 3, Mistral)',
        'Tools and hardware setup to get started with LLMs',
        'Introduction to Hugging Face Hub, spaces, and model inference',
        'Introduction to LangChain & LlamaIndex core architecture',
        'Running your first local LLM with Ollama and vLLM',
      ],
    },
    {
      module: 'Section 2',
      title: 'Prompt Engineering & Structured Outputs for LLMs',
      details: [
        'Zero-shot, Few-shot, Chain-of-Thought (CoT), and ReAct prompting patterns',
        'Enforcing structured JSON outputs with Pydantic and Instructor',
        'System prompt steering and preventing jailbreak attacks',
        'Dynamic few-shot prompt template generation with vector retrieval',
        'Benchmarking prompt performance and latency trade-offs',
      ],
    },
    {
      module: 'Section 3',
      title: 'Retrieval Augmented Generation (RAG) - Foundations',
      details: [
        'Document parsing: PDFs, Markdown, HTML, and unstructured data',
        'Chunking strategies: recursive character, semantic, and token splitting',
        'Vector embeddings: OpenAI, Cohere, and Hugging Face sentence-transformers',
        'Vector Databases: Pinecone, Qdrant, ChromaDB, and pgvector setups',
        'Building your first end-to-end question answering pipeline over company data',
      ],
    },
    {
      module: 'Section 4',
      title: 'Advanced RAG, Hybrid Search & Re-Ranking',
      details: [
        'Hybrid search: Combining BM25 keyword search with dense vector embeddings',
        'Re-ranking with Cross-Encoders (Cohere Rerank, BGE Reranker)',
        'Self-querying retrievers, metadata filtering, and multi-query expansion',
        'RAG Evaluation metrics using Ragas (Faithfulness, Answer Relevance, Context Recall)',
      ],
    },
    {
      module: 'Section 5',
      title: 'Autonomous AI Agents & Function Calling',
      details: [
        'Tool use and OpenAI Function Calling architecture',
        'Building multi-step reasoning agents with LangGraph and AutoGen',
        'Stateful agents with conversational memory and session checkpoints',
        'Human-in-the-loop workflows for sensitive operational actions',
        'Deploying background agentic workers with asynchronous message queues',
      ],
    },
    {
      module: 'Section 6',
      title: 'Fine-Tuning Open Source LLMs (PEFT & LoRA)',
      details: [
        'When to fine-tune vs when to use RAG: architectural decision matrix',
        'Dataset curation, cleaning, and tokenization for instruction tuning',
        'Parameter Efficient Fine-Tuning (PEFT) and LoRA / QLoRA mathematical intuition',
        'Fine-tuning LLaMA 3 on Google Colab / GPU clusters using Unsloth & SFTTrainer',
        'Model evaluation, perplexity scoring, and GGUF quantization for CPU/edge deployment',
      ],
    },
    {
      module: 'Section 7',
      title: 'Production LLMOps, Guardrails & Business Applications',
      details: [
        'Guardrails AI, NeMo Guardrails: Content filtering and PII masking',
        'Observability & Tracing with Langfuse, Arize Phoenix, and Helicone',
        'LLM caching with Redis to reduce API costs by up to 70%',
        'Deploying LLM microservices with FastAPI, Docker, and streaming SSE responses',
      ],
    },
  ],

  'mobile-app-development-react-native': [
    {
      module: 'Section 1',
      title: 'Getting Started with React Native & Expo Router',
      details: [
        'React Native modern architecture (Fabric, TurboModules & Hermes Engine)',
        'Setting up development environment with Expo SDK 52',
        'File-based routing and deep-linking with Expo Router v4',
        'Core components: View, Text, Image, ScrollView, FlatList',
        'Responsive mobile styling with NativeWind / Tailwind CSS',
      ],
    },
    {
      module: 'Section 2',
      title: 'Interactive UI, Forms & Client State Management',
      details: [
        'Controlled forms with React Hook Form and Zod validation',
        'Global state management with Zustand and TanStack React Query',
        'Handling gestures with React Native Gesture Handler',
        'Building 60 FPS animations with React Native Reanimated 3',
        'Adaptive dark mode and dynamic system theme switching',
      ],
    },
    {
      module: 'Section 3',
      title: 'Native Device APIs & Hardware Integration',
      details: [
        'Camera, ImagePicker, and photo gallery permissions',
        'Location services, GPS coordinates, and interactive MapViews',
        'Biometric authentication with FaceID and Fingerprint (LocalAuthentication)',
        'Device haptics, battery sensors, and accelerometer inputs',
        'Network state monitoring and offline banner indicators',
      ],
    },
    {
      module: 'Section 4',
      title: 'Local Storage, SQLite & Offline-First Architecture',
      details: [
        'SecureStore for encrypted access tokens and user credentials',
        'MMKV for blazing-fast persistent key-value data caching',
        'Embedded SQLite with Drizzle ORM for local database queries',
        'Offline synchronization queues and conflict resolution strategies',
      ],
    },
    {
      module: 'Section 5',
      title: 'Push Notifications, Audio & Realtime WebSockets',
      details: [
        'Expo Push Notifications and FCM / APNs background delivery',
        'Scheduled local notifications and background triggers',
        'Real-time peer-to-peer messaging with WebSockets & Supabase',
        'Audio recording and playback with Expo AV / expo-audio',
        'In-app notification badge counts and deep-link routing',
      ],
    },
    {
      module: 'Section 6',
      title: 'Performance Profiling, Security & Testing',
      details: [
        'Profiling frame drops and memory leaks with Flipper and React DevTools',
        'Optimizing high-density virtualized lists with FlashList',
        'Code obfuscation, SSL pinning, and API key protection',
        'Unit and component testing with Jest and React Native Testing Library',
        'Automated end-to-end integration flows with Maestro / Detox',
      ],
    },
    {
      module: 'Section 7',
      title: 'App Store & Google Play Store Production Deployment',
      details: [
        'Configuring app.json, adaptive launcher icons, and splash screens',
        'EAS (Expo Application Services) cloud build pipelines for iOS IPA & Android AAB',
        'Managing Apple Certificates, Provisioning Profiles, and Google Keystores',
        'Submitting apps to Apple App Store Connect and Google Play Console',
      ],
    },
  ],

  'full-stack-web-development-nextjs': [
    {
      module: 'Section 1',
      title: 'Modern Web Foundations & TypeScript Mastery',
      details: [
        'Semantic HTML5, CSS Grid, Flexbox, and Modern Responsive Layouts',
        'TypeScript Fundamentals: Types, Interfaces, Generics, and Type Narrowing',
        'Modern JavaScript ESNext: Promises, Async/Await, and Array Metaprogramming',
        'Git & GitHub Team Workflows, Branching Strategies & Code Reviews',
        'Setting up modern build environments with Vite & Next.js 15',
      ],
    },
    {
      module: 'Section 2',
      title: 'React 19 Core & Component Architecture',
      details: [
        'Component composition, props, and conditional rendering',
        'React Hooks in-depth: useState, useEffect, useMemo, useCallback, useRef',
        'React 19 Actions, useActionState, useOptimistic, and useFormStatus',
        'State management at scale: Context API, Zustand, and TanStack Query',
        'Accessible UI development with Tailwind CSS & Radix UI primitives',
      ],
    },
    {
      module: 'Section 3',
      title: 'Next.js 15 App Router & Server Components',
      details: [
        'React Server Components (RSC) vs Client Components architecture',
        'File-system based routing: layouts, templates, error boundaries & loading UI',
        'Server Actions for type-safe form submissions and data mutations',
        'Streaming UI and Suspense boundaries for zero Cumulative Layout Shift',
        'Route Handlers and custom RESTful API endpoints in Next.js',
      ],
    },
    {
      module: 'Section 4',
      title: 'Database Architecture with PostgreSQL & Prisma ORM',
      details: [
        'Relational database design: Primary keys, Foreign keys, and Indexes',
        'Prisma schema modeling, relations (1-1, 1-N, N-M), and migrations',
        'Writing optimized queries, joins, transactions, and pagination',
        'Setting up cloud PostgreSQL on Supabase / Neon Serverless',
        'Database seeding and automated test fixtures',
      ],
    },
    {
      module: 'Section 5',
      title: 'Authentication, Authorization & Role-Based Access Control',
      details: [
        'NextAuth.js v5 / Auth.js with OAuth (Google, GitHub) & Credentials',
        'Password hashing with Argon2 / bcrypt and JWT session tokens',
        'Protecting routes with Next.js Middleware and server-side session guards',
        'Role-Based Access Control (Admin, Faculty, Student roles)',
        'CSRF protection, security headers, and input sanitization with Zod',
      ],
    },
    {
      module: 'Section 6',
      title: 'Payments, File Storage & Third-Party Integrations',
      details: [
        'Stripe & Razorpay payment gateway integration with webhooks',
        'Secure file uploads to AWS S3 / Cloudinary with pre-signed URLs',
        'Transactional email delivery with Resend & React Email',
        'Real-time updates with Server-Sent Events (SSE) and WebSockets',
        'Background job processing and task queues',
      ],
    },
    {
      module: 'Section 7',
      title: 'DevOps, CI/CD, Performance Optimization & Vercel Deployment',
      details: [
        'Web Vitals optimization: LCP, FID/INP, and CLS tuning',
        'Image, font, and script optimization with next/image and next/font',
        'Containerization with Docker and multi-stage production builds',
        'Automated CI/CD pipelines with GitHub Actions and automated tests',
      ],
    },
  ],

  'machine-learning-deep-learning-mastery': [
    {
      module: 'Section 1',
      title: 'Python for Data Science, NumPy & Data Wrangling',
      details: [
        'Python scientific ecosystem: NumPy arrays and vector arithmetic',
        'Pandas DataFrames: filtering, grouping, aggregation, and time-series',
        'Exploratory Data Analysis (EDA) and data distribution visualization',
        'Handling missing values, outlier detection, and data cleansing',
        'Matplotlib and Seaborn for publication-grade data visualizations',
      ],
    },
    {
      module: 'Section 2',
      title: 'Supervised Learning & Statistical Modeling',
      details: [
        'Linear Regression, Cost functions, and Gradient Descent optimization',
        'Logistic Regression for binary and multi-class classification',
        'Regularization techniques: Ridge (L2), Lasso (L1), and Elastic Net',
        'Decision Trees, Random Forests, and Bagging ensembles',
        'Cross-validation, bias-variance tradeoff, and ROC-AUC curve analysis',
      ],
    },
    {
      module: 'Section 3',
      title: 'Advanced Ensembles & Hyperparameter Tuning',
      details: [
        'Gradient Boosting Machines: XGBoost, LightGBM, and CatBoost',
        'Feature engineering, one-hot encoding, target encoding, and PCA',
        'Hyperparameter search: Grid Search, Random Search, and Optuna',
        'Imbalanced data handling: SMOTE, class weighting, and focal loss',
        'End-to-end Scikit-Learn Pipelines and custom transformers',
      ],
    },
    {
      module: 'Section 4',
      title: 'Deep Learning Foundations with PyTorch',
      details: [
        'Biological vs artificial neurons: Perceptrons and Multi-Layer Perceptrons',
        'Activation functions: ReLU, Leaky ReLU, GeLU, Sigmoid, Softmax',
        'Backpropagation algorithm and computational graphs in PyTorch',
        'Loss functions and optimizers: AdamW, RMSProp, and Learning Rate schedulers',
        'Overfitting prevention: Dropout, Batch Normalization, and Weight Decay',
      ],
    },
    {
      module: 'Section 5',
      title: 'Computer Vision & Convolutional Neural Networks (CNNs)',
      details: [
        'Convolution layers, pooling operations, and receptive fields',
        'Classic architectures: ResNet, EfficientNet, and ConvNeXt',
        'Transfer learning and fine-tuning pre-trained Torchvision models',
        'Data augmentation techniques with Albumentations',
        'Object detection foundations with YOLO v8 and bounding box regression',
      ],
    },
    {
      module: 'Section 6',
      title: 'Natural Language Processing & Transformers',
      details: [
        'Text preprocessing, tokenization (BPE, WordPiece), and word embeddings',
        'Recurrent Neural Networks (RNNs) and LSTMs for sequence modeling',
        'Self-Attention mechanism and Transformer encoder-decoder architecture',
        'BERT fine-tuning for sentiment analysis and named entity recognition (NER)',
        'Hugging Face Transformers library pipelines and PyTorch Lightning',
      ],
    },
    {
      module: 'Section 7',
      title: 'Production MLOps, Model Serving & Deployment',
      details: [
        'Experiment tracking with MLflow and Weights & Biases (W&B)',
        'Model serialization with ONNX and TensorRT for low latency inference',
        'Serving models via high-throughput FastAPI microservices',
        'Dockerizing ML services and deploying on AWS SageMaker / GCP Vertex AI',
      ],
    },
  ],

  'data-analytics-power-bi-python': [
    {
      module: 'Section 1',
      title: 'Advanced Excel & Business Analytics Foundations',
      details: [
        'Formulas, lookup functions (XLOOKUP, INDEX-MATCH), and conditional logic',
        'Dynamic Pivot Tables, Pivot Charts, and Slicers for executive dashboards',
        'Power Query in Excel for ETL (Extract, Transform, Load) pipelines',
        'Data validation rules, error handling, and financial modeling models',
        'Statistical analysis in Excel: Mean, Median, Variance, Correlation',
      ],
    },
    {
      module: 'Section 2',
      title: 'SQL for Data Analysis & Relational Databases',
      details: [
        'Relational database architecture: tables, schemas, and relational keys',
        'SQL querying: SELECT, WHERE, GROUP BY, HAVING, ORDER BY',
        'Multi-table joins: INNER, LEFT, RIGHT, and FULL OUTER joins',
        'Common Table Expressions (CTEs) and recursive queries',
        'Window functions: ROW_NUMBER, RANK, DENSE_RANK, LEAD, and LAG',
      ],
    },
    {
      module: 'Section 3',
      title: 'Python for Data Analysis & Exploratory Data Analysis',
      details: [
        'Pandas series and DataFrames data structures',
        'Data cleaning: resolving missing values, deduplication, type casting',
        'Aggregation, pivot tables, and multi-index grouping in Pandas',
        'Data visualization with Seaborn, Matplotlib, and Plotly interactive charts',
        'Statistical hypothesis testing: t-tests, Chi-square, and p-value evaluation',
      ],
    },
    {
      module: 'Section 4',
      title: 'Power BI Desktop & Modern Data Modeling',
      details: [
        'Connecting to disparate data sources (SQL, Excel, Web, CSV, APIs)',
        'Power Query Editor: unpivoting, merging, appending, and conditional columns',
        'Star Schema vs Snowflake Schema data modeling best practices',
        'Managing active vs inactive relationships and cross-filtering directions',
        'Date table generation and time-intelligence foundation',
      ],
    },
    {
      module: 'Section 5',
      title: 'Mastering DAX (Data Analysis Expressions)',
      details: [
        'Calculated Columns vs Measures: memory and compute implications',
        'Essential aggregation DAX functions: SUM, SUMX, COUNTROWS, AVERAGE',
        'The CALCULATE function: filter context modification and row context transition',
        'Time intelligence DAX: YTD, QTD, MTD, SAMEPERIODLASTYEAR, and Growth %',
        'Advanced DAX: ALL, ALLEXCEPT, VALUES, FILTER, and EARLIER patterns',
      ],
    },
    {
      module: 'Section 6',
      title: 'Interactive Dashboard Design & UX Storytelling',
      details: [
        'Visual hierarchy, color theory, and UX layout for enterprise dashboards',
        'Custom tooltips, drill-through pages, and bookmarks for interactive narration',
        'Decomposition trees, key influencers, and Q&A natural language visuals',
        'Designing responsive mobile layouts for Power BI dashboards',
        'Performance Analyzer: optimizing visual rendering speed and DAX queries',
      ],
    },
    {
      module: 'Section 7',
      title: 'Power BI Service, Security & Governance',
      details: [
        'Publishing reports to Power BI Service workspaces',
        'Row-Level Security (RLS) implementation for role-based data filtering',
        'Scheduled automated data refreshes and On-Premises Data Gateway setup',
        'Creating apps, sharing reports, and embedding dashboards in web portals',
      ],
    },
  ],

  'ui-ux-design-masterclass': [
    {
      module: 'Section 1',
      title: 'Design Thinking & Human-Centered UX Foundations',
      details: [
        'User-Centered Design (UCD) process and double diamond framework',
        'User research methodologies: interviews, surveys, and contextual inquiry',
        'Creating user personas, empathy maps, and journey maps',
        'Information Architecture (IA), user flows, and site mapping',
        'Usability heuristics (Nielsen Norman 10 heuristics) evaluation',
      ],
    },
    {
      module: 'Section 2',
      title: 'Wireframing & Low-Fidelity Prototyping',
      details: [
        'Low-fidelity wireframing on paper and digital canvas',
        'Card sorting and tree testing for navigation architecture',
        'Rapid paper prototyping and early user validation',
        'Accessibility principles: WCAG 2.2 standards and color contrast',
        'Translating user requirements into functional wireframe blueprints',
      ],
    },
    {
      module: 'Section 3',
      title: 'Figma Mastery: Tools, Layouts & Components',
      details: [
        'Figma interface, canvas navigation, vector networks, and pen tool',
        'Auto Layout deep dive: flexbox alignments, padding, and constraints',
        'Figma components, variants, component properties, and boolean flags',
        'Figma Variables: tokens for colors, spacing, typography, and modes',
        'Interactive prototyping: smart animate, overlays, and spring physics',
      ],
    },
    {
      module: 'Section 4',
      title: 'Enterprise Design Systems & UI Foundations',
      details: [
        'Atomic design methodology: atoms, molecules, organisms, templates, pages',
        'Color theory: primary, neutral, semantic tokens, and dark mode palettes',
        'Typography scales, vertical rhythm, and responsive font sizing',
        'Creating comprehensive icon libraries and reusable UI kits',
        'Documentation and component governance for design systems',
      ],
    },
    {
      module: 'Section 5',
      title: 'Visual UI Design & Modern Web Aesthetics',
      details: [
        'Glassmorphism, neumorphism, cards, and elevation shadows',
        'Micro-interactions and motion design for engaging feedback',
        'Hero section visual hierarchy and landing page conversion principles',
        'Responsive layout grids: desktop (12-col), tablet, and mobile layouts',
        'Designing modern SaaS dashboards and data visualization screens',
      ],
    },
    {
      module: 'Section 6',
      title: 'Usability Testing & Design Validation',
      details: [
        'Moderated vs unmoderated usability testing sessions',
        'A/B testing strategies and conversion rate optimization (CRO)',
        'Analyzing heatmaps, scroll maps, and click-tracking with Hotjar',
        'Synthesizing usability test findings into actionable design iterations',
        'Presenting design decisions to stakeholders with data-backed rationale',
      ],
    },
    {
      module: 'Section 7',
      title: 'Developer Handoff, Portfolio Building & Career Launch',
      details: [
        'Figma Dev Mode: inspect, code generation, and asset exports',
        'Writing design specifications, tokens, and edge-case documentation',
        'Building an impressive Behance, Dribbble, and Notion case study portfolio',
        'Whiteboard design challenge prep and live design interview simulation',
      ],
    },
  ],

  'cyber-security-ethical-hacking': [
    {
      module: 'Section 1',
      title: 'Networking Fundamentals & Linux for Hackers',
      details: [
        'TCP/IP stack, OSI model, subnetting, and packet structure',
        'DNS, DHCP, ARP, ICMP, and routing protocols breakdown',
        'Linux terminal essentials, bash scripting, and permission models',
        'Network packet capture and protocol analysis with Wireshark',
        'Configuring isolated penetration testing labs with VirtualBox & Kali Linux',
      ],
    },
    {
      module: 'Section 2',
      title: 'Reconnaissance & Footprinting (OSINT)',
      details: [
        'Passive reconnaissance: whois, Google Dorking, and Shodan queries',
        'Active reconnaissance: network scanning and port probing with Nmap',
        'Service version enumeration, OS fingerprinting, and vulnerability scanning',
        'DNS zone transfers, subdomain enumeration, and certificate transparency',
        'Social engineering tactics, phishing simulation, and human vulnerability',
      ],
    },
    {
      module: 'Section 3',
      title: 'Vulnerability Analysis & System Exploitation',
      details: [
        'Vulnerability scanning with Nessus and OpenVAS',
        'Metasploit Framework: exploits, payloads, meters, and listeners',
        'Password cracking with John the Ripper and Hashcat',
        'Windows & Linux privilege escalation techniques and misconfigurations',
        'Maintaining access with backdoors, rootkits, and persistence hooks',
      ],
    },
    {
      module: 'Section 4',
      title: 'Web Application Security & OWASP Top 10',
      details: [
        'Interception proxies: Burp Suite Professional setup and workflows',
        'SQL Injection (SQLi): union-based, error-based, and blind SQLi',
        'Cross-Site Scripting (XSS): reflected, stored, and DOM-based attacks',
        'Cross-Site Request Forgery (CSRF) and Server-Side Request Forgery (SSRF)',
        'Authentication bypass, broken object-level authorization (BOLA/IDOR)',
      ],
    },
    {
      module: 'Section 5',
      title: 'Wireless Hacking & Network Defense',
      details: [
        'Wi-Fi security protocols: WPA2, WPA3, and enterprise authentication',
        'Deauthentication attacks, 4-way handshake capture, and cracking with Aircrack-ng',
        'Rogue access points, Evil Twin attacks, and captive portal spoofing',
        'Firewall configuration, IDS/IPS rules with Snort and Suricata',
        'Network segmentation, DMZ architecture, and zero trust models',
      ],
    },
    {
      module: 'Section 6',
      title: 'Cryptography, Malware Analysis & Reverse Engineering',
      details: [
        'Symmetric vs asymmetric encryption: AES, RSA, ECC, and digital signatures',
        'Public Key Infrastructure (PKI), TLS/SSL handshakes, and certificate pinning',
        'Static and dynamic malware analysis basics in sandboxed environments',
        'Ransomware mechanisms and defense against payload execution',
        'Binary analysis tools: Ghidra and IDA Pro introductory reverse engineering',
      ],
    },
    {
      module: 'Section 7',
      title: 'SOC Operations, Incident Response & Ethical Reporting',
      details: [
        'Security Information & Event Management (SIEM) with Splunk and ELK stack',
        'Incident handling lifecycle: preparation, detection, containment, recovery',
        'Writing professional penetration testing executive summaries and remediation reports',
        'Compliance standards: ISO 27001, GDPR, HIPAA, and legal ethics of hacking',
      ],
    },
  ],

  'aws-devops-cloud-architect': [
    {
      module: 'Section 1',
      title: 'Cloud Computing Foundations & AWS Core Infrastructure',
      details: [
        'Cloud concepts: IaaS, PaaS, SaaS, regions, and availability zones',
        'AWS Identity and Access Management (IAM): users, groups, roles, and policies',
        'Amazon EC2: instance types, AMIs, key pairs, and security groups',
        'Amazon EBS & EFS: block and distributed file system storage',
        'AWS CLI and SDK setup for automated infrastructure management',
      ],
    },
    {
      module: 'Section 2',
      title: 'AWS Networking & High Availability Architecture',
      details: [
        'Amazon VPC: subnets, route tables, internet gateways, and NAT gateways',
        'Network Access Control Lists (NACLs) vs Security Groups',
        'Application Load Balancers (ALB) and Network Load Balancers (NLB)',
        'Auto Scaling Groups (ASG) based on CPU and custom CloudWatch metrics',
        'Route 53: DNS management, routing policies, and health checks',
      ],
    },
    {
      module: 'Section 3',
      title: 'Cloud Storage, Databases & Serverless Services',
      details: [
        'Amazon S3: bucket policies, lifecycle rules, versioning, and static hosting',
        'Amazon CloudFront CDN: edge caching and SSL certificate termination',
        'Amazon RDS (PostgreSQL, MySQL): multi-AZ deployments and read replicas',
        'Amazon DynamoDB: NoSQL database modeling, primary keys, and global tables',
        'AWS Lambda and API Gateway: building serverless microservices',
      ],
    },
    {
      module: 'Section 4',
      title: 'Containerization with Docker & Container Orchestration',
      details: [
        'Docker architecture, Dockerfile syntax, and multi-stage builds',
        'Managing images with Amazon Elastic Container Registry (ECR)',
        'Deploying containers with Amazon ECS (Elastic Container Service) on Fargate',
        'Kubernetes foundations: pods, deployments, services, and ingress',
        'Amazon EKS (Elastic Kubernetes Service): cluster setup and Helm charts',
      ],
    },
    {
      module: 'Section 5',
      title: 'Infrastructure as Code (IaC) with Terraform',
      details: [
        'Terraform HCL syntax: providers, resources, variables, and outputs',
        'Managing remote state with S3 and state locking with DynamoDB',
        'Creating reusable Terraform modules for VPC and compute environments',
        'Terraform workspaces, drift detection, and plan validation',
        'AWS CloudFormation basics and AWS CDK overview',
      ],
    },
    {
      module: 'Section 6',
      title: 'CI/CD Pipelines & DevSecOps Automation',
      details: [
        'Git branch-based CI/CD workflows and automated release versioning',
        'Building pipelines with GitHub Actions and AWS CodePipeline / CodeBuild',
        'Automated unit testing, linting, and vulnerability scanning in pipelines',
        'Zero-downtime deployment strategies: Blue/Green and Canary rollouts',
        'Secret management with AWS Secrets Manager and HashiCorp Vault',
      ],
    },
    {
      module: 'Section 7',
      title: 'Cloud Monitoring, SRE Practices & Cost Optimization',
      details: [
        'Amazon CloudWatch: metrics, custom dashboards, alarms, and logs insights',
        'AWS X-Ray for distributed application request tracing',
        'AWS Well-Architected Framework: operational excellence and security pillars',
        'Cost optimization with AWS Cost Explorer, Savings Plans, and Spot instances',
      ],
    },
  ],
};

// Generic 7-section curriculum builder for other courses
function buildGeneric7SectionCurriculum(course) {
  return [
    {
      module: 'Section 1',
      title: `Core Fundamentals & Architectural Foundations of ${course.title.split(' ')[0]}`,
      details: [
        'Industry overview, modern technological standards, and workflow setup',
        'Fundamental concepts, core terminology, and mental models',
        'Tooling installation, configuration, and repository setup',
        'Foundational exercises and first working prototype creation',
        'Best practices for clean architecture and developer productivity',
      ],
    },
    {
      module: 'Section 2',
      title: 'Intermediate Concepts & Practical Problem Solving',
      details: [
        'Deep-dive into component lifecycles, pipelines, and frameworks',
        'Handling state, complex workflows, and input processing',
        'Modular design patterns and reusable architectural building blocks',
        'Practical real-world case studies and guided coding labs',
        'Debugging techniques and common anti-patterns avoidance',
      ],
    },
    {
      module: 'Section 3',
      title: 'Advanced Methodologies & Professional Tooling',
      details: [
        'Advanced features, specialized algorithms, and industry design paradigms',
        'Integration with third-party APIs, libraries, and cloud ecosystems',
        'Automation scripts, workflow accelerators, and productivity boosters',
        'Scalable structures designed for team collaboration and maintenance',
        'Comprehensive milestone project building and peer code review',
      ],
    },
    {
      module: 'Section 4',
      title: 'Enterprise Best Practices, Security & Robustness',
      details: [
        'Data integrity, security considerations, and risk mitigation',
        'Design systems, interface consistency, and accessibility standards',
        'Error boundary handling, resilient fallback mechanisms, and logging',
        'Performance optimization, resource management, and compute tuning',
      ],
    },
    {
      module: 'Section 5',
      title: 'Integration, Scalability & Complex Implementations',
      details: [
        'Handling high-throughput scenarios, large datasets, or intricate workflows',
        'Continuous integration, automated verification, and quality gates',
        'Interoperability across platforms, browsers, and mobile devices',
        'Collaborative workflows, version control, and team pull request etiquette',
        'Refactoring legacy patterns to modern industry standards',
      ],
    },
    {
      module: 'Section 6',
      title: 'Testing, Quality Assurance & Performance Tuning',
      details: [
        'Unit testing, integration testing, and automated end-to-end checks',
        'Benchmarking, profiling bottlenecks, and optimizing run-time speed',
        'Code review rubrics, security audits, and compliance checks',
        'Preparing production release checklists and deployment plans',
      ],
    },
    {
      module: 'Section 7',
      title: 'Capstone Project, Deployment & Career Placement Preparation',
      details: [
        'Full-scale end-to-end enterprise capstone project deployment',
        'Publishing verified project repositories and live documentation on GitHub',
        'Resume review, portfolio presentation, and technical interview simulations',
        'Direct referral drive to hiring partners and placement network support',
      ],
    },
  ];
}

async function main() {
  console.log('Enriching all 15 courses in database with rich 7-section curriculum...');
  const allCourses = await prisma.course.findMany();

  for (const c of allCourses) {
    const syllabus = coursesSyllabus[c.slug] || buildGeneric7SectionCurriculum(c);
    
    // Provide an extensive descriptive overview
    let updatedDesc = c.description;
    if (c.slug === 'mobile-app-development-react-native') {
      updatedDesc = 'Learn native device APIs, push notifications, offline storage, mobile UI navigation, and App Store / Play Store deployment with React Native & Expo.';
    }

    await prisma.course.update({
      where: { id: c.id },
      data: {
        description: updatedDesc,
        syllabusJson: JSON.stringify(syllabus),
      },
    });
    console.log(`Updated course [${c.slug}] with ${syllabus.length} sections!`);
  }

  console.log('All courses successfully enriched with 7-section curriculum!');
  await prisma.$disconnect();
}

main();
