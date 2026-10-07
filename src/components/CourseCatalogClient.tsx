'use client';

import { useState, useMemo, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import {
  Search,
  Filter,
  Clock,
  Laptop,
  Layers,
  Users,
  Star,
  ChevronLeft,
  ChevronRight,
  BookOpen,
  Sparkles,
} from 'lucide-react';
import { getCourseTheme } from '@/lib/courseThemes';
import InquiryModal from './InquiryModal';

interface Category {
  id: string;
  slug: string;
  name: string;
  description: string;
}

interface Course {
  id: string;
  slug: string;
  title: string;
  tagline: string;
  description: string;
  level: string;
  mode: string;
  duration: string;
  fees: number;
  originalFees: number;
  heroImage: string;
  bestseller: boolean;
  rating: number;
  ratingsCount: number;
  enrolledStudents: number;
  category: Category;
}

interface CourseCatalogClientProps {
  courses: Course[];
  categories: Category[];
  initialCategory?: string;
}

export default function CourseCatalogClient({
  courses,
  categories,
  initialCategory = '',
}: CourseCatalogClientProps) {
  const searchParams = useSearchParams();
  const categoryFromQuery = searchParams.get('category');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(categoryFromQuery || initialCategory);
  const [selectedMode, setSelectedMode] = useState('ALL');
  const [selectedLevel, setSelectedLevel] = useState('ALL');
  const [sortBy, setSortBy] = useState('popular');
  const [modalOpen, setModalOpen] = useState(false);
  const [activeCourseModal, setActiveCourseModal] = useState<{ slug: string; name: string } | null>(null);

  // Category Slider Reference & Scroll State
  const sliderRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    if (sliderRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = sliderRef.current;
      setCanScrollLeft(scrollLeft > 8);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 8);
    }
  };

  useEffect(() => {
    checkScroll();
    window.addEventListener('resize', checkScroll);
    return () => window.removeEventListener('resize', checkScroll);
  }, [categories]);

  const slide = (direction: 'left' | 'right') => {
    if (sliderRef.current) {
      const scrollAmount = direction === 'left' ? -280 : 280;
      sliderRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      setTimeout(checkScroll, 350);
    }
  };

  useEffect(() => {
    if (categoryFromQuery !== null) {
      setSelectedCategory(categoryFromQuery);
    }
  }, [categoryFromQuery]);

  const filteredCourses = useMemo(() => {
    return courses
      .filter((c) => {
        // Search query filter
        const queryMatches =
          c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          c.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
          c.category.name.toLowerCase().includes(searchQuery.toLowerCase());

        // Category filter
        const categoryMatches = selectedCategory ? c.category.slug === selectedCategory : true;

        // Mode filter
        const modeMatches =
          selectedMode === 'ALL' ? true : c.mode.toLowerCase().includes(selectedMode.toLowerCase());

        // Level filter
        const levelMatches =
          selectedLevel === 'ALL' ? true : c.level.toLowerCase() === selectedLevel.toLowerCase();

        return queryMatches && categoryMatches && modeMatches && levelMatches;
      })
      .sort((a, b) => {
        if (sortBy === 'popular') return b.enrolledStudents - a.enrolledStudents;
        if (sortBy === 'rating') return b.rating - a.rating;
        if (sortBy === 'price-low') return a.fees - b.fees;
        if (sortBy === 'price-high') return b.fees - a.fees;
        return 0;
      });
  }, [courses, searchQuery, selectedCategory, selectedMode, selectedLevel, sortBy]);

  return (
    <div className="space-y-8">
      {/* Search & Filter Controls Bar */}
      <div className="glass-card rounded-2xl p-6 border border-slate-800 space-y-6">
        <div className="flex flex-col md:flex-row items-center gap-4">
          {/* Search Input */}
          <div className="relative w-full md:flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search courses by title, skill, or technology (e.g. Next.js, GenAI, Figma, Cyber)..."
              className="w-full pl-11 pr-4 py-3 rounded-xl bg-slate-900 border border-slate-700/80 text-white placeholder:text-slate-500 focus:outline-none focus:border-blue-500 text-sm"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-white"
              >
                Clear
              </button>
            )}
          </div>

          {/* Filters & Sorting Controls */}
          <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
            {/* Mode Select */}
            <select
              value={selectedMode}
              onChange={(e) => setSelectedMode(e.target.value)}
              className="px-3.5 py-3 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs font-medium focus:outline-none focus:border-blue-500"
            >
              <option value="ALL">All Modes</option>
              <option value="Hybrid">Hybrid</option>
              <option value="Online">Online Live</option>
              <option value="Offline">Offline Lab</option>
            </select>

            {/* Level Select */}
            <select
              value={selectedLevel}
              onChange={(e) => setSelectedLevel(e.target.value)}
              className="px-3.5 py-3 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs font-medium focus:outline-none focus:border-blue-500"
            >
              <option value="ALL">All Levels</option>
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
            </select>

            {/* Sort By Select */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3.5 py-3 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs font-medium focus:outline-none focus:border-blue-500"
            >
              <option value="popular">Most Popular</option>
              <option value="rating">Highest Rated</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
          </div>
        </div>

        {/* Category Slider Bar - Single Line with Left/Right Slide Controls and Smooth Track */}
        <div className="relative flex items-center gap-2 pt-1">
          {/* Slide Left Button */}
          <button
            type="button"
            onClick={() => slide('left')}
            disabled={!canScrollLeft}
            aria-label="Slide Left"
            title="Slide Left"
            className={`p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-white shadow-sm transition-all shrink-0 cursor-pointer ${
              canScrollLeft
                ? 'opacity-100 hover:bg-blue-600 hover:text-white hover:border-blue-600 active:scale-90 shadow-md'
                : 'opacity-25 cursor-not-allowed pointer-events-none'
            }`}
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          {/* Slider Track (Single line horizontal scroll with sleek slide bar) */}
          <div
            ref={sliderRef}
            onScroll={checkScroll}
            className="flex-1 flex items-center gap-2 overflow-x-auto scroll-smooth py-1 scrollbar-thin select-none text-xs"
            style={{ scrollbarWidth: 'thin' }}
          >
            <button
              onClick={() => setSelectedCategory('')}
              className={`px-4 py-2 rounded-xl font-bold whitespace-nowrap shrink-0 transition-all cursor-pointer active:scale-95 ${
                selectedCategory === ''
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                  : 'bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:border-blue-400 dark:hover:border-blue-500 shadow-xs'
              }`}
            >
              All Programs ({courses.length})
            </button>
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.slug)}
                className={`px-4 py-2 rounded-xl font-bold whitespace-nowrap shrink-0 transition-all cursor-pointer active:scale-95 ${
                  selectedCategory === cat.slug
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                    : 'bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:border-blue-400 dark:hover:border-blue-500 shadow-xs'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>

          {/* Slide Right Button */}
          <button
            type="button"
            onClick={() => slide('right')}
            disabled={!canScrollRight}
            aria-label="Slide Right"
            title="Slide Right"
            className={`p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-white shadow-sm transition-all shrink-0 cursor-pointer ${
              canScrollRight
                ? 'opacity-100 hover:bg-blue-600 hover:text-white hover:border-blue-600 active:scale-90 shadow-md'
                : 'opacity-25 cursor-not-allowed pointer-events-none'
            }`}
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Results Header */}
      <div className="flex items-center justify-between text-xs text-slate-400">
        <span>Showing <strong className="text-white">{filteredCourses.length}</strong> available courses</span>
        {(searchQuery || selectedCategory || selectedMode !== 'ALL' || selectedLevel !== 'ALL') && (
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('');
              setSelectedMode('ALL');
              setSelectedLevel('ALL');
            }}
            className="text-blue-400 hover:underline"
          >
            Reset Filters
          </button>
        )}
      </div>

      {/* Courses Grid - 4 per row with Hover Zoom Effect */}
      {filteredCourses.length === 0 ? (
        <div className="glass-card rounded-2xl p-12 text-center space-y-4">
          <BookOpen className="w-12 h-12 text-slate-500 mx-auto" />
          <h3 className="text-xl font-bold text-white">No courses match your filter criteria</h3>
          <p className="text-slate-400 text-xs">Try clearing your search query or adjusting the category filter.</p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('');
              setSelectedMode('ALL');
              setSelectedLevel('ALL');
            }}
            className="px-5 py-2.5 rounded-xl bg-blue-600 text-white text-xs font-semibold"
          >
            View All Courses
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map((course, idx) => {
            const theme = getCourseTheme(idx);
            return (
              <div
                key={course.id}
                className={`glass-card glass-card-hover rounded-2xl overflow-hidden flex flex-col border ${theme.borderColor} ${theme.bgGradient} ${theme.lightCardBg} shadow-xl ${theme.glowColor} transition-all duration-300 hover:scale-[1.02] hover:-translate-y-1.5 hover:shadow-2xl hover:border-blue-500/50 group h-full`}
              >
                {/* Hero Image */}
                <div className="relative h-44 sm:h-48 w-full bg-slate-800 overflow-hidden">
                  <Image src={course.heroImage} alt={course.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
                  <div className="absolute top-3 left-3 flex items-center gap-1.5">
                    <span className={`px-2.5 py-1 rounded-md ${theme.badgeBg} ${theme.badgeText} font-semibold text-[11px] shadow-sm`}>
                      {course.category.name}
                    </span>
                    {course.bestseller && (
                      <span className="px-2.5 py-1 rounded-md bg-amber-500 text-slate-950 font-extrabold text-[10px] uppercase tracking-wider shadow-sm">
                        Bestseller
                      </span>
                    )}
                  </div>
                  <div className="absolute bottom-3 right-3 bg-slate-900/90 backdrop-blur-sm px-2.5 py-1 rounded-md text-amber-400 text-xs font-bold flex items-center gap-1 shadow-md">
                    <Star className="w-3.5 h-3.5 fill-amber-400" />
                    <span>{course.rating}</span>
                    <span className="text-slate-400 text-[10px]">({course.ratingsCount})</span>
                  </div>
                </div>

                {/* Body */}
                <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <h3 className="text-lg font-bold dark:text-white text-slate-900 line-clamp-2 leading-snug group-hover:text-blue-500 transition-colors">{course.title}</h3>
                    <p className="dark:text-slate-400 text-slate-600 text-xs line-clamp-2 leading-relaxed">{course.tagline}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs dark:text-slate-300 text-slate-700 pt-3 border-t dark:border-slate-800/80 border-slate-300/80">
                    <div className="flex items-center gap-1.5">
                      <Clock className={`w-4 h-4 ${theme.accentIconColor} shrink-0`} />
                      <span className="truncate">{course.duration}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Laptop className="w-4 h-4 text-purple-500 shrink-0" />
                      <span className="truncate">{course.mode}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Layers className="w-4 h-4 text-emerald-500 shrink-0" />
                      <span className="truncate">{course.level}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Users className="w-4 h-4 text-amber-500 shrink-0" />
                      <span className="truncate">{course.enrolledStudents}+ Enrolled</span>
                    </div>
                  </div>

                  <div className="pt-4 border-t dark:border-slate-800/80 border-slate-300/80 flex items-center justify-between gap-3">
                    <div className="min-w-0">
                      <div className="text-[10px] dark:text-slate-400 text-slate-600 uppercase tracking-wider font-semibold">Course Fee</div>
                      <div className="flex items-baseline gap-2">
                        <span className="text-lg font-black dark:text-white text-slate-900">₹{course.fees.toLocaleString()}</span>
                        <span className="text-xs text-slate-500 line-through">₹{course.originalFees.toLocaleString()}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        type="button"
                        onClick={() => {
                          setActiveCourseModal({ slug: course.slug, name: course.title });
                          setModalOpen(true);
                        }}
                        className="px-3.5 py-2 rounded-xl dark:bg-slate-800 bg-slate-200 hover:bg-slate-300 dark:hover:bg-slate-700 dark:text-slate-200 text-slate-800 text-xs font-bold transition-all active:scale-95 hover:scale-105 shrink-0 cursor-pointer shadow-xs"
                        title="Book Free Demo"
                      >
                        Demo
                      </button>
                      <Link
                        href={`/courses/${course.slug}`}
                        className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 active:scale-95 hover:scale-105 text-white font-bold text-xs transition-all shadow-md shadow-blue-600/25 flex items-center gap-1.5 whitespace-nowrap shrink-0 cursor-pointer"
                        title="View Detailed Syllabus"
                      >
                        <span>Syllabus</span>
                        <ChevronRight className="w-4 h-4 shrink-0" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Modal */}
      {modalOpen && (
        <InquiryModal
          isOpen={modalOpen}
          onClose={() => {
            setModalOpen(false);
            setActiveCourseModal(null);
          }}
          title={activeCourseModal ? `Book Free Demo for ${activeCourseModal.name}` : 'Book Free Demo Session'}
          courseSlug={activeCourseModal?.slug}
          courseName={activeCourseModal?.name}
        />
      )}
    </div>
  );
}
