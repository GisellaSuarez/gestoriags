# SEO y lanzamiento en Google — Gestoría GS

## 1. Auditoría técnica (7 de octubre de 2026) ✅

| Control | Resultado |
| --- | --- |
| DNS `gestoriags.com.ar` / `www` | A → `54.232.119.62` (Netlify). NS en Netlify DNS (`dns1-4.p04.nsone.net`) |
| HTTPS / certificado | Let's Encrypt, `CN=gestoriags.com.ar`, válido hasta el 03/01/2027 (renovación automática) |
| `http://` → `https://` | 301 ✅ |
| `www` → dominio raíz | 301 a `https://gestoriags.com.ar/` ✅ |
| HSTS | `max-age=31536000; includeSubDomains; preload` ✅ |
| `X-Robots-Tag` en `/` | Ausente (indexable) ✅ |
| `X-Robots-Tag` en `/gracias/` | `noindex, nofollow` ✅ |
| URL inexistente | Responde 404 real ✅ |
| `/privacidad` sin barra | 301 a `/privacidad/` ✅ |
| `robots.txt` | `Allow: /` + `Sitemap: https://gestoriags.com.ar/sitemap-index.xml` ✅ |
| Sitemap | `sitemap-index.xml` → `sitemap-0.xml` con `/` y `/privacidad/` ✅ |
| Canonical / title / description / H1 único | Correctos ✅ |
| JSON-LD | `WebSite` + `ProfessionalService` + `Person` |

## 2. Google Search Console (requiere la cuenta de Google del negocio)

Se recomienda la **propiedad de Dominio** (cubre `http`, `https` y `www`):

1. Ingresar a <https://search.google.com/search-console> con la cuenta de Google del negocio
   (idealmente `info.gestoriags@gmail.com`).
2. **Agregar propiedad → Dominio** → escribir `gestoriags.com.ar` → Continuar.
3. Copiar el registro TXT `google-site-verification=...`.
4. En Netlify: **Domains → gestoriags.com.ar → DNS settings → Add new record**
   - Type: `TXT` · Name: `@` (vacío) · Value: el texto copiado · TTL por defecto.
   - No borrar los registros de Resend (DKIM, `send`, `rsend`, DMARC).
5. Volver a Search Console y pulsar **Verificar** (puede tardar de minutos a unas horas).
6. Menú **Sitemaps** → escribir `sitemap-index.xml` → **Enviar**. Estado esperado: "Correcto".
7. Menú **Inspección de URLs** → `https://gestoriags.com.ar/` → **Solicitar indexación**.
   Repetir con `https://gestoriags.com.ar/privacidad/`.
8. **Configuración → Usuarios y permisos**: agregar al desarrollador como propietario o usuario completo.

> Alternativa: propiedad de **Prefijo de URL** con etiqueta HTML. Pegar el valor `content` en la
> variable de Netlify `PUBLIC_GOOGLE_SITE_VERIFICATION` y volver a desplegar; el sitio emite
> la meta etiqueta automáticamente.

## 3. Que aparezca en Google

Tiempos orientativos: la portada suele indexarse en **2 a 14 días** después de solicitarlo.
Para verificar: buscar `site:gestoriags.com.ar` en Google.

Acciones con mayor impacto para búsquedas locales ("gestoría automotor Córdoba", "transferencia auto Córdoba"):

1. **Google Business Profile** (lo más importante para SEO local): <https://business.google.com>
   - Categoría principal: *Servicio de gestoría* / *Gestor administrativo*; secundarias relacionadas a automotor.
   - Si no hay atención al público, configurarlo como **negocio de área de servicio** (oculta el domicilio)
     y definir las zonas (Córdoba Capital, Gran Córdoba, etc.).
   - Mismo nombre, teléfono y sitio web que la web: `Gestoría GS`, `+54 9 351 375-0475`, `https://gestoriags.com.ar/`.
   - Cargar fotos, horarios, servicios (los 8 trámites) y pedir reseñas a clientes reales.
2. **Instagram**: poner `https://gestoriags.com.ar/` en la bio de `@gestoria.gs`.
3. **Directorios y enlaces**: Cámara de Mandatarios de Córdoba (si figura en su padrón),
   Páginas Amarillas, perfiles de redes. Usar siempre el mismo nombre, teléfono y web.
4. **Validar datos estructurados**: <https://search.google.com/test/rich-results> con la URL de la portada.
5. **Seguimiento mensual en Search Console**: Rendimiento (consultas e impresiones), Indexación de páginas
   y Métricas web principales.

## 4. Mejoras de contenido a futuro (opcional)

- Una página por trámite principal (ej. `/transferencia-automotor-cordoba/`) amplía las búsquedas que se pueden captar.
- Publicar zona de cobertura y horarios (ítems 03–05 de `content-pending.md`) una vez confirmados.
- Incorporar reseñas reales de Google Business Profile.
