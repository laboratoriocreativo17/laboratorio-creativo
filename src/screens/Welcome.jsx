import { HeroArt, Icon, SparkIcon } from '../components/Illustrations.jsx'

export default function Welcome({ onStart }) {
  return (
    <section className="screen welcome">
      <div className="welcome-copy">
        <p className="eyebrow">Un laboratorio digital de técnicas análogas</p>
        <h1 className="display">
          Hola, qué bueno <em>tenerte</em> aquí.
        </h1>
        <p className="lead">
          En Laboratorio Creativo aprendes técnicas artísticas tradicionales —dibujo con grafito,
          acuarela, serigrafía, esténcil, puntillismo o pintura con café— con tus propias manos y a tu ritmo.
        </p>
        <p className="body">
          No solo sigues un tutorial: muestras tus avances, haces tus preguntas y recibes
          recomendaciones de una inteligencia artificial que te acompaña. La creatividad y la
          experimentación siguen siendo tuyas.
        </p>
        <div className="welcome-actions">
          <button className="btn btn-primary btn-lg" onClick={onStart}>
            Comenzar mi primera práctica <Icon name="arrow-right" />
          </button>
          <span className="hint"><Icon name="clock" size={16} /> Seis técnicas para empezar, de 15 a 60 minutos</span>
        </div>
        <ul className="how-it-works" aria-label="Cómo funciona">
          <li><span className="hiw-num">1</span><div><strong>Aprende</strong><span>Pasos cortos y visuales</span></div></li>
          <li><span className="hiw-num">2</span><div><strong>Practica</strong><span>Con tus materiales, en papel</span></div></li>
          <li><span className="hiw-num">3</span><div><strong>Comparte</strong><span>Una foto de tu resultado</span></div></li>
          <li className="hiw-ai"><span className="hiw-num"><SparkIcon size={14} /></span><div><strong>Mejora</strong><span>Con recomendaciones de IA</span></div></li>
        </ul>
      </div>
      <div className="welcome-art">
        <HeroArt />
        <div className="floating-card fc-1"><SparkIcon size={14} /> “¡Tus transiciones van muy bien!”</div>
        <div className="floating-card fc-2"><Icon name="check" size={14} /> Tono 3 de 5</div>
      </div>
    </section>
  )
}
