import { useEffect, useState } from 'react';
import { IMAGES } from '@/data/crewcover';

export default function IntroLoader({ onDone }: { onDone: () => void }) {
  const [phase, setPhase] = useState<'on' | 'out' | 'gone'>('on');

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const t1 = setTimeout(() => setPhase('out'), reduce ? 200 : 1500);
    const t2 = setTimeout(() => { setPhase('gone'); onDone(); }, reduce ? 400 : 2100);
    document.body.style.overflow = 'hidden';
    return () => { clearTimeout(t1); clearTimeout(t2); document.body.style.overflow = ''; };
  }, [onDone]);

  useEffect(() => { if (phase !== 'on') document.body.style.overflow = ''; }, [phase]);

  if (phase === 'gone') return null;

  return (
    <div
      className={`fixed inset-0 z-[100] flex items-center justify-center overflow-hidden bg-cc-black transition-opacity duration-500 ${phase === 'out' ? 'pointer-events-none opacity-0' : 'opacity-100'}`}
      aria-hidden
    >
      <style>{`
        @keyframes ld-beam { 0% { clip-path: polygon(0 50%, 0 50%, 0 50%); opacity:0 } 30% {opacity:1} 100% { clip-path: polygon(0 50%, 100% 0, 100% 100%); opacity:1 } }
        @keyframes ld-reveal { from { clip-path: inset(0 100% 0 0); } to { clip-path: inset(0 0 0 0); } }
        @keyframes ld-tag { from { opacity:0; transform: translateY(8px) } to { opacity:1; transform:none } }
      `}</style>
      <div className="relative flex flex-col items-center">
        <div className="relative h-28 w-28 sm:h-36 sm:w-36">
          <img src={IMAGES.helmet} alt="" className="cc-flicker h-full w-full object-contain mix-blend-screen" />
          {/* beam from headlamp */}
          <div
            className="absolute left-[80%] top-[45%] h-[260px] w-[70vw] -translate-y-1/2"
            style={{
              background: 'linear-gradient(90deg, rgba(255,240,170,.85), rgba(255,214,0,.35) 30%, rgba(255,184,0,.08) 70%, transparent)',
              filter: 'blur(14px)',
              animation: 'ld-beam .9s .45s cubic-bezier(.2,.8,.2,1) both',
              mixBlendMode: 'screen',
            }}
          />
        </div>
        <div className="font-display mt-2 text-6xl sm:text-8xl" style={{ animation: 'ld-reveal .8s .6s cubic-bezier(.2,.8,.2,1) both' }}>
          <span className="text-white">Crew</span><span className="text-cc-yellow cc-glow-text">Cover</span>
        </div>
        <div className="mt-3 text-sm font-semibold" style={{ animation: 'ld-tag .5s 1s both' }}>
          <span className="text-cc-yellow">Shift happens.</span> <span className="text-white/80">We've got you covered.</span>
        </div>
      </div>
    </div>
  );
}
