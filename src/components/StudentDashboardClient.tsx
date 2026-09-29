'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  GraduationCap,
  CheckCircle2,
  Clock,
  Laptop,
  Building2,
  Calendar,
  CreditCard,
  FileText,
  User,
  LogOut,
  Sparkles,
  Award,
  Video,
  ExternalLink,
  MessageSquare,
  AlertCircle,
  HelpCircle,
  TrendingUp,
  Download,
} from 'lucide-react';
import { studentLogoutAction } from '@/app/actions';

interface StudentData {
  id: string;
  studentId: string;
  name: string;
  email: string;
  mobile: string;
  guardianName: string;
  guardianMobile: string;
  streetAddress: string;
  city: string;
  state: string;
  pincode: string;
  passportPhoto: string | null;
  govtIdPhoto: string | null;
  courseSlug: string;
  courseName: string;
  courseMode: string;
  campus: string;
  totalFees: number;
  registrationFee: number;
  paidFees: number;
  remainingFees: number;
  paymentStatus: string;
  paymentTxnId: string | null;
  batchName: string;
  attendancePct: number;
  assignmentsDone: number;
  assignmentsTot: number;
  labScore: number;
  mockInterviewDate: string;
  mockInterviewStatus: string;
  mockFeedback: string;
  status: string;
}

interface StudentDashboardClientProps {
  student: StudentData;
}

export default function StudentDashboardClient({ student }: StudentDashboardClientProps) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'overview' | 'fees' | 'interviews' | 'notices'>('overview');
  const [payModalOpen, setPayModalOpen] = useState(false);
  const [paySuccess, setPaySuccess] = useState(false);

  async function handleLogout() {
    try {
      await studentLogoutAction();
    } catch (e) {
      console.error('Logout error:', e);
    }
    router.push('/student/login');
    router.refresh();
  }

  function handleSimulatePayment() {
    setPaySuccess(true);
    setTimeout(() => {
      setPayModalOpen(false);
      setPaySuccess(false);
    }, 2000);
  }

  return (
    <div className="max-w-6xl mx-auto py-8 px-4 sm:px-6 space-y-8 animate-in fade-in duration-300">
      {/* 1. TOP PROFILE & STUDENT ID CARD */}
      <div className="glass-card rounded-3xl p-6 sm:p-8 border border-blue-500/30 shadow-2xl dark:bg-slate-900/95 bg-white text-slate-900 dark:text-white relative overflow-hidden">
        {/* Glow */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative z-10">
          <div className="flex items-center gap-4 sm:gap-5">
            {/* Student Photo */}
            <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden border-2 border-blue-500/40 shadow-lg bg-slate-800 shrink-0">
              {student.passportPhoto ? (
                <img src={student.passportPhoto} alt={student.name} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-600 to-indigo-600 text-white font-bold text-2xl">
                  {student.name.charAt(0)}
                </div>
              )}
            </div>

            <div className="space-y-1">
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-black">{student.name}</h1>
                <span className="px-2.5 py-0.5 rounded-full bg-blue-500/15 border border-blue-500/30 text-blue-600 dark:text-blue-400 text-xs font-mono font-bold">
                  {student.studentId}
                </span>
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-500 text-[10px] font-bold uppercase tracking-wider">
                  Active Enrolled
                </span>
              </div>
              <p className="text-xs sm:text-sm font-semibold dark:text-slate-300 text-slate-700">
                {student.courseName}
              </p>
              <div className="flex flex-wrap items-center gap-3 text-xs dark:text-slate-400 text-slate-500 pt-1">
                <span className="flex items-center gap-1">
                  <Laptop className="w-3.5 h-3.5 text-blue-500" />
                  {student.courseMode}
                </span>
                <span className="flex items-center gap-1">
                  <Building2 className="w-3.5 h-3.5 text-purple-500" />
                  {student.campus}
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 self-end md:self-center">
            <button
              onClick={() => window.print()}
              className="px-3.5 py-2 rounded-xl border border-slate-300 dark:border-slate-700 hover:border-blue-500 text-xs font-semibold dark:bg-slate-800 bg-slate-100 flex items-center gap-1.5 transition-all cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Admission Slip</span>
            </button>

            <button
              onClick={handleLogout}
              className="px-3.5 py-2 rounded-xl bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 text-red-500 text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. NAVIGATION TABS */}
      <div className="flex items-center gap-2 border-b dark:border-slate-800 border-slate-200 pb-2 overflow-x-auto">
        <button
          onClick={() => setActiveTab('overview')}
          className={`px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all flex items-center gap-2 cursor-pointer ${
            activeTab === 'overview'
              ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
              : 'dark:text-slate-400 text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          <TrendingUp className="w-4 h-4" />
          <span>Performance & Activities</span>
        </button>

        <button
          onClick={() => setActiveTab('fees')}
          className={`px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all flex items-center gap-2 cursor-pointer ${
            activeTab === 'fees'
              ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
              : 'dark:text-slate-400 text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          <CreditCard className="w-4 h-4" />
          <span>Fee Structure & Balance</span>
          {student.remainingFees > 0 && (
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
          )}
        </button>

        <button
          onClick={() => setActiveTab('interviews')}
          className={`px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all flex items-center gap-2 cursor-pointer ${
            activeTab === 'interviews'
              ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
              : 'dark:text-slate-400 text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          <Award className="w-4 h-4" />
          <span>Mock Interviews & Career</span>
        </button>

        <button
          onClick={() => setActiveTab('notices')}
          className={`px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all flex items-center gap-2 cursor-pointer ${
            activeTab === 'notices'
              ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
              : 'dark:text-slate-400 text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          <FileText className="w-4 h-4" />
          <span>Important Notices & Labs</span>
        </button>
      </div>

      {/* 3. TAB CONTENT */}

      {/* TAB: OVERVIEW & PERFORMANCE */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          {/* 4 Stats Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="glass-card rounded-2xl p-5 border border-emerald-500/30 dark:bg-slate-900/90 bg-white space-y-2">
              <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider block">Lab Attendance</span>
              <div className="text-3xl font-black text-emerald-500">{student.attendancePct}%</div>
              <div className="w-full bg-slate-200 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                <div className="bg-emerald-500 h-full rounded-full" style={{ width: `${student.attendancePct}%` }} />
              </div>
              <span className="text-[11px] text-slate-400 block">Excellent attendance record</span>
            </div>

            <div className="glass-card rounded-2xl p-5 border border-blue-500/30 dark:bg-slate-900/90 bg-white space-y-2">
              <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider block">Assignments</span>
              <div className="text-3xl font-black text-blue-500">
                {student.assignmentsDone} / {student.assignmentsTot}
              </div>
              <div className="w-full bg-slate-200 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-blue-500 h-full rounded-full"
                  style={{ width: `${(student.assignmentsDone / student.assignmentsTot) * 100}%` }}
                />
              </div>
              <span className="text-[11px] text-slate-400 block">Next due: Sunday midnight</span>
            </div>

            <div className="glass-card rounded-2xl p-5 border border-purple-500/30 dark:bg-slate-900/90 bg-white space-y-2">
              <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider block">Lab Practical Score</span>
              <div className="text-3xl font-black text-purple-400">{student.labScore} / 100</div>
              <div className="w-full bg-slate-200 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                <div className="bg-purple-500 h-full rounded-full" style={{ width: `${student.labScore}%` }} />
              </div>
              <span className="text-[11px] text-slate-400 block">Top 5% of cohort</span>
            </div>

            <div className="glass-card rounded-2xl p-5 border border-amber-500/30 dark:bg-slate-900/90 bg-white space-y-2">
              <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider block">Curriculum Progress</span>
              <div className="text-3xl font-black text-amber-400">72%</div>
              <div className="w-full bg-slate-200 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                <div className="bg-amber-400 h-full rounded-full" style={{ width: '72%' }} />
              </div>
              <span className="text-[11px] text-slate-400 block">Capstone Project in progress</span>
            </div>
          </div>

          {/* Active Course Module Progress */}
          <div className="glass-card rounded-3xl p-6 sm:p-8 border border-blue-500/25 dark:bg-slate-900/90 bg-white space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold">Current Active Module</h3>
              <span className="px-3 py-1 rounded-full bg-blue-500/10 text-blue-500 text-xs font-bold">In Progress</span>
            </div>
            <div className="p-4 rounded-2xl dark:bg-slate-950/70 bg-slate-50 border border-slate-200 dark:border-slate-800 space-y-2">
              <div className="font-bold text-sm">Module 4: Advanced Architecture & Production Labs</div>
              <p className="text-xs dark:text-slate-400 text-slate-600 leading-relaxed">
                Building scalable cloud architectures, containerized Docker microservices, automated CI/CD pipelines, and real-time database integrations.
              </p>
              <div className="flex flex-wrap gap-2 pt-2">
                <span className="px-2.5 py-1 rounded-md bg-blue-500/10 text-blue-400 text-[11px] font-semibold">Docker</span>
                <span className="px-2.5 py-1 rounded-md bg-purple-500/10 text-purple-400 text-[11px] font-semibold">PostgreSQL</span>
                <span className="px-2.5 py-1 rounded-md bg-emerald-500/10 text-emerald-400 text-[11px] font-semibold">Prisma ORM</span>
                <span className="px-2.5 py-1 rounded-md bg-amber-500/10 text-amber-400 text-[11px] font-semibold">Next.js 15 Server Actions</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB: FEES & REMAINING BALANCE */}
      {activeTab === 'fees' && (
        <div className="space-y-6">
          <div className="glass-card rounded-3xl p-6 sm:p-8 border border-blue-500/30 dark:bg-slate-900/90 bg-white space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b dark:border-slate-800 border-slate-200">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-blue-500">Official Fee Statement</span>
                <h2 className="text-2xl font-black mt-1">Fee Breakdown & Payment Schedule</h2>
              </div>
              <span className="px-3.5 py-1.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-500 text-xs font-bold">
                Seat Locked with ₹1,000 ✅
              </span>
            </div>

            {/* Fee Metrics */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-5 rounded-2xl dark:bg-slate-950/70 bg-slate-50 border border-slate-200 dark:border-slate-800 space-y-1">
                <span className="text-xs text-slate-400 font-semibold block">Total Course Fee</span>
                <div className="text-2xl font-black">₹{student.totalFees.toLocaleString()}</div>
                <span className="text-[11px] text-slate-400">Standard Academic Tuition</span>
              </div>

              <div className="p-5 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-500 space-y-1">
                <span className="text-xs font-semibold block">Seat Fee Paid</span>
                <div className="text-2xl font-black">₹{student.paidFees.toLocaleString()}</div>
                <span className="text-[11px] text-emerald-400">Verified & Receipt Generated</span>
              </div>

              <div className="p-5 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-500 space-y-1">
                <span className="text-xs font-semibold block">Remaining Tuition Due</span>
                <div className="text-2xl font-black">₹{student.remainingFees.toLocaleString()}</div>
                <span className="text-[11px] text-amber-400">Payable before batch orientation</span>
              </div>
            </div>

            {/* Installment Plan Schedule */}
            <div className="space-y-3">
              <h3 className="text-sm font-bold">Flexible Installment Options</h3>
              <div className="space-y-2 text-xs">
                <div className="p-4 rounded-xl dark:bg-slate-950 bg-slate-50 border border-slate-200 dark:border-slate-800 flex items-center justify-between">
                  <div>
                    <span className="font-bold block">Installment 1: ₹{Math.round(student.remainingFees / 2).toLocaleString()}</span>
                    <span className="text-slate-400 text-[11px]">Due Date: Oct 10, 2026 (Before Module 2)</span>
                  </div>
                  <span className="px-2.5 py-1 rounded bg-amber-500/15 text-amber-400 font-semibold text-[11px]">Pending</span>
                </div>

                <div className="p-4 rounded-xl dark:bg-slate-950 bg-slate-50 border border-slate-200 dark:border-slate-800 flex items-center justify-between">
                  <div>
                    <span className="font-bold block">Installment 2: ₹{Math.round(student.remainingFees / 2).toLocaleString()}</span>
                    <span className="text-slate-400 text-[11px]">Due Date: Nov 15, 2026 (Before Placement Drives)</span>
                  </div>
                  <span className="px-2.5 py-1 rounded bg-slate-500/15 text-slate-400 font-semibold text-[11px]">Upcoming</span>
                </div>
              </div>
            </div>

            {/* Pay Remaining Fee CTA */}
            <div className="p-6 rounded-2xl bg-gradient-to-r from-blue-600/20 via-indigo-600/20 to-purple-600/20 border border-blue-500/30 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <h4 className="font-bold text-sm">Pay Remaining Tuition or Installment</h4>
                <p className="text-xs dark:text-slate-300 text-slate-600 mt-0.5">
                  Avail 0% interest EMI or pay via UPI, NetBanking, or Credit Card.
                </p>
              </div>

              <button
                onClick={() => setPayModalOpen(true)}
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-500 hover:to-blue-500 text-white font-bold text-xs shadow-lg shadow-emerald-500/20 transition-all shrink-0 cursor-pointer"
              >
                Pay Remaining Fees Online
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TAB: MOCK INTERVIEWS & CAREER */}
      {activeTab === 'interviews' && (
        <div className="space-y-6">
          <div className="glass-card rounded-3xl p-6 sm:p-8 border border-purple-500/30 dark:bg-slate-900/90 bg-white space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-4 border-b dark:border-slate-800 border-slate-200">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-purple-400">Career Mentorship Portal</span>
                <h2 className="text-2xl font-black mt-1">1-on-1 Mock Technical Interviews</h2>
              </div>
              <span className="px-3 py-1 rounded-full bg-purple-500/15 text-purple-400 text-xs font-bold">
                {student.mockInterviewStatus}
              </span>
            </div>

            {/* Scheduled Interview Box - Calm & Positive Highlight */}
            <div className="p-6 rounded-2xl bg-gradient-to-br from-indigo-50/90 via-sky-50/70 to-purple-50/60 dark:from-slate-900 dark:via-indigo-950/40 dark:to-slate-900 border-2 border-indigo-200/80 dark:border-indigo-500/30 space-y-4 shadow-sm">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Video className="w-5 h-5 text-indigo-600 dark:text-indigo-400 stroke-[2.4]" />
                  <span className="font-extrabold text-sm text-indigo-950 dark:text-white">Next Scheduled Technical Interview</span>
                </div>
                <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-500/20 dark:text-emerald-300 text-xs font-black border border-emerald-300 dark:border-emerald-500/30 shadow-xs">
                  Confirmed Slot
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                <div className="p-3 rounded-xl bg-white/80 dark:bg-slate-950/60 border border-indigo-100 dark:border-slate-800 shadow-xs">
                  <span className="text-slate-500 dark:text-slate-400 block font-bold text-[10px] uppercase tracking-wider">Date & Time</span>
                  <span className="font-black text-slate-900 dark:text-white text-sm block mt-1">{student.mockInterviewDate}</span>
                </div>
                <div className="p-3 rounded-xl bg-white/80 dark:bg-slate-950/60 border border-indigo-100 dark:border-slate-800 shadow-xs">
                  <span className="text-slate-500 dark:text-slate-400 block font-bold text-[10px] uppercase tracking-wider">Assigned Tech Mentor</span>
                  <span className="font-black text-slate-900 dark:text-white text-sm block mt-1">Senior Tech Lead (Amazon)</span>
                </div>
                <div className="p-3 rounded-xl bg-white/80 dark:bg-slate-950/60 border border-indigo-100 dark:border-slate-800 shadow-xs">
                  <span className="text-slate-500 dark:text-slate-400 block font-bold text-[10px] uppercase tracking-wider">Evaluation Format</span>
                  <span className="font-black text-slate-900 dark:text-white text-sm block mt-1">Live Coding + System Design (60 Min)</span>
                </div>
              </div>

              <div className="pt-3 border-t border-indigo-200/80 dark:border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <span className="text-xs text-indigo-900 dark:text-indigo-300 font-bold">Google Meet invite sent to your registered email</span>
                <button
                  onClick={() => alert('Meeting room opens 10 minutes prior to the scheduled slot.')}
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white font-extrabold text-xs shadow-md shadow-indigo-500/20 transition-all cursor-pointer"
                >
                  Join Meeting Room
                </button>
              </div>
            </div>

            {/* Mentor Feedback & Placement Notes */}
            <div className="space-y-3">
              <h3 className="text-sm font-bold">Recent Mentor Evaluation & Feedback</h3>
              <div className="p-5 rounded-2xl dark:bg-slate-950/70 bg-slate-50 border border-slate-200 dark:border-slate-800 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold dark:text-white text-slate-900">Module 3 Evaluation Round</span>
                  <span className="text-emerald-500 font-semibold">Score: 92/100 (Cleared)</span>
                </div>
                <p className="text-xs dark:text-slate-300 text-slate-600 leading-relaxed italic">
                  &ldquo;{student.mockFeedback}&rdquo;
                </p>
                <div className="pt-2 flex items-center gap-4 text-xs dark:text-slate-400 text-slate-500">
                  <span>DSA: 9.0/10</span>
                  <span>System Design: 8.5/10</span>
                  <span>Behavioral / HR: 9.5/10</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB: NOTICES & LABS */}
      {activeTab === 'notices' && (
        <div className="space-y-6">
          <div className="glass-card rounded-3xl p-6 sm:p-8 border border-blue-500/30 dark:bg-slate-900/90 bg-white space-y-6">
            <h2 className="text-2xl font-black">Important Academy Notices & Resources</h2>

            <div className="space-y-3 text-xs sm:text-sm">
              <div className="p-4 rounded-2xl dark:bg-slate-950/80 bg-slate-50 border border-slate-200 dark:border-slate-800 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-bold dark:text-white text-slate-900">Physical Lab Timing & Workstation Allotment</span>
                  <span className="text-[11px] text-slate-400">Campus Notice</span>
                </div>
                <p className="text-xs dark:text-slate-300 text-slate-600 leading-relaxed">
                  Your designated campus is <strong>{student.campus}</strong>. High-speed GPU workstation labs are open Mon - Sun from 8:00 AM to 9:00 PM. Please carry your student ID card or digital admission slip for biometric check-in.
                </p>
              </div>

              <div className="p-4 rounded-2xl dark:bg-slate-950/80 bg-slate-50 border border-slate-200 dark:border-slate-800 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-bold dark:text-white text-slate-900">GitHub Classroom & LMS Portal Credentials</span>
                  <span className="text-[11px] text-emerald-500 font-semibold">Active</span>
                </div>
                <p className="text-xs dark:text-slate-300 text-slate-600 leading-relaxed">
                  LMS access is synced with your email (<strong>{student.email}</strong>). Capstone project repositories and code review automated tests are accessible 24/7.
                </p>
              </div>

              <div className="p-4 rounded-2xl dark:bg-slate-950/80 bg-slate-50 border border-slate-200 dark:border-slate-800 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-bold dark:text-white text-slate-900">Upcoming Mega Placement Drive Registration</span>
                  <span className="text-[11px] text-purple-400 font-semibold">Admissions Drive</span>
                </div>
                <p className="text-xs dark:text-slate-300 text-slate-600 leading-relaxed">
                  Hiring partners including Amazon, Microsoft, Infosys, and Deloitte will conduct on-campus hiring for students who have cleared Module 4 and the primary technical mock interview.
                </p>
              </div>
            </div>

            {/* Helpline Box */}
            <div className="p-5 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
              <div>
                <span className="font-bold text-blue-500 block">Need Student Coordinator Assistance?</span>
                <span className="text-slate-400">Call Academic Support Helpline: +91 800-999-8800 (9 AM - 7 PM)</span>
              </div>
              <a
                href="https://wa.me/918009998800"
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold transition-all shrink-0"
              >
                Chat on WhatsApp
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Pay Modal Simulation */}
      {payModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-in fade-in">
          <div className="max-w-md w-full glass-card rounded-3xl p-6 sm:p-8 border border-blue-500/30 dark:bg-slate-900 bg-white space-y-5">
            <h3 className="text-lg font-bold">Pay Remaining Tuition Installment</h3>
            <p className="text-xs dark:text-slate-400 text-slate-600">
              Pay ₹{Math.round(student.remainingFees / 2).toLocaleString()} via UPI, NetBanking, or Card.
            </p>

            {paySuccess ? (
              <div className="py-6 text-center space-y-2">
                <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto" />
                <h4 className="font-bold text-emerald-500">Payment Successful!</h4>
                <p className="text-xs text-slate-400">Fee statement and receipt updated.</p>
              </div>
            ) : (
              <div className="space-y-4">
                <input
                  type="text"
                  defaultValue="student@upi"
                  className="w-full px-3.5 py-2.5 rounded-xl dark:bg-slate-950 bg-slate-50 border border-slate-300 dark:border-slate-700 text-sm"
                />
                <button
                  onClick={handleSimulatePayment}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-500 hover:to-blue-500 text-white font-bold text-sm transition-all"
                >
                  Confirm ₹{Math.round(student.remainingFees / 2).toLocaleString()} Payment
                </button>
                <button
                  onClick={() => setPayModalOpen(false)}
                  className="w-full text-xs text-slate-400 hover:underline"
                >
                  Cancel
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
