const fs = require('fs');

function checkFile(path, name) {
  const html = fs.readFileSync(path, 'utf8');
  console.log('=== ' + name + ' ===');
  console.log('Has /#inicio:', html.includes('/#inicio'));
  console.log('Has /#servicios:', html.includes('/#servicios'));
  console.log('Has /#proceso:', html.includes('/#proceso'));
  console.log('Has /#sobre:', html.includes('/#sobre'));
  console.log('Has /#preguntas:', html.includes('/#preguntas'));
  console.log('Has /#contacto:', html.includes('/#contacto'));
  console.log('Has relative href="#servicios":', html.includes('href="#servicios"'));
  console.log('Has meta noindex:', html.includes('noindex'));
  console.log('Has ld+json script:', html.includes('application/ld+json'));
}

checkFile('dist/index.html', 'INDEX');
checkFile('dist/privacidad/index.html', 'PRIVACIDAD');
checkFile('dist/gracias/index.html', 'GRACIAS');
checkFile('dist/404.html', '404');

// Form check in index.html
const indexHtml = fs.readFileSync('dist/index.html', 'utf8');
console.log('\n=== FORM IN INDEX ===');
console.log('Form action="/api/contacto":', indexHtml.includes('action="/api/contacto"'));
console.log('Honeypot input name="bot-field":', indexHtml.includes('name="bot-field"'));

// Open graph check
console.log('\n=== OPEN GRAPH ===');
console.log('og:image 1200x630:', indexHtml.includes('content="1200"') && indexHtml.includes('content="630"'));
console.log('og:image:type image/jpeg:', indexHtml.includes('content="image/jpeg"'));
console.log('og:image URL absolute:', indexHtml.includes('https://gestoriags.com.ar/img/gisella-social.jpg'));

// Sitemap check
console.log('\n=== SITEMAP ===');
const sitemap = fs.readFileSync('dist/sitemap-0.xml', 'utf8');
console.log('Sitemap contains home:', sitemap.includes('https://gestoriags.com.ar/'));
console.log('Sitemap contains privacidad:', sitemap.includes('https://gestoriags.com.ar/privacidad/'));
console.log('Sitemap contains gracias (should be false):', sitemap.includes('gracias'));
console.log('Sitemap contains 404 (should be false):', sitemap.includes('404'));

// Robots.txt check
console.log('\n=== ROBOTS.TXT ===');
const robots = fs.readFileSync('dist/robots.txt', 'utf8');
console.log(robots.trim());
