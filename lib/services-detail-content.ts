export type DetailedService = {
  id: string;
  number: string;
  title: string;
  lead: string;
  description: string;
  includes: string[];
  outcome: string;
  note?: string;
};

export const detailedServices: DetailedService[] = [
  {
    id: 'web-ecommerce', number: '01', title: 'Web y e-commerce',
    lead: 'Una presencia digital que trabaja por tu negocio.',
    description: 'Diseñamos landing pages, sitios corporativos, catálogos y tiendas online con una estructura clara, buena experiencia móvil y recorridos que ayudan a pasar del interés a la acción.',
    includes: ['Landing pages y sitios corporativos', 'Catálogos y tiendas online', 'Carrito y flujo de compra', 'Conexión con Datafast', 'Administración de contenidos'],
    outcome: 'Una web lista para mostrar lo que haces y facilitar consultas o ventas.',
    note: 'La integración con Datafast depende de los requisitos, credenciales y aprobación del proveedor para cada comercio.',
  },
  {
    id: 'apps-software', number: '02', title: 'Apps y software a medida',
    lead: 'Herramientas creadas alrededor de tu forma de trabajar.',
    description: 'Convertimos procesos dispersos en aplicaciones y plataformas con flujos definidos, roles claros y una base preparada para evolucionar. El alcance se decide según el problema, los usuarios y las plataformas necesarias.',
    includes: ['Aplicaciones web y móviles', 'Paneles de administración', 'Portales para clientes o equipos', 'Automatización de procesos', 'APIs y bases de datos'],
    outcome: 'Un producto digital útil para tu operación, diseñado para crecer por etapas.',
  },
  {
    id: 'ui-ux', number: '03', title: 'Diseño UI/UX',
    lead: 'Interfaces que se entienden y se disfrutan.',
    description: 'Antes de construir, definimos qué necesitan las personas y cómo recorrerán el producto. Damos forma a la arquitectura, los flujos y la interfaz para que cada decisión visual tenga una función.',
    includes: ['Investigación y definición de usuarios', 'Arquitectura de información', 'Flujos y wireframes', 'Prototipos interactivos', 'Diseño visual y sistema de componentes'],
    outcome: 'Una experiencia coherente, validable y lista para desarrollo.',
  },
  {
    id: 'seo-geo', number: '04', title: 'SEO y GEO',
    lead: 'Contenido claro para personas y buscadores.',
    description: 'Trabajamos la base técnica y editorial para que tus páginas sean fáciles de encontrar, recorrer y comprender. En búsquedas con IA, partimos de esos mismos fundamentos: información útil, bien organizada y verificable.',
    includes: ['Estructura y contenido de páginas', 'Metadatos y enlaces internos', 'Rendimiento y experiencia móvil', 'Datos estructurados cuando aportan valor', 'Revisión de visibilidad en buscadores'],
    outcome: 'Un sitio con fundamentos sólidos para mejorar su presencia orgánica.',
    note: 'GEO no es una garantía de aparecer en respuestas de IA ni requiere una técnica especial para las funciones con IA de Google.',
  },
  {
    id: 'integraciones', number: '05', title: 'Integraciones',
    lead: 'Tus herramientas, trabajando juntas.',
    description: 'Conectamos los sistemas que tu negocio ya utiliza para reducir pasos manuales y mantener la información en el lugar correcto. Evaluamos compatibilidad, permisos y seguridad antes de definir la solución.',
    includes: ['Pasarelas y enlaces de pago', 'CRM y formularios', 'APIs de terceros', 'Notificaciones y correos', 'Sincronización de datos'],
    outcome: 'Procesos más fluidos y menos información duplicada.',
  },
];
