import { useEffect, useRef } from 'react';
import { TICKER_WORDS } from '@/data/crewcover';
import { useReducedMotion } from '@/hooks/useCrewMotion';

/** Infinite yellow ticker that speeds up with scroll velocity. */
export default function Ticker({ reverse = false, tilt = -2 }: { reverse?: boolean; tilt?: number }) {
  const track = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;
    let x = 0, raf = 0, lastY = window.scrollY, boost = 0;
    const base = 0.6;
    const loop = () => {
      const y = window.scrollY;
      const v = Math.abs(y - lastY);
      lastY = y;
      boost += (Math.min(v, 60) * 0.12 - boost) * 0.1;
      x -= (base + boost) * (reverse ? -1 : 1);
      const el = track.current;
      if (el) {
        const half = el.scrollWidth / 2;
        if (x <= -half) x += half;
        if (x > 0) x -= half;
        el.style.transform = `translate3d(${x}px,0,0)`;
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [reverse, reduced]);

  const items = Array.from({ length: 4 }).flatMap(() => TICKER_WORDS);
  const row = (
    <>
      {items.map((w, i) => (
        <span key={i} className="font-display flex items-center whitespace-nowrap px-5 text-3xl text-cc-black sm:text-4xl">
          {w}
          <span className="ml-10 inline-block h-3 w-3 rotate-45 bg-cc-black" />
        </span>
      ))}
    </>
  );

  return (
    <div className="relative z-20 -my-4 overflow-hidden py-4" aria-label={TICKER_WORDS.join(', ')}>
      <div className="border-y-2 border-black bg-cc-yellow py-4 shadow-[0_0_60px_rgba(255,214,0,.35)]" style={{ transform: `rotate(${tilt}deg) scale(1.05)` }}>
        <div ref={track} className="cc-ticker-track">
          {row}
          {row}
        </div>
      </div>
    </div>
  );
}
