# TruthLens AI – AI-Powered Fake News & Misinformation Detection System

> *"Analyze the claim. Examine the evidence. Understand the context."*

TruthLens AI is a production-grade, explainable misinformation analysis platform designed for investigative journalists, fact-checkers, and digital citizens. Rather than returning crude black-box percentages (*"Fake News: 95%"*), TruthLens breaks down articles, social posts, web URLs, and screenshots into atomic claims, audits linguistic manipulation and clickbait urgency, searches for corroborated evidence from primary sources, and presents calibrated confidence assessments with clear uncertainty boundaries.

---

## 🌟 Key Features

### 1. Multi-Modal Ingestion
- **Paste Text**: Analyze full articles, social media posts, headlines, and WhatsApp/Telegram forwards.
- **Analyze Web URL**: Automated HTML scraping with metadata extraction (Publisher, Author, Publication Date, Domain) and SSRF-safe sanitization.
- **Upload Image (OCR)**: Extracts high-fidelity text from screenshots (PNG, JPG, JPEG, WEBP) using native Tesseract.js workers. Allows editing extracted text before analysis.

### 2. Explainable Claim-Level Analysis
- Deconstructs articles into discrete verifiable factual claims.
- Classifies each claim into calibrated statuses:
  - `Supported`
  - `Contradicted`
  - `Misleading context`
  - `Unverified`
  - `Insufficient evidence`
- Provides explicit *"Why this was flagged"* explainability for every assertion.

### 3. Evidence Explorer
- Dedicated evidence panel categorizing retrieved facts into **Supporting Evidence**, **Contradicting Evidence**, and **Related Reporting**.
- Explicitly distinguishes between **Retrieved real-world evidence** and **AI model interpretation**.
- Provides primary links, source names, and publication dates. Never invents citations. Displays *"No sufficient evidence was found"* when records are missing.

### 4. Source Transparency Audit
- Evaluates verifiable journalistic hygiene indicators:
  - Author identified with verifiable byline
  - Explicit publication date & temporal consistency
  - Independent sources and peer-reviewed studies cited
  - Primary references & DOIs linked
  - Editorial & publisher governance present
- Avoids domain stereotyping by focusing on measurable structural transparency.

### 5. Clickbait & Urgency Detector
- Isolates sensational capitalization, urgency manipulation (*"Before midnight!!"*, *"Hurry before it's taken down"*), curiosity gaps, and manufactured authority panic.
- Highlights exact flagged phrases.
- **Methodological core**: Clickbait is emotional packaging and is not automatically treated as factual falsity.

### 6. Language, Emotion & Framing Analysis
- Evaluates emotional intensity, fear scores, anger scores, and sensational vocabulary.
- Reminds users that passionate or emotional language does not equal falsehood.

### 7. Context & Temporal Audit
- Detects time-gap distortions (e.g. historical 2017 hurricane flooding footage recycled as breaking disaster news today).

### 8. Built-in Demo Mode
- Instant 1-click loading for 5 realistic scenarios:
  1. **Credible Scientific Discovery** (NASA JWST redshift galaxy confirmation)
  2. **Misleading Health Claim** (Miracle herb claiming 98% diabetes cure)
  3. **Unverified Social Panic** (Confidential bank freeze order forward)
  4. **Clickbait Sensationalism** (Doctors begging to throw away household oil)
  5. **Decontextualized Outdated News** (Hurricane Harvey flood footage reshared today)

### 9. Complete Platform Pages
- `/` – Premium Hero & Feature Landing Page with live animated dossier preview.
- `/analyze` – Multi-modal analysis workspace with genuine pipeline progress.
- `/results/[id]` – Comprehensive verification dossier with interactive claims, feedback widget, and PDF/JSON export.
- `/dashboard` – Executive telemetry, credibility ratios, and claim breakdown metrics.
- `/history` – Historical analysis archive with search, assessment filter, and JSON export.
- `/reports` – Misinformation investigation registry & community issue tracking.
- `/settings` – API key diagnostic status, OCR engine check, and sensitivity calibration.
- `/admin` – Moderation queue for flagged reports and custom keyword heuristic rules.

---

## 🏗️ Architecture & Technology Stack

```
                               ┌────────────────────────┐
                               │   User Input / Client  │
                               │  (Text / URL / Image)  │
                               └───────────┬────────────┘
                                           │
                                           ▼
                               ┌────────────────────────┐
                               │  Next.js 16 App Router │
                               │  (React 19, Tailwind)  │
                               └───────────┬────────────┘
                                           │
             ┌─────────────────────────────┼─────────────────────────────┐
             ▼                             ▼                             ▼
   ┌───────────────────┐         ┌───────────────────┐         ┌───────────────────┐
   │ Cheerio Scraper   │         │ Tesseract OCR     │         │ Security & SSRF   │
   │ (URL Extraction)  │         │ (Image Parsing)   │         │ Input Validation  │
   └─────────┬─────────┘         └─────────┬─────────┘         └─────────┬─────────┘
             │                             │                             │
             └─────────────────────────────┼─────────────────────────────┘
                                           │
                                           ▼
                               ┌────────────────────────┐
                               │  Multi-Stage Pipeline  │
                               │  - Language Detection  │
                               │  - Claim Decomposition │
                               │  - Clickbait Analysis  │
                               │  - Source Audit        │
                               │  - Context Analysis    │
                               └───────────┬────────────┘
                                           │
                 ┌─────────────────────────┴─────────────────────────┐
                 ▼                                                   ▼
       ┌───────────────────┐                               ┌───────────────────┐
       │ AI Engine Router  │                               │ Evidence Service  │
       │ - Gemini 1.5      │                               │ - Tavily Search   │
       │ - OpenAI GPT-4o   │                               │ - Serper Search   │
       │ - Local Heuristics│                               │ - Verified Repo   │
       └─────────┬─────────┘                               └─────────┬─────────┘
                 │                                                   │
                 └─────────────────────────┬─────────────────────────┘
                                           │
                                           ▼
                               ┌────────────────────────┐
                               │  Prisma ORM (v6.4.1)   │
                               │  (SQLite / PostgreSQL) │
                               └───────────┬────────────┘
                                           │
                                           ▼
                               ┌────────────────────────┐
                               │  Verification Dossier  │
                               │  & Executive Telemetry │
                               └────────────────────────┘
```

- **Frontend**: Next.js 16.3.5, React 19, TypeScript, Tailwind CSS v4, Lucide React.
- **Backend / APIs**: Next.js App Router Route Handlers.
- **Database & ORM**: Prisma 6.4.1 with SQLite (default zero-config local) & PostgreSQL compatibility.
- **AI & NLP**: Multi-provider architecture (Google Gemini 1.5, OpenAI GPT-4o Mini, and resilient TruthLens Heuristic NLP Engine).
- **OCR**: Tesseract.js v7.
- **Web Extraction**: Cheerio with SSRF protection guards.

---

## 📁 Folder Structure

```
truthlens-ai/
├── prisma/
│   ├── schema.prisma            # Prisma schema (User, Analysis, Claim, Evidence, Source, Feedback, Report)
│   └── dev.db                   # SQLite database file
├── src/
│   ├── app/
│   │   ├── admin/page.tsx       # Admin Operations Center & Moderation Queue
│   │   ├── analyze/page.tsx     # Multi-Modal Story Analyzer Workspace
│   │   ├── dashboard/page.tsx   # Executive Intelligence Telemetry Dashboard
│   │   ├── history/page.tsx     # Past Analyses Archive with Search & Filter
│   │   ├── reports/page.tsx     # Community Misinformation Investigation Dossiers
│   │   ├── results/[id]/page.tsx# Comprehensive Verification Report
│   │   ├── settings/page.tsx    # Engine & Provider Diagnostic Settings
│   │   ├── api/
│   │   │   ├── analysis/[id]/   # GET / DELETE individual analysis
│   │   │   ├── analyze/         # POST multi-stage analysis pipeline
│   │   │   ├── claims/similar/  # POST similar claim deduplication
│   │   │   ├── extract-url/     # POST SSRF-safe URL scraping
│   │   │   ├── feedback/        # POST user evaluation & accuracy rating
│   │   │   ├── history/         # GET paginated history
│   │   │   ├── ocr/             # POST Tesseract image text extraction
│   │   │   ├── report/          # POST/GET/PATCH moderation issue reports
│   │   │   ├── settings/        # GET provider telemetry & database status
│   │   │   └── stats/           # GET executive metrics & ratios
│   │   ├── globals.css          # Dark Navy theme, glassmorphism, radar grids
│   │   ├── layout.tsx           # Global HTML layout & metadata
│   │   └── page.tsx             # Landing Page with 8 feature sections
│   ├── components/
│   │   ├── Navbar.tsx           # Responsive Dark Navy navigation bar
│   │   ├── Footer.tsx           # Footer with ethical AI disclaimers
│   │   └── ui/
│   │       └── badges.tsx       # Assessment & Claim status badge components
│   ├── lib/
│   │   ├── ai-service.ts        # Unified AI Engine (Gemini, OpenAI, Local Heuristics)
│   │   ├── demo-data.ts         # 5 comprehensive realistic benchmark datasets
│   │   ├── evidence-service.ts  # Cross-source evidence retrieval abstraction
│   │   ├── extractor.ts         # Cheerio-based article extractor with SSRF security
│   │   ├── ocr.ts               # Tesseract.js worker initialization
│   │   └── prisma.ts            # Prisma singleton client
│   └── types/
│       └── index.ts             # Strict TypeScript models & Zod validation schemas
├── .env                         # Local environment configuration
├── .env.example                 # Documented template for deployment
├── package.json                 # Dependencies & scripts
└── tsconfig.json                # TypeScript configuration
```

---

## ⚙️ Environment Variables

Copy `.env.example` to `.env`:

```bash
cp .env.example .env
```

| Variable | Description | Required? | Default |
| :--- | :--- | :--- | :--- |
| `DATABASE_URL` | Prisma database URL | Yes | `"file:./dev.db"` |
| `GEMINI_API_KEY` | Google Gemini API Key | Optional | `""` (Falls back to Local Engine) |
| `OPENAI_API_KEY` | OpenAI API Key | Optional | `""` (Falls back to Local Engine) |
| `TAVILY_API_KEY` | Tavily Fact Search API | Optional | `""` (Uses Verified Fact Repo) |
| `SERPER_API_KEY` | Serper Search API | Optional | `""` |
| `ADMIN_SECRET_KEY`| Admin console secret passkey | Optional | `"truthlens-admin-secret-2026"` |

*Note: TruthLens AI functions 100% out of the box even without any external API keys thanks to the integrated high-fidelity rule and heuristic NLP engine!*

---

## 🚀 Quickstart & Local Installation

### Prerequisites
- Node.js v18.0 or higher
- npm or pnpm or bun

### 1. Install Dependencies
```bash
npm install
```

### 2. Initialize Database
Generate Prisma client and initialize the SQLite database:
```bash
npx prisma db push
```

### 3. Run Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🧪 Testing

Build and type-check the entire application:
```bash
npm run build
```

Run in production mode:
```bash
npm run start
```

---

## 📡 API Reference

### `POST /api/analyze`
Submits text, URL, or image OCR for claim extraction and verification.
```json
{
  "text": "Full article or claim text to verify...",
  "inputMode": "text",
  "isDemo": false
}
```

### `POST /api/extract-url`
Extracts title, byline, publisher, and body text from a webpage URL with SSRF guards.
```json
{
  "url": "https://example.com/news/article"
}
```

### `POST /api/ocr`
Uploads a screenshot (`multipart/form-data` with `image` field) and extracts text via Tesseract.js.

### `GET /api/analysis/:id`
Retrieves a full verification dossier by unique ID.

### `GET /api/history`
Lists past verification analyses with search query, assessment filters, and pagination.

### `POST /api/feedback`
Submits user evaluation (`helpful`, `unhelpful`, `accurate`, `inaccurate`) on a verification report.

### `POST /api/report`
Flags an analysis for human fact-checker investigation.

---

## 🛡️ Responsible AI Principles

1. **Never returns binary true/false verdicts**: AI models make probabilistic inferences, not infallible judgments.
2. **Clear uncertainty labeling**: Confidence numbers explicitly denote algorithmic certainty rather than ontological truth.
3. **Evidence ground truth**: Distinguishes between verifiable quotes from primary sources and machine reasoning.
4. **Clickbait disambiguation**: Avoids conflating sensational headlines with malicious falsehoods.

---

## 📜 License

MIT License. Developed for open-source verification and hackathon demonstration.
