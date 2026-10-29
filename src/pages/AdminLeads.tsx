import { useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Download, RefreshCw, LogOut, KeyRound, Users, CalendarClock, MessageSquare, Tag, Inbox, ChevronLeft, ChevronRight, Loader2, X } from 'lucide-react';
import Logo from '@/components/crew/Logo';
import AdminLogin from '@/components/admin/AdminLogin';
import LeadDetail from '@/components/admin/LeadDetail';
import ChangePasswordModal from '@/components/admin/ChangePasswordModal';
import { adminApi, adminSession, AdminAuthError, downloadLeadsCsv, type Lead } from '@/lib/adminLeads';
import { SITE_OPTIONS, PLANS } from '@/data/crewcover';

const PAGE_SIZE = 25;
const NONE = '__none__';

export default function AdminLeads() {
  const navigate = useNavigate();
  const [password, setPassword] = useState(adminSession.get());
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [query, setQuery] = useState('');
  const [sites, setSites] = useState('all');
  const [plan, setPlan] = useState('all');
  const [sort, setSort] = useState<'newest' | 'oldest'>('newest');
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState<Lead | null>(null);
  const [showPw, setShowPw] = useState(false);

  useEffect(() => {
    document.body.classList.add('cc-body');
    document.title = 'Leads Admin | CrewCover';
    return () => document.body.classList.remove('cc-body');
  }, []);

  const logout = useCallback(() => {
    adminSession.clear();
    setPassword('');
    setLeads([]);
  }, []);

  const load = useCallback(async (pw: string) => {
    setLoading(true);
    setError('');
    try {
      setLeads(await adminApi.list(pw));
    } catch (err) {
      if (err instanceof AdminAuthError) logout();
      else setError((err as Error).message || 'Could not load leads');
    } finally {
      setLoading(false);
    }
  }, [logout]);

  useEffect(() => {
    if (password) load(password);
  }, [password, load]);

  const onLogin = (pw: string) => {
    adminSession.set(pw);
    setPassword(pw);
  };

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const list = leads.filter((l) => {
      if (sites !== 'all' && (sites === NONE ? !!l.sites : l.sites !== sites)) return false;
      if (plan !== 'all' && (plan === NONE ? !!l.plan : l.plan !== plan)) return false;
      if (!q) return true;
      return [l.name, l.company, l.email, l.phone, l.message, l.plan].some((v) => v && v.toLowerCase().includes(q));
    });
    return sort === 'newest' ? list : [...list].reverse();
  }, [leads, query, sites, plan, sort]);

  useEffect(() => setPage(1), [query, sites, plan, sort]);

  const pages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const pageRows = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const stats = useMemo(() => {
    const weekAgo = Date.now() - 7 * 864e5;
    const planCounts: Record<string, number> = {};
    leads.forEach((l) => { if (l.plan) planCounts[l.plan] = (planCounts[l.plan] || 0) + 1; });
    const topPlan = Object.entries(planCounts).sort((a, b) => b[1] - a[1])[0];
    return {
      total: leads.length,
      week: leads.filter((l) => new Date(l.created_at).getTime() > weekAgo).length,
      sms: leads.filter((l) => l.sms_opt_in).length,
      topPlan: topPlan ? topPlan[0] : 'None yet',
    };
  }, [leads]);

  const siteCounts = useMemo(() => {
    const c: Record<string, number> = { [NONE]: 0 };
    leads.forEach((l) => { const k = l.sites || NONE; c[k] = (c[k] || 0) + 1; });
    return c;
  }, [leads]);

  const handleDelete = async (id: string) => {
    try {
      await adminApi.remove(password, id);
      setLeads((ls) => ls.filter((l) => l.id !== id));
      setSelected(null);
    } catch (err) {
      if (err instanceof AdminAuthError) logout();
      else setError((err as Error).message);
    }
  };

  if (!password) return <AdminLogin onSuccess={onLogin} />;

  const chip = (value: string, label: string, count?: number) => (
    <button
      key={value}
      onClick={() => setSites(value)}
      className={`flex items-center gap-2 whitespace-nowrap rounded-full border px-4 py-2 text-sm font-semibold transition-all ${
        sites === value ? 'border-cc-yellow bg-cc-yellow text-black shadow-[0_0_18px_rgba(255,214,0,.4)]' : 'border-white/10 bg-white/[0.03] text-white/70 hover:border-white/30 hover:text-white'
      }`}
    >
      {label}
      {count !== undefined && <span className={`rounded-full px-1.5 text-xs ${sites === value ? 'bg-black/15' : 'bg-white/10'}`}>{count}</span>}
    </button>
  );

  const statCard = (Icon: any, label: string, value: React.ReactNode) => (
    <div className="cc-glass rounded-2xl p-5">
      <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-white/50"><Icon className="h-4 w-4 text-cc-yellow" />{label}</div>
      <div className="font-display mt-2 truncate text-3xl">{value}</div>
    </div>
  );

  return (
    <div className="min-h-screen bg-cc-black text-white">
      <header className="sticky top-0 z-40 border-b border-white/10 bg-cc-black/85 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-3 sm:px-8">
          <div className="flex items-center gap-4">
            <Logo size="sm" onClick={() => navigate('/')} />
            <span className="hidden rounded-full border border-cc-yellow/30 bg-cc-yellow/10 px-3 py-1 text-xs font-bold uppercase tracking-widest text-cc-yellow sm:inline">Leads admin</span>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={() => setShowPw(true)} className="flex items-center gap-2 rounded-xl border border-white/10 px-3 py-2 text-sm text-white/70 hover:border-white/30 hover:text-white" title="Change password">
              <KeyRound className="h-4 w-4" /><span className="hidden md:inline">Password</span>
            </button>
            <button onClick={logout} className="flex items-center gap-2 rounded-xl border border-white/10 px-3 py-2 text-sm text-white/70 hover:border-red-400/50 hover:text-red-300" title="Sign out">
              <LogOut className="h-4 w-4" /><span className="hidden md:inline">Sign out</span>
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-5 py-10 sm:px-8">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <h1 className="font-display text-5xl sm:text-6xl">Contact <span className="text-cc-yellow">leads</span></h1>
            <p className="mt-1 text-white/55">Every enquiry submitted through the website contact form.</p>
          </div>
          <div className="flex gap-2">
            <button onClick={() => load(password)} disabled={loading} className="flex items-center gap-2 rounded-xl border border-white/15 px-4 py-2.5 text-sm font-semibold hover:border-cc-yellow disabled:opacity-60">
              <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} /> Refresh
            </button>
            <button
              onClick={() => downloadLeadsCsv(filtered)}
              disabled={filtered.length === 0}
              className="cc-btn cc-btn-primary flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-bold disabled:opacity-50"
            >
              <span className="relative z-[2] inline-flex items-center gap-2"><Download className="h-4 w-4" /> Export CSV ({filtered.length})</span>
            </button>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {statCard(Users, 'Total leads', stats.total)}
          {statCard(CalendarClock, 'Last 7 days', stats.week)}
          {statCard(MessageSquare, 'SMS opt-ins', stats.sms)}
          {statCard(Tag, 'Top plan', <span className="text-2xl">{stats.topPlan}</span>)}
        </div>

        {/* filters */}
        <div className="cc-glass mt-8 rounded-2xl p-4 sm:p-5">
          <div className="flex flex-col gap-3 md:flex-row">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search name, company, email, phone or message..."
                className="cc-input w-full rounded-xl py-3 pl-11 pr-10 text-sm text-white placeholder:text-white/35"
              />
              {query && (
                <button onClick={() => setQuery('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white" aria-label="Clear search"><X className="h-4 w-4" /></button>
              )}
            </div>
            <select value={plan} onChange={(e) => setPlan(e.target.value)} className="cc-input rounded-xl px-4 py-3 text-sm text-white" aria-label="Filter by plan">
              <option value="all" className="bg-cc-black">All plans</option>
              {PLANS.map((p) => <option key={p.id} value={p.name} className="bg-cc-black">{p.name}</option>)}
              <option value={NONE} className="bg-cc-black">No plan selected</option>
            </select>
            <select value={sort} onChange={(e) => setSort(e.target.value as 'newest' | 'oldest')} className="cc-input rounded-xl px-4 py-3 text-sm text-white" aria-label="Sort">
              <option value="newest" className="bg-cc-black">Newest first</option>
              <option value="oldest" className="bg-cc-black">Oldest first</option>
            </select>
          </div>
          <div className="mt-4 flex items-center gap-2 overflow-x-auto pb-1">
            <span className="mr-1 whitespace-nowrap text-xs font-semibold uppercase tracking-widest text-white/40">Sites</span>
            {chip('all', 'All', leads.length)}
            {SITE_OPTIONS.map((s) => chip(s, s, siteCounts[s] || 0))}
            {chip(NONE, 'Not specified', siteCounts[NONE] || 0)}
          </div>
        </div>

        {error && <div className="mt-6 rounded-xl border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm text-red-300">{error}</div>}

        {/* results */}
        <div className="mt-6 overflow-hidden rounded-2xl border border-white/10">
          {loading && leads.length === 0 ? (
            <div className="flex items-center justify-center gap-3 py-24 text-white/50"><Loader2 className="h-5 w-5 animate-spin text-cc-yellow" /> Loading leads...</div>
          ) : filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-24 text-center">
              <Inbox className="h-10 w-10 text-white/25" />
              <div className="mt-3 font-semibold">{leads.length === 0 ? 'No leads yet' : 'No leads match your filters'}</div>
              <p className="mt-1 text-sm text-white/45">{leads.length === 0 ? 'Submissions from the contact form will appear here.' : 'Try a different search or site filter.'}</p>
            </div>
          ) : (
            <>
              {/* desktop table */}
              <table className="hidden w-full text-left text-sm md:table">
                <thead className="bg-white/[0.04] text-xs uppercase tracking-widest text-white/45">
                  <tr>
                    <th className="px-5 py-3 font-semibold">Submitted</th>
                    <th className="px-5 py-3 font-semibold">Name / Company</th>
                    <th className="px-5 py-3 font-semibold">Contact</th>
                    <th className="px-5 py-3 font-semibold">Sites</th>
                    <th className="px-5 py-3 font-semibold">Plan</th>
                    <th className="px-5 py-3 font-semibold">Message</th>
                  </tr>
                </thead>
                <tbody>
                  {pageRows.map((l) => (
                    <tr key={l.id} onClick={() => setSelected(l)} className="cursor-pointer border-t border-white/5 transition-colors hover:bg-cc-yellow/[0.05]">
                      <td className="whitespace-nowrap px-5 py-4 text-white/60">
                        {new Date(l.created_at).toLocaleDateString('en-AU', { day: 'numeric', month: 'short', year: 'numeric' })}
                        <div className="text-xs text-white/35">{new Date(l.created_at).toLocaleTimeString('en-AU', { hour: 'numeric', minute: '2-digit' })}</div>
                      </td>
                      <td className="px-5 py-4"><div className="font-semibold">{l.name}</div><div className="text-white/50">{l.company}</div></td>
                      <td className="px-5 py-4">
                        <div className="text-cc-yellow">{l.email}</div>
                        <div className="text-white/50">{l.phone || '-'}{l.sms_opt_in && <span className="ml-2 rounded bg-green-500/15 px-1.5 py-0.5 text-[10px] font-bold text-green-400">SMS</span>}</div>
                      </td>
                      <td className="whitespace-nowrap px-5 py-4 text-white/70">{l.sites || <span className="text-white/30">-</span>}</td>
                      <td className="whitespace-nowrap px-5 py-4">{l.plan ? <span className="rounded-full border border-cc-yellow/30 bg-cc-yellow/10 px-2.5 py-1 text-xs font-semibold text-cc-yellow">{l.plan}</span> : <span className="text-white/30">-</span>}</td>
                      <td className="max-w-xs px-5 py-4 text-white/60"><div className="line-clamp-2">{l.message}</div></td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* mobile cards */}
              <ul className="divide-y divide-white/5 md:hidden">
                {pageRows.map((l) => (
                  <li key={l.id}>
                    <button onClick={() => setSelected(l)} className="w-full p-4 text-left hover:bg-cc-yellow/[0.05]">
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0"><div className="truncate font-semibold">{l.name}</div><div className="truncate text-sm text-white/50">{l.company}</div></div>
                        <span className="whitespace-nowrap text-xs text-white/40">{new Date(l.created_at).toLocaleDateString('en-AU', { day: 'numeric', month: 'short' })}</span>
                      </div>
                      <div className="mt-1 truncate text-sm text-cc-yellow">{l.email}</div>
                      <div className="mt-2 flex flex-wrap gap-1.5 text-[11px]">
                        {l.sites && <span className="rounded-full bg-white/10 px-2 py-0.5">{l.sites}</span>}
                        {l.plan && <span className="rounded-full bg-cc-yellow/15 px-2 py-0.5 text-cc-yellow">{l.plan}</span>}
                        {l.sms_opt_in && <span className="rounded-full bg-green-500/15 px-2 py-0.5 text-green-400">SMS</span>}
                      </div>
                      <p className="mt-2 line-clamp-2 text-sm text-white/55">{l.message}</p>
                    </button>
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>

        {filtered.length > PAGE_SIZE && (
          <div className="mt-5 flex items-center justify-between text-sm text-white/55">
            <span>Showing {(page - 1) * PAGE_SIZE + 1} to {Math.min(page * PAGE_SIZE, filtered.length)} of {filtered.length}</span>
            <div className="flex items-center gap-2">
              <button onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1} className="rounded-lg border border-white/10 p-2 hover:border-cc-yellow disabled:opacity-40" aria-label="Previous page"><ChevronLeft className="h-4 w-4" /></button>
              <span>{page} / {pages}</span>
              <button onClick={() => setPage((p) => Math.min(pages, p + 1))} disabled={page === pages} className="rounded-lg border border-white/10 p-2 hover:border-cc-yellow disabled:opacity-40" aria-label="Next page"><ChevronRight className="h-4 w-4" /></button>
            </div>
          </div>
        )}
      </main>

      {selected && <LeadDetail lead={selected} onClose={() => setSelected(null)} onDelete={handleDelete} />}
      {showPw && (
        <ChangePasswordModal
          currentPassword={password}
          onClose={() => setShowPw(false)}
          onChanged={(pw) => { adminSession.set(pw); setPassword(pw); }}
        />
      )}
    </div>
  );
}
