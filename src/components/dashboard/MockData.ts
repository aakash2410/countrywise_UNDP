export interface RadarDataPoint {
  parameter: string;
  Malaysia: number;
  Cambodia: number;
  Philippines: number;
  Bangladesh: number;
  Nepal: number;
  fullMark: number;
}

export const radarData: RadarDataPoint[] = [
  { parameter: 'AI Ecosystem Maturity', Malaysia: 4, Cambodia: 2, Philippines: 3, Bangladesh: 2, Nepal: 2, fullMark: 5 },
  { parameter: 'DPI Ecosystem Maturity', Malaysia: 3, Cambodia: 4, Philippines: 4, Bangladesh: 3, Nepal: 4, fullMark: 5 },
  { parameter: 'Digital Infra Availability', Malaysia: 5, Cambodia: 2, Philippines: 2, Bangladesh: 2, Nepal: 3, fullMark: 5 },
  { parameter: 'Political Stability', Malaysia: 4, Cambodia: 4, Philippines: 4, Bangladesh: 2, Nepal: 2, fullMark: 5 },
  { parameter: 'Stakeholder Participation', Malaysia: 3, Cambodia: 3, Philippines: 3, Bangladesh: 3, Nepal: 2, fullMark: 5 },
  { parameter: 'Funding Landscape', Malaysia: 3, Cambodia: 2, Philippines: 4, Bangladesh: 3, Nepal: 1, fullMark: 5 },
];

export interface MetricCard {
  title: string;
  status: string;
  description: string;
  implementationAgency?: string;
  modalDetails?: {
    fullContext: string;
    keyMetrics: string[];
    timeline?: string;
  };
}

export interface Actor {
  id: string;
  name: string;
  type: string;
  role: string;
  initiatives: string[];
}

export interface SubParameterStage {
  name: string;
  stage: string;
}

export interface ParameterStageEntry {
  parameter: string;
  parameterStage: string;
  subParameters: SubParameterStage[];
}

export interface InsightPoint {
  id: string;
  text: string;
}

export interface CountryDetailData {
  countryName: string;
  dpiEcosystem: {
    digitalId: MetricCard;
    payments: MetricCard;
    dataExchange: MetricCard;
    useCases?: { sector: string; description: string }[];
  };
  aiEcosystem: {
    policy: MetricCard;
    governance: MetricCard;
    legislation: MetricCard;
    initiatives: MetricCard;
  };
  sectionB: {
    fundingLandscape?: string;
    electricityAccess: number;
    internetPenetration: number;
    deviceAccess?: number;
    digitalInclusion?: string;
    dataCenters?: string;
    politicalStability: string;
    electionCycles: string;
    infraModalDetails?: {
      fullContext: string;
      keyMetrics: string[];
      timeline?: string;
    };
    leadershipQuote?: {
      text: string;
      author: string;
      context: string;
    };
    politicalModalDetails?: {
      fullContext: string;
      keyMetrics: string[];
      timeline?: string;
    };
    politicalSubParameters?: {
      label: string;
      value: string;
    }[];
  };
  sectionC: {
    actors: Actor[];
  };
  sources?: string[];
  sectionD: {
    opportunities: InsightPoint[];
    risks: InsightPoint[];
    partnerships: InsightPoint[];
  };
  parameterStages?: Record<string, ParameterStageEntry>;
}

export const malaysiaData: CountryDetailData = {
  countryName: 'Malaysia',
  dpiEcosystem: {
    digitalId: {
      title: 'Digital ID', status: 'Maturing', description: 'MyDigital ID (8.7M users)', implementationAgency: 'My Digital ID Sdn Bhd',
      modalDetails: {
        fullContext: "MyDigital ID (RM80M allocation) is a secure government-backed digital identity enabling single sign-on for online portals, with 8.7M registered users. Goal: 95% of federal services integrated by 2030.",
        keyMetrics: [
          "RM80 million budget allocation",
          "Registration began in 2024 via MyGOV Malaysia",
          "Identity verification without storing personal data"
        ],
        timeline: ""
      }
    },
    payments: {
      title: 'Digital Payments', status: 'Maturing', description: 'DuitNow (5.3 bn transactions)', implementationAgency: 'PayNet',
      modalDetails: {
        fullContext: "The Real-time Retail Payments Platform (DuitNow), launched in 2018 and operated by PayNet, facilitated 5.3 billion transactions (RM5.4T value) in 2024. Over 70% of the adult population has made at least one digital payment.",
        keyMetrics: [
          "Real-time Retail Payments Platform (RPP) launched in 2018",
          "Enables real-time, data-rich payments between accounts",
          "Operated by PayNet (merger of MEPS and MyClear)",
          "5.3 billion transactions recorded in 2024, representing RM5.4T transaction value"
        ],
        timeline: ""
      }
    },
    dataExchange: {
      title: 'Data Exchange', status: 'Maturing', description: 'MYGDX (35 million transactions)', implementationAgency: 'MAMPU',
      modalDetails: {
        fullContext: "The Malaysian Government Central Data Exchange (MyGDX), managed by MAMPU since 2018, supports 657 users and 35 million transactions to empower data-driven governance across ministries.",
        keyMetrics: [
          "Enhances end-to-end (E2E) online services towards a data-driven government",
          "Reduces cost of infrastructure and system integration",
          "MyGDX currently supports 657 users and 35 million transactions"
        ],
        timeline: ""
      }
    },
    useCases: [
      { sector: 'Government Services', description: 'Single sign-on via MyGovernment portal (managed by JDN) — goal: 95% federal services integrated with MyDigital ID by 2030' },
      { sector: 'Telecommunications', description: 'SIM card registration linked to MyDigital ID for identity verification' },
      { sector: 'Social Protection', description: 'Sumbangan Tunai Rahmah (STR) — G2P cash transfer program channelled via digital payment rails' },
    ],
  },
  aiEcosystem: {
    policy: {
      title: 'AI Strategy', status: 'Maturing', description: 'Malaysia Artificial Intelligence Roadmap 2021-2025', implementationAgency: 'Malaysian National AI Office (NAIO)',
      modalDetails: {
        fullContext: "Malaysia's AI Roadmap 2021-2025, overseen by the National AI Office (est. 2024), aims to augment jobs and drive innovation across 5 priority sectors. As of Q3 2024, implementation stands at 63% completion.",
        keyMetrics: [
          "Malaysia's Artificial Intelligence Roadmap 2021-2025",
          "Aims to augment jobs and drive national competitiveness",
          "Six envisioned outcomes including AI governance, R&D, and talent",
          "RM285M allocated to MOSTI for AI governance and RM10M for National AI Office (NAIO) in 2025 Budget"
        ],
        timeline: ""
      }
    },
    governance: {
      title: 'AI Governance', status: 'Early Success', description: 'National Guidelines on AI Governance and Ethics (AIGE)', implementationAgency: 'Malaysian National AI Office (NAIO)',
      modalDetails: {
        fullContext: "Guided by the voluntary National Guidelines on AI Governance & Ethics (AIGE), Malaysia aims for safe and trustworthy AI deployment built on seven core principles. No AI-specific legislation is enacted yet.",
        keyMetrics: [
          "Built on 7 AI Principles including fairness, reliability, and human-centricity",
          "Structured across three levels: Users, Regulators, and Developers",
          "Guided by National Guidelines (AIGE) and ASEAN AI guide"
        ],
        timeline: ""
      }
    },
    legislation: {
      title: 'Data Legislation', status: 'Maturing', description: 'Data Protection and Privacy Laws', implementationAgency: 'Department of Personal Data Protection',
      modalDetails: {
        fullContext: "Governed by the Personal Data Protection (Amendment) Act 2024, enforced by the JPDP. Malaysia scores 4.17/5 in data privacy and 5/5 in cybersecurity on the UNDP Digital Development Compass.",
        keyMetrics: [
          "Personal Data Protection (Amendment) Act 2024 addresses privacy",
          "Score of 4.17/5 in data and privacy (UNDP Digital Development Compass)",
          "Score of 5/5 in cybersecurity (UNDP Digital Development Compass)"
        ],
        timeline: ""
      }
    },
    initiatives: {
      title: 'Government AI Initiatives', status: 'Maturing', description: 'AI in Healthcare & Digital Hospitals', implementationAgency: 'Ministry of Health',
      modalDetails: {
        fullContext: "11 national AI use cases defined across healthcare, agriculture, smart cities, education, and public services. Key deployments include DR. MATA for diabetic retinopathy, AI traffic analysis in Kuala Lumpur, and the National Fraud Portal.",
        keyMetrics: [
          "MySejahtera: Public Health Digital Gateway",
          "DR MATA: AI-Based Diabetic Retinopathy Screening",
          "Cof’e: AI-Driven Cough Sound Screening for COVID-19",
          "CODIC-MY: AI-Powered Remote Monitoring"
        ],
        timeline: ""
      }
    },
  },
  sectionB: {
    fundingLandscape: "The 2025 Budget allocates RM285M to MOSTI for AI governance and RM10M for NAIO. Between 2021-2023, Malaysia attracted RM114.7B in data centre investments. In 2024, over USD 18B in foreign AI investments were secured from Microsoft, Google, ByteDance, and Oracle.",
    electricityAccess: 100, // 100% access to electricity (World Bank, 2022) 
    internetPenetration: 97.7, // 97.7% internet penetration rate (ITU, 2024)
    deviceAccess: 95.5,
    digitalInclusion: "Nearly equal access for men and women, urban and rural areas.",
    dataCenters: '87 data centres as of Nov 2024; RM114.7B in data centre and cloud investments (2021-2023)',
    politicalStability: 'Political stability improved from 2014 to 2024 by ~5 percentage points (67.4 to 72.47) (Source: WB WGI 2024)',
    electionCycles: '5 years (Next: Nov-Dec 2027)',
    politicalSubParameters: [
      { label: 'Elections', value: '5-year cycle (last: Nov 2022). Historical instability since 2020 led to changes in coalition governments.' },
      { label: 'Governance Structure', value: 'Federal Parliamentary Democracy under a Constitutional Monarchy with distinct Executive, Judicial, and Legislative branches.' },
      { label: 'Political Stability', value: 'Stable but fragile. Ranked 44/167 (Flawed Democracy). Metrics: Accountability (54.6), Stability (72.4), Rule of Law (62.9).' },
      { label: 'Institutional Capacity', value: 'Strong focus on digital upskilling via MyDIGITAL, Public Sector AI Guidelines, and private partnerships (e.g., Microsoft). Lacks a uniform training mandate.' },
      { label: 'Leadership Champions', value: 'Prime Minister Anwar Ibrahim and Minister of Digital Gobind Singh Deo are vocal advocates for inclusive, AI-driven transformation.' },
      { label: 'Key Influencers', value: 'MOSTI AI Governance Structures, National Digital Economy Council (MED4IRN), and the Prime Minister\'s Office.' }
    ],
    leadershipQuote: {
      text: "The digital transformation of our nation must be inclusive, ensuring that no one is left behind in reaping its benefits.",
      author: "Datuk Seri Anwar Ibrahim",
      context: "Prime Minister of Malaysia"
    }
  },
  sectionC: {
    actors: [
      { id: 'm1', type: 'Lead Agency & Govt Coordination', name: 'Ministry of Digital, MOSTI, MAMPU, NAIO', role: 'Decision-makers & Implementers', initiatives: ['National AI Roadmap 2021-2025', 'National Guidelines on AI Governance and Ethics', 'RM285M MOSTI + RM10M NAIO budget allocation', '8 agencies under Ministry of Digital coordinating across ministries'] },
      { id: 'm2', type: 'Private Sector', name: 'Toshiba, Microsoft, Google, AWS, YTL Power, ByteDance, Oracle', role: 'Implementers & Co-Investors', initiatives: ['Microsoft: USD 2.2B for cloud and AI services', 'Google: USD 2B for first data centre region', 'YTL Power: Developing Ilmu 0.1, a Malaysian LLM', '284 AI companies, targeting 900 by 2026'] },
      { id: 'm3', type: 'Development Partners & MDBs', name: 'MYCentre4IR (WEF), UNESCO, UNDP', role: 'Advisory & Strategy Support', initiatives: ['MYCentre4IR connects NAIO with global WEF experts', 'AI Readiness Assessment Methodology (RAM)', 'Co-developing thought leadership publications'] },
      { id: 'm4', type: 'Academic & Research', name: 'UTM (CAIRO), UM (MALAYA AIR), UMS (AiRU), Nottingham Malaysia', role: 'R&D & Talent Pipeline', initiatives: ['Centre for AI and Robotics (CAIRO) at UTM', 'RM50M AI education budget across research universities', 'AI Sandbox 2024 Pilot', 'Curriculum development and talent pipelines'] },
      { id: 'm5', type: 'Civil Society', name: 'PIKOM, MIFA, Women in AI', role: 'Advocacy & Inclusion', initiatives: ['Promoting AI literacy and digital inclusion', 'Gender equity in AI adoption', 'Quadruple Helix Model engagement'] },
    ],
  },
  sectionD: {
    opportunities: [
      { id: 'co1', text: 'UNDP can provide technical support on regulatory design for AI Governance and Regulatory Frameworks, drawing on examples from other countries such as Singapore' },
      { id: 'co2', text: 'Malaysia is one of the most AI-mature countries in the Digital Stewardship Community. UNDP can position it as a knowledge contributor - the country can share its experience in developing an AI strategy, establishing a dedicated AI agency, implementing use cases, and building AI infrastructure etc. with earlier-stage countries in the region.' },
      { id: 'co3', text: 'The government wants to grow its AI startup base from 284 to 900 companies by 2026. UNDP can support in an innovation accelerator program to provide grants and mentorship for startups focusing on AI for Good the startups. They can also support in creating an AI Sandbox initiative.' },
    ],
    risks: [
      { id: 'cr1', text: 'AI adoption is accelerating across healthcare, finance, and agriculture, yet Malaysia’s AI ethics guidelines remain voluntary and non-binding. Without enforceable standards, biased or opaque algorithms in public services could erode citizen trust, creating a risk of AI adoption without accountability.' },
      { id: 'cr2', text: 'Malaysia has invested heavily in individual DPI components, but integration between foundational DPI assets remains limited. Without deliberate interoperability design and careful sequencing of use cases, Malaysia risks not achieving its 2030 target of integrating 95% of services. As a result, despite significant public investment in infrastructure, citizen-facing outcomes may remain limited' },
    ],
    partnerships: [
      { id: 'cp1', text: 'Partnership with National AI Office (NAIO) - NAIO was established in 2024 and is still building operational capacity. UNDP can establish an advisory relationship with NAIO. UNDP can suuport the transition of voluntary AI ethics guidelines into an enforceable regulatory framework and can provide support in the capacity building of officials.' },
      { id: 'cp2', text: 'Partnership with Malaysia Digital Economic Corporation (MEDC) and MyDIGITAL Corporation - UNDP can engage with these agencies to co-design a DPI interoperability roadmap and prioritise citizen-centric use cases and support the achievement of the 2030 target of integrating 95% of services with Digital ID.' },
      { id: 'cp3', text: 'Partnership with NAIO and Microsoft - Microsoft, NAIO, and PETRONAS Leadership Centre are jointly establishing an AI Center focused on developing real-world AI solutions and nurturing talent. UNDP can engage this initiative to co-design an AI for Good accelerator track that directs mentorship, grants, and sandbox access toward startups working on development challenges in areas like healthcare, agriculture, and social protection. With the government targeting growth from 284 to 900 AI companies by 2026, UNDP can play a focused role in ensuring a share of this startup growth is channelled toward public interest outcomes.' },
    ]
  },
  parameterStages: {
    P1: {
      parameter: 'AI Ecosystem Maturity', parameterStage: 'Maturing', subParameters: [
        { name: 'IMF AI Preparedness Index (AIPI)', stage: 'Maturing' },
        { name: 'National AI Strategy / Policy Status', stage: 'Maturing' },
        { name: 'AI Governance & Ethical AI Principles', stage: 'Early Success' },
        { name: 'Data Protection & Privacy Legislation', stage: 'Maturing' },
        { name: 'Government AI Initiatives & Projects', stage: 'Maturing' },
      ]
    },
    P2: {
      parameter: 'DPI Ecosystem Maturity', parameterStage: 'Early Success', subParameters: [
        { name: 'National Digital Transformation Strategy', stage: 'Maturing' },
        { name: 'Digital ID', stage: 'Maturing' },
        { name: 'Digital Payments', stage: 'Maturing' },
        { name: 'Data Exchange', stage: 'Maturing' },
        { name: 'Use Cases of DPI Assets', stage: 'Early Success' },
      ]
    },
    P3: {
      parameter: 'Digital-Physical Infrastructure', parameterStage: 'Role Model', subParameters: [
        { name: 'Electricity Access & Reliability', stage: 'Role Model' },
        { name: 'Internet Penetration', stage: 'Maturing' },
        { name: 'Compute & Cloud Capacity', stage: 'Maturing' },
        { name: 'Digital Inclusion', stage: 'Role Model' },
      ]
    },
    P4: {
      parameter: 'Political Stability & Governance', parameterStage: 'Maturing', subParameters: [
        { name: 'WB Political Stability Score (2024)', stage: 'Maturing' },
      ]
    },
    P5: {
      parameter: 'Stakeholder Participation', parameterStage: 'Early Success', subParameters: [
        { name: 'Lead Agency & Govt Coordination', stage: 'Maturing' },
        { name: 'Private Sector Engagement', stage: 'Early Success' },
        { name: 'Development Partners & MDBs', stage: 'Open to Adopt' },
        { name: 'Academic & Research Institutions', stage: 'Maturing' },
        { name: 'Civil Society Engagement', stage: 'Early Success' },
      ]
    },
    P6: {
      parameter: 'Funding Landscape', parameterStage: 'Early Success', subParameters: [
        { name: 'Domestic Public Budget for AI/DPI', stage: 'Early Success' },
      ]
    },
  },
  sources: ["https://mastic.mosti.gov.my/publication/artificial-intelligence-roadmap-2021-2025/", "https://mastic.mosti.gov.my/publication/the-national-guidelines-on-ai-governance-ethics/", "https://asean.org/book/asean-guide-on-ai-governance-and-ethics/", "https://www.unesco.org/ethics-ai/en/malaysia", "https://digitaldevelopmentcompass.undp.org/country/MYS", "https://www.mygov.gov.my/ms-MY", "https://www.digital-id.my/_next/about", "https://www.mosti.gov.my/wp-content/uploads/2023/12/PR-231212-MYDIGITAL-ID-REGISTRATION-FOR-THE-GENERAL-PUBLIC-WILL-COMMENCE-IN-MARCH-2024.pdf", "https://www.thestar.com.my/news/nation/2026/02/24/weaknesses-in-management-and-expenditure-of-mydid-project-revealed", "https://fastpayments.worldbank.org/sites/default/files/2021", "https://www.malaysia.gov.my/en", "https://www.biometricupdate.com/202510/malaysia-targets-15m-mydigital-id-users-2026-funds-allocated", "https://malaysia.news.yahoo.com/only-2-8-million-malaysians-044521446.html", "https://www.malaymail.com/news/malaysia/2026/01/17/mydigital-id-hits-87-million-users-sets-sights-on-15-million-sign-ups-with-e-hailing-boost/205833", "https://fastpayments.worldbank.org/sites/default/files/2021-09/World_Bank_FPS_Malaysia_RPP_Case_Study.pdf", "https://paynet.my/", "https://en.wikipedia.org/wiki/Elections_in_Malaysia", "https://en.wikipedia.org/wiki/2022_Malaysian_general_election", "https://www.electiondata.my/elections", "https://www.malaysia.gov.my/en/government/sistem-pemerintahan-negara/federal-government", "https://www.eiu.com/n/campaigns/democracy-index-2024-confirmation/", "https://www.worldbank.org/en/publication/worldwide-governance-indicators/interactive-data-access", "https://www.ai.gov.my/", "https://www.ai.gov.my/thought-leadership"]
};

export const cambodiaData: CountryDetailData = {
  countryName: 'Cambodia',
  dpiEcosystem: {
    digitalId: {
      title: 'Digital ID', status: 'Early Success', description: 'CamDigiKey (86k Users)', implementationAgency: 'MEF',
      modalDetails: {
        fullContext: "CamDigiKey, launched by the Ministry of Economy & Finance, serves as Cambodia's national e-KYC platform. With only ~86K downloads out of 18M population, adoption is concentrated in business-related government services.",
        keyMetrics: [
          "Targeted in Phase 1 (2021-2025) of the Digital Economy Framework",
          "Focus restricted to foundational E-ID and payment gateways",
          "CamDigiKey adoption currently stands at ~86,000 users"
        ],
        timeline: ""
      }
    },
    payments: {
      title: 'Digital Payments', status: 'Maturing', description: 'Bakong (60% adult population)', implementationAgency: 'NBC',
      modalDetails: {
        fullContext: "Bakong, Cambodia's sovereign blockchain-based digital payment system under the National Bank of Cambodia, achieves ~100M transactions per month and reaches 60% of the adult population.",
        keyMetrics: ["Reaches 60% of the adult population", "Operates across local banks and e-wallets", "Blockchain-enabled architecture"],
        timeline: "Launched 2020"
      }
    },
    dataExchange: {
      title: 'Data Exchange', status: 'Maturing', description: 'CamDX', implementationAgency: 'Techo Startup Center',
      modalDetails: {
        fullContext: "CamDX is the unified data exchange layer for the Cambodian government, deployed across 22 ministries and processing 1M transactions monthly. It also powers Verify.gov.kh for secure document verification.",
        keyMetrics: ["Managed by MEF", "Powers Verify.gov.kh", "Core to Cambodian e-gov architecture", "Verify.gov Cambodia successfully integrated for national government document verification"],
        timeline: "Launched 2020"
      }
    },
    useCases: [
      { sector: 'Financial Services', description: 'CamDigiKey used for e-KYC authentication across banks and financial institutions' },
      { sector: 'E-Government', description: 'CamDigiKey integrated into e-Government services for citizen identity verification' },
      { sector: 'Business Registration', description: 'Major adoption in business registration workflows via digital identity and data exchange layers' },
      { sector: 'Document Verification', description: 'Verify.gov.kh — blockchain-powered platform for secure government document verification' },
    ],
  },
  aiEcosystem: {
    policy: {
      title: 'AI Strategy', status: 'Open to Adopt', description: 'National AI Strategy 2025-30', implementationAgency: 'Ministry of Post and Telecommunications',
      modalDetails: {
        fullContext: "The National AI Strategy 2025-30 (drafted by MPTC) outlines six strategic priorities including a skilled workforce, digital government excellence, Khmer language inclusion via a national LLM, and establishing a National AI and Data Science Lab.",
        keyMetrics: [
          "Draft National AI Strategy 2025-30",
          "Establishing a National AI and Data Science Lab",
          "Strategic push for Khmer Large Language Model (LLM)",
          "AI Strategy is integrated into the $10.1B national budget, targeting an R&D rise from current 0.09% GDP"
        ],
        timeline: "Drafted 2024"
      }
    },
    governance: {
      title: 'AI Governance', status: 'Open to Adopt', description: 'AI Readiness Assessment', implementationAgency: 'Ministry of Post and Telecommunications (MPTC)',
      modalDetails: {
        fullContext: "AI governance is being built through UNESCO RAM recommendations and the National AI Strategy. Cambodia scored 55/100 in the UNESCO AI Readiness Assessment, with data protection and cybersecurity laws still in draft stage.",
        keyMetrics: [
          "Scored 55 out of 100 in UNESCO AI Readiness Assessment",
          "Implementing a 'soft law' approach guided by UNESCO RAM",
          "Foundational laws on Data Protection and Cybersecurity drafted, pending consultation"
        ],
        timeline: "Drafted 2024"
      }
    },
    legislation: {
      title: 'Data Legislation', status: 'Open to Adopt', description: 'Data protection and Privacy regulation', implementationAgency: 'Ministry of Post and Telecommunications (MPTC)',
      modalDetails: {
        fullContext: "Sub-Decree 252 governs only MOI-held personal data. A comprehensive Draft Law on Personal Data Protection was released for public consultation in July 2025, expected to create a broader legal framework.",
        keyMetrics: [
          "Sub-Decree 252 applies only to Ministry of Interior identification data",
          "Draft Law on Personal Data Protection released for public consultation (July 2025)"
        ],
        timeline: "Expected to pass in 2026"
      }
    },
    initiatives: {
      title: 'Government AI Initiatives', status: 'Early Success', description: 'National Research Center on AI & Landmine mapping', implementationAgency: 'CMAC & MPTC',
      modalDetails: {
        fullContext: "Key initiatives include AI-assisted landmine detection (CMAC), the National Research Center on AI for Education (inaugurated Nov 2025), and a partnership with AI Singapore to develop an open-source Khmer Large Language Model.",
        keyMetrics: [
          "National Research Center on AI for Education inaugurated (Nov 2025)",
          "AI-assisted Landmine detection targeting a landmine-free status by 2030",
          "Developing an open-source Khmer Large Language Model with Singapore"
        ],
        timeline: ""
      }
    },
  },
  sectionB: {
    fundingLandscape: "The government approved over $10B in investments in 2025, with AI/DPI R&D targeted to rise from 0.09% of GDP. However, dedicated domestic public funding for AI/DPI remains limited, with heavy reliance on external development assistance and annual project-tied approvals.",
    electricityAccess: 92.3,
    internetPenetration: 60.0,
    digitalInclusion: "Stark urban-rural gap with internet usage concentrated among young urban users. UNICEF reports digital literacy restrictions for rural women.",
    dataCenters: '4 modern data centres established; cloud services sparsely available. Only 11% of institutions have on-premises GPU processors',
    politicalStability: 'WB Political Stability: 68th percentile (Maturing). Authoritarian Regime — 123/169 (Source: Democracy Index 2024)',
    electionCycles: '5-year cycle (Previous: 2023-24; Next: 2028-29)',
    politicalSubParameters: [
      { label: 'Elections', value: '5-year cycle (last: 2023-24; next: 2028-29). Predominantly one-party governance model — could track key people of interest and their ministerial terms.' },
      { label: 'Governance Structure', value: 'Constitutional Monarchy with a Parliamentary system, governed centrally by mostly one-party rule.' },
      { label: 'Political Stability', value: 'WB Political Stability at 68th percentile (Maturing). Democracy Index 2024: Authoritarian (123/169). Cambodia-Thailand border tensions could escalate, potentially shifting priorities from DT toward national security.' },
      { label: 'Digital Priority', value: 'Strong and growing. Pentagonal Strategy Phase I places human development and digital transformation as core pillars. National AI Strategy drafted, National Research Center on AI for Education inaugurated Nov 2025.' },
      { label: 'Institutional Capacity', value: 'DataBank Performance Indicators show increasing capacity (2019-2023), especially in institutional data collection. Digital transformation policies are gaining institutional depth.' },
      { label: 'Leadership Champions', value: 'PM Hun Manet (Digital Revolution emphasis); H.E. Chea Vandeth (Minister of PTC, Head of Digital Governance Committee, ethics-technology balance); H.E. Sam Sethserey (DG of ICT at MPTC, cybersecurity & startup ecosystem); Seng Molika (DDG of STI at MISTI, DT unit lead).' },
      { label: 'Key Influencers', value: 'MPTC (backbone and governance), MISTI (R&D and adoption), Working Group on AI and Data Science R&D (drafted the National AI Strategy).' }
    ],
    leadershipQuote: {
      text: "Building a digital economy and society is a key priority to drive new economic growth and realize the vision of becoming a high-income country by 2050.",
      author: "Hun Manet",
      context: "Prime Minister of Cambodia (Digital Government Forum 2024)"
    }
  },
  sectionC: {
    actors: [
      { id: 'c1', type: 'Lead Agency & Govt Coordination', name: 'MPTC, MISTI, MEF', role: 'Decision-maker & Lead', initiatives: ['National AI Strategy 2025-30 (drafted by MPTC)', 'Digital Economy and Society Policy Framework 2021-2035', 'No single agency for overall DT — fragmented across ministries'] },
      { id: 'c2', type: 'Private Sector', name: 'Techo Startup Center, First Cambodia, Smart Axiata, Alibaba Cloud', role: 'Implementer & Incubator', initiatives: ['Techo Startup Center: govt-supported private incubator/accelerator', 'Smart Axiata works with MPTC on connectivity', 'Alibaba Cloud increasing presence in Cambodia'] },
      { id: 'c3', type: 'Development Partners & MDBs', name: 'UNESCO, ADB, UN ESCAP, AI Singapore', role: 'Technical Expertise & Funding', initiatives: ['~$3.1B in ADB concessional loans/SDRs', 'UNESCO "AI Ethics Experts Without Borders"', 'MoU with AI Singapore for open-source Khmer LLM'] },
      { id: 'c4', type: 'Academic & Research', name: 'Cambodia Academy of Digital Technology (CADT)', role: 'Research & Capacity Building', initiatives: ['Co-drafted the National AI Strategy', 'National Research Center on AI for Education (inaugurated Nov 2025)', 'Part of country\'s capacity building efforts'] },
      { id: 'c5', type: 'Civil Society', name: 'Development Innovations Project, Civil Society Consultations', role: 'Advocacy & Digital Literacy', initiatives: ['Cambodian Development Innovations Project (since 2013)', 'Civil societies actively consulted during NAS formulation', 'Internet penetration rose from 6.8% to 56.7% (2013-2024)'] },
    ],
  },
  sectionD: {
    opportunities: [
      { id: 'kh-o1', text: 'KhmerLLM for eGov: Operationalising and integrating KhmerLLM to make eGov services more accessible for the ~95% of citizens using the Khmer language.' },
      { id: 'kh-o2', text: 'Cyber-Resilience & Guidelines: Partnering with MPTC to prevent misinformation and deepfakes by operationalising specific guidelines and defensive tools.' },
      { id: 'kh-o3', text: 'Democratising AI: Addressing gender, language, and urban/rural divides through programs that democratise AI access and technical capacity.' },
    ],
    risks: [
      { id: 'kh-r1', text: 'Institutional Fragmentation: Digital initiatives are currently split across MPTC, MISTI, and MEF, leading to coordination challenges.' },
      { id: 'kh-r2', text: 'Political Prioritisation: Possible de-prioritisation of Digital Transformation if current regional or domestic conflicts escalate.' },
      { id: 'kh-r3', text: 'Data Scarcity: Extremely limited digital text and audio data available for training the Khmer-based LLM despite widespread language use.' },
    ],
    partnerships: [
      { id: 'kh-p1', text: 'CADT Collaboration: Partnering with the Cambodia Academy of Digital Technology for inclusive capacity building and equitable representation in research.' },
      { id: 'kh-p2', text: 'Cloud Compute Expansion: Working with technical institutions to increase GPU and cloud access, which currently sits at only 11%.' },
      { id: 'kh-p3', text: 'CamDigiKey Adoption: Partnering with the Ministry of Economics and Finance (MEF) to increase adoption of CamDigiKey and assess barriers via KIIs.' },
    ],
  },
  parameterStages: {
    P1: {
      parameter: 'AI Ecosystem Maturity', parameterStage: 'Open to Adopt', subParameters: [
        { name: 'IMF AI Preparedness Index (AIPI)', stage: 'Open to Adopt' },
        { name: 'National AI Strategy / Policy Status', stage: 'Open to Adopt' },
        { name: 'AI Governance & Ethical AI Principles', stage: 'Open to Adopt' },
        { name: 'Data Protection & Privacy Legislation', stage: 'Open to Adopt' },
      ]
    },
    P2: {
      parameter: 'DPI Ecosystem Maturity', parameterStage: 'Maturing', subParameters: [
        { name: 'National Digital Transformation Strategy', stage: 'Maturing' },
        { name: 'Digital ID', stage: 'Early Success' },
        { name: 'Digital Payments', stage: 'Maturing' },
        { name: 'Data Exchange', stage: 'Maturing' },
        { name: 'Availability / Deployment Use Cases', stage: 'Early Success' },
      ]
    },
    P3: {
      parameter: 'Digital-Physical Infrastructure', parameterStage: 'Open to Adopt', subParameters: [
        { name: 'Electricity Access & Reliability', stage: 'Early Success' },
        { name: 'Internet Penetration', stage: 'Greenfield' },
        { name: 'Compute & Cloud Capacity', stage: 'Early Success' },
        { name: 'Digital Inclusion', stage: 'Open to Adopt' },
      ]
    },
    P4: {
      parameter: 'Political Stability & Governance', parameterStage: 'Maturing', subParameters: [
        { name: 'WB Political Stability Score (2024)', stage: 'Maturing' },
      ]
    },
    P5: {
      parameter: 'Stakeholder Participation', parameterStage: 'Early Success', subParameters: [
        { name: 'Lead Agency & Govt Coordination', stage: 'Open to Adopt' },
        { name: 'Private Sector Engagement', stage: 'Open to Adopt' },
        { name: 'Development Partners & MDBs', stage: 'Early Success' },
        { name: 'Academic & Research Institutions', stage: 'Early Success' },
        { name: 'Civil Society Engagement', stage: 'Early Success' },
      ]
    },
    P6: {
      parameter: 'Funding Landscape', parameterStage: 'Open to Adopt', subParameters: [
        { name: 'Domestic Public Budget for AI/DPI', stage: 'Open to Adopt' },
      ]
    },
  },
  sources: ["https://oecd.ai/en/data", "https://data.opendevelopmentcambodia.net/en/dataset/5524b0b4-bb31-4cad-abf4-a36f8e82073d/resource/a35e29b9-3dbf-4a5d-92a9-4d3558ed3c03/download/nais-v5-en-for-consultation-clean.pdf", "https://www.unesco.org/ethics-ai/en/global-hub", "https://www.unesco.org/ethics-ai/en/cambodia", "https://www.dlapiperdataprotection.com/", "https://www.dlapiperdataprotection.com/?t=law&amp;c=KH#insight", "https://www.nec.com/en/press/202510/global_20251029_04.html", "https://www.worldbank.org/en/programs/govtech/gtmi-2025-update", "https://datahub.itu.int/dashboards/idi/?e=BGD&amp;y=2025", "https://dpimap.org/", "https://camdigikey.gov.kh/en", "https://bakong.nbc.gov.kh/en/", "https://camdx.gov.kh/", "https://dpiexplorer.org/explore", "http://verify.gov/", "https://verify.gov.kh/", "https://kiripost.com/stories/nbcs-bakong-charts-transaction-growth-at-13b-in-2025", "https://www.khmertimeskh.com/501517074/camdx-sees-13-increase-in-usage-to-17-3m-transactions/", "https://www.itu.int/reports/wsis-gdc-implementation/objectives/gdc-objective-4/data-for-sustainable-development-goals/", "https://kiripost.com/stories/cambodias-untold-digital-divide-why-not-all-daughters-get-to-imagine-a-different-future", "https://www.eiu.com/n/global-themes/democracy-index/", "https://cambodianess.com/article/hun-manet-says-teachers-catalysts-of-cambodias-ai-transformation", "https://databank.worldbank.org/reports.aspx?dsid=31&amp;series=IQ.CPA.MACR.XQ", "https://docs.google.com/spreadsheets/d/1vNBjyTfs7Ysur_2Zwu3cPb26NQurQAkcQp_InWwLI0Y/edit?gid=0#gid=0", "https://theinvestor.vn/cambodia-focuses-on-digital-revolution-d9023.html#:~:text=By%20Vietnam%20News%20Agency,growth%20and%20improve%20social%20welfare.", "https://www.mordorintelligence.com/industry-reports/cambodia-ict-market/companies", "https://firstcambodia.com.kh/", "https://www.alibabacloud.com/en/campaign/cambodia-contact-us?_p_lc=1#:~:text=Secure%2C%20convenient%2C%20and%20private%20connections,private%20domain%20name%20management%20service", "https://www.zoominfo.com/top-lists/top-telecommunications-companies-in-KH", "https://cambodia.un.org/en/about/un-entities-in-country?afd_azwaf_tok=eyJraWQiOiJGQ0U3Q0M5QjEyMjMyMDkzMkU2RUI5N0I5MTM5NTkzREU2NUZDNjlBRDFDQUVGMkY5REFFOUY1MEJFMEVCNTcwIiwiYWxnIjoiUlMyNTYifQ.eyJhdWQiOiJjYW1ib2RpYS51bi5vcmciLCJleHAiOjE3NzA5Nzc5OTAsImlhdCI6MTc3MDk3Nzk4MCwiaXNzIjoidGllcjEtNjg1YmZiOTU1Ni03ODR0NyIsInN1YiI6IjEyNDo0OToxNDg4OmVhMmE6YTczZDo1YzE0OmVjOGU6NzVmZSIsImRhdGEiOnsidHlwZSI6Imlzc3VlZCIsInJlZiI6IjIwMjYwMjEzVDEwMTk0MFotMTY4NWJmYjk1NTY3ODR0N2hDMUJPTW1tZzQwMDAwMDAwZmNnMDAwMDAwMDAyNHNzIiwiYiI6IkktWC12UFNGTUc0UmItRmxJOVJZSG5zdWtVcHkwc3ZSNHZtVGQxSnhEa0EiLCJoIjoiVDhPVTl3UFpadHBEaU1ONWpFenVMTHF6alljNmo2emVMZXdGNEgzd1FQUSJ9fQ.OqXDB32T7SrmR4kTCQbxCyMv9pCZlP0-6ZYEXcNwGB81XIVwBbXtrjRIR-JTl37MqqIIpc4Gxgl0YIQipsQHhNtHptVlhh-4VRIVD_f_T2MHiWtyPe85PTaMaInH7gJaGFmbzweBHAnQpnGlurLJNUfgyfhTdWNr1jL06G8l8vqontZStkLernOSryiXXjBDUOIker2pdsaE8SPepBN_KWaxjKk6vRxXYAZs8t9x6ZXbYppgI2OGwdcqo2hajUveiY--VIvb2sczO1TqdFzaKbhXjOS4NIG595iFIQ3fl_OUfPco3lbKG3YPinFoweMRSVTAJhS7AwVZDYpzKtXXTQ.WF3obl2IDtqgvMFRqVdYkD5s", "https://cambodiainvestmentreview.com/2026/02/17/cna-documentary-highlights-6-7b-ai-opportunity-by-2030-or-a-widening-digital-divide-for-cambodia-video/"]
};

export const philippinesData: CountryDetailData = {
  countryName: 'Philippines',
  dpiEcosystem: {
    digitalId: {
      title: 'Digital ID', status: 'Early Success', description: 'PhilSys / PhilID', implementationAgency: 'PSA & BSP',
      modalDetails: {
        fullContext: "Implementation status: Implemented\nProgram details: Philippine Identification System (PhilSys) | 2021 onwards\nImplementation agency: Philippine Statistics Authority (PSA)\nAdoption: 90 million registered Filipinos (~80% of population) as of December 2025\n- Multi-modal biometrics (iris, fingerprint, facial capture) ensure unique, non-duplicable PhilSys Number (PSN) per citizen\n- Interoperable with banking (instant e-KYC under BSP Circular 1105) and the eGovPH Super App (Single Sign-On for health, social, and local government services)",
        keyMetrics: [
          "PhilSys issues unique identification number supported by biometric data",
          "Administered by the Philippine Statistics Authority",
          "90.02 Million registered users (~80% of population) utilizing PhilSys backed by a ₱30B budget"
        ],
        timeline: ""
      }
    },
    payments: {
      title: 'Digital Payments', status: 'Early Success', description: 'PhilPASSPlus, InstaPay, PESONet', implementationAgency: 'PSA & BSP',
      modalDetails: {
        fullContext: "Implementation status: Implemented\nProgram details: PhilPaSSplus (real-time gross settlement system) | BSP | ISO 20022 compliant\nImplementation agency: Bangko Sentral ng Pilipinas (BSP)\nAdoption: PHP 151.3 trillion in transactions processed in Q3 2025 (21% increase year-on-year)\n- Retail payment rails: InstaPay and PESONet for low-value real-time and high-value/batch transfers respectively\n- System expanded toward 24/7 operations in 2026; underpins national wholesale CBDC pilot",
        keyMetrics: [
          "PhilPaSSplus enables real time high-value interbank fund transfers",
          "Operated by the Bangko Sentral ng Pilipinas",
          "Projected ₱24.745 trillion in total transaction value by the end of 2025 across InstaPay and PESONet"
        ],
        timeline: ""
      }
    },
    dataExchange: {
      title: 'Data Exchange', status: 'Maturing', description: 'eGovDX', implementationAgency: 'DICT',
      modalDetails: {
        fullContext: "Implementation status: Implemented\nProgram details: eGovDX (Electronic Government Data Exchange) | DICT\nImplementation agency: Department of Information and Communications Technology (DICT)\n- Secure middleware enabling interoperable data sharing across national agencies via standardised APIs\n- Operates under the Data Privacy Act (RA 10173); governed by Data Sharing Agreements (DSAs) and NPC notifications\n- Active cross-agency use cases: DSWD–BSP social transfer targeting; PSA–BSP identity verification",
        keyMetrics: [
          "eGovDX enables interoperable data sharing among government agencies",
          "InstaPay, PESONet, and QR Ph facilitate electronic fund transfers",
          "eGov PH Super App achieved 5M+ downloads with 42 out of 75 NGAs integrated successfully"
        ],
        timeline: ""
      }
    },
    useCases: [
      { sector: 'Social Protection', description: '4Ps program (DSWD) — 4.4M+ households served; fully digitised via PhilSys ID verification and PhilPaSSplus payment rails. Note: digital integration with PhilSys and G2P payment rails is planned but not yet confirmed as operational at scale.' },
      { sector: 'Health', description: 'PhilHealth insurance claims integrated with PhilSys registry for real-time eligibility checks and eClaims processing' },
      { sector: 'Government Finance', description: 'LandBank — salaries, pensions, and social benefits processed via eMDS and Link.BizPortal digital rails' },
      { sector: 'Education', description: 'DepEd Learner Information System (LIS) and Project Bukas use digital identifiers to track 1.5M+ teachers and learners' },
      { sector: 'Cross-DPI Integration', description: 'eGovPH Super App — integrates 1,100+ government systems; 440M+ transactions processed as of early 2026' },
    ],
  },
  aiEcosystem: {
    policy: {
      title: 'AI Strategy', status: 'Early Success', description: 'National Artificial Intelligence Strategy', implementationAgency: 'DTI',
      modalDetails: {
        fullContext: "- National AI Strategy and Research Agenda 2.0 (NAISR 2.0) launched in July 2024 by the Department of Trade and Industry (DTI), covering seven strategic imperatives across infrastructure, talent, and ethical AI\n- Centre for AI Research (CAIR) established concurrently as the Philippines' national AI research hub, targeting agriculture and healthcare sectors\n- As of 2026, implementation remains early-stage — no public monitoring framework or verified progress tracking in place (UNESCO, 2025)",
        keyMetrics: [
          "National AI Strategy Roadmap (NAISR) 2.0 targets 1.0% of GDP R&D spending",
          "Aims to boost economy by up to PHP 2.6 trillion annually",
          "Launched the Center for AI Research (CAIR)",
          "Center for AI Research (CAIR) launched alongside machine learning optimization (ALAM Project)"
        ],
        timeline: ""
      }
    },
    governance: {
      title: 'AI Governance', status: 'Open to Adopt', description: 'Senate Bill no 25', implementationAgency: 'Senate',
      modalDetails: {
        fullContext: "- No enacted AI-specific legislation as of 2026; Senate Bill No. 25 (Artificial Intelligence Regulation Act) remains in Senate committee\n- House Bill 7396 (comprehensive AI deployment framework) also pending enactment\n- DICT and Civil Service Commission published a draft Joint Memorandum Circular on Ethical AI Use in Government (April 2024) — open for public consultation; not yet enacted as of March 2026\n- Draft JMC draws on OECD AI Principles, UNESCO Recommendation on Ethics of AI, and the ASEAN AI Governance Guide\n- No dedicated national lead agency for AI governance currently exists (UNESCO RAM, December 2025)",
        keyMetrics: [
          "Senate Bill No. 25 proposes a National AI Commission",
          "Mandates risk-based classification of AI systems",
          "Requires employers to provide advance notification for AI integration"
        ],
        timeline: ""
      }
    },
    legislation: {
      title: 'Data Legislation', status: 'Maturing', description: 'Data Privacy Act', implementationAgency: 'NPC',
      modalDetails: {
        fullContext: "- Data Privacy Act of 2012 (RA 10173): comprehensive, actively enforced privacy law with extraterritorial reach\n\n- National Privacy Commission (NPC) oversees compliance; mandates 72-hour breach reporting for high-risk incidents\n\n- NPC Advisory 2024-04 extends data privacy regulation to AI: requires Privacy Impact Assessments and 'meaningful human intervention' in AI-driven profiling and automated decision-making\n\n- UNDP Digital Development Compass: Philippines scores 4 in data and privacy",
        keyMetrics: [
          "Governed by the Data Privacy Act of 2012 (Republic Act No. 10173)",
          "Regulated by the independent National Privacy Commission",
          "Requires 72-hour breach notification where risk of harm exists"
        ],
        timeline: ""
      }
    },
    initiatives: {
      title: 'Government AI Initiatives', status: 'Early Success', description: 'AI-4RP & SkAI-Pinas', implementationAgency: 'DOST',
      modalDetails: {
        fullContext: "- National AI Center for Research and Innovation (NAICRI) launched February 2026 as the central shared high-performance computing (HPC) hub for government AI workloads\n- Key sector deployments:\n  a. Education: Project AGAP.AI (January 2026) — national AI upskilling program targeting 1.5 million learners and teachers\n  b. Health: UTAK AI deployed in public hospitals for brain tumour detection; AINA tool delivers AI-driven nutrition assessments for rural health workers\n  c. Disaster Resilience: AI-4RP (Project Gabay) — 2km resolution AI weather forecasting (DOST–Atmo Inc. partnership)\n  d. Governance: Digital Bayanihan Chain (January 2026) — Philippines is the first country to record its entire national budget on a blockchain ledger",
        keyMetrics: [
          "₱1.5 Billion national allocation for AI Upskilling Initiative",
          "Digital Bayanihan Chain (Blockchain for National Budget Transparency)",
          "AI-4RP AI-enhanced weather forecasting with DOST-ASTI",
          "National Data Lakehouse under GATES Program"
        ],
        timeline: ""
      }
    },
  },
  sectionB: {
    fundingLandscape: "2026 National Budget: PHP 6.793 trillion with record DepEd allocation of PHP 992.7B. World Bank digital portfolio totals USD 1.637B. Digital Bayanihan Chain records the entire national budget on blockchain for fiscal transparency.",
    electricityAccess: 89,
    internetPenetration: 83.8,
    deviceAccess: 81.0,
    digitalInclusion: "47.5 percentage point gap between Metro Manila (68.7%) and Zamboanga Peninsula (21.2%). Near gender parity but affordability remains the primary barrier for 58% of unconnected households.",
    dataCenters: '28 operational colocation facilities (632.80 MW); Google Cloud first PH region in 2026; NAICRI shared HPC via DOST-ASTI COARE',
    politicalStability: 'WB Political Stability: 52.67 percentile (40-60th range). E-Governance Act (RA 12254) institutionalises DT as state policy. (Source: WB WGI 2024)',
    electionCycles: '6-year cycle (Next: May 2028)',
    politicalSubParameters: [
      { label: 'Elections', value: '6-year presidential terms; 3-year midterms (last: May 2025; next presidential: 2028). Transitions are often influenced by political alliance shifts.' },
      { label: 'Governance Structure', value: 'Unitary Republic with significant decentralization to local governments, plus the autonomous BARMM region.' },
      { label: 'Political Stability', value: 'Constitutionally stable but prone to elite factional polarization. Accountability is relatively high, but political stability counts are impacted by internal conflicts.' },
      { label: 'Digital Priority', value: 'Shifting from basic connectivity to heavy digital economy emphasis (AI and cloud-first policies) targeting 12% GDP contribution by 2026.' },
      { label: 'Institutional Capacity', value: 'Uneven. Central agencies demonstrate high technical capacity, whereas rural local government units often lack sufficient budget and technical staff.' },
      { label: 'Leadership Champions', value: 'President Marcos Jr. (championing National ID) and DICT Secretary Henry Rhoel Aguda (driving tech ecosystem orchestration).' },
      { label: 'Key Influencers', value: 'DICT (implementer), NEDA (funding), and Anti-Red Tape Authority (enforcing service automation).' },
      { label: 'Civil Society', value: 'Vibrant and highly active, though facing challenges with disinformation and the complete inclusion of marginalized groups.' }
    ],
    leadershipQuote: {
      text: "Digitalization is the call of today; not the call of the future—but of the present. It is here. It is needed, and it is needed now.",
      author: "Ferdinand R. Marcos Jr.",
      context: "President of the Philippines (State of the Nation Address)"
    }
  },
  sectionC: {
    actors: [
      { id: 'p1', type: 'Lead Agency & Govt Coordination', name: 'DICT, DTI, DOST, PSA, NPC, BSP', role: 'Decision-makers & Implementers', initiatives: ['DICT is legally designated lead for DT (RA 10844, RA 12254)', 'BSP Circular 1153: regulatory sandbox for fintech/AI', 'NPC oversees data protection; PSA manages PhilSys', 'Gap: No single lead agency for AI governance as of 2026'] },
      { id: 'p2', type: 'Private Sector', name: 'GCash (Mynt), Microsoft, Google Cloud, PLDT/Smart, Aboitiz Data', role: 'Implementers & Co-Investors', initiatives: ['GCash: 94M users, de facto digital public infrastructure', 'Microsoft: MOU with DICT for government Azure cloud', 'Google Cloud: first Philippine region activated early 2026', 'PLDT VITRO & STT Fairview: AI-ready hyperscale facilities'] },
      { id: 'p3', type: 'Development Partners & MDBs', name: 'World Bank, ADB, USAID BEACON, Gates Foundation', role: 'Policy Influencers & Funders', initiatives: ['World Bank: USD 1.637B digital portfolio (DPLs + PDIP)', 'ADB ProSPER: digital tools for Mindanao agriculture', 'USAID BEACON: community network deployments', 'Gates Foundation: PhilSys + digital financial services grants'] },
      { id: 'p4', type: 'Academic & Research', name: 'Ateneo TRL, University of the Philippines, DOST-ASTI COARE', role: 'R&D & Talent Development', initiatives: ['Ateneo TRL: DPI testing hub for PhilSys integration', 'UP Principles for Responsible AI (soft-law guide)', 'DepEd-Microsoft E-CAIR: AI literacy scaled to millions', 'DOST-ASTI COARE HPC: supercomputing for AI research'] },
      { id: 'p5', type: 'Civil Society', name: 'Foundation for Media Alternatives (FMA), Democracy.Net.PH', role: 'Advocacy & Oversight', initiatives: ['FMA: lead digital rights watchdog monitoring DICT policy', 'Democracy.Net.PH: crowdsourced Magna Carta for Philippine Internet Freedom', 'Civil society consulted for E-Governance Act (RA 12254) IRR', 'Gap: PWDs, indigenous peoples, informal workers excluded from AI/DPI consultations'] },
    ],
  },
  sectionD: {
    opportunities: [
      { id: 'ph-o1', text: 'The Philippines is in the process of operationalising its AI governance architecture, with initiatives such as NAICRI and the national AI roadmap emerging alongside broader digital transformation policies. UNDP can provide technical support on AI governance and regulatory design, drawing on international best practices and supporting the development of responsible AI standards for public-sector deployment.' },
      { id: 'ph-o2', text: 'With large-scale initiatives such as PhilSys (national digital ID), eGovPH, and digital payments infrastructure, the Philippines has built several foundational DPI components. A key opportunity is deepening the use of these foundations for efficient and effective public service delivery — for example, leveraging PhilSys and G2P payment rails for social protection programmes such as 4Ps, pending confirmation that current delivery remains paper-based and digital integration is still in transition. UNDP can support the government in designing interoperability frameworks and prioritising high-impact citizen-facing use cases, ensuring existing infrastructure translates into integrated public services.' },
      { id: 'ph-o3', text: 'The government is investing in AI talent development through initiatives such as Project AGAP.AI and NAICRI, creating momentum for a domestic AI ecosystem. UNDP can support this by linking talent pipelines to real-world public sector use cases and establishing an AI-for-Good accelerator that provides mentorship, grants, and technical support for startups and research teams working on development-focused solutions in sectors such as healthcare, agriculture, and disaster resilience.' },
    ],
    risks: [
      { id: 'ph-r1', text: 'Infrastructure reliability and cybersecurity risks: Despite rapid digital expansion and 5G growth, connectivity gaps persist across rural Visayas and Mindanao. The Philippines remains a major target for ransomware and cyberattacks, with critical digital infrastructure increasingly exposed as government services migrate online.' },
      { id: 'ph-r2', text: 'Vendor dependency and technology lock-in risks: Heavy reliance on foreign hyperscale cloud providers — including AWS and Azure — raises concerns around cyber-resilience, data sovereignty, interoperability, and long-term technology lock-in. The absence of a domestic cloud-first policy creates structural dependency that may constrain future flexibility.' },
      { id: 'ph-r3', text: 'Institutional fragmentation and LGU capacity constraints: Digital transformation mandates exist at the national level, but coordination between DICT, DILG, and Local Government Units remains uneven. The absence of structured capacity building programmes for LGUs — most of which lack dedicated technical staff and digital procurement expertise — is the most binding implementation constraint at the sub-national level. Procurement rules under RA 9184 that prioritise lowest-cost bids and the migration of public-sector IT talent to the private sector further compound this risk.' },
      { id: 'ph-r4', text: 'Digital inclusion risks: Significant disparities in connectivity, device ownership, and digital literacy risk excluding vulnerable populations — particularly in rural Mindanao, the Bangsamoro region, and low-income households — from DPI-enabled services.' },
      { id: 'ph-r5', text: 'Political continuity risks: Active political tensions — including the Marcos-Duterte rift and credible reports of potential election delays — may affect continuity of ICT investments and institutional ownership of the digital transformation agenda across the 2028 election cycle.' },
      { id: 'ph-r6', text: 'Financial sustainability risks: Heavy reliance on external development financing, including World Bank and ADB loans, raises questions about long-term sustainability. High operational costs and limited domestic revenue generation capacity for digital infrastructure create fiscal exposure if external financing contracts.' },
    ],
    partnerships: [
      { id: 'ph-p1', text: 'Partnership with DICT and DILG on LGU digital transformation: While national digital policies are well established, implementation gaps persist at the Local Government Unit (LGU) level. UNDP can work with DICT and the Department of the Interior and Local Government (DILG) to develop LGU digital roadmaps, procurement templates, and capacity-building programs, enabling municipalities to operationalise national digital mandates under the E-Governance Act.' },
      { id: 'ph-p2', text: 'Partnership with DOST and NAICRI to operationalise AI-for-development use cases: The National Artificial Intelligence Center for Research and Innovation (NAICRI) was launched to strengthen AI research and ecosystem development. UNDP can collaborate with DOST, NAICRI, and academic partners to pilot AI applications for disaster preparedness, climate resilience, and rural healthcare, while supporting responsible AI governance practices.' },
      { id: 'ph-p3', text: 'Partnership with DTI, DICT, and startup ecosystem actors to strengthen the AI innovation ecosystem: The government is seeking to expand the domestic AI and digital innovation ecosystem through startup support and technology entrepreneurship programs. UNDP can partner with the Department of Trade and Industry (DTI), DICT innovation programs, and local accelerators to develop an AI for Good startup accelerator, providing grants, mentorship, and sandbox access for startups working on development challenges such as agriculture, climate resilience, and social protection.' },
    ]
  },
  parameterStages: {
    P1: {
      parameter: 'AI Ecosystem Maturity', parameterStage: 'Early Success', subParameters: [
        { name: 'IMF AI Preparedness Index (AIPI)', stage: 'Early Success' },
        { name: 'National AI Strategy / Policy Status', stage: 'Early Success' },
        { name: 'AI Governance & Ethical AI Principles', stage: 'Open to Adopt' },
        { name: 'Data Protection & Privacy Legislation', stage: 'Maturing' },
        { name: 'Government AI Initiatives & Projects', stage: 'Early Success' },
      ]
    },
    P2: {
      parameter: 'DPI Ecosystem Maturity', parameterStage: 'Maturing', subParameters: [
        { name: 'National Digital Transformation Strategy', stage: 'Early Success' },
        { name: 'Digital ID', stage: 'Early Success' },
        { name: 'Digital Payments', stage: 'Early Success' },
        { name: 'Data Exchange', stage: 'Maturing' },
        { name: 'Use Cases of DPI Assets', stage: 'Early Success' },
      ]
    },
    P3: {
      parameter: 'Digital-Physical Infrastructure', parameterStage: 'Early Success', subParameters: [
        { name: 'Electricity Access & Reliability', stage: 'Early Success' },
        { name: 'Internet Penetration', stage: 'Early Success' },
        { name: 'Compute & Cloud Capacity', stage: 'Maturing' },
      ]
    },
    P4: {
      parameter: 'Political Stability & Governance', parameterStage: 'Early Success', subParameters: [
        { name: 'WB Political Stability Score (2024)', stage: 'Early Success' },
        { name: 'Strategic & Long-term Subjective Call', stage: 'Early Success' },
      ]
    },
    P5: {
      parameter: 'Stakeholder Participation', parameterStage: 'Maturing', subParameters: [
        { name: 'Lead Agency & Govt Coordination', stage: 'Maturing' },
        { name: 'Private Sector Engagement', stage: 'Maturing' },
        { name: 'Development Partners & MDBs', stage: 'Maturing' },
        { name: 'Academic & Research Institutions', stage: 'Maturing' },
        { name: 'Civil Society Engagement', stage: 'Early Success' },
      ]
    },
    P6: {
      parameter: 'Funding Landscape', parameterStage: 'Maturing', subParameters: [
        { name: 'Domestic Public Budget for AI/DPI', stage: 'Maturing' },
      ]
    },
  },
  sources: ["https://erikalegara.com/uploads/NAISR2.0_July2024.pdf", "https://senate.gov.ph/legislative-documents/bills/594456", "https://www.deped.gov.ph/wp-content/uploads/DO_s2025_013.pdf", "https://www.lexology.com/library/detail.aspx?g=91e88551-72ff-439e-82a6-05ace8a7dd61", "https://asti.dost.gov.ph/news-articles/asti-pagasa-partner-with-atmo-for-ai-powered-weather-forecasting/", "https://atmo.ai/news/philippines-ai-transition", "https://asti.dost.gov.ph/projects/itanong/", "https://asti.dost.gov.ph/projects/alam-project/", "https://pia.gov.ph/news/mmda-eyes-use-of-ai-in-traffic-management/", "https://www.pchrd.dost.gov.ph/heartnovation/aina-artificial-intelligence-nutrition-assistant/", "https://registry.healthresearch.ph/index.php/registry?cid=8363&layout=details&view=research", "https://www.pchrd.dost.gov.ph/news_and_updates/dost-pchrd-presents-ai-driven-innovations-at-amcham-philippines/", "https://asti.dost.gov.ph/events/launch-of-the-national-artificial-intelligence-center-for-research-and-innovation/", "https://www.ditosapilipinas.com/national/news/article/05/19/2025/dost-asti-inclusive-ai-ecosystem/1599", "https://mb.com.ph/2026/02/21/dost-to-launch-national-ai-center", "https://pia.gov.ph/news/soccsksargen-backs-dosts-geospatial-technology-ai-initiative/", "https://asti.dost.gov.ph/wp-content/uploads/PPAs-2025.pdf", "https://dict.gov.ph/news-and-updates/25385", "https://pia.gov.ph/news/first-in-asia-world-ph-to-use-blockchain-tech-for-budget/", "https://businessmirror.com.ph/2025/07/28/government-to-provide-%E2%82%B11-5-b-for-ai-upskilling-in-2026/", "https://news.microsoft.com/source/asia/2026/02/03/deped-and-microsoft-accelerate-learning-recovery-and-ai-literacy-for-filipinos/", "https://coare.asti.dost.gov.ph/services", "https://asti.dost.gov.ph/news-articles/coare-supercomputing-facility-highlights-its-continuous-support-to-covid-19-centric-initiatives/", "https://datacommons.up.edu.ph/about-updc/", "https://datareportal.com/reports/digital-2026-philippines"]
};







export const bangladeshData: CountryDetailData = {
  countryName: "Bangladesh",
  dpiEcosystem: {
    digitalId: {
      title: "Digital ID",
      status: "Maturing",
      description: "Present: National ID (DPI like)",
      modalDetails: {
        fullContext: "The National ID is a smart ID card containing an embedded microchip and featuring a unique 10-digit identification number – the National Identification Number (NIN). It is used to access public and private services such as banking, mobile registration and voter registration among other purposes. Currently, the National ID in Bangladesh covers 40% of the entire population. As of 2026, the age category has been relaxed from 18 to 16, meaning youth aged 16 or above are now eligible for NID cards and services",
        keyMetrics: [
          "National ID (Ongoing)",
          "The National ID is a smart ID card containing an embedded microchip and featuring a unique 10-digit identification number – the National Identification Number (NIN). It is used to access public and private services such as banking, mobile registration and voter registration among other purposes. From 2011-2018, the World Bank Identification for Enhanced Access to Services (IDEAS) Project provided technical assistance. Due to implementation and policy delays, only 90 million NID cards (half the desired goal) was achieved by 2018"
        ]
      },
      implementationAgency: "National Election Commission"
    },
    payments: {
      title: "Digital Payments",
      status: "Maturing",
      description: "Present: National Payment Switch (DPI like)",
      modalDetails: {
        fullContext: "The National Payment Switch is an interoperable backbone with successful private MFS operators like bKash and Nagad built upon it. From 2021, bKash, a leading Mobile Financial Service (MFS) platform has introduced digital loans among other digital and financial services, handling about 24 million daily transactions. bKash also saw a 24% increase in transactions and a 9% rise in its customer base in 2023.",
        keyMetrics: [
          "National Payment Switch (Ongoing)",
          "Operational since 2012, the National Payment Switch Bangladesh (NPSB) is a platform that allows for seamless movement of funds from customers to banks to Mobile Financial Services (MFS) providers. It   supports extensive bank-to-wallet and MFS-to-MFS transactions,  with an aim to replace existing banking platforms with a unified, secure system",
          "Bank-to-MFS transfers fees set at Tk 1.5 per Tk 1,000; MFS-to-bank transfers set at Tk 8.5 per Tk 1,000; 2025"
        ]
      },
      implementationAgency: "Bangladesh Bank"
    },
    dataExchange: {
      title: "Data Exchange",
      status: "Early Success",
      description: "Present: National E-Service Bus (DPI like)",
      modalDetails: {
        fullContext: "The National Data Exchange (NDX) is a proposed forward looking data exchange system initiative, as of 2026. The National E-Service Bus, implemented under the Bangladesh National Digital Architecture (BNDA) is currently being used by 15 Bangladeshi government agencies, as of August 2025. The platform still requires upgrades for scaling and broader adoption. The World Bank group is assisting with the software upgrading of the bus, along with standardized API specifications, operational processes, and technical capacity for government agencies to leverage the platform for service delivery.",
        keyMetrics: [
          "The National Data Exchange (NDX) (Proposed)",
          "National E-Service Bus (Ongoing)",
          "As of a document from August 2025, the National E-Service Bus was being used by around 15 government agencies including the NID agency, National Board of Revenue, BTRC, the Ministry of Agriculture, and the Office of the Registrar General. The platform still requires upgrades for scaling and broader adoption. The World Bank group is assisting with the software upgrading of the bus, along with standardized API specifications, operational processes, and technical capacity for government agencies to leverage the platform for service delivery"
        ]
      },
      implementationAgency: "BNDA"
    },
    useCases: [
      {
        sector: "Government Services",
        description: "MyGov - One-stop service access for 172 digitized services"
      },
      {
        sector: "Digital Commerce",
        description: "Ekshop - Rural assisted e-commerce backbone with 12k+ artisans"
      },
      {
        sector: "Government E-Services",
        description: "Doptor - Integrated dashboard platform serving 14k+ government offices and 140k+ users across Bangladesh"
      }
    ]
  },
  aiEcosystem: {
    policy: {
      title: "AI Strategy",
      status: "Open to Adopt",
      description: "National Artificial Intelligence Policy 2026-30  (Drafts V1.1 and V2.0)",
      modalDetails: {
        fullContext: "The National AI Policy Bangladesh 2026-30 (Drafts V1.1 and V2.0), aiming to accelerate Bangladesh’s path towards a middle-income country, as outlined in the Vision 2041 master plan and aligned with the UN’s Sustainable Development Goals (SDGs).  An archive date has been set for June 30 2026",
        keyMetrics: [
          "Vision",
          "To develop an ethical and innovative environment for the use and development of AI to accelerate Bangladesh’s path towards a middle-income country, as outlined in the Vision 2041 master plan and aligned with the UN’s Sustainable Development Goals (SDGs).",
          "Mission",
          "Establishing Bangladesh as a pioneer in AI innovation and adoption, creating a ‘Smart Bangladesh’ that leverages AI technologies for the well-being of all citizens, economic prosperity, and sustainable development in accord with four pillars; Smart Government, Smart Society, Smart Economy and Smart Citizen."
        ]
      },
      implementationAgency: "Ministry of ICT"
    },
    governance: {
      title: "AI Governance",
      status: "Maturing",
      description: "Algorithmic Impact Assessments (AIAs)",
      modalDetails: {
        fullContext: "AI governance and ethical AI principles are currently under consultation as parts of the draft stages of the National AI policy Bangladesh 2026-30",
        keyMetrics: [
          "Mandatory Algorithmic Impact Assessments for public sector AI",
          "Draft National AI Policy 2026-30 oversight framework",
          "Integration of AI education across all educational tiers"
        ]
      },
      implementationAgency: "Ministry of ICT"
    },
    legislation: {
      title: "Data Protection",
      status: "Maturing",
      description: "The Personal Data Protection Ordinance, 2025",
      modalDetails: {
        fullContext: "Vision Make provisions for processing personal data of a person for the purposes of legitimate use ensuring privacy, confidentiality and security and recognizing the personal data as personal right of a data-subject  Mission  Creating a unified framework that aligns with international standards and ensures privacy, confidentiality, and security of personal data, recognizing it as a right of the data subject.  Objectives  -Citizen focused control -Consent based processes -Digital sovereignty  -Grievance redressal -Responsible data fiduciary",
        keyMetrics: [
          "Vision",
          "Make provisions for processing personal data of a person for the purposes of legitimate use ensuring privacy, confidentiality and security and recognizing the personal data as personal right of a data-subject",
          "Mission",
          "Creating a unified framework that aligns with international standards and ensures privacy, confidentiality, and security of personal data, recognizing it as a right of the data subject."
        ]
      },
      implementationAgency: "Ministry of ICT"
    },
    initiatives: {
      title: "AI Initiatives",
      status: "Early Success",
      description: "MyGov, Kagoj AI & EBLICT",
      modalDetails: {
        fullContext: "Kagoj AI is Bangladesh's first Artificial Intelligence platform for the Bangla language; it uses a new Julai font that aids in digitising Bangla script for a large audience",
        keyMetrics: [
          "MyGov: 172 services digitized with single-sign-on access",
          "Kagoj AI: Native Bangla NLP for official digitisation",
          "EBLICT: R&D for Bengali language inclusion in AI datasets",
          "Smart Bangladesh 2041: AI-driven workforce transformation"
        ]
      },
      implementationAgency: "ICT Division & BCC"
    }
  },
  sectionB: {
    fundingLandscape: "Domestic budget (~$211m) supplemented by WB (EDGE, DISTAR) and ADB projects.",
    electricityAccess: 99.5,
    internetPenetration: 53,
    politicalStability: 'WB Political Stability: 40.90 percentile (40-60th range). Smart Bangladesh Vision 2041 institutionalises DT as state policy. (Source: WB WGI 2024)',
    electionCycles: "Elections recently concluded",
    politicalModalDetails: {
      fullContext: "Elections recently concluded",
      keyMetrics: [
        "Elections recently concluded"
      ]
    },
    deviceAccess: 98.9,
    digitalInclusion: "Higher access in urban areas (71.3% men, 62.4% women) vs rural (36.6% men, 23% women). Overall geographic divide: 66.8% vs 29.7%.",
    dataCenters: "36 total operational",
    leadershipQuote: {
      text: "Transforming Bangladesh into a digitally empowered, innovative, and inclusive society through ICT-driven sustainable growth.",
      author: "National Reform Roadmap",
      context: "Digital Transformation Strategy 2025"
    },
    politicalSubParameters: [
      {
        label: "Elections",
        value: "Elections recently concluded (2024)."
      },
      {
        label: "Governance Structure",
        value: "Centralised Democratic Republic with a unicameral parliament (Jatiya Sangsad) of 350 members (including 50 seats reserved for women). The Prime Minister heads a 45-member cabinet."
      },
      {
        label: "Worldwide Governance Indicators",
        value: "Government Effectiveness: 39.31. Regulatory Quality: 39.88. Rule of Law: 40.44. Control of Corruption: 25.55. (Source: WB WGI 2024)"
      },
      {
        label: "Political Stability",
        value: "Poor D ranking with major corruption challenges. WGI Political Stability: 40.90. Voice and Accountability: 36.53."
      },
      {
        label: "Institutional Capacity",
        value: "CPIA Macroeconomic management rating: 3/6. Institutional framework assessed for reducing poverty and supporting sustainable growth."
      },
      {
        label: "Digital Transformation Priority",
        value: "Transitioning to 'Smart Bangladesh 2041'. Aiming to train 20,000 cybersecurity experts by 2027 and 50,000 by 2030."
      }
    ]
  },
  parameterStages: {
    P1: {
      parameter: "AI Ecosystem Maturity",
      parameterStage: "Open to Adopt",
      subParameters: [
        {
          name: "IMF AI Preparedness Index (AIPI)  (2023 dataset)",
          stage: "Open to Adopt"
        },
        {
          name: "National AI Strategy / Policy Status",
          stage: "Open to Adopt"
        },
        {
          name: "AI Governance and Regulatory Frameworks and Ethical AI Principles",
          stage: "Open to Adopt"
        },
        {
          name: "Data Protection and Privacy Legislation",
          stage: "Maturing"
        },
        {
          name: "Government AI Initiatives and Projects",
          stage: "Early Success"
        }
      ]
    },
    P2: {
      parameter: "DPI Ecosystem Maturity",
      parameterStage: "Early Success",
      subParameters: [
        {
          name: "National Digital Transformation Strategy",
          stage: "Open to Adopt"
        },
        {
          name: "Digital ID",
          stage: "Maturing"
        },
        {
          name: "Digital Payments",
          stage: "Maturing"
        },
        {
          name: "Data Exchange",
          stage: "Early Success"
        },
        {
          name: "Use Cases of DPI Assets",
          stage: "Early Success"
        }
      ]
    },
    P3: {
      parameter: "Digital-Physical Infrastructure",
      parameterStage: "Open to Adopt",
      subParameters: [
        {
          name: "Electricity Access and Reliability",
          stage: "Role Model"
        },
        {
          name: "Internet Penetration",
          stage: "Greenfield"
        },
        {
          name: "Compute and Cloud Capacity",
          stage: "Early Success"
        },
        {
          name: "Digital Inclusion",
          stage: "Open to Adopt"
        }
      ]
    },
    P4: {
      parameter: "Political Stability and Governance",
      parameterStage: "Open to Adopt",
      subParameters: [
        {
          name: "WB Worldwide Governance Indicators - Political Stability Score 2024",
          stage: "Open to Adopt"
        },
        {
          name: "Political stability and DT policy continuity (Requirement of KIIs)",
          stage: "Open to Adopt"
        }
      ]
    },
    P5: {
      parameter: "Stakeholder Participation and Ecosystem Coordination",
      parameterStage: "Early Success",
      subParameters: [
        {
          name: "Lead Agency and Government Coordination",
          stage: "Maturing"
        },
        {
          name: "Private Sector Engagement",
          stage: "Open to Adopt"
        },
        {
          name: "Development Partners and MDBs",
          stage: "Maturing"
        },
        {
          name: "Academic and Research Institutions",
          stage: "Early Success"
        },
        {
          name: "Civil Society Engagement",
          stage: "Early Success"
        }
      ]
    },
    P6: {
      parameter: "Funding Landscape",
      parameterStage: "Early Success",
      subParameters: [
        {
          name: "Domestic Public Budget for AI/DPI",
          stage: "Early Success"
        }
      ]
    }
  },
  sectionC: {
    actors: [
      {
        id: "bd-1",
        name: "ICT Division",
        type: "Lead Agency & Govt Coordination",
        role: "Primary policy maker",
        initiatives: [
          "Smart Bangladesh 2041 Roadmap"
        ]
      },
      {
        id: "bd-2",
        name: "a2i (Aspire to Innovate)",
        type: "Lead Agency & Govt Coordination",
        role: "Digital transformation catalyst",
        initiatives: [
          "MyGov",
          "G2P",
          "NDX"
        ]
      },
      {
        id: "bd-3",
        name: "Bangladesh Bank",
        type: "Private Sector",
        role: "Central Bank",
        initiatives: [
          "NPSB",
          "Interbank Payment System"
        ]
      },
      {
        id: "bd-4",
        name: "Brain Station 23",
        type: "Private Sector",
        role: "Tech Solution Provider",
        initiatives: [
          "AI/ML in Fintech"
        ]
      },
      {
        id: "bd-5",
        name: "World Bank",
        type: "Development Partners & MDBs",
        role: "Funding & Technical Partner",
        initiatives: [
          "EDGE Project",
          "DISTAR"
        ]
      },
      {
        id: "bd-6",
        name: "BRAC",
        type: "Civil Society",
        role: "Implementation Partner",
        initiatives: [
          "Digital Innovation Research"
        ]
      }
    ]
  },
  sectionD: {
    opportunities: [
      {
        id: "bd-o1",
        text: "Health digitisation is on the rise through unified identity and AI integration. Momentum in health is directed by the planned Universal Health ID and the Digital Health Strategy focusing on AI, telemedicine, and record interoperability"
      },
      {
        id: "bd-o2",
        text: "From September 2025, the Bangladesh bank aims to develop an interoperable payment system with the Gates Foundation, built on Mojaloop-based IIPS by July 2027"
      },
      {
        id: "bd-o3",
        text: "Encompassing all 3 layers of DPI, Phygital Public Infrastructure also aims to bridge the gaps between marginalised groups and public services. These include aspiring youth, women; both urban and rural. 9,500 Digital Centers currently serve 6–7 million rural users monthly."
      }
    ],
    risks: [
      {
        id: "bd-r1",
        text: "Currently prone to a high volume of cyberattacks, severe shortage of cybersecurity professionals. The NID breach of 2023 exposed about 50 million citizen data"
      },
      {
        id: "bd-r2",
        text: "Bangladesh’s data remains fragmented and siloed.Systems lack secure interoperability.Isolation of systems has also led to high operational costs"
      },
      {
        id: "bd-r3",
        text: "Low digital literacy rate. Limited infrastructure and last mile connectivity issues"
      }
    ],
    partnerships: [
      {
        id: "bd-p1",
        text: "Support large-scale digital literacy and workforce upskilling initiatives under programs such as Citizen Upskilling and the Digital Leadership Academy"
      },
      {
        id: "bd-p2",
        text: "Support could focus on designing interoperable digital platforms, improving public service delivery, and strengthening regulatory frameworks for data governance, privacy, and cybersecurity."
      },
      {
        id: "bd-p3",
        text: "Design programs that ensure women, rural communities, persons with disabilities, and other marginalized groups benefit from digital transformation. This could involve supporting affordable connectivity, inclusive service design, and targeted digital literacy programs."
      }
    ]
  },
  sources: [
    "https://oxfordinsights.com/wp-content/uploads/2025/12/2025-Government-AI-Readiness-Index-2.pdf",
    "https://aipolicy.gov.bd/docs/national-ai-policy-bangladesh-2026-2030-draft-v1.1.pdf",
    "https://www.unesco.org/ethics-ai/en/global-hub",
    "https://www.dlapiperdataprotection.com/",
    "https://file-rangpur.portal.gov.bd/files/pbs2.dinajpur.gov.bd/files/1885c0a0_28a4_4fcc_8d4d_dcd7ce23fd8b/7b684f19a15dfcd0f542382764572486.pdf"
  ]
};

export const nepalData: CountryDetailData = {
  countryName: "Nepal",
  dpiEcosystem: {
    digitalId: {
      title: "Digital ID",
      status: "Maturing",
      description: "Rastriya Parichaya Patra; National Identity",
      modalDetails: {
        fullContext: "Nepal's National Identity Document system (Rastriya Parichaya Patra) is a biometric-based ID launched in 2018. It is integrated with Nagarik App and mandated in 28 districts for accessing services like pensions and health insurance. However, owing to the lack of operational authentication infrastructure, agencies still rely on physical documentation and e-KYC is not fully leveraged.",
        keyMetrics: [
          "As of 2025, over 17 million people are registered (~57% of population); approximately 6 million cards printed.",
          "Assisted over 97% of local government units to transition to online civil registration of vital events.",
          "The ID system is integrated with the Nagarik App and is mandated (in 28 districts) for accessing services like pensions and health insurance."
        ]
      },
      implementationAgency: "Department of National ID and Civil Registration"
    },
    payments: {
      title: "Digital Payments",
      status: "Maturing",
      description: "National Payments Interface (NPI)",
      modalDetails: {
        fullContext: "Digital Payments system comprises a National Payment Switch, an interbank payment system, and a retail payment system developed by Nepal Clearing House (NCHL) as public infrastructure that facilitates interoperability. NRB has supported NepalPay QR and NepalPay Instant rails. Private digital wallets like eSewa, Khalti, and Fonepay also operate widely.",
        keyMetrics: [
          "National Payment Switch backbone developed by NCHL facilitating multi-vendor interoperability.",
          "Over 2 million merchants accept QR payments rails (such as NepalPay), with volume growing 117% YoY.",
          "In 2024/25, NCHL processed 186 million transactions covering 17% of total market volume and 77% of value."
        ]
      },
      implementationAgency: "Nepal Clearing House"
    },
    dataExchange: {
      title: "Data Exchange",
      status: "Open to Adopt",
      description: "Government Cloud",
      modalDetails: {
        fullContext: "National Data Exchange platform planned which aims to enable enabling multiple government bodies to securely share information through a single interface to reduce duplication and streamline operations",
        keyMetrics: [
          "Government Cloud (Pipeline)",
          "The government of Nepal has partnered with various cloud service providers to build its cloud infrastructure and improve the delivery of e-governance services.",
          "Government Integrated Data Center (GIDC) is operational under the MoCIT"
        ]
      },
      implementationAgency: "MoCIT"
    },
    useCases: [
      {
        sector: "Government Services",
        description: "Nagarik App - Single online e-governance platform offering 61+ public services. Uptake remains low at ~800k users"
      }
    ]
  },
  aiEcosystem: {
    policy: {
      title: "AI Strategy",
      status: "Early Success",
      description: "National AI Policy, 2025",
      modalDetails: {
        fullContext: "National AI Policy released in 2025 aims to  - Build a human-centered, ethical, and prosperous Nepal through AI. - Maximize the use of Artificial Intelligence for the socio-economic development of the nation. - Build a sustainable and reliable AI ecosystem. - Accelerate the economic growth rate through the optimal use of AI. - Enhance the effectiveness of public service delivery through AI applications. - Strengthen AI governance",
        keyMetrics: [
          "Vision",
          "To build a human-Centered, ethical, and prosperous Nepal through Artificial Intelligence (AI) technology.",
          "Mission",
          "To maximize the use of Artificial Intelligence for the socio-economic development of the nation."
        ]
      },
      implementationAgency: "MoCIT"
    },
    governance: {
      title: "AI Governance",
      status: "Open to Adopt",
      description: "Policy Implementation Roadmap",
      modalDetails: {
        fullContext: "Improving AI governance mentioned as one of the goals of AI policy but no framework or guidelines mentioned. Same applies for ethical AI principles",
        keyMetrics: [
          "Target: Top 50 in Global Government AI Readiness Index",
          "AI Excellence Centres planned for all 7 provinces",
          "Mandatory AI literacy programs for all tiers of education"
        ]
      },
      implementationAgency: "MoCIT"
    },
    legislation: {
      title: "Data Protection",
      status: "Greenfield",
      description: "National Cyber Security Policy, 2023",
      modalDetails: {
        fullContext: "No comprehensive data protection legislation and corresponding authority. However, data privacy is governed by various laws, chief among them being The Individual Privacy Act, 2018 and Individual Privacy Regulation",
        keyMetrics: [
          "No comprehensive data protection legislation.",
          "Governed by Individual Privacy Act, 2018 and Individual Privacy Regulation"
        ]
      },
      implementationAgency: "MoCIT"
    },
    initiatives: {
      title: "AI Initiatives",
      status: "Open to Adopt",
      description: "SITA, Intelligent Traffic & Agri-Tech",
      modalDetails: {
        fullContext: "AI deployment in Nepal includes an intelligent traffic light system adjusting timings in real-time on major Lalitpur junctions. SITA is an AI platform by UNFPA that rapidly analyzes massive health datasets for rapid decision-making. Agritech tools Plantsat & Geokrishi offer satellite monitoring to farmers, while Cognify personalizes learning to reduce dropout rates.",
        keyMetrics: [
          "SITA: Rapid analysis of massive datasets for health insights",
          "Intelligent Traffic: 10+ major junctions in Lalitpur automated via AI",
          "Plantsat & Geokrishi: AI-driven satellite monitoring for 50k+ farmers",
          "Cognify: Personalized cognitive learning to reduce dropout rates"
        ]
      },
      implementationAgency: "MoCIT, UNFPA & Private Partners"
    }
  },
  sectionB: {
    fundingLandscape: "Dependent on external financing (WB, ADB) with emerging domestic allocations.",
    electricityAccess: 94,
    internetPenetration: 49.6,
    politicalStability: 'WB Political Stability: 39.34 (20-40th range). e-Governance Blueprint (v2 2025) and Digital Nepal Framework 2019.',
    electionCycles: "Previous cycle in 2022 next one in March, 2026",
    politicalModalDetails: {
      fullContext: "5 year election cycle. Mass and violent protests by youth against (popularily referred to as Gen Z protests) took place in September 2025 forcing the resignation of the Prime Minister Khadga Prasad Sharma Oli and desolution of the house of representatives. An interim government headed by former chief justice Sushila Karki has been appointed.",
      keyMetrics: [
        "5 year election cycle. Mass and violent protests by youth against (popularily referred to as Gen Z protests) took place in September 2025 forcing the resignation of the Prime Minister Khadga Prasad Sharma Oli and desolution of the house of representatives. An interim government headed by former chief justice Sushila Karki has been appointed."
      ]
    },
    deviceAccess: 95.5,
    digitalInclusion: "Higher internet access in urban areas (65%) versus rural regions (22%). Only 53% have 4G coverage.",
    dataCenters: "37 data centres (Internet Society: Pulse)",
    leadershipQuote: {
      text: "Accelerating good governance, development, and prosperity through the use of ICT is the foundation of our nation's digital journey.",
      author: "KP Sharma Oli",
      context: "Prime Minister of Nepal (Digital Nepal Framework)"
    },
    politicalSubParameters: [
      {
        label: "Elections",
        value: "5 year election cycle. Mass and violent protests led to Prime Minister resignation in September 2025. Interim government appointed."
      },
      {
        label: "Governance Structure",
        value: "Federal Democratic Republic since 2008. Seven administrative regions and a bicameral legislature."
      },
      {
        label: "Political Stability",
        value: "Unstable. 27 Prime Ministers since 1990. Voice and Accountability: 55.80. Political Stability: 58.81. Control of Corruption: 35.05. Ranked 107 out of 143."
      },
      {
        label: "Institutional Capacity",
        value: "CPIA Macroeconomic management rating is 3 out of 6, as of 2024."
      },
      {
        label: "Institutional Fragmentation",
        value: "MoCIT has limited coordination power, and the e-Governance Board lacks formal authority."
      },
      {
        label: "Capacity Constraints",
        value: "DPI understanding remains low beyond central ministries. GovTech Index: 0.439."
      }
    ]
  },
  parameterStages: {
    P1: {
      parameter: "AI Ecosystem Maturity",
      parameterStage: "Open to Adopt",
      subParameters: [
        {
          name: "IMF AI Preparedness Index (AIPI)  (2023 dataset)",
          stage: "Open to Adopt"
        },
        {
          name: "National AI Strategy / Policy Status",
          stage: "Early Success"
        },
        {
          name: "AI Governance and Regulatory Frameworks and Ethical AI Principles",
          stage: "Open to Adopt"
        },
        {
          name: "Data Protection and Privacy Legislation",
          stage: "Greenfield"
        },
        {
          name: "Government AI Initiatives and Projects",
          stage: "Open to Adopt"
        }
      ]
    },
    P2: {
      parameter: "DPI Ecosystem Maturity",
      parameterStage: "Maturing",
      subParameters: [
        {
          name: "National Digital Transformation Strategy",
          stage: "Maturing"
        },
        {
          name: "Digital ID",
          stage: "Maturing"
        },
        {
          name: "Digital Payments",
          stage: "Maturing"
        },
        {
          name: "Data Exchange",
          stage: "Open to Adopt"
        },
        {
          name: "Use Cases of DPI Assets",
          stage: "Open to Adopt"
        }
      ]
    },
    P3: {
      parameter: "Digital-Physical Infrastructure",
      parameterStage: "Early Success",
      subParameters: [
        {
          name: "Electricity Access and Reliability",
          stage: "Early Success"
        },
        {
          name: "Internet Penetration",
          stage: "Greenfield"
        },
        {
          name: "Compute and Cloud Capacity",
          stage: "Early Success"
        },
        {
          name: "Digital Inclusion",
          stage: "Open to Adopt"
        }
      ]
    },
    P4: {
      parameter: "Political Stability and Governance",
      parameterStage: "Open to Adopt",
      subParameters: [
        {
          name: "WB Worldwide Governance Indicators - Political Stability Score 2024",
          stage: "Open to Adopt"
        },
        {
          name: "Political stability and DT policy continuity (Requirement of KIIs)",
          stage: "Open to Adopt"
        }
      ]
    },
    P5: {
      parameter: "Stakeholder Participation and Ecosystem Coordination",
      parameterStage: "Open to Adopt",
      subParameters: [
        {
          name: "Lead Agency and Government Coordination",
          stage: "Open to Adopt"
        },
        {
          name: "Private Sector Engagement",
          stage: "Open to Adopt"
        },
        {
          name: "Development Partners and MDBs",
          stage: "Early Success"
        },
        {
          name: "Academic and Research Institutions",
          stage: "Open to Adopt"
        },
        {
          name: "Civil Society Engagement",
          stage: "Open to Adopt"
        }
      ]
    },
    P6: {
      parameter: "Funding Landscape",
      parameterStage: "Greenfield",
      subParameters: [
        {
          name: "Domestic Public Budget for AI/DPI",
          stage: "Early Success"
        }
      ]
    }
  },
  sectionC: {
    actors: [
      {
        id: "np-1",
        name: "MoCIT",
        type: "Lead Agency & Govt Coordination",
        role: "Lead Ministry",
        initiatives: [
          "Digital Nepal Framework",
          "e-Governance Blueprint"
        ]
      },
      {
        id: "np-2",
        name: "e-Governance Commission",
        type: "Lead Agency & Govt Coordination",
        role: "Implementation body",
        initiatives: [
          "Nagarik App"
        ]
      },
      {
        id: "np-3",
        name: "Fonepay",
        type: "Private Sector",
        role: "Fintech Leader",
        initiatives: [
          "NepalPay QR",
          "UPI Cross-border"
        ]
      },
      {
        id: "np-4",
        name: "Rumsan Associates",
        type: "Private Sector",
        role: "DPG Developer",
        initiatives: [
          "Developed Rahat, a DPG for humanitarian agencies supporting marginalized communities"
        ]
      },
      {
        id: "np-5",
        name: "Joint Co-financing (WB & ADB)",
        type: "Development Partners & MDBs",
        role: "Funding & Development Partners",
        initiatives: [
          "World Bank contributing $50 million and ADB contributing $40 million to Nepal Digital Transformation Project; invests in social registry & API framework"
        ]
      },
      {
        id: "np-6",
        name: "Open Knowledge Nepal",
        type: "Civil Society",
        role: "Research & Advocacy",
        initiatives: [
          "Research and advocacy on digital rights and data stewardship"
        ]
      }
    ]
  },
  sectionD: {
    opportunities: [
      {
        id: "np-o1",
        text: "World Bank approved a $50m loan that aims to strengthen Nepal’s digital public infrastructure and improve the delivery and use of inclusive, high-impact digital government services"
      },
      {
        id: "np-o2",
        text: "IFC, Standard Chartered Bank Nepal Limited, and WorldLink Communications Ltd. partner on $29 million project to expand connectivity, create jobs, and drive economic growth"
      },
      {
        id: "np-o3",
        text: "Given Nepal’s focus on digital infrastructure expansion, there is scope for the country to become a part of the 50-in-5 initiative"
      }
    ],
    risks: [
      {
        id: "np-r1",
        text: "Government Integrated Data Center (GIDC) is understaffed and lacks resources including technical infrastructure which led to outages and data loss across 10–15 agencies in 2023"
      },
      {
        id: "np-r2",
        text: "DPI understanding remains low beyond central ministries, limiting sectoral uptake. Nepal scores 0.439 on the GovTech Index, reflecting weak systems and skills across government"
      },
      {
        id: "np-r3",
        text: "The 2024 Draft Cyber Bill has been criticised for potentially enabling government surveillance and censorship - especially through a proposed national internet gateway - while lacking strong privacy safeguards and adequate public consultation"
      }
    ],
    partnerships: [
      {
        id: "np-p1",
        text: "UNDP could support the institutional strengthening of the Government Integrated Data Center (GIDC) by helping design operational standards, cybersecurity protocols, and workforce capacity programmes for digital infrastructure management"
      },
      {
        id: "np-p2",
        text: "Since DPI understanding remains concentrated within central ministries, UNDP could run capacity-building programmes for specific ministries to increase adoption of digital systems"
      },
      {
        id: "np-p3",
        text: "With concerns around the 2024 Draft Cyber Bill, UNDP could facilitate multi-stakeholder dialogue and technical assistance on data protection and cybersecurity legislation, ensuring alignment with international norms"
      }
    ]
  },
  sources: [
    "https://nepaleconomicforum.org/a-view-on-the-national-ai-policy/",
    "https://asiapacific.unfpa.org/en/news/sita-nepals-new-ai-tool-could-change-how-country-uses-data",
    "https://www.datacentermap.com/nepal/",
    "https://nagarikapp.gov.np/"
  ]
};
