import type { Project } from '@/lib/bebrand-content';

export function ProjectPreview({ project }: { project: Project }) {
  if (project.image) {
    return <div className={`project-visual showcase-visual showcase-${project.visual}`}>
      <img src={project.image} alt={`Imagen del sitio ${project.name}`} loading="lazy" width="1200" height="750" />
    </div>;
  }

  if (project.visual === 'nexmoni') {
    return <div className="project-visual showcase-visual showcase-nexmoni" aria-label="Representación visual del sitio NexMoni">
      <div className="showcase-window"><div className="showcase-nav"><strong>nexmoni<span>.</span></strong><span>Cuenta · Envíos · Precios</span></div>
        <div className="showcase-copy"><span>EUROPA ↔ LATINOAMÉRICA</span><strong>Tu vida está en dos países.<br/>Tu cuenta también.</strong><small>Una cuenta para moverte entre dos mundos.</small></div>
        <div className="showcase-card"><span>CUENTA EUROPEA</span><strong>€</strong></div>
      </div>
    </div>;
  }

  return <div className="project-visual showcase-visual showcase-caja" aria-label="Representación visual del prototipo Caja 5 de Octubre">
    <div className="showcase-window"><div className="showcase-nav"><strong>5 DE OCTUBRE</strong><span>AHORRO · CRÉDITO</span></div>
      <div className="showcase-copy"><span>PROTOTIPO DEMOSTRATIVO</span><strong>El impulso para<br/>hacerlo posible.</strong><small>Explora opciones de ahorro y crédito.</small></div>
      <div className="showcase-card"><span>SIMULADOR DE CRÉDITO</span><strong>↗</strong></div>
    </div>
  </div>;
}
