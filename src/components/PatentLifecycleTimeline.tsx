import React, { useState } from 'react';
import { patentLifecycleStages } from '../data/lifecycleData';
import { ChevronDown, ChevronUp, Clock } from 'lucide-react';

interface PatentLifecycleTimelineProps {
  onSelectService?: (serviceId: string) => void;
}

export const PatentLifecycleTimeline: React.FC<PatentLifecycleTimelineProps> = ({ onSelectService }) => {
  // All steps collapsed by default so only the name is shown until clicked
  const [expandedSteps, setExpandedSteps] = useState<Record<string, boolean>>({});

  const toggleStep = (id: string) => {
    setExpandedSteps((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <div className="w-full relative">
      {/* Continuous S-Shaped Winding Dotted Line Container */}
      <div className="relative max-w-5xl mx-auto">
        {patentLifecycleStages.map((stage, index) => {
          // Alternating left/right positioning to create the winding S-curve path
          const isLeft = index % 2 === 0;
          const isFirst = index === 0;
          const isLast = index === patentLifecycleStages.length - 1;
          const isExpanded = !!expandedSteps[stage.id];

          return (
            <div key={stage.id} className="relative">
              {/* Milestone Station Row with Continuous Dotted Line Stem */}
              <div className="relative flex flex-col w-full">
                {/* Vertical Dotted Line Stem Behind Station (Desktop/Laptop >= md, aligns at 22.5% Left / 77.5% Right) */}
                <div
                  aria-hidden="true"
                  className={`hidden md:flex justify-center pointer-events-none absolute -translate-x-1/2 w-2 z-0 ${
                    isLeft ? 'left-[22.5%]' : 'left-[77.5%]'
                  } ${
                    isFirst && isLast
                      ? 'hidden'
                      : isFirst
                      ? 'top-1/2 bottom-0'
                      : isLast
                      ? 'top-0 bottom-1/2'
                      : 'inset-y-0'
                  }`}
                >
                  <div className="w-0 h-full border-l-[4px] border-dotted border-[#B49A68]" />
                </div>

                {/* Vertical Dotted Line Stem Behind Station (Mobile < md, aligns at 42% Left / 58% Right) */}
                <div
                  aria-hidden="true"
                  className={`flex md:hidden justify-center pointer-events-none absolute -translate-x-1/2 w-2 z-0 ${
                    isLeft ? 'left-[42%]' : 'left-[58%]'
                  } ${
                    isFirst && isLast
                      ? 'hidden'
                      : isFirst
                      ? 'top-1/2 bottom-0'
                      : isLast
                      ? 'top-0 bottom-1/2'
                      : 'inset-y-0'
                  }`}
                >
                  <div className="w-0 h-full border-l-[3px] border-dotted border-[#B49A68]" />
                </div>

                {/* Milestone Node & Card Container (45% width on md+ for pronounced S-curve; 84% staggered on mobile) */}
                <div
                  className={`relative z-10 w-[84%] md:w-[45%] ${
                    isLeft ? 'mr-auto' : 'ml-auto'
                  }`}
                >
                  <div
                    onClick={() => toggleStep(stage.id)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        toggleStep(stage.id);
                      }
                    }}
                    role="button"
                    tabIndex={0}
                    aria-expanded={isExpanded}
                    className={`group w-full text-left bg-[#FFFEFA] border rounded-2xl p-4 sm:p-5 lg:p-6 transition-all duration-300 shadow-sm hover:shadow-md cursor-pointer select-none focus:outline-none focus-visible:ring-2 focus-visible:ring-[#B49A68] ${
                      isExpanded
                        ? 'border-[#B49A68] shadow-md ring-1 ring-[#B49A68]/30'
                        : 'border-[#111C2B]/15 hover:border-[#B49A68]'
                    }`}
                  >
                    {/* Collapsed State: Shows Name, Stage Number, Timing and Expand Indicator */}
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-3 min-w-0">
                        {/* Numbered Node Indicator */}
                        <div
                          className={`w-10 h-10 sm:w-11 sm:h-11 rounded-full flex items-center justify-center font-heading text-sm sm:text-base font-bold shrink-0 transition-all duration-300 ${
                            isExpanded
                              ? 'bg-[#B49A68] text-[#111C2B] shadow-md scale-105'
                              : 'bg-[#111C2B] text-[#B49A68] group-hover:bg-[#B49A68] group-hover:text-[#111C2B]'
                          }`}
                        >
                          <span>0{stage.step}</span>
                        </div>

                        {/* Stage Name & Timing */}
                        <div className="min-w-0">
                          <h3 className="font-heading text-base sm:text-lg lg:text-xl font-bold text-[#111C2B] group-hover:text-[#B49A68] transition-colors leading-snug break-words">
                            {stage.title}
                          </h3>
                          <div className="flex items-center gap-1.5 text-xs text-[#85827C] mt-0.5">
                            <Clock className="w-3.5 h-3.5 text-[#B49A68] shrink-0" />
                            <span className="truncate">{stage.timelineWindow}</span>
                          </div>
                        </div>
                      </div>

                      {/* Expand / Collapse Indicator */}
                      <div className="flex items-center gap-2 shrink-0">
                        <span className="hidden lg:inline-block text-[11px] font-semibold uppercase tracking-wider text-[#B49A68]">
                          {isExpanded ? 'Hide' : 'Details'}
                        </span>
                        <div
                          className={`w-9 h-9 rounded-full flex items-center justify-center transition-colors ${
                            isExpanded
                              ? 'bg-[#B49A68]/15 text-[#B49A68]'
                              : 'bg-[#111C2B]/5 text-[#85827C] group-hover:text-[#B49A68] group-hover:bg-[#B49A68]/10'
                          }`}
                        >
                          {isExpanded ? (
                            <ChevronUp className="w-4 h-4 text-[#B49A68]" />
                          ) : (
                            <ChevronDown className="w-4 h-4" />
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Expanded Details: Revealed ONLY on Click */}
                    {isExpanded && (
                      <div
                        onClick={(e) => e.stopPropagation()}
                        className="pt-4 mt-4 border-t border-[#111C2B]/10 space-y-4 animate-in fade-in slide-in-from-top-2 duration-300"
                      >
                        <p className="text-xs sm:text-sm font-semibold text-[#85827C]">
                          {stage.subtitle}
                        </p>

                        <p className="text-xs sm:text-sm text-[#151515]/90 leading-relaxed whitespace-pre-line">
                          {stage.description}
                        </p>

                        <div className="pt-3 border-t border-[#111C2B]/10 flex items-center justify-between gap-3">
                          <button
                            type="button"
                            onClick={() => toggleStep(stage.id)}
                            className="text-xs text-[#85827C] hover:text-[#111C2B] font-medium min-h-[36px] flex items-center"
                          >
                            ▲ Close Details
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Continuous Winding Dotted Line S-Curve Connectors Between Milestones */}
              {!isLast && (
                <>
                  {/* Mobile Winding Dotted Bend (< md): Sweeps cleanly between 42% (Left) and 58% (Right) */}
                  <div className="flex md:hidden w-full h-14 items-center justify-center pointer-events-none relative z-0">
                    <svg
                      className="w-full h-full overflow-visible"
                      viewBox="0 0 1000 100"
                      fill="none"
                      preserveAspectRatio="none"
                    >
                      <path
                        d={
                          isLeft
                            ? 'M 420 0 C 420 55, 580 45, 580 100'
                            : 'M 580 0 C 580 55, 420 45, 420 100'
                        }
                        stroke="#B49A68"
                        strokeWidth="3.5"
                        strokeLinecap="round"
                        strokeDasharray="0.5 11"
                        vectorEffect="non-scaling-stroke"
                      />
                    </svg>
                  </div>

                  {/* Desktop/Laptop Winding Dotted Bend (>= md): Sweeps cleanly between 22.5% (Left) and 77.5% (Right) */}
                  <div className="hidden md:flex w-full h-24 lg:h-28 items-center justify-center pointer-events-none relative z-0">
                    <svg
                      className="w-full h-full overflow-visible"
                      viewBox="0 0 1000 130"
                      fill="none"
                      preserveAspectRatio="none"
                    >
                      <path
                        d={
                          isLeft
                            ? 'M 225 0 C 225 78, 775 52, 775 130'
                            : 'M 775 0 C 775 78, 225 52, 225 130'
                        }
                        stroke="#B49A68"
                        strokeWidth="4"
                        strokeLinecap="round"
                        strokeDasharray="0.5 13"
                        vectorEffect="non-scaling-stroke"
                      />
                    </svg>
                  </div>
                </>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
