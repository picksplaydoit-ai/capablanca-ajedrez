# Capablanca Method

**Capablanca Method** es una plataforma premium de entrenamiento de ajedrez diseñada para reprogramar la intuición estratégica del jugador. Inspirada en la filosofía de José Raúl Capablanca y otros grandes maestros clásicos, la aplicación se enfoca en el desarrollo del pensamiento posicional y la técnica de finales.

## 🏛️ Filosofía del Producto

- **Local-First**: Todo el procesamiento de análisis y lógica de entrenamiento ocurre directamente en el navegador del usuario. Sin latencia, sin costos de API, privacidad total.
- **Zero Cost**: El sistema utiliza heurísticas expertas diseñadas a mano para emular el consejo de un maestro, eliminando la necesidad de motores de IA en la nube costosos.
- **ADN Clásico**: Basado puramente en los principios de economía de medios, simplicidad y actividad de piezas de la escuela clásica.

## 🚀 Características Principales

- **Ruta de Maestría**: Currículo estructurado desde fundamentos hasta conceptos avanzados de finales.
- **PGN Coach Elite**: Sube tus propias partidas y recibe consejos posicionales basados en el estilo de Capablanca.
- **Estudio de Grandmasters**: Analiza específicamente el ADN estratégico de leyendas como Capablanca, Karpov y Fischer.
- **Bitácora de Maestro**: Sistema de registro de reflexiones y errores críticos con repetición espaciada integrada.
- **Radar de ADN**: Visualización gráfica de tus fortalezas en 6 dimensiones clave (Táctica, Estrategia, Finales, Cálculo, Profilaxis, Estructura).

## 🛠️ Stack Tecnológico

- **Frontend**: React 19 + Vite
- **Estilos**: Tailwind CSS 4.0
- **Animaciones**: Framer Motion
- **Estado**: Zustand (Persistencia Local)
- **Lógica de Ajedrez**: Chess.js + React Chessboard
- **Visualización**: Recharts

## 💻 Desarrollo Local

```bash
# Instalar dependencias
npm install

# Correr en modo desarrollo
npm run dev

# Generar build de producción
npm run build
```

## 🌐 Despliegue en Vercel

Esta aplicación está lista para ser desplegada en Vercel como una SPA (Single Page Application).

1. Conecta tu repositorio.
2. Asegúrate de que el Framework Preset sea **Vite**.
3. El archivo `vercel.json` incluido maneja las redirecciones necesarias para React Router.

---

*Desarrollado con ❤️ para la comunidad ajedrecística.*
