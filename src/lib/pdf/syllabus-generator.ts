import { PDFDocument, rgb, StandardFonts, PDFFont, PDFPage } from 'pdf-lib';

export interface SyllabusModule {
  module: string;
  title: string;
  details: string[];
}

export interface Project {
  name: string;
  description: string;
}

export interface Role {
  title: string;
  salary: string;
}

export interface CourseSyllabusData {
  title: string;
  tagline: string;
  description: string;
  categoryName: string;
  level: string;
  mode: string;
  duration: string;
  hoursCount: number;
  fees: number;
  originalFees: number;
  rating: number;
  ratingsCount: number;
  enrolledStudents: number;
  syllabus: SyllabusModule[];
  tools: string[];
  projects: Project[];
  careerRoles: Role[];
  trainerName?: string;
  trainerRole?: string;
  trainerCompany?: string;
}

function cleanText(str: string): string {
  if (!str) return '';
  return str
    .replace(/[“”]/g, '"')
    .replace(/[‘’]/g, "'")
    .replace(/[—–]/g, '-')
    .replace(/…/g, '...')
    .replace(/•/g, '-')
    .replace(/₹/g, 'Rs. ')
    .replace(/[^\x00-\x7F]/g, ' ') // Strip non-ASCII characters that break WinAnsi font encoding
    .replace(/\s+/g, ' ')
    .trim();
}

function wrapText(text: string, font: PDFFont, fontSize: number, maxWidth: number): string[] {
  const sanitized = cleanText(text);
  if (!sanitized) return [];
  const words = sanitized.split(' ');
  const lines: string[] = [];
  let currentLine = '';

  for (const word of words) {
    if (!word) continue;
    const testLine = currentLine ? `${currentLine} ${word}` : word;
    const width = font.widthOfTextAtSize(testLine, fontSize);
    if (width <= maxWidth) {
      currentLine = testLine;
    } else {
      if (currentLine) lines.push(currentLine);
      currentLine = word;
    }
  }
  if (currentLine) lines.push(currentLine);
  return lines;
}

export async function generateSyllabusPdf(data: CourseSyllabusData): Promise<Uint8Array> {
  const pdfDoc = await PDFDocument.create();
  const fontRegular = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const fontBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
  const fontOblique = await pdfDoc.embedFont(StandardFonts.HelveticaOblique);

  // Elegant Color Palette
  const colorPrimary = rgb(0.08, 0.25, 0.65);       // Deep Royal Blue
  const colorSecondary = rgb(0.12, 0.45, 0.90);     // Accent Blue
  const colorDark = rgb(0.09, 0.13, 0.20);          // Dark Slate
  const colorMuted = rgb(0.38, 0.44, 0.52);         // Slate 500
  const colorLightBorder = rgb(0.85, 0.88, 0.93);   // Border
  const colorBoxBg = rgb(0.95, 0.97, 1.0);          // Light Blue Tint
  const colorWhite = rgb(1, 1, 1);
  const colorSuccess = rgb(0.05, 0.55, 0.35);

  const PAGE_WIDTH = 595.28; // Standard A4 points
  const PAGE_HEIGHT = 841.89;
  const MARGIN_LEFT = 45;
  const MARGIN_RIGHT = 45;
  const CONTENT_WIDTH = PAGE_WIDTH - MARGIN_LEFT - MARGIN_RIGHT; // 505.28 pt

  let pages: PDFPage[] = [];
  let currentPage = pdfDoc.addPage([PAGE_WIDTH, PAGE_HEIGHT]);
  pages.push(currentPage);
  let y = PAGE_HEIGHT - 45;

  function drawRunningHeader(page: PDFPage) {
    page.drawRectangle({
      x: MARGIN_LEFT,
      y: PAGE_HEIGHT - 38,
      width: CONTENT_WIDTH,
      height: 1.5,
      color: colorSecondary,
    });
    page.drawText('NEXGENTECH ACADEMY & RESEARCH INSTITUTE', {
      x: MARGIN_LEFT,
      y: PAGE_HEIGHT - 32,
      size: 8,
      font: fontBold,
      color: colorPrimary,
    });
    page.drawText('OFFICIAL COURSE SYLLABUS & CURRICULUM SPECIFICATION', {
      x: PAGE_WIDTH - MARGIN_RIGHT - 215,
      y: PAGE_HEIGHT - 32,
      size: 7.5,
      font: fontRegular,
      color: colorMuted,
    });
  }

  function addPageIfNeeded(neededHeight: number) {
    if (y - neededHeight < 65) {
      currentPage = pdfDoc.addPage([PAGE_WIDTH, PAGE_HEIGHT]);
      pages.push(currentPage);
      y = PAGE_HEIGHT - 55;
      drawRunningHeader(currentPage);
    }
  }

  // First Page Brand Header Banner
  currentPage.drawRectangle({
    x: MARGIN_LEFT,
    y: y - 50,
    width: CONTENT_WIDTH,
    height: 52,
    color: colorPrimary,
  });

  currentPage.drawText('NEXGENTECH ACADEMY', {
    x: MARGIN_LEFT + 15,
    y: y - 22,
    size: 16,
    font: fontBold,
    color: colorWhite,
  });

  currentPage.drawText('Center for Advanced Software Engineering & Emerging Technologies', {
    x: MARGIN_LEFT + 15,
    y: y - 36,
    size: 8.5,
    font: fontRegular,
    color: rgb(0.85, 0.92, 1.0),
  });

  currentPage.drawText('ISO 9001:2015 CERTIFIED', {
    x: PAGE_WIDTH - MARGIN_RIGHT - 130,
    y: y - 22,
    size: 8,
    font: fontBold,
    color: rgb(0.95, 0.82, 0.25),
  });

  currentPage.drawText('ACADEMIC YEAR 2025-2026', {
    x: PAGE_WIDTH - MARGIN_RIGHT - 130,
    y: y - 35,
    size: 7.5,
    font: fontRegular,
    color: colorWhite,
  });

  y -= 68;

  // Category Tag
  const categoryTag = cleanText(data.categoryName || 'TECHNOLOGY & ENGINEERING').toUpperCase();
  currentPage.drawText(categoryTag, {
    x: MARGIN_LEFT,
    y,
    size: 9,
    font: fontBold,
    color: colorSecondary,
  });
  y -= 16;

  // Course Title
  const titleLines = wrapText(data.title, fontBold, 16, CONTENT_WIDTH);
  for (const line of titleLines) {
    currentPage.drawText(line, {
      x: MARGIN_LEFT,
      y,
      size: 16,
      font: fontBold,
      color: colorDark,
    });
    y -= 21;
  }

  // Tagline
  if (data.tagline) {
    const taglineLines = wrapText(data.tagline, fontOblique, 9.5, CONTENT_WIDTH);
    for (const tLine of taglineLines) {
      currentPage.drawText(tLine, {
        x: MARGIN_LEFT,
        y,
        size: 9.5,
        font: fontOblique,
        color: colorMuted,
      });
      y -= 13;
    }
  }

  y -= 8;

  // Meta Box (Duration, Mode, Level, Tuition)
  const metaBoxHeight = 44;
  currentPage.drawRectangle({
    x: MARGIN_LEFT,
    y: y - metaBoxHeight,
    width: CONTENT_WIDTH,
    height: metaBoxHeight,
    color: colorBoxBg,
    borderColor: colorLightBorder,
    borderWidth: 1,
  });

  const colWidth = CONTENT_WIDTH / 4;
  const metrics = [
    { label: 'DURATION', val: `${cleanText(data.duration)} (${data.hoursCount} Hrs)` },
    { label: 'LEARNING MODE', val: cleanText(data.mode) },
    { label: 'DIFFICULTY', val: cleanText(data.level) },
    { label: 'TUITION FEE', val: `Rs. ${data.fees.toLocaleString('en-IN')}` },
  ];

  metrics.forEach((m, idx) => {
    const colX = MARGIN_LEFT + idx * colWidth + 8;
    currentPage.drawText(m.label, {
      x: colX,
      y: y - 16,
      size: 7.5,
      font: fontBold,
      color: colorMuted,
    });
    currentPage.drawText(m.val, {
      x: colX,
      y: y - 32,
      size: 9.5,
      font: fontBold,
      color: idx === 3 ? colorSuccess : colorDark,
    });
  });

  y -= metaBoxHeight + 18;

  // 1. Course Overview & Objectives
  currentPage.drawText('1. COURSE OVERVIEW & OBJECTIVES', {
    x: MARGIN_LEFT,
    y,
    size: 11,
    font: fontBold,
    color: colorPrimary,
  });
  y -= 14;

  const descLines = wrapText(data.description, fontRegular, 9, CONTENT_WIDTH);
  for (const line of descLines) {
    addPageIfNeeded(14);
    currentPage.drawText(line, {
      x: MARGIN_LEFT,
      y,
      size: 9,
      font: fontRegular,
      color: colorDark,
    });
    y -= 13;
  }

  y -= 12;

  // 2. Comprehensive Curriculum & Module Breakdown
  addPageIfNeeded(30);
  currentPage.drawText('2. COMPREHENSIVE CURRICULUM & MODULE BREAKDOWN', {
    x: MARGIN_LEFT,
    y,
    size: 11,
    font: fontBold,
    color: colorPrimary,
  });
  y -= 16;

  if (data.syllabus && data.syllabus.length > 0) {
    for (let i = 0; i < data.syllabus.length; i++) {
      const mod = data.syllabus[i];
      addPageIfNeeded(55);

      // Module Title Banner Box
      const modHeaderHeight = 22;
      currentPage.drawRectangle({
        x: MARGIN_LEFT,
        y: y - modHeaderHeight + 4,
        width: CONTENT_WIDTH,
        height: modHeaderHeight,
        color: rgb(0.93, 0.95, 0.98),
        borderColor: rgb(0.82, 0.86, 0.92),
        borderWidth: 0.8,
      });

      const modTitleClean = cleanText(`${mod.module || `Module ${i + 1}`}: ${mod.title || ''}`);
      currentPage.drawText(modTitleClean, {
        x: MARGIN_LEFT + 8,
        y: y - 10,
        size: 9.5,
        font: fontBold,
        color: colorPrimary,
      });

      y -= modHeaderHeight + 6;

      // Module Details
      if (mod.details && Array.isArray(mod.details)) {
        for (const detail of mod.details) {
          const detailLines = wrapText(detail, fontRegular, 8.5, CONTENT_WIDTH - 25);
          addPageIfNeeded(detailLines.length * 12 + 4);

          // Draw vector bullet circle
          currentPage.drawCircle({
            x: MARGIN_LEFT + 12,
            y: y - 4,
            size: 2,
            color: colorSecondary,
          });

          for (let d = 0; d < detailLines.length; d++) {
            currentPage.drawText(detailLines[d], {
              x: MARGIN_LEFT + 22,
              y,
              size: 8.5,
              font: fontRegular,
              color: colorDark,
            });
            y -= 12;
          }
        }
      }

      y -= 8;
    }
  }

  y -= 8;

  // 3. Tools & Technologies Covered
  if (data.tools && data.tools.length > 0) {
    addPageIfNeeded(45);
    currentPage.drawText('3. INDUSTRY TOOLS & TECH STACK MASTERED', {
      x: MARGIN_LEFT,
      y,
      size: 11,
      font: fontBold,
      color: colorPrimary,
    });
    y -= 14;

    const cleanedTools = data.tools.map((t) => cleanText(t)).filter(Boolean);
    const toolsStr = cleanedTools.join('   |   ');
    const toolLines = wrapText(toolsStr, fontBold, 9, CONTENT_WIDTH - 20);
    const toolsBoxHeight = toolLines.length * 14 + 14;
    addPageIfNeeded(toolsBoxHeight + 10);

    currentPage.drawRectangle({
      x: MARGIN_LEFT,
      y: y - toolsBoxHeight + 6,
      width: CONTENT_WIDTH,
      height: toolsBoxHeight,
      color: colorBoxBg,
      borderColor: colorLightBorder,
      borderWidth: 0.8,
    });

    let toolY = y - 8;
    for (const tLine of toolLines) {
      currentPage.drawText(tLine, {
        x: MARGIN_LEFT + 10,
        y: toolY,
        size: 9,
        font: fontBold,
        color: colorSecondary,
      });
      toolY -= 14;
    }

    y -= toolsBoxHeight + 12;
  }

  // 4. Capstone Projects
  if (data.projects && data.projects.length > 0) {
    addPageIfNeeded(45);
    currentPage.drawText('4. PRODUCTION CAPSTONE PROJECTS', {
      x: MARGIN_LEFT,
      y,
      size: 11,
      font: fontBold,
      color: colorPrimary,
    });
    y -= 14;

    for (let pIdx = 0; pIdx < data.projects.length; pIdx++) {
      const proj = data.projects[pIdx];
      addPageIfNeeded(35);

      // Vector check box indicator
      currentPage.drawRectangle({
        x: MARGIN_LEFT + 6,
        y: y - 8,
        width: 7,
        height: 7,
        color: colorSuccess,
      });

      const projNameClean = cleanText(proj.name);
      currentPage.drawText(projNameClean, {
        x: MARGIN_LEFT + 18,
        y,
        size: 9.5,
        font: fontBold,
        color: colorDark,
      });
      y -= 13;

      if (proj.description) {
        const projDescLines = wrapText(proj.description, fontRegular, 8.5, CONTENT_WIDTH - 25);
        for (const pdLine of projDescLines) {
          addPageIfNeeded(13);
          currentPage.drawText(pdLine, {
            x: MARGIN_LEFT + 18,
            y,
            size: 8.5,
            font: fontRegular,
            color: colorMuted,
          });
          y -= 12;
        }
      }
      y -= 4;
    }
    y -= 8;
  }

  // 5. Career Pathways & Target Roles
  if (data.careerRoles && data.careerRoles.length > 0) {
    addPageIfNeeded(45);
    currentPage.drawText('5. CAREER PATHWAYS & TARGET JOB ROLES', {
      x: MARGIN_LEFT,
      y,
      size: 11,
      font: fontBold,
      color: colorPrimary,
    });
    y -= 14;

    for (const role of data.careerRoles) {
      addPageIfNeeded(20);
      const roleTitleClean = cleanText(role.title);
      currentPage.drawCircle({
        x: MARGIN_LEFT + 10,
        y: y - 3,
        size: 2,
        color: colorPrimary,
      });

      currentPage.drawText(roleTitleClean, {
        x: MARGIN_LEFT + 18,
        y,
        size: 9,
        font: fontBold,
        color: colorDark,
      });

      if (role.salary) {
        const salaryClean = cleanText(`Expected Package: ${role.salary}`);
        currentPage.drawText(salaryClean, {
          x: MARGIN_LEFT + 220,
          y,
          size: 8.5,
          font: fontRegular,
          color: colorSuccess,
        });
      }
      y -= 14;
    }
    y -= 10;
  }

  // 6. Certification & Career Placement Guarantee
  addPageIfNeeded(75);
  currentPage.drawText('6. CERTIFICATION & PLACEMENT SUPPORT', {
    x: MARGIN_LEFT,
    y,
    size: 11,
    font: fontBold,
    color: colorPrimary,
  });
  y -= 14;

  const highlights = [
    'ISO 9001:2015 Accredited Industry Certificate with verifiable digital credential verification.',
    '100% Placement Assistance: Resume engineering, GitHub portfolio building, and technical mock interviews.',
    'Exclusive Campus Placement Drives with 150+ corporate hiring partners across top tech firms.',
    'Lifetime access to LMS session recordings, code repositories, and alumni mentorship community.',
  ];

  for (const h of highlights) {
    const hLines = wrapText(h, fontRegular, 8.5, CONTENT_WIDTH - 25);
    addPageIfNeeded(hLines.length * 12 + 4);

    // Vector diamond bullet
    currentPage.drawRectangle({
      x: MARGIN_LEFT + 8,
      y: y - 5,
      width: 5,
      height: 5,
      color: rgb(0.85, 0.65, 0.1),
    });

    for (const hl of hLines) {
      currentPage.drawText(hl, {
        x: MARGIN_LEFT + 20,
        y,
        size: 8.5,
        font: fontRegular,
        color: colorDark,
      });
      y -= 12;
    }
    y -= 2;
  }

  y -= 10;

  // 7. Admissions & Campus Contact Footer Box
  addPageIfNeeded(70);
  const contactBoxHeight = 54;
  currentPage.drawRectangle({
    x: MARGIN_LEFT,
    y: y - contactBoxHeight,
    width: CONTENT_WIDTH,
    height: contactBoxHeight,
    color: rgb(0.08, 0.16, 0.32),
  });

  currentPage.drawText('ADMISSIONS & CAMPUS ENQUIRIES', {
    x: MARGIN_LEFT + 15,
    y: y - 18,
    size: 9,
    font: fontBold,
    color: rgb(0.9, 0.7, 0.2),
  });

  currentPage.drawText('Campus: Tech Park Main Campus HQ, Innovation Corridor | Daily 9:00 AM - 8:00 PM', {
    x: MARGIN_LEFT + 15,
    y: y - 32,
    size: 8,
    font: fontRegular,
    color: colorWhite,
  });

  currentPage.drawText('Helpline: +91 800-999-8800  |  Email: contact@nexgentech.edu  |  Web: www.nexgentechacademy.com', {
    x: MARGIN_LEFT + 15,
    y: y - 44,
    size: 8,
    font: fontBold,
    color: rgb(0.65, 0.85, 1.0),
  });

  // Stamp running footers on all pages
  const totalPages = pages.length;
  pages.forEach((p, idx) => {
    p.drawRectangle({
      x: MARGIN_LEFT,
      y: 35,
      width: CONTENT_WIDTH,
      height: 0.8,
      color: colorLightBorder,
    });

    const footerTitle = cleanText(`NexGenTech Academy - ${data.title}`);
    p.drawText(footerTitle, {
      x: MARGIN_LEFT,
      y: 24,
      size: 7.5,
      font: fontRegular,
      color: colorMuted,
    });

    p.drawText(`Page ${idx + 1} of ${totalPages}`, {
      x: PAGE_WIDTH - MARGIN_RIGHT - 55,
      y: 24,
      size: 7.5,
      font: fontBold,
      color: colorMuted,
    });
  });

  return await pdfDoc.save();
}
