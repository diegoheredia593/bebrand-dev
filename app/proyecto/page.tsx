import type { Metadata } from 'next';
import { SiteHeader } from '@/components/bebrand/site-header';
import { ProjectForm } from '@/components/bebrand/project-form/project-form';
import { Contact } from '@/components/bebrand/contact';

export const metadata: Metadata = {
  title: 'Cuéntanos tu proyecto | BeBrand',
  description:
    'Cuéntanos sobre tu proyecto en unos minutos. Guardamos tu progreso automáticamente y te contactamos para seguir la conversación.',
  alternates: { canonical: 'https://bebrand.dev/proyecto' },
  openGraph: {
    title: 'Cuéntanos tu proyecto | BeBrand',
    description: 'Un formulario corto, paso a paso, para entender tu proyecto antes de conversar por teléfono.',
    url: 'https://bebrand.dev/proyecto',
    locale: 'es_EC',
    type: 'website',
  },
};

export default function ProjectIntakePage() {
  return (
    <div className="site detail-page">
      <SiteHeader />
      <main id="contenido">
        <section className="project-hero container" id="inicio">
          <span className="eyebrow">CUÉNTANOS TU PROYECTO</span>
          <h1>
            Un par de preguntas
            <br />
            <em>y seguimos por teléfono.</em>
          </h1>
          <p>
            Responde a tu ritmo. Guardamos cada paso automáticamente, así que si necesitas continuar después, ya
            tendremos con qué retomar la conversación contigo.
          </p>
        </section>
        <section className="project-form-section container">
          <ProjectForm />
        </section>
      </main>
      <Contact />
    </div>
  );
}
