import { MapPin, CalendarDays, Clock, Zap, Briefcase, Send, BellRing, CheckCircle2, Users, Star, ShieldCheck, Home, Search, User } from 'lucide-react';
import { IMAGES } from '@/data/crewcover';

function AppHeader({ title, highlight }: { title: string; highlight: string }) {
  return (
    <div className="relative h-40 overflow-hidden">
      <img src={IMAGES.hero} alt="" className="absolute inset-0 h-full w-full object-cover opacity-70" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-cc-black" />
      <div className="relative px-4 pt-10">
        <div className="font-display text-sm"><span>Crew</span><span className="text-cc-yellow">Cover</span></div>
        <div className="font-display mt-3 text-3xl leading-none">
          {title} <span className="text-cc-yellow">{highlight}</span>
        </div>
      </div>
    </div>
  );
}

function TabBar({ active }: { active: number }) {
  const items = [Home, Search, Send, CalendarDays, User];
  return (
    <div className="absolute inset-x-0 bottom-0 z-20 flex justify-around border-t border-white/10 bg-black/90 px-2 pb-5 pt-2">
      {items.map((I, i) => (
        <I key={i} className={`h-4 w-4 ${i === active ? 'text-cc-yellow' : 'text-white/50'}`} />
      ))}
    </div>
  );
}

export function HomeScreen() {
  const shifts = [
    { role: 'Deputy', loc: 'Hunter Valley, NSW', time: 'Night · 6:00pm', tag: 'Supervision' },
    { role: 'Longwall Operator', loc: 'Hunter Valley, NSW', time: 'Day · 6:00am', tag: 'Production' },
    { role: 'UG Electrician', loc: 'Bowen Basin, QLD', time: 'Night · 6:00pm', tag: 'Maintenance' },
  ];
  return (
    <div className="absolute inset-0">
      <AppHeader title="Available" highlight="Shifts" />
      <div className="space-y-2 px-3">
        {shifts.map((s) => (
          <div key={s.role} className="rounded-xl border border-white/10 bg-white/[0.04] p-2.5">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold">{s.role}</span>
              <span className="rounded-full bg-cc-yellow px-2 py-0.5 text-[9px] font-bold text-black">Apply</span>
            </div>
            <div className="mt-1 flex items-center gap-1 text-[9px] text-white/60"><MapPin className="h-2.5 w-2.5" />{s.loc}</div>
            <div className="mt-0.5 flex items-center gap-1 text-[9px] text-white/60"><Clock className="h-2.5 w-2.5" />{s.time}</div>
          </div>
        ))}
      </div>
      <TabBar active={1} />
    </div>
  );
}

export function PostShiftScreen() {
  const rows = [
    { n: 1, label: 'Role', val: 'Deputy', Icon: Briefcase },
    { n: 2, label: 'Location', val: 'Hunter Valley, NSW', Icon: MapPin },
    { n: 3, label: 'Date & Time', val: 'Wed 29 Oct · 6:00pm', Icon: CalendarDays },
  ];
  return (
    <div className="absolute inset-0 cc-screen-in">
      <AppHeader title="Post a" highlight="Shift" />
      <div className="space-y-2 px-3">
        {rows.map((r) => (
          <div key={r.n} className="rounded-xl border border-white/10 bg-white/[0.04] p-2">
            <div className="flex items-center gap-2 text-[10px] font-bold">
              <span className="grid h-4 w-4 place-items-center rounded-full bg-cc-yellow text-[9px] text-black">{r.n}</span>{r.label}
            </div>
            <div className="mt-1.5 flex items-center gap-2 rounded-lg bg-black/60 px-2 py-1.5 text-[10px] text-white/80">
              <r.Icon className="h-3 w-3 text-cc-yellow" />{r.val}
            </div>
          </div>
        ))}
        <div className="grid grid-cols-3 gap-1.5">
          {['ASAP', '24 hrs', 'Later'].map((u, i) => (
            <div key={u} className={`rounded-lg border p-1.5 text-center text-[9px] font-bold ${i === 0 ? 'border-cc-yellow bg-cc-yellow/10 text-cc-yellow' : 'border-white/10 text-white/60'}`}>
              {i === 0 && <Zap className="mx-auto mb-0.5 h-3 w-3" />}{u}
            </div>
          ))}
        </div>
        <div className="flex items-center justify-center gap-1.5 rounded-xl bg-cc-yellow py-2 text-[11px] font-extrabold text-black shadow-[0_0_20px_rgba(255,214,0,.5)]">
          <Send className="h-3 w-3" /> Post Shift
        </div>
      </div>
      <TabBar active={2} />
    </div>
  );
}

export function AlertSentScreen() {
  return (
    <div className="absolute inset-0 cc-screen-in flex flex-col items-center px-4 pt-16 text-center">
      <div className="relative mt-4 grid h-24 w-24 place-items-center">
        <span className="absolute inset-0 animate-ping rounded-full bg-cc-yellow/30" />
        <span className="absolute inset-3 rounded-full bg-cc-yellow/20" />
        <span className="relative grid h-14 w-14 place-items-center rounded-full bg-cc-yellow shadow-[0_0_40px_#FFD600]">
          <BellRing className="h-7 w-7 text-black" />
        </span>
      </div>
      <div className="font-display mt-6 text-3xl">Alert <span className="text-cc-yellow">Sent</span></div>
      <p className="mt-1 text-[10px] text-white/60">Deputy · Night shift · Hunter Valley</p>
      <div className="mt-5 w-full space-y-2">
        {[['Push notifications', '42'], ['SMS alerts', '38'], ['Seen', '29']].map(([k, v]) => (
          <div key={k} className="flex items-center justify-between rounded-lg border border-white/10 bg-white/[0.04] px-3 py-2 text-[10px]">
            <span className="text-white/70">{k}</span><span className="font-bold text-cc-yellow">{v}</span>
          </div>
        ))}
      </div>
      <div className="mt-3 flex -space-x-2">
        {IMAGES.avatars.map((a) => <img key={a} src={a} alt="" className="h-7 w-7 rounded-full border-2 border-cc-black object-cover" />)}
        <span className="grid h-7 w-7 place-items-center rounded-full border-2 border-cc-black bg-cc-yellow text-[8px] font-bold text-black">+39</span>
      </div>
    </div>
  );
}

export function AcceptedScreen() {
  return (
    <div className="absolute inset-0 cc-screen-in px-3 pt-14">
      <div className="font-display text-2xl">Shift <span className="text-cc-yellow">Accepted</span></div>
      <div className="mt-3 rounded-2xl border border-cc-yellow/40 bg-cc-yellow/5 p-3 shadow-[0_0_30px_rgba(255,214,0,.15)]">
        <div className="flex items-center gap-2">
          <img src={IMAGES.avatars[0]} alt="" className="h-11 w-11 rounded-full border-2 border-cc-yellow object-cover" />
          <div className="flex-1">
            <div className="text-[12px] font-bold">Liam T.</div>
            <div className="text-[9px] text-white/60">Deputy · 6 yrs experience</div>
            <div className="flex items-center gap-0.5 text-[9px] text-cc-yellow"><Star className="h-2.5 w-2.5 fill-cc-yellow" /> 5.0 (27 shifts)</div>
          </div>
          <span className="rounded-full bg-green-500 px-2 py-0.5 text-[9px] font-bold text-black">98%</span>
        </div>
        <div className="mt-2 flex flex-wrap gap-1">
          {['Deputy Ticket', 'Medical', 'D&A', 'Std 11'].map((t) => (
            <span key={t} className="flex items-center gap-0.5 rounded-full border border-white/15 px-1.5 py-0.5 text-[8px] text-white/80"><ShieldCheck className="h-2 w-2 text-green-400" />{t}</span>
          ))}
        </div>
      </div>
      <div className="mt-3 space-y-1.5">
        {IMAGES.avatars.slice(1).map((a, i) => (
          <div key={a} className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.04] p-2 text-[10px]">
            <img src={a} alt="" className="h-6 w-6 rounded-full object-cover" />
            <span className="flex-1">{i === 0 ? 'Josh M.' : 'Ryan S.'} <span className="text-white/50">· on standby</span></span>
            <span className="text-white/50">{i === 0 ? '92%' : '89%'}</span>
          </div>
        ))}
      </div>
      <div className="mt-3 rounded-xl bg-cc-yellow py-2 text-center text-[11px] font-extrabold text-black">Confirm Liam</div>
    </div>
  );
}

export function CoveredScreen() {
  return (
    <div className="absolute inset-0 cc-screen-in flex flex-col items-center px-4 pt-16 text-center">
      <div className="relative mt-4 grid h-24 w-24 place-items-center rounded-full bg-green-500/15">
        <CheckCircle2 className="h-16 w-16 text-green-400 drop-shadow-[0_0_20px_rgba(74,222,128,.7)]" />
      </div>
      <div className="font-display mt-5 text-3xl leading-none">Shift <span className="text-cc-yellow">Covered</span></div>
      <p className="mt-2 text-[10px] text-white/60">Filled in 4 minutes</p>
      <div className="mt-4 w-full rounded-xl border border-white/10 bg-white/[0.04] p-3 text-left text-[10px]">
        <div className="font-bold">Deputy</div>
        <div className="mt-1 flex items-center gap-1 text-white/60"><MapPin className="h-2.5 w-2.5" /> Hunter Valley, NSW</div>
        <div className="mt-0.5 flex items-center gap-1 text-white/60"><Clock className="h-2.5 w-2.5" /> Wed 29 Oct · 6:00pm to 6:00am</div>
        <div className="mt-2 flex items-center gap-1 text-green-400"><Users className="h-2.5 w-2.5" /> Crew confirmed · Liam T.</div>
      </div>
      <div className="mt-3 w-full rounded-xl border border-cc-yellow/50 py-2 text-[11px] font-bold text-cc-yellow">Message Crew</div>
    </div>
  );
}
