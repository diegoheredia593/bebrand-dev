'use client';
import { useEffect, useState } from 'react';
import { ArrowDown, ArrowUpRight, Menu, X, Asterisk } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { Portfolio } from './portfolio';
import { Services } from './services';
import { Process } from './process';
import { Contact } from './contact';

export function DevelopmentSite() {
  const [light, setLight] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => { setLight(document.documentElement.dataset.theme === 'light'); }, []);
  useEffect(() => {
    function onKey(event: KeyboardEvent) { if(event.key === 'Escape') setMenuOpen(false); }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);
  function changeTheme(value: boolean) {
    setLight(value); document.documentElement.dataset.theme = value ? 'light' : 'blue';
    try { localStorage.setItem('bebrand-theme', value ? 'light' : 'blue'); } catch { /* Theme remains usable without storage. */ }
  }
  return <div className="site">
    <a href="#contenido" className="skip-link">Saltar al contenido</a>
    <header className="site-header container">
      <a href="#inicio" className="brand" aria-label="BeBrand Desarrollo, inicio"><img src="/brand/logo-original.jpeg" alt="" width="62" height="62" /><span>bebrand<span className="brand-extension">.dev</span><small>DISEÑO + TECNOLOGÍA</small></span></a>
      <nav className="desktop-nav" aria-label="Navegación principal"><a href="#proyectos">Proyectos</a><a href="#servicios">Servicios</a><a href="#proceso">Cómo trabajamos</a></nav>
      <div className="header-actions"><label className="theme-control"><span>{light ? 'Blanco' : 'Azul'}</span><Switch checked={light} onCheckedChange={changeTheme} aria-label="Usar fondo blanco" className="brand-switch" /></label><a href="#contacto" className="header-contact">Hablemos <ArrowUpRight size={16}/></a><button className="menu-toggle" onClick={()=>setMenuOpen(!menuOpen)} aria-label={menuOpen?'Cerrar menú':'Abrir menú'} aria-expanded={menuOpen} aria-controls="mobile-nav">{menuOpen?<X/>:<Menu/>}</button></div>
    </header>
    {menuOpen && <nav className="mobile-nav container" id="mobile-nav" aria-label="Navegación móvil">{[['#proyectos','Proyectos'],['#servicios','Servicios'],['#proceso','Cómo trabajamos'],['#contacto','Hablemos']].map(([href,label])=><a key={href} href={href} onClick={()=>setMenuOpen(false)}>{label}<ArrowUpRight size={18}/></a>)}</nav>}
    <main id="contenido"><section className="hero container" id="inicio">
      <div className="hero-top"><span className="eyebrow">ESTUDIO DE DESARROLLO DIGITAL</span><a className="sister-link" href="https://bebrand.marketing">¿Buscas marketing? <ArrowUpRight size={15}/></a></div>
      <h1>Tu siguiente etapa.<br/><span>La desarrollamos.</span><Asterisk className="hero-asterisk" aria-hidden="true" strokeWidth={1.2}/></h1>
      <div className="hero-bottom"><div className="hero-caption"><span className="small-index">01 — IDEAS QUE TOMAN FORMA</span><p>Buen diseño. Código bien hecho.<br/>Un proyecto que se siente tuyo.</p></div><div className="hero-summary"><p>Creamos páginas web, tiendas online y software a medida para que tu negocio avance con herramientas hechas para ti.</p><a href="#contacto" className="pill primary">Cuéntanos tu idea <ArrowUpRight size={19}/></a><a href="#proyectos" className="text-link">Explora lo que podemos crear <ArrowDown size={16}/></a></div></div>
      <div className="hero-rule"><span>ESTRATEGIA · DISEÑO · DESARROLLO</span><span>DESLIZA PARA EXPLORAR <ArrowDown size={13}/></span></div>
    </section>
    <Portfolio/><Services/><Process/><Contact/>
    </main>
  </div>;
}
