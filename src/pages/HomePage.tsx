import React from 'react';
import { Shield, Award, Sparkles, Compass, CheckCircle2, FileText, BarChart3, ShieldCheck, BookOpen, Shapes } from 'lucide-react';
import { servicesData } from '../data/servicesData';
import { PatentLifecycleTimeline } from '../components/PatentLifecycleTimeline';
import { PatentAnalyticsBook } from '../components/PatentAnalyticsBook';
import { IPServicesScrollBanner } from '../components/IPServicesScrollBanner';
import { ContactPage } from './ContactPage';

interface HomePageProps {
  onNavigate: (view: string, serviceId?: string) => void;
  onOpenConsultation: (serviceId?: string) => void;
}

const serviceIcons: Record<string, React.ReactNode> = {
  'patent-filing': <FileText className="w-5 h-5 text-[#B49A68]" />,
  'patent-analytics': <BarChart3 className="w-5 h-5 text-[#B49A68]" />,
  'portfolio-management': <ShieldCheck className="w-5 h-5 text-[#B49A68]" />,
  'trademark-services': <Sparkles className="w-5 h-5 text-[#B49A68]" />,
  'copyright-services': <BookOpen className="w-5 h-5 text-[#B49A68]" />,
  'industrial-design': <Shapes className="w-5 h-5 text-[#B49A68]" />
};

export const HomePage: React.FC<HomePageProps> = ({ onNavigate, onOpenConsultation }) => {
  return (
    <div className="w-full">
      {/* SECTION 1 — CINEMATIC LUXURY HERO */}
      <section id="hero" className="relative min-h-[82svh] sm:min-h-[92vh] flex items-center justify-center bg-[#111C2B] text-white overflow-hidden pt-24 pb-12 sm:pt-20 sm:pb-16">
        {/* Background Image with Measured Luxury Scrim */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <img
            src="/assets/aistudio/images__2__ac51c030.jfif"
            alt="Lady Justice statue with scales of justice, gavel, and legal volumes"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center opacity-75 sm:opacity-85 transform scale-100 hover:scale-105 transition-transform duration-1000"
          />
          {/* Subtle balanced vignette scrim to showcase the image while maintaining crisp text legibility */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#111C2B] via-[#111C2B]/55 to-[#111C2B]/65" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6 sm:space-y-8">
          {/* Exact Headline from brief — scales smoothly on phones while preserving 42px/55px on laptop */}
          <h1 className="font-serif-display text-[28px] leading-[1.25] sm:text-[36px] sm:leading-[1.28] lg:text-[42px] lg:leading-[55px] text-center not-italic font-bold no-underline tracking-tight text-[#FFFEFA] max-w-4xl mx-auto text-balance">
            Like symphonies, great IPs are built on absolute precision and timing.
          </h1>

          {/* Hero Editorial Statement */}
          <div className="pt-1 sm:pt-2 max-w-3xl mx-auto">
            <p className="text-sm sm:text-base md:text-lg text-[#FFFEFA]/90 leading-relaxed sm:leading-[1.75] font-normal">
              At, PIANO IP, we approach the protection of your intellectual &amp; aesthetic assets with foresight, precision and due diligence. Practising at the intersection of law, technology, and artistic expression, we are dedicated to offer specialized counsel tailored to the unique lifecycles of modern IP portfolios high-touch, strategic IP guidance to the unique lifecycles of modern IP portfolios.
            </p>
          </div>

          {/* Architectural hairlines */}
          <div className="pt-6 sm:pt-10 flex flex-wrap items-center justify-center gap-2.5 sm:gap-8 text-[10px] sm:text-xs text-[#FFFEFA]/50 uppercase tracking-widest font-mono">
            <span>Patents</span>
            <span>·</span>
            <span>Analytics</span>
            <span>·</span>
            <span>Trademarks</span>
            <span>·</span>
            <span>Industrial Designs</span>
          </div>
        </div>
      </section>

      {/* SECTION 2 — ABOUT US SECTION */}
      <section id="about" className="py-12 sm:py-20 lg:py-24 bg-[#F7F4ED] text-[#151515] relative overflow-hidden scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 lg:gap-16 items-center">
            
            {/* Left Column: Editorial Copy */}
            <div className="lg:col-span-7 space-y-5 sm:space-y-6">
              <h2 className="font-heading text-2xl sm:text-4xl md:text-5xl font-bold text-[#111C2B] leading-tight text-balance">
                About Piano IP — Where Innovation Meets Precision
              </h2>

              <p className="text-sm sm:text-base text-[#151515]/85 leading-relaxed font-normal">
                Piano IP is a perfect composition of master virtuosos blended with agile new talents across diverse disciplines. It helps us to deeply understand our clients’ IP and provide valuable strategic insights that harmonises the IP while setting the tempo for long-term business growth. Instead of off-the-shelf answers, we believe in delivering actionable executive intelligence that brings clarity to complex challenges in securing the IP rights.
              </p>

              <p className="text-sm sm:text-base text-[#151515]/85 leading-relaxed font-normal">
                <strong className="block text-[#111C2B] font-semibold mb-1">Our Vision:</strong>
                To orchestrate fortified IP portfolios through technical excellence, harmonious collaboration, and perfect tempo.
              </p>
            </div>

            {/* Right Column: Subtle Office Marker */}
            <div className="lg:col-span-5 relative">
              <div className="max-w-[340px] sm:max-w-[400px] mx-auto lg:ml-auto lg:mr-0">
                {/* Subtle Luxury Corner Caption */}
                <div className="flex items-center justify-between text-[11px] uppercase tracking-wider text-[#85827C] font-mono">
                  <span>pianoIP Consultancy</span>
                  <span>Est. Wayanad, India</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* SECTION 3 — OUR EXPERTISE (6 CORE SERVICES) */}
      <section id="services" className="py-12 sm:py-20 lg:py-24 bg-[#FFFEFA] text-[#151515] border-y border-[#111C2B]/10 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 sm:mb-14">
            <div>
              <span className="text-xs uppercase tracking-widest text-[#B49A68] font-semibold block mb-2">
                Specialized Disciplines
              </span>
              <h2 className="font-heading text-2xl sm:text-4xl md:text-5xl font-bold text-[#111C2B]">
                Our Core IP Expertise
              </h2>
            </div>
          </div>

          {/* 3-Column Desktop Layout */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-8">
            {servicesData.map((svc) => (
              <div
                key={svc.id}
                id={`service-${svc.id}`}
                className="group p-5 sm:p-8 rounded-2xl bg-[#F7F4ED]/60 border border-[#111C2B]/10 hover:border-[#B49A68] hover:bg-[#FFFEFA] transition-all duration-300 shadow-sm hover:shadow-lg flex flex-col justify-between scroll-mt-24"
              >
                <div>
                  <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-[#111C2B] text-white flex items-center justify-center mb-5 sm:mb-6 group-hover:scale-110 group-hover:bg-[#B49A68] group-hover:text-[#111C2B] transition-all duration-300">
                    {serviceIcons[svc.id] || <FileText className="w-5 h-5 text-current" />}
                  </div>

                  <h3 className="font-heading text-xl sm:text-2xl font-bold text-[#111C2B] group-hover:text-[#B49A68] transition-colors mb-2.5 sm:mb-3">
                    {svc.title}
                  </h3>

                  <p className="text-sm text-[#151515]/80 leading-relaxed">
                    {svc.shortDescription}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 4 — THE PATENT LIFECYCLE (VERTICAL WINDING ROADMAP) */}
      <section id="lifecycle" className="py-12 sm:py-20 lg:py-24 bg-[#F7F4ED] relative scroll-mt-20 overflow-hidden">
        {/* Subtle background staff line texture */}
        <div className="absolute inset-0 bg-staff-lines opacity-40 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-16 space-y-3">
            <h2 className="font-heading text-2xl sm:text-4xl md:text-5xl font-bold text-[#111C2B]">
              The Patent Lifecycle Roadmap
            </h2>
          </div>

          {/* Interactive Winding Roadmap Component */}
          <PatentLifecycleTimeline onSelectService={(id) => onNavigate('service-detail', id)} />
        </div>
      </section>

      {/* SECTION 5 — THE PIANOIP PHILOSOPHY (DARK LUXURY PANEL) */}
      <section id="philosophy" className="py-14 sm:py-24 lg:py-28 bg-[#111C2B] text-white relative overflow-hidden scroll-mt-20">
        <div className="absolute inset-0 z-0">
          <img
            src="/src/assets/images/philosophy_tempo_grandeur_1794378191504.jpg"
            alt="pianoIP Philosophy and Tempo of Innovation"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover opacity-25"
          />
          <div className="absolute inset-0 bg-[#111C2B]/85" />
          <div className="absolute inset-0 bg-dark-staff-lines opacity-30" />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6 sm:space-y-10">
          <div className="space-y-3">
            <h2 className="font-serif-display text-3xl sm:text-5xl md:text-6xl font-bold text-[#FFFEFA] tracking-tight">
              Patent Analytics
            </h2>
          </div>

          <PatentAnalyticsBook />
        </div>
      </section>

      {/* SECTION 6 — STRATEGIC IP INTELLIGENCE */}
      <section id="analytics" className="py-12 sm:py-20 lg:py-24 bg-[#FFFEFA] text-[#151515] scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            {/* Strategic Analytics Narrative */}
            <div className="space-y-4 sm:space-y-5">
              <span className="text-xs uppercase tracking-widest text-[#B49A68] font-semibold block">
                Commercial Defense &amp; Insight
              </span>

              <IPServicesScrollBanner />
            </div>

          </div>
        </div>
      </section>

      {/* SECTION 7 — EMBEDDED CONTACT & HEADQUARTERS */}
      <ContactPage isEmbedded={true} />
    </div>
  );
};
