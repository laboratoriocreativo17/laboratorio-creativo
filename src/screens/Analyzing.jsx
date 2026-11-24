import { useEffect, useState } from 'react'
import { SparkIcon } from '../components/Illustrations.jsx'

const STAGES = [
  'Recibiendo tu foto…',
  'Mirando tus cinco cuadros…',
  'Preparando consejos para ti…',
]

export default function Analyzing({ image }) {
  const [stage, setStage] = useState(0)
  useEffect(() => {
    const t = setInterval(() => setStage((s) => Math.min(s + 1, STAGES.length - 1)), 1050)
    return () => clearInterval(t)
  }, [])
  return (
    <section className="screen analyzing" aria-live="polite">
      <div className="scan">
        {image && <img src={image} alt="" />}
        <div className="scan-line" />
      </div>
      <div className="ai-avatar pulse"><SparkIcon size={22} /></div>
      <h2 className="title center">{STAGES[stage]}</h2>
      <ol className="stage-list">
        {STAGES.map((s, i) => (
          <li key={s} className={i < stage ? 'is-done' : i === stage ? 'is-current' : ''}>{s.replace('…', '')}</li>
        ))}
      </ol>
      <p className="hint center">Tu foto se queda en tu dispositivo: no se envía a ningún lado.</p>
    </section>
  )
}
