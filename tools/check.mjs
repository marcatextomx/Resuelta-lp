// Revisión del sitio generado: enlaces internos, h1, títulos, imágenes y schema.
// Uso: node build.mjs && node tools/check.mjs
import { readdir, readFile, stat } from 'node:fs/promises';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const dist = join(dirname(fileURLToPath(import.meta.url)), '..', 'dist');
const problems = [];
const say = (page, msg) => problems.push(`${page}: ${msg}`);

async function walk(dir) {
  const out = [];
  for (const e of await readdir(dir, { withFileTypes: true })) {
    const p = join(dir, e.name);
    if (e.isDirectory()) out.push(...(await walk(p)));
    else if (e.name.endsWith('.html')) out.push(p);
  }
  return out;
}

const exists = async (p) => !!(await stat(p).catch(() => null));
const pages = await walk(dist);
const titles = new Map();
const descs = new Map();

for (const file of pages) {
  const page = file.slice(dist.length) || '/';
  const html = await readFile(file, 'utf8');
  const h1 = (html.match(/<h1[\s>]/g) || []).length;
  if (h1 !== 1) say(page, `${h1} h1`);
  const title = html.match(/<title>([^<]*)<\/title>/)?.[1];
  const desc = html.match(/<meta name="description" content="([^"]*)"/)?.[1];
  if (!title) say(page, 'sin <title>');
  if (titles.has(title)) say(page, `título repetido con ${titles.get(title)}`);
  titles.set(title, page);
  if (descs.has(desc)) say(page, `descripción repetida con ${descs.get(desc)}`);
  descs.set(desc, page);
  if (title && title.length > 60) say(page, `título de ${title.length} caracteres`);
  if (desc && (desc.length < 70 || desc.length > 160)) say(page, `descripción de ${desc.length} caracteres`);
  if (!page.includes('404') && !html.includes('rel="canonical"')) say(page, 'sin canonical');
  if (/\[[A-ZÁÉÍÓÚ ]{4,}\]/.test(html.replace(/<script[\s\S]*?<\/script>/g, ''))) say(page, 'tiene un [PENDIENTE] visible');

  for (const img of html.match(/<img\b[^>]*>/g) || []) {
    if (!/\salt="[^"]+"/.test(img)) say(page, `imagen sin alt: ${img.slice(0, 80)}`);
    if (!/\swidth="\d+"/.test(img) || !/\sheight="\d+"/.test(img)) say(page, 'imagen sin width/height');
    const src = img.match(/\ssrc="([^"]+)"/)?.[1];
    if (src && src.startsWith('/') && !(await exists(join(dist, src)))) say(page, `imagen rota ${src}`);
  }

  for (const [, href] of html.matchAll(/\shref="([^"]+)"/g)) {
    if (!href.startsWith('/') || href.startsWith('//')) continue;
    const [path, hash] = href.split('#');
    const target = path === '' ? file : path.endsWith('/') ? join(dist, path, 'index.html') : join(dist, path);
    if (!(await exists(target))) { say(page, `enlace roto ${href}`); continue; }
    if (hash) {
      const t = path === '' ? html : await readFile(target, 'utf8');
      if (!t.includes(`id="${hash}"`)) say(page, `ancla inexistente ${href}`);
    }
  }

  const ld = html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)?.[1];
  try {
    const g = JSON.parse(ld)['@graph'];
    const types = g.map((n) => n['@type']);
    if (!types.includes('LegalService')) say(page, 'schema sin LegalService');
    const faq = g.find((n) => n['@type'] === 'FAQPage');
    if (faq) {
      for (const q of faq.mainEntity) if (!html.includes(q.name.replace(/&/g, '&amp;'))) say(page, `pregunta del schema no visible: ${q.name}`);
    }
    for (const n of g) for (const ref of JSON.stringify(n).matchAll(/"@id":"([^"]+)"/g)) {
      const id = ref[1];
      if (!g.some((m) => m['@id'] === id) && !id.includes('#servicio') && !id.includes('#persona')) say(page, `@id sin nodo: ${id}`);
    }
  } catch (e) {
    say(page, `JSON-LD inválido: ${e.message}`);
  }
}

console.log(`${pages.length} páginas revisadas`);
if (problems.length) {
  console.log(problems.map((p) => `  · ${p}`).join('\n'));
  process.exit(1);
}
console.log('Sin problemas.');
