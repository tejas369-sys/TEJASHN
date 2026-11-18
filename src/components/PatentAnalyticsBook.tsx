import React, { useState, useCallback, useRef, useEffect } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { patentAnalyticsPages } from '../data/patentAnalyticsData';

const SHEET_SURFACE_COLORS = [
  '#FBF7EE',
  '#F3ECDC',
  '#EAE0CA',
  '#E0D3B7',
  '#D5C5A3'
];

const TAB_PAPER_COLORS = [
  '#F5EEDB',
  '#EDE4CD',
  '#E5DAC0',
  '#DDD0B2',
  '#D4C4A1'
];

export const PatentAnalyticsBook: React.FC = () => {
  const [activePage, setActivePage] = useState<number>(0);
  const mobileTablistRef = useRef<HTMLDivElement | null>(null);
  const mobileTabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const hasInteractedRef = useRef(false);

  const totalPages = patentAnalyticsPages.length;

  const goToPage = useCallback(
    (index: number) => {
      if (index >= 0 && index < totalPages) {
        hasInteractedRef.current = true;
        setActivePage(index);
      }
    },
    [totalPages]
  );

  const handleNext = useCallback(() => {
    hasInteractedRef.current = true;
    setActivePage((prev) => (prev + 1) % totalPages);
  }, [totalPages]);

  const handlePrev = useCallback(() => {
    hasInteractedRef.current = true;
    setActivePage((prev) => Math.max(prev - 1, 0));
  }, []);

  useEffect(() => {
    if (!hasInteractedRef.current) return;
    const container = mobileTablistRef.current;
    const tabEl = mobileTabRefs.current[activePage];
    if (container && tabEl) {
      const targetLeft =
        tabEl.offsetLeft - (container.clientWidth - tabEl.clientWidth) / 2;
      container.scrollTo({
        left: Math.max(0, targetLeft),
        behavior: 'smooth'
      });
    }
  }, [activePage]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      goToPage(Math.min(activePage + 1, totalPages - 1));
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      goToPage(Math.max(activePage - 1, 0));
    }
  };

  const currentPage = patentAnalyticsPages[activePage];

  return (
    <div
      className="w-full max-w-6xl mx-auto text-left outline-none focus-visible:ring-2 focus-visible:ring-[#B49A68]/60 rounded-2xl"
      tabIndex={0}
      onKeyDown={handleKeyDown}
      aria-label="Patent Analytics 5-page interactive folio book"
    >
      {/* BOUND BOOK COVER BOARD & NATURAL 5-PAGE STACK */}
      <div className="relative rounded-2xl bg-[#16191D] border border-[#B49A68]/30 p-3 sm:p-4 md:p-5 shadow-[0_30px_75px_-18px_rgba(0,0,0,0.82)]">
        {/* Subtle Gold Inner Cover Blind Tooling */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-2 rounded-xl border border-[#B49A68]/15"
        />

        {/* DETACHED MOBILE TOP HORIZONTAL PAPER TABS (< md) */}
        <div
          ref={mobileTablistRef}
          role="tablist"
          aria-orientation="horizontal"
          aria-label="Patent Analytics pages"
          className="relative z-30 flex md:hidden items-center gap-2 overflow-x-auto py-1 mb-3 scroll-smooth snap-x snap-mandatory [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {patentAnalyticsPages.map((page, idx) => {
            const isActive = idx === activePage;
            const inactiveBg = TAB_PAPER_COLORS[Math.min(idx, TAB_PAPER_COLORS.length - 1)];

            return (
              <button
                key={`mobile-${page.id}`}
                ref={(el) => {
                  mobileTabRefs.current[idx] = el;
                }}
                role="tab"
                type="button"
                aria-selected={isActive}
                aria-controls={`analytics-page-${page.id}`}
                onClick={() => goToPage(idx)}
                style={{
                  backgroundColor: isActive ? '#FBF7EE' : inactiveBg
                }}
                className={`relative flex items-center gap-2 px-3.5 py-2 min-h-[44px] rounded-xl border shrink-0 snap-center transition-all duration-300 ease-out cursor-pointer ${
                  isActive
                    ? 'border-[#B49A68] text-[#111C2B] -translate-y-0.5 scale-[1.02] shadow-[0_8px_18px_rgba(0,0,0,0.38)] z-30'
                    : 'border-[#6E5A3E]/35 text-[#3B3328]/85 hover:text-[#111C2B] z-20 opacity-90'
                }`}
              >
                {isActive && (
                  <span
                    aria-hidden="true"
                    className="absolute bottom-0 left-3 right-3 h-[2.5px] rounded-t-full bg-[#B49A68]"
                  />
                )}
                <span
                  aria-hidden="true"
                  className={`w-5 h-5 rounded-full flex items-center justify-center font-mono text-[10px] font-bold tabular-nums border shrink-0 transition-colors ${
                    isActive
                      ? 'bg-[#111C2B] text-[#FBF7EE] border-[#111C2B]'
                      : 'bg-[#FBF7EE]/75 text-[#5C4B32] border-[#6E5A3E]/35'
                  }`}
                >
                  {page.pageNumber}
                </span>
                <span className="text-xs font-bold tracking-wide whitespace-nowrap">
                  {page.tabLabel}
                </span>
              </button>
            );
          })}
        </div>

        {/* DETACHED BOOK PAGES + INDEPENDENT RIGHT VERTICAL INDEX TABS ON TABLET/LAPTOP */}
        <div className="relative flex flex-col md:flex-row items-stretch gap-3.5 lg:gap-4">
          {/* 5-PAGE NATURAL PAPER STACKED VIEWPORT */}
          <div className="relative flex-1 min-w-0 pb-4 sm:pb-6">
            {/* Turned-Pages Left Paper Block (visible once user turns past Page 01) */}
            {activePage > 0 && (
              <div
                aria-hidden="true"
                className="hidden sm:flex absolute left-0 top-1 bottom-6 -translate-x-1.5 w-3 flex-col justify-center gap-0.5 pointer-events-none z-10"
              >
                {Array.from({ length: activePage }).map((_, i) => (
                  <div
                    key={i}
                    className="h-full w-full rounded-l-sm bg-[#EAE0CA] border-l border-y border-[#5C4B32]/25 shadow-sm transition-transform duration-500"
                    style={{
                      transform: `translateX(-${i * 2}px)`
                    }}
                  />
                ))}
              </div>
            )}

            <div className="relative" style={{ perspective: '1800px' }}>
              {patentAnalyticsPages.map((page, index) => {
                const isActive = index === activePage;
                const isTurned = index < activePage;
                const stackDepth = index - activePage; // > 0 means sitting stacked behind active page

                let transformStyle = 'translate3d(0px, 0px, 0px) scale(1) rotateY(0deg)';
                let zIndex = 30;
                let opacity = 1;
                let surfaceColor = SHEET_SURFACE_COLORS[0];

                if (isTurned) {
                  // Pages already opened & turned away around the left book spine
                  transformStyle = 'translate3d(-36px, 0px, 0px) scale(0.97) rotateY(-24deg)';
                  zIndex = 40 + index;
                  opacity = 0;
                } else if (stackDepth > 0) {
                  // Underlying natural paper sheets visibly stacked beneath & behind
                  const stepX = stackDepth * 3;
                  const stepY = stackDepth * 6;
                  const scale = Math.max(0.955, 1 - stackDepth * 0.009);
                  transformStyle = `translate3d(${stepX}px, ${stepY}px, 0px) scale(${scale}) rotateY(0deg)`;
                  zIndex = 30 - stackDepth;
                  opacity = 1;
                  surfaceColor = SHEET_SURFACE_COLORS[Math.min(stackDepth, SHEET_SURFACE_COLORS.length - 1)];
                }

                return (
                  <article
                    key={page.id}
                    id={`analytics-page-${page.id}`}
                    role="tabpanel"
                    aria-labelledby={`analytics-tab-${page.id}`}
                    aria-hidden={!isActive}
                    onClick={stackDepth > 0 ? () => goToPage(index) : undefined}
                    style={{
                      transform: transformStyle,
                      transformOrigin: 'left center',
                      zIndex,
                      opacity,
                      backgroundColor: surfaceColor
                    }}
                    className={`${
                      isActive ? 'relative' : 'absolute inset-0'
                    } min-h-[280px] sm:min-h-[370px] rounded-lg border border-[#6E5A3E]/25 text-[#1F1C18] shadow-[0_14px_34px_-12px_rgba(18,14,8,0.65)] transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                      isTurned ? 'pointer-events-none' : ''
                    } ${
                      stackDepth > 0 ? 'cursor-pointer hover:brightness-[0.985]' : ''
                    } overflow-hidden`}
                  >
                    {/* Organic Cotton-Paper Fiber Grain & Natural Warm Lighting */}
                    <div
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-0 opacity-[0.045] mix-blend-multiply"
                      style={{
                        backgroundImage:
                          "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='paperNoise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23paperNoise)'/%3E%3C/svg%3E\")"
                      }}
                    />

                    {/* Natural Page Curvature Highlight & Warm Perimeter Vignette */}
                    <div
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-0"
                      style={{
                        background:
                          'linear-gradient(90deg, rgba(64,48,24,0.14) 0%, rgba(255,253,246,0.35) 14%, rgba(255,253,246,0) 45%, rgba(92,75,50,0.05) 100%), radial-gradient(circle at 80% 15%, rgba(255,255,255,0.4), transparent 60%)'
                      }}
                    />

                    {/* Realistic Left Book Spine Fold & Subtle Thread Margin */}
                    <div
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-y-0 left-0 w-4 sm:w-9 bg-gradient-to-r from-[#3D3121]/18 via-[#3D3121]/5 to-transparent border-r border-[#6E5A3E]/15"
                    />

                    {/* Subtle Marginal Ruled Frame (Archival Book Margin Line) */}
                    <div
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-y-3 sm:inset-y-4 left-5 sm:left-11 right-3 sm:right-7 border border-[#6E5A3E]/10 rounded-xs"
                    />

                    {/* Active Natural Paper Sheet Content */}
                    <div
                      className={`relative pl-7 pr-4 sm:pl-14 sm:pr-12 py-6 sm:py-9 md:py-11 transition-opacity duration-500 ${
                        isActive ? 'opacity-100' : 'opacity-0 pointer-events-none select-none'
                      }`}
                    >
                      {/* Focused Editorial Reading Column */}
                      <div className="max-w-3xl space-y-4 sm:space-y-5">
                        <h3 className="font-heading text-xl sm:text-3xl md:text-4xl font-bold text-[#111C2B] leading-tight text-balance">
                          {page.title}
                        </h3>

                        <div className="space-y-3.5 sm:space-y-4 pt-1">
                          {page.paragraphs.map((paragraph, pIdx) => {
                            const isOpeningQuestion =
                              pIdx === 0 && paragraph.trim().endsWith('?');

                            return (
                              <p
                                key={pIdx}
                                className={
                                  isOpeningQuestion
                                    ? 'font-serif-display italic text-base sm:text-xl text-[#4F412C] leading-relaxed'
                                    : 'text-sm sm:text-base text-[#231F1A]/90 leading-[1.72] sm:leading-[1.78]'
                                }
                              >
                                {paragraph}
                              </p>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>

          {/* DETACHED RIGHT-SIDE VERTICAL PAPER INDEX TABS (TABLET/LAPTOP >= md) */}
          <div
            role="tablist"
            aria-orientation="vertical"
            aria-label="Patent Analytics index tabs"
            className="hidden md:flex relative flex-col justify-start gap-2.5 pb-6 w-52 lg:w-56 shrink-0"
          >
            {patentAnalyticsPages.map((page, idx) => {
              const isActive = idx === activePage;
              const inactiveBg = TAB_PAPER_COLORS[Math.min(idx, TAB_PAPER_COLORS.length - 1)];

              return (
                <button
                  key={page.id}
                  role="tab"
                  type="button"
                  aria-selected={isActive}
                  aria-controls={`analytics-page-${page.id}`}
                  id={`analytics-tab-${page.id}`}
                  onClick={() => goToPage(idx)}
                  title={`${page.pageNumber} · ${page.tabLabel}`}
                  style={{
                    backgroundColor: isActive ? '#FBF7EE' : inactiveBg
                  }}
                  className={`group relative flex flex-row items-center justify-start gap-2.5 px-3.5 py-2.5 min-h-[60px] rounded-xl border transition-all duration-300 ease-out cursor-pointer text-left overflow-hidden ${
                    isActive
                      ? 'translate-x-1.5 scale-[1.02] border-[#B49A68] text-[#111C2B] shadow-[0_12px_24px_rgba(0,0,0,0.42)] z-30'
                      : 'translate-x-0 border-[#6E5A3E]/30 text-[#3B3328]/85 hover:translate-x-0.5 hover:text-[#111C2B] hover:brightness-[1.02] shadow-md z-20'
                  }`}
                >
                  {/* Subtle Paper Grain on Detached Index Tabs */}
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 opacity-[0.045] mix-blend-multiply"
                    style={{
                      backgroundImage:
                        "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='tabNoise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23tabNoise)'/%3E%3C/svg%3E\")"
                    }}
                  />

                  {/* Gold Foil Accent Line on Active Detached Tab */}
                  {isActive && (
                    <span
                      aria-hidden="true"
                      className="block absolute left-0 top-2 bottom-2 w-[3.5px] rounded-r-full bg-[#B49A68]"
                    />
                  )}

                  {/* Tab Number Badge */}
                  <span
                    aria-hidden="true"
                    className={`relative w-7 h-7 rounded-full flex items-center justify-center font-mono text-[11px] font-bold tabular-nums border shrink-0 transition-colors ${
                      isActive
                        ? 'bg-[#111C2B] text-[#FBF7EE] border-[#111C2B]'
                        : 'bg-[#FBF7EE]/70 text-[#5C4B32] border-[#6E5A3E]/35 group-hover:border-[#111C2B]/40 group-hover:text-[#111C2B]'
                    }`}
                  >
                    {page.pageNumber}
                  </span>

                  {/* Full Tab Label */}
                  <div className="relative min-w-0 flex-1">
                    <span
                      className={`block text-[10px] font-mono uppercase tracking-widest ${
                        isActive ? 'text-[#7A6238]' : 'text-[#6E5A3E]/80'
                      }`}
                    >
                      Page {page.pageNumber}
                    </span>
                    <span className="block text-xs font-bold tracking-wide truncate">
                      {page.tabLabel}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* FOLIO PAGE CONTROLS (PREVIOUS / NEXT) */}
        <div className="relative z-30 mt-2 pt-3 border-t border-[#B49A68]/20 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs uppercase tracking-widest text-[#D8C7A4] tabular-nums">
              Page {currentPage.pageNumber} / 0{totalPages}
            </span>
            <div className="flex items-center gap-1.5" role="group" aria-label="Page indicators">
              {patentAnalyticsPages.map((p, idx) => (
                <button
                  key={`dot-${p.id}`}
                  type="button"
                  tabIndex={-1}
                  onClick={() => goToPage(idx)}
                  className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                    idx === activePage
                      ? 'w-6 bg-[#B49A68]'
                      : 'w-2 bg-[#B49A68]/35 hover:bg-[#B49A68]/60'
                  }`}
                  aria-label={`Jump to page ${p.pageNumber}`}
                />
              ))}
            </div>
          </div>

          <div className="flex items-center gap-2.5 ml-auto">
            <button
              type="button"
              onClick={handlePrev}
              disabled={activePage === 0}
              className="inline-flex items-center justify-center gap-2 px-4 min-h-[44px] rounded-xl border border-[#B49A68]/35 bg-[#1D2229] text-[#FBF7EE] text-xs font-semibold uppercase tracking-wider transition-all duration-200 hover:border-[#B49A68] hover:bg-[#242B34] disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Previous</span>
            </button>

            <button
              type="button"
              onClick={handleNext}
              className="inline-flex items-center justify-center gap-2 px-5 min-h-[44px] rounded-xl bg-[#B49A68] text-[#111C2B] text-xs font-bold uppercase tracking-wider shadow-[0_6px_18px_rgba(180,154,104,0.28)] transition-all duration-200 hover:bg-[#C7AE7D] active:translate-y-px cursor-pointer"
            >
              <span>{activePage === totalPages - 1 ? 'Next (Page 01)' : 'Next'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
