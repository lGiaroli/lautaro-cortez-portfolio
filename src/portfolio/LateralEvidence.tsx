import "./lateralEvidence.css";

type EvidenceStep = {
  label: string;
  title: string;
  detail?: string;
  items?: string[];
};

function EvidenceFlow({
  eyebrow,
  title,
  steps,
  caption,
  variant,
}: {
  eyebrow: string;
  title: string;
  steps: EvidenceStep[];
  caption: string;
  variant: "etl" | "finance";
}) {
  return (
    <figure className={`lateral-evidence lateral-evidence--${variant}`}>
      <header className="lateral-evidence__heading">
        <p className="lateral-evidence__eyebrow">{eyebrow}</p>
        <h3>{title}</h3>
      </header>
      <ol className="lateral-evidence__steps">
        {steps.map((step, index) => (
          <li className="lateral-evidence__step" key={step.label}>
            <div className="lateral-evidence__node">
              <span className="lateral-evidence__index" aria-hidden="true">
                {String(index + 1).padStart(2, "0")}
              </span>
              <div className="lateral-evidence__copy">
                <span className="lateral-evidence__label">{step.label}</span>
                <strong>{step.title}</strong>
                {step.detail && <span className="lateral-evidence__detail">{step.detail}</span>}
                {step.items && (
                  <ul className="lateral-evidence__items">
                    {step.items.map((item) => <li key={item}>{item}</li>)}
                  </ul>
                )}
              </div>
            </div>
          </li>
        ))}
      </ol>
      <figcaption>{caption}</figcaption>
    </figure>
  );
}

function EtlImportFlow() {
  return (
    <EvidenceFlow
      variant="etl"
      eyebrow="ETL · import lifecycle"
      title="A review checkpoint before V6 changes"
      caption="Illustrative flow from a scoped synthetic pilot. No tenant or customer data shown."
      steps={[
        { label: "Source", title: "CSV file", detail: "Case data" },
        { label: "Prepare", title: "Map & validate", detail: "Normalize fields" },
        { label: "Review", title: "Preview changes", detail: "Adds and updates" },
        { label: "Save", title: "V6 records", detail: "Cases + financial activity" },
      ]}
    />
  );
}

function FinanceIntegrationFlow() {
  return (
    <EvidenceFlow
      variant="finance"
      eyebrow="Finance · allocation path"
      title="Trace payment activity into remittance review"
      caption="Conceptual flow for a scoped mixed-payment QA run. No customer or payment data shown."
      steps={[
        { label: "Input", title: "Payment activity", detail: "Recorded payment rows" },
        {
          label: "Separate",
          title: "Apply allocation rules",
          items: ["Agency collections", "Direct collections"],
        },
        {
          label: "Review",
          title: "Remittance summary",
          items: ["Net amount", "Fees", "Signed adjustments"],
        },
      ]}
    />
  );
}

export function LateralEvidence({ studyId, sectionId }: { studyId: string; sectionId: string }) {
  if (studyId === "lateral-etl" && sectionId === "review-before-import") return <EtlImportFlow />;
  if (studyId === "lateral-operations" && sectionId === "trace-remittance-totals") {
    return <FinanceIntegrationFlow />;
  }
  return null;
}
