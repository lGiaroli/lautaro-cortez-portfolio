import type { CSSProperties } from "react";
import { startTransition, useEffect, useRef, useState } from "react";
import { Link, Route, Routes, useLocation } from "react-router-dom";
import aboutChildhoodImage from "./assets/about-childhood.jfif";
import ies21Logo from "./assets/ies21-logo.png";
import lateralLogo from "./assets/lateral-logo.png";
import resumePdf from "./assets/Lautaro_Cortez_-_Software_Engineer.pdf";
import portraitImage from "./assets/portrait.jfif";
import proximoLogoWhite from "./assets/proximo-logo-white.png";
import signatureImage from "./assets/signature-clean.png";
import utnLogoClean from "./assets/utn-logo-clean.png";
import { Navbar } from "./components/Navbar";
import { SeoManager } from "./components/Seo";

type BackgroundWord = {
  id: string;
  lines: string[];
  className: string;
  range: [number, number];
  startX: number;
  endX: number;
  startY: number;
  endY: number;
  startOpacity: number;
  endOpacity: number;
  startRotate: number;
  endRotate: number;
  startBlur: number;
  endBlur: number;
  startTracking: number;
  endTracking: number;
};

type Fragment = {
  text: string;
  size: number;
  tracking: number;
  vertical?: boolean;
  range: [number, number];
  fade: [number, number];
  startX: number;
  endX: number;
  startY: number;
  endY: number;
  exitX: number;
  exitY: number;
  startRotate: number;
  endRotate: number;
  startOpacity: number;
  endOpacity: number;
  startScale: number;
  endScale: number;
};

type WorkCard = {
  id: string;
  kicker: string;
  title: string;
  summary: string;
  points: string[];
  media: string;
  glow: string;
};

type SignatureTracePath = {
  d: string;
  length: number;
  range: [number, number];
  strokeWidth: number;
};

type AboutJourneyItem = {
  id: string;
  kind: "Education" | "Experience";
  period: string;
  title: string;
  organization: string;
  location: string;
  body: string;
  logo: string;
  logoAlt: string;
  logoClassName?: string;
};

type ExpertisePill = {
  label: string;
};

const backgroundWords: BackgroundWord[] = [
  {
    id: "software",
    lines: ["SOFTWARE"],
    className: "hero-background-word--left",
    range: [0, 0.5],
    startX: -12,
    endX: -4,
    startY: 9,
    endY: 6,
    startOpacity: 0.14,
    endOpacity: 0.3,
    startRotate: -2.5,
    endRotate: -0.5,
    startBlur: 2.2,
    endBlur: 0.4,
    startTracking: 0.08,
    endTracking: 0.03,
  },
  {
    id: "engineer",
    lines: ["ENGINEER"],
    className: "hero-background-word--right",
    range: [0.08, 0.6],
    startX: 48,
    endX: 40,
    startY: 39,
    endY: 31,
    startOpacity: 0.12,
    endOpacity: 0.26,
    startRotate: 2,
    endRotate: 0.4,
    startBlur: 2.4,
    endBlur: 0.5,
    startTracking: 0.1,
    endTracking: 0.05,
  },
];

const fragments: Fragment[] = [
  {
    text: "LAMBDA",
    size: 0.68,
    tracking: 0.5,
    vertical: true,
    range: [0.02, 0.42],
    fade: [0.58, 0.94],
    startX: 8,
    endX: 11,
    startY: 22,
    endY: 16,
    exitX: -1.5,
    exitY: -7,
    startRotate: 0,
    endRotate: 0,
    startOpacity: 0.68,
    endOpacity: 0.9,
    startScale: 0.96,
    endScale: 1,
  },
  {
    text: "RUNTIME",
    size: 0.72,
    tracking: 0.48,
    vertical: true,
    range: [0.04, 0.44],
    fade: [0.58, 0.9],
    startX: 88,
    endX: 81,
    startY: 18,
    endY: 12,
    exitX: 1.8,
    exitY: -4,
    startRotate: 0,
    endRotate: 0,
    startOpacity: 0.74,
    endOpacity: 0.92,
    startScale: 0.94,
    endScale: 1,
  },
  {
    text: "AST",
    size: 0.82,
    tracking: 0.42,
    vertical: true,
    range: [0.02, 0.46],
    fade: [0.5, 0.86],
    startX: 33,
    endX: 28,
    startY: 31,
    endY: 23,
    exitX: -3.2,
    exitY: -8,
    startRotate: 0,
    endRotate: 0,
    startOpacity: 0.7,
    endOpacity: 0.92,
    startScale: 0.98,
    endScale: 1.04,
  },
  {
    text: "KERNEL",
    size: 0.7,
    tracking: 0.5,
    vertical: true,
    range: [0.08, 0.52],
    fade: [0.58, 0.92],
    startX: 67,
    endX: 69,
    startY: 34,
    endY: 26,
    exitX: 3,
    exitY: -8,
    startRotate: 0,
    endRotate: 0,
    startOpacity: 0.72,
    endOpacity: 0.86,
    startScale: 0.96,
    endScale: 1,
  },
  {
    text: "PROTOCOL",
    size: 0.74,
    tracking: 0.54,
    vertical: true,
    range: [0.12, 0.54],
    fade: [0.58, 0.9],
    startX: 92,
    endX: 87,
    startY: 55,
    endY: 45,
    exitX: 1,
    exitY: -6,
    startRotate: 0,
    endRotate: 0,
    startOpacity: 0.66,
    endOpacity: 0.82,
    startScale: 0.94,
    endScale: 1,
  },
  {
    text: "API",
    size: 0.82,
    tracking: 0.3,
    range: [0.02, 0.36],
    fade: [0.44, 0.78],
    startX: 57,
    endX: 52,
    startY: 18,
    endY: 13,
    exitX: -2.4,
    exitY: -10,
    startRotate: -2,
    endRotate: 0,
    startOpacity: 0.88,
    endOpacity: 0.98,
    startScale: 0.92,
    endScale: 1,
  },
  {
    text: "CACHE",
    size: 0.82,
    tracking: 0.3,
    range: [0.08, 0.38],
    fade: [0.5, 0.82],
    startX: 75,
    endX: 71,
    startY: 76,
    endY: 68,
    exitX: 2.2,
    exitY: 10,
    startRotate: 2,
    endRotate: 0,
    startOpacity: 0.84,
    endOpacity: 0.96,
    startScale: 0.94,
    endScale: 1,
  },
  {
    text: "VECTOR",
    size: 0.72,
    tracking: 0.38,
    range: [0.08, 0.48],
    fade: [0.54, 0.86],
    startX: 28,
    endX: 24,
    startY: 72,
    endY: 63,
    exitX: -1.5,
    exitY: 8,
    startRotate: -2,
    endRotate: 0,
    startOpacity: 0.7,
    endOpacity: 0.86,
    startScale: 0.96,
    endScale: 1,
  },
  {
    text: "PIPELINE",
    size: 0.66,
    tracking: 0.42,
    range: [0.1, 0.52],
    fade: [0.56, 0.9],
    startX: 17,
    endX: 24,
    startY: 84,
    endY: 76,
    exitX: -3,
    exitY: 6,
    startRotate: -4,
    endRotate: 0,
    startOpacity: 0.72,
    endOpacity: 0.86,
    startScale: 0.96,
    endScale: 1,
  },
  {
    text: "COMPILE",
    size: 0.68,
    tracking: 0.36,
    range: [0.06, 0.4],
    fade: [0.46, 0.78],
    startX: 63,
    endX: 59,
    startY: 11,
    endY: 8,
    exitX: 2,
    exitY: -6,
    startRotate: 2,
    endRotate: 0,
    startOpacity: 0.7,
    endOpacity: 0.84,
    startScale: 0.98,
    endScale: 1,
  },
  {
    text: "GRAPH",
    size: 0.66,
    tracking: 0.36,
    range: [0.1, 0.52],
    fade: [0.58, 0.92],
    startX: 80,
    endX: 73,
    startY: 86,
    endY: 78,
    exitX: 3.2,
    exitY: 6,
    startRotate: 3,
    endRotate: 0,
    startOpacity: 0.68,
    endOpacity: 0.84,
    startScale: 0.96,
    endScale: 1,
  },
  {
    text: "SYSTEMS",
    size: 0.64,
    tracking: 0.4,
    range: [0.12, 0.58],
    fade: [0.64, 0.94],
    startX: 48,
    endX: 42,
    startY: 89,
    endY: 81,
    exitX: -2,
    exitY: 6,
    startRotate: 0,
    endRotate: 0,
    startOpacity: 0.64,
    endOpacity: 0.8,
    startScale: 0.94,
    endScale: 1,
  },
  {
    text: "I/O",
    size: 0.62,
    tracking: 0.48,
    range: [0.06, 0.34],
    fade: [0.44, 0.72],
    startX: 11,
    endX: 14,
    startY: 52,
    endY: 46,
    exitX: -2,
    exitY: -4,
    startRotate: -5,
    endRotate: 0,
    startOpacity: 0.62,
    endOpacity: 0.78,
    startScale: 0.92,
    endScale: 1,
  },
];

const worksCards: WorkCard[] = [
  {
    id: "atlas-core",
    kicker: "Platform Architecture",
    title: "Atlas Core",
    summary: "Backend orchestration for resilient product flows, service boundaries, and systems that stay calm under scale.",
    points: ["Service Contracts", "Queue Recovery", "Observability Layer"],
    media:
      "radial-gradient(circle at 76% 22%, rgba(214, 228, 255, 0.2) 0%, rgba(214, 228, 255, 0) 18%), radial-gradient(circle at 24% 78%, rgba(122, 196, 171, 0.18) 0%, rgba(122, 196, 171, 0) 24%), linear-gradient(155deg, #19212d 0%, #10151d 46%, #080a0d 100%)",
    glow:
      "radial-gradient(circle at 72% 20%, rgba(197, 219, 255, 0.22) 0%, rgba(197, 219, 255, 0) 42%), linear-gradient(180deg, rgba(168, 209, 196, 0.08) 0%, rgba(168, 209, 196, 0) 36%)",
  },
  {
    id: "signal-ops",
    kicker: "Realtime Systems",
    title: "Signal Ops",
    summary: "Monitoring surfaces and event-driven workflows shaped to remain readable while throughput, alerts, and data pressure rise.",
    points: ["Stream Processing", "Latency Budgets", "Control Surfaces"],
    media:
      "radial-gradient(circle at 22% 24%, rgba(184, 221, 206, 0.16) 0%, rgba(184, 221, 206, 0) 20%), radial-gradient(circle at 78% 68%, rgba(205, 214, 255, 0.14) 0%, rgba(205, 214, 255, 0) 22%), linear-gradient(142deg, #141916 0%, #0e1311 52%, #07090a 100%)",
    glow:
      "radial-gradient(circle at 32% 26%, rgba(182, 223, 209, 0.18) 0%, rgba(182, 223, 209, 0) 46%), linear-gradient(180deg, rgba(194, 214, 255, 0.06) 0%, rgba(194, 214, 255, 0) 30%)",
  },
  {
    id: "ledger-flow",
    kicker: "Financial Backend",
    title: "Ledger Flow",
    summary: "Transaction-heavy infrastructure with deterministic processing, audit-safe behavior, and delivery designed to age without noise.",
    points: ["Idempotent Jobs", "Audit Trails", "Cache Strategy"],
    media:
      "radial-gradient(circle at 28% 78%, rgba(215, 235, 224, 0.16) 0%, rgba(215, 235, 224, 0) 18%), radial-gradient(circle at 74% 24%, rgba(255, 229, 185, 0.12) 0%, rgba(255, 229, 185, 0) 22%), linear-gradient(150deg, #1a1713 0%, #0f1112 42%, #08090a 100%)",
    glow:
      "radial-gradient(circle at 70% 24%, rgba(255, 222, 170, 0.14) 0%, rgba(255, 222, 170, 0) 44%), linear-gradient(180deg, rgba(215, 235, 224, 0.07) 0%, rgba(215, 235, 224, 0) 34%)",
  },
];

const expertiseTopItems = [
  "/ SOFTWARE ENGINEERING",
  "/ BACK-END DEVELOPMENT",
  "/ API DESIGN",
  "/ DATABASE SYSTEMS",
] as const;

const expertisePills: ExpertisePill[] = [
  { label: "/ MICROSERVICES" },
  { label: "/ RESTFUL APIS" },
  { label: "/ BUSINESS LOGIC" },
  { label: "/ AUTHENTICATION & SECURITY" },
  { label: "/ DATA PROCESSING" },
  { label: "/ SYSTEM INTEGRATION" },
] as const;

const expertiseBottomStack = [
  "JAVA",
  "SPRING BOOT",
  "POSTGRESQL",
  "MYSQL",
  "HIBERNATE",
  "JPA",
  "REST API",
  "DOCKER",
  "GIT",
  "AWS",
] as const;

const contactMetaItems = [
  "/ SOFTWARE ENGINEERING",
  "/ BACKEND SYSTEMS",
  "/ PRODUCT TEAMS",
  "/ REMOTE / HYBRID",
] as const;

const contactServicePills = [
  "/ CLEAN ARCHITECTURE",
  "/ API DESIGN",
  "/ BACKEND ENGINEERING",
  "/ SYSTEM INTEGRATION",
] as const;

const aboutJourneyItems: AboutJourneyItem[] = [
  {
    id: "utn",
    kind: "Education",
    period: "2020 \u2014 2023",
    title: "Systems Engineering",
    organization: "Universidad Tecnol\u00F3gica Nacional",
    location: "C\u00F3rdoba, Argentina",
    body: "Studied Ingenier\u00EDa en Sistemas at UTN C\u00F3rdoba, building a foundation in logic, software structure, analytical thinking, and the technical discipline that still shapes how I approach systems today.",
    logo: utnLogoClean,
    logoAlt: "Universidad Tecnol\u00F3gica Nacional logo",
  },
  {
    id: "ies21",
    kind: "Education",
    period: "2022 \u2014 2025",
    title: "Graphic Design",
    organization: "IES21",
    location: "C\u00F3rdoba, Argentina",
    body: "Studied Graphic Design at IES21, strengthening visual hierarchy, communication, composition, and the ability to make interfaces and product decisions feel more intentional and clear.",
    logo: ies21Logo,
    logoAlt: "IES21 logo",
  },
  {
    id: "proximo",
    kind: "Experience",
    period: "2024 \u2014 2025",
    title: "Developer",
    organization: "Pr\u00F3ximo Contact Center",
    location: "C\u00F3rdoba, Argentina",
    body: "Worked as a developer on technology solutions for third-party companies that relied on Pr\u00F3ximo to solve operational, technical, and integration needs across real business environments.",
    logo: proximoLogoWhite,
    logoAlt: "Pr\u00F3ximo Contact Center logo",
    logoClassName: "about-page__journey-logo--proximo",
  },
  {
    id: "lateral",
    kind: "Experience",
    period: "2025 \u2014 Present",
    title: "QA & Software Engineer",
    organization: "Lateral Technologies",
    location: "England, United Kingdom",
    body: "I work across quality assurance and software engineering: validating features, identifying vulnerabilities, investigating issues, and proposing improvements that make the product more secure, robust, efficient, innovative, and scalable.",
    logo: lateralLogo,
    logoAlt: "Lateral Technologies logo",
  },
];

const aboutQuoteLines = [
  "I CREATE SOFTWARE WITH CLARITY, STRUCTURE,",
  "AND ENOUGH DISCIPLINE TO KEEP COMPLEXITY HONEST.",
  "CLEAN ARCHITECTURE, RESILIENT BACKEND SYSTEMS,",
  "AND SOLUTIONS DESIGNED TO AGE WELL.",
] as const;

const aboutQuoteText = aboutQuoteLines.join(" ");
const aboutQuoteLineStep = 0.22;
const aboutQuoteLineSpan = 0.14;
const aboutQuoteCharacterWindow = 0.18;

const signatureTracePaths: SignatureTracePath[] = [
  {
    d: "M14 252C58 259 104 250 144 221C190 188 227 136 267 78C293 40 319 8 338 9C346 9 348 15 346 22C338 42 309 63 288 82C264 104 242 134 217 171C192 208 160 238 112 252C77 262 37 261 14 252Z",
    length: 470,
    range: [0.74, 0.82],
    strokeWidth: 22,
  },
  {
    d: "M170 205C205 168 233 129 260 92C283 61 306 30 329 8",
    length: 260,
    range: [0.78, 0.86],
    strokeWidth: 18,
  },
  {
    d: "M306 123C330 106 355 95 384 92C401 91 417 97 412 109C404 126 366 142 347 157C331 171 329 185 340 193C360 206 401 205 449 196C500 186 560 165 625 145",
    length: 420,
    range: [0.83, 0.91],
    strokeWidth: 20,
  },
  {
    d: "M10 248C129 217 253 188 372 158C495 127 627 96 789 62",
    length: 790,
    range: [0.88, 0.96],
    strokeWidth: 16,
  },
];

function clamp01(value: number) {
  return Math.min(1, Math.max(0, value));
}

function mix(start: number, end: number, amount: number) {
  return start + (end - start) * amount;
}

function easeInOutCubic(value: number) {
  return value < 0.5
    ? 4 * value * value * value
    : 1 - Math.pow(-2 * value + 2, 3) / 2;
}

function easeOutCubic(value: number) {
  return 1 - Math.pow(1 - value, 3);
}

function easeOutQuint(value: number) {
  return 1 - Math.pow(1 - value, 5);
}

function progressWindow(
  progress: number,
  start: number,
  end: number,
  easing: (value: number) => number = easeInOutCubic
) {
  if (start === end) {
    return progress >= end ? 1 : 0;
  }

  return easing(clamp01((progress - start) / (end - start)));
}

function steppedCursor(progress: number, steps: number, holdPortion = 0.4) {
  if (steps <= 0) {
    return 0;
  }

  const clamped = clamp01(progress);

  if (clamped >= 1) {
    return steps;
  }

  const scaled = clamped * steps;
  const baseIndex = Math.floor(scaled);
  const localProgress = scaled - baseIndex;
  const hold = clamp01(holdPortion);

  if (localProgress <= hold) {
    return baseIndex;
  }

  const transitionProgress = clamp01((localProgress - hold) / Math.max(1 - hold, 0.001));
  return baseIndex + easeInOutCubic(transitionProgress);
}

function useSectionProgress<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let frameId = 0;

    const measure = () => {
      frameId = 0;

      const section = ref.current;
      if (!section) {
        return;
      }

      const rect = section.getBoundingClientRect();
      const totalDistance = Math.max(section.offsetHeight - window.innerHeight, 1);
      const nextProgress = clamp01(-rect.top / totalDistance);

      startTransition(() => {
        setProgress((current) => {
          return Math.abs(current - nextProgress) < 0.001 ? current : nextProgress;
        });
      });
    };

    const requestMeasure = () => {
      if (frameId) {
        return;
      }

      frameId = window.requestAnimationFrame(measure);
    };

    measure();
    window.addEventListener("scroll", requestMeasure, { passive: true });
    window.addEventListener("resize", requestMeasure, { passive: true });

    return () => {
      if (frameId) {
        window.cancelAnimationFrame(frameId);
      }

      window.removeEventListener("scroll", requestMeasure);
      window.removeEventListener("resize", requestMeasure);
    };
  }, []);

  return { ref, progress };
}

function useViewportProgress<T extends HTMLElement>(
  startViewport = 0.82,
  endViewport = 0.18
) {
  const ref = useRef<T | null>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let frameId = 0;

    const measure = () => {
      frameId = 0;

      const section = ref.current;
      if (!section) {
        return;
      }

      const rect = section.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const travelDistance =
        rect.height + viewportHeight * Math.max(startViewport - endViewport, 0.01);
      const nextProgress = clamp01(
        (viewportHeight * startViewport - rect.top) / Math.max(travelDistance, 1)
      );

      startTransition(() => {
        setProgress((current) => {
          return Math.abs(current - nextProgress) < 0.001 ? current : nextProgress;
        });
      });
    };

    const requestMeasure = () => {
      if (frameId) {
        return;
      }

      frameId = window.requestAnimationFrame(measure);
    };

    measure();
    window.addEventListener("scroll", requestMeasure, { passive: true });
    window.addEventListener("resize", requestMeasure, { passive: true });

    return () => {
      if (frameId) {
        window.cancelAnimationFrame(frameId);
      }

      window.removeEventListener("scroll", requestMeasure);
      window.removeEventListener("resize", requestMeasure);
    };
  }, [endViewport, startViewport]);

  return { ref, progress };
}

function useScrollIdle(delay = 220) {
  const [isIdle, setIsIdle] = useState(true);

  useEffect(() => {
    let timeoutId = window.setTimeout(() => {
      setIsIdle(true);
    }, delay);

    const handleScrollActivity = () => {
      setIsIdle(false);
      window.clearTimeout(timeoutId);
      timeoutId = window.setTimeout(() => {
        setIsIdle(true);
      }, delay);
    };

    window.addEventListener("scroll", handleScrollActivity, { passive: true });
    window.addEventListener("resize", handleScrollActivity, { passive: true });

    return () => {
      window.clearTimeout(timeoutId);
      window.removeEventListener("scroll", handleScrollActivity);
      window.removeEventListener("resize", handleScrollActivity);
    };
  }, [delay]);

  return isIdle;
}

function HomePage() {
  const { ref: heroSequenceRef, progress } = useSectionProgress<HTMLElement>();
  const { ref: aboutSequenceRef, progress: aboutProgress } =
    useSectionProgress<HTMLElement>();
  const { ref: worksSequenceRef, progress: worksProgress } =
    useSectionProgress<HTMLElement>();
  const { ref: expertiseSectionRef, progress: expertiseProgress } =
    useViewportProgress<HTMLElement>();
  const { ref: contactSectionRef, progress: contactProgress } =
    useViewportProgress<HTMLElement>(0.84, 0.16);
  const isScrollIdle = useScrollIdle(520);
  const [aboutGlowHasStarted, setAboutGlowHasStarted] = useState(false);

  const portraitProgress = progressWindow(progress, 0.14, 0.82, easeOutQuint);
  const cleanupProgress = progressWindow(progress, 0.54, 0.94, easeInOutCubic);
  const copyReveal = progressWindow(progress, 0.68, 1, easeOutQuint);
  const sideLineProgress = progressWindow(progress, 0.06, 0.92, easeOutCubic);
  const portraitWidth = mix(22, 34, portraitProgress);
  const portraitTranslateY = mix(-8, -18, portraitProgress);
  const portraitScale = mix(0.74, 1.18, portraitProgress);
  const portraitGlow = mix(0.18, 0.52, portraitProgress);
  const portraitFrameOpacity = mix(0.75, 1, portraitProgress);
  const copyOffset = mix(3.4, 0, copyReveal);
  const copyBlur = mix(10, 0, copyReveal);
  const copyOpacity = mix(0, 1, copyReveal);
  const copyLetterSpacing = mix(0.4, 0.18, copyReveal);
  const aboutLineIndicator = progressWindow(aboutProgress, 0.08, 0.94, easeOutCubic);
  const aboutQuoteIntro = progressWindow(aboutProgress, 0.1, 0.86, easeInOutCubic);
  const aboutSignatureReveal = progressWindow(aboutProgress, 0.68, 0.84, easeOutCubic);
  const aboutCtaReveal = progressWindow(aboutProgress, 0.87, 0.92, easeOutCubic);
  const aboutBackgroundLight = progressWindow(aboutProgress, 0.22, 0.94, easeOutCubic);
  const aboutGlowReveal = progressWindow(aboutQuoteIntro, 0.08, 0.72, easeOutCubic);
  const aboutGlowDriftReady = aboutGlowReveal > 0.985;
  const aboutGlowPaused = aboutGlowHasStarted && !isScrollIdle;
  const worksLineIndicator = progressWindow(worksProgress, 0.08, 0.94, easeOutCubic);
  const worksBackgroundLight = progressWindow(worksProgress, 0.02, 0.96, easeOutCubic);
  const expertiseLineIndicator = progressWindow(
    expertiseProgress,
    0.08,
    0.94,
    easeOutCubic
  );
  const expertiseStackReveal = progressWindow(expertiseProgress, 0.44, 0.96, easeOutCubic);
  const contactLineIndicator = progressWindow(contactProgress, 0.08, 0.92, easeOutCubic);
  const contactIntroReveal = progressWindow(contactProgress, 0.1, 0.42, easeOutCubic);
  const contactFormReveal = progressWindow(contactProgress, 0.2, 0.62, easeOutCubic);
  const signatureMaskId = "about-signature-mask";

  useEffect(() => {
    if (!aboutGlowDriftReady) {
      setAboutGlowHasStarted(false);
      return;
    }

    if (isScrollIdle) {
      setAboutGlowHasStarted(true);
    }
  }, [aboutGlowDriftReady, isScrollIdle]);

  const stageStyle = {
    "--hero-progress": progress.toFixed(4),
  } as CSSProperties;

  return (
    <main className="portfolio-page">
      <section className="hero-sequence" id="about" ref={heroSequenceRef}>
        <div className="hero-stage" style={stageStyle}>
          <Navbar />

          <div className="hero-side-ui" aria-hidden="true">
            <span className="hero-side-ui__label">01 / INTRO</span>
            <span className="hero-side-ui__line">
              <span
                className="hero-side-ui__line-fill"
                style={{
                  transform: `scaleY(${mix(0.18, 1, sideLineProgress)})`,
                }}
              />
            </span>
          </div>

          <div
            className="hero-background-layer"
            aria-hidden="true"
            style={{ opacity: mix(1, 0.76, cleanupProgress) }}
          >
            {backgroundWords.map((word) => {
              const wordProgress = progressWindow(
                progress,
                word.range[0],
                word.range[1],
                easeInOutCubic
              );

              const style = {
                left: `${mix(word.startX, word.endX, wordProgress)}vw`,
                top: `${mix(word.startY, word.endY, wordProgress)}vh`,
                opacity: mix(word.startOpacity, word.endOpacity, wordProgress),
                letterSpacing: `${mix(word.startTracking, word.endTracking, wordProgress)}em`,
                filter: `blur(${mix(word.startBlur, word.endBlur, wordProgress)}px)`,
                transform: `rotate(${mix(word.startRotate, word.endRotate, wordProgress)}deg) scale(${mix(1.05, 1, wordProgress)})`,
              } satisfies CSSProperties;

              return (
                <div className={`hero-background-word ${word.className}`} key={word.id} style={style}>
                  {word.lines.map((line) => (
                    <span key={line}>{line}</span>
                  ))}
                </div>
              );
            })}
          </div>

          <div className="hero-fragments-layer" aria-hidden="true">
            {fragments.map((fragment) => {
              const settleProgress = progressWindow(
                progress,
                fragment.range[0],
                fragment.range[1],
                easeInOutCubic
              );
              const exitProgress = progressWindow(
                progress,
                fragment.fade[0],
                fragment.fade[1],
                easeInOutCubic
              );

              const left = mix(fragment.startX, fragment.endX, settleProgress);
              const top = mix(fragment.startY, fragment.endY, settleProgress);
              const opacity =
                mix(fragment.startOpacity, fragment.endOpacity, settleProgress) *
                mix(1, 0.04, exitProgress);
              const scale =
                mix(fragment.startScale, fragment.endScale, settleProgress) *
                mix(1, 0.9, exitProgress);
              const rotate =
                mix(fragment.startRotate, fragment.endRotate, settleProgress) +
                mix(0, fragment.startRotate * 0.3, exitProgress);
              const style = {
                left: `${left + mix(0, fragment.exitX, exitProgress)}vw`,
                top: `${top + mix(0, fragment.exitY, exitProgress)}vh`,
                opacity,
                fontSize: `${fragment.size}rem`,
                letterSpacing: `${fragment.tracking}em`,
                transform: `translate3d(-50%, -50%, 0) rotate(${rotate}deg) scale(${scale})`,
              } satisfies CSSProperties;

              return (
                <span
                  className={`hero-fragment ${fragment.vertical ? "hero-fragment--vertical" : ""}`}
                  key={fragment.text}
                  style={style}
                >
                  {fragment.text}
                </span>
              );
            })}
          </div>

          <div
            className="hero-portrait"
            style={
              {
                width: `clamp(18rem, ${portraitWidth}vw, 34rem)`,
                transform: `translate3d(-50%, ${portraitTranslateY}vh, 0) scale(${portraitScale})`,
                opacity: portraitFrameOpacity,
                "--portrait-glow": portraitGlow.toFixed(4),
              } as CSSProperties
            }
          >
            <div className="hero-portrait__frame">
              <img
                src={portraitImage}
                alt="Portrait of Lautaro Cortez, software engineer and backend engineer"
              />
            </div>
          </div>

          <div
            className="hero-copy"
            style={{
              opacity: copyOpacity,
              filter: `blur(${copyBlur}px)`,
              transform: `translate3d(-50%, ${copyOffset}rem, 0)`,
            }}
          >
            <p className="hero-copy__eyebrow" style={{ letterSpacing: `${copyLetterSpacing}em` }}>
              Lautaro Cortez / Software Engineer
            </p>
            <h1 className="hero-copy__title">Hi, I&apos;m Cortez.</h1>
            <p className="hero-copy__body">
              I&apos;m Lautaro Cortez, a software engineer and backend engineer focused
              on scalable software experiences, clean architecture, robust backend
              development, and solutions built to perform.
            </p>
            <a className="hero-copy__button" href="#contact">
              Contact
            </a>
          </div>
        </div>
      </section>

      <section className="about-sequence" id="about-story" ref={aboutSequenceRef}>
        <div
          className="about-stage"
          style={
            {
              "--about-radial": mix(0.012, 0.056, aboutBackgroundLight).toFixed(4),
              "--about-center-glow": mix(0.002, 0.032, aboutBackgroundLight).toFixed(4),
              "--about-left-glow": mix(0.008, 0.046, aboutBackgroundLight).toFixed(4),
              "--about-right-glow": mix(0.007, 0.042, aboutBackgroundLight).toFixed(4),
              "--about-top-rim": mix(0.34, 0.19, aboutBackgroundLight).toFixed(4),
              "--about-bottom-rim": mix(0.28, 0.18, aboutBackgroundLight).toFixed(4),
            } as CSSProperties
          }
        >
          <div className="about-stage__surface">
            <div className="about-side-ui" aria-hidden="true">
              <span className="about-side-ui__label">02 / ABOUT</span>
              <span className="about-side-ui__line">
                <span
                  className="about-side-ui__line-fill"
                  style={{
                    transform: `scaleY(${mix(0.08, 1, aboutLineIndicator)})`,
                  }}
                />
              </span>
            </div>

            <div className="about-quote-block">
              <p
                className="about-quote-block__eyebrow"
                style={{
                  opacity: mix(0, 0.52, aboutQuoteIntro),
                  letterSpacing: `${mix(0.44, 0.26, aboutQuoteIntro)}em`,
                  filter: `blur(${mix(10, 0, aboutQuoteIntro)}px)`,
                  transform: `translate3d(0, ${mix(1.8, 0, aboutQuoteIntro)}rem, 0)`,
                }}
              >
                ABOUT ME
              </p>

              <div className="about-quote-layout">
                <div className="about-quote-layout__body">
                  <div className="about-quote-text-shell">
                    <div
                      className={`about-quote-block__glow ${
                        aboutGlowHasStarted ? "about-quote-block__glow--drift" : ""
                      } ${aboutGlowPaused ? "about-quote-block__glow--paused" : ""}`}
                      aria-hidden="true"
                      style={{
                        opacity: mix(0, 1, aboutGlowReveal),
                        transform: `translate3d(-50%, calc(-50% + ${mix(2.6, 0, aboutGlowReveal)}rem), 0) scale(${mix(
                          0.88,
                          1,
                          aboutGlowReveal
                        )})`,
                        filter: `blur(${mix(24, 0, aboutGlowReveal)}px)`,
                      }}
                    >
                      <span className="about-quote-block__glow-core" />
                    </div>

                    <p className="about-quote" aria-label={aboutQuoteText}>
                      {aboutQuoteLines.map((line, lineIndex) => {
                        const lineCharacters = [...line];
                        const visibleCharacters = lineCharacters.filter((character) => character !== " ").length;
                        let revealIndex = 0;

                        return (
                          <span className="about-quote__line" key={line}>
                            {lineCharacters.map((character, charIndex) => {
                              if (character === " ") {
                                return (
                                  <span
                                    className="about-quote__space"
                                    key={`space-${lineIndex}-${charIndex}`}
                                    aria-hidden="true"
                                  />
                                );
                              }

                              const currentRevealIndex = revealIndex;
                              revealIndex += 1;

                              const normalizedIndex =
                                visibleCharacters <= 1 ? 0 : currentRevealIndex / (visibleCharacters - 1);
                              const charStart =
                                lineIndex * aboutQuoteLineStep + normalizedIndex * aboutQuoteLineSpan;
                              const charProgress = progressWindow(
                                aboutQuoteIntro,
                                charStart,
                                charStart + aboutQuoteCharacterWindow,
                                easeOutCubic
                              );

                              return (
                                <span
                                  className="about-quote__char"
                                  key={`${character}-${lineIndex}-${charIndex}`}
                                  aria-hidden="true"
                                >
                                  <span
                                    className="about-quote__glyph"
                                    style={{
                                      opacity: mix(0.01, 1, charProgress),
                                      filter: `blur(${mix(8, 0, charProgress)}px)`,
                                      transform: `translate3d(0, ${mix(0.26, 0, charProgress)}em, 0)`,
                                      clipPath: `inset(0 ${mix(100, 0, charProgress)}% 0 0)`,
                                    }}
                                  >
                                    {character}
                                  </span>
                                </span>
                              );
                            })}
                          </span>
                        );
                      })}
                    </p>
                  </div>

                  <div className="about-quote-footer">
                    <div className="about-quote-footer__cta-shell">
                      <div
                        className="about-quote-footer__cta"
                        style={{
                          opacity: mix(0, 1, aboutCtaReveal),
                          transform: `translate3d(0, ${mix(0.8, 0, aboutCtaReveal)}rem, 0)`,
                          filter: `blur(${mix(6, 0, aboutCtaReveal)}px)`,
                          pointerEvents: aboutCtaReveal > 0.96 ? "auto" : "none",
                        }}
                      >
                        <Link className="about-route-link" to="/about">
                          <span className="about-route-link__icon" aria-hidden="true">
                            <span className="about-route-link__arrow" />
                          </span>
                          <span className="about-route-link__label">More About Me</span>
                        </Link>
                      </div>
                    </div>

                    <div
                      className="about-quote-footer__signature"
                      style={{
                        opacity: mix(0, 1, aboutSignatureReveal),
                        transform: `translate3d(0, ${mix(1.2, 0, aboutSignatureReveal)}rem, 0)`,
                        filter: `blur(${mix(6, 0, aboutSignatureReveal)}px)`,
                      }}
                    >
                      <div className="about-signature-wrap">
                        <svg className="about-signature" viewBox="0 0 793 270" aria-label="Cortez signature" role="img">
                          <defs>
                            <mask id={signatureMaskId} maskUnits="userSpaceOnUse" x="0" y="0" width="793" height="270">
                              <rect x="0" y="0" width="793" height="270" fill="black" />
                              {signatureTracePaths.map((path, index) => {
                                const drawProgress = progressWindow(
                                  aboutProgress,
                                  path.range[0],
                                  path.range[1],
                                  easeOutCubic
                                );

                                return (
                                  <path
                                    className="about-signature__trace"
                                    d={path.d}
                                    key={`mask-${index}`}
                                    strokeDasharray={path.length}
                                    strokeDashoffset={path.length * (1 - drawProgress)}
                                    strokeWidth={path.strokeWidth}
                                  />
                                );
                              })}
                            </mask>
                          </defs>

                          <image
                            className="about-signature__image about-signature__image--masked"
                            href={signatureImage}
                            width="793"
                            height="270"
                            preserveAspectRatio="xMidYMid meet"
                            mask={`url(#${signatureMaskId})`}
                          />
                          <image
                            className="about-signature__image about-signature__image--final"
                            href={signatureImage}
                            width="793"
                            height="270"
                            preserveAspectRatio="xMidYMid meet"
                            opacity={progressWindow(aboutProgress, 0.82, 0.88, easeOutCubic)}
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="works-sequence" id="works" ref={worksSequenceRef}>
        <h2 className="sr-only">Selected software engineering and backend projects</h2>
        <div
          className="works-stage"
          style={
            {
              "--works-radial": mix(0.07, 0.11, worksBackgroundLight).toFixed(4),
              "--works-center-glow": mix(0.038, 0.074, worksBackgroundLight).toFixed(4),
              "--works-left-glow": mix(0.048, 0.08, worksBackgroundLight).toFixed(4),
              "--works-right-glow": mix(0.042, 0.078, worksBackgroundLight).toFixed(4),
              "--works-top-rim": mix(0.18, 0.12, worksBackgroundLight).toFixed(4),
              "--works-bottom-rim": mix(0.2, 0.13, worksBackgroundLight).toFixed(4),
            } as CSSProperties
          }
        >
          <div className="works-stage__surface">
            <div className="works-side-ui" aria-hidden="true">
              <span className="works-side-ui__label">03 / WORKS</span>
              <span className="works-side-ui__line">
                <span
                  className="works-side-ui__line-fill"
                  style={{
                    transform: `scaleY(${mix(0.08, 1, worksLineIndicator)})`,
                  }}
                />
              </span>
            </div>

            <div className="works-deck" aria-label="Selected project stack">
              {worksCards.map((card, index) => {
                const revealStart = 0.08 + index * 0.18;
                const revealEnd = revealStart + 0.24;
                const reveal = progressWindow(
                  worksProgress,
                  revealStart,
                  revealEnd,
                  easeOutQuint
                );
                const contentReveal = progressWindow(
                  worksProgress,
                  revealStart + 0.06,
                  revealEnd + 0.08,
                  easeOutCubic
                );
                const drift = progressWindow(
                  worksProgress,
                  revealEnd,
                  1,
                  easeInOutCubic
                );

                const finalOffsetX = [-0.9, 0.9, 0][index] ?? 0;
                const finalOffsetY = [-5.4, -0.9, 3.5][index] ?? 0;
                const finalRotate = [-4.2, 2.2, -1][index] ?? 0;
                const finalScale = [0.89, 0.945, 1][index] ?? 1;
                const entryOffsetY = 18 + index * 2.6;
                const entryRotate = finalRotate * 1.8;
                const liftDrift = [-1.1, -0.5, 0.3][index] ?? 0;
                const mediaShift = mix(2.5, -2.2 + index * 0.9, progressWindow(worksProgress, revealStart, 1));

                const cardStyle = {
                  zIndex: index + 1,
                  opacity: mix(0, 1, reveal),
                  filter: `blur(${mix(18, 0, reveal)}px)`,
                  transform: `translate3d(calc(-50% + ${mix(finalOffsetX * 0.35, finalOffsetX, reveal)}rem), calc(-50% + ${mix(
                    entryOffsetY,
                    finalOffsetY + liftDrift * drift,
                    reveal
                  )}rem), 0) rotate(${mix(entryRotate, finalRotate, reveal)}deg) scale(${mix(
                    0.82,
                    finalScale,
                    reveal
                  )})`,
                  boxShadow: `0 ${mix(0.4, 1.9, reveal)}rem ${mix(1.8, 5.2, reveal)}rem rgba(0, 0, 0, ${mix(
                    0.1,
                    0.34,
                    reveal
                  )})`,
                } satisfies CSSProperties;

                return (
                  <article className="works-card" key={card.id} style={cardStyle}>
                    <div
                      className="works-card__media"
                      style={{
                        backgroundImage: card.media,
                        transform: `translate3d(0, ${mediaShift}%, 0) scale(${mix(
                          1.08,
                          1.02,
                          contentReveal
                        )})`,
                      }}
                    />
                    <div
                      className="works-card__glow"
                      aria-hidden="true"
                      style={{
                        backgroundImage: card.glow,
                        opacity: mix(0.36, 0.78, contentReveal),
                      }}
                    />

                    <div
                      className="works-card__content"
                      style={{
                        opacity: mix(0, 1, contentReveal),
                        transform: `translate3d(0, ${mix(1.8, 0, contentReveal)}rem, 0)`,
                      }}
                    >
                      <div className="works-card__topline">
                        <p className="works-card__kicker">{card.kicker}</p>
                        <p className="works-card__index">{`0${index + 1}`}</p>
                      </div>

                      <div className="works-card__copy">
                        <h2>{card.title}</h2>
                        <p>{card.summary}</p>
                      </div>

                      <ul className="works-card__points" aria-label={`${card.title} highlights`}>
                        {card.points.map((point) => (
                          <li key={point}>{point}</li>
                        ))}
                      </ul>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="expertise-section" id="expertise" ref={expertiseSectionRef}>
        <h2 className="sr-only">Backend engineering expertise and technologies</h2>
        <div className="expertise-side-ui" aria-hidden="true">
          <span className="expertise-side-ui__label">04 / EXPERTISE</span>
          <span className="expertise-side-ui__line">
            <span
              className="expertise-side-ui__line-fill"
              style={{
                transform: `scaleY(${mix(0.08, 1, expertiseLineIndicator)})`,
              }}
            />
          </span>
        </div>

        <div className="expertise-shell">
          <div className="expertise-top-row" aria-label="Expertise areas">
            {expertiseTopItems.map((item, index) => (
              <span className="expertise-top-row__item" key={item}>
                <span>{item}</span>
                {index < expertiseTopItems.length - 1 ? (
                  <span className="expertise-top-row__dot" aria-hidden="true" />
                ) : null}
              </span>
            ))}
          </div>

          <div className="expertise-pill-grid" aria-label="Core expertise capabilities">
            {expertisePills.map((pill) => (
              <span className="expertise-pill" key={pill.label}>
                {pill.label}
              </span>
            ))}
          </div>

          <div className="expertise-bottom-stack" aria-label="Expertise technologies">
            {expertiseBottomStack.map((item, index) => {
              const lineStart = index * 0.08;
              const lineReveal = progressWindow(
                expertiseStackReveal,
                lineStart,
                lineStart + 0.18,
                easeOutCubic
              );

              return (
                <span
                  className="expertise-bottom-stack__item"
                  key={item}
                  style={{
                    opacity: mix(0.06, 1, lineReveal),
                    filter: `blur(${mix(12, 0, lineReveal)}px)`,
                    transform: `translate3d(0, ${mix(1.1, 0, lineReveal)}rem, 0)`,
                    letterSpacing: `${mix(0.42, 0.3, lineReveal)}em`,
                  }}
                >
                  {item}
                </span>
              );
            })}
          </div>
        </div>
      </section>

      <section className="contact-section" id="contact" ref={contactSectionRef}>
        <h2 className="sr-only">Contact Lautaro Cortez for software engineering roles</h2>
        <div className="contact-side-ui" aria-hidden="true">
          <span className="contact-side-ui__label">05 / CONTACT</span>
          <span className="contact-side-ui__line">
            <span
              className="contact-side-ui__line-fill"
              style={{
                transform: `scaleY(${mix(0.08, 1, contactLineIndicator)})`,
              }}
            />
          </span>
        </div>

        <div className="contact-shell">
          <div
            className="contact-intro"
            style={{
              opacity: mix(0, 1, contactIntroReveal),
              filter: `blur(${mix(12, 0, contactIntroReveal)}px)`,
              transform: `translate3d(0, ${mix(2.2, 0, contactIntroReveal)}rem, 0)`,
            }}
          >
            <p className="contact-intro__eyebrow">CONTACT / CORTEZ</p>
            <h2 className="contact-intro__title">
              LET&apos;S TALK ABOUT THE SYSTEM BENEATH THE PRODUCT.
            </h2>
            <p className="contact-intro__body">
              If you&apos;re hiring for a software engineering role, building out a backend
              team, or looking for someone who cares about clean architecture and durable
              systems, I&apos;d love to hear what you&apos;re building and where I could add value.
            </p>

            <div className="contact-intro__meta" aria-label="Contact metadata">
              {contactMetaItems.map((item) => (
                <span className="contact-intro__meta-item" key={item}>
                  {item}
                </span>
              ))}
            </div>
          </div>

          <div
            className="contact-form-panel"
            style={{
              opacity: mix(0, 1, contactFormReveal),
              filter: `blur(${mix(16, 0, contactFormReveal)}px)`,
              transform: `translate3d(0, ${mix(2.8, 0, contactFormReveal)}rem, 0)`,
            }}
          >
            <form className="contact-form" action="#" method="post">
              <div className="contact-form__grid">
                <label className="contact-field">
                  <span className="contact-field__label">NAME</span>
                  <input className="contact-field__input" type="text" name="name" placeholder="Your name" />
                </label>

                <label className="contact-field">
                  <span className="contact-field__label">EMAIL</span>
                  <input className="contact-field__input" type="email" name="email" placeholder="you@example.com" />
                </label>

                <label className="contact-field">
                  <span className="contact-field__label">COMPANY / TEAM</span>
                  <input className="contact-field__input" type="text" name="company" placeholder="Company, product, or team" />
                </label>

                <label className="contact-field">
                  <span className="contact-field__label">ROLE / FOCUS</span>
                  <input className="contact-field__input" type="text" name="focus" placeholder="Software engineer, backend, platform..." />
                </label>
              </div>

              <label className="contact-field contact-field--message">
                <span className="contact-field__label">MESSAGE</span>
                <textarea
                  className="contact-field__input contact-field__input--textarea"
                  name="details"
                  rows={6}
                  placeholder="Tell me about the opportunity, team, or system you have in mind."
                />
              </label>

              <div className="contact-form__services" aria-label="Service areas">
                {contactServicePills.map((item) => (
                  <span className="contact-form__service-pill" key={item}>
                    {item}
                  </span>
                ))}
              </div>

              <div className="contact-form__footer">
                <p className="contact-form__note">
                  Open to engineering roles, strong product teams, and thoughtful collaboration.
                </p>
                <button className="contact-form__submit" type="button">
                  START CONVERSATION
                </button>
              </div>
            </form>
          </div>
        </div>

        <div className="contact-links" aria-label="External contact links">
          <a
            className="contact-links__item"
            href="https://www.linkedin.com/in/lgiaroli/"
            target="_blank"
            rel="noreferrer"
          >
            Linkedin
          </a>
          <a
            className="contact-links__item"
            href="https://github.com/lGiaroli"
            target="_blank"
            rel="noreferrer"
          >
            GitHub
          </a>
          <a className="contact-links__item" href={resumePdf} download>
            Resume
          </a>
        </div>
      </section>
    </main>
  );
}

function AboutPage() {
  const { ref: aboutJourneyRef, progress: aboutJourneyProgress } =
    useSectionProgress<HTMLElement>();
  const aboutJourneyDrive = progressWindow(aboutJourneyProgress, 0.1, 0.985, easeInOutCubic);
  const aboutJourneyCursor = steppedCursor(
    aboutJourneyDrive,
    aboutJourneyItems.length - 1,
    0.44
  );
  const aboutJourneyLine = progressWindow(aboutJourneyDrive, 0.02, 0.96, easeOutCubic);

  return (
    <main className="about-page">
      <section className="about-page__hero">
        <Navbar />

        <div className="about-page__side-ui" aria-hidden="true">
          <span className="about-page__side-label">02 / ABOUT</span>
          <span className="about-page__side-line" />
        </div>

        <div className="about-page__hero-grid">
          <Link className="about-page__hero-back" to="/">
            <span className="about-page__hero-back-icon" aria-hidden="true" />
            <span>Back</span>
          </Link>

          <div className="about-page__hero-center">
            <p className="about-page__hero-tag">
              <span>(ABOUT ME</span>
              <span className="about-page__hero-tag-dot">.</span>
              <span>)</span>
            </p>

            <h1 className="about-page__hero-title">
              <span className="about-page__hero-title-line">A SOFTWARE ENGINEER</span>
              <span className="about-page__hero-title-line about-page__hero-title-line--accent">
                FOR SYSTEMS THAT LAST.
              </span>
            </h1>

            <p className="about-page__hero-subtitle">
              Lautaro Cortez is a software engineer focused on backend systems,
              software quality, API design, and product architecture that holds up
              over time.
            </p>

            <figure className="about-page__hero-portrait">
              <div className="about-page__hero-photo">
                <img src={aboutChildhoodImage} alt="Lautaro Cortez as a child" />
              </div>
              <figcaption className="about-page__hero-caption">
                Lautaro Cortez, future software engineer.
              </figcaption>
            </figure>
          </div>
        </div>
      </section>

      <section className="about-page__content">
        <div className="about-page__statement">
          <p>
            I&apos;m Lautaro Cortez, a software engineer whose path into software was
            shaped by two disciplines that still define the way I build: Systems
            Engineering gave me structure, while Graphic Design trained my eye for
            hierarchy, clarity, and communication.
          </p>
          <p>
            That mix carried into real product work, where I moved from implementation for
            external clients to QA and software engineering, focusing on backend quality,
            security, API thinking, and improvements that make platforms more robust,
            efficient, and scalable.
          </p>
        </div>

        <section className="about-page__journey-sequence" ref={aboutJourneyRef}>
          <div className="about-page__journey-stage">
            <div className="about-page__journey-shell">
              <div className="about-page__journey-copy">
                <p className="about-page__journey-eyebrow">Education / Experience</p>
                <h2 className="about-page__journey-title">Experience</h2>
                <p className="about-page__journey-lead">
                  A scroll-driven timeline of the academic foundation and product work behind my
                  approach to systems, quality, and engineering.
                </p>
                <div className="about-page__journey-actions">
                  <Link className="about-page__back" to="/">
                    Back To Intro
                  </Link>
                </div>
              </div>

              <div className="about-page__journey-layout">
                <div className="about-page__journey-rail" aria-label="Timeline navigation">
                  <span className="about-page__journey-rail-line">
                    <span
                      className="about-page__journey-rail-line-fill"
                      style={{
                        transform: `scaleY(${mix(0.08, 1, aboutJourneyLine)})`,
                      }}
                    />
                  </span>

                  <div className="about-page__journey-rail-items">
                    {aboutJourneyItems.map((item, index) => {
                      const distance = index - aboutJourneyCursor;
                      const focus = easeOutCubic(clamp01(1 - Math.abs(distance) / 0.8));

                      return (
                        <div
                          className="about-page__journey-rail-item"
                          key={`rail-${item.id}`}
                          style={{
                            opacity: mix(0.28, 1, focus),
                            transform: `translate3d(${mix(0, 0.4, focus)}rem, 0, 0)`,
                          }}
                        >
                          <span className="about-page__journey-rail-dot" />
                          <div className="about-page__journey-rail-copy">
                            <span className="about-page__journey-rail-period">{item.period}</span>
                            <span className="about-page__journey-rail-kind">{item.kind}</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="about-page__journey-cards" aria-label="Education and work history">
                  {aboutJourneyItems.map((item, index) => {
                    const distance = index - aboutJourneyCursor;
                    const absDistance = Math.abs(distance);
                    const focus = easeOutCubic(clamp01(1 - absDistance / 0.9));
                    const visibility = easeOutCubic(clamp01(1 - absDistance / 2.2));
                    const translateX = distance * 1.9;
                    const translateY = distance * 5.4;
                    const rotate = distance * -2.2;
                    const scale = Math.max(0.86, 1 - absDistance * 0.065);
                    const blur = Math.min(10, absDistance * 4.8);

                    return (
                      <article
                        className={`about-page__journey-card about-page__journey-card--${item.kind.toLowerCase()}`}
                        key={item.id}
                        style={
                          {
                            zIndex: 100 - Math.round(absDistance * 20),
                            opacity: mix(0.14, 1, visibility),
                            filter: `blur(${blur}px)`,
                            transform: `translate3d(calc(-50% + ${translateX}rem), calc(-50% + ${translateY}rem), 0) rotate(${rotate}deg) scale(${scale})`,
                            boxShadow: `0 ${mix(1.1, 2.8, visibility)}rem ${mix(2.2, 5.6, visibility)}rem rgba(0, 0, 0, ${mix(0.16, 0.32, visibility)})`,
                          } as CSSProperties
                        }
                      >
                        <div className="about-page__journey-card-topline">
                          <span className="about-page__journey-card-kind">{item.kind}</span>
                          <span className="about-page__journey-card-period">{item.period}</span>
                        </div>

                        <div className="about-page__journey-card-body">
                          <div className="about-page__journey-card-copy">
                            <h3>{item.title}</h3>
                            <p className="about-page__journey-card-org">{item.organization}</p>
                            <p className="about-page__journey-card-location">{item.location}</p>
                            <p className="about-page__journey-card-text">{item.body}</p>
                          </div>

                          <div className="about-page__journey-card-brand">
                            <span className="about-page__journey-card-brand-shell">
                              <img
                                className={`about-page__journey-logo ${item.logoClassName ?? ""}`}
                                src={item.logo}
                                alt={item.logoAlt}
                              />
                            </span>
                          </div>
                        </div>

                        <div
                          className="about-page__journey-card-glow"
                          aria-hidden="true"
                          style={{
                            opacity: mix(0.12, 0.42, focus),
                          }}
                        />
                      </article>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </section>

      </section>
    </main>
  );
}

function ScrollManager() {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const target = document.getElementById(location.hash.slice(1));

      if (target) {
        window.requestAnimationFrame(() => {
          target.scrollIntoView({ block: "start" });
        });

        return;
      }
    }

    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [location.hash, location.pathname]);

  return null;
}

function App() {
  return (
    <>
      <ScrollManager />
      <SeoManager />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="*" element={<HomePage />} />
      </Routes>
    </>
  );
}

export default App;
