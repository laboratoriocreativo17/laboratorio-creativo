import { useEffect, useRef, useState } from 'react'
import Header from './components/Header.jsx'
import Welcome from './screens/Welcome.jsx'
import TechniqueSelect from './screens/TechniqueSelect.jsx'
import Materials from './screens/Materials.jsx'
import Tutorial from './screens/Tutorial.jsx'
import ShareProgress from './screens/ShareProgress.jsx'
import Analyzing from './screens/Analyzing.jsx'
import Feedback from './screens/Feedback.jsx'
import Completed from './screens/Completed.jsx'
import { analyzeImage } from './lib/analyzeImage.js'
import { buildFeedback } from './lib/buildFeedback.js'

// Orden del recorrido. "analyzing" es una pantalla de transición.
const SCREENS = ['welcome', 'technique', 'materials', 'tutorial', 'share', 'analyzing', 'feedback', 'done']

export default function App() {
  const [screen, setScreen] = useState('welcome')
  const [tutorialStep, setTutorialStep] = useState(0)
  const [image, setImage] = useState(null) // data URL
  const [question, setQuestion] = useState('')
  const [metrics, setMetrics] = useState(null)
  const [feedback, setFeedback] = useState(null)
  const [attempts, setAttempts] = useState(1)
  const mainRef = useRef(null)

  // Al cambiar de pantalla, vuelve arriba y mueve el foco (accesibilidad).
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
    mainRef.current?.focus({ preventScroll: true })
  }, [screen, tutorialStep])

  const go = (s) => setScreen(s)

  const startAnalysis = async () => {
    go('analyzing')
    let m = null
    try {
      m = await analyzeImage(image)
    } catch {
      m = null
    }
    setMetrics(m)
    setFeedback(buildFeedback(question, m))
    // Pequeña espera para que la transición se perciba (simulación).
    setTimeout(() => go('feedback'), 3200)
  }

  const practiceAgain = () => {
    setImage(null)
    setQuestion('')
    setMetrics(null)
    setFeedback(null)
    setTutorialStep(0)
    setAttempts((a) => a + 1)
    go('tutorial')
  }

  const restart = () => {
    setImage(null)
    setQuestion('')
    setMetrics(null)
    setFeedback(null)
    setTutorialStep(0)
    setAttempts(1)
    go('welcome')
  }

  return (
    <div className="app">
      <Header screen={screen} onHome={restart} screens={SCREENS} />
      <main ref={mainRef} tabIndex={-1} className="main" key={screen}>
        {screen === 'welcome' && <Welcome onStart={() => go('technique')} />}
        {screen === 'technique' && (
          <TechniqueSelect onBack={() => go('welcome')} onChoose={() => go('materials')} />
        )}
        {screen === 'materials' && (
          <Materials onBack={() => go('technique')} onReady={() => { setTutorialStep(0); go('tutorial') }} />
        )}
        {screen === 'tutorial' && (
          <Tutorial
            step={tutorialStep}
            setStep={setTutorialStep}
            attempts={attempts}
            onBack={() => go('materials')}
            onFinish={() => go('share')}
          />
        )}
        {screen === 'share' && (
          <ShareProgress
            image={image}
            setImage={setImage}
            question={question}
            setQuestion={setQuestion}
            onBack={() => { setTutorialStep(4); go('tutorial') }}
            onAnalyze={startAnalysis}
          />
        )}
        {screen === 'analyzing' && <Analyzing image={image} />}
        {screen === 'feedback' && feedback && (
          <Feedback
            image={image}
            question={question}
            metrics={metrics}
            feedback={feedback}
            onPracticeAgain={practiceAgain}
            onFinish={() => go('done')}
          />
        )}
        {screen === 'done' && (
          <Completed image={image} feedback={feedback} attempts={attempts} onPracticeAgain={practiceAgain} onHome={restart} />
        )}
      </main>
      <footer className="footer">
        Prototipo de demostración · Laboratorio Creativo · La retroalimentación de IA es simulada
      </footer>
    </div>
  )
}
