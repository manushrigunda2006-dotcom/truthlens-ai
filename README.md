# 🔍 TruthLens AI

### AI-Powered Fake News & Misinformation Detection System

TruthLens AI is an AI-powered platform that helps users analyze news articles, social-media posts, headlines, URLs, and images to identify potentially misleading or false information.

Instead of simply giving a **"Fake" or "Real"** result, TruthLens AI analyzes individual claims, available evidence, source information, language patterns, clickbait indicators, and contextual information to provide an explainable assessment.

> **Analyze the claim. Examine the evidence. Understand the context.**

---

## 🚀 Features

### 🤖 AI-Powered Analysis

* Analyze news articles and social-media content
* Extract individual factual claims
* Classify claims based on available evidence
* Generate explainable AI assessments
* Display confidence and uncertainty

### 🔎 Claim Verification

* Break articles into individual claims
* Analyze each claim separately
* Identify:

  * ✅ Supported claims
  * ⚠️ Potentially misleading claims
  * ❌ Contradicted claims
  * ❓ Unverified claims
  * ℹ️ Insufficient evidence

### 📰 Source Analysis

Analyze available source information such as:

* Publisher
* Author
* Publication date
* References and citations
* Primary-source availability
* Source transparency indicators

### 📚 Evidence Explorer

For each claim, TruthLens AI can display:

* Supporting evidence
* Contradicting evidence
* Related information
* Publication dates
* Source references

### 🎯 Clickbait Detection

Detect potential indicators such as:

* Excessive capitalization
* Sensational wording
* Emotional manipulation
* Excessive punctuation
* Fear-inducing language
* Unsupported superlatives
* Urgency manipulation

### 🧠 Explainable AI

Instead of only showing a result, TruthLens AI explains **why** a claim was flagged.

Example indicators:

```text
• Unsupported factual claim
• Conflicting available evidence
• Missing source information
• Sensational wording
• Outdated context
```

### 🌎 Multilingual Support

Supports analysis in:

* 🇬🇧 English
* 🇮🇳 Hindi
* ಕನ್ನಡ Kannada
* తెలుగు Telugu
* தமிழ் Tamil

### 🖼️ Image Analysis

Upload screenshots or images containing claims.

TruthLens AI can:

1. Extract text using OCR
2. Allow the user to edit extracted text
3. Analyze the detected claims

### 🕐 Context Detection

Identify situations where older information may be presented as recent.

The system can compare:

* Publication date
* Current date
* Available updates
* Context surrounding the claim

### 🧩 Claim Dependency Graph

Visualize relationships between:

```text
Article
   │
   ├── Claim 1
   │     ├── Evidence A
   │     └── Evidence B
   │
   ├── Claim 2
   │     └── Evidence C
   │
   └── Claim 3
         └── Evidence D
```

### 🧠 Verification Memory

Previously analyzed claims can be stored and detected when similar claims are submitted again.

Users can compare previous and current analysis.

### 📊 Dashboard

The dashboard provides:

* Total stories analyzed
* Claims analyzed
* Unverified claims
* Reports generated
* Analysis history
* Language statistics
* Assessment statistics

### 📄 Verification Reports

Generate a structured verification report containing:

* Article information
* Overall assessment
* Individual claims
* Evidence
* Sources
* Clickbait analysis
* Language analysis
* Context analysis
* Limitations

---

# 🏗️ System Architecture

```text
                    ┌──────────────────┐
                    │      User        │
                    └────────┬─────────┘
                             │
                             ▼
                 ┌──────────────────────┐
                 │   TruthLens Frontend │
                 │       Next.js        │
                 └──────────┬───────────┘
                            │
                            ▼
                 ┌──────────────────────┐
                 │    Analysis Engine   │
                 └──────────┬───────────┘
                            │
             ┌──────────────┼──────────────┐
             ▼              ▼              ▼
       ┌──────────┐   ┌──────────┐   ┌──────────┐
       │ AI / NLP │   │  Claims  │   │ Evidence │
       │ Analysis │   │Extraction│   │ Retrieval│
       └──────────┘   └──────────┘   └─────┬────┘
                                           │
                                           ▼
                                  ┌────────────────┐
                                  │ Source Analysis│
                                  └───────┬────────┘
                                          │
                                          ▼
                                  ┌────────────────┐
                                  │ Verification   │
                                  │ Report         │
                                  └───────┬────────┘
                                          │
                                          ▼
                                  ┌────────────────┐
                                  │   PostgreSQL   │
                                  └────────────────┘
```

---

# 🛠️ Tech Stack

### Frontend

* Next.js
* React
* TypeScript
* Tailwind CSS
* shadcn/ui
* Lucide Icons
* Recharts

### Backend

* Next.js API Routes
* REST APIs
* AI/NLP services

### Database

* PostgreSQL
* Prisma / Drizzle ORM

### AI

* Large Language Models
* NLP
* Claim extraction
* Text classification
* Explainable analysis

### Image Processing

* OCR
* Image text extraction

---

# 📂 Project Structure

```text
truthlens-ai/
│
├── app/
│   ├── page.tsx
│   ├── analyze/
│   ├── results/
│   ├── dashboard/
│   ├── history/
│   ├── reports/
│   ├── settings/
│   ├── admin/
│   └── api/
│
├── components/
│   ├── analyzer/
│   ├── claims/
│   ├── evidence/
│   ├── source/
│   ├── dashboard/
│   └── ui/
│
├── lib/
│   ├── ai/
│   ├── database/
│   ├── evidence/
│   └── analysis/
│
├── public/
│
├── prisma/
│
├── .env.example
├── package.json
├── README.md
└── tsconfig.json
```

---

# ⚙️ Installation

## 1. Clone the repository

```bash
git clone https://github.com/YOUR_USERNAME/truthlens-ai.git
```

## 2. Navigate into the project

```bash
cd truthlens-ai
```

## 3. Install dependencies

```bash
npm install
```

## 4. Configure environment variables

Create a `.env.local` file:

```env
AI_API_KEY=your_api_key
DATABASE_URL=your_database_url
EVIDENCE_API_KEY=your_api_key
```

Never commit `.env.local` or API keys to GitHub.

## 5. Run the development server

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

---

# 🔄 How It Works

```text
1. User submits content
          ↓
2. Content is extracted
          ↓
3. Language is detected
          ↓
4. Claims are extracted
          ↓
5. AI analyzes the claims
          ↓
6. Available evidence is retrieved
          ↓
7. Sources are analyzed
          ↓
8. Context is checked
          ↓
9. Results are generated
          ↓
10. Verification report is displayed
```

---

# 📊 Example Analysis

### Input

```text
Scientists have discovered a new technology that can
produce unlimited electricity completely free of cost.
```

### TruthLens Analysis

```text
Overall Assessment:
Potentially Misleading

Claim:
"Technology can produce unlimited electricity completely free."

Status:
Unverified

Potential Indicators:
• Extraordinary claim
• No identifiable source
• Unsupported absolute statement
• Requires additional evidence

Recommendation:
Verify the claim using authoritative scientific sources.
```

The system should not treat this analysis as definitive proof. It is designed to help users investigate information.

---

# 🔐 Security

TruthLens AI follows basic security practices including:

* Environment variables for API keys
* Server-side API calls
* Input validation
* File upload restrictions
* URL validation
* Authentication and authorization
* Error handling
* Rate limiting where applicable

---

# ⚠️ Disclaimer

TruthLens AI provides **automated analysis and research assistance**.

An AI classification is not definitive proof that information is true or false. Users should verify important claims using reliable, authoritative, and preferably primary sources.

---

# 🔮 Future Improvements

* Browser extension
* WhatsApp message analysis
* Telegram content analysis
* Real-time misinformation monitoring
* Advanced image verification
* Video misinformation detection
* Deepfake detection
* More regional languages
* Improved claim databases
* Community verification
* Mobile application
* Fact-checking organization integrations

---

# 🎯 Use Cases

TruthLens AI can be useful for:

* Students
* Journalists
* Researchers
* Content creators
* Social-media users
* Educators
* Fact-checking workflows
* Digital literacy programs

---

# 🏆 Hackathon Project

TruthLens AI is designed as a hackathon-ready solution addressing the growing challenge of misinformation across digital platforms.

The project focuses on:

**AI + NLP + Evidence Retrieval + Explainable AI + Digital Literacy**

---

# 👨‍💻 Development

Built with modern web technologies and AI-powered analysis.

```text
TruthLens AI
Analyze the claim.
Examine the evidence.
Understand the context.
```

⭐ If you find the project useful, consider giving the repository a star.
