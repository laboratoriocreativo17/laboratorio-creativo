import { useState } from 'react'
import { Icon, SparkIcon } from '../components/Illustrations.jsx'

function Badge({ kind }) {
  return kind === 'measured' ? (
    <span className="source source-measured" title="Calculado en tu navegador a partir de los píxeles de la foto">
      <Icon name="eye" size={12} /> Basado en mediciones de tu foto
    </span>
  ) : (
    <span className="source source-sim" title="Texto de ejemplo, no generado por un modelo de IA">
      <Icon name="info" size={12} /> Respuesta de ejemplo
    </span>
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

function ToneScale({ segments, jumps }) {
  // Cada casilla = tono promedio medido en esa quinta parte de la foto.
  return (
    <div className="tone-scale">
      <div className="tone-row">
        {segments.map((v, i) => (
          <div key={i} className="tone-cell">
            <span className="tone-swatch" style={{ background: `rgb(${v},${v},${v})` }} />
            <span className="tone-val">{Math.round((1 - v / 255) * 100)}%</span>
            {jumps.includes(i + 1) && <span className="tone-jump" title="Cambio brusco hacia la siguiente casilla">!</span>}
          </div>
        ))}
      </div>
    </div>
  )
}

export default function Feedback({ image, question, metrics, feedback, onPracticeAgain, onFinish }) {
  const [showInfo, setShowInfo] = useState(false)
  const reasonText = {
    question: 'según las palabras de tu pregunta',
    metrics: 'según las mediciones de tu foto',
    default: 'con recomendaciones generales para principiantes',
  }[feedback.topicReason]

  return (
    <section className="screen feedback">
      <p className="eyebrow">Paso 5 · Retroalimentación</p>
      <h2 className="title">Tu acompañante revisó tu práctica</h2>

      <div className="demo-banner" role="note">
        <Icon name="info" />
        <div>
          <strong>Modo demostración.</strong> Este prototipo no está conectado a un modelo de IA real y no interpretó
          tu fotografía con visión artificial. Las secciones marcadas como <em>“Respuesta de ejemplo”</em> son textos
          simulados, elegidos {reasonText}. Solo las marcadas como <em>“Basado en mediciones”</em> se calcularon a partir de tu foto.
          <button className="btn-link" onClick={() => setShowInfo((v) => !v)} aria-expanded={showInfo}>
            {showInfo ? 'Ocultar detalles' : '¿Qué se midió?'}
          </button>
          {showInfo && (
            <p className="demo-detail">
              Se dividió la imagen en cinco tramos a lo largo de la escala y se promedió el brillo de cada uno, directamente en tu navegador.
              Es una medición aproximada: la luz, las sombras y el encuadre de la foto pueden alterarla.
            </p>
          )}
        </div>
      </div>

      <div className="feedback-layout">
        <aside className="fb-aside">
          <div className="card photo-card">
            <img src={image} alt="Tu escala de tonos con grafito" />
            {metrics && (
              <div className="measure">
                <h4 className="small-title">Tus 5 tonos medidos</h4>
                <ToneScale segments={metrics.segments} jumps={metrics.jumps} />
                <dl>
                  <div><dt>Rango tonal</dt><dd>{metrics.contrast}</dd></div>
                  <div><dt>Uniformidad</dt><dd>{metrics.uniformity}</dd></div>
                  <div><dt>Saltos bruscos</dt><dd>{metrics.jumps.length}</dd></div>
                  <div><dt>Orden claro → oscuro</dt><dd>{metrics.monotonic ? 'sí' : 'con altibajos'}</dd></div>
                </dl>
                <p className="hint">Porcentaje = qué tan oscuro es cada tramo de la foto (0 % blanco, 100 % negro).</p>
              </div>
            )}
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
                <strong>Acompañante creativo</strong>
                <span className="hint">IA simulada · Dibujo con grafito, nivel principiante</span>
              </div>
            </div>
            <p className="fb-opener">{feedback.opener}</p>

            <Section icon="eye" title="Observación" kind={metrics ? 'measured' : 'sim'} delay={100} tone="lav">
              <ul>{feedback.observations.map((o) => <li key={o}>{o}</li>)}</ul>
            </Section>

            <Section icon="alert" title="Posibles dificultades" kind="sim" delay={350} tone="rose">
              <ul>{feedback.difficulties.map((o) => <li key={o}>{o}</li>)}</ul>
            </Section>

            <Section icon="bulb" title="Recomendaciones" kind="sim" delay={600} tone="green">
              <ol className="reco-list">{feedback.recommendations.map((o) => <li key={o}>{o}</li>)}</ol>
            </Section>

            <Section icon="flag" title="Próximo ejercicio" kind="sim" delay={850} tone="violet">
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
