import { useEffect, useRef, useState } from 'react';
import { HardHat, Users, Send, BellRing, CheckCheck, UserPlus, Smartphone, MousePointerClick } from 'lucide-react';
import { STEPS } from '@/data/crewcover';
import { SectionHeading } from './primitives';

const ICONS = {
  employers: [Send, BellRing, CheckCheck],
  workers: [UserPlus, Smartphone, MousePointerClick],
};

export default function HowItWorks() {
  const [mode, setMode] = useState<'employers' | 'workers'>('employers');
  const ref = useRef<HTMLDivElement>(null);
  const [p, setP] = useState(0);

  useEffect(() => {
    let raf = 0;
    const update = () => {
      const el = ref.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      setP(Math.max(0, Math.min(1, (vh * 0.8 - r.top) / (r.height * 0.8))));
    };
    const onScroll = () => { cancelAnimationFrame(raf); raf = requestAnimationFrame(update); };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const steps = STEPS[mode];
  const icons = ICONS[mode];

  return (
    <section id="how-it-works" className="relative overflow-hidden py-28 sm:py-36">
      <div className="absolute left-1/2 top-0 h-[600px] w-[900px] -translate-x-1/2 rounded-full bg-cc-yellow/[0.06] blur-[140px]" />
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading eyebrow="How it works" title={<>Three steps. <span className="text-cc-yellow">Zero chaos.</span></>} sub="Whether you're filling the roster or looking for extra shifts, CrewCover keeps it dead simple." />

        {/* toggle */}
        <div className="mt-10 flex justify-center">
          <div className="cc-glass relative grid grid-cols-2 rounded-full p-1.5">
            <span
              className="absolute inset-y-1.5 left-1.5 w-[calc(50%-6px)] rounded-full bg-cc-yellow shadow-[0_0_24px_rgba(255,214,0,.5)] transition-transform duration-500 ease-[cubic-bezier(.3,1.4,.5,1)]"
              style={{ transform: mode === 'workers' ? 'translateX(100%)' : 'translateX(0)' }}
            />
            {(['employers', 'workers'] as const).map((m) => (
              <button
                key={m}
                onClick={() => setMode(m)}
                className={`relative z-10 flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-bold transition-colors sm:px-8 ${mode === m ? 'text-black' : 'text-white/70 hover:text-white'}`}
                aria-pressed={mode === m}
              >
                {m === 'employers' ? <Users className="h-4 w-4" /> : <HardHat className="h-4 w-4" />}
                For {m === 'employers' ? 'Employers' : 'Workers'}
              </button>
            ))}
          </div>
        </div>

        <div ref={ref} className="relative mt-16">
          {/* horizontal connector (desktop) */}
          <div className="absolute left-[16%] right-[16%] top-10 hidden h-[3px] rounded-full bg-white/10 md:block">
            <div className="h-full origin-left rounded-full bg-gradient-to-r from-cc-amber to-cc-yellow shadow-[0_0_16px_#FFD600,0_0_32px_rgba(255,214,0,.5)]" style={{ transform: `scaleX(${p})` }} />
          </div>
          {/* vertical connector (mobile) */}
          <div className="absolute bottom-10 left-10 top-10 w-[3px] rounded-full bg-white/10 md:hidden">
            <div className="w-full origin-top rounded-full bg-gradient-to-b from-cc-amber to-cc-yellow shadow-[0_0_16px_#FFD600]" style={{ height: '100%', transform: `scaleY(${p})` }} />
          </div>

          <div key={mode} className="grid gap-10 md:grid-cols-3 md:gap-8">
            {steps.map((s, i) => {
              const I = icons[i];
              const lit = p >= i / 2.4;
              return (
                <div key={s.title} className="relative flex gap-6 md:flex-col md:items-center md:text-center cc-screen-in" style={{ animationDelay: `${i * 120}ms` }}>
                  <div
                    className={`relative z-10 grid h-20 w-20 shrink-0 place-items-center rounded-2xl border-2 transition-all duration-500 ${
                      lit ? 'border-cc-yellow bg-cc-yellow text-black shadow-[0_0_40px_rgba(255,214,0,.6)]' : 'border-white/15 bg-cc-card text-white/60'
                    }`}
                  >
                    <I className="h-8 w-8" />
                    <span className={`font-display absolute -right-3 -top-3 grid h-8 w-8 place-items-center rounded-full border-2 text-sm ${lit ? 'border-black bg-white text-black' : 'border-white/15 bg-cc-black text-white/60'}`}>
                      {i + 1}
                    </span>
                  </div>
                  <div className="pt-2 md:pt-4">
                    <h3 className="font-display text-2xl sm:text-3xl">{s.title}</h3>
                    <p className="mt-2 max-w-xs text-white/60 md:mx-auto">{s.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
