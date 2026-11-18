import React from 'react';
import { ArrowLeft, ArrowUpRight, CheckCircle2, ChevronRight, FileCheck, Shield, Scale, Sparkles, BookOpen, Shapes, BarChart3, FileText, ShieldCheck } from 'lucide-react';
import { servicesData, ServiceDetail } from '../data/servicesData';
import { PatentLifecycleTimeline } from '../components/PatentLifecycleTimeline';

interface ServiceDetailPageProps {
  serviceId: string;
  onNavigate: (view: string, serviceId?: string) => void;
  onOpenConsultation: (serviceId?: string) => void;
}

const serviceIcons: Record<string, React.ReactNode> = {
  'patent-filing': <FileText className="w-6 h-6 text-[#B49A68]" />,
  'patent-analytics': <BarChart3 className="w-6 h-6 text-[#B49A68]" />,
  'portfolio-management': <ShieldCheck className="w-6 h-6 text-[#B49A68]" />,
  'trademark-services': <Sparkles className="w-6 h-6 text-[#B49A68]" />,
  'copyright-services': <BookOpen className="w-6 h-6 text-[#B49A68]" />,
  'industrial-design': <Shapes className="w-6 h-6 text-[#B49A68]" />
};

export const ServiceDetailPage: React.FC<ServiceDetailPageProps> = ({
  serviceId,
  onNavigate,
  onOpenConsultation
}) => {
  const service = servicesData.find((s) => s.id === serviceId) || servicesData[0];

  return (
    <div className="w-full pt-20">
      {/* Breadcrumb Bar */}
      <div className="bg-[#FFFEFA] border-b border-[#111C2B]/10 py-3.5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between text-xs text-[#85827C]">
          <div className="flex items-center gap-2 truncate pr-2">
            <button
              onClick={() => onNavigate('home')}
              className="hover:text-[#111C2B] transition-colors shrink-0"
            >
              Home
            </button>
            <ChevronRight className="w-3.5 h-3.5 shrink-0" />
            <button
              onClick={() => onNavigate('services')}
              className="hover:text-[#111C2B] transition-colors shrink-0"
            >
              Services
            </button>
            <ChevronRight className="w-3.5 h-3.5 shrink-0" />
            <span className="text-[#111C2B] font-medium truncate">{service.title}</span>
          </div>

          <button
            onClick={() => onNavigate('services')}
            className="flex items-center gap-1 hover:text-[#111C2B] transition-colors font-medium shrink-0 min-h-[36px]"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">All Services</span>
          </button>
        </div>
      </div>

      {/* Hero Section */}
      <section className="py-16 sm:py-20 bg-[#111C2B] text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-dark-staff-lines opacity-30 pointer-events-none" />
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-4 sm:space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-lg bg-[#FFFEFA]/10 text-[#B49A68] border border-[#B49A68]/20">
              {serviceIcons[service.id] || <FileText className="w-6 h-6" />}
            </div>
            <span className="text-xs uppercase tracking-[0.2em] text-[#B49A68] font-semibold">
              Specialized IP Practice
            </span>
          </div>

          <h1 className="font-serif-display text-3xl sm:text-5xl md:text-6xl font-bold text-[#FFFEFA] tracking-tight">
            {service.title}
          </h1>

          <p className="text-base sm:text-lg text-[#FFFEFA]/85 max-w-3xl font-light leading-relaxed">
            {service.fullOverview}
          </p>

          <div className="pt-2 sm:pt-4 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
            <button
              onClick={() => onOpenConsultation(service.id)}
              className="w-full sm:w-auto px-7 py-3.5 text-xs font-semibold tracking-wider uppercase text-[#111C2B] bg-[#B49A68] hover:bg-[#C9B488] rounded-lg transition-all shadow-md flex items-center justify-center gap-2 min-h-[44px]"
            >
              <span>Consult on {service.title}</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>

            <span className="text-xs text-[#FFFEFA]/60 font-mono">
              Confidentiality Protected under Attorney-Client Standards
            </span>
          </div>
        </div>
      </section>

      {/* Statutory & Strategic Framework Panel */}
      <section className="py-10 sm:py-12 bg-[#FFFEFA] border-b border-[#111C2B]/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 items-center">
            <div className="p-5 sm:p-6 rounded-xl bg-[#F7F4ED] border border-[#111C2B]/10 space-y-2">
              <div className="flex items-center gap-2 text-xs uppercase tracking-wider font-semibold text-[#111C2B]">
                <Scale className="w-4 h-4 text-[#B49A68]" />
                <span>Statutory Authority & Framework</span>
              </div>
              <p className="text-xs sm:text-sm text-[#151515]/85 leading-relaxed">
                {service.statutoryContext}
              </p>
            </div>

            <div className="p-5 sm:p-6 rounded-xl bg-[#F7F4ED] border border-[#111C2B]/10 space-y-2">
              <div className="flex items-center gap-2 text-xs uppercase tracking-wider font-semibold text-[#111C2B]">
                <Shield className="w-4 h-4 text-[#B49A68]" />
                <span>Strategic Commercial Impact</span>
              </div>
              <p className="text-xs sm:text-sm text-[#151515]/85 leading-relaxed">
                {service.strategicValue}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Detailed Subsections Accordion / Grid */}
      <section className="py-16 sm:py-20 bg-[#F7F4ED] text-[#151515]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 sm:space-y-12">
          <div>
            <span className="text-xs uppercase tracking-widest text-[#B49A68] font-semibold block mb-2">
              Practice Architecture
            </span>
            <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl font-bold text-[#111C2B]">
              Key Workstreams & Scope of Delivery
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {service.subsections.map((sub, idx) => (
              <div
                key={idx}
                className="p-6 sm:p-8 rounded-2xl bg-[#FFFEFA] border border-[#111C2B]/10 shadow-sm space-y-4 sm:space-y-5"
              >
                <div className="flex items-center justify-between pb-3 border-b border-[#111C2B]/10">
                  <h3 className="font-heading text-xl font-bold text-[#111C2B]">
                    {sub.title}
                  </h3>
                  <span className="text-xs font-mono text-[#B49A68] font-bold">
                    0{idx + 1}
                  </span>
                </div>

                <p className="text-sm text-[#151515]/85 leading-relaxed">
                  {sub.description}
                </p>

                <div className="space-y-2.5 pt-2">
                  <span className="text-xs uppercase tracking-wider text-[#85827C] font-semibold block">
                    Deliverables & Technical Output:
                  </span>
                  <ul className="space-y-2">
                    {sub.keyDeliverables.map((deliv, dIdx) => (
                      <li key={dIdx} className="flex items-start gap-2.5 text-xs text-[#151515]/80">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#B49A68] shrink-0 mt-0.5" />
                        <span className="leading-normal">{deliv}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>

          {/* Procedural Highlights */}
          {service.proceduralHighlights && service.proceduralHighlights.length > 0 && (
            <div className="p-5 sm:p-8 rounded-2xl bg-[#111C2B] text-white border border-[#B49A68]/30 space-y-4">
              <span className="text-xs uppercase tracking-widest text-[#B49A68] font-semibold block">
                Procedural Highlights & Timing Rules
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
                {service.proceduralHighlights.map((highlight, hIdx) => (
                  <div key={hIdx} className="space-y-1.5 p-4 rounded-xl bg-[#151515] border border-white/5">
                    <span className="text-xs font-mono text-[#B49A68] font-semibold">
                      Rule 0{hIdx + 1}
                    </span>
                    <p className="text-xs text-[#FFFEFA]/85 leading-relaxed">
                      {highlight}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* If this is Patent Filing, render the interactive Patent Lifecycle Timeline directly */}
          {service.id === 'patent-filing' && (
            <div className="pt-12 border-t border-[#111C2B]/10 space-y-8">
              <div className="text-center max-w-2xl mx-auto space-y-2">
                <span className="text-xs uppercase tracking-widest text-[#B49A68] font-semibold block">
                  Interactive Trajectory
                </span>
                <h3 className="font-heading text-2xl sm:text-3xl font-bold text-[#111C2B]">
                  The 7-Stage Patent Lifecycle
                </h3>
                <p className="text-xs sm:text-sm text-[#85827C]">
                  Explore each procedural phase in chronological order.
                </p>
              </div>

              <PatentLifecycleTimeline />
            </div>
          )}

          {/* Switch to Other Services Carousel/Pill List */}
          <div className="pt-10 sm:pt-12 border-t border-[#111C2B]/10">
            <span className="text-xs uppercase tracking-widest text-[#85827C] font-semibold block mb-4">
              Explore Adjacent Practices
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5 sm:gap-3">
              {servicesData.map((s) => (
                <button
                  key={s.id}
                  onClick={() => onNavigate('service-detail', s.id)}
                  className={`p-3 rounded-lg text-left text-xs font-semibold border transition-all min-h-[44px] flex items-center ${
                    s.id === service.id
                      ? 'bg-[#111C2B] text-white border-[#111C2B]'
                      : 'bg-[#FFFEFA] text-[#151515] border-[#111C2B]/10 hover:border-[#B49A68]'
                  }`}
                >
                  <span className="line-clamp-1">{s.title}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Bottom Consultation CTA */}
          <div className="p-6 sm:p-12 rounded-2xl bg-[#FFFEFA] border border-[#111C2B]/10 shadow-md text-center space-y-5">
            <h3 className="font-heading text-2xl sm:text-3xl font-bold text-[#111C2B]">
              Ready to Advance Your {service.title} Strategy?
            </h3>
            <p className="text-sm text-[#85827C] max-w-xl mx-auto leading-relaxed">
              Our practitioners combine technical depth with legal precision to deliver defensible intellectual property assets.
            </p>
            <div className="pt-2">
              <button
                onClick={() => onOpenConsultation(service.id)}
                className="w-full sm:w-auto px-8 py-3.5 text-xs font-semibold tracking-wider uppercase text-white bg-[#151515] hover:bg-[#111C2B] rounded-lg transition-all shadow-sm flex items-center justify-center gap-2 mx-auto min-h-[44px]"
              >
                <span>Initiate Consultation</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-[#B49A68]" />
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
