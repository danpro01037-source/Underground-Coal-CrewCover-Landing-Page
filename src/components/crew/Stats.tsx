import { STATS, IMAGES } from '@/data/crewcover';
import { useCountUp, useInView } from '@/hooks/useCrewMotion';

function Stat({ value, suffix, label, start, delay }: { value: number; suffix: string; label: string; start: boolean; delay: number }) {
  const v = useCountUp(value, start, 1800 + delay);
  return (
    <div className={`cc-reveal ${start ? 'is-visible' : ''} text-center`} style={{ transitionDelay: `${delay}ms` }}>
      <div className="font-display text-6xl text-cc-yellow cc-glow-text sm:text-7xl lg:text-8xl">
        {Math.round(v).toLocaleString('en-AU')}
        <span className="text-white">{suffix}</span>
      </div>
      <div className="mt-2 text-sm font-medium uppercase tracking-widest text-white/60">{label}</div>
    </div>
  );
}

export default function Stats() {
  const [ref, visible] = useInView<HTMLDivElement>(0.3);
  return (
    <section className="relative overflow-hidden border-y border-cc-yellow/15 py-20 sm:py-24">
      <img src={IMAGES.tunnel} alt="" className="absolute inset-0 h-full w-full object-cover opacity-25" loading="lazy" />
      <div className="absolute inset-0 bg-gradient-to-r from-cc-black via-cc-black/70 to-cc-black" />
      <div ref={ref} className="relative mx-auto grid max-w-7xl grid-cols-2 gap-y-12 px-5 sm:px-8 lg:grid-cols-4">
        {STATS.map((s, i) => (
          <Stat key={s.label} {...s} start={visible} delay={i * 120} />
        ))}
      </div>
    </section>
  );
}
