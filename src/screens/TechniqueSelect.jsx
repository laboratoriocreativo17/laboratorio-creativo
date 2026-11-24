import { techniques } from '../data/techniques.js'
import { Icon, MaterialIcon, TechniqueArt } from '../components/Illustrations.jsx'

export default function TechniqueSelect({ onBack, onChoose }) {
  return (
    <section className="screen">
      <button className="btn-link" onClick={onBack}><Icon name="arrow-left" size={16} /> Volver</button>
      <p className="eyebrow">Paso 1 · Elige una técnica</p>
      <h2 className="title">¿Con qué quieres experimentar hoy?</h2>
      <p className="lead narrow">Todas las técnicas empiezan con el mismo ejercicio: una escala de cinco cuadros que va de lo más suave a lo más intenso. Elige la que más te llame.</p>

      <div className="technique-grid">
        {techniques.map((t) => (
          <article key={t.id} className="card technique-tile" style={{ '--tc': t.color }}>
            <div className="technique-media">
              <TechniqueArt technique={t} />
            </div>
            <div className="technique-body">
              <h3>{t.name}</h3>
              <div className="meta">
                <span className="chip"><Icon name="level" size={14} /> {t.level}</span>
                <span className="chip"><Icon name="clock" size={14} /> {t.duration}</span>
              </div>
              <p>{t.description}</p>
              <div className="mini-materials" aria-label="Materiales">
                {t.materials.slice(0, 4).map((m) => (
                  <span key={m.name} title={m.name}><MaterialIcon icon={m.icon} color={t.color} size={16} /></span>
                ))}
                {t.materials.length > 4 && <span className="more">+{t.materials.length - 4}</span>}
              </div>
              <button className="btn btn-primary" onClick={() => onChoose(t.id)}>
                Aprender esta técnica <Icon name="arrow-right" />
              </button>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
