'use client';
import { ArrowDown, ArrowUpRight, Asterisk } from 'lucide-react';
import { SiteHeader } from './site-header';
import { Portfolio } from './portfolio';
import { Services } from './services';
import { Process } from './process';
import { Contact } from './contact';

export function DevelopmentSite() {
  return <div className="site">
    <SiteHeader home />
    <main id="contenido"><section className="hero container" id="inicio">
      <div className="hero-top"><span className="eyebrow">ESTUDIO DE DESARROLLO DIGITAL</span><a className="sister-link" href="https://bebrand.marketing">¿Buscas marketing? <ArrowUpRight size={15}/></a></div>
      <h1>Tu siguiente etapa.<br/><span>La desarrollamos.</span><Asterisk className="hero-asterisk" aria-hidden="true" strokeWidth={1.2}/></h1>
      <div className="hero-bottom"><div className="hero-caption"><span className="small-index">01 — IDEAS QUE TOMAN FORMA</span><p>Buen diseño. Código bien hecho.<br/>Un proyecto que se siente tuyo.</p></div><div className="hero-summary"><p>Creamos páginas web, tiendas online y software a medida para que tu negocio avance con herramientas hechas para ti.</p><a href="/proyecto" className="pill primary">Cuéntanos tu idea <ArrowUpRight size={19}/></a><a href="#proyectos" className="text-link">Explora lo que podemos crear <ArrowDown size={16}/></a></div></div>
      <div className="hero-rule"><span>ESTRATEGIA · DISEÑO · DESARROLLO</span><span>DESLIZA PARA EXPLORAR <ArrowDown size={13}/></span></div>
    </section>
    <Portfolio/><Services/><Process/><Contact/>
    </main>
  </div>;
}
