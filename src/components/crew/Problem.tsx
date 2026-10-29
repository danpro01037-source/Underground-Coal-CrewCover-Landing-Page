import { useEffect, useRef, useState } from 'react';
import { PhoneOff, MessagesSquare, UserX, TrendingDown, Zap, BellRing, MousePointerClick, CheckCircle2 } from 'lucide-react';
import { OLD_WAY, NEW_WAY, IMAGES } from '@/data/crewcover';
import { SectionHeading, Reveal } from './primitives';

const OLD_ICONS = [PhoneOff, MessagesSquare, UserX, TrendingDown];
const NEW_ICONS = [MousePointerClick, BellRing, Zap, CheckCircle2];

export default function Problem() {
  const ref = useRef<HTMLDivElement>(null);
  const [p, setP] = useState(0);

  useEffect(() => {
    let raf = 0;
    const update = () => {
      const el = ref.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const v = (vh * 0.85 - r.top) / (r.height * 0.75);
      setP(Math.max(0, Math.min(1, v)));
    };
    const onScroll = () => { cancelAnimationFrame(raf); raf = requestAnimationFrame(update); };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <section id="problem" className="relative overflow-hidden py-28 sm:py-36">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="The problem"
          title={<>Short a few in the crew? <span className="text-cc-yellow">Not anymore.</span></>}
          sub="Filling a last-minute vacancy shouldn't mean 25 phone calls looking for coverage."
        />

        <div ref={ref} className="relative mt-16 grid gap-6 lg:grid-cols-2">
          {/* OLD WAY */}
          <Reveal variant="left" className="relative overflow-hidden rounded-3xl border border-white/5 bg-[#121212] p-7 sm:p-10">
            <div className="absolute inset-0 opacity-15 grayscale">
              <img src={IMAGES.tunnel} alt="" className="h-full w-full object-cover" loading="lazy" />
            </div>
            <div className="relative" style={{ filter: `grayscale(1) brightness(${1 - p * 0.35})` }}>
              <div className="font-display text-sm tracking-[0.3em] text-white/40">The old way</div>
              <h3 className="font-display mt-2 text-4xl text-white/50 sm:text-5xl">Chaos. Every shift.</h3>
              <ul className="mt-8 space-y-5">
                {OLD_WAY.map((o, i) => {
                  const I = OLD_ICONS[i];
                  return (
                    <li key={o.title} className="flex gap-4">
                      <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-white/10 bg-white/5"><I className="h-5 w-5 text-white/40" /></span>
                      <div>
                        <div className="font-semibold text-white/55 line-through decoration-red-500/60">{o.title}</div>
                        <div className="text-sm text-white/35">{o.desc}</div>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          </Reveal>

          {/* NEW WAY */}
          <Reveal variant="right" className="relative overflow-hidden rounded-3xl cc-glass p-7 sm:p-10" >
            <div
              className="relative transition-[filter] duration-300"
              style={{ filter: `grayscale(${1 - p}) brightness(${0.55 + p * 0.45})` }}
            >
              <div className="font-display text-sm tracking-[0.3em] text-cc-yellow">The CrewCover way</div>
              <h3 className="font-display mt-2 text-4xl sm:text-5xl">One tap. <span className="text-cc-yellow">Covered.</span></h3>
              <ul className="mt-8 space-y-5">
                {NEW_WAY.map((o, i) => {
                  const I = NEW_ICONS[i];
                  return (
                    <li key={o.title} className="flex gap-4">
                      <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-cc-yellow shadow-[0_0_20px_rgba(255,214,0,.45)]"><I className="h-5 w-5 text-black" /></span>
                      <div>
                        <div className="font-semibold text-white">{o.title}</div>
                        <div className="text-sm text-white/65">{o.desc}</div>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
            {/* yellow light wipe */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-y-0 w-1/2 -skew-x-12 mix-blend-screen"
              style={{
                left: `${-60 + p * 170}%`,
                background: 'linear-gradient(90deg, transparent, rgba(255,214,0,.18), rgba(255,240,180,.35), rgba(255,214,0,.18), transparent)',
                filter: 'blur(8px)',
              }}
            />
            <div aria-hidden className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-cc-yellow blur-[100px]" style={{ opacity: p * 0.25 }} />
          </Reveal>

          {/* VS badge */}
          <div className="font-display absolute left-1/2 top-1/2 z-10 hidden h-16 w-16 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border-2 border-cc-yellow bg-cc-black text-2xl text-cc-yellow shadow-[0_0_30px_rgba(255,214,0,.5)] lg:grid">
            VS
          </div>
        </div>
      </div>
    </section>
  );
}
