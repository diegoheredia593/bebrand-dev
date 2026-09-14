# BeBrand Desarrollo

Sitio de la agencia de desarrollo de software y web. Dominio previsto: **https://bebrand.dev**. La segunda división enlaza a **https://bebrand.marketing**.

## Stack

React 19, TypeScript, estructura App Router compatible con Next.js sobre Vinext/Vite, Tailwind CSS 4 y componentes accesibles Radix/shadcn. Los componentes propios están separados por sección. Las animaciones actuales usan CSS y respetan `prefers-reduced-motion`; se pueden incorporar Motion, GSAP y otras bibliotecas React en futuras iteraciones.

## Desarrollo

Requiere Node 22.13 o superior. Ejecutar `npm run install:ci`, después `npm run dev`. Vista local en http://localhost:5173. `npm run build` genera la versión de producción.

## Editar contenido

- `lib/bebrand-content.ts`: contacto, dominios, servicios, proceso y proyectos.
- `components/bebrand/`: secciones y representaciones visuales de los conceptos.
- `app/globals.css`: diseño, temas azul/blanco y reglas responsive.
- `public/brand/logo-original.jpeg`: logo suministrado sin modificar.
- `app/layout.tsx`: metadatos y canonical de bebrand.dev.

Los tres proyectos iniciales son **conceptos ilustrativos**, no trabajos para clientes. Para sustituirlos, introducir nombre, descripción, alcance, imagen local y URL verificada; cambiar `demo` a `false`. No se han inventado testimonios, clientes ni resultados.

Los botones de contacto abren WhatsApp (+593 96 808 1170) o el cliente de correo. No hay formulario ni base de datos. No se envían mensajes automáticamente.

## Dominios

La configuración de enlaces y SEO está preparada para bebrand.dev. Una publicación de vista previa no conecta ni compra ese dominio. Para usarlo como dirección pública será necesario configurar su DNS y alojamiento con acceso del propietario. bebrand.marketing se desarrollará por separado, reutilizando la identidad visual.

La preferencia de tema se guarda en este dispositivo para este dominio. Los dos dominios no comparten automáticamente ese almacenamiento.

## Publicación

El código se mantiene en el repositorio privado `diegoheredia593/bebrand-dev` y la aplicación se despliega como el Worker `bebrand-dev` de Cloudflare. Después de iniciar sesión con Wrangler, `npm run deploy:cloudflare` compila y publica una nueva versión.

URL actual de Cloudflare: https://bebrand-dev.herediadiego963.workers.dev

Para usar `bebrand.dev`, agrega el dominio personalizado al Worker desde Cloudflare y aplica los registros DNS indicados por la plataforma.
