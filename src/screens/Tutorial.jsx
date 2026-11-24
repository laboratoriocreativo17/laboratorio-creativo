import { Icon, StepVisual } from '../components/Illustrations.jsx'

export default function Tutorial({ technique, step, setStep, attempts, onBack, onFinish }) {
  const { tutorial } = technique
  const total = tutorial.steps.length
  const s = tutorial.steps[step]
  const progress = ((step + 1) / total) * 100
  const isLast = step === total - 1

  return (
    <section className="screen">
      <p className="eyebrow">Paso 3 · {technique.name} {attempts > 1 && <span className="tag tag-green">Intento {attempts}</span>}</p>
      <h2 className="title">{tutorial.title}</h2>
      <p className="lead narrow goal"><Icon name="target" size={18} /> {tutorial.goal}</p>

      <div className="progress" role="progressbar" aria-valuemin={1} aria-valuemax={total} aria-valuenow={step + 1} aria-label="Progreso del tutorial">
        <div className="progress-head">
          <span>Paso {step + 1} de {total}</span>
          <span>{Math.round(progress)} %</span>
        </div>
        <div className="progress-track"><div className="progress-fill" style={{ width: `${progress}%` }} /></div>
        <div className="progress-dots">
          {tutorial.steps.map((st, i) => (
            <button
              key={st.title}
              className={`pdot ${i < step ? 'is-done' : ''} ${i === step ? 'is-current' : ''}`}
              onClick={() => setStep(i)}
              aria-label={`Ir al paso ${i + 1}: ${st.title}`}
            />
          ))}
        </div>
      </div>

      <article className="card step-card" key={step}>
        <figure className="step-figure">
          <StepVisual technique={technique} step={step} />
          <figcaption><span>Resultado esperado</span>{s.expected}</figcaption>
        </figure>
        <div className="step-body">
          <span className="step-num">{String(step + 1).padStart(2, '0')}</span>
          <h3>{s.title}</h3>
          <p className="step-instruction">{s.instruction}</p>
          <div className="tip">
            <Icon name="bulb" />
            <p><strong>Recomendación:</strong> {s.tip}</p>
          </div>
        </div>
      </article>

      <div className="actions-bar">
        <button className="btn btn-ghost" onClick={() => (step === 0 ? onBack() : setStep(step - 1))}>
          <Icon name="arrow-left" /> {step === 0 ? 'Materiales' : 'Anterior'}
        </button>
        <button className="btn btn-primary" onClick={() => (isLast ? onFinish() : setStep(step + 1))}>
          {isLast ? 'Terminé, compartir mi avance' : 'Siguiente paso'} <Icon name="arrow-right" />
        </button>
      </div>
    </section>
  )
}
