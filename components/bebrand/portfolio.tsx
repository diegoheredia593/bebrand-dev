'use client';
import { ArrowUpRight, X } from 'lucide-react';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { ProjectPreview } from './project-preview';
import { projects } from '@/lib/bebrand-content';

export function Portfolio() {
  return <section className="projects-section" id="proyectos"><div className="container"><div className="section-heading"><div><span className="eyebrow">EL SIGUIENTE PASO, EN PANTALLA</span><h2>Ideas que se<br/><em>convierten en experiencias.</em></h2></div><p>Cada negocio tiene su propia historia.<br/>Tu web también debería tenerla.</p></div>
    <div className="project-grid">{projects.map((project,index)=><Dialog key={project.id}><article className={`project-card project-${index}`}><DialogTrigger asChild><button className="project-open" aria-label={`Ver ${project.demo?'concepto':'proyecto'} ${project.name}`}><ProjectPreview project={project}/><div className="project-info"><div><div className="project-title"><h3>{project.name}</h3><span>{project.category}</span></div><p>{project.summary}</p></div><span className="project-arrow"><ArrowUpRight size={20}/></span></div></button></DialogTrigger>{project.demo&&<span className="concept-badge">Concepto de diseño</span>}</article>
    <DialogContent className="project-dialog" showCloseButton={false}><DialogClose className="dialog-close" aria-label="Cerrar proyecto"><X size={22}/></DialogClose><span className="eyebrow">{project.demo?'EXPLORACIÓN VISUAL':'PROYECTO'} / {project.category}</span><DialogTitle className="dialog-title">{project.name}</DialogTitle><DialogDescription className="dialog-summary">{project.summary}</DialogDescription><ProjectPreview project={project}/><div className="dialog-details"><div><h4>El reto</h4><p>{project.challenge}</p></div><div><h4>La propuesta</h4><p>{project.solution}</p></div></div><div className="project-tags">{project.scope.map(tag=><span key={tag}>{tag}</span>)}</div>{project.demo?<p className="demo-note">Concepto ilustrativo de BeBrand. No corresponde a un proyecto de cliente ni a una tienda o plataforma en funcionamiento.</p>:project.url&&<a className="pill" href={project.url} target="_blank" rel="noreferrer">Visitar sitio <ArrowUpRight size={16}/></a>}</DialogContent>
    </Dialog>)}</div><p className="portfolio-note">Exploraciones de diseño que muestran distintas posibilidades. Próximamente, nuestros proyectos de clientes.</p>
    </div></section>;
}
