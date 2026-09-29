'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Briefcase, Lock, Mail, UserCheck, ArrowRight, Sparkles, ShieldCheck, AlertCircle, Building2 } from 'lucide-react';
import { facultyLoginAction } from '@/app/actions';

export default function FacultyLoginClient() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [facultyNoVal, setFacultyNoVal] = useState('');
  const [emailVal, setEmailVal] = useState('');

  async function handleLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');

    try {
      const formData = new FormData(e.currentTarget);
      const res = await facultyLoginAction(formData);
      setLoading(false);

      if (res.success) {
        router.push('/faculty/dashboard');
        router.refresh();
      } else {
        setErrorMsg(res.error || 'Login failed. Please verify your Faculty Number and Email.');
      }
    } catch (err: any) {
      console.error('Faculty login error:', err);
      setLoading(false);
      setErrorMsg('Connection error. Please refresh the page and try again.');
    }
  }

  function fillDemoFaculty() {
    setFacultyNoVal('FAC-2026-101');
    setEmailVal('vikram.sharma@techacademy.com');
  }

  return (
    <div className="max-w-md mx-auto py-12 px-4 animate-in fade-in duration-300">
      <div className="glass-card rounded-3xl p-8 border border-emerald-500/30 shadow-2xl space-y-6 dark:bg-slate-900/95 bg-white text-slate-900 dark:text-white relative overflow-hidden">
        {/* Glow */}
        <div className="absolute top-0 right-0 w-48 h-48 bg-emerald-500/15 rounded-full blur-2xl pointer-events-none" />

        <div className="text-center space-y-2">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-emerald-600 via-teal-600 to-cyan-600 text-white flex items-center justify-center mx-auto shadow-lg shadow-emerald-500/30">
            <Briefcase className="w-7 h-7" />
          </div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-[11px] font-bold uppercase tracking-wider">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Academic Faculty & Mentors</span>
          </div>
          <h1 className="text-2xl font-black tracking-tight">Faculty Portal Login</h1>
          <p className="text-xs dark:text-slate-400 text-slate-600">
            Access your assigned courses, lecture timetables, batch rosters, and student grading tools.
          </p>
        </div>

        {errorMsg && (
          <div className="p-3.5 rounded-xl bg-red-500/15 border border-red-500/30 text-red-500 text-xs flex items-start gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
            <span>{errorMsg}</span>
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold dark:text-slate-300 text-slate-700 mb-1.5">
              Faculty Number (Employee ID) *
            </label>
            <div className="relative">
              <UserCheck className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              <input
                type="text"
                name="facultyNo"
                required
                value={facultyNoVal}
                onChange={(e) => setFacultyNoVal(e.target.value.toUpperCase())}
                placeholder="e.g. FAC-2026-101"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl dark:bg-slate-950/80 bg-slate-50 border border-slate-300/80 dark:border-slate-700/80 dark:text-white text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-emerald-500 text-sm font-mono transition-all"
              />
            </div>
            <p className="text-[10px] text-slate-400 mt-1">Allotted at the time of employee registration / joining</p>
          </div>

          <div>
            <label className="block text-xs font-semibold dark:text-slate-300 text-slate-700 mb-1.5">
              Official Registered Email Address *
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              <input
                type="email"
                name="email"
                required
                value={emailVal}
                onChange={(e) => setEmailVal(e.target.value)}
                placeholder="e.g. vikram.sharma@techacademy.com"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl dark:bg-slate-950/80 bg-slate-50 border border-slate-300/80 dark:border-slate-700/80 dark:text-white text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-emerald-500 text-sm transition-all"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 rounded-xl bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 hover:from-emerald-500 hover:to-cyan-500 text-white font-bold text-sm shadow-xl shadow-emerald-500/30 flex items-center justify-center gap-2 transition-all cursor-pointer hover:-translate-y-0.5"
          >
            <Lock className="w-4 h-4" />
            {loading ? <span>Verifying Faculty Credentials...</span> : <span>Sign In to Faculty Portal 🎓</span>}
          </button>

          {/* Quick Demo Faculty Credentials */}
          <div className="pt-2">
            <button
              type="button"
              onClick={fillDemoFaculty}
              className="w-full py-2.5 rounded-xl border border-dashed border-emerald-500/40 hover:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-semibold transition-all flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Click to auto-fill Demo Faculty (Dr. Vikramaditya Sharma)</span>
            </button>
          </div>
        </form>

        <div className="pt-4 border-t dark:border-slate-800 border-slate-200 flex items-center justify-between text-xs">
          <Link
            href="/student/login"
            className="text-violet-600 dark:text-violet-400 hover:underline flex items-center gap-1 font-semibold"
          >
            <span>Are you a Student? Login here</span>
          </Link>
          <Link
            href="/admin/login"
            className="text-slate-400 hover:text-slate-200 transition-colors"
          >
            Admin Desk
          </Link>
        </div>
      </div>
    </div>
  );
}
