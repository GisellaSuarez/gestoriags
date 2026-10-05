# Gestoría GS — Landing Web

Sitio web estático de alta conversión y optimización SEO local para **Gisella Suárez · Gestoría GS**, especializada en trámites del automotor y motovehículos en Córdoba, Argentina.

Desarrollado con arquitectura estática ultra liviana, sin frameworks de cliente pesados, con diseño editorial personalizado (*“Ruta clara, trato humano”*) y enfoque en captación directa vía **WhatsApp** y **formulario de contacto por correo electrónico**.

---

## 🛠️ Stack Tecnológico

- **Framework:** [Astro](https://astro.build/) (Static Site Generation — `output: 'static'`)
- **Lenguaje:** TypeScript en modo estricto (`astro/tsconfigs/strict`)
- **Tipografía:** Autoalojada vía `@fontsource-variable/manrope` (titulares y cuerpo) y `@fontsource/allura` (firma caligráfica “sin vueltas”)
- **Estilos:** CSS nativo con variables de diseño centralizadas (`src/styles/tokens.css` y `src/styles/global.css`)
- **SEO & Sitemaps:** `@astrojs/sitemap`, metaetiquetas Open Graph/Twitter completas y marcado estructurado JSON-LD (`ProfessionalService` y `Person`)
- **Formularios:** HTML semántico estático compatible con **Netlify Forms**, con protección honeypot y redirección a `/gracias/`
- **Hosting sugerido:** Netlify (configurado mediante `netlify.toml`)

---

## 🚀 Comandos del Proyecto

Todos los comandos se ejecutan desde la raíz del proyecto en la terminal:

| Comando | Descripción |
|---|---|
| `npm install` | Instala las dependencias del proyecto |
| `npm run dev` | Inicia el servidor de desarrollo local en `http://localhost:4321` |
| `npm run check` | Ejecuta la verificación estricta de tipos con `@astrojs/check` y TypeScript |
| `npm run lint` | Alias de `astro check` para verificación de tipos y reglas Astro (no es un linter independiente como ESLint) |
| `npm run format` | Aplica formato con Prettier sobre los archivos configurados dentro de `src/` (`.astro`, `.ts`, `.css`) |
| `npm run format:check` | Comprueba el formato de código con Prettier únicamente sobre los archivos configurados dentro de `src/` |
| `npm run build` | Compila la versión estática de producción en la carpeta `./dist/` |
| `npm run preview` | Previsualiza el build de producción localmente |

---

## 📂 Estructura del Código

```text
├── docs/
│   ├── PLAN_WEB_GESTORIA_GS.md  # Plan maestro y especificaciones de diseño y SEO
│   └── content-pending.md       # Ítems pendientes de confirmación por Gisella
├── public/
│   ├── favicon.svg              # Favicon SVG vectorizado
│   ├── robots.txt               # Instrucciones de rastreo y sitemap index
│   └── img/gisella-social.jpg   # Imagen para compartir en redes (Open Graph 1200x630)
├── src/
│   ├── assets/                  # Fotos y logotipos procesados por astro:assets
│   │   ├── brand/               # Monograma GS
│   │   └── photos/              # Fotografías de Gisella
│   ├── components/              # Componentes de UI modulares y accesibles
│   │   ├── Header.astro         # Barra superior con navegación y menú móvil accesible
│   │   ├── Hero.astro           # Sección principal con H1, foto de Gisella y CTA primario
│   │   ├── TrustBar.astro       # Barra de confianza y pilares de atención
│   │   ├── Services.astro       # Catálogo de trámites (destacados y lista editorial)
│   │   ├── ServiceCard.astro    # Tarjetas de servicio con CTA contextual a WhatsApp
│   │   ├── Benefits.astro       # Razones para elegir una gestora profesional
│   │   ├── Process.astro        # Proceso simple en 3 pasos
│   │   ├── About.astro          # Presentación personal de Gisella y valores
│   │   ├── Faq.astro            # Preguntas frecuentes con acordeón nativo <details>
│   │   ├── ContactForm.astro    # Formulario estático con validación accesible y Netlify Forms
│   │   ├── FinalCta.astro       # Llamado a la acción de cierre
│   │   ├── Footer.astro         # Pie de página legal y enlaces de contacto
│   │   ├── RouteLine.astro      # Línea SVG decorativa de ruta con progreso de lectura
│   │   ├── SeoHead.astro        # Head con SEO, canonical, Open Graph y JSON-LD
│   │   └── WhatsAppFloatingButton.astro # Botón flotante accesible con visibilidad inteligente
│   ├── config/
│   │   └── business.ts          # Datos centrales del negocio, teléfonos, redes y generador de enlaces WA
│   ├── data/
│   │   ├── services.ts          # Listado tipado de servicios
│   │   └── faq.ts               # Listado tipado de preguntas frecuentes
│   ├── layouts/
│   │   └── BaseLayout.astro     # Plantilla base HTML con skip-link, header, footer y SEO
│   ├── pages/
│   │   ├── index.astro          # Landing page principal
│   │   ├── gracias.astro        # Página de agradecimiento post-envío de formulario (noindex)
│   │   ├── privacidad.astro     # Política de privacidad (Ley 25.326 de Protección de Datos)
│   │   └── 404.astro            # Página de error 404 personalizada (noindex)
│   └── styles/
│       ├── tokens.css           # Paleta cromática, tipografías y escalas de espaciado
│       └── global.css           # Reset CSS, estilos globales y accesibilidad (WCAG foco y reduced-motion)
├── astro.config.mjs             # Configuración de Astro, trailingSlash y sitemap
└── netlify.toml                 # Configuración de build y cabeceras de seguridad en Netlify
```

---

## ✏️ Cómo Editar y Actualizar Contenidos

### 1. Datos comerciales y de contacto
Edite el archivo [`src/config/business.ts`](src/config/business.ts):
- Teléfono y WhatsApp (`phoneDisplay`, `phoneRaw`)
- Correo electrónico (`email`)
- Enlace de Instagram (`instagram`, `instagramUrl`)
- Nombre de la profesional y eslogan

### 2. Servicios
Edite [`src/data/services.ts`](src/data/services.ts):
- Puede agregar, modificar o quitar servicios.
- Cada ítem define si es destacado (`featured: true`), su descripción breve y el mensaje precargado de WhatsApp (`waParam`).

### 3. Preguntas Frecuentes
Edite [`src/data/faq.ts`](src/data/faq.ts):
- Agregue o modifique preguntas y respuestas según las consultas más habituales de los clientes.

### 4. Fotografías
Las imágenes se encuentran en [`src/assets/photos/`](src/assets/photos/). Al reemplazarlas por archivos de alta resolución limpios (sin marca de agua previa), conserve los mismos nombres o actualice las importaciones en `Hero.astro` y `About.astro`.

---

## ☁️ Despliegue en Netlify y Configuración de Formularios

El repositorio incluye el archivo [`netlify.toml`](netlify.toml) preconfigurado:

1. **Vincular el repositorio** en su cuenta de Netlify (`New site from Git`).
2. Netlify detectará automáticamente:
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`
3. **Activar notificaciones por email de Netlify Forms:**
   - En el panel de Netlify, ir a: **Site configuration > Forms > Form notifications**.
   - Añadir una notificación de tipo **Email notification**.
   - Ingresar el correo destinatario: `info.gestoriags@gmail.com`.
   - Seleccionar el formulario `consulta-gestoria`.
4. **Dominio personalizado:**
   - Configurar el dominio definitivo (ej. `gestoriags.com.ar`) en **Domain management** y emitir el certificado SSL/TLS gratuito de Let's Encrypt provisto por Netlify.
5. **Prueba de validación en producción:**
   - Una vez desplegado, enviar un formulario real desde el sitio en producción.
   - Verificar la redirección inmediata a `/gracias/`.
   - Confirmar la llegada de la notificación por correo en la casilla `info.gestoriags@gmail.com`.

---

## 📋 Puntos Pendientes de Confirmación

Consulte el documento [`docs/content-pending.md`](docs/content-pending.md) para revisar los datos que deben ser confirmados o provistos por Gisella Suárez antes del lanzamiento definitivo (número de matrícula, fotos originales sin marca de agua, definición de área geográfica, etc.).
