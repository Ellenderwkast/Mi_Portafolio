# TumaGo Conductor

> **Documentación canónica:** el árbol de carpetas más abajo es histórico. La estructura real, autenticación, restauración de sesión, aprobación de conductor, notificaciones y setup están en [context.md](../context.md). Comandos habituales: `flutter pub get`, `flutter analyze lib test`, `flutter test`.

Aplicación Flutter para conductores de TumaGo (similar a Uber).

## Características Principales

- ✅ Autenticación con teléfono (OTP via Firebase)
- ✅ Gestión de perfil de conductor
- ✅ Sistema de billetera con comisiones
- ✅ Búsqueda de viajes disponibles en tiempo real
- ✅ Aceptación de viajes
- ✅ Rastreo de ubicación en vivo
- ✅ Historial de viajes completados
- ✅ Notificaciones push (Firebase Cloud Messaging)
- ✅ Sistema de calificaciones
- ✅ Gestión de documentos (cédula, licencia, tarjeta de circulación)

## Stack Tecnológico

- **Framework**: Flutter 3.0+
- **Lenguaje**: Dart
- **Estado**: GetX, Riverpod
- **HTTP Client**: Dio
- **Mapas**: Google Maps Flutter
- **Autenticación**: Firebase Authentication
- **Notificaciones**: Firebase Cloud Messaging
- **Base Local**: Shared Preferences

## Instalación

1. **Requisitos previos**
   - Flutter 3.0 o superior
   - Dart 3.0 o superior
   - Android Studio/Xcode (para emuladores)

2. **Clonar el proyecto**
   ```bash
   git clone <repo-url>
   cd tumago-conductor
   ```

3. **Instalar dependencias**
   ```bash
   flutter pub get
   ```

4. **Configurar Firebase**
   - Descarga el archivo `google-services.json` para Android
   - Descarga el archivo `GoogleService-Info.plist` para iOS
   - Colócalos en las carpetas correspondientes

5. **Ejecutar en desarrollo**
   ```bash
   flutter run
   ```

## Estructura del Proyecto

```
tumago-conductor/
├── lib/
│   ├── config/
│   │   ├── app_config.dart
│   │   └── theme.dart
│   ├── data/
│   │   ├── models/
│   │   │   └── models.dart
│   │   └── services/
│   │       └── api_service.dart
│   ├── presentation/
│   │   ├── controllers/
│   │   │   ├── auth_controller.dart
│   │   │   ├── driver_controller.dart
│   │   │   └── wallet_controller.dart
│   │   ├── screens/
│   │   │   ├── login_screen.dart
│   │   │   ├── home_screen.dart
│   │   │   ├── ride_screen.dart
│   │   │   ├── wallet_screen.dart
│   │   │   └── profile_screen.dart
│   │   └── widgets/
│   └── utils/
├── assets/
│   ├── images/
│   ├── icons/
│   └── fonts/
└── pubspec.yaml
```

## Paleta de Colores

- **Turquesa Principal**: #33D6E8
- **Azul Océano**: #0A3042
- **Dorado Atardecer**: #F7B733
- **Blanco**: #FFFFFF
- **Negro**: #000000

## Tipografía

- **Títulos**: Inter Bold
- **Subtítulos**: Inter SemiBold
- **Texto Normal**: Inter Regular
- **Botones**: Inter SemiBold

## Comisiones

- **Comisión por viaje**: 10%
- **Límite de deuda**: $10,000 COP
- Cuando la deuda llega al límite, la cuenta se bloquea hasta recarga

## Build para Producción

### Android
```bash
flutter build apk --release
```

### iOS
```bash
flutter build ios --release
```

## Contribuir

1. Fork el proyecto
2. Crear rama para la feature (`git checkout -b feature/AmazingFeature`)
3. Commit cambios (`git commit -m 'Add AmazingFeature'`)
4. Push a rama (`git push origin feature/AmazingFeature`)
5. Abrir Pull Request

## Licencia

MIT
