'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import {
  Briefcase,
  Calendar,
  BookOpen,
  Users,
  Video,
  ExternalLink,
  Clock,
  MapPin,
  Building2,
  GraduationCap,
  Sparkles,
  Award,
  CheckCircle2,
  AlertCircle,
  LogOut,
  UserCheck,
  ChevronRight,
  TrendingUp,
  FileText,
  Mail,
  Phone,
  Plus,
  Edit3,
} from 'lucide-react';
import {
  facultyLogoutAction,
  updateStudentAttendanceByFacultyAction,
  submitMockInterviewFeedbackAction,
} from '@/app/actions';

interface TimetableSlot {
  day: string;
  time: string;
  course: string;
  batch: string;
  type: string;
  location: string;
  topic: string;
  meetLink?: string;
}

interface AssignedCourse {
  id: string;
  slug: string;
  title: string;
  tagline: string;
  level: string;
  mode: string;
  duration: string;
  hoursCount: number;
  rating: number;
  enrolledStudents: number;
  heroImage: string;
  toolsJson: string;
  syllabusJson: string;
  batches: Array<{
    id: string;
    startDate: string;
    timing: string;
    mode: string;
    status: string;
    campusLocation: string;
    seatsTotal: number;
    seatsAvailable: number;
  }>;
}

interface StudentItem {
  id: string;
  studentId: string;
  name: string;
  email: string;
  mobile: string;
  courseName: string;
  batchName: string;
  attendancePct: number;
  labScore: number;
  mockInterviewStatus: string;
  mockFeedback: string;
}

interface FacultyDashboardClientProps {
  faculty: {
    id: string;
    facultyNo: string;
    name: string;
    role: string;
    email: string;
    phone: string;
    photo: string;
    experienceYrs: number;
    formerCompany: string;
    specialization: string;
    rating: number;
    officeLocation: string;
    joiningDate: string;
    timetableJson: string;
    courses: AssignedCourse[];
  };
  students: StudentItem[];
}

export default function FacultyDashboardClient({
  faculty,
  students: initialStudents,
}: FacultyDashboardClientProps) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'schedule' | 'courses' | 'roster' | 'interviews' | 'profile'>('schedule');
  const [selectedDay, setSelectedDay] = useState<string>('Monday');
  const [studentsList, setStudentsList] = useState<StudentItem[]>(initialStudents);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  // Mock interview feedback modal
  const [selectedStudentForMock, setSelectedStudentForMock] = useState<StudentItem | null>(null);
  const [mockFeedbackText, setMockFeedbackText] = useState('');
  const [mockStatusVal, setMockStatusVal] = useState('Cleared - Ready for Enterprise Drives');
  const [savingFeedback, setSavingFeedback] = useState(false);

  // Parse timetable
  let timetable: TimetableSlot[] = [];
  try {
    timetable = JSON.parse(faculty.timetableJson || '[]');
  } catch (e) {
    timetable = [];
  }

  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const daySchedule = timetable.filter((slot) => slot.day === selectedDay);

  async function handleLogout() {
    await facultyLogoutAction();
    router.push('/faculty/login');
    router.refresh();
  }

  async function handleAdjustAttendance(studentId: string, delta: number) {
    const target = studentsList.find((s) => s.studentId === studentId);
    if (!target) return;
    const newPct = Math.min(100, Math.max(0, target.attendancePct + delta));

    setUpdatingId(studentId);
    try {
      await updateStudentAttendanceByFacultyAction(studentId, newPct);
      setStudentsList((prev) =>
        prev.map((s) => (s.studentId === studentId ? { ...s, attendancePct: newPct } : s))
      );
    } catch (e) {
      console.error('Attendance update error:', e);
    } finally {
      setUpdatingId(null);
    }
  }

  async function handleSaveMockFeedback(e: React.FormEvent) {
    e.preventDefault();
    if (!selectedStudentForMock) return;

    setSavingFeedback(true);
    try {
      await submitMockInterviewFeedbackAction(
        selectedStudentForMock.studentId,
        mockFeedbackText,
        mockStatusVal
      );
      setStudentsList((prev) =>
        prev.map((s) =>
          s.studentId === selectedStudentForMock.studentId
            ? { ...s, mockFeedback: mockFeedbackText, mockInterviewStatus: mockStatusVal }
            : s
        )
      );
      setSelectedStudentForMock(null);
    } catch (e) {
      console.error('Error saving feedback:', e);
    } finally {
      setSavingFeedback(false);
    }
  }

  return (
    <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8 space-y-8 animate-in fade-in duration-300">
      
      {/* 1. TOP FACULTY BANNER & ID CARD */}
      <div className="glass-card rounded-3xl p-6 sm:p-8 border border-emerald-500/30 shadow-2xl dark:bg-slate-900/95 bg-white text-slate-900 dark:text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative z-10">
          <div className="flex items-center gap-4 sm:gap-5">
            <div className="relative">
              <div className="w-18 h-18 sm:w-20 sm:h-20 rounded-2xl overflow-hidden border-2 border-emerald-500 shadow-lg shadow-emerald-500/20 shrink-0 relative">
                <Image
                  src={faculty.photo}
                  alt={faculty.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="absolute -bottom-1.5 -right-1.5 px-2 py-0.5 rounded-full bg-emerald-600 text-white text-[10px] font-black uppercase tracking-wider shadow">
                Faculty
              </div>
            </div>

            <div className="space-y-1">
              <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-md bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-mono text-xs font-bold">
                <span>{faculty.facultyNo}</span>
                <span>•</span>
                <span>{faculty.officeLocation.split(',')[0]}</span>
              </div>
              <h1 className="text-xl sm:text-2xl font-black tracking-tight">{faculty.name}</h1>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 font-medium">
                {faculty.role} • <span className="text-emerald-600 dark:text-emerald-400">Ex-{faculty.formerCompany}</span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-end">
            <div className="text-right hidden sm:block">
              <div className="text-[11px] text-slate-400 uppercase font-bold tracking-wider">Faculty Rating</div>
              <div className="text-lg font-black text-amber-500 flex items-center gap-1 justify-end">
                <span>⭐ {faculty.rating}</span>
                <span className="text-xs font-normal text-slate-400">/ 5.0</span>
              </div>
            </div>

            <button
              onClick={handleLogout}
              className="px-4 py-2 rounded-xl border-2 border-rose-500 bg-rose-50 hover:bg-rose-100 text-rose-700 dark:bg-rose-950/40 dark:border-rose-500/60 dark:text-rose-300 dark:hover:bg-rose-950/80 text-xs sm:text-sm font-bold flex items-center gap-2 transition-all cursor-pointer shadow-sm"
            >
              <LogOut className="w-4 h-4 text-rose-600 dark:text-rose-400 stroke-[2.4]" />
              <span>Log Out</span>
            </button>
          </div>
        </div>

        {/* Quick Highlights Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-6 border-t dark:border-slate-800 border-slate-200 text-xs">
          <div className="p-3.5 rounded-2xl bg-white dark:bg-slate-950/80 border border-slate-300 dark:border-slate-800 shadow-xs">
            <div className="text-slate-700 dark:text-slate-300 text-[11px] font-bold uppercase tracking-wider">Assigned Courses</div>
            <div className="text-base font-black text-emerald-600 dark:text-emerald-400 mt-0.5">
              {faculty.courses.length} Active Tracks
            </div>
          </div>
          <div className="p-3.5 rounded-2xl bg-white dark:bg-slate-950/80 border border-slate-300 dark:border-slate-800 shadow-xs">
            <div className="text-slate-700 dark:text-slate-300 text-[11px] font-bold uppercase tracking-wider">Enrolled Mentee Students</div>
            <div className="text-base font-black text-blue-600 dark:text-blue-400 mt-0.5">
              {faculty.courses.reduce((sum, c) => sum + c.enrolledStudents, 0).toLocaleString()} Candidates
            </div>
          </div>
          <div className="p-3.5 rounded-2xl bg-white dark:bg-slate-950/80 border border-slate-300 dark:border-slate-800 shadow-xs">
            <div className="text-slate-700 dark:text-slate-300 text-[11px] font-bold uppercase tracking-wider">Industry Experience</div>
            <div className="text-base font-black text-purple-600 dark:text-purple-400 mt-0.5">
              {faculty.experienceYrs} Years Research & MNC
            </div>
          </div>
          <div className="p-3.5 rounded-2xl bg-white dark:bg-slate-950/80 border border-slate-300 dark:border-slate-800 shadow-xs">
            <div className="text-slate-700 dark:text-slate-300 text-[11px] font-bold uppercase tracking-wider">Employee Status</div>
            <div className="text-base font-black text-emerald-600 dark:text-emerald-400 mt-0.5 flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>Active Full-Time</span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. DASHBOARD TABS NAVIGATION */}
      <div className="flex items-center gap-2.5 overflow-x-auto pb-2 border-b dark:border-slate-800 border-slate-200 scrollbar-none">
        <button
          onClick={() => setActiveTab('schedule')}
          className={`px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm flex items-center gap-2 whitespace-nowrap transition-all cursor-pointer border ${
            activeTab === 'schedule'
              ? 'bg-emerald-600 text-white border-emerald-600 shadow-lg shadow-emerald-600/30'
              : 'text-slate-900 dark:text-slate-100 hover:text-emerald-700 dark:hover:text-emerald-300 bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-800 shadow-sm'
          }`}
        >
          <Calendar className={`w-4 h-4 stroke-[2.4] ${activeTab === 'schedule' ? 'text-white' : 'text-emerald-600 dark:text-emerald-400'}`} />
          <span>Weekly Timetable & Lectures</span>
        </button>

        <button
          onClick={() => setActiveTab('courses')}
          className={`px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm flex items-center gap-2 whitespace-nowrap transition-all cursor-pointer border ${
            activeTab === 'courses'
              ? 'bg-emerald-600 text-white border-emerald-600 shadow-lg shadow-emerald-600/30'
              : 'text-slate-900 dark:text-slate-100 hover:text-blue-700 dark:hover:text-blue-300 bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-800 shadow-sm'
          }`}
        >
          <BookOpen className={`w-4 h-4 stroke-[2.4] ${activeTab === 'courses' ? 'text-white' : 'text-blue-600 dark:text-blue-400'}`} />
          <span>Assigned Courses ({faculty.courses.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('roster')}
          className={`px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm flex items-center gap-2 whitespace-nowrap transition-all cursor-pointer border ${
            activeTab === 'roster'
              ? 'bg-emerald-600 text-white border-emerald-600 shadow-lg shadow-emerald-600/30'
              : 'text-slate-900 dark:text-slate-100 hover:text-purple-700 dark:hover:text-purple-300 bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-800 shadow-sm'
          }`}
        >
          <Users className={`w-4 h-4 stroke-[2.4] ${activeTab === 'roster' ? 'text-white' : 'text-purple-600 dark:text-purple-400'}`} />
          <span>Student Attendance & Roster</span>
        </button>

        <button
          onClick={() => setActiveTab('interviews')}
          className={`px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm flex items-center gap-2 whitespace-nowrap transition-all cursor-pointer border ${
            activeTab === 'interviews'
              ? 'bg-emerald-600 text-white border-emerald-600 shadow-lg shadow-emerald-600/30'
              : 'text-slate-900 dark:text-slate-100 hover:text-amber-700 dark:hover:text-amber-300 bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-800 shadow-sm'
          }`}
        >
          <Award className={`w-4 h-4 stroke-[2.4] ${activeTab === 'interviews' ? 'text-white' : 'text-amber-500 dark:text-amber-400'}`} />
          <span>Mock Interviews & Feedback</span>
        </button>

        <button
          onClick={() => setActiveTab('profile')}
          className={`px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm flex items-center gap-2 whitespace-nowrap transition-all cursor-pointer border ${
            activeTab === 'profile'
              ? 'bg-emerald-600 text-white border-emerald-600 shadow-lg shadow-emerald-600/30'
              : 'text-slate-900 dark:text-slate-100 hover:text-teal-700 dark:hover:text-teal-300 bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-800 shadow-sm'
          }`}
        >
          <UserCheck className={`w-4 h-4 stroke-[2.4] ${activeTab === 'profile' ? 'text-white' : 'text-teal-600 dark:text-teal-400'}`} />
          <span>Faculty ID & Employment Details</span>
        </button>
      </div>

      {/* 3. TAB 1: WEEKLY TIMETABLE */}
      {activeTab === 'schedule' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-black">Official Faculty Timetable & Cohort Schedule</h2>
              <p className="text-xs dark:text-slate-400 text-slate-600 mt-1">
                Day-by-day classroom lectures, GPU supercluster lab sessions, and virtual student syncs.
              </p>
            </div>

            {/* Day Pill Selector */}
            <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 overflow-x-auto w-full sm:w-auto">
              {days.map((day) => (
                <button
                  key={day}
                  onClick={() => setSelectedDay(day)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap border ${
                    selectedDay === day
                      ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm'
                      : 'text-slate-800 dark:text-slate-200 bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-700 hover:border-emerald-500'
                  }`}
                >
                  {day}
                </button>
              ))}
            </div>
          </div>

          {/* Schedule Cards for Selected Day */}
          {daySchedule.length === 0 ? (
            <div className="p-12 text-center rounded-3xl border border-dashed border-slate-300 dark:border-slate-800 text-slate-500 dark:text-slate-400 space-y-2">
              <Calendar className="w-8 h-8 mx-auto text-emerald-500 stroke-[2]" />
              <div className="font-bold text-sm text-slate-800 dark:text-slate-200">No scheduled lectures for {selectedDay}</div>
              <div className="text-xs">Enjoy your research hours and curriculum development time.</div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {daySchedule.map((slot, idx) => (
                <div
                  key={idx}
                  className="glass-card rounded-3xl p-5 border border-slate-200 dark:border-slate-800 space-y-4 hover:border-emerald-500/50 transition-all shadow-sm relative overflow-hidden group"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-500/30 text-emerald-700 dark:text-emerald-300 font-mono text-xs font-bold shadow-xs">
                      <Clock className="w-4 h-4 text-emerald-600 dark:text-emerald-400 stroke-[2.2]" />
                      <span>{slot.time}</span>
                    </div>

                    <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-blue-500/10 text-blue-600 dark:text-blue-400">
                      {slot.type}
                    </span>
                  </div>

                  <div className="space-y-1.5">
                    <h3 className="font-black text-base sm:text-lg leading-snug">{slot.course}</h3>
                    <div className="text-xs font-bold text-emerald-600 dark:text-emerald-400">
                      {slot.batch}
                    </div>
                  </div>

                  <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-950/70 border border-slate-200 dark:border-slate-800 space-y-1.5 text-xs">
                    <div className="text-slate-400 text-[11px] font-semibold uppercase tracking-wider">
                      Today&apos;s Lecture & Lab Agenda:
                    </div>
                    <div className="font-semibold text-slate-900 dark:text-white flex items-start gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                      <span>{slot.topic}</span>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pt-2 border-t dark:border-slate-800 border-slate-200 text-xs">
                    <div className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400">
                      <MapPin className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                      <span className="line-clamp-1">{slot.location}</span>
                    </div>

                    {slot.meetLink && (
                      <a
                        href={slot.meetLink}
                        target="_blank"
                        rel="noreferrer"
                        className="px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold flex items-center gap-1.5 transition-all text-xs shrink-0 cursor-pointer shadow-sm"
                      >
                        <Video className="w-3.5 h-3.5" />
                        <span>Start Lecture Meeting</span>
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* 4. TAB 2: ASSIGNED COURSES */}
      {activeTab === 'courses' && (
        <div className="space-y-6">
          <div>
            <h2 className="text-xl font-black">Assigned Certification Programs</h2>
            <p className="text-xs dark:text-slate-400 text-slate-600 mt-1">
              Curriculums and cohorts where you are designated as Chief Lead Faculty.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {faculty.courses.map((course) => {
              let modules: any[] = [];
              try {
                modules = JSON.parse(course.syllabusJson || '[]');
              } catch (e) {
                modules = [];
              }

              let tools: string[] = [];
              try {
                tools = JSON.parse(course.toolsJson || '[]');
              } catch (e) {
                tools = [];
              }

              return (
                <div
                  key={course.id}
                  className="glass-card rounded-3xl p-6 border border-slate-200 dark:border-slate-800 space-y-5 hover:border-emerald-500/40 transition-all shadow-sm"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-14 h-14 rounded-2xl overflow-hidden relative shrink-0 border border-slate-200 dark:border-slate-800">
                      <Image
                        src={course.heroImage}
                        alt={course.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 rounded-md bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-[10px] font-bold uppercase">
                          {course.level}
                        </span>
                        <span className="text-[11px] text-slate-400">{course.duration} ({course.hoursCount} Hours)</span>
                      </div>
                      <h3 className="font-black text-lg leading-tight">{course.title}</h3>
                    </div>
                  </div>

                  <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2">
                    {course.tagline}
                  </p>

                  {/* Modules Accordion Checklist */}
                  <div className="space-y-2">
                    <div className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center justify-between">
                      <span>Curriculum Modules ({modules.length})</span>
                      <span className="text-emerald-500 text-[11px] font-semibold">100% Course Aligned</span>
                    </div>

                    <div className="space-y-1.5 max-h-40 overflow-y-auto pr-1">
                      {modules.slice(0, 4).map((mod, i) => (
                        <div
                          key={i}
                          className="flex items-center justify-between p-2 rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 text-xs"
                        >
                          <div className="flex items-center gap-2 font-medium">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                            <span className="line-clamp-1">{mod.title || mod.module}</span>
                          </div>
                          <span className="text-[10px] text-slate-400 shrink-0">Module {i + 1}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Tech stack tools */}
                  {tools.length > 0 && (
                    <div className="space-y-1.5">
                      <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                        Lab Tech Stack Taught:
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {tools.slice(0, 6).map((tool, idx) => (
                          <span
                            key={idx}
                            className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 text-[11px] font-mono"
                          >
                            {tool}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="pt-3 border-t dark:border-slate-800 border-slate-200 flex items-center justify-between text-xs">
                    <span className="text-slate-400">
                      Total Mentees: <strong className="text-slate-900 dark:text-white font-black">{course.enrolledStudents}</strong>
                    </span>
                    <Link
                      href={`/courses/${course.slug}`}
                      target="_blank"
                      className="text-emerald-600 dark:text-emerald-400 hover:underline flex items-center gap-1 font-bold"
                    >
                      <span>Public Course Page</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* 5. TAB 3: STUDENT ROSTER & ATTENDANCE */}
      {activeTab === 'roster' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-black">Student Batch Roster & Daily Attendance</h2>
              <p className="text-xs dark:text-slate-400 text-slate-600 mt-1">
                Monitor student engagement, lab assessments, and update attendance records directly.
              </p>
            </div>
            <div className="text-xs font-semibold px-3 py-1.5 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
              Active Mentees: {studentsList.length} Students
            </div>
          </div>

          <div className="glass-card rounded-3xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-100 dark:bg-slate-800/60 text-slate-600 dark:text-slate-400 font-bold uppercase tracking-wider text-[11px]">
                  <tr>
                    <th className="p-4">Student Details</th>
                    <th className="p-4">Enrolled Course & Batch</th>
                    <th className="p-4 text-center">Lab Score</th>
                    <th className="p-4 text-center">Attendance %</th>
                    <th className="p-4 text-right">Quick Attendance Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y dark:divide-slate-800 divide-slate-200">
                  {studentsList.map((st) => (
                    <tr key={st.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
                      <td className="p-4 space-y-0.5">
                        <div className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-1.5">
                          <span>{st.name}</span>
                        </div>
                        <div className="font-mono text-emerald-600 dark:text-emerald-400 font-semibold text-[11px]">
                          {st.studentId}
                        </div>
                        <div className="text-slate-400 text-[11px]">{st.email}</div>
                      </td>

                      <td className="p-4 space-y-1">
                        <div className="font-medium text-slate-800 dark:text-slate-200">{st.courseName}</div>
                        <div className="text-[11px] text-slate-500 dark:text-slate-400">{st.batchName}</div>
                      </td>

                      <td className="p-4 text-center">
                        <span className="px-2.5 py-1 rounded-lg bg-blue-500/10 text-blue-600 dark:text-blue-400 font-bold font-mono">
                          {st.labScore}/100
                        </span>
                      </td>

                      <td className="p-4 text-center">
                        <span
                          className={`px-2.5 py-1 rounded-lg font-bold font-mono ${
                            st.attendancePct >= 85
                              ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                              : 'bg-amber-500/10 text-amber-600 dark:text-amber-400'
                          }`}
                        >
                          {st.attendancePct}%
                        </span>
                      </td>

                      <td className="p-4 text-right space-x-2">
                        <button
                          disabled={updatingId === st.studentId || st.attendancePct >= 100}
                          onClick={() => handleAdjustAttendance(st.studentId, 2)}
                          className="px-2.5 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-[11px] transition-all cursor-pointer disabled:opacity-50"
                          title="Increase attendance by 2%"
                        >
                          + Mark Present
                        </button>
                        <button
                          disabled={updatingId === st.studentId || st.attendancePct <= 0}
                          onClick={() => handleAdjustAttendance(st.studentId, -2)}
                          className="px-2.5 py-1 rounded-lg bg-red-600/20 hover:bg-red-600/30 text-red-500 font-bold text-[11px] transition-all cursor-pointer disabled:opacity-50"
                          title="Mark absent"
                        >
                          Absent
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* 6. TAB 4: MOCK INTERVIEWS */}
      {activeTab === 'interviews' && (
        <div className="space-y-6">
          <div>
            <h2 className="text-xl font-black">Candidate Technical Mock Interviews & Evaluations</h2>
            <p className="text-xs dark:text-slate-400 text-slate-600 mt-1">
              Conduct technical rounds, rate problem solving and system design skills, and issue candidate clearance.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {studentsList.map((st) => (
              <div
                key={st.id}
                className="glass-card rounded-3xl p-6 border border-slate-200 dark:border-slate-800 space-y-4 hover:border-emerald-500/40 transition-all shadow-sm"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="font-black text-base">{st.name}</div>
                    <div className="font-mono text-emerald-600 dark:text-emerald-400 font-semibold text-xs">
                      {st.studentId}
                    </div>
                  </div>
                  <span className="px-2.5 py-1 rounded-lg bg-purple-500/10 text-purple-600 dark:text-purple-400 text-xs font-bold">
                    {st.mockInterviewStatus}
                  </span>
                </div>

                <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-950/70 border border-slate-200 dark:border-slate-800 space-y-1.5 text-xs">
                  <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                    Current Faculty Evaluation Feedback:
                  </div>
                  <p className="text-slate-800 dark:text-slate-200 italic">
                    &ldquo;{st.mockFeedback || 'Pending technical round.'}&rdquo;
                  </p>
                </div>

                <div className="pt-2 flex items-center justify-between">
                  <span className="text-xs text-slate-400">Course: {st.courseName}</span>
                  <button
                    onClick={() => {
                      setSelectedStudentForMock(st);
                      setMockFeedbackText(st.mockFeedback || '');
                      setMockStatusVal(st.mockInterviewStatus || 'Cleared - Ready for Enterprise Drives');
                    }}
                    className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs flex items-center gap-1.5 cursor-pointer shadow-sm transition-all"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                    <span>Update Interview Score</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 7. TAB 5: FACULTY PROFILE & EMPLOYEE DETAILS */}
      {activeTab === 'profile' && (
        <div className="space-y-6">
          <div>
            <h2 className="text-xl font-black">Official Institute Faculty Credentials & Employment</h2>
            <p className="text-xs dark:text-slate-400 text-slate-600 mt-1">
              Your registered employee profile, assigned campus office, and academic department details.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* ID Card Graphic */}
            <div className="glass-card rounded-3xl p-6 border-2 border-emerald-500/40 bg-gradient-to-br from-emerald-50 via-teal-50/50 to-white dark:from-emerald-950/40 dark:via-slate-900 dark:to-slate-950 text-slate-900 dark:text-white space-y-6 shadow-xl relative overflow-hidden">
              <div className="flex items-center justify-between pb-3 border-b border-emerald-500/20">
                <div className="text-[10px] font-black uppercase tracking-widest text-emerald-700 dark:text-emerald-400">
                  NexGen Tech Institute
                </div>
                <div className="px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-500/20 text-emerald-800 dark:text-emerald-300 text-[10px] font-bold">
                  FACULTY ID CARD
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-2xl overflow-hidden relative border-2 border-emerald-500 shrink-0 shadow-sm">
                  <Image src={faculty.photo} alt={faculty.name} fill className="object-cover" />
                </div>
                <div className="space-y-0.5">
                  <div className="font-black text-base leading-tight text-slate-900 dark:text-white">{faculty.name}</div>
                  <div className="text-xs text-emerald-700 dark:text-emerald-400 font-mono font-bold">{faculty.facultyNo}</div>
                  <div className="text-[11px] text-slate-600 dark:text-slate-300">{faculty.role}</div>
                </div>
              </div>

              <div className="space-y-2 text-xs pt-2 border-t border-slate-200 dark:border-slate-800">
                <div className="flex justify-between">
                  <span className="text-slate-600 dark:text-slate-400">Department:</span>
                  <span className="font-semibold text-emerald-800 dark:text-emerald-300">{faculty.specialization}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600 dark:text-slate-400">Joined Date:</span>
                  <span className="font-semibold text-slate-900 dark:text-white">{faculty.joiningDate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600 dark:text-slate-400">Office Cabin:</span>
                  <span className="font-semibold text-slate-900 dark:text-white">{faculty.officeLocation.split(',')[0]}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600 dark:text-slate-400">Status:</span>
                  <span className="font-bold text-emerald-700 dark:text-emerald-400">Verified Active Faculty</span>
                </div>
              </div>
            </div>

            {/* Employment Details Form / Info */}
            <div className="md:col-span-2 glass-card rounded-3xl p-6 border border-slate-200 dark:border-slate-800 space-y-4">
              <h3 className="font-bold text-base">Administrative & Campus Information</h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="p-3.5 rounded-2xl bg-white dark:bg-slate-950/60 border border-slate-300 dark:border-slate-800 space-y-1 shadow-xs">
                  <div className="text-slate-600 dark:text-slate-400 font-bold text-[11px] uppercase tracking-wider">Official Institute Email</div>
                  <div className="font-mono font-bold text-sm text-slate-900 dark:text-white">{faculty.email}</div>
                  <div className="text-[11px] text-slate-500 dark:text-slate-400">Internal Google Workspace handle</div>
                </div>

                <div className="p-3.5 rounded-2xl bg-white dark:bg-slate-950/60 border border-slate-300 dark:border-slate-800 space-y-1 shadow-xs">
                  <div className="text-slate-600 dark:text-slate-400 font-bold text-[11px] uppercase tracking-wider">Direct Desk Hotline / Mobile</div>
                  <div className="font-mono font-bold text-sm text-slate-900 dark:text-white">{faculty.phone}</div>
                  <div className="text-[11px] text-slate-500 dark:text-slate-400">Admissions & Student counseling routing</div>
                </div>

                <div className="p-3.5 rounded-2xl bg-white dark:bg-slate-950/60 border border-slate-300 dark:border-slate-800 space-y-1 sm:col-span-2 shadow-xs">
                  <div className="text-slate-600 dark:text-slate-400 font-bold text-[11px] uppercase tracking-wider">Allocated Campus & Laboratory Wing</div>
                  <div className="font-bold text-sm text-slate-900 dark:text-white">{faculty.officeLocation}</div>
                  <div className="text-[11px] text-slate-500 dark:text-slate-400">Equipped with dedicated workstation & NVIDIA A100 GPU cluster access</div>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border-2 border-emerald-500/30 text-xs space-y-1.5 text-emerald-900 dark:text-emerald-300 shadow-xs">
                <div className="font-extrabold flex items-center gap-2 text-emerald-800 dark:text-emerald-300">
                  <Building2 className="w-4 h-4 text-emerald-700 dark:text-emerald-400 stroke-[2.4]" />
                  <span className="text-sm">Academic Dean & Administration Desk</span>
                </div>
                <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                  For syllabus modifications, lecture room reallocations, or travel grant requests, please contact
                  the dean office at <strong className="text-emerald-900 dark:text-white font-bold">dean.academics@nexgentechacademy.com</strong> or call Ext. 401.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 8. MODAL: UPDATE MOCK INTERVIEW FEEDBACK */}
      {selectedStudentForMock && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-in fade-in">
          <div className="max-w-lg w-full glass-card rounded-3xl p-6 sm:p-8 border border-emerald-500/40 dark:bg-slate-900 bg-white space-y-5 text-slate-900 dark:text-white">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-lg font-black">Update Mock Technical Evaluation</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  Candidate: <strong className="text-slate-900 dark:text-white">{selectedStudentForMock.name}</strong> ({selectedStudentForMock.studentId})
                </p>
              </div>
              <button
                onClick={() => setSelectedStudentForMock(null)}
                className="p-1 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-400 cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveMockFeedback} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold mb-1 text-slate-700 dark:text-slate-300">
                  Interview Status Verdict *
                </label>
                <select
                  value={mockStatusVal}
                  onChange={(e) => setMockStatusVal(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl dark:bg-slate-950 bg-slate-50 border border-slate-300 dark:border-slate-700 text-xs sm:text-sm font-semibold"
                >
                  <option value="Cleared - Ready for Enterprise Drives">Cleared - Ready for Enterprise Drives</option>
                  <option value="System Design Round Passed - DSA Review Needed">System Design Round Passed - DSA Review Needed</option>
                  <option value="Under Evaluation - Capstone Project Review">Under Evaluation - Capstone Project Review</option>
                  <option value="Re-take Scheduled next week">Re-take Scheduled next week</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold mb-1 text-slate-700 dark:text-slate-300">
                  Detailed Faculty Notes & Technical Recommendations *
                </label>
                <textarea
                  rows={4}
                  required
                  value={mockFeedbackText}
                  onChange={(e) => setMockFeedbackText(e.target.value)}
                  placeholder="e.g. Demonstrated strong grasp of LangChain and Redis caching. Recommended deeper practice on B-Tree database indexing..."
                  className="w-full px-3.5 py-2.5 rounded-xl dark:bg-slate-950 bg-slate-50 border border-slate-300 dark:border-slate-700 text-xs sm:text-sm focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setSelectedStudentForMock(null)}
                  className="px-4 py-2 rounded-xl border border-slate-300 dark:border-slate-700 text-slate-500 hover:text-slate-800 text-xs font-bold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={savingFeedback}
                  className="px-5 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-bold text-xs shadow-lg shadow-emerald-500/30 cursor-pointer hover:from-emerald-500 hover:to-teal-500 transition-all"
                >
                  {savingFeedback ? 'Saving...' : 'Submit Official Verdict'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
