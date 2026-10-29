import { supabase } from '@/lib/supabase';

export type Lead = {
  id: string;
  name: string;
  company: string;
  email: string;
  phone: string | null;
  sites: string | null;
  message: string;
  plan: string | null;
  sms_opt_in: boolean;
  created_at: string;
};

const SESSION_KEY = 'cc-admin-pw';

export const adminSession = {
  get: () => sessionStorage.getItem(SESSION_KEY) || '',
  set: (pw: string) => sessionStorage.setItem(SESSION_KEY, pw),
  clear: () => sessionStorage.removeItem(SESSION_KEY),
};

export class AdminAuthError extends Error {}

async function call<T>(body: Record<string, unknown>): Promise<T> {
  const { data, error } = await supabase.functions.invoke('admin-leads', { body });
  if (error) {
    let msg = error.message || 'Request failed';
    let status = 0;
    const ctx = (error as any).context as Response | undefined;
    if (ctx && typeof ctx.json === 'function') {
      status = ctx.status;
      try {
        const j = await ctx.json();
        if (j?.error) msg = j.error;
      } catch {
        /* ignore */
      }
    }
    if (status === 401) throw new AdminAuthError(msg);
    throw new Error(msg);
  }
  if (data && (data as any).error) {
    if (/^(incorrect password|password required)$/i.test((data as any).error)) throw new AdminAuthError((data as any).error);
    throw new Error((data as any).error);
  }
  return data as T;
}

export const adminApi = {
  verify: (password: string) => call<{ ok: true }>({ action: 'verify', password }),
  list: (password: string) => call<{ leads: Lead[] }>({ action: 'list', password }).then((r) => r.leads || []),
  remove: (password: string, id: string) => call<{ ok: true }>({ action: 'delete', password, id }),
  changePassword: (password: string, newPassword: string) =>
    call<{ ok: true }>({ action: 'change_password', password, newPassword }),
};

const csvCell = (v: unknown) => {
  let s = v === null || v === undefined ? '' : String(v);
  // guard against spreadsheet formula injection
  if (/^[=+\-@\t\r]/.test(s)) s = `'${s}`;
  return `"${s.replace(/"/g, '""')}"`;
};

export function downloadLeadsCsv(leads: Lead[]) {
  const headers = ['Submitted', 'Name', 'Company', 'Email', 'Phone', 'Sites', 'Plan', 'SMS opt-in', 'Message'];
  const rows = leads.map((l) => [
    new Date(l.created_at).toLocaleString('en-AU'),
    l.name,
    l.company,
    l.email,
    l.phone,
    l.sites,
    l.plan,
    l.sms_opt_in ? 'Yes' : 'No',
    l.message,
  ]);
  const csv = '\uFEFF' + [headers, ...rows].map((r) => r.map(csvCell).join(',')).join('\r\n');
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `crewcover-leads-${new Date().toISOString().slice(0, 10)}.csv`;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
