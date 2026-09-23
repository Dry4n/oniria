import { useState, useEffect } from 'react'
import { OniriaLogoFull, OniriaMark } from './components/OniriaLogo'

const articles = [
  {
    id: 1,
    category: 'Sociedad',
    title: 'El sueño colectivo que redefine cómo entendemos el descanso',
    excerpt: 'Investigadores del Institut del Son de Barcelona documentan por primera vez un fenómeno de sueño sincronizado en comunidades rurales del Pirineo.',
    author: 'Marta Solà',
    date: '21 sep 2026',
    dateTime: '2026-09-21',
    readTime: '6 min',
    image: 'photo-1446776653964-20c1d3a81b06',
  },
  {
    id: 2,
    category: 'Cultura',
    title: 'La arquitectura del inconsciente: exposición en el MACBA',
    excerpt: 'Trece artistas exploran la frontera entre la vigilia y el sueño en una muestra que permanecerá abierta hasta finales de noviembre.',
    author: 'Oriol Vidal',
    date: '19 sep 2026',
    dateTime: '2026-09-19',
    readTime: '4 min',
    image: 'photo-1518998053901-5348d3961a04',
  },
  {
    id: 3,
    category: 'Ciencia',
    title: 'Nuevas moléculas que regulan el ciclo REM abren vías terapéuticas',
    excerpt: 'Un equipo de la UPF identifica proteínas clave en la consolidación de la memoria durante el sueño profundo, con implicaciones para el alzhéimer.',
    author: 'Iria Moure',
    date: '17 sep 2026',
    dateTime: '2026-09-17',
    readTime: '8 min',
    image: 'photo-1507413245164-6160d8298b31',
  },
  {
    id: 4,
    category: 'Opinión',
    title: 'Dormir es un acto político: sobre el derecho al descanso',
    excerpt: 'En una sociedad que glorifica el insomnio productivo, reclamar el sueño como necesidad fundamental se ha convertido en resistencia.',
    author: 'Cèlia Ferrà',
    date: '15 sep 2026',
    dateTime: '2026-09-15',
    readTime: '5 min',
    image: 'photo-1531746790731-6c087fecd65a',
  },
]

const personaDelDia = {
  nombre: 'Salvador Dalí',
  descripcion: 'Pintor surrealista que convirtió el lenguaje de los sueños en iconografía universal. Pionero en explorar el subconsciente como materia artística.',
  nacimiento: '11 mayo 1904',
  disciplina: 'Pintura · Escultura · Escritura',
  // Portrait from Unsplash — public domain aesthetic
  image: 'photo-1578301978018-3005759f48f7',
}

const colorDelDia = {
  nombre: 'Malva crepuscular',
  hex: '#9B72AA',
  descripcion: 'El tono que adopta el cielo en ese instante preciso entre el día consciente y la noche que sueña. Evoca transición, umbral y misterio suave.',
}

const navSections = ['Portada', 'Ciencia', 'Cultura', 'Sociedad', 'Opinión', 'Archivo']

export default function App() {
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#250e3d', color: '#f5f0f8' }}>

      {/* ── Header ── */}
      <header style={{
        borderBottom: '1px solid rgba(139,90,191,0.3)',
        backgroundColor: '#1a0a2e',
        position: 'sticky',
        top: 0,
        zIndex: 50,
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem' }}>
          <div className="header-inner" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'relative' }}>

            {/* ── LEFT: mobile mark only (hidden on desktop) ── */}
            <div className="logo-mobile-wrap" style={{ display: 'none', alignItems: 'center', flexShrink: 0 }}>
              <OniriaMark size={52} color="#b388e8" />
            </div>

            {/* ── CENTER: desktop full logo, absolutely centered (hidden on mobile) ── */}
            <div className="logo-desktop-wrap" style={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)', display: 'flex', alignItems: 'center' }}>
              <OniriaLogoFull fontSize={34} color="#b388e8" scrolled={scrolled} />
            </div>

            {/* Dropdown nav — anchored to header */}
            {menuOpen && (
              <nav
                aria-label="Secciones"
                style={{ position: 'absolute', top: '100%', left: '-2rem', right: '-2rem', backgroundColor: '#1a0a2e', borderBottom: '1px solid rgba(139,90,191,0.3)', padding: '1.5rem 2rem', zIndex: 49 }}
              >
                {navSections.map(item => (
                  <a key={item} href="#" style={{
                    display: 'block', fontFamily: 'var(--font-body)', fontSize: '0.95rem',
                    letterSpacing: '0.08em', textTransform: 'uppercase', color: '#c9a84c',
                    padding: '0.6rem 0', borderBottom: '1px solid rgba(139,90,191,0.15)',
                    textDecoration: 'none', transition: 'color 0.2s',
                  }}
                    onMouseEnter={e => (e.currentTarget.style.color = '#f5f0f8')}
                    onMouseLeave={e => (e.currentTarget.style.color = '#c9a84c')}
                  >{item}</a>
                ))}
              </nav>
            )}

            {/* ── RIGHT: search + menu ── */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '1rem', marginLeft: 'auto' }}>
              {/* Search icon — toggles the drop-down panel on all screen sizes */}
              <button
                onClick={() => setSearchOpen(o => !o)}
                aria-label={searchOpen ? 'Cerrar búsqueda' : 'Buscar'}
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: searchOpen ? '#f5f0f8' : '#c9a84c', padding: '8px', display: 'flex', transition: 'color 0.2s' }}
                onMouseEnter={e => (e.currentTarget.style.color = '#f5f0f8')}
                onMouseLeave={e => (e.currentTarget.style.color = searchOpen ? '#f5f0f8' : '#c9a84c')}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
              </button>
              <button onClick={() => setMenuOpen(o => !o)} aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'} aria-expanded={menuOpen}
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#c9a84c', padding: '8px', display: 'flex', transition: 'color 0.2s' }}
                onMouseEnter={e => (e.currentTarget.style.color = '#f5f0f8')}
                onMouseLeave={e => (e.currentTarget.style.color = '#c9a84c')}
              >
                {menuOpen
                  ? <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
                  : <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" /></svg>
                }
              </button>
            </div>
          </div>

          {/* Mobile search panel — slides down below the header row */}
          {searchOpen && (
            <div className="search-panel" style={{
              borderTop: '1px solid rgba(139,90,191,0.2)',
              padding: '0.75rem 0',
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
            }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#8b5abf" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
                <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              <input
                autoFocus
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="¿Qué estás buscando?"
                style={{
                  background: 'transparent', border: 'none',
                  color: '#f5f0f8', fontFamily: 'var(--font-body)',
                  fontSize: '1rem', outline: 'none', flex: 1,
                }}
              />
              <button
                onClick={() => { setSearchOpen(false); setSearchQuery('') }}
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#5a2e87', fontFamily: 'var(--font-body)', fontSize: '0.72rem', letterSpacing: '0.1em', padding: '4px' }}
              >
                Cancelar
              </button>
            </div>
          )}
        </div>
      </header>

      {/* ── Masthead tagline strip ── */}
      <div className="tagline-strip" style={{ borderBottom: '1px solid rgba(139,90,191,0.2)', padding: '0.6rem 2rem', textAlign: 'center', backgroundColor: '#1a0a2e' }}>
        <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.72rem', letterSpacing: '0.35em', textTransform: 'uppercase', color: '#8b5abf', margin: 0 }}>
          Mirando en tu interior
        </p>
      </div>

      {/* ── Main ── */}
      <main className="main-pad" style={{ maxWidth: '1200px', margin: '0 auto' }}>

        {/* Welcome */}
        <section className="welcome-section" style={{ borderBottom: '1px solid rgba(139,90,191,0.2)' }}>
          <p style={{ fontSize: '0.7rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: '#8b5abf', marginBottom: '1rem', fontFamily: 'var(--font-body)' }}>
            Miércoles, 23 de septiembre de 2026
          </p>
          <h1 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(2rem, 5vw, 3.5rem)',
            fontWeight: 400, fontStyle: 'italic',
            color: '#f5f0f8', lineHeight: 1.15,
            maxWidth: '700px', margin: '0 0 1.25rem',
          }}>
            Bienvenida al umbral entre lo que sabemos y lo que soñamos.
          </h1>
          <p style={{ fontFamily: 'var(--font-serif)', fontSize: '1.05rem', color: '#c9a84c', lineHeight: 1.7, maxWidth: '540px', margin: 0 }}>
            Oniria es un espacio de periodismo lento dedicado a la ciencia, la cultura y la filosofía del sueño. Cada semana, voces expertas e historias insólitas desde el otro lado de la vigilia.
          </p>
        </section>

        {/* ── Edition divider ── */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', padding: '2rem 0 1.5rem' }}>
          <div style={{ flex: 1, height: '1px', backgroundColor: 'rgba(139,90,191,0.25)' }} />
          <span style={{
            fontFamily: 'var(--font-body)',
            fontSize: '0.62rem',
            letterSpacing: '0.35em',
            textTransform: 'uppercase',
            color: '#5a2e87',
            whiteSpace: 'nowrap',
          }}>
            <span className="edition-full">Edición nº 47 · Semana del 21 al 27 de septiembre</span>
            <span className="edition-short" style={{ display: 'none' }}>Ed. 47 · Sep 2026</span>
          </span>
          <div style={{ flex: 1, height: '1px', backgroundColor: 'rgba(139,90,191,0.25)' }} />
        </div>

        {/* ── Content grid ── */}
        <div className="content-grid">

          {/* Articles 2×2 */}
          <section aria-label="Últimas publicaciones">
            <p style={{ fontSize: '0.62rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: '#8b5abf', marginBottom: '1.5rem', fontFamily: 'var(--font-body)', borderBottom: '1px solid rgba(139,90,191,0.3)', paddingBottom: '0.75rem' }}>
              Últimas publicaciones
            </p>
            <div className="article-grid">
              {articles.map((article, i) => (
                <ArticleCard key={article.id} article={article} priority={i === 0} />
              ))}
            </div>
          </section>

          {/* Sidebar */}
          <aside aria-label="Destacados del día" className="sidebar">
            <PersonaDelDia persona={personaDelDia} />
            <ColorDelDia color={colorDelDia} />
          </aside>

        </div>
      </main>

      {/* ── Footer ── */}
      <footer style={{ backgroundColor: '#0f0520', borderTop: '1px solid rgba(139,90,191,0.2)', marginTop: '2rem' }}>
        {/* Top footer */}
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '3rem 2rem 2rem' }}>
          <div className="footer-grid">
            {/* Brand column */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <OniriaLogoFull fontSize={28} color="#b388e8" />
              <p style={{ fontFamily: 'var(--font-serif)', fontSize: '0.85rem', color: '#8b5abf', lineHeight: 1.65, maxWidth: '240px', margin: 0, fontStyle: 'italic' }}>
                Periodismo lento sobre la ciencia, la cultura y la filosofía del sueño.
              </p>
              {/* Social links */}
              <div style={{ display: 'flex', gap: '0.75rem', marginTop: '0.5rem' }}>
                {['X', 'IG', 'YT'].map(s => (
                  <a key={s} href="#" style={{
                    fontFamily: 'var(--font-body)', fontSize: '0.65rem', letterSpacing: '0.15em',
                    color: '#5a2e87', textDecoration: 'none', border: '1px solid rgba(90,46,135,0.5)',
                    padding: '4px 8px', transition: 'color 0.2s, border-color 0.2s',
                  }}
                    onMouseEnter={e => { e.currentTarget.style.color = '#b388e8'; e.currentTarget.style.borderColor = '#b388e8' }}
                    onMouseLeave={e => { e.currentTarget.style.color = '#5a2e87'; e.currentTarget.style.borderColor = 'rgba(90,46,135,0.5)' }}
                  >{s}</a>
                ))}
              </div>
            </div>

            {/* Sections */}
            <div>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.62rem', letterSpacing: '0.28em', textTransform: 'uppercase', color: '#5a2e87', marginBottom: '1rem' }}>Secciones</p>
              {navSections.map(s => (
                <a key={s} href="#" style={{
                  display: 'block', fontFamily: 'var(--font-body)', fontSize: '0.88rem',
                  color: '#8b5abf', textDecoration: 'none', marginBottom: '0.5rem', transition: 'color 0.2s',
                }}
                  onMouseEnter={e => (e.currentTarget.style.color = '#f5f0f8')}
                  onMouseLeave={e => (e.currentTarget.style.color = '#8b5abf')}
                >{s}</a>
              ))}
            </div>

            {/* Legal */}
            <div>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.62rem', letterSpacing: '0.28em', textTransform: 'uppercase', color: '#5a2e87', marginBottom: '1rem' }}>Publicación</p>
              {['Sobre Oniria', 'Equipo editorial', 'Colabora', 'Aviso legal', 'Política de privacidad', 'Contacto'].map(s => (
                <a key={s} href="#" style={{
                  display: 'block', fontFamily: 'var(--font-body)', fontSize: '0.88rem',
                  color: '#8b5abf', textDecoration: 'none', marginBottom: '0.5rem', transition: 'color 0.2s',
                }}
                  onMouseEnter={e => (e.currentTarget.style.color = '#f5f0f8')}
                  onMouseLeave={e => (e.currentTarget.style.color = '#8b5abf')}
                >{s}</a>
              ))}
            </div>

            {/* Newsletter */}
            <div>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.62rem', letterSpacing: '0.28em', textTransform: 'uppercase', color: '#5a2e87', marginBottom: '1rem' }}>Suscripción</p>
              <p style={{ fontFamily: 'var(--font-serif)', fontSize: '0.82rem', color: '#8b5abf', lineHeight: 1.6, margin: '0 0 1rem', fontStyle: 'italic' }}>
                Una carta semanal desde el umbral, directamente en tu bandeja de entrada.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <input
                  type="email"
                  placeholder="tu@email.com"
                  style={{
                    background: 'transparent', border: '1px solid rgba(139,90,191,0.4)',
                    color: '#f5f0f8', fontFamily: 'var(--font-body)', fontSize: '0.85rem',
                    padding: '0.5rem 0.75rem', outline: 'none',
                  }}
                />
                <button style={{
                  backgroundColor: '#3b1a5a', border: '1px solid rgba(179,136,232,0.3)',
                  color: '#b388e8', fontFamily: 'var(--font-body)', fontSize: '0.72rem',
                  letterSpacing: '0.2em', textTransform: 'uppercase', padding: '0.6rem',
                  cursor: 'pointer', transition: 'background-color 0.2s',
                }}
                  onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#5a2e87')}
                  onMouseLeave={e => (e.currentTarget.style.backgroundColor = '#3b1a5a')}
                >
                  Suscribirme
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{ borderTop: '1px solid rgba(139,90,191,0.12)', padding: '1rem 2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem' }}>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.72rem', color: '#3d1f5c', margin: 0, letterSpacing: '0.1em' }}>
            © 2026 Oniria. Todos los derechos reservados.
          </p>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.72rem', color: '#3d1f5c', margin: 0, letterSpacing: '0.05em' }}>
            ISSN 2999-0147 · Publicación digital quincenal
          </p>
        </div>
      </footer>

      {/* ── Responsive styles ── */}
      <style>{`
        /* ── Base (desktop) ── */
        .content-grid {
          display: grid;
          grid-template-columns: 1fr 300px;
          gap: 3rem;
        }
        .article-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1.5px;
          background-color: rgba(139,90,191,0.2);
        }
        .sidebar {
          display: flex;
          flex-direction: column;
          gap: 1.5px;
          background-color: rgba(139,90,191,0.2);
        }
        .footer-grid {
          display: grid;
          grid-template-columns: 1.4fr 1fr 1fr 1.2fr;
          gap: 3rem;
        }
        .header-inner {
          height: 100px; /* desktop */
        }
        .main-pad {
          padding: 0 2rem 4rem;
        }
        .welcome-section {
          padding: 4rem 0 3rem;
        }
        .article-img {
          height: 180px;
          width: 100%;
        }
        .edition-short { display: none; }

        /* ── Tablet (960px) ── */
        @media (max-width: 960px) {
          .content-grid {
            grid-template-columns: 1fr;
            gap: 2rem;
          }
          /* Sidebar becomes a horizontal pair */
          .sidebar {
            flex-direction: row;
            background-color: transparent;
            gap: 1rem;
          }
          .sidebar > * {
            flex: 1;
            background-color: #1a0a2e;
          }
          .footer-grid {
            grid-template-columns: 1fr 1fr;
            gap: 2rem;
          }
        }

        /* ── Mobile (600px) ── */
        @media (max-width: 600px) {
          /* Desktop: show full centered logo, hide mobile mark */
          .logo-mobile-wrap { display: none !important; }
          .logo-desktop-wrap { display: flex !important; }

          /* Mobile: hide full logo, show mark left-aligned */
          @media (max-width: 600px) {
            .logo-mobile-wrap { display: flex !important; }
            .logo-desktop-wrap { display: none !important; }
            .header-inner { height: 72px; }
          }
          .header-inner {
            height: 56px;
          }
          .main-pad {
            padding: 0 1.25rem 3rem;
          }
          .welcome-section {
            padding: 2.25rem 0 2rem;
          }
          /* Single-column articles */
          .article-grid {
            grid-template-columns: 1fr;
          }
          /* Stack article as a horizontal card to save vertical space */
          .article-card-inner {
            flex-direction: row !important;
            height: 120px;
          }
          .article-img {
            height: 120px !important;
            width: 120px;
            flex-shrink: 0;
          }
          .article-body {
            padding: 0.875rem !important;
          }
          .article-excerpt {
            display: none;
          }
          /* Sidebar stacks */
          .sidebar {
            flex-direction: column;
            gap: 1.5px;
            background-color: rgba(139,90,191,0.2);
          }
          .sidebar > * {
            background-color: #1a0a2e;
          }
          /* Footer single column */
          .footer-grid {
            grid-template-columns: 1fr;
            gap: 2rem;
          }
          /* Edition divider — swap long label for short on mobile */
          .edition-full { display: none; }
          .edition-short { display: inline; }
          /* Masthead tagline strip */
          .tagline-strip {
            display: none;
          }
        }
      `}</style>

    </div>
  )
}

function ArticleCard({ article, priority }: { article: typeof articles[0]; priority?: boolean }) {
  const [hovered, setHovered] = useState(false)
  return (
    <article>
      <a
        href="#"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="article-card-inner"
        style={{
          display: 'flex', flexDirection: 'column',
          backgroundColor: hovered ? '#3b1a5a' : '#1a0a2e',
          transition: 'background-color 0.25s',
          textDecoration: 'none', color: 'inherit', overflow: 'hidden', height: '100%',
        }}
      >
        <div className="article-img" style={{ position: 'relative', overflow: 'hidden', backgroundColor: '#3b1a5a', flexShrink: 0 }}>
          <img
            src={`https://images.unsplash.com/${article.image}?w=600&h=360&fit=crop&auto=format`}
            alt={article.title}
            loading={priority ? 'eager' : 'lazy'}
            style={{
              width: '100%', height: '100%', objectFit: 'cover',
              transform: hovered ? 'scale(1.04)' : 'scale(1)',
              transition: 'transform 0.4s ease',
              opacity: 0.75,
            }}
          />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, transparent 30%, rgba(26,10,46,0.85) 100%)' }} />
          <span style={{
            position: 'absolute', top: '12px', left: '12px',
            fontSize: '0.6rem', letterSpacing: '0.2em', textTransform: 'uppercase',
            color: '#c9a84c', fontFamily: 'var(--font-body)', fontWeight: 600,
            backgroundColor: 'rgba(26,10,46,0.7)', padding: '3px 8px',
          }}>
            {article.category}
          </span>
        </div>
        <div className="article-body" style={{ padding: '1.25rem', flex: 1, display: 'flex', flexDirection: 'column', gap: '0.5rem', minWidth: 0 }}>
          <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1rem', fontWeight: 600, color: '#f5f0f8', lineHeight: 1.35, margin: 0 }}>
            {article.title}
          </h3>
          <p className="article-excerpt" style={{ fontFamily: 'var(--font-body)', fontSize: '0.82rem', color: '#c0a0d8', lineHeight: 1.55, margin: 0, flex: 1 }}>
            {article.excerpt}
          </p>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '0.5rem', gap: '0.5rem', flexWrap: 'wrap' }}>
            <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.72rem', color: '#a88bc0', fontWeight: 500 }}>
              {article.author}
            </span>
            <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.72rem', color: '#a88bc0', whiteSpace: 'nowrap' }}>
              <time dateTime={article.dateTime}>{article.date}</time>
              {' · '}{article.readTime}
            </span>
          </div>
        </div>
      </a>
    </article>
  )
}

function PersonaDelDia({ persona }: { persona: typeof personaDelDia }) {
  return (
    <div style={{ backgroundColor: '#1a0a2e', flex: 1 }}>
      {/* #7 — full-bleed portrait photo with gradient overlay */}
      <div style={{ position: 'relative', height: '160px', overflow: 'hidden', backgroundColor: '#3b1a5a' }}>
        <img
          src={`https://images.unsplash.com/${persona.image}?w=400&h=320&fit=crop&auto=format&grayscale`}
          alt={`Retrato de ${persona.nombre}`}
          loading="lazy"
          style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.55, filter: 'sepia(0.4)' }}
        />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(26,10,46,0.2) 0%, rgba(26,10,46,0.9) 100%)' }} />
        <div style={{ position: 'absolute', bottom: '12px', left: '1rem', right: '1rem' }}>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.58rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: '#c9a84c', margin: '0 0 4px' }}>
            Persona del día
          </p>
          <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.3rem', fontWeight: 600, fontStyle: 'italic', color: '#f5f0f8', margin: 0, lineHeight: 1.15 }}>
            {persona.nombre}
          </h3>
        </div>
      </div>
      <div style={{ padding: '1.25rem' }}>
        <p style={{ fontFamily: 'var(--font-serif)', fontSize: '0.85rem', color: '#c9a84c', lineHeight: 1.65, margin: '0 0 1rem', fontStyle: 'italic' }}>
          {persona.descripcion}
        </p>
        <div style={{ borderTop: '1px solid rgba(139,90,191,0.2)', paddingTop: '0.75rem', display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
          <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.72rem', color: '#a88bc0' }}>Nacimiento · {persona.nacimiento}</span>
          <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.72rem', color: '#a88bc0' }}>{persona.disciplina}</span>
        </div>
      </div>
    </div>
  )
}

function ColorDelDia({ color }: { color: typeof colorDelDia }) {
  return (
    <div style={{ backgroundColor: '#1a0a2e', padding: '1.75rem', flex: 1 }}>
      <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.58rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: '#8b5abf', margin: '0 0 1.25rem' }}>
        Color del día
      </p>
      {/* #7 — full-width color swatch with label */}
      <div style={{
        width: '100%', height: '80px', backgroundColor: color.hex,
        boxShadow: `0 0 40px ${color.hex}44, inset 0 0 20px rgba(0,0,0,0.15)`,
        marginBottom: '1rem',
        position: 'relative',
      }}>
        <span style={{
          position: 'absolute', bottom: '8px', right: '10px',
          fontFamily: 'monospace', fontSize: '0.72rem', color: 'rgba(255,255,255,0.6)', letterSpacing: '0.1em',
        }}>{color.hex}</span>
      </div>
      <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.15rem', fontWeight: 600, color: '#f5f0f8', margin: '0 0 0.5rem', lineHeight: 1.2 }}>
        {color.nombre}
      </h3>
      <p style={{ fontFamily: 'var(--font-serif)', fontSize: '0.85rem', color: '#c9a84c', lineHeight: 1.65, margin: 0, fontStyle: 'italic' }}>
        {color.descripcion}
      </p>
    </div>
  )
}
