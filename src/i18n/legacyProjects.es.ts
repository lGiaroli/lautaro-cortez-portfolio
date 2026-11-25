import type { ProjectDetail, WorkCard } from "../App";

type LegacyProjectId = "lateral-time" | "foco-vivo" | "alqag";

type LocalizedProjectCopy = Omit<Partial<ProjectDetail>, "screenshots"> & {
  eyebrow: string;
  title: string;
  lead: string;
  body: string[];
  metrics: ProjectDetail["metrics"];
  outcomes: string[];
  screenshots: Array<{ alt: string; caption: string }>;
};

const localizedProjectCopy: Record<LegacyProjectId, LocalizedProjectCopy> = {
  "lateral-time": {
    eyebrow: "Plataforma interna / Registro de horas",
    title: "Lateral Time",
    lead: "Una plataforma interna activa para registrar horas, consultar informes operativos y administrar al equipo, creada para el trabajo cotidiano de Lateral.",
    body: [
      "Diseñé e implementé Lateral Time como producto interno para registrar horas de trabajo, revisar partes de horas, administrar equipos y convertir la actividad diaria en informes claros.",
      "El producto cubre los flujos que un equipo necesita cada semana: registros de horas, temporizadores activos, ajustes manuales, asignación a clientes y proyectos, aprobaciones, seguimiento de incidentes técnicos, administración de usuarios, roles, capacidad e informes que consideran las zonas horarias.",
      "El principal desafío de ingeniería fue la eficiencia. Definí el backend y el modelo de persistencia para que varias personas trabajaran a la vez dentro de la plataforma y el consumo de infraestructura se mantuviera por debajo del objetivo estricto del plan gratuito.",
    ],
    metrics: [
      { label: "Tipo de producto", value: "Plataforma interna de operaciones" },
      { label: "Rol", value: "Diseño de producto e ingeniería full-stack" },
      { label: "Estado", value: "En producción en lateraltime.uk" },
      { label: "Objetivo de infraestructura", value: "Menos de 100 CU-horas al mes" },
    ],
    outcomes: [
      "Autenticación con correo y contraseña, sesiones, cookies, tokens, recuperación y cambio de contraseña",
      "Registro diario y semanal de horas con temporizadores, entradas manuales, envío de partes de horas, aprobaciones y flujos de revisión editables",
      "Herramientas de administración para usuarios, roles, equipos, capacidad semanal, zonas horarias, clientes, proyectos y asignaciones",
      "Informes de cumplimiento que consideran zonas horarias, mínimos diarios, capacidad, trabajo facturable e incidentes técnicos",
      "Preparación para producción en Render/Vercel, con CORS seguro, tiempos de espera de API y estados prolongados más seguros",
    ],
    caption: "El espacio de trabajo principal reúne el registro diario, la capacidad del equipo, el estado de las revisiones y las señales operativas, sin recurrir a capturas de pantalla, GPS ni monitoreo invasivo.",
    groups: [
      { label: "Producto", items: ["Registro de horas", "Partes de horas", "Aprobaciones", "Informes operativos"] },
      { label: "Frontend", items: ["TypeScript", "React", "Next.js", "Interfaz adaptable"] },
      { label: "Backend", items: ["Rutas de API", "Prisma", "PostgreSQL", "Autenticación por sesión"] },
      { label: "Operaciones", items: ["Render", "Vercel", "Pool de conexiones", "Optimización de CU-horas"] },
    ],
    deepDives: [
      {
        kicker: "Alcance del producto",
        title: "Un sistema diario para registrar horas, coordinar equipos y revisar el trabajo",
        body: [
          "Lateral Time es más que un temporizador. Permite que cada persona registre su trabajo con rapidez y ofrece a administradores y revisores una vista ordenada de clientes, proyectos, capacidad, cumplimiento, aprobaciones y excepciones.",
          "La plataforma admite sesiones activas, entradas manuales, partes de horas semanales, paneles editables, gestión de usuarios y roles, administración de clientes y proyectos, flujos de aprobación, incidentes técnicos e informes operativos.",
        ],
        points: [
          "Registro cotidiano de horas sin capturas de pantalla, GPS ni monitoreo invasivo",
          "Administración de equipos con controles de roles, capacidad semanal, zonas horarias y asignaciones",
          "Vistas de revisión para aprobaciones, incidentes, mínimos diarios e informes de horas facturables",
        ],
      },
      {
        kicker: "Optimización de CU-horas",
        title: "Diseño dentro de un límite estricto del plan gratuito",
        body: [
          "El presupuesto de la herramienta interna era de menos de 100 CU-horas al mes. Lo usé como criterio de diseño para los cambios de persistencia e informes.",
          "En lugar de recalcular todo el estado de revisión o reescribir el espacio de trabajo completo después de cada interacción, la aplicación guarda solo las entidades modificadas, aplica escrituras con debounce y mantiene instantáneas de revisión en caché que puede actualizar con bajo costo.",
        ],
        points: [
          "Reemplacé recálculos costosos con instantáneas y caché de revisión",
          "Generé informes con estructuras basadas en Map y recorridos de una sola pasada",
          "Guardé solo las entidades modificadas en lugar de reescribir todo el espacio de trabajo",
          "Registré las credenciales modificadas para actualizar los hashes de contraseña solo cuando hace falta",
        ],
      },
      {
        kicker: "Persistencia",
        title: "Menos escrituras y menor costo de base de datos en reposo",
        body: [
          "La capa de persistencia se ajustó para admitir muchas interacciones pequeñas. El guardado con debounce evita escribir en Postgres ante cada microcambio, y el seguimiento granular de modificaciones mantiene las actualizaciones acotadas y previsibles.",
          "También ajusté el pool de Prisma/Postgres con límites bajos para el número de conexiones y tiempos máximos de espera para establecer conexión y para las conexiones inactivas, de modo que estas se liberen en vez de consumir CU-horas sin tráfico.",
        ],
        points: [
          "Persistencia con debounce para cambios frecuentes en la interfaz",
          "Límites bajos del pool de base de datos para un equipo interno con varios usuarios",
          "Tiempos máximos de conexión e inactividad para evitar el costo de sesiones sin uso",
        ],
      },
      {
        kicker: "Informes",
        title: "Cumplimiento operativo que contempla el contexto",
        body: [
          "El modelo de informes considera mínimos diarios, capacidad semanal, trabajo facturable, zonas horarias e incidentes técnicos. Así, los resultados sirven para la operación real en vez de ser una exportación sin contexto de las filas del temporizador.",
          "Las señales automáticas destacan mínimos pendientes, intervalos cubiertos por incidentes y bloqueos sin resolver. Esto permite que las revisiones se enfoquen en las excepciones en lugar de revisar cada parte de horas manualmente.",
        ],
        points: [
          "Validaciones diarias de cumplimiento que consideran la zona horaria",
          "Cobertura de incidentes para explicar interrupciones justificadas del trabajo",
          "Señales automáticas para la revisión y el seguimiento operativo",
        ],
      },
      {
        kicker: "Experiencia",
        title: "Una interfaz adaptable para una herramienta de uso diario",
        body: [
          "La interfaz prioriza la operación: es lo bastante compacta para usarla repetidamente, pero también clara y cuidada para que el registro diario no se sienta burocrático.",
          "Refiné el producto con modo oscuro, controles de estilo iOS/macOS, interruptores reales, controles segmentados, opción para mostrar contraseñas, tooltips, validación en línea, estado local optimista y menos consultas repetidas después de cambios puntuales.",
        ],
      },
    ],
    imageAlt: "Panel de Lateral Time con capacidad semanal, temporizador, resumen de partes de horas y señales automáticas",
    galleryTitle: "Vistas seleccionadas del producto",
    galleryDescription: "Una selección de pantallas que muestra el ciclo de trabajo: registrar horas, revisar excepciones y administrar el espacio de trabajo.",
    screenshots: [
      {
        alt: "Parte de horas semanal de Lateral Time con grilla de clientes y panel de entradas manuales",
        caption: "Vista semanal con capacidad, horas facturables, entradas manuales, grilla de clientes y trabajo registrado editable.",
      },
      {
        alt: "Pantalla de señales de Lateral Time con indicadores automáticos y formulario para revisar incidentes técnicos",
        caption: "Las señales automáticas convierten los mínimos incumplidos y los incidentes técnicos en contexto operativo que se puede revisar.",
      },
      {
        alt: "Centro de administración de Lateral Time con ajustes de organización, políticas de acceso, roles y capacidad",
        caption: "Centro de administración para credenciales, reglas de la organización, usuarios, roles, capacidad, zonas horarias y políticas de acceso.",
      },
    ],
  },
  "foco-vivo": {
    eyebrow: "Plataforma operativa / Respuesta a incendios forestales",
    title: "Foco Vivo",
    lead: "Una plataforma operativa para la detección temprana, el monitoreo y el triaje de incendios forestales, con foco inicial en Córdoba, Argentina.",
    body: [
      "Foco Vivo parte de una decisión de producto: no reemplaza la confirmación oficial de un incendio. En cambio, acelera el trabajo previo a esa confirmación y ayuda a operadores, bomberos, equipos de defensa civil y municipios a revisar señales en un espacio operativo compartido.",
      "El sistema reúne focos satelitales, reportes humanos verificados, contexto oficial de riesgo de IDECOR, datos meteorológicos, geocodificación e información de estaciones de bomberos. Así, un equipo puede convertir observaciones dispersas en un evento listo para el triaje.",
      "La plataforma se organiza alrededor del flujo operativo que requiere esa decisión: ingesta, normalización, puntuación, agrupación de eventos, resiliencia y una interfaz de mapa diseñada para decidir bajo presión.",
    ],
    metrics: [
      { label: "Tipo de producto", value: "Detección temprana y triaje" },
      { label: "Región inicial", value: "Córdoba, Argentina" },
      { label: "Rol", value: "Ingeniería full-stack" },
      { label: "Criterio de producto", value: "Primero la confirmación humana" },
    ],
    outcomes: [
      "Backend API-first para la ingesta, puntuación, agrupación y entrega de alertas",
      "Panel operativo y mapa inmersivo para el análisis en tiempo real e histórico",
      "Comportamiento de respaldo controlado cuando no están disponibles los proveedores externos",
    ],
    caption: "El espacio de trabajo mantiene visibles los focos satelitales, las capas oficiales de riesgo, el clima, los reportes y los recursos de respuesta sin perder el contexto del mapa.",
    groups: [
      { label: "Backend", items: ["Python", "FastAPI", "SQLAlchemy", "Celery"] },
      { label: "Frontend", items: ["TypeScript", "Next.js", "React"] },
      { label: "Persistencia", items: ["SQL", "PostgreSQL/PostGIS", "SQLite para pruebas locales"] },
      { label: "Despliegue", items: ["Docker Compose", "Caddy", "Configuración por entorno"] },
    ],
    deepDives: [
      {
        kicker: "Arquitectura",
        title: "Una plataforma en dos capas",
        body: [
          "La arquitectura implementada separa un backend API-first de una interfaz operativa. El backend se ocupa de la ingesta, normalización, puntuación, agrupación de eventos, suscripciones y alertas.",
          "El frontend es un espacio de trabajo web organizado alrededor de un panel y un mapa inmersivo. Permite monitorear en tiempo real y analizar datos históricos sin convertir la interfaz en un informe pasivo.",
        ],
        points: [
          "Servicios de backend organizados por responsabilidades internas del dominio",
          "Rutas de dominio en módulos de API para observaciones, eventos, reportes, suscripciones e instantáneas de celdas de detección",
          "Tareas programables y scripts de sincronización para procesos por lotes y trabajos programados",
        ],
      },
      {
        kicker: "Integración",
        title: "Fuentes diversas con degradación controlada",
        body: [
          "Foco Vivo integra proveedores externos con distintos niveles de confiabilidad y formatos de datos. Los focos satelitales de FIRMS, el riesgo oficial de IDECOR, los datos meteorológicos, la geocodificación y los registros de estaciones de bomberos se normalizan en un modelo operativo común.",
          "Si un proveedor falla o entrega datos incompletos, el sistema degrada su funcionamiento de manera explícita en lugar de interrumpir silenciosamente el flujo de trabajo del operador.",
        ],
        points: [
          "Configuración de proveedores mediante variables de entorno",
          "Umbrales y comportamiento de notificaciones controlados por entorno",
          "Alternativas de respaldo ante interrupciones de fuentes externas",
        ],
      },
      {
        kicker: "Lógica de detección",
        title: "Motor heurístico de detección temprana por celda",
        body: [
          "El motor de detección combina señales de varias fuentes, como focos, señales rápidas, reportes humanos, riesgo y clima, para clasificar las celdas según su estado operativo.",
          "Las fuentes térmicas conocidas reciben una penalización para reducir falsos positivos evidentes antes de que generen ruido innecesario durante el triaje.",
        ],
        points: [
          "Estados que van del ruido y la observación a un incendio sospechado y una alerta temprana",
          "Puntuación basada en varias fuentes, en lugar de alertas disparadas por una sola señal",
          "Límite explícito del producto: en V1 no hay confirmación oficial automática",
        ],
      },
      {
        kicker: "Modelo de triaje",
        title: "Agrupación espaciotemporal para crear eventos accionables",
        body: [
          "Las observaciones en bruto aportan información, pero los operadores necesitan eventos que puedan analizar. Foco Vivo agrupa observaciones dispersas en unidades de triaje mediante ventanas de tiempo configurables y reglas de radio geográfico.",
          "Esto convierte detecciones ruidosas en un flujo más accionable: revisar el evento, entender su contexto, consultar el origen de los datos y decidir si hace falta escalarlo.",
        ],
      },
      {
        kicker: "Interfaz del producto",
        title: "Un mapa operativo pensado para decidir",
        body: [
          "El mapa combina capas meteorológicas, riesgo oficial de IDECOR, detecciones probables, reportes y recursos críticos, como estaciones de bomberos.",
          "La cámara conserva su posición al cambiar de capa. Así, el operador mantiene el contexto espacial mientras compara información.",
        ],
        points: [
          "Capas con contexto ambiental y recursos de respuesta",
          "Modos en tiempo real e histórico para mantener la trazabilidad",
          "Flujo centrado en el mapa y pensado para el triaje, no para la presentación",
        ],
      },
      {
        kicker: "Principios de ingeniería",
        title: "Trazabilidad y resiliencia para la operación",
        body: [
          "El código separa con claridad la presentación, las rutas de API, los servicios de dominio, la persistencia y las tareas por lotes.",
          "El modelo de dominio refleja el lenguaje operativo del producto con entidades como observación, evento, reporte, suscripción e instantánea de celda de detección.",
        ],
        points: [
          "Configuración al estilo 12-factor para fuentes, umbrales, seguridad y notificaciones",
          "Trazabilidad explícita mediante el modo histórico y el origen de cada reporte",
          "Resiliencia y degradación controlada como comportamientos centrales del producto",
        ],
      },
    ],
    imageAlt: "Mapa inmersivo de Foco Vivo con marcadores de incendios forestales y paneles para revisar eventos",
    galleryTitle: "Panel operativo",
    screenshots: [
      {
        alt: "Panel de Foco Vivo con métricas de eventos, filtros de incendios forestales y resumen de un evento seleccionado",
        caption: "El panel reúne la cantidad de eventos, los filtros meteorológicos y las prioridades en una sola vista. Se muestra con datos de demostración.",
      },
    ],
  },
  alqag: {
    eyebrow: "Plataforma full-stack / Alquileres permanentes",
    title: "alqag",
    lead: "Una plataforma de búsqueda de alquileres centrada en el mapa que convierte avisos dispersos de alquiler permanente en resultados normalizados, comparables y listos para decidir.",
    body: [
      "alqag se creó para resolver un problema conocido y frustrante: buscar un alquiler a largo plazo suele implicar saltar entre portales, inmobiliarias locales, sitios independientes y publicaciones repetidas o incompletas.",
      "La plataforma centraliza avisos públicos de alquiler, normaliza datos inconsistentes, elimina propiedades repetidas, completa imágenes y datos de ubicación, y presenta los resultados en una experiencia clara inspirada en interfaces modernas de marketplace.",
      "La decisión de producto más importante fue ser transparente sobre la precisión de la ubicación. Todos los avisos pueden aparecer en el mapa, pero la interfaz indica si el pin es exacto, corresponde a una calle o un barrio, o es una ubicación alternativa basada en la ciudad.",
    ],
    metrics: [
      { label: "Tipo de producto", value: "Radar de alquileres permanentes" },
      { label: "Rol", value: "Ingeniería de producto full-stack" },
      { label: "Avisos visibles", value: "Más de 90 alquileres normalizados" },
      { label: "Calidad", value: "88 pruebas automatizadas superadas" },
    ],
    outcomes: [
      "Panel adaptable con búsqueda en varias zonas, filtros, tarjetas de propiedades, favoritos y accesos al mapa",
      "Radar interactivo con Leaflet/OpenStreetMap, pines agrupados, círculos de búsqueda por radio y un panel emergente con avisos de la zona",
      "Búsqueda en lenguaje natural que identifica tipo de propiedad, dormitorios, presupuesto, comodidades y zona deseada",
      "Adaptadores para fuentes públicas, normalización, deduplicación, reparación de imágenes, geocodificación y control de calidad después de cada sincronización",
      "Indicadores visuales para ubicaciones exactas, aproximadas, por barrio o alternativas, sin exagerar su precisión",
    ],
    caption: "El panel inicial reúne las zonas, los filtros, el posicionamiento del producto y los avisos normalizados. Así, la búsqueda funciona como una herramienta para decidir y no como otro listado inmobiliario sin procesar.",
    groups: [
      { label: "Frontend", items: ["Next.js", "React", "TypeScript", "Tailwind CSS"] },
      { label: "Backend", items: ["Rutas de API", "Prisma", "SQLite", "Zod"] },
      { label: "Mapas", items: ["Leaflet", "OpenStreetMap", "Geocodificación", "Precisión de ubicación"] },
      { label: "Pipeline de datos", items: ["Cheerio", "Playwright", "Adaptadores", "Vitest", "Playwright E2E"] },
    ],
    deepDives: [
      {
        kicker: "Problema de producto",
        title: "De avisos dispersos a una sola vista para decidir",
        body: [
          "La búsqueda de alquileres permanentes en Argentina está fragmentada. Los avisos aparecen en portales, inmobiliarias locales, sitios independientes y redes sociales, a menudo con datos incompletos, direcciones inconsistentes, imágenes rotas o publicaciones duplicadas.",
          "alqag convierte esos datos dispersos en una interfaz enfocada para comparar opciones reales: buscar por zona, filtrar por requisitos, consultar el mapa, guardar o descartar avisos y armar una lista breve de propiedades para contactar.",
        ],
        points: [
          "Búsqueda en varias zonas: Alta Gracia, Villa Carlos Paz, Anisacate, La Bolsa, Córdoba y localidades cercanas",
          "Filtros por precio, moneda, dormitorios, gastos, tipo de propiedad, favoritos, avisos ocultos y publicaciones probablemente directas de dueños",
          "Estados para guardar como favorito, ocultar, marcar como contactado, programar una visita o descartar una opción",
        ],
      },
      {
        kicker: "Pipeline de datos",
        title: "Adaptadores, normalización y control de calidad posterior",
        body: [
          "La capa de datos se organiza mediante adaptadores, lo que permite agregar nuevas fuentes inmobiliarias sin cambiar el dominio central. Cada sincronización normaliza los avisos, repara las referencias de imágenes, completa los detalles y elimina propiedades duplicadas.",
          "Un control de calidad posterior a la sincronización oculta resultados vencidos o poco confiables, separa los alquileres temporarios de los permanentes y mantiene útil el conjunto de datos sin depender de una limpieza manual.",
        ],
        points: [
          "Extracción responsable de fuentes públicas sin evadir inicios de sesión, captchas ni restricciones",
          "Deduplicación por URL y señales de similitud",
          "Validación y reparación automática de imágenes",
        ],
      },
      {
        kicker: "Modelo de mapa",
        title: "Pines útiles sin fingir que todas las direcciones son exactas",
        body: [
          "Un alquiler puede ser útil aunque la fuente no proporcione coordenadas precisas. La plataforma usa geocodificación alternativa y clasifica cada resultado por nivel de confianza para ofrecer un mapa completo y transparente.",
          "Los pines agrupados y los círculos de búsqueda por radio ayudan a comparar barrios y zonas cercanas. El panel emergente de la zona seleccionada muestra los avisos relevantes directamente sobre el mapa.",
        ],
        points: [
          "Niveles de confianza para ubicaciones exactas, a nivel de calle, de barrio o con una ubicación alternativa de ciudad",
          "Resultados agrupados en el mapa con vistas previas de los avisos",
          "Búsqueda por radio en varias zonas activas",
        ],
      },
      {
        kicker: "Búsqueda inteligente",
        title: "Del lenguaje natural a filtros útiles",
        body: [
          "La búsqueda inteligente procesa consultas como “casa de 2 dormitorios con patio por menos de 800000 cerca de Anisacate” y convierte la intención en filtros estructurados.",
          "La experiencia se parece más a describir una mudanza que a configurar una consulta de base de datos, y mantiene visibles los filtros resultantes para que se puedan editar.",
        ],
      },
      {
        kicker: "Calidad",
        title: "Pruebas enfocadas en los datos inmobiliarios más difíciles",
        body: [
          "Las pruebas cubren las partes más frágiles del producto: filtros, cálculos de distancia, geocodificación, extracción de criterios de búsqueda, manejo de imágenes, metadatos y lógica del pipeline de fuentes.",
          "El resultado es un MVP local fácil de iterar que, al mismo tiempo, trata la calidad de los datos como una característica del producto.",
        ],
        points: [
          "88 pruebas automatizadas superadas",
          "Build de producción validado",
          "Capturas de documentación de 1920 × 1080 preparadas para el portfolio",
        ],
      },
    ],
    imageAlt: "Panel de alqag con filtros de búsqueda en varias zonas y avisos de alquiler permanente",
    screenshots: [
      {
        alt: "Mapa de alqag con una ventana emergente de la zona seleccionada y tres resultados de alquiler",
        caption: "Mapa interactivo con pines agrupados y una ventana de la zona seleccionada que muestra tres avisos.",
      },
      {
        alt: "Búsqueda inteligente de alqag que convierte una consulta de alquiler en lenguaje natural en filtros",
        caption: "La búsqueda en lenguaje natural se convierte en filtros para dormitorios, presupuesto, tipo de propiedad y zona.",
      },
      {
        alt: "Grilla de alqag con tarjetas de alquiler normalizadas, precios, imágenes e indicadores",
        caption: "Grilla de avisos normalizados con imágenes, precios, precisión de ubicación, indicadores de actualización y acciones para ocultar o guardar favoritos.",
      },
    ],
  },
};

const localizedWorkCardCopy: Partial<Record<string, Partial<WorkCard>>> = {
  "lateral-v6": {
    kicker: "Migración de V4 a V6",
    title: "Lateral V6",
    summary: "Colaboré en la migración de una plataforma de cobranzas de V4 a V6 y rediseñé el espacio de trabajo que usa el equipo para revisar al deudor, decidir el siguiente paso y gestionar cada caso.",
    points: ["Página del deudor", "Propensity to Pay", "Flujos visuales"],
    routeLabel: "Ver caso",
  },
  "lateral-time": {
    kicker: "Registro interno de horas",
    title: "Lateral Time",
    summary: "Plataforma interna para registrar horas, aprobar partes de horas, seguir incidentes y coordinar las operaciones del equipo, diseñada para operar dentro de un presupuesto de infraestructura del plan gratuito.",
    points: ["Registro de horas", "Revisión operativa", "Presupuesto de CU-horas"],
    routeLabel: "Ver caso",
  },
  "foco-vivo": {
    kicker: "Operaciones de incendios en tiempo real",
    title: "Foco Vivo",
    summary: "Espacio de trabajo para el triaje de incendios forestales que combina detecciones satelitales, capas de riesgo, clima, reportes y recursos de respuesta.",
    points: ["Detección", "Mapa de triaje", "Contexto de riesgo"],
    routeLabel: "Ver caso",
  },
  alqag: {
    kicker: "Radar de alquileres",
    title: "alqag",
    summary: "Radar inmobiliario centrado en el mapa que normaliza avisos, verifica la precisión de las ubicaciones y convierte una búsqueda fragmentada en una sola vista para decidir.",
    points: ["Búsqueda inteligente", "Precisión de ubicación", "Grupos en el mapa"],
    routeLabel: "Ver caso",
  },
};

export function localizeLegacyProjectDetail(id: string, project: ProjectDetail): ProjectDetail {
  const copy = localizedProjectCopy[id as LegacyProjectId];

  if (!copy) return project;

  const { screenshots, ...textCopy } = copy;

  return {
    ...project,
    ...textCopy,
    image: project.image,
    screenshots: project.screenshots?.map((screenshot, index) => ({
      ...screenshot,
      ...(screenshots[index] ?? {}),
    })),
  };
}

export function localizeWorkCard(card: WorkCard): WorkCard {
  const copy = localizedWorkCardCopy[card.id];
  return copy ? { ...card, ...copy } : card;
}
