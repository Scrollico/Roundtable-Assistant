
import React from 'react';

interface OnboardingProps {
  onEnter: () => void;
}

const Onboarding: React.FC<OnboardingProps> = ({ onEnter }) => {

  const handleStart = () => {
    onEnter();
  };

  return (
    <div className="fixed inset-0 z-[100] bg-[#0A0A0A] flex flex-col p-8 overflow-y-auto overflow-x-hidden">
      <div className="max-w-md w-full mx-auto py-10 md:py-20 flex flex-col min-h-full animate-in fade-in slide-in-from-bottom-4 duration-1000 relative">

        {/* Decorative background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-white opacity-[0.03] blur-[100px] rounded-full pointer-events-none"></div>

        <div className="mt-4 md:mt-8"></div>

        <h1 className="font-serif text-3xl md:text-4xl text-center mb-6 leading-tight text-[#F5F5F7] tracking-tight px-2 drop-shadow-lg">
          Welcome to the second session of the Radical Uncertainty Roundtables.
        </h1>

        <div className="mb-8">
          <button
            onClick={handleStart}
            className="w-full py-5 bg-white/90 backdrop-blur-md text-black font-bold rounded-full hover:bg-white transition-all transform hover:scale-[1.01] active:scale-[0.98] shadow-[0_0_20px_rgba(255,255,255,0.1)] uppercase tracking-widest text-xs border border-white/50"
          >
            Start Conversation
          </button>
        </div>

        <div className="flex-1 space-y-5 text-[#8E8E93] leading-relaxed text-[15px] md:text-base px-2">
          <div className="relative pl-6 border-l border-white/20 py-1">
            <p className="text-[#F5F5F7] font-medium leading-snug">
              "We are living in an age of radical uncertainty. For today’s decision-makers, <span className="text-white underline decoration-white/30 underline-offset-4">depth</span> matters more than ever."
            </p>
          </div>

          <p>
            The <strong>Radical Uncertainty Roundtables</strong> bring together leading voices from policymaking, media, academia, and business to navigate the profound transitions shaping our time.
          </p>

          <p className="opacity-80">
            Through intimate, invitation-only discussions, the series explores how societies can adapt to systemic shifts across four critical domains: <strong>geopolitics, geoeconomics, innovation, and media.</strong>
          </p>

          <div className="space-y-3 py-6 border-y border-[#1C1C1E]">
            <div className="flex items-start gap-4">
              <span className="text-white pt-1 text-xs font-serif italic">01</span>
              <span className="text-sm">Generate actionable insights for decision-makers.</span>
            </div>
            <div className="flex items-start gap-4">
              <span className="text-white pt-1 text-xs font-serif italic">02</span>
              <span className="text-sm">Build narratives that connect fragmented realities.</span>
            </div>
            <div className="flex items-start gap-4">
              <span className="text-white pt-1 text-xs font-serif italic">03</span>
              <span className="text-sm">Provide a space where high-level perspectives converge into strategic foresight.</span>
            </div>
          </div>

          <p className="text-[10px] uppercase tracking-[0.25em] opacity-40 text-center py-2">
            Strategic Synthesis • Istanbul 2026
          </p>
        </div>
      </div>
    </div>
  );
};

export default Onboarding;
