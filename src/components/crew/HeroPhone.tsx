import { useEffect, useRef, useState } from 'react';
import { Bell, Zap, CheckCircle2 } from 'lucide-react';
import PhoneFrame from './PhoneFrame';
import { HomeScreen } from './PhoneScreens';
import { HERO_NOTIFICATIONS } from '@/data/crewcover';
import { useLiteMode } from '@/hooks/useCrewMotion';

export default function HeroPhone() {
  const lite = useLiteMode();
  const tiltRef = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(0);
  const [cycle, setCycle] = useState(0);

  // notifications pop one after another, then reset
  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];
    HERO_NOTIFICATIONS.forEach((_, i) => timers.push(setTimeout(() => setShown(i + 1), 2200 + i * 1600)));
    timers.push(setTimeout(() => { setShown(0); setCycle((c) => c + 1); }, 2200 + HERO_NOTIFICATIONS.length * 1600 + 2600));
    return () => timers.forEach(clearTimeout);
  }, [cycle]);

  // 3D tilt with mouse
  useEffect(() => {
    if (lite) return;
    let raf = 0, tx = 0, ty = 0, cx = 0, cy = 0;
    const move = (e: MouseEvent) => {
      tx = (e.clientX / window.innerWidth - 0.5) * 24;
      ty = (e.clientY / window.innerHeight - 0.5) * -18;
    };
    const loop = () => {
      cx += (tx - cx) * 0.08; cy += (ty - cy) * 0.08;
      if (tiltRef.current) tiltRef.current.style.transform = `perspective(1200px) rotateY(${cx - 12}deg) rotateX(${cy + 4}deg)`;
      raf = requestAnimationFrame(loop);
    };
    window.addEventListener('mousemove', move, { passive: true });
    raf = requestAnimationFrame(loop);
    return () => { window.removeEventListener('mousemove', move); cancelAnimationFrame(raf); };
  }, [lite]);

  const icon = (tone: string) =>
    tone === 'urgent' ? <Zap className="h-4 w-4 text-black" /> : tone === 'success' ? <CheckCircle2 className="h-4 w-4 text-black" /> : <Bell className="h-4 w-4 text-black" />;

  return (
    <div className="relative flex items-center justify-center">
      <div className="cc-halo absolute h-[420px] w-[420px] rounded-full blur-2xl sm:h-[520px] sm:w-[520px]" />
      <div className="cc-float relative">
        <div ref={tiltRef} style={{ transform: lite ? 'none' : 'perspective(1200px) rotateY(-12deg) rotateX(4deg)', transformStyle: 'preserve-3d', willChange: 'transform' }}>
          <PhoneFrame>
            <HomeScreen />
            <div className="absolute inset-x-2 top-9 z-40 space-y-2">
              {HERO_NOTIFICATIONS.slice(0, shown).map((n, i) => (
                <div
                  key={`${cycle}-${i}`}
                  className="cc-notif flex items-start gap-2 rounded-2xl border border-white/10 bg-[#1f1f1f]/90 p-2.5 shadow-[0_10px_30px_rgba(0,0,0,.6)] backdrop-blur-xl"
                >
                  <span className={`grid h-7 w-7 shrink-0 place-items-center rounded-lg ${n.tone === 'success' ? 'bg-green-400' : 'bg-cc-yellow'} ${n.tone === 'urgent' ? 'shadow-[0_0_16px_#FFD600]' : ''}`}>
                    {icon(n.tone)}
                  </span>
                  <div className="min-w-0">
                    <div className="flex items-center justify-between gap-2 text-[9px] uppercase tracking-wide text-white/50">
                      <span>CrewCover</span><span>now</span>
                    </div>
                    <div className="truncate text-[11px] font-bold text-white">{n.title}</div>
                    <div className="truncate text-[9px] text-white/60">{n.body}</div>
                  </div>
                </div>
              ))}
            </div>
          </PhoneFrame>
        </div>
      </div>
      {/* floating chips */}
      <div className="cc-glass absolute -left-2 bottom-16 hidden rounded-2xl px-4 py-3 sm:block lg:-left-10" style={{ animation: 'cc-float 5s ease-in-out infinite reverse' }}>
        <div className="text-[10px] uppercase tracking-widest text-white/50">Avg time to fill</div>
        <div className="font-display text-3xl text-cc-yellow">4 MIN</div>
      </div>
      <div className="cc-glass absolute -right-2 top-20 hidden rounded-2xl px-4 py-3 sm:block lg:-right-8" style={{ animation: 'cc-float 7s ease-in-out infinite' }}>
        <div className="flex items-center gap-2 text-xs font-semibold"><span className="h-2 w-2 animate-pulse rounded-full bg-green-400" /> 42 workers alerted</div>
      </div>
    </div>
  );
}
