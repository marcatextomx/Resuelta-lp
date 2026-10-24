// Resuelta · comportamiento progresivo. Todo el contenido existe sin este archivo.
document.documentElement.classList.add('js');

// ---------- entrada de cada sección: encabezado, texto, imagen en cascada ----------
(() => {
  const groups = document.querySelectorAll('[data-reveal]');
  if (!groups.length) return;
  groups.forEach((g) => [...g.children].forEach((el, i) => el.style.setProperty('--i', i)));
  if (!('IntersectionObserver' in window)) {
    groups.forEach((g) => g.classList.add('is-in'));
    return;
  }
  const io = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (e.isIntersecting) {
          e.target.classList.add('is-in');
          io.unobserve(e.target);
        }
      }
    },
    { rootMargin: '0px 0px -10% 0px' }
  );
  groups.forEach((g) => io.observe(g));
  // Nunca dejar contenido oculto: si algo falla, todo aparece a los 2.5 s.
  setTimeout(() => groups.forEach((g) => g.classList.add('is-in')), 2500);
})();

// ---------- menú móvil: cerrar al elegir o al tocar fuera ----------
document.querySelectorAll('.menu').forEach((menu) => {
  menu.addEventListener('click', (e) => { if (e.target.closest('a')) menu.open = false; });
  document.addEventListener('click', (e) => { if (menu.open && !menu.contains(e.target)) menu.open = false; });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && menu.open) { menu.open = false; menu.querySelector('summary').focus(); } });
});

// ---------- diagnóstico: una pregunta a la vez ----------
document.querySelectorAll('[data-quiz]').forEach((form) => {
  form.noValidate = true;
  const steps = [...form.querySelectorAll('.step')];
  const back = form.querySelector('.quiz__back');
  const next = form.querySelector('.quiz__next');
  const send = form.querySelector('.quiz__send');
  const count = form.querySelector('.quiz__count');
  const error = form.querySelector('.quiz__error');
  const done = form.querySelector('.quiz__done');
  const nav = form.querySelector('.quiz__nav');
  const slip = form.closest('section')?.querySelector('.slip--live');
  const total = steps.length - 1; // la última pantalla son los datos de contacto
  let at = 0;
  let timer;

  const valueOf = (key) => {
    const el = form.elements[key];
    if (!el) return '';
    if (el instanceof RadioNodeList) return el.value;
    return el.value.trim();
  };

  const paintSlip = (key) => {
    if (!slip) return;
    const cell = slip.querySelector(`[data-slip="${key}"]`);
    if (!cell) return;
    const v = valueOf(key);
    cell.textContent = v || '—';
    cell.classList.toggle('is-filled', !!v);
    cell.classList.remove('just-filled');
    void cell.offsetWidth;
    if (v) cell.classList.add('just-filled');
  };

  const show = (i, focus = true) => {
    at = Math.max(0, Math.min(i, steps.length - 1));
    steps.forEach((s, j) => s.classList.toggle('is-current', j === at));
    const s = steps[at];
    const isText = !!s.querySelector('input[type="text"]');
    const last = at === steps.length - 1;
    back.hidden = at === 0;
    next.hidden = last || !isText;
    send.hidden = !last;
    count.textContent = last ? 'Último paso' : `Pregunta ${at + 1} de ${total}`;
    error.textContent = '';
    if (focus) (s.querySelector('input:checked') || s.querySelector('input'))?.focus({ preventScroll: true });
  };

  const valid = (s) => {
    const key = s.dataset.key;
    if (key === 'nombre') {
      if (!valueOf('nombre')) return 'Escribe tu nombre para que Joel sepa a quién responder.';
      if (!form.elements.acepto.checked) return 'Para enviar, acepta el aviso de privacidad.';
      return '';
    }
    if (!valueOf(key)) return s.querySelector('input[type="radio"]') ? 'Elige una opción para continuar.' : 'Escribe una respuesta para continuar.';
    return '';
  };

  const advance = () => {
    const msg = valid(steps[at]);
    if (msg) { error.textContent = msg; return; }
    show(at + 1);
  };

  form.addEventListener('change', (e) => {
    const t = e.target;
    if (t.name) paintSlip(t.name);
    if (t.type === 'radio') {
      clearTimeout(timer);
      // deja ver la selección un instante antes de pasar a la siguiente
      timer = setTimeout(advance, 220);
    }
  });
  form.addEventListener('input', (e) => { if (e.target.type === 'text') paintSlip(e.target.name); });
  form.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && e.target.type === 'text' && at < steps.length - 1) { e.preventDefault(); advance(); }
  });
  next.addEventListener('click', advance);
  back.addEventListener('click', () => { clearTimeout(timer); show(at - 1); });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    for (let i = 0; i < steps.length; i++) {
      const msg = valid(steps[i]);
      if (msg) { show(i); error.textContent = msg; return; }
    }
    const lines = [
      'Hola, Joel. Quiero el diagnóstico laboral gratis.',
      `Empresa: ${valueOf('empresa')}`,
      `Giro: ${valueOf('giro')}`,
      `Personas: ${valueOf('personas')}`,
      `IMSS: ${valueOf('imss')}`,
      `Puesto: ${valueOf('puesto')}`,
      `Motivo: ${valueOf('motivo')}`,
      `Plazo: ${valueOf('cuando')}`,
      `Nombre: ${valueOf('nombre')}`
    ];
    const url = `https://wa.me/${form.dataset.phone}?text=${encodeURIComponent(lines.join('\n'))}`;
    form.querySelector('.quiz__retry').href = url;
    const urgent = valueOf('motivo') === 'Me llegó un citatorio o una demanda' || valueOf('cuando').startsWith('Es urgente');
    done.querySelector('.urgent').hidden = !urgent;
    steps.forEach((s) => s.classList.remove('is-current'));
    nav.hidden = true;
    error.textContent = '';
    done.hidden = false;
    done.focus();
    window.open(url, '_blank', 'noopener');
    if (typeof window.gtag === 'function') window.gtag('event', 'generate_lead', { method: 'diagnostico_whatsapp' });
  });

  form.querySelector('.quiz__restart').addEventListener('click', () => {
    form.reset();
    done.hidden = true;
    nav.hidden = false;
    slip?.querySelectorAll('[data-slip]').forEach((c) => { c.textContent = '—'; c.classList.remove('is-filled', 'just-filled'); });
    show(0);
  });

  // Atajo desde el hero: /diagnostico/?personas=Entre%2010%20y%2020
  const params = new URLSearchParams(location.search);
  for (const [k, v] of params) {
    const el = form.querySelector(`input[name="${CSS.escape(k)}"][value="${CSS.escape(v)}"]`);
    if (el) { el.checked = true; paintSlip(k); }
  }
  let start = 0;
  while (start < steps.length - 1 && !valid(steps[start]) && params.size) start++;
  show(start, false);
});
