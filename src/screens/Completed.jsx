import { HeroArt, Icon } from '../components/Illustrations.jsx'

export default function Completed({ image, feedback, attempts, onPracticeAgain, onHome }) {
  return (
    <section className="screen completed">
      <div className="completed-art">
        <HeroArt />
        {image && <img className="completed-photo" src={image} alt="Tu práctica" />}
      </div>
      <p className="eyebrow">Práctica completada</p>
      <h2 className="display small">¡Bien hecho! Terminaste tu primera escala de tonos.</h2>
      <p className="lead narrow center">
        {attempts > 1 ? `Llevas ${attempts} intentos: así es como se aprende.` : 'Diste el primer paso en el dibujo con grafito.'}{' '}
        Tu próximo reto sugerido es <strong>{feedback?.nextExercise.title}</strong>.
      </p>
      <ul className="achievements">
        <li><Icon name="check" size={16} /> Preparaste tus materiales</li>
        <li><Icon name="check" size={16} /> Completaste 5 pasos guiados</li>
        <li><Icon name="check" size={16} /> Compartiste tu avance</li>
        <li><Icon name="check" size={16} /> Recibiste recomendaciones</li>
      </ul>
      <div className="actions-bar center">
        <button className="btn btn-secondary" onClick={onPracticeAgain}><Icon name="refresh" /> Repetir la práctica</button>
        <button className="btn btn-primary" onClick={onHome}>Volver al inicio</button>
      </div>
    </section>
  )
}
