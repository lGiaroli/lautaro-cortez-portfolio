import type { CaseStudy } from "./caseTypes";
import visualWorkflowCapture from "../assets/cases/lateral-visual-workflow.jpg";

export const lateralV6 = {
  id: "lateral-v6",
  group: "lateral",
  title: "Lateral V6",
  subtitle: "Modernizing the case workspace",
  summary: "I helped move a collections platform from V4 to V6, redesigning the workspace operators use to review a debtor, decide what comes next, and act on a case.",
  role: "Product design, software engineering, and QA",
  status: "V4 → V6 migration",
  stack: ["React", "TypeScript", "MySQL"],
  sections: [
    {
      id: "case-workspace",
      title: "The debtor page, before and after",
      body: [
        "The case is the operator’s point of reference. I helped reorganize the V6 workspace around the active workflow stage, kept the saved layout intact, and made the selection and order of sidebar panels editable by user group.",
        "I also worked on contact details, case markers, and document and letter navigation so the operator could review a case without losing context.",
      ],
      points: [
        "Case details and financial context remain visible in the main view.",
        "Editable side panels keep contact details and activity within reach.",
        "Contact editing works in the constrained space of a case panel.",
      ],
    },
    {
      id: "payment-propensity",
      title: "Propensity to Pay",
      body: [
        "I built an optional Overview panel that shows an indicative 30-day payment estimate and explains the evidence and missing information behind it. The panel can be added, resized, or reordered within the case.",
        "The Accounts grid can sort Payment score across the full filtered result set. The estimate is a review aid, and the explanation lets operators assess the recorded evidence for themselves.",
      ],
    },
    {
      id: "visual-workflow",
      title: "Testing a visual workflow",
      body: [
        "I contributed to bringing 23 V4 result actions into V6 and built an editor for task outcomes and their ordered actions. In the Visual Workflow Builder, I added a case test that traces a chosen route and pauses at a task so the operator can choose an outcome.",
        "The test is read-only. It uses saved case data, shows the route it can evaluate, and explains when a rule requires information available only during live execution.",
      ],
      media: {
        src: visualWorkflowCapture,
        alt: "Real Visual Workflow Builder canvas showing a case entry trigger, a decision node, and two outcome branches.",
        caption: "A demo workflow in the Visual Workflow Builder.",
      },
    },
    {
      id: "operator-controls",
      title: "Controls that carry across V6",
      body: [
        "I also contributed shared UI patterns across the application. These changes give operators a more consistent experience when they filter records, manage access, run reports, and map files to import.",
      ],
      points: [
        "Editable filter chips stay visible in the Accounts grid.",
        "Role templates and action permissions can be managed from the same workspace.",
        "The Import Designer brings setup, sample files, and field mapping into three steps.",
        "Reports can run in the application and export using the filters from the last successful run.",
      ],
    },
  ],
} satisfies CaseStudy;
