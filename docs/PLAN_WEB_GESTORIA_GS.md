# Plan corregido — Landing SEO para Gestoría GS

Fecha: 1 de octubre de 2026  
Marca: **Gisella Suárez — Gestoría GS**  
Referencias analizadas: 19 imágenes de `C:\Users\Gaston\Desktop\gs`

## 1. Alcance definitivo

El proyecto será una **landing page estática de una sola página**, enfocada exclusivamente en captar potenciales clientes y derivarlos a:

1. WhatsApp, como conversión principal.
2. Formulario de contacto enviado por email, como conversión secundaria.
3. Llamada, email directo o Instagram, como alternativas.

No se implementará:

- Sistema de turnos.
- Panel administrativo.
- Login o autenticación.
- Base de datos.
- Gestión de usuarios.
- Aplicación SPA.
- Backend propio permanente.

El sitio se generará como HTML estático con Astro. El formulario se procesará mediante **Netlify Forms**, que detecta formularios HTML en el build y puede notificar las consultas por email sin crear una API propia. Si finalmente se elige otro hosting, el reemplazo recomendado es Formspree; no utilizar EmailJS ni exponer credenciales de correo en el navegador.

---

## 2. Objetivo y embudo

### Objetivo comercial

Conseguir consultas calificadas de personas de Córdoba que necesitan resolver trámites relacionados con autos o motos.

### Conversión principal

**Consultar por WhatsApp** usando:

`https://wa.me/5493513750475`

Cada CTA puede incluir un mensaje prearmado y contextual, por ejemplo:

> Hola Gisella, vi tu web y quiero consultar por una transferencia de automotor.

### Conversión secundaria

Formulario breve:

- Nombre.
- WhatsApp o teléfono.
- Email opcional.
- Tipo de trámite.
- Mensaje.
- Consentimiento de privacidad.

No pedir DNI, patente, dominio ni documentación en este primer contacto.

### Métricas

- Clics a WhatsApp.
- Envíos del formulario.
- Clics en teléfono y email.
- Tasa de conversión por sesión.
- Fuente de adquisición mediante UTM, sin enviar datos personales a analítica.

---

## 3. Información extraída del material

### Marca y contacto

- Nombre: **Gisella Suárez**.
- Marca: **Gestoría GS / Gestoría del Automotor**.
- Frase: **“Tu trámite, sin vueltas.”**
- WhatsApp: **+54 9 351 375-0475**.
- Email: **info.gestoriags@gmail.com**.
- Instagram: **@gestoria.gs**.
- Señal geográfica: Córdoba, Argentina.
- Valores: seriedad, compromiso, responsabilidad, confianza, rapidez, seguridad y acompañamiento.

### Servicios detectados

- Transferencias.
- Inscripciones y bajas.
- Informes y certificados de dominio.
- Multas e infracciones.
- Verificación policial.
- Cambio de radicación.
- Denuncia de venta.
- Denuncia o reposición de patente.
- Cancelación de prenda.
- Documentación de autos y motos.
- Orientación sobre ITV/RTO.
- Coordinación de certificación de firma a domicilio.
- Asesoramiento personalizado.

### Propuesta de valor

> Gestoría automotor en Córdoba para resolver trámites de autos y motos con asesoramiento claro, seguimiento personalizado y sin vueltas.

### Datos todavía necesarios

- Confirmar Córdoba Capital y área real de cobertura.
- Confirmar si recibe presencialmente y si se publica dirección.
- Confirmar matrícula profesional, entidad y autorización para publicarla.
- Confirmar días y horarios de respuesta.
- Definir de seis a ocho servicios prioritarios.
- Confirmar autorización para usar las fotografías.
- Conseguir logo vectorial si existe.
- Conseguir testimonios reales con autorización, si se quieren publicar.
- Definir dominio final.

Nada de lo anterior debe inventarse. Usar placeholders centralizados hasta la confirmación.

---

## 4. Arquitectura técnica con Astro

### Stack recomendado

| Necesidad | Elección |
|---|---|
| Framework | Astro, versión estable actual |
| Lenguaje | TypeScript estricto |
| Render | Static Site Generation, `output: 'static'` |
| Componentes | Archivos `.astro`, sin React/Vue/Svelte |
| Estilos | CSS nativo, variables y estilos scoped de Astro |
| Iconos | `lucide-astro` |
| Sitemap | `@astrojs/sitemap` |
| Imágenes | `astro:assets` con `<Image />` y `<Picture />` |
| Fuentes | Autoalojadas mediante `@fontsource-variable/manrope` y `@fontsource/allura`, o archivos propios |
| Datos estructurados | JSON-LD escrito en Astro; `schema-dts` sólo para tipos de desarrollo si aporta valor |
| Formulario | Netlify Forms + honeypot + página `/gracias` |
| Hosting | Netlify, build `astro build`, publish `dist` |
| Analítica | Plausible o Cloudflare Web Analytics, opcional y sin PII |
| Tests | Vitest sólo para helpers; Playwright para smoke/conversión si el alcance lo justifica |

### Dependencias mínimas

```bash
pnpm add lucide-astro @fontsource-variable/manrope @fontsource/allura
pnpm add @astrojs/sitemap
pnpm add -D prettier prettier-plugin-astro eslint
```

Opcionales:

```bash
pnpm add -D playwright @playwright/test
pnpm add -D schema-dts
```

No agregar Tailwind, React, Framer Motion, un CMS o una librería de formularios salvo que aparezca una necesidad concreta. Para esta landing, CSS y JavaScript nativos reducen bundle, mantenimiento y superficie de errores.

### Estructura propuesta

```text
src/
  assets/
    brand/
    photos/
  components/
    Header.astro
    Hero.astro
    TrustBar.astro
    Services.astro
    ServiceCard.astro
    Benefits.astro
    Process.astro
    About.astro
    Faq.astro
    ContactForm.astro
    FinalCta.astro
    Footer.astro
    WhatsAppFloatingButton.astro
    SeoHead.astro
  config/
    business.ts
  data/
    services.ts
    faq.ts
  layouts/
    BaseLayout.astro
  pages/
    index.astro
    gracias.astro
    privacidad.astro
    404.astro
  styles/
    global.css
    tokens.css
public/
  favicon.svg
  robots.txt
  og/
astro.config.mjs
netlify.toml
```

### Principios de implementación

- HTML semántico generado en build.
- Cero JavaScript cliente por defecto.
- JavaScript vanilla sólo para menú mobile, mejora progresiva del formulario, tracking de CTAs y revelados discretos.
- Sin `ClientRouter`: una landing no necesita routing cliente ni transiciones SPA.
- Todos los datos comerciales en `src/config/business.ts`.
- Servicios y preguntas en archivos tipados para evitar contenido duplicado en componentes.
- El formulario debe funcionar con POST HTML aunque JavaScript falle.

---

## 5. Design system derivado de la marca

### Concepto visual

**“Ruta clara, trato humano.”**

Una landing editorial, sobria y cercana. El azul profundo comunica seguridad; el retrato real de Gisella genera confianza; una línea continua inspirada en una ruta y en el gesto del monograma conecta visualmente las secciones. El dorado se utiliza como pequeño detalle de jerarquía, no como decoración dominante.

Evitar:

- Apariencia de plantilla corporativa genérica.
- Estética SaaS con gradientes violeta.
- Autos deportivos de stock.
- Glassmorphism excesivo.
- Texturas fuertes detrás del texto.
- Carruseles.
- Iconos 3D o emojis como iconografía final.
- Animaciones que retrasen la conversión.

### Paleta

La imagen del logo tiene como dominante aproximada `#000020`, acompañada de `#000010`, `#001030` y blanco frío. Las piezas agregan celestes y dorado. Normalización para web:

| Token | Color | Uso |
|---|---:|---|
| `navy-950` | `#020617` | Hero, header y footer |
| `navy-900` | `#07172F` | Superficies oscuras |
| `navy-800` | `#0B2347` | Cards destacadas |
| `blue-600` | `#2E63A4` | Enlaces y acciones secundarias |
| `sky-300` | `#93C5E8` | Acentos sobre oscuro |
| `gold-500` | `#DFB04C` | Detalles y énfasis puntual |
| `paper` | `#F8FAFC` | Fondo claro |
| `slate-200` | `#DCE3EC` | Líneas y bordes |
| `slate-600` | `#526174` | Texto secundario |
| `ink` | `#111827` | Texto sobre claro |
| `whatsapp` | `#25D366` | CTA de WhatsApp |
| `error` | `#B4232F` | Errores de formulario |

Reglas:

- 70% navy/neutros, 20% blanco/celeste, 10% acentos.
- Dorado nunca para párrafos.
- WhatsApp verde sólo en acciones de contacto.
- Contraste WCAG AA como mínimo.

### Tipografía

No puede determinarse la fuente exacta desde un JPEG. La equivalencia web recomendada es:

- **Manrope Variable** para titulares, cuerpo y UI. Es geométrica, contemporánea y menos genérica que una Montserrat aplicada sin dirección.
- **Allura** exclusivamente para la frase “sin vueltas” o una firma breve.
- El monograma GS se conserva como activo gráfico; no se reconstruye con una fuente.

Escala:

- Display: `clamp(2.75rem, 7vw, 6.5rem)`, peso 750, line-height 0.94.
- H2: `clamp(2rem, 4vw, 3.75rem)`, peso 700.
- H3: `1.25rem–1.5rem`, peso 650.
- Body destacado: `clamp(1.05rem, 2vw, 1.25rem)`, line-height 1.65.
- Body: `1rem`, line-height 1.7.

### Composición

- Contenedor máximo: 1200 px.
- Mobile-first, 4/8/12 columnas según breakpoint.
- Espaciado: 4, 8, 12, 16, 24, 32, 48, 64, 96, 128.
- Cards: radio 20 px.
- Inputs y botones: radio 12 px, alto mínimo 48 px.
- Botón WhatsApp principal: alto 54–58 px.
- Sombras azuladas discretas.
- Motivo de ruta/trazo creado con SVG/CSS liviano y decorativo.
- Revelados con `IntersectionObserver`, desactivados con `prefers-reduced-motion`.

---

## 6. Estructura de la landing

### 1. Header

- Logo GS.
- Servicios.
- Cómo trabajo.
- Sobre mí.
- Preguntas frecuentes.
- Contacto.
- CTA: “Consultar por WhatsApp”.

Sticky sólo si no roba espacio en mobile. El menú móvil debe usar botón real, atributos ARIA y control de foco básico.

### 2. Hero

**Eyebrow:** Gestoría del automotor en Córdoba.  
**H1:** Tu trámite automotor, claro y sin vueltas.  
**Bajada:** Te asesoro y acompaño en transferencias, informes, verificaciones y otros trámites de autos y motos, con atención personalizada de principio a fin.  
**CTA principal:** Consultar por WhatsApp.  
**CTA secundario:** Ver servicios.  
**Prueba rápida:** Atención personalizada · Seguimiento · Gestión responsable.

Usar una foto real de Gisella con composición asimétrica. El logo debe ser visible, pero no competir con el H1.

### 3. Barra de confianza

- Mandataria matriculada `[CONFIRMAR MATRÍCULA]`.
- Atención personalizada.
- Autos y motos.
- Córdoba `[CONFIRMAR COBERTURA]`.

### 4. Servicios

Mostrar seis u ocho cards con:

- Icono.
- Nombre.
- Explicación breve orientada al problema.
- Enlace “Consultar por este trámite” que abre WhatsApp con mensaje específico.

Servicios iniciales sugeridos:

1. Transferencia de automotor.
2. Informe de dominio.
3. Verificación policial.
4. Denuncia de venta.
5. Cambio de radicación.
6. Cancelación de prenda.
7. Denuncia/extravío de patente.
8. Documentación para autos y motos.

### 5. Beneficios

- Ahorrá tiempo.
- Evitá errores y observaciones.
- Recibí asesoramiento personalizado.
- Seguí el estado del trámite.
- Tené claridad sobre documentación y próximos pasos.

No prometer aprobación, plazos garantizados ni resultados dependientes de organismos.

### 6. Proceso

1. **Contame qué necesitás.** WhatsApp o formulario.
2. **Revisamos tu caso.** Gisella indica documentación y próximos pasos.
3. **Avanzamos con claridad.** Acompañamiento y seguimiento durante la gestión.

### 7. Sobre Gisella

- Foto real.
- Nombre completo.
- Presentación en primera persona.
- Valores: seriedad, compromiso y responsabilidad.
- Matrícula sólo si está confirmada y autorizada.
- CTA a WhatsApp.

### 8. Preguntas frecuentes

Entre seis y ocho preguntas reales:

- ¿Qué trámite necesito para transferir un vehículo?
- ¿Trabajás con autos y motos?
- ¿Qué es un informe de dominio?
- ¿La documentación es la misma en todos los casos?
- ¿Atendés sólo en Córdoba Capital?
- ¿Cómo puedo enviarte mi consulta?
- ¿Cuánto demora un trámite?

Las respuestas deben aclarar que requisitos y plazos dependen de cada caso, jurisdicción y organismo.

### 9. Formulario

Título: **Contame qué trámite necesitás resolver.**

Campos:

- Nombre, requerido.
- WhatsApp/teléfono, requerido.
- Email, opcional.
- Tipo de trámite, requerido.
- Mensaje, requerido y limitado.
- Checkbox de privacidad, requerido y no premarcado.

Botón: **Enviar consulta**.

Texto auxiliar: “También podés escribir directamente por WhatsApp”.

Implementación Netlify:

- `method="POST"`.
- `data-netlify="true"`.
- `name="consulta-gestoria"`.
- Campo oculto `form-name`.
- Honeypot con `netlify-honeypot`.
- `action="/gracias/"`.
- Formulario incluido como HTML estático en el build.

Configurar en Netlify la notificación a `info.gestoriags@gmail.com` y probarla en producción; no asumir que funciona por el preview local.

### 10. CTA final y footer

- “¿Tenés dudas sobre tu trámite? Escribime y vemos tu caso.”
- WhatsApp, email e Instagram.
- Cobertura confirmada.
- Enlace a privacidad.
- Copyright.
- Aviso: información orientativa, sujeta a normativa y particularidades del caso.

### CTA flotante

- Sólo WhatsApp.
- Etiqueta accesible.
- No tapar formulario, cookie banner ni footer.
- Reducir a icono en pantallas estrechas sólo si mantiene nombre accesible.

---

## 7. SEO y captación local

### Búsquedas objetivo iniciales

- gestoría automotor Córdoba.
- gestora automotor Córdoba.
- mandataria automotor Córdoba.
- transferencia automotor Córdoba.
- informe de dominio Córdoba.
- verificación policial Córdoba.
- gestoría motos Córdoba.

Validar demanda y competencia antes de cerrar el copy. No repetir keywords mecánicamente.

### Implementación

- `<title>`: `Gestoría Automotor en Córdoba | Gestoría GS`.
- Description única y orientada a beneficio.
- H1 único.
- Canonical absoluto.
- `lang="es-AR"`.
- Open Graph y Twitter/X cards.
- Imagen social 1200×630.
- JSON-LD `ProfessionalService` o `LocalBusiness`, más `Person`; sólo con datos confirmados.
- NAP consistente con Google Business Profile e Instagram.
- `@astrojs/sitemap` con `site` configurado en `astro.config.mjs`.
- `robots.txt` con sitemap absoluto.
- HTML semántico y enlaces crawlables.
- FAQ visible en HTML; no depender de FAQ rich results.
- Alt descriptivo para fotos informativas y vacío para decoración.
- URLs `/`, `/privacidad/`, `/gracias/`; esta última con `noindex`.

### Google Business Profile

- Reclamar o completar el perfil.
- Usar nombre, teléfono, horario y área idénticos a la landing.
- No mostrar domicilio particular si no recibe clientes.
- Solicitar reseñas reales sin incentivos engañosos.
- Vincular la landing con parámetros UTM.

### Rendimiento

- Astro estático, sin hydration innecesaria.
- Hero optimizado y con dimensiones explícitas.
- `<Picture />` para AVIF/WebP y tamaños responsive.
- Lazy loading bajo el fold.
- Preload sólo para imagen LCP y fuente crítica cuando esté justificado.
- CSS crítico compacto.
- Sin video, carrusel ni mapa embebido pesado.
- Objetivos p75: LCP ≤ 2.5 s, INP ≤ 200 ms y CLS ≤ 0.1.

---

## 8. Formulario, privacidad y spam

### Flujo

1. Visitante completa formulario.
2. Netlify procesa el POST.
3. Redirección a `/gracias/`.
4. Notificación por email a la casilla configurada.
5. La página de gracias ofrece WhatsApp como alternativa inmediata.

### Protección

- Honeypot de Netlify.
- Límite de longitud y atributos HTML apropiados.
- Validación en navegador como mejora de experiencia, no como seguridad absoluta.
- Si aparece spam real, agregar Turnstile o reCAPTCHA soportado por el proveedor.
- No permitir adjuntos en el MVP.
- No insertar HTML recibido en emails propios.
- No incluir datos del formulario en parámetros de analítica o URL.

### Privacidad

- Explicar qué datos se recopilan, para qué, quién es responsable, qué proveedor los procesa y cómo pedir acceso/supresión.
- Consentimiento requerido y en lenguaje claro.
- No mezclar consentimiento de contacto con marketing.
- Definir retención y eliminación de envíos.
- Revisar el texto final según Ley 25.326 y criterios de la AAIP.

---

## 9. Plan de trabajo

### Fase 1 — Confirmación de contenido

- Resolver los datos pendientes.
- Elegir servicios prioritarios.
- Aprobar copy.
- Confirmar fotografías y logo.
- Definir dominio.

### Fase 2 — Diseño

- Wireframe mobile-first.
- Hero, servicios, proceso, perfil, FAQ, formulario y footer.
- Design tokens y componentes.
- Estados hover, focus, error, éxito y reduced-motion.
- Mockups 390, 768, 1024 y 1440 px.

### Fase 3 — Astro

- Crear proyecto TypeScript.
- Configurar sitemap y `site`.
- Crear layout, componentes, contenido tipado y estilos.
- Importar y optimizar activos.
- Implementar WhatsApp contextual.
- Implementar Netlify Forms.

### Fase 4 — SEO y calidad

- Metadata, canonical, JSON-LD, sitemap y robots.
- Auditoría responsive, teclado, foco y contraste.
- Validación de formulario.
- Lighthouse/PageSpeed sobre build productivo.
- Rich Results Test y Search Console.

### Fase 5 — Lanzamiento

- Deploy en Netlify.
- Configurar dominio y HTTPS.
- Activar detección de formularios y notificación por email.
- Enviar consulta real de prueba.
- Verificar CTA de WhatsApp en Android/iOS/desktop.
- Conectar Search Console y Google Business Profile.

---

## 10. Criterios de aceptación

- Landing completamente estática y funcional sin JavaScript.
- JavaScript adicional mínimo y no bloqueante.
- WhatsApp abre el número correcto con mensaje contextual.
- Formulario funciona en producción y llega por email.
- Página de gracias no indexable.
- Sin panel, auth, API propia ni base de datos.
- Datos comerciales no confirmados no se inventan.
- Responsive desde 320 px.
- Navegación completa por teclado.
- Contraste WCAG AA.
- No existen saltos de layout por imágenes o fuentes.
- Sitemap, robots, canonical y JSON-LD válidos.
- Build de Astro, lint y pruebas smoke exitosos.

---

# INSTRUCCIÓN 1 — Prompt para Claude Design o Google Stitch

```text
Actuá como Lead Web Designer especializado en landing pages de servicios profesionales locales. Diseñá una landing page de una sola página, mobile-first, altamente orientada a conversión, para “Gisella Suárez — Gestoría GS”, gestora/mandataria del automotor en Córdoba, Argentina.

OBJETIVO
Conseguir potenciales clientes desde Google y redes y derivarlos principalmente a WhatsApp. Como segunda opción, deben poder completar un formulario de contacto que será enviado por email. No existe sistema de turnos, panel, login, cuenta de usuario ni aplicación compleja.

REFERENCIAS
Usá todas las imágenes de C:\Users\Gaston\Desktop\gs como referencia de identidad, servicios, tono y fotografía. No pegues flyers con texto dentro de la web: convertí su contenido en una experiencia editorial con texto HTML. Priorizá fotos reales de Gisella. No inventes dirección, matrícula, horarios, precios, reseñas ni zona exacta de cobertura.

MARCA
- Gisella Suárez.
- Gestoría GS / Gestoría del Automotor.
- Frase: “Tu trámite, sin vueltas.”
- WhatsApp: +54 9 351 375-0475.
- Email: info.gestoriags@gmail.com.
- Instagram: @gestoria.gs.
- Valores: seriedad, compromiso, responsabilidad, confianza, claridad y cercanía.

DIRECCIÓN CREATIVA
Concepto: “Ruta clara, trato humano”.
Diseñá una experiencia editorial contemporánea, sobria y humana. Usá azul navy profundo, grandes áreas claras, fotografía real, líneas inspiradas en rutas/trazos de firma y pequeños acentos dorados. La pieza memorable debe ser una línea continua que nace cerca del monograma GS, recorre visualmente el proceso y conduce al CTA final.

No uses estética SaaS, gradientes violetas, glassmorphism excesivo, autos deportivos de stock, carruseles, cards idénticas sin personalidad, iconos 3D, emojis ni animaciones gratuitas.

PALETA
- #020617 navy 950.
- #07172F navy 900.
- #0B2347 navy 800.
- #2E63A4 azul.
- #93C5E8 celeste.
- #DFB04C dorado, uso puntual.
- #F8FAFC papel.
- #DCE3EC bordes.
- #526174 texto secundario.
- #111827 tinta.
- #25D366 sólo para WhatsApp.

TIPOGRAFÍA
- Manrope Variable para titulares, cuerpo y UI.
- Allura sólo para un acento breve como “sin vueltas”.
- Monograma GS como activo gráfico, no recreado con una fuente.
- Titular hero grande, compacto y seguro; cuerpo muy legible.

COPY BASE
Eyebrow: “Gestoría del automotor en Córdoba”.
H1: “Tu trámite automotor, claro y sin vueltas.”
Bajada: “Te asesoro y acompaño en transferencias, informes, verificaciones y otros trámites de autos y motos, con atención personalizada de principio a fin.”
CTA principal: “Consultar por WhatsApp”.
CTA secundario: “Ver servicios”.
Prueba: “Atención personalizada · Seguimiento · Gestión responsable”.

SECCIONES
1. Header con logo, navegación por anchors y CTA WhatsApp.
2. Hero asimétrico con foto real, propuesta de valor y dos CTAs.
3. Franja de confianza.
4. Servicios prioritarios en seis u ocho bloques: transferencia, informe de dominio, verificación policial, denuncia de venta, cambio de radicación, cancelación de prenda, extravío de patente y documentación de autos/motos.
5. Beneficios: tiempo, menos errores, claridad, acompañamiento y seguimiento.
6. Proceso en tres pasos: Contame qué necesitás / Revisamos tu caso / Avanzamos con claridad.
7. Sobre Gisella con foto real, presentación y valores.
8. FAQ con seis u ocho preguntas.
9. Formulario: nombre, WhatsApp/teléfono, email opcional, trámite, mensaje y privacidad.
10. CTA final.
11. Footer con WhatsApp, email, Instagram y legales.
12. Botón flotante de WhatsApp que no tape contenido.

SERVICIOS
Cada bloque debe explicar qué problema resuelve y terminar en “Consultar por este trámite”. No presentar requisitos normativos rígidos sin validación. No prometer tiempos ni resultados garantizados.

FORMULARIO
Diseñá estados default, focus, error, enviando y éxito. Labels siempre visibles. El CTA alternativo de WhatsApp debe permanecer disponible. No pedir DNI, patente, dominio ni adjuntos.

RESPONSIVE
Diseñá primero 390×844 y luego 768, 1024 y 1440. Targets táctiles mínimos 44×44. El CTA flotante no debe tapar formulario ni footer. En mobile, mantener un ritmo editorial y evitar apilar cards genéricas interminables.

ACCESIBILIDAD
WCAG 2.2 AA: contraste, foco visible, teclado, labels, jerarquía, reduced-motion y estados no dependientes sólo del color.

ENTREGABLES
1. Wireframe mobile-first.
2. Dirección visual y justificación breve.
3. Tokens.
4. Componentes y estados.
5. Landing high fidelity en cuatro breakpoints.
6. Prototipo de navegación por anchors, CTA WhatsApp y formulario.
7. Especificación de handoff para Astro/CSS.
8. Lista explícita de datos pendientes.

La prioridad es conversión, confianza, claridad y velocidad. El resultado debe sentirse diseñado específicamente para Gisella, no adaptado de una plantilla.
```

---

# INSTRUCCIÓN 2 — Prompt para implementar con Astro

```text
Actuá como Senior Frontend Engineer especializado en Astro, performance, SEO local y accesibilidad. Implementá una landing page estática de captación para “Gisella Suárez — Gestoría GS”.

ALCANCE ESTRICTO
- Una landing pública de una sola página.
- Conversión principal a WhatsApp.
- Conversión secundaria mediante formulario enviado por email.
- Páginas auxiliares: privacidad, gracias y 404.
- No implementar turnos, panel, auth, usuarios, base de datos, CMS, API propia ni SPA.

FUENTES
- Referencias: C:\Users\Gaston\Desktop\gs
- Diseño aprobado: [AGREGAR ENLACE O ARCHIVO DE HANDOFF]
- Datos confirmados:
  - Gisella Suárez.
  - Gestoría GS.
  - WhatsApp +54 9 351 375-0475.
  - Email info.gestoriags@gmail.com.
  - Instagram @gestoria.gs.
  - Córdoba, con cobertura exacta pendiente.

No inventes dirección, matrícula, horarios, precios, testimonios, plazos ni cobertura. Centralizá datos pendientes en `src/config/business.ts`.

STACK
- Astro estable actual.
- TypeScript strict.
- Build estático.
- Componentes `.astro` sin React/Vue/Svelte.
- CSS nativo con variables y estilos scoped.
- `lucide-astro`.
- `@astrojs/sitemap`.
- `astro:assets` con Image/Picture.
- `@fontsource-variable/manrope` y `@fontsource/allura`, o fuentes propias aprobadas.
- Netlify Forms para el formulario.
- Netlify como hosting.

No agregues Tailwind, framework cliente, librería de animación, CMS o dependencia de formularios salvo que exista una razón demostrable. Usá JavaScript vanilla mínimo.

FASE 1 — INSPECCIÓN
1. Revisá el repositorio y preservá cambios existentes.
2. Inventariá las 19 imágenes, dimensiones y contenido.
3. Seleccioná logo, retrato y material útil; no uses flyers con texto como secciones.
4. Creá `docs/content-pending.md` con datos que Gisella debe confirmar.
5. Verificá documentación vigente de Astro, sitemap, assets y Netlify Forms antes de instalar.

FASE 2 — PROYECTO
1. Crear/configurar Astro con TypeScript strict y package manager existente.
2. Configurar scripts: dev, build, preview, check, lint y format.
3. Configurar `site` con placeholder explícito para dominio y `trailingSlash` consistente.
4. Integrar `@astrojs/sitemap`.
5. Crear tokens CSS, reset moderado y estilos globales.
6. Configurar fuentes optimizadas y fallbacks para evitar CLS.
7. Crear `BaseLayout.astro` y `SeoHead.astro`.

FASE 3 — CONTENIDO Y COMPONENTES
Implementar:
- Header accesible con navegación por anchors.
- Hero.
- TrustBar.
- Services y ServiceCard.
- Benefits.
- Process.
- About.
- FAQ con `<details>/<summary>` correctamente estilizado.
- ContactForm.
- FinalCta.
- Footer.
- WhatsAppFloatingButton.

Mantener servicios y FAQ en archivos TypeScript tipados. Un H1 único. Usar HTML semántico, landmarks y enlaces reales.

WHATSAPP
- URL base: `https://wa.me/5493513750475`.
- Mensajes URL-encoded según CTA o servicio.
- CTA principal en hero, servicios, sobre Gisella, cierre y botón flotante.
- Agregar `aria-label` descriptivo.
- Registrar `whatsapp_click` sólo si existe analítica, sin PII.

FORMULARIO
Crear un formulario HTML estático compatible con Netlify Forms:
- `name="consulta-gestoria"`.
- `method="POST"`.
- `data-netlify="true"`.
- `netlify-honeypot="bot-field"`.
- input oculto `form-name`.
- `action="/gracias/"`.
- nombre requerido.
- teléfono/WhatsApp requerido.
- email opcional.
- tipo de trámite requerido.
- mensaje requerido con límite razonable.
- privacidad requerida y no premarcada.

El POST HTML debe funcionar sin JavaScript. Se puede agregar mejora progresiva, pero no reemplazar la semántica ni depender de fetch. Implementar labels visibles, autocomplete adecuado, mensajes de ayuda y errores accesibles. No aceptar archivos, DNI, dominio ni patente.

Crear `/gracias/` con `noindex`, confirmación clara, CTA WhatsApp y retorno a inicio. Documentar que la notificación por email se configura en Netlify y debe probarse tras deploy.

FASE 4 — DISEÑO
Aplicar el handoff con esta dirección:
- “Ruta clara, trato humano”.
- Navy #020617 / #07172F, azul #2E63A4, celeste #93C5E8, dorado #DFB04C, papel #F8FAFC.
- Manrope Variable + Allura sólo como firma.
- Composición editorial asimétrica.
- Línea/ruta decorativa SVG liviana.
- Cards con propósito, sin patrón SaaS genérico.
- Interacciones 160–240 ms.
- `prefers-reduced-motion` respetado.
- Responsive desde 320 px.

Usar `astro:assets` para imágenes importadas desde `src/assets`. Generar AVIF/WebP y tamaños responsive. Definir width/height y `sizes`. La imagen LCP no debe usar lazy loading; el resto sí. Mantener el recorte de la foto de Gisella respetuoso.

FASE 5 — SEO
1. Title y description optimizados para gestoría automotor en Córdoba.
2. Canonical absoluto.
3. Open Graph/Twitter y social image 1200×630.
4. `lang="es-AR"`.
5. JSON-LD `ProfessionalService`/`LocalBusiness` y `Person`, sólo con datos confirmados.
6. NAP consistente.
7. Sitemap generado por Astro.
8. `robots.txt` con URL absoluta del sitemap.
9. `noindex` en gracias y 404 cuando corresponda.
10. Enlaces y anchors descriptivos.
11. Alt text correcto; decoración con alt vacío.
12. Favicons y manifest mínimo.

No agregues campos falsos en JSON-LD para completar validadores. No inventes rating, review, domicilio u horarios.

FASE 6 — PRIVACIDAD Y ANALÍTICA
1. Crear `/privacidad/` con finalidad, datos, responsable, proveedor de formularios, conservación y derechos; marcar revisión legal pendiente.
2. Consentimiento claro en formulario.
3. Si se agrega analítica, elegir Plausible o Cloudflare Web Analytics y no enviar campos del formulario, teléfono, email o mensaje.
4. Eventos permitidos: whatsapp_click, email_click, phone_click y contact_submitted.
5. Añadir UTM a enlaces externos de campañas cuando se definan.

FASE 7 — VERIFICACIÓN
Ejecutar:
- `astro check`.
- lint/format.
- build de producción.
- preview del build.

Verificar manualmente:
- 320, 390, 768, 1024 y 1440 px.
- navegación por teclado.
- foco visible.
- reduced-motion.
- contraste WCAG AA.
- menú mobile.
- todos los CTAs de WhatsApp.
- formulario sin JavaScript.
- página gracias.
- sitemap, robots, canonical y JSON-LD.
- sin errores de consola.
- sin saltos de layout.

Si se instala Playwright, crear smoke tests para navegación, CTA WhatsApp y envío/estructura del formulario sin depender de servicios externos durante CI.

FASE 8 — DEPLOY
1. Configurar `netlify.toml` con build `pnpm build` y publish `dist`.
2. Desplegar preview.
3. Conectar dominio y HTTPS.
4. Activar Form Detection en Netlify.
5. Configurar notificación de nuevos envíos a info.gestoriags@gmail.com.
6. Redeploy.
7. Enviar una consulta real de prueba y confirmar recepción.
8. Verificar WhatsApp en móvil y desktop.
9. Conectar Search Console, enviar sitemap y completar Google Business Profile.

DEFINITION OF DONE
- Sitio estático; sin panel, auth, DB ni backend propio.
- Formulario real recibido por email en producción.
- WhatsApp correcto y contextual.
- Responsive y accesible.
- Datos no confirmados no inventados.
- HTML semántico y contenido indexable.
- Core Web Vitals dentro de objetivos razonables en medición productiva.
- SEO técnico válido.
- Build y checks verdes.
- README con instalación, edición de contenido, deploy y prueba de formulario.

Al finalizar cada fase, informá archivos modificados, verificaciones ejecutadas y pendientes reales. No amplíes el alcance a funcionalidades de aplicación.
```

---

## 11. Skills recomendadas

### Disponibles y aplicables

- `frontend-design`: diseño visual específico y no genérico.
- `find-skills`: descubrimiento de herramientas adicionales.

### Opcionales para la implementación

- Vercel Web Design Guidelines para revisión de UX/accesibilidad:  
  `npx skills add https://github.com/vercel-labs/agent-skills --skill web-design-guidelines`
- Core Web Vitals para la etapa de medición:  
  `npx skills add https://github.com/addyosmani/web-quality-skills --skill core-web-vitals`
- Playwright Testing para smoke/E2E:  
  `npx skills add https://github.com/terminalskills/skills --skill playwright-testing`

No son necesarias skills de Supabase/Postgres, porque el alcance corregido no incluye base de datos ni autenticación.

---

## 12. Referencias técnicas actuales

- Astro components: https://docs.astro.build/en/basics/astro-components/
- Astro assets: https://docs.astro.build/en/reference/modules/astro-assets/
- Astro sitemap: https://docs.astro.build/en/guides/integrations-guide/sitemap/
- Astro en Netlify: https://docs.astro.build/en/guides/deploy/netlify/
- Netlify Forms: https://docs.netlify.com/manage/forms/setup/
- Google Search Essentials: https://developers.google.com/search/docs/essentials
- Google LocalBusiness: https://developers.google.com/search/docs/appearance/structured-data/local-business
- AAIP — datos personales: https://www.argentina.gob.ar/aaip/datospersonales/derechos

