import { useState } from 'react'
import { Icon, MaterialIcon } from '../components/Illustrations.jsx'

export default function Materials({ technique, onBack, onReady }) {
  const [checked, setChecked] = useState({})
  const count = Object.values(checked).filter(Boolean).length
  const toggle = (id) => setChecked((c) => ({ ...c, [id]: !c[id] }))

  return (
    <section className="screen">
      <button className="btn-link" onClick={onBack}><Icon name="arrow-left" size={16} /> Cambiar de técnica</button>
      <p className="eyebrow">Paso 2 · {technique.name}</p>
      <h2 className="title">Reúne lo que vas a necesitar</h2>
      <p className="lead narrow">Toca cada tarjeta cuando tengas el material a mano. No necesitas materiales profesionales para empezar.</p>

      <div className="materials-grid">
        {technique.materials.map((m) => (
          <button
            key={m.name}
            className={`card material-card ${checked[m.name] ? 'is-checked' : ''}`}
            onClick={() => toggle(m.name)}
            aria-pressed={!!checked[m.name]}
          >
            <span className="material-check"><Icon name="check" size={14} /></span>
            <MaterialIcon icon={m.icon} color={technique.color} />
            <strong>{m.name}</strong>
            <span>{m.detail}</span>
          </button>
        ))}
      </div>

      <div className="card workspace">
        <div>
          <h3 className="small-title">Prepara tu espacio</h3>
          <ul className="tips-list">
            {technique.workspaceTips.map((t) => <li key={t}>{t}</li>)}
          </ul>
        </div>
      </div>

      <div className="actions-bar">
        <span className="hint">{count} de {technique.materials.length} materiales listos</span>
        <button className="btn btn-primary" onClick={onReady}>
          Estoy listo, comenzar <Icon name="arrow-right" />
        </button>
      </div>
    </section>
  )
}
