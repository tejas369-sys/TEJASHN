import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { ConsultationModal } from './components/ConsultationModal';
import { WhatsAppButton } from './components/WhatsAppButton';
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { ServicesIndexPage } from './pages/ServicesIndexPage';
import { ServiceDetailPage } from './pages/ServiceDetailPage';
import { ContactPage } from './pages/ContactPage';

export default function App() {
  const [currentView, setCurrentView] = useState<string>('home');
  const [currentServiceId, setCurrentServiceId] = useState<string>('patent-filing');
  const [isConsultationOpen, setIsConsultationOpen] = useState<boolean>(false);
  const [consultationServiceId, setConsultationServiceId] = useState<string | undefined>(undefined);

  // Sync with browser hash on initial load and handle browser back/forward buttons
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      if (!hash || hash === 'home') {
        setCurrentView('home');
      } else if (hash === 'about') {
        setCurrentView('about');
      } else if (hash === 'services') {
        setCurrentView('services');
      } else if (hash === 'contact') {
        setCurrentView('contact');
      } else if (hash.startsWith('service/')) {
        const sId = hash.replace('service/', '');
        setCurrentView('service-detail');
        setCurrentServiceId(sId);
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleNavigate = (view: string, serviceId?: string) => {
    if (view === 'service-detail' && serviceId) {
      setCurrentServiceId(serviceId);
      window.location.hash = `service/${serviceId}`;
    } else {
      window.location.hash = view;
    }
    setCurrentView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenConsultation = (serviceId?: string) => {
    setConsultationServiceId(serviceId);
    setIsConsultationOpen(true);
  };

  return (
    <div className="min-h-[100dvh] overflow-x-clip bg-[#F7F4ED] text-[#151515] flex flex-col font-body selection:bg-[#B49A68]/30 selection:text-[#111C2B]">
      {/* Fixed Luxury Navigation */}
      <Navbar
        currentView={currentView}
        onNavigate={handleNavigate}
        onOpenConsultation={handleOpenConsultation}
      />

      {/* Main Page View */}
      <main className="flex-1 w-full min-w-0">
        {currentView === 'home' && (
          <HomePage
            onNavigate={handleNavigate}
            onOpenConsultation={handleOpenConsultation}
          />
        )}

        {currentView === 'about' && (
          <AboutPage
            onNavigate={handleNavigate}
            onOpenConsultation={() => handleOpenConsultation()}
          />
        )}

        {currentView === 'services' && (
          <ServicesIndexPage
            onNavigate={handleNavigate}
            onOpenConsultation={handleOpenConsultation}
          />
        )}

        {currentView === 'service-detail' && (
          <ServiceDetailPage
            serviceId={currentServiceId}
            onNavigate={handleNavigate}
            onOpenConsultation={handleOpenConsultation}
          />
        )}

        {currentView === 'contact' && <ContactPage />}
      </main>

      {/* Global Consultation Modal */}
      <ConsultationModal
        isOpen={isConsultationOpen}
        onClose={() => setIsConsultationOpen(false)}
        initialServiceId={consultationServiceId}
      />

      {/* Floating WhatsApp Action Button */}
      <WhatsAppButton />

      {/* Premium Dark Navy Footer */}
      <Footer
        onNavigate={handleNavigate}
        onOpenConsultation={() => handleOpenConsultation()}
      />
    </div>
  );
}
