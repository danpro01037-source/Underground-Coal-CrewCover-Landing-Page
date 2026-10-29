import { useEffect, useState } from 'react';
import { X, Mail, Phone, Building2, MapPin, Tag, MessageSquare, Trash2, Loader2, Copy, Check } from 'lucide-react';
import type { Lead } from '@/lib/adminLeads';

type Props = { lead: Lead; onClose: () => void; onDelete: (id: string) => Promise<void> };

export default function LeadDetail({ lead, onClose, onDelete }: Props) {
  const [confirming, setConfirming] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  const del = async () => {
    setDeleting(true);
    try {
      await onDelete(lead.id);
    } finally {
      setDeleting(false);
    }
  };

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(lead.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      /* ignore */
    }
  };

  const row = (Icon: any, label: string, value: React.ReactNode) => (
    <div className="flex gap-3 border-b border-white/5 py-3">
      <Icon className="mt-0.5 h-4 w-4 shrink-0 text-cc-yellow" />
      <div className="min-w-0 flex-1">
        <div className="text-[11px] uppercase tracking-widest text-white/40">{label}</div>
        <div className="break-words text-sm text-white">{value || <span className="text-white/30">Not provided</span>}</div>
      </div>
    </div>
  );

  return (
    <div className="fixed inset-0 z-[90] flex justify-end bg-black/70 backdrop-blur-sm" onClick={onClose} role="dialog" aria-modal="true">
      <aside className="cc-screen-in flex h-full w-full max-w-lg flex-col border-l border-cc-yellow/20 bg-[#111]" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-start justify-between gap-4 border-b border-white/10 p-6">
          <div className="min-w-0">
            <div className="text-xs text-white/40">{new Date(lead.created_at).toLocaleString('en-AU', { dateStyle: 'full', timeStyle: 'short' })}</div>
            <h2 className="font-display mt-1 truncate text-3xl">{lead.name}</h2>
            <div className="text-sm text-white/60">{lead.company}</div>
          </div>
          <button onClick={onClose} className="rounded-full bg-white/10 p-2 hover:bg-cc-yellow hover:text-black" aria-label="Close">
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-2">
          {row(Mail, 'Email', (
            <span className="flex items-center gap-2">
              <a href={`mailto:${lead.email}`} className="text-cc-yellow hover:underline">{lead.email}</a>
              <button onClick={copyEmail} className="text-white/40 hover:text-white" aria-label="Copy email">
                {copied ? <Check className="h-3.5 w-3.5 text-green-400" /> : <Copy className="h-3.5 w-3.5" />}
              </button>
            </span>
          ))}
          {row(Phone, 'Phone', lead.phone && <a href={`tel:${lead.phone}`} className="text-cc-yellow hover:underline">{lead.phone}</a>)}
          {row(Building2, 'Company', lead.company)}
          {row(MapPin, 'Number of sites', lead.sites)}
          {row(Tag, 'Plan of interest', lead.plan)}
          {row(MessageSquare, 'SMS opt-in', lead.sms_opt_in ? <span className="text-green-400">Yes</span> : 'No')}
          <div className="py-4">
            <div className="text-[11px] uppercase tracking-widest text-white/40">Message</div>
            <p className="mt-2 whitespace-pre-wrap rounded-xl border border-white/10 bg-black/40 p-4 text-sm text-white/85">{lead.message}</p>
          </div>
        </div>

        <div className="flex gap-3 border-t border-white/10 p-6">
          <a href={`mailto:${lead.email}?subject=${encodeURIComponent('CrewCover enquiry')}`} className="cc-btn cc-btn-primary flex flex-1 items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-bold">
            <span className="relative z-[2] inline-flex items-center gap-2"><Mail className="h-4 w-4" /> Reply</span>
          </a>
          {confirming ? (
            <div className="flex flex-1 gap-2">
              <button onClick={del} disabled={deleting} className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-red-600 px-3 py-3 text-sm font-bold hover:bg-red-500 disabled:opacity-60">
                {deleting ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Confirm'}
              </button>
              <button onClick={() => setConfirming(false)} className="rounded-xl border border-white/15 px-3 py-3 text-sm hover:border-white/40">Cancel</button>
            </div>
          ) : (
            <button onClick={() => setConfirming(true)} className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-red-500/40 px-4 py-3 text-sm font-bold text-red-400 hover:bg-red-500/10">
              <Trash2 className="h-4 w-4" /> Delete
            </button>
          )}
        </div>
      </aside>
    </div>
  );
}
