import { useState } from 'react'
import { materials, workspaceTips } from '../data/content.js'
import { Icon, MaterialIcon } from '../components/Illustrations.jsx'

export default function Materials({ onBack, onReady }) {
  const [checked, setChecked] = useState({})
  const count = Object.values(checked).filter(Boolean).length
  const toggle = (id) => setChecked((c) => ({ ...c, [id]: !c[id] }))

  return (
    <section className="screen">
      <button className="btn-link" onClick={onBack}><Icon name="arrow-left" size={16} /> Volver</button>
      <p className="eyebrow">Paso 2 · Prepara tus materiales</p>
      <h2 className="title">Reúne lo que vas a necesitar</h2>
      <p className="lead narrow">Toca cada tarjeta cuando tengas el material a mano. Si no tienes los tres lápices, puedes empezar con un HB y un 2B.</p>

      <div className="materials-grid">
        {materials.map((m) => (
          <button
            key={m.id}
            className={`card material-card ${checked[m.id] ? 'is-checked' : ''}`}
            onClick={() => toggle(m.id)}
            aria-pressed={!!checked[m.id]}
          >
            <span className="material-check"><Icon name="check" size={14} /></span>
            <MaterialIcon type={m.icon} />
            <strong>{m.name}</strong>
            <span>{m.detail}</span>
          </button>
        ))}
      </div>

      <div className="card workspace">
        <div>
          <h3 className="small-title">Prepara tu espacio y organiza tus materiales</h3>
          <ul className="tips-list">
            {workspaceTips.map((t) => <li key={t}>{t}</li>)}
          </ul>
        </div>
      </div>

      <div className="actions-bar">
        <span className="hint">{count} de {materials.length} materiales listos</span>
        <button className="btn btn-primary" onClick={onReady}>
          Estoy listo, comenzar <Icon name="arrow-right" />
        </button>
      </div>
    </section>
  )
}
