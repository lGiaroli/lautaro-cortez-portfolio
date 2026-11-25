import "./lateralEvidence.css";
import { useLocale } from "../i18n/locale";

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
  const locale = useLocale();
  return (
    <EvidenceFlow
      variant="etl"
      eyebrow={locale === "es" ? "ETL · ciclo de importación" : "ETL · import lifecycle"}
      title={locale === "es" ? "Revisar antes de hacer cambios en V6" : "A review checkpoint before V6 changes"}
      caption={locale === "es" ? "Flujo ilustrativo de una prueba piloto sintética y acotada. No se muestran datos de clientes." : "Illustrative flow from a scoped synthetic pilot. No tenant or customer data shown."}
      steps={locale === "es" ? [
        { label: "Origen", title: "Archivo CSV", detail: "Datos del caso" },
        { label: "Preparación", title: "Asignar y validar", detail: "Normalizar campos" },
        { label: "Revisión", title: "Vista previa de cambios", detail: "Altas y actualizaciones" },
        { label: "Guardar", title: "Registros de V6", detail: "Casos y actividad financiera" },
      ] : [
        { label: "Source", title: "CSV file", detail: "Case data" },
        { label: "Prepare", title: "Map & validate", detail: "Normalize fields" },
        { label: "Review", title: "Preview changes", detail: "Adds and updates" },
        { label: "Save", title: "V6 records", detail: "Cases + financial activity" },
      ]}
    />
  );
}

function FinanceIntegrationFlow() {
  const locale = useLocale();
  return (
    <EvidenceFlow
      variant="finance"
      eyebrow={locale === "es" ? "Finanzas · asignación" : "Finance · allocation path"}
      title={locale === "es" ? "Seguir los pagos hasta revisar la remesa" : "Trace payment activity into remittance review"}
      caption={locale === "es" ? "Flujo conceptual de una prueba de QA acotada con pagos mixtos. No se muestran datos de clientes ni pagos." : "Conceptual flow for a scoped mixed-payment QA run. No customer or payment data shown."}
      steps={locale === "es" ? [
        { label: "Entrada", title: "Actividad de pagos", detail: "Registros de pagos" },
        {
          label: "Separar",
          title: "Aplicar reglas de asignación",
          items: ["Cobranzas de agencia", "Cobranzas directas"],
        },
        {
          label: "Revisar",
          title: "Resumen de remesa",
          items: ["Importe neto", "Cargos", "Ajustes positivos o negativos"],
        },
      ] : [
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
