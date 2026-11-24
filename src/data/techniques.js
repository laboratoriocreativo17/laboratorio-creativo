// Las 6 técnicas de Laboratorio Creativo.
// Todas comparten la misma estructura de ejercicio: una franja de 5 cuadros
// que va de lo más suave a lo más intenso. Así la experiencia es igual de
// sencilla en cada técnica y la foto se puede leer de la misma forma.
//
// La retroalimentación de cada técnica es SIMULADA: son consejos escritos
// por el equipo que se eligen según la pregunta y la lectura de la foto.

export const techniques = [
  /* ============================ GRAFITO ============================ */
  {
    id: 'grafito',
    name: 'Dibujo con grafito',
    level: 'Principiante',
    duration: '15–20 min',
    description: 'Aprende a crear volúmenes, sombras y diferentes tonalidades utilizando lápices de grafito.',
    color: '#5a5760',
    palette: ['#d6d4d9', '#b3b0b8', '#8c8992', '#5a5760', '#2c2a30'],
    fill: 'hatch',
    tool: 'pencil',
    sampleInk: [40, 40, 44],
    darkGoal: 0.45,
    boxLabels: ['HB', 'HB', '2B', '2B', '4B'],
    materials: [
      { name: 'Lápiz HB', detail: 'Para trazos suaves y tonos claros.', icon: 'Pencil' },
      { name: 'Lápiz 2B', detail: 'Para sombras y tonos intermedios.', icon: 'Pencil' },
      { name: 'Lápiz 4B', detail: 'Para tonos oscuros.', icon: 'Pencil' },
      { name: 'Papel para dibujo', detail: 'La superficie donde harás el ejercicio.', icon: 'FileText' },
      { name: 'Borrador', detail: 'Para corregir y crear luces.', icon: 'Eraser' },
      { name: 'Sacapuntas', detail: 'Para mantener una buena punta.', icon: 'PenTool' },
    ],
    workspaceTips: [
      'Trabaja sobre una mesa firme y pon una hoja extra debajo del papel: el trazo sale más suave.',
      'Ordena los lápices del más duro (HB) al más blando (4B).',
      'Busca luz que venga del lado contrario a tu mano para no hacerte sombra.',
      'Apoya la mano sobre un papel limpio para no arrastrar el grafito.',
    ],
    tutorial: {
      title: 'Crea una escala de tonos con grafito',
      goal: 'Aprender a controlar la presión del lápiz para ir de lo más claro a lo más oscuro.',
      steps: [
        { title: 'Prepara el papel', instruction: 'Con el lápiz HB y muy suave, dibuja un rectángulo de unos 15 × 3 cm y divídelo en cinco cuadros iguales.', tip: 'Usa una regla y marca cada 3 cm. Las líneas deben verse apenas.', expected: 'Una franja con cinco cuadros vacíos.' },
        { title: 'Haz el tono más claro', instruction: 'En el primer cuadro, usa el HB casi sin presionar. Rellena con trazos cortos en una sola dirección.', tip: 'Toma el lápiz más lejos de la punta: así es más fácil no apretar.', expected: 'El cuadro 1 con un gris muy suave y parejo.' },
        { title: 'Sube la intensidad', instruction: 'En los cuadros 2 y 3, presiona un poquito más cada vez (puedes pasar al 2B).', tip: 'Mejor dos capas suaves que una fuerte: el tono queda más parejo.', expected: 'Tres cuadros que se oscurecen poco a poco.' },
        { title: 'Crea los tonos oscuros', instruction: 'En los cuadros 4 y 5, usa el 2B y luego el 4B para llegar a lo más oscuro.', tip: 'El 4B es blando: no hace falta apretar. Si el papel brilla, estás presionando de más.', expected: 'Los cinco cuadros, de casi blanco a casi negro.' },
        { title: 'Revisa tu escala', instruction: 'Aléjate un poco y mira tu escala completa. Si dos cuadros cambian de golpe, suaviza con capas o aclara con el borrador.', tip: 'Entrecierra los ojos: así ves mejor las diferencias entre tonos.', expected: 'Cinco tonos que cambian de forma pareja.' },
      ],
    },
    questions: [
      '¿Por qué mi degradación tiene cambios tan bruscos entre tonos?',
      '¿Estoy aplicando demasiada presión al lápiz?',
      '¿Cómo puedo conseguir sombras más uniformes?',
      '¿Cómo mejoro la transición entre los tonos claros y oscuros?',
    ],
    photoTip: 'Tómale una foto con buena luz, desde arriba y sin flash (el grafito brilla con el flash).',
    keywords: { parejo: ['presión', 'presion', 'apret', 'uniforme', 'parej', 'rayas', 'trazo'] },
    feedback: {
      saltos: {
        diff: ['Cuando el cambio entre dos cuadros se siente de golpe, suele ser porque pasamos de un lápiz a otro (del HB al 4B, por ejemplo) sin un tono intermedio.', 'También pasa si aprietas mucho más de un cuadro al siguiente.'],
        recs: ['Antes de cambiar de lápiz, haz una capa suave con el anterior en ese mismo cuadro.', 'Compara cada cuadro solo con su vecino: el cambio entre el 1 y el 2 debería parecerse al del 2 y el 3.', 'Prueba la escala con siete cuadros: te obliga a hacer pasos más pequeños.'],
      },
      parecidos: {
        diff: ['Cuando dos cuadros se ven casi iguales, es porque la presión fue muy parecida en los dos.', 'Puede pasar cuando usamos el mismo lápiz para varios cuadros seguidos.'],
        recs: ['Antes de empezar, decide cómo se verá cada cuadro: muy claro, claro, medio, oscuro, muy oscuro.', 'Añade una capa más en el cuadro que debería ser más oscuro.', 'Usa el 2B en los cuadros del medio para marcar mejor la diferencia.'],
      },
      intensidad: {
        diff: ['Cuando la escala se queda en grises suaves, es porque el último cuadro no llegó a un oscuro intenso.', 'Es muy común al empezar, por miedo a “arruinar” el dibujo.'],
        recs: ['¡Atrévete con el 4B en el último cuadro! El negro intenso le da vida a toda la escala.', 'Haz varias capas cruzando la dirección del trazo para oscurecer sin apretar.', 'Pon tu escala junto a algo negro para comparar.'],
      },
      parejo: {
        diff: ['Si se notan rayas o zonas más oscuras dentro de un cuadro, puede ser porque los trazos van en direcciones distintas.', 'Apretar mucho también deja marcas en el papel que luego no se pueden suavizar.'],
        recs: ['Haz trazos cortos y juntos en una sola dirección; luego una segunda capa en diagonal.', 'Gira el lápiz entre los dedos cada pocos trazos para mantener la punta pareja.', 'Para los oscuros, deja que el 4B haga el trabajo en lugar de apretar el HB.'],
      },
      general: {
        diff: ['En las primeras escalas es normal que los pasos no queden perfectos: el control de la presión se gana practicando.', 'Pequeñas diferencias suelen venir de la punta del lápiz o de la dirección del trazo.'],
        recs: ['Repite la escala un par de veces esta semana: vas a notar el cambio.', 'Mantén la misma dirección de trazo en todos los cuadros.', 'Saca punta antes de cada cuadro.'],
      },
    },
    next: [
      { title: 'Esfera con luz y sombra', description: 'Dibuja un círculo y usa tu escala para darle volumen: deja una zona casi blanca donde llega la luz y oscurece el lado contrario con el 4B.', duration: '20 min' },
      { title: 'Escala de siete tonos', description: 'Repite el ejercicio con siete cuadros. Tener más pasos entrena tu mano para cambios pequeños de presión.', duration: '15 min' },
    ],
  },

  /* ============================ ACUARELA ============================ */
  {
    id: 'acuarela',
    name: 'Acuarela',
    level: 'Principiante',
    duration: '20–30 min',
    description: 'Juega con el agua y el pigmento para pasar de un color suave y transparente a uno intenso.',
    color: '#6B4FC0',
    palette: ['#E4DAF7', '#C7B4F0', '#A387E3', '#7B5BD0', '#55369E'],
    fill: 'wash',
    tool: 'brush',
    sampleInk: [98, 62, 180],
    darkGoal: 0.4,
    boxLabels: ['+ agua', '', '', '', '+ color'],
    materials: [
      { name: 'Papel para acuarela', detail: 'Grueso (300 g idealmente) para que no se arrugue con el agua.', icon: 'FileText' },
      { name: 'Pincel redondo', detail: 'Uno mediano (n.º 8 a 10) de pelo suave.', icon: 'Paintbrush' },
      { name: 'Dos frascos de agua', detail: 'Uno para limpiar el pincel y otro con agua limpia.', icon: 'Droplets' },
      { name: 'Acuarelas', detail: 'Escoge un solo color: un azul o un violeta funcionan muy bien.', icon: 'Palette' },
      { name: 'Paleta o plato blanco', detail: 'Para preparar tus mezclas.', icon: 'Circle' },
      { name: 'Papel de cocina', detail: 'Para quitar el exceso de agua del pincel.', icon: 'StickyNote' },
    ],
    workspaceTips: [
      'Pega el papel a la mesa con cinta de enmascarar para que no se ondule.',
      'Ten el papel de cocina siempre a mano.',
      'Prepara la mezcla antes de empezar: la acuarela no espera.',
      'Busca buena luz para ver cómo cambia el color.',
    ],
    tutorial: {
      title: 'Crea una escala de intensidades con acuarela',
      goal: 'Aprender a controlar cuánta agua y cuánto color lleva el pincel.',
      steps: [
        { title: 'Prepara el papel', instruction: 'Pega el papel con cinta y dibuja muy suave a lápiz una franja de cinco cuadros.', tip: 'El lápiz debe verse apenas: la acuarela es transparente y lo deja ver.', expected: 'Una franja con cinco cuadros vacíos.' },
        { title: 'Haz el tono más suave', instruction: 'Moja bien el pincel, tócalo apenas con la pintura y llena el primer cuadro.', tip: 'Casi todo es agua: el color debe verse como un velo.', expected: 'El cuadro 1 con un color muy suave y transparente.' },
        { title: 'Añade más color', instruction: 'En los cuadros 2 y 3, agrega un poco más de pintura a tu mezcla cada vez.', tip: 'Prueba la mezcla en un papelito antes de pintar el cuadro.', expected: 'Tres cuadros que se intensifican poco a poco.' },
        { title: 'Crea los tonos intensos', instruction: 'En los cuadros 4 y 5, usa una mezcla cremosa, con poca agua.', tip: 'Escurre el pincel en el borde del frasco para que no gotee.', expected: 'Los cinco cuadros, de transparente a intenso.' },
        { title: 'Déjala secar y obsérvala', instruction: 'Espera a que seque del todo y mira tu escala completa.', tip: 'La acuarela se aclara un poco al secar: es normal.', expected: 'Cinco intensidades que cambian de forma pareja.' },
      ],
    },
    questions: [
      '¿Por qué se me formaron manchas dentro de los cuadros?',
      '¿Cómo evito que el color se vea tan pálido?',
      '¿Cuánta agua debo usar en cada cuadro?',
      '¿Por qué se ven bordes duros en mi acuarela?',
    ],
    photoTip: 'Espera a que el papel esté seco y tómale una foto con buena luz, desde arriba y sin sombras.',
    keywords: { parejo: ['mancha', 'flor', 'borde', 'parej', 'uniforme', 'charco'], intensidad: ['pálido', 'palido', 'claro', 'agua'] },
    feedback: {
      saltos: {
        diff: ['Cuando el color cambia de golpe entre dos cuadros, suele ser porque se añadió mucha pintura de una vez.', 'También pasa cuando la mezcla se seca en la paleta y queda más concentrada.'],
        recs: ['Añade la pintura de a poquitos, como si fueran gotas.', 'Prepara las cinco mezclas en la paleta antes de empezar y compáralas.', 'Prueba cada mezcla en un papel aparte antes de pintar el cuadro.'],
      },
      parecidos: {
        diff: ['Cuando dos cuadros quedan casi iguales, es porque la cantidad de pintura fue muy parecida.', 'A veces el agua del frasco ya tiene color y cambia la mezcla sin que lo notes.'],
        recs: ['Usa el frasco de agua limpia solo para diluir, nunca para lavar el pincel.', 'Antes de cada cuadro, añade una gota más de pintura que en el anterior.', 'Compara las mezclas en la paleta: deben verse distintas entre sí.'],
      },
      intensidad: {
        diff: ['Cuando la escala se queda en colores suaves, es porque al último cuadro le faltó pigmento.', 'La acuarela se aclara al secar, así que en húmedo siempre se ve más fuerte.'],
        recs: ['Para el último cuadro, carga el pincel con pintura casi sin agua.', 'Pinta una segunda capa sobre el cuadro 5 cuando la primera esté seca.', 'Haz una prueba y espera a que seque antes de decidir.'],
      },
      parejo: {
        diff: ['Las manchas con forma de “flor” aparecen cuando cae agua sobre una zona que ya se estaba secando.', 'Los bordes duros salen si una parte del cuadro se seca antes de terminar de pintarlo.'],
        recs: ['Escurre el pincel antes de cada pasada para controlar el agua.', 'Pinta cada cuadro de una sola vez y sin volver a tocarlo mientras seca.', 'Si se forma un charco, absórbelo con la punta del pincel seco.'],
      },
      general: {
        diff: ['Controlar el agua es lo más difícil de la acuarela, y se aprende probando.', 'Las pequeñas diferencias suelen venir de cuánta agua lleva el pincel en cada momento.'],
        recs: ['Repite la escala con otro color para entrenar la mano.', 'Usa siempre el mismo pincel para que la cantidad de agua sea más constante.', 'Deja secar el papel en horizontal.'],
      },
    },
    next: [
      { title: 'Degradado de dos colores', description: 'Pinta una franja que empiece en azul y termine en amarillo, mezclando los dos colores en el centro mientras están húmedos.', duration: '15 min' },
      { title: 'Cielo al atardecer', description: 'Usa naranja y violeta para pintar un cielo con degradado y, al secar, una silueta sencilla de montañas.', duration: '25 min' },
    ],
  },

  /* ========================= PINTURA CON CAFÉ ========================= */
  {
    id: 'cafe',
    name: 'Pintura con café',
    level: 'Principiante',
    duration: '20–30 min',
    description: 'Pinta con algo que ya tienes en casa: el café crea tonos cálidos, de un beige suave a un marrón profundo.',
    color: '#8E6235',
    palette: ['#EEDFCB', '#D9BB94', '#BB915F', '#8E6235', '#5E3B1C'],
    fill: 'wash',
    tool: 'brush',
    sampleInk: [110, 70, 35],
    darkGoal: 0.4,
    boxLabels: ['1 capa', '', '', '', 'varias capas'],
    materials: [
      { name: 'Café instantáneo', detail: 'Se disuelve fácil y da tonos más intensos.', icon: 'Coffee' },
      { name: 'Agua caliente', detail: 'Poquita, para disolver el café.', icon: 'Droplets' },
      { name: 'Dos o tres recipientes', detail: 'Para tener café suave y café concentrado.', icon: 'CupSoda' },
      { name: 'Pincel', detail: 'Uno redondo mediano.', icon: 'Paintbrush' },
      { name: 'Papel grueso', detail: 'Papel para acuarela o cartulina gruesa.', icon: 'FileText' },
      { name: 'Papel de cocina', detail: 'Para quitar el exceso de café del pincel.', icon: 'StickyNote' },
    ],
    workspaceTips: [
      'Prepara dos mezclas: una con mucha agua (suave) y otra con muy poca (concentrada).',
      'Deja que el café se enfríe un poco antes de pintar.',
      'Ten paciencia con el secado: los tonos oscuros salen de varias capas.',
      'Protege la mesa: el café mancha.',
    ],
    tutorial: {
      title: 'Crea una escala de tonos con café',
      goal: 'Aprender a construir tonos con capas de café, de lo más suave a lo más intenso.',
      steps: [
        { title: 'Prepara el café y el papel', instruction: 'Disuelve una cucharadita de café en dos cucharadas de agua caliente. Separa una parte y añádele más agua. Dibuja a lápiz una franja de cinco cuadros.', tip: 'Así tendrás un café suave y uno concentrado listos para usar.', expected: 'Dos mezclas de café y una franja de cinco cuadros.' },
        { title: 'Haz el tono más suave', instruction: 'Pinta el primer cuadro con el café suave, en una sola capa.', tip: 'Pasa el pincel una sola vez para que el tono quede limpio.', expected: 'El cuadro 1 con un beige muy suave.' },
        { title: 'Construye con capas', instruction: 'Pinta los cuadros 2 y 3 con más capas, dejando secar entre una y otra.', tip: 'Cada capa oscurece un poco. Espera a que el papel no brille antes de la siguiente.', expected: 'Tres cuadros que se oscurecen poco a poco.' },
        { title: 'Crea los tonos profundos', instruction: 'En los cuadros 4 y 5, usa el café concentrado y varias capas.', tip: 'Para el último cuadro puedes poner unos granitos de café directo sobre la zona húmeda.', expected: 'Los cinco cuadros, de beige a marrón oscuro.' },
        { title: 'Déjala secar y obsérvala', instruction: 'Espera a que todo seque y mira tu escala completa.', tip: 'El café se aclara un poco al secar, como la acuarela.', expected: 'Cinco tonos cálidos que cambian de forma pareja.' },
      ],
    },
    questions: [
      '¿Por qué mi café se ve tan claro aunque le puse varias capas?',
      '¿Cómo consigo un marrón más oscuro?',
      '¿Por qué quedaron manchas en los bordes de los cuadros?',
      '¿Cuánto tengo que esperar entre una capa y otra?',
    ],
    photoTip: 'Espera a que el café esté seco y tómale una foto con buena luz natural, desde arriba.',
    keywords: { parejo: ['mancha', 'borde', 'parej', 'aureola', 'círculo', 'circulo'], intensidad: ['claro', 'oscuro', 'pálido', 'palido', 'marrón', 'marron'] },
    feedback: {
      saltos: {
        diff: ['Cuando el tono cambia de golpe entre dos cuadros, suele ser porque pasamos del café suave al concentrado muy rápido.', 'También pasa si en un cuadro pusiste muchas capas de una vez.'],
        recs: ['Sube de una capa en una capa: cuadro 1 con una, cuadro 2 con dos, y así.', 'Prepara una tercera mezcla intermedia entre la suave y la concentrada.', 'Compara cada cuadro con su vecino antes de añadir otra capa.'],
      },
      parecidos: {
        diff: ['Cuando dos cuadros quedan casi iguales, es porque recibieron una cantidad de café muy parecida.', 'Si pintas una capa encima de otra que aún está húmeda, el tono no sube tanto.'],
        recs: ['Espera a que el papel deje de brillar antes de cada nueva capa.', 'Lleva la cuenta de las capas de cada cuadro con un número a lápiz debajo.', 'Usa el café concentrado desde el cuadro 3.'],
      },
      intensidad: {
        diff: ['Cuando la escala se queda en tonos claros, es porque al último cuadro le faltaron capas o café concentrado.', 'El café instantáneo poco concentrado da tonos suaves aunque pongas varias capas.'],
        recs: ['Haz una mezcla muy concentrada: casi pura, con unas gotas de agua.', 'Pon varias capas en el último cuadro, dejando secar entre cada una.', 'Prueba esparcir unos granitos de café sobre la zona húmeda.'],
      },
      parejo: {
        diff: ['Las aureolas o bordes oscuros aparecen cuando el café se acumula en los bordes al secar.', 'También salen si el papel es delgado y absorbe de forma desigual.'],
        recs: ['No dejes charcos: reparte bien el café con el pincel.', 'Usa papel grueso para que el secado sea más parejo.', 'Si se forma una gota, absórbela con la punta de un papel de cocina.'],
      },
      general: {
        diff: ['Pintar con café es pura paciencia: los tonos salen de capas y tiempos de secado.', 'Las pequeñas diferencias suelen venir de qué tan húmedo estaba el papel.'],
        recs: ['Repite la escala usando un secador de pelo suave entre capas.', 'Prueba café de distintas marcas: cada uno da un tono un poco diferente.', 'Guarda tus mezclas tapadas para usarlas otro día.'],
      },
    },
    next: [
      { title: 'Taza de café con luz y sombra', description: 'Pinta una taza sencilla usando tus tonos: deja claro el lado que recibe la luz y oscurece el lado contrario.', duration: '25 min' },
      { title: 'Paisaje en sepia', description: 'Pinta un paisaje simple (cielo, montañas, suelo) usando solo tres tonos de café.', duration: '30 min' },
    ],
  },

  /* ============================ PUNTILLISMO ============================ */
  {
    id: 'puntillismo',
    name: 'Puntillismo',
    level: 'Principiante',
    duration: '25–35 min',
    description: 'Crea luces y sombras solo con puntos: más juntos, más oscuro; más separados, más claro.',
    color: '#2F7A4B',
    palette: ['#2c2a30', '#2c2a30', '#2c2a30', '#2c2a30', '#2c2a30'],
    fill: 'dots',
    tool: 'pen',
    sampleInk: [30, 30, 34],
    darkGoal: 0.35,
    boxLabels: ['separados', '', '', '', 'muy juntos'],
    materials: [
      { name: 'Rotulador de punta fina', detail: 'Negro, de 0,3 a 0,5 mm.', icon: 'PenLine' },
      { name: 'Papel liso', detail: 'Blanco y sin textura, para que los puntos queden limpios.', icon: 'FileText' },
      { name: 'Lápiz', detail: 'Para dibujar la franja muy suave.', icon: 'Pencil' },
      { name: 'Regla', detail: 'Para marcar los cuadros.', icon: 'Ruler' },
      { name: 'Borrador', detail: 'Para borrar el lápiz al final.', icon: 'Eraser' },
    ],
    workspaceTips: [
      'Sostén el rotulador en vertical: así los puntos salen redondos y no como rayitas.',
      'Ponte cómodo: el puntillismo es lento y relajante.',
      'Haz pausas para descansar la mano.',
      'Gira el papel si te resulta más cómodo.',
    ],
    tutorial: {
      title: 'Crea una escala de tonos con puntos',
      goal: 'Aprender a crear tonos cambiando qué tan juntos están los puntos.',
      steps: [
        { title: 'Prepara el papel', instruction: 'Dibuja a lápiz, muy suave, una franja de cinco cuadros.', tip: 'Después borrarás estas líneas, así que no las marques fuerte.', expected: 'Una franja con cinco cuadros vacíos.' },
        { title: 'Haz el tono más claro', instruction: 'En el primer cuadro, haz puntos muy separados entre sí.', tip: 'Toca el papel y levanta: no arrastres el rotulador.', expected: 'El cuadro 1 con pocos puntos repartidos.' },
        { title: 'Acerca los puntos', instruction: 'En los cuadros 2 y 3, haz los puntos cada vez más juntos.', tip: 'Reparte los puntos por todo el cuadro, sin formar filas.', expected: 'Tres cuadros que se ven más oscuros poco a poco.' },
        { title: 'Crea los tonos oscuros', instruction: 'En los cuadros 4 y 5, haz los puntos tan juntos que casi se toquen.', tip: 'No rellenes con líneas: la gracia es que todo sea con puntos.', expected: 'Los cinco cuadros, de muy claro a muy oscuro.' },
        { title: 'Aléjate y observa', instruction: 'Borra el lápiz con cuidado y mira tu escala desde lejos.', tip: 'De lejos, los puntos se mezclan y se ven como tonos de gris.', expected: 'Cinco tonos que cambian de forma pareja.' },
      ],
    },
    questions: [
      '¿Por qué mis puntos parecen rayitas?',
      '¿Cómo hago para que los tonos oscuros se vean más oscuros?',
      '¿Por qué se ven filas o manchas de puntos?',
      '¿Cómo reparto mejor los puntos en el cuadro?',
    ],
    photoTip: 'Tómale una foto con buena luz, desde arriba, y acércate para que se vean bien los puntos.',
    keywords: { parejo: ['raya', 'fila', 'mancha', 'reparto', 'repart', 'parej'], intensidad: ['oscuro', 'claro'] },
    feedback: {
      saltos: {
        diff: ['Cuando la cantidad de puntos cambia de golpe entre dos cuadros, el salto se nota mucho.', 'Suele pasar cuando nos cansamos y en los últimos cuadros llenamos más rápido.'],
        recs: ['Antes de empezar, haz una prueba de cuántos puntos va en cada cuadro.', 'Llena los cuadros poco a poco, pasando de uno a otro para compararlos.', 'Si un cuadro quedó muy oscuro, súmale puntos al anterior para suavizar el salto.'],
      },
      parecidos: {
        diff: ['Cuando dos cuadros se ven casi iguales, es porque tienen una cantidad de puntos muy parecida.', 'A veces la mano toma un ritmo y repite la misma distancia entre puntos.'],
        recs: ['Piensa en la distancia entre puntos: grande, mediana, pequeña, muy pequeña, casi nada.', 'Añade puntos al cuadro que debería ser más oscuro hasta que se note la diferencia.', 'Mira la escala de lejos para comprobar que cada cuadro es distinto.'],
      },
      intensidad: {
        diff: ['Cuando la escala se queda en tonos claros, es porque al último cuadro le faltaron puntos.', 'Es normal: llenar un cuadro oscuro con puntos toma tiempo.'],
        recs: ['En el último cuadro, haz los puntos tan juntos que casi se toquen.', 'Usa un rotulador un poco más grueso solo para el cuadro 5.', 'Tómate tu tiempo: el último cuadro es el que más puntos necesita.'],
      },
      parejo: {
        diff: ['Si los puntos parecen rayitas, es porque el rotulador se arrastra un poco al levantarlo.', 'Las filas o manchas aparecen cuando los puntos siguen un patrón en vez de repartirse al azar.'],
        recs: ['Sostén el rotulador en vertical y levántalo recto.', 'Reparte los puntos en todas las direcciones, como si fuera lluvia.', 'Gira el papel de vez en cuando para no repetir el mismo movimiento.'],
      },
      general: {
        diff: ['El puntillismo pide paciencia: cada tono se construye punto a punto.', 'Las pequeñas diferencias suelen venir del cansancio de la mano.'],
        recs: ['Haz la escala en dos sesiones cortas si te cansas.', 'Prueba con rotuladores de colores para crear mezclas ópticas.', 'Practica primero puntos sueltos en un papel aparte para calentar la mano.'],
      },
    },
    next: [
      { title: 'Esfera con puntos', description: 'Dibuja un círculo y dale volumen solo con puntos: muy separados donde llega la luz y muy juntos en la sombra.', duration: '30 min' },
      { title: 'Mezcla de colores con puntos', description: 'Llena un cuadro con puntos azules y amarillos mezclados y míralo de lejos: verás un verde.', duration: '20 min' },
    ],
  },

  /* ============================ ESTÉNCIL ============================ */
  {
    id: 'estencil',
    name: 'Esténcil',
    level: 'Principiante',
    duration: '20–30 min',
    description: 'Recorta una plantilla y estampa con esponja: aprende a dar intensidad capa por capa.',
    color: '#1F756D',
    palette: ['#CDEDEA', '#9FD9D3', '#6CC0B8', '#3E9F96', '#1F756D'],
    fill: 'sponge',
    tool: 'sponge',
    sampleInk: [31, 117, 109],
    darkGoal: 0.35,
    boxLabels: ['1 capa', '2', '3', '4', '5 capas'],
    materials: [
      { name: 'Cartulina o acetato', detail: 'Para hacer la plantilla.', icon: 'Layers' },
      { name: 'Tijeras o cúter', detail: 'Para recortar la plantilla. Con cuidado y sobre una base.', icon: 'Scissors' },
      { name: 'Esponja', detail: 'Un pedazo pequeño de esponja de cocina.', icon: 'Square' },
      { name: 'Pintura acrílica', detail: 'De un solo color.', icon: 'Palette' },
      { name: 'Plato desechable', detail: 'Para poner la pintura y descargar la esponja.', icon: 'Circle' },
      { name: 'Cinta de enmascarar', detail: 'Para fijar la plantilla al papel.', icon: 'StickyNote' },
    ],
    workspaceTips: [
      'Recorta sobre una base dura (un cartón grueso) y siempre alejando el cúter de tu mano.',
      'Ten un papel de prueba para descargar la esponja.',
      'Fija bien la plantilla con cinta para que no se mueva.',
      'Trabaja en un lugar ventilado y protege la mesa.',
    ],
    tutorial: {
      title: 'Crea una escala de capas con esténcil',
      goal: 'Aprender a controlar la pintura en la esponja y a construir intensidad por capas.',
      steps: [
        { title: 'Haz tu plantilla', instruction: 'Recorta un cuadrado de 3 × 3 cm en el centro de la cartulina. Marca en el papel cinco posiciones seguidas.', tip: 'Recorta despacio para que los bordes queden rectos.', expected: 'Una plantilla con una ventana cuadrada y el papel marcado.' },
        { title: 'Primera posición: una capa', instruction: 'Pon la plantilla en la posición 1. Moja apenas la esponja, descárgala en el papel de prueba y da toques suaves.', tip: 'La esponja debe estar casi seca: así la pintura no se corre bajo la plantilla.', expected: 'El cuadro 1 con una capa suave y ligera.' },
        { title: 'Suma capas', instruction: 'En la posición 2 da dos capas, y en la 3, tres capas. Deja secar unos segundos entre capas.', tip: 'Toques verticales, sin arrastrar la esponja.', expected: 'Tres cuadros que se intensifican poco a poco.' },
        { title: 'Capas intensas', instruction: 'En las posiciones 4 y 5 da cuatro y cinco capas.', tip: 'Mejor muchas capas finas que una gruesa: los bordes quedan más limpios.', expected: 'Los cinco cuadros, de suave a intenso.' },
        { title: 'Retira y revisa', instruction: 'Levanta la plantilla con cuidado y mira tus cinco cuadros y sus bordes.', tip: 'Limpia la plantilla para que puedas volver a usarla.', expected: 'Cinco cuadros con bordes limpios e intensidad creciente.' },
      ],
    },
    questions: [
      '¿Por qué la pintura se corrió por debajo de la plantilla?',
      '¿Cómo consigo bordes más limpios?',
      '¿Por qué un cuadro quedó con manchas y otro parejo?',
      '¿Cuánta pintura debo poner en la esponja?',
    ],
    photoTip: 'Cuando la pintura esté seca, tómale una foto con buena luz, desde arriba.',
    keywords: { parejo: ['corri', 'borde', 'mancha', 'parej', 'limpi', 'debajo'], intensidad: ['claro', 'oscuro', 'suave'] },
    feedback: {
      saltos: {
        diff: ['Cuando la intensidad cambia de golpe entre dos cuadros, suele ser porque la esponja tenía mucha más pintura en uno que en otro.', 'También pasa si una capa quedó más gruesa que las demás.'],
        recs: ['Descarga la esponja en el papel de prueba antes de cada capa.', 'Cuenta los toques: que cada capa tenga más o menos los mismos.', 'Recarga la esponja con la misma cantidad de pintura cada vez.'],
      },
      parecidos: {
        diff: ['Cuando dos cuadros quedan casi iguales, es porque las capas extra no alcanzaron a notarse.', 'Si das una capa encima de otra húmeda, se mezclan y no suman intensidad.'],
        recs: ['Deja secar unos segundos entre capas para que cada una se note.', 'Asegúrate de que la esponja tenga algo de pintura en las capas finales.', 'Compara los cuadros al terminar cada capa.'],
      },
      intensidad: {
        diff: ['Cuando la escala se queda en tonos suaves, es porque al último cuadro le faltaron capas o pintura.', 'Con la esponja muy seca, cada capa deja muy poquita pintura.'],
        recs: ['En los últimos cuadros, carga un poco más la esponja (sin que gotee).', 'Añade una o dos capas más al cuadro 5.', 'Usa una pintura de color más fuerte para notar mejor la diferencia.'],
      },
      parejo: {
        diff: ['Cuando la pintura se corre bajo la plantilla, suele ser porque la esponja tenía demasiada pintura o la plantilla no estaba bien pegada.', 'Las manchas salen si la esponja se arrastra en lugar de dar toques.'],
        recs: ['Pega bien los bordes de la plantilla con cinta.', 'Descarga la esponja hasta que casi no deje pintura en el papel de prueba.', 'Da toques verticales desde los bordes hacia el centro.'],
      },
      general: {
        diff: ['El esténcil se trata de controlar la pintura: menos es más.', 'Las pequeñas diferencias suelen venir de cuánta pintura llevaba la esponja.'],
        recs: ['Repite la escala con otra forma: un círculo o una estrella.', 'Prueba estampar sobre una bolsa de tela o una camiseta vieja.', 'Guarda tu plantilla: te servirá para muchos proyectos.'],
      },
    },
    next: [
      { title: 'Esténcil de dos colores', description: 'Usa la misma plantilla dos veces con colores distintos, moviéndola un poco para crear una sombra.', duration: '25 min' },
      { title: 'Tu primera hoja en esténcil', description: 'Recorta la silueta de una hoja y estámpala varias veces con distintas intensidades para crear una composición.', duration: '30 min' },
    ],
  },

  /* ============================ SERIGRAFÍA ============================ */
  {
    id: 'serigrafia',
    name: 'Serigrafía',
    level: 'Principiante',
    duration: '40–60 min',
    description: 'Estampa a través de una malla: aprende a encontrar la presión justa para una impresión limpia.',
    color: '#B0195F',
    palette: ['#F7D2E3', '#EFA4C6', '#E46FA6', '#D23F85', '#B0195F'],
    fill: 'print',
    tool: 'squeegee',
    sampleInk: [200, 40, 120],
    darkGoal: 0.35,
    boxLabels: ['suave', '', '', '', 'firme'],
    materials: [
      { name: 'Marco con malla', detail: 'Un bastidor de serigrafía o un marco con tela de visillo bien tensada.', icon: 'Frame' },
      { name: 'Plantilla recortada', detail: 'Papel o vinilo con un cuadrado recortado.', icon: 'Scissors' },
      { name: 'Racle', detail: 'O una tarjeta plástica rígida para arrastrar la tinta.', icon: 'CreditCard' },
      { name: 'Tinta serigráfica al agua', detail: 'O pintura acrílica mezclada con un poco de medio.', icon: 'Palette' },
      { name: 'Cinta de enmascarar', detail: 'Para sellar los bordes de la malla.', icon: 'StickyNote' },
      { name: 'Papel', detail: 'Varias hojas para tus pruebas.', icon: 'FileText' },
    ],
    workspaceTips: [
      'Trabaja sobre una mesa plana y firme.',
      'Ten agua y una esponja cerca: hay que lavar la malla apenas termines.',
      'Prepara varias hojas antes de empezar para imprimir seguido.',
      'Usa ropa que se pueda manchar.',
    ],
    tutorial: {
      title: 'Haz cinco pruebas de impresión con serigrafía',
      goal: 'Encontrar la cantidad de tinta y la presión justas para una impresión pareja.',
      steps: [
        { title: 'Prepara la pantalla', instruction: 'Pega la plantilla debajo de la malla y sella los bordes con cinta. Marca en el papel cinco posiciones seguidas.', tip: 'La cinta evita que la tinta se escape por donde no quieres.', expected: 'La pantalla lista y el papel marcado.' },
        { title: 'Primera prueba: suave', instruction: 'Pon un poco de tinta arriba de la malla y pasa el racle con muy poca presión sobre la posición 1.', tip: 'Es normal que esta prueba quede clara o incompleta.', expected: 'Una impresión clara, con zonas sin tinta.' },
        { title: 'Ajusta la presión', instruction: 'En las posiciones 2 y 3, añade algo de tinta y presiona un poco más.', tip: 'Inclina el racle unos 45° y pasa de un solo movimiento.', expected: 'Impresiones cada vez más llenas.' },
        { title: 'Impresiones firmes', instruction: 'En las posiciones 4 y 5, presiona firme y parejo.', tip: 'Si la tinta se sale por los bordes, estás apretando o cargando de más.', expected: 'Los cinco cuadros, de una impresión suave a una llena.' },
        { title: 'Compara y lava', instruction: 'Compara tus cinco pruebas y elige la más limpia. Lava la malla enseguida.', tip: 'Si la tinta se seca en la malla, tapa los huecos y ya no imprime.', expected: 'Cinco pruebas que te muestran la presión ideal.' },
      ],
    },
    questions: [
      '¿Por qué mi impresión sale con huecos?',
      '¿Por qué la tinta se corrió por los bordes?',
      '¿Cuánta presión debo hacer con el racle?',
      '¿Cómo logro que la tinta quede pareja?',
    ],
    photoTip: 'Cuando la tinta esté seca, tómale una foto a tus cinco pruebas, con buena luz y desde arriba.',
    keywords: { parejo: ['hueco', 'corri', 'borde', 'parej', 'mancha', 'incompleta'], intensidad: ['claro', 'pálido', 'palido', 'tinta'] },
    feedback: {
      saltos: {
        diff: ['Cuando el resultado cambia de golpe entre dos pruebas, suele ser porque la presión o la tinta aumentaron mucho de una a otra.', 'También pasa si la tinta se acumula en una sola zona de la malla.'],
        recs: ['Aumenta la presión de a poco entre una prueba y la siguiente.', 'Reparte la tinta a lo ancho de la malla antes de cada pasada.', 'Haz una pasada de “carga” sin presionar antes de imprimir.'],
      },
      parecidos: {
        diff: ['Cuando dos pruebas se ven casi iguales, es porque la presión fue muy parecida.', 'Si la malla ya está cargada de tinta, varias pruebas pueden salir igual.'],
        recs: ['Cambia de forma clara la presión en cada prueba: suave, media, firme.', 'Cuenta las pasadas del racle para cada prueba.', 'Compara las pruebas una al lado de la otra.'],
      },
      intensidad: {
        diff: ['Cuando las pruebas quedan claras, es porque a la última le faltó tinta o presión.', 'La malla puede estar algo tapada y dejar pasar poca tinta.'],
        recs: ['Añade más tinta y haz dos pasadas en la última prueba.', 'Mantén el racle inclinado a 45° y presiona parejo.', 'Lava la malla si notas que deja pasar menos tinta que al principio.'],
      },
      parejo: {
        diff: ['Los huecos aparecen cuando hay poca tinta o la presión no es pareja de un lado a otro.', 'Si la tinta se corre, suele ser por exceso de tinta o porque la malla se movió.'],
        recs: ['Presiona con las dos manos para que la fuerza sea pareja.', 'Fija el marco para que no se mueva mientras imprimes.', 'Usa menos tinta si se escapa por los bordes.'],
      },
      general: {
        diff: ['En serigrafía cada prueba enseña algo: es normal necesitar varias para encontrar la presión ideal.', 'Las pequeñas diferencias suelen venir del ángulo del racle.'],
        recs: ['Anota con qué presión hiciste cada prueba para repetir la mejor.', 'Practica con papel antes de imprimir sobre tela.', 'Lava siempre la malla al terminar.'],
      },
    },
    next: [
      { title: 'Estampa una forma propia', description: 'Recorta una forma sencilla (una hoja, una estrella) e imprímela con la presión que mejor te funcionó.', duration: '40 min' },
      { title: 'Impresión en tela', description: 'Imprime tu forma sobre una bolsa de tela o una camiseta, usando tinta para textil.', duration: '45 min' },
    ],
  },
]

export const getTechnique = (id) => techniques.find((t) => t.id === id) || techniques[0]
