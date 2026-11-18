import React, { useState, useEffect } from 'react';
import { X, Send, Phone, Mail, CheckCircle2, AlertCircle } from 'lucide-react';
import { servicesData } from '../data/servicesData';

interface ConsultationModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialServiceId?: string;
}

export const ConsultationModal: React.FC<ConsultationModalProps> = ({
  isOpen,
  onClose,
  initialServiceId
}) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [selectedService, setSelectedService] = useState(initialServiceId || 'patent-filing');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<'idle' | 'submitted' | 'error'>('idle');
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (initialServiceId) {
      setSelectedService(initialServiceId);
    }
  }, [initialServiceId]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const validate = () => {
    const errors: Record<string, string> = {};
    if (!fullName.trim()) errors.fullName = 'Please enter your full name.';
    if (!email.trim()) {
      errors.email = 'Please provide your email address.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errors.email = 'Please provide a valid email format.';
    }
    if (!message.trim()) {
      errors.message = 'Please briefly outline your inquiry or invention area.';
    }
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    // Construct pre-filled mailto fallback to ensure reliable dispatch without synthetic backend
    const serviceName = servicesData.find(s => s.id === selectedService)?.title || selectedService;
    const subject = encodeURIComponent(`Consultation Inquiry: ${serviceName} — ${fullName}`);
    const bodyContent = encodeURIComponent(
      `Full Name: ${fullName}\n` +
      `Email: ${email}\n` +
      `Phone: ${phone || 'Not provided'}\n` +
      `Service: ${serviceName}\n\n` +
      `Inquiry Details:\n${message}\n\n` +
      `-- Sent via pianoIP Consultation Portal`
    );

    const mailtoUrl = `mailto:info@pianoip.com?subject=${subject}&body=${bodyContent}`;

    // Open user's default email client
    window.location.href = mailtoUrl;
    setStatus('submitted');
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-[#111C2B]/70 backdrop-blur-sm animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-labelledby="consultation-modal-title"
    >
      <div className="relative w-full max-w-xl bg-[#FFFEFA] border border-[#111C2B]/10 rounded-2xl shadow-2xl p-5 sm:p-8 overflow-y-auto max-h-[calc(100dvh-1.5rem)] overscroll-contain">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 sm:top-5 sm:right-5 w-11 h-11 flex items-center justify-center text-[#85827C] hover:text-[#151515] hover:bg-[#F7F4ED] rounded-lg transition-colors focus:outline-none"
          aria-label="Close consultation modal"
        >
          <X className="w-5 h-5" />
        </button>

        {status === 'submitted' ? (
          <div className="py-8 text-center space-y-4">
            <div className="w-14 h-14 bg-[#B49A68]/15 text-[#B49A68] rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="font-heading text-2xl font-bold text-[#111C2B]">
              Inquiry Prepared
            </h3>
            <p className="text-sm text-[#151515]/80 max-w-md mx-auto leading-relaxed">
              Your inquiry has been formulated and dispatched to your email client addressed to <strong className="text-[#111C2B]">info@pianoip.com</strong>.
            </p>
            <p className="text-xs text-[#85827C]">
              If your email client did not automatically launch, you can directly email us at <a href="mailto:info@pianoip.com" className="text-[#B49A68] underline font-medium">info@pianoip.com</a> or phone us at <a href="tel:+919632910080" className="text-[#B49A68] underline font-medium">+91 96329 10080</a>.
            </p>
            <div className="pt-4 flex justify-center gap-3">
              <button
                onClick={() => {
                  setStatus('idle');
                  onClose();
                }}
                className="px-6 py-2.5 text-xs font-semibold uppercase tracking-wider text-white bg-[#151515] hover:bg-[#111C2B] rounded-lg transition-colors min-h-[44px]"
              >
                Close Window
              </button>
            </div>
          </div>
        ) : (
          <div>
            <div className="mb-6 pr-8">
              <span className="text-xs uppercase tracking-widest text-[#B49A68] font-semibold block mb-1">
                Strategic Advisory
              </span>
              <h2 id="consultation-modal-title" className="font-heading text-xl sm:text-2xl md:text-3xl font-bold text-[#111C2B]">
                Book an IP Consultation
              </h2>
              <p className="text-xs sm:text-sm text-[#85827C] mt-1.5 leading-relaxed">
                Connect directly with pianoIP for confidential counsel regarding patents, trademarks, analytics, or design protection.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4" noValidate>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#111C2B] mb-1">
                  Full Name <span className="text-rose-600">*</span>
                </label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="e.g. Dr. Arthur Vance"
                  className={`w-full px-3.5 py-3 text-base sm:text-sm bg-[#F7F4ED]/60 border rounded-lg focus:outline-none focus:ring-1 focus:ring-[#B49A68] transition-colors ${
                    validationErrors.fullName ? 'border-rose-500' : 'border-[#111C2B]/15'
                  }`}
                />
                {validationErrors.fullName && (
                  <p className="text-xs text-rose-600 mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5" />
                    {validationErrors.fullName}
                  </p>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#111C2B] mb-1">
                    Email Address <span className="text-rose-600">*</span>
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@enterprise.com"
                    className={`w-full px-3.5 py-3 text-base sm:text-sm bg-[#F7F4ED]/60 border rounded-lg focus:outline-none focus:ring-1 focus:ring-[#B49A68] transition-colors ${
                      validationErrors.email ? 'border-rose-500' : 'border-[#111C2B]/15'
                    }`}
                  />
                  {validationErrors.email && (
                    <p className="text-xs text-rose-600 mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5" />
                      {validationErrors.email}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#111C2B] mb-1">
                    Phone Number <span className="text-[#85827C] font-normal">(Optional)</span>
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+91 98765 43210"
                    className="w-full px-3.5 py-3 text-base sm:text-sm bg-[#F7F4ED]/60 border border-[#111C2B]/15 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#B49A68] transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#111C2B] mb-1">
                  Service of Interest
                </label>
                <select
                  value={selectedService}
                  onChange={(e) => setSelectedService(e.target.value)}
                  className="w-full px-3.5 py-3 text-base sm:text-sm bg-[#F7F4ED]/60 border border-[#111C2B]/15 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#B49A68] transition-colors"
                >
                  {servicesData.map((svc) => (
                    <option key={svc.id} value={svc.id}>
                      {svc.title}
                    </option>
                  ))}
                  <option value="general-ip">General IP Assessment / Multi-Asset</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#111C2B] mb-1">
                  Brief Overview of Invention or Need <span className="text-rose-600">*</span>
                </label>
                <textarea
                  rows={3}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Please describe your technology area, target jurisdictions, or specific IP challenge..."
                  className={`w-full px-3.5 py-3 text-base sm:text-sm bg-[#F7F4ED]/60 border rounded-lg focus:outline-none focus:ring-1 focus:ring-[#B49A68] transition-colors ${
                    validationErrors.message ? 'border-rose-500' : 'border-[#111C2B]/15'
                  }`}
                />
                {validationErrors.message && (
                  <p className="text-xs text-rose-600 mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5" />
                    {validationErrors.message}
                  </p>
                )}
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3.5 text-xs font-semibold tracking-wider uppercase text-white bg-[#151515] hover:bg-[#111C2B] rounded-lg shadow-sm hover:shadow transition-all flex items-center justify-center gap-2 min-h-[44px] active:scale-[0.99]"
                >
                  <Send className="w-3.5 h-3.5 text-[#B49A68]" />
                  <span>Transmit Inquiry to Counsel</span>
                </button>
              </div>

              {/* Direct Fallback Links */}
              <div className="pt-3 border-t border-[#111C2B]/10 flex flex-wrap items-center justify-between gap-2 text-xs text-[#85827C]">
                <a
                  href="mailto:info@pianoip.com"
                  className="hover:text-[#111C2B] transition-colors flex items-center gap-1.5 min-h-[44px]"
                >
                  <Mail className="w-3.5 h-3.5 text-[#B49A68]" />
                  <span>info@pianoip.com</span>
                </a>
                <a
                  href="tel:+919632910080"
                  className="hover:text-[#111C2B] transition-colors flex items-center gap-1.5 min-h-[44px]"
                >
                  <Phone className="w-3.5 h-3.5 text-[#B49A68]" />
                  <span className="tabular-nums">+91 96329 10080</span>
                </a>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
