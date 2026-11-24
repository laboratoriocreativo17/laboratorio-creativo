import { useState } from 'react'
import { Icon, SparkIcon } from '../components/Illustrations.jsx'

function Badge({ kind }) {
  return kind === 'photo' ? (
    <span className="source source-measured"><Icon name="eye" size={12} /> Visto en tu foto</span>
  ) : (
    <span className="source source-sim"><Icon name="info" size={12} /> Consejo de ejemplo</span>
  )
}

function Section({ icon, title, kind, delay, children, tone }) {
  return (
    <section className={`fb-section fb-${tone}`} style={{ animationDelay: `${delay}ms` }}>
      <header>
        <span className="fb-icon"><Icon name={icon} /></span>
        <h3>{title}</h3>
        <Badge kind={kind} />
      </header>
      {children}
    </section>
  )
}

// Panel sencillo: tus 5 cuadros y tres frases cortas. Sin porcentajes.
function PhotoReading({ metrics, checks }) {
  return (
    <div className="reading">
      <h4 className="reading-title">Así vemos tus cuadros</h4>
      <div className="swatches">
        {metrics.segments.map((s, i) => (
          <div key={i} className="swatch-cell">
            <span className="swatch-box" style={{ background: s.color }} />
            <span className="swatch-n">{i + 1}</span>
          </div>
        ))}
      </div>
      <div className="swatch-arrow" aria-hidden="true">
        <span>más suave</span><i /><span>más intenso</span>
      </div>
      <ul className="checks">
        {checks.map((c) => (
          <li key={c.text} className={c.ok ? 'is-ok' : 'is-tip'}>
            <span className="check-ico"><Icon name={c.ok ? 'check' : 'bulb'} size={15} /></span>
            {c.text}
          </li>
        ))}
      </ul>
      <p className="reading-note">Las sombras o poca luz en la foto pueden cambiar un poco esta lectura.</p>
    </div>
  )
}

export default function Feedback({ technique, image, question, metrics, feedback, onPracticeAgain, onFinish }) {
  const [showInfo, setShowInfo] = useState(false)

  return (
    <section className="screen feedback">
      <p className="eyebrow">Paso 5 · Tus consejos</p>
      <h2 className="title">Tu acompañante revisó tu práctica</h2>

      <div className="demo-banner" role="note">
        <Icon name="info" />
        <div>
          <strong>Esta es una versión de prueba.</strong> Los consejos son ejemplos que preparamos para mostrar cómo te
          acompañaría la IA. Lo que dice <em>“Visto en tu foto”</em> sí sale de tu imagen.
          <button className="btn-link" onClick={() => setShowInfo((v) => !v)} aria-expanded={showInfo}>
            {showInfo ? 'Ocultar' : '¿Cómo miramos tu foto?'}
          </button>
          {showInfo && (
            <p className="demo-detail">
              Buscamos la franja en tu foto, la dividimos en cinco cuadros y comparamos cada uno con el blanco del papel.
              Todo pasa en tu dispositivo: tu foto no se envía a ningún lado.
            </p>
          )}
        </div>
      </div>

      <div className="feedback-layout">
        <aside className="fb-aside">
          <div className="card photo-card">
            <img src={image} alt={`Tu práctica de ${technique.name.toLowerCase()}`} />
            {metrics && <PhotoReading metrics={metrics} checks={feedback.checks} />}
          </div>
        </aside>

        <div className="conversation">
          {question.trim() && (
            <div className="bubble bubble-user">
              <span className="bubble-label">Tu pregunta</span>
              <p>{question}</p>
            </div>
          )}

          <div className="bubble bubble-ai">
            <div className="ai-head">
              <span className="ai-avatar"><SparkIcon size={18} /></span>
              <div>
                <strong>Tu acompañante creativo</strong>
                <span className="hint">{technique.name} · versión de prueba</span>
              </div>
            </div>
            <p className="fb-opener">{feedback.opener}</p>

            <Section icon="eye" title="Lo que vemos" kind={metrics ? 'photo' : 'sim'} delay={100} tone="lav">
              {feedback.observations.map((o) => <p key={o}>{o}</p>)}
            </Section>

            <Section icon="alert" title={feedback.allGood && !feedback.fromQuestion ? 'Detalles para tener en cuenta' : 'Lo que puede estar pasando'} kind="sim" delay={350} tone="rose">
              <ul>{feedback.difficulties.map((o) => <li key={o}>{o}</li>)}</ul>
            </Section>

            <Section icon="bulb" title="Prueba esto la próxima vez" kind="sim" delay={600} tone="green">
              <ol className="reco-list">{feedback.recommendations.map((o) => <li key={o}>{o}</li>)}</ol>
            </Section>

            <Section icon="flag" title="Tu próximo reto" kind="sim" delay={850} tone="violet">
              <div className="next-ex">
                <div>
                  <strong>{feedback.nextExercise.title}</strong>
                  <p>{feedback.nextExercise.description}</p>
                </div>
                <span className="chip"><Icon name="clock" size={14} /> {feedback.nextExercise.duration}</span>
              </div>
            </Section>

            <p className="fb-closing">{feedback.closing}</p>
          </div>

          <div className="actions-bar">
            <button className="btn btn-secondary" onClick={onPracticeAgain}><Icon name="refresh" /> Volver a practicar</button>
            <button className="btn btn-primary" onClick={onFinish}>Finalizar mi práctica <Icon name="check" /></button>
          </div>
        </div>
      </div>
    </section>
  )
}
