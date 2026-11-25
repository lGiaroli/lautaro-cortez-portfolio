import type { CaseStudy } from "./caseTypes";
import lateralEtlPreview from "../assets/cases/lateral-etl-preview.png";
import lateralMarketingPreview from "../assets/cases/lateral-marketing-preview.jpg";
import etlTransformPicker from "../assets/cases/lateral-etl-transformation-picker.png";
import etlTransformInspector from "../assets/cases/lateral-etl-transformation-inspector.png";
import etlDryRun from "../assets/cases/lateral-etl-dry-run.png";
import operationsChecks from "../assets/cases/lateral-operations-check-workflow.png";
import operationsManualCheck from "../assets/cases/lateral-operations-manual-check.png";
import marketingWorkflow from "../assets/cases/lateral-marketing-how-it-works.jpg";
import marketingLaunch from "../assets/cases/lateral-marketing-nai-launch.jpg";

export const lateralCases = [
  {
    id: "lateral-etl",
    group: "lateral",
    title: "ETL imports into V6",
    subtitle: "A controlled path from CSV exports to native case records",
    summary:
      "Designed and verified a CSV-to-V6 import pilot with exact change previews and predictable repeat handling.",
    role: "Import workflow design, field mapping, and end-to-end QA",
    status: "End-to-end verified in a scoped synthetic pilot",
    stack: ["CSV ingestion", "Extract · Transform · Load", "Lateral V6"],
    gallery: [
      {
        src: etlTransformPicker,
        alt: "ETL workflow editor with the transformation picker open",
        caption: "Choose a field transformation while building the import workflow.",
      },
      {
        src: etlTransformInspector,
        alt: "ETL workflow canvas with the transformation inspector open",
        caption: "Inspect mapping rules and validation between the source and destination.",
      },
      {
        src: etlDryRun,
        alt: "Successful ETL dry run with a sample preview and run details",
        caption: "Review the test run and its sample results before execution.",
      },
    ],
    sections: [
      {
        id: "review-before-import",
        title: "Review changes before import",
        body: [
          "The workflow extracts and transforms CSV data into V6 case fields, then previews the exact additions or updates before saving. That gives operators a clear checkpoint between a source file and changes in the case system.",
        ],
        points: [
          "Separates new cases from updates in the preview",
          "Returns clear rejection outcomes for invalid or out-of-scope requests",
          "Provides a downloadable run summary",
        ],
        media: {
          src: lateralEtlPreview,
          alt: "ETL field mapping and transform preview in the demo tenant",
          caption: "Field mapping and transform preview in the demo tenant",
        },
      },
      {
        id: "repeat-safe-imports",
        title: "Make repeat runs predictable",
        body: [
          "I verified repeat and rejection paths alongside successful imports. Updates stayed consistent across repeat runs without multiplying existing addresses.",
        ],
        points: [
          "Same-content retries return the persisted outcome",
          "Changed payloads and scope mismatches are rejected",
          "The verified workflow is limited to one synthetic pilot portfolio",
        ],
      },
    ],
  },
  {
    id: "lateral-operations",
    group: "lateral",
    title: "Payments, remittance & integrations",
    subtitle: "Carry financial meaning from imported records through review",
    summary:
      "Mapped and verified payment, fee, and remittance rules so mixed collections could be reconciled through a clear, auditable summary.",
    role: "Workflow design, integration mapping, configuration, and QA",
    status: "V4-to-V6 finance QA; SFTP handoff exercised in test mode",
    stack: ["Lateral V6", "Payment operations", "Remittance reporting"],
    gallery: [
      {
        src: operationsChecks,
        alt: "Print Checks interface with categories, filters, and batch review controls",
        caption: "The check workflow in a synthetic local demo.",
      },
      {
        src: operationsManualCheck,
        alt: "Synthetic manual-check form with check-number and amount fields",
        caption: "The local QA form records a physical check against the selected costs.",
      },
    ],
    sections: [
      {
        id: "connect-financial-records",
        title: "Connect incoming data to financial activity",
        body: [
          "I mapped imported case changes to V6's native records and financial activity, with an explicit preview before writes. The same work checked that updates stayed consistent with existing case data.",
        ],
      },
      {
        id: "trace-remittance-totals",
        title: "Keep remittance totals traceable",
        body: [
          "Mixed payment flows need to distinguish agency and direct collections, fees, net remittance, and signed adjustments. I shaped the configurable reporting and invoice path around those separate meanings, then checked the generated output against a scoped mixed-payment run.",
        ],
        points: [
          "Preserves the split between direct and agency amounts",
          "Carries fee and reversal signs through the summary",
          "Checks aggregate totals against the underlying payment rows",
        ],
      },
      {
        id: "checks-and-credit-memos",
        title: "Separate check voids from cost cancellations",
        body: [
          "During a V4-to-V6 finance QA release, I verified an issued-check void alongside a separate invoiced-cost cancellation and credit-memo path. The history keeps reversal of the payment instrument distinct from crediting the underlying cost.",
        ],
      },
      {
        id: "dialler-sftp-handoff",
        title: "Test a controlled dialler handoff",
        body: [
          "For a separate staging workflow, I exercised the outbound same-day dialler path against an SFTP test destination. A per-record audit captured sent and held decisions in test mode.",
          "Scope: staging and a test destination only. Returned dialler-result imports were not part of this verified work.",
        ],
      },
    ],
  },
  {
    id: "lateral-marketing",
    group: "lateral",
    title: "Lateral marketing website",
    subtitle: "An interactive brand story that leads into a product demo",
    summary:
      "Designed and built a public marketing preview that pairs a people-first landing page with a guided product-demo experience for a complex operations platform.",
    role: "Visual design, web experience, motion, and interaction",
    status: "Public design preview",
    stack: ["Marketing website", "Interactive prototype", "Motion design"],
    gallery: [
      {
        src: lateralMarketingPreview,
        alt: "Lateral marketing preview with a video hero and editorial headline",
        caption: "The public design preview opens with a video hero.",
      },
      {
        src: marketingWorkflow,
        alt: "Lateral marketing preview illustrating the import, workflow, and payment stages",
        caption: "The product section explains how data moves through Lateral.",
      },
      {
        src: marketingLaunch,
        alt: "Lateral marketing preview introducing an operations copilot",
        caption: "A section of the public design preview presents the Launch concept.",
      },
    ],
    sections: [
      {
        id: "brand-story",
        title: "Set the tone with a human story",
        body: [
          "The landing page opens with an editorial message, cinematic video, and restrained motion, then connects that brand story to the everyday work Lateral supports.",
        ],
      },
      {
        id: "product-demo",
        title: "Move from story to product",
        body: [
          "A linked demo experience lets visitors explore illustrative product scenarios in the browser. It is a design preview for review; its sample cases do not perform real case actions or communications.",
        ],
      },
    ],
    links: [
      {
        label: "Open the public design preview",
        href: "https://lateral-design-preview.lautarogiaroli.chatgpt.site/",
      },
    ],
  },
] satisfies CaseStudy[];
