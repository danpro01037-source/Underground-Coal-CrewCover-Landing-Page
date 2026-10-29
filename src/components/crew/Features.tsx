import { BellRing, Zap, IdCard, MessageSquare, Building2, BarChart3, CheckCircle2, AlertTriangle, ShieldCheck } from 'lucide-react';
import { REPORT_BARS, IMAGES } from '@/data/crewcover';
import { SectionHeading } from './primitives';
import TiltCard from './TiltCard';
import { useCountUp, useInView } from '@/hooks/useCrewMotion';

function IconBadge({ Icon }: { Icon: any }) {
  return (
    <span className="cc-icon-pop grid h-14 w-14 place-items-center rounded-2xl bg-cc-yellow text-black shadow-[0_0_30px_rgba(255,214,0,.45)]">
      <Icon className="h-7 w-7" />
    </span>
  );
}

function ReportsCard() {
  const [ref, visible] = useInView<HTMLDivElement>(0.3);
  const filled = useCountUp(162, visible);
  const rate = useCountUp(88, visible);
  const max = Math.max(...REPORT_BARS.map((b) => b.value));
  return (
    <div ref={ref} className={`flex h-full flex-col p-7 sm:p-9 ${visible ? 'is-visible' : ''}`}>
      <div className="flex items-start justify-between gap-4">
        <div>
          <IconBadge Icon={BarChart3} />
          <h3 className="font-display mt-5 text-3xl sm:text-4xl">Management <span className="text-cc-yellow">reports</span></h3>
          <p className="mt-2 max-w-md text-white/60">Shifts filled, fill rate by role and cancellations. Workforce insights to plan ahead and keep your operation moving.</p>
        </div>
        <span className="hidden rounded-full border border-white/10 px-3 py-1 text-xs text-white/60 sm:block">Last 30 days</span>
      </div>

      <div className="mt-7 grid grid-cols-3 gap-3">
        <div className="rounded-2xl border border-white/10 bg-black/40 p-4">
          <div className="font-display text-3xl sm:text-4xl">{Math.round(filled)}</div>
          <div className="text-xs text-white/50">Shifts filled</div>
        </div>
        <div className="rounded-2xl border border-cc-yellow/30 bg-cc-yellow/5 p-4">
          <div className="font-display text-3xl text-cc-yellow sm:text-4xl">{Math.round(rate)}%</div>
          <div className="text-xs text-white/50">Fill rate</div>
        </div>
        <div className="rounded-2xl border border-white/10 bg-black/40 p-4">
          <div className="font-display text-3xl sm:text-4xl">{Math.round((rate / 88) * 6)}</div>
          <div className="text-xs text-white/50">Cancellations</div>
        </div>
      </div>

      <div className="mt-6 flex-1 rounded-2xl border border-white/10 bg-black/40 p-5">
        <div className="mb-4 text-xs font-semibold uppercase tracking-widest text-white/50">Shifts filled by role</div>
        <div className="flex h-44 items-end gap-2 sm:gap-4">
          {REPORT_BARS.map((b, i) => (
            <div key={b.role} className="flex h-full flex-1 flex-col items-center justify-end gap-2">
              <span className={`text-xs font-bold text-cc-yellow transition-opacity duration-500 ${visible ? 'opacity-100' : 'opacity-0'}`} style={{ transitionDelay: `${900 + i * 120}ms` }}>{b.value}</span>
              <div
                className="cc-bar w-full rounded-t-lg bg-gradient-to-t from-cc-amber to-cc-yellow shadow-[0_0_20px_rgba(255,214,0,.35)]"
                style={{ height: `${(b.value / max) * 100}%`, transitionDelay: `${i * 120}ms` }}
              />
              <span className="w-full truncate text-center text-[9px] text-white/50 sm:text-[10px]">{b.role}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Features() {
  return (
    <section id="features" className="relative overflow-hidden py-28 sm:py-36">
      <div className="absolute -right-40 top-40 h-[500px] w-[500px] rounded-full bg-cc-yellow/[0.07] blur-[140px]" />
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading eyebrow="Features" title={<>Built for the <span className="text-cc-yellow">pit.</span> Not the office.</>} sub="Everything supervisors and crews need to keep shifts covered, all in one rugged, simple app." />

        <div className="mt-16 grid auto-rows-[minmax(220px,auto)] gap-5 md:grid-cols-2 lg:grid-cols-4">
          <TiltCard className="md:col-span-2 lg:row-span-2" max={5}>
            <ReportsCard />
          </TiltCard>

          <TiltCard className="md:col-span-2" delay={100}>
            <div className="relative flex h-full flex-col justify-between gap-6 p-7 sm:flex-row sm:items-center">
              <div>
                <IconBadge Icon={BellRing} />
                <h3 className="font-display mt-5 text-3xl">Instant shift <span className="text-cc-yellow">alerts</span></h3>
                <p className="mt-2 max-w-sm text-white/60">Push and SMS alerts hit every approved worker the second a shift is posted.</p>
              </div>
              <div className="w-full max-w-[220px] space-y-2">
                {['Deputy · Night shift', 'UG Fitter · Day shift'].map((t, i) => (
                  <div key={t} className="flex items-center gap-2 rounded-xl border border-white/10 bg-black/50 p-2.5 text-xs" style={{ animation: `cc-float ${4 + i}s ease-in-out infinite` }}>
                    <span className="grid h-6 w-6 place-items-center rounded-md bg-cc-yellow"><BellRing className="h-3.5 w-3.5 text-black" /></span>
                    <span className="font-semibold">{t}</span>
                  </div>
                ))}
              </div>
            </div>
          </TiltCard>

          <TiltCard delay={150}>
            <div className="p-7">
              <IconBadge Icon={Zap} />
              <h3 className="font-display mt-5 text-3xl">Urgent <span className="text-cc-yellow">Boost</span></h3>
              <p className="mt-2 text-white/60">Push priority shifts to the top of every feed with a flashing urgent tag.</p>
              <span className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-red-500/15 px-3 py-1 text-xs font-bold text-red-400"><AlertTriangle className="h-3.5 w-3.5" /> URGENT · ASAP</span>
            </div>
          </TiltCard>

          <TiltCard delay={200}>
            <div className="p-7">
              <IconBadge Icon={IdCard} />
              <h3 className="font-display mt-5 text-3xl">Licences &amp; <span className="text-cc-yellow">tickets</span></h3>
              <p className="mt-2 text-white/60">Every ticket on file with expiry dates and status flags.</p>
              <div className="mt-4 space-y-1.5 text-xs">
                <div className="flex items-center justify-between"><span className="flex items-center gap-1.5"><ShieldCheck className="h-3.5 w-3.5 text-green-400" />Standard 11</span><span className="text-green-400">Current</span></div>
                <div className="flex items-center justify-between"><span className="flex items-center gap-1.5"><ShieldCheck className="h-3.5 w-3.5 text-cc-yellow" />Medical</span><span className="text-cc-yellow">Exp. 14 Dec</span></div>
              </div>
            </div>
          </TiltCard>

          <TiltCard className="md:col-span-2" delay={100}>
            <div className="flex h-full flex-col gap-6 p-7 sm:flex-row sm:items-center">
              <div className="flex-1">
                <IconBadge Icon={MessageSquare} />
                <h3 className="font-display mt-5 text-3xl">In-app <span className="text-cc-yellow">messaging</span></h3>
                <p className="mt-2 text-white/60">Chat directly with your supervisor. Personal mobile numbers stay private.</p>
              </div>
              <div className="w-full max-w-[250px] space-y-2 text-xs">
                <div className="flex items-end gap-2">
                  <img src={IMAGES.avatars[1]} alt="" className="h-7 w-7 rounded-full object-cover" loading="lazy" />
                  <div className="rounded-2xl rounded-bl-sm bg-white/10 px-3 py-2">Still good for the Deputy shift tonight?</div>
                </div>
                <div className="ml-auto w-fit rounded-2xl rounded-br-sm bg-cc-yellow px-3 py-2 font-semibold text-black">All good. See you at 5:30 <CheckCircle2 className="ml-1 inline h-3 w-3" /></div>
              </div>
            </div>
          </TiltCard>

          <TiltCard className="md:col-span-2" delay={150}>
            <div className="flex h-full flex-col gap-6 p-7 sm:flex-row sm:items-center">
              <div className="flex-1">
                <IconBadge Icon={Building2} />
                <h3 className="font-display mt-5 text-3xl">Multi-site <span className="text-cc-yellow">management</span></h3>
                <p className="mt-2 text-white/60">Run every site under one organisation, each with its own approved worker pool.</p>
              </div>
              <div className="grid w-full max-w-[230px] grid-cols-2 gap-2 text-xs">
                {['Hunter Valley', 'Bowen Basin', 'Illawarra', 'Surat Basin'].map((s, i) => (
                  <div key={s} className={`rounded-xl border p-2.5 ${i === 0 ? 'border-cc-yellow/50 bg-cc-yellow/10' : 'border-white/10 bg-black/40'}`}>
                    <div className="font-semibold">{s}</div>
                    <div className="text-white/50">{[42, 31, 18, 24][i]} workers</div>
                  </div>
                ))}
              </div>
            </div>
          </TiltCard>
        </div>
      </div>
    </section>
  );
}
