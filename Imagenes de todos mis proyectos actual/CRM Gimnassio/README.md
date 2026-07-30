# CRM Empresarial para Gimnasios

Sistema integral para la gestion de multiples gimnasios, compuesto por:
- Backend API en Node.js y Express
- Frontend web en React y Vite
- App movil oficial en Flutter

## Estructura del proyecto

```text
Gimnassio/
|- backend/         API, dominio y persistencia PostgreSQL
|- frontend/        interfaz web
|- mobile_flutter/  cliente movil oficial
|- docs/            documentacion tecnica y funcional
|- tools/           utilidades de soporte
```

## Estado actual

- Auth v2 y RBAC unificado sobre el backend actual
- Persistencia consolidada en PostgreSQL
- Cliente movil unificado en Flutter
- El cliente movil anterior fue retirado del repositorio

## Primeros pasos

### Backend

```powershell
cd backend
npm install
npm run db:migrate:v2
npm run validate:new-backend
npm run dev
```

### Frontend

```powershell
cd frontend
npm install
npm run dev
```

### Mobile Flutter

```powershell
cd mobile_flutter
flutter pub get
flutter run --dart-define=API_BASE_URL=http://localhost:4000/api
```

## Validacion

- Backend: `npm run validate:new-backend`
- Flutter: `flutter analyze`
- Salud del backend: `http://localhost:4000/health`

## Documentacion

Consulta la carpeta `docs/` para detalles de arquitectura, modulos, roles y flujos.

## Despliegue

- Backend: configurar variables de entorno y ejecutar migraciones v2 antes de iniciar el servicio
- Frontend: construir con Vite segun el entorno de destino
- Mobile Flutter: compilar con `flutter build` para la plataforma objetivo

## Notas

- La base principal del proyecto es PostgreSQL.
- El codigo movil del repositorio apunta exclusivamente a `mobile_flutter/`.
- Algunas integraciones del backend mantienen compatibilidad transicional con contratos legacy donde aun es necesario.
