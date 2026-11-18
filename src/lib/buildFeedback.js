import { feedbackLibrary, nextExercises } from '../data/content.js'

// Construye la retroalimentación SIMULADA combinando:
// 1) La pregunta del usuario (búsqueda de palabras clave).
// 2) Mediciones aproximadas de píxeles (lib/analyzeImage.js).
// En una versión real, esta función se reemplazaría por una llamada
// a un modelo multimodal (ver README).

function pickTopic(question, m) {
  const q = (question || '').toLowerCase()
  for (const [key, entry] of Object.entries(feedbackLibrary)) {
    if (entry.match.some((w) => q.includes(w))) return { key, reason: 'question' }
  }
  if (m) {
    if (m.jumps.length > 0) return { key: 'transiciones', reason: 'metrics' }
    if (m.contrast === 'reducido') return { key: 'variedad', reason: 'metrics' }
    if (m.uniformity === 'baja') return { key: 'uniformidad', reason: 'metrics' }
  }
  return { key: 'general', reason: 'default' }
}

const edge = (m, first) => {
  if (m.orientation === 'horizontal') return first ? 'izquierda' : 'derecha'
  return first ? 'arriba' : 'abajo'
}

function buildObservations(m) {
  if (!m) {
    return ['No fue posible leer la imagen en este dispositivo, así que no hay observaciones sobre tu foto.']
  }
  const obs = []
  const lightSide = m.darkening ? edge(m, true) : edge(m, false)
  const darkSide = m.darkening ? edge(m, false) : edge(m, true)
  if (m.monotonic) {
    obs.push(`El tono se oscurece de forma progresiva de ${lightSide} a ${darkSide}: tu escala sigue el orden de claro a oscuro que busca el ejercicio.`)
  } else {
    obs.push(`En general el tono va de ${lightSide} a ${darkSide}, aunque en algún punto una casilla queda más clara que la anterior. Puede ser por la luz de la foto o por la presión en esa zona.`)
  }
  obs.push(`El tono más claro tiene aproximadamente un ${m.lightest} % de oscuridad y el más oscuro un ${m.darkest} %, así que el rango tonal es ${m.contrast}.`)
  if (m.jumps.length) {
    const pares = m.jumps.map((n) => `${n} y ${n + 1}`).join(', ')
    obs.push(`El paso entre las casillas ${pares} es bastante mayor que los demás: ahí se nota un cambio más brusco.`)
  } else {
    obs.push('Los pasos entre casillas tienen un tamaño parecido, lo que da una transición bastante equilibrada.')
  }
  const u = {
    alta: 'El tono dentro de cada casilla se ve bastante parejo.',
    media: 'Dentro de algunas casillas hay pequeñas variaciones de tono, algo muy común al empezar.',
    baja: 'Dentro de las casillas hay bastante variación; podrían ser trazos visibles, zonas con distinta presión o sombras en la foto.',
  }
  obs.push(u[m.uniformity])
  return obs
}

export function buildFeedback(question, metrics) {
  const topic = pickTopic(question, metrics)
  const entry = feedbackLibrary[topic.key]
  const opener = question?.trim()
    ? 'Gracias por compartir tu escala y tu pregunta. Mirar tu propio dibujo con atención es una de las habilidades más valiosas que puedes desarrollar.'
    : 'Gracias por compartir tu escala. Terminar tu primera degradación de tonos ya es un gran paso.'
  return {
    topic: topic.key,
    topicReason: topic.reason,
    opener,
    observations: buildObservations(metrics),
    difficulties: entry.difficulties,
    recommendations: entry.recommendations,
    nextExercise: topic.key === 'transiciones' ? nextExercises[1] : nextExercises[0],
    closing: 'Cada escala que haces entrena tu mano y tu mirada. ¡Sigue practicando!',
  }
}
