// Servidor local para revisar dist/ como lo sirve Firebase (URLs limpias y 404 real).
// Uso: node serve.mjs [puerto]
import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { join, extname, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const dist = join(dirname(fileURLToPath(import.meta.url)), 'dist');
const port = Number(process.argv[2]) || 4321;
const types = { '.html': 'text/html; charset=utf-8', '.css': 'text/css', '.js': 'text/javascript', '.svg': 'image/svg+xml', '.jpg': 'image/jpeg', '.png': 'image/png', '.xml': 'application/xml', '.txt': 'text/plain; charset=utf-8', '.json': 'application/json' };

async function resolve(path) {
  const file = join(dist, decodeURIComponent(path));
  if (!file.startsWith(dist)) return null;
  try {
    const s = await stat(file);
    if (s.isDirectory()) return (await stat(join(file, 'index.html')).catch(() => null)) ? join(file, 'index.html') : null;
    return file;
  } catch {
    return null;
  }
}

createServer(async (req, res) => {
  const path = new URL(req.url, 'http://x').pathname;
  if (!extname(path) && !path.endsWith('/')) {
    res.writeHead(301, { Location: `${path}/` });
    return res.end();
  }
  const file = await resolve(path);
  if (!file) {
    res.writeHead(404, { 'Content-Type': types['.html'] });
    return res.end(await readFile(join(dist, '404.html')).catch(() => 'No encontrado'));
  }
  res.writeHead(200, { 'Content-Type': types[extname(file)] || 'application/octet-stream' });
  res.end(await readFile(file));
}).listen(port, () => console.log(`http://localhost:${port}`));
