'use client';
import { useEffect, useState } from 'react';
import { ArrowUpRight, Menu, X } from 'lucide-react';

export function SiteHeader({ home = false }: { home?: boolean }) {
  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => {
    function onKey(event: KeyboardEvent) { if (event.key === 'Escape') setMenuOpen(false); }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const links = [
    { href: home ? '#proyectos' : '/#proyectos', label: 'Proyectos' },
    { href: '/servicios', label: 'Servicios', current: !home },
    { href: home ? '#proceso' : '/#proceso', label: 'Cómo trabajamos' },
  ];
  const contactHref = '/proyecto';

  return <>
    <a href="#contenido" className="skip-link">Saltar al contenido</a>
    <header className="site-header">
      <div className="site-header-inner container">
        <a href={home ? '#inicio' : '/'} className="brand brand-lockup" aria-label="BeBrand Desarrollo, inicio"><span className="brand-images" aria-hidden="true"><img className="brand-on-blue" src="/brand/bebrand-dev-white.png" alt="" width="1782" height="276"/><img className="brand-on-light" src="/brand/bebrand-dev-blue.png" alt="" width="1871" height="272"/></span><small>DISEÑO + TECNOLOGÍA</small></a>
        <nav className="desktop-nav" aria-label="Navegación principal">{links.map(link => <a key={link.label} href={link.href} aria-current={link.current ? 'page' : undefined}>{link.label}</a>)}</nav>
        <div className="header-actions"><a href={contactHref} className="header-cta">Empezar <ArrowUpRight size={15}/></a><button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'} aria-expanded={menuOpen} aria-controls="mobile-nav">{menuOpen ? <X/> : <Menu/>}</button></div>
      </div>
    </header>
    {menuOpen && <nav className="mobile-nav container" id="mobile-nav" aria-label="Navegación móvil">{links.map(link => <a key={link.label} href={link.href} onClick={() => setMenuOpen(false)}>{link.label}<ArrowUpRight size={18}/></a>)}<a href={contactHref} className="mobile-nav-cta" onClick={() => setMenuOpen(false)}>Empezar mi proyecto <ArrowUpRight size={18}/></a></nav>}
  </>;
}
