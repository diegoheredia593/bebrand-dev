'use client';
import { ArrowUpRight, X } from 'lucide-react';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { ProjectPreview } from './project-preview';
import { projects } from '@/lib/bebrand-content';

export function Portfolio() {
  return <section className="projects-section" id="proyectos"><div className="container">
    <div className="section-heading"><div><span className="eyebrow">TRABAJO EN PANTALLA</span><h2>Ideas que se<br/><em>convierten en experiencias.</em></h2></div><p>Explora sitios y productos digitales<br/>creados para diferentes necesidades.</p></div>
    <div className="project-grid">{projects.map((project, index) => <Dialog key={project.id}>
      <article className={`project-card project-${index}`}>
        <DialogTrigger asChild><button className="project-open" aria-label={`Ver detalles de ${project.name}`}><ProjectPreview project={project}/><div className="project-info"><div><div className="project-title"><h3>{project.name}</h3><span>{project.category}</span></div><p>{project.summary}</p></div><span className="project-arrow"><ArrowUpRight size={20}/></span></div></button></DialogTrigger>
        <a className="project-visit" href={project.url} target="_blank" rel="noopener noreferrer">Visitar sitio <ArrowUpRight size={15}/></a>
        {project.prototype && <span className="concept-badge">Prototipo demostrativo</span>}
      </article>
      <DialogContent className="project-dialog" showCloseButton={false}>
        <DialogClose className="dialog-close" aria-label="Cerrar proyecto"><X size={22}/></DialogClose>
        <span className="eyebrow">{project.prototype ? 'PROTOTIPO' : 'SITIO PUBLICADO'} / {project.category}</span>
        <DialogTitle className="dialog-title">{project.name}</DialogTitle>
        <DialogDescription className="dialog-summary">{project.summary}</DialogDescription>
        <ProjectPreview project={project}/>
        <div className="dialog-details"><div><h4>El sitio</h4><p>{project.overview}</p></div><div><h4>Qué puedes explorar</h4><div className="project-tags">{project.features.map(feature => <span key={feature}>{feature}</span>)}</div></div></div>
        {project.prototype && <p className="demo-note">Este sitio es un prototipo demostrativo. Los valores de su simulador son ilustrativos.</p>}
        <a className="pill" href={project.url} target="_blank" rel="noopener noreferrer">Visitar sitio <ArrowUpRight size={16}/></a>
      </DialogContent>
    </Dialog>)}</div>
    <p className="portfolio-note">Explora cada proyecto en su sitio. Caja 5 de Octubre es un prototipo demostrativo.</p>
  </div></section>;
}
