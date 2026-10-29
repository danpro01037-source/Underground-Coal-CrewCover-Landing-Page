import { useEffect, useRef, useState } from 'react';
import { PINNED_STAGES, IMAGES } from '@/data/crewcover';
import PhoneFrame from './PhoneFrame';
import { PostShiftScreen, AlertSentScreen, AcceptedScreen, CoveredScreen } from './PhoneScreens';

const SCREENS = [PostShiftScreen, AlertSentScreen, AcceptedScreen, CoveredScreen];

export default function PinnedPhone() {
  const ref = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let raf = 0;
    const update = () => {
      const el = ref.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const total = r.height - window.innerHeight;
      setProgress(Math.max(0, Math.min(0.9999, -r.top / total)));
    };
    const onScroll = () => { cancelAnimationFrame(raf); raf = requestAnimationFrame(update); };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => { window.removeEventListener('scroll', onScroll); window.removeEventListener('resize', onScroll); };
  }, []);

  const stage = Math.floor(progress * PINNED_STAGES.length);
  const Screen = SCREENS[stage];

  const jump = (i: number) => {
    const el = ref.current;
    if (!el) return;
    const total = el.offsetHeight - window.innerHeight;
    const top = el.getBoundingClientRect().top + window.scrollY + total * ((i + 0.5) / PINNED_STAGES.length);
    window.scrollTo({ top, behavior: 'smooth' });
  };

  return (
    <section ref={ref} className="relative" style={{ height: '400vh' }} aria-label="See CrewCover in action">
      <div className="sticky top-0 flex h-[100svh] items-center overflow-hidden">
        <img src={IMAGES.supervisor} alt="" className="absolute inset-0 h-full w-full object-cover opacity-20" loading="lazy" />
        <div className="absolute inset-0 bg-gradient-to-b from-cc-black via-cc-black/85 to-cc-black" />
        <div className="absolute right-[10%] top-1/2 h-[500px] w-[500px] -translate-y-1/2 rounded-full bg-cc-yellow/15 blur-[120px]" />

        <div className="relative mx-auto grid w-full max-w-7xl items-center gap-8 px-5 sm:px-8 lg:grid-cols-2 lg:gap-16">
          <div>
            <div className="font-display text-sm tracking-[0.3em] text-cc-yellow">See it in action</div>
            <h2 className="font-display mt-3 text-4xl leading-[0.95] sm:text-6xl lg:text-7xl">
              From vacancy to <span className="text-cc-yellow cc-glow-text">covered</span> in minutes
            </h2>
            <ol className="mt-6 hidden space-y-3 sm:block lg:mt-10">
              {PINNED_STAGES.map((s, i) => {
                const active = i === stage;
                const done = i < stage;
                return (
                  <li key={s.key}>
                    <button onClick={() => jump(i)} className={`group flex w-full gap-4 rounded-2xl p-4 text-left transition-all duration-500 ${active ? 'cc-glass translate-x-2' : 'opacity-50 hover:opacity-80'}`}>
                      <span className={`font-display grid h-10 w-10 shrink-0 place-items-center rounded-full text-lg transition-all ${active ? 'bg-cc-yellow text-black shadow-[0_0_24px_#FFD600]' : done ? 'bg-cc-yellow/30 text-cc-yellow' : 'bg-white/10 text-white/60'}`}>
                        {i + 1}
                      </span>
                      <span>
                        <span className="font-display block text-2xl">{s.label}</span>
                        <span className={`block overflow-hidden text-sm text-white/65 transition-all duration-500 ${active ? 'max-h-20 opacity-100' : 'max-h-0 opacity-0'}`}>{s.desc}</span>
                      </span>
                    </button>
                  </li>
                );
              })}
            </ol>
            {/* mobile caption */}
            <div className="mt-4 sm:hidden">
              <div className="font-display text-2xl text-cc-yellow">{stage + 1}. {PINNED_STAGES[stage].label}</div>
              <p className="text-sm text-white/65">{PINNED_STAGES[stage].desc}</p>
            </div>
            {/* progress */}
            <div className="mt-6 flex gap-2">
              {PINNED_STAGES.map((s, i) => (
                <div key={s.key} className="h-1 flex-1 overflow-hidden rounded-full bg-white/10">
                  <div className="h-full bg-cc-yellow shadow-[0_0_8px_#FFD600]" style={{ width: `${Math.max(0, Math.min(1, progress * 4 - i)) * 100}%` }} />
                </div>
              ))}
            </div>
          </div>

          <div className="relative flex justify-center">
            <div className="cc-halo absolute top-1/2 h-[380px] w-[380px] -translate-y-1/2 rounded-full blur-2xl" />
            <div className="relative -mb-[130px] origin-top scale-[0.72] sm:mb-0 sm:scale-100">
              <PhoneFrame>
                <Screen key={stage} />
              </PhoneFrame>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
