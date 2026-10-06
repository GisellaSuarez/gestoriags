import type { Config, Context } from '@netlify/functions';
import { Resend } from 'resend';

export const config: Config = {
  path: '/api/contacto',
};

interface ContactPayload {
  nombre?: string;
  telefono?: string;
  email?: string;
  tramite?: string;
  mensaje?: string;
  privacidad?: boolean | string;
  'bot-field'?: string;
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function getWhatsAppNumber(value: string): string {
  const digits = value.replace(/\D/g, '');

  if (digits.startsWith('549')) return digits;
  if (digits.startsWith('54')) return `549${digits.slice(2)}`;
  if (digits.startsWith('9') && digits.length === 11) return `54${digits}`;

  return `549${digits}`;
}

export default async (req: Request, _context: Context): Promise<Response> => {
  // Solo permitir solicitudes POST
  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Método no permitido' }), {
      status: 405,
      headers: {
        'Content-Type': 'application/json',
        Allow: 'POST',
      },
    });
  }

  let data: ContactPayload = {};
  const contentType = req.headers.get('content-type') || '';
  const isJson = contentType.includes('application/json');

  try {
    if (isJson) {
      data = (await req.json()) as ContactPayload;
    } else {
      const formData = await req.formData();
      data = {
        nombre: formData.get('nombre')?.toString(),
        telefono: formData.get('telefono')?.toString(),
        email: formData.get('email')?.toString(),
        tramite: formData.get('tramite')?.toString(),
        mensaje: formData.get('mensaje')?.toString(),
        privacidad: formData.get('privacidad')?.toString(),
        'bot-field': formData.get('bot-field')?.toString(),
      };
    }
  } catch {
    return new Response(
      JSON.stringify({ error: 'Formato de datos no válido' }),
      {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }

  // 1. Detección de bots por Honeypot (descarta silenciosamente)
  if (data['bot-field']) {
    if (!isJson) {
      return new Response(null, {
        status: 303,
        headers: { Location: '/gracias/' },
      });
    }
    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  // 2. Validación y saneamiento de campos
  const nombre = (data.nombre || '').trim();
  const telefono = (data.telefono || '').trim();
  const email = (data.email || '').trim();
  const tramite = (data.tramite || '').trim();
  const mensaje = (data.mensaje || '').trim();
  const privacidad = data.privacidad;

  const errors: Record<string, string> = {};

  if (!nombre) {
    errors.nombre = 'El nombre es obligatorio.';
  } else if (nombre.length > 100) {
    errors.nombre = 'El nombre no puede superar los 100 caracteres.';
  }

  const digits = telefono.replace(/\D/g, '');
  if (!digits || digits.length < 8) {
    errors.telefono = 'Ingresá un teléfono válido con código de área.';
  }

  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.email = 'El formato del email no es válido.';
  }

  if (!tramite) {
    errors.tramite = 'Seleccioná el trámite que necesitás.';
  }

  if (!privacidad) {
    errors.privacidad = 'Debés aceptar la política de privacidad.';
  }

  if (Object.keys(errors).length > 0) {
    return new Response(
      JSON.stringify({
        error: 'Datos de formulario incompletos o inválidos',
        details: errors,
      }),
      {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }

  // 3. Verificación de credenciales de Resend
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error(
      'Error: RESEND_API_KEY no está definida en las variables de entorno de Netlify.'
    );
    return new Response(
      JSON.stringify({
        error:
          'El servicio de envío no está configurado (falta RESEND_API_KEY). Por favor contactanos directamente por WhatsApp.',
      }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }

  // 4. Configuración del envío con Resend
  const resend = new Resend(apiKey);
  const toEmail =
    process.env.CONTACT_RECIPIENT_EMAIL ||
    process.env.PUBLIC_CONTACT_EMAIL ||
    'info.gestoriags@gmail.com';

  const fromEmail =
    process.env.RESEND_FROM_EMAIL || 'Gestoría GS <onboarding@resend.dev>';

  const subject = `Nueva consulta web: ${tramite} - ${nombre}`;

  const fecha = new Date().toLocaleString('es-AR', {
    timeZone: 'America/Argentina/Cordoba',
    dateStyle: 'full',
    timeStyle: 'short',
  });

  const whatsappHref = `https://wa.me/${getWhatsAppNumber(telefono)}`;

  const htmlContent = `
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="utf-8">
  <title>${subject}</title>
</head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f1f5f9; margin: 0; padding: 24px; color: #0f172a;">
  <div style="max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 12px; border: 1px solid #e2e8f0; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);">
    <div style="background-color: #0b1a2e; padding: 28px 32px; color: #ffffff;">
      <h1 style="margin: 0 0 6px; font-size: 20px; font-weight: 700; color: #ffffff;">Nueva Consulta Web</h1>
      <p style="margin: 0; font-size: 14px; color: #93c5fd;">Gestoría GS · Gestión integral del automotor en Córdoba</p>
    </div>
    
    <div style="padding: 32px;">
      <p style="margin: 0 0 20px; font-size: 16px; line-height: 1.5;">
        Recibiste una nueva consulta a través del formulario de <strong>gestoriags.com.ar</strong>:
      </p>

      <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
        <tr>
          <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; font-weight: 600; color: #475569; width: 140px;">Nombre:</td>
          <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; color: #0f172a; font-weight: 700;">${escapeHtml(nombre)}</td>
        </tr>
        <tr>
          <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; font-weight: 600; color: #475569;">Trámite:</td>
          <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; color: #0284c7; font-weight: 700;">${escapeHtml(tramite)}</td>
        </tr>
        <tr>
          <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; font-weight: 600; color: #475569;">WhatsApp / Tel:</td>
          <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; color: #0f172a;">
            <strong>${escapeHtml(telefono)}</strong>
            <span style="display: inline-block; margin-left: 8px;">
              <a href="${whatsappHref}" style="display: inline-block; background-color: #25d366; color: #ffffff; text-decoration: none; font-size: 13px; font-weight: 700; padding: 4px 10px; border-radius: 9999px;">Abrir WhatsApp</a>
            </span>
          </td>
        </tr>
        <tr>
          <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; font-weight: 600; color: #475569;">Email:</td>
          <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; color: #0f172a;">
            ${email ? `<a href="mailto:${escapeHtml(email)}" style="color: #0284c7; text-decoration: underline;">${escapeHtml(email)}</a>` : '<span style="color: #94a3b8;">No especificado</span>'}
          </td>
        </tr>
        <tr>
          <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; font-weight: 600; color: #475569;">Fecha:</td>
          <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; color: #64748b; font-size: 14px;">${fecha}</td>
        </tr>
      </table>

      ${
        mensaje
          ? `
      <div style="background-color: #f8fafc; border-left: 4px solid #0284c7; padding: 16px; border-radius: 6px; margin-bottom: 24px;">
        <p style="margin: 0 0 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; color: #475569;">Detalle de la consulta:</p>
        <p style="margin: 0; font-size: 15px; line-height: 1.6; color: #1e293b; white-space: pre-wrap;">${escapeHtml(mensaje)}</p>
      </div>`
          : ''
      }

      <div style="margin-top: 32px; padding-top: 20px; border-top: 1px solid #e2e8f0; font-size: 13px; color: #94a3b8; text-align: center;">
        Enviado automáticamente desde el formulario web de <a href="https://gestoriags.com.ar" style="color: #64748b;">gestoriags.com.ar</a>
      </div>
    </div>
  </div>
</body>
</html>
  `.trim();

  const textContent = `
Nueva Consulta Web - Gestoría GS
=====================================
Nombre: ${nombre}
Trámite: ${tramite}
WhatsApp/Teléfono: ${telefono}
Email: ${email || 'No especificado'}
Fecha: ${fecha}

${mensaje ? `Detalle de la consulta:\n${mensaje}\n` : ''}
Link directo a WhatsApp: ${whatsappHref}
=====================================
Enviado desde gestoriags.com.ar
  `.trim();

  try {
    const emailResult = await resend.emails.send({
      from: fromEmail,
      to: [toEmail],
      replyTo: email || undefined,
      subject,
      html: htmlContent,
      text: textContent,
    });

    if (emailResult.error) {
      console.error('Error al enviar correo con Resend:', emailResult.error);
      return new Response(
        JSON.stringify({
          error:
            'No se pudo enviar el correo en este momento. Por favor escribinos por WhatsApp.',
          details: emailResult.error.message,
        }),
        {
          status: 502,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    if (!isJson) {
      return new Response(null, {
        status: 303,
        headers: { Location: '/gracias/' },
      });
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: 'Consulta enviada correctamente',
      }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  } catch (err: unknown) {
    console.error('Excepción al conectar con Resend:', err);
    return new Response(
      JSON.stringify({
        error:
          'Ocurrió un error inesperado al procesar el envío. Podés escribirnos directo por WhatsApp.',
      }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
};
