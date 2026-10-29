import { useState } from 'react';
import { Check, ArrowRight, HardHat } from 'lucide-react';
import { PLANS, BOOKING_URL, type Plan } from '@/data/crewcover';
import { SectionHeading } from './primitives';
import MagneticButton from './MagneticButton';
import { useInView } from '@/hooks/useCrewMotion';

function RollingPrice({ text, k }: { text: string; k: string }) {
  return (
    <span className="inline-flex overflow-hidden" style={{ perspective: 400 }}>
      {text.split('').map((c, i) => (
        <span key={`${k}-${i}-${c}`} className="cc-roll" style={{ animationDelay: `${i * 45}ms` }}>
          {c}
        </span>
      ))}
    </span>
  );
}

const fmt = (n: number) => (Number.isInteger(n) ? `$${n.toLocaleString('en-AU')}` : `$${n.toFixed(2)}`);

function PlanCard({ plan, annual, onSelect, index }: { plan: Plan; annual: boolean; onSelect: (p: Plan) => void; index: number }) {
  const [ref, visible] = useInView<HTMLDivElement>(0.15);
  const showAnnual = annual && plan.annual !== null;
  const price = showAnnual ? fmt(plan.annual!) : fmt(plan.monthly);
  const unit = showAnnual ? 'per year' : plan.unit;
  const pop = plan.popular;

  const body = (
    <div className={`relative flex h-full flex-col rounded-3xl p-7 ${pop ? 'bg-[#141414]' : 'cc-glass'}`}>
      {pop && (
        <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full bg-cc-yellow px-4 py-1 text-xs font-extrabold uppercase tracking-wider text-black shadow-[0_0_20px_#FFD600]">
          Most Popular
        </span>
      )}
      <div className="font-display text-2xl">{plan.name}</div>
      <div className="mt-1 min-h-[40px] text-sm text-white/55">{plan.tagline}</div>
      <div className="mt-6 flex items-end gap-1">
        <span className={`font-display text-5xl leading-none ${pop ? 'text-cc-yellow cc-glow-text' : 'text-white'}`}>
          <RollingPrice text={price} k={`${plan.id}-${annual}`} />
        </span>
      </div>
      <div className="mt-2 text-sm text-white/55">{unit}</div>
      <div className="mt-1 h-5 text-xs font-semibold text-cc-yellow">
        {showAnnual ? `Equivalent to ${fmt(plan.monthly)}/month · 2 months free` : plan.annual === null ? 'No subscription required' : ''}
      </div>
      <ul className="mt-6 flex-1 space-y-3 text-sm">
        {plan.features.map((f) => (
          <li key={f} className="flex gap-2.5 text-white/80">
            <span className="mt-0.5 grid h-4 w-4 shrink-0 place-items-center rounded-full bg-cc-yellow/15"><Check className="h-3 w-3 text-cc-yellow" /></span>
            {f}
          </li>
        ))}
      </ul>
      <div className="mt-8">
        {plan.id === 'enterprise' ? (
          <MagneticButton href={BOOKING_URL} external variant="ghost" className="w-full">
            {plan.cta} <ArrowRight className="h-4 w-4" />
          </MagneticButton>
        ) : (
          <MagneticButton onClick={() => onSelect(plan)} variant={pop ? 'primary' : 'ghost'} className="w-full">
            {plan.cta} <ArrowRight className="h-4 w-4" />
          </MagneticButton>
        )}
      </div>
    </div>
  );

  return (
    <div ref={ref} className={`cc-reveal ${visible ? 'is-visible' : ''} ${pop ? 'lg:-my-4' : ''}`} style={{ transitionDelay: `${index * 100}ms` }}>
      {pop ? <div className="cc-popular isolate h-full rounded-3xl">{body}</div> : body}
    </div>
  );
}

export default function Pricing({ onSelectPlan }: { onSelectPlan: (p: Plan) => void }) {
  const [annual, setAnnual] = useState(false);
  return (
    <section id="pricing" className="relative overflow-hidden py-28 sm:py-36">
      <div className="absolute left-1/2 top-1/3 h-[600px] w-[1000px] -translate-x-1/2 rounded-full bg-cc-yellow/[0.06] blur-[150px]" />
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading eyebrow="Pricing" title={<>Flexible pricing. <span className="text-cc-yellow">Reliable crews.</span></>} sub="Pay per shift or subscribe for ongoing coverage. All prices in AUD." />

        <div className="mt-10 flex items-center justify-center gap-4">
          <span className={`text-sm font-semibold ${!annual ? 'text-white' : 'text-white/50'}`}>Monthly</span>
          <button
            onClick={() => setAnnual((a) => !a)}
            className={`relative h-9 w-16 rounded-full border transition-colors ${annual ? 'border-cc-yellow bg-cc-yellow/20' : 'border-white/20 bg-white/5'}`}
            aria-label="Toggle annual billing"
            aria-pressed={annual}
          >
            <span className={`absolute top-1 h-7 w-7 rounded-full bg-cc-yellow shadow-[0_0_16px_#FFD600] transition-all duration-500 ease-[cubic-bezier(.3,1.5,.5,1)] ${annual ? 'left-8' : 'left-1'}`} />
          </button>
          <span className={`text-sm font-semibold ${annual ? 'text-white' : 'text-white/50'}`}>Annual</span>
          <span className="rounded-full bg-cc-yellow px-3 py-1 text-xs font-extrabold text-black">Save 2 months</span>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-4 lg:items-stretch">
          {PLANS.map((p, i) => (
            <PlanCard key={p.id} plan={p} annual={annual} onSelect={onSelectPlan} index={i} />
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center gap-2 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-cc-yellow/40 bg-cc-yellow/10 px-5 py-2.5 font-bold text-cc-yellow">
            <HardHat className="h-5 w-5" /> Free for underground coal mining workers.
          </div>
          <p className="text-xs text-white/40">Proposed prices in AUD. GST treatment to be confirmed.</p>
        </div>
      </div>
    </section>
  );
}
