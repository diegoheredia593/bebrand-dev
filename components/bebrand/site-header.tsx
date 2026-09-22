'use client';
import { useEffect, useState, useSyncExternalStore } from 'react';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import { Switch } from '@/components/ui/switch';

function subscribeTheme(onChange: () => void) {
  function onStorage(event: StorageEvent) {
    if (event.key !== 'bebrand-theme') return;
    document.documentElement.dataset.theme = event.newValue === 'light' ? 'light' : 'blue';
    onChange();
  }
  window.addEventListener('bebrand-theme-change', onChange);
  window.addEventListener('storage', onStorage);
  return () => {
    window.removeEventListener('bebrand-theme-change', onChange);
    window.removeEventListener('storage', onStorage);
  };
}

function currentTheme() { return document.documentElement.dataset.theme === 'light'; }

export function SiteHeader({ home = false }: { home?: boolean }) {
  const light = useSyncExternalStore(subscribeTheme, currentTheme, () => false);
  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => {
    function onKey(event: KeyboardEvent) { if (event.key === 'Escape') setMenuOpen(false); }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  function changeTheme(value: boolean) {
    document.documentElement.dataset.theme = value ? 'light' : 'blue';
    try { localStorage.setItem('bebrand-theme', value ? 'light' : 'blue'); } catch { /* Theme remains usable without storage. */ }
    window.dispatchEvent(new Event('bebrand-theme-change'));
  }

  const links = [
    { href: home ? '#proyectos' : '/#proyectos', label: 'Proyectos' },
    { href: '/servicios', label: 'Servicios', current: !home },
    { href: home ? '#proceso' : '/#proceso', label: 'Cómo trabajamos' },
  ];
  const contactHref = '/proyecto';

  return <>
    <a href="#contenido" className="skip-link">Saltar al contenido</a>
    <header className="site-header container">
      <a href={home ? '#inicio' : '/'} className="brand brand-lockup" aria-label="BeBrand Desarrollo, inicio"><span className="brand-images" aria-hidden="true"><img className="brand-on-blue" src="/brand/bebrand-dev-white.png" alt="" width="1782" height="276"/><img className="brand-on-light" src="/brand/bebrand-dev-blue.png" alt="" width="1871" height="272"/></span><small>DISEÑO + TECNOLOGÍA</small></a>
      <nav className="desktop-nav" aria-label="Navegación principal">{links.map(link => <a key={link.label} href={link.href} aria-current={link.current ? 'page' : undefined}>{link.label}</a>)}</nav>
      <div className="header-actions"><label className="theme-control"><span>{light ? 'Blanco' : 'Azul'}</span><Switch checked={light} onCheckedChange={changeTheme} aria-label="Usar fondo blanco" className="brand-switch" /></label><a href={contactHref} className="header-cta">Empezar <ArrowUpRight size={15}/></a><button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'} aria-expanded={menuOpen} aria-controls="mobile-nav">{menuOpen ? <X/> : <Menu/>}</button></div>
    </header>
    {menuOpen && <nav className="mobile-nav container" id="mobile-nav" aria-label="Navegación móvil">{links.map(link => <a key={link.label} href={link.href} onClick={() => setMenuOpen(false)}>{link.label}<ArrowUpRight size={18}/></a>)}<a href={contactHref} className="mobile-nav-cta" onClick={() => setMenuOpen(false)}>Empezar mi proyecto <ArrowUpRight size={18}/></a></nav>}
  </>;
}
