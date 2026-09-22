# Handoff — bebrand.dev

Última actualización de este documento: **22 de septiembre de 2026**.

Este documento reúne el contexto necesario para continuar desarrollando, revisando y publicando la web de BeBrand Desarrollo sin volver a reconstruir decisiones ya tomadas.

## 1. Estado actual

- **Producto:** sitio comercial y portafolio de la división de desarrollo de BeBrand.
- **Marca mostrada:** `BEBRAND.dev`.
- **Dominio previsto:** <https://bebrand.dev>.
- **URL pública actual:** <https://bebrand-dev.herediadiego963.workers.dev>.
- **Página de servicios:** <https://bebrand-dev.herediadiego963.workers.dev/servicios>.
- **Repositorio privado:** <https://github.com/diegoheredia593/bebrand-dev>.
- **Worker de Cloudflare:** `bebrand-dev`.
- **Rama de trabajo y publicación actual:** `redesign/hero-cta-project-focus`.
- **Último commit al redactar este handoff:** `4e8f40b` — `Use supplied BeBrand logos across themes`.
- **Última versión de Cloudflare verificada:** `91831005-de54-4cd7-97d9-d8d11b7fc65e`.
- **Estado local al redactar este documento:** limpio y sincronizado con la rama remota, antes de agregar este archivo.

El dominio personalizado `bebrand.dev` todavía debe conectarse al Worker desde la cuenta de Cloudflare y mediante DNS. La web pública funcional usa por ahora el subdominio `workers.dev` indicado arriba.

## 2. Ubicación del proyecto

Directorio local en Windows:

```text
C:\Users\USER\Desktop\bebrand-web
```

Archivo del logo original y variantes recibidas:

```text
C:\Users\USER\Downloads\bebrand logos
```

Las variantes que realmente usa la aplicación ya están copiadas en `public/brand/`, por lo que no es necesario depender de la carpeta Downloads para compilar o desplegar.

## 3. Objetivo y dirección de producto

La web presenta a BeBrand como una agencia de desarrollo de software, soluciones digitales, páginas web y e-commerce. Debe sentirse editorial, clara y profesional, con una identidad principalmente azul y blanca.

Existe una segunda división prevista para marketing en `bebrand.marketing`. Esta web enlaza a ese dominio, pero su desarrollo es un proyecto separado. Ambas divisiones deben conservar una estructura visual y una paleta relacionadas.

Principios ya aplicados:

- Copy directo, humano y orientado a resultados.
- Azul BeBrand y blanco como colores intercambiables mediante un switch.
- Diseño responsive desde móvil hasta escritorio.
- Animaciones CSS discretas y compatibles con `prefers-reduced-motion`.
- Componentes React separados para permitir nuevas animaciones o librerías en iteraciones futuras.
- No inventar testimonios, métricas, clientes, resultados ni funcionalidades.
- Identificar claramente los prototipos que no son productos operativos.
- No prometer posicionamiento SEO/GEO ni aprobación de integraciones externas.

## 4. Stack y arquitectura

- React 19.
- TypeScript estricto.
- Next.js App Router compatible, ejecutado mediante **Vinext/Vite**.
- Tailwind CSS 4 y CSS propio en `app/globals.css`.
- Componentes accesibles Radix/shadcn disponibles en `components/ui/`.
- Iconos de `lucide-react`.
- Despliegue server-side y de assets mediante Cloudflare Workers y Wrangler.
- Node.js **22.13 o superior**.

No hay actualmente:

- Base de datos utilizada por esta web.
- Formulario con backend.
- CMS.
- Autenticación.
- Analítica configurada.
- Integración real con Datafast.

Los contactos abren WhatsApp o el cliente de correo del visitante.

## 5. Rutas públicas

| Ruta | Archivo principal | Propósito |
|---|---|---|
| `/` | `app/page.tsx` | Portada, portafolio, resumen de servicios, proceso y contacto. |
| `/servicios` | `app/servicios/page.tsx` | Explicación detallada de servicios. |

`app/layout.tsx` define el idioma, metadatos globales, canonical previsto, Open Graph, favicon y la inicialización del tema antes de hidratar React.

## 6. Archivos que se editan con mayor frecuencia

### Contenido y datos

- `lib/bebrand-content.ts`
  - Datos de marca y contacto.
  - URLs de `bebrand.dev` y `bebrand.marketing`.
  - Proyectos del portafolio.
  - Resumen de servicios de la portada.
  - Proceso de trabajo.
- `lib/services-detail-content.ts`
  - Contenido completo de la página `/servicios`.
  - Lista de prestaciones, resultados y notas aclaratorias.

### Componentes BeBrand

- `components/bebrand/development-site.tsx`: composición de la portada.
- `components/bebrand/site-header.tsx`: header compartido, navegación responsive y switch de tema.
- `components/bebrand/portfolio.tsx`: cuadrícula, enlaces y modal de cada proyecto.
- `components/bebrand/project-preview.tsx`: imágenes o composiciones editoriales del portafolio.
- `components/bebrand/services.tsx`: resumen de servicios y enlace a `/servicios`.
- `components/bebrand/service-artwork.tsx`: ilustraciones UI construidas en HTML/CSS para la página detallada.
- `components/bebrand/process.tsx`: pasos del proceso.
- `components/bebrand/contact.tsx`: contacto y footer compartidos.

### Diseño

- `app/globals.css`: sistema visual completo, temas, layouts, animaciones y breakpoints.

Este archivo está muy concentrado y contiene gran parte del diseño en reglas compactas. Antes de hacer un rediseño amplio conviene dividirlo por secciones o capas para reducir conflictos. Para cambios pequeños, añadir reglas junto a la sección relacionada y validar ambos temas.

### Recursos

- `public/brand/`: logos oficiales.
- `public/portfolio/`: imágenes locales de proyectos.
- `public/favicon.svg`: favicon anterior; el metadata actual usa el monograma JPEG oficial.

## 7. Identidad visual y temas

Variables principales en `app/globals.css`:

```css
--blue: #204da0;
--paper: #f7f7f2;
```

El elemento `<html>` usa:

```text
data-theme="blue"
data-theme="light"
```

La preferencia se guarda en:

```text
localStorage['bebrand-theme']
```

`SiteHeader` usa `useSyncExternalStore` y un evento `bebrand-theme-change` para que el switch y el DOM permanezcan sincronizados. El script inline de `app/layout.tsx` aplica el tema antes del render y evita un destello del tema equivocado.

Logos actuales:

| Uso | Fondo azul | Fondo blanco |
|---|---|---|
| Header | `public/brand/bebrand-dev-white.png` | `public/brand/bebrand-dev-blue.png` |
| Footer | `public/brand/bebrand-white.png` | `public/brand/bebrand-blue.png` |
| Favicon | `public/brand/bebr-blue-square.jpeg` | Una sola versión cuadrada. |

Las clases `.brand-on-blue` y `.brand-on-light` controlan qué variante se muestra. Los wordmarks PNG tienen transparencia real. No agregarles fondos ni bordes.

## 8. Portafolio actual

El portafolio contiene cinco entradas:

1. **El Exclusivo** — catálogo corporativo  
   <https://triple-aaa-web.herediadiego963.workers.dev/>
2. **NexMoni** — web de servicios  
   <https://nexmoni-rediseno.herediadiego963.workers.dev/es>
3. **Minka** — plataforma digital  
   <https://appminka.com/>
4. **Dr. Diego Lucas** — sitio editorial  
   <https://drdiegolucas.com/>
5. **Caja 5 de Octubre** — prototipo web  
   <https://nexmoni-caja-5-octubre.herediadiego963.workers.dev/>

Caja 5 de Octubre debe conservar la etiqueta **“Prototipo demostrativo”**. Su simulador usa valores ilustrativos. NexMoni y Caja 5 de Octubre emplean composiciones editoriales propias en el portafolio; no se presentan como capturas exactas.

Para agregar un proyecto:

1. Añadirlo a `projects` en `lib/bebrand-content.ts`.
2. Extender el tipo `Project['visual']` si necesita una nueva variante.
3. Agregar su imagen optimizada a `public/portfolio/`, si corresponde.
4. Adaptar `ProjectPreview` si necesita una composición especial.
5. Verificar el enlace externo, el texto alternativo, el modal, escritorio y móvil.

## 9. Servicios actuales

La portada resume cuatro áreas. `/servicios` desarrolla cinco:

1. Web y e-commerce.
2. Apps y software a medida.
3. Diseño UI/UX.
4. SEO y GEO.
5. Integraciones.

Consideraciones de copy:

- Datafast se presenta como una posible conexión para e-commerce.
- La integración depende de las credenciales, requisitos y aprobación del proveedor para cada comercio.
- No se afirma que BeBrand o la web tengan una conexión Datafast activa.
- GEO se explica como una extensión de fundamentos sólidos de SEO y contenido útil.
- No se garantiza aparecer en respuestas de IA ni en posiciones específicas.

## 10. Contacto y URLs de marca

Configuración centralizada en `lib/bebrand-content.ts`:

```text
Email: herediadiego963@gmail.com
Teléfono: +593 96 808 1170
WhatsApp: +593968081170
Marketing: https://bebrand.marketing
Desarrollo: https://bebrand.dev
```

Si cambia cualquiera de estos datos, editar primero el objeto `brand`. Revisar después metadatos, footer y cualquier texto codificado en componentes.

## 11. Instalación y ejecución local

Abrir PowerShell en:

```powershell
Set-Location 'C:\Users\USER\Desktop\bebrand-web'
```

Instalar dependencias de forma reproducible:

```powershell
npm run install:ci
```

Iniciar desarrollo:

```powershell
npm run dev
```

Vista local habitual:

```text
http://localhost:5173/
http://localhost:5173/servicios
```

Si `npm` no se resuelve correctamente en el entorno de automatización de Windows, usar:

```powershell
node 'C:/Program Files/nodejs/node_modules/npm/bin/npm-cli.js' run dev
```

## 12. Validación antes de publicar

Ejecutar una sola ronda completa después de terminar el lote de cambios:

```powershell
npm run build
node node_modules/typescript/bin/tsc --noEmit
npm run lint
git diff --check
```

Estado conocido:

- `build` pasa.
- TypeScript pasa.
- ESLint pasa sin errores.
- ESLint muestra advertencias por `<img>` en logos y previews. Se mantienen deliberadamente porque los assets locales y el cambio instantáneo entre variantes no requieren el pipeline de `next/image`. Estas advertencias no bloquean el despliegue.

QA visual mínima:

1. Portada en móvil y escritorio.
2. `/servicios` en móvil y escritorio.
3. Switch azul/blanco en ambas rutas.
4. Header, menú móvil y footer.
5. Portafolio: cinco tarjetas, modales y enlaces externos.
6. Enlace “Explorar todos los servicios”.
7. WhatsApp y correo, sin enviar mensajes durante la prueba.
8. Confirmar que no existe overflow horizontal en móvil.
9. Respetar `prefers-reduced-motion` al agregar animaciones.

## 13. Git y GitHub

Remote:

```text
origin  https://github.com/diegoheredia593/bebrand-dev.git
```

La rama usada hasta ahora para todos los cambios y despliegues es:

```text
redesign/hero-cta-project-focus
```

En este equipo Git puede marcar el repositorio como directorio no seguro. Si ocurre, añadir la opción solo al comando:

```powershell
git -c safe.directory=C:/Users/USER/Desktop/bebrand-web status
```

Flujo de guardado actual:

```powershell
git -c safe.directory=C:/Users/USER/Desktop/bebrand-web status --short --branch
git -c safe.directory=C:/Users/USER/Desktop/bebrand-web diff --check
git -c safe.directory=C:/Users/USER/Desktop/bebrand-web add <archivos>
git -c safe.directory=C:/Users/USER/Desktop/bebrand-web commit -m "Descripción concreta"
git -c safe.directory=C:/Users/USER/Desktop/bebrand-web push origin redesign/hero-cta-project-focus
```

No crear otra rama para una iteración pequeña salvo que el usuario lo solicite o que el cambio necesite aislamiento. Antes de editar, comprobar siempre `status` para no pisar cambios nuevos hechos por el usuario.

## 14. Publicación en Cloudflare

La aplicación compila a:

```text
dist/client
dist/server
```

El `wrangler.json` usado para publicar se genera en:

```text
dist/server/wrangler.json
```

Comando simplificado disponible:

```powershell
npm run deploy:cloudflare
```

Secuencia explícita que ya fue verificada en este equipo:

```powershell
npm run build
Set-Location 'C:\Users\USER\Desktop\bebrand-web\dist\server'
$env:WRANGLER_LOG_PATH='C:/Users/USER/Desktop/bebrand-web/.wrangler/logs'
node ../../node_modules/wrangler/bin/wrangler.js deploy --config wrangler.json --name bebrand-dev
```

Resultado esperado:

```text
https://bebrand-dev.herediadiego963.workers.dev
```

Después del despliegue, abrir y verificar expresamente:

```text
https://bebrand-dev.herediadiego963.workers.dev/
https://bebrand-dev.herediadiego963.workers.dev/servicios
```

Wrangler necesita una sesión válida de Cloudflare en el equipo. No guardar tokens, claves ni credenciales en este documento o en Git.

## 15. Flujo recomendado para iterar con menos interrupciones

Cuando el usuario pida cambios, seguir este orden:

1. **Actualizar estado:** revisar `git status`, rama y cambios remotos si el usuario dice que modificó GitHub.
2. **Agrupar alcance:** implementar todos los cambios relacionados antes de validar o desplegar.
3. **Editar localmente:** contenido, componentes, estilos y assets.
4. **Validar una vez:** build, TypeScript, lint y `git diff --check`.
5. **QA visual:** probar las dos rutas, los dos temas y móvil/escritorio.
6. **Corregir y repetir solo lo afectado:** evitar ciclos completos si no cambió nada relevante.
7. **Publicar una vez:** desplegar el lote completo en Cloudflare.
8. **Verificar producción:** comprobar el contenido visible en la URL pública.
9. **Guardar en Git:** commit descriptivo y push a la rama actual.
10. **Reportar:** resumir cambios, validación, URL pública y cualquier limitación real.

Para reducir aprobaciones y pushbacks en sesiones futuras:

- El usuario ya ha autorizado históricamente publicar este proyecto en el Worker `bebrand-dev` y subir sus cambios al repositorio `diegoheredia593/bebrand-dev` cuando pide implementar una iteración. La autorización vigente debe interpretarse según la instrucción actual y el estado de la sesión.
- Las herramientas del entorno pueden mostrar una aprobación automática para comandos con red o que escriben dentro de `.git`; esto es una restricción del sandbox, no una duda sobre el diseño.
- Agrupar el commit y el push al final de la iteración.
- Hacer un solo despliegue después de que las validaciones pasen.
- No pedir confirmación conversacional adicional para acciones reversibles ya incluidas en la solicitud. Si el entorno exige una aprobación, usar la solicitud técnica de escalación con una descripción concreta.
- No desplegar cambios incompletos ni publicar antes del QA local.
- Si el usuario pide solo una propuesta o ideas, no editar ni desplegar hasta que autorice la implementación.

## 16. Historial de decisiones importantes

- Se creó primero la portada de desarrollo; `bebrand.marketing` se deja como proyecto separado.
- Se sustituyeron conceptos ficticios del portafolio por cinco URLs suministradas por el usuario.
- Caja 5 de Octubre quedó etiquetado como prototipo.
- Se agregó `/servicios` como página independiente y más profunda.
- Se centralizó el header para compartir navegación y tema entre rutas.
- Se corrigió el manejo inicial del tema con `useSyncExternalStore`.
- Se adoptaron los logos transparentes oficiales: versión blanca sobre azul y azul sobre blanco.
- El footer usa el wordmark `BEBRAND`; el header usa `BEBRAND.dev`.
- Cloudflare Workers es el proveedor solicitado y usado. No migrar a otra plataforma sin una instrucción explícita.

Commits recientes útiles:

```text
4e8f40b Use supplied BeBrand logos across themes
9a19ff3 Add detailed services page
30e44dc Add live website portfolio projects
78dc331 Refine hero CTA and project grid interactions
2118c63 Document Cloudflare deployment workflow
```

## 17. Riesgos y próximos pasos razonables

### Pendientes técnicos

- Conectar `bebrand.dev` al Worker y actualizar/verificar DNS.
- Confirmar que los canonicals apunten al dominio definitivo solo cuando ese dominio sirva la web.
- Añadir `sitemap.xml` y `robots.txt` cuando el dominio principal esté listo.
- Configurar analítica y Search Console si el propietario lo desea.
- Optimizar el peso de imágenes del portafolio y logos si el rendimiento lo requiere.
- Dividir `app/globals.css` si la web sigue creciendo.
- Incorporar pruebas automatizadas solo para comportamiento con riesgo real; no duplicar la implementación con pruebas triviales.

### Contenido

- Agregar nuevos proyectos reales cuando el usuario comparta URLs y assets.
- Sustituir representaciones editoriales por capturas o recursos aprobados si se desea mayor fidelidad.
- Revisar periódicamente enlaces externos y textos de servicios.
- Mantener `bebrand.marketing` como enlace externo hasta que exista su sitio.

### SEO

- La metadata está preparada para `https://bebrand.dev`, aunque la URL pública actual es `workers.dev`.
- No prometer resultados de ranking.
- Para GEO, conservar el enfoque de contenido útil, verificable y bien estructurado sobre tácticas no demostradas.

## 18. Checklist de una sesión nueva

Una nueva sesión puede comenzar con:

```text
Lee HANDOFF.md y README.md.
Revisa git status y la rama actual.
No reviertas cambios del usuario.
Implementa el cambio solicitado en el proyecto existente.
Valida build, TypeScript, lint y diseño responsive.
Si la solicitud implica publicación, despliega una sola vez en el Worker bebrand-dev, verifica producción y sube el commit a la rama actual.
```

Con este contexto no debería ser necesario volver a preguntar por el stack, el repositorio, la ruta local, el contacto, la paleta, el proveedor de despliegue ni el destino de publicación.
