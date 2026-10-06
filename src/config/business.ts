/**
 * Configuración comercial y datos de contacto de Gestoría GS.
 * Centraliza la información del negocio para evitar inconsistencias en el sitio.
 */

export const BUSINESS = {
  name: 'Gisella Suárez · Gestoría GS',
  shortName: 'Gestoría GS',
  personName: 'Gisella Suárez',
  tagline: 'Gestión integral del automotor en Córdoba',
  slogan: 'Tu trámite automotor, claro y sin vueltas.',
  phoneDisplay:
    (import.meta.env.PUBLIC_PHONE_DISPLAY as string) || '+54 9 351 375-0475',
  phoneRaw: (import.meta.env.PUBLIC_PHONE_RAW as string) || '5493513750475',
  email:
    (import.meta.env.PUBLIC_CONTACT_EMAIL as string) ||
    'info.gestoriags@gmail.com',
  instagram:
    (import.meta.env.PUBLIC_INSTAGRAM_HANDLE as string) || '@gestoria.gs',
  instagramUrl:
    (import.meta.env.PUBLIC_INSTAGRAM_URL as string) ||
    'https://instagram.com/gestoria.gs',
  location: 'Córdoba, Argentina',
  siteUrl:
    (import.meta.env.PUBLIC_SITE_URL as string) || 'https://gestoriags.com.ar',
  metaDescription:
    'Gestoría del automotor en Córdoba. Transferencias, informes de dominio, verificación policial y soluciones vehiculares con atención personalizada y sin vueltas.',
  values: [
    'Seriedad',
    'Compromiso',
    'Responsabilidad',
    'Confianza',
    'Claridad',
    'Cercanía',
  ] as const,
};

/**
 * Genera el enlace directo a WhatsApp con mensaje contextual codificado
 */
export function getWhatsAppUrl(
  tramite?: string,
  customMessage?: string
): string {
  let message = 'Hola Gisella, quiero consultar por un trámite.';
  if (customMessage) {
    message = customMessage;
  } else if (tramite) {
    message = `Hola Gisella, quiero consultar por: ${tramite}`;
  }
  return `https://wa.me/${BUSINESS.phoneRaw}?text=${encodeURIComponent(message)}`;
}
