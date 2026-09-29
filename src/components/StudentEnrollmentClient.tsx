'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import {
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  Lock,
  Upload,
  CreditCard,
  QrCode,
  Building2,
  Laptop,
  GraduationCap,
  Copy,
  ArrowRight,
  UserCheck,
  PhoneCall,
  MapPin,
  Calendar,
  AlertCircle,
} from 'lucide-react';
import { registerStudentAction } from '@/app/actions';

interface CourseOption {
  id: string;
  slug: string;
  title: string;
  fees: number;
  originalFees: number;
  duration: string;
  heroImage: string;
}

interface CampusOption {
  id: string;
  slug: string;
  name: string;
  city: string;
}

interface StudentEnrollmentClientProps {
  courses: CourseOption[];
  campuses: CampusOption[];
  initialCourseSlug?: string;
}

export default function StudentEnrollmentClient({
  courses,
  campuses,
  initialCourseSlug = '',
}: StudentEnrollmentClientProps) {
  const router = useRouter();

  // Selected course state
  const defaultCourse = courses.find((c) => c.slug === initialCourseSlug) || courses[0] || {
    id: '1',
    slug: 'generative-ai-llm-engineering',
    title: 'Generative AI & LLM Engineering',
    fees: 35000,
    originalFees: 55000,
    duration: '16 Weeks',
    heroImage: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=800&q=80',
  };

  const [selectedCourseSlug, setSelectedCourseSlug] = useState(defaultCourse.slug);
  const activeCourse = courses.find((c) => c.slug === selectedCourseSlug) || defaultCourse;

  // Photo previews
  const [passportPreview, setPassportPreview] = useState<string | null>(null);
  const [govtIdPreview, setGovtIdPreview] = useState<string | null>(null);
  const [govtIdName, setGovtIdName] = useState<string>('');

  // Payment method
  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'card' | 'netbanking'>('upi');
  const [upiId, setUpiId] = useState('student@okaxis');

  // Submission state
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [registeredStudent, setRegisteredStudent] = useState<{
    studentId: string;
    name: string;
    email: string;
    courseName: string;
    remainingFees: number;
    paymentTxnId: string;
  } | null>(null);

  const [copied, setCopied] = useState(false);

  // Handle Photo Upload
  function handlePhotoUpload(e: React.ChangeEvent<HTMLInputElement>, type: 'passport' | 'govtid') {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        if (type === 'passport') {
          setPassportPreview(reader.result);
        } else {
          setGovtIdPreview(reader.result);
          setGovtIdName(file.name);
        }
      }
    };
    reader.readAsDataURL(file);
  }

  // Handle Form Submit
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');

    const formData = new FormData(e.currentTarget);
    formData.append('courseSlug', activeCourse.slug);
    formData.append('courseName', activeCourse.title);
    formData.append('totalFees', activeCourse.fees.toString());
    if (passportPreview) formData.append('passportPhoto', passportPreview);
    if (govtIdPreview) formData.append('govtIdPhoto', govtIdPreview);

    try {
      const res = await registerStudentAction(formData);
      setLoading(false);

      if (res.success && res.studentId) {
        setRegisteredStudent({
          studentId: res.studentId,
          name: res.name || 'Student',
          email: res.email || '',
          courseName: res.courseName || activeCourse.title,
          remainingFees: res.remainingFees || Math.max(0, activeCourse.fees - 1000),
          paymentTxnId: res.paymentTxnId || 'TXN-SUCCESS-1000',
        });
      } else {
        setErrorMsg(res.error || 'Failed to complete registration. Please verify your details.');
      }
    } catch (err: any) {
      console.error('Registration error:', err);
      setLoading(false);
      setErrorMsg('Connection or network error. Please refresh the page and try again.');
    }
  }

  function handleCopyId() {
    if (registeredStudent?.studentId) {
      navigator.clipboard.writeText(registeredStudent.studentId);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }

  // If successfully registered, show official allotment receipt & portal access
  if (registeredStudent) {
    return (
      <div className="max-w-3xl mx-auto py-8 px-4 animate-in fade-in duration-300">
        <div className="glass-card rounded-3xl p-8 sm:p-12 border border-emerald-500/40 shadow-2xl space-y-8 dark:bg-slate-900/95 bg-white text-slate-900 dark:text-white relative overflow-hidden">
          {/* Top Celebration Glow */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none" />

          <div className="text-center space-y-3">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-500 flex items-center justify-center mx-auto border border-emerald-500/40 shadow-lg shadow-emerald-500/20">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-xs font-bold uppercase tracking-wider">
              <span>Official Seat Confirmed</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black tracking-tight">
              Welcome to the Academy, <span className="gradient-text">{registeredStudent.name}</span>!
            </h1>
            <p className="text-sm dark:text-slate-300 text-slate-600 max-w-xl mx-auto">
              Your ₹1,000 seat reservation fee has been received and verified. Your academic enrollment is now active.
            </p>
          </div>

          {/* Student ID Allotment Card */}
          <div className="p-6 rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white shadow-xl relative overflow-hidden">
            <div className="absolute -right-8 -bottom-8 w-36 h-36 bg-white/10 rounded-full blur-xl pointer-events-none" />
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-blue-200">
                  Your Official Student Allotment ID
                </span>
                <div className="text-3xl sm:text-4xl font-mono font-black tracking-wider mt-1">
                  {registeredStudent.studentId}
                </div>
                <p className="text-xs text-blue-100 mt-1">
                  Save this Student ID. You will use it with your email (<span className="underline font-semibold">{registeredStudent.email}</span>) to log into the Student Portal.
                </p>
              </div>

              <button
                type="button"
                onClick={handleCopyId}
                className="px-4 py-2.5 rounded-xl bg-white/20 hover:bg-white/30 backdrop-blur-md border border-white/30 text-white font-semibold text-xs flex items-center gap-2 transition-all shrink-0 cursor-pointer shadow-md"
              >
                <Copy className="w-4 h-4" />
                <span>{copied ? 'Copied to Clipboard!' : 'Copy Student ID'}</span>
              </button>
            </div>
          </div>

          {/* Fee Receipt Breakdown */}
          <div className="p-6 rounded-2xl dark:bg-slate-950/70 bg-slate-50 border border-slate-200 dark:border-slate-800 space-y-4">
            <div className="flex items-center justify-between border-b dark:border-slate-800 border-slate-200 pb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-blue-500">
                Fee & Seat Confirmation Summary
              </span>
              <span className="text-xs text-slate-500 font-mono">Txn: {registeredStudent.paymentTxnId}</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <span className="dark:text-slate-400 text-slate-500 block">Enrolled Program</span>
                <span className="font-bold dark:text-white text-slate-900 text-sm mt-0.5 block">{registeredStudent.courseName}</span>
              </div>
              <div>
                <span className="dark:text-slate-400 text-slate-500 block">Batch Schedule</span>
                <span className="font-bold dark:text-white text-slate-900 text-sm mt-0.5 block">Upcoming Morning Cohort (Mon - Fri: 10:00 AM)</span>
              </div>
              <div>
                <span className="dark:text-slate-400 text-slate-500 block">Seat Reservation Fee Paid</span>
                <span className="font-bold text-emerald-500 text-base mt-0.5 block">₹1,000 (Received ✅)</span>
              </div>
              <div>
                <span className="dark:text-slate-400 text-slate-500 block">Remaining Course Fees</span>
                <span className="font-bold text-amber-500 dark:text-amber-400 text-base mt-0.5 block">
                  ₹{registeredStudent.remainingFees.toLocaleString()}
                </span>
                <span className="text-[11px] text-slate-400">Payable via installments / zero-cost EMI</span>
              </div>
            </div>
          </div>

          {/* Direct Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 pt-2">
            <Link
              href="/student/dashboard"
              className="flex-1 py-4 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-bold text-sm shadow-xl shadow-blue-500/30 flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <GraduationCap className="w-5 h-5 text-amber-300" />
              <span>Enter My Student Portal Now</span>
              <ArrowRight className="w-4 h-4 ml-1" />
            </Link>

            <button
              onClick={() => window.print()}
              className="sm:w-auto px-6 py-4 rounded-xl border border-slate-300 dark:border-slate-700 hover:border-blue-500/50 dark:bg-slate-800 bg-white font-semibold text-xs transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm"
            >
              <span>Print / Download Receipt</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto py-8 px-4 sm:px-6">
      {/* Top Banner */}
      <div className="mb-8 text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-600 dark:text-blue-400 text-xs font-semibold uppercase tracking-wider">
          <Sparkles className="w-4 h-4 text-amber-400" />
          <span>Official Academy Admission Form</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black dark:text-white text-slate-900 tracking-tight">
          Course Enrollment & <span className="gradient-text">Seat Reservation</span>
        </h1>
        <p className="text-sm sm:text-base dark:text-slate-300 text-slate-600 max-w-2xl mx-auto leading-relaxed">
          Lock your seat with a mandatory <strong className="text-emerald-500 font-bold">₹1,000 reservation fee</strong>. The remaining tuition fee can be paid in installments or zero-cost EMI prior to batch commencement.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Enrollment Form */}
        <div className="lg:col-span-8">
          <div className="glass-card rounded-3xl p-6 sm:p-8 border border-blue-500/25 shadow-2xl space-y-8 dark:bg-slate-900/95 bg-white text-slate-900 dark:text-white">
            {errorMsg && (
              <div className="p-4 rounded-xl bg-red-500/15 border border-red-500/30 text-red-500 text-xs sm:text-sm flex items-start gap-2.5">
                <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
                <span>{errorMsg}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-8">
              {/* SECTION 1: COURSE SELECTION & MODE */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 pb-2 border-b dark:border-slate-800 border-slate-200">
                  <div className="w-7 h-7 rounded-lg bg-blue-500/15 text-blue-500 flex items-center justify-center font-bold text-xs">
                    1
                  </div>
                  <h2 className="text-base font-bold dark:text-white text-slate-900">Program & Campus Preferences</h2>
                </div>

                <div className="space-y-3.5">
                  <div>
                    <label className="block text-xs font-semibold dark:text-slate-300 text-slate-700 mb-1.5">
                      Course Enrolling For *
                    </label>
                    <select
                      name="courseSlug"
                      value={selectedCourseSlug}
                      onChange={(e) => setSelectedCourseSlug(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl dark:bg-slate-950/80 bg-slate-50 border border-slate-300/80 dark:border-slate-700/80 dark:text-white text-slate-900 focus:outline-none focus:border-blue-500 text-sm font-medium transition-all"
                    >
                      {courses.map((c) => (
                        <option key={c.slug} value={c.slug}>
                          {c.title} — ₹{c.fees.toLocaleString()} ({c.duration})
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold dark:text-slate-300 text-slate-700 mb-1.5">
                        Learning Mode *
                      </label>
                      <select
                        name="courseMode"
                        defaultValue="Hybrid (Classroom + Online)"
                        className="w-full px-4 py-2.5 rounded-xl dark:bg-slate-950/80 bg-slate-50 border border-slate-300/80 dark:border-slate-700/80 dark:text-white text-slate-900 focus:outline-none focus:border-blue-500 text-sm transition-all"
                      >
                        <option value="Hybrid (Classroom + Online)">Hybrid (Classroom Labs + Online)</option>
                        <option value="Offline In-Person Campus">Offline In-Person Campus</option>
                        <option value="100% Live Online Interactive">100% Live Online Interactive</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold dark:text-slate-300 text-slate-700 mb-1.5">
                        Campus Selected *
                      </label>
                      <select
                        name="campus"
                        defaultValue="Tech Park Main Campus - Hyderabad"
                        className="w-full px-4 py-2.5 rounded-xl dark:bg-slate-950/80 bg-slate-50 border border-slate-300/80 dark:border-slate-700/80 dark:text-white text-slate-900 focus:outline-none focus:border-blue-500 text-sm transition-all"
                      >
                        {campuses.length > 0 ? (
                          campuses.map((camp) => (
                            <option key={camp.slug} value={`${camp.name} - ${camp.city}`}>
                              {camp.name} ({camp.city})
                            </option>
                          ))
                        ) : (
                          <>
                            <option value="Tech Park Main Campus - Hyderabad">Tech Park Main Campus (Hyderabad)</option>
                            <option value="Bengaluru Innovation Hub - Bengaluru">Bengaluru Innovation Hub (Bengaluru)</option>
                            <option value="Cyber Security Center - Pune">Cyber Security Center (Pune)</option>
                          </>
                        )}
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              {/* SECTION 2: STUDENT DETAILS */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 pb-2 border-b dark:border-slate-800 border-slate-200">
                  <div className="w-7 h-7 rounded-lg bg-blue-500/15 text-blue-500 flex items-center justify-center font-bold text-xs">
                    2
                  </div>
                  <h2 className="text-base font-bold dark:text-white text-slate-900">Student & Guardian Details</h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-semibold dark:text-slate-300 text-slate-700 mb-1.5">
                      Name of Student *
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      placeholder="e.g. Rahul Sharma"
                      className="w-full px-4 py-2.5 rounded-xl dark:bg-slate-950/80 bg-slate-50 border border-slate-300/80 dark:border-slate-700/80 dark:text-white text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-blue-500 text-sm transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold dark:text-slate-300 text-slate-700 mb-1.5">
                      Student Mobile Number *
                    </label>
                    <input
                      type="tel"
                      name="mobile"
                      required
                      placeholder="+91 98765 43210"
                      className="w-full px-4 py-2.5 rounded-xl dark:bg-slate-950/80 bg-slate-50 border border-slate-300/80 dark:border-slate-700/80 dark:text-white text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-blue-500 text-sm transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold dark:text-slate-300 text-slate-700 mb-1.5">
                      Student Email Address * (Used for Portal Login)
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      placeholder="rahul.sharma@example.com"
                      className="w-full px-4 py-2.5 rounded-xl dark:bg-slate-950/80 bg-slate-50 border border-slate-300/80 dark:border-slate-700/80 dark:text-white text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-blue-500 text-sm transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold dark:text-slate-300 text-slate-700 mb-1.5">
                      Father / Guardian Name *
                    </label>
                    <input
                      type="text"
                      name="guardianName"
                      required
                      placeholder="e.g. Rajesh Sharma"
                      className="w-full px-4 py-2.5 rounded-xl dark:bg-slate-950/80 bg-slate-50 border border-slate-300/80 dark:border-slate-700/80 dark:text-white text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-blue-500 text-sm transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold dark:text-slate-300 text-slate-700 mb-1.5">
                      Father / Guardian Mobile Number *
                    </label>
                    <input
                      type="tel"
                      name="guardianMobile"
                      required
                      placeholder="+91 98765 11223"
                      className="w-full px-4 py-2.5 rounded-xl dark:bg-slate-950/80 bg-slate-50 border border-slate-300/80 dark:border-slate-700/80 dark:text-white text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-blue-500 text-sm transition-all"
                    />
                  </div>
                </div>
              </div>

              {/* SECTION 3: ADDRESS */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 pb-2 border-b dark:border-slate-800 border-slate-200">
                  <div className="w-7 h-7 rounded-lg bg-blue-500/15 text-blue-500 flex items-center justify-center font-bold text-xs">
                    3
                  </div>
                  <h2 className="text-base font-bold dark:text-white text-slate-900">Residential Address</h2>
                </div>

                <div className="space-y-3.5">
                  <div>
                    <label className="block text-xs font-semibold dark:text-slate-300 text-slate-700 mb-1.5">
                      Street Address / House No. *
                    </label>
                    <input
                      type="text"
                      name="streetAddress"
                      required
                      placeholder="e.g. Flat 402, Green Valley Enclave, HITEC City"
                      className="w-full px-4 py-2.5 rounded-xl dark:bg-slate-950/80 bg-slate-50 border border-slate-300/80 dark:border-slate-700/80 dark:text-white text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-blue-500 text-sm transition-all"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="block text-xs font-semibold dark:text-slate-300 text-slate-700 mb-1.5">
                        City *
                      </label>
                      <input
                        type="text"
                        name="city"
                        required
                        placeholder="e.g. Hyderabad"
                        className="w-full px-4 py-2.5 rounded-xl dark:bg-slate-950/80 bg-slate-50 border border-slate-300/80 dark:border-slate-700/80 dark:text-white text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-blue-500 text-sm transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold dark:text-slate-300 text-slate-700 mb-1.5">
                        State *
                      </label>
                      <input
                        type="text"
                        name="state"
                        required
                        placeholder="e.g. Telangana"
                        className="w-full px-4 py-2.5 rounded-xl dark:bg-slate-950/80 bg-slate-50 border border-slate-300/80 dark:border-slate-700/80 dark:text-white text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-blue-500 text-sm transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold dark:text-slate-300 text-slate-700 mb-1.5">
                        PIN Code *
                      </label>
                      <input
                        type="text"
                        name="pincode"
                        required
                        placeholder="e.g. 500081"
                        className="w-full px-4 py-2.5 rounded-xl dark:bg-slate-950/80 bg-slate-50 border border-slate-300/80 dark:border-slate-700/80 dark:text-white text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-blue-500 text-sm transition-all"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* SECTION 4: DOCUMENT UPLOADS */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 pb-2 border-b dark:border-slate-800 border-slate-200">
                  <div className="w-7 h-7 rounded-lg bg-blue-500/15 text-blue-500 flex items-center justify-center font-bold text-xs">
                    4
                  </div>
                  <h2 className="text-base font-bold dark:text-white text-slate-900">Student Photos & Verification ID</h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Passport Photo Upload */}
                  <div className="p-4 rounded-2xl dark:bg-slate-950/70 bg-slate-50 border border-dashed border-slate-300 dark:border-slate-700 text-center space-y-3">
                    <div className="text-xs font-bold dark:text-slate-200 text-slate-800">
                      Passport Size Photo *
                    </div>
                    {passportPreview ? (
                      <div className="relative w-24 h-28 mx-auto rounded-xl overflow-hidden border border-blue-500/40 shadow-md">
                        <img src={passportPreview} alt="Student Preview" className="w-full h-full object-cover" />
                      </div>
                    ) : (
                      <div className="w-20 h-24 mx-auto rounded-xl bg-slate-200 dark:bg-slate-800 flex items-center justify-center text-slate-400">
                        <Upload className="w-6 h-6" />
                      </div>
                    )}
                    <label className="inline-block px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs cursor-pointer shadow-sm">
                      <span>{passportPreview ? 'Change Photo' : 'Upload Student Photo'}</span>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => handlePhotoUpload(e, 'passport')}
                      />
                    </label>
                    <p className="text-[11px] text-slate-400">JPG, PNG (Clear face portrait)</p>
                  </div>

                  {/* Govt ID Photo Upload */}
                  <div className="p-4 rounded-2xl dark:bg-slate-950/70 bg-slate-50 border border-dashed border-slate-300 dark:border-slate-700 text-center space-y-3">
                    <div className="text-xs font-bold dark:text-slate-200 text-slate-800">
                      Govt ID Proof Photo *
                    </div>
                    {govtIdPreview ? (
                      <div className="relative w-28 h-20 mx-auto rounded-xl overflow-hidden border border-blue-500/40 shadow-md">
                        <img src={govtIdPreview} alt="Govt ID Preview" className="w-full h-full object-cover" />
                      </div>
                    ) : (
                      <div className="w-28 h-20 mx-auto rounded-xl bg-slate-200 dark:bg-slate-800 flex items-center justify-center text-slate-400">
                        <ShieldCheck className="w-6 h-6" />
                      </div>
                    )}
                    <label className="inline-block px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs cursor-pointer shadow-sm">
                      <span>{govtIdPreview ? 'Change Govt ID' : 'Upload Govt ID'}</span>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => handlePhotoUpload(e, 'govtid')}
                      />
                    </label>
                    <p className="text-[11px] text-slate-400">Aadhaar Card / PAN / Passport / Voter ID</p>
                  </div>
                </div>
              </div>

              {/* SECTION 5: ₹1,000 SEAT RESERVATION PAYMENT */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 pb-2 border-b dark:border-slate-800 border-slate-200">
                  <div className="w-7 h-7 rounded-lg bg-emerald-500/15 text-emerald-500 flex items-center justify-center font-bold text-xs">
                    5
                  </div>
                  <h2 className="text-base font-bold dark:text-white text-slate-900">
                    Mandatory Seat Reservation Fee (₹1,000)
                  </h2>
                </div>

                {/* Payment Option Tabs */}
                <div className="grid grid-cols-3 gap-2.5">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('upi')}
                    className={`p-3 rounded-2xl border transition-all cursor-pointer flex flex-col items-center gap-2 text-center ${
                      paymentMethod === 'upi'
                        ? 'border-2 border-emerald-600 dark:border-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-900 dark:text-emerald-200 shadow-sm'
                        : 'border border-slate-300 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:border-slate-400'
                    }`}
                  >
                    <div
                      className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all ${
                        paymentMethod === 'upi'
                          ? 'bg-emerald-600 text-white shadow-sm shadow-emerald-600/30'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                      }`}
                    >
                      <QrCode className="w-5 h-5 stroke-[2.2]" />
                    </div>
                    <span
                      className={`text-xs font-bold leading-none ${
                        paymentMethod === 'upi' ? 'text-emerald-950 dark:text-emerald-200' : 'text-slate-700 dark:text-slate-300'
                      }`}
                    >
                      UPI / QR
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('card')}
                    className={`p-3 rounded-2xl border transition-all cursor-pointer flex flex-col items-center gap-2 text-center ${
                      paymentMethod === 'card'
                        ? 'border-2 border-emerald-600 dark:border-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-900 dark:text-emerald-200 shadow-sm'
                        : 'border border-slate-300 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:border-slate-400'
                    }`}
                  >
                    <div
                      className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all ${
                        paymentMethod === 'card'
                          ? 'bg-emerald-600 text-white shadow-sm shadow-emerald-600/30'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                      }`}
                    >
                      <CreditCard className="w-5 h-5 stroke-[2.2]" />
                    </div>
                    <span
                      className={`text-xs font-bold leading-none ${
                        paymentMethod === 'card' ? 'text-emerald-950 dark:text-emerald-200' : 'text-slate-700 dark:text-slate-300'
                      }`}
                    >
                      Debit / Card
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('netbanking')}
                    className={`p-3 rounded-2xl border transition-all cursor-pointer flex flex-col items-center gap-2 text-center ${
                      paymentMethod === 'netbanking'
                        ? 'border-2 border-emerald-600 dark:border-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-900 dark:text-emerald-200 shadow-sm'
                        : 'border border-slate-300 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:border-slate-400'
                    }`}
                  >
                    <div
                      className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all ${
                        paymentMethod === 'netbanking'
                          ? 'bg-emerald-600 text-white shadow-sm shadow-emerald-600/30'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                      }`}
                    >
                      <Building2 className="w-5 h-5 stroke-[2.2]" />
                    </div>
                    <span
                      className={`text-xs font-bold leading-none ${
                        paymentMethod === 'netbanking' ? 'text-emerald-950 dark:text-emerald-200' : 'text-slate-700 dark:text-slate-300'
                      }`}
                    >
                      Net Banking
                    </span>
                  </button>
                </div>

                {/* Simulated Payment Box */}
                <div className="p-4 rounded-2xl dark:bg-slate-950/80 bg-slate-50 border border-slate-200 dark:border-slate-800 space-y-3">
                  {paymentMethod === 'upi' && (
                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-semibold text-slate-700 dark:text-slate-300">Scan QR Code or Enter UPI ID</span>
                        <span className="text-emerald-600 dark:text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded-md text-[11px]">
                          GPay • PhonePe • Paytm • BHIM
                        </span>
                      </div>

                      {/* Prominent QR Display Box */}
                      <div className="flex items-center gap-3.5 p-3 rounded-xl bg-white dark:bg-slate-900 border border-emerald-500/30 shadow-sm">
                        <div className="w-16 h-16 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-500/40 flex items-center justify-center shrink-0 text-emerald-600 dark:text-emerald-400">
                          <QrCode className="w-10 h-10 stroke-[2]" />
                        </div>
                        <div className="space-y-1 text-xs">
                          <div className="font-bold text-slate-900 dark:text-white">Institute Admission Seat Desk</div>
                          <div className="font-mono text-emerald-600 dark:text-emerald-400 font-semibold text-[11px]">
                            nexgentech.admissions@icici
                          </div>
                          <div className="text-[10px] text-slate-500 dark:text-slate-400">
                            Auto-verified instant seat confirmation receipt
                          </div>
                        </div>
                      </div>

                      <div className="space-y-1">
                        <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400">
                          Or Enter Your UPI ID / VPA
                        </label>
                        <input
                          type="text"
                          value={upiId}
                          onChange={(e) => setUpiId(e.target.value)}
                          placeholder="yourname@okhdfcbank"
                          className="w-full px-3.5 py-2.5 rounded-xl dark:bg-slate-900 bg-white border border-slate-300 dark:border-slate-700 text-xs sm:text-sm font-mono focus:outline-none focus:border-emerald-500"
                        />
                      </div>
                    </div>
                  )}

                  {paymentMethod === 'card' && (
                    <div className="space-y-2">
                      <input
                        type="text"
                        placeholder="Card Number (4111 2222 3333 4444)"
                        defaultValue="4111 2222 3333 4444"
                        className="w-full px-3.5 py-2 rounded-xl dark:bg-slate-900 bg-white border border-slate-300 dark:border-slate-700 text-xs sm:text-sm"
                      />
                      <div className="grid grid-cols-2 gap-2">
                        <input
                          type="text"
                          placeholder="MM/YY"
                          defaultValue="12/28"
                          className="px-3.5 py-2 rounded-xl dark:bg-slate-900 bg-white border border-slate-300 dark:border-slate-700 text-xs"
                        />
                        <input
                          type="text"
                          placeholder="CVV"
                          defaultValue="891"
                          className="px-3.5 py-2 rounded-xl dark:bg-slate-900 bg-white border border-slate-300 dark:border-slate-700 text-xs"
                        />
                      </div>
                    </div>
                  )}

                  {paymentMethod === 'netbanking' && (
                    <div className="space-y-2 text-xs">
                      <select className="w-full px-3.5 py-2 rounded-xl dark:bg-slate-900 bg-white border border-slate-300 dark:border-slate-700">
                        <option>HDFC Bank</option>
                        <option>State Bank of India (SBI)</option>
                        <option>ICICI Bank</option>
                        <option>Axis Bank</option>
                      </select>
                    </div>
                  )}

                  <div className="pt-2 border-t dark:border-slate-800 border-slate-200 flex items-center justify-between text-xs">
                    <span className="font-semibold text-slate-400">Total Payable Right Now:</span>
                    <span className="text-xl font-black text-emerald-500">₹1,000</span>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="space-y-2.5 pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 rounded-xl bg-gradient-to-r from-emerald-600 via-teal-600 to-blue-600 hover:from-emerald-500 hover:to-blue-500 text-white font-bold text-sm sm:text-base shadow-xl shadow-emerald-500/25 flex items-center justify-center gap-2 transition-all cursor-pointer hover:-translate-y-0.5"
                >
                  <Lock className="w-4 h-4 text-emerald-200" />
                  {loading ? (
                    <span>Processing Enrollment & Payment...</span>
                  ) : (
                    <span>Pay ₹1,000 & Reserve My Seat Now 🚀</span>
                  )}
                </button>

                <p className="text-[11px] text-center dark:text-slate-400 text-slate-500">
                  🔒 256-Bit SSL Encrypted. Student ID will be allotted immediately upon confirmation.
                </p>
              </div>
            </form>
          </div>
        </div>

        {/* Right Column: Sticky Summary & Breakdown */}
        <div className="lg:col-span-4 sticky top-28 space-y-6">
          <div className="glass-card rounded-3xl p-6 border border-blue-500/30 shadow-xl space-y-6 dark:bg-slate-900/95 bg-white text-slate-900 dark:text-white">
            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-blue-500">Fee Structure Summary</span>
              <h3 className="text-lg font-bold line-clamp-2">{activeCourse.title}</h3>
            </div>

            <div className="space-y-3 pt-3 border-t dark:border-slate-800 border-slate-200 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Total Tuition Fee:</span>
                <span className="font-bold">₹{activeCourse.fees.toLocaleString()}</span>
              </div>
              <div className="flex items-center justify-between text-emerald-500 font-bold">
                <span>Seat Lock Fee (Pay Now):</span>
                <span>- ₹1,000</span>
              </div>
              <div className="flex items-center justify-between pt-2 border-t dark:border-slate-800 border-slate-200 font-bold text-sm text-amber-500 dark:text-amber-400">
                <span>Remaining Tuition:</span>
                <span>₹{(activeCourse.fees - 1000).toLocaleString()}</span>
              </div>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                * The remaining fee can be paid in 2 flexible installments or zero-cost EMI before the batch commencement.
              </p>
            </div>

            {/* Academy Commitments */}
            <div className="space-y-2.5 pt-4 border-t dark:border-slate-800 border-slate-200 text-xs dark:text-slate-300 text-slate-700">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>Instant Student ID & LMS Portal Access</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>100% Practical Labs & Capstone Projects</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>1-on-1 Mock Interviews with Lead Mentors</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>Guaranteed Placement Drives</span>
              </div>
            </div>

            {/* Need Help Box */}
            <div className="p-4 rounded-2xl bg-blue-500/10 border border-blue-500/20 text-center space-y-1">
              <p className="text-xs text-blue-500 font-bold">Have questions before enrolling?</p>
              <p className="text-xs text-slate-400">Call Admissions: +91 800-999-8800</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
