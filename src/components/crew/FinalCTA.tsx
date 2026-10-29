import { IMAGES } from '@/data/crewcover';
import { useInView } from '@/hooks/useCrewMotion';
import { StoreButtons } from './MagneticButton';
import Particles from './Particles';

export default function FinalCTA() {
  const [ref, on] = useInView<HTMLDivElement>(0.35);
  return (
    <section ref={ref} className="relative overflow-hidden bg-black py-28 sm:py-40">
      {/* helmet */}
      <img
        src={IMAGES.helmet}
        alt=""
        loading="lazy"
        className={`absolute -left-16 top-6 w-48 mix-blend-screen transition-all duration-700 sm:-left-10 sm:w-72 lg:w-80 ${on ? 'opacity-100' : 'opacity-30 brightness-50'}`}
      />
      {/* beam */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-[8%] top-[6%] h-[140%] w-[160%] origin-top-left mix-blend-screen transition-all duration-[1400ms] ease-out sm:left-[14%] sm:top-[12%]"
        style={{
          background: 'conic-gradient(from 95deg at 0 0, transparent 0deg, rgba(255,214,0,.06) 6deg, rgba(255,230,150,.32) 18deg, rgba(255,214,0,.12) 34deg, transparent 46deg)',
          filter: 'blur(14px)',
          opacity: on ? 1 : 0,
          transform: on ? 'scale(1)' : 'scale(.3)',
          transitionDelay: on ? '350ms' : '0ms',
        }}
      />
      {/* flicker flash */}
      {on && <div aria-hidden className="cc-flicker pointer-events-none absolute left-[6%] top-[10%] h-40 w-40 rounded-full bg-cc-yellow/40 blur-3xl sm:left-[12%]" />}
      {on && <Particles density={50} />}

      <div className="relative mx-auto max-w-7xl px-5 text-center sm:px-8">
        <h2 className="font-display text-[clamp(3rem,11vw,10rem)] leading-[0.88]">
          <span className={`block transition-all duration-1000 ${on ? 'text-cc-yellow cc-glow-text' : 'text-white/[0.06]'}`} style={{ transitionDelay: '600ms' }}>
            Shift happens.
          </span>
          <span className={`block transition-all duration-1000 ${on ? 'text-white [text-shadow:0_0_40px_rgba(255,214,0,.35)]' : 'text-white/[0.06]'}`} style={{ transitionDelay: '900ms' }}>
            We've got you covered.
          </span>
        </h2>
        <p className={`mx-auto mt-8 max-w-xl text-lg text-white/70 transition-all duration-700 ${on ? 'opacity-100' : 'translate-y-6 opacity-0'}`} style={{ transitionDelay: '1200ms' }}>
          Download CrewCover today and never scramble for crew again. Free for workers.
        </p>
        <div className={`mt-10 flex justify-center transition-all duration-700 ${on ? 'opacity-100' : 'translate-y-6 opacity-0'}`} style={{ transitionDelay: '1400ms' }}>
          <StoreButtons className="justify-center" />
        </div>
      </div>
    </section>
  );
}
