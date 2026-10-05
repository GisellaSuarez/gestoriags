/**
 * Configuración comercial y datos de contacto de Gestoría GS.
 * Centraliza la información del negocio para evitar inconsistencias en el sitio.
 */

export const BUSINESS = {
  name: 'Gisella Suárez · Gestoría GS',
  shortName: 'Gestoría GS',
  personName: 'Gisella Suárez',
  tagline: 'Gestoría del automotor en Córdoba',
  slogan: 'Tu trámite automotor, claro y sin vueltas.',
  phoneDisplay: '+54 9 351 375-0475',
  phoneRaw: '5493513750475',
  email: 'info.gestoriags@gmail.com',
  instagram: '@gestoria.gs',
  instagramUrl: 'https://instagram.com/gestoria.gs',
  location: 'Córdoba, Argentina',
  siteUrl: 'https://gestoriags.com.ar', // Dominio preliminar, configurable en producción
  metaDescription:
    'Gestoría del automotor en Córdoba. Transferencias, informes de dominio, verificación policial y trámites de autos y motos con atención personalizada y sin vueltas.',
  values: [
    'Seriedad',
    'Compromiso',
    'Responsabilidad',
    'Confianza',
    'Claridad',
    'Cercanía',
  ],
} as const;

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
