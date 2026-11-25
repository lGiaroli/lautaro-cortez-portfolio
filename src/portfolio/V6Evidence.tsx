import { useState } from "react";
import v4DebtorView from "../assets/cases/lateral-v4-debtor.jpg";
import v6DebtorView from "../assets/cases/lateral-v6-debtor.jpg";

type WorkspaceView = "compare" | "before" | "after";

const workspaceCaptures = [
  {
    id: "before",
    version: "V4 / Before",
    title: "Tasks, payment plan, and financial summary",
    alt: "Product capture of the Lateral V4 debtor overview, with navigation tabs and separate task, payment plan, and financial panels.",
    src: v4DebtorView,
  },
  {
    id: "after",
    version: "V6 / After",
    title: "Case context and actions in one workspace",
    alt: "Product capture of a synthetic case in Lateral V6 showing its identity, quick actions, and tabs for notes, payments, participants, and documents.",
    src: v6DebtorView,
  },
] as const;

const workspaceViews = [
  ["compare", "Compare"],
  ["before", "V4 only"],
  ["after", "V6 only"],
] as const;

function WorkspaceComparison() {
  const [view, setView] = useState<WorkspaceView>("compare");

  return (
    <figure className="case-demo">
      <div className="case-demo__controls" role="group" aria-label="Case workspace comparison">
        {workspaceViews.map(([value, label]) => (
          <button key={value} type="button" aria-pressed={view === value} onClick={() => setView(value)}>
            {label}
          </button>
        ))}
      </div>
      <div className="case-demo__comparison" data-view={view}>
        {workspaceCaptures.filter((capture) => view === "compare" || capture.id === view).map((capture) => (
          <div key={capture.id} className={`case-demo__panel case-capture case-capture--${capture.id}`}>
            <p className="case-kicker">{capture.version}</p>
            <h3>{capture.title}</h3>
            <a href={capture.src} target="_blank" rel="noreferrer" aria-label={`Open the ${capture.version.slice(0, 2)} capture at full size`}>
              <img src={capture.src} alt={capture.alt} decoding="async" />
              <span>Open capture ↗</span>
            </a>
          </div>
        ))}
      </div>
      <figcaption>V4 workspace capture with case details obscured, alongside a V6 capture from a synthetic QA case.</figcaption>
    </figure>
  );
}

function PaymentPropensity() {
  return (
    <figure className="case-demo">
      <div className="case-demo__panel case-demo__panel--score">
        <div className="case-score">
          <div>
            <p className="case-kicker">30-day estimate</p>
            <h3>Payment propensity</h3>
          </div>
          <strong className="case-score__value">62<span>%</span></strong>
          <meter min={0} max={100} value={62} aria-label="Illustrative payment propensity score" />
        </div>
        <details className="case-score__reasons" open>
          <summary>Evidence to review</summary>
          <ul>
            <li><span>Payments</span> A recent settled payment</li>
            <li><span>Contact</span> A recorded contact outcome</li>
            <li><span>Engagement</span> A recent inbound message</li>
          </ul>
        </details>
      </div>
      <figcaption>Synthetic evidence and an indicative estimate for review.</figcaption>
    </figure>
  );
}

const workflowOutcomes = [
  { label: "Contact made", destination: "Review payment options", detail: "The preview routes to a payment review task." },
  { label: "No answer", destination: "Schedule a follow-up", detail: "The preview routes to a follow-up task." },
] as const;

function WorkflowTest() {
  const [outcome, setOutcome] = useState(0);
  const selected = workflowOutcomes[outcome];

  return (
    <figure className="case-demo">
      <div className="case-demo__panel">
        <p className="case-kicker">Synthetic case 02418 / Read-only preview</p>
        <ol className="case-flow" aria-label="Simulated workflow route">
          <li><span>Start</span><strong>Contact review</strong></li>
          <li><span>Task</span><strong>Contact debtor</strong></li>
          <li className="case-flow__branches">
            <span>Choose a task outcome</span>
            <div className="case-flow__choices" role="group" aria-label="Choose a task outcome">
              {workflowOutcomes.map(({ label, destination }, index) => (
                <button key={label} type="button" aria-pressed={outcome === index} onClick={() => setOutcome(index)}>
                  <span>{label}</span>
                  <strong>{destination}</strong>
                </button>
              ))}
            </div>
          </li>
        </ol>
        <p className="case-flow__result" aria-live="polite">{selected.detail} The case itself stays in Contact review.</p>
      </div>
      <figcaption>Interactive illustration of the read-only workflow test.</figcaption>
    </figure>
  );
}

export function V6Evidence({ section }: { section: string }) {
  switch (section) {
    case "case-workspace": return <WorkspaceComparison />;
    case "payment-propensity": return <PaymentPropensity />;
    case "visual-workflow": return <WorkflowTest />;
    default: return null;
  }
}
