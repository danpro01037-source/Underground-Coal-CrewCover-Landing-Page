import { useEffect, useState } from 'react';
import { Send, Loader2, Mail, CalendarDays, MapPin, ShieldCheck } from 'lucide-react';
import { CRM_SUBSCRIBE_URL, CONTACT_EMAIL_ENDPOINT, SITE_OPTIONS, SUPPORT_EMAIL, BOOKING_URL, PLANS, SHOW_PRICING } from '@/data/crewcover';
import { supabase } from '@/lib/supabase';
import { SectionHeading, Reveal } from './primitives';
import MagneticButton from './MagneticButton';

type Form = { name: string; company: string; email: string; phone: string; sites: string; plan: string; message: string };
const EMPTY: Form = { name: '', company: '', email: '', phone: '', sites: '', plan: '', message: '' };

function SparkBurst() {
  return (
    <span aria-hidden className="pointer-events-none absolute inset-0">
      {Array.from({ length: 18 }).map((_, i) => (
        <span key={i} className="cc-spark" style={{ ['--r' as any]: `${i * 20}deg`, ['--d' as any]: `${60 + (i % 3) * 30}px`, animationDelay: `${(i % 4) * 30}ms` }} />
      ))}
    </span>
  );
}

export default function Contact({ prefill, plan }: { prefill?: string; plan?: string }) {
  const [form, setForm] = useState<Form>(EMPTY);
  const [sms, setSms] = useState(true);
  const [errors, setErrors] = useState<Partial<Record<keyof Form, string>>>({});
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  useEffect(() => {
    if (prefill || plan) setForm((f) => ({ ...f, message: prefill || f.message, plan: plan || f.plan }));
    if (prefill || plan) setStatus('idle');
  }, [prefill, plan]);

  const set = (k: keyof Form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm((f) => ({ ...f, [k]: e.target.value }));
    if (errors[k]) setErrors((er) => ({ ...er, [k]: undefined }));
  };

  const validate = () => {
    const er: typeof errors = {};
    if (!form.name.trim()) er.name = 'Please enter your name';
    if (!form.company.trim()) er.company = 'Please enter your company';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) er.email = 'Please enter a valid email';
    if (form.phone && !/^[+\d\s()-]{8,}$/.test(form.phone)) er.phone = 'Please enter a valid phone number';
    if (!form.message.trim()) er.message = 'Tell us a little about your needs';
    setErrors(er);
    return Object.keys(er).length === 0;
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate() || status === 'loading') return;
    setStatus('loading');

    const lead = {
      name: form.name.trim().slice(0, 200),
      company: form.company.trim().slice(0, 200),
      email: form.email.trim().slice(0, 320),
      phone: form.phone.trim() ? form.phone.trim().slice(0, 40) : null,
      sites: form.sites || null,
      plan: form.plan || null,
      message: form.message.trim().slice(0, 5000),
      sms_opt_in: sms === true,
    };

    // Email the support inbox, and save to database and CRM, in parallel
    const [emailResult, dbResult, crmResult] = await Promise.allSettled([
      fetch(CONTACT_EMAIL_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          _subject: `New CrewCover enquiry from ${lead.name} (${lead.company})`,
          _template: 'table',
          _replyto: lead.email,
          Name: lead.name,
          Company: lead.company,
          Email: lead.email,
          Phone: lead.phone || 'Not provided',
          'Number of sites': lead.sites || 'Not specified',
          ...(SHOW_PRICING ? { 'Plan of interest': lead.plan || 'Not sure yet' } : {}),
          'SMS updates': lead.sms_opt_in ? 'Yes' : 'No',
          Message: lead.message,
        }),
      }).then(async (res) => {
        const body = await res.json().catch(() => null);
        // FormSubmit answers 200 with success "false" until the inbox owner activates the form
        if (!res.ok || String(body?.success) !== 'true') throw new Error(body?.message || 'Email request failed');
      }),
      supabase.from('contact_leads').insert(lead).then(({ error }) => {
        if (error) throw error;
      }),
      fetch(CRM_SUBSCRIBE_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: lead.email,
          name: lead.name || undefined,
          phone: lead.phone || undefined,
          sms_opt_in: sms === true,
          source: 'contact-form',
          tags: [
            'contact-form',
            'employer-lead',
            lead.sites ? `sites-${lead.sites}` : 'sites-unknown',
            ...(lead.plan ? [`plan-${lead.plan.toLowerCase().replace(/\s+/g, '-')}`] : []),
          ],
          company: lead.company,
          message: lead.message,
        }),
      }).then((res) => {
        if (!res.ok) throw new Error('CRM request failed');
      }),
    ]);

    if (emailResult.status === 'rejected') console.error('Email to support failed', emailResult.reason);
    if (dbResult.status === 'rejected') console.error('Lead save failed', dbResult.reason);
    if (crmResult.status === 'rejected') console.error('CRM subscribe failed', crmResult.reason);

    if (emailResult.status === 'fulfilled' || dbResult.status === 'fulfilled' || crmResult.status === 'fulfilled') {
      setStatus('success');
      setForm(EMPTY);
    } else {
      setStatus('error');
    }
  };

  const field = (k: keyof Form) =>
    `cc-input w-full rounded-xl px-4 py-3.5 text-white placeholder:text-white/30 ${errors[k] ? '!border-red-500/70' : ''}`;
  const label = 'mb-2 block text-xs font-semibold uppercase tracking-widest text-white/60';

  return (
    <section id="contact" className="relative overflow-hidden py-28 sm:py-36">
      <div className="absolute -left-40 bottom-0 h-[500px] w-[500px] rounded-full bg-cc-yellow/[0.07] blur-[140px]" />
      <div className="relative mx-auto grid max-w-7xl gap-12 px-5 sm:px-8 lg:grid-cols-[.8fr_1.2fr]">
        <div>
          <SectionHeading center={false} eyebrow="Contact" title={<>Let's get you <span className="text-cc-yellow">covered.</span></>} sub="Tell us about your operation and we'll set you up with the right plan, or book a quick demo with our team." />
          <Reveal delay={150} className="mt-10 space-y-4">
            <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer" className="cc-glass cc-travel flex items-center gap-4 rounded-2xl p-5 transition-transform hover:-translate-y-1">
              <span className="grid h-12 w-12 place-items-center rounded-xl bg-cc-yellow text-black"><CalendarDays className="h-6 w-6" /></span>
              <span><span className="block font-bold">Book a Demo</span><span className="text-sm text-white/55">30 minute walkthrough with our team</span></span>
            </a>
            <a href={`mailto:${SUPPORT_EMAIL}`} className="cc-glass cc-travel flex items-center gap-4 rounded-2xl p-5 transition-transform hover:-translate-y-1">
              <span className="grid h-12 w-12 place-items-center rounded-xl bg-white/10 text-cc-yellow"><Mail className="h-6 w-6" /></span>
              <span><span className="block font-bold">{SUPPORT_EMAIL}</span><span className="text-sm text-white/55">We reply within one business day</span></span>
            </a>
            <div className="flex items-center gap-4 p-5 text-white/55">
              <MapPin className="h-5 w-5 text-cc-yellow" /> Supporting mines across NSW and QLD
            </div>
          </Reveal>
        </div>

        <Reveal variant="scale" delay={100}>
          <form onSubmit={submit} noValidate className="cc-glass relative rounded-3xl p-6 sm:p-10">
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor="cc-name" className={label}>Name</label>
                <input id="cc-name" value={form.name} onChange={set('name')} className={field('name')} placeholder="Matt Thompson" autoComplete="name" />
                {errors.name && <p className="mt-1.5 text-xs text-red-400">{errors.name}</p>}
              </div>
              <div>
                <label htmlFor="cc-company" className={label}>Company</label>
                <input id="cc-company" value={form.company} onChange={set('company')} className={field('company')} placeholder="UG Coal Contracting" autoComplete="organization" />
                {errors.company && <p className="mt-1.5 text-xs text-red-400">{errors.company}</p>}
              </div>
              <div>
                <label htmlFor="cc-email" className={label}>Email</label>
                <input id="cc-email" type="email" value={form.email} onChange={set('email')} className={field('email')} placeholder="you@company.com.au" autoComplete="email" />
                {errors.email && <p className="mt-1.5 text-xs text-red-400">{errors.email}</p>}
              </div>
              <div>
                <label htmlFor="cc-phone" className={label}>Phone number (optional)</label>
                <input id="cc-phone" type="tel" value={form.phone} onChange={set('phone')} className={field('phone')} placeholder="0400 000 000" autoComplete="tel" />
                {errors.phone && <p className="mt-1.5 text-xs text-red-400">{errors.phone}</p>}
              </div>
              <div className={SHOW_PRICING ? '' : 'sm:col-span-2'}>
                <label htmlFor="cc-sites" className={label}>Number of sites</label>
                <select id="cc-sites" value={form.sites} onChange={set('sites')} className={`${field('sites')} appearance-none`}>
                  <option value="" className="bg-cc-black">Select number of sites</option>
                  {SITE_OPTIONS.map((o) => <option key={o} value={o} className="bg-cc-black">{o}</option>)}
                </select>
              </div>
              {SHOW_PRICING && (
                <div>
                  <label htmlFor="cc-plan" className={label}>Plan of interest</label>
                  <select id="cc-plan" value={form.plan} onChange={set('plan')} className={`${field('plan')} appearance-none`}>
                    <option value="" className="bg-cc-black">Not sure yet</option>
                    {PLANS.map((p) => <option key={p.id} value={p.name} className="bg-cc-black">{p.name}</option>)}
                  </select>
                </div>
              )}
              <div className="sm:col-span-2">
                <label htmlFor="cc-message" className={label}>Message</label>
                <textarea id="cc-message" rows={4} value={form.message} onChange={set('message')} className={`${field('message')} resize-none`} placeholder="Tell us about your crew size, roles and rosters..." />
                {errors.message && <p className="mt-1.5 text-xs text-red-400">{errors.message}</p>}
              </div>
              <label className="flex cursor-pointer items-start gap-3 text-sm text-white/60 sm:col-span-2">
                <input type="checkbox" checked={sms} onChange={(e) => setSms(e.target.checked)} className="mt-0.5 h-5 w-5 shrink-0 accent-[#FFD600]" />
                <span>Text me updates. Msg &amp; data rates may apply. Reply STOP to unsubscribe.</span>
              </label>
            </div>

            <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
              <p className="flex items-center gap-2 text-xs text-white/45"><ShieldCheck className="h-4 w-4 text-cc-yellow" /> Your details stay private and secure.</p>
              {status === 'success' ? (
                <div className="relative grid h-14 w-14 place-items-center rounded-full bg-cc-yellow shadow-[0_0_40px_#FFD600]" role="status" aria-label="Message sent">
                  <SparkBurst />
                  <svg viewBox="0 0 24 24" className="cc-tick h-7 w-7" fill="none" stroke="#0B0B0B" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12.5l4.5 4.5L19 7.5" />
                  </svg>
                </div>
              ) : (
                <MagneticButton type="submit" disabled={status === 'loading'} className="w-full sm:w-auto">
                  {status === 'loading' ? <><Loader2 className="h-5 w-5 animate-spin" /> Sending...</> : <>Send Message <Send className="h-4 w-4" /></>}
                </MagneticButton>
              )}
            </div>
            {status === 'success' && <p className="mt-4 text-center text-sm font-semibold text-cc-yellow sm:text-right">Thanks mate! We'll be in touch shortly.</p>}
            {status === 'error' && <p className="mt-4 text-center text-sm text-red-400 sm:text-right">Something went wrong. Please try again or email {SUPPORT_EMAIL}.</p>}
          </form>
        </Reveal>
      </div>
    </section>
  );
}
