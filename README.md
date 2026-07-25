# SafeMap Web (Landing + Demo de Mapa)

> Sitio de aterrizaje de SafeMap con un demo de mapa interactivo para Lima.

## 📋 Descripción

SafeMap es una plataforma de seguridad ciudadana: reporta incidentes de forma anónima, visualiza zonas de riesgo (mapa/heatmap) y sugiere rutas más seguras.

## 🏗️ Stack

- Astro 5.8.1
- React 19
- Tailwind CSS
- TypeScript
- Vite (build)

## 📁 Estructura

```text
safe-map/
├── public/
│   ├── avatars/
│   ├── js/
│   ├── favicon.svg
│   ├── apple-touch-icon.svg
│   ├── robots.txt
│   └── site.webmanifest
├── src/
│   ├── components/
│   │   ├── cards/
│   │   ├── interactive/   # Mapas y UI interactiva (React)
│   │   ├── layout/
│   │   ├── sections/
│   │   └── ui/
│   ├── data/
│   ├── layouts/
│   ├── pages/              # index.astro, demo.astro
│   └── styles/
├── astro.config.mjs
├── tailwind.config.mjs
├── package.json
├── DEPLOYMENT.md
└── README.md
```

Astro expone cada archivo de `src/pages/` como una ruta. Los recursos estáticos van en `public/`.

## 🚀 Inicio Rápido (Windows PowerShell)

Requisitos: Node.js 18+ y npm.

```powershell
# Instala dependencias
npm install

# Levanta el servidor de desarrollo (por defecto http://localhost:4321)
npm run dev
```

Si `npm run dev` falla (Exit Code 1), revisa “Solución de Problemas”.

## 🧞 Scripts

| Comando            | Descripción                          |
| ------------------ | ------------------------------------ |
| npm run dev        | Servidor de desarrollo               |
| npm run build      | Compila a producción en ./dist       |
| npm run preview    | Sirve ./dist para verificación local |
| npm run lint       | Linter (ESLint)                      |
| npm run lint:fix   | Linter con autofix                   |
| npm run format     | Formatea con Prettier                |
| npm run type-check | Chequeo de tipos (Astro + TS)        |
| npm run astro …    | CLI de Astro (add, check, etc.)      |

## 🗺️ Demo del Mapa

- Página: `src/pages/demo.astro` → ruta `/demo`.
- Componente principal: `src/components/interactive/MapDemoClean.tsx`.
- Estilos Leaflet: `src/styles/leaflet-custom.css` (importado desde `global.css`).

Modos soportados: incidentes con marcadores, heatmap (círculos) y rutas seguras (polylines). Selector de proveedor de mapa (OSM, satélite, oscuro) y simulación de ubicación del usuario.

### Nota sobre un bug histórico de marcadores “flotantes”

Se corrigió un problema donde los marcadores se desplazaban al hacer zoom porque `.leaflet-marker-icon` tenía animaciones con `transform`. Leaflet usa `transform` para posicionar; si lo animas, “rompe” el anclaje a coordenadas.

- Fix aplicado en `src/styles/leaflet-custom.css`: se retiró la animación del contenedor.
- Si necesitas animaciones, aplícalas a un elemento hijo dentro del HTML del `DivIcon` (no al contenedor `.leaflet-marker-icon`).

## 🔧 Solución de Problemas

1. “npm run dev” no arranca o puerto ocupado (4321)

```powershell
# Ver el proceso que usa el puerto 4321
$pid = (Get-NetTCPConnection -LocalPort 4321).OwningProcess
Get-Process -Id $pid

# Matarlo si es necesario
Stop-Process -Id $pid -Force

# Reiniciar el dev server
npm run dev
```

1. Cerrar el servidor de desarrollo

- En la terminal donde corre: Ctrl + C (confirma si te lo pide).
- En VS Code: Terminal → ícono de papelera (Terminate) o “Tasks: Terminate Running Task”.

1. Dependencias corruptas

```powershell
Remove-Item -Recurse -Force node_modules; Remove-Item -Force package-lock.json
npm install
npm run dev
```

## 🌐 Despliegue

Guía en `DEPLOYMENT.md`. Funciona bien en proveedores como Netlify, Vercel o un servidor propio.

## 🤝 Contribuciones

Sugerencias bienvenidas:

1. Fork
2. Rama: `feature/mi-cambio`
3. Commit: `feat: descripción breve`
4. Push y Pull Request

## 📄 Licencia

MIT — ver `LICENSE`.

---

Hecho con Astro, React, TypeScript y Tailwind CSS.
