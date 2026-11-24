// Arma la retroalimentación SIMULADA, en lenguaje sencillo.
// Combina: (1) la pregunta del usuario, (2) la lectura de la foto
// (lib/analyzeImage.js) y (3) los consejos escritos para cada técnica
// (data/techniques.js). En una versión real, esto lo haría un modelo de IA.

const QUESTION_WORDS = {
  saltos: ['brusco', 'salto', 'golpe', 'transición', 'transicion', 'cambio'],
  parecidos: ['igual', 'parecid', 'mismo', 'misma', 'no se nota'],
  intensidad: ['pálido', 'palido', 'claro', 'oscuro', 'intens', 'fuerte'],
}

function pickTopic(technique, question, m) {
  const q = (question || '').toLowerCase()
  const has = (words = []) => words.some((w) => q.includes(w))
  if (q) {
    if (has(QUESTION_WORDS.saltos)) return 'saltos'
    if (has(technique.keywords.parejo)) return 'parejo'
    if (has(QUESTION_WORDS.parecidos)) return 'parecidos'
    if (has([...(technique.keywords.intensidad || []), ...QUESTION_WORDS.intensidad])) return 'intensidad'
  }
  if (m) {
    if (m.bigJumps.length) return 'saltos'
    if (m.tooSimilar.length) return 'parecidos'
    if (m.darkest < technique.darkGoal) return 'intensidad'
  }
  return 'general'
}

// Lo que mostramos en el panel "Así vemos tus cuadros": frases cortas, sin números
export function buildChecks(technique, m) {
  if (!m) return []
  const checks = []
  checks.push(
    m.outOfOrder.length
      ? { ok: false, text: `El cuadro ${m.outOfOrder[0]} quedó más suave que el anterior.` }
      : { ok: true, text: 'Tus cuadros van de lo más suave a lo más intenso, en orden.' },
  )
  if (m.bigJumps.length) {
    const n = m.bigJumps[0]
    checks.push({ ok: false, text: `Del cuadro ${n} al ${n + 1} el cambio es muy grande.` })
  } else if (m.tooSimilar.length) {
    const n = m.tooSimilar[0]
    checks.push({ ok: false, text: `Los cuadros ${n} y ${n + 1} se ven casi iguales.` })
  } else {
    checks.push({ ok: true, text: 'De un cuadro a otro, los cambios se ven parejos.' })
  }
  checks.push(
    m.darkest >= technique.darkGoal
      ? { ok: true, text: 'El último cuadro llegó a un tono bien intenso.' }
      : { ok: false, text: 'Al último cuadro todavía le cabe más intensidad.' },
  )
  return checks
}

function buildObservation(technique, m, checks, topic, fromQuestion) {
  if (!m) return ['No pudimos leer bien tu foto, así que te dejamos consejos generales para esta técnica.']
  const good = checks.filter((c) => c.ok).length
  const obs = []
  if (good === 3) obs.push('¡Se ve muy bien! Tu escala avanza de lo suave a lo intenso con pasos parejos.')
  else if (good === 2) obs.push('Vas por muy buen camino: la mayor parte de tu escala funciona.')
  else obs.push('Ya tienes la base de la escala, y hay un par de cosas fáciles de mejorar.')
  const firstIssue = checks.find((c) => !c.ok)
  if (firstIssue) obs.push(`Lo que más nos llamó la atención: ${firstIssue.text.charAt(0).toLowerCase()}${firstIssue.text.slice(1)}`)
  const related = { saltos: 1, parecidos: 1, intensidad: 2 }[topic]
  if (fromQuestion && related !== undefined && checks[related]?.ok) {
    obs.push('Sobre tu pregunta: en tu foto eso ya se ve bastante bien. Igual te dejamos ideas para afinarlo todavía más.')
  }
  if (!m.found) obs.push('No logramos encontrar bien la franja en la foto, así que esta lectura puede no ser exacta. Una foto más cerca y de frente ayuda.')
  return obs
}

export function buildFeedback(technique, question, metrics) {
  const topic = pickTopic(technique, question, metrics)
  const entry = technique.feedback[topic]
  const checks = buildChecks(technique, metrics)
  const fromQuestion = !!question?.trim() && topic !== 'general'
  const opener = question?.trim()
    ? '¡Gracias por compartir tu práctica y tu pregunta! Vamos a verla juntos.'
    : '¡Gracias por compartir tu práctica! Vamos a verla juntos.'
  return {
    topic,
    fromQuestion,
    allGood: checks.length > 0 && checks.every((c) => c.ok),
    opener,
    checks,
    observations: buildObservation(technique, metrics, checks, topic, fromQuestion),
    difficulties: entry.diff,
    recommendations: entry.recs,
    nextExercise: topic === 'saltos' || topic === 'parecidos' ? technique.next[1] : technique.next[0],
    closing: 'Cada intento te enseña algo nuevo. ¡Sigue experimentando!',
  }
}
