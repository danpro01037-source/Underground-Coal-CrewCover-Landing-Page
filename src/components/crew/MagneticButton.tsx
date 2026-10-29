import React, { useRef } from 'react';
import { useLiteMode } from '@/hooks/useCrewMotion';
import { APP_STORE_URL, PLAY_STORE_URL, BOOKING_URL } from '@/data/crewcover';
import { CalendarDays } from 'lucide-react';

type Props = {
  children: React.ReactNode;
  variant?: 'primary' | 'ghost' | 'dark';
  href?: string;
  onClick?: () => void;
  className?: string;
  type?: 'button' | 'submit';
  disabled?: boolean;
  external?: boolean;
  ariaLabel?: string;
};

export default function MagneticButton({ children, variant = 'primary', href, onClick, className = '', type = 'button', disabled, external, ariaLabel }: Props) {
  const ref = useRef<HTMLElement | null>(null);
  const lite = useLiteMode();

  const onMove = (e: React.MouseEvent) => {
    if (lite || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const x = e.clientX - (r.left + r.width / 2);
    const y = e.clientY - (r.top + r.height / 2);
    ref.current.style.transform = `translate(${x * 0.25}px, ${y * 0.35}px)`;
  };
  const onLeave = () => {
    if (ref.current) ref.current.style.transform = '';
  };

  const v = variant === 'primary' ? 'cc-btn-primary' : variant === 'ghost' ? 'cc-btn-ghost' : 'bg-cc-black text-white border border-white/15 hover:border-cc-yellow';
  const cls = `cc-btn ${v} inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3.5 font-bold text-sm sm:text-base disabled:opacity-60 ${className}`;

  if (href) {
    return (
      <a
        ref={ref as any}
        href={href}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        className={cls}
        aria-label={ariaLabel}
        {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      >
        <span className="relative z-[2] inline-flex items-center gap-2">{children}</span>
      </a>
    );
  }
  return (
    <button ref={ref as any} type={type} disabled={disabled} onClick={onClick} onMouseMove={onMove} onMouseLeave={onLeave} className={cls} aria-label={ariaLabel}>
      <span className="relative z-[2] inline-flex items-center gap-2">{children}</span>
    </button>
  );
}

const AppleIcon = () => (
  <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor" aria-hidden>
    <path d="M16.37 12.62c-.02-2.3 1.88-3.41 1.97-3.46-1.07-1.57-2.74-1.79-3.33-1.81-1.42-.14-2.77.83-3.49.83-.72 0-1.83-.81-3.01-.79-1.55.02-2.98.9-3.78 2.29-1.61 2.8-.41 6.94 1.16 9.21.77 1.11 1.68 2.36 2.88 2.31 1.16-.05 1.6-.75 3-.75s1.79.75 3.01.72c1.25-.02 2.04-1.13 2.8-2.25.88-1.29 1.24-2.54 1.26-2.6-.03-.01-2.42-.93-2.47-3.7zM14.08 5.85c.64-.77 1.07-1.85.95-2.92-.92.04-2.03.61-2.69 1.38-.59.68-1.11 1.78-.97 2.83 1.03.08 2.07-.52 2.71-1.29z" />
  </svg>
);
const PlayIcon = () => (
  <svg viewBox="0 0 24 24" className="h-6 w-6" aria-hidden>
    <path d="M3.6 2.2 13.4 12l-9.8 9.8c-.4-.2-.6-.6-.6-1.1V3.3c0-.5.2-.9.6-1.1z" fill="#FFD600" />
    <path d="m16.8 8.6-3.4 3.4-9.8-9.8c.3-.2.8-.2 1.2 0l12 6.4z" fill="#fff" />
    <path d="m16.8 15.4-12 6.4c-.4.2-.9.2-1.2 0l9.8-9.8 3.4 3.4z" fill="#FFB800" />
    <path d="m20.6 13.4-3.8 2-3.4-3.4 3.4-3.4 3.8 2c1 .6 1 2.2 0 2.8z" fill="#fff" opacity=".85" />
  </svg>
);

export function StoreButtons({ demo = true, className = '' }: { demo?: boolean; className?: string }) {
  return (
    <div className={`flex flex-wrap items-center gap-3 ${className}`}>
      <MagneticButton href={APP_STORE_URL} external variant="primary" ariaLabel="Download on the App Store">
        <AppleIcon />
        <span className="flex flex-col items-start leading-tight">
          <span className="text-[10px] font-medium opacity-75">Download on the</span>
          <span className="text-base font-extrabold">App Store</span>
        </span>
      </MagneticButton>
      <MagneticButton href={PLAY_STORE_URL} external variant="ghost" ariaLabel="Get it on Google Play">
        <PlayIcon />
        <span className="flex flex-col items-start leading-tight">
          <span className="text-[10px] font-medium opacity-75">Get it on</span>
          <span className="text-base font-extrabold">Google Play</span>
        </span>
      </MagneticButton>
      {demo && (
        <MagneticButton href={BOOKING_URL} external variant="ghost" className="py-[18px]" ariaLabel="Book a Demo">
          <CalendarDays className="h-5 w-5 text-cc-yellow" />
          Book a Demo
        </MagneticButton>
      )}
    </div>
  );
}
