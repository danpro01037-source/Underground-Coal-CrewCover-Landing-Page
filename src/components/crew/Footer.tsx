import { useEffect, useState } from 'react';
import { X, Mail } from 'lucide-react';
import Logo from './Logo';
import { NAV_LINKS, SUPPORT_EMAIL, APP_STORE_URL, PLAY_STORE_URL, BOOKING_URL } from '@/data/crewcover';
import { scrollToId } from './Navbar';

const LEGAL = {
  privacy: {
    title: 'Privacy Policy',
    body: [
      'CrewCover collects only the information needed to connect underground coal mining employers with workers, such as your name, contact details, site links, tickets, licences and availability.',
      'Personal mobile numbers are never shared between employers and workers. All communication happens through CrewCover secure messaging and alerts.',
      'Data is encrypted in transit and at rest and hosted in Australia. We never sell your personal information. You can request access to, correction of, or deletion of your data at any time by emailing ' + SUPPORT_EMAIL + '.',
    ],
  },
  terms: {
    title: 'Terms of Use',
    body: [
      'By using CrewCover you agree to provide accurate information about your identity, qualifications, tickets and availability.',
      'Employers are responsible for verifying site-specific inductions, competencies and fitness for work before a worker commences any shift.',
      'Subscriptions renew automatically unless cancelled. Proposed prices are in AUD and GST treatment is to be confirmed. For questions contact ' + SUPPORT_EMAIL + '.',
    ],
  },
};

export default function Footer() {
  const [legal, setLegal] = useState<null | keyof typeof LEGAL>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setLegal(null);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <footer className="relative border-t border-cc-yellow/15 bg-black pt-16">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cc-yellow to-transparent" />
      <div className="mx-auto grid max-w-7xl gap-12 px-5 sm:px-8 md:grid-cols-[1.5fr_1fr_1fr_1fr]">
        <div>
          <Logo size="md" tagline onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} />
          <p className="mt-5 max-w-sm text-sm text-white/55">The fastest way for Australian underground coal mines to fill vacant shifts. Post, alert, covered.</p>
          <a href={`mailto:${SUPPORT_EMAIL}`} className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-cc-yellow hover:underline">
            <Mail className="h-4 w-4" /> {SUPPORT_EMAIL}
          </a>
        </div>
        <div>
          <h4 className="font-display text-lg text-white">Explore</h4>
          <ul className="mt-4 space-y-2.5 text-sm">
            {NAV_LINKS.map((l) => (
              <li key={l.id}><button onClick={() => scrollToId(l.id)} className="cc-link text-white/55 hover:text-white">{l.label}</button></li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="font-display text-lg text-white">Get the app</h4>
          <ul className="mt-4 space-y-2.5 text-sm">
            <li><a href={APP_STORE_URL} target="_blank" rel="noopener noreferrer" className="cc-link text-white/55 hover:text-white">App Store</a></li>
            <li><a href={PLAY_STORE_URL} target="_blank" rel="noopener noreferrer" className="cc-link text-white/55 hover:text-white">Google Play</a></li>
            <li><a href={BOOKING_URL} target="_blank" rel="noopener noreferrer" className="cc-link text-white/55 hover:text-white">Book a Demo</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-display text-lg text-white">Legal</h4>
          <ul className="mt-4 space-y-2.5 text-sm">
            <li><button onClick={() => setLegal('privacy')} className="cc-link text-white/55 hover:text-white">Privacy Policy</button></li>
            <li><button onClick={() => setLegal('terms')} className="cc-link text-white/55 hover:text-white">Terms of Use</button></li>
            <li><a href="/admin/leads" className="cc-link text-white/40 hover:text-cc-yellow">Leads Admin</a></li>
          </ul>
        </div>
      </div>

      <div className="font-display pointer-events-none mt-16 select-none overflow-hidden text-center text-[22vw] leading-[0.8] text-white/[0.03]">CrewCover</div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-5 py-6 text-xs text-white/40 sm:flex-row sm:px-8">
          <span>&copy; {new Date().getFullYear()} CrewCover. All rights reserved.</span>
          <span><span className="text-cc-yellow">Shift happens.</span> We've got you covered.</span>
        </div>
      </div>

      {legal && (
        <div className="fixed inset-0 z-[90] flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm" onClick={() => setLegal(null)} role="dialog" aria-modal="true">
          <div className="cc-glass cc-screen-in relative max-h-[80vh] w-full max-w-lg overflow-y-auto rounded-3xl p-8" onClick={(e) => e.stopPropagation()}>
            <button onClick={() => setLegal(null)} className="absolute right-4 top-4 rounded-full bg-white/10 p-2 hover:bg-cc-yellow hover:text-black" aria-label="Close">
              <X className="h-4 w-4" />
            </button>
            <h3 className="font-display text-3xl text-cc-yellow">{LEGAL[legal].title}</h3>
            <div className="mt-5 space-y-4 text-sm text-white/70">
              {LEGAL[legal].body.map((p) => <p key={p}>{p}</p>)}
            </div>
          </div>
        </div>
      )}
    </footer>
  );
}
