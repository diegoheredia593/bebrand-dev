import { ArrowUpRight, Globe2, ShoppingBag, Smartphone } from 'lucide-react';

// Illustrative collage for the homepage hero — three overlapping "fake
// product" cards (web / tienda / software) built in the same pure-CSS
// visual language already established in service-artwork.tsx and
// project-preview.tsx, extended to hero scale. Purely decorative: the
// real copy sits in the text column next to it.
export function HeroShowcase() {
  return (
    <div className="hero-showcase" aria-hidden="true">
      <div className="hero-showcase-card hero-showcase-web">
        <div className="hero-showcase-browser">
          <span />
          <span />
          <span />
          <i>tu-sitio.com</i>
        </div>
        <div className="hero-showcase-web-body">
          <span className="hero-showcase-label">
            <Globe2 size={12} /> SITIO WEB
          </span>
          <strong>
            Tu marca,
            <br />
            bien presentada.
          </strong>
          <span className="hero-showcase-cta">
            Ver más <ArrowUpRight size={11} />
          </span>
        </div>
      </div>

      <div className="hero-showcase-card hero-showcase-app">
        <div className="hero-showcase-app-top">
          <span className="hero-showcase-label">
            <Smartphone size={12} /> SOFTWARE
          </span>
        </div>
        <div className="hero-showcase-app-row" />
        <div className="hero-showcase-app-row hero-showcase-app-row-short" />
        <div className="hero-showcase-app-metric">
          <span>En curso</span>
          <strong>08</strong>
        </div>
      </div>

      <div className="hero-showcase-card hero-showcase-shop">
        <span className="hero-showcase-label">
          <ShoppingBag size={12} /> TIENDA
        </span>
        <div className="hero-showcase-shop-shape">
          <span />
        </div>
        <div className="hero-showcase-shop-footer">
          <span>Nueva colección</span>
          <strong>$48</strong>
        </div>
      </div>
    </div>
  );
}
