import React from 'react';
import { useInView } from '@/hooks/useCrewMotion';

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  variant?: 'up' | 'left' | 'right' | 'scale';
  as?: keyof JSX.IntrinsicElements;
};

export function Reveal({ children, className = '', delay = 0, variant = 'up', as = 'div' }: RevealProps) {
  const [ref, visible] = useInView<HTMLDivElement>(0.15);
  const Tag = as as any;
  const v = variant === 'left' ? 'cc-left' : variant === 'right' ? 'cc-right' : variant === 'scale' ? 'cc-scale' : '';
  return (
    <Tag ref={ref} className={`cc-reveal ${v} ${visible ? 'is-visible' : ''} ${className}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </Tag>
  );
}

export function LightDivider() {
  const [ref, visible] = useInView<HTMLDivElement>(0.5);
  return (
    <div ref={ref} aria-hidden className={`cc-divider ${visible ? 'is-visible' : ''} -rotate-2 scale-x-110`}>
      <span />
    </div>
  );
}

type HeadingProps = {
  eyebrow?: string;
  title: React.ReactNode;
  sub?: React.ReactNode;
  center?: boolean;
};

export function SectionHeading({ eyebrow, title, sub, center = true }: HeadingProps) {
  const [ref, visible] = useInView<HTMLDivElement>(0.3);
  return (
    <div ref={ref} className={`cc-reveal ${visible ? 'is-visible' : ''} ${center ? 'text-center mx-auto' : ''} max-w-3xl`}>
      {eyebrow && (
        <div className={`inline-flex items-center gap-2 rounded-full border border-cc-yellow/30 bg-cc-yellow/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-cc-yellow ${center ? '' : ''}`}>
          <span className="h-1.5 w-1.5 rounded-full bg-cc-yellow shadow-[0_0_10px_#FFD600]" />
          {eyebrow}
        </div>
      )}
      <h2 className="font-display mt-5 text-5xl leading-[0.95] sm:text-6xl lg:text-7xl">
        <span className="cc-shimmer">{title}</span>
      </h2>
      {sub && <p className="mt-5 text-base text-white/65 sm:text-lg">{sub}</p>}
    </div>
  );
}

export function Y({ children }: { children: React.ReactNode }) {
  return <span className="text-cc-yellow">{children}</span>;
}
