// Datos únicos del sitio. Todo lo que se repite (NAP, servicios, schema) sale de aquí.

export const site = {
  url: 'https://resuelta.mx',
  name: 'Resuelta',
  legalName: null, // [PENDIENTE] razón social para el aviso de privacidad y el schema
  description:
    'Despacho de abogados laborales en Hermosillo, Sonora, que solo atiende a empresas: contratos, compliance laboral, capacitación y STPS, despidos y conciliación, REPSE y asesoría laboral.',
  phone: '+52-662-318-8301',
  phoneDisplay: '(662) 318 8301',
  phoneHref: 'tel:+526623188301',
  whatsapp: 'https://wa.me/526623188301',
  email: 'joel@resuelta.mx',
  address: {
    street: 'Blvd. Paseo las Quintas #77A, casi esquina con Navarrete, Col. Santa Fe',
    locality: 'Hermosillo',
    region: 'Sonora',
    postalCode: '83249',
    country: 'MX'
  },
  addressDisplay: 'Blvd. Paseo las Quintas #77A, casi esquina con Navarrete, Col. Santa Fe, C.P. 83249, Hermosillo, Sonora',
  mapUrl: 'https://www.google.com/maps/search/?api=1&query=Blvd.+Paseo+las+Quintas+77A,+Santa+Fe,+83249+Hermosillo,+Sonora',
  hours: 'Lunes a viernes, de 8:00 a 15:00',
  sameAs: ['https://instagram.com/resuelta.legal', 'https://facebook.com/resuelta.legal'],
  founder: {
    name: 'Joel Pérez',
    honorific: 'Lic.',
    jobTitle: 'Socio fundador',
    path: '/nosotros/joel-perez/',
    sameAs: [] // [PENDIENTE] LinkedIn de Joel
  },
  updated: '2026-10-23',
  updatedDisplay: '23 de octubre de 2026'
};

// Orden = orden en menús, footer e ItemList.
export const services = [
  {
    slug: 'contratos-laborales',
    name: 'Contratos laborales',
    long: 'Contratos laborales para empresas',
    summary: 'Contratos a la medida, convenios de confidencialidad y formatos operativos.',
    group: 'Prevenir'
  },
  {
    slug: 'compliance-laboral',
    name: 'Compliance laboral',
    long: 'Compliance laboral para empresas',
    summary: 'Reglamento Interior de Trabajo ante el CFCRL, comisiones mixtas y protocolos obligatorios.',
    group: 'Prevenir'
  },
  {
    slug: 'capacitacion-stps',
    name: 'Capacitación y STPS',
    long: 'Capacitación STPS e inspecciones',
    summary: 'Planes y programas de capacitación, constancias y acompañamiento en inspecciones de la STPS.',
    group: 'Prevenir'
  },
  {
    slug: 'despidos-finiquitos',
    name: 'Despidos, finiquitos y conciliación',
    long: 'Despidos, finiquitos y conciliación',
    summary: 'Cálculo de finiquitos y liquidaciones, convenios de salida y conciliación ante el Centro de Conciliación.',
    group: 'Resolver'
  },
  {
    slug: 'repse',
    name: 'REPSE y gestoría patronal',
    long: 'Registro REPSE, ICSOE y SISUB',
    summary: 'Registro y renovación REPSE, informativas ICSOE y SISUB, y trámites FONACOT.',
    group: 'Cumplir'
  },
  {
    slug: 'asesoria-laboral',
    name: 'Asesoría laboral',
    long: 'Asesoría laboral para empresas',
    summary: 'Asesoría remota o presencial y talleres ejecutivos de prevención laboral.',
    group: 'Cumplir'
  }
];

export const servicePath = (slug) => `/servicios/${slug}/`;
