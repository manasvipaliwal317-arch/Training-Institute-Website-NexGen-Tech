'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
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
  CheckCircle2,
  Search,
  Sparkles,
  Award,
  Layers,
  Wrench,
  ShieldCheck,
  X,
  Send,
} from 'lucide-react';
import {
  updateInquiryStatusAction,
  deleteInquiryAction,
  adminLogoutAction,
  createCourseAction,
  deleteCourseAction,
  createEventAction,
  deleteEventAction,
  createBlogAction,
  deleteBlogAction,
} from '@/app/actions';

interface AdminPanelProps {
  inquiries: any[];
  courses: any[];
  categories: any[];
  events: any[];
  blogs: any[];
  campuses: any[];
  userEmail: string;
}

export default function AdminPanel({
  inquiries: initialInquiries,
  courses: initialCourses,
  categories,
  events: initialEvents,
  blogs: initialBlogs,
  campuses,
  userEmail,
}: AdminPanelProps) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'analytics' | 'inquiries' | 'courses' | 'events' | 'blogs' | 'campuses'>('analytics');

  const [inquiries, setInquiries] = useState(initialInquiries);
  const [courses, setCourses] = useState(initialCourses);
  const [events, setEvents] = useState(initialEvents);
  const [blogs, setBlogs] = useState(initialBlogs);

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');

  // Modals
  const [isCourseModalOpen, setIsCourseModalOpen] = useState(false);
  const [isEventModalOpen, setIsEventModalOpen] = useState(false);
  const [isBlogModalOpen, setIsBlogModalOpen] = useState(false);

  const [loading, setLoading] = useState(false);
  const [actionError, setActionError] = useState('');

  async function handleLogout() {
    await adminLogoutAction();
    router.push('/admin/login');
  }

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

  async function handleDeleteCourse(id: string) {
    if (!confirm('Are you sure you want to delete this course offering?')) return;
    const res = await deleteCourseAction(id);
    if (res.success) {
      setCourses((prev) => prev.filter((item) => item.id !== id));
    }
  }

  async function handleDeleteEvent(id: string) {
    if (!confirm('Are you sure you want to delete this event?')) return;
    const res = await deleteEventAction(id);
    if (res.success) {
      setEvents((prev) => prev.filter((item) => item.id !== id));
    }
  }

  async function handleDeleteBlog(id: string) {
    if (!confirm('Are you sure you want to delete this blog post?')) return;
    const res = await deleteBlogAction(id);
    if (res.success) {
      setBlogs((prev) => prev.filter((item) => item.id !== id));
    }
  }

  async function handleCreateCourse(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setActionError('');
    const formData = new FormData(e.currentTarget);
    const res = await createCourseAction(formData);
    setLoading(false);
    if (res.success) {
      setIsCourseModalOpen(false);
      router.refresh();
    } else {
      setActionError(res.error || 'Failed to create course.');
    }
  }

  async function handleCreateEvent(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setActionError('');
    const formData = new FormData(e.currentTarget);
    const res = await createEventAction(formData);
    setLoading(false);
    if (res.success) {
      setIsEventModalOpen(false);
      router.refresh();
    } else {
      setActionError(res.error || 'Failed to create event.');
    }
  }

  async function handleCreateBlog(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setActionError('');
    const formData = new FormData(e.currentTarget);
    const res = await createBlogAction(formData);
    setLoading(false);
    if (res.success) {
      setIsBlogModalOpen(false);
      router.refresh();
    } else {
      setActionError(res.error || 'Failed to publish blog post.');
    }
  }

  const newLeads = inquiries.filter((i) => i.status === 'NEW').length;

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-12 gap-8 py-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Sidebar Navigation */}
      <div className="lg:col-span-3 space-y-4">
        <div className="glass-card rounded-2xl p-6 border border-purple-500/30 space-y-6">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase text-purple-400">
              <Sparkles className="w-3.5 h-3.5" /> Executive Portal
            </div>
            <h2 className="text-xl font-black text-white">Academy Admin</h2>
            <p className="text-[11px] text-slate-400 line-clamp-1">{userEmail}</p>
          </div>

          <nav className="space-y-1 text-xs font-semibold">
            <button
              onClick={() => setActiveTab('analytics')}
              className={`w-full px-4 py-3 rounded-xl flex items-center gap-2.5 transition-all ${
                activeTab === 'analytics'
                  ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/30'
                  : 'text-slate-300 hover:bg-slate-800/60'
              }`}
            >
              <LayoutDashboard className="w-4 h-4" /> Overview Analytics
            </button>

            <button
              onClick={() => setActiveTab('inquiries')}
              className={`w-full px-4 py-3 rounded-xl flex items-center justify-between transition-all ${
                activeTab === 'inquiries'
                  ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/30'
                  : 'text-slate-300 hover:bg-slate-800/60'
              }`}
            >
              <span className="flex items-center gap-2.5">
                <Users className="w-4 h-4" /> Manage Inquiries
              </span>
              {newLeads > 0 && (
                <span className="px-2 py-0.5 rounded-full bg-blue-500 text-white font-bold text-[10px]">
                  {newLeads}
                </span>
              )}
            </button>

            <button
              onClick={() => setActiveTab('courses')}
              className={`w-full px-4 py-3 rounded-xl flex items-center gap-2.5 transition-all ${
                activeTab === 'courses'
                  ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/30'
                  : 'text-slate-300 hover:bg-slate-800/60'
              }`}
            >
              <BookOpen className="w-4 h-4" /> Manage Courses ({courses.length})
            </button>

            <button
              onClick={() => setActiveTab('events')}
              className={`w-full px-4 py-3 rounded-xl flex items-center gap-2.5 transition-all ${
                activeTab === 'events'
                  ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/30'
                  : 'text-slate-300 hover:bg-slate-800/60'
              }`}
            >
              <Calendar className="w-4 h-4" /> Manage Events ({events.length})
            </button>

            <button
              onClick={() => setActiveTab('blogs')}
              className={`w-full px-4 py-3 rounded-xl flex items-center gap-2.5 transition-all ${
                activeTab === 'blogs'
                  ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/30'
                  : 'text-slate-300 hover:bg-slate-800/60'
              }`}
            >
              <FileText className="w-4 h-4" /> Manage Blogs ({blogs.length})
            </button>

            <button
              onClick={() => setActiveTab('campuses')}
              className={`w-full px-4 py-3 rounded-xl flex items-center gap-2.5 transition-all ${
                activeTab === 'campuses'
                  ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/30'
                  : 'text-slate-300 hover:bg-slate-800/60'
              }`}
            >
              <Building2 className="w-4 h-4" /> Campus Branches ({campuses.length})
            </button>
          </nav>

          <div className="pt-4 border-t border-slate-800">
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
      <div className="lg:col-span-9 space-y-8">
        {/* Tab 1: Overview Analytics */}
        {activeTab === 'analytics' && (
          <div className="space-y-8 animate-in fade-in duration-200">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="glass-card rounded-2xl p-5 border border-slate-800 space-y-1">
                <span className="text-xs text-slate-400 block font-medium">Total Inquiries</span>
                <span className="text-3xl font-black text-white">{inquiries.length}</span>
              </div>
              <div className="glass-card rounded-2xl p-5 border border-slate-800 space-y-1">
                <span className="text-xs text-slate-400 block font-medium">New Leads</span>
                <span className="text-3xl font-black text-blue-400">{newLeads}</span>
              </div>
              <div className="glass-card rounded-2xl p-5 border border-slate-800 space-y-1">
                <span className="text-xs text-slate-400 block font-medium">Active Courses</span>
                <span className="text-3xl font-black text-purple-400">{courses.length}</span>
              </div>
              <div className="glass-card rounded-2xl p-5 border border-slate-800 space-y-1">
                <span className="text-xs text-slate-400 block font-medium">Upcoming Events</span>
                <span className="text-3xl font-black text-emerald-400">{events.length}</span>
              </div>
            </div>

            <div className="glass-card rounded-2xl p-8 border border-slate-800 space-y-4">
              <h3 className="text-xl font-bold text-white">Recent Student Inquiries</h3>
              <div className="space-y-3">
                {inquiries.slice(0, 5).map((inq) => (
                  <div key={inq.id} className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between text-xs">
                    <div>
                      <span className="font-bold text-white text-sm block">{inq.name}</span>
                      <span className="text-slate-400">{inq.courseName || 'General Inquiry'} • {inq.phone}</span>
                    </div>
                    <span className="px-3 py-1 rounded bg-blue-600/20 text-blue-400 font-bold">{inq.status}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Manage Inquiries */}
        {activeTab === 'inquiries' && (
          <div className="glass-card rounded-2xl p-6 sm:p-8 border border-slate-800 space-y-6">
            <h2 className="text-2xl font-extrabold text-white">Manage Student Leads</h2>

            <div className="overflow-x-auto border border-slate-800 rounded-xl">
              <table className="w-full text-left text-xs text-slate-300">
                <thead className="bg-slate-900 text-slate-400 uppercase font-semibold text-[11px] border-b border-slate-800">
                  <tr>
                    <th className="p-4">Student</th>
                    <th className="p-4">Course</th>
                    <th className="p-4">Mode</th>
                    <th className="p-4">Status & Action</th>
                    <th className="p-4">Delete</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                  {inquiries.map((inq) => (
                    <tr key={inq.id} className="hover:bg-slate-900/50">
                      <td className="p-4">
                        <div className="font-bold text-white">{inq.name}</div>
                        <div className="text-slate-400">{inq.email} | {inq.phone}</div>
                      </td>
                      <td className="p-4 font-semibold text-purple-300">{inq.courseName || 'General'}</td>
                      <td className="p-4">{inq.preferredMode}</td>
                      <td className="p-4">
                        <select
                          value={inq.status}
                          onChange={(e) => handleStatusChange(inq.id, e.target.value)}
                          className="px-3 py-1 rounded bg-slate-900 border border-slate-700 text-xs font-bold text-blue-400"
                        >
                          <option value="NEW">NEW</option>
                          <option value="CONTACTED">CONTACTED</option>
                          <option value="ENROLLED">ENROLLED</option>
                          <option value="CLOSED">CLOSED</option>
                        </select>
                      </td>
                      <td className="p-4">
                        <button
                          onClick={() => handleDeleteInquiry(inq.id)}
                          className="p-2 rounded-lg bg-red-950/40 text-red-400 hover:bg-red-900/60"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 3: Manage Courses (CRUD) */}
        {activeTab === 'courses' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-extrabold text-white">Course Offerings ({courses.length})</h2>
              <button
                onClick={() => setIsCourseModalOpen(true)}
                className="px-4 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-semibold text-xs flex items-center gap-2 shadow-lg shadow-purple-600/20"
              >
                <Plus className="w-4 h-4" /> Add New Course
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {courses.map((c) => (
                <div key={c.id} className="glass-card rounded-xl p-5 border border-slate-800 flex items-start justify-between gap-4">
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold text-blue-400 uppercase">{c.category?.name || 'Tech Program'}</span>
                    <h3 className="font-bold text-white text-base leading-snug">{c.title}</h3>
                    <p className="text-xs text-slate-400">{c.duration} • ₹{c.fees?.toLocaleString()}</p>
                  </div>
                  <button
                    onClick={() => handleDeleteCourse(c.id)}
                    className="p-2 rounded-lg bg-red-950/40 text-red-400 hover:bg-red-900/60 shrink-0"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 4: Manage Events (CRUD) */}
        {activeTab === 'events' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-extrabold text-white">Workshops & Events ({events.length})</h2>
              <button
                onClick={() => setIsEventModalOpen(true)}
                className="px-4 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-semibold text-xs flex items-center gap-2 shadow-lg shadow-cyan-600/20"
              >
                <Plus className="w-4 h-4" /> Create New Event
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {events.map((ev) => (
                <div key={ev.id} className="glass-card rounded-xl p-5 border border-slate-800 flex items-start justify-between gap-4">
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold text-cyan-400 uppercase">{ev.category} • {ev.mode}</span>
                    <h3 className="font-bold text-white text-base leading-snug">{ev.title}</h3>
                    <p className="text-xs text-slate-400">{ev.eventDate} • Speaker: {ev.speakerName}</p>
                  </div>
                  <button
                    onClick={() => handleDeleteEvent(ev.id)}
                    className="p-2 rounded-lg bg-red-950/40 text-red-400 hover:bg-red-900/60 shrink-0"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 5: Manage Blogs (CRUD) */}
        {activeTab === 'blogs' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-extrabold text-white">Tech Blog Articles ({blogs.length})</h2>
              <button
                onClick={() => setIsBlogModalOpen(true)}
                className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs flex items-center gap-2 shadow-lg shadow-blue-600/20"
              >
                <Plus className="w-4 h-4" /> Publish Blog Post
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {blogs.map((b) => (
                <div key={b.id} className="glass-card rounded-xl p-5 border border-slate-800 flex items-start justify-between gap-4">
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold text-blue-400 uppercase">{b.category}</span>
                    <h3 className="font-bold text-white text-base leading-snug">{b.title}</h3>
                    <p className="text-xs text-slate-400">By {b.authorName} • {b.readTime}</p>
                  </div>
                  <button
                    onClick={() => handleDeleteBlog(b.id)}
                    className="p-2 rounded-lg bg-red-950/40 text-red-400 hover:bg-red-900/60 shrink-0"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 6: Campuses */}
        {activeTab === 'campuses' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-extrabold text-white">Academy Campus Branches</h2>
            <div className="grid grid-cols-1 gap-4">
              {campuses.map((camp) => (
                <div key={camp.id} className="glass-card rounded-xl p-6 border border-slate-800 space-y-2">
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold text-white text-lg">{camp.name}</h3>
                    <span className="px-3 py-1 rounded bg-blue-600/20 text-blue-400 text-xs font-bold">{camp.type}</span>
                  </div>
                  <p className="text-xs text-slate-400">{camp.address}</p>
                  <p className="text-xs text-emerald-400 font-semibold">{camp.phone} • {camp.email}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Create Course Modal */}
      {isCourseModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4">
          <div className="w-full max-w-lg glass-card rounded-2xl p-6 border border-purple-500/30 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold text-white">Add New Course Offering</h3>
              <button onClick={() => setIsCourseModalOpen(false)} className="text-slate-400 hover:text-white"><X className="w-5 h-5" /></button>
            </div>
            {actionError && <div className="p-2 bg-red-950/40 border border-red-500/30 text-red-400 text-xs rounded">{actionError}</div>}
            <form onSubmit={handleCreateCourse} className="space-y-3 text-xs">
              <input type="text" name="title" required placeholder="Course Title (e.g. Master in Agentic AI)" className="w-full px-3 py-2 rounded bg-slate-900 border border-slate-700 text-white" />
              <input type="text" name="slug" required placeholder="URL Slug (e.g. master-agentic-ai)" className="w-full px-3 py-2 rounded bg-slate-900 border border-slate-700 text-white" />
              <input type="text" name="tagline" required placeholder="Catchy Tagline" className="w-full px-3 py-2 rounded bg-slate-900 border border-slate-700 text-white" />
              <textarea name="description" required placeholder="Detailed Course Description" rows={2} className="w-full px-3 py-2 rounded bg-slate-900 border border-slate-700 text-white" />
              <select name="categoryId" className="w-full px-3 py-2 rounded bg-slate-900 border border-slate-700 text-white">
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>{cat.name}</option>
                ))}
              </select>
              <div className="grid grid-cols-2 gap-2">
                <input type="text" name="duration" required placeholder="Duration (e.g. 5 Months)" className="w-full px-3 py-2 rounded bg-slate-900 border border-slate-700 text-white" />
                <input type="number" name="fees" required placeholder="Fees (e.g. 45000)" className="w-full px-3 py-2 rounded bg-slate-900 border border-slate-700 text-white" />
              </div>
              <input type="url" name="heroImage" required placeholder="Hero Image URL (Unsplash image link)" className="w-full px-3 py-2 rounded bg-slate-900 border border-slate-700 text-white" />
              <button type="submit" disabled={loading} className="w-full py-2.5 bg-purple-600 text-white font-bold rounded shadow-lg shadow-purple-600/30">
                {loading ? 'Saving...' : 'Save Course'}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Create Event Modal */}
      {isEventModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4">
          <div className="w-full max-w-lg glass-card rounded-2xl p-6 border border-cyan-500/30 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold text-white">Create Masterclass or Event</h3>
              <button onClick={() => setIsEventModalOpen(false)} className="text-slate-400 hover:text-white"><X className="w-5 h-5" /></button>
            </div>
            {actionError && <div className="p-2 bg-red-950/40 border border-red-500/30 text-red-400 text-xs rounded">{actionError}</div>}
            <form onSubmit={handleCreateEvent} className="space-y-3 text-xs">
              <input type="text" name="title" required placeholder="Event Title" className="w-full px-3 py-2 rounded bg-slate-900 border border-slate-700 text-white" />
              <input type="text" name="slug" required placeholder="URL Slug (e.g. ai-summit-2026)" className="w-full px-3 py-2 rounded bg-slate-900 border border-slate-700 text-white" />
              <input type="text" name="tagline" required placeholder="Tagline" className="w-full px-3 py-2 rounded bg-slate-900 border border-slate-700 text-white" />
              <textarea name="description" required placeholder="Description" rows={2} className="w-full px-3 py-2 rounded bg-slate-900 border border-slate-700 text-white" />
              <div className="grid grid-cols-2 gap-2">
                <input type="text" name="eventDate" required placeholder="Date (e.g. Sept 15, 2026)" className="w-full px-3 py-2 rounded bg-slate-900 border border-slate-700 text-white" />
                <input type="text" name="eventTime" required placeholder="Time (e.g. 6:00 PM IST)" className="w-full px-3 py-2 rounded bg-slate-900 border border-slate-700 text-white" />
              </div>
              <input type="text" name="venue" required placeholder="Venue / Platform" className="w-full px-3 py-2 rounded bg-slate-900 border border-slate-700 text-white" />
              <div className="grid grid-cols-2 gap-2">
                <input type="text" name="speakerName" required placeholder="Speaker Name" className="w-full px-3 py-2 rounded bg-slate-900 border border-slate-700 text-white" />
                <input type="text" name="speakerRole" required placeholder="Speaker Role" className="w-full px-3 py-2 rounded bg-slate-900 border border-slate-700 text-white" />
              </div>
              <input type="url" name="speakerPhoto" required placeholder="Speaker Photo URL" className="w-full px-3 py-2 rounded bg-slate-900 border border-slate-700 text-white" />
              <input type="text" name="speakerBio" required placeholder="Speaker Bio" className="w-full px-3 py-2 rounded bg-slate-900 border border-slate-700 text-white" />
              <input type="url" name="bannerImage" required placeholder="Banner Image URL" className="w-full px-3 py-2 rounded bg-slate-900 border border-slate-700 text-white" />
              <button type="submit" disabled={loading} className="w-full py-2.5 bg-cyan-600 text-white font-bold rounded shadow-lg shadow-cyan-600/30">
                {loading ? 'Saving...' : 'Save Event'}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Create Blog Modal */}
      {isBlogModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4">
          <div className="w-full max-w-lg glass-card rounded-2xl p-6 border border-blue-500/30 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold text-white">Publish Tech Article</h3>
              <button onClick={() => setIsBlogModalOpen(false)} className="text-slate-400 hover:text-white"><X className="w-5 h-5" /></button>
            </div>
            {actionError && <div className="p-2 bg-red-950/40 border border-red-500/30 text-red-400 text-xs rounded">{actionError}</div>}
            <form onSubmit={handleCreateBlog} className="space-y-3 text-xs">
              <input type="text" name="title" required placeholder="Article Title" className="w-full px-3 py-2 rounded bg-slate-900 border border-slate-700 text-white" />
              <input type="text" name="slug" required placeholder="URL Slug" className="w-full px-3 py-2 rounded bg-slate-900 border border-slate-700 text-white" />
              <select name="category" className="w-full px-3 py-2 rounded bg-slate-900 border border-slate-700 text-white">
                <option value="AI">AI</option>
                <option value="Programming">Programming</option>
                <option value="Cyber Security">Cyber Security</option>
                <option value="Cloud">Cloud</option>
                <option value="Testing">Testing</option>
                <option value="Career Guidance">Career Guidance</option>
                <option value="Digital Marketing">Digital Marketing</option>
              </select>
              <textarea name="excerpt" required placeholder="Short Excerpt" rows={2} className="w-full px-3 py-2 rounded bg-slate-900 border border-slate-700 text-white" />
              <textarea name="content" required placeholder="Markdown Article Content" rows={4} className="w-full px-3 py-2 rounded bg-slate-900 border border-slate-700 text-white" />
              <div className="grid grid-cols-2 gap-2">
                <input type="text" name="authorName" required placeholder="Author Name" className="w-full px-3 py-2 rounded bg-slate-900 border border-slate-700 text-white" />
                <input type="text" name="authorRole" required placeholder="Author Role" className="w-full px-3 py-2 rounded bg-slate-900 border border-slate-700 text-white" />
              </div>
              <input type="url" name="authorPhoto" required placeholder="Author Photo URL" className="w-full px-3 py-2 rounded bg-slate-900 border border-slate-700 text-white" />
              <input type="url" name="featuredImage" required placeholder="Featured Cover Image URL" className="w-full px-3 py-2 rounded bg-slate-900 border border-slate-700 text-white" />
              <button type="submit" disabled={loading} className="w-full py-2.5 bg-blue-600 text-white font-bold rounded shadow-lg shadow-blue-600/30">
                {loading ? 'Publishing...' : 'Publish Article'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
