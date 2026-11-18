import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface ServiceBannerSlide {
  id: string;
  number: string;
  title: string;
  paragraphs: string[];
}

const SERVICE_BANNER_SLIDES: ServiceBannerSlide[] = [
  {
    id: 'ip-portfolio-management',
    number: '01',
    title: 'IP Portfolio Management',
    paragraphs: [
      'Are you able to manage your IP effectively?',
      "IP Portfolio Management is all about strategically organising, monitoring and evaluating a company's IP assets. This ensures that they continue to support the business and innovation objectives.",
      'IP Portfolio Management includes tracking filing and renewal deadlines, assessing the commercial relevance of IPs, identifying licensing opportunities and reviewing portfolio strength.',
      'At Piano IP, we help businesses manage their IP portfolios through structured oversight, strategic evaluation and ongoing support. Our approach enables organisations to identify valuable intellectual property assets, optimise portfolio investments, monitor potential risks and align their IP strategy with long-term business goals.'
    ]
  },
  {
    id: 'trademark-services',
    number: '02',
    title: 'Trademark Services',
    paragraphs: [
      'Your brand is more than just a name or logo. It showcases your business identity, reputation and customer trust. Have you taken the necessary steps to protect what makes your brand recognisable?',
      'Trademark protection helps businesses secure distinctive elements such as brand names, logos, taglines and other identifying marks.',
      'We offer comprehensive trademark services, including trademark searches, availability assessments, application filing, registration support, examination responses, opposition proceedings and renewals.',
      'Our goal is to help businesses establish and safeguard their brand identity while navigating trademark procedures, reducing the risk of conflicts and supporting the long-term value of their intellectual property.'
    ]
  },
  {
    id: 'copyright-services',
    number: '03',
    title: 'Copyright Services',
    paragraphs: [
      'From books and articles to software, photographs, music and creative designs, original works deserve appropriate legal protection. Copyright safeguards the expression of original creative and intellectual works against unauthorised reproduction, distribution and use, subject to applicable legal provisions.',
      'At Piano IP, we assist creators, businesses, authors and organisations with copyright registration, application preparation, documentation and related advisory services. Our support also extends to copyright ownership, licensing, assignment and infringement-related matters.',
      'Whether you are protecting a literary creation, digital content, artistic work or software, we help you understand and manage your copyright interests effectively.'
    ]
  },
  {
    id: 'design-patent-services',
    number: '04',
    title: 'Design Patent Services',
    paragraphs: [
      'The design of a product can be just as important as its functionality. Have you considered protecting the unique visual elements that distinguish your product from competing designs?',
      'Design protection safeguards the visual features of an article, including its shape, configuration, pattern or ornamentation, as applicable under the relevant law. In India, such protection is governed by the Designs Act, 2000.',
      'Piano IP assists businesses and innovators with design searches, application preparation, filing, examination responses and registration support. We help protect distinctive product appearances, strengthen design ownership and preserve the commercial value of creative product development.'
    ]
  }
];

export const IPServicesScrollBanner: React.FC = () => {
  const [openIds, setOpenIds] = useState<string[]>([]);

  const toggleItem = (id: string) => {
    setOpenIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <div className="pt-2">
      <div
        className="rounded-2xl bg-[#F7F4ED] border border-[#111C2B]/12 overflow-hidden"
        role="region"
        aria-label="IP Portfolio Management, Trademark, Copyright, and Design Patent Services"
      >
        <div className="max-h-[60dvh] sm:max-h-[460px] overflow-y-auto overscroll-contain divide-y divide-[#111C2B]/10">
          {SERVICE_BANNER_SLIDES.map((item) => {
            const isOpen = openIds.includes(item.id);
            const panelId = `banner-panel-${item.id}`;
            const headerId = `banner-header-${item.id}`;

            return (
              <div key={item.id} className="transition-colors">
                <button
                  type="button"
                  id={headerId}
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  onClick={() => toggleItem(item.id)}
                  className={`w-full px-4 sm:px-6 py-3.5 sm:py-4 min-h-[56px] flex items-center justify-between gap-3 sm:gap-4 text-left cursor-pointer transition-colors ${
                    isOpen
                      ? 'bg-[#FFFEFA] text-[#111C2B]'
                      : 'hover:bg-[#FFFEFA]/60 text-[#111C2B]'
                  }`}
                >
                  <div className="flex items-center gap-3 sm:gap-3.5 min-w-0">
                    <span className="font-mono text-xs font-bold text-[#8E774A] tabular-nums shrink-0">
                      {item.number}
                    </span>
                    <span className="font-heading text-base sm:text-xl font-bold text-[#111C2B] leading-snug">
                      {item.title}
                    </span>
                  </div>

                  <ChevronDown
                    aria-hidden="true"
                    className={`w-4 h-4 shrink-0 transition-transform duration-300 ${
                      isOpen
                        ? 'rotate-180 text-[#B49A68]'
                        : 'text-[#111C2B]/65'
                    }`}
                  />
                </button>

                <div
                  id={panelId}
                  role="region"
                  aria-labelledby={headerId}
                  className={`grid transition-[grid-template-rows] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                    isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
                  }`}
                >
                  <div className="overflow-hidden">
                    <div className="px-4 sm:px-6 pb-5 pt-3 bg-[#FFFEFA]/75 border-t border-[#111C2B]/8 space-y-3">
                      {item.paragraphs.map((paragraph, pIdx) => (
                        <p
                          key={pIdx}
                          className="text-sm text-[#151515]/85 leading-relaxed"
                        >
                          {paragraph}
                        </p>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
