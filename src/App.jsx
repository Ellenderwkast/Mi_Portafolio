import { useEffect, useMemo, useRef, useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  BriefcaseBusiness,
  Github,
  Layers3,
  Linkedin,
  Mail,
  MapPinned,
  MonitorSmartphone,
  Phone,
  Sparkles,
} from 'lucide-react';

const contact = {
  whatsapp: '573159408253',
  whatsappLabel: '315 940 8253',
  email: 'ellenderdev@gmail.com',
  github: 'https://github.com/Ellenderwkast',
  linkedin: 'https://www.linkedin.com/in/ellender-castillo-rincon-9b5552407/',
};

const filters = [
  { id: 'all', label: 'Todos' },
  { id: 'gestion', label: 'Gestion y operacion' },
  { id: 'venta', label: 'Venta digital' },
  { id: 'apps', label: 'Apps y plataformas' },
  { id: 'movilidad', label: 'Movilidad y reservas' },
];

const studioNotes = [
  {
    icon: BriefcaseBusiness,
    title: 'Claridad visual',
    description: 'Cada producto se entiende rapido.',
  },
  {
    icon: MonitorSmartphone,
    title: 'Pantallas reales',
    description: 'Sin renders falsos ni decoracion innecesaria.',
  },
  {
    icon: Layers3,
    title: 'Formato correcto',
    description: 'Web y mobile con marcos distintos.',
  },
];

const fallbackCatalog = {
  generatedAt: null,
  profileImage: '/assets/profile/mi-imagen.jpeg',
  projects: [],
};

function ProjectCard({ project }) {
  const [activeSlide, setActiveSlide] = useState(0);
  const touchStart = useRef(0);
  const touchEnd = useRef(0);
  const slides = project.slides ?? [];
  const currentSlide = slides[activeSlide] ?? null;
  const previousSlide = slides[(activeSlide - 1 + slides.length) % slides.length] ?? null;
  const nextSlide = slides[(activeSlide + 1) % slides.length] ?? null;

  useEffect(() => {
    setActiveSlide(0);
  }, [project.id]);

  const goToPrevious = () => {
    setActiveSlide((current) => (current === 0 ? slides.length - 1 : current - 1));
  };

  const goToNext = () => {
    setActiveSlide((current) => (current === slides.length - 1 ? 0 : current + 1));
  };

  const handleTouchStart = (event) => {
    touchStart.current = event.changedTouches[0].clientX;
  };

  const handleTouchEnd = (event) => {
    touchEnd.current = event.changedTouches[0].clientX;
    const delta = touchStart.current - touchEnd.current;

    if (Math.abs(delta) < 50) {
      return;
    }

    if (delta > 0) {
      goToNext();
      return;
    }

    goToPrevious();
  };

  if (!currentSlide) {
    return null;
  }

  return (
    <article className="project-card" id={project.id}>
      <div className="project-copy">
        <div className="project-kicker-row">
          <span className="project-badge">{project.segmentLabel}</span>
          <span className="project-platform">{project.platform}</span>
        </div>

        <div className="project-heading-block">
          <h3>{project.title}</h3>
          <p className="project-tagline">{project.tagline}</p>
        </div>

        <p className="project-summary">{project.summary}</p>

        <div className="project-story-box">
          <span className="story-label">Lo que esta viendo la persona</span>
          <strong>{currentSlide.title}</strong>
          <p>{currentSlide.explanation}</p>
        </div>

        <div className="project-highlights">
          {project.highlights.slice(0, 3).map((highlight) => (
            <span key={highlight}>{highlight}</span>
          ))}
        </div>

        <div className="project-outcome">
          <span>Valor</span>
          <p>{project.outcome}</p>
        </div>
      </div>

      <div className="project-viewer">
        <div className="viewer-topbar">
          <div>
            <span className="viewer-label">Galeria guiada</span>
            <p>
              {activeSlide + 1} / {slides.length}
            </p>
          </div>

          <div className="viewer-nav">
            <button type="button" className="viewer-arrow" onClick={goToPrevious} aria-label={`Ver imagen anterior de ${project.title}`}>
              <ArrowLeft size={18} />
            </button>
            <button type="button" className="viewer-arrow" onClick={goToNext} aria-label={`Ver imagen siguiente de ${project.title}`}>
              <ArrowRight size={18} />
            </button>
          </div>
        </div>

        <div
          className={`viewer-stage viewer-stage--${project.frame}`}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {previousSlide ? (
            <button
              type="button"
              className={`frame-peek frame-peek--left frame-peek--${project.frame}`}
              onClick={goToPrevious}
              aria-label={`Ir a la imagen anterior de ${project.title}`}
            >
              <div className={`frame-shell frame-shell--${project.frame}`}>
                <img src={previousSlide.src} alt="" aria-hidden="true" />
              </div>
            </button>
          ) : null}

          <div className={`frame-shell frame-shell--${project.frame} frame-shell--current`} key={currentSlide.id}>
            <img src={currentSlide.src} alt={`${project.title} - ${currentSlide.title}`} />
          </div>

          {nextSlide ? (
            <button
              type="button"
              className={`frame-peek frame-peek--right frame-peek--${project.frame}`}
              onClick={goToNext}
              aria-label={`Ir a la imagen siguiente de ${project.title}`}
            >
              <div className={`frame-shell frame-shell--${project.frame}`}>
                <img src={nextSlide.src} alt="" aria-hidden="true" />
              </div>
            </button>
          ) : null}
        </div>

        <div className="viewer-footer">
          <div className="viewer-slide-copy">
            <strong>{currentSlide.title}</strong>
            <span>Desliza o usa las flechas para seguir viendo el proyecto.</span>
          </div>

          <div className="viewer-dots" aria-label={`Progreso del proyecto ${project.title}`}>
          {slides.map((slide, index) => (
            <button
              type="button"
              key={slide.id}
              className={`viewer-dot${index === activeSlide ? ' is-active' : ''}`}
              onClick={() => setActiveSlide(index)}
              aria-label={`Ver ${slide.title}`}
            />
          ))}
          </div>
        </div>
      </div>
    </article>
  );
}

function App() {
  const [catalog, setCatalog] = useState(fallbackCatalog);
  const [loadState, setLoadState] = useState('loading');
  const [activeFilter, setActiveFilter] = useState('all');
  const whatsappHref = `https://wa.me/${contact.whatsapp}?text=${encodeURIComponent(
    'Hola Ellender Dev, quiero cotizar un proyecto de software.',
  )}`;

  useEffect(() => {
    let active = true;

    fetch('/assets/projects/manifest.json')
      .then((response) => {
        if (!response.ok) {
          throw new Error('No se pudo cargar el catalogo.');
        }

        return response.json();
      })
      .then((data) => {
        if (!active) {
          return;
        }

        setCatalog(data);
        setLoadState('ready');
      })
      .catch(() => {
        if (!active) {
          return;
        }

        setCatalog(fallbackCatalog);
        setLoadState('error');
      });

    return () => {
      active = false;
    };
  }, []);

  const filteredProjects = useMemo(() => {
    if (activeFilter === 'all') {
      return catalog.projects;
    }

    return catalog.projects.filter((project) => project.segment === activeFilter);
  }, [activeFilter, catalog.projects]);

  const totalSlides = useMemo(
    () => catalog.projects.reduce((total, project) => total + project.slides.length, 0),
    [catalog.projects],
  );

  const stats = [
    { value: `${catalog.projects.length || 7} proyectos`, label: 'Casos reales mostrados con sus pantallas completas' },
    { value: `${totalSlides || 0} vistas`, label: 'Galeria compacta con explicacion de cada imagen' },
    { value: 'Web + mobile', label: 'Presentacion adaptada al formato de cada producto' },
  ];

  return (
    <div className="site-shell">
      <div className="paper-noise" />
      <div className="hero-glow hero-glow-left" />
      <div className="hero-glow hero-glow-right" />

      <header className="topbar">
        <a className="brand" href="#inicio" aria-label="Ir al inicio">
          <span className="brand-mark">ED</span>
          <span className="brand-copy">
            <strong>Ellender Dev</strong>
            <small>Portafolio de productos digitales</small>
          </span>
        </a>

        <nav className="nav-links">
          <a href="#proyectos">Proyectos</a>
          <a href="#estudio">Enfoque</a>
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
              Diseno de productos que se sienten reales
            </span>

            <h1>Proyectos web y mobile con una presentacion mas limpia y directa.</h1>

            <p className="hero-description">
              Portafolio visual de productos reales hechos para negocio.
            </p>

            <div className="hero-actions">
              <a className="cta-button primary" href={whatsappHref} target="_blank" rel="noreferrer">
                <Phone size={18} />
                Contactar por WhatsApp
              </a>
              <a className="cta-button secondary" href="#proyectos">
                Ver galeria completa
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
            <article className="identity-card">
              <div className="identity-photo-shell">
                <img src={catalog.profileImage} alt="Ellender Dev" />
              </div>
              <div className="identity-notes">
                <span>Ellender Dev</span>
                <strong>Interfaces reales para marcas que quieren verse mejor.</strong>
              </div>
            </article>

            <div className="hero-floating-card">
              <span>Recorrido guiado</span>
              <p>Una vista a la vez.</p>
            </div>

            <div className="hero-floating-card secondary">
              <MapPinned size={18} />
              <p>Web y mobile bien encuadrados.</p>
            </div>
          </div>
        </section>

        <section className="section studio-section" id="estudio">
          <div className="section-heading compact">
            <span className="eyebrow">Como se presenta el trabajo</span>
            <h2>Menos texto, mas producto.</h2>
          </div>

          <div className="studio-grid">
            {studioNotes.map((item) => {
              const Icon = item.icon;

              return (
                <article className="studio-card" key={item.title}>
                  <div className="studio-icon">
                    <Icon size={20} />
                  </div>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </article>
              );
            })}
          </div>
        </section>

        <section className="section" id="proyectos">
          <div className="section-heading">
            <span className="eyebrow">Proyectos realizados</span>
            <h2>Siete productos mostrados uno por uno.</h2>
          </div>

          <div className="filter-row" role="tablist" aria-label="Filtrar proyectos">
            {filters.map((filter) => (
              <button
                type="button"
                key={filter.id}
                className={`filter-chip${activeFilter === filter.id ? ' is-active' : ''}`}
                onClick={() => setActiveFilter(filter.id)}
              >
                {filter.label}
              </button>
            ))}
          </div>

          {loadState === 'loading' ? <p className="status-copy">Cargando galeria de proyectos...</p> : null}
          {loadState === 'error' ? (
            <p className="status-copy">No se pudo cargar la galeria automaticamente. Ejecuta la sincronizacion de assets e intenta de nuevo.</p>
          ) : null}

          <div className="projects-list">
            {filteredProjects.map((project) => (
              <ProjectCard project={project} key={project.id} />
            ))}
          </div>
        </section>

        <section className="section contact-section" id="contacto">
          <div className="contact-card">
            <div>
              <span className="eyebrow">Contacto directo</span>
              <h2>Si quieres una interfaz asi para tu negocio, conversemos.</h2>
              <p>
                Desarrollo web, mobile y sistemas de gestion.
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