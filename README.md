# Laboratorio Creativo — Prototipo funcional

Prototipo navegable de la experiencia principal: una persona principiante aprende a
hacer una escala de tonos con grafito, comparte una foto de su resultado y recibe
recomendaciones de un acompañante de IA (simulado).

Técnica del prototipo: **dibujo con grafito** — ejercicio “Aprende a crear una escala de
degradación de tonos con grafito”.

## Cómo ejecutarlo

Requisitos: Node.js 18 o superior.

```bash
npm install
npm run dev        # abre http://localhost:5173
```

Para generar una versión para compartir:

```bash
npm run build      # genera dist/index.html (un solo archivo autocontenido)
npm run preview    # sirve la versión generada
```

`dist/index.html` incluye todo el JS y el CSS, así que se puede abrir directamente
en el navegador o subir a cualquier hosting estático (Netlify, Vercel, GitHub Pages).

## Recorrido

1. **Bienvenida** — mensaje cercano y botón “Comenzar mi primera práctica”.
2. **Selección de técnica** — tarjeta de Dibujo con grafito (nivel, 15–20 min, materiales) y técnicas próximas.
3. **Preparación de materiales** — 6 tarjetas marcables (HB, 2B, 4B, papel, borrador, sacapuntas) + cómo organizar el espacio.
4. **Tutorial paso a paso** — 5 pasos con referencia visual animada de la escala tonal,
   instrucción, recomendación, “resultado esperado”, barra de progreso y navegación
   adelante/atrás (también desde los puntos de progreso).
5. **Compartir mi avance** — carga desde el dispositivo (o arrastrar y soltar), vista previa,
   pregunta opcional con sugerencias. Incluye “foto de ejemplo” para demos.
6. **Retroalimentación** — Observación, Posibles dificultades, Recomendaciones y Próximo
   ejercicio. Botones “Volver a practicar” y “Finalizar mi práctica”.
7. **Práctica completada** — resumen y opción de repetir.

## Sobre la IA (importante)

Este prototipo **no está conectado a un modelo de IA**. Para ser transparentes, la
pantalla de retroalimentación lo indica con un aviso y etiqueta cada sección:

- **“Basado en mediciones de tu foto”** — la sección *Observación* se calcula de verdad,
  en el navegador (`src/lib/analyzeImage.js`): localiza la zona dibujada, la divide en
  cinco tramos a lo largo de la escala y mide el tono de cada uno. Con eso detecta el
  orden claro → oscuro, el rango tonal, saltos bruscos entre casillas y la uniformidad.
  Es una medición aproximada, no visión artificial.
- **“Respuesta de ejemplo”** — *Dificultades, Recomendaciones y Próximo ejercicio* son
  textos predefinidos (`src/data/content.js`), elegidos según palabras clave de la
  pregunta (saltos bruscos, presión, uniformidad) o, si no hay pregunta, según las mediciones.

La foto nunca sale del dispositivo.

### Cómo conectar una IA real

Reemplaza `buildFeedback()` en `src/lib/buildFeedback.js` por una llamada a un backend
propio que envíe la imagen y la pregunta a un modelo multimodal y devuelva el mismo
objeto (`observations`, `difficulties`, `recommendations`, `nextExercise`). La clave de
API debe quedarse en el servidor, nunca en el frontend. Cuando el análisis sea real,
cambia las etiquetas de `Badge` en `src/screens/Feedback.jsx` y retira el aviso de demo.

## Estructura

```
src/
├── App.jsx                 # flujo y estado global
├── main.jsx
├── styles.css              # sistema visual completo (paleta, tarjetas, animaciones)
├── components/
│   ├── Header.jsx          # marca + indicador de recorrido
│   └── Illustrations.jsx   # ilustraciones SVG con textura de grafito e iconos
├── screens/                # una pantalla por archivo
├── data/content.js         # textos, pasos y biblioteca de retroalimentación
└── lib/
    ├── analyzeImage.js     # mediciones de píxeles + foto de ejemplo
    └── buildFeedback.js    # arma la retroalimentación simulada
```

## Publicar en GitHub Pages

El proyecto incluye `.github/workflows/deploy.yml`, que compila y publica el sitio
automáticamente cada vez que se hace push a la rama `main`.

1. Crea un repositorio público en GitHub (por ejemplo `laboratorio-creativo`).
2. Sube estos archivos a la rama `main` (sin `node_modules` ni `dist`).
3. En el repositorio: **Settings → Pages → Build and deployment → Source: GitHub Actions**.
4. Espera a que termine la acción en la pestaña **Actions** (1–2 minutos).
5. El enlace público queda en: `https://TU-USUARIO.github.io/laboratorio-creativo/`
