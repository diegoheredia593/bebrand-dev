import type { Metadata } from 'next';
import { ArrowDown, ArrowUpRight, Check } from 'lucide-react';
import { SiteHeader } from '@/components/bebrand/site-header';
import { ServiceArtwork } from '@/components/bebrand/service-artwork';
import { Contact } from '@/components/bebrand/contact';
import { detailedServices } from '@/lib/services-detail-content';
import { brand } from '@/lib/bebrand-content';

export const metadata: Metadata = {
  title: 'Servicios de desarrollo web, apps, UI/UX y SEO | BeBrand',
  description: 'Explora los servicios de BeBrand: sitios web, e-commerce, integración con Datafast, apps, software a medida, diseño UI/UX, SEO, GEO e integraciones.',
  alternates: { canonical: 'https://bebrand.dev/servicios' },
  openGraph: { title: 'Servicios de desarrollo digital | BeBrand', description: 'Web, e-commerce, apps, UI/UX, SEO e integraciones para crear el siguiente paso de tu negocio.', url: 'https://bebrand.dev/servicios', locale: 'es_EC', type: 'website' },
};

export default function ServicesPage() {
  return <div className="site detail-page"><SiteHeader/><main id="contenido">
    <section className="detail-hero container" id="inicio">
      <div className="detail-hero-top"><span className="eyebrow">SERVICIOS / BEBRAND.DEV</span><span className="eyebrow">ESTRATEGIA · DISEÑO · TECNOLOGÍA</span></div>
      <h1>Tecnología que se adapta<br/><em>a lo que quieres construir.</em></h1>
      <div className="detail-hero-bottom"><p>De la primera idea al lanzamiento: diseñamos, desarrollamos y conectamos experiencias digitales con un propósito claro.</p><div><a className="pill primary" href="#explorar">Explorar servicios <ArrowDown size={17}/></a><a className="detail-hero-link" href="/proyecto">Cuéntanos tu proyecto <ArrowUpRight size={17}/></a></div></div>
      <div className="detail-hero-strip"><span>01 — 05 / LO QUE PODEMOS CREAR</span><span>HECHO A LA MEDIDA DE TU SIGUIENTE ETAPA</span></div>
    </section>

    <section className="detail-intro" id="explorar"><div className="container detail-intro-inner"><div><span className="eyebrow">EXPLORA POR NECESIDAD</span><h2>Lo que imaginas,<br/><em>bien resuelto.</em></h2></div><p>Podemos empezar por una página, mejorar un producto que ya existe o construir una herramienta desde cero. Cada proyecto combina solo las piezas que necesita.</p></div></section>

    <div className="detail-catalog container"><nav className="detail-index" aria-label="Categorías de servicios"><span>EN ESTA PÁGINA</span>{detailedServices.map(service => <a key={service.id} href={`#${service.id}`}><small>{service.number}</small>{service.title}</a>)}<a className="detail-index-contact" href="#contacto">Hablemos de tu idea <ArrowUpRight size={14}/></a></nav>
      <div className="detail-service-list">{detailedServices.map(service => <section className="detail-service" id={service.id} key={service.id} aria-labelledby={`${service.id}-title`}>
        <div className="detail-service-top"><span className="eyebrow">{service.number} / SERVICIOS</span><span className="detail-service-mark">↗</span></div>
        <h2 id={`${service.id}-title`}>{service.title}</h2><p className="detail-service-lead">{service.lead}</p>
        <ServiceArtwork id={service.id}/>
        <div className="detail-service-body"><p>{service.description}</p><div><h3>Lo que podemos incluir</h3><ul>{service.includes.map(item => <li key={item}><Check size={16} aria-hidden="true"/>{item}</li>)}</ul></div></div>
        <div className="detail-outcome"><span>EL RESULTADO</span><p>{service.outcome}</p></div>
        {service.note && <p className="detail-note">{service.note}</p>}
      </section>)}</div>
    </div>

    <section className="detail-ending"><div className="container detail-ending-inner"><span className="eyebrow">EL PUNTO DE PARTIDA</span><h2>No necesitas saber<br/><em>qué servicio pedir.</em></h2><div><p>Cuéntanos qué quieres lograr, qué te está frenando y para quién estás construyendo. Te ayudamos a definir el alcance adecuado.</p><a href="/proyecto" className="pill primary">Cuéntanos tu proyecto <ArrowUpRight size={18}/></a><a href={brand.whatsapp} target="_blank" rel="noopener noreferrer" className="detail-hero-link">o escríbenos directo por WhatsApp <ArrowUpRight size={17}/></a></div></div></section>
    <Contact/>
  </main></div>;
}
