import { useState } from 'react';
import { Plus } from 'lucide-react';
import { FAQ_GROUPS, SUPPORT_EMAIL } from '@/data/crewcover';
import { SectionHeading, Reveal } from './primitives';

export default function FAQ() {
  const [groupId, setGroupId] = useState(FAQ_GROUPS[0].id);
  const [open, setOpen] = useState<number | null>(0);
  const group = FAQ_GROUPS.find((g) => g.id === groupId) ?? FAQ_GROUPS[0];

  const selectGroup = (id: string) => { setGroupId(id); setOpen(0); };

  return (
    <section id="faqs" className="relative py-28 sm:py-36">
      <div className="mx-auto max-w-4xl px-5 sm:px-8">
        <SectionHeading eyebrow="FAQs" title={<>Got <span className="text-cc-yellow">questions?</span></>} sub="Straight answers for supervisors, contractors and crews." />

        <div className="mt-12 flex justify-center">
          <div role="tablist" aria-label="FAQ audience" className="inline-flex rounded-full border border-white/10 bg-white/[0.03] p-1">
            {FAQ_GROUPS.map((g) => {
              const active = g.id === group.id;
              return (
                <button
                  key={g.id}
                  role="tab"
                  id={`faq-tab-${g.id}`}
                  aria-selected={active}
                  aria-controls="faq-panel"
                  onClick={() => selectGroup(g.id)}
                  className={`rounded-full px-4 py-3 text-sm font-bold transition-all duration-300 sm:px-6 ${active ? 'bg-cc-yellow text-black shadow-[0_0_24px_rgba(255,214,0,.35)]' : 'text-white/60 hover:text-white'}`}
                >
                  {g.label}
                </button>
              );
            })}
          </div>
        </div>

        <div id="faq-panel" role="tabpanel" aria-labelledby={`faq-tab-${group.id}`} className="mt-10 space-y-4">
          {group.items.map((f, i) => {
            const isOpen = open === i;
            return (
              <Reveal key={`${group.id}-${f.q}`} delay={Math.min(i, 5) * 80}>
                <div className={`overflow-hidden rounded-2xl transition-all duration-500 ${isOpen ? 'cc-glass border-cc-yellow/50 shadow-[0_0_40px_rgba(255,214,0,.12)]' : 'border border-white/10 bg-white/[0.02] hover:border-white/20'}`}>
                  <button
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="flex w-full items-center justify-between gap-6 px-6 py-5 text-left sm:px-8 sm:py-6"
                    aria-expanded={isOpen}
                  >
                    <span className={`text-lg font-bold transition-colors sm:text-xl ${isOpen ? 'text-cc-yellow' : 'text-white'}`}>{f.q}</span>
                    <span className={`grid h-10 w-10 shrink-0 place-items-center rounded-full transition-all duration-500 ${isOpen ? 'rotate-[135deg] bg-cc-yellow text-black shadow-[0_0_20px_#FFD600]' : 'bg-white/10 text-white'}`}>
                      <Plus className="h-5 w-5" />
                    </span>
                  </button>
                  <div className="grid transition-[grid-template-rows] duration-500 ease-[cubic-bezier(.2,.8,.2,1)]" style={{ gridTemplateRows: isOpen ? '1fr' : '0fr' }}>
                    <div className="overflow-hidden">
                      <p className={`px-6 pb-6 text-white/70 transition-all duration-500 sm:px-8 ${isOpen ? 'translate-y-0 opacity-100' : '-translate-y-2 opacity-0'}`}>{f.a}</p>
                    </div>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
        <p className="mt-10 text-center text-white/50">
          Still got questions? Email <a href={`mailto:${SUPPORT_EMAIL}`} className="cc-link font-semibold text-cc-yellow">{SUPPORT_EMAIL}</a>
        </p>
      </div>
    </section>
  );
}
