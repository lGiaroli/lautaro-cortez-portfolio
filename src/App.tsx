import type { CSSProperties } from "react";
import { startTransition, useEffect, useRef, useState } from "react";
import { Link, Route, Routes, useLocation, useParams } from "react-router-dom";
import alqagDashboardImage from "./assets/alqag-dashboard.png";
import alqagListingsImage from "./assets/alqag-listings.png";
import alqagMapPopoutImage from "./assets/alqag-map-popout.png";
import alqagSmartSearchImage from "./assets/alqag-smart-search.png";
import aboutChildhoodImage from "./assets/about-childhood.jfif";
import focoVivoMapViewImage from "./assets/foco-vivo-map-view.png";
import ies21Logo from "./assets/ies21-logo.png";
import lateralLogo from "./assets/lateral-logo.png";
import lateralTimeAdminImage from "./assets/lateral-time-admin-light.png";
import lateralTimeDashboardImage from "./assets/lateral-time-dashboard-light.png";
import lateralTimeInsightsImage from "./assets/lateral-time-insights-light.png";
import lateralTimeTimesheetImage from "./assets/lateral-time-timesheet-light.png";
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
  href: string;
  routeLabel: string;
  liveUrl?: string;
  liveLabel?: string;
  mediaPosition?: string;
  mediaSize?: string;
};

type ProjectMetric = {
  label: string;
  value: string;
};

type ProjectInfoGroup = {
  label: string;
  items: string[];
};

type ProjectDeepDive = {
  kicker: string;
  title: string;
  body: string[];
  points?: string[];
};

type ProjectScreenshot = {
  src: string;
  alt: string;
  caption: string;
  variant?: "featured" | "wide" | "portrait";
};

type ProjectDetail = {
  eyebrow: string;
  title: string;
  lead: string;
  body: string[];
  metrics: ProjectMetric[];
  outcomes: string[];
  caption?: string;
  groups?: ProjectInfoGroup[];
  deepDives?: ProjectDeepDive[];
  image?: string;
  imageAlt?: string;
  imagePosition?: string;
  imageFit?: "cover" | "contain";
  screenshots?: ProjectScreenshot[];
  galleryStyle?: "grid" | "curated";
  galleryPlacement?: "after-showcase" | "after-statement";
  galleryTitle?: string;
  galleryDescription?: string;
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
    id: "lateral-time",
    kicker: "Internal Time Tracking",
    title: "Lateral Time",
    summary:
      "Internal time, review, incident, and team operations platform tuned to stay inside a strict free-tier infrastructure budget.",
    points: ["Time capture", "Review ops", "CU-hour budget"],
    media:
      `linear-gradient(90deg, rgba(6, 9, 8, 0.35) 0%, rgba(6, 9, 8, 0.03) 48%, rgba(6, 9, 8, 0.2) 100%), url(${lateralTimeDashboardImage})`,
    glow:
      "radial-gradient(circle at 78% 22%, rgba(13, 125, 242, 0.2) 0%, rgba(13, 125, 242, 0) 42%), radial-gradient(circle at 18% 70%, rgba(22, 139, 131, 0.14) 0%, rgba(22, 139, 131, 0) 34%), linear-gradient(180deg, rgba(214, 234, 244, 0.05) 0%, rgba(214, 234, 244, 0.16) 100%)",
    href: "/projects/lateral-time",
    routeLabel: "View Case",
    liveUrl: "https://lateraltime.uk",
    liveLabel: "lateraltime.uk",
    mediaPosition: "center, center top",
    mediaSize: "cover, cover",
  },
  {
    id: "foco-vivo",
    kicker: "Realtime Wildfire Ops",
    title: "Foco Vivo",
    summary:
      "Wildfire triage workspace that combines satellite detections, risk layers, weather, reports, and response resources.",
    points: ["Detection", "Triage map", "Risk context"],
    media:
      `linear-gradient(180deg, rgba(8, 10, 11, 0.02) 0%, rgba(8, 10, 11, 0.16) 100%), url(${focoVivoMapViewImage})`,
    glow:
      "radial-gradient(circle at 72% 18%, rgba(220, 230, 49, 0.2) 0%, rgba(220, 230, 49, 0) 40%), radial-gradient(circle at 82% 76%, rgba(85, 209, 156, 0.12) 0%, rgba(85, 209, 156, 0) 36%), linear-gradient(180deg, rgba(24, 17, 32, 0.04) 0%, rgba(24, 17, 32, 0.16) 100%)",
    href: "/projects/foco-vivo",
    routeLabel: "View Case",
    mediaPosition: "center 12%",
  },
  {
    id: "alqag",
    kicker: "Rental Search Radar",
    title: "alqag",
    summary:
      "Map-led rental radar that normalizes listings, validates location confidence, and turns fragmented search into one decision surface.",
    points: ["Smart search", "Location trust", "Map clusters"],
    media:
      `linear-gradient(90deg, rgba(6, 7, 8, 0.54) 0%, rgba(6, 7, 8, 0.1) 56%, rgba(6, 7, 8, 0.34) 100%), linear-gradient(180deg, rgba(6, 7, 8, 0.08) 0%, rgba(6, 7, 8, 0.26) 100%), url(${alqagDashboardImage})`,
    glow:
      "radial-gradient(circle at 74% 22%, rgba(255, 52, 94, 0.18) 0%, rgba(255, 52, 94, 0) 40%), radial-gradient(circle at 18% 70%, rgba(255, 255, 255, 0.12) 0%, rgba(255, 255, 255, 0) 34%), linear-gradient(180deg, rgba(255, 52, 94, 0.05) 0%, rgba(255, 52, 94, 0.14) 100%)",
    href: "/projects/alqag",
    routeLabel: "View Case",
    mediaPosition: "center top",
  },
];

const worksDeckCards = ["alqag", "foco-vivo", "lateral-time"].map((id) => {
  const card = worksCards.find((item) => item.id === id);

  if (!card) {
    throw new Error(`Missing work card: ${id}`);
  }

  return card;
});

const worksStackPoses = [
  {
    entryX: 18.5,
    entryY: -27,
    entryRotate: 14,
    finalX: -5.2,
    finalY: 5.6,
    finalRotate: -6.1,
    finalScale: 0.9,
    mediaShiftStart: 7.2,
    mediaShiftEnd: 0.4,
  },
  {
    entryX: -16.5,
    entryY: -24.5,
    entryRotate: -12.5,
    finalX: 1.8,
    finalY: 2.3,
    finalRotate: 3.2,
    finalScale: 0.95,
    mediaShiftStart: 5.8,
    mediaShiftEnd: -0.1,
  },
  {
    entryX: 13.5,
    entryY: -21.5,
    entryRotate: 9.5,
    finalX: 0,
    finalY: -0.6,
    finalRotate: -1.1,
    finalScale: 1,
    mediaShiftStart: 4.8,
    mediaShiftEnd: -0.5,
  },
] as const;

const projectDetails: Record<string, ProjectDetail> = {
  "lateral-time": {
    eyebrow: "Internal Platform / Time Tracking",
    title: "Lateral Time",
    lead:
      "A live internal time tracking, operational reporting, and team administration platform built for Lateral's day-to-day work.",
    body: [
      "I designed and implemented Lateral Time as an internal product for tracking work hours, reviewing timesheets, managing teams, and turning daily operational activity into clear reports.",
      "The product covers the workflows a team needs every week: time entries, active timers, manual adjustments, client and project assignment, approvals, technical incident coverage, user administration, roles, capacity, and timezone-aware reporting.",
      "The main engineering challenge was efficiency. I shaped the backend and persistence model so multiple concurrent users could work in the platform while keeping infrastructure usage under a strict free-tier target.",
    ],
    metrics: [
      { label: "Product type", value: "Internal operations platform" },
      { label: "Role", value: "Product design and full-stack engineering" },
      { label: "Status", value: "Live at lateraltime.uk" },
      { label: "Infrastructure target", value: "Under 100 CU-hours monthly" },
    ],
    outcomes: [
      "Email/password authentication with sessions, cookies, tokens, password recovery, and password changes",
      "Daily and weekly time tracking with timers, manual entries, timesheet submission, approvals, and editable review flows",
      "Admin tools for users, roles, teams, weekly capacity, timezones, clients, projects, and assignments",
      "Timezone-aware compliance reports that account for daily minimums, capacity, billable work, and technical incidents",
      "Production hardening for Render/Vercel, including secure CORS, API timeouts, and safer long-running states",
    ],
    caption:
      "The main workspace keeps daily tracking, team capacity, review status, and operational signals visible without relying on screenshots, GPS, or invasive monitoring.",
    groups: [
      {
        label: "Product",
        items: ["Time tracking", "Timesheets", "Approvals", "Operational reports"],
      },
      {
        label: "Frontend",
        items: ["TypeScript", "React", "Next.js", "Responsive UI"],
      },
      {
        label: "Backend",
        items: ["API routes", "Prisma", "PostgreSQL", "Session auth"],
      },
      {
        label: "Operations",
        items: ["Render", "Vercel", "Connection pooling", "CU-hour optimization"],
      },
    ],
    deepDives: [
      {
        kicker: "Product Scope",
        title: "A daily operating system for time, teams, and review",
        body: [
          "Lateral Time is more than a timer. It gives team members a fast way to register work while giving administrators and reviewers a structured view of clients, projects, capacity, compliance, approvals, and exceptions.",
          "The platform supports active sessions, manual entries, weekly timesheets, editable dashboards, user and role management, client/project administration, approval flows, technical incidents, and operational reporting.",
        ],
        points: [
          "Day-to-day time capture without screenshots, GPS, or invasive monitoring",
          "Team administration with roles, weekly capacity, timezone, and assignment controls",
          "Review surfaces for approvals, incidents, daily minimums, and billable reporting",
        ],
      },
      {
        kicker: "CU-Hour Optimization",
        title: "Built to stay inside a strict free-tier budget",
        body: [
          "The most important backend constraint was infrastructure consumption. The initial approach was too expensive for a small internal tool, so I redesigned the persistence and reporting behavior around incremental work.",
          "Instead of recomputing full review state or rewriting the complete workspace after every interaction, the app persists only modified entities, uses debounced writes, and keeps cached review snapshots that can be updated cheaply.",
        ],
        points: [
          "Replaced expensive recomputation with snapshots and review caching",
          "Generated reports with Map-based structures and single-pass traversal",
          "Persisted only dirty entities instead of rewriting the full workspace",
          "Tracked dirty credentials so password hashes are updated only when needed",
        ],
      },
      {
        kicker: "Persistence",
        title: "Reduced write pressure and idle database cost",
        body: [
          "The persistence layer was tuned for many small interactions. Debounced saving prevents Postgres writes on every micro-change, while granular dirty tracking keeps updates narrow and predictable.",
          "I also adjusted the Prisma/Postgres pool with low connection limits, connection timeout, and idle timeout so inactive connections can be released instead of silently consuming CU-hours when there is no traffic.",
        ],
        points: [
          "Debounced persistence for high-frequency UI changes",
          "Low database pool limits for an internal multi-user workload",
          "Connection and idle timeouts to avoid paying for inactive sessions",
        ],
      },
      {
        kicker: "Reporting",
        title: "Operational compliance that understands context",
        body: [
          "The reporting model accounts for daily minimums, weekly capacity, billable work, timezones, and technical incidents. That makes the output useful for real operations instead of being a raw export of timer rows.",
          "Insights surface automated signals such as missing minimums, incident-covered gaps, and pending blockers, helping reviewers focus on exceptions instead of scanning every timesheet manually.",
        ],
        points: [
          "Timezone-aware daily compliance checks",
          "Incident coverage that can explain legitimate work gaps",
          "Automated insights for review and operational follow-up",
        ],
      },
      {
        kicker: "Experience",
        title: "Responsive UI for a tool people use every day",
        body: [
          "The interface is intentionally operational: compact enough for repeated use, but polished enough to make daily tracking feel clear rather than bureaucratic.",
          "I refined the product with dark mode, iOS/macOS-style controls, real switches, segmented controls, password reveal, tooltips, inline validation, optimistic local state, and fewer unnecessary refetches after granular changes.",
        ],
      },
    ],
    image: lateralTimeDashboardImage,
    imageAlt: "Lateral Time dashboard with weekly capacity, timer entry, timesheet summary, and automated insights",
    imagePosition: "center top",
    imageFit: "cover",
    galleryStyle: "curated",
    galleryPlacement: "after-statement",
    galleryTitle: "Selected product surfaces",
    galleryDescription:
      "A small set of screens that show the operating loop: capture time, review exceptions, and administer the workspace.",
    screenshots: [
      {
        src: lateralTimeTimesheetImage,
        alt: "Lateral Time weekly timesheet with client grid and manual entry panel",
        caption:
          "Weekly timesheet view with capacity, billable time, manual entries, client grid, and editable registered work.",
        variant: "featured",
      },
      {
        src: lateralTimeInsightsImage,
        alt: "Lateral Time insights screen with automated signals and technical incident review form",
        caption:
          "Automated signals turn missing minimums and technical incidents into reviewable operational context.",
        variant: "wide",
      },
      {
        src: lateralTimeAdminImage,
        alt: "Lateral Time admin control center with organization settings, access policy, roles, and capacity",
        caption:
          "Admin control center for credentials, organization rules, users, roles, capacity, timezones, and access policy.",
        variant: "wide",
      },
    ],
  },
  "foco-vivo": {
    eyebrow: "Operational Platform / Wildfire Response",
    title: "Foco Vivo",
    lead:
      "An operational platform for early wildfire detection, monitoring, and triage, initially focused on Cordoba, Argentina.",
    body: [
      "Foco Vivo is built around one product decision: it does not replace official fire confirmation. Instead, it accelerates the moment before confirmation by helping operators, firefighters, civil defense teams, and municipalities inspect signals in one shared operational surface.",
      "The system brings together satellite hotspots, verified human reports, official IDECOR risk context, weather signals, geocoding, and fire station data so a team can move from scattered observations to a triage-ready event.",
      "The platform is shaped around the operational workflow behind that decision: ingestion, normalization, scoring, event grouping, resilience, and a map interface designed for decision-making under pressure.",
    ],
    metrics: [
      { label: "Product type", value: "Early detection and triage" },
      { label: "Initial region", value: "Cordoba, Argentina" },
      { label: "Role", value: "Full-stack engineering" },
      { label: "Product guardrail", value: "Human confirmation first" },
    ],
    outcomes: [
      "API-first backend for ingestion, scoring, grouping, and alert delivery",
      "Operational dashboard and immersive map for realtime and historical analysis",
      "Controlled fallback behavior when external providers are unavailable",
    ],
    caption:
      "The workspace is designed to keep satellite detections, official risk layers, weather, reports, and response resources visible without forcing the operator to lose map context.",
    groups: [
      {
        label: "Backend",
        items: ["Python", "FastAPI", "SQLAlchemy", "Celery"],
      },
      {
        label: "Frontend",
        items: ["TypeScript", "Next.js", "React"],
      },
      {
        label: "Persistence",
        items: ["SQL", "PostgreSQL/PostGIS", "SQLite for local tests"],
      },
      {
        label: "Deployment",
        items: ["Docker Compose", "Caddy", "Environment-based configuration"],
      },
    ],
    deepDives: [
      {
        kicker: "Architecture",
        title: "Two-layer platform design",
        body: [
          "The implemented architecture separates an API-first backend from an operational frontend. The backend owns ingestion, normalization, scoring, event grouping, subscriptions, and alerts.",
          "The frontend is a web workspace built around a dashboard and an immersive map, supporting both realtime monitoring and historical analysis without turning the interface into a passive report.",
        ],
        points: [
          "Backend services organized by internal domain responsibilities",
          "Domain routes under API modules for observations, events, reports, subscriptions, and detection cell snapshots",
          "Programmable tasks and synchronization scripts for batch and scheduled work",
        ],
      },
      {
        kicker: "Integration",
        title: "Heterogeneous sources with graceful degradation",
        body: [
          "Foco Vivo integrates external providers with different reliability profiles and data shapes. FIRMS satellite detections, IDECOR official risk, weather data, geocoding, and fire station records are normalized into a common operational model.",
          "When a provider fails or returns incomplete data, the system is designed to degrade explicitly instead of silently breaking the operator workflow.",
        ],
        points: [
          "Provider configuration through environment variables",
          "Thresholds and notification behavior controlled per environment",
          "Fallbacks for external data interruptions",
        ],
      },
      {
        kicker: "Detection Logic",
        title: "Heuristic early-detection engine by cell",
        body: [
          "The detection engine combines multi-source signals such as hotspots, fast signals, human reports, risk, and weather to classify cells across operational states.",
          "Known thermal sources are penalized so the platform can reduce obvious false positives before they become unnecessary triage noise.",
        ],
        points: [
          "States from noise and observation to suspected fire and early alert",
          "Multi-source scoring instead of single-signal alerts",
          "Explicit product boundary: no automatic official confirmation in V1",
        ],
      },
      {
        kicker: "Triage Model",
        title: "Spatiotemporal grouping into actionable events",
        body: [
          "Raw observations are useful, but operators need an event they can reason about. Foco Vivo groups scattered observations into triage units using configurable time windows and geographic radius rules.",
          "That turns noisy detections into a more actionable workflow: inspect the event, understand its context, review provenance, and decide what needs escalation.",
        ],
      },
      {
        kicker: "Product Surface",
        title: "Decision-oriented operational map",
        body: [
          "The map overlays meteorological layers, official IDECOR risk, probable detections, reports, and critical resources such as fire stations in one surface.",
          "Camera persistence keeps the operator anchored when switching layers, preventing the common operational problem of losing spatial context while comparing information.",
        ],
        points: [
          "Layered environmental and response context",
          "Realtime and historical modes for traceability",
          "Map-first workflow tuned for triage rather than presentation",
        ],
      },
      {
        kicker: "Engineering Principles",
        title: "Designed for traceability and operational resilience",
        body: [
          "The codebase follows a clear separation of responsibilities between presentation, API routes, domain services, persistence, and batch tasks.",
          "The domain model reflects the operational language of the product through entities such as observation, event, report, subscription, and detection cell snapshot.",
        ],
        points: [
          "12-factor style configuration for sources, thresholds, security, and notifications",
          "Explicit traceability through historical mode and report provenance",
          "Resilience and controlled degradation as core product behavior",
        ],
      },
    ],
    image: focoVivoMapViewImage,
    imageAlt: "Foco Vivo immersive map interface with wildfire markers and event triage panels",
    imagePosition: "center top",
  },
  alqag: {
    eyebrow: "Full-Stack Platform / Permanent Rentals",
    title: "alqag",
    lead:
      "A map-led rental search platform that turns scattered permanent rental listings into normalized, comparable, decision-ready results.",
    body: [
      "alqag was built around a familiar but painful problem: searching for long-term rentals often means jumping between portals, local real estate websites, independent pages, and repeated or incomplete posts.",
      "The platform centralizes public rental listings, normalizes inconsistent data, deduplicates repeated properties, enriches images and location metadata, and presents everything in a clean product experience inspired by modern marketplace interfaces.",
      "The most important product decision was honesty around location quality. Every listing can appear on the map, but the UI communicates whether the pin is exact, street-level, neighborhood-level, or a fallback based on the city.",
    ],
    metrics: [
      { label: "Product type", value: "Permanent rental radar" },
      { label: "Role", value: "Full-stack product engineering" },
      { label: "Visible listings", value: "90+ normalized rentals" },
      { label: "Quality", value: "88 automated tests passing" },
    ],
    outcomes: [
      "Responsive dashboard with multi-zone search, filters, listing cards, shortlist states, and map entry points",
      "Interactive Leaflet/OpenStreetMap radar with grouped pins, radius overlays, and a listing popout for clustered results",
      "Natural-language search that extracts intent such as property type, bedrooms, budget, amenities, and target area",
      "Source adapters for public listings, normalization, deduplication, image repair, geocoding, and post-sync quality control",
      "Visual confidence states for exact, approximate, neighborhood, and fallback locations so the product does not overstate precision",
    ],
    caption:
      "The opening dashboard keeps zones, filters, product positioning, and normalized listings in one place, making the search feel like a decision tool rather than another raw property feed.",
    groups: [
      {
        label: "Frontend",
        items: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
      },
      {
        label: "Backend",
        items: ["API routes", "Prisma", "SQLite", "Zod"],
      },
      {
        label: "Mapping",
        items: ["Leaflet", "OpenStreetMap", "Geocoding", "Location confidence"],
      },
      {
        label: "Pipeline",
        items: ["Cheerio", "Playwright", "Adapters", "Vitest", "Playwright E2E"],
      },
    ],
    deepDives: [
      {
        kicker: "Product Problem",
        title: "From scattered listings to one decision surface",
        body: [
          "Permanent rental search in Argentina is fragmented. Listings appear across portals, local agencies, independent sites, and social channels, often with missing fields, inconsistent addresses, broken images, or duplicated posts.",
          "alqag turns that scattered input into a focused interface for comparing real options: search by zone, filter by constraints, inspect the map, favorite or hide listings, and keep a shortlist of properties worth contacting.",
        ],
        points: [
          "Multi-zone search across Alta Gracia, Villa Carlos Paz, Anisacate, La Bolsa, Cordoba, and nearby areas",
          "Filters for price, currency, bedrooms, expenses, property type, favorites, hidden listings, and likely owner-direct posts",
          "Decision states for favorites, hidden items, contacted properties, scheduled visits, and discarded options",
        ],
      },
      {
        kicker: "Data Pipeline",
        title: "Adapters, normalization, and post-sync quality",
        body: [
          "The data layer is organized around source adapters so new real estate sources can be added without changing the core domain. Each sync normalizes listings, repairs image references, enriches detail fields, and deduplicates repeated properties.",
          "A post-sync quality pass hides stale or low-signal results, separates temporary rentals from permanent housing, and keeps the dataset useful without relying on manual cleanup.",
        ],
        points: [
          "Responsible scraping from public sources without bypassing logins, captchas, or restrictions",
          "Deduplication by URL and similarity signals",
          "Automated image validation and repair",
        ],
      },
      {
        kicker: "Map Model",
        title: "Useful pins without pretending every address is exact",
        body: [
          "A rental can still be useful even when the source does not provide a precise coordinate. The platform uses fallback geocoding and classifies each result by confidence level so the map stays comprehensive and honest.",
          "Grouped pins and radius overlays help compare neighborhoods and nearby areas, while the selected-zone popout surfaces the relevant listings directly over the map.",
        ],
        points: [
          "Exact, street, neighborhood, and city fallback confidence levels",
          "Clustered map results with listing previews",
          "Radius-based search for multiple active zones",
        ],
      },
      {
        kicker: "Smart Search",
        title: "Natural language translated into usable filters",
        body: [
          "The smart search layer supports queries such as 'house with 2 bedrooms and a patio under 800000 near Anisacate' and translates the user intent into structured filters.",
          "That makes the experience feel closer to describing a move than configuring a database query, while still keeping the resulting filters visible and editable.",
        ],
      },
      {
        kicker: "Quality",
        title: "Tested around the messy parts of real estate data",
        body: [
          "The test suite focuses on the fragile parts of the product: filtering, distance calculations, geocoding behavior, smart search extraction, image handling, metadata, and source pipeline logic.",
          "The result is a local MVP that remains easy to iterate while still treating data quality as a product feature.",
        ],
        points: [
          "88 automated tests passing",
          "Production build validated",
          "1920x1080 documentation screenshots captured for the portfolio",
        ],
      },
    ],
    image: alqagDashboardImage,
    imageAlt: "alqag dashboard with multi-zone search filters and permanent rental listings",
    imagePosition: "center top",
    imageFit: "contain",
    screenshots: [
      {
        src: alqagMapPopoutImage,
        alt: "alqag map modal with three rental results in the selected zone popout",
        caption: "Interactive map with grouped pins and a selected-zone popout showing three rental results.",
        variant: "featured",
      },
      {
        src: alqagSmartSearchImage,
        alt: "alqag smart search converting a natural-language rental query into filters",
        caption: "Natural-language search translated into structured filters for bedrooms, budget, property type, and area.",
        variant: "wide",
      },
      {
        src: alqagListingsImage,
        alt: "alqag listing grid with normalized rental cards, prices, images, and badges",
        caption: "Normalized listing grid with images, prices, location confidence, freshness badges, and hide/favorite actions.",
        variant: "wide",
      },
    ],
  },
};

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
  const worksRevealLeadIn = 0.08;
  const worksRevealStep = 0.22;
  const worksRevealWindow = 0.16;
  let activeWorksIndex = -1;

  for (let index = 0; index < worksDeckCards.length; index += 1) {
    const stepStart = worksRevealLeadIn + index * worksRevealStep;

    if (worksProgress >= stepStart - worksRevealWindow * 0.12) {
      activeWorksIndex = index;
    }
  }

  if (worksProgress < worksRevealLeadIn * 0.75) {
    activeWorksIndex = -1;
  }
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

  const scrollToWorksCard = (index: number) => {
    const section = worksSequenceRef.current;

    if (!section) {
      return;
    }

    const totalDistance = Math.max(section.offsetHeight - window.innerHeight, 1);
    const sectionTop = window.scrollY + section.getBoundingClientRect().top;
    const targetProgress = clamp01(
      worksRevealLeadIn + index * worksRevealStep + worksRevealWindow * 0.92
    );

    window.scrollTo({
      top: sectionTop + totalDistance * targetProgress,
      left: 0,
      behavior: "smooth",
    });
  };

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
            <nav className="works-side-ui" aria-label="Works navigation">
              <span className="works-side-ui__label">03 / WORKS</span>
              <div className="works-side-ui__controls">
                <span className="works-side-ui__line" aria-hidden="true">
                  <span
                    className="works-side-ui__line-fill"
                    style={{
                      transform: `scaleY(${mix(0.08, 1, worksLineIndicator)})`,
                    }}
                  />
                </span>

                <div className="works-side-ui__steps">
                  {worksDeckCards.map((card, index) => {
                    const isActive = index === activeWorksIndex;

                    return (
                      <button
                        className={`works-side-ui__step${
                          isActive ? " works-side-ui__step--active" : ""
                        }`}
                        type="button"
                        key={`works-step-${card.id}`}
                        onClick={() => scrollToWorksCard(index)}
                        aria-pressed={isActive}
                        aria-label={`Scroll to ${card.title}`}
                      >
                        <span className="works-side-ui__step-marker" aria-hidden="true" />
                        <span className="works-side-ui__step-index">{`0${index + 1}`}</span>
                        <span className="works-side-ui__step-title">{card.title}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </nav>

            <div className="works-deck" aria-label="Selected project stack">
              {worksDeckCards.map((card, index) => {
                const pose =
                  worksStackPoses[index] ??
                  worksStackPoses[worksStackPoses.length - 1];
                const stepStart = worksRevealLeadIn + index * worksRevealStep;
                const stepEnd = stepStart + worksRevealWindow;
                const reveal = progressWindow(
                  worksProgress,
                  stepStart,
                  stepEnd,
                  easeOutQuint
                );
                const settle = progressWindow(
                  worksProgress,
                  stepStart + worksRevealWindow * 0.68,
                  stepEnd + worksRevealWindow * 0.16,
                  easeOutCubic
                );
                const contentReveal = progressWindow(
                  worksProgress,
                  stepStart + worksRevealWindow * 0.34,
                  stepEnd + worksRevealWindow * 0.08,
                  easeOutCubic
                );
                const shadowReveal = progressWindow(
                  worksProgress,
                  stepStart + worksRevealWindow * 0.12,
                  stepEnd + worksRevealWindow * 0.12,
                  easeOutCubic
                );
                const translateX = mix(pose.entryX, pose.finalX, reveal);
                const translateY =
                  mix(pose.entryY, pose.finalY - 0.85, reveal) +
                  mix(1.4, 0, settle);
                const rotate = mix(pose.entryRotate, pose.finalRotate, reveal);
                const scale = mix(0.78, pose.finalScale, reveal);
                const blur = mix(22, 0, reveal);
                const mediaShift = mix(
                  pose.mediaShiftStart,
                  pose.mediaShiftEnd,
                  reveal
                );
                const isInteractive =
                  index === activeWorksIndex && contentReveal > 0.72;

                const cardStyle = {
                  zIndex: 20 + index * 10,
                  opacity: reveal,
                  filter: `blur(${blur}px)`,
                  pointerEvents: isInteractive ? "auto" : "none",
                  transform: `translate3d(calc(-50% + ${translateX}rem), calc(-50% + ${translateY}rem), 0) rotate(${rotate}deg) scale(${scale})`,
                  boxShadow: `0 ${mix(0.4, 2.8, shadowReveal)}rem ${mix(1.2, 6.2, shadowReveal)}rem rgba(0, 0, 0, ${mix(
                    0.08,
                    0.34,
                    shadowReveal
                  )})`,
                } satisfies CSSProperties;

                return (
                  <article className="works-card" key={card.id} style={cardStyle}>
                    <div
                      className="works-card__media"
                      style={{
                        backgroundImage: card.media,
                        backgroundPosition: card.mediaPosition ?? "center",
                        backgroundSize: card.mediaSize ?? undefined,
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
                        <div className="works-card__topline-copy">
                          <p className="works-card__kicker">{card.kicker}</p>
                          {card.liveUrl ? (
                            <a
                              className="works-card__live"
                              href={card.liveUrl}
                              target="_blank"
                              rel="noreferrer"
                              tabIndex={isInteractive ? 0 : -1}
                              aria-label={`Open live ${card.title} site`}
                            >
                              {card.liveLabel ?? "Live product"}
                            </a>
                          ) : null}
                        </div>
                        <p className="works-card__index">{`0${index + 1}`}</p>
                      </div>

                      <div className="works-card__panel">
                        <div className="works-card__panel-inner">
                          <div className="works-card__copy">
                            <h2>{card.title}</h2>
                            <p>{card.summary}</p>
                          </div>

                          <div className="works-card__footer">
                            <ul className="works-card__points" aria-label={`${card.title} highlights`}>
                              {card.points.map((point) => (
                                <li key={point}>{point}</li>
                              ))}
                            </ul>

                            <Link
                              className="works-card__route"
                              to={card.href}
                              aria-label={`Open ${card.title} project details`}
                              tabIndex={isInteractive ? 0 : -1}
                            >
                              <span>{card.routeLabel}</span>
                              <span className="works-card__route-icon" aria-hidden="true">
                                ↗
                              </span>
                            </Link>
                          </div>
                        </div>
                      </div>
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

function ProjectShowcase({
  detail,
  project,
}: {
  detail: ProjectDetail;
  project: WorkCard;
}) {
  const { ref, progress } = useViewportProgress<HTMLElement>(0.96, -0.06);
  const reveal = progressWindow(progress, 0, 0.28, easeOutCubic);
  const captionReveal = progressWindow(progress, 0.12, 0.32, easeOutCubic);

  const mediaStyle = {
    objectPosition: detail.imagePosition ?? "center",
    objectFit: detail.imageFit ?? "cover",
    transform: `scale(${mix(1.035, 1, reveal)}) translate3d(0, ${mix(0.7, -1.2, progress)}rem, 0)`,
  };

  return (
    <figure
      className="project-page__showcase"
      ref={ref}
      style={{
        opacity: mix(0.78, 1, reveal),
        filter: `blur(${mix(7, 0, reveal)}px)`,
        transform: `translate3d(0, ${mix(1.2, 0, reveal)}rem, 0)`,
      }}
    >
      {detail.image ? (
        <img
          className="project-page__showcase-image"
          src={detail.image}
          alt={detail.imageAlt ?? project.title}
          style={mediaStyle}
        />
      ) : (
        <div
          className="project-page__showcase-fill"
          aria-hidden="true"
          style={{
            backgroundImage: project.media,
            backgroundPosition: project.mediaPosition ?? "center",
            transform: mediaStyle.transform,
          }}
        />
      )}

      <figcaption
        className="project-page__showcase-caption"
        style={{
          opacity: mix(0.72, 1, captionReveal),
          transform: `translate3d(0, ${mix(0.45, 0, captionReveal)}rem, 0)`,
        }}
      >
        {detail.caption ??
          "The interface direction focuses on operational clarity, readable triage, and strong context under pressure."}
      </figcaption>
    </figure>
  );
}

function ProjectGallery({ detail, project }: { detail: ProjectDetail; project: WorkCard }) {
  const { ref, progress } = useViewportProgress<HTMLElement>(0.92, 0.3);
  const reveal = progressWindow(progress, 0, 0.62, easeOutCubic);
  const galleryStyle = detail.galleryStyle ?? "grid";

  if (!detail.screenshots?.length) {
    return null;
  }

  return (
    <section
      className={`project-page__gallery project-page__gallery--${galleryStyle}`}
      ref={ref}
      aria-label={`${project.title} screenshots`}
      style={{
        opacity: mix(0.72, 1, reveal),
        filter: `blur(${mix(6, 0, reveal)}px)`,
        transform: `translate3d(0, ${mix(1, 0, reveal)}rem, 0)`,
      }}
    >
      {detail.galleryTitle || detail.galleryDescription ? (
        <div className="project-page__gallery-intro">
          {detail.galleryTitle ? <h2>{detail.galleryTitle}</h2> : null}
          {detail.galleryDescription ? <p>{detail.galleryDescription}</p> : null}
        </div>
      ) : null}

      <div className="project-page__gallery-grid">
        {detail.screenshots.map((screenshot, index) => (
          <figure
            className={`project-page__gallery-item project-page__gallery-item--${
              screenshot.variant ?? "wide"
            }`}
            key={screenshot.src}
            style={{
              transform: `translate3d(0, ${mix(0.8 + index * 0.28, 0, reveal)}rem, 0)`,
            }}
          >
            <img src={screenshot.src} alt={screenshot.alt} loading="lazy" decoding="async" />
            <figcaption>{screenshot.caption}</figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}

function ProjectStatementParagraph({
  index,
  paragraph,
}: {
  index: number;
  paragraph: string;
}) {
  const { ref, progress } = useViewportProgress<HTMLParagraphElement>(0.92, 0.42);
  const reveal = progressWindow(progress, index * 0.05, 0.72 + index * 0.05, easeOutCubic);

  return (
    <p
      ref={ref}
      style={{
        opacity: mix(0.68, 1, reveal),
        filter: `blur(${mix(5, 0, reveal)}px)`,
        transform: `translate3d(0, ${mix(0.9, 0, reveal)}rem, 0)`,
      }}
    >
      {paragraph}
    </p>
  );
}

function ProjectProfile({
  detail,
  project,
}: {
  detail: ProjectDetail;
  project: WorkCard;
}) {
  const { ref, progress } = useViewportProgress<HTMLElement>(0.9, 0.36);
  const reveal = progressWindow(progress, 0, 0.64, easeOutCubic);
  const detailReveal = progressWindow(progress, 0.18, 0.82, easeOutCubic);

  return (
    <section
      className="project-page__profile"
      ref={ref}
      aria-label={`${project.title} operational overview`}
      style={
        {
          "--project-line-progress": reveal,
        } as CSSProperties
      }
    >
      <div
        className="project-page__profile-copy"
        style={{
          opacity: mix(0.68, 1, reveal),
          filter: `blur(${mix(5, 0, reveal)}px)`,
          transform: `translate3d(0, ${mix(0.9, 0, reveal)}rem, 0)`,
        }}
      >
        <p className="project-page__section-kicker">{detail.eyebrow}</p>
        <h2 className="project-page__section-title">Operational Overview</h2>
        <p className="project-page__body">
          A concise view of the operating surface, the stack behind it, and the
          capabilities that support detection, monitoring, triage, and escalation.
        </p>
      </div>

      <div
        className="project-page__profile-detail"
        style={{
          opacity: mix(0.72, 1, detailReveal),
          transform: `translate3d(0, ${mix(0.8, 0, detailReveal)}rem, 0)`,
        }}
      >
        {detail.groups ? (
          <section className="project-page__spec-section">
            <p className="project-page__section-kicker">Technology Stack</p>
            <div className="project-page__info-groups">
              {detail.groups.map((group) => (
                <div className="project-page__info-group" key={group.label}>
                  <p className="project-page__info-label">{group.label}</p>
                  <div className="project-page__chips">
                    {group.items.map((item) => (
                      <span className="project-page__chip" key={item}>
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        ) : null}

        <section className="project-page__spec-section">
          <p className="project-page__section-kicker">Core Surfaces</p>
          <ul className="project-page__list">
            {project.points.map((point) => (
              <li key={point}>{point}</li>
            ))}
          </ul>
        </section>

        <section className="project-page__spec-section">
          <p className="project-page__section-kicker">Implemented Capabilities</p>
          <ul className="project-page__list">
            {detail.outcomes.map((outcome) => (
              <li key={outcome}>{outcome}</li>
            ))}
          </ul>
        </section>
      </div>
    </section>
  );
}

function ProjectDetailSection({
  index,
  section,
}: {
  index: number;
  section: ProjectDeepDive;
}) {
  const { ref, progress } = useViewportProgress<HTMLElement>(0.9, 0.34);
  const reveal = progressWindow(progress, 0, 0.62, easeOutCubic);

  return (
    <section
      className="project-page__detail-section"
      ref={ref}
      style={
        {
          "--project-line-progress": reveal,
        } as CSSProperties
      }
    >
      <div
        className="project-page__detail-index"
        style={{
          opacity: mix(0.38, 1, reveal),
          transform: `translate3d(0, ${mix(0.7, 0, reveal)}rem, 0)`,
        }}
      >
        {`0${index + 1}`}
      </div>
      <div className="project-page__detail-copy">
        <p
          className="project-page__section-kicker"
          style={{
            opacity: mix(0.7, 1, reveal),
            transform: `translate3d(0, ${mix(0.55, 0, reveal)}rem, 0)`,
          }}
        >
          {section.kicker}
        </p>
        <h2
          className="project-page__section-title"
          style={{
            opacity: mix(0.7, 1, reveal),
            filter: `blur(${mix(5, 0, reveal)}px)`,
            transform: `translate3d(0, ${mix(0.8, 0, reveal)}rem, 0)`,
          }}
        >
          {section.title}
        </h2>
        {section.body.map((paragraph) => (
          <p
            className="project-page__body"
            key={paragraph}
            style={{
              opacity: mix(0.74, 1, reveal),
              transform: `translate3d(0, ${mix(0.65, 0, reveal)}rem, 0)`,
            }}
          >
            {paragraph}
          </p>
        ))}

        {section.points ? (
          <ul
            className="project-page__list project-page__list--compact"
            style={{
              opacity: mix(0.74, 1, reveal),
              transform: `translate3d(0, ${mix(0.6, 0, reveal)}rem, 0)`,
            }}
          >
            {section.points.map((point) => (
              <li key={point}>{point}</li>
            ))}
          </ul>
        ) : null}
      </div>
    </section>
  );
}

function ProjectDetails({ detail, project }: { detail: ProjectDetail; project: WorkCard }) {
  const { ref, progress } = useViewportProgress<HTMLElement>(0.94, 0.42);

  if (!detail.deepDives) {
    return null;
  }

  return (
    <section
      className="project-page__details"
      ref={ref}
      aria-label={`${project.title} project details`}
      style={
        {
          "--project-line-progress": progressWindow(progress, 0, 0.72, easeOutCubic),
        } as CSSProperties
      }
    >
      {detail.deepDives.map((section, index) => (
        <ProjectDetailSection index={index} key={section.title} section={section} />
      ))}
    </section>
  );
}

function ProjectPage() {
  const { projectId } = useParams();
  const project = worksCards.find((item) => item.id === projectId);
  const detail = projectId ? projectDetails[projectId] : undefined;

  if (!project || !detail) {
    return (
      <main className="project-page">
        <section className="project-page__hero">
          <Navbar />

          <div className="project-page__hero-grid">
            <Link className="project-page__back" to="/#works">
              <svg
                className="project-page__back-icon"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
                />
              </svg>
              <span>Back To Works</span>
            </Link>

            <div className="project-page__hero-center">
              <p className="project-page__tag">
                <span>(PROJECT</span>
                <span className="project-page__tag-dot">.</span>
                <span>)</span>
              </p>
              <h1 className="project-page__title">This project page is not available.</h1>
              <p className="project-page__subtitle">
                The requested project could not be found in the current site build.
              </p>
            </div>
          </div>
        </section>
      </main>
    );
  }

  const gallery = <ProjectGallery detail={detail} project={project} />;
  const showGalleryAfterStatement = detail.galleryPlacement === "after-statement";

  return (
    <main className={`project-page project-page--${project.id}`}>
      <section className="project-page__hero">
        <Navbar />

        <div className="project-page__side-ui" aria-hidden="true">
          <span className="project-page__side-label">03 / PROJECT</span>
          <span className="project-page__side-line" />
        </div>

        <div className="project-page__hero-grid">
          <Link className="project-page__back" to="/#works">
            <svg
              className="project-page__back-icon"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
              />
            </svg>
            <span>Back To Works</span>
          </Link>

          <div className="project-page__hero-center">
            <p className="project-page__tag">
              <span>(PROJECT</span>
              <span className="project-page__tag-dot">.</span>
              <span>)</span>
            </p>

            <h1 className="project-page__title">
              <span className="project-page__title-line">{detail.title}</span>
              <span className="project-page__title-line project-page__title-line--accent">
                {project.kicker}
              </span>
            </h1>

            <p className="project-page__subtitle">{detail.lead}</p>

            {project.liveUrl ? (
              <div className="project-page__actions">
                <a
                  className="project-page__external-link"
                  href={project.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`Open live ${project.title} site`}
                >
                  <span>{project.liveLabel ?? "Live Product"}</span>
                  <span className="project-page__external-icon" aria-hidden="true">
                    ↗
                  </span>
                </a>
              </div>
            ) : null}

            <dl className="project-page__metrics" aria-label={`${project.title} metrics`}>
              {detail.metrics.map((metric) => (
                <div className="project-page__metric" key={metric.label}>
                  <dt className="project-page__metric-label">{metric.label}</dt>
                  <dd className="project-page__metric-value">{metric.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      <section className="project-page__content">
        <div className="project-page__shell">
          <ProjectShowcase detail={detail} project={project} />
          {showGalleryAfterStatement ? null : gallery}

          <section className="project-page__statement" aria-label={`${project.title} overview`}>
            {detail.body.map((paragraph, index) => (
              <ProjectStatementParagraph index={index} key={paragraph} paragraph={paragraph} />
            ))}
          </section>

          {showGalleryAfterStatement ? gallery : null}

          <ProjectProfile detail={detail} project={project} />
          <ProjectDetails detail={detail} project={project} />
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
            <svg
              className="about-page__hero-back-icon"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
              />
            </svg>
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
        <Route path="/projects/:projectId" element={<ProjectPage />} />
        <Route path="*" element={<HomePage />} />
      </Routes>
    </>
  );
}

export default App;
