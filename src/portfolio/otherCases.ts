import type { CaseStudy } from "./caseTypes";
import ropeeHome from "../assets/cases/ropee-home.jpg";
import ropeeRoutines from "../assets/cases/ropee-routines.jpg";
import ropeeProgress from "../assets/cases/ropee-progress.jpg";
import aurobitDesk from "../assets/cases/aurobit-stationery-desk.webp";
import aurobitHome from "../assets/cases/aurobit-home.jpg";
import aurobitCatalog from "../assets/cases/aurobit-catalog.jpg";
import aurobitProduct from "../assets/cases/aurobit-product.jpg";
import familyGardenFlowers from "../assets/cases/family-garden-flower-variants.png";
import familyGardenPlacement from "../assets/cases/family-garden-flower-placement-flow.jpg";
import familyGardenLeaves from "../assets/cases/family-garden-leaf-density-before-after.jpg";
import familyGardenEditor from "../assets/cases/family-garden-editor-flower-settings.jpg";
import brumaLibrary from "../assets/cases/bruma-library-synthetic.png";
import brumaReader from "../assets/cases/bruma-reader.jpg";

export const otherCases = [
  {
    id: "ropee",
    group: "other-works",
    title: "Ropee",
    subtitle: "A mobile jump-rope training app built around routines and steady progress.",
    summary:
      "I’m building a training companion that takes jump-rope workouts from a guided plan to a timed session, then makes progress easy to revisit.",
    role: "Product design & mobile app development",
    status: "Public GitHub project · in development",
    stack: ["Expo", "React Native", "TypeScript"],
    gallery: [
      {
        src: ropeeHome,
        alt: "Ropee home screen with weekly activity, training goals, and the daily challenge",
        caption: "The home screen brings the weekly goal and daily challenge together.",
        orientation: "portrait",
      },
      {
        src: ropeeRoutines,
        alt: "Ropee routine library with recommended workouts, categories, and custom routines",
        caption: "Train with a recommended routine or build a session from scratch.",
        orientation: "portrait",
      },
      {
        src: ropeeProgress,
        alt: "Ropee progress screen with level, daily streak, and weekly training activity",
        caption: "The progress screen tracks streaks, training time, jumps, and completed workouts.",
        orientation: "portrait",
      },
    ],
    sections: [
      {
        id: "training-flow",
        title: "Make it easy to start",
        body: [
          "Ropee brings a routine library, a custom routine builder, and a workout timer into one focused mobile flow. A session has a clear plan, a guided sequence, and a completion state.",
        ],
        points: ["Guided routines", "Build and save custom sessions", "Timed workout flow"],
      },
      {
        id: "progress-loop",
        title: "Turn sessions into momentum",
        body: [
          "History, progress summaries, missions, and achievement badges make completed workouts part of a longer practice loop.",
        ],
        points: ["Workout history and statistics", "Missions and achievements", "Focused tests for timer, routines, and progress logic"],
      },
    ],
    links: [{ label: "View Ropee on GitHub", href: "https://github.com/lGiaroli/Ropee" }],
  },
  {
    id: "family-garden",
    group: "other-works",
    title: "Family Garden",
    subtitle: "A Windows bouquet editor for turning flower collections into print-ready artwork.",
    summary:
      "I built a desktop editor where a seasonal flower library becomes an editable bouquet poster, with vector exports that can continue into Adobe Illustrator.",
    role: "Product design & desktop engineering",
    status: "Windows desktop build · vector export verified",
    stack: ["Rust", "SVG", "Adobe Illustrator"],
    gallery: [
      {
        src: familyGardenPlacement,
        alt: "Family Garden bouquet exports comparing flower orientation across four species",
        caption: "Exports used to check how each flower follows its stem.",
      },
      {
        src: familyGardenLeaves,
        alt: "Family Garden exported bouquet artwork before and after a change in foliage density",
        caption: "The exported artwork made it possible to compare leaf placement across the collection.",
      },
      {
        src: familyGardenEditor,
        alt: "Family Garden editor controls for flower variants, relationship, and generation",
        caption: "The editor connects a flower variant to each member’s place in the family tree.",
      },
    ],
    sections: [
      {
        id: "flower-library",
        title: "Build each bouquet from editable parts",
        body: [
          "The canvas brings together a 24-design seasonal collection. Flower variants, stems, and leaves stay editable as the composition changes.",
        ],
        points: ["24 bouquet designs", "Editable flower variants and stem connections", "A shared library for repeatable arrangements"],
        media: {
          src: familyGardenFlowers,
          alt: "Three illustrated Morning Glory flower variants",
          caption: "One flower species prepared as reusable front, profile, and bud variants.",
        },
      },
      {
        id: "print-export",
        title: "Carry the artwork into print",
        body: [
          "I shaped the export around transparent, editable vectors and verified the generated artwork in Illustrator, so the poster can move from the editor into a print workflow.",
        ],
        points: ["240 transparent position SVGs across the collection", "Print-sized artwork with editable vector paths", "Export and reopen flow checked against the rendered designs"],
      },
    ],
  },
  {
    id: "aurobit",
    group: "other-works",
    title: "Aurobit",
    subtitle: "A stationery brand shaped into a bright, product-led online shop.",
    summary:
      "I designed and built Aurobit’s storefront around its custom notebook designs, making product discovery feel like part of the brand experience.",
    role: "Brand and product design · storefront development",
    status: "Live storefront · companion admin preview",
    stack: ["JavaScript", "CSS", "Cloudflare"],
    gallery: [
      {
        src: aurobitHome,
        alt: "Aurobit storefront home with colorful notebook covers and the shop entry",
        caption: "The storefront opens with original stationery artwork and a direct path to the shop.",
      },
      {
        src: aurobitCatalog,
        alt: "Aurobit catalog with search, category filters, sorting, and notebook cards",
        caption: "The catalog brings categories, tags, search, and product variants into one browsing flow.",
      },
      {
        src: aurobitProduct,
        alt: "Flower check notebook product page showing size options and the quantity control",
        caption: "The notebook detail shows artwork, paper sizes, and options for the selected variant.",
      },
    ],
    sections: [
      {
        id: "brand-to-storefront",
        title: "Bring the brand into the shopping flow",
        body: [
          "The storefront pairs custom stationery imagery and color with a browsable notebook catalog, category navigation, and search and tag filters.",
        ],
        media: {
          src: aurobitDesk,
          alt: "Aurobit notebooks and stationery arranged on a desk",
          caption: "Original stationery imagery used in the storefront.",
        },
      },
      {
        id: "store-operations",
        title: "Connect the storefront to daily operations",
        body: [
          "I also designed a companion admin dashboard preview for maintaining catalog and product operations, extending the work from the customer-facing shop into the business workspace.",
        ],
        points: ["A live public storefront", "A separate admin dashboard preview", "A consistent visual system across shopping and management"],
      },
    ],
    links: [
      { label: "Visit Aurobit", href: "https://aurobitstudio.com/" },
      { label: "Browse the shop", href: "https://aurobitstudio.com/tienda" },
    ],
  },
  {
    id: "bruma",
    group: "other-works",
    title: "Bruma",
    subtitle: "A calm Windows PDF reader for books with dense internal references.",
    summary:
      "I built a desktop reading experience that keeps technical PDFs and their cross-references connected, with navigation that returns readers to the place they left.",
    role: "Product design & desktop engineering",
    status: "Windows desktop application",
    stack: ["C#", "WPF", ".NET 8", "PDF.js", "WebView2"],
    gallery: [
      {
        src: brumaLibrary,
        alt: "Bruma’s Windows library showing an example PDF and its cover",
        caption: "The local library gives readers one place to find their books and recent reads.",
      },
      {
        src: brumaReader,
        alt: "Bruma’s desktop reader with a sample PDF open and page controls in the top bar",
        caption: "The reading view keeps search, page navigation, and zoom within reach. Shown with a sample document.",
      },
    ],
    sections: [
      {
        id: "reference-navigation",
        title: "Follow a reference and find your way back",
        body: [
          "Opening an internal PDF reference jumps to its destination, while a return action restores the original page and scroll position. Chained references can be retraced in reverse order without losing the current zoom.",
        ],
        points: ["Context-preserving return navigation", "Reference history capped at 64 jumps", "PDF destination and zoom preserved"],
      },
      {
        id: "local-reading-space",
        title: "Keep the reading workspace focused",
        body: [
          "Native Windows library and navigation controls frame the PDF.js reader inside WebView2. Books and their index stay in the local application profile, and the reader does not depend on a local server.",
        ],
        points: ["WPF desktop shell", "PDF.js rendering and internal links", "Local library and index"],
      },
    ],
  },
] satisfies CaseStudy[];
