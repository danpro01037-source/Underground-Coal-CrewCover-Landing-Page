import { useEffect, useRef } from 'react';
import { useLiteMode } from '@/hooks/useCrewMotion';

export function ScrollProgress() {
  const bar = useRef<HTMLDivElement>(null);
  useEffect(() => {
    let raf = 0;
    const update = () => {
      const h = document.documentElement.scrollHeight - window.innerHeight;
      const p = h > 0 ? window.scrollY / h : 0;
      if (bar.current) bar.current.style.transform = `scaleX(${p})`;
    };
    const onScroll = () => { cancelAnimationFrame(raf); raf = requestAnimationFrame(update); };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => { window.removeEventListener('scroll', onScroll); window.removeEventListener('resize', onScroll); };
  }, []);
  return (
    <div className="fixed inset-x-0 top-0 z-[80] h-[3px] bg-transparent">
      <div ref={bar} className="h-full origin-left bg-gradient-to-r from-cc-amber via-cc-yellow to-white shadow-[0_0_12px_#FFD600]" style={{ transform: 'scaleX(0)' }} />
    </div>
  );
}

export function MouseSpotlight() {
  const lite = useLiteMode();
  const el = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (lite) return;
    let x = window.innerWidth / 2, y = window.innerHeight / 2, cx = x, cy = y, raf = 0;
    const move = (e: MouseEvent) => { x = e.clientX; y = e.clientY; };
    const loop = () => {
      cx += (x - cx) * 0.15;
      cy += (y - cy) * 0.15;
      if (el.current) el.current.style.transform = `translate3d(${cx - 300}px, ${cy - 300}px, 0)`;
      raf = requestAnimationFrame(loop);
    };
    window.addEventListener('mousemove', move, { passive: true });
    raf = requestAnimationFrame(loop);
    return () => { window.removeEventListener('mousemove', move); cancelAnimationFrame(raf); };
  }, [lite]);
  if (lite) return null;
  return (
    <div
      ref={el}
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[55] h-[600px] w-[600px] rounded-full mix-blend-screen"
      style={{ background: 'radial-gradient(circle, rgba(255,214,0,.13) 0%, rgba(255,184,0,.06) 30%, transparent 65%)', willChange: 'transform' }}
    />
  );
}

export function Grain() {
  return <div aria-hidden className="cc-grain" />;
}
