# TumaGo - Plataforma de Transporte Tipo Uber

## 📱 Descripción General

TumaGo es una plataforma completa de transporte similar a Uber, diseñada específicamente para Tumaco. Consta de un backend centralizado robusto y dos aplicaciones Flutter profesionales: una para usuarios y otra exclusiva para conductores.

## 🎯 Características Principales

### Backend (Node.js + Express)
- Autenticación con Firebase Authentication (teléfono)
- Sistema de gestión de viajes en tiempo real
- Billetera digital para conductores
- Comisiones automáticas (10% por viaje)
- Integración con Wompi para procesamiento de pagos
- Notificaciones push con Firebase Cloud Messaging
- Base de datos PostgreSQL escalable
- WebSocket para actualizaciones en tiempo real

### TumaGo Conductor
- Registro y verificación de documentos
- Gestión de perfil de conductor
- Búsqueda de viajes disponibles
- Aceptación y gestión de viajes
- Rastreo GPS en tiempo real
- Sistema de billetera con comisiones
- Bloqueo automático cuando la deuda llega a $10,000 COP
- Historial de viajes y ganancias
- Sistema de calificación

### TumaGo Usuario
- Búsqueda y solicitud de viajes
- Rastreo del conductor en tiempo real
- Sistema de calificación
- Historial de viajes
- Métodos de pago integrados
- Notificaciones en tiempo real

## 🏗️ Estructura del Proyecto

```
Tumaco/
├── logo/
│   ├── TumaGo.webp
│   └── TumaGo_Conductor.webp
├── tumago-backend/          # Backend Node.js
├── tumago-conductor/        # App Flutter para conductores
└── tumago-user/            # App Flutter para usuarios
```

## 🎨 Diseño y Branding

### Paleta de Colores
- **Turquesa Principal**: #33D6E8 (Color primario)
- **Azul Océano**: #0A3042 (Color secundario, fondos oscuros)
- **Dorado Atardecer**: #F7B733 (Acentos)
- **Blanco**: #FFFFFF
- **Negro**: #000000
- **Gris Oscuro**: #1F2937
- **Gris Claro**: #F3F4F6

### Tipografía
- **Títulos**: Inter Bold (700)
- **Subtítulos**: Inter SemiBold (600)
- **Texto Normal**: Inter Regular (400)
- **Botones**: Inter SemiBold (600)

## 🔧 Stack Tecnológico

### Backend
- **Runtime**: Node.js v18+
- **Framework**: Express.js
- **Base de Datos**: PostgreSQL
- **Autenticación**: Firebase Authentication
- **Notificaciones**: Firebase Cloud Messaging
- **Pagos**: Wompi Payment Gateway
- **Real-time**: Socket.io
- **ORM**: Raw SQL queries (pg)

### Frontend (Mobile)
- **Framework**: Flutter 3.0+
- **Lenguaje**: Dart
- **Estado**: GetX, Riverpod
- **Mapas**: Google Maps Flutter
- **HTTP**: Dio
- **Local Storage**: Shared Preferences

## 💰 Modelo de Negocio

### Comisiones
- **Comisión por viaje**: 10% del valor total
- **Límite de deuda**: $10,000 COP
- **Bloqueo de cuenta**: Automático cuando deuda >= $10,000
- **Desbloqueo**: Manual después de pago

### Pagos
- Gateway: Wompi
- Métodos: Tarjeta crédito/débito, transferencia bancaria
- Moneda: COP (Pesos Colombianos)

## 📊 Base de Datos

### Tablas Principales
- `users` - Usuarios y conductores
- `drivers` - Perfiles de conductores
- `driver_vehicles` - Vehículos
- `rides` - Viajes completados/activos
- `payments` - Registro de pagos
- `wallets` - Billeteras de conductores
- `ratings` - Calificaciones
- `notifications` - Historial de notificaciones

## 🚀 Configuración e Instalación

### Backend
```bash
cd tumago-backend
npm install
cp .env.example .env
# Editar .env con valores correctos
npm run migrate
npm run dev
```

### TumaGo Conductor
```bash
cd tumago-conductor
flutter pub get
flutter run
```

### TumaGo Usuario
```bash
cd tumago-user
flutter pub get
flutter run
```

## 📡 API Endpoints

Ver documentación completa en [tumago-backend/README.md](./tumago-backend/README.md)

### Rutas Principales
- `POST /api/auth/send-otp` - Enviar OTP
- `POST /api/auth/verify-otp` - Verificar OTP
- `GET|PUT /api/drivers/profile` - Perfil de conductor
- `POST /api/rides` - Crear viaje
- `POST /api/rides/{id}/accept` - Aceptar viaje
- `GET /api/wallet/balance` - Balance de billetera
- `POST /api/payments/process` - Procesar pago

## 🔐 Seguridad

- JWT para autenticación
- Firebase Security Rules
- HTTPS obligatorio en producción
- Validación de entrada en todos los endpoints
- Rate limiting para prevenir abuso
- Hashing bcrypt para contraseñas
- CORS configurado

## 📝 Convenciones de Código

### Backend (JavaScript/Node.js)
- Nombre de archivos en snake_case: `user_service.js`
- Nombre de funciones en camelCase: `getUserProfile()`
- Nombres de constantes en UPPER_SNAKE_CASE: `MAX_RETRIES`

### Frontend (Dart)
- Nombre de archivos en snake_case: `auth_screen.dart`
- Nombre de clases en PascalCase: `AuthController`
- Variables privadas con `_` prefijo: `_privateVar`

## 🧪 Testing

### Backend
```bash
npm test
```

### Frontend
```bash
flutter test
```

## 📦 Deployment

### Backend
- Hosted en: Heroku / Railway / AWS
- Variables de entorno: `.env`
- Base de datos: PostgreSQL Cloud

### Mobile
- Android: Google Play Store
- iOS: Apple App Store

## 👥 Equipo

- Backend Developer
- Mobile Developer (Flutter)
- UI/UX Designer
- Product Manager

## 📄 Licencia

MIT

## 📞 Soporte

Para reportar bugs o sugerir features, crea un issue en el repositorio.

## 🎓 Documentación Adicional

- [Backend Setup](./tumago-backend/README.md)
- [Conductor App](./tumago-conductor/README.md)
- [User App](./tumago-user/README.md)
- [API Documentation](./docs/API.md) (Próximamente)
- [Database Schema](./docs/DATABASE.md) (Próximamente)

---

**Última actualización**: 2026-06-08
**Versión**: 1.0.0
