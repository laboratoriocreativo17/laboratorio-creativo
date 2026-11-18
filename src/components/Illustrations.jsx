import { useId } from 'react'

/* Ilustraciones SVG hechas a mano (sin imágenes externas).
   Los grises se reservan para el grafito; la interfaz conserva la paleta
   lavanda / violeta de Laboratorio Creativo. */

export const GRAPHITE_TONES = ['#d6d4d9', '#b3b0b8', '#8c8992', '#5a5760', '#2c2a30']

const uid = () => useId().replace(/:/g, '')

/* Textura de grafito: grano del papel + trazos */
function GraphiteDefs({ id }) {
  return (
    <>
      <filter id={`grain-${id}`} x="0" y="0" width="100%" height="100%">
        <feTurbulence type="fractalNoise" baseFrequency="1.1" numOctaves="2" seed="4" result="n" />
        <feColorMatrix in="n" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 -1.1 1.05" result="a" />
        <feComposite in="SourceGraphic" in2="a" operator="in" />
      </filter>
      <pattern id={`hatch-${id}`} width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(-35)">
        <line x1="0" y1="0" x2="0" y2="6" stroke="#ffffff" strokeOpacity="0.22" strokeWidth="1.4" />
      </pattern>
      <filter id={`paper-${id}`} x="0" y="0" width="100%" height="100%">
        <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" seed="2" result="n" />
        <feColorMatrix in="n" type="matrix" values="0 0 0 0 0.45  0 0 0 0 0.42  0 0 0 0 0.38  0 0 0 0.06 0" result="t" />
        <feComposite in="t" in2="SourceGraphic" operator="in" result="tex" />
        <feMerge><feMergeNode in="SourceGraphic" /><feMergeNode in="tex" /></feMerge>
      </filter>
    </>
  )
}

/* Lápiz con la punta en (0,0), apuntando hacia abajo a la izquierda */
function Pencil({ body = '#b59cf0', label, className, transform }) {
  return (
    <g className={className} transform={transform}>
      <g transform="rotate(35)">
        <path d="M0 0 L-5 -14 L5 -14 Z" fill="#f1dcc0" />
        <path d="M0 0 L-1.8 -5 L1.8 -5 Z" fill="#2c2a30" />
        <rect x="-5" y="-96" width="10" height="82" fill={body} />
        <rect x="-5" y="-96" width="3.3" height="82" fill="#000" opacity="0.08" />
        <rect x="-5.5" y="-106" width="11" height="10" rx="1" fill="#c9c2d4" />
        <rect x="-5" y="-116" width="10" height="10" rx="3" fill="#e9a9c4" />
        {label && (
          <text x="0" y="-50" fill="#fff" fontSize="7" fontWeight="700" textAnchor="middle" transform="rotate(-90 0 -50)" fontFamily="sans-serif">{label}</text>
        )}
      </g>
    </g>
  )
}

export function HeroArt() {
  const id = uid()
  return (
    <svg className="hero-art" viewBox="0 0 420 420" role="img" aria-label="Hoja con una esfera sombreada y una escala de grafito, junto a un lápiz">
      <defs>
        <GraphiteDefs id={id} />
        <radialGradient id={`sph-${id}`} cx="36%" cy="32%" r="70%">
          <stop offset="0%" stopColor="#f2f0f3" />
          <stop offset="35%" stopColor="#b9b6be" />
          <stop offset="75%" stopColor="#57545c" />
          <stop offset="100%" stopColor="#3b3940" />
        </radialGradient>
        <radialGradient id={`shadow-${id}`} cx="50%" cy="50%">
          <stop offset="0%" stopColor="#2c2a30" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#2c2a30" stopOpacity="0" />
        </radialGradient>
      </defs>
      {/* manchas de color de la marca */}
      <circle className="blob blob-1" cx="140" cy="130" r="110" fill="#e2d8f7" />
      <circle className="blob blob-2" cx="320" cy="300" r="80" fill="#e3f2e8" />
      <circle className="blob blob-3" cx="330" cy="90" r="46" fill="#fbe1ec" />
      {/* hoja */}
      <g className="sheet" transform="rotate(-5 210 210)">
        <rect x="80" y="70" width="260" height="300" rx="6" fill="#fffdf9" filter={`url(#paper-${id})`} />
        <rect x="80" y="70" width="260" height="300" rx="6" fill="none" stroke="#e5dcf2" />
        {/* esfera */}
        <ellipse cx="225" cy="240" rx="70" ry="14" fill={`url(#shadow-${id})`} />
        <g filter={`url(#grain-${id})`}>
          <circle cx="210" cy="175" r="68" fill={`url(#sph-${id})`} />
          <circle cx="210" cy="175" r="68" fill={`url(#hatch-${id})`} />
        </g>
        {/* escala tonal */}
        <g transform="translate(110 285)" filter={`url(#grain-${id})`}>
          {GRAPHITE_TONES.map((t, i) => (
            <rect key={t} x={i * 40} y="0" width="40" height="40" fill={t} />
          ))}
          <rect x="0" y="0" width="200" height="40" fill={`url(#hatch-${id})`} />
        </g>
        <rect x="110" y="285" width="200" height="40" fill="none" stroke="#5a5760" strokeWidth="0.8" />
      </g>
      <g className="brush"><Pencil transform="translate(312 250)" body="#6b4fc0" label="2B" /></g>
    </svg>
  )
}

export function TechniqueArt() {
  const id = uid()
  return (
    <svg viewBox="0 0 320 220" className="technique-art" aria-hidden="true">
      <defs>
        <GraphiteDefs id={id} />
        <radialGradient id={`ts-${id}`} cx="36%" cy="32%" r="72%">
          <stop offset="0%" stopColor="#f2f0f3" />
          <stop offset="40%" stopColor="#aeabb3" />
          <stop offset="100%" stopColor="#3b3940" />
        </radialGradient>
      </defs>
      <rect width="320" height="220" fill="#f6f1fb" />
      <rect x="28" y="22" width="264" height="176" rx="4" fill="#fffdf9" filter={`url(#paper-${id})`} />
      <g filter={`url(#grain-${id})`}>
        <circle cx="160" cy="88" r="44" fill={`url(#ts-${id})`} />
        {GRAPHITE_TONES.map((t, i) => <rect key={t} x={60 + i * 40} y="148" width="40" height="28" fill={t} />)}
        <rect x="60" y="148" width="200" height="28" fill={`url(#hatch-${id})`} />
      </g>
      <ellipse cx="172" cy="134" rx="40" ry="6" fill="#2c2a30" opacity="0.18" />
    </svg>
  )
}

export function MaterialIcon({ type }) {
  const common = { viewBox: '0 0 64 64', className: 'material-icon', 'aria-hidden': true }
  const pencilIcon = (label, body, lead) => (
    <svg {...common}>
      <g transform="rotate(40 32 32)">
        <rect x="27" y="6" width="10" height="38" fill={body} />
        <rect x="27" y="6" width="3.3" height="38" fill="#000" opacity="0.08" />
        <path d="M27 44 L32 58 L37 44 Z" fill="#f1dcc0" />
        <path d="M30.2 53 L32 58 L33.8 53 Z" fill={lead} />
        <rect x="26.5" y="2" width="11" height="5" rx="1" fill="#c9c2d4" />
      </g>
      <text x="8" y="58" fontSize="13" fontWeight="700" fill="#2e2a36" fontFamily="sans-serif">{label}</text>
    </svg>
  )
  switch (type) {
    case 'pencil-hb': return pencilIcon('HB', '#cbbcf0', '#8c8992')
    case 'pencil-2b': return pencilIcon('2B', '#9b7fe0', '#5a5760')
    case 'pencil-4b': return pencilIcon('4B', '#6b4fc0', '#2c2a30')
    case 'pencils':
      return (
        <svg {...common}>
          {[['#cbbcf0', 14], ['#9b7fe0', 28], ['#6b4fc0', 42]].map(([c, x]) => (
            <g key={x}>
              <rect x={x} y="10" width="8" height="34" fill={c} />
              <path d={`M${x} 44 L${x + 4} 56 L${x + 8} 44 Z`} fill="#f1dcc0" />
              <path d={`M${x + 2.6} 52 L${x + 4} 56 L${x + 5.4} 52 Z`} fill="#2c2a30" />
            </g>
          ))}
        </svg>
      )
    case 'paper':
      return (
        <svg {...common}>
          <rect x="12" y="8" width="40" height="48" rx="3" fill="#fffdf8" stroke="#3a3346" strokeWidth="2.5" />
          {GRAPHITE_TONES.map((t, i) => <rect key={t} x={17 + i * 6} y="40" width="6" height="8" fill={t} />)}
          <path d="M18 18h28M18 25h18" stroke="#cbbcf0" strokeWidth="3" strokeLinecap="round" />
        </svg>
      )
    case 'eraser':
      return (
        <svg {...common}>
          <g transform="rotate(-25 32 32)">
            <rect x="10" y="22" width="44" height="20" rx="4" fill="#fbe1ec" stroke="#3a3346" strokeWidth="2.5" />
            <rect x="10" y="22" width="18" height="20" rx="4" fill="#b59cf0" stroke="#3a3346" strokeWidth="2.5" />
          </g>
          <path d="M14 54c6-2 12 1 18-1" stroke="#b3b0b8" strokeWidth="2" fill="none" strokeLinecap="round" />
        </svg>
      )
    case 'sharpener':
      return (
        <svg {...common}>
          <rect x="14" y="20" width="36" height="28" rx="5" fill="#e3f2e8" stroke="#3a3346" strokeWidth="2.5" />
          <circle cx="28" cy="34" r="7" fill="#fffdf8" stroke="#3a3346" strokeWidth="2" />
          <rect x="38" y="24" width="8" height="20" rx="1.5" fill="#c9c2d4" />
          <path d="M20 14c3 2 5 1 8-1" stroke="#b3b0b8" strokeWidth="2" fill="none" strokeLinecap="round" />
        </svg>
      )
    default:
      return null
  }
}

/* Referencia visual animada de cada paso del tutorial */
export function StepVisual({ visual }) {
  const id = uid()
  const labels = ['HB', 'HB', '2B', '2B', '4B']
  const bx = 30, bw = 52, by = 70, bh = 76
  return (
    <div className={`step-visual step-visual--${visual}`}>
      <svg viewBox="0 0 320 220" aria-hidden="true">
        <defs><GraphiteDefs id={id} /></defs>
        <rect x="14" y="20" width="292" height="184" rx="6" fill="#fffdf9" filter={`url(#paper-${id})`} />
        <rect x="14" y="20" width="292" height="184" rx="6" fill="none" stroke="#e5dcf2" strokeWidth="1.5" />
        {/* casillas con grafito */}
        <g filter={`url(#grain-${id})`}>
          {GRAPHITE_TONES.map((t, i) => (
            <g key={t} className={`sv-box sv-box-${i + 1}`} style={{ transformOrigin: `${bx + i * bw}px ${by}px` }}>
              <rect x={bx + i * bw} y={by} width={bw} height={bh} fill={t} />
              <rect x={bx + i * bw} y={by} width={bw} height={bh} fill={`url(#hatch-${id})`} />
            </g>
          ))}
        </g>
        {/* contorno de la franja */}
        <g className="sv-outline" fill="none" stroke="#5a5760" strokeWidth="1.1">
          <rect x={bx} y={by} width={bw * 5} height={bh} pathLength="100" />
          {[1, 2, 3, 4].map((i) => (
            <line key={i} x1={bx + i * bw} y1={by} x2={bx + i * bw} y2={by + bh} pathLength="100" />
          ))}
        </g>
        {/* etiquetas de lápiz */}
        <g className="sv-labels" fontFamily="sans-serif" fontSize="10" fontWeight="600" fill="#8b8697" textAnchor="middle">
          {labels.map((l, i) => <text key={i} x={bx + i * bw + bw / 2} y={by + bh + 18}>{l}</text>)}
          {[1, 2, 3, 4, 5].map((n, i) => <text key={`n${n}`} x={bx + i * bw + bw / 2} y={by - 8} fill="#b59cf0">{n}</text>)}
        </g>
        {/* indicadores de transición (paso 5) */}
        <g className="sv-arrows" stroke="#2f7a4b" strokeWidth="2" fill="none" strokeLinecap="round">
          {[1, 2, 3, 4].map((i) => (
            <path key={i} d={`M${bx + i * bw - 10} ${by + bh + 32} q10 -8 20 0`} />
          ))}
        </g>
        <Pencil className="sv-pencil" body="#6b4fc0" />
      </svg>
    </div>
  )
}

export function SparkIcon({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 2l2.2 6.3L20.5 10l-6.3 2.2L12 18.5l-2.2-6.3L3.5 10l6.3-1.7z" fill="currentColor" />
      <path d="M19 15l.9 2.4 2.4.9-2.4.9L19 21.6l-.9-2.4-2.4-.9 2.4-.9z" fill="currentColor" opacity="0.6" />
    </svg>
  )
}

export function Icon({ name, size = 18 }) {
  const p = { width: size, height: size, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round', 'aria-hidden': true }
  switch (name) {
    case 'arrow-right': return <svg {...p}><path d="M5 12h14M13 6l6 6-6 6" /></svg>
    case 'arrow-left': return <svg {...p}><path d="M19 12H5M11 6l-6 6 6 6" /></svg>
    case 'clock': return <svg {...p}><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></svg>
    case 'level': return <svg {...p}><path d="M4 20v-4M10 20v-8M16 20V8M22 20V4" /></svg>
    case 'upload': return <svg {...p}><path d="M12 16V4M6 10l6-6 6 6M4 20h16" /></svg>
    case 'check': return <svg {...p}><path d="M5 12.5l4.5 4.5L19 7.5" /></svg>
    case 'eye': return <svg {...p}><path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12z" /><circle cx="12" cy="12" r="3" /></svg>
    case 'alert': return <svg {...p}><path d="M12 9v4M12 17h.01" /><path d="M10.3 3.9L1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z" /></svg>
    case 'bulb': return <svg {...p}><path d="M9 18h6M10 22h4" /><path d="M12 2a7 7 0 0 0-4 12.7V16h8v-1.3A7 7 0 0 0 12 2z" /></svg>
    case 'flag': return <svg {...p}><path d="M4 22V4M4 4h12l-2 4 2 4H4" /></svg>
    case 'refresh': return <svg {...p}><path d="M3 12a9 9 0 0 1 15.5-6.2L21 8M21 3v5h-5M21 12a9 9 0 0 1-15.5 6.2L3 16M3 21v-5h5" /></svg>
    case 'info': return <svg {...p}><circle cx="12" cy="12" r="9" /><path d="M12 11v5M12 8h.01" /></svg>
    case 'image': return <svg {...p}><rect x="3" y="3" width="18" height="18" rx="3" /><circle cx="9" cy="9" r="2" /><path d="M21 15l-5-5L5 21" /></svg>
    case 'close': return <svg {...p}><path d="M6 6l12 12M18 6L6 18" /></svg>
    case 'target': return <svg {...p}><circle cx="12" cy="12" r="9" /><circle cx="12" cy="12" r="4" /></svg>
    default: return null
  }
}
