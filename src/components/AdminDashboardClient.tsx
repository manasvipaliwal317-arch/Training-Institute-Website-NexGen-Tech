'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Users,
  BookOpen,
  Calendar,
  CheckCircle2,
  Clock,
  Search,
  LogOut,
  Filter,
  RefreshCw,
  PhoneCall,
  Mail,
  Sparkles,
} from 'lucide-react';
import { updateInquiryStatusAction, adminLogoutAction } from '@/app/actions';

interface Inquiry {
  id: string;
  name: string;
  email: string;
  phone: string;
  courseSlug: string | null;
  courseName: string | null;
  preferredMode: string;
  preferredCampus: string;
  message: string | null;
  source: string;
  status: string;
  createdAt: Date | string;
}

interface Course {
  id: string;
  title: string;
  categoryName: string;
  fees: number;
  enrolledStudents: number;
}

interface AdminDashboardClientProps {
  inquiries: Inquiry[];
  courses: Course[];
  userEmail: string;
}

export default function AdminDashboardClient({
  inquiries: initialInquiries,
  courses,
  userEmail,
}: AdminDashboardClientProps) {
  const router = useRouter();
  const [inquiries, setInquiries] = useState<Inquiry[]>(initialInquiries);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const filteredInquiries = inquiries.filter((inq) => {
    const matchesSearch =
      inq.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inq.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inq.phone.includes(searchQuery) ||
      (inq.courseName && inq.courseName.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesStatus = statusFilter === 'ALL' ? true : inq.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  async function handleStatusChange(id: string, newStatus: string) {
    setUpdatingId(id);
    const res = await updateInquiryStatusAction(id, newStatus);
    setUpdatingId(null);

    if (res.success) {
      setInquiries((prev) =>
        prev.map((item) => (item.id === id ? { ...item, status: newStatus } : item))
      );
    }
  }

  async function handleLogout() {
    await adminLogoutAction();
    router.push('/admin/login');
  }

  const newLeadsCount = inquiries.filter((i) => i.status === 'NEW').length;
  const contactedCount = inquiries.filter((i) => i.status === 'CONTACTED').length;
  const enrolledCount = inquiries.filter((i) => i.status === 'ENROLLED').length;

  return (
    <div className="space-y-10 py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Top Header Bar */}
      <div className="glass-card rounded-2xl p-6 sm:p-8 border border-purple-500/20 bg-gradient-to-r from-slate-900 via-purple-950/30 to-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="space-y-1 text-center sm:text-left">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase text-purple-400">
            <Sparkles className="w-4 h-4" />
            <span>Admin Management Portal</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white">Academy Lead Center</h1>
          <p className="text-xs text-slate-400">Logged in as: <strong className="text-purple-300">{userEmail}</strong></p>
        </div>

        <button
          onClick={handleLogout}
          className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-rose-400 font-semibold text-xs border border-rose-500/30 flex items-center gap-2 transition-colors"
        >
          <LogOut className="w-4 h-4" />
          <span>Sign Out Admin</span>
        </button>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="glass-card rounded-2xl p-5 border border-slate-800 space-y-1">
          <span className="text-xs text-slate-400 font-medium block">Total Inquiries</span>
          <span className="text-3xl font-extrabold text-white">{inquiries.length}</span>
          <span className="text-[11px] text-slate-500 block">All time captured leads</span>
        </div>

        <div className="glass-card rounded-2xl p-5 border border-slate-800 space-y-1">
          <span className="text-xs text-slate-400 font-medium block">New Leads</span>
          <span className="text-3xl font-extrabold text-blue-400">{newLeadsCount}</span>
          <span className="text-[11px] text-blue-400/80 block">Requires counselor call</span>
        </div>

        <div className="glass-card rounded-2xl p-5 border border-slate-800 space-y-1">
          <span className="text-xs text-slate-400 font-medium block">In Counseling</span>
          <span className="text-3xl font-extrabold text-amber-400">{contactedCount}</span>
          <span className="text-[11px] text-amber-400/80 block">Follow-up in progress</span>
        </div>

        <div className="glass-card rounded-2xl p-5 border border-slate-800 space-y-1">
          <span className="text-xs text-slate-400 font-medium block">Confirmed Enrolled</span>
          <span className="text-3xl font-extrabold text-emerald-400">{enrolledCount}</span>
          <span className="text-[11px] text-emerald-400/80 block">Converted students</span>
        </div>
      </div>

      {/* Leads Table Section */}
      <div className="glass-card rounded-2xl p-6 sm:p-8 border border-slate-800 space-y-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-white">Student Inquiries & Demo Leads</h2>
            <p className="text-xs text-slate-400">Click on lead status dropdown to update student pipeline state.</p>
          </div>

          <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
            {/* Search */}
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search name, phone, course..."
                className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs placeholder:text-slate-500 focus:outline-none focus:border-purple-500"
              />
            </div>

            {/* Filter */}
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:outline-none focus:border-purple-500"
            >
              <option value="ALL">All Pipeline States</option>
              <option value="NEW">NEW</option>
              <option value="CONTACTED">CONTACTED</option>
              <option value="ENROLLED">ENROLLED</option>
              <option value="CLOSED">CLOSED</option>
            </select>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto border border-slate-800 rounded-xl">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-900/90 text-slate-400 uppercase font-semibold text-[11px] border-b border-slate-800">
              <tr>
                <th className="p-4">Student Details</th>
                <th className="p-4">Course Interest</th>
                <th className="p-4">Mode & Campus</th>
                <th className="p-4">Source</th>
                <th className="p-4">Status & Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {filteredInquiries.length === 0 ? (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-slate-500">
                    No leads found matching current filter query.
                  </td>
                </tr>
              ) : (
                filteredInquiries.map((inq) => (
                  <tr key={inq.id} className="hover:bg-slate-900/50 transition-colors">
                    <td className="p-4 space-y-1">
                      <div className="font-bold text-white text-sm">{inq.name}</div>
                      <div className="flex items-center gap-3 text-slate-400">
                        <span className="flex items-center gap-1"><Mail className="w-3 h-3 text-blue-400" /> {inq.email}</span>
                        <span className="flex items-center gap-1"><PhoneCall className="w-3 h-3 text-emerald-400" /> {inq.phone}</span>
                      </div>
                      {inq.message && (
                        <div className="text-[11px] text-slate-400 bg-slate-950 p-2 rounded border border-slate-800 mt-1 max-w-sm italic">
                          &ldquo;{inq.message}&rdquo;
                        </div>
                      )}
                    </td>
                    <td className="p-4 font-semibold text-purple-300">
                      {inq.courseName || 'General Inquiry'}
                    </td>
                    <td className="p-4 space-y-0.5">
                      <div className="text-slate-200 font-medium">{inq.preferredMode}</div>
                      <div className="text-slate-500 text-[11px]">{inq.preferredCampus}</div>
                    </td>
                    <td className="p-4">
                      <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-400 text-[11px]">
                        {inq.source}
                      </span>
                    </td>
                    <td className="p-4">
                      <select
                        disabled={updatingId === inq.id}
                        value={inq.status}
                        onChange={(e) => handleStatusChange(inq.id, e.target.value)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold focus:outline-none transition-all cursor-pointer ${
                          inq.status === 'NEW'
                            ? 'bg-blue-600/20 text-blue-400 border border-blue-500/40'
                            : inq.status === 'CONTACTED'
                            ? 'bg-amber-600/20 text-amber-300 border border-amber-500/40'
                            : inq.status === 'ENROLLED'
                            ? 'bg-emerald-600/20 text-emerald-400 border border-emerald-500/40'
                            : 'bg-slate-800 text-slate-400 border border-slate-700'
                        }`}
                      >
                        <option value="NEW">NEW</option>
                        <option value="CONTACTED">CONTACTED</option>
                        <option value="ENROLLED">ENROLLED</option>
                        <option value="CLOSED">CLOSED</option>
                      </select>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Courses Quick Catalog Manager */}
      <div className="glass-card rounded-2xl p-6 sm:p-8 border border-slate-800 space-y-4">
        <h2 className="text-xl font-bold text-white">Active Course Offerings</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {courses.map((c) => (
            <div key={c.id} className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
              <span className="text-[10px] font-bold text-blue-400 uppercase">{c.categoryName}</span>
              <h4 className="font-bold text-white text-sm line-clamp-1">{c.title}</h4>
              <div className="flex items-center justify-between text-xs text-slate-400 pt-2 border-t border-slate-800">
                <span>Fee: ₹{c.fees.toLocaleString()}</span>
                <span className="text-emerald-400 font-semibold">{c.enrolledStudents}+ Enrolled</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
