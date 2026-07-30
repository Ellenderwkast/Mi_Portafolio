import { copyFileSync, mkdirSync, readdirSync, statSync, writeFileSync } from 'node:fs';
import { dirname, extname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const rootDir = resolve(dirname(fileURLToPath(import.meta.url)), '..');

const projectsRoot = resolve(rootDir, 'Imagenes de todos mis proyectos actual');
const publicProjectsRoot = resolve(rootDir, 'public/assets/projects');

const PROJECTS_CONFIG = {
  Ecomerce: {
    id: 'ecomerce',
    title: 'Ecommerce',
    tagline: 'Venta digital con administracion completa',
    platform: 'Tienda web + panel administrativo',
    segment: 'venta',
    segmentLabel: 'Venta digital',
    frame: 'desktop',
    shortSummary: 'Compra, pago y gestion en una sola experiencia.',
    summary: 'Tienda enfocada en conversion y administracion clara de pedidos.',
    outcome: 'Flujo de compra mas claro y gestion comercial ordenada.',
    highlights: ['Catalogo visual', 'Carrito y checkout', 'Pagos integrados', 'Panel de pedidos'],
    liveUrl: 'https://www.karellpremium.com.co',
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
    platform: 'App Android',
    segment: 'apps',
    segmentLabel: 'Apps y plataformas',
    frame: 'mobile',
    shortSummary: 'Servicios cercanos, chat y pagos desde Android.',
    summary: 'Marketplace local para descubrir, pedir y pagar servicios.',
    outcome: 'Experiencia de uso directa para compra y coordinacion.',
    highlights: ['Home por categorias', 'Chat con aliados', 'Pedidos y pagos', 'Panel admin'],
    liveUrl: 'https://play.google.com/store/apps/details?id=com.open1x.app&pcampaignid=web_share',
    preferredOrder: ['home', 'menu', 'chat', 'gestion de productos', 'gestion de pedidos', 'gestion de pagos', 'panel admin avanzado', 'panel admin', 'cuenta de usuario', 'login'],
  },
  'Open servicios cerca de ti - Apple': {
    id: 'open-apple',
    title: 'Open servicios cerca de ti - Apple',
    tagline: 'Marketplace local para iPhone',
    platform: 'App iPhone',
    segment: 'apps',
    segmentLabel: 'Apps y plataformas',
    frame: 'mobile',
    shortSummary: 'Servicios locales y compras en iPhone.',
    summary: 'Version iOS de Open con enfoque en fluidez y claridad.',
    outcome: 'Navegacion premium para uso diario.',
    highlights: ['Home y menu', 'Chat fluido', 'Gestion de pagos', 'Panel admin'],
    liveUrl: 'https://apps.apple.com/co/app/open-servicios-cerca-de-ti/id6769672984?l=en-GB',
    preferredOrder: ['home', 'menu', 'chat', 'gestion de productos', 'gestion de pedidos', 'gestion de pagos', 'panel admin avanzado', 'panel admin', 'cuenta de usuario', 'login'],
  },
  'Sistema de inventario': {
    id: 'sistema-inventario',
    title: 'Sistema de inventario',
    tagline: 'Control comercial con modo claro y oscuro',
    platform: 'Sistema web',
    segment: 'gestion',
    segmentLabel: 'Gestion y operacion',
    frame: 'desktop',
    shortSummary: 'Inventario, clientes y reportes en control.',
    summary: 'Herramienta para stock, clientes y proveedores.',
    outcome: 'Operacion comercial mas estable y visible.',
    highlights: ['Dashboard', 'Productos y stock', 'Clientes y proveedores', 'Reportes'],
    liveUrl: 'https://sistema-de-inventario-silk.vercel.app/',
    preferredOrder: ['dashboard', 'productos', 'clientes', 'proveedores', 'remision', 'reportes', 'login'],
  },
  'TumaGo - Android': {
    id: 'tumago-android',
    title: 'TumaGo - Android',
    tagline: 'Movilidad urbana desde Android',
    platform: 'App Android',
    segment: 'movilidad',
    segmentLabel: 'Movilidad y reservas',
    frame: 'mobile',
    shortSummary: 'Solicitar viaje y seguir ruta en tiempo real.',
    summary: 'App para pedir transporte con flujo guiado.',
    outcome: 'Viajes mas claros desde el primer paso.',
    highlights: ['Mapa en vivo', 'Recogida y destino', 'Chat', 'Modo claro y oscuro'],
    liveUrl: 'https://play.google.com/store/apps/details?id=com.TumaGo.app&pcampaignid=web_share',
    preferredOrder: ['modo claro', 'recogida y destino', 'mapa', 'modo oscuro', 'chat', 'sidebar', 'login', 'arranque'],
  },
  'TumaGo -Apple': {
    id: 'tumago-apple',
    title: 'TumaGo - Apple',
    tagline: 'Movilidad urbana para iPhone',
    platform: 'App iPhone',
    segment: 'movilidad',
    segmentLabel: 'Movilidad y reservas',
    frame: 'mobile',
    shortSummary: 'Reserva y seguimiento de viaje en iPhone.',
    summary: 'Version iOS de TumaGo para movilidad urbana.',
    outcome: 'Experiencia agil para trayectos frecuentes.',
    highlights: ['Mapa en vivo', 'Destino guiado', 'Chat', 'Modo claro y oscuro'],
    liveUrl: 'https://apps.apple.com/co/app/tumago/id6786550336?l=en-GB',
    preferredOrder: ['modo claro', 'recogida y destino', 'mapa', 'modo oscuro', 'chat', 'sidebar', 'login', 'arranque'],
  },
  'CRM Gimnassio': {
    id: 'crm-gimnasio',
    title: 'CRM gimnasio',
    tagline: 'Operacion y control para centros fitness',
    platform: 'Web + app operativa',
    segment: 'gestion',
    segmentLabel: 'Gestion y operacion',
    frame: 'desktop',
    shortSummary: 'Clientes, membresias y caja en un flujo central.',
    summary: 'Sistema para operacion diaria de gimnasios.',
    outcome: 'Procesos internos mas consistentes y medibles.',
    highlights: ['Clientes y membresias', 'Cobros y caja', 'Control de acceso', 'Comunicacion'],
    liveUrl: 'https://github.com/Ellenderwkast',
    preferredOrder: ['dashboard', 'dahboard', 'gestion de clientes', 'membresias', 'pago y caja', 'control de acceso', 'comunicacion', 'login'],
  },
};

const PROJECT_ORDER = [
  'ecomerce',
  'open-android',
  'open-apple',
  'sistema-inventario',
  'tumago-android',
  'tumago-apple',
  'crm-gimnasio',
];

const IMAGE_EXTENSIONS = new Set(['.png', '.jpg', '.jpeg', '.webp']);
const explanationMap = [
  ['login', 'Acceso seguro para entrar rapido a la aplicacion y continuar el flujo.'],
  ['arranque', 'Pantalla inicial de marca para comenzar la experiencia con contexto claro.'],
  ['home', 'Pantalla principal con accesos directos a funciones clave del producto.'],
  ['inicio', 'Vista de inicio pensada para ubicar al usuario desde el primer momento.'],
  ['menu', 'Menu principal para navegar modulos y llegar rapido a cada seccion.'],
  ['sidebar', 'Barra lateral para moverse entre opciones sin salir del proceso activo.'],
  ['chat', 'Chat integrado para coordinar solicitudes y resolver dudas en tiempo real.'],
  ['dashboard', 'Dashboard general para revisar indicadores y estado del negocio.'],
  ['dahboard', 'Dashboard general para revisar indicadores y estado del negocio.'],
  ['clientes', 'Modulo de clientes para registrar, consultar y gestionar su informacion.'],
  ['membresias', 'Gestion de membresias para controlar planes, vigencias y renovaciones.'],
  ['control de acceso', 'Control de acceso para validar entradas y seguimiento de actividad.'],
  ['comunicacion', 'Panel de comunicacion para mantener avisos y mensajes centralizados.'],
  ['pago', 'Flujo de pago guiado para cobrar de forma clara y sin friccion.'],
  ['caja', 'Modulo de caja para registrar movimientos y mantener control financiero.'],
  ['productos', 'Panel de productos donde se administra catalogo, stock y disponibilidad.'],
  ['pedidos', 'Gestion de pedidos para visualizar estados y dar seguimiento a entregas.'],
  ['pagos', 'Seccion de pagos para controlar transacciones dentro de la plataforma.'],
  ['panel admin', 'Panel de admin donde el administrador tiene mayor gestion de la aplicacion.'],
  ['cuenta de usuario', 'Cuenta de usuario para editar perfil, datos y preferencias personales.'],
  ['mapa', 'Mapa en tiempo real para ubicar rutas y disponibilidad del servicio.'],
  ['recogida y destino', 'Pantalla de recogida y destino para definir el viaje con precision.'],
  ['carrito', 'Carrito de compra para revisar productos antes de confirmar el pedido.'],
  ['checkout', 'Checkout final para confirmar datos y completar la compra en pocos pasos.'],
  ['wompi', 'Integracion Wompi para pagos rapidos con validacion del proceso.'],
  ['nequi', 'Pago con Nequi para finalizar compras de forma simple y conocida.'],
  ['reportes', 'Reportes para analizar resultados y apoyar decisiones operativas.'],
  ['proveedores', 'Gestion de proveedores para controlar abastecimiento y relacion comercial.'],
  ['remision', 'Pantalla de remision para registrar salidas y trazabilidad de inventario.'],
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

  return `Vista de ${projectTitle} con un paso clave del flujo principal de la aplicacion.`;
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

function interleaveTumago(files) {
  const working = [...files];
  const pickupIndex = working.findIndex((name) => slugify(name).includes('recogida-y-destino'));
  let pinnedPickup = null;

  if (pickupIndex !== -1) {
    [pinnedPickup] = working.splice(pickupIndex, 1);
  }

  const light = [];
  const dark = [];
  const neutral = [];

  for (const fileName of working) {
    const normalized = slugify(fileName);

    if (normalized.includes('claro') || normalized.includes('light')) {
      light.push(fileName);
      continue;
    }

    if (normalized.includes('oscuro') || normalized.includes('dark')) {
      dark.push(fileName);
      continue;
    }

    neutral.push(fileName);
  }

  const mixed = [];
  while (light.length || dark.length) {
    if (light.length) {
      mixed.push(light.shift());
    }
    if (dark.length) {
      mixed.push(dark.shift());
    }
  }

  return [
    ...(pinnedPickup ? [pinnedPickup] : []),
    ...mixed,
    ...neutral,
  ];
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

  let orderedFiles = sortByPriority(files, config.preferredOrder);
  if (config.id === 'tumago-android' || config.id === 'tumago-apple') {
    orderedFiles = interleaveTumago(orderedFiles);
  }

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
copyFileSync(resolve(rootDir, 'Mi imagen Ellenderdev/mi imagen.jpeg'), resolve(rootDir, 'public/assets/profile/mi-imagen.jpeg'));

mkdirSync(publicProjectsRoot, { recursive: true });

const projects = collectProjectFolders()
  .map(buildProject)
  .filter(Boolean)
  .sort((left, right) => PROJECT_ORDER.indexOf(left.id) - PROJECT_ORDER.indexOf(right.id));

const manifest = {
  generatedAt: new Date().toISOString(),
  profileImage: '/assets/profile/mi-imagen.jpeg',
  projects,
};

writeFileSync(resolve(publicProjectsRoot, 'manifest.json'), JSON.stringify(manifest, null, 2));

console.log(`Sincronizados ${projects.length} proyectos y ${projects.reduce((total, project) => total + project.slides.length, 0)} imagenes.`);
