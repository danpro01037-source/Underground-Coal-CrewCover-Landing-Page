import React, { useRef } from 'react';
import { useInView, useLiteMode } from '@/hooks/useCrewMotion';

type Props = { children: React.ReactNode; className?: string; delay?: number; max?: number };

/** Glass card with 3D tilt, travelling glow border and in-view reveal. */
export default function TiltCard({ children, className = '', delay = 0, max = 8 }: Props) {
  const [ref, visible] = useInView<HTMLDivElement>(0.15);
  const inner = useRef<HTMLDivElement>(null);
  const glare = useRef<HTMLDivElement>(null);
  const lite = useLiteMode();

  const onMove = (e: React.MouseEvent) => {
    if (lite || !inner.current) return;
    const r = inner.current.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    inner.current.style.transform = `perspective(1000px) rotateX(${(0.5 - py) * max}deg) rotateY(${(px - 0.5) * max}deg) translateZ(0)`;
    if (glare.current) {
      glare.current.style.opacity = '1';
      glare.current.style.background = `radial-gradient(400px circle at ${px * 100}% ${py * 100}%, rgba(255,214,0,.14), transparent 45%)`;
    }
  };
  const onLeave = () => {
    if (inner.current) inner.current.style.transform = '';
    if (glare.current) glare.current.style.opacity = '0';
  };

  return (
    <div ref={ref} className={`cc-reveal ${visible ? 'is-visible' : ''} ${className}`} style={{ transitionDelay: `${delay}ms` }}>
      <div
        ref={inner}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        className="cc-glass cc-travel relative h-full overflow-hidden rounded-3xl transition-transform duration-300 ease-out"
        style={{ transformStyle: 'preserve-3d' }}
      >
        <div ref={glare} className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300" />
        {children}
      </div>
    </div>
  );
}
