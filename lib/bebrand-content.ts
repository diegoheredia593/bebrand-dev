export const brand = {
  name: 'BeBrand',
  developmentUrl: 'https://bebrand.dev',
  // TODO: switch to https://bebrand.marketing once that custom domain is
  // connected to the bebrand-marketing Worker (same still-pending step as
  // bebrand.dev's own custom domain — see HANDOFF.md). Until then this
  // points at the real, live workers.dev URL so the cross-link actually
  // resolves instead of a dead custom domain.
  marketingUrl: 'https://bebrand-marketing-v2.herediadiego963.workers.dev',
  email: 'herediadiego963@gmail.com',
  phone: '+593 96 808 1170',
  whatsapp: 'https://wa.me/593968081170?text=Hola%20BeBrand%2C%20quiero%20conversar%20sobre%20un%20proyecto%20digital.',
};

export type Project = {
  id: string;
  name: string;
  category: string;
  visual: 'exclusive' | 'nexmoni' | 'minka' | 'diego' | 'caja';
  summary: string;
  overview: string;
  features: string[];
  prototype?: boolean;
  url: string;
  image?: string;
};

export const projects: Project[] = [
  { id: 'el-exclusivo', name: 'El Exclusivo', category: 'Catálogo corporativo', visual: 'exclusive',
    summary: 'Uniformes, prendas personalizadas y souvenirs para llevar una marca más lejos.',
    overview: 'Una experiencia comercial que presenta productos personalizados para empresas y facilita explorar las opciones de la marca.',
    features: ['Catálogo de productos', 'Identidad de marca', 'Diseño responsive'],
    url: 'https://triple-aaa-web.herediadiego963.workers.dev/', image: '/portfolio/el-exclusivo.webp' },
  { id: 'nexmoni', name: 'NexMoni', category: 'Web de servicios', visual: 'nexmoni',
    summary: 'Una web para explicar servicios financieros entre Europa y Latinoamérica.',
    overview: 'El sitio organiza la propuesta de NexMoni en torno a una cuenta en euros, transferencias internacionales e información de precios.',
    features: ['Contenido multilingüe', 'Servicios y tarifas', 'Experiencia responsive'],
    url: 'https://nexmoni-rediseno.herediadiego963.workers.dev/es' },
  { id: 'minka', name: 'Minka', category: 'Plataforma digital', visual: 'minka',
    summary: 'Gestión de urbanizaciones, residentes y tareas en un solo lugar.',
    overview: 'Minka presenta una plataforma para administrar urbanizaciones, condominios y edificios en Ecuador, con herramientas para comunicación, reservas y cobranzas.',
    features: ['Software de gestión', 'Experiencia para residentes', 'Demostración interactiva'],
    url: 'https://appminka.com/', image: '/portfolio/minka.png' },
  { id: 'dr-diego-lucas', name: 'Dr. Diego Lucas', category: 'Sitio editorial', visual: 'diego',
    summary: 'Un espacio digital para artículos, reflexión y conocimiento médico.',
    overview: 'Un sitio personal que reúne artículos sobre salud, investigación y tecnología con una lectura clara y una navegación sencilla.',
    features: ['Artículos', 'Marca personal', 'Diseño editorial'],
    url: 'https://drdiegolucas.com/', image: '/portfolio/dr-diego-lucas.jpg' },
  { id: 'caja-5-octubre', name: 'Caja 5 de Octubre', category: 'Prototipo web', visual: 'caja', prototype: true,
    summary: 'Un prototipo para explorar ahorro, crédito y simulación de cuotas.',
    overview: 'Experiencia demostrativa de una caja de ahorro y crédito, con presentación de servicios y un simulador de crédito de valores ilustrativos.',
    features: ['Prototipo visual', 'Simulador demostrativo', 'Diseño responsive'],
    url: 'https://nexmoni-caja-5-octubre.herediadiego963.workers.dev/' },
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
