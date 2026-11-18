import { Icon } from './Illustrations.jsx'

const PHASES = [
  { label: 'Técnica', screens: ['technique'] },
  { label: 'Materiales', screens: ['materials'] },
  { label: 'Práctica', screens: ['tutorial'] },
  { label: 'Compartir', screens: ['share'] },
  { label: 'Retroalimentación', screens: ['analyzing', 'feedback'] },
]

export default function Header({ screen, onHome }) {
  const current = screen === 'done' ? PHASES.length : PHASES.findIndex((p) => p.screens.includes(screen))
  return (
    <header className="header">
      <button className="brand" onClick={onHome} aria-label="Ir al inicio de Laboratorio Creativo">
        <span className="brand-mark" aria-hidden="true">
          <span /><span /><span />
        </span>
        <span className="brand-name">Laboratorio <em>Creativo</em></span>
      </button>
      {screen !== 'welcome' && (
        <nav className="journey" aria-label="Recorrido de la práctica">
          <ol>
            {PHASES.map((p, i) => {
              const state = i < current ? 'done' : i === current ? 'current' : 'todo'
              return (
                <li key={p.label} className={`journey-item is-${state}`} aria-current={state === 'current' ? 'step' : undefined}>
                  <span className="journey-dot">{state === 'done' ? <Icon name="check" size={12} /> : i + 1}</span>
                  <span className="journey-label">{p.label}</span>
                </li>
              )
            })}
          </ol>
        </nav>
      )}
    </header>
  )
}
