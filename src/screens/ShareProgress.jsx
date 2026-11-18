import { useRef, useState } from 'react'
import { exampleQuestions } from '../data/content.js'
import { Icon, SparkIcon } from '../components/Illustrations.jsx'
import { createSampleImage } from '../lib/analyzeImage.js'

export default function ShareProgress({ image, setImage, question, setQuestion, onBack, onAnalyze }) {
  const inputRef = useRef(null)
  const [dragging, setDragging] = useState(false)
  const [error, setError] = useState('')

  const readFile = (file) => {
    if (!file) return
    if (!file.type.startsWith('image/')) {
      setError('Ese archivo no parece una imagen. Prueba con una foto JPG, PNG o HEIC.')
      return
    }
    setError('')
    const reader = new FileReader()
    reader.onload = () => setImage(reader.result)
    reader.onerror = () => setError('No pudimos leer la imagen. Intenta con otra foto.')
    reader.readAsDataURL(file)
  }

  const onDrop = (e) => {
    e.preventDefault()
    setDragging(false)
    readFile(e.dataTransfer.files?.[0])
  }

  return (
    <section className="screen">
      <button className="btn-link" onClick={onBack}><Icon name="arrow-left" size={16} /> Volver al tutorial</button>
      <p className="eyebrow">Paso 4 · Comparte tu avance</p>
      <h2 className="title">¡Lo lograste! Muéstranos tu escala de tonos</h2>
      <p className="lead narrow">Tómale una foto a tu escala con buena luz, desde arriba, sin sombras y sin flash (el grafito brilla con el flash). Encuadra la franja para que ocupe casi toda la imagen.</p>

      <div className="share-layout">
        <div className="card upload-card">
          {!image ? (
            <div
              className={`dropzone ${dragging ? 'is-dragging' : ''}`}
              onDragOver={(e) => { e.preventDefault(); setDragging(true) }}
              onDragLeave={() => setDragging(false)}
              onDrop={onDrop}
            >
              <div className="dropzone-icon"><Icon name="upload" size={26} /></div>
              <strong>Arrastra tu foto aquí</strong>
              <span>o</span>
              <button className="btn btn-secondary" onClick={() => inputRef.current?.click()}>
                <Icon name="image" /> Elegir desde mi dispositivo
              </button>
              <button className="btn-link" onClick={() => setImage(createSampleImage())}>
                ¿No tienes una foto? Usa una de ejemplo
              </button>
            </div>
          ) : (
            <div className="preview">
              <img src={image} alt="Vista previa de tu escala de grafito" />
              <div className="preview-actions">
                <span className="tag tag-green"><Icon name="check" size={12} /> Foto lista</span>
                <button className="btn btn-ghost btn-sm" onClick={() => inputRef.current?.click()}>Cambiar foto</button>
                <button className="btn btn-ghost btn-sm" onClick={() => setImage(null)} aria-label="Quitar foto"><Icon name="close" size={16} /></button>
              </div>
            </div>
          )}
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            hidden
            onChange={(e) => { readFile(e.target.files?.[0]); e.target.value = '' }}
          />
          {error && <p className="error" role="alert"><Icon name="alert" size={16} /> {error}</p>}
        </div>

        <div className="card question-card">
          <label htmlFor="question" className="small-title">¿Tienes alguna duda? <span className="optional">(opcional)</span></label>
          <textarea
            id="question"
            rows={4}
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Ejemplo: ¿Por qué mi degradación tiene cambios tan bruscos entre tonos?"
            maxLength={400}
          />
          <div className="char-count">{question.length}/400</div>
          <p className="hint">Ideas para preguntar:</p>
          <div className="suggestions">
            {exampleQuestions.map((q) => (
              <button key={q} className="suggestion" onClick={() => setQuestion(q)}>{q}</button>
            ))}
          </div>
          <button className="btn btn-primary btn-ai" disabled={!image} onClick={onAnalyze}>
            <SparkIcon /> Analizar mi práctica con IA
          </button>
          {!image && <p className="hint center">Primero agrega una foto de tu práctica.</p>}
        </div>
      </div>
    </section>
  )
}
