import { useEffect, useState } from 'react';
import { Menu, X, ArrowRight } from 'lucide-react';
import Logo from './Logo';
import MagneticButton from './MagneticButton';
import { NAV_LINKS } from '@/data/crewcover';

export function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState('');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: '-45% 0px -50% 0px' }
    );
    NAV_LINKS.forEach((l) => { const el = document.getElementById(l.id); if (el) io.observe(el); });
    return () => { window.removeEventListener('scroll', onScroll); io.disconnect(); };
  }, []);

  const go = (id: string) => { setOpen(false); scrollToId(id); };

  return (
    <header className="fixed inset-x-0 top-0 z-[70] px-3 pt-3 sm:px-6">
      <nav
        className={`mx-auto flex max-w-7xl items-center justify-between rounded-2xl transition-all duration-500 ${
          scrolled ? 'cc-glass px-4 py-2 shadow-[0_10px_40px_rgba(0,0,0,.6)]' : 'border border-transparent px-2 py-4'
        }`}
      >
        <div className={`origin-left transition-transform duration-500 ${scrolled ? 'scale-90' : 'scale-100'}`}>
          <Logo size="sm" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} />
        </div>
        <ul className="hidden items-center gap-8 lg:flex">
          {NAV_LINKS.map((l) => (
            <li key={l.id}>
              <button
                onClick={() => go(l.id)}
                className={`cc-link text-sm font-semibold transition-colors ${active === l.id ? 'active text-cc-yellow' : 'text-white/80 hover:text-white'}`}
              >
                {l.label}
              </button>
            </li>
          ))}
        </ul>
        <div className="hidden lg:block">
          <MagneticButton onClick={() => go('contact')} className="!px-5 !py-2.5 text-sm">
            Get Started <ArrowRight className="h-4 w-4" />
          </MagneticButton>
        </div>
        <button className="rounded-lg p-2 text-white lg:hidden" onClick={() => setOpen((o) => !o)} aria-label="Toggle menu" aria-expanded={open}>
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      {/* mobile menu */}
      <div
        className={`mx-auto mt-2 max-w-7xl overflow-hidden rounded-2xl cc-glass transition-all duration-500 lg:hidden ${
          open ? 'max-h-[480px] opacity-100' : 'pointer-events-none max-h-0 opacity-0'
        }`}
      >
        <ul className="flex flex-col p-3">
          {NAV_LINKS.map((l, i) => (
            <li key={l.id} style={{ transitionDelay: `${i * 50}ms` }} className={`transition-all duration-500 ${open ? 'translate-x-0 opacity-100' : '-translate-x-4 opacity-0'}`}>
              <button onClick={() => go(l.id)} className="font-display flex w-full items-center justify-between rounded-xl px-4 py-3 text-2xl text-white hover:bg-white/5 hover:text-cc-yellow">
                {l.label} <ArrowRight className="h-5 w-5 text-cc-yellow" />
              </button>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}
