import React, { useState, useEffect, useRef } from 'react';
import { ChevronDown, Menu, X, ArrowRight, ShieldCheck, FileText, BarChart3, Sparkles, BookOpen, Shapes } from 'lucide-react';
import { servicesData } from '../data/servicesData';

interface NavbarProps {
  currentView: string;
  onNavigate: (view: string, serviceId?: string) => void;
  onOpenConsultation: (serviceId?: string) => void;
}

const serviceIcons: Record<string, React.ReactNode> = {
  'patent-filing': <FileText className="w-4 h-4 text-[#B49A68]" />,
  'patent-analytics': <BarChart3 className="w-4 h-4 text-[#B49A68]" />,
  'portfolio-management': <ShieldCheck className="w-4 h-4 text-[#B49A68]" />,
  'trademark-services': <Sparkles className="w-4 h-4 text-[#B49A68]" />,
  'copyright-services': <BookOpen className="w-4 h-4 text-[#B49A68]" />,
  'industrial-design': <Shapes className="w-4 h-4 text-[#B49A68]" />
};

export const Navbar: React.FC<NavbarProps> = ({ currentView, onNavigate, onOpenConsultation }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsScrolled(currentScrollY > 20);

      // Hide the navbar when scrolling down past 40px
      if (currentScrollY > 40 && currentScrollY > lastScrollY.current) {
        setIsVisible(false);
        setIsServicesOpen(false);
      } else {
        // Reveal navbar when scrolling up or at the top
        setIsVisible(true);
      }

      lastScrollY.current = currentScrollY <= 0 ? 0 : currentScrollY;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsServicesOpen(false);
      }
    };
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsServicesOpen(false);
        setIsMobileMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, []);

  useEffect(() => {
    if (!isMobileMenuOpen) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, [isMobileMenuOpen]);

  const handleScrollTo = (targetId: string) => {
    setIsServicesOpen(false);
    setIsMobileMenuOpen(false);

    if (currentView !== 'home') {
      onNavigate('home');
      setTimeout(() => {
        if (targetId === 'hero') {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
          const el = document.getElementById(targetId);
          if (el) {
            el.scrollIntoView({ behavior: 'smooth' });
          }
        }
      }, 60);
    } else {
      if (targetId === 'hero') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        const el = document.getElementById(targetId);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out transform ${
        isVisible || isMobileMenuOpen
          ? 'translate-y-0 opacity-100'
          : '-translate-y-full opacity-0 pointer-events-none'
      } ${
        isScrolled
          ? 'bg-[#FFFEFA]/95 backdrop-blur-md shadow-sm border-b border-[#111C2B]/10 py-2.5 sm:py-3.5'
          : 'bg-[#FFFEFA]/85 backdrop-blur-sm border-b border-[#111C2B]/5 py-3 sm:py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-3 sm:gap-6 lg:gap-8">
        {/* Brand Zone (Uploaded PianoIP Solutions Logo) */}
        <button
          onClick={() => handleScrollTo('hero')}
          className="flex items-center text-left group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#B49A68] rounded-lg py-0.5 px-0.5 -ml-0.5 transition-colors min-h-[44px] shrink-0"
          aria-label="PianoIP Solutions Homepage"
        >
          <img
            src="/assets/aistudio/pianoip-solutions-logo-transparent.png"
            alt="PianoIP Solutions - harmonising your IP"
            className="h-9 sm:h-11 md:h-12 w-auto max-w-[205px] sm:max-w-[260px] object-contain shrink-0"
          />
        </button>

        {/* Navigation Zone (Desktop / Laptop) */}
        <nav className="hidden md:flex items-center gap-5 lg:gap-7 text-sm font-medium text-[#151515]">
          <button
            onClick={() => handleScrollTo('hero')}
            className="whitespace-nowrap transition-colors hover:text-[#B49A68] focus:outline-none text-[#151515] min-h-[40px]"
          >
            Home
          </button>

          <button
            onClick={() => handleScrollTo('about')}
            className="whitespace-nowrap transition-colors hover:text-[#B49A68] focus:outline-none text-[#151515] min-h-[40px]"
          >
            About Us
          </button>

          {/* Services Dropdown with In-Page Scroll */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => handleScrollTo('services')}
              onMouseEnter={() => setIsServicesOpen(true)}
              className="flex items-center gap-1.5 whitespace-nowrap transition-colors hover:text-[#B49A68] focus:outline-none text-[#151515] min-h-[40px]"
              aria-expanded={isServicesOpen}
            >
              <span>Services</span>
              <ChevronDown
                className={`w-3.5 h-3.5 transition-transform duration-200 ${
                  isServicesOpen ? 'rotate-180 text-[#B49A68]' : 'text-[#85827C]'
                }`}
              />
            </button>

            {/* Dropdown Menu */}
            {isServicesOpen && (
              <div
                onMouseLeave={() => setIsServicesOpen(false)}
                className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-[min(620px,calc(100vw-2rem))] bg-[#FFFEFA] border border-[#111C2B]/10 rounded-xl shadow-xl p-5 grid grid-cols-2 gap-3 transition-all duration-200 animate-in fade-in slide-in-from-top-2"
              >
                <div className="col-span-2 pb-2 mb-1 border-b border-[#111C2B]/10 flex items-center justify-between">
                  <span className="text-xs uppercase tracking-widest font-semibold text-[#85827C]">
                    Core IP Disciplines
                  </span>
                  <button
                    onClick={() => handleScrollTo('services')}
                    className="text-xs text-[#B49A68] hover:text-[#8E774A] font-medium flex items-center gap-1"
                  >
                    <span>Scroll to All Services</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>

                {servicesData.map((service) => (
                  <button
                    key={service.id}
                    onClick={() => handleScrollTo(`service-${service.id}`)}
                    className="group text-left p-2.5 rounded-lg hover:bg-[#F7F4ED] transition-colors flex items-start gap-3 min-h-[44px]"
                  >
                    <div className="p-2 rounded-md bg-[#111C2B]/5 group-hover:bg-[#111C2B] group-hover:text-white transition-colors shrink-0">
                      {serviceIcons[service.id] || <FileText className="w-4 h-4" />}
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-[#151515] group-hover:text-[#B49A68] transition-colors">
                        {service.title}
                      </h4>
                      <p className="text-xs text-[#85827C] line-clamp-1 mt-0.5">
                        {service.shortDescription}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>

          <button
            onClick={() => handleScrollTo('contact')}
            className="whitespace-nowrap transition-colors hover:text-[#B49A68] focus:outline-none text-[#151515]"
          >
            Contact
          </button>
        </nav>

        {/* Primary Action Zone */}
        <div className="hidden md:flex items-center gap-4">
          <button
            onClick={() => onOpenConsultation()}
            className="px-5 py-2.5 text-xs font-semibold tracking-wider uppercase text-white bg-[#151515] hover:bg-[#111C2B] rounded-lg transition-all shadow-sm hover:shadow-md border border-[#151515] hover:border-[#B49A68] active:scale-[0.99] whitespace-nowrap min-h-[40px]"
          >
            Book a Consultation
          </button>
        </div>

        {/* Mobile Hamburger Toggle */}
        <div className="flex md:hidden items-center">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="w-11 h-11 flex items-center justify-center rounded-lg text-[#151515] hover:text-[#B49A68] hover:bg-[#111C2B]/5 focus:outline-none transition-colors"
            aria-label="Toggle navigation menu"
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu & Backdrop */}
      {isMobileMenuOpen && (
        <>
          <div
            className="fixed inset-0 top-[60px] sm:top-[72px] bg-[#111C2B]/40 backdrop-blur-xs z-40 md:hidden animate-in fade-in duration-200"
            onClick={() => setIsMobileMenuOpen(false)}
            aria-hidden="true"
          />
          <div className="md:hidden relative z-50 bg-[#FFFEFA] border-b border-[#111C2B]/10 px-5 sm:px-6 py-5 space-y-4 max-h-[calc(100dvh-4.5rem)] overflow-y-auto overscroll-contain shadow-2xl animate-in fade-in slide-in-from-top-3 duration-250">
            <div className="flex flex-col space-y-1 text-base font-medium">
              <button
                onClick={() => handleScrollTo('hero')}
                className="text-left py-2.5 px-2 rounded-lg text-[#151515] hover:text-[#B49A68] hover:bg-[#F7F4ED] transition-colors min-h-[44px] flex items-center"
              >
                Home
              </button>
              <button
                onClick={() => handleScrollTo('about')}
                className="text-left py-2.5 px-2 rounded-lg text-[#151515] hover:text-[#B49A68] hover:bg-[#F7F4ED] transition-colors min-h-[44px] flex items-center"
              >
                About Us
              </button>
              <button
                onClick={() => handleScrollTo('services')}
                className="text-left py-2.5 px-2 rounded-lg text-[#151515] hover:text-[#B49A68] hover:bg-[#F7F4ED] transition-colors min-h-[44px] flex items-center"
              >
                All Services Overview
              </button>

              <div className="my-2 pl-3 border-l-2 border-[#B49A68]/40 space-y-1 py-1">
                <span className="text-[11px] uppercase tracking-widest text-[#85827C] font-semibold block px-2 pb-1">
                  Core Disciplines
                </span>
                {servicesData.map((svc) => (
                  <button
                    key={svc.id}
                    onClick={() => handleScrollTo(`service-${svc.id}`)}
                    className="w-full text-left py-2 px-2 rounded-lg text-sm text-[#151515] hover:text-[#B49A68] hover:bg-[#F7F4ED] transition-colors min-h-[40px] flex items-center"
                  >
                    {svc.title}
                  </button>
                ))}
              </div>

              <button
                onClick={() => handleScrollTo('contact')}
                className="text-left py-2.5 px-2 rounded-lg text-[#151515] hover:text-[#B49A68] hover:bg-[#F7F4ED] transition-colors min-h-[44px] flex items-center"
              >
                Contact & Location
              </button>
            </div>

            <div className="pt-3 border-t border-[#111C2B]/10">
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onOpenConsultation();
                }}
                className="w-full py-3.5 text-center text-xs font-semibold tracking-wider uppercase text-white bg-[#151515] hover:bg-[#111C2B] rounded-lg shadow-sm min-h-[44px] flex items-center justify-center active:scale-[0.99] transition-transform"
              >
                Book a Consultation
              </button>
            </div>
          </div>
        </>
      )}
    </header>
  );
};
