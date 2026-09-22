'use client';
import { ArrowDown, ArrowUpRight } from 'lucide-react';
import { SiteHeader } from './site-header';
import { HeroShowcase } from './hero-showcase';
import { Portfolio } from './portfolio';
import { Services } from './services';
import { Process } from './process';
import { Contact } from './contact';
import { brand } from '@/lib/bebrand-content';

export function DevelopmentSite() {
  return <div className="site">
    <SiteHeader home />
    <main id="contenido"><section className="hero container" id="inicio">
      <div className="hero-top"><span className="eyebrow">ESTUDIO DE DESARROLLO DIGITAL</span><a className="sister-link" href={brand.marketingUrl}>¿Buscas marketing? <ArrowUpRight size={15}/></a></div>
      <div className="hero-split">
        <div className="hero-copy">
          <h1>Tu siguiente etapa.<br/><span>La desarrollamos.</span></h1>
          <p className="hero-lead">Creamos páginas web, tiendas online y software a medida para que tu negocio avance con herramientas hechas para ti.</p>
          <div className="hero-cta-row">
            <a href="/proyecto" className="pill primary">Cuéntanos tu idea <ArrowUpRight size={19}/></a>
            <a href="#proyectos" className="text-link">Explora lo que podemos crear <ArrowDown size={16}/></a>
          </div>
          <p className="hero-microcopy">Un formulario corto y guiado — guardamos tu progreso automáticamente.</p>
        </div>
        <HeroShowcase/>
      </div>
      <div className="hero-rule"><span>ESTRATEGIA · DISEÑO · DESARROLLO</span><span>DESLIZA PARA EXPLORAR <ArrowDown size={13}/></span></div>
    </section>
    <Portfolio/><Services/><Process/><Contact/>
    </main>
  </div>;
}
