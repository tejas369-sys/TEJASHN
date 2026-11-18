import React, { useState, useEffect } from 'react';
import { Mail, Phone, MapPin, Send, ExternalLink, CheckCircle2, AlertCircle, Shield, Loader2, LogOut, X } from 'lucide-react';
import type { User } from 'firebase/auth';
import { servicesData } from '../data/servicesData';
import {
  initGmailAuth,
  googleSignInForGmail,
  getGmailAccessToken,
  logoutGmailAuth,
  sendInquiryViaGmail,
  GmailAuthExpiredError,
} from '../services/gmailService';

export const ContactPage: React.FC<{ isEmbedded?: boolean }> = ({ isEmbedded = false }) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [service, setService] = useState('patent-filing');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<'idle' | 'dispatched'>('idle');
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Gmail OAuth & Sending state
  const [needsAuth, setNeedsAuth] = useState(true);
  const [token, setToken] = useState<string | null>(() => getGmailAccessToken());
  const [gmailUser, setGmailUser] = useState<User | null>(null);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [sentInfo, setSentInfo] = useState<{
    messageId: string;
    serviceName: string;
    senderEmail: string;
  } | null>(null);

  useEffect(() => {
    const unsubscribe = initGmailAuth(
      (user, accessToken) => {
        setGmailUser(user);
        setToken(accessToken);
        setNeedsAuth(false);
      },
      () => {
        setGmailUser(null);
        setToken(null);
        setNeedsAuth(true);
      }
    );
    return () => unsubscribe();
  }, []);

  const selectedServiceName =
    service === 'general'
      ? 'Comprehensive IP Strategy / Multi-Asset'
      : servicesData.find((s) => s.id === service)?.title || service;

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!fullName.trim()) errs.fullName = 'Full Name is required.';
    if (!email.trim()) {
      errs.email = 'Email address is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errs.email = 'Please provide a valid email format.';
    }
    if (!message.trim()) {
      errs.message = 'Please provide details regarding your inquiry.';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleGoogleLogin = async () => {
    setIsLoggingIn(true);
    setSubmitError(null);
    try {
      const result = await googleSignInForGmail();
      setToken(result.accessToken);
      setGmailUser(result.user);
      setNeedsAuth(false);
      if (!fullName.trim() && result.user.displayName) {
        setFullName(result.user.displayName);
      }
      if (!email.trim() && result.user.email) {
        setEmail(result.user.email);
      }
    } catch (err: any) {
      if (err?.code === 'auth/popup-closed-by-user') {
        setSubmitError('Google sign-in window was closed before completing authorization.');
      } else {
        setSubmitError(err?.message || 'Unable to connect Google account. Please try again.');
      }
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleGoogleLogout = async () => {
    await logoutGmailAuth();
    setToken(null);
    setGmailUser(null);
    setNeedsAuth(true);
    setShowConfirmModal(false);
    setSubmitError(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);
    if (!validate()) return;

    const activeToken = token || getGmailAccessToken();
    if (!activeToken || needsAuth) {
      setSubmitError(
        'Please sign in with Google below so your inquiry can be emailed directly to info@pianoip.com via Gmail.'
      );
      return;
    }

    setShowConfirmModal(true);
  };

  const handleConfirmSend = async () => {
    const activeToken = token || getGmailAccessToken();
    if (!activeToken) {
      setShowConfirmModal(false);
      setNeedsAuth(true);
      setSubmitError('Google session unavailable. Please sign in with Google again.');
      return;
    }

    setIsSending(true);
    setSubmitError(null);
    try {
      const res = await sendInquiryViaGmail(activeToken, {
        fullName,
        email,
        phone,
        serviceName: selectedServiceName,
        message,
      });
      setSentInfo({
        messageId: res.id,
        serviceName: selectedServiceName,
        senderEmail: gmailUser?.email || email,
      });
      setShowConfirmModal(false);
      setStatus('dispatched');
    } catch (err: any) {
      setShowConfirmModal(false);
      if (err instanceof GmailAuthExpiredError) {
        setToken(null);
        setNeedsAuth(true);
      }
      setSubmitError(
        err?.message || 'Failed to deliver inquiry via Gmail. Please try again.'
      );
    } finally {
      setIsSending(false);
    }
  };

  const handleResetAfterDispatch = () => {
    setFullName('');
    setEmail(gmailUser?.email || '');
    setPhone('');
    setService('patent-filing');
    setMessage('');
    setErrors({});
    setSubmitError(null);
    setSentInfo(null);
    setStatus('idle');
  };

  const googleMapsDirectionsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    '11/766, Thingal Villa, Vaduvanchal Road, Andoor, Wayanad, Kerala - 673581, India'
  )}`;

  return (
    <div id="contact" className={`w-full ${isEmbedded ? 'pt-8' : 'pt-20'} scroll-mt-20`}>
      {/* Header Banner */}
      <section className="py-12 sm:py-20 bg-[#111C2B] text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-dark-staff-lines opacity-30 pointer-events-none" />
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4 sm:space-y-6 relative z-10">
          <span className="text-xs uppercase tracking-[0.2em] text-[#B49A68] font-semibold block">
            Direct Counsel
          </span>
          <h1 className="font-serif-display text-3xl sm:text-5xl md:text-6xl font-bold text-[#FFFEFA] tracking-tight">
            Connect with Piano IP
          </h1>
        </div>
      </section>

      {/* Main Grid: Form & Location Details */}
      <section className="py-12 sm:py-20 lg:py-24 bg-[#F7F4ED] text-[#151515]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16">
            
            {/* Left Column: Form (7 cols) */}
            <div className="lg:col-span-7 bg-[#FFFEFA] border border-[#111C2B]/10 rounded-2xl p-5 sm:p-8 md:p-10 shadow-sm relative">
              <div className="mb-6 sm:mb-8">
                <span className="text-xs uppercase tracking-widest text-[#B49A68] font-semibold block mb-1">
                  Confidential Inquiry
                </span>
                <h2 className="font-heading text-xl sm:text-2xl md:text-3xl font-bold text-[#111C2B]">
                  Submit Your IP Advisory Brief
                </h2>
                <p className="text-xs sm:text-sm text-[#85827C] mt-1.5 leading-relaxed">
                  All communications are handled with strict legal confidentiality.
                </p>
              </div>

              {status === 'dispatched' ? (
                <div className="p-6 sm:p-8 text-center space-y-4 bg-[#F7F4ED]/60 rounded-xl border border-[#B49A68]/30">
                  <div className="w-12 h-12 bg-[#B49A68]/15 text-[#B49A68] rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-7 h-7" />
                  </div>
                  <h3 className="font-heading text-xl font-bold text-[#111C2B]">
                    Inquiry Sent via Gmail
                  </h3>
                  <p className="text-sm text-[#151515]/80 max-w-md mx-auto leading-relaxed">
                    All your inquiry details have been delivered via Gmail directly to{' '}
                    <strong className="text-[#111C2B]">info@pianoip.com</strong>.
                  </p>
                  {sentInfo && (
                    <div className="text-left max-w-md mx-auto bg-[#FFFEFA] border border-[#111C2B]/10 rounded-lg p-4 text-xs text-[#151515]/80 space-y-1.5">
                      <p>
                        <span className="font-semibold text-[#111C2B]">Recipient:</span> info@pianoip.com
                      </p>
                      <p>
                        <span className="font-semibold text-[#111C2B]">Sent From:</span> {sentInfo.senderEmail}
                      </p>
                      <p>
                        <span className="font-semibold text-[#111C2B]">Area of Interest:</span> {sentInfo.serviceName}
                      </p>
                    </div>
                  )}
                  <button
                    onClick={handleResetAfterDispatch}
                    className="px-6 py-2.5 text-xs font-semibold uppercase tracking-wider text-white bg-[#151515] hover:bg-[#111C2B] rounded-lg transition-colors mt-2 min-h-[44px]"
                  >
                    Send Another Inquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5" noValidate>
                  {/* Gmail Connection Bar */}
                  <div className="p-4 rounded-xl bg-[#F7F4ED]/70 border border-[#111C2B]/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    {needsAuth || !token ? (
                      <>
                        <div className="space-y-0.5">
                          <span className="text-[11px] font-semibold uppercase tracking-wider text-[#111C2B] block">
                            Direct Gmail Delivery to info@pianoip.com
                          </span>
                          <p className="text-xs text-[#85827C]">
                            Sign in with Google to send your form brief directly via Gmail.
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={handleGoogleLogin}
                          disabled={isLoggingIn}
                          className="gsi-material-button inline-flex items-center justify-center gap-3 px-4 py-2.5 bg-white hover:bg-[#F8F9FA] active:bg-[#F1F3F4] text-[#1F1F1F] border border-[#747775]/40 rounded-md shadow-xs text-sm font-medium transition-colors shrink-0 disabled:opacity-60 min-h-[40px]"
                        >
                          <div className="gsi-material-button-icon w-[18px] h-[18px] shrink-0">
                            <svg
                              version="1.1"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 48 48"
                              style={{ display: 'block' }}
                            >
                              <path
                                fill="#EA4335"
                                d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
                              />
                              <path
                                fill="#4285F4"
                                d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
                              />
                              <path
                                fill="#FBBC05"
                                d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"
                              />
                              <path
                                fill="#34A853"
                                d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
                              />
                              <path fill="none" d="M0 0h48v48H0z" />
                            </svg>
                          </div>
                          <span className="gsi-material-button-contents">
                            {isLoggingIn ? 'Connecting...' : 'Sign in with Google'}
                          </span>
                        </button>
                      </>
                    ) : (
                      <>
                        <div className="flex items-center gap-2.5 min-w-0">
                          <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
                          <div className="min-w-0">
                            <span className="text-[11px] font-semibold uppercase tracking-wider text-[#111C2B] block">
                              Gmail Connected
                            </span>
                            <p className="text-xs text-[#85827C] truncate">
                              Sending as <span className="text-[#111C2B] font-medium">{gmailUser?.email}</span>
                            </p>
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={handleGoogleLogout}
                          className="inline-flex items-center gap-1.5 text-xs font-medium text-[#85827C] hover:text-[#111C2B] transition-colors shrink-0 self-start sm:self-center"
                        >
                          <LogOut className="w-3.5 h-3.5" />
                          <span>Disconnect</span>
                        </button>
                      </>
                    )}
                  </div>

                  {submitError && (
                    <div className="p-3.5 rounded-lg bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-start gap-2.5">
                      <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                      <span>{submitError}</span>
                    </div>
                  )}

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-[#111C2B] mb-1.5">
                      Full Name <span className="text-rose-600">*</span>
                    </label>
                    <input
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="e.g. Elena Rostova"
                      className={`w-full px-4 py-3 text-base sm:text-sm bg-[#F7F4ED]/50 border rounded-lg focus:outline-none focus:ring-1 focus:ring-[#B49A68] transition-colors ${
                        errors.fullName ? 'border-rose-500' : 'border-[#111C2B]/15'
                      }`}
                    />
                    {errors.fullName && (
                      <p className="text-xs text-rose-600 mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5" />
                        {errors.fullName}
                      </p>
                    )}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-[#111C2B] mb-1.5">
                        Email Address <span className="text-rose-600">*</span>
                      </label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="elena@enterprise.com"
                        className={`w-full px-4 py-3 text-base sm:text-sm bg-[#F7F4ED]/50 border rounded-lg focus:outline-none focus:ring-1 focus:ring-[#B49A68] transition-colors ${
                          errors.email ? 'border-rose-500' : 'border-[#111C2B]/15'
                        }`}
                      />
                      {errors.email && (
                        <p className="text-xs text-rose-600 mt-1 flex items-center gap-1">
                          <AlertCircle className="w-3.5 h-3.5" />
                          {errors.email}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-[#111C2B] mb-1.5">
                        Phone Number <span className="text-[#85827C] font-normal">(Optional)</span>
                      </label>
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+91 96329 10080"
                        className="w-full px-4 py-3 text-base sm:text-sm bg-[#F7F4ED]/50 border border-[#111C2B]/15 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#B49A68] transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-[#111C2B] mb-1.5">
                      Service Interested In
                    </label>
                    <select
                      value={service}
                      onChange={(e) => setService(e.target.value)}
                      className="w-full px-4 py-3 text-base sm:text-sm bg-[#F7F4ED]/50 border border-[#111C2B]/15 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#B49A68] transition-colors"
                    >
                      {servicesData.map((s) => (
                        <option key={s.id} value={s.id}>
                          {s.title}
                        </option>
                      ))}
                      <option value="general">Comprehensive IP Strategy / Multi-Asset</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-[#111C2B] mb-1.5">
                      Message & Invention Context <span className="text-rose-600">*</span>
                    </label>
                    <textarea
                      rows={4}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Please summarize your technological domain, target jurisdictions, priority timelines, or specific legal questions..."
                      className={`w-full px-4 py-3 text-base sm:text-sm bg-[#F7F4ED]/50 border rounded-lg focus:outline-none focus:ring-1 focus:ring-[#B49A68] transition-colors ${
                        errors.message ? 'border-rose-500' : 'border-[#111C2B]/15'
                      }`}
                    />
                    {errors.message && (
                      <p className="text-xs text-rose-600 mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5" />
                        {errors.message}
                      </p>
                    )}
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isSending}
                      className="w-full py-3.5 text-xs font-semibold tracking-wider uppercase text-white bg-[#151515] hover:bg-[#111C2B] rounded-lg shadow-sm hover:shadow transition-all flex items-center justify-center gap-2 min-h-[44px] active:scale-[0.99] disabled:opacity-60"
                    >
                      <Send className="w-4 h-4 text-[#B49A68]" />
                      <span>Review & Send via Gmail</span>
                    </button>
                  </div>

                  <div className="flex items-center justify-center gap-2 pt-2 text-[11px] text-[#85827C]">
                    <Shield className="w-3.5 h-3.5 text-[#B49A68]" />
                    <span>Protected by standard attorney-client privilege protocols</span>
                  </div>
                </form>
              )}

              {/* Explicit User Confirmation Modal before Sending Email */}
              {showConfirmModal && (
                <div
                  className="fixed inset-0 z-50 flex items-center justify-center bg-[#111C2B]/60 backdrop-blur-xs p-3 sm:p-4"
                  role="dialog"
                  aria-modal="true"
                  aria-labelledby="gmail-confirm-title"
                >
                  <div className="bg-[#FFFEFA] border border-[#111C2B]/15 rounded-2xl max-w-lg w-full p-5 sm:p-8 shadow-xl space-y-5 max-h-[calc(100dvh-1.5rem)] overflow-y-auto overscroll-contain">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <span className="text-[11px] uppercase tracking-widest text-[#B49A68] font-semibold block mb-1">
                          Confirm Email Dispatch
                        </span>
                        <h3
                          id="gmail-confirm-title"
                          className="font-heading text-xl font-bold text-[#111C2B]"
                        >
                          Send Inquiry to info@pianoip.com?
                        </h3>
                      </div>
                      <button
                        type="button"
                        onClick={() => !isSending && setShowConfirmModal(false)}
                        disabled={isSending}
                        className="w-10 h-10 flex items-center justify-center text-[#85827C] hover:text-[#111C2B] rounded-lg transition-colors shrink-0"
                        aria-label="Close confirmation dialog"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>

                    <p className="text-xs sm:text-sm text-[#151515]/80 leading-relaxed">
                      This will send an email from your Gmail account (<strong className="text-[#111C2B]">{gmailUser?.email}</strong>) to <strong className="text-[#111C2B]">info@pianoip.com</strong> containing the following details:
                    </p>

                    <div className="bg-[#F7F4ED]/80 border border-[#111C2B]/10 rounded-xl p-4 space-y-2 text-xs text-[#151515]">
                      <div>
                        <span className="font-semibold text-[#111C2B]">Full Name:</span> {fullName}
                      </div>
                      <div>
                        <span className="font-semibold text-[#111C2B]">Email Address:</span> {email}
                      </div>
                      <div>
                        <span className="font-semibold text-[#111C2B]">Phone Number:</span>{' '}
                        {phone.trim() || 'Not provided'}
                      </div>
                      <div>
                        <span className="font-semibold text-[#111C2B]">Service Interested In:</span>{' '}
                        {selectedServiceName}
                      </div>
                      <div className="pt-1 border-t border-[#111C2B]/10">
                        <span className="font-semibold text-[#111C2B] block mb-1">
                          Message &amp; Invention Context:
                        </span>
                        <p className="whitespace-pre-line text-[#151515]/85 max-h-32 overflow-y-auto leading-relaxed">
                          {message}
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-col-reverse sm:flex-row justify-end gap-3 pt-1">
                      <button
                        type="button"
                        onClick={() => setShowConfirmModal(false)}
                        disabled={isSending}
                        className="px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-[#111C2B] bg-[#F7F4ED] hover:bg-[#ECE6D8] border border-[#111C2B]/15 rounded-lg transition-colors min-h-[42px]"
                      >
                        Cancel
                      </button>
                      <button
                        type="button"
                        onClick={handleConfirmSend}
                        disabled={isSending}
                        className="px-6 py-2.5 text-xs font-semibold uppercase tracking-wider text-white bg-[#151515] hover:bg-[#111C2B] rounded-lg transition-colors flex items-center justify-center gap-2 min-h-[42px] disabled:opacity-70"
                      >
                        {isSending ? (
                          <>
                            <Loader2 className="w-4 h-4 animate-spin text-[#B49A68]" />
                            <span>Sending via Gmail...</span>
                          </>
                        ) : (
                          <>
                            <Send className="w-3.5 h-3.5 text-[#B49A68]" />
                            <span>Confirm &amp; Send Email</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Right Column: Verified Office Location & Direct Channels (5 cols) */}
            <div className="lg:col-span-5 space-y-6 sm:space-y-8">
              
              {/* Office Details Card */}
              <div className="bg-[#FFFEFA] border border-[#111C2B]/10 rounded-2xl p-5 sm:p-8 space-y-5 sm:space-y-6 shadow-sm">
                <div>
                  <span className="text-xs uppercase tracking-widest text-[#B49A68] font-semibold block mb-1">
                    Corporate Headquarters
                  </span>
                  <h3 className="font-heading text-2xl font-bold text-[#111C2B]">
                    Piano IP
                  </h3>
                </div>

                <div className="space-y-4 text-sm text-[#151515]/85">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-[#B49A68] shrink-0 mt-0.5" />
                    <div>
                      <p className="leading-relaxed">
                        11/766, Thingal Villa, Vaduvanchal Road,<br />
                        Andoor, Wayanad, Kerala – 673581, India.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Phone className="w-5 h-5 text-[#B49A68] shrink-0" />
                    <div>
                      <a
                        href="tel:+919632910080"
                        className="text-sm font-medium hover:text-[#B49A68] transition-colors tabular-nums inline-flex items-center min-h-[36px]"
                      >
                        +91 96329 10080
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Mail className="w-5 h-5 text-[#B49A68] shrink-0" />
                    <div>
                      <a
                        href="mailto:info@pianoip.com"
                        className="text-sm font-medium hover:text-[#B49A68] transition-colors inline-flex items-center min-h-[36px] break-all"
                      >
                        info@pianoip.com
                      </a>
                    </div>
                  </div>
                </div>

              </div>

              {/* Map Visual Card */}
              <div className="bg-[#111C2B] text-white border border-[#B49A68]/30 rounded-2xl p-5 sm:p-6 shadow-sm relative overflow-hidden">
                <div className="absolute inset-0 bg-dark-staff-lines opacity-20 pointer-events-none" />
                <div className="relative z-10">
                  <a
                    href={googleMapsDirectionsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3 px-4 bg-[#B49A68] hover:bg-[#C9B488] text-[#111C2B] text-xs font-semibold uppercase tracking-wider rounded-lg transition-colors flex items-center justify-center gap-2 shadow min-h-[44px]"
                  >
                    <span>Get Navigation Directions</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>
    </div>
  );
};
