import React from 'react';
import { ArrowRight, ArrowUpRight, Scale, Cpu, Globe2, ShieldCheck, Compass, CheckCircle2 } from 'lucide-react';

interface AboutPageProps {
  onNavigate: (view: string, serviceId?: string) => void;
  onOpenConsultation: () => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate, onOpenConsultation }) => {
  return (
    <div className="w-full pt-20">
      {/* Editorial Page Header */}
      <section className="py-16 sm:py-20 bg-[#111C2B] text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-dark-staff-lines opacity-30 pointer-events-none" />
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4 sm:space-y-6 relative z-10">
          <span className="text-xs uppercase tracking-[0.2em] text-[#B49A68] font-semibold block">
            About pianoIP
          </span>
          <h1 className="font-serif-display text-3xl sm:text-5xl md:text-6xl font-bold text-[#FFFEFA] tracking-tight text-balance">
            Where Innovation Meets Precision
          </h1>
          <p className="text-sm sm:text-lg text-[#FFFEFA]/80 max-w-2xl mx-auto font-light leading-relaxed">
            An intellectual property consultancy engineered to bridge legal scholarship, deep technology, and strategic commercial foresight.
          </p>
        </div>
      </section>

      {/* Section 1 — Company Overview & Foundation */}
      <section className="py-12 sm:py-20 lg:py-24 bg-[#F7F4ED] text-[#151515]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 sm:space-y-8">
          <div className="space-y-4">
            <span className="text-xs uppercase tracking-widest text-[#B49A68] font-semibold block">
              The Firm
            </span>
            <h2 className="font-heading text-2xl sm:text-4xl font-bold text-[#111C2B] text-balance">
              Dedicated to Safeguarding Intellectual and Aesthetic Assets
            </h2>
          </div>

          <div className="prose prose-base sm:prose-lg text-[#151515]/85 space-y-4 sm:space-y-5 leading-relaxed font-normal">
            <p>
              <strong>pianoIP</strong> is a specialized Intellectual Property consultancy providing end-to-end patent, trademark, copyright, industrial design, patent analytics, and strategic portfolio management services. We assist technology creators, research institutions, industrial enterprises, and emerging ventures in transforming proprietary innovations into robust, enforceable legal assets.
            </p>
            <p>
              In competitive global markets, obtaining an intellectual property registration is merely the first threshold. The true measure of an IP asset lies in its resilience under judicial examination, its ability to deter predatory competitor conduct, and its utility in anchoring commercial licensing, joint ventures, and capital transactions.
            </p>
            <p>
              Our practice is established upon a disciplined intersection: deep technical comprehension of engineering and scientific disciplines, combined with exhaustive mastery of domestic and international statutory frameworks.
            </p>
          </div>

          {/* Three Structural Pillars */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6 pt-4 sm:pt-6">
            <div className="p-5 sm:p-6 bg-[#FFFEFA] rounded-xl border border-[#111C2B]/10 space-y-3 shadow-sm">
              <Scale className="w-6 h-6 text-[#B49A68]" />
              <h3 className="font-heading text-lg font-bold text-[#111C2B]">
                Legal Rigor
              </h3>
              <p className="text-xs text-[#85827C] leading-relaxed">
                Adherence to statutory standards across the Patents Act, Trade Marks Act, Copyright Act, and Designs Act, ensuring defensive enforceability.
              </p>
            </div>

            <div className="p-5 sm:p-6 bg-[#FFFEFA] rounded-xl border border-[#111C2B]/10 space-y-3 shadow-sm">
              <Cpu className="w-6 h-6 text-[#B49A68]" />
              <h3 className="font-heading text-lg font-bold text-[#111C2B]">
                Technical Insight
              </h3>
              <p className="text-xs text-[#85827C] leading-relaxed">
                Direct engagement with technical inventors to capture nuanced architectural innovations, claims, and non-obvious engineering leaps.
              </p>
            </div>

            <div className="p-5 sm:p-6 bg-[#FFFEFA] rounded-xl border border-[#111C2B]/10 space-y-3 shadow-sm">
              <Globe2 className="w-6 h-6 text-[#B49A68]" />
              <h3 className="font-heading text-lg font-bold text-[#111C2B]">
                Global Perspective
              </h3>
              <p className="text-xs text-[#85827C] leading-relaxed">
                Navigating cross-border PCT pathways, Madrid Protocol filings, and regional patent conventions to establish worldwide priority.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2 — The Multidisciplinary Approach & Philosophy (Dark Section) */}
      <section className="py-14 sm:py-20 lg:py-24 bg-[#111C2B] text-white relative">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 sm:space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <span className="text-xs uppercase tracking-[0.2em] text-[#B49A68] font-semibold block">
              Methodology
            </span>
            <h2 className="font-heading text-2xl sm:text-4xl md:text-5xl font-bold text-[#FFFEFA]">
              The Philosophy of Precision & Strategic Intelligence
            </h2>
            <p className="text-sm sm:text-base text-[#FFFEFA]/80 leading-relaxed font-light">
              Why the metaphor of the piano defines our standard of legal and technical practice.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 items-stretch">
            <div className="p-5 sm:p-8 bg-[#151515] border border-[#B49A68]/30 rounded-2xl space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <span className="text-xs uppercase tracking-widest text-[#B49A68] font-semibold">
                  Acoustic Engineering × Patent Craft
                </span>
                <h3 className="font-heading text-xl sm:text-2xl font-bold text-[#FFFEFA]">
                  The Mechanics of Harmony
                </h3>
                <p className="text-sm text-[#FFFEFA]/80 leading-relaxed">
                  A concert grand piano comprises over twelve thousand individual components. A microscopic deviation in hammer alignment, string tension, or key balance compromises the entire acoustic performance.
                </p>
                <p className="text-sm text-[#FFFEFA]/80 leading-relaxed">
                  Intellectual property operates on identical principles. A single ambiguous limitation in an independent patent claim, a misclassified trademark class, or an unverified assignment recordal can unravel years of commercial leverage. We approach every specification with unyielding structural precision.
                </p>
              </div>
              <div className="pt-4 border-t border-[#FFFEFA]/10 text-xs text-[#B49A68] font-mono">
                Tenet 01 · Zero Tolerance for Ambiguity
              </div>
            </div>

            <div className="p-5 sm:p-8 bg-[#151515] border border-[#B49A68]/30 rounded-2xl space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <span className="text-xs uppercase tracking-widest text-[#B49A68] font-semibold">
                  Cadence & Strategic Timing
                </span>
                <h3 className="font-heading text-xl sm:text-2xl font-bold text-[#FFFEFA]">
                  Tempo in Global Execution
                </h3>
                <p className="text-sm text-[#FFFEFA]/80 leading-relaxed">
                  Timing is everything in intellectual property law. Priority dates, Paris Convention 12-month deadlines, PCT 30-month national phase entries, and first-to-file principles dictate winners and losers in innovation races.
                </p>
                <p className="text-sm text-[#FFFEFA]/80 leading-relaxed">
                  At pianoIP, proactive docketing and predictive prosecution ensure your applications advance with immaculate tempo—securing early statutory priority while giving your enterprise the breathing room to commercialize.
                </p>
              </div>
              <div className="pt-4 border-t border-[#FFFEFA]/10 text-xs text-[#B49A68] font-mono">
                Tenet 02 · Immaculate Timing & Priority Defense
              </div>
            </div>
          </div>

          {/* Full Company Vision Statement */}
          <div className="p-6 sm:p-10 rounded-2xl bg-[#151515]/90 border border-[#B49A68]/40 text-center space-y-4 shadow-xl">
            <span className="text-xs uppercase tracking-widest text-[#B49A68] font-semibold block">
              Our Definitive Vision
            </span>
            <blockquote className="font-heading text-xl sm:text-3xl text-[#FFFEFA] italic max-w-3xl mx-auto leading-relaxed">
              “Orchestrating fortified IP portfolios through technical excellence, harmonious collaboration, and perfect tempo.”
            </blockquote>
            <p className="text-xs text-[#FFFEFA]/60 uppercase tracking-widest pt-2">
              pianoIP Guiding Doctrine
            </p>
          </div>
        </div>
      </section>

      {/* Section 3 — Why Strategic IP Protection Matters (Light Section) */}
      <section className="py-12 sm:py-20 lg:py-24 bg-[#FFFEFA] text-[#151515]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 sm:space-y-12">
          <div className="space-y-4">
            <span className="text-xs uppercase tracking-widest text-[#B49A68] font-semibold block">
              Enterprise Impact
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-[#111C2B] text-balance">
              Why Strategic Intellectual Property Protection Matters
            </h2>
            <p className="text-base text-[#151515]/80 leading-relaxed">
              In modern balance sheets, intangible assets—patents, proprietary designs, brand goodwill, and copyright protected code—represent upwards of 80% of total enterprise value.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="p-6 rounded-xl bg-[#F7F4ED] border border-[#111C2B]/10 space-y-3">
              <h4 className="font-heading text-lg font-bold text-[#111C2B]">
                Market Exclusivity & Pricing Power
              </h4>
              <p className="text-xs sm:text-sm text-[#85827C] leading-relaxed">
                A valid patent or registered design creates a legally protected moat, preventing competitors from deploying identical products and safeguarding high margin pricing.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-[#F7F4ED] border border-[#111C2B]/10 space-y-3">
              <h4 className="font-heading text-lg font-bold text-[#111C2B]">
                Investor & Valuation Confidence
              </h4>
              <p className="text-xs sm:text-sm text-[#85827C] leading-relaxed">
                Venture capital funds, private equity investors, and acquirers perform rigorous IP due diligence. Clear title, granted claims, and clean assignments dramatically increase transactional valuations.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-[#F7F4ED] border border-[#111C2B]/10 space-y-3">
              <h4 className="font-heading text-lg font-bold text-[#111C2B]">
                Defensive Freedom to Operate
              </h4>
              <p className="text-xs sm:text-sm text-[#85827C] leading-relaxed">
                A well-maintained patent portfolio deters aggressive litigation from rivals by providing robust cross-licensing currency and counter-claim capabilities.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-[#F7F4ED] border border-[#111C2B]/10 space-y-3">
              <h4 className="font-heading text-lg font-bold text-[#111C2B]">
                Monetization & Licensing Revenue
              </h4>
              <p className="text-xs sm:text-sm text-[#85827C] leading-relaxed">
                IP assets can be licensed across non-competing geographies, industries, and applications, generating recurring royalty revenues without operational overhead.
              </p>
            </div>
          </div>

          {/* Consultation CTA Banner */}
          <div className="pt-8 text-center border-t border-[#111C2B]/10">
            <div className="max-w-2xl mx-auto space-y-5">
              <h3 className="font-heading text-2xl font-bold text-[#111C2B]">
                Partner with pianoIP on Your Next Filing
              </h3>
              <p className="text-sm text-[#85827C]">
                Discover how our specialized counsel can fortify your technical and aesthetic innovations.
              </p>
              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-4">
                <button
                  onClick={onOpenConsultation}
                  className="w-full sm:w-auto px-8 py-3.5 text-xs font-semibold tracking-wider uppercase text-white bg-[#151515] hover:bg-[#111C2B] rounded-lg transition-all shadow-md flex items-center justify-center gap-2 min-h-[44px]"
                >
                  <span>Book a Consultation</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-[#B49A68]" />
                </button>
                <button
                  onClick={() => onNavigate('services')}
                  className="w-full sm:w-auto px-8 py-3.5 text-xs font-semibold tracking-wider uppercase text-[#111C2B] bg-[#F7F4ED] hover:bg-[#F7F4ED]/80 rounded-lg transition-all border border-[#111C2B]/15 min-h-[44px]"
                >
                  View All Services
                </button>
              </div>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
};
