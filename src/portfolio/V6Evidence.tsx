import { useState } from "react";
import { useLocale } from "../i18n/locale";
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
  const locale = useLocale();
  const [view, setView] = useState<WorkspaceView>("compare");
  const captures = locale === "es"
    ? workspaceCaptures.map((capture) => capture.id === "before"
      ? { ...capture, version: "V4 / Antes", title: "Tareas, plan de pago y resumen financiero", alt: "Captura del producto Lateral V4: resumen de la persona deudora con pestañas de navegación y paneles separados para tareas, plan de pago e información financiera." }
      : { ...capture, version: "V6 / Después", title: "El contexto del caso y sus acciones en un solo espacio", alt: "Captura de un caso sintético en Lateral V6 con datos de identidad, acciones rápidas y pestañas para notas, pagos, participantes y documentos." })
    : workspaceCaptures;
  const controls = locale === "es"
    ? [["compare", "Comparar"], ["before", "Solo V4"], ["after", "Solo V6"]] as const
    : workspaceViews;

  return (
    <figure className="case-demo">
      <div className="case-demo__controls" role="group" aria-label={locale === "es" ? "Comparación del espacio del caso" : "Case workspace comparison"}>
        {controls.map(([value, label]) => (
          <button key={value} type="button" aria-pressed={view === value} onClick={() => setView(value)}>
            {label}
          </button>
        ))}
      </div>
      <div className="case-demo__comparison" data-view={view}>
        {captures.filter((capture) => view === "compare" || capture.id === view).map((capture) => (
          <div key={capture.id} className={`case-demo__panel case-capture case-capture--${capture.id}`}>
            <p className="case-kicker">{capture.version}</p>
            <h3>{capture.title}</h3>
            <a href={capture.src} target="_blank" rel="noreferrer" aria-label={locale === "es" ? `Abrir la captura ${capture.version.slice(0, 2)} en tamaño completo` : `Open the ${capture.version.slice(0, 2)} capture at full size`}>
              <img src={capture.src} alt={capture.alt} decoding="async" />
              <span>{locale === "es" ? "Abrir captura ↗" : "Open capture ↗"}</span>
            </a>
          </div>
        ))}
      </div>
      <figcaption>{locale === "es" ? "Captura de V4 con los datos del caso ocultos, junto a una captura de V6 de un caso sintético de QA." : "V4 workspace capture with case details obscured, alongside a V6 capture from a synthetic QA case."}</figcaption>
    </figure>
  );
}

function PaymentPropensity() {
  const locale = useLocale();
  return (
    <figure className="case-demo">
      <div className="case-demo__panel case-demo__panel--score">
        <div className="case-score">
          <div>
            <p className="case-kicker">{locale === "es" ? "Estimación a 30 días" : "30-day estimate"}</p>
            <h3>{locale === "es" ? "Propensión de pago" : "Payment propensity"}</h3>
          </div>
          <strong className="case-score__value">62<span>%</span></strong>
          <meter min={0} max={100} value={62} aria-label={locale === "es" ? "Puntaje ilustrativo de propensión de pago" : "Illustrative payment propensity score"} />
        </div>
        <details className="case-score__reasons" open>
          <summary>{locale === "es" ? "Evidencia para revisar" : "Evidence to review"}</summary>
          <ul>
            <li><span>{locale === "es" ? "Pagos" : "Payments"}</span> {locale === "es" ? "Un pago reciente acreditado" : "A recent settled payment"}</li>
            <li><span>{locale === "es" ? "Contacto" : "Contact"}</span> {locale === "es" ? "Un resultado de contacto registrado" : "A recorded contact outcome"}</li>
            <li><span>{locale === "es" ? "Interacción" : "Engagement"}</span> {locale === "es" ? "Un mensaje entrante reciente" : "A recent inbound message"}</li>
          </ul>
        </details>
      </div>
      <figcaption>{locale === "es" ? "Evidencia sintética y una estimación orientativa para revisar." : "Synthetic evidence and an indicative estimate for review."}</figcaption>
    </figure>
  );
}

const workflowOutcomes = [
  { label: "Contact made", destination: "Review payment options", detail: "The preview routes to a payment review task." },
  { label: "No answer", destination: "Schedule a follow-up", detail: "The preview routes to a follow-up task." },
] as const;

function WorkflowTest() {
  const locale = useLocale();
  const [outcome, setOutcome] = useState(0);
  const outcomes = locale === "es"
    ? [
      { label: "Hubo contacto", destination: "Revisar opciones de pago", detail: "La vista previa dirige a una tarea de revisión de pago." },
      { label: "No hubo respuesta", destination: "Programar seguimiento", detail: "La vista previa dirige a una tarea de seguimiento." },
    ]
    : workflowOutcomes;
  const selectedOutcome = outcomes[outcome];

  return (
    <figure className="case-demo">
      <div className="case-demo__panel">
        <p className="case-kicker">{locale === "es" ? "Caso sintético 02418 / Vista de solo lectura" : "Synthetic case 02418 / Read-only preview"}</p>
        <ol className="case-flow" aria-label={locale === "es" ? "Recorrido simulado del flujo" : "Simulated workflow route"}>
          <li><span>{locale === "es" ? "Inicio" : "Start"}</span><strong>{locale === "es" ? "Revisión de contacto" : "Contact review"}</strong></li>
          <li><span>{locale === "es" ? "Tarea" : "Task"}</span><strong>{locale === "es" ? "Contactar a la persona" : "Contact debtor"}</strong></li>
          <li className="case-flow__branches">
            <span>{locale === "es" ? "Elegir el resultado de la tarea" : "Choose a task outcome"}</span>
            <div className="case-flow__choices" role="group" aria-label={locale === "es" ? "Elegir el resultado de la tarea" : "Choose a task outcome"}>
              {outcomes.map(({ label, destination }, index) => (
                <button key={label} type="button" aria-pressed={outcome === index} onClick={() => setOutcome(index)}>
                  <span>{label}</span>
                  <strong>{destination}</strong>
                </button>
              ))}
            </div>
          </li>
        </ol>
        <p className="case-flow__result" aria-live="polite">{selectedOutcome.detail} {locale === "es" ? "El caso permanece en Revisión de contacto." : "The case itself stays in Contact review."}</p>
      </div>
      <figcaption>{locale === "es" ? "Ilustración interactiva de la prueba de flujo en modo de solo lectura." : "Interactive illustration of the read-only workflow test."}</figcaption>
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
