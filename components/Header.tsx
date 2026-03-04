
import React from 'react';
import ScrolliLogo from './ScrolliLogo';

const Header: React.FC = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#0A0A0A]/60 backdrop-blur-2xl border-b border-white/[0.06] px-5 py-5 flex flex-col items-center justify-center transition-all duration-300 shadow-[0_4px_30px_rgba(0,0,0,0.2)]">
      {/* Container - Vertical stack for perfect centering */}
      <div className="flex flex-col items-center justify-center gap-3">
        {/* Slightly larger Icon-only Logo */}
        <ScrolliLogo className="h-9 md:h-11" />
        
        <div className="flex flex-col items-center">
          <h1 className="font-serif text-[14px] md:text-[15px] text-[#F5F5F7] leading-none tracking-[0.05em] text-center drop-shadow-md">
            The Infrastructure of Intelligence
          </h1>
          <div className="flex items-center gap-2 mt-2">
            <span className="text-[#8E8E93] text-[9px] font-medium tracking-[0.2em] uppercase opacity-60">
              Radical Uncertainty Roundtables
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
