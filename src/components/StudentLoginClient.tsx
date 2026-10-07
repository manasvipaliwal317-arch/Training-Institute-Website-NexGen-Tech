'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { GraduationCap, Lock, Mail, UserCheck, ArrowRight, Sparkles, ShieldCheck, AlertCircle } from 'lucide-react';
import { studentLoginAction } from '@/app/actions';

export default function StudentLoginClient() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [studentIdVal, setStudentIdVal] = useState('');
  const [emailVal, setEmailVal] = useState('');

  async function handleLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');

    try {
      const formData = new FormData(e.currentTarget);
      const res = await studentLoginAction(formData);
      setLoading(false);

      if (res.success) {
        router.push('/student/dashboard');
        router.refresh();
      } else {
        setErrorMsg(res.error || 'Login failed. Please verify your Student ID and Email.');
      }
    } catch (err: any) {
      console.error('Student login error:', err);
      setLoading(false);
      setErrorMsg('Connection error. Please refresh the page and try again.');
    }
  }

  function fillDemoStudent() {
    setStudentIdVal('NXG-2026-1001');
    setEmailVal('rahul.sharma@example.com');
  }

  return (
    <div className="max-w-md mx-auto py-12 px-4">
      <div className="glass-card rounded-3xl p-8 border border-blue-500/30 shadow-2xl space-y-6 dark:bg-slate-900/95 bg-white text-slate-900 dark:text-white relative overflow-hidden">
        {/* Glow */}
        <div className="absolute top-0 right-0 w-48 h-48 bg-blue-500/15 rounded-full blur-2xl pointer-events-none" />

        <div className="text-center space-y-2">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white flex items-center justify-center mx-auto shadow-lg shadow-blue-500/30">
            <GraduationCap className="w-8 h-8" />
          </div>
          <h1 className="text-2xl font-black tracking-tight">Student Portal Login</h1>
          <p className="text-xs dark:text-slate-400 text-slate-600">
            Enter your allotted Student ID & registered Email to access your academic dashboard.
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
              Official Student ID *
            </label>
            <div className="relative">
              <UserCheck className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              <input
                type="text"
                name="studentId"
                required
                value={studentIdVal}
                onChange={(e) => setStudentIdVal(e.target.value.toUpperCase())}
                placeholder="e.g. NXG-2026-1001"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl dark:bg-slate-950/80 bg-slate-50 border border-slate-300/80 dark:border-slate-700/80 dark:text-white text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-blue-500 text-sm font-mono transition-all"
              />
            </div>
            <p className="text-[10px] text-slate-400 mt-1">Found on your admission confirmation receipt</p>
          </div>

          <div>
            <label className="block text-xs font-semibold dark:text-slate-300 text-slate-700 mb-1.5">
              Registered Email Address *
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              <input
                type="email"
                name="email"
                required
                value={emailVal}
                onChange={(e) => setEmailVal(e.target.value)}
                placeholder="e.g. rahul.sharma@example.com"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl dark:bg-slate-950/80 bg-slate-50 border border-slate-300/80 dark:border-slate-700/80 dark:text-white text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-blue-500 text-sm transition-all"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-bold text-sm shadow-xl shadow-blue-500/30 flex items-center justify-center gap-2 transition-all cursor-pointer hover:-translate-y-0.5"
          >
            <Lock className="w-4 h-4" />
            {loading ? <span>Verifying Credentials...</span> : <span>Sign In to Student Portal 🚀</span>}
          </button>

          {/* Quick Demo Student Credentials */}
          <div className="pt-2">
            <button
              type="button"
              onClick={fillDemoStudent}
              className="w-full py-2.5 rounded-xl border border-dashed border-blue-500/60 bg-blue-50/80 hover:bg-blue-100/90 dark:bg-blue-950/50 dark:hover:bg-blue-900/60 text-blue-700 dark:text-blue-300 text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-500 shrink-0" />
              <span className="text-blue-700 dark:text-blue-300 font-bold">Click to auto-fill Demo Student Credentials</span>
            </button>
          </div>
        </form>

        <div className="pt-4 border-t dark:border-slate-800 border-slate-200 text-center space-y-2 text-xs">
          <p className="dark:text-slate-400 text-slate-600">
            Haven&apos;t enrolled in a course yet?
          </p>
          <Link
            href="/enroll"
            className="font-bold text-blue-500 hover:text-blue-600 dark:hover:text-blue-400 inline-flex items-center gap-1"
          >
            <span>Register & Reserve Seat for ₹1,000</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
