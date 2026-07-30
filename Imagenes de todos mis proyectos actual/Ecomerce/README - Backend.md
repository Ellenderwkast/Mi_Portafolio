# Backend KarellPremium

API backend del e‑commerce KarellPremium.

## Stack

- Node.js + Express
- Sequelize + MySQL
- Integración Coordinadora
- Pagos Wompi

## Requisitos

- Node.js 18+
- Base de datos MySQL accesible

## Instalación

```bash
npm install
```

Configura tu entorno copiando `.env.example` a `.env` y ajustando valores.

## Desarrollo

```bash
npm run dev
```

El servidor arranca desde `server.js` y carga `src/index.js`.

## IndexNow (Bing)

El backend ya incluye integración automática de IndexNow para acelerar rastreo en Bing.

Se envían notificaciones cuando se crean/actualizan/eliminan:

- Productos (`/products/:slug`)
- Publicaciones del blog (`/blog/:slug`)
- Sitemap (`/sitemap.xml`)

Variables de entorno:

- `INDEXNOW_KEY` (requerida para activar)
- `INDEXNOW_KEY_LOCATION` (opcional; por defecto usa `https://tu-dominio/indexnow-key.txt`)
- `INDEXNOW_ENDPOINT` (opcional; por defecto `https://api.indexnow.org/indexnow`)

El backend expone automáticamente:

- `GET /indexnow-key.txt` → devuelve el valor de `INDEXNOW_KEY` (requisito de validación de Bing/IndexNow)

### Verificación rápida

1. Configura `INDEXNOW_KEY` en el entorno de producción.
2. Reinicia el backend.
3. Verifica en navegador:
	- `https://www.karellpremium.com.co/indexnow-key.txt`
4. Crea o edita un producto/post y revisa logs del backend para confirmar envío `IndexNow submit exitoso`.

## Auditoría SEO de `sitemap.xml`

Script incluido:

- `tools/audit_sitemap_indexability.mjs`

Valida por URL del sitemap:

- estado HTTP
- meta robots (`noindex`)
- canonical y coincidencia con la URL
- presencia de `<h1>` en HTML inicial
- `title`

Ejemplos:

```bash
node tools/audit_sitemap_indexability.mjs
node tools/audit_sitemap_indexability.mjs --limit=20 --concurrency=5
node tools/audit_sitemap_indexability.mjs --sitemap=https://www.karellpremium.com.co/sitemap.xml --out=tools/sitemap_audit.csv
```

## Cloudinary (opcional para uploads)

Para que los archivos no dependan del servidor, puedes usar Cloudinary.

Variables requeridas (usa una de las dos opciones):

Opción A (recomendada):

- `CLOUDINARY_URL=cloudinary://API_KEY:API_SECRET@CLOUD_NAME`

Opción B:

- `CLOUDINARY_CLOUD_NAME=...`
- `CLOUDINARY_API_KEY=...`
- `CLOUDINARY_API_SECRET=...`

Opcionales:

- `CLOUDINARY_PRODUCTS_FOLDER=karellpremium/products`
- `CLOUDINARY_AVATARS_FOLDER=karellpremium/avatars`

## Migración de `/uploads` a Cloudinary

Script: `tools/migrate_uploads_to_cloudinary.js`

Ejecuta primero en modo simulación:

```bash
node tools/migrate_uploads_to_cloudinary.js
```

Para aplicar cambios en base de datos:

```bash
node tools/migrate_uploads_to_cloudinary.js --apply
```

Opcional: eliminar archivos locales luego de subirlos:

```bash
node tools/migrate_uploads_to_cloudinary.js --apply --delete-local
```

Migrar solo productos o avatares:

```bash
node tools/migrate_uploads_to_cloudinary.js --apply --only=products
node tools/migrate_uploads_to_cloudinary.js --apply --only=avatars
```
