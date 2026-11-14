# Desplegar la landing de SafeMap

El sitio es estático y GitHub Pages lo sirve bajo `/safe-map/`. La implementación se integra en `develop`; esa rama no publica en producción y no se fusiona automáticamente con `main`.

## Comprobar el artefacto local

Con Node.js 22:

```sh
npm ci
npm run lint
NODE_OPTIONS=--max-old-space-size=768 npm run type-check
npm run build
npm run preview -- --host 127.0.0.1
```

Abrir `http://127.0.0.1:4321/safe-map/` (o el puerto anunciado). Comprobar imágenes, fuentes, favicon, anclas y menú mobile. No abrir `dist/index.html` directamente: las rutas son absolutas desde la base de GitHub Pages.

El build usa 768 MiB de heap, un hilo de libuv y concurrencia de libvips limitada. No ejecutar otro build, checker o navegador al mismo tiempo en el host pequeño. Se generan AVIF/WebP con Astro/Sharp; no se requiere convertir originales manualmente.

## Flujo de ramas

1. Crear una rama desde `develop`.
2. Implementar y verificar una tarea coherente.
3. Commit Conventional Commits sin atribución de IA.
4. Merge directo de la rama a `develop`; sin PR.
5. No tocar `main` durante esta fase.

Un push de `develop` no activa el despliegue: `.github/workflows/deploy.yml` escucha únicamente pushes a `main`. No cambiar ese trigger para publicar la rama de integración. La ejecución manual del workflow también es una publicación; no usarla como prueba.

## GitHub Pages

El workflow existente usa Node.js 22, `npm ci`, `npm run build` y sube únicamente `dist/`. La publicación requiere una decisión posterior sobre `main`; no forma parte de integrar cambios en `develop`.

`astro.config.mjs` deriva `site` y `base` de `GITHUB_REPOSITORY`, con fallback `trinity-bytes/safe-map`. Los enlaces y recursos públicos de la landing usan `import.meta.env.BASE_URL`. Si se renombra el repositorio, actualizar también `public/robots.txt` y verificar el sitemap, el canonical y las URLs de las tarjetas sociales.

## Antes de publicar

- Revisar los faltantes de contenido documentados en el plan.
- Mantener el badge de Google Play inactivo hasta tener un enlace real.
- No publicar enlaces legales, de equipo o contacto inventados.
- Revisar el informe de auditoría de dependencias; no ejecutar `npm audit fix --force` como paso de despliegue.
- Repetir los checks de teclado, movimiento reducido y contenido sin JavaScript.
- Comprobar social cards en la URL publicada cuando se autorice el despliegue; el chequeo local solo valida el HTML y los archivos.
