const sharp = require('sharp');

async function createOgImage() {
  const width = 1200;
  const height = 630;

  // 1. Process portrait:
  // Source is 590x1200 with face around top (y=100..550)
  // Let's crop from top: extract 590x740 starting from y=80
  // Then resize to fit height 630, width ~502
  const portraitCropped = await sharp('src/assets/photos/gisella-retrato.jpg')
    .extract({ left: 0, top: 80, width: 590, height: 740 })
    .resize(502, 630, { fit: 'cover', position: 'top' })
    .toBuffer();

  // Resize monogram badge: 88x88
  const monogram = await sharp('src/assets/brand/gs-monograma.png')
    .resize(88, 88)
    .toBuffer();

  // Create SVG overlay with graphics and text
  const svgOverlay = Buffer.from(`
    <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#020617"/>
          <stop offset="45%" stop-color="#07172F"/>
          <stop offset="100%" stop-color="#0B2347"/>
        </linearGradient>

        <linearGradient id="photoFade" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="#07172F" stop-opacity="1"/>
          <stop offset="25%" stop-color="#07172F" stop-opacity="0.85"/>
          <stop offset="60%" stop-color="#07172F" stop-opacity="0.2"/>
          <stop offset="100%" stop-color="#07172F" stop-opacity="0"/>
        </linearGradient>

        <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="#DFB04C"/>
          <stop offset="100%" stop-color="#F3D382"/>
        </linearGradient>

        <filter id="shadow" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="0" dy="8" stdDeviation="12" flood-color="#020617" flood-opacity="0.6"/>
        </filter>
      </defs>

      <!-- Decorative subtle route lines -->
      <path d="M 80 570 C 350 570, 480 500, 680 540 C 850 575, 1050 480, 1180 510" 
            fill="none" stroke="#2E63A4" stroke-width="2.5" stroke-dasharray="6 8" opacity="0.35"/>
      <path d="M 680 40 C 820 120, 920 200, 1150 160" 
            fill="none" stroke="#93C5E8" stroke-width="1.5" stroke-dasharray="4 6" opacity="0.25"/>

      <!-- Accent Top Border -->
      <rect x="0" y="0" width="${width}" height="6" fill="url(#goldGrad)" />

      <!-- Left Column Content -->
      <!-- Eyebrow: GISELLA SUÁREZ -->
      <text x="195" y="102" font-family="system-ui, -apple-system, sans-serif" font-size="14" font-weight="700" 
            letter-spacing="3" fill="#93C5E8">GISELLA SUÁREZ</text>

      <text x="195" y="126" font-family="system-ui, -apple-system, sans-serif" font-size="13" font-weight="600" 
            letter-spacing="1" fill="#C9D6E4">GESTORÍA DEL AUTOMOTOR</text>

      <!-- Main Headline: Gestoría GS -->
      <text x="80" y="240" font-family="system-ui, -apple-system, sans-serif" font-size="64" font-weight="800" 
            letter-spacing="-1.5" fill="#F8FAFC">Gestoría GS</text>

      <!-- Tagline in Gold -->
      <text x="80" y="295" font-family="system-ui, -apple-system, sans-serif" font-size="26" font-weight="700" 
            letter-spacing="-0.5" fill="#DFB04C">Tu trámite automotor, claro y sin vueltas.</text>

      <!-- Description / City reference -->
      <text x="80" y="350" font-family="system-ui, -apple-system, sans-serif" font-size="19" font-weight="500" 
            fill="#C9D6E4">Atención personalizada en Córdoba · Autos y motos</text>

      <!-- Feature Pills -->
      <g transform="translate(80, 400)">
        <!-- Pill 1: Transferencias -->
        <rect x="0" y="0" width="160" height="38" rx="19" fill="#0B2347" stroke="#2E63A4" stroke-width="1.2"/>
        <text x="80" y="24" text-anchor="middle" font-family="system-ui, -apple-system, sans-serif" font-size="14" font-weight="600" fill="#F8FAFC">Transferencias</text>

        <!-- Pill 2: Informes de dominio -->
        <rect x="172" y="0" width="186" height="38" rx="19" fill="#0B2347" stroke="#2E63A4" stroke-width="1.2"/>
        <text x="265" y="24" text-anchor="middle" font-family="system-ui, -apple-system, sans-serif" font-size="14" font-weight="600" fill="#F8FAFC">Informes de dominio</text>

        <!-- Pill 3: Verificaciones -->
        <rect x="370" y="0" width="176" height="38" rx="19" fill="#0B2347" stroke="#2E63A4" stroke-width="1.2"/>
        <text x="458" y="24" text-anchor="middle" font-family="system-ui, -apple-system, sans-serif" font-size="14" font-weight="600" fill="#F8FAFC">Verificación policial</text>
      </g>

      <!-- Bottom trust note -->
      <g transform="translate(80, 520)">
        <circle cx="6" cy="6" r="4" fill="#25D366" />
        <text x="20" y="11" font-family="system-ui, -apple-system, sans-serif" font-size="14" font-weight="600" fill="#93C5E8">WhatsApp +54 9 351 375-0475 · info.gestoriags@gmail.com</text>
      </g>

      <!-- Gradient mask on left of portrait to blend seamlessly -->
      <rect x="698" y="0" width="160" height="${height}" fill="url(#photoFade)" />
    </svg>
  `);

  // Create base background: 1200x630 navy
  const baseBg = await sharp({
    create: {
      width,
      height,
      channels: 3,
      background: '#07172F'
    }
  }).png().toBuffer();

  // Composite portrait on the right (left = 1200 - 502 = 698)
  // Monogram at left: 80, top: 62
  // Then SVG overlay over entire image
  const finalImage = await sharp(baseBg)
    .composite([
      {
        input: portraitCropped,
        left: 698,
        top: 0
      },
      {
        input: monogram,
        left: 80,
        top: 66
      },
      {
        input: svgOverlay,
        left: 0,
        top: 0
      }
    ])
    .jpeg({ quality: 90, mozjpeg: true })
    .toFile('public/img/gisella-social.jpg');

  console.log('Generated OG image:', finalImage);
}

createOgImage().catch(console.error);
