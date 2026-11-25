import type { CaseMedia, CaseSection, CaseStudy } from "./caseTypes";
import { lateralV6 } from "./lateralV6";
import { lateralCases } from "./lateralCases";
import { otherCases } from "./otherCases";
import type { CaseGroup } from "./caseTypes";

export const caseGroupNamesEs: Record<CaseGroup, string> = {
  lateral: "Trabajo en Lateral",
  "other-works": "Otros trabajos",
};

type SectionCopy = Partial<Omit<CaseSection, "media">> & { media?: Partial<CaseMedia> };
type StudyCopy = {
  title: string;
  subtitle: string;
  summary: string;
  role: string;
  status: string;
  stack?: string[];
  sections: Record<string, SectionCopy>;
  gallery?: Record<number, Partial<CaseMedia>>;
  linkLabels?: string[];
};

const copies: Record<string, StudyCopy> = {
  "lateral-v6": {
    title: "Lateral V6",
    subtitle: "Una nueva experiencia para trabajar cada caso",
    summary: "Participé de la migración de una plataforma de gestión de cobranzas de V4 a V6 y rediseñé el espacio que usa el equipo para revisar a cada persona, decidir los próximos pasos y gestionar su caso.",
    role: "Diseño de producto, desarrollo de software y QA",
    status: "Migración de V4 a V6",
    stack: ["React", "TypeScript", "MySQL"],
    sections: {
      "case-workspace": {
        title: "La página de la persona deudora, antes y después",
        body: [
          "El caso es el punto de referencia del equipo. Ayudé a reorganizar el espacio de V6 alrededor de la etapa activa del flujo, conservé la distribución guardada e hice que cada grupo pudiera editar qué paneles aparecen en la barra lateral y en qué orden.",
          "También trabajé en los datos de contacto, las marcas del caso y la navegación de documentos y cartas, para que el equipo pueda revisar la información sin perder el contexto.",
        ],
        points: [
          "Los datos del caso y su contexto financiero siguen visibles en la vista principal.",
          "Los paneles laterales editables mantienen a mano los contactos y la actividad.",
          "La edición de contactos funciona dentro del espacio reducido del panel del caso.",
        ],
      },
      "payment-propensity": {
        title: "Propensity to Pay: una estimación para revisar",
        body: [
          "Desarrollé un panel opcional de resumen que muestra una estimación orientativa de pago a 30 días y explica qué evidencia la respalda y qué información falta. Se puede agregar, cambiar de tamaño y reordenar dentro del caso.",
          "La tabla de cuentas permite ordenar por puntaje de pago sobre todos los resultados filtrados. La estimación sirve como apoyo para la revisión; la explicación permite evaluar por cuenta propia la evidencia registrada.",
        ],
      },
      "visual-workflow": {
        title: "Probar flujos visuales",
        body: [
          "Colaboré en la incorporación a V6 de 23 acciones de resultado de V4 y desarrollé un editor para definir resultados de tareas y sus acciones ordenadas. En el Visual Workflow Builder agregué una prueba de caso que recorre una ruta elegida y se detiene en una tarea para que el operador pueda seleccionar un resultado.",
          "La prueba es de solo lectura. Usa datos guardados del caso, muestra qué ruta puede evaluar y explica cuándo una regla depende de información que solo existe durante la ejecución real.",
        ],
        media: {
          alt: "Captura real del Visual Workflow Builder con un disparador de inicio de caso, un nodo de decisión y dos ramas de resultado.",
          caption: "Un flujo de demostración en el Visual Workflow Builder.",
        },
      },
      "operator-controls": {
        title: "Controles compartidos en V6",
        body: ["También contribuí a patrones de interfaz compartidos en la aplicación. El equipo puede filtrar registros, administrar accesos, ejecutar informes y asignar campos de archivos de importación con una experiencia más coherente."],
        points: [
          "Los filtros editables quedan visibles en la tabla de cuentas.",
          "Las plantillas de roles y los permisos de acción se administran desde el mismo espacio.",
          "Import Designer organiza la configuración, los archivos de muestra y la asignación de campos en tres pasos.",
          "Los informes se ejecutan en la aplicación y se exportan con los filtros de la última ejecución exitosa.",
        ],
      },
    },
  },
  "lateral-etl": {
    title: "Importaciones ETL a V6",
    subtitle: "De archivos CSV a registros nativos del caso, con revisión antes de guardar",
    summary: "Diseñé y verifiqué una prueba piloto de importación de CSV a V6, con una vista previa precisa de los cambios y un comportamiento previsible al repetirla.",
    role: "Diseño del flujo de importación, mapeo de campos y QA de punta a punta",
    status: "Verificado de punta a punta en una prueba piloto sintética y acotada",
    stack: ["Importación de CSV", "Extracción · Transformación · Carga (ETL)", "Lateral V6"],
    gallery: {
      0: { alt: "Editor del flujo ETL con el selector de transformaciones abierto", caption: "Elegir una transformación de campo al configurar la importación." },
      1: { alt: "Lienzo del flujo ETL con el inspector de transformaciones abierto", caption: "Revisar las reglas de mapeo y validación entre el origen y el destino." },
      2: { alt: "Prueba ETL exitosa con una vista previa de muestra y los detalles de ejecución", caption: "Revisar la ejecución de prueba y sus resultados de muestra antes de continuar." },
    },
    sections: {
      "review-before-import": {
        title: "Revisar los cambios antes de importar",
        body: ["El flujo extrae y transforma los datos del CSV para asignarlos a campos de casos en V6. Antes de guardar, muestra exactamente qué registros se agregarán o actualizarán. Así, el equipo puede revisar los cambios antes de incorporarlos al sistema."],
        points: ["Distingue los casos nuevos de los que se actualizarán en la vista previa", "Explica con claridad el rechazo de solicitudes inválidas o fuera del alcance", "Permite descargar un resumen de la ejecución"],
        media: { alt: "Vista previa de mapeo de campos y transformaciones ETL en el entorno de demostración", caption: "Mapeo de campos y vista previa de transformaciones en el entorno de demostración." },
      },
      "repeat-safe-imports": {
        title: "Hacer previsibles las ejecuciones repetidas",
        body: ["Verifiqué los casos de reintento y rechazo junto con las importaciones exitosas. Las actualizaciones se mantuvieron consistentes al repetir la ejecución y no duplicaron las direcciones existentes."],
        points: ["Los reintentos con el mismo contenido devuelven el resultado guardado", "Se rechazan los cambios en el contenido y las solicitudes fuera del alcance", "El flujo verificado se limita a una cartera piloto sintética"],
      },
    },
  },
  "lateral-operations": {
    title: "Pagos, remesas e integraciones",
    subtitle: "Conectar los datos financieros importados con su revisión",
    summary: "Mapeé y verifiqué reglas de pagos, cargos y remesas para conciliar distintos tipos de cobranza con un resumen claro y auditable.",
    role: "Diseño de flujos, mapeo de integraciones, configuración y QA",
    status: "QA financiero de V4 a V6; transferencia SFTP probada en modo de prueba",
    stack: ["Lateral V6", "Operaciones de pago", "Informes de remesas"],
    gallery: {
      0: { alt: "Interfaz de impresión de cheques con categorías, filtros y controles para revisar lotes", caption: "El flujo de cheques en una demostración local con datos sintéticos." },
      1: { alt: "Formulario sintético para registrar un cheque manual con los campos de número e importe", caption: "El formulario de QA local registra un cheque físico para los costos seleccionados." },
    },
    sections: {
      "connect-financial-records": {
        title: "Vincular los datos entrantes con la actividad financiera",
        body: ["Asigné cambios importados de casos a los registros nativos de V6 y a su actividad financiera, con una vista previa explícita antes de guardar. También comprobé que las actualizaciones fueran coherentes con los datos existentes del caso."],
      },
      "trace-remittance-totals": {
        title: "Mantener trazables los totales de las remesas",
        body: ["Los distintos flujos de pago deben diferenciar las cobranzas directas y las de agencia, los cargos, el neto a remitir y los ajustes con signo. Organicé los informes configurables y la facturación para conservar cada concepto por separado, y comparé el resultado generado con una ejecución acotada de pagos mixtos."],
        points: ["Conserva la separación entre los importes directos y los de agencia", "Mantiene el signo de los cargos y las reversiones en el resumen", "Compara los totales agregados con los registros de pago que los componen"],
      },
      "checks-and-credit-memos": {
        title: "Distinguir la anulación de un cheque de la cancelación de un costo",
        body: ["Durante una entrega de QA financiero de V4 a V6, verifiqué la anulación de un cheque emitido y, por separado, la cancelación de un costo facturado con su nota de crédito. El historial distingue la reversión del medio de pago del crédito sobre el costo original."],
      },
      "dialler-sftp-handoff": {
        title: "Probar una transferencia controlada al marcador telefónico",
        body: ["En un flujo de prueba separado, ejercité el envío saliente de registros del día al marcador telefónico a través de un destino SFTP de prueba. Un registro por operación guardó qué elementos se enviaron y cuáles quedaron retenidos." , "Alcance: solo el entorno de preparación y un destino de prueba. Este trabajo no incluyó la importación de resultados devueltos por el marcador telefónico."],
      },
    },
  },
  "lateral-marketing": {
    title: "Sitio de marketing de Lateral",
    subtitle: "Una historia de marca interactiva que lleva a una demostración del producto",
    summary: "Diseñé y desarrollé una propuesta pública de marketing que combina una página de inicio centrada en las personas con una demostración guiada de una plataforma de operaciones compleja.",
    role: "Diseño visual, experiencia web, movimiento e interacción",
    status: "Vista previa pública de diseño",
    stack: ["Sitio de marketing", "Prototipo interactivo", "Diseño de movimiento"],
    gallery: {
      0: { alt: "Vista previa del sitio de Lateral con un video principal y un titular editorial", caption: "La vista previa pública comienza con un video principal." },
      1: { alt: "Vista previa del sitio de Lateral que muestra las etapas de importación, flujo de trabajo y pago", caption: "La sección de producto explica cómo circulan los datos por Lateral." },
      2: { alt: "Vista previa del sitio de Lateral que presenta un copiloto para operaciones", caption: "Una sección de la propuesta pública presenta el concepto Launch." },
    },
    sections: {
      "brand-story": {
        title: "Presentar la marca desde una historia humana",
        body: ["La página de inicio abre con un mensaje editorial, video cinematográfico y movimiento sutil; luego vincula la historia de marca con las tareas cotidianas que Lateral ayuda a resolver."],
      },
      "product-demo": {
        title: "Pasar de la historia al producto",
        body: ["La demostración vinculada permite explorar en el navegador situaciones ilustrativas del producto. Es una vista previa de diseño para revisión: los casos de muestra no ejecutan acciones ni comunicaciones reales."],
      },
    },
    linkLabels: ["Abrir la vista previa pública de diseño"],
  },
  ropee: {
    title: "Ropee",
    subtitle: "Una aplicación móvil de entrenamiento con soga, rutinas y progreso sostenido.",
    summary: "Estoy creando un compañero de entrenamiento que lleva cada sesión desde un plan guiado hasta una rutina cronometrada y permite volver al progreso después.",
    role: "Diseño de producto y desarrollo de aplicaciones móviles",
    status: "Proyecto público en GitHub · en desarrollo",
    stack: ["Expo", "React Native", "TypeScript"],
    gallery: {
      0: { alt: "Pantalla de inicio de Ropee con la actividad semanal, los objetivos de entrenamiento y el desafío del día", caption: "La pantalla de inicio reúne el objetivo semanal y el desafío diario." },
      1: { alt: "Biblioteca de rutinas de Ropee con entrenamientos recomendados, categorías y rutinas personalizadas", caption: "Elegir una rutina recomendada o armar una sesión desde cero." },
      2: { alt: "Pantalla de progreso de Ropee con nivel, racha diaria y actividad de entrenamiento semanal", caption: "El progreso reúne rachas, tiempo de entrenamiento, saltos y sesiones completadas." },
    },
    sections: {
      "training-flow": {
        title: "Hacer que empezar sea simple",
        body: ["Ropee reúne una biblioteca de rutinas, un creador de rutinas personalizadas y un cronómetro de entrenamiento en un flujo móvil enfocado. Cada sesión tiene un plan claro, una secuencia guiada y una pantalla de cierre."],
        points: ["Rutinas guiadas", "Crear y guardar sesiones propias", "Entrenamientos cronometrados"],
      },
      "progress-loop": {
        title: "Convertir las sesiones en constancia",
        body: ["El historial, los resúmenes de progreso, las misiones y las insignias integran los entrenamientos completados en una práctica que se construye con el tiempo."],
        points: ["Historial y estadísticas de entrenamiento", "Misiones e insignias", "Pruebas enfocadas en el cronómetro, las rutinas y la lógica de progreso"],
      },
    },
    linkLabels: ["Ver Ropee en GitHub"],
  },
  "family-garden": {
    title: "Family Garden",
    subtitle: "Un editor de ramos para Windows que convierte colecciones florales en piezas listas para imprimir.",
    summary: "Desarrollé un editor de escritorio que transforma una colección de flores de temporada en un póster de ramo editable y exporta vectores que pueden seguir trabajándose en Adobe Illustrator.",
    role: "Diseño de producto y desarrollo de escritorio",
    status: "Aplicación de escritorio para Windows · exportación vectorial verificada",
    stack: ["Rust", "SVG", "Adobe Illustrator"],
    gallery: {
      0: { alt: "Exportaciones de ramos de Family Garden que comparan la orientación de flores de cuatro especies", caption: "Exportaciones usadas para revisar cómo se conecta cada flor con su tallo." },
      1: { alt: "Ilustración exportada de Family Garden antes y después de ajustar la densidad del follaje", caption: "La ilustración exportada permite comparar la posición de las hojas en la colección." },
      2: { alt: "Controles del editor de Family Garden para variantes florales, relaciones y generación", caption: "El editor asocia una variante floral con cada integrante del árbol familiar." },
    },
    sections: {
      "flower-library": {
        title: "Armar cada ramo con piezas editables",
        body: ["El lienzo reúne una colección de temporada de 24 diseños. Las variantes de flores, los tallos y las hojas se mantienen editables al cambiar la composición."],
        points: ["24 diseños de ramos", "Variantes florales y uniones con los tallos editables", "Una biblioteca compartida para crear arreglos consistentes"],
        media: { alt: "Tres variantes ilustradas de una flor Morning Glory", caption: "Una especie floral preparada en variantes reutilizables: frente, perfil y capullo." },
      },
      "print-export": {
        title: "Preparar la ilustración para impresión",
        body: ["Organicé la exportación como vectores transparentes y editables, y verifiqué las ilustraciones generadas en Illustrator para que el póster pueda pasar del editor al flujo de impresión."],
        points: ["240 archivos SVG transparentes de ubicación para toda la colección", "Ilustraciones al tamaño de impresión con trazados vectoriales editables", "Flujo de exportación y reapertura contrastado con los diseños renderizados"],
      },
    },
  },
  aurobit: {
    title: "Aurobit",
    subtitle: "Una marca de papelería convertida en una tienda en línea colorida y centrada en sus productos.",
    summary: "Diseñé y desarrollé la tienda de Aurobit alrededor de sus cuadernos originales, para que descubrir los productos también forme parte de la experiencia de marca.",
    role: "Diseño de marca y producto · desarrollo de tienda en línea",
    status: "Tienda pública · vista previa del panel de administración",
    stack: ["JavaScript", "CSS", "Cloudflare"],
    gallery: {
      0: { alt: "Inicio de la tienda Aurobit con tapas de cuadernos coloridas y acceso al catálogo", caption: "La tienda abre con ilustraciones originales de papelería y un acceso directo al catálogo." },
      1: { alt: "Catálogo de Aurobit con búsqueda, filtros por categoría, orden y tarjetas de cuadernos", caption: "El catálogo reúne categorías, etiquetas, búsqueda y variantes en un mismo recorrido." },
      2: { alt: "Página de un cuaderno Flower Check con opciones de tamaño y control de cantidad", caption: "El detalle del cuaderno muestra la ilustración, los tamaños de papel y las opciones de la variante." },
    },
    sections: {
      "brand-to-storefront": {
        title: "Llevar la identidad de marca a la compra",
        body: ["La tienda combina imágenes y colores propios de la marca con un catálogo de cuadernos, navegación por categorías y filtros de búsqueda y etiquetas."],
        media: { alt: "Cuadernos y artículos de papelería de Aurobit dispuestos sobre un escritorio", caption: "Imágenes originales de papelería usadas en la tienda." },
      },
      "store-operations": {
        title: "Vincular la tienda con las tareas diarias",
        body: ["También diseñé una vista previa de un panel de administración para mantener el catálogo y las operaciones de productos. Así, el trabajo se extiende de la tienda para clientes al espacio interno del negocio."],
        points: ["Tienda pública activa", "Vista previa separada del panel de administración", "Sistema visual coherente para la compra y la gestión"],
      },
    },
    linkLabels: ["Visitar Aurobit", "Ver la tienda"],
  },
  bruma: {
    title: "Bruma",
    subtitle: "Un lector de PDF para Windows, pensado para libros con muchas referencias internas.",
    summary: "Desarrollé una experiencia de lectura de escritorio que mantiene conectados los PDF técnicos y sus referencias cruzadas, y permite volver al lugar donde se estaba leyendo.",
    role: "Diseño de producto y desarrollo de escritorio",
    status: "Aplicación de escritorio para Windows",
    stack: ["C#", "WPF", ".NET 8", "PDF.js", "WebView2"],
    gallery: {
      0: { alt: "Biblioteca de Bruma para Windows con un PDF de ejemplo y su portada", caption: "La biblioteca local reúne los libros y las lecturas recientes." },
      1: { alt: "Lector de escritorio de Bruma con un PDF de muestra y controles de página en la barra superior", caption: "La vista de lectura mantiene a mano la búsqueda, la navegación de páginas y el zoom. Se muestra un documento de ejemplo." },
    },
    sections: {
      "reference-navigation": {
        title: "Seguir una referencia y volver al punto de lectura",
        body: ["Al abrir una referencia interna, el lector salta a su destino; la acción para volver restaura la página y la posición de desplazamiento originales. También permite recorrer referencias encadenadas en orden inverso sin perder el nivel de zoom."],
        points: ["Regreso al contexto anterior", "Historial de hasta 64 saltos entre referencias", "Conserva el destino del PDF y el zoom"],
      },
      "local-reading-space": {
        title: "Mantener un espacio de lectura enfocado",
        body: ["Los controles nativos de la biblioteca y la navegación de Windows enmarcan el lector PDF.js dentro de WebView2. Los libros y su índice permanecen en el perfil local de la aplicación; el lector no depende de un servidor local."],
        points: ["Estructura de escritorio en WPF", "Renderizado de PDF.js y enlaces internos", "Biblioteca e índice locales"],
      },
    },
  },
};

function localizeStudy(study: CaseStudy): CaseStudy {
  const copy = copies[study.id];
  if (!copy) throw new Error(`Missing Spanish case copy for ${study.id}`);
  return {
    ...study,
    title: copy.title,
    subtitle: copy.subtitle,
    summary: copy.summary,
    role: copy.role,
    status: copy.status,
    stack: copy.stack,
    sections: study.sections.map((section) => {
      const translated = copy.sections[section.id];
      if (!translated) throw new Error(`Missing Spanish section copy for ${study.id}/${section.id}`);
      return {
        ...section,
        ...translated,
        media: section.media && translated.media ? { ...section.media, ...translated.media } : section.media,
      };
    }),
    gallery: study.gallery?.map((capture, index) => ({ ...capture, ...copy.gallery?.[index] })),
    links: study.links?.map((link, index) => ({ ...link, label: copy.linkLabels?.[index] ?? link.label })),
  };
}

export const spanishCaseStudies: CaseStudy[] = [
  lateralV6,
  ...lateralCases,
  ...otherCases,
].map(localizeStudy);
