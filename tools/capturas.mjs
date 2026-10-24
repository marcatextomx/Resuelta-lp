// Capturas de página completa del sitio local con Chrome sin interfaz (CDP).
// Uso: node serve.mjs 4321 &  node tools/capturas.mjs <carpeta-salida>
import { spawn } from 'node:child_process';
import { mkdir, writeFile } from 'node:fs/promises';
import { join } from 'node:path';

const outDir = process.argv[2] || 'capturas';
const base = 'http://127.0.0.1:4321';
const chrome = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const only = process.argv.slice(3);
const all = [
  ['home', '/', 1440], ['servicios', '/servicios/', 1440], ['contratos', '/servicios/contratos-laborales/', 1440],
  ['compliance', '/servicios/compliance-laboral/', 1440], ['capacitacion', '/servicios/capacitacion-stps/', 1440],
  ['despidos', '/servicios/despidos-finiquitos/', 1440], ['repse', '/servicios/repse/', 1440],
  ['asesoria', '/servicios/asesoria-laboral/', 1440], ['joel', '/nosotros/joel-perez/', 1440],
  ['diagnostico', '/diagnostico/', 1440], ['aviso', '/aviso-de-privacidad/', 1440], ['404', '/no-existe/', 1440],
  ['blog', '/blog/', 1440], ['articulo', '/blog/finiquito-o-liquidacion/', 1440],
  ['home-movil', '/', 390], ['diagnostico-movil', '/diagnostico/', 390], ['articulo-movil', '/blog/finiquito-o-liquidacion/', 390]
];
const shots = only.length ? all.filter(([n]) => only.includes(n)) : all;

await mkdir(outDir, { recursive: true });
const proc = spawn(chrome, ['--headless=new', '--remote-debugging-port=9333', '--hide-scrollbars', '--force-prefers-reduced-motion', '--user-data-dir=/tmp/resuelta-chrome', 'about:blank'], { stdio: 'ignore' });
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
let target;
for (let i = 0; i < 40 && !target; i++) {
  await sleep(250);
  target = await fetch('http://127.0.0.1:9333/json').then((r) => r.json()).then((l) => l.find((t) => t.type === 'page')).catch(() => null);
}
const ws = new WebSocket(target.webSocketDebuggerUrl);
await new Promise((r) => (ws.onopen = r));
let id = 0;
const pending = new Map();
const events = [];
ws.onmessage = (m) => {
  const d = JSON.parse(m.data);
  if (d.id && pending.has(d.id)) { pending.get(d.id)(d.result); pending.delete(d.id); }
  else events.push(d.method);
};
const send = (method, params = {}) => new Promise((r) => { const n = ++id; pending.set(n, r); ws.send(JSON.stringify({ id: n, method, params })); });

await send('Page.enable');
for (const [name, path, width] of shots) {
  await send('Emulation.setDeviceMetricsOverride', { width, height: 900, deviceScaleFactor: 1, mobile: width < 600 });
  events.length = 0;
  await send('Page.navigate', { url: base + path });
  for (let i = 0; i < 80 && !events.includes('Page.loadEventFired'); i++) await sleep(100);
  await sleep(900);
  // las fotos con loading="lazy" no cargan fuera de la ventana: forzarlas antes de capturar
  const { result } = await send('Runtime.evaluate', {
    expression: `(async () => {
      const imgs = [...document.images];
      imgs.forEach((i) => (i.loading = 'eager'));
      await Promise.all(imgs.map((i) => (i.complete ? null : new Promise((r) => { i.onload = i.onerror = r; }))));
      await document.fonts.ready;
      return document.documentElement.scrollHeight;
    })()`,
    awaitPromise: true,
    returnByValue: true
  });
  const height = result.value;
  await send('Emulation.setDeviceMetricsOverride', { width, height, deviceScaleFactor: 1, mobile: width < 600 });
  await sleep(500);
  const { data } = await send('Page.captureScreenshot', { format: 'jpeg', quality: 72, captureBeyondViewport: true });
  await writeFile(join(outDir, `${name}.jpg`), Buffer.from(data, 'base64'));
  console.log(`${name} ${width}x${height}`);
}
ws.close();
proc.kill();
