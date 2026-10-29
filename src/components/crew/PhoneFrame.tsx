import React from 'react';
import { Signal, Wifi, BatteryFull } from 'lucide-react';

export default function PhoneFrame({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={`relative aspect-[9/19] w-[260px] rounded-[46px] border border-white/15 bg-gradient-to-b from-[#2a2a2a] to-[#0d0d0d] p-[10px] shadow-[0_40px_100px_rgba(0,0,0,.8),inset_0_0_0_2px_rgba(255,255,255,.04)] sm:w-[290px] ${className}`}
    >
      {/* side buttons */}
      <span className="absolute -left-[3px] top-28 h-12 w-[3px] rounded-l bg-[#333]" />
      <span className="absolute -left-[3px] top-44 h-12 w-[3px] rounded-l bg-[#333]" />
      <span className="absolute -right-[3px] top-36 h-16 w-[3px] rounded-r bg-[#333]" />
      <div className="relative h-full w-full overflow-hidden rounded-[36px] bg-cc-black">
        {/* status bar */}
        <div className="absolute inset-x-0 top-0 z-30 flex items-center justify-between px-6 pt-3 text-[11px] font-semibold text-white">
          <span>9:41</span>
          <span className="flex items-center gap-1">
            <Signal className="h-3 w-3" /> <Wifi className="h-3 w-3" /> <BatteryFull className="h-3.5 w-3.5" />
          </span>
        </div>
        {/* dynamic island */}
        <div className="absolute left-1/2 top-2 z-40 h-6 w-24 -translate-x-1/2 rounded-full bg-black" />
        {children}
        {/* home indicator */}
        <div className="absolute bottom-2 left-1/2 z-30 h-1 w-24 -translate-x-1/2 rounded-full bg-white/70" />
        {/* glass glare */}
        <div className="pointer-events-none absolute inset-0 z-50 bg-gradient-to-tr from-transparent via-white/[0.04] to-white/[0.1]" />
      </div>
    </div>
  );
}
