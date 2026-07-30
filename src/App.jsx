import { useEffect, useMemo, useRef, useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  ExternalLink,
  Github,
  Linkedin,
  Mail,
  Play,
  Phone,
} from 'lucide-react';

const contact = {
  whatsapp: '573159408253',
  whatsappLabel: '315 940 8253',
  email: 'ellenderdev@gmail.com',
  github: 'https://github.com/Ellenderwkast',
  linkedin: 'https://www.linkedin.com/in/ellender-castillo-9b5552407?utm_source=share_via&utm_content=profile&utm_medium=member_ios',
};

const filters = [
  { id: 'all', label: 'Todos' },
  { id: 'gestion', label: 'Gestion' },
  { id: 'venta', label: 'Venta' },
  { id: 'apps', label: 'Apps' },
  { id: 'movilidad', label: 'Movilidad' },
];

const fallbackCatalog = {
  generatedAt: null,
  profileImage: '/assets/profile/mi-imagen.jpeg',
  projects: [],
};

function ProjectCard({ project }) {
  const [activeSlide, setActiveSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const touchStart = useRef(0);
  const touchEnd = useRef(0);
  const slides = project.slides ?? [];

  useEffect(() => {
    setActiveSlide(0);
  }, [project.id]);

  useEffect(() => {
    if (slides.length < 2 || isPaused) {
      return undefined;
    }

    const id = setInterval(() => {
      setActiveSlide((current) => (current === slides.length - 1 ? 0 : current + 1));
    }, 4200);

    return () => clearInterval(id);
  }, [slides.length, isPaused]);

  const currentSlide = slides[activeSlide] ?? null;
  const previousSlide = slides[(activeSlide - 1 + slides.length) % slides.length] ?? null;
  const nextSlide = slides[(activeSlide + 1) % slides.length] ?? null;

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

        <div className="project-highlights">
          {project.highlights.slice(0, 3).map((highlight) => (
            <span key={highlight}>{highlight}</span>
          ))}
        </div>

        <a className="project-link" href={project.liveUrl} target="_blank" rel="noreferrer">
          <ExternalLink size={16} />
          Ver proyecto
        </a>
      </div>

      <div className="project-viewer">
        <div className="viewer-topbar">
          <span className="viewer-label">{project.shortSummary}</span>
          <p>
            {activeSlide + 1} / {slides.length}
          </p>
        </div>

        <div
          className={`viewer-stage viewer-stage--${project.frame}`}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <button
            type="button"
            className="viewer-arrow viewer-arrow--left"
            onClick={goToPrevious}
            aria-label={`Ver imagen anterior de ${project.title}`}
          >
            <ArrowLeft size={18} />
          </button>

          {previousSlide ? (
            <button
              type="button"
              className={`frame-peek frame-peek--left frame-peek--${project.frame}`}
              onClick={goToPrevious}
              aria-label={`Vista previa anterior de ${project.title}`}
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
              aria-label={`Vista previa siguiente de ${project.title}`}
            >
              <div className={`frame-shell frame-shell--${project.frame}`}>
                <img src={nextSlide.src} alt="" aria-hidden="true" />
              </div>
            </button>
          ) : null}

          <button
            type="button"
            className="viewer-arrow viewer-arrow--right"
            onClick={goToNext}
            aria-label={`Ver imagen siguiente de ${project.title}`}
          >
            <ArrowRight size={18} />
          </button>
        </div>

        <div className="viewer-footer">
          <div className="viewer-slide-copy">
            <strong>{currentSlide.title}</strong>
            <p>{currentSlide.explanation}</p>
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
    { value: `${catalog.projects.length || 7}`, label: 'proyectos' },
    { value: `${totalSlides || 0}`, label: 'vistas' },
    { value: 'web + mobile', label: 'formatos' },
  ];

  return (
    <div className="site-shell">
      <div className="linux-grid" />

      <header className="topbar">
        <a className="brand" href="#inicio" aria-label="Ir al inicio">
          <img className="brand-avatar" src={catalog.profileImage} alt="Marca Ellender Dev" />
          <span className="brand-copy">
            <strong>Ellender Dev</strong>
          </span>
        </a>

        <nav className="nav-links">
          <a className="nav-pill" href={contact.github} target="_blank" rel="noreferrer">
            Github
          </a>
          <a className="nav-pill" href="#proyectos">
            Proyectos
          </a>
          <a className="nav-pill" href="#enfoque">
            Enfoque
          </a>
          <a className="nav-pill" href="#contacto">
            Contacto
          </a>
        </nav>
      </header>

      <main>
        <section className="hero" id="inicio">
          <div className="hero-copy">
            <h1>Proyectos web y mobile, claros y directos.</h1>

            <div className="hero-actions" id="enfoque">
              <a className="cta-button primary" href={whatsappHref} target="_blank" rel="noreferrer">
                <Phone size={16} />
                WhatsApp
              </a>
              <a className="cta-button secondary" href="#proyectos">
                <Play size={16} />
                Galeria
              </a>
            </div>

            <div className="hero-highlights">
              {stats.map((item) => (
                <article className="metric-card" key={item.label}>
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
                <strong>Diseño profesional y compacto.</strong>
              </div>
            </article>
          </div>
        </section>

        <section className="section" id="proyectos">
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

          {loadState === 'loading' ? <p className="status-copy">Cargando...</p> : null}
          {loadState === 'error' ? <p className="status-copy">No se pudo cargar la galeria.</p> : null}

          <div className="projects-list">
            {filteredProjects.map((project) => (
              <ProjectCard project={project} key={project.id} />
            ))}
          </div>
        </section>

        <section className="section contact-section" id="contacto">
          <div className="contact-card">
            <h2>Contacto directo</h2>
            <div className="contact-icons">
              <a className="contact-icon" href={whatsappHref} target="_blank" rel="noreferrer" aria-label="WhatsApp">
                <Phone size={18} />
              </a>
              <a className="contact-icon" href={`mailto:${contact.email}`} aria-label="Correo">
                <Mail size={18} />
              </a>
              <a className="contact-icon" href={contact.github} target="_blank" rel="noreferrer" aria-label="GitHub">
                <Github size={18} />
              </a>
              <a className="contact-icon" href={contact.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn">
                <Linkedin size={18} />
              </a>
            </div>
          </div>
        </section>
      </main>

      <a className="whatsapp-float" href={whatsappHref} target="_blank" rel="noreferrer" aria-label="Abrir WhatsApp">
        <Phone size={18} />
      </a>
    </div>
  );
}

export default App;
