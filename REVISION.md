# Pendientes antes de publicar

## Bloquean el lanzamiento

1. **Razón social.** Ponerla en `src/site.mjs` → `legalName`. Hoy el aviso de privacidad muestra "[Razón social pendiente]".
2. **Revisión legal de Joel.** Todas las afirmaciones con artículo de ley están abajo, página por página. Ninguna se ha validado.
3. **Carta de Joel.** Está escrita en primera persona en la home (`src/pages/index.mjs`, sección "Quién te atiende") y en su perfil (`src/pages/joel-perez.mjs`). Joel debe aprobarla o reescribirla.
4. **Texto del aviso de privacidad.** Base razonable, pero lo debe revisar un abogado: plazos ARCO, proveedores (hosting, WhatsApp, Google Fonts) y analítica si se agrega.
5. **Publicación.** Hacer merge a `main` publica en resuelta.mx (proyecto `resuelta-d4663`). Antes, revisar la vista previa del pull request.
6. **Prospectos.** El formulario anterior guardaba prospectos en Firestore (colección `leads`); el nuevo diagnóstico los manda por WhatsApp y no guarda nada. Revisar en la consola de Firebase si quedan prospectos sin atender.

## Faltan para que el sitio rinda en SEO y GEO

- **Foto real de Joel** para su perfil y la carta. Agregarla a `src/static/img/` y a la tabla `photos` de `src/lib.mjs`.
- **Cédula profesional, formación y años de experiencia** para el perfil: nuevas filas en el bloque de datos y `hasCredential` en el schema `Person`.
- **LinkedIn de Joel** en `src/site.mjs` → `founder.sameAs`.
- **Reseñas reales** de Google Business Profile. No se usó la reseña de José Ruiz (Marcatexto) del sitio actual.
- **Logo vectorial oficial.** El cubo está redibujado como SVG y la palabra "Resuelta" está en Plus Jakarta Sans; reemplazar si existe el archivo original.
- **Decidir en `robots.txt`** si se permite que GPTBot, ClaudeBot y Google-Extended usen el contenido para entrenar. Los buscadores de IA que citan fuentes quedan permitidos.
- **Google Search Console y Bing Webmaster Tools**: enviar `https://resuelta.mx/sitemap.xml`.
- **Google Business Profile, Bing Places y Apple Business Connect** con el mismo nombre, dirección y teléfono que el sitio.

## Afirmaciones legales a validar

### Home (`/`)
- Despido sin aviso por escrito se considera injustificado (LFT, art. 47).
- La falta de contrato escrito se imputa al patrón (LFT, art. 26).
- Sin REPSE, el cliente no puede deducir la factura.
- Faltar a la audiencia de conciliación genera multa y deja libre la vía del juicio.
- A trabajadores se les remite a la Procuraduría de la Defensa del Trabajo.

### Contratos laborales
- Condiciones por escrito (art. 24) e imputación al patrón (art. 26).
- Tabla: arts. 35, 36, 37, 39-A, 39-B y 39-F.
- Periodo de prueba de hasta 30 días, o 180 para dirección, confianza o puestos técnicos especializados (art. 39-A).
- Prórroga si subsiste la materia del trabajo (art. 39).

### Compliance laboral
- Reglamento Interior: arts. 422 a 425, con depósito ante el CFCRL dentro de los 8 días siguientes a la firma (art. 424).
- Comisiones: art. 509 y NOM-019-STPS, art. 153-E y art. 125.
- Protocolo contra hostigamiento y acoso (art. 132, fr. XXXI).
- Alcance de la NOM-035 por número de trabajadores (hasta 15, de 16 a 50, más de 50).

### Capacitación y STPS
- Qué hacer cuando llega un inspector (credencial, orden, acta).
- Definición de la DC-3.
- Multas en UMA por infracción (arts. 992 a 1010).

### Despidos, finiquitos y conciliación
- Dos meses para demandar por despido (art. 518).
- Conciliación obligatoria con excepciones (art. 685 Ter).
- Despido justificado con aviso por escrito (art. 47).
- Salarios vencidos hasta 12 meses, más intereses sobre 15 meses (art. 48).
- Tabla finiquito/liquidación: arts. 82 y 88, 87, 76, 79 y 80, 162 (15 años en renuncia), 48 y 50, 49 y 50.

### REPSE
- Definición de servicio especializado (art. 13).
- 20 días para que responda la STPS (art. 15).
- Multas, más la no deducibilidad y el no acreditamiento de IVA para el cliente.
- Vigencia de 3 años.
- ICSOE (LSS, art. 15-A), SISUB (Ley del INFONAVIT, art. 29 Bis), FONACOT (LFT, art. 132, fr. XXVI Bis).

### Asesoría laboral
- "Propuesta por escrito después del diagnóstico": confirmar que así trabajan.

## Cambios respecto a los wireframes

- Los H1 dejaron fuera "en Hermosillo" para no pasar de dos líneas. La ciudad sigue en el `<title>`, en la primera frase de cada página y en el schema.
- El paso de contacto del diagnóstico pide solo el nombre: WhatsApp ya muestra el número de quien escribe.
- No hay sección de reseñas: se agrega cuando existan reseñas reales.
- La landing de Despidos usa el H1 "Despidos, finiquitos y conciliación".
