# appcomunitaria

Aplicación comunitaria construida en Flutter con una home modular y
catálogos de productos filtrados por categorías.

## Configuración de producción (Android + iOS)

- Backend productivo por defecto en builds `release`:
	- `https://backend-production-074e.up.railway.app`
- Bundle id móvil alineado para producción:
	- Android: `com.open.app`
	- iOS: `com.open.app`
- Override opcional por entorno con `--dart-define`:
	- `flutter run --dart-define=API_BASE_URL=https://tu-backend`
	- `flutter build apk --release --dart-define=API_BASE_URL=https://tu-backend`
	- `flutter build ipa --release --dart-define=API_BASE_URL=https://tu-backend`

### Android release signing

- Crear `flutter_app/android/key.properties` (no versionar) con:
	- `storePassword=...`
	- `keyPassword=...`
	- `keyAlias=...`
	- `storeFile=.../upload-keystore.jks`
- El build `release` usa esa firma automáticamente si el archivo existe.
- Si `key.properties` no existe, el proyecto cae a firma debug solo para pruebas locales; para Play Store debes configurar tu keystore real.

### iOS producción

- Ejecutar primero `flutter pub get` y luego `pod install` dentro de `flutter_app/ios`.
- Asegurar `flutter_app/ios/Runner/GoogleService-Info.plist` de Firebase (no versionar).
- Crear la app iOS de Firebase usando el bundle `com.open.app` para que coincida con el proyecto.
- Registrar también en `Info.plist` el `CFBundleURLTypes` con el `REVERSED_CLIENT_ID` del cliente iOS de Firebase para que `google_sign_in` funcione en iPhone.
- El proyecto ya incluye `Podfile`, entitlement de push y `Background Modes > remote-notification` en `Info.plist`.
- La API key de Google Maps iOS quedó alineada con la configuración actual del proyecto.
- En Apple Developer / Xcode, habilitar capability `Push Notifications` y Background Mode `Remote notifications`.
- Permisos iOS ya declarados en `Info.plist` para ubicación, cámara, fotos y notificaciones foreground.
- Si vas a archivar para App Store, verifica que el perfil de firma use push en modo `production`.

## Estandarización de iconos en Home Admin

- Los iconos/imágenes de módulos y submódulos creados desde **Gestión de módulo** se renderizan ahora en un canvas uniforme para mantener el mismo tamaño visual que los módulos/submódulos existentes.
- La app usa `BoxFit.contain` para evitar recortes agresivos en iconos subidos por admin y conservar proporción.
- Recomendación de carga para mantener consistencia visual:
	- formato: `PNG` o `WEBP`
	- relación: `1:1`
	- tamaño sugerido: `512x512` px

## Checklist final de publicación

- Checklist exacto para publicar `AAB` (Play Store) e `IPA` (App Store):
	- `flutter_app/RELEASE_CHECKLIST.md`

## Arquitectura de la Home

- `lib/screens/home/home_screen.dart` define la pantalla inicial.
	- Los módulos principales (Alimentos, Salud, Mascotas, Servicios varios,
		Clasificados y Transporte) se modelan con `HomeModule` y
		`HomeModuleType`.
	- Cada módulo principal puede tener su propia pantalla de submódulos:
		- `alimentos_submodules_screen.dart`
		- `salud_submodules_screen.dart`
		- `mascotas_submodules_screen.dart`
		- `servicios_varios_submodules_screen.dart`
		- `clasificados_submodules_screen.dart`
		- `transporte_submodules_screen.dart`
- Cada submódulo (por ejemplo, "Restaurantes", "Farmacias",
	"Adopciones") define una clave de categoría (`categoryKey`).

## Productos y categorías

- Modelo: `lib/models/product.dart`
	- Campo `category` (opcional) indica a qué categoría lógica pertenece un
		producto (por ejemplo, `alimentos_restaurantes`, `salud_farmacias`).
	- El backend debe enviar este valor en el JSON bajo la clave `category`.
- Providers: `lib/providers/product_provider.dart`
	- `productListProvider`: carga todos los productos desde la API.
	- `filteredProductListProvider`: aplica el texto del buscador de la home.
	- `productsByCategoryProvider`: filtra la lista completa por `category`.

## Catálogo por categoría

- Pantalla genérica: `lib/screens/catalog/category_product_catalog_screen.dart`.
	- Recibe un `title` y una `categoryKey`.
	- Usa `productsByCategoryProvider(categoryKey)` para mostrar solo los
		productos de esa categoría.
	- Es reutilizada por todos los submódulos.

## Flujo al navegar

1. El usuario toca un módulo principal (por ejemplo, Alimentos).
2. Se navega a la pantalla de submódulos correspondiente
	 (por ejemplo, `AlimentosSubmodulesScreen`).
3. El usuario elige un submódulo (por ejemplo, "Restaurantes").
4. Esa opción tiene asociada una `categoryKey`
	 (por ejemplo, `alimentos_restaurantes`).
5. Se abre `CategoryProductCatalogScreen`, que consulta
	 `productsByCategoryProvider('alimentos_restaurantes')`.
6. Si el backend envía productos con `"category": "alimentos_restaurantes"`,
	 se muestran solo esos productos.

## Extensión: catálogo por aliados y lugares cercanos

Además del catálogo genérico por categoría, la app ya implementa un flujo
completo centrado en **aliados/lugares cercanos**, pensado para escenarios
tipo delivery (restaurantes, farmacias, panaderías, cafés, etc.).

### 1. Aliados y lugares cercanos

- Widget y modelo principal: `lib/widgets/nearby_places.dart`.
	- `NearbyPlace` representa un aliado visible en la app (nombre, distancia,
		tipo, tags, etc.).
	- `AllyType` diferencia aliados de **compra** (`purchase`) y de
		**servicio** (`service`).
- Pantalla de listado:
	- `NearbyPlacesScreen` muestra el listado de aliados para cada submódulo
		(por ejemplo, restaurantes, farmacias, heladerías, etc.).
	- Cada submódulo de la home (Restaurantes, Farmacias, Almacenes, Bebidas,
		Panaderías, Heladerías, etc.) construye su propia lista mock de
		`NearbyPlace` y define el `onPlaceTap` que navega a
		`AllyDetailScreen`.

### 2. Detalle de aliado y catálogo interno

- Pantalla: `lib/screens/ally/ally_detail_screen.dart`.
- Responsabilidades principales:
	- Mostrar información del aliado (nombre, descripción amigable, dirección,
		horario de atención) y una grilla/lista de **categorías internas** con
		sus productos.
	- Distinguir entre aliados de **venta directa** (farmacias, almacenes,
		bebidas, panaderías, cafés, heladerías) y aliados de **comida**
		(restaurantes y comidas rápidas) para decidir si se ofrecen **combos**
		(bebida + adiciones) o **productos relacionados**.
	- Preparar la lógica de **horario de atención** para que más adelante se
		alimente desde backend.
- Lógica clave:
	- `_isDirectSaleAlly`: bandera interna que marca aliados de venta directa.
		- Para estos aliados, el detalle de producto mostrará secciones de
			**productos relacionados** (sin configurar combos de bebida/adiciones).
	- Aliados de comida (La Parrilla de Barrio, Turbo Burger, Pasta & Amor,
		Sabor Casero, Pollo Express, Pizzaloca, etc.) usan combos personalizados
		para cada producto principal.
	- `_isAllyOpen`: getter que, por ahora, usa un horario placeholder
		(07:00–23:00) para decidir si el aliado está "abierto". En el futuro se
		conectará al campo `horario_operacion` del backend.
		- Si `_isAllyOpen` es `true`, se renderiza el catálogo completo de
			categorías y productos.
		- Si `_isAllyOpen` es `false`, se oculta el catálogo y se muestra un
			mensaje `_AllyClosedMessage` informando que el aliado está fuera de
			horario.
	- `CartSummaryFooter` sólo aparece en esta pantalla cuando el aliado está
		abierto y la canasta no está vacía.

### 3. Detalle de producto, combos y relacionados

- Pantalla: `lib/screens/catalog/product_detail_screen.dart`.
- Recibe un `Product` (modelo de negocio), la ruta de imagen y, según el
	caso:
	- Opciones de bebida (`drinkOptions`) y adiciones (`addonOptions`) para
		aliados de comida.
	- Secciones de productos relacionados (`relatedSections`) para aliados de
		venta directa.
- Comportamiento:
	- Calcula el total de la **selección actual** (precio base del producto +
		bebida seleccionada + adiciones marcadas).
	- El footer muestra un botón **"Agregar"** con el valor de la selección
		actual; al tocarlo, se agrega al carrito global y se hace
		`Navigator.pop(true)` para informar al `AllyDetailScreen`.
	- Si el producto requiere bebida (por ejemplo, combos de hamburguesa), la
		pantalla obliga a seleccionar una opción antes de permitir **Agregar**.
	- Para aliados de venta directa, en lugar de combos se muestran carruseles
		con productos relacionados configurados por aliado/categoría.

### 4. Carrito global y canasta

- Provider principal: `lib/providers/cart_provider.dart`.
	- Modelo `CartItem` y estado `CartState` con operaciones de agregar,
		incrementar/decrementar cantidad, eliminar y vaciar la canasta.
	- Los ítems se fusionan por producto y `unitPrice` para evitar líneas
		duplicadas.
- UI reutilizable de canasta: `lib/widgets/cart_summary_footer.dart`.
	- `CartSummaryFooter`: footer clásico con **"Total canasta"** y botón
		**"Ir a canasta"**, usado en pantallas de compra (por ejemplo,
		`AllyDetailScreen`) cuando hay productos en el carrito.
	- `CartSummaryPill`: píldora flotante **"Ver canasta"** que se muestra por
		ejemplo en `HomeScreen` sobre el `BottomNavigationBar` cuando el carrito
		no está vacío.
- Pantalla de canasta: `lib/screens/cart/cart_screen.dart`.
	- Lista todos los productos agregados, permite ajustar cantidades y
		eliminar ítems.
	- Muestra un total general y un botón **"Continuar"**, preparado para
		conectarse al flujo de checkout/pagos.

### 5. Flujo resumido por aliado (frontend)

1. El usuario toca un módulo principal (por ejemplo, Alimentos) y luego un
	submódulo (por ejemplo, Restaurantes o Farmacias).
2. Se abre una `NearbyPlacesScreen` con la lista de aliados cercanos para ese
	submódulo.
3. Al tocar un aliado, se navega a `AllyDetailScreen`, que muestra sus
	categorías de productos.
4. Al tocar un producto, se abre `ProductDetailScreen` con combos o
	relacionados según el tipo de aliado.
5. El usuario toca **"Agregar"**, el ítem se suma al carrito global y la app
	vuelve automáticamente al detalle del aliado.
6. Desde el footer o la píldora de canasta, el usuario puede ir a
	`CartScreen` para revisar/editar su pedido y, más adelante, continuar al
	checkout.

## Notas para backend

## Realtime SSE para solicitudes

- Cliente SSE: `lib/services/realtime_events_service.dart`.
- Pantallas suscritas:
  - `lib/screens/account/my_booking_requests_screen.dart`
  - `lib/screens/account/my_realtime_requests_screen.dart`
- Endpoint backend consumido: `GET /events/stream` con header `Authorization: Bearer <jwt>`.
- Cuando llega un evento de estado (`booking_request.status_changed` o `realtime_request.status_changed`), la pantalla hace refresh automático con debounce.
- Si el stream cae, el cliente intenta reconectar automáticamente cada 3 segundos.
- Si no hay stream disponible, el flujo manual sigue funcionando con pull-to-refresh.

- Para el **flujo por categoría**:
	- Asegúrate de que cada producto que quieras mostrar en un submódulo tenga
		el campo `category` con una de las claves definidas en los submódulos.
	- Puedes añadir nuevas categorías sin cambiar la lógica de negocio:
		- Agrega la clave en el backend.
		- Crea un nuevo submódulo en la pantalla correspondiente usando esa clave.
- Para el **flujo por aliados**:
	- Los endpoints de `Aliados` deben exponer, al menos:
		- Datos básicos del aliado (`nombre_comercial`, `estado`,
			`zonas_atencion`, `horario_operacion`, métodos de pago).
		- Listas de categorías y productos por aliado, que se mapearán a las
			categorías internas de `AllyDetailScreen`.
	- El campo `horario_operacion` debe permitir calcular si el aliado está
		abierto o cerrado para poblar `_isAllyOpen` en el frontend.
	- Los productos podrán incluir metadata para:
		- Definir si admiten combos de bebida/adiciones.
		- Configurar productos relacionados por categoría/aliado, usados en el
			detalle cuando sea un aliado de venta directa.
