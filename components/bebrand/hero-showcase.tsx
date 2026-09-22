import { ArrowUpRight, Globe2, Lock, ShoppingBag, Smartphone } from 'lucide-react';

// Illustrative collage for the homepage hero — three overlapping "fake
// product" cards (web / software / tienda) built in a pure-CSS visual
// language. Purely decorative: the real copy sits in the text column
// next to it.
//
// This is the reference implementation of BeBrand's illustration
// "format" — the level of chrome/detail every future product mockup on
// the site (service detail pages, portfolio previews) should match:
//   - .hero-showcase-label: an icon + 9-11px uppercase tracked chip.
//     Always the first thing inside a card — it names what the fake
//     product is before anything else does.
//   - One realistic "chrome" affordance per card type (browser bar with
//     favicon + lock, a status dot, a badge ribbon) — a single credible
//     detail beats several generic ones.
//   - Content is never just a heading + one CTA: every card carries at
//     least one data/visual element (image block, bar chart + avatars,
//     rating + swatches) so it reads as a real interface, not a slide.
//   - Depth via a soft inset highlight border on every card, plus one
//     shared ambient glow anchored behind the whole composition — cards
//     should feel lit from the same source, not independently shadowed.
export function HeroShowcase() {
  return (
    <div className="hero-showcase" aria-hidden="true">
      <div className="hero-showcase-glow" />

      <div className="hero-showcase-card hero-showcase-web">
        <div className="hero-showcase-browser">
          <span className="hero-showcase-favicon" />
          <span className="hero-showcase-dot" />
          <span className="hero-showcase-dot" />
          <div className="hero-showcase-urlbar">
            <Lock size={8} />
            <i>tu-sitio.com</i>
          </div>
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
          <div className="hero-showcase-web-image">
            <span />
          </div>
        </div>
      </div>

      <div className="hero-showcase-card hero-showcase-app">
        <div className="hero-showcase-app-top">
          <span className="hero-showcase-label">
            <Smartphone size={12} /> SOFTWARE
          </span>
          <span className="hero-showcase-status" aria-hidden="true" />
        </div>
        <div className="hero-showcase-app-chart" aria-hidden="true">
          <span style={{ height: '38%' }} />
          <span style={{ height: '62%' }} />
          <span style={{ height: '48%' }} />
          <span style={{ height: '88%' }} />
          <span style={{ height: '58%' }} />
        </div>
        <div className="hero-showcase-app-metric">
          <div className="hero-showcase-avatars">
            <i />
            <i />
            <i />
          </div>
          <div className="hero-showcase-app-metric-value">
            <span>En curso</span>
            <strong>08</strong>
          </div>
        </div>
      </div>

      <div className="hero-showcase-card hero-showcase-shop">
        <span className="hero-showcase-label">
          <ShoppingBag size={12} /> TIENDA
        </span>
        <div className="hero-showcase-shop-shape">
          <span className="hero-showcase-shop-badge">NUEVO</span>
          <span className="hero-showcase-shop-object" />
        </div>
        <div className="hero-showcase-swatches" aria-hidden="true">
          <i />
          <i />
          <i />
        </div>
        <div className="hero-showcase-shop-footer">
          <span>Nueva colección</span>
          <strong>$48</strong>
        </div>
      </div>
    </div>
  );
}
