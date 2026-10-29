import { useState } from 'react';
import { X, Loader2, KeyRound } from 'lucide-react';
import { adminApi } from '@/lib/adminLeads';

type Props = { currentPassword: string; onClose: () => void; onChanged: (pw: string) => void };

export default function ChangePasswordModal({ currentPassword, onClose, onChanged }: Props) {
  const [next, setNext] = useState('');
  const [confirm, setConfirm] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (next.length < 8) return setError('Password must be at least 8 characters.');
    if (next !== confirm) return setError('Passwords do not match.');
    setLoading(true);
    try {
      await adminApi.changePassword(currentPassword, next);
      onChanged(next);
      setDone(true);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const input = 'cc-input w-full rounded-xl px-4 py-3 text-white';

  return (
    <div className="fixed inset-0 z-[90] flex items-center justify-center bg-black/75 p-4 backdrop-blur-sm" onClick={onClose} role="dialog" aria-modal="true">
      <form onSubmit={submit} onClick={(e) => e.stopPropagation()} className="cc-glass cc-screen-in relative w-full max-w-md rounded-3xl p-8">
        <button type="button" onClick={onClose} className="absolute right-4 top-4 rounded-full bg-white/10 p-2 hover:bg-cc-yellow hover:text-black" aria-label="Close">
          <X className="h-4 w-4" />
        </button>
        <div className="grid h-12 w-12 place-items-center rounded-xl bg-cc-yellow text-black"><KeyRound className="h-5 w-5" /></div>
        <h3 className="font-display mt-4 text-3xl">Change <span className="text-cc-yellow">password</span></h3>
        {done ? (
          <>
            <p className="mt-4 text-sm text-green-400">Password updated. Use the new password next time you sign in.</p>
            <button type="button" onClick={onClose} className="mt-6 w-full rounded-xl bg-cc-yellow py-3 font-bold text-black">Done</button>
          </>
        ) : (
          <>
            <label className="mb-2 mt-6 block text-xs font-semibold uppercase tracking-widest text-white/60" htmlFor="np">New password</label>
            <input id="np" type="password" autoComplete="new-password" value={next} onChange={(e) => setNext(e.target.value)} className={input} />
            <label className="mb-2 mt-4 block text-xs font-semibold uppercase tracking-widest text-white/60" htmlFor="cp">Confirm new password</label>
            <input id="cp" type="password" autoComplete="new-password" value={confirm} onChange={(e) => setConfirm(e.target.value)} className={input} />
            {error && <p className="mt-3 text-sm text-red-400">{error}</p>}
            <button type="submit" disabled={loading} className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-cc-yellow py-3 font-bold text-black hover:shadow-[0_0_24px_rgba(255,214,0,.5)] disabled:opacity-60">
              {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : 'Update password'}
            </button>
          </>
        )}
      </form>
    </div>
  );
}
