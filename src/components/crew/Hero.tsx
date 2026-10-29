import { useEffect, useRef } from 'react';
import { ShieldCheck, MapPin, Smartphone } from 'lucide-react';
import { IMAGES } from '@/data/crewcover';
import Particles from './Particles';
import HeroPhone from './HeroPhone';
import { StoreButtons } from './MagneticButton';
import { scrollToId } from './Navbar';

const WORDS = ['Fill', 'Underground', 'Shifts', 'Fast.'];

export default function Hero({ ready }: { ready: boolean }) {
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const y = window.scrollY;
        if (bgRef.current && y < window.innerHeight * 1.2) bgRef.current.style.transform = `translate3d(0, ${y * 0.35}px, 0) scale(1.1)`;
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <section id="top" className="relative flex min-h-[100svh] items-center overflow-hidden pb-20 pt-28 lg:pt-24">
      {/* background */}
      <div ref={bgRef} className="absolute inset-0 will-change-transform" style={{ transform: 'scale(1.1)' }}>
        <img src={IMAGES.hero} alt="Underground longwall coal mine" className="h-full w-full object-cover opacity-45" loading="eager" decoding="async" />
      </div>
      <div className="absolute inset-0 bg-gradient-to-r from-cc-black via-cc-black/80 to-cc-black/30" />
      <div className="absolute inset-0 bg-gradient-to-t from-cc-black via-transparent to-cc-black/70" />
      <div className="absolute inset-0 overflow-hidden">
        <div className="cc-beam" />
      </div>
      <div className="absolute -left-40 top-1/3 h-[500px] w-[500px] rounded-full bg-cc-yellow/10 blur-[120px]" />
      <Particles density={80} />

      <div className="relative z-10 mx-auto grid w-full max-w-7xl items-center gap-14 px-5 sm:px-8 lg:grid-cols-[1.15fr_.85fr]">
        <div>
          <div className={`inline-flex items-center gap-2 rounded-full border border-cc-yellow/30 bg-black/50 px-4 py-1.5 text-xs font-semibold text-white/80 backdrop-blur transition-all duration-700 ${ready ? 'opacity-100' : 'translate-y-4 opacity-0'}`}>
            <span className="relative flex h-2 w-2"><span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cc-yellow opacity-75" /><span className="relative inline-flex h-2 w-2 rounded-full bg-cc-yellow" /></span>
            Built for Australia's underground coal mines
          </div>

          <h1 className="font-display mt-6 text-[clamp(3.4rem,10vw,8.5rem)] leading-[0.88]">
            {WORDS.map((w, i) => (
              <span key={w} className="mr-[0.22em] inline-block">
                {ready ? (
                  <span
                    className={`cc-slam ${w === 'Fast.' ? 'text-cc-yellow' : ''}`}
                    style={{
                      animation:
                        w === 'Fast.'
                          ? `cc-slam .7s cubic-bezier(.3,1.6,.5,1) ${i * 160}ms forwards, cc-pulse 2.2s ease-in-out ${i * 160 + 700}ms infinite`
                          : `cc-slam .7s cubic-bezier(.3,1.6,.5,1) ${i * 160}ms forwards`,
                    }}
                  >
                    {w}
                  </span>
                ) : (
                  <span className="opacity-0">{w}</span>
                )}
              </span>
            ))}
          </h1>

          <p className={`mt-6 max-w-xl text-lg text-white/75 transition-all delay-700 duration-700 sm:text-xl ${ready ? 'opacity-100' : 'translate-y-6 opacity-0'}`}>
            Post a shift, alert your crew instantly, and get it covered in minutes.
          </p>

          <div className={`mt-9 transition-all delay-[900ms] duration-700 ${ready ? 'opacity-100' : 'translate-y-6 opacity-0'}`}>
            <StoreButtons />
          </div>

          <div className={`mt-10 flex flex-wrap gap-x-7 gap-y-3 text-sm text-white/60 transition-all delay-[1100ms] duration-700 ${ready ? 'opacity-100' : 'opacity-0'}`}>
            <span className="flex items-center gap-2"><Smartphone className="h-4 w-4 text-cc-yellow" /> iOS and Android</span>
            <span className="flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-cc-yellow" /> Free for workers</span>
            <span className="flex items-center gap-2"><MapPin className="h-4 w-4 text-cc-yellow" /> NSW and QLD sites</span>
          </div>
        </div>

        <div className={`transition-all delay-500 duration-1000 ${ready ? 'translate-y-0 opacity-100' : 'translate-y-16 opacity-0'}`}>
          <HeroPhone />
        </div>
      </div>

      {/* scroll indicator */}
      <button
        onClick={() => scrollToId('problem')}
        className="absolute bottom-6 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.3em] text-white/50 hover:text-cc-yellow"
        aria-label="Scroll down"
      >
        <span className="flex h-10 w-6 justify-center rounded-full border-2 border-white/30 pt-2">
          <span className="cc-mouse-dot h-2 w-1 rounded-full bg-cc-yellow" />
        </span>
        Scroll
      </button>
    </section>
  );
}
