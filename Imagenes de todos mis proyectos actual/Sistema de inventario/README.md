# Sistema de Inventario de Zapatillas

Proyecto fullstack TypeScript con:
- Backend: Node.js + Express + Prisma + PostgreSQL + Cloudinary
- Frontend: React + Vite + MUI + React Query
- Docker + docker-compose

## Setup inicial

1. Copia los archivos en el workspace.
2. Ajusta `server/.env.example` y `docker-compose.yml`.
3. Instala dependencias:

```bash
cd server
npm install

cd ../client
npm install
```

4. Inicia Docker:

```bash
docker-compose up -d
```

5. Genera Prisma y ejecuta la migración:

```bash
cd server
npx prisma generate
npx prisma migrate dev --name init
```

6. Accede a las apps:
- Backend: http://localhost:4000
- Frontend: http://localhost:5173
