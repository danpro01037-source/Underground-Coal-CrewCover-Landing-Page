import { IMAGES } from '@/data/crewcover';

type Props = { size?: 'sm' | 'md' | 'lg'; tagline?: boolean; onClick?: () => void };

export default function Logo({ size = 'md', tagline = false, onClick }: Props) {
  const h = size === 'sm' ? 'h-9' : size === 'lg' ? 'h-20' : 'h-12';
  const text = size === 'sm' ? 'text-2xl' : size === 'lg' ? 'text-6xl' : 'text-3xl';
  return (
    <button onClick={onClick} className="group flex items-center gap-2 text-left" aria-label="CrewCover home">
      <img
        src={IMAGES.helmet}
        alt=""
        className={`${h} w-auto object-contain mix-blend-screen transition-transform duration-500 group-hover:-rotate-6 group-hover:scale-110`}
        style={{ filter: 'drop-shadow(0 0 10px rgba(255,214,0,.35))' }}
      />
      <span className="flex flex-col leading-none">
        <span className={`font-display ${text} tracking-tight`}>
          <span className="text-white">Crew</span>
          <span className="text-cc-yellow">Cover</span>
          <sup className="ml-0.5 align-super text-[0.35em] text-white/70">TM</sup>
        </span>
        {tagline && (
          <span className="mt-1 text-[10px] font-semibold tracking-wide">
            <span className="text-cc-yellow">Shift happens.</span> <span className="text-white/80">We've got you covered.</span>
          </span>
        )}
      </span>
    </button>
  );
}
