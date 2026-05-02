import {
  ArrowRight,
  BadgeCheck,
  BriefcaseBusiness,
  ChevronRight,
  Code2,
  Github,
  Globe,
  Layers3,
  Linkedin,
  Mail,
  MonitorSmartphone,
  Phone,
  Sparkles,
  Star,
} from 'lucide-react';

const contact = {
  whatsapp: '573159408253',
  whatsappLabel: '315 940 8253',
  email: 'ellenderdev@gmail.com',
  github: 'https://github.com/Ellenderwkast',
  linkedin: 'https://www.linkedin.com/in/ellender-castillo-rincon-9b5552407/',
};

const stats = [
  { value: 'Web + Mobile', label: 'Soluciones completas para negocio digital' },
  { value: 'UI con impacto', label: 'Interfaces orientadas a conversión y confianza' },
  { value: 'Entrega real', label: 'Productos pensados para salir a producción' },
];

const services = [
  {
    icon: Globe,
    title: 'Desarrollo web profesional',
    description:
      'Sitios, plataformas administrativas y experiencias frontend con enfoque comercial, rendimiento y escalabilidad.',
  },
  {
    icon: MonitorSmartphone,
    title: 'Apps móviles con visión de producto',
    description:
      'Aplicaciones móviles útiles, modernas y listas para crecer con lógica de negocio, catálogos, flujos de compra y operación.',
  },
  {
    icon: Layers3,
    title: 'Sistemas a medida',
    description:
      'Soluciones que conectan frontend, backend y operación del negocio para reducir fricción y mejorar control.',
  },
];

const projects = [
  {
    name: 'Open App Comunitaria',
    type: 'App móvil tipo delivery y servicios',
    summary:
      'Aplicación móvil construida en Flutter con home modular, búsqueda, categorías, aliados cercanos, carrito global y experiencia de compra por contexto.',
    impact: 'Integra alimentos, salud, transporte, mascotas y servicios en una sola experiencia móvil.',
    stack: ['Flutter', 'Arquitectura modular', 'Catálogos por categoría', 'Carrito global'],
    cover: '/assets/open/open-home.png',
    coverMode: 'contain',
    gallery: ['/assets/open/open-1.png', '/assets/open/open-2.png', '/assets/open/open-3.png'],
  },
  {
    name: 'Karell Premium E-Commerce',
    type: 'Tienda online con UX comercial',
    summary:
      'Frontend en React y Vite para comercio electrónico con catálogo dinámico, autenticación, carrito persistente y flujo de checkout listo para producción.',
    impact: 'Pensado para vender más con una navegación clara y una interfaz moderna enfocada en productos.',
    stack: ['React', 'Vite', 'Zustand', 'Axios', 'Responsive UI'],
    cover: '/assets/ecommerce/ecommerce-1.png',
    coverMode: 'contain',
    coverFrame: 'wide',
    galleryMode: 'contain',
    galleryFrame: 'wide',
    gallery: [
      '/assets/ecommerce/ecommerce-1.png',
      '/assets/ecommerce/ecommerce-2.png',
      '/assets/ecommerce/ecommerce-3.png',
    ],
  },
  {
    name: 'CRM Gym Cast Fit',
    type: 'Sistema empresarial para gimnasios',
    summary:
      'Plataforma integral para la gestión de múltiples gimnasios con backend REST, frontend web en React y aplicación móvil para la operación diaria.',
    impact: 'Centraliza acceso, operación y control en un entorno con identidad visual fuerte y experiencia profesional.',
    stack: ['Node.js', 'Express', 'React', 'Vite', 'React Native'],
    cover: '/assets/crm/crm-1.png',
    coverMode: 'contain',
    coverFrame: 'wide',
    galleryMode: 'contain',
    galleryFrame: 'wide',
    gallery: ['/assets/crm/crm-1.png', '/assets/crm/crm-2.png'],
  },
];

const process = [
  'Entiendo el objetivo comercial y la necesidad real del producto.',
  'Diseño una experiencia clara, moderna y lista para usuarios reales.',
  'Desarrollo soluciones sólidas con foco en rendimiento y mantenimiento.',
  'Entrego un producto presentable, escalable y preparado para evolucionar.',
];

function App() {
  const whatsappHref = `https://wa.me/${contact.whatsapp}?text=${encodeURIComponent(
    'Hola Ellender Dev, quiero cotizar un proyecto de software.',
  )}`;

  return (
    <div className="page-shell">
      <div className="ambient ambient-left" />
      <div className="ambient ambient-right" />

      <header className="topbar">
        <a className="brand" href="#inicio" aria-label="Ir al inicio">
          <span className="brand-mark">ED</span>
          <span className="brand-copy">
            <strong>Ellender Dev</strong>
            <small>Software Developer</small>
          </span>
        </a>

        <nav className="nav-links">
          <a href="#proyectos">Proyectos</a>
          <a href="#servicios">Servicios</a>
          <a href="#contacto">Contacto</a>
        </nav>

        <a className="cta-button ghost" href={contact.github} target="_blank" rel="noreferrer">
          <Github size={18} />
          GitHub
        </a>
      </header>

      <main>
        <section className="hero" id="inicio">
          <div className="hero-copy">
            <span className="eyebrow">
              <Sparkles size={16} />
              Desarrollo con visión comercial
            </span>

            <h1>
              <span className="headline-line">Construyo software</span>
              <span className="headline-line">que hace ver tu marca</span>
              <span className="headline-line">seria, moderna</span>
              <span className="headline-line">y lista para vender.</span>
            </h1>

            <p className="hero-description">
              Soy Ellender Dev. Desarrollo experiencias web, aplicaciones móviles y
              sistemas a medida con una presentación visual fuerte y una ejecución pensada
              para negocio real.
            </p>

            <div className="hero-actions">
              <a className="cta-button primary" href={whatsappHref} target="_blank" rel="noreferrer">
                <Phone size={18} />
                Contactar por WhatsApp
              </a>
              <a className="cta-button secondary" href="#proyectos">
                Ver proyectos destacados
                <ArrowRight size={18} />
              </a>
            </div>

            <div className="hero-highlights">
              {stats.map((item) => (
                <article className="metric-card" key={item.value}>
                  <strong>{item.value}</strong>
                  <span>{item.label}</span>
                </article>
              ))}
            </div>
          </div>

          <div className="hero-visual">
            <div className="hero-orbit hero-orbit-a" />
            <div className="hero-orbit hero-orbit-b" />

            <article className="identity-card card-3d">
              <div className="identity-shine" />
              <img src="/assets/profile/mi-imagen.jpeg" alt="Ellender Dev" />
              <div className="identity-overlay">
                <span>Marca personal</span>
                <h2>Ellender Dev</h2>
                <p>Desarrollo de software con estética premium y enfoque profesional.</p>
              </div>
            </article>

            <article className="floating-badge top card-3d">
              <BadgeCheck size={18} />
              <span>Disponible para proyectos</span>
            </article>

            <article className="floating-badge bottom card-3d">
              <Code2 size={18} />
              <span>Web, móvil y sistemas de gestión</span>
            </article>
          </div>
        </section>

        <section className="section intro-strip">
          <div className="section-heading compact">
            <span className="eyebrow">Posicionamiento</span>
            <h2>Más que páginas bonitas: soluciones que transmiten valor, orden y confianza.</h2>
          </div>

          <div className="intro-grid">
            <article className="glass-panel">
              <BriefcaseBusiness size={22} />
              <h3>Presencia profesional</h3>
              <p>
                Diseño interfaces que ayudan a que una marca se perciba sólida, moderna y bien construida.
              </p>
            </article>
            <article className="glass-panel">
              <Layers3 size={22} />
              <h3>Producto integral</h3>
              <p>
                Puedo construir desde landing pages y dashboards hasta apps móviles y sistemas conectados.
              </p>
            </article>
            <article className="glass-panel">
              <Star size={22} />
              <h3>Enfoque comercial</h3>
              <p>
                Cada decisión visual y técnica busca que el producto venda mejor y genere confianza inmediata.
              </p>
            </article>
          </div>
        </section>

        <section className="section" id="proyectos">
          <div className="section-heading">
            <span className="eyebrow">Proyectos destacados</span>
            <h2>Casos que muestran rango técnico, criterio visual y capacidad de ejecución.</h2>
            <p>
              Estas piezas representan desarrollo real en comercio electrónico, sistemas empresariales y aplicaciones móviles orientadas a usuarios finales.
            </p>
          </div>

          <div className="projects-list">
            {projects.map((project, index) => (
              <article className="project-card" key={project.name}>
                <div className="project-copy">
                  <span className="project-index">0{index + 1}</span>
                  <span className="project-type">{project.type}</span>
                  <h3>{project.name}</h3>
                  <p>{project.summary}</p>
                  <div className="project-impact">
                    <strong>Valor del proyecto</strong>
                    <span>{project.impact}</span>
                  </div>
                  <div className="tech-tags">
                    {project.stack.map((tag) => (
                      <span key={tag}>{tag}</span>
                    ))}
                  </div>
                </div>

                <div className="project-visual">
                  <div
                    className={`project-cover-wrap card-3d${project.coverFrame ? ` project-cover-wrap--${project.coverFrame}` : ''}`}
                  >
                    <img
                      src={project.cover}
                      alt={project.name}
                      className={`project-cover${project.coverMode ? ` project-cover--${project.coverMode}` : ''}`}
                    />
                  </div>
                  <div className="project-gallery">
                    {project.gallery.map((image, galleryIndex) => (
                      <div
                        className={`gallery-shot${project.galleryFrame ? ` gallery-shot--${project.galleryFrame}` : ''}`}
                        key={`${project.name}-${galleryIndex}`}
                      >
                        <img
                          src={image}
                          alt={`${project.name} captura ${galleryIndex + 1}`}
                          className={project.galleryMode ? `gallery-image--${project.galleryMode}` : undefined}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="section" id="servicios">
          <div className="section-heading">
            <span className="eyebrow">Servicios</span>
            <h2>Trabajo para empresas, marcas personales y negocios que necesitan software con presencia.</h2>
          </div>

          <div className="services-grid">
            {services.map((service) => {
              const Icon = service.icon;
              return (
                <article className="service-card card-3d" key={service.title}>
                  <div className="service-icon">
                    <Icon size={22} />
                  </div>
                  <h3>{service.title}</h3>
                  <p>{service.description}</p>
                </article>
              );
            })}
          </div>
        </section>

        <section className="section process-section">
          <div className="section-heading">
            <span className="eyebrow">Cómo trabajo</span>
            <h2>Un proceso simple para convertir una necesidad en un producto que se puede mostrar con orgullo.</h2>
          </div>

          <div className="process-grid">
            {process.map((item, index) => (
              <article className="process-step" key={item}>
                <span>0{index + 1}</span>
                <p>{item}</p>
                <ChevronRight size={18} />
              </article>
            ))}
          </div>
        </section>

        <section className="section contact-section" id="contacto">
          <div className="contact-card">
            <div>
              <span className="eyebrow">Contacto directo</span>
              <h2>Si quieres un producto serio, atractivo y listo para representar tu negocio, conversemos.</h2>
              <p>
                Estoy disponible para construir landing pages, sistemas administrativos, e-commerce, apps móviles y soluciones personalizadas.
              </p>
            </div>

            <div className="contact-actions">
              <a className="contact-link" href={whatsappHref} target="_blank" rel="noreferrer">
                <Phone size={18} />
                WhatsApp: {contact.whatsappLabel}
              </a>
              <a className="contact-link" href={`mailto:${contact.email}`}>
                <Mail size={18} />
                {contact.email}
              </a>
              <a className="contact-link" href={contact.github} target="_blank" rel="noreferrer">
                <Github size={18} />
                GitHub
              </a>
              <a className="contact-link" href={contact.linkedin} target="_blank" rel="noreferrer">
                <Linkedin size={18} />
                LinkedIn
              </a>
            </div>
          </div>
        </section>
      </main>

      <a className="whatsapp-float" href={whatsappHref} target="_blank" rel="noreferrer">
        <Phone size={18} />
        Hablemos
      </a>
    </div>
  );
}

export default App;