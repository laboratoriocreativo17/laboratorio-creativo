// Contenido del prototipo: técnica, materiales, pasos del tutorial
// y la biblioteca de retroalimentación SIMULADA (dibujo con grafito).

export const technique = {
  id: 'grafito',
  name: 'Dibujo con grafito',
  level: 'Principiante',
  duration: '15–20 min',
  description:
    'Aprende a crear volúmenes, sombras y diferentes tonalidades utilizando lápices de grafito.',
  materials: [
    { label: 'Lápices HB, 2B y 4B', icon: 'pencils' },
    { label: 'Papel para dibujo', icon: 'paper' },
    { label: 'Borrador', icon: 'eraser' },
    { label: 'Sacapuntas', icon: 'sharpener' },
  ],
}

export const upcomingTechniques = [
  { name: 'Acuarela', note: 'Próximamente' },
  { name: 'Serigrafía', note: 'Próximamente' },
  { name: 'Esténcil', note: 'Próximamente' },
  { name: 'Puntillismo', note: 'Próximamente' },
  { name: 'Pintura con café', note: 'Próximamente' },
]

export const materials = [
  { id: 'hb', name: 'Lápiz HB', detail: 'Para trazos suaves y tonos claros.', icon: 'pencil-hb' },
  { id: '2b', name: 'Lápiz 2B', detail: 'Para sombras y tonos intermedios.', icon: 'pencil-2b' },
  { id: '4b', name: 'Lápiz 4B', detail: 'Para tonos oscuros.', icon: 'pencil-4b' },
  { id: 'papel', name: 'Papel para dibujo', detail: 'Superficie donde realizarás el ejercicio.', icon: 'paper' },
  { id: 'borrador', name: 'Borrador', detail: 'Para corregir y crear luces.', icon: 'eraser' },
  { id: 'sacapuntas', name: 'Sacapuntas', detail: 'Para mantener una punta adecuada.', icon: 'sharpener' },
]

export const workspaceTips = [
  'Trabaja sobre una mesa plana y firme; pon una hoja extra debajo del papel para que el trazo sea más suave.',
  'Ordena los lápices de izquierda a derecha, del más duro (HB) al más blando (4B).',
  'Busca luz que venga del lado contrario a tu mano para que no te haga sombra sobre el papel.',
  'Apoya la mano sobre un papel limpio para no arrastrar el grafito ni manchar el dibujo.',
]

export const tutorial = {
  title: 'Aprende a crear una escala de degradación de tonos con grafito',
  goal: 'Controlar la presión del lápiz para conseguir tonalidades desde las más claras hasta las más oscuras.',
  steps: [
    {
      title: 'Prepara el papel',
      instruction:
        'Con el lápiz HB y trazo muy suave, dibuja un rectángulo horizontal de unos 15 × 3 cm y divídelo en cinco espacios iguales.',
      tip: 'Usa una regla y marca cada 3 cm. Las líneas deben ser tan suaves que casi no se vean.',
      expected: 'Una franja con cinco casillas vacías.',
      visual: 'prepare',
    },
    {
      title: 'Crea el tono más claro',
      instruction:
        'En la primera casilla, usa el lápiz HB con una presión muy suave. Rellena con trazos cortos en una sola dirección.',
      tip: 'Sostén el lápiz más lejos de la punta: así es más fácil aplicar poca presión.',
      expected: 'La casilla 1 con un gris muy claro y parejo.',
      visual: 'light',
    },
    {
      title: 'Aumenta la intensidad',
      instruction:
        'En las casillas 2 y 3, sigue con el HB (o pasa al 2B) y aumenta la presión poco a poco para lograr tonos intermedios.',
      tip: 'Superpón capas en lugar de apretar de golpe: dos capas suaves dan un tono más uniforme que una fuerte.',
      expected: 'Tres casillas que se oscurecen de forma gradual.',
      visual: 'mid',
    },
    {
      title: 'Crea los tonos oscuros',
      instruction:
        'En las casillas 4 y 5, cambia al lápiz 2B y luego al 4B para conseguir las tonalidades más intensas.',
      tip: 'El 4B es blando: no necesitas apretar mucho. Si el papel brilla, estás aplicando demasiada presión.',
      expected: 'Las cinco casillas, de casi blanco a casi negro.',
      visual: 'dark',
    },
    {
      title: 'Unifica la escala',
      instruction:
        'Aléjate un poco y observa las transiciones. Si hay saltos bruscos entre dos casillas, ajusta con capas suaves o aclara con el borrador.',
      tip: 'Entrecierra los ojos: así ves los valores sin distraerte con los detalles del trazo.',
      expected: 'Una escala de cinco tonos con pasos similares entre sí.',
      visual: 'unify',
    },
  ],
}

export const exampleQuestions = [
  '¿Por qué mi degradación tiene cambios tan bruscos entre tonos?',
  '¿Estoy aplicando demasiada presión al lápiz?',
  '¿Cómo puedo conseguir sombras más uniformes?',
  '¿Cómo puedo mejorar la transición entre los tonos claros y oscuros?',
]

/* ------------------------------------------------------------------
   Biblioteca de retroalimentación SIMULADA.
   El contenido se elige según:
   - palabras clave en la pregunta del usuario
   - mediciones básicas de la imagen (ver lib/analyzeImage.js)
   No es un análisis de IA real.
------------------------------------------------------------------- */

export const feedbackLibrary = {
  transiciones: {
    match: ['brusco', 'salto', 'transición', 'transicion', 'cambio', 'claros y oscuros', 'pasar'],
    difficulties: [
      'Los saltos bruscos suelen aparecer cuando se cambia de lápiz (por ejemplo, de HB a 4B) sin un tono puente entre ambos.',
      'También ocurre cuando la presión aumenta mucho de una casilla a la siguiente, en lugar de subir de a poco.',
    ],
    recommendations: [
      'Antes de pasar a un lápiz más blando, haz una capa suave con el anterior en esa misma casilla.',
      'Compara cada casilla solo con sus vecinas: la diferencia entre la 1 y la 2 debería parecerse a la diferencia entre la 2 y la 3.',
      'Repite la escala con siete casillas en lugar de cinco: obligarte a crear más pasos entrena el control fino.',
    ],
  },
  presion: {
    match: ['presión', 'presion', 'apret', 'fuerte', 'brillo', 'brilla', 'surco', 'marca'],
    difficulties: [
      'Cuando se aplica mucha presión, el grafito se aplasta y aparece un brillo metálico; además, el papel puede quedar marcado.',
      'Un exceso de presión con lápices duros (HB) deja surcos que luego no se pueden oscurecer ni borrar del todo.',
    ],
    recommendations: [
      'Para los tonos oscuros, deja que el lápiz blando (4B) haga el trabajo en lugar de apretar el HB.',
      'Sostén el lápiz más atrás, lejos de la punta, para reducir la fuerza de forma natural.',
      'Construye el oscuro en tres o cuatro capas suaves cruzando la dirección del trazo.',
    ],
  },
  uniformidad: {
    match: ['uniforme', 'parej', 'trazo', 'mancha', 'rayas', 'líneas', 'lineas', 'irregular'],
    difficulties: [
      'Si dentro de una casilla se ven rayas o zonas más oscuras, puede deberse a trazos en distintas direcciones o a una punta que se fue gastando.',
      'Las variaciones también aparecen cuando la mano se apoya sobre el dibujo y arrastra el grafito.',
    ],
    recommendations: [
      'Usa trazos cortos, juntos y en una sola dirección; luego una segunda capa en diagonal.',
      'Gira el lápiz entre los dedos cada pocos trazos para mantener la punta pareja.',
      'Coloca un papel limpio bajo tu mano y, si quieres suavizar, difumina muy ligeramente con un pañuelo.',
    ],
  },
  variedad: {
    match: [],
    difficulties: [
      'Cuando la escala tiene poca diferencia entre el tono más claro y el más oscuro, suele deberse a no llegar a un oscuro intenso por temor a "arruinar" el dibujo.',
      'También puede pasar si se usa solo el lápiz HB para toda la escala.',
    ],
    recommendations: [
      'Atrévete con el 4B en la última casilla: el negro intenso le da sentido a toda la escala.',
      'Deja la primera casilla casi blanca, con apenas un velo de grafito.',
      'Pon la escala junto a una hoja blanca y un objeto negro para comparar los extremos.',
    ],
  },
  general: {
    match: [],
    difficulties: [
      'En las primeras escalas es normal que los pasos entre tonos no sean del todo iguales: el control de la presión se gana con práctica.',
      'Pequeñas irregularidades suelen venir de cambios en la punta del lápiz o en la dirección del trazo.',
    ],
    recommendations: [
      'Repite la escala una vez al día durante una semana: notarás cómo mejora tu control.',
      'Mantén la misma dirección de trazo en todas las casillas.',
      'Afila el lápiz antes de cada casilla para empezar siempre con la misma punta.',
    ],
  },
}

export const nextExercises = [
  {
    title: 'Esfera con luz y sombra',
    description:
      'Dibuja un círculo y aplica tu escala sobre él: deja una zona de luz casi blanca, crea los medios tonos alrededor y oscurece el lado contrario con el 4B. Añade la sombra proyectada sobre la mesa.',
    duration: '20 min',
  },
  {
    title: 'Escala de nueve tonos',
    description:
      'Repite el ejercicio con nueve casillas. Tener más pasos entrena la sensibilidad de la mano para cambios pequeños de presión.',
    duration: '15 min',
  },
]
