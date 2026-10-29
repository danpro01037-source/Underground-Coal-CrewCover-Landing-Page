import { useEffect, useRef } from 'react';
import { useReducedMotion } from '@/hooks/useCrewMotion';

/** Glowing coal-dust particles and tiny sparks drifting through the headlamp light. */
export default function Particles({ density = 70 }: { density?: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const mobile = window.innerWidth < 768;
    const count = mobile ? Math.round(density * 0.35) : density;
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    let w = 0, h = 0, raf = 0, running = true;

    type P = { x: number; y: number; r: number; vx: number; vy: number; a: number; spark: boolean; tw: number };
    let ps: P[] = [];

    const resize = () => {
      w = canvas.clientWidth; h = canvas.clientHeight;
      canvas.width = w * dpr; canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    const make = (initial = false): P => {
      const spark = Math.random() < 0.18;
      return {
        x: Math.random() * w,
        y: initial ? Math.random() * h : h + 10,
        r: spark ? Math.random() * 1.4 + 0.6 : Math.random() * 2.2 + 0.4,
        vx: (Math.random() - 0.3) * (spark ? 1.2 : 0.35),
        vy: -(Math.random() * (spark ? 1.6 : 0.45) + 0.12),
        a: Math.random() * 0.6 + 0.2,
        spark,
        tw: Math.random() * Math.PI * 2,
      };
    };
    resize();
    ps = Array.from({ length: count }, () => make(true));

    const draw = () => {
      if (!running) return;
      ctx.clearRect(0, 0, w, h);
      for (const p of ps) {
        p.x += p.vx; p.y += p.vy; p.tw += 0.05;
        if (p.y < -10 || p.x > w + 10 || p.x < -10) Object.assign(p, make());
        const alpha = p.a * (0.6 + Math.sin(p.tw) * 0.4);
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.spark ? `rgba(255,${200 + Math.floor(Math.random() * 40)},80,${alpha})` : `rgba(255,214,120,${alpha * 0.55})`;
        if (p.spark) { ctx.shadowBlur = 8; ctx.shadowColor = '#FFB800'; } else ctx.shadowBlur = 0;
        ctx.fill();
      }
      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);

    const io = new IntersectionObserver(([e]) => {
      running = e.isIntersecting;
      if (running) { cancelAnimationFrame(raf); raf = requestAnimationFrame(draw); }
    });
    io.observe(canvas);
    window.addEventListener('resize', resize);
    return () => { cancelAnimationFrame(raf); io.disconnect(); window.removeEventListener('resize', resize); };
  }, [density, reduced]);

  if (reduced) return null;
  return <canvas ref={canvasRef} aria-hidden className="pointer-events-none absolute inset-0 h-full w-full" />;
}
