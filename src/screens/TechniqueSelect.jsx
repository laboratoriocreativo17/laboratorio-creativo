import { technique, upcomingTechniques } from '../data/content.js'
import { Icon, MaterialIcon, TechniqueArt } from '../components/Illustrations.jsx'

export default function TechniqueSelect({ onBack, onChoose }) {
  return (
    <section className="screen">
      <button className="btn-link" onClick={onBack}><Icon name="arrow-left" size={16} /> Volver</button>
      <p className="eyebrow">Paso 1 · Elige una técnica</p>
      <h2 className="title">¿Con qué quieres experimentar hoy?</h2>
      <p className="lead narrow">Te recomendamos empezar con grafito: es accesible, necesitas muy pocos materiales y es la base para aprender luces, sombras y volumen.</p>

      <div className="technique-layout">
        <article className="card technique-card">
          <div className="technique-media">
            <TechniqueArt />
            <span className="tag tag-green">Disponible</span>
          </div>
          <div className="technique-body">
            <div className="technique-head">
              <h3>{technique.name}</h3>
              <div className="meta">
                <span className="chip"><Icon name="level" size={14} /> {technique.level}</span>
                <span className="chip"><Icon name="clock" size={14} /> {technique.duration}</span>
              </div>
            </div>
            <p>{technique.description}</p>
            <h4 className="small-title">Materiales necesarios</h4>
            <ul className="mini-materials">
              {technique.materials.map((m) => (
                <li key={m.label}><MaterialIcon type={m.icon} /> {m.label}</li>
              ))}
            </ul>
            <button className="btn btn-primary" onClick={onChoose}>
              Aprender esta técnica <Icon name="arrow-right" />
            </button>
          </div>
        </article>

        <aside className="upcoming">
          <h4 className="small-title">Próximas técnicas</h4>
          <ul>
            {upcomingTechniques.map((t) => (
              <li key={t.name} className="upcoming-item" aria-disabled="true">
                <span>{t.name}</span><span className="tag">{t.note}</span>
              </li>
            ))}
          </ul>
        </aside>
      </div>
    </section>
  )
}
