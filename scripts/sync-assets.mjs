import { copyFileSync, mkdirSync, readdirSync, statSync, writeFileSync } from 'node:fs';
import { dirname, extname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const rootDir = resolve(dirname(fileURLToPath(import.meta.url)), '..');

const projectsRoot = resolve(rootDir, 'Imagenes de todos mis proyectos actual');
const publicProjectsRoot = resolve(rootDir, 'public/assets/projects');

const PROJECTS_CONFIG = {
  'CRM Gimnassio': {
    id: 'crm-gimnasio',
    title: 'CRM gimnasio',
    tagline: 'Operacion y control para centros fitness',
    audience: 'Ideal para gimnasios que quieren verse mas ordenados y profesionales en su operacion diaria.',
    promise: 'Convierte tareas repetitivas en una rutina mucho mas clara para el equipo y para la administracion.',
    platform: 'Web + app operativa',
    segment: 'gestion',
    segmentLabel: 'Gestion y operacion',
    frame: 'desktop',
    summary:
      'Un sistema para que el gimnasio gestione clientes, planes, pagos y acceso diario sin depender de procesos manuales.',
    outcome:
      'Ayuda a que la operacion se vea ordenada, profesional y mucho mas facil de supervisar.',
    highlights: ['Clientes y membresias', 'Cobros y caja', 'Control de acceso', 'Comunicacion interna'],
    preferredOrder: [
      'dashboard',
      'dahboard',
      'gestion de clientes',
      'membresias',
      'pago y caja',
      'control de acceso',
      'comunicacion',
      'login',
    ],
  },
  Ecomerce: {
    id: 'ecomerce',
    title: 'Ecommerce',
    tagline: 'Venta digital con administracion completa',
    audience: 'Pensado para marcas que quieren vender online con una experiencia clara desde el catalogo hasta el pago.',
    promise: 'Hace que comprar se sienta confiable y que administrar la tienda no se vuelva un caos.',
    platform: 'Tienda web + panel administrativo',
    segment: 'venta',
    segmentLabel: 'Venta digital',
    frame: 'desktop',
    summary:
      'Una tienda pensada para vender con confianza: muestra productos, acompana la compra y deja claro cada paso del pago y el envio.',
    outcome:
      'El cliente compra con tranquilidad y el negocio mantiene control sobre pedidos, stock y logistica.',
    highlights: ['Catalogo visual', 'Carrito y checkout', 'Pagos integrados', 'Panel de pedidos y envios'],
    preferredOrder: [
      'inicio',
      'todos los productos',
      'carrito',
      'checkout',
      'wompi',
      'nequi',
      'panel admin -dashboard',
      'panel admin -productos',
      'panel admin -gestion de pedidos',
      'panel admin -gestion de envio',
    ],
  },
  'Open servicios cerca de ti - Android': {
    id: 'open-android',
    title: 'Open servicios cerca de ti - Android',
    tagline: 'Marketplace local desde Android',
    audience: 'Creado para comunidades y negocios que necesitan reunir servicios cercanos en una sola app.',
    promise: 'Acerca aliados, pedidos y pagos dentro de una experiencia facil de entender para cualquier usuario.',
    platform: 'App Android',
    segment: 'apps',
    segmentLabel: 'Apps y plataformas',
    frame: 'mobile',
    summary:
      'Una app para descubrir servicios cercanos, comprar, pedir, pagar y hablar con aliados desde una sola experiencia.',
    outcome:
      'Le da al usuario una sensacion de cercania, variedad y control en cada paso de la compra o solicitud.',
    highlights: ['Home por categorias', 'Chat con aliados', 'Pedidos y pagos', 'Panel administrativo'],
    preferredOrder: ['home', 'menu', 'chat', 'gestion de productos', 'gestion de pedidos', 'gestion de pagos', 'panel admin avanzado', 'panel admin', 'cuenta de usuario', 'login'],
  },
  'Open servicios cerca de ti - Apple': {
    id: 'open-apple',
    title: 'Open servicios cerca de ti - Apple',
    tagline: 'Marketplace local para iPhone',
    audience: 'Pensado para usuarios de iPhone que buscan resolver compras y servicios locales desde un solo lugar.',
    promise: 'Presenta la misma utilidad de Open con una sensacion mas pulida y premium en iOS.',
    platform: 'App iPhone',
    segment: 'apps',
    segmentLabel: 'Apps y plataformas',
    frame: 'mobile',
    summary:
      'La misma experiencia de servicios cercanos, adaptada para iPhone con un flujo limpio para explorar, conversar y comprar.',
    outcome:
      'Presenta el producto con sensacion premium y una navegacion pensada para uso diario.',
    highlights: ['Home y menu', 'Chat fluido', 'Gestion de pagos', 'Panel admin'],
    preferredOrder: ['home', 'menu', 'chat', 'gestion de productos', 'gestion de pedidos', 'gestion de pagos', 'panel admin avanzado', 'panel admin', 'cuenta de usuario', 'login'],
  },
  'Sistema de inventario': {
    id: 'sistema-inventario',
    title: 'Sistema de inventario',
    tagline: 'Control comercial con modo claro y oscuro',
    audience: 'Hecho para negocios que necesitan controlar stock, clientes y proveedores sin depender de hojas sueltas.',
    promise: 'Pone la operacion comercial en orden y ayuda a revisar rapidamente que entra, que sale y que falta.',
    platform: 'Sistema web',
    segment: 'gestion',
    segmentLabel: 'Gestion y operacion',
    frame: 'desktop',
    summary:
      'Una herramienta para llevar inventario, clientes, proveedores, remisiones y reportes desde un entorno claro y ordenado.',
    outcome:
      'Reduce desorden operativo y hace mucho mas facil revisar movimientos, ventas y disponibilidad.',
    highlights: ['Dashboard', 'Productos y stock', 'Clientes y proveedores', 'Reportes y remisiones'],
    preferredOrder: ['dashboard', 'productos', 'clientes', 'proveedores', 'remision', 'reportes', 'login'],
  },
  'TumaGo - Android': {
    id: 'tumago-android',
    title: 'TumaGo - Android',
    tagline: 'Movilidad urbana desde Android',
    audience: 'Ideal para ciudades o servicios locales que quieren ofrecer una forma simple de pedir transporte.',
    promise: 'Hace que pedir un viaje, ver la ruta y conversar durante el servicio se sienta natural y rapido.',
    platform: 'App Android',
    segment: 'movilidad',
    segmentLabel: 'Movilidad y reservas',
    frame: 'mobile',
    summary:
      'Una app para pedir transporte, ver el mapa en tiempo real, indicar recogida y destino y conversar durante el servicio.',
    outcome:
      'Hace que pedir un viaje se sienta simple, cercano y confiable desde el primer toque.',
    highlights: ['Mapa en vivo', 'Recogida y destino', 'Chat', 'Experiencia clara y oscura'],
    preferredOrder: ['arranque', 'mapa', 'recogida y destino', 'chat', 'sidebar', 'login'],
  },
  'TumaGo -Apple': {
    id: 'tumago-apple',
    title: 'TumaGo - Apple',
    tagline: 'Movilidad urbana para iPhone',
    audience: 'Pensado para usuarios iPhone que esperan una experiencia de movilidad limpia, directa y confiable.',
    promise: 'Combina mapa, viaje y comunicacion en una experiencia agil que se entiende desde el primer uso.',
    platform: 'App iPhone',
    segment: 'movilidad',
    segmentLabel: 'Movilidad y reservas',
    frame: 'mobile',
    summary:
      'La experiencia de TumaGo adaptada a iPhone para pedir viajes, seguir rutas y mantener la conversacion activa durante el trayecto.',
    outcome:
      'El producto transmite agilidad y confianza, con una interfaz pensada para uso rapido y frecuente.',
    highlights: ['Mapa en vivo', 'Destino guiado', 'Chat', 'Diseño claro y oscuro'],
    preferredOrder: ['arranque', 'mapa', 'recogida y destino', 'chat', 'sidebar', 'login'],
  },
};

const IMAGE_EXTENSIONS = new Set(['.png', '.jpg', '.jpeg', '.webp']);
const explanationMap = [
  ['login', 'Pantalla de acceso pensada para que entrar al producto sea rapido, claro y confiable.'],
  ['arranque', 'Primer contacto visual con la marca para que la experiencia arranque con identidad y orden.'],
  ['home', 'Vista principal donde el usuario entiende de inmediato que puede hacer y por donde empezar.'],
  ['inicio', 'Pantalla de bienvenida enfocada en mostrar valor desde los primeros segundos.'],
  ['menu', 'Navegacion resumida para encontrar funciones importantes sin perder tiempo.'],
  ['sidebar', 'Acceso lateral a funciones clave para moverse por la app con naturalidad.'],
  ['chat', 'Espacio de conversacion para resolver dudas o coordinar acciones sin salir del flujo.'],
  ['dashboard', 'Resumen visual de lo mas importante para revisar el estado del negocio de un vistazo.'],
  ['dahboard', 'Resumen visual de lo mas importante para revisar el estado del negocio de un vistazo.'],
  ['clientes', 'Modulo pensado para organizar clientes y atenderlos con mas continuidad y control.'],
  ['membresias', 'Seccion donde los planes se presentan de forma ordenada para vender y administrar mejor.'],
  ['control de acceso', 'Vista que ayuda a validar entradas y mantener el acceso al servicio bajo control.'],
  ['aliado', 'Pantalla que presenta al aliado o proveedor para que el usuario entienda con quien esta interactuando.'],
  ['comunicacion', 'Pantalla para mantener el contacto operativo dentro del sistema de manera simple.'],
  ['pago', 'Flujo pensado para que cobros y movimientos se entiendan sin friccion.'],
  ['caja', 'Area de caja que concentra pagos y movimientos para trabajar con mas seguridad.'],
  ['productos', 'Catalogo o gestion de productos para revisar oferta, stock y detalle con claridad.'],
  ['pedidos', 'Seguimiento visual de pedidos para saber que esta pasando en cada momento.'],
  ['pagos', 'Pantalla donde el proceso de pago se vuelve claro y facil de completar.'],
  ['panel admin avanzado', 'Vista administrativa avanzada para tomar decisiones y controlar mas detalles del negocio.'],
  ['panel admin', 'Centro de administracion para organizar tareas, contenidos y operacion diaria.'],
  ['cuenta de usuario', 'Espacio personal del usuario para revisar su informacion y mantener control sobre su experiencia.'],
  ['mapa', 'Vista en tiempo real para ubicarse mejor y tomar decisiones con rapidez y confianza.'],
  ['recogida y destino', 'Paso guiado para indicar origen y destino con menos friccion y mas claridad.'],
  ['carrito', 'Resumen de compra pensado para revisar todo antes de confirmar el pedido.'],
  ['checkout', 'Ultimo paso de compra, diseñado para que pagar sea facil y sin dudas.'],
  ['wompi', 'Integracion de pago presentada de forma clara para generar confianza al momento de finalizar la compra.'],
  ['nequi', 'Metodo de pago familiar para que el usuario complete la compra con tranquilidad.'],
  ['usuarios', 'Vista para administrar cuentas y mantener el entorno del producto bien organizado.'],
  ['envio', 'Seccion que ayuda a coordinar entregas y mantener la logistica bajo control.'],
  ['transportadora', 'Vista que organiza la logistica de entrega para que el pedido siga un camino claro hasta el cliente.'],
  ['despacho', 'Pantalla para coordinar la salida del pedido y reducir errores al momento de entregarlo.'],
  ['historial', 'Registro visual para revisar movimientos anteriores y mantener trazabilidad de lo que ya paso.'],
  ['solicitudes', 'Panel pensado para atender solicitudes puntuales sin perder seguimiento ni contexto.'],
  ['blog', 'Espacio editorial para fortalecer la marca y dar contexto al producto.'],
  ['reportes', 'Vista de analisis para revisar resultados y tomar decisiones con mas criterio.'],
  ['proveedores', 'Modulo que organiza proveedores y mejora el seguimiento del abastecimiento.'],
  ['remision', 'Pantalla para registrar movimientos de mercancia con orden y trazabilidad.'],
];

function slugify(value) {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-zA-Z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .toLowerCase();
}

function toLabel(fileName) {
  return fileName
    .replace(extname(fileName), '')
    .replace(/[_-]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function explainSlide(label, projectTitle) {
  const normalized = slugify(label).replace(/-/g, ' ');

  for (const [keyword, explanation] of explanationMap) {
    if (normalized.includes(keyword)) {
      return explanation;
    }
  }

  return `Vista real de ${projectTitle} que deja ver como se siente el producto en uso y que tipo de experiencia recibe la persona al interactuar con el sistema.`;
}

function sortByPriority(files, preferredOrder) {
  return [...files].sort((left, right) => {
    const leftLabel = slugify(left);
    const rightLabel = slugify(right);
    const leftRank = preferredOrder.findIndex((keyword) => leftLabel.includes(slugify(keyword)));
    const rightRank = preferredOrder.findIndex((keyword) => rightLabel.includes(slugify(keyword)));
    const normalizedLeftRank = leftRank === -1 ? preferredOrder.length : leftRank;
    const normalizedRightRank = rightRank === -1 ? preferredOrder.length : rightRank;

    if (normalizedLeftRank !== normalizedRightRank) {
      return normalizedLeftRank - normalizedRightRank;
    }

    return left.localeCompare(right, 'es', { sensitivity: 'base' });
  });
}

function collectProjectFolders() {
  return readdirSync(projectsRoot).filter((entry) => statSync(join(projectsRoot, entry)).isDirectory());
}

function buildProject(folderName) {
  const config = PROJECTS_CONFIG[folderName];

  if (!config) {
    return null;
  }

  const folderPath = join(projectsRoot, folderName);
  const files = readdirSync(folderPath).filter((fileName) => IMAGE_EXTENSIONS.has(extname(fileName).toLowerCase()));
  const orderedFiles = sortByPriority(files, config.preferredOrder);
  const projectOutputDir = resolve(publicProjectsRoot, config.id);

  mkdirSync(projectOutputDir, { recursive: true });

  const slides = orderedFiles.map((fileName, index) => {
    const sourcePath = join(folderPath, fileName);
    const safeName = `${String(index + 1).padStart(2, '0')}-${slugify(fileName.replace(extname(fileName), ''))}${extname(fileName).toLowerCase()}`;
    const targetPath = join(projectOutputDir, safeName);
    const publicPath = `/assets/projects/${config.id}/${safeName}`;

    copyFileSync(sourcePath, targetPath);

    const title = toLabel(fileName);

    return {
      id: `${config.id}-${index + 1}`,
      title,
      explanation: explainSlide(title, config.title),
      src: publicPath,
      frame: config.frame,
    };
  });

  return {
    ...config,
    cover: slides[0]?.src ?? '',
    slides,
  };
}

mkdirSync(resolve(rootDir, 'public/assets/profile'), { recursive: true });
copyFileSync(
  resolve(rootDir, 'Mi imagen Ellenderdev/mi imagen.jpeg'),
  resolve(rootDir, 'public/assets/profile/mi-imagen.jpeg'),
);

mkdirSync(publicProjectsRoot, { recursive: true });

const projects = collectProjectFolders()
  .map(buildProject)
  .filter(Boolean)
  .sort((left, right) => {
    const desiredOrder = Object.values(PROJECTS_CONFIG).map((project) => project.id);
    return desiredOrder.indexOf(left.id) - desiredOrder.indexOf(right.id);
  });

const manifest = {
  generatedAt: new Date().toISOString(),
  profileImage: '/assets/profile/mi-imagen.jpeg',
  projects,
};

writeFileSync(resolve(publicProjectsRoot, 'manifest.json'), JSON.stringify(manifest, null, 2));

console.log(`Sincronizados ${projects.length} proyectos y ${projects.reduce((total, project) => total + project.slides.length, 0)} imagenes.`);