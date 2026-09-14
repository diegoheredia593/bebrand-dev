export const brand = {
  name: 'BeBrand',
  developmentUrl: 'https://bebrand.dev',
  marketingUrl: 'https://bebrand.marketing',
  email: 'herediadiego963@gmail.com',
  phone: '+593 96 808 1170',
  whatsapp: 'https://wa.me/593968081170?text=Hola%20BeBrand%2C%20quiero%20conversar%20sobre%20un%20proyecto%20digital.',
};

export type Project = {
  id: string;
  name: string;
  category: string;
  type: 'commerce' | 'website' | 'software';
  summary: string;
  challenge: string;
  solution: string;
  scope: string[];
  demo: boolean;
  url?: string;
  image?: string;
};

// Replace these editorial concepts with verified client work when supplied.
// A real project may supply an image, live URL and demo: false.
export const projects: Project[] = [
  { id: 'origen', name: 'Origen', category: 'E-commerce', type: 'commerce', demo: true,
    summary: 'Una tienda con tanto carácter como su producto.',
    challenge: 'Explorar cómo una marca de café de especialidad puede expresar su identidad y facilitar la compra en línea.',
    solution: 'Una propuesta editorial que reúne un catálogo claro, información de origen y una experiencia de compra pensada para móvil.',
    scope: ['Dirección visual', 'Diseño de tienda', 'Experiencia móvil'] },
  { id: 'forma', name: 'Forma Studio', category: 'Web corporativa', type: 'website', demo: true,
    summary: 'Una presencia digital que deja hablar al diseño.',
    challenge: 'Presentar los servicios y la visión de un estudio creativo sin restarle protagonismo a su trabajo.',
    solution: 'Una web de navegación sencilla, tipografía expresiva y una estructura que conecta proyectos, servicios y contacto.',
    scope: ['Estrategia de contenido', 'Diseño web', 'Portafolio'] },
  { id: 'nexo', name: 'Nexo', category: 'Software a medida', type: 'software', demo: true,
    summary: 'Menos tareas dispersas. Más claridad para tu equipo.',
    challenge: 'Reunir el seguimiento de proyectos y las tareas de un equipo en una sola interfaz.',
    solution: 'Una propuesta de panel de trabajo con estados visibles, prioridades claras y una visión compartida de cada proyecto.',
    scope: ['Diseño de producto', 'Panel de gestión', 'Flujos de trabajo'] },
];

export const services = [
  { number:'01', title:'Páginas web', subtitle:'Tu mejor primera impresión.', description:'Landing pages y sitios corporativos que explican lo que haces, transmiten confianza y hacen fácil contactarte.', tags:['Landing pages', 'Web corporativa', 'Portafolios'], icon:'web' },
  { number:'02', title:'E-commerce', subtitle:'De «me gusta» a «lo quiero».', description:'Tiendas online que cuidan cada paso: descubrir un producto, resolver dudas y completar una compra.', tags:['Catálogo', 'Pagos', 'Experiencia de compra'], icon:'shop' },
  { number:'03', title:'Software a medida', subtitle:'Tu operación tiene su propia lógica.', description:'Creamos herramientas alrededor de tus procesos para que tu equipo trabaje con claridad y tu negocio pueda evolucionar.', tags:['Plataformas', 'Paneles de gestión', 'Aplicaciones web'], icon:'code' },
  { number:'04', title:'Soluciones integrales', subtitle:'Todo conectado. Todo más simple.', description:'Integramos tus herramientas y automatizamos tareas repetitivas para que dediques más tiempo a lo que necesita de ti.', tags:['Integraciones', 'Automatización', 'APIs'], icon:'workflow' },
];

export const process = [
  { number:'01', title:'Entendemos', description:'Escuchamos tu idea, conocemos tu negocio y definimos juntos qué necesita resolver el proyecto.' },
  { number:'02', title:'Diseñamos', description:'Damos forma a la estructura y a la experiencia. Revisamos contigo cómo se verá y cómo funcionará.' },
  { number:'03', title:'Desarrollamos', description:'Convertimos el diseño en una web o herramienta funcional, cuidando cada pantalla y cada interacción.' },
  { number:'04', title:'Lanzamos', description:'Probamos, afinamos y publicamos. Te entregamos lo necesario para seguir con claridad.' },
];
