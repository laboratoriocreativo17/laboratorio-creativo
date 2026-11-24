// Lectura sencilla de la foto, calculada en el navegador.
// NO es inteligencia artificial: busca la franja de 5 cuadros, la divide
// en 5 partes y compara qué tan intenso es cada cuadro con respecto al
// blanco del papel. La luz y el encuadre de la foto pueden alterarla.

const PRE = 240 // resolución de trabajo
const SEGMENTS = 5

function loadImage(src) {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.onload = () => resolve(img)
    img.onerror = reject
    img.src = src
  })
}

const mean = (a) => a.reduce((s, v) => s + v, 0) / a.length
const lumOf = (r, g, b) => 0.2126 * r + 0.7152 * g + 0.0722 * b

// Corridas contiguas de valores verdaderos: [{start, end}]
function runs(flags) {
  const out = []
  let s = -1
  flags.forEach((f, i) => {
    if (f && s < 0) s = i
    if (!f && s >= 0) { out.push({ start: s, end: i - 1 }); s = -1 }
  })
  if (s >= 0) out.push({ start: s, end: flags.length - 1 })
  return out
}

// Une corridas separadas por huecos pequeños
function mergeRuns(rs, maxGap) {
  if (!rs.length) return rs
  const out = [{ ...rs[0] }]
  for (const r of rs.slice(1)) {
    const last = out[out.length - 1]
    if (r.start - last.end - 1 <= maxGap) last.end = r.end
    else out.push({ ...r })
  }
  return out
}
const longest = (rs) => rs.reduce((a, b) => (b.end - b.start > a.end - a.start ? b : a), rs[0])

export async function analyzeImage(src) {
  const img = await loadImage(src)
  const scale = PRE / Math.max(img.width, img.height)
  const w = Math.max(20, Math.round(img.width * scale))
  const h = Math.max(20, Math.round(img.height * scale))
  const canvas = document.createElement('canvas')
  canvas.width = w
  canvas.height = h
  const ctx = canvas.getContext('2d', { willReadFrequently: true })
  ctx.drawImage(img, 0, 0, w, h)
  const { data } = ctx.getImageData(0, 0, w, h)

  const N = w * h
  const R = new Float32Array(N), G = new Float32Array(N), B = new Float32Array(N), Lm = new Float32Array(N)
  for (let i = 0; i < N; i++) {
    R[i] = data[i * 4]; G[i] = data[i * 4 + 1]; B[i] = data[i * 4 + 2]
    Lm[i] = lumOf(R[i], G[i], B[i])
  }

  // 1) Color del papel: promedio de los píxeles claros (percentil 70–95 de brillo)
  const sorted = Array.from(Lm).sort((a, b) => a - b)
  const lo = sorted[Math.floor(N * 0.7)], hi = sorted[Math.floor(N * 0.95)]
  let pr = 0, pg = 0, pb = 0, pn = 0
  for (let i = 0; i < N; i++) if (Lm[i] >= lo && Lm[i] <= hi) { pr += R[i]; pg += G[i]; pb += B[i]; pn++ }
  const paper = { r: pr / pn, g: pg / pn, b: pb / pn }
  const paperL = lumOf(paper.r, paper.g, paper.b)

  // 2) Píxeles "con material": se diferencian del papel en brillo o en color
  const ink = new Uint8Array(N)
  for (let i = 0; i < N; i++) {
    const d = Math.hypot(R[i] - paper.r, G[i] - paper.g, B[i] - paper.b)
    ink[i] = d > 26 || paperL - Lm[i] > 16 ? 1 : 0
  }

  // 3) Busca la franja: filas (o columnas) con mucha presencia de material.
  //    Objetos sueltos (un lápiz, una sombra en el borde) ocupan poco ancho y se descartan.
  const idx = (horizontal, a, b) => (horizontal ? a * w + b : b * w + a)
  const findBand = (horizontal) => {
    const len1 = horizontal ? h : w, len2 = horizontal ? w : h
    const frac = []
    for (let a = 0; a < len1; a++) { let s = 0; for (let b = 0; b < len2; b++) s += ink[idx(horizontal, a, b)]; frac.push(s / len2) }
    const bands = mergeRuns(runs(frac.map((f) => f > 0.22)), Math.round(len1 * 0.02))
    if (!bands.length) return null
    const main = longest(bands)
    const thick = main.end - main.start + 1
    if (thick < len1 * 0.04) return null
    // Papel de referencia a cada lado de la franja (corrige luces y sombras de la foto)
    const k = Math.max(3, Math.round(thick * 0.5))
    const refRows = []
    for (let a = main.start - k; a <= main.start - 2; a++) if (a >= 0) refRows.push(a)
    for (let a = main.end + 2; a <= main.end + k; a++) if (a < len1) refRows.push(a)
    const local = [] // {L, r, g, b} por posición a lo largo de la franja
    for (let b = 0; b < len2; b++) {
      const ls = refRows.map((a) => Lm[idx(horizontal, a, b)]).sort((x, y) => x - y)
      const Lref = ls.length ? ls[Math.floor(ls.length * 0.75)] : paperL
      let r = 0, g = 0, bl = 0, n = 0
      for (const a of refRows) { const i = idx(horizontal, a, b); if (Lm[i] >= Lref - 12) { r += R[i]; g += G[i]; bl += B[i]; n++ } }
      local.push(n ? { L: Lref, r: r / n, g: g / n, b: bl / n } : { L: paperL, ...paper })
    }
    const frac2 = []
    for (let b = 0; b < len2; b++) {
      const p = local[b]; let s = 0
      for (let a = main.start; a <= main.end; a++) {
        const i = idx(horizontal, a, b)
        if (p.L - Lm[i] > 14 || Math.hypot(R[i] - p.r, G[i] - p.g, B[i] - p.b) > 24) s++
      }
      frac2.push(s / thick)
    }
    const along = mergeRuns(runs(frac2.map((f) => f > 0.2)), Math.round(len2 * 0.03))
    if (!along.length) return null
    const span = longest(along)
    const length = span.end - span.start + 1
    if (length < len2 * 0.25 || length < thick * 2) return null
    return { horizontal, a0: main.start, a1: main.end, b0: span.start, b1: span.end, length, thick, local }
  }
  const hb = findBand(true), vb = findBand(false)
  let band = hb && vb ? (hb.length / hb.thick >= vb.length / vb.thick ? hb : vb) : hb || vb
  const found = !!band
  if (!band) {
    // Sin franja clara: usamos el centro de la foto
    const horizontal = w >= h
    const len1 = horizontal ? h : w, len2 = horizontal ? w : h
    band = { horizontal, a0: Math.round(len1 * 0.3), a1: Math.round(len1 * 0.7), b0: Math.round(len2 * 0.1), b1: Math.round(len2 * 0.9), local: null }
  }

  // 4) Mide 5 cuadros, dejando un margen para no leer las líneas del contorno
  const insetA = Math.round((band.a1 - band.a0) * 0.18)
  const segLen = (band.b1 - band.b0 + 1) / SEGMENTS
  const segments = []
  for (let k = 0; k < SEGMENTS; k++) {
    const b0 = Math.round(band.b0 + k * segLen + segLen * 0.18)
    const b1 = Math.round(band.b0 + (k + 1) * segLen - segLen * 0.18)
    let r = 0, g = 0, bl = 0, n = 0, pL = 0, ppr = 0, ppg = 0, ppb = 0, pn = 0
    for (let b = b0; b <= b1; b++) {
      const p = band.local ? band.local[b] : { L: paperL, ...paper }
      pL += p.L; ppr += p.r; ppg += p.g; ppb += p.b; pn++
      for (let a = band.a0 + insetA; a <= band.a1 - insetA; a++) {
        const i = idx(band.horizontal, a, b)
        r += R[i]; g += G[i]; bl += B[i]; n++
      }
    }
    r /= n; g /= n; bl /= n; pL /= pn; ppr /= pn; ppg /= pn; ppb /= pn
    // Intensidad con respecto al papel de al lado (0 = igual al papel, 1 = negro)
    const intensity = Math.max(0, Math.min(1, 1 - lumOf(r, g, bl) / pL))
    // Color "corregido" como si el papel fuera blanco (para mostrarlo)
    const fix = (v, p) => Math.round(Math.max(0, Math.min(255, (v / p) * 250)))
    segments.push({ intensity, color: `rgb(${fix(r, ppr)}, ${fix(g, ppg)}, ${fix(bl, ppb)})` })
  }

  // Si la foto está al revés (oscuro primero), la ordenamos de claro a oscuro
  if (segments[0].intensity > segments[SEGMENTS - 1].intensity) segments.reverse()

  const vals = segments.map((s) => s.intensity)
  const diffs = vals.slice(1).map((v, i) => v - vals[i])
  const outOfOrder = diffs.map((d, i) => (d < -0.03 ? i + 2 : null)).filter(Boolean)
  const steps = diffs.map(Math.abs)
  const avgStep = mean(steps)
  const bigJumps = steps.map((d, i) => (d > 0.1 && d > avgStep * 1.7 ? i + 1 : null)).filter(Boolean)
  const tooSimilar = steps.map((d, i) => (d < 0.025 ? i + 1 : null)).filter(Boolean)

  return {
    found,
    segments,
    darkest: Math.max(...vals),
    lightest: Math.min(...vals),
    range: Math.max(...vals) - Math.min(...vals),
    outOfOrder, // cuadros que quedaron más claros que el anterior
    bigJumps, // n: salto grande entre el cuadro n y n+1
    tooSimilar, // n: los cuadros n y n+1 se ven casi iguales
  }
}

// Genera una "foto" de ejemplo para probar el flujo sin cámara.
// Pinta 5 cuadros con el estilo de la técnica y un salto entre el 3 y el 4.
export function createSampleImage(technique) {
  const w = 900, h = 560
  const c = document.createElement('canvas')
  c.width = w; c.height = h
  const ctx = c.getContext('2d')
  ctx.fillStyle = '#f7f4ee'; ctx.fillRect(0, 0, w, h)
  for (let i = 0; i < 14000; i++) {
    ctx.fillStyle = `rgba(80,70,60,${Math.random() * 0.05})`
    ctx.fillRect(Math.random() * w, Math.random() * h, 1.4, 1.4)
  }
  const x0 = 110, y0 = 190, bw = 136, bh = 180
  const strength = [0.12, 0.26, 0.38, 0.72, 0.88] // salto entre 3 y 4
  const [cr, cg, cb] = technique.sampleInk
  strength.forEach((t, i) => {
    const bx = x0 + i * bw
    if (technique.fill === 'dots') {
      const spacing = 22 - t * 17
      for (let y = y0 + 4; y < y0 + bh; y += spacing) {
        for (let x = bx + 4; x < bx + bw; x += spacing) {
          ctx.fillStyle = `rgba(${cr},${cg},${cb},0.9)`
          ctx.beginPath(); ctx.arc(x + Math.random() * 3, y + Math.random() * 3, 2.2, 0, Math.PI * 2); ctx.fill()
        }
      }
    } else if (technique.fill === 'hatch') {
      const strokes = 260 + t * 900
      for (let s = 0; s < strokes; s++) {
        const sx = bx + Math.random() * bw, sy = y0 + Math.random() * bh, len = 10 + Math.random() * 16
        ctx.strokeStyle = `rgba(${cr},${cg},${cb},${t * (0.35 + Math.random() * 0.35)})`
        ctx.lineWidth = 0.8 + t * 1.6
        ctx.beginPath(); ctx.moveTo(sx, sy); ctx.lineTo(sx + len * 0.55, sy - len * 0.8); ctx.stroke()
      }
    } else {
      // manchas suaves (acuarela, café, esténcil, serigrafía)
      ctx.fillStyle = `rgba(${cr},${cg},${cb},${t})`
      ctx.fillRect(bx + 3, y0 + 3, bw - 6, bh - 6)
      for (let s = 0; s < 500; s++) {
        ctx.fillStyle = `rgba(${cr},${cg},${cb},${t * 0.15 * Math.random()})`
        ctx.beginPath(); ctx.arc(bx + Math.random() * bw, y0 + Math.random() * bh, 2 + Math.random() * 7, 0, Math.PI * 2); ctx.fill()
      }
    }
  })
  ctx.strokeStyle = 'rgba(60,60,64,0.55)'
  ctx.lineWidth = 1.2
  ctx.strokeRect(x0, y0, bw * 5, bh)
  for (let i = 1; i < 5; i++) { ctx.beginPath(); ctx.moveTo(x0 + i * bw, y0); ctx.lineTo(x0 + i * bw, y0 + bh); ctx.stroke() }
  return c.toDataURL('image/jpeg', 0.9)
}
