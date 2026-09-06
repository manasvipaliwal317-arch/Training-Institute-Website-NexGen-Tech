'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  LayoutDashboard,
  BookOpen,
  Calendar,
  FileText,
  Building2,
  Users,
  LogOut,
  Plus,
  Trash2,
  Edit,
  ExternalLink,
  Search,
  Sparkles,
  Briefcase,
  MapPin,
  Clock,
  Phone,
  Mail,
  CheckCircle2,
  AlertCircle,
  X,
  Send,
  Eye,
  Tag,
  DollarSign,
  GraduationCap,
  Laptop,
} from 'lucide-react';
import {
  updateInquiryStatusAction,
  updateInquiryAction,
  deleteInquiryAction,
  adminLogoutAction,
  createCourseAction,
  updateCourseAction,
  deleteCourseAction,
  createEventAction,
  updateEventAction,
  deleteEventAction,
  createBlogAction,
  updateBlogAction,
  deleteBlogAction,
  createCampusAction,
  updateCampusAction,
  deleteCampusAction,
  createHiringDriveAction,
  updateHiringDriveAction,
  deleteHiringDriveAction,
  createBatchAction,
  updateBatchAction,
  deleteBatchAction,
} from '@/app/actions';

interface AdminPanelProps {
  inquiries: any[];
  courses: any[];
  categories: any[];
  events: any[];
  blogs: any[];
  campuses: any[];
  hiringDrives?: any[];
  batches?: any[];
  userEmail: string;
}

export default function AdminPanel({
  inquiries: initialInquiries,
  courses: initialCourses,
  categories,
  events: initialEvents,
  blogs: initialBlogs,
  campuses: initialCampuses,
  hiringDrives: initialDrives = [],
  batches: initialBatches = [],
  userEmail,
}: AdminPanelProps) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<
    'analytics' | 'inquiries' | 'courses' | 'events' | 'blogs' | 'campuses' | 'drives' | 'batches'
  >('analytics');

  const [inquiries, setInquiries] = useState(initialInquiries);
  const [courses, setCourses] = useState(initialCourses);
  const [events, setEvents] = useState(initialEvents);
  const [blogs, setBlogs] = useState(initialBlogs);
  const [campuses, setCampuses] = useState(initialCampuses);
  const [drives, setDrives] = useState(initialDrives);
  const [batches, setBatches] = useState(initialBatches);

  // Search & Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');

  // Add Modals
  const [isCourseModalOpen, setIsCourseModalOpen] = useState(false);
  const [isEventModalOpen, setIsEventModalOpen] = useState(false);
  const [isBlogModalOpen, setIsBlogModalOpen] = useState(false);
  const [isCampusModalOpen, setIsCampusModalOpen] = useState(false);
  const [isDriveModalOpen, setIsDriveModalOpen] = useState(false);
  const [isBatchModalOpen, setIsBatchModalOpen] = useState(false);

  // Edit Modals
  const [editingInquiry, setEditingInquiry] = useState<any | null>(null);
  const [editingCourse, setEditingCourse] = useState<any | null>(null);
  const [editingEvent, setEditingEvent] = useState<any | null>(null);
  const [editingBlog, setEditingBlog] = useState<any | null>(null);
  const [editingCampus, setEditingCampus] = useState<any | null>(null);
  const [editingDrive, setEditingDrive] = useState<any | null>(null);
  const [editingBatch, setEditingBatch] = useState<any | null>(null);

  const [loading, setLoading] = useState(false);
  const [actionError, setActionError] = useState('');
  const [actionSuccess, setActionSuccess] = useState('');

  function resetFeedback() {
    setActionError('');
    setActionSuccess('');
  }

  async function handleLogout() {
    setLoading(true);
    await adminLogoutAction();
    window.location.href = '/admin/login';
  }

  // --- INQUIRY HANDLERS ---
  async function handleStatusChange(id: string, status: string) {
    const res = await updateInquiryStatusAction(id, status);
    if (res.success) {
      setInquiries((prev) => prev.map((item) => (item.id === id ? { ...item, status } : item)));
    }
  }

  async function handleDeleteInquiry(id: string) {
    if (!confirm('Are you sure you want to delete this lead?')) return;
    const res = await deleteInquiryAction(id);
    if (res.success) {
      setInquiries((prev) => prev.filter((item) => item.id !== id));
    }
  }

  async function handleUpdateInquirySubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!editingInquiry) return;
    setLoading(true);
    resetFeedback();
    const formData = new FormData(e.currentTarget);
    const res = await updateInquiryAction(editingInquiry.id, formData);
    setLoading(false);
    if (res.success) {
      setActionSuccess('Lead updated successfully.');
      setEditingInquiry(null);
      router.refresh();
    } else {
      setActionError(res.error || 'Failed to update lead.');
    }
  }

  // --- COURSE HANDLERS ---
  async function handleDeleteCourse(id: string) {
    if (!confirm('Are you sure you want to delete this course offering?')) return;
    const res = await deleteCourseAction(id);
    if (res.success) {
      setCourses((prev) => prev.filter((item) => item.id !== id));
    }
  }

  async function handleCreateCourse(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    resetFeedback();
    const formData = new FormData(e.currentTarget);
    const res = await createCourseAction(formData);
    setLoading(false);
    if (res.success) {
      setIsCourseModalOpen(false);
      setActionSuccess('Course created successfully.');
      router.refresh();
    } else {
      setActionError(res.error || 'Failed to create course.');
    }
  }

  async function handleUpdateCourseSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!editingCourse) return;
    setLoading(true);
    resetFeedback();
    const formData = new FormData(e.currentTarget);
    const res = await updateCourseAction(editingCourse.id, formData);
    setLoading(false);
    if (res.success) {
      setEditingCourse(null);
      setActionSuccess('Course updated successfully.');
      router.refresh();
    } else {
      setActionError(res.error || 'Failed to update course.');
    }
  }

  // --- EVENT HANDLERS ---
  async function handleDeleteEvent(id: string) {
    if (!confirm('Are you sure you want to delete this event?')) return;
    const res = await deleteEventAction(id);
    if (res.success) {
      setEvents((prev) => prev.filter((item) => item.id !== id));
    }
  }

  async function handleCreateEvent(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    resetFeedback();
    const formData = new FormData(e.currentTarget);
    const res = await createEventAction(formData);
    setLoading(false);
    if (res.success) {
      setIsEventModalOpen(false);
      setActionSuccess('Event created successfully.');
      router.refresh();
    } else {
      setActionError(res.error || 'Failed to create event.');
    }
  }

  async function handleUpdateEventSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!editingEvent) return;
    setLoading(true);
    resetFeedback();
    const formData = new FormData(e.currentTarget);
    const res = await updateEventAction(editingEvent.id, formData);
    setLoading(false);
    if (res.success) {
      setEditingEvent(null);
      setActionSuccess('Event updated successfully.');
      router.refresh();
    } else {
      setActionError(res.error || 'Failed to update event.');
    }
  }

  // --- BLOG HANDLERS ---
  async function handleDeleteBlog(id: string) {
    if (!confirm('Are you sure you want to delete this blog post?')) return;
    const res = await deleteBlogAction(id);
    if (res.success) {
      setBlogs((prev) => prev.filter((item) => item.id !== id));
    }
  }

  async function handleCreateBlog(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    resetFeedback();
    const formData = new FormData(e.currentTarget);
    const res = await createBlogAction(formData);
    setLoading(false);
    if (res.success) {
      setIsBlogModalOpen(false);
      setActionSuccess('Blog post published.');
      router.refresh();
    } else {
      setActionError(res.error || 'Failed to publish blog post.');
    }
  }

  async function handleUpdateBlogSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!editingBlog) return;
    setLoading(true);
    resetFeedback();
    const formData = new FormData(e.currentTarget);
    const res = await updateBlogAction(editingBlog.id, formData);
    setLoading(false);
    if (res.success) {
      setEditingBlog(null);
      setActionSuccess('Blog post updated.');
      router.refresh();
    } else {
      setActionError(res.error || 'Failed to update blog post.');
    }
  }

  // --- CAMPUS HANDLERS ---
  async function handleDeleteCampus(id: string) {
    if (!confirm('Are you sure you want to delete this campus branch?')) return;
    const res = await deleteCampusAction(id);
    if (res.success) {
      setCampuses((prev) => prev.filter((item) => item.id !== id));
    }
  }

  async function handleCreateCampus(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    resetFeedback();
    const formData = new FormData(e.currentTarget);
    const res = await createCampusAction(formData);
    setLoading(false);
    if (res.success) {
      setIsCampusModalOpen(false);
      setActionSuccess('Campus branch created.');
      router.refresh();
    } else {
      setActionError(res.error || 'Failed to create campus branch.');
    }
  }

  async function handleUpdateCampusSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!editingCampus) return;
    setLoading(true);
    resetFeedback();
    const formData = new FormData(e.currentTarget);
    const res = await updateCampusAction(editingCampus.id, formData);
    setLoading(false);
    if (res.success) {
      setEditingCampus(null);
      setActionSuccess('Campus branch updated.');
      router.refresh();
    } else {
      setActionError(res.error || 'Failed to update campus branch.');
    }
  }

  // --- HIRING DRIVE HANDLERS ---
  async function handleDeleteDrive(id: string) {
    if (!confirm('Are you sure you want to delete this hiring drive?')) return;
    const res = await deleteHiringDriveAction(id);
    if (res.success) {
      setDrives((prev) => prev.filter((item) => item.id !== id));
    }
  }

  async function handleCreateDrive(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    resetFeedback();
    const formData = new FormData(e.currentTarget);
    const res = await createHiringDriveAction(formData);
    setLoading(false);
    if (res.success) {
      setIsDriveModalOpen(false);
      setActionSuccess('Hiring drive created.');
      router.refresh();
    } else {
      setActionError(res.error || 'Failed to create hiring drive.');
    }
  }

  async function handleUpdateDriveSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!editingDrive) return;
    setLoading(true);
    resetFeedback();
    const formData = new FormData(e.currentTarget);
    const res = await updateHiringDriveAction(editingDrive.id, formData);
    setLoading(false);
    if (res.success) {
      setEditingDrive(null);
      setActionSuccess('Hiring drive updated.');
      router.refresh();
    } else {
      setActionError(res.error || 'Failed to update hiring drive.');
    }
  }

  // --- BATCH SCHEDULE HANDLERS ---
  async function handleDeleteBatch(id: string) {
    if (!confirm('Are you sure you want to delete this batch schedule?')) return;
    const res = await deleteBatchAction(id);
    if (res.success) {
      setBatches((prev) => prev.filter((item) => item.id !== id));
    }
  }

  async function handleCreateBatch(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    resetFeedback();
    const formData = new FormData(e.currentTarget);
    const res = await createBatchAction(formData);
    setLoading(false);
    if (res.success) {
      setIsBatchModalOpen(false);
      setActionSuccess('Batch schedule created successfully.');
      router.refresh();
    } else {
      setActionError(res.error || 'Failed to create batch schedule.');
    }
  }

  async function handleUpdateBatchSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!editingBatch) return;
    setLoading(true);
    resetFeedback();
    const formData = new FormData(e.currentTarget);
    const res = await updateBatchAction(editingBatch.id, formData);
    setLoading(false);
    if (res.success) {
      setEditingBatch(null);
      setActionSuccess('Batch schedule updated.');
      router.refresh();
    } else {
      setActionError(res.error || 'Failed to update batch schedule.');
    }
  }

  const newLeadsCount = inquiries.filter((i) => i.status === 'NEW').length;
  const activeDrivesCount = drives.filter((d) => d.status === 'ACTIVE').length;
  const upcomingDrivesCount = drives.filter((d) => d.status === 'UPCOMING').length;

  const filteredInquiries = inquiries.filter((inq) => {
    const matchesSearch =
      inq.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inq.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inq.phone?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inq.courseName?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'ALL' || inq.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const filteredBatches = batches.filter((b) => {
    const searchLow = searchQuery.toLowerCase();
    const matchesSearch =
      b.course?.title?.toLowerCase().includes(searchLow) ||
      b.timing?.toLowerCase().includes(searchLow) ||
      b.startDate?.toLowerCase().includes(searchLow) ||
      b.campusLocation?.toLowerCase().includes(searchLow) ||
      b.mode?.toLowerCase().includes(searchLow);
    const matchesStatus = statusFilter === 'ALL' || b.status === statusFilter || b.mode === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-12 gap-8 py-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Sidebar Navigation */}
      <div className="lg:col-span-3 space-y-4">
        <div className="glass-card rounded-2xl p-6 border border-purple-500/30 space-y-6 sticky top-24">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase text-purple-400">
              <Sparkles className="w-3.5 h-3.5" /> Executive Portal
            </div>
            <h2 className="text-xl font-black text-white">Academy Admin</h2>
            <p className="text-[11px] text-slate-400 line-clamp-1">{userEmail}</p>
          </div>

          <nav className="space-y-1 text-xs font-semibold">
            <button
              onClick={() => {
                setActiveTab('analytics');
                resetFeedback();
              }}
              className={`w-full px-4 py-3 rounded-xl flex items-center gap-2.5 transition-all ${
                activeTab === 'analytics'
                  ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/30 font-bold'
                  : 'text-slate-300 hover:bg-slate-800/60'
              }`}
            >
              <LayoutDashboard className="w-4 h-4" /> Overview Analytics
            </button>

            <button
              onClick={() => {
                setActiveTab('inquiries');
                resetFeedback();
              }}
              className={`w-full px-4 py-3 rounded-xl flex items-center justify-between transition-all ${
                activeTab === 'inquiries'
                  ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/30 font-bold'
                  : 'text-slate-300 hover:bg-slate-800/60'
              }`}
            >
              <span className="flex items-center gap-2.5">
                <Users className="w-4 h-4" /> Manage Inquiries
              </span>
              {newLeadsCount > 0 && (
                <span className="px-2 py-0.5 rounded-full bg-blue-500 text-white font-bold text-[10px]">
                  {newLeadsCount}
                </span>
              )}
            </button>

            <button
              onClick={() => {
                setActiveTab('courses');
                resetFeedback();
              }}
              className={`w-full px-4 py-3 rounded-xl flex items-center justify-between transition-all ${
                activeTab === 'courses'
                  ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/30 font-bold'
                  : 'text-slate-300 hover:bg-slate-800/60'
              }`}
            >
              <span className="flex items-center gap-2.5">
                <BookOpen className="w-4 h-4" /> Manage Courses
              </span>
              <span className="text-[11px] text-slate-400">{courses.length}</span>
            </button>

            <button
              onClick={() => {
                setActiveTab('batches');
                resetFeedback();
              }}
              className={`w-full px-4 py-3 rounded-xl flex items-center justify-between transition-all ${
                activeTab === 'batches'
                  ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/30 font-bold'
                  : 'text-slate-300 hover:bg-slate-800/60'
              }`}
            >
              <span className="flex items-center gap-2.5">
                <Calendar className="w-4 h-4 text-purple-400" /> Upcoming Batches
              </span>
              <span className="text-[11px] text-slate-400">{batches.length}</span>
            </button>

            <button
              onClick={() => {
                setActiveTab('events');
                resetFeedback();
              }}
              className={`w-full px-4 py-3 rounded-xl flex items-center justify-between transition-all ${
                activeTab === 'events'
                  ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/30 font-bold'
                  : 'text-slate-300 hover:bg-slate-800/60'
              }`}
            >
              <span className="flex items-center gap-2.5">
                <Calendar className="w-4 h-4 text-cyan-400" /> Manage Events
              </span>
              <span className="text-[11px] text-slate-400">{events.length}</span>
            </button>

            <button
              onClick={() => {
                setActiveTab('blogs');
                resetFeedback();
              }}
              className={`w-full px-4 py-3 rounded-xl flex items-center justify-between transition-all ${
                activeTab === 'blogs'
                  ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/30 font-bold'
                  : 'text-slate-300 hover:bg-slate-800/60'
              }`}
            >
              <span className="flex items-center gap-2.5">
                <FileText className="w-4 h-4" /> Manage Blogs
              </span>
              <span className="text-[11px] text-slate-400">{blogs.length}</span>
            </button>

            <button
              onClick={() => {
                setActiveTab('campuses');
                resetFeedback();
              }}
              className={`w-full px-4 py-3 rounded-xl flex items-center justify-between transition-all ${
                activeTab === 'campuses'
                  ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/30 font-bold'
                  : 'text-slate-300 hover:bg-slate-800/60'
              }`}
            >
              <span className="flex items-center gap-2.5">
                <Building2 className="w-4 h-4" /> Campus Branches
              </span>
              <span className="text-[11px] text-slate-400">{campuses.length}</span>
            </button>

            <button
              onClick={() => {
                setActiveTab('drives');
                resetFeedback();
              }}
              className={`w-full px-4 py-3 rounded-xl flex items-center justify-between transition-all ${
                activeTab === 'drives'
                  ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/30 font-bold'
                  : 'text-slate-300 hover:bg-slate-800/60'
              }`}
            >
              <span className="flex items-center gap-2.5">
                <Briefcase className="w-4 h-4" /> Hiring Drives
              </span>
              {activeDrivesCount > 0 && (
                <span className="px-2 py-0.5 rounded-full bg-emerald-500 text-slate-950 font-extrabold text-[10px]">
                  {activeDrivesCount} Live
                </span>
              )}
            </button>
          </nav>

          <div className="pt-4 border-t border-slate-800 space-y-2">
            <Link
              href="/"
              target="_blank"
              className="w-full py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 font-semibold text-xs border border-slate-700 flex items-center justify-center gap-2 transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5" /> View Live Website
            </Link>
            <button
              onClick={handleLogout}
              className="w-full py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-rose-400 font-semibold text-xs border border-rose-500/30 flex items-center justify-center gap-2 transition-colors"
            >
              <LogOut className="w-4 h-4" /> Sign Out Admin
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="lg:col-span-9 space-y-6">
        {/* Global Feedback Messages */}
        {actionSuccess && (
          <div className="p-4 rounded-xl bg-emerald-950/40 border border-emerald-500/40 text-emerald-300 text-xs flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>{actionSuccess}</span>
            </div>
            <button onClick={() => setActionSuccess('')}>
              <X className="w-4 h-4 text-emerald-400" />
            </button>
          </div>
        )}
        {actionError && (
          <div className="p-4 rounded-xl bg-rose-950/40 border border-rose-500/40 text-rose-300 text-xs flex items-center justify-between">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-rose-400" />
              <span>{actionError}</span>
            </div>
            <button onClick={() => setActionError('')}>
              <X className="w-4 h-4 text-rose-400" />
            </button>
          </div>
        )}

        {/* TAB 1: Overview Analytics */}
        {activeTab === 'analytics' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
              <div className="glass-card rounded-2xl p-4 border border-slate-800 space-y-1">
                <span className="text-[11px] text-slate-400 block font-medium">Inquiries</span>
                <span className="text-2xl font-black text-white">{inquiries.length}</span>
              </div>
              <div className="glass-card rounded-2xl p-4 border border-blue-500/30 bg-blue-950/10 space-y-1">
                <span className="text-[11px] text-blue-300 block font-medium">New Leads</span>
                <span className="text-2xl font-black text-blue-400">{newLeadsCount}</span>
              </div>
              <div className="glass-card rounded-2xl p-4 border border-purple-500/30 bg-purple-950/10 space-y-1">
                <span className="text-[11px] text-purple-300 block font-medium">Active Batches</span>
                <span className="text-2xl font-black text-purple-400">{batches.length}</span>
              </div>
              <div className="glass-card rounded-2xl p-4 border border-cyan-500/30 bg-cyan-950/10 space-y-1">
                <span className="text-[11px] text-cyan-300 block font-medium">Events</span>
                <span className="text-2xl font-black text-cyan-400">{events.length}</span>
              </div>
              <div className="glass-card rounded-2xl p-4 border border-amber-500/30 bg-amber-950/10 space-y-1">
                <span className="text-[11px] text-amber-300 block font-medium">Campuses</span>
                <span className="text-2xl font-black text-amber-400">{campuses.length}</span>
              </div>
              <div className="glass-card rounded-2xl p-4 border border-emerald-500/30 bg-emerald-950/10 space-y-1">
                <span className="text-[11px] text-emerald-300 block font-medium">Hiring Drives</span>
                <span className="text-2xl font-black text-emerald-400">{drives.length}</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Quick Batches Preview */}
              <div className="glass-card rounded-2xl p-6 border border-slate-800 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-purple-400" /> Upcoming Batches
                  </h3>
                  <button
                    onClick={() => setActiveTab('batches')}
                    className="text-xs text-purple-400 hover:text-purple-300 font-semibold"
                  >
                    View All ({batches.length}) →
                  </button>
                </div>
                <div className="space-y-2.5">
                  {batches.slice(0, 4).map((b) => (
                    <div
                      key={b.id}
                      className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center justify-between text-xs"
                    >
                      <div>
                        <span className="font-bold text-white text-sm block">{b.course?.title || 'Program'}</span>
                        <span className="text-slate-400 text-[11px]">
                          {b.startDate} • {b.timing}
                        </span>
                      </div>
                      <span className="px-2.5 py-1 rounded text-[10px] font-extrabold bg-emerald-950/80 border border-emerald-500/40 text-emerald-300">
                        {b.seatsAvailable} Seats Left
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Hiring Drives Preview */}
              <div className="glass-card rounded-2xl p-6 border border-slate-800 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    <Briefcase className="w-4 h-4 text-emerald-400" /> Active Hiring Drives
                  </h3>
                  <button
                    onClick={() => setActiveTab('drives')}
                    className="text-xs text-purple-400 hover:text-purple-300 font-semibold"
                  >
                    Manage Drives →
                  </button>
                </div>
                <div className="space-y-2.5">
                  {drives.slice(0, 4).map((d) => (
                    <div
                      key={d.id}
                      className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center justify-between text-xs"
                    >
                      <div>
                        <span className="font-bold text-white text-sm block">{d.companyName}</span>
                        <span className="text-slate-400 text-[11px]">
                          {d.role} • {d.packageLpa}
                        </span>
                      </div>
                      <span
                        className={`px-2.5 py-1 rounded text-[10px] font-bold ${
                          d.status === 'ACTIVE'
                            ? 'bg-emerald-500/20 text-emerald-400'
                            : d.status === 'UPCOMING'
                            ? 'bg-blue-500/20 text-blue-400'
                            : 'bg-slate-700 text-slate-400'
                        }`}
                      >
                        {d.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: Manage Inquiries */}
        {activeTab === 'inquiries' && (
          <div className="glass-card rounded-2xl p-6 sm:p-8 border border-slate-800 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl font-extrabold text-white">Student Inquiries & Leads</h2>
                <p className="text-xs text-slate-400">
                  Update candidate status, add internal notes, or edit contact details.
                </p>
              </div>

              {/* Status Filter Buttons */}
              <div className="flex items-center gap-1.5 bg-slate-900 p-1 rounded-xl border border-slate-800 text-xs">
                {['ALL', 'NEW', 'CONTACTED', 'ENROLLED', 'CLOSED'].map((st) => (
                  <button
                    key={st}
                    onClick={() => setStatusFilter(st)}
                    className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${
                      statusFilter === st
                        ? 'bg-purple-600 text-white shadow'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    {st}
                  </button>
                ))}
              </div>
            </div>

            {/* Search Bar */}
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search leads by student name, email, phone, or course..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900/80 border border-slate-800 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-purple-500"
              />
            </div>

            <div className="overflow-x-auto border border-slate-800 rounded-xl">
              <table className="w-full text-left text-xs text-slate-300">
                <thead className="bg-slate-900 text-slate-400 uppercase font-semibold text-[11px] border-b border-slate-800">
                  <tr>
                    <th className="p-4">Student Details</th>
                    <th className="p-4">Course & Campus</th>
                    <th className="p-4">Mode</th>
                    <th className="p-4">Status</th>
                    <th className="p-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                  {filteredInquiries.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="p-8 text-center text-slate-500">
                        No inquiries found matching your filters.
                      </td>
                    </tr>
                  ) : (
                    filteredInquiries.map((inq) => (
                      <tr key={inq.id} className="hover:bg-slate-900/50">
                        <td className="p-4">
                          <div className="font-bold text-white text-sm">{inq.name}</div>
                          <div className="text-slate-400 text-[11px]">
                            {inq.email} • {inq.phone}
                          </div>
                          {inq.notes && (
                            <div className="mt-1 text-[11px] text-amber-300/90 italic bg-amber-950/20 px-2 py-0.5 rounded border border-amber-500/20 max-w-xs">
                              Note: {inq.notes}
                            </div>
                          )}
                        </td>
                        <td className="p-4">
                          <div className="font-semibold text-purple-300">{inq.courseName || 'General'}</div>
                          <div className="text-[11px] text-slate-400">{inq.preferredCampus}</div>
                        </td>
                        <td className="p-4">
                          <span className="px-2.5 py-1 rounded bg-slate-800 text-slate-300 text-[11px]">
                            {inq.preferredMode}
                          </span>
                        </td>
                        <td className="p-4">
                          <select
                            value={inq.status}
                            onChange={(e) => handleStatusChange(inq.id, e.target.value)}
                            className={`px-2.5 py-1 rounded text-xs font-bold border ${
                              inq.status === 'NEW'
                                ? 'bg-blue-950 border-blue-600 text-blue-400'
                                : inq.status === 'CONTACTED'
                                ? 'bg-amber-950 border-amber-600 text-amber-400'
                                : inq.status === 'ENROLLED'
                                ? 'bg-emerald-950 border-emerald-600 text-emerald-400'
                                : 'bg-slate-900 border-slate-700 text-slate-400'
                            }`}
                          >
                            <option value="NEW">NEW</option>
                            <option value="CONTACTED">CONTACTED</option>
                            <option value="ENROLLED">ENROLLED</option>
                            <option value="CLOSED">CLOSED</option>
                          </select>
                        </td>
                        <td className="p-4 text-right">
                          <div className="inline-flex items-center gap-1.5">
                            <button
                              onClick={() => {
                                setEditingInquiry(inq);
                                resetFeedback();
                              }}
                              className="p-2 rounded-lg bg-blue-950/40 text-blue-400 hover:bg-blue-900/60 transition-colors"
                              title="Edit Lead Details"
                            >
                              <Edit className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDeleteInquiry(inq.id)}
                              className="p-2 rounded-lg bg-red-950/40 text-red-400 hover:bg-red-900/60 transition-colors"
                              title="Delete Lead"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 3: Manage Courses (CRUD) */}
        {activeTab === 'courses' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl font-extrabold text-white">Course Offerings ({courses.length})</h2>
                <p className="text-xs text-slate-400">
                  Add, edit fees, syllabus, hero images, and feature flags. Updates appear live on /courses.
                </p>
              </div>
              <button
                onClick={() => {
                  setIsCourseModalOpen(true);
                  resetFeedback();
                }}
                className="px-4 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-semibold text-xs flex items-center gap-2 shadow-lg shadow-purple-600/20 self-start"
              >
                <Plus className="w-4 h-4" /> Add New Course
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {courses.map((c) => (
                <div
                  key={c.id}
                  className="glass-card rounded-2xl p-5 border border-slate-800 flex flex-col justify-between gap-4 hover:border-purple-500/40 transition-all"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[10px] font-bold text-blue-400 uppercase tracking-wider bg-blue-950/40 px-2 py-0.5 rounded border border-blue-500/20">
                        {c.category?.name || 'Tech Track'}
                      </span>
                      <div className="flex items-center gap-1.5">
                        {c.featured && (
                          <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-400 text-[10px] font-bold">
                            Featured
                          </span>
                        )}
                        {c.bestseller && (
                          <span className="px-2 py-0.5 rounded bg-purple-500/20 text-purple-400 text-[10px] font-bold">
                            Bestseller
                          </span>
                        )}
                      </div>
                    </div>

                    <h3 className="font-bold text-white text-base leading-snug">{c.title}</h3>
                    <p className="text-xs text-slate-400 line-clamp-2">{c.tagline}</p>

                    <div className="flex flex-wrap items-center gap-3 text-xs text-slate-300 pt-2 border-t border-slate-800/80">
                      <span className="text-emerald-400 font-bold">₹{c.fees?.toLocaleString()}</span>
                      <span className="text-slate-500 line-through text-[11px]">
                        ₹{c.originalFees?.toLocaleString()}
                      </span>
                      <span>• {c.duration}</span>
                      <span>• {c.mode}</span>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
                    <Link
                      href={`/courses/${c.slug}`}
                      target="_blank"
                      className="text-xs text-purple-400 hover:text-purple-300 font-semibold flex items-center gap-1"
                    >
                      <Eye className="w-3.5 h-3.5" /> View Public Page
                    </Link>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          setEditingCourse(c);
                          resetFeedback();
                        }}
                        className="px-3 py-1.5 rounded-lg bg-blue-950/40 text-blue-400 hover:bg-blue-900/60 text-xs font-semibold flex items-center gap-1.5 border border-blue-500/30"
                      >
                        <Edit className="w-3.5 h-3.5" /> Edit
                      </button>
                      <button
                        onClick={() => handleDeleteCourse(c.id)}
                        className="p-1.5 rounded-lg bg-red-950/40 text-red-400 hover:bg-red-900/60 border border-red-500/30"
                        title="Delete Course"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 8: Manage Batches (CRUD - NEW) */}
        {activeTab === 'batches' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl font-extrabold text-white">Upcoming Batch Schedules ({batches.length})</h2>
                <p className="text-xs text-slate-400">
                  Add new batch cohorts, update timings, seat availability, and status badges. Updates appear live on /batches.
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Link
                  href="/batches"
                  target="_blank"
                  className="px-3 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 font-semibold text-xs border border-slate-700 flex items-center gap-1.5 transition-colors"
                >
                  <Eye className="w-3.5 h-3.5" /> View /batches Page
                </Link>
                <button
                  onClick={() => {
                    setIsBatchModalOpen(true);
                    resetFeedback();
                  }}
                  className="px-4 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-semibold text-xs flex items-center gap-2 shadow-lg shadow-purple-600/20"
                >
                  <Plus className="w-4 h-4" /> Add Batch Schedule
                </button>
              </div>
            </div>

            {/* Filter & Search */}
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
              <div className="sm:col-span-8 relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search batches by course, start date, timing, or campus..."
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900/80 border border-slate-800 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-purple-500"
                />
              </div>

              <div className="sm:col-span-4 flex items-center gap-1.5 bg-slate-900 p-1 rounded-xl border border-slate-800 text-xs">
                {['ALL', 'Hybrid', 'Live Online', 'Classroom'].map((m) => (
                  <button
                    key={m}
                    onClick={() => setStatusFilter(m)}
                    className={`flex-1 py-1.5 rounded-lg font-semibold transition-all text-center text-[11px] ${
                      statusFilter === m
                        ? 'bg-purple-600 text-white shadow'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    {m}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredBatches.map((b) => (
                <div
                  key={b.id}
                  className="glass-card rounded-2xl p-5 border border-slate-800 flex flex-col justify-between gap-4 hover:border-purple-500/40 transition-all"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[10px] font-bold text-blue-400 uppercase bg-slate-800 px-2.5 py-1 rounded-full border border-slate-700">
                        {b.mode}
                      </span>
                      <span className="text-[10px] font-extrabold px-2.5 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                        {b.status}
                      </span>
                    </div>

                    <div>
                      <h3 className="font-bold text-white text-base leading-snug">{b.course?.title || 'Course'}</h3>
                      <p className="text-[11px] text-slate-400 mt-0.5">{b.campusLocation}</p>
                    </div>

                    <div className="text-xs text-slate-300 space-y-1.5 pt-2 border-t border-slate-800/80">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                        <span>Start Date: <strong className="text-white">{b.startDate}</strong></span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                        <span>Timing: <strong className="text-white">{b.timing}</strong></span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        <span className="text-slate-200">Seats: <strong className="text-emerald-300 font-extrabold">{b.seatsAvailable} Left</strong> / <strong className="text-white font-bold">{b.seatsTotal} Total</strong></span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
                    <span className="text-[11px] text-slate-500">ID: {b.id.slice(0, 8)}...</span>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          setEditingBatch(b);
                          resetFeedback();
                        }}
                        className="px-3 py-1.5 rounded-lg bg-blue-950/40 text-blue-400 hover:bg-blue-900/60 text-xs font-semibold flex items-center gap-1.5 border border-blue-500/30"
                      >
                        <Edit className="w-3.5 h-3.5" /> Edit
                      </button>
                      <button
                        onClick={() => handleDeleteBatch(b.id)}
                        className="p-1.5 rounded-lg bg-red-950/40 text-red-400 hover:bg-red-900/60 border border-red-500/30"
                        title="Delete Batch"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: Manage Events (CRUD) */}
        {activeTab === 'events' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl font-extrabold text-white">Workshops & Events ({events.length})</h2>
                <p className="text-xs text-slate-400">
                  Manage live masterclasses, hackathons, speaker info, and past event archives.
                </p>
              </div>
              <button
                onClick={() => {
                  setIsEventModalOpen(true);
                  resetFeedback();
                }}
                className="px-4 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-semibold text-xs flex items-center gap-2 shadow-lg shadow-cyan-600/20 self-start"
              >
                <Plus className="w-4 h-4" /> Create New Event
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {events.map((ev) => (
                <div
                  key={ev.id}
                  className="glass-card rounded-2xl p-5 border border-slate-800 flex flex-col justify-between gap-4 hover:border-cyan-500/40 transition-all"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[10px] font-bold text-cyan-400 uppercase bg-cyan-950/40 px-2 py-0.5 rounded border border-cyan-500/20">
                        {ev.category} • {ev.mode}
                      </span>
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          ev.isPastEvent
                            ? 'bg-slate-800 text-slate-400'
                            : 'bg-emerald-500/20 text-emerald-400'
                        }`}
                      >
                        {ev.isPastEvent ? 'Past Event' : 'Upcoming Live'}
                      </span>
                    </div>

                    <h3 className="font-bold text-white text-base leading-snug">{ev.title}</h3>
                    <p className="text-xs text-slate-400 line-clamp-2">{ev.tagline}</p>

                    <div className="text-xs text-slate-300 space-y-1 pt-2 border-t border-slate-800/80">
                      <div>
                        📅 {ev.eventDate} ({ev.eventTime})
                      </div>
                      <div>
                        🎙️ Speaker: <span className="text-white font-semibold">{ev.speakerName}</span> ({ev.speakerRole})
                      </div>
                      <div className="text-slate-400 text-[11px]">📍 {ev.venue}</div>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
                    <Link
                      href={`/events/${ev.slug}`}
                      target="_blank"
                      className="text-xs text-cyan-400 hover:text-cyan-300 font-semibold flex items-center gap-1"
                    >
                      <Eye className="w-3.5 h-3.5" /> View Public Page
                    </Link>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          setEditingEvent(ev);
                          resetFeedback();
                        }}
                        className="px-3 py-1.5 rounded-lg bg-blue-950/40 text-blue-400 hover:bg-blue-900/60 text-xs font-semibold flex items-center gap-1.5 border border-blue-500/30"
                      >
                        <Edit className="w-3.5 h-3.5" /> Edit
                      </button>
                      <button
                        onClick={() => handleDeleteEvent(ev.id)}
                        className="p-1.5 rounded-lg bg-red-950/40 text-red-400 hover:bg-red-900/60 border border-red-500/30"
                        title="Delete Event"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 5: Manage Blogs (CRUD) */}
        {activeTab === 'blogs' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl font-extrabold text-white">Tech Blog Articles ({blogs.length})</h2>
                <p className="text-xs text-slate-400">
                  Publish or edit guides, career roadmaps, and tutorials on /blog.
                </p>
              </div>
              <button
                onClick={() => {
                  setIsBlogModalOpen(true);
                  resetFeedback();
                }}
                className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs flex items-center gap-2 shadow-lg shadow-blue-600/20 self-start"
              >
                <Plus className="w-4 h-4" /> Publish Blog Post
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {blogs.map((b) => (
                <div
                  key={b.id}
                  className="glass-card rounded-2xl p-5 border border-slate-800 flex flex-col justify-between gap-4 hover:border-blue-500/40 transition-all"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[10px] font-bold text-blue-400 uppercase bg-blue-950/40 px-2 py-0.5 rounded border border-blue-500/20">
                        {b.category}
                      </span>
                      {b.isFeatured && (
                        <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-400 text-[10px] font-bold">
                          Featured
                        </span>
                      )}
                    </div>

                    <h3 className="font-bold text-white text-base leading-snug">{b.title}</h3>
                    <p className="text-xs text-slate-400 line-clamp-2">{b.excerpt}</p>

                    <div className="text-xs text-slate-400 pt-2 border-t border-slate-800/80 flex items-center justify-between">
                      <span>By {b.authorName}</span>
                      <span>{b.readTime}</span>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
                    <Link
                      href={`/blog/${b.slug}`}
                      target="_blank"
                      className="text-xs text-blue-400 hover:text-blue-300 font-semibold flex items-center gap-1"
                    >
                      <Eye className="w-3.5 h-3.5" /> View Article
                    </Link>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          setEditingBlog(b);
                          resetFeedback();
                        }}
                        className="px-3 py-1.5 rounded-lg bg-blue-950/40 text-blue-400 hover:bg-blue-900/60 text-xs font-semibold flex items-center gap-1.5 border border-blue-500/30"
                      >
                        <Edit className="w-3.5 h-3.5" /> Edit
                      </button>
                      <button
                        onClick={() => handleDeleteBlog(b.id)}
                        className="p-1.5 rounded-lg bg-red-950/40 text-red-400 hover:bg-red-900/60 border border-red-500/30"
                        title="Delete Blog Post"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 6: Campus Branches (CRUD) */}
        {activeTab === 'campuses' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl font-extrabold text-white">Campus Branches ({campuses.length})</h2>
                <p className="text-xs text-slate-400">
                  Manage physical locations, contact info, working hours, and Google Maps embeds.
                </p>
              </div>
              <button
                onClick={() => {
                  setIsCampusModalOpen(true);
                  resetFeedback();
                }}
                className="px-4 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-semibold text-xs flex items-center gap-2 shadow-lg shadow-purple-600/20 self-start"
              >
                <Plus className="w-4 h-4" /> Add Campus Branch
              </button>
            </div>

            <div className="grid grid-cols-1 gap-4">
              {campuses.map((camp) => (
                <div
                  key={camp.id}
                  className="glass-card rounded-2xl p-6 border border-slate-800 space-y-3 hover:border-purple-500/40 transition-all"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div className="flex items-center gap-3">
                      <div className="p-2.5 rounded-xl bg-purple-600/20 text-purple-400">
                        <Building2 className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="font-bold text-white text-lg">{camp.name}</h3>
                        <p className="text-xs text-slate-400">{camp.type} • {camp.city}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      {camp.isMain && (
                        <span className="px-2.5 py-1 rounded bg-amber-500/20 text-amber-400 text-xs font-bold border border-amber-500/30">
                          Main Headquarters
                        </span>
                      )}
                      <button
                        onClick={() => {
                          setEditingCampus(camp);
                          resetFeedback();
                        }}
                        className="px-3 py-1.5 rounded-lg bg-blue-950/40 text-blue-400 hover:bg-blue-900/60 text-xs font-semibold flex items-center gap-1.5 border border-blue-500/30"
                      >
                        <Edit className="w-3.5 h-3.5" /> Edit Branch
                      </button>
                      <button
                        onClick={() => handleDeleteCampus(camp.id)}
                        className="p-1.5 rounded-lg bg-red-950/40 text-red-400 hover:bg-red-900/60 border border-red-500/30"
                        title="Delete Branch"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  <p className="text-xs text-slate-300">{camp.address}</p>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-2 border-t border-slate-800 text-xs text-slate-400">
                    <div className="flex items-center gap-1.5">
                      <Phone className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-slate-200">{camp.phone}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Mail className="w-3.5 h-3.5 text-blue-400" />
                      <span className="text-slate-200">{camp.email}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-amber-400" />
                      <span className="text-slate-200">{camp.workingHours}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 7: Hiring Drives (CRUD) */}
        {activeTab === 'drives' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl font-extrabold text-white">Hiring Drives & Placements ({drives.length})</h2>
                <p className="text-xs text-slate-400">
                  Post upcoming and active placement drives for partner MNCs and tech unicorns. Updates appear on /placements.
                </p>
              </div>
              <button
                onClick={() => {
                  setIsDriveModalOpen(true);
                  resetFeedback();
                }}
                className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs flex items-center gap-2 shadow-lg shadow-emerald-600/20 self-start"
              >
                <Plus className="w-4 h-4" /> Add Hiring Drive
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {drives.map((d) => {
                let skills: string[] = [];
                try {
                  skills = JSON.parse(d.skillsRequiredJson || '[]');
                } catch (e) {
                  skills = [];
                }

                return (
                  <div
                    key={d.id}
                    className="glass-card rounded-2xl p-5 border border-slate-800 flex flex-col justify-between gap-4 hover:border-emerald-500/40 transition-all"
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-xs font-black text-white px-2.5 py-1 rounded bg-slate-800 border border-slate-700">
                          {d.companyName}
                        </span>
                        <span
                          className={`px-2.5 py-1 rounded text-[10px] font-extrabold uppercase ${
                            d.status === 'ACTIVE'
                              ? 'bg-emerald-500 text-slate-950 shadow-sm shadow-emerald-500/30'
                              : d.status === 'UPCOMING'
                              ? 'bg-blue-600 text-white'
                              : 'bg-slate-700 text-slate-400'
                          }`}
                        >
                          {d.status}
                        </span>
                      </div>

                      <div>
                        <h3 className="font-bold text-white text-base leading-snug">{d.role}</h3>
                        <p className="text-xs text-slate-400 line-clamp-2 mt-1">{d.description}</p>
                      </div>

                      <div className="grid grid-cols-2 gap-2 text-xs pt-2 border-t border-slate-800">
                        <div className="text-emerald-400 font-bold">💰 {d.packageLpa}</div>
                        <div className="text-slate-300">👥 {d.openPositions} Openings</div>
                        <div className="text-slate-400 text-[11px]">📅 Drive: {d.driveDate}</div>
                        <div className="text-amber-400 text-[11px]">⏰ Apply by: {d.registrationDeadline}</div>
                      </div>

                      {skills.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 pt-1">
                          {skills.map((s: string, idx: number) => (
                            <span
                              key={idx}
                              className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-[10px] text-slate-300 font-medium"
                            >
                              {s}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>

                    <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
                      <Link
                        href="/placements"
                        target="_blank"
                        className="text-xs text-emerald-400 hover:text-emerald-300 font-semibold flex items-center gap-1"
                      >
                        <Eye className="w-3.5 h-3.5" /> View on Placements
                      </Link>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => {
                            setEditingDrive(d);
                            resetFeedback();
                          }}
                          className="px-3 py-1.5 rounded-lg bg-blue-950/40 text-blue-400 hover:bg-blue-900/60 text-xs font-semibold flex items-center gap-1.5 border border-blue-500/30"
                        >
                          <Edit className="w-3.5 h-3.5" /> Edit
                        </button>
                        <button
                          onClick={() => handleDeleteDrive(d.id)}
                          className="p-1.5 rounded-lg bg-red-950/40 text-red-400 hover:bg-red-900/60 border border-red-500/30"
                          title="Delete Drive"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* ================= MODALS SECTION ================= */}

      {/* 1. EDIT INQUIRY MODAL */}
      {editingInquiry && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 overflow-y-auto">
          <div className="w-full max-w-lg glass-card rounded-2xl p-6 border border-purple-500/40 space-y-4 max-h-[90vh] overflow-y-auto my-8">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold text-white">Edit Inquiry / Lead Details</h3>
              <button onClick={() => setEditingInquiry(null)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleUpdateInquirySubmit} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-400 mb-1">Student Full Name</label>
                <input
                  type="text"
                  name="name"
                  defaultValue={editingInquiry.name}
                  required
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white"
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-slate-400 mb-1">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    defaultValue={editingInquiry.email}
                    required
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1">Phone Number</label>
                  <input
                    type="text"
                    name="phone"
                    defaultValue={editingInquiry.phone}
                    required
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-slate-400 mb-1">Target Course</label>
                  <input
                    type="text"
                    name="courseName"
                    defaultValue={editingInquiry.courseName || ''}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1">Status</label>
                  <select
                    name="status"
                    defaultValue={editingInquiry.status}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white font-bold"
                  >
                    <option value="NEW">NEW</option>
                    <option value="CONTACTED">CONTACTED</option>
                    <option value="ENROLLED">ENROLLED</option>
                    <option value="CLOSED">CLOSED</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-slate-400 mb-1">Preferred Mode</label>
                  <select
                    name="preferredMode"
                    defaultValue={editingInquiry.preferredMode || 'Hybrid'}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white"
                  >
                    <option value="Hybrid">Hybrid</option>
                    <option value="Offline Classroom">Offline Classroom</option>
                    <option value="Live Online">Live Online</option>
                  </select>
                </div>
                <div>
                  <label className="block text-slate-400 mb-1">Preferred Campus</label>
                  <input
                    type="text"
                    name="preferredCampus"
                    defaultValue={editingInquiry.preferredCampus || 'Main Tech Park HQ'}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white"
                  />
                </div>
              </div>
              <div>
                <label className="block text-slate-400 mb-1">Counselor Internal Notes</label>
                <textarea
                  name="notes"
                  defaultValue={editingInquiry.notes || ''}
                  placeholder="e.g. Student requested demo session on Saturday; Interested in EMI plan."
                  rows={2}
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white"
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full py-2.5 bg-purple-600 hover:bg-purple-500 text-white font-bold rounded-xl shadow-lg shadow-purple-600/30 transition-all"
              >
                {loading ? 'Saving Changes...' : 'Update Lead'}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* 2. CREATE COURSE MODAL */}
      {isCourseModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 overflow-y-auto">
          <div className="w-full max-w-xl glass-card rounded-2xl p-6 border border-purple-500/40 space-y-4 max-h-[90vh] overflow-y-auto my-8">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold text-white">Add New Course Offering</h3>
              <button onClick={() => setIsCourseModalOpen(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleCreateCourse} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-400 mb-1">Course Title</label>
                <input
                  type="text"
                  name="title"
                  required
                  placeholder="e.g. Master in Generative AI & Autonomous Agents"
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white"
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-slate-400 mb-1">URL Slug</label>
                  <input
                    type="text"
                    name="slug"
                    required
                    placeholder="e.g. master-generative-ai-agents"
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1">Category</label>
                  <select
                    name="categoryId"
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white"
                  >
                    {categories.map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-slate-400 mb-1">Tagline</label>
                <input
                  type="text"
                  name="tagline"
                  required
                  placeholder="e.g. Architect LLM Applications, Multi-Agent Systems & Vector DBs"
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white"
                />
              </div>
              <div>
                <label className="block text-slate-400 mb-1">Description</label>
                <textarea
                  name="description"
                  required
                  rows={3}
                  placeholder="Detailed course description..."
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white"
                />
              </div>
              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="block text-slate-400 mb-1">Duration</label>
                  <input
                    type="text"
                    name="duration"
                    required
                    placeholder="e.g. 5 Months"
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1">Total Hours</label>
                  <input
                    type="number"
                    name="hoursCount"
                    defaultValue={120}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1">Mode</label>
                  <select
                    name="mode"
                    defaultValue="Hybrid"
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white"
                  >
                    <option value="Hybrid">Hybrid</option>
                    <option value="Online">Online</option>
                    <option value="Classroom">Classroom</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-slate-400 mb-1">Discounted Fees (₹)</label>
                  <input
                    type="number"
                    name="fees"
                    required
                    placeholder="45000"
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1">Original Fees (₹)</label>
                  <input
                    type="number"
                    name="originalFees"
                    required
                    placeholder="65000"
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white"
                  />
                </div>
              </div>
              <div>
                <label className="block text-slate-400 mb-1">Hero Image URL</label>
                <input
                  type="url"
                  name="heroImage"
                  required
                  placeholder="https://images.unsplash.com/photo-..."
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white"
                />
              </div>
              <div className="flex items-center gap-6 pt-2">
                <label className="flex items-center gap-2 text-slate-300">
                  <input type="checkbox" name="featured" className="rounded bg-slate-900 border-slate-700" />
                  <span>Mark as Featured</span>
                </label>
                <label className="flex items-center gap-2 text-slate-300">
                  <input type="checkbox" name="bestseller" className="rounded bg-slate-900 border-slate-700" />
                  <span>Mark as Bestseller</span>
                </label>
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full py-2.5 bg-purple-600 hover:bg-purple-500 text-white font-bold rounded-xl shadow-lg shadow-purple-600/30 transition-all"
              >
                {loading ? 'Saving Course...' : 'Save & Publish Course'}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* 3. EDIT COURSE MODAL */}
      {editingCourse && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 overflow-y-auto">
          <div className="w-full max-w-xl glass-card rounded-2xl p-6 border border-purple-500/40 space-y-4 max-h-[90vh] overflow-y-auto my-8">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold text-white">Edit Course: {editingCourse.title}</h3>
              <button onClick={() => setEditingCourse(null)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleUpdateCourseSubmit} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-400 mb-1">Course Title</label>
                <input
                  type="text"
                  name="title"
                  defaultValue={editingCourse.title}
                  required
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white"
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-slate-400 mb-1">URL Slug</label>
                  <input
                    type="text"
                    name="slug"
                    defaultValue={editingCourse.slug}
                    required
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1">Category</label>
                  <select
                    name="categoryId"
                    defaultValue={editingCourse.categoryId}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white"
                  >
                    {categories.map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-slate-400 mb-1">Tagline</label>
                <input
                  type="text"
                  name="tagline"
                  defaultValue={editingCourse.tagline}
                  required
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white"
                />
              </div>
              <div>
                <label className="block text-slate-400 mb-1">Description</label>
                <textarea
                  name="description"
                  defaultValue={editingCourse.description}
                  required
                  rows={3}
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white"
                />
              </div>
              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="block text-slate-400 mb-1">Duration</label>
                  <input
                    type="text"
                    name="duration"
                    defaultValue={editingCourse.duration}
                    required
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1">Hours Count</label>
                  <input
                    type="number"
                    name="hoursCount"
                    defaultValue={editingCourse.hoursCount}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1">Mode</label>
                  <select
                    name="mode"
                    defaultValue={editingCourse.mode}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white"
                  >
                    <option value="Hybrid">Hybrid</option>
                    <option value="Online">Online</option>
                    <option value="Classroom">Classroom</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-slate-400 mb-1">Discounted Fees (₹)</label>
                  <input
                    type="number"
                    name="fees"
                    defaultValue={editingCourse.fees}
                    required
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1">Original Fees (₹)</label>
                  <input
                    type="number"
                    name="originalFees"
                    defaultValue={editingCourse.originalFees}
                    required
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white"
                  />
                </div>
              </div>
              <div>
                <label className="block text-slate-400 mb-1">Hero Image URL</label>
                <input
                  type="url"
                  name="heroImage"
                  defaultValue={editingCourse.heroImage}
                  required
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white"
                />
              </div>
              <div className="flex items-center gap-6 pt-2">
                <label className="flex items-center gap-2 text-slate-300">
                  <input
                    type="checkbox"
                    name="featured"
                    defaultChecked={editingCourse.featured}
                    className="rounded bg-slate-900 border-slate-700"
                  />
                  <span>Mark as Featured</span>
                </label>
                <label className="flex items-center gap-2 text-slate-300">
                  <input
                    type="checkbox"
                    name="bestseller"
                    defaultChecked={editingCourse.bestseller}
                    className="rounded bg-slate-900 border-slate-700"
                  />
                  <span>Mark as Bestseller</span>
                </label>
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full py-2.5 bg-purple-600 hover:bg-purple-500 text-white font-bold rounded-xl shadow-lg shadow-purple-600/30 transition-all"
              >
                {loading ? 'Updating Course...' : 'Save Course Changes'}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* 4. CREATE BATCH MODAL (NEW) */}
      {isBatchModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 overflow-y-auto">
          <div className="w-full max-w-xl glass-card rounded-2xl p-6 border border-purple-500/40 space-y-4 max-h-[90vh] overflow-y-auto my-8">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold text-white">Add Upcoming Batch Schedule</h3>
              <button onClick={() => setIsBatchModalOpen(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleCreateBatch} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-400 mb-1">Select Course Offering</label>
                <select
                  name="courseId"
                  required
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white"
                >
                  {courses.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.title} ({c.duration})
                    </option>
                  ))}
                </select>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-slate-400 mb-1">Batch Start Date</label>
                  <input
                    type="text"
                    name="startDate"
                    required
                    placeholder="e.g. Sept 28, 2026"
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1">Class Timings</label>
                  <input
                    type="text"
                    name="timing"
                    required
                    placeholder="e.g. 07:30 AM - 09:30 AM (Morning)"
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-slate-400 mb-1">Training Mode</label>
                  <select
                    name="mode"
                    defaultValue="Hybrid"
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white"
                  >
                    <option value="Hybrid">Hybrid</option>
                    <option value="Live Online">Live Online</option>
                    <option value="Offline Classroom">Offline Classroom</option>
                    <option value="Weekend Special">Weekend Special</option>
                  </select>
                </div>
                <div>
                  <label className="block text-slate-400 mb-1">Batch Status Badge</label>
                  <select
                    name="status"
                    defaultValue="Filling Fast"
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white font-bold"
                  >
                    <option value="Filling Fast">Filling Fast</option>
                    <option value="Admissions Open">Admissions Open</option>
                    <option value="Starting Next Week">Starting Next Week</option>
                    <option value="Weekend Batch">Weekend Batch</option>
                    <option value="Almost Full">Almost Full</option>
                    <option value="Seats Full">Seats Full</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-slate-400 mb-1">Total Seats</label>
                  <input
                    type="number"
                    name="seatsTotal"
                    defaultValue={20}
                    required
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1">Seats Available</label>
                  <input
                    type="number"
                    name="seatsAvailable"
                    defaultValue={5}
                    required
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white"
                  />
                </div>
              </div>
              <div>
                <label className="block text-slate-400 mb-1">Campus Location</label>
                <input
                  type="text"
                  name="campusLocation"
                  defaultValue="Main Campus - Tech Park HQ"
                  required
                  placeholder="e.g. Main Tech Park HQ / Indiranagar Hub / Online Live"
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white"
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full py-2.5 bg-purple-600 hover:bg-purple-500 text-white font-bold rounded-xl shadow-lg shadow-purple-600/30 transition-all"
              >
                {loading ? 'Creating Batch...' : 'Publish Batch Schedule'}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* 5. EDIT BATCH MODAL (NEW) */}
      {editingBatch && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 overflow-y-auto">
          <div className="w-full max-w-xl glass-card rounded-2xl p-6 border border-purple-500/40 space-y-4 max-h-[90vh] overflow-y-auto my-8">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold text-white">Edit Batch Schedule</h3>
              <button onClick={() => setEditingBatch(null)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleUpdateBatchSubmit} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-400 mb-1">Course</label>
                <select
                  name="courseId"
                  defaultValue={editingBatch.courseId}
                  required
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white"
                >
                  {courses.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.title} ({c.duration})
                    </option>
                  ))}
                </select>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-slate-400 mb-1">Batch Start Date</label>
                  <input
                    type="text"
                    name="startDate"
                    defaultValue={editingBatch.startDate}
                    required
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1">Class Timings</label>
                  <input
                    type="text"
                    name="timing"
                    defaultValue={editingBatch.timing}
                    required
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-slate-400 mb-1">Training Mode</label>
                  <select
                    name="mode"
                    defaultValue={editingBatch.mode}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white"
                  >
                    <option value="Hybrid">Hybrid</option>
                    <option value="Live Online">Live Online</option>
                    <option value="Offline Classroom">Offline Classroom</option>
                    <option value="Weekend Special">Weekend Special</option>
                  </select>
                </div>
                <div>
                  <label className="block text-slate-400 mb-1">Status</label>
                  <select
                    name="status"
                    defaultValue={editingBatch.status}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white font-bold"
                  >
                    <option value="Filling Fast">Filling Fast</option>
                    <option value="Admissions Open">Admissions Open</option>
                    <option value="Starting Next Week">Starting Next Week</option>
                    <option value="Weekend Batch">Weekend Batch</option>
                    <option value="Almost Full">Almost Full</option>
                    <option value="Seats Full">Seats Full</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-slate-400 mb-1">Total Seats</label>
                  <input
                    type="number"
                    name="seatsTotal"
                    defaultValue={editingBatch.seatsTotal}
                    required
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1">Seats Available</label>
                  <input
                    type="number"
                    name="seatsAvailable"
                    defaultValue={editingBatch.seatsAvailable}
                    required
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white"
                  />
                </div>
              </div>
              <div>
                <label className="block text-slate-400 mb-1">Campus Location</label>
                <input
                  type="text"
                  name="campusLocation"
                  defaultValue={editingBatch.campusLocation}
                  required
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white"
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full py-2.5 bg-purple-600 hover:bg-purple-500 text-white font-bold rounded-xl shadow-lg shadow-purple-600/30 transition-all"
              >
                {loading ? 'Updating Batch...' : 'Save Batch Changes'}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* 6. CREATE EVENT MODAL */}
      {isEventModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 overflow-y-auto">
          <div className="w-full max-w-xl glass-card rounded-2xl p-6 border border-cyan-500/40 space-y-4 max-h-[90vh] overflow-y-auto my-8">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold text-white">Create Masterclass / Event</h3>
              <button onClick={() => setIsEventModalOpen(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleCreateEvent} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-400 mb-1">Event Title</label>
                <input
                  type="text"
                  name="title"
                  required
                  placeholder="e.g. Building Production RAG Systems with LangChain"
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white"
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-slate-400 mb-1">URL Slug</label>
                  <input
                    type="text"
                    name="slug"
                    required
                    placeholder="production-rag-masterclass"
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1">Category</label>
                  <select
                    name="category"
                    defaultValue="Masterclass"
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white"
                  >
                    <option value="Masterclass">Masterclass</option>
                    <option value="Workshop">Workshop</option>
                    <option value="Hackathon">Hackathon</option>
                    <option value="Webinar">Webinar</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-slate-400 mb-1">Tagline</label>
                <input
                  type="text"
                  name="tagline"
                  required
                  placeholder="Hands-on live coding workshop with real vector database indexing"
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white"
                />
              </div>
              <div>
                <label className="block text-slate-400 mb-1">Description</label>
                <textarea
                  name="description"
                  required
                  rows={2}
                  placeholder="Event overview, prerequisites, and learning outcomes..."
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white"
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-slate-400 mb-1">Event Date</label>
                  <input
                    type="text"
                    name="eventDate"
                    required
                    placeholder="e.g. Sept 20, 2026"
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1">Event Time</label>
                  <input
                    type="text"
                    name="eventTime"
                    required
                    placeholder="e.g. 6:30 PM - 8:30 PM IST"
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-slate-400 mb-1">Venue / Mode</label>
                  <input
                    type="text"
                    name="venue"
                    required
                    placeholder="Zoom Live / Main Campus Auditorium"
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1">Mode</label>
                  <select
                    name="mode"
                    defaultValue="Live Online"
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white"
                  >
                    <option value="Live Online">Live Online</option>
                    <option value="In-Person">In-Person</option>
                    <option value="Hybrid">Hybrid</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-slate-400 mb-1">Speaker Name</label>
                  <input
                    type="text"
                    name="speakerName"
                    required
                    placeholder="e.g. Rajesh Sharma"
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1">Speaker Role</label>
                  <input
                    type="text"
                    name="speakerRole"
                    required
                    placeholder="e.g. Ex-Microsoft AI Architect"
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-slate-400 mb-1">Speaker Photo URL</label>
                  <input
                    type="url"
                    name="speakerPhoto"
                    required
                    placeholder="https://images.unsplash.com/..."
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1">Banner Image URL</label>
                  <input
                    type="url"
                    name="bannerImage"
                    required
                    placeholder="https://images.unsplash.com/..."
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white"
                  />
                </div>
              </div>
              <div>
                <label className="block text-slate-400 mb-1">Speaker Bio</label>
                <input
                  type="text"
                  name="speakerBio"
                  required
                  placeholder="12+ years building distributed cloud & AI systems."
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white"
                />
              </div>
              <div className="pt-1">
                <label className="flex items-center gap-2 text-slate-300">
                  <input type="checkbox" name="isPastEvent" className="rounded bg-slate-900 border-slate-700" />
                  <span>Mark as Past Event (Move to Event Gallery)</span>
                </label>
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full py-2.5 bg-cyan-600 hover:bg-cyan-500 text-white font-bold rounded-xl shadow-lg shadow-cyan-600/30 transition-all"
              >
                {loading ? 'Creating Event...' : 'Publish Event'}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* 7. EDIT EVENT MODAL */}
      {editingEvent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 overflow-y-auto">
          <div className="w-full max-w-xl glass-card rounded-2xl p-6 border border-cyan-500/40 space-y-4 max-h-[90vh] overflow-y-auto my-8">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold text-white">Edit Event: {editingEvent.title}</h3>
              <button onClick={() => setEditingEvent(null)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleUpdateEventSubmit} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-400 mb-1">Event Title</label>
                <input
                  type="text"
                  name="title"
                  defaultValue={editingEvent.title}
                  required
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white"
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-slate-400 mb-1">URL Slug</label>
                  <input
                    type="text"
                    name="slug"
                    defaultValue={editingEvent.slug}
                    required
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1">Category</label>
                  <select
                    name="category"
                    defaultValue={editingEvent.category}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white"
                  >
                    <option value="Masterclass">Masterclass</option>
                    <option value="Workshop">Workshop</option>
                    <option value="Hackathon">Hackathon</option>
                    <option value="Webinar">Webinar</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-slate-400 mb-1">Tagline</label>
                <input
                  type="text"
                  name="tagline"
                  defaultValue={editingEvent.tagline}
                  required
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white"
                />
              </div>
              <div>
                <label className="block text-slate-400 mb-1">Description</label>
                <textarea
                  name="description"
                  defaultValue={editingEvent.description}
                  required
                  rows={2}
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white"
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-slate-400 mb-1">Event Date</label>
                  <input
                    type="text"
                    name="eventDate"
                    defaultValue={editingEvent.eventDate}
                    required
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1">Event Time</label>
                  <input
                    type="text"
                    name="eventTime"
                    defaultValue={editingEvent.eventTime}
                    required
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-slate-400 mb-1">Venue</label>
                  <input
                    type="text"
                    name="venue"
                    defaultValue={editingEvent.venue}
                    required
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1">Mode</label>
                  <select
                    name="mode"
                    defaultValue={editingEvent.mode}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white"
                  >
                    <option value="Live Online">Live Online</option>
                    <option value="In-Person">In-Person</option>
                    <option value="Hybrid">Hybrid</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-slate-400 mb-1">Speaker Name</label>
                  <input
                    type="text"
                    name="speakerName"
                    defaultValue={editingEvent.speakerName}
                    required
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1">Speaker Role</label>
                  <input
                    type="text"
                    name="speakerRole"
                    defaultValue={editingEvent.speakerRole}
                    required
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-slate-400 mb-1">Speaker Photo URL</label>
                  <input
                    type="url"
                    name="speakerPhoto"
                    defaultValue={editingEvent.speakerPhoto}
                    required
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1">Banner Image URL</label>
                  <input
                    type="url"
                    name="bannerImage"
                    defaultValue={editingEvent.bannerImage}
                    required
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white"
                  />
                </div>
              </div>
              <div>
                <label className="block text-slate-400 mb-1">Speaker Bio</label>
                <input
                  type="text"
                  name="speakerBio"
                  defaultValue={editingEvent.speakerBio}
                  required
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white"
                />
              </div>
              <div className="pt-1">
                <label className="flex items-center gap-2 text-slate-300">
                  <input
                    type="checkbox"
                    name="isPastEvent"
                    defaultChecked={editingEvent.isPastEvent}
                    className="rounded bg-slate-900 border-slate-700"
                  />
                  <span>Mark as Past Event</span>
                </label>
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full py-2.5 bg-cyan-600 hover:bg-cyan-500 text-white font-bold rounded-xl shadow-lg shadow-cyan-600/30 transition-all"
              >
                {loading ? 'Updating Event...' : 'Save Event Changes'}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* 8. CREATE BLOG MODAL */}
      {isBlogModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 overflow-y-auto">
          <div className="w-full max-w-xl glass-card rounded-2xl p-6 border border-blue-500/40 space-y-4 max-h-[90vh] overflow-y-auto my-8">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold text-white">Publish Tech Article</h3>
              <button onClick={() => setIsBlogModalOpen(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleCreateBlog} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-400 mb-1">Article Title</label>
                <input
                  type="text"
                  name="title"
                  required
                  placeholder="e.g. Next.js 15 Server Actions & Vector Embeddings Architecture"
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white"
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-slate-400 mb-1">URL Slug</label>
                  <input
                    type="text"
                    name="slug"
                    required
                    placeholder="nextjs-15-server-actions-vector-embeddings"
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1">Category</label>
                  <select
                    name="category"
                    defaultValue="AI"
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white"
                  >
                    <option value="AI">AI</option>
                    <option value="Programming">Programming</option>
                    <option value="Cyber Security">Cyber Security</option>
                    <option value="Cloud">Cloud</option>
                    <option value="Testing">Testing</option>
                    <option value="Career Guidance">Career Guidance</option>
                    <option value="Digital Marketing">Digital Marketing</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-slate-400 mb-1">Short Excerpt (Summary)</label>
                <textarea
                  name="excerpt"
                  required
                  rows={2}
                  placeholder="2-3 sentence overview of what students will learn..."
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white"
                />
              </div>
              <div>
                <label className="block text-slate-400 mb-1">Article Content (Markdown supported)</label>
                <textarea
                  name="content"
                  required
                  rows={5}
                  placeholder="Full markdown formatted technical guide..."
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white font-mono"
                />
              </div>
              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="block text-slate-400 mb-1">Author Name</label>
                  <input
                    type="text"
                    name="authorName"
                    required
                    placeholder="Dr. Aditya Rao"
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1">Author Role</label>
                  <input
                    type="text"
                    name="authorRole"
                    required
                    placeholder="Head of AI Research"
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1">Read Time</label>
                  <input
                    type="text"
                    name="readTime"
                    defaultValue="6 min read"
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-slate-400 mb-1">Author Photo URL</label>
                  <input
                    type="url"
                    name="authorPhoto"
                    required
                    placeholder="https://images.unsplash.com/..."
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1">Cover Image URL</label>
                  <input
                    type="url"
                    name="featuredImage"
                    required
                    placeholder="https://images.unsplash.com/..."
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white"
                  />
                </div>
              </div>
              <div className="pt-1">
                <label className="flex items-center gap-2 text-slate-300">
                  <input type="checkbox" name="isFeatured" className="rounded bg-slate-900 border-slate-700" />
                  <span>Mark as Featured Article</span>
                </label>
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl shadow-lg shadow-blue-600/30 transition-all"
              >
                {loading ? 'Publishing...' : 'Publish Blog Post'}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* 9. EDIT BLOG MODAL */}
      {editingBlog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 overflow-y-auto">
          <div className="w-full max-w-xl glass-card rounded-2xl p-6 border border-blue-500/40 space-y-4 max-h-[90vh] overflow-y-auto my-8">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold text-white">Edit Article: {editingBlog.title}</h3>
              <button onClick={() => setEditingBlog(null)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleUpdateBlogSubmit} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-400 mb-1">Article Title</label>
                <input
                  type="text"
                  name="title"
                  defaultValue={editingBlog.title}
                  required
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white"
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-slate-400 mb-1">URL Slug</label>
                  <input
                    type="text"
                    name="slug"
                    defaultValue={editingBlog.slug}
                    required
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1">Category</label>
                  <select
                    name="category"
                    defaultValue={editingBlog.category}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white"
                  >
                    <option value="AI">AI</option>
                    <option value="Programming">Programming</option>
                    <option value="Cyber Security">Cyber Security</option>
                    <option value="Cloud">Cloud</option>
                    <option value="Testing">Testing</option>
                    <option value="Career Guidance">Career Guidance</option>
                    <option value="Digital Marketing">Digital Marketing</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-slate-400 mb-1">Excerpt</label>
                <textarea
                  name="excerpt"
                  defaultValue={editingBlog.excerpt}
                  required
                  rows={2}
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white"
                />
              </div>
              <div>
                <label className="block text-slate-400 mb-1">Content</label>
                <textarea
                  name="content"
                  defaultValue={editingBlog.content}
                  required
                  rows={5}
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white font-mono"
                />
              </div>
              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="block text-slate-400 mb-1">Author Name</label>
                  <input
                    type="text"
                    name="authorName"
                    defaultValue={editingBlog.authorName}
                    required
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1">Author Role</label>
                  <input
                    type="text"
                    name="authorRole"
                    defaultValue={editingBlog.authorRole}
                    required
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1">Read Time</label>
                  <input
                    type="text"
                    name="readTime"
                    defaultValue={editingBlog.readTime}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-slate-400 mb-1">Author Photo URL</label>
                  <input
                    type="url"
                    name="authorPhoto"
                    defaultValue={editingBlog.authorPhoto}
                    required
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1">Cover Image URL</label>
                  <input
                    type="url"
                    name="featuredImage"
                    defaultValue={editingBlog.featuredImage}
                    required
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white"
                  />
                </div>
              </div>
              <div className="pt-1">
                <label className="flex items-center gap-2 text-slate-300">
                  <input
                    type="checkbox"
                    name="isFeatured"
                    defaultChecked={editingBlog.isFeatured}
                    className="rounded bg-slate-900 border-slate-700"
                  />
                  <span>Mark as Featured</span>
                </label>
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl shadow-lg shadow-blue-600/30 transition-all"
              >
                {loading ? 'Updating...' : 'Save Article Changes'}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* 10. CREATE CAMPUS MODAL */}
      {isCampusModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 overflow-y-auto">
          <div className="w-full max-w-xl glass-card rounded-2xl p-6 border border-purple-500/40 space-y-4 max-h-[90vh] overflow-y-auto my-8">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold text-white">Add Academy Campus Branch</h3>
              <button onClick={() => setIsCampusModalOpen(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleCreateCampus} className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-slate-400 mb-1">Campus Name</label>
                  <input
                    type="text"
                    name="name"
                    required
                    placeholder="e.g. Bengaluru Innovation Hub"
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1">URL Slug</label>
                  <input
                    type="text"
                    name="slug"
                    required
                    placeholder="bengaluru-innovation-hub"
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-slate-400 mb-1">City</label>
                  <input
                    type="text"
                    name="city"
                    required
                    placeholder="Bengaluru"
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1">Branch Type</label>
                  <select
                    name="type"
                    defaultValue="Regional Branch"
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white"
                  >
                    <option value="Headquarters">Headquarters</option>
                    <option value="Regional Branch">Regional Branch</option>
                    <option value="Innovation Hub">Innovation Hub</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-slate-400 mb-1">Full Physical Address</label>
                <textarea
                  name="address"
                  required
                  rows={2}
                  placeholder="Plot No. 12, Indiranagar 100ft Road, Bengaluru - 560038"
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white"
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-slate-400 mb-1">Phone Number</label>
                  <input
                    type="text"
                    name="phone"
                    required
                    placeholder="+91 800-999-8800"
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    required
                    placeholder="bengaluru@nexgentechacademy.com"
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-slate-400 mb-1">Working Hours</label>
                  <input
                    type="text"
                    name="workingHours"
                    defaultValue="Mon - Sun: 8:00 AM - 9:00 PM"
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1">Landmarks</label>
                  <input
                    type="text"
                    name="landmarks"
                    required
                    placeholder="Near Indiranagar Metro Station"
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white"
                  />
                </div>
              </div>
              <div>
                <label className="block text-slate-400 mb-1">Google Maps Embed URL</label>
                <input
                  type="text"
                  name="mapEmbedUrl"
                  required
                  placeholder="https://maps.google.com/..."
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white"
                />
              </div>
              <div>
                <label className="block text-slate-400 mb-1">Campus Cover Image URL</label>
                <input
                  type="url"
                  name="coverImage"
                  required
                  placeholder="https://images.unsplash.com/..."
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white"
                />
              </div>
              <div className="pt-1">
                <label className="flex items-center gap-2 text-slate-300">
                  <input type="checkbox" name="isMain" className="rounded bg-slate-900 border-slate-700" />
                  <span>Set as Main Academy Headquarters</span>
                </label>
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full py-2.5 bg-purple-600 hover:bg-purple-500 text-white font-bold rounded-xl shadow-lg shadow-purple-600/30 transition-all"
              >
                {loading ? 'Creating Branch...' : 'Create Campus Branch'}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* 11. EDIT CAMPUS MODAL */}
      {editingCampus && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 overflow-y-auto">
          <div className="w-full max-w-xl glass-card rounded-2xl p-6 border border-purple-500/40 space-y-4 max-h-[90vh] overflow-y-auto my-8">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold text-white">Edit Branch: {editingCampus.name}</h3>
              <button onClick={() => setEditingCampus(null)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleUpdateCampusSubmit} className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-slate-400 mb-1">Campus Name</label>
                  <input
                    type="text"
                    name="name"
                    defaultValue={editingCampus.name}
                    required
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1">URL Slug</label>
                  <input
                    type="text"
                    name="slug"
                    defaultValue={editingCampus.slug}
                    required
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-slate-400 mb-1">City</label>
                  <input
                    type="text"
                    name="city"
                    defaultValue={editingCampus.city}
                    required
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1">Branch Type</label>
                  <select
                    name="type"
                    defaultValue={editingCampus.type}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white"
                  >
                    <option value="Headquarters">Headquarters</option>
                    <option value="Regional Branch">Regional Branch</option>
                    <option value="Innovation Hub">Innovation Hub</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-slate-400 mb-1">Address</label>
                <textarea
                  name="address"
                  defaultValue={editingCampus.address}
                  required
                  rows={2}
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white"
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-slate-400 mb-1">Phone Number</label>
                  <input
                    type="text"
                    name="phone"
                    defaultValue={editingCampus.phone}
                    required
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1">Email</label>
                  <input
                    type="email"
                    name="email"
                    defaultValue={editingCampus.email}
                    required
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-slate-400 mb-1">Working Hours</label>
                  <input
                    type="text"
                    name="workingHours"
                    defaultValue={editingCampus.workingHours}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1">Landmarks</label>
                  <input
                    type="text"
                    name="landmarks"
                    defaultValue={editingCampus.landmarks}
                    required
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white"
                  />
                </div>
              </div>
              <div>
                <label className="block text-slate-400 mb-1">Google Maps Embed URL</label>
                <input
                  type="text"
                  name="mapEmbedUrl"
                  defaultValue={editingCampus.mapEmbedUrl}
                  required
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white"
                />
              </div>
              <div>
                <label className="block text-slate-400 mb-1">Campus Cover Image URL</label>
                <input
                  type="url"
                  name="coverImage"
                  defaultValue={editingCampus.coverImage}
                  required
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white"
                />
              </div>
              <div className="pt-1">
                <label className="flex items-center gap-2 text-slate-300">
                  <input
                    type="checkbox"
                    name="isMain"
                    defaultChecked={editingCampus.isMain}
                    className="rounded bg-slate-900 border-slate-700"
                  />
                  <span>Main Headquarters</span>
                </label>
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full py-2.5 bg-purple-600 hover:bg-purple-500 text-white font-bold rounded-xl shadow-lg shadow-purple-600/30 transition-all"
              >
                {loading ? 'Updating Branch...' : 'Save Branch Changes'}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* 12. CREATE HIRING DRIVE MODAL */}
      {isDriveModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 overflow-y-auto">
          <div className="w-full max-w-xl glass-card rounded-2xl p-6 border border-emerald-500/40 space-y-4 max-h-[90vh] overflow-y-auto my-8">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold text-white">Create Placement / Hiring Drive</h3>
              <button onClick={() => setIsDriveModalOpen(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleCreateDrive} className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-slate-400 mb-1">Company Name</label>
                  <input
                    type="text"
                    name="companyName"
                    required
                    placeholder="e.g. Amazon AWS Partner Network"
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1">URL Slug</label>
                  <input
                    type="text"
                    name="slug"
                    required
                    placeholder="amazon-aws-cloud-drive-2026"
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-slate-400 mb-1">Job Role / Designation</label>
                  <input
                    type="text"
                    name="role"
                    required
                    placeholder="e.g. Cloud Security & DevOps Engineer"
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1">Package CTC (LPA)</label>
                  <input
                    type="text"
                    name="packageLpa"
                    required
                    placeholder="e.g. 8.0 - 15.0 LPA"
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white"
                  />
                </div>
              </div>
              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="block text-slate-400 mb-1">Drive Status</label>
                  <select
                    name="status"
                    defaultValue="ACTIVE"
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white font-bold"
                  >
                    <option value="ACTIVE">ACTIVE (Accepting Applications)</option>
                    <option value="UPCOMING">UPCOMING (Opening Soon)</option>
                    <option value="COMPLETED">COMPLETED</option>
                    <option value="CLOSED">CLOSED</option>
                  </select>
                </div>
                <div>
                  <label className="block text-slate-400 mb-1">Open Positions</label>
                  <input
                    type="number"
                    name="openPositions"
                    defaultValue={15}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1">Job Type</label>
                  <select
                    name="jobType"
                    defaultValue="Full-Time"
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white"
                  >
                    <option value="Full-Time">Full-Time</option>
                    <option value="Internship + PPO">Internship + PPO</option>
                    <option value="Contract">Contract</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-slate-400 mb-1">Drive Date</label>
                  <input
                    type="text"
                    name="driveDate"
                    required
                    placeholder="e.g. 2026-10-15"
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1">Application Deadline</label>
                  <input
                    type="text"
                    name="registrationDeadline"
                    required
                    placeholder="e.g. 2026-10-10"
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-slate-400 mb-1">Job Location</label>
                  <input
                    type="text"
                    name="location"
                    required
                    placeholder="Hyderabad / Bengaluru / Remote"
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1">Experience Required</label>
                  <input
                    type="text"
                    name="experience"
                    defaultValue="Fresher - 2 Yrs"
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white"
                  />
                </div>
              </div>
              <div>
                <label className="block text-slate-400 mb-1">Eligibility Criteria</label>
                <input
                  type="text"
                  name="eligibility"
                  required
                  placeholder="e.g. NexGen Academy Certified Students or B.Tech/MCA 2024-2026, Min 60%"
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white"
                />
              </div>
              <div>
                <label className="block text-slate-400 mb-1">Skills Required (Comma separated)</label>
                <input
                  type="text"
                  name="skills"
                  placeholder="AWS, Docker, Kubernetes, Python, Terraform, CI/CD"
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white"
                />
              </div>
              <div>
                <label className="block text-slate-400 mb-1">Company Logo URL</label>
                <input
                  type="url"
                  name="companyLogo"
                  required
                  placeholder="https://images.unsplash.com/..."
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white"
                />
              </div>
              <div>
                <label className="block text-slate-400 mb-1">Job & Drive Description</label>
                <textarea
                  name="description"
                  required
                  rows={2}
                  placeholder="Describe the interview rounds, role responsibilities, and selection procedure..."
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white"
                />
              </div>
              <div>
                <label className="block text-slate-400 mb-1">Custom Apply URL (Optional)</label>
                <input
                  type="url"
                  name="applyUrl"
                  placeholder="https://company.careers.page/..."
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white"
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl shadow-lg shadow-emerald-600/30 transition-all"
              >
                {loading ? 'Creating Drive...' : 'Publish Hiring Drive'}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* 13. EDIT HIRING DRIVE MODAL */}
      {editingDrive && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 overflow-y-auto">
          <div className="w-full max-w-xl glass-card rounded-2xl p-6 border border-emerald-500/40 space-y-4 max-h-[90vh] overflow-y-auto my-8">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold text-white">Edit Hiring Drive: {editingDrive.companyName}</h3>
              <button onClick={() => setEditingDrive(null)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleUpdateDriveSubmit} className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-slate-400 mb-1">Company Name</label>
                  <input
                    type="text"
                    name="companyName"
                    defaultValue={editingDrive.companyName}
                    required
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1">URL Slug</label>
                  <input
                    type="text"
                    name="slug"
                    defaultValue={editingDrive.slug}
                    required
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-slate-400 mb-1">Job Role</label>
                  <input
                    type="text"
                    name="role"
                    defaultValue={editingDrive.role}
                    required
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1">Package CTC (LPA)</label>
                  <input
                    type="text"
                    name="packageLpa"
                    defaultValue={editingDrive.packageLpa}
                    required
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white"
                  />
                </div>
              </div>
              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="block text-slate-400 mb-1">Status</label>
                  <select
                    name="status"
                    defaultValue={editingDrive.status}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white font-bold"
                  >
                    <option value="ACTIVE">ACTIVE (Accepting Applications)</option>
                    <option value="UPCOMING">UPCOMING (Opening Soon)</option>
                    <option value="COMPLETED">COMPLETED</option>
                    <option value="CLOSED">CLOSED</option>
                  </select>
                </div>
                <div>
                  <label className="block text-slate-400 mb-1">Open Positions</label>
                  <input
                    type="number"
                    name="openPositions"
                    defaultValue={editingDrive.openPositions}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1">Job Type</label>
                  <select
                    name="jobType"
                    defaultValue={editingDrive.jobType}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white"
                  >
                    <option value="Full-Time">Full-Time</option>
                    <option value="Internship + PPO">Internship + PPO</option>
                    <option value="Contract">Contract</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-slate-400 mb-1">Drive Date</label>
                  <input
                    type="text"
                    name="driveDate"
                    defaultValue={editingDrive.driveDate}
                    required
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1">Application Deadline</label>
                  <input
                    type="text"
                    name="registrationDeadline"
                    defaultValue={editingDrive.registrationDeadline}
                    required
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-slate-400 mb-1">Location</label>
                  <input
                    type="text"
                    name="location"
                    defaultValue={editingDrive.location}
                    required
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1">Experience</label>
                  <input
                    type="text"
                    name="experience"
                    defaultValue={editingDrive.experience}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white"
                  />
                </div>
              </div>
              <div>
                <label className="block text-slate-400 mb-1">Eligibility Criteria</label>
                <input
                  type="text"
                  name="eligibility"
                  defaultValue={editingDrive.eligibility}
                  required
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white"
                />
              </div>
              <div>
                <label className="block text-slate-400 mb-1">Skills (Comma separated)</label>
                <input
                  type="text"
                  name="skills"
                  defaultValue={
                    (() => {
                      try {
                        return JSON.parse(editingDrive.skillsRequiredJson || '[]').join(', ');
                      } catch (e) {
                        return '';
                      }
                    })()
                  }
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white"
                />
              </div>
              <div>
                <label className="block text-slate-400 mb-1">Company Logo URL</label>
                <input
                  type="url"
                  name="companyLogo"
                  defaultValue={editingDrive.companyLogo}
                  required
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white"
                />
              </div>
              <div>
                <label className="block text-slate-400 mb-1">Description</label>
                <textarea
                  name="description"
                  defaultValue={editingDrive.description}
                  required
                  rows={2}
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white"
                />
              </div>
              <div>
                <label className="block text-slate-400 mb-1">Custom Apply URL (Optional)</label>
                <input
                  type="url"
                  name="applyUrl"
                  defaultValue={editingDrive.applyUrl || ''}
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white"
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl shadow-lg shadow-emerald-600/30 transition-all"
              >
                {loading ? 'Saving Changes...' : 'Save Drive Changes'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
