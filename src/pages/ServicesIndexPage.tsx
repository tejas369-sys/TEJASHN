import React from 'react';
import { ArrowRight, ArrowUpRight, FileText, BarChart3, ShieldCheck, Sparkles, BookOpen, Shapes, Check } from 'lucide-react';
import { servicesData } from '../data/servicesData';

interface ServicesIndexPageProps {
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

export const ServicesIndexPage: React.FC<ServicesIndexPageProps> = ({
  onNavigate,
  onOpenConsultation
}) => {
  return (
    <div className="w-full pt-20">
      {/* Editorial Header */}
      <section className="py-16 sm:py-20 bg-[#111C2B] text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-dark-staff-lines opacity-35 pointer-events-none" />
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4 sm:space-y-6 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#B49A68]/30 bg-[#151515]/50">
            <span className="text-xs uppercase tracking-[0.2em] text-[#B49A68] font-semibold">
              Comprehensive Capabilities
            </span>
          </div>
          <h1 className="font-serif-display text-3xl sm:text-5xl md:text-6xl font-bold text-[#FFFEFA] tracking-tight">
            Our Intellectual Property Practices
          </h1>
          <p className="text-sm sm:text-lg text-[#FFFEFA]/80 max-w-2xl mx-auto font-light leading-relaxed">
            Providing end-to-end statutory protection, technology analytics, and portfolio governance across all core forms of intellectual and aesthetic capital.
          </p>
        </div>
      </section>

      {/* Services Grid with Detailed Outlines */}
      <section className="py-12 sm:py-20 lg:py-24 bg-[#F7F4ED] text-[#151515]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 sm:space-y-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-8">
            {servicesData.map((svc, index) => (
              <div
                key={svc.id}
                className="bg-[#FFFEFA] rounded-2xl border border-[#111C2B]/10 p-5 sm:p-8 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group hover:border-[#B49A68]"
              >
                <div className="space-y-5 sm:space-y-6">
                  {/* Top Bar with Number & Icon */}
                  <div className="flex items-center justify-between pb-4 border-b border-[#111C2B]/10">
                    <span className="font-mono text-xs uppercase tracking-widest text-[#B49A68] font-bold">
                      Practice 0{index + 1}
                    </span>
                    <div className="p-2.5 rounded-lg bg-[#111C2B]/5 group-hover:bg-[#111C2B] group-hover:text-white transition-colors">
                      {serviceIcons[svc.id] || <FileText className="w-5 h-5 text-current" />}
                    </div>
                  </div>

                  {/* Title & Overview */}
                  <div>
                    <h3 className="font-heading text-xl sm:text-2xl font-bold text-[#111C2B] group-hover:text-[#B49A68] transition-colors mb-2">
                      {svc.title}
                    </h3>
                    <p className="text-sm text-[#85827C] leading-relaxed">
                      {svc.shortDescription}
                    </p>
                  </div>

                  {/* Key Subsections List */}
                  <div className="space-y-2 pt-2">
                    <span className="text-[11px] uppercase tracking-wider text-[#111C2B] font-semibold block">
                      Scope of Advisory
                    </span>
                    <ul className="space-y-1.5">
                      {svc.subsections.slice(0, 3).map((sub, sIdx) => (
                        <li key={sIdx} className="text-xs text-[#151515]/80 flex items-start gap-2">
                          <Check className="w-3.5 h-3.5 text-[#B49A68] shrink-0 mt-0.5" />
                          <span className="line-clamp-1">{sub.title}</span>
                        </li>
                      ))}
                      {svc.subsections.length > 3 && (
                        <li className="text-[11px] text-[#B49A68] font-medium pl-5">
                          + {svc.subsections.length - 3} additional specializations
                        </li>
                      )}
                    </ul>
                  </div>
                </div>

                {/* Footer Action */}
                <div className="pt-5 sm:pt-6 mt-5 sm:mt-6 border-t border-[#111C2B]/10 flex items-center justify-between gap-2">
                  <button
                    onClick={() => onNavigate('service-detail', svc.id)}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#111C2B] group-hover:text-[#B49A68] transition-colors min-h-[44px]"
                  >
                    <span>Read Full Dossier</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </button>

                  <button
                    onClick={() => onOpenConsultation(svc.id)}
                    className="text-xs text-[#85827C] hover:text-[#111C2B] font-medium min-h-[44px] px-2"
                    title="Inquire about this practice"
                  >
                    Inquire
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Strategic Consultation Banner */}
          <div className="rounded-2xl bg-[#111C2B] text-white p-6 sm:p-12 border border-[#B49A68]/30 flex flex-col md:flex-row items-center justify-between gap-6 sm:gap-8">
            <div className="space-y-3 max-w-2xl text-center md:text-left">
              <span className="text-xs uppercase tracking-widest text-[#B49A68] font-semibold block">
                Integrated Portfolios
              </span>
              <h3 className="font-heading text-2xl sm:text-3xl font-bold text-[#FFFEFA]">
                Need a Custom, Multi-Jurisdictional IP Strategy?
              </h3>
              <p className="text-sm text-[#FFFEFA]/80 leading-relaxed">
                We design tailored protection architectures combining patents, proprietary trademarks, and registered designs for comprehensive defensive coverage.
              </p>
            </div>

            <div className="w-full md:w-auto shrink-0">
              <button
                onClick={() => onOpenConsultation()}
                className="w-full md:w-auto px-8 py-3.5 text-xs font-semibold tracking-wider uppercase text-[#111C2B] bg-[#B49A68] hover:bg-[#C9B488] rounded-lg transition-all shadow-lg flex items-center justify-center gap-2 whitespace-nowrap min-h-[44px]"
              >
                <span>Schedule Counsel</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
