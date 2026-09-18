import { AnalysisResult } from "@/types";

export interface DemoItem {
  id: string;
  name: string;
  category: string;
  description: string;
  sampleInput: string;
  inputMode: "text" | "url" | "image";
  url?: string;
  data: AnalysisResult;
}

export const DEMO_ITEMS: DemoItem[] = [
  {
    id: "demo-credible-nasa",
    name: "1. Credible Scientific Discovery",
    category: "Peer-Reviewed Science",
    description: "NASA James Webb Space Telescope confirms redshift in ultra-early distant galaxy GLASS-z12.",
    inputMode: "text",
    sampleInput: `WASHINGTON — NASA's James Webb Space Telescope (JWST) has spectroscopically confirmed one of the most distant galaxies ever observed, GLASS-z12, dating back to just 350 million years after the Big Bang. 
The findings, published this week in The Astrophysical Journal Letters by an international team led by Dr. Curtis-Lake and the NIRSpec team, demonstrate an extraordinary redshift of z = 12.1. 
Independent verification was conducted using both NIRCam photometric imaging and NIRSpec multi-object spectroscopy, confirming the distance and stellar mass distribution.`,
    data: {
      inputMode: "text",
      rawInput: `WASHINGTON — NASA's James Webb Space Telescope (JWST) has spectroscopically confirmed one of the most distant galaxies ever observed, GLASS-z12, dating back to just 350 million years after the Big Bang...`,
      title: "JWST Spectroscopically Confirms Galaxy GLASS-z12 at Redshift z=12.1",
      publisher: "The Astrophysical Journal / NASA Science Mission Directorate",
      author: "Dr. Curtis-Lake, NIRSpec Galaxy Survey Consortium",
      publicationDate: "2024-03-15",
      language: "English",
      overallAssessment: "Likely credible",
      confidence: 0.94,
      summary:
        "DEMO DATA: High empirical credibility. The text cites identifiable primary researchers, recognized peer-reviewed publications (The Astrophysical Journal Letters), and verifiable spectroscopic instruments (NIRSpec, NIRCam) with measured scientific metrics.",
      claims: [
        {
          claimNumber: 1,
          claimText:
            "JWST confirmed distant galaxy GLASS-z12 dating to ~350 million years after the Big Bang with redshift z=12.1.",
          status: "Supported",
          confidence: 0.96,
          explanation:
            "DEMO DATA: Corroborated by published spectroscopic data from NASA, ESA, and peer-reviewed releases in The Astrophysical Journal.",
          evidence: [
            {
              type: "supporting",
              title: "Spectroscopic confirmation of distant galaxy GLASS-z12",
              snippet:
                "NIRSpec multi-object spectroscopy established redshift z=12.11 for GLASS-z12, published in ApJL.",
              sourceName: "NASA Astrophysics Data System / ApJL",
              url: "https://iopscience.iop.org",
              publicationDate: "2024-03-15",
              isAIGenerated: false,
            },
            {
              type: "supporting",
              title: "NASA Webb Discovers Earliest Galaxies Ever Confirmed",
              snippet:
                "Official mission release verifying distance determinations using NIRSpec spectra.",
              sourceName: "NASA Webb Mission Team",
              url: "https://webbtelescope.org",
              publicationDate: "2024-03-16",
              isAIGenerated: false,
            },
          ],
        },
        {
          claimNumber: 2,
          claimText:
            "Independent verification was performed using both NIRCam photometry and NIRSpec spectroscopy.",
          status: "Supported",
          confidence: 0.93,
          explanation:
            "Standard dual-instrument observational verification protocol employed by the Space Telescope Science Institute.",
          evidence: [
            {
              type: "supporting",
              title: "JWST Instrumental Calibration Report",
              snippet:
                "Cross-calibration between NIRCam imaging and NIRSpec disperser confirmed emission breaks.",
              sourceName: "Space Telescope Science Institute (STScI)",
              url: "https://stsci.edu",
              isAIGenerated: false,
            },
          ],
        },
      ],
      clickbait: {
        isClickbait: false,
        score: 8,
        indicators: [],
        flaggedPhrases: [],
        explanation:
          "The tone is objective, precise, and free of sensationalism, excessive capitalization, or emotional manipulation.",
      },
      languageAnalysis: {
        sentiment: "Neutral",
        emotionalIntensity: 12,
        fearScore: 2,
        angerScore: 1,
        sensationalScore: 5,
        loadedWords: [],
        framing: "Technical & Scientific Communication",
        toneSummary: "Calm, evidence-based, formal institutional reporting.",
      },
      sourceAnalysis: {
        publisher: "The Astrophysical Journal / NASA",
        domain: "webbtelescope.org / iopscience.iop.org",
        author: "Dr. Curtis-Lake et al.",
        publicationDate: "2024-03-15",
        transparencyScore: 95,
        indicators: {
          authorIdentified: true,
          publicationDateAvailable: true,
          sourcesCited: true,
          primarySourcesReferenced: true,
          editorialInfoAvailable: true,
        },
        credibilityNote:
          "Top-tier primary institutional research publisher with transparent peer-review standards.",
      },
      evidence: [
        {
          type: "supporting",
          title: "Spectroscopic confirmation of distant galaxy GLASS-z12",
          snippet: "Confirmed redshift z=12.11 published in ApJL.",
          sourceName: "The Astrophysical Journal Letters",
          url: "https://iopscience.iop.org",
          publicationDate: "2024-03-15",
          isAIGenerated: false,
        },
      ],
      context: {
        originalPublicationDate: "2024-03-15",
        analysisDate: "Current",
        isOutdatedContext: false,
        contextExplanation:
          "Publication date corresponds accurately with the spectroscopic announcements and verified timelines.",
      },
      limitations: [
        "Analysis relies on open observational astrophysical releases.",
        "Stellar population models remain subject to ongoing calibration adjustments.",
      ],
      isDemo: true,
    },
  },
  {
    id: "demo-misleading-cure",
    name: "2. Misleading Health Claim",
    category: "Health & Medical Misinformation",
    description: "Miracle herb extract claim overstating in-vitro laboratory petridish test as a 98% human cure.",
    inputMode: "text",
    sampleInput: `AMAZING MEDICAL BREAKTHROUGH: Natural Himalayan Root extract CURES 98% of Type 2 Diabetes overnight! 
Big Pharma doesn't want you to know about this ancient herbal secret discovered in Tibet that completely dissolves insulin resistance in just 48 hours without any diet changes or injections. Doctors are stunned!`,
    data: {
      inputMode: "text",
      rawInput: `AMAZING MEDICAL BREAKTHROUGH: Natural Himalayan Root extract CURES 98% of Type 2 Diabetes overnight!...`,
      title: "Natural Himalayan Root Extract Cures 98% of Diabetes Overnight",
      publisher: "NaturalHealthSecretsBlog.online",
      author: "Anonymous Staff",
      publicationDate: "2024-08-01",
      language: "English",
      overallAssessment: "Likely false",
      confidence: 0.91,
      summary:
        "DEMO DATA: High probability of severe medical misinformation. The article claims an 'overnight cure' for chronic metabolic disease, invokes conspiracy tropes ('Big Pharma doesn't want you to know'), cites zero human clinical trials, and misrepresents in-vitro enzyme assays as clinical outcomes.",
      claims: [
        {
          claimNumber: 1,
          claimText: "Natural Himalayan root extract cures 98% of Type 2 Diabetes overnight.",
          status: "Contradicted",
          confidence: 0.95,
          explanation:
            "DEMO DATA: Medically and biochemically contradicted by established endocrinology. Type 2 Diabetes involves complex pancreatic beta-cell and hepatic insulin receptor mechanisms that cannot be cured overnight.",
          evidence: [
            {
              type: "contradicting",
              title: "American Diabetes Association Standards of Care",
              snippet:
                "There is no known single-compound oral cure that reverses Type 2 diabetes overnight. Beware of fraudulent supplements.",
              sourceName: "American Diabetes Association (ADA)",
              url: "https://diabetes.org",
              publicationDate: "2024-01-01",
              isAIGenerated: false,
            },
            {
              type: "contradicting",
              title: "FDA Warning on Fraudulent Diabetes Treatments",
              snippet:
                "FDA warns consumers not to use unapproved botanical products promising rapid diabetes cure or insulin replacement.",
              sourceName: "U.S. Food and Drug Administration (FDA)",
              url: "https://fda.gov",
              publicationDate: "2023-11-14",
              isAIGenerated: false,
            },
          ],
        },
        {
          claimNumber: 2,
          claimText:
            "Pharmaceutical companies are suppressing this herbal treatment from public knowledge.",
          status: "Unverified",
          confidence: 0.88,
          explanation:
            "Classic conspiracy trope with no evidentiary backing, used to justify lack of peer-reviewed clinical validation.",
          evidence: [
            {
              type: "related",
              title: "Analysis of Health Misinformation Narratives",
              snippet:
                "Conspiratorial claims regarding suppressed botanical cures are typical markers of unregulated supplement marketing.",
              sourceName: "World Health Organization Misinformation Tracker",
              url: "https://who.int",
              isAIGenerated: false,
            },
          ],
        },
      ],
      clickbait: {
        isClickbait: true,
        score: 96,
        indicators: [
          "Excessive capitalization (AMAZING BREAKTHROUGH, CURES)",
          "Sensational superlatives ('98% overnight', 'completely dissolves')",
          "Conspiratorial curiosity gap ('Big Pharma doesn't want you to know')",
          "False urgency and manufactured shock ('Doctors are stunned')",
        ],
        flaggedPhrases: [
          "AMAZING MEDICAL BREAKTHROUGH",
          "CURES 98% overnight",
          "Big Pharma doesn't want you to know",
          "Doctors are stunned",
        ],
        explanation:
          "High clickbait score. Utilizes predatory persuasion techniques typical of affiliate marketing schemes targeting vulnerable patients.",
      },
      languageAnalysis: {
        sentiment: "Positive",
        emotionalIntensity: 89,
        fearScore: 45,
        angerScore: 68,
        sensationalScore: 95,
        loadedWords: ["AMAZING", "CURES", "overnight", "secret", "stunned", "suppressed"],
        framing: "Miracle Cure & Conspiratorial Distrust",
        toneSummary:
          "Heavily loaded sensationalist rhetoric combining artificial hype with institutional resentment.",
      },
      sourceAnalysis: {
        publisher: "NaturalHealthSecretsBlog.online",
        domain: "naturalhealthsecretsblog.online",
        author: "Anonymous Staff",
        publicationDate: "Undated / 2024-08",
        transparencyScore: 12,
        indicators: {
          authorIdentified: false,
          publicationDateAvailable: false,
          sourcesCited: false,
          primarySourcesReferenced: false,
          editorialInfoAvailable: false,
        },
        credibilityNote:
          "Low transparency domain with no medical board oversight, hidden ownership, and direct commercial supplement affiliate links.",
      },
      evidence: [
        {
          type: "contradicting",
          title: "FDA Consumer Advisory: Diabetes Product Scams",
          snippet: "Warns against claims of miracle plant-based diabetes cures.",
          sourceName: "FDA Health Alerts",
          url: "https://fda.gov/consumers",
          isAIGenerated: false,
        },
      ],
      context: {
        analysisDate: "Current",
        isOutdatedContext: false,
        contextExplanation:
          "Recurring supplement marketing template adapted over multiple years with varied herb names.",
      },
      limitations: [
        "In-vitro cell line tests of certain herbal saponins exist, but have zero demonstrated efficacy in human clinical trials.",
      ],
      isDemo: true,
    },
  },
  {
    id: "demo-unverified-panic",
    name: "3. Unverified Social Media Panic",
    category: "Financial & Social Hoaxes",
    description: "Viral WhatsApp/Telegram forward claiming nationwide ATM lockdown and digital savings seizure.",
    inputMode: "text",
    sampleInput: `FORWARDED AS RECEIVED:
Urgent alert for all citizens!! Government and central banks have issued a confidential notice order #4910 to freeze all ATM cash withdrawals and lock down private savings accounts starting tonight at 11:59 PM. 
Withdraw all your cash IMMEDIATELY before banks shut down indefinitely. Share this with 10 family groups now!`,
    data: {
      inputMode: "text",
      rawInput: `FORWARDED AS RECEIVED: Urgent alert for all citizens!! Government and central banks have issued a confidential notice order #4910 to freeze all ATM cash withdrawals...`,
      title: "Confidential Order #4910: Immediate ATM and Savings Account Lockdown",
      publisher: "Unverified Messaging Chain (Forwarded Post)",
      author: "Anonymous Messenger User",
      publicationDate: "Unspecified",
      language: "English",
      overallAssessment: "Likely false",
      confidence: 0.89,
      summary:
        "DEMO DATA: High threat of manufactured panic and bank-run induction. The claim cites non-existent executive orders ('#4910'), provides no official regulatory gazette reference, and displays viral forward hallmarks like 'forward to 10 people'.",
      claims: [
        {
          claimNumber: 1,
          claimText: "A confidential government order (#4910) orders freezing of all ATMs tonight at 11:59 PM.",
          status: "Contradicted",
          confidence: 0.94,
          explanation:
            "DEMO DATA: Central bank and treasury regulatory filings contain no such notice. Official banking associations have issued formal debunking statements.",
          evidence: [
            {
              type: "contradicting",
              title: "Central Banking Authority Official Clarification",
              snippet:
                "Central Bank warns against viral social media rumors alleging ATM or deposit withdrawal halts. All operations normal.",
              sourceName: "National Central Bank Press Office",
              url: "https://centralbank.gov",
              publicationDate: "2024-05-12",
              isAIGenerated: false,
            },
            {
              type: "contradicting",
              title: "Reuters Fact Check: Viral Bank Freeze Messages",
              snippet:
                "Financial authorities debunk fabricated 'Order #4910' rumor recirculating on messaging applications.",
              sourceName: "Reuters Fact Check",
              url: "https://reuters.com/fact-check",
              publicationDate: "2024-05-13",
              isAIGenerated: false,
            },
          ],
        },
        {
          claimNumber: 2,
          claimText: "Citizens should immediately withdraw all cash before indefinite shutdown.",
          status: "Contradicted",
          confidence: 0.92,
          explanation:
            "Manufactured artificial run on financial institutions designed to generate real-world chaos.",
          evidence: [
            {
              type: "contradicting",
              title: "Financial Consumer Protection Board Advisory",
              snippet:
                "Reiterates statutory deposit insurance and regular interbank settlement clearing continuity.",
              sourceName: "Consumer Financial Protection Agency",
              url: "https://consumerfinance.gov",
              isAIGenerated: false,
            },
          ],
        },
      ],
      clickbait: {
        isClickbait: true,
        score: 92,
        indicators: [
          "Extreme urgency manipulation ('Urgent alert', 'starting tonight')",
          "Chain-letter viral propagation prompt ('Share this with 10 family groups')",
          "Double exclamation points ('!!')",
          "Panic and fear inducement ('freeze', 'lock down', 'shut down indefinitely')",
        ],
        flaggedPhrases: [
          "FORWARDED AS RECEIVED",
          "Urgent alert for all citizens!!",
          "confidential notice order #4910",
          "withdraw all your cash IMMEDIATELY",
          "Share this with 10 family groups now!",
        ],
        explanation:
          "Classic viral panic template designed to induce immediate emotional sharing without rational verification.",
      },
      languageAnalysis: {
        sentiment: "Negative",
        emotionalIntensity: 94,
        fearScore: 92,
        angerScore: 40,
        sensationalScore: 90,
        loadedWords: ["Urgent", "confidential", "freeze", "lockdown", "IMMEDIATELY", "indefinitely"],
        framing: "Imminent Crisis & Panic Escalation",
        toneSummary: "Intensely alarmist with intentional panic triggers.",
      },
      sourceAnalysis: {
        publisher: "Encrypted Messaging Broadcast",
        domain: "social-forward.p2p",
        author: "Unknown / Anonymous",
        publicationDate: "None provided",
        transparencyScore: 0,
        indicators: {
          authorIdentified: false,
          publicationDateAvailable: false,
          sourcesCited: false,
          primarySourcesReferenced: false,
          editorialInfoAvailable: false,
        },
        credibilityNote:
          "Zero institutional transparency, no verifiable author, classic anonymous chain-forward pattern.",
      },
      evidence: [
        {
          type: "contradicting",
          title: "Fact Check: No ATM Freeze Order Exists",
          snippet: "Regulatory agencies confirm all liquidity windows and ATM networks remain fully functional.",
          sourceName: "AP Fact Check",
          url: "https://apnews.com/hub/ap-fact-check",
          isAIGenerated: false,
        },
      ],
      context: {
        analysisDate: "Current",
        isOutdatedContext: false,
        contextExplanation:
          "This exact text pattern surfaces periodically during economic news cycles with different order numbers.",
      },
      limitations: [
        "Originating author cannot be traced due to peer-to-peer forwarding structure.",
      ],
      isDemo: true,
    },
  },
  {
    id: "demo-clickbait-sensational",
    name: "4. Clickbait Sensational Headline",
    category: "Sensationalism & Ad-Revenue Bait",
    description: "Classic curiosity-gap clickbait regarding ordinary kitchen oil with misleading danger framing.",
    inputMode: "text",
    sampleInput: `SHOCKING: Doctors Are BEGGING People To Throw Away This Common Household Oil Before Midnight!!
You use it every single day in your kitchen. But scientists just made an earth-shattering discovery that changes EVERYTHING you thought you knew about cooking. What happens to your body after eating it will leave you completely SPEECHLESS! Read now before it's taken down!`,
    data: {
      inputMode: "text",
      rawInput: `SHOCKING: Doctors Are BEGGING People To Throw Away This Common Household Oil Before Midnight!! You use it every single day in your kitchen...`,
      title: "SHOCKING: Doctors Are BEGGING People To Throw Away This Common Household Oil Before Midnight!!",
      publisher: "ViralHealthPulse365.com",
      author: "Trending Staff",
      publicationDate: "2024-07-20",
      language: "English",
      overallAssessment: "Potentially misleading",
      confidence: 0.85,
      summary:
        "DEMO DATA: Demonstrates severe clickbait and urgency distortion. While heating vegetable oils past their smoke point produces standard oxidation compounds (a well-known culinary chemistry fact), the framing exaggerates this into an immediate lethal hazard requiring action 'before midnight'.",
      claims: [
        {
          claimNumber: 1,
          claimText: "Doctors are begging the public to throw away everyday cooking oil before midnight.",
          status: "Misleading context",
          confidence: 0.88,
          explanation:
            "DEMO DATA: No medical body has issued emergency midnight discard alerts. The text takes standard dietary guidelines on lipid oxidation and exaggerates them into an acute panic narrative.",
          evidence: [
            {
              type: "related",
              title: "Harvard T.H. Chan School of Public Health: Cooking Oils Overview",
              snippet:
                "Standard dietary advice highlights balance between unsaturated fats and warns against excessive reheating of frying oils, but notes olive and canola oils remain safe and healthy.",
              sourceName: "Harvard Nutrition Source",
              url: "https://hsph.harvard.edu/nutritionsource",
              isAIGenerated: false,
            },
          ],
        },
        {
          claimNumber: 2,
          claimText: "Scientists made an earth-shattering discovery that changes everything about cooking oil safety.",
          status: "Unverified",
          confidence: 0.82,
          explanation:
            "No novel catastrophic toxicological discovery has been reported in peer-reviewed food chemistry journals.",
          evidence: [
            {
              type: "contradicting",
              title: "Journal of Agricultural and Food Chemistry Meta-Review",
              snippet:
                "Review of lipid oxidation products under domestic culinary temperatures shows low risk during typical home use.",
              sourceName: "ACS Publications",
              url: "https://pubs.acs.org",
              isAIGenerated: false,
            },
          ],
        },
      ],
      clickbait: {
        isClickbait: true,
        score: 98,
        indicators: [
          "Sensational capitalizations ('SHOCKING', 'BEGGING', 'EVERYTHING', 'SPEECHLESS')",
          "Curiosity-gap withheld information (refuses to name the oil in headline to force click)",
          "Arbitrary synthetic urgency ('Before Midnight!!', 'before it's taken down!')",
          "Hyperbolic superlatives ('earth-shattering discovery')",
        ],
        flaggedPhrases: [
          "SHOCKING",
          "Doctors Are BEGGING",
          "Before Midnight!!",
          "earth-shattering discovery",
          "completely SPEECHLESS",
          "before it's taken down!",
        ],
        explanation:
          "High textbook clickbait score. Employs classic curiosity gaps and fabricated countdown urgency. Note: Clickbait is not automatically 100% false, but often severely distorts underlying context.",
      },
      languageAnalysis: {
        sentiment: "Negative",
        emotionalIntensity: 91,
        fearScore: 78,
        angerScore: 32,
        sensationalScore: 98,
        loadedWords: ["SHOCKING", "BEGGING", "earth-shattering", "EVERYTHING", "SPEECHLESS"],
        framing: "Curiosity Trap & Threat Manipulation",
        toneSummary: "Sensationalist, manipulative, designed purely for click-through monetization.",
      },
      sourceAnalysis: {
        publisher: "ViralHealthPulse365.com",
        domain: "viralhealthpulse365.com",
        author: "Trending Staff",
        publicationDate: "2024-07-20",
        transparencyScore: 24,
        indicators: {
          authorIdentified: false,
          publicationDateAvailable: true,
          sourcesCited: false,
          primarySourcesReferenced: false,
          editorialInfoAvailable: false,
        },
        credibilityNote:
          "Content aggregator with high programmatic ad density and aggressive clickbait headline styling.",
      },
      evidence: [
        {
          type: "related",
          title: "Dietary Fats and Cooking Temperatures",
          snippet: "Evidence-based guidelines on oil stability and smoke points.",
          sourceName: "Mayo Clinic Nutrition",
          url: "https://mayoclinic.org",
          isAIGenerated: false,
        },
      ],
      context: {
        analysisDate: "Current",
        isOutdatedContext: false,
        contextExplanation:
          "Headline employs evergreen fear-of-common-household-item archetype, recirculated continuously for ad arbitrage.",
      },
      limitations: [
        "The underlying kernel of truth (oil degradation when repeatedly burned) is accurate, but the reported risk profile is heavily distorted.",
      ],
      isDemo: true,
    },
  },
  {
    id: "demo-outdated-context",
    name: "5. Old News Presented as Breaking",
    category: "Decontextualized Misinformation",
    description: "A genuine 2017 hurricane flood emergency evacuation news broadcast reshared today as 'Breaking News Right Now'.",
    inputMode: "text",
    sampleInput: `BREAKING NEWS RIGHT NOW: Catastrophic flood waters have breached coastal levees! Immediate mandatory evacuation ordered for all southern metro residents. Highway 10 is completely submerged under 6 feet of water, emergency crews are overwhelmed. Seek high ground immediately!`,
    data: {
      inputMode: "text",
      rawInput: `BREAKING NEWS RIGHT NOW: Catastrophic flood waters have breached coastal levees! Immediate mandatory evacuation ordered for all southern metro residents...`,
      title: "BREAKING: Catastrophic Flood Waters Breach Coastal Levees, Highway 10 Submerged",
      publisher: "Metro News Today (Social Repost)",
      author: "Community Contributor",
      publicationDate: "2017-08-28 (Original Incident)",
      language: "English",
      overallAssessment: "Potentially misleading",
      confidence: 0.87,
      summary:
        "DEMO DATA: Contextual timeline distortion. The reported events (flooding of Highway 10 and mandatory evacuations) are historically genuine reports from Hurricane Harvey in August 2017, but have been stripped of timestamps and recirculated as breaking current weather alerts, generating false local emergency alarms.",
      claims: [
        {
          claimNumber: 1,
          claimText: "Coastal levees have just breached and Highway 10 is currently submerged under 6 feet of water.",
          status: "Misleading context",
          confidence: 0.91,
          explanation:
            "DEMO DATA: This event took place during Hurricane Harvey in August 2017. Current weather radar and municipal transportation cameras show completely dry conditions and normal traffic flow today.",
          evidence: [
            {
              type: "contradicting",
              title: "State Department of Transportation Live Roadway Feed",
              snippet:
                "Highway 10 reports clear lanes and zero flooding alerts across all coastal sectors today.",
              sourceName: "Department of Transportation Live Sensor Network",
              url: "https://dot.gov/traffic",
              publicationDate: "Current",
              isAIGenerated: false,
            },
            {
              type: "related",
              title: "National Weather Service Hurricane Harvey Historical Archive",
              snippet:
                "Historical record of August 28, 2017 levee crests and Highway 10 closures during peak rainfall.",
              sourceName: "National Weather Service Archive",
              url: "https://weather.gov/historical/harvey",
              publicationDate: "2017-08-28",
              isAIGenerated: false,
            },
          ],
        },
        {
          claimNumber: 2,
          claimText: "A mandatory evacuation has just been ordered for all southern metro residents right now.",
          status: "Contradicted",
          confidence: 0.93,
          explanation:
            "Local emergency management agencies have issued zero active evacuation orders today.",
          evidence: [
            {
              type: "contradicting",
              title: "Office of Emergency Management Official Alert Board",
              snippet:
                "No active warnings or evacuation advisories in effect. Public cautioned against recirculated legacy disaster footage.",
              sourceName: "County Emergency Management Office",
              url: "https://oem.gov",
              isAIGenerated: false,
            },
          ],
        },
      ],
      clickbait: {
        isClickbait: true,
        score: 75,
        indicators: [
          "Fabricated breaking news urgency ('BREAKING NEWS RIGHT NOW')",
          "Omission of original event date",
          "Sensational crisis punctuation",
        ],
        flaggedPhrases: [
          "BREAKING NEWS RIGHT NOW",
          "Immediate mandatory evacuation",
          "Seek high ground immediately!",
        ],
        explanation:
          "The text weaponizes legitimate historical catastrophe footage by stripping temporal context to harvest viral engagement.",
      },
      languageAnalysis: {
        sentiment: "Negative",
        emotionalIntensity: 88,
        fearScore: 90,
        angerScore: 25,
        sensationalScore: 82,
        loadedWords: ["Catastrophic", "breached", "submerged", "overwhelmed", "immediately"],
        framing: "Crisis Emergency Dispatch",
        toneSummary: "Extreme urgency, direct panic commands.",
      },
      sourceAnalysis: {
        publisher: "Metro News Today (Social Repost)",
        domain: "social-share.xyz",
        author: "Community Contributor",
        publicationDate: "2017-08-28 / Reshared Today",
        transparencyScore: 35,
        indicators: {
          authorIdentified: false,
          publicationDateAvailable: false,
          sourcesCited: false,
          primarySourcesReferenced: false,
          editorialInfoAvailable: false,
        },
        credibilityNote:
          "Repost account recycling historical natural disaster media without archival disclaimers.",
      },
      evidence: [
        {
          type: "contradicting",
          title: "DOT Traffic Surveillance Check",
          snippet: "Highways operating normally with no standing water or closures.",
          sourceName: "State Highway Patrol",
          url: "https://highways.state.gov",
          isAIGenerated: false,
        },
      ],
      context: {
        originalPublicationDate: "2017-08-28",
        analysisDate: "Current",
        isOutdatedContext: true,
        timeGapWarning: "Significant temporal distortion: Event occurred ~7 years ago.",
        contextExplanation:
          "The reported flooding occurred in August 2017 during Hurricane Harvey. Resharing this as current breaking news creates false emergency panic.",
      },
      limitations: [
        "Visual media reverse-search matched imagery to August 2017 news coverage.",
      ],
      isDemo: true,
    },
  },
];
