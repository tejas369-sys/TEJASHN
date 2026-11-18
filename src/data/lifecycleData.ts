export interface LifecycleStage {
  step: number;
  id: string;
  title: string;
  subtitle: string;
  timelineWindow: string;
  description: string;
  keyActions: string[];
  strategicImpact: string;
  officialProcedures: string[];
}

export const patentLifecycleStages: LifecycleStage[] = [
  {
    step: 1,
    id: 'invention-harvesting',
    title: 'Invention Harvesting',
    subtitle: 'Capturing Raw Innovation',
    timelineWindow: 'Day 0 · Inception Phase',
    description: 'Every great invention begins with an idea, but how do you identify which ideas have the potential to become valuable intellectual property?\n\nInvention harvesting is the first step in the process of identifying, evaluating and documenting innovative concepts within an organisation. At Piano IP, we help businesses uncover patentable innovations, assess their potential and build a strong foundation for intellectual property protection, by conducting brainstorming sessions, awareness workshops, and project review meetings with research team',
    keyActions: [
      'Structured technical interviews with inventors and lead architects',
      'Completion of standardized Invention Disclosure Forms (IDFs)',
      'Categorization into core inventions vs. incremental improvements',
      'Establishment of non-disclosure safeguards and inventorship rosters'
    ],
    strategicImpact: 'Prevents unintentional loss of novelty through premature disclosure and aligns R&D output with company valuation goals.',
    officialProcedures: [
      'Execution of Inventor Non-Disclosure Agreements (NDAs)',
      'Verification of employer-employee patent assignment terms'
    ]
  },
  {
    step: 2,
    id: 'patentability-search',
    title: 'Patentability Search',
    subtitle: 'Global Prior Art Evaluation',
    timelineWindow: 'Weeks 1 – 3 · Search Phase',
    description: 'Though optional, Patentability Search is a crucial step in the patent lifecycle. It helps to determine whether an invention can meet the patentability criteria before investing time and resources in drafting and filing. It involves a comprehensive search of published patent and non-patent literature to identify prior art and assess the patentability of the invention.\n\nOnce the search is done, the findings can facilitate the inventors and businesses understand the patentability potential of their ideas, identify possible challenges, and opportunities to improve the invention.\n\nWith industry experience and in-depth technical expertise, we deliver reliable, strategic patentability search services that support confident and well-informed patent decisions.',
    keyActions: [
      'Multi-lingual keyword and classification (IPC/CPC) search strings',
      'Semantic and citation mapping against closest existing prior art',
      'Element-by-element comparison matrix with the harvested invention',
      'Authoring a comprehensive Novelty Assessment & Patentability Opinion'
    ],
    strategicImpact: 'Identifies potential rejection roadblocks early, saving substantial filing costs and enabling claim drafting that steers clear of cited prior art.',
    officialProcedures: [
      'Prior Art Search Report generation',
      'Risk categorization and scope modification recommendations'
    ]
  },
  {
    step: 3,
    id: 'patent-drafting',
    title: 'Patent Drafting',
    subtitle: 'Architecting the Specification & Claims',
    timelineWindow: 'Weeks 3 – 6 · Preparation Phase',
    description: 'It wouldn’t be wrong to say that a strong patent begins with a well-structured techno-legal application that clearly communicates the invention and defines the extent of protection sought.\n\nThat’s why Patent Drafting is an important stage that involves translating complex technical concepts into precise legal and technical language. The application typically includes a detailed description, claims, abstract and relevant drawings, where applicable. The claims are particularly important as they establish the boundaries of the protection being sought.\n\nAt Piano IP, we combine technical understanding with patent expertise to prepare comprehensive patent specifications. These specifications accurately represent the invention, address applicable legal requirements and establish a strong foundation for the examination and grant process.',
    keyActions: [
      'Drafting technical background, summary, and industrial utility',
      'Drafting multiple embodiment descriptions to ensure broad enablement',
      'Structuring layered claims to withstand post-grant validity attacks',
      'Creating formal orthographic and schematic drawings conforming to patent rules'
    ],
    strategicImpact: 'A robustly drafted claim set prevents competitors from creating easy workarounds and withstands rigorous court scrutiny in litigation.',
    officialProcedures: [
      'Preparation of Form 2 (Complete or Provisional Specification in India)',
      'Formal drawing preparation conforming to Rule 15 standards'
    ]
  },
  {
    step: 4,
    id: 'patent-filing',
    title: 'Patent Filing',
    subtitle: 'Securing Statutory Priority Date',
    timelineWindow: 'Week 6 / Month 0 · Formal Lodgment',
    description: 'Protecting an invention in the right market is an important part of an effective intellectual property strategy. Whether seeking protection in India or exploring opportunities in international markets, choosing the appropriate filing route is very essential.\n\nPiano IP assists inventors, startups and established businesses with Indian patent applications, foreign patent filings and applications under the Patent Cooperation Treaty (PCT).\n\nWe help manage filing procedures, documentation and statutory timelines.',
    keyActions: [
      'Electronic filing with the Indian Patent Office or foreign national registries',
      'Submission of formal inventor declarations, power of attorney, and assignment forms',
      'PCT International Application filing to preserve priority across 155+ countries',
      'Generating formal filing receipts, official application numbers, and docketing'
    ],
    strategicImpact: 'Pins down the legal priority timestamp worldwide, granting the applicant formal "Patent Pending" status and defensive market positioning.',
    officialProcedures: [
      'Filing of Form 1 (Application for Grant of Patent)',
      'Form 3 (Statement & Undertaking under Section 8) and Form 5 (Declaration of Inventorship)',
      'WIPO PCT Request Form and Fee Calculation'
    ]
  },
  {
    step: 5,
    id: 'patent-prosecution',
    title: 'Patent Prosecution',
    subtitle: 'Examination, Objections & Grant',
    timelineWindow: 'Months 18 – 48 · Examination Cycle',
    description: 'A patent application undergoes examination by the patent office to determine whether the invention meets the applicable requirements for patentability. During this process, applicants may receive examination reports raising objections relating to novelty, inventive step, clarity or other statutory requirements. Addressing these objections requires a clear understanding of patent law, technical specifications and examination procedures.\n\nWe support applicants throughout patent prosecution by analysing examination reports, preparing detailed responses, recommending appropriate claim amendments and assisting with written submissions and hearings before the patent office. Our approach is very simple. We focus on addressing objections effectively while safeguarding the intended scope of the invention.',
    keyActions: [
      'Filing Request for Examination (Form 18) or Request for Expedited Examination (Form 18A)',
      'Analyzing objections raised under Section 2(1)(j), Section 3 (non-patentable subject matter), and Section 10',
      'Drafting technical counter-arguments, comparative tables, and claim amendments',
      'Personal representation before the Controller of Patents during oral hearings'
    ],
    strategicImpact: 'Converts a pending application into a granted, enforceable patent while defending the broadest possible claim scope allowed by law.',
    officialProcedures: [
      'Reply to First Examination Report (FER) within statutory 6-month deadline',
      'Written Submissions following Controller Hearing',
      'Issuance of formal Certificate of Grant under Section 43'
    ]
  },
  {
    step: 6,
    id: 'patent-maintenance',
    title: 'Patent Maintenance',
    subtitle: 'Annuities, Renewals & Commercial Working',
    timelineWindow: 'Years 3 – 20 · Commercial Enforcement',
    description: 'If you think that obtaining a patent is the end of the journey, think again.\n\nMaintaining a granted patent active and legally enforceable needs timely renewals and adherence to statutory obligations throughout its term. Failure to maintain may result in the patent ceasing to have effect.\n\nA granted patent can generally remain in force for 20 years from its filing date, which is subject to compliance with renewal requirements. And we at Piano IP help patent owners track renewal schedules, manage statutory fee payments and monitor relevant compliance requirements. We ensure that there is no risk of missed deadlines and support the continued protection of valuable intellectual property.',
    keyActions: [
      'Automated docketing and tracking of statutory annuity deadlines across all jurisdictions',
      'Timely disbursement of official renewal fees to respective patent offices',
      'Annual collation and submission of Working of Patents statement (Form 27)',
      'Monitoring marketplace for potential infringers and licensing prospects'
    ],
    strategicImpact: 'Maintains uninterrupted legal exclusivity for up to 20 years from the earliest filing date, protecting the underlying revenue stream.',
    officialProcedures: [
      'Payment of Renewal Fees under Section 142 and Rule 80',
      'Submission of Form 27 (Statement regarding the working of a patented invention on a commercial scale)'
    ]
  },
  {
    step: 7,
    id: 'patent-expiry',
    title: 'Patent Expiry',
    subtitle: 'Transition to Public Domain & Legacy Asset Value',
    timelineWindow: 'Year 20 · Term Completion',
    description: 'Upon the expiration of the full 20-year term from the filing date, the patented subject matter formally enters the public domain. Strategic planning ensures the brand, proprietary trade secrets, industrial designs, and successor patent improvements continue protecting the broader commercial ecosystem.',
    keyActions: [
      'Term audit confirming completion of statutory 20-year term',
      'De-docketing and portfolio archival of expired assets',
      'Securing trade secrets and adjacent trademark/design protections',
      'Formulating evergreen continuation or next-generation patent filing strategies'
    ],
    strategicImpact: 'Allows orderly transition while ensuring brand equity (trademarks) and second-generation improvements retain ongoing commercial leadership.',
    officialProcedures: [
      'Notice of Cessation of Patent under Section 53',
      'Archival of statutory register entries'
    ]
  }
];
