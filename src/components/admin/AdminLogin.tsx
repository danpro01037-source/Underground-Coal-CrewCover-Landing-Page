import { useState } from 'react';
import { Lock, Loader2, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import Logo from '@/components/crew/Logo';
import { adminApi, AdminAuthError } from '@/lib/adminLeads';

export default function AdminLogin({ onSuccess }: { onSuccess: (pw: string) => void }) {
  const [pw, setPw] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!pw || loading) return;
    setLoading(true);
    setError('');
    try {
      await adminApi.verify(pw);
      onSuccess(pw);
    } catch (err) {
      setError(err instanceof AdminAuthError ? 'Incorrect password. Please try again.' : (err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-cc-black px-5 text-white">
      <div className="absolute left-1/2 top-1/3 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-cc-yellow/10 blur-[140px]" />
      <form onSubmit={submit} className="cc-glass relative w-full max-w-md rounded-3xl p-8 sm:p-10">
        <div className="flex justify-center">
          <Logo size="sm" />
        </div>
        <div className="mx-auto mt-8 grid h-14 w-14 place-items-center rounded-2xl bg-cc-yellow text-black shadow-[0_0_30px_rgba(255,214,0,.45)]">
          <Lock className="h-6 w-6" />
        </div>
        <h1 className="font-display mt-5 text-center text-4xl">Leads <span className="text-cc-yellow">admin</span></h1>
        <p className="mt-2 text-center text-sm text-white/55">Enter the admin password to view contact form submissions.</p>
        <label htmlFor="admin-pw" className="mb-2 mt-8 block text-xs font-semibold uppercase tracking-widest text-white/60">Password</label>
        <input
          id="admin-pw"
          type="password"
          autoFocus
          autoComplete="current-password"
          value={pw}
          onChange={(e) => { setPw(e.target.value); setError(''); }}
          className={`cc-input w-full rounded-xl px-4 py-3.5 text-white ${error ? '!border-red-500/70' : ''}`}
          placeholder="Enter password"
        />
        {error && <p className="mt-2 text-sm text-red-400">{error}</p>}
        <button
          type="submit"
          disabled={loading || !pw}
          className="cc-btn cc-btn-primary mt-6 flex w-full items-center justify-center gap-2 rounded-xl px-6 py-3.5 font-bold disabled:opacity-60"
        >
          <span className="relative z-[2] inline-flex items-center gap-2">
            {loading ? <><Loader2 className="h-5 w-5 animate-spin" /> Checking...</> : <>Sign in <ArrowRight className="h-4 w-4" /></>}
          </span>
        </button>
        <Link to="/" className="mt-6 block text-center text-sm text-white/50 hover:text-cc-yellow">Back to website</Link>
      </form>
    </div>
  );
}
