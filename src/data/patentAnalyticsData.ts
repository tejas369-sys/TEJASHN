export interface PatentAnalyticsPage {
  id: string;
  pageNumber: string;
  tabLabel: string;
  title: string;
  paragraphs: string[];
}

export const patentAnalyticsPages: PatentAnalyticsPage[] = [
  {
    id: 'patent-analytics',
    pageNumber: '01',
    tabLabel: 'Patent Analytics',
    title: 'Patent Analytics',
    paragraphs: [
      'Ever wondered what can patent data reveal about your competitors, emerging technologies and future market opportunities?',
      'Patent analytics involves examining patent databases to identify innovation trends, technology landscapes, competitor activities and potential research opportunities. At Piano IP, we transform complex patent information into actionable insights. We only focus on helping businesses make informed decisions, identify technology gaps, assess competitive positioning and strengthen their intellectual property strategies.'
    ]
  },
  {
    id: 'landscape-analysis',
    pageNumber: '02',
    tabLabel: 'Landscape Analysis',
    title: 'State of the Art Search / Landscape Analysis',
    paragraphs: [
      'Before investing in research and development, how well do you understand the existing technology landscape? A State-of-the-Art Search identifies existing technical knowledge, published patents, research papers and other relevant disclosures in a particular field. Patent Landscape Analysis takes this further by mapping technological developments, key innovators, patent ownership and emerging trends.',
      'We, at Piano IP conduct detailed searches and analyse patent information to help businesses understand the competitive environment, identify technology gaps, evaluate innovation opportunities and make informed decisions about their research, development and intellectual property strategies.'
    ]
  },
  {
    id: 'fto-clearance',
    pageNumber: '03',
    tabLabel: 'FTO',
    title: 'Freedom to Operate (FTO) / Clearance Search',
    paragraphs: [
      'Have you ensured that your product or technology is free from potential patent infringement risks before entering the market?',
      'A Freedom to Operate (FTO) search evaluates existing patent rights that may restrict the commercial development, manufacture, use or sale of a particular product or process in a specific jurisdiction. It helps businesses identify potentially relevant active patent claims and assess possible infringement concerns before committing resources to commercialisation.',
      'We conduct focused FTO and clearance searches, analysing relevant patent documents and providing insights that support risk assessment, product development decisions and market-entry strategies.'
    ]
  },
  {
    id: 'patent-watch',
    pageNumber: '04',
    tabLabel: 'Patent Watch',
    title: 'Patent Watch',
    paragraphs: [
      'In a constantly evolving innovation landscape, it is very crucial that you stay informed about new patent activity, as it can give businesses a strategic advantage. Patent Watch involves systematically monitoring newly published patent applications, granted patents and developments within selected technology areas or competitor portfolios.',
      "It enables businesses and organisations to track emerging innovations, monitor competitors' intellectual property activities and identify potential developments that may influence their business or research direction.",
      'Piano IP provides patent monitoring support which is tailored to specific technologies, companies and industry interests. We help clients stay updated on relevant patent developments and respond proactively to changes in their competitive and technological environment.'
    ]
  },
  {
    id: 'validity-search',
    pageNumber: '05',
    tabLabel: 'Validity',
    title: 'Validity / Invalidity Search',
    paragraphs: [
      'How strong is your existing patent, and does it meet the legal requirements for patent protection?',
      'A Patent Validity or Invalidity Search examines relevant prior-art documents and other publicly available technical disclosures to assess the strength of a granted patent or pending application. These searches are particularly valuable during patent acquisition, licensing negotiations, litigation and opposition proceedings. Piano IP conducts comprehensive searches across patent databases and other technical literature to identify relevant prior art that may support or challenge the validity of patent claims.',
      'Our findings help businesses and patent owners to make better-informed intellectual property decisions.'
    ]
  }
];
