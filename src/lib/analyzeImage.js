// Mediciones básicas de píxeles, calculadas en el navegador.
// NO es inteligencia artificial ni visión por computador avanzada:
// solo promedia el brillo a lo largo de la imagen para estimar cómo
// cambia el tono de un extremo al otro. Los resultados dependen de la
// luz y del encuadre de la foto, por eso se presentan como aproximados.

const SIZE = 60
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
const std = (a) => { const m = mean(a); return Math.sqrt(mean(a.map((v) => (v - m) ** 2))) }

export async function analyzeImage(src) {
  const img = await loadImage(src)
  // 1) Busca la zona dibujada: píxeles claramente más oscuros que el papel.
  const PRE = 200
  const pre = document.createElement('canvas')
  pre.width = PRE; pre.height = PRE
  const pctx = pre.getContext('2d', { willReadFrequently: true })
  const mx = img.width * 0.04, my = img.height * 0.04
  const sw = img.width - 2 * mx, sh = img.height - 2 * my
  pctx.drawImage(img, mx, my, sw, sh, 0, 0, PRE, PRE)
  const pd = pctx.getImageData(0, 0, PRE, PRE).data
  const L = new Float32Array(PRE * PRE)
  for (let i = 0; i < PRE * PRE; i++) L[i] = 0.2126 * pd[i * 4] + 0.7152 * pd[i * 4 + 1] + 0.0722 * pd[i * 4 + 2]
  const sorted = Array.from(L).sort((a, b) => a - b)
  const paper = sorted[Math.floor(sorted.length * 0.9)]
  const xs = [], ys = []
  for (let y = 0; y < PRE; y++) for (let x = 0; x < PRE; x++) {
    if (L[y * PRE + x] < paper - 22) { xs.push(x); ys.push(y) }
  }
  let bx = 0, by = 0, bw = PRE, bh = PRE
  if (xs.length > PRE * PRE * 0.01) {
    xs.sort((a, b) => a - b); ys.sort((a, b) => a - b)
    const q = (a, f) => a[Math.floor((a.length - 1) * f)]
    const x0 = q(xs, 0.01), x1 = q(xs, 0.99), y0 = q(ys, 0.01), y1 = q(ys, 0.99)
    if (x1 - x0 > PRE * 0.15 && y1 - y0 > PRE * 0.08) {
      // recorta un poco hacia adentro para evitar el contorno dibujado
      const ix = (x1 - x0) * 0.02, iy = (y1 - y0) * 0.08
      bx = x0 + ix; by = y0 + iy; bw = x1 - x0 - 2 * ix; bh = y1 - y0 - 2 * iy
    }
  }

  // 2) Muestrea solo esa zona a baja resolución.
  const canvas = document.createElement('canvas')
  canvas.width = SIZE
  canvas.height = SIZE
  const ctx = canvas.getContext('2d', { willReadFrequently: true })
  const kx = sw / PRE, ky = sh / PRE
  ctx.drawImage(img, mx + bx * kx, my + by * ky, bw * kx, bh * ky, 0, 0, SIZE, SIZE)
  const { data } = ctx.getImageData(0, 0, SIZE, SIZE)

  const lum = (x, y) => {
    const i = (y * SIZE + x) * 4
    return 0.2126 * data[i] + 0.7152 * data[i + 1] + 0.0722 * data[i + 2]
  }

  // Perfiles de brillo por columna y por fila
  const cols = [], colStd = [], rows = [], rowStd = []
  for (let x = 0; x < SIZE; x++) {
    const v = []; for (let y = 0; y < SIZE; y++) v.push(lum(x, y))
    cols.push(mean(v)); colStd.push(std(v))
  }
  for (let y = 0; y < SIZE; y++) {
    const v = []; for (let x = 0; x < SIZE; x++) v.push(lum(x, y))
    rows.push(mean(v)); rowStd.push(std(v))
  }

  // La escala puede estar horizontal o vertical en la foto:
  // usamos el eje donde el brillo cambia más.
  const range = (a) => Math.max(...a) - Math.min(...a)
  const horizontal = range(cols) >= range(rows)
  const profile = horizontal ? cols : rows
  const across = horizontal ? colStd : rowStd

  // Divide el perfil en 5 tramos (las 5 casillas esperadas)
  const segLen = SIZE / SEGMENTS
  const segments = Array.from({ length: SEGMENTS }, (_, i) =>
    mean(profile.slice(Math.round(i * segLen), Math.round((i + 1) * segLen))),
  )
  const diffs = segments.slice(1).map((v, i) => v - segments[i])
  const absDiffs = diffs.map(Math.abs)
  const totalRange = range(segments)

  // Dirección: ¿se oscurece hacia la derecha/abajo o hacia la izquierda/arriba?
  const darkening = segments[SEGMENTS - 1] < segments[0]
  const monotonic = diffs.every((d) => (darkening ? d <= 4 : d >= -4))

  // Saltos bruscos: un paso mucho mayor que el paso promedio
  const avgStep = mean(absDiffs)
  const jumps = absDiffs
    .map((d, i) => ({ d, i }))
    .filter(({ d }) => avgStep > 4 && d > avgStep * 1.6)
    .map(({ i }) => i + 1) // número de la casilla después de la cual hay salto

  const unevenness = mean(across)

  const contrast = totalRange > 110 ? 'amplio' : totalRange > 55 ? 'medio' : 'reducido'
  const uniformity = unevenness < 12 ? 'alta' : unevenness < 24 ? 'media' : 'baja'

  return {
    orientation: horizontal ? 'horizontal' : 'vertical',
    segments: segments.map((v) => Math.round(v)), // 0 = negro, 255 = blanco
    darkening,
    monotonic,
    jumps,
    contrast,
    uniformity,
    lightest: Math.round((1 - Math.max(...segments) / 255) * 100), // % de oscuridad
    darkest: Math.round((1 - Math.min(...segments) / 255) * 100),
  }
}

// Genera una "foto" de ejemplo de una escala de grafito de cinco casillas,
// con trazos visibles y un salto brusco entre la casilla 3 y la 4,
// para probar el flujo sin cámara.
export function createSampleImage() {
  const w = 900, h = 560
  const c = document.createElement('canvas')
  c.width = w; c.height = h
  const ctx = c.getContext('2d')
  // mesa y papel
  ctx.fillStyle = '#f7f4ee'; ctx.fillRect(0, 0, w, h)
  // grano del papel
  for (let i = 0; i < 14000; i++) {
    ctx.fillStyle = `rgba(80,70,60,${Math.random() * 0.05})`
    ctx.fillRect(Math.random() * w, Math.random() * h, 1.4, 1.4)
  }
  const x0 = 110, y0 = 190, bw = 136, bh = 180
  const tones = [0.1, 0.24, 0.36, 0.7, 0.84] // salto entre 3 y 4
  tones.forEach((t, i) => {
    const bx = x0 + i * bw
    const strokes = 260 + t * 900
    for (let s = 0; s < strokes; s++) {
      const sx = bx + Math.random() * bw
      const sy = y0 + Math.random() * bh
      const len = 10 + Math.random() * 16
      ctx.strokeStyle = `rgba(48,48,52,${t * (0.35 + Math.random() * 0.35)})`
      ctx.lineWidth = 0.8 + t * 1.6
      ctx.beginPath()
      ctx.moveTo(sx, sy)
      ctx.lineTo(sx + len * 0.55, sy - len * 0.8)
      ctx.stroke()
    }
  })
  // contorno de la franja y divisiones
  ctx.strokeStyle = 'rgba(60,60,64,0.55)'
  ctx.lineWidth = 1.2
  ctx.strokeRect(x0, y0, bw * 5, bh)
  for (let i = 1; i < 5; i++) {
    ctx.beginPath(); ctx.moveTo(x0 + i * bw, y0); ctx.lineTo(x0 + i * bw, y0 + bh); ctx.stroke()
  }
  ctx.fillStyle = 'rgba(70,70,74,0.7)'
  ctx.font = '22px Georgia'
  ;['HB', 'HB', '2B', '2B', '4B'].forEach((l, i) => ctx.fillText(l, x0 + i * bw + bw / 2 - 14, y0 + bh + 40))
  return c.toDataURL('image/jpeg', 0.9)
}
