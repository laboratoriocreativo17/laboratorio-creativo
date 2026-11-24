import { useId } from 'react'
import { Circle, CreditCard, Frame, Layers, Square, Scissors, Ruler, PenLine, CupSoda, Coffee, Droplets, Paintbrush, Palette, FileText, StickyNote, Eraser, PenTool, Pencil as PencilIcon, Sparkles } from 'lucide-react'

const LucideIcons = { Circle, CreditCard, Frame, Layers, Square, Scissors, Ruler, PenLine, CupSoda, Coffee, Droplets, Paintbrush, Palette, FileText, StickyNote, Eraser, PenTool, Pencil: PencilIcon, Sparkles }

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

/* ------------------------------------------------------------------
   Escala de 5 cuadros con el estilo de cada técnica
   (se usa en la tarjeta de la técnica y en cada paso del tutorial)
------------------------------------------------------------------- */
const BX = 30, BW = 52, BY = 70, BH = 76
const STATES = ['prepare', 'light', 'mid', 'dark', 'unify']
const DOT_SPACING = [10, 7.4, 5.6, 4.3, 3.3]

function TechniqueDefs({ id, technique }) {
  return (
    <>
      <GraphiteDefs id={id} />
      <filter id={`wash-${id}`} x="-5%" y="-5%" width="110%" height="110%">
        <feTurbulence type="fractalNoise" baseFrequency="0.035" numOctaves="2" seed="7" result="n" />
        <feDisplacementMap in="SourceGraphic" in2="n" scale="5" xChannelSelector="R" yChannelSelector="G" />
      </filter>
      <filter id={`sponge-${id}`} x="0" y="0" width="100%" height="100%">
        <feTurbulence type="fractalNoise" baseFrequency="0.42" numOctaves="2" seed="11" result="n" />
        <feColorMatrix in="n" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 -3 2.1" result="a" />
        <feComposite in="SourceGraphic" in2="a" operator="in" />
      </filter>
      <filter id={`patchy-${id}`} x="0" y="0" width="100%" height="100%">
        <feTurbulence type="fractalNoise" baseFrequency="0.09" numOctaves="2" seed="3" result="n" />
        <feColorMatrix in="n" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 -4 2.6" result="a" />
        <feComposite in="SourceGraphic" in2="a" operator="in" />
      </filter>
      {DOT_SPACING.map((s, i) => (
        <pattern key={s} id={`dots-${i}-${id}`} width={s} height={s} patternUnits="userSpaceOnUse" patternTransform={`rotate(${i * 17})`}>
          <circle cx={s / 2} cy={s / 2} r="1.05" fill={technique.palette[i]} />
        </pattern>
      ))}
    </>
  )
}

function Box({ i, id, technique }) {
  const x = BX + i * BW
  const c = technique.palette[i]
  let body
  switch (technique.fill) {
    case 'hatch':
      body = (
        <g filter={`url(#grain-${id})`}>
          <rect x={x} y={BY} width={BW} height={BH} fill={c} />
          <rect x={x} y={BY} width={BW} height={BH} fill={`url(#hatch-${id})`} />
        </g>
      )
      break
    case 'wash':
      body = <rect x={x + 2} y={BY + 2} width={BW - 4} height={BH - 4} fill={c} stroke={c} strokeWidth="2" strokeOpacity="0.6" filter={`url(#wash-${id})`} />
      break
    case 'dots':
      body = <rect x={x} y={BY} width={BW} height={BH} fill={`url(#dots-${i}-${id})`} />
      break
    case 'sponge':
      body = (
        <g>
          <rect x={x + 3} y={BY + 3} width={BW - 6} height={BH - 6} fill={c} opacity="0.55" />
          <rect x={x + 3} y={BY + 3} width={BW - 6} height={BH - 6} fill={c} filter={`url(#sponge-${id})`} />
        </g>
      )
      break
    default: // print
      body = <rect x={x + 3} y={BY + 3} width={BW - 6} height={BH - 6} fill={c} filter={i < 2 ? `url(#patchy-${id})` : undefined} />
  }
  return (
    <g className={`sv-box sv-box-${i + 1}`} style={{ transformOrigin: `${x}px ${BY}px` }}>
      {body}
    </g>
  )
}

function Tool({ type, color }) {
  switch (type) {
    case 'brush':
      return (
        <g transform="rotate(35)">
          <path d="M0 0 Q-4.5 -8 -4 -18 L4 -18 Q4.5 -8 0 0 Z" fill={color} />
          <rect x="-4.5" y="-28" width="9" height="11" rx="1.5" fill="#c9c2d4" />
          <rect x="-3.5" y="-96" width="7" height="69" rx="3.5" fill="#3a3346" />
        </g>
      )
    case 'pen':
      return (
        <g transform="rotate(25)">
          <path d="M0 0 L-2 -8 L2 -8 Z" fill="#2c2a30" />
          <rect x="-4.5" y="-30" width="9" height="22" rx="2" fill="#8b8697" />
          <rect x="-5" y="-92" width="10" height="64" rx="4" fill="#2e2a36" />
          <rect x="-5.5" y="-80" width="2" height="30" rx="1" fill="#6b4fc0" />
        </g>
      )
    case 'sponge':
      return (
        <g className="sv-bob">
          <rect x="-16" y="-26" width="32" height="26" rx="7" fill="#F3D36B" stroke="#c9a33d" strokeWidth="1.2" />
          <circle cx="-7" cy="-17" r="2" fill="#e0b84a" />
          <circle cx="5" cy="-9" r="2.4" fill="#e0b84a" />
          <circle cx="7" cy="-20" r="1.6" fill="#e0b84a" />
          <rect x="-16" y="-5" width="32" height="5" rx="2" fill={color} opacity="0.8" />
        </g>
      )
    case 'squeegee':
      return (
        <g>
          <rect x="-4" y="-48" width="8" height="34" rx="3" fill="#3a3346" />
          <rect x="-24" y="-16" width="48" height="10" rx="3" fill="#c9c2d4" />
          <rect x="-24" y="-7" width="48" height="7" rx="2" fill={color} />
        </g>
      )
    default: // pencil
      return (
        <g transform="rotate(35)">
          <path d="M0 0 L-5 -14 L5 -14 Z" fill="#f1dcc0" />
          <path d="M0 0 L-1.8 -5 L1.8 -5 Z" fill="#2c2a30" />
          <rect x="-5" y="-96" width="10" height="82" fill="#6b4fc0" />
          <rect x="-5.5" y="-106" width="11" height="10" rx="1" fill="#c9c2d4" />
          <rect x="-5" y="-116" width="10" height="10" rx="3" fill="#e9a9c4" />
        </g>
      )
  }
}

export function ScaleArt({ technique, state = 'unify', showTool = false, showLabels = true, showArrows = true, viewBox = '0 0 320 220', className = '' }) {
  const id = useId().replace(/:/g, '')
  return (
    <svg viewBox={viewBox} className={className} aria-hidden="true">
      <defs><TechniqueDefs id={id} technique={technique} /></defs>
      <rect x="14" y="20" width="292" height="184" rx="6" fill="#fffdf9" filter={`url(#paper-${id})`} />
      <rect x="14" y="20" width="292" height="184" rx="6" fill="none" stroke="#e5dcf2" strokeWidth="1.5" />
      {[0, 1, 2, 3, 4].map((i) => <Box key={i} i={i} id={id} technique={technique} />)}
      <g className="sv-outline" fill="none" stroke="#5a5760" strokeWidth="1.1">
        <rect x={BX} y={BY} width={BW * 5} height={BH} pathLength="100" />
        {[1, 2, 3, 4].map((i) => <line key={i} x1={BX + i * BW} y1={BY} x2={BX + i * BW} y2={BY + BH} pathLength="100" />)}
      </g>
      {showLabels && (
        <g className="sv-labels" fontFamily="sans-serif" fontSize="9.5" fontWeight="600" fill="#8b8697" textAnchor="middle">
          {technique.boxLabels.map((l, i) => <text key={i} x={BX + i * BW + BW / 2} y={BY + BH + 18}>{l}</text>)}
          {[1, 2, 3, 4, 5].map((n, i) => <text key={`n${n}`} x={BX + i * BW + BW / 2} y={BY - 8} fill="#b59cf0">{n}</text>)}
        </g>
      )}
      {showArrows && <g className="sv-arrows" stroke="#2f7a4b" strokeWidth="2" fill="none" strokeLinecap="round">
        {[1, 2, 3, 4].map((i) => <path key={i} d={`M${BX + i * BW - 10} ${BY + BH + 32} q10 -8 20 0`} />)}
      </g>}
      {showTool && (
        <g className={`sv-tool tool-${technique.tool}`}>
          <Tool type={technique.tool} color={technique.palette[3]} />
        </g>
      )}
    </svg>
  )
}

/* Tarjeta de técnica: la escala completa, sin animación */
export function TechniqueArt({ technique }) {
  return (
    <div className="step-visual step-visual--unify technique-art-wrap">
      <ScaleArt technique={technique} state="unify" showLabels={false} showArrows={false} viewBox="14 44 292 128" className="technique-art" />
    </div>
  )
}

/* Referencia visual animada de cada paso del tutorial */
export function StepVisual({ technique, step }) {
  const visual = STATES[step] || 'unify'
  return (
    <div className={`step-visual step-visual--${visual}`}>
      <ScaleArt technique={technique} state={visual} showTool />
    </div>
  )
}

/* Icono de material (lucide) dentro de un círculo */
export function MaterialIcon({ icon, color = '#6B4FC0', size = 26 }) {
  const C = LucideIcons[icon] || LucideIcons.Sparkles
  return (
    <span className="material-icon" style={{ '--mc': color }}>
      <C size={size} strokeWidth={1.8} />
    </span>
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
