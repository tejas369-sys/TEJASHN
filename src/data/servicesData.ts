export interface ServiceDetail {
  id: string;
  slug: string;
  title: string;
  shortDescription: string;
  fullOverview: string;
  statutoryContext: string;
  iconName: string;
  subsections: {
    title: string;
    description: string;
    keyDeliverables: string[];
  }[];
  strategicValue: string;
  proceduralHighlights: string[];
}

export const servicesData: ServiceDetail[] = [
  {
    id: 'patent-filing',
    slug: 'patent-filing',
    title: 'Patent Filing',
    shortDescription: 'End-to-end patent preparation, technical drafting, and statutory filing across Indian, foreign, and PCT jurisdictions.',
    fullOverview: 'At pianoIP, patent filing is practiced as an art of rigorous technical synthesis and statutory foresight. An effective patent application must withstand rigorous scrutiny by examiners worldwide while fortifying the commercial exclusivity of the underlying invention. We handle the complete trajectory—from harvesting initial inventive concepts to drafting robust claim sets and managing international filings under the Patent Cooperation Treaty (PCT).',
    statutoryContext: 'Governed primarily by the Patents Act, 1970 (India), the Patent Cooperation Treaty (PCT administered by WIPO), and respective national jurisdictions (USPTO, EPO, JPO, etc.).',
    iconName: 'FileText',
    subsections: [
      {
        title: 'Invention Harvesting & Scoping',
        description: 'Collaborating directly with engineering and R&D teams to uncover patentable subject matter from ongoing technological developments before public disclosures or publication.',
        keyDeliverables: [
          'Invention disclosure form (IDF) structuring',
          'Identification of patentable inventive concepts',
          'Prioritization matrix based on commercial roadmap'
        ]
      },
      {
        title: 'Prior Art & Patentability Search',
        description: 'Rigorous global searches across patent databases and non-patent technical literature to evaluate novelty, inventive step (non-obviousness), and industrial applicability.',
        keyDeliverables: [
          'Global novelty assessment report',
          'Citation mapping of closest prior art references',
          'Strategic drafting recommendations to circumvent existing citations'
        ]
      },
      {
        title: 'Patent Drafting (Provisional & Complete)',
        description: 'Meticulous authoring of patent specifications, including clear background, detailed descriptions, high-precision technical drawings, and defensive multi-tiered claim architecture.',
        keyDeliverables: [
          'Provisional specifications for immediate priority date securing',
          'Comprehensive complete specifications with robust independent & dependent claims',
          'Formal drawings conforming to patent office technical standards'
        ]
      },
      {
        title: 'Filing & Multi-Jurisdictional Prosecution',
        description: 'Statutory filing at the Indian Patent Office (IPO), direct foreign national filings, and PCT international applications to establish global priority across 155+ member countries.',
        keyDeliverables: [
          'IPO e-filing and official receipt documentation',
          'PCT International Applications & Chapter I/II filings',
          'Preparation of replies to First Examination Reports (FER) and hearing representations'
        ]
      },
      {
        title: 'Post-Grant Maintenance & Renewals',
        description: 'Tracking statutory annuities and compliance mandates to ensure patent rights remain enforceable throughout their full 20-year term without unintentional lapse.',
        keyDeliverables: [
          'Global annuity tracking and docketing alerts',
          'Timely payment of renewal fees to patent offices',
          'Working of patents statement (Form 27 in India) compliance'
        ]
      }
    ],
    strategicValue: 'Secures a legally enforceable monopoly for 20 years, safeguarding proprietary technology against infringement, establishing negotiating leverage in partnerships, and enhancing corporate valuation.',
    proceduralHighlights: [
      'Provisional Filing secures priority with 12 months to complete',
      'PCT Route provides 30–31 months to enter target national phases',
      'Defensive claim drafting designed for litigation resilience'
    ]
  },
  {
    id: 'patent-analytics',
    slug: 'patent-analytics',
    title: 'Patent Analytics',
    shortDescription: 'In-depth technology landscape analysis, Freedom to Operate (FTO) clearances, competitor patent watch, and validity assessments.',
    fullOverview: 'Technological leadership requires clear visibility into the surrounding patent landscape. pianoIP translates complex patent data into actionable commercial intelligence. Whether validating an R&D trajectory, clearing a product before market launch, or assessing the vulnerability of competitor rights, our analytical rigor protects businesses from catastrophic infringement disputes and identifies untapped white spaces.',
    statutoryContext: 'Groundwork for mitigating liability under patent infringement doctrines, assessing novelty/obviousness under Sections 2(1)(j) & 3 of the Patents Act, 1970, and establishing invalidity grounds.',
    iconName: 'BarChart3',
    subsections: [
      {
        title: 'State-of-the-Art & Landscape Analysis',
        description: 'Panoramic technological mapping to identify historical research trends, emerging technical clusters, key patent assignees, and vacant white spaces for strategic R&D investment.',
        keyDeliverables: [
          'Technology trend evolution charts and domain clustering',
          'Competitor filing velocity and geographic filing footprint',
          'White space opportunity analysis for targeted innovation'
        ]
      },
      {
        title: 'Freedom to Operate (FTO) / Clearance Search',
        description: 'Critical pre-launch clearance investigations to ensure your product, process, or system does not infringe valid, in-force patents within target commercial jurisdictions.',
        keyDeliverables: [
          'Jurisdiction-specific in-force patent mapping',
          'Element-by-element claim charting against product specifications',
          'Infringement risk categorization and design-around recommendations'
        ]
      },
      {
        title: 'Patent Watch & Competitive Intelligence',
        description: 'Continuous monitoring of competitor filings, published applications, and industry-specific IPC/CPC classifications to alert decision-makers of emerging threats.',
        keyDeliverables: [
          'Periodic competitive bulletin with technical summaries',
          'Alerts on newly published rival patent applications',
          'Early warning for pre-grant or post-grant opposition windows'
        ]
      },
      {
        title: 'Validity & Invalidity Searches',
        description: 'Deep investigative research to determine whether a granted patent meets statutory validity criteria, uncovering hidden prior art to challenge or invalidate hostile patents.',
        keyDeliverables: [
          'Global multi-language prior art discovery report',
          'Anticipation (Section 13) and obviousness mapping against claim elements',
          'Exhibits and evidence portfolios for opposition or revocation proceedings'
        ]
      }
    ],
    strategicValue: 'De-risks multi-million dollar product launches, prevents costly litigation injunctions, reveals competitor R&D pipelines, and provides defensive weapons in licensing discussions.',
    proceduralHighlights: [
      'Element-by-element claim analysis against commercial embodiment',
      'Targeted searching of non-patent literature (NPL) and international databases',
      'Actionable risk mitigation matrices for executive decision-makers'
    ]
  },
  {
    id: 'portfolio-management',
    slug: 'ip-portfolio-management',
    title: 'IP Portfolio Management',
    shortDescription: 'Strategic alignment of patent, trademark, and design assets with business objectives, commercialization roadmaps, and renewal lifecycles.',
    fullOverview: 'An intellectual property portfolio is not merely a collection of certificates—it is an active corporate asset engine. pianoIP assists organizations in systematically auditing, maintaining, and rationalizing their IP holdings. We ensure every asset serves an ongoing commercial or defensive purpose, pruning redundant filings while maximizing the return on innovation capital.',
    statutoryContext: 'Governed by statutory maintenance deadlines, assignment recordals, licensing frameworks under Section 68 of the Patents Act, and international portfolio maintenance standards.',
    iconName: 'ShieldCheck',
    subsections: [
      {
        title: 'IP Portfolio Auditing & Health Check',
        description: 'Comprehensive inventory and forensic audit of all patents, trademarks, and designs across active jurisdictions to assess legal status, title chain, and alignment with corporate products.',
        keyDeliverables: [
          'Consolidated IP registry with ownership verification',
          'Alignment score linking patent claims to revenue-generating products',
          'Identification of orphaned or redundant filings'
        ]
      },
      {
        title: 'Annuity & Renewal Optimization',
        description: 'Centralized tracking of critical renewal windows, official fees, and local agent costs, balancing portfolio longevity with cost-efficiency.',
        keyDeliverables: [
          'Automated renewal docketing and expenditure forecasting',
          'Pruning recommendations for obsolete technologies to reduce holding costs',
          'Multi-jurisdictional renewal execution and receipt repository'
        ]
      },
      {
        title: 'Commercialization & Licensing Strategy',
        description: 'Advising on licensing models, cross-licensing frameworks, and assignment agreements to monetize dormant innovations or expand market penetration.',
        keyDeliverables: [
          'Licensing package preparation and valuation indicators',
          'Drafting and review of IP licensing and technology transfer agreements',
          'Statutory recordal of assignments and licenses with IP authorities'
        ]
      },
      {
        title: 'Mergers, Acquisitions & Due Diligence',
        description: 'Rigorous legal and technical IP due diligence for venture capital investment, technology buyouts, and corporate mergers to verify ownership and uncover hidden encumbrances.',
        keyDeliverables: [
          'Freedom from encumbrance and chain-of-title verification',
          'Patent quality and enforceability evaluation',
          'Risk exposure synthesis for investment committees'
        ]
      }
    ],
    strategicValue: 'Eliminates wasted renewal expenses, safeguards ownership title during corporate transactions, and transforms passive legal expenses into defensible enterprise value.',
    proceduralHighlights: [
      'Periodic portfolio tiering (Core, Defensive, Prunable)',
      'Statutory compliance tracking for assignments and licenses',
      'Long-term cost forecasting across domestic and foreign portfolios'
    ]
  },
  {
    id: 'trademark-services',
    slug: 'trademark-services',
    title: 'Trademark Services',
    shortDescription: 'Comprehensive trademark availability clearance, class classification, application filing, prosecution, opposition, and renewal.',
    fullOverview: 'A trademark is the physical embodiment of brand trust, reputation, and goodwill. pianoIP delivers comprehensive trademark counsel to protect brand identities, logos, slogans, and trade dress. From thorough pre-filing clearance across all 45 Nice Classification classes to aggressively overcoming examination objections and managing opposition proceedings, we ensure your commercial identity remains unassailable.',
    statutoryContext: 'Governed by the Trade Marks Act, 1999 and Trade Marks Rules, 2017 (India), and the Madrid Protocol for international trademark registration administered by WIPO.',
    iconName: 'Sparkles',
    subsections: [
      {
        title: 'Comprehensive Trademark Clearance Searches',
        description: 'Exhaustive phonetic, visual, and conceptual searches across the Trademark Registry database to assess registration availability and identify conflicting marks before market investment.',
        keyDeliverables: [
          'Detailed clearance opinion detailing registrability risks',
          'Cross-class search analysis under Nice Classification',
          'Risk mitigation advice on mark adaptation or disclaimers'
        ]
      },
      {
        title: 'Filing & Examination Prosecution',
        description: 'Preparation and filing of trademark applications (Form TM-A), responding to official examination reports addressing Section 9 (absolute grounds) and Section 11 (relative grounds) objections.',
        keyDeliverables: [
          'Accurate specification of goods and services under relevant classes',
          'Comprehensive legal replies to official examination reports',
          'Advocacy and attendance at show-cause hearings before the Registrar'
        ]
      },
      {
        title: 'Opposition & Rectification Proceedings',
        description: 'Safeguarding proprietary trademarks against copycat filings through formal opposition notices, evidence affidavits, and counter-statements.',
        keyDeliverables: [
          'Monitoring of the Trade Marks Journal for conflicting published marks',
          'Drafting and filing Notices of Opposition and Counter-Statements',
          'Preparation of evidence under Rule 45, 46, and 47 and final hearing representation'
        ]
      },
      {
        title: 'International Filings (Madrid Protocol)',
        description: 'Cost-effective global brand extension through the Madrid System, allowing centralized filing across 130+ member countries using a single international application.',
        keyDeliverables: [
          'Madrid Protocol international application preparation (MM2)',
          'Handling of national office provisional refusals via local associate network',
          'Subsequent designation and portfolio management'
        ]
      }
    ],
    strategicValue: 'Establishes statutory ownership and nationwide exclusive rights to your commercial identity, prevents brand confusion, and empowers instant enforcement against counterfeiters.',
    proceduralHighlights: [
      'Protection extends for 10-year renewable cycles indefinitely',
      'Proper classification across Nice classes prevents scope dilution',
      'Madrid route enables streamlined global brand expansion'
    ]
  },
  {
    id: 'copyright-services',
    slug: 'copyright-services',
    title: 'Copyright Services',
    shortDescription: 'Statutory copyright registration, ownership structuring, software code protection, licensing agreements, and anti-piracy counsel.',
    fullOverview: 'In an era of frictionless digital distribution, protecting original expression is vital. pianoIP provides complete copyright advisory for authors, software companies, designers, and creators. We secure statutory registration certificates from the Copyright Office, clarify complex ownership questions in collaborative works, and draft ironclad assignment agreements that prevent costly disputes over intellectual ownership.',
    statutoryContext: 'Governed by the Copyright Act, 1957 (amended in 2012) and Copyright Rules, 2013 (India), conforming to the Berne Convention and TRIPS Agreement.',
    iconName: 'BookOpen',
    subsections: [
      {
        title: 'Statutory Copyright Registration',
        description: 'End-to-end management of copyright filings for software source code, artistic works, literary texts, website layouts, sound recordings, and cinematographic films.',
        keyDeliverables: [
          'Preparation of Form XIV, Statement of Particulars (SoP), and Statement of Further Particulars (SoFP)',
          'Statutory deposit of source code extracts, literary copies, or artwork samples',
          'Handling Registrar discrepancies, discrepancy letters, and hearing notices'
        ]
      },
      {
        title: 'Authorship vs. Ownership Counsel',
        description: 'Navigating statutory work-for-hire provisions, independent contractor agreements, and employer-employee IP covenants to ensure undisputed corporate ownership.',
        keyDeliverables: [
          'Review of employment contracts and IP assignment clauses',
          'Structuring of commissioning and consulting IP transfer terms',
          'Resolution of moral rights (Section 57) waivers and creator attribution'
        ]
      },
      {
        title: 'Licensing, Assignment & Royalties',
        description: 'Drafting structured agreements for the commercial exploitation, syndication, and distribution of creative assets while preserving residual rights.',
        keyDeliverables: [
          'Custom copyright assignment deeds with mandatory statutory recitals',
          'Software end-user license agreements (EULA) and SaaS IP boundaries',
          'Royalty schedules and territorial distribution terms'
        ]
      },
      {
        title: 'Infringement Advisory & Digital Enforcement',
        description: 'Strategic counsel for addressing unauthorized copying, online piracy, and digital infringement, including statutory cease-and-desist notices.',
        keyDeliverables: [
          'Pre-litigation infringement analysis and evidence preservation',
          'Statutory Cease & Desist legal demand notices',
          'Digital Millennium Copyright Act (DMCA) and intermediary takedown notices'
        ]
      }
    ],
    strategicValue: 'Secures prima facie evidence of originality and ownership in court (Section 48 of Copyright Act), establishing statutory rights that span the author’s life plus 60 years.',
    proceduralHighlights: [
      'Mandatory 30-day statutory waiting period for third-party objections',
      'No Examination of technical merit—focuses on originality of expression',
      'Automatic reciprocal protection across 180+ Berne Convention countries'
    ]
  },
  {
    id: 'industrial-design',
    slug: 'industrial-design-protection',
    title: 'Industrial Design Protection',
    shortDescription: 'Protecting novel aesthetic shapes, surface patterns, configurations, and ornamentation under the Designs Act, 2000.',
    fullOverview: 'When consumers make purchase decisions, aesthetic design is frequently the decisive differentiator. The visual appeal, ergonomic contours, and ornamental character of an article are proprietary assets that demand statutory protection. pianoIP guides industrial manufacturers, consumer product companies, and automotive creators through design registration under the Designs Act, 2000, safeguarding unique visual expressions from imitation.',
    statutoryContext: 'Governed strictly by the Designs Act, 2000 and Designs Rules, 2001 (India), utilizing the international Locarno Classification system for industrial designs.',
    iconName: 'Shapes',
    subsections: [
      {
        title: 'Design Novelty & Registrability Assessment',
        description: 'Evaluating proposed product designs to verify novelty, originality, and absence of prior publication in India or any other country before statutory filing.',
        keyDeliverables: [
          'Prior publication search across Indian and international design databases',
          'Assessment of aesthetic non-functionality (excluding purely functional mechanisms)',
          'Strategic grouping of design variations and color schemes'
        ]
      },
      {
        title: 'Representation Drafting & Locarno Classification',
        description: 'Preparing high-precision photographic, orthographic, and isometric visual representations that strictly conform to official design filing guidelines.',
        keyDeliverables: [
          'Comprehensive 7-view representations (Perspective, Front, Back, Left, Right, Top, Bottom)',
          'Precise classification of the article under the Locarno System (Classes 01–32)',
          'Drafting of novelty statements claiming novelty in shape, pattern, or configuration'
        ]
      },
      {
        title: 'Filing & Official Objection Prosecution',
        description: 'Lodging Form-1 applications at the Patent Office (Design Wing, Kolkata) and addressing official objection letters regarding clarity, novelty, or disclaimers.',
        keyDeliverables: [
          'Official e-filing with Application Number and priority receipt',
          'Preparation of formal written responses to Controller objections',
          'Personal hearing representation before the Controller of Designs'
        ]
      },
      {
        title: 'Extension of Copyright & Design Enforcement',
        description: 'Managing statutory renewal for the second 5-year term and advising on design piracy actions (Section 22) against unauthorized commercial imitators.',
        keyDeliverables: [
          'Timely filing of Form-3 for 5-year copyright extension (up to 15 years total)',
          'Cease-and-desist notices against pirated designs and counterfeit products',
          'Assistance with statutory civil recovery and damages claims'
        ]
      }
    ],
    strategicValue: 'Grants exclusive monopoly over visual appearance for up to 15 years, preventing competitors from copying your product’s distinct silhouette, casing, or packaging.',
    proceduralHighlights: [
      'Rapid examination cycle compared to utility patents (often 6–10 months)',
      'Initial 10-year term extendable by another 5 years',
      'Protects aesthetic form and ornamentation, not internal mechanical functions'
    ]
  }
];
