export interface CourseTheme {
  bgGradient: string;
  badgeBg: string;
  badgeText: string;
  borderColor: string;
  glowColor: string;
  accentIconColor: string;
  lightCardBg: string;
}

export const COURSE_THEMES: CourseTheme[] = [
  // 1. Sky Blue & Cyan
  {
    bgGradient: 'bg-gradient-to-br from-sky-500/15 via-blue-500/5 to-cyan-500/10',
    badgeBg: 'bg-sky-600',
    badgeText: 'text-white',
    borderColor: 'border-sky-500/40 hover:border-sky-400',
    glowColor: 'shadow-sky-500/10',
    accentIconColor: 'text-sky-500 dark:text-sky-400',
    lightCardBg: 'light:bg-sky-50/90',
  },
  // 2. Vibrant Violet & Purple
  {
    bgGradient: 'bg-gradient-to-br from-purple-500/15 via-violet-500/5 to-fuchsia-500/10',
    badgeBg: 'bg-purple-600',
    badgeText: 'text-white',
    borderColor: 'border-purple-500/40 hover:border-purple-400',
    glowColor: 'shadow-purple-500/10',
    accentIconColor: 'text-purple-500 dark:text-purple-400',
    lightCardBg: 'light:bg-purple-50/90',
  },
  // 3. Rose & Coral Pink
  {
    bgGradient: 'bg-gradient-to-br from-rose-500/15 via-pink-500/5 to-amber-500/10',
    badgeBg: 'bg-rose-600',
    badgeText: 'text-white',
    borderColor: 'border-rose-500/40 hover:border-rose-400',
    glowColor: 'shadow-rose-500/10',
    accentIconColor: 'text-rose-500 dark:text-rose-400',
    lightCardBg: 'light:bg-rose-50/90',
  },
  // 4. Emerald & Mint Green
  {
    bgGradient: 'bg-gradient-to-br from-emerald-500/15 via-teal-500/5 to-green-500/10',
    badgeBg: 'bg-emerald-600',
    badgeText: 'text-white',
    borderColor: 'border-emerald-500/40 hover:border-emerald-400',
    glowColor: 'shadow-emerald-500/10',
    accentIconColor: 'text-emerald-500 dark:text-emerald-400',
    lightCardBg: 'light:bg-emerald-50/90',
  },
  // 5. Bright Amber & Warm Yellow
  {
    bgGradient: 'bg-gradient-to-br from-amber-500/15 via-orange-500/5 to-yellow-500/10',
    badgeBg: 'bg-amber-600',
    badgeText: 'text-white',
    borderColor: 'border-amber-500/40 hover:border-amber-400',
    glowColor: 'shadow-amber-500/10',
    accentIconColor: 'text-amber-500 dark:text-amber-400',
    lightCardBg: 'light:bg-amber-50/90',
  },
  // 6. Indigo & Deep Blue
  {
    bgGradient: 'bg-gradient-to-br from-indigo-500/15 via-blue-600/5 to-purple-500/10',
    badgeBg: 'bg-indigo-600',
    badgeText: 'text-white',
    borderColor: 'border-indigo-500/40 hover:border-indigo-400',
    glowColor: 'shadow-indigo-500/10',
    accentIconColor: 'text-indigo-500 dark:text-indigo-400',
    lightCardBg: 'light:bg-indigo-50/90',
  },
  // 7. Peach & Warm Coral
  {
    bgGradient: 'bg-gradient-to-br from-orange-500/15 via-rose-400/5 to-red-400/10',
    badgeBg: 'bg-orange-600',
    badgeText: 'text-white',
    borderColor: 'border-orange-500/40 hover:border-orange-400',
    glowColor: 'shadow-orange-500/10',
    accentIconColor: 'text-orange-500 dark:text-orange-400',
    lightCardBg: 'light:bg-orange-50/90',
  },
  // 8. Teal & Ocean Blue
  {
    bgGradient: 'bg-gradient-to-br from-teal-500/15 via-cyan-500/5 to-sky-400/10',
    badgeBg: 'bg-teal-600',
    badgeText: 'text-white',
    borderColor: 'border-teal-500/40 hover:border-teal-400',
    glowColor: 'shadow-teal-500/10',
    accentIconColor: 'text-teal-500 dark:text-teal-400',
    lightCardBg: 'light:bg-teal-50/90',
  },
  // 9. Fuchsia & Neon Magenta
  {
    bgGradient: 'bg-gradient-to-br from-fuchsia-500/15 via-pink-500/5 to-purple-600/10',
    badgeBg: 'bg-fuchsia-600',
    badgeText: 'text-white',
    borderColor: 'border-fuchsia-500/40 hover:border-fuchsia-400',
    glowColor: 'shadow-fuchsia-500/10',
    accentIconColor: 'text-fuchsia-500 dark:text-fuchsia-400',
    lightCardBg: 'light:bg-fuchsia-50/90',
  },
  // 10. Lime & Electric Green
  {
    bgGradient: 'bg-gradient-to-br from-lime-500/15 via-emerald-500/5 to-teal-400/10',
    badgeBg: 'bg-lime-600',
    badgeText: 'text-white',
    borderColor: 'border-lime-500/40 hover:border-lime-400',
    glowColor: 'shadow-lime-500/10',
    accentIconColor: 'text-lime-600 dark:text-lime-400',
    lightCardBg: 'light:bg-lime-50/90',
  },
  // 11. Cyan & Ice Blue
  {
    bgGradient: 'bg-gradient-to-br from-cyan-500/15 via-teal-400/5 to-blue-400/10',
    badgeBg: 'bg-cyan-600',
    badgeText: 'text-white',
    borderColor: 'border-cyan-500/40 hover:border-cyan-400',
    glowColor: 'shadow-cyan-500/10',
    accentIconColor: 'text-cyan-500 dark:text-cyan-400',
    lightCardBg: 'light:bg-cyan-50/90',
  },
  // 12. Flame Red & Crimson
  {
    bgGradient: 'bg-gradient-to-br from-red-500/15 via-rose-500/5 to-orange-500/10',
    badgeBg: 'bg-red-600',
    badgeText: 'text-white',
    borderColor: 'border-red-500/40 hover:border-red-400',
    glowColor: 'shadow-red-500/10',
    accentIconColor: 'text-red-500 dark:text-red-400',
    lightCardBg: 'light:bg-red-50/90',
  },
  // 13. Blue Sapphire
  {
    bgGradient: 'bg-gradient-to-br from-blue-600/15 via-indigo-500/5 to-sky-500/10',
    badgeBg: 'bg-blue-600',
    badgeText: 'text-white',
    borderColor: 'border-blue-600/40 hover:border-blue-400',
    glowColor: 'shadow-blue-600/10',
    accentIconColor: 'text-blue-500 dark:text-blue-400',
    lightCardBg: 'light:bg-blue-50/90',
  },
  // 14. Violet & Lilac
  {
    bgGradient: 'bg-gradient-to-br from-violet-400/15 via-purple-300/5 to-indigo-400/10',
    badgeBg: 'bg-violet-600',
    badgeText: 'text-white',
    borderColor: 'border-violet-400/40 hover:border-violet-400',
    glowColor: 'shadow-violet-400/10',
    accentIconColor: 'text-violet-500 dark:text-violet-400',
    lightCardBg: 'light:bg-violet-50/90',
  },
  // 15. Warm Sunset Yellow
  {
    bgGradient: 'bg-gradient-to-br from-yellow-500/15 via-amber-500/5 to-rose-500/10',
    badgeBg: 'bg-yellow-600',
    badgeText: 'text-white',
    borderColor: 'border-yellow-500/40 hover:border-yellow-400',
    glowColor: 'shadow-yellow-500/10',
    accentIconColor: 'text-yellow-600 dark:text-yellow-400',
    lightCardBg: 'light:bg-yellow-50/90',
  },
];

export function getCourseTheme(index: number): CourseTheme {
  return COURSE_THEMES[index % COURSE_THEMES.length];
}
