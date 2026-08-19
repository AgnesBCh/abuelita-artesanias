/**
 * Datos de respaldo (fallback) del catálogo.
 * La app consume normalmente una API externa basada en Google Sheets
 * (ver `src/hooks/useCatalogo.js`). Este archivo NO contiene imágenes locales:
 * solo URLs remotas (listas para Cloudinary), para no saturar el repositorio.
 */

export const CATEGORIAS_FALLBACK = [
  {
    id: 'cat-1',
    slug: 'flores-de-cinta',
    nombre: 'Flores de Cinta',
    descripcion: 'Ramos eternos de cinta de raso, cosidos y moldeados pétalo por pétalo.',
    imagenes: [
      'https://images.hostinger.com/c3d4035c-2c45-4b45-b655-06dcc1e50eff.png',
      'https://images.hostinger.com/89ac3cac-b460-413b-b3ac-2508366136d5.png',
      'https://images.hostinger.com/d2f883f9-dc34-44fb-8675-2bf4e598fff7.png',
    ],
  },
  {
    id: 'cat-2',
    slug: 'limpiapipas',
    nombre: 'Detalles de Limpiapipa',
    descripcion: 'Figuras y flores de limpiapipas, dulces y coloridas, hechas a mano.',
    imagenes: [
      'https://images.hostinger.com/84a58670-3892-45b6-a1e9-5d24210b3f2a.png',
      'https://images.hostinger.com/90c630ea-11e2-4b31-b4c5-fd86c0de75f0.png',
    ],
  },
  {
    id: 'cat-3',
    slug: 'tejidos',
    nombre: 'Tejidos Artesanales',
    descripcion: 'Crochet peruano en algodón e hilo natural, tejido punto a punto.',
    imagenes: [
      'https://images.hostinger.com/58f2d63f-e1fb-41a7-bdbb-a68a67ceb41a.png',
      'https://images.hostinger.com/ddd15f1b-a455-42db-9a4a-7986c4a43792.png',
    ],
  },
  {
    id: 'cat-4',
    slug: 'cajas-regalo',
    nombre: 'Cajas de Regalo',
    descripcion: 'Composiciones listas para regalar, envueltas con dedicatoria.',
    imagenes: [
      'https://images.hostinger.com/61b9d2f0-afe0-4ef5-85db-4858d66853ae.png',
      'https://images.hostinger.com/f3d48a0e-d5e2-4ff4-9f23-f9efe875c6ea.png',
    ],
  },
];

export const PRODUCTOS_FALLBACK = [
  {
    id: 'p-001',
    slug: 'ramo-eterno-aurora',
    nombre: 'Ramo Eterno Aurora',
    categoriaSlug: 'flores-de-cinta',
    categoria: 'Flores de Cinta',
    descripcion:
      'Doce rosas de cinta de raso en tonos marfil y durazno, montadas sobre tallos forrados y envueltas en papel kraft con lazo dorado. Un ramo que no se marchita.',
    precio: 149,
    tiempoElaboracion: '5 a 7 días hábiles',
    disponibilidad: 'Bajo pedido',
    codigo: 'LL-FC-001',
    imagenes: [
      'https://images.hostinger.com/c3d4035c-2c45-4b45-b655-06dcc1e50eff.png',
      'https://images.hostinger.com/89ac3cac-b460-413b-b3ac-2508366136d5.png',
    ],
    caracteristicas: {
      material: 'Cinta de raso doble faz, alambre forrado',
      tecnica: 'Modelado y cosido a mano, pétalo por pétalo',
      dimensiones: '32 cm de alto x 24 cm de diámetro',
      peso: '480 g',
      colores: 'Marfil, durazno, dorado',
      idealPara: 'Aniversarios, cumpleaños, pedidas de mano',
      cuidados: 'Limpiar con brocha seca. Evitar humedad y sol directo.',
    },
  },
  {
    id: 'p-002',
    slug: 'bouquet-novia-lino',
    nombre: 'Bouquet de Novia Lino',
    categoriaSlug: 'flores-de-cinta',
    categoria: 'Flores de Cinta',
    descripcion:
      'Bouquet nupcial en crema y oro viejo con detalles de perla cosida a mano. Diseñado para conservarse como recuerdo de por vida.',
    precio: 289,
    tiempoElaboracion: '10 a 14 días hábiles',
    disponibilidad: 'Bajo pedido',
    codigo: 'LL-FC-014',
    imagenes: [
      'https://images.hostinger.com/d2f883f9-dc34-44fb-8675-2bf4e598fff7.png',
      'https://images.hostinger.com/c3d4035c-2c45-4b45-b655-06dcc1e50eff.png',
    ],
    caracteristicas: {
      material: 'Raso, organza, perlas de vidrio',
      tecnica: 'Armado nupcial con base de cinta trenzada',
      dimensiones: '28 cm de alto x 26 cm de diámetro',
      peso: '620 g',
      colores: 'Crema, oro viejo, blanco perla',
      idealPara: 'Bodas y sesiones fotográficas',
      cuidados: 'Guardar en caja cerrada, lejos de la humedad.',
    },
  },
  {
    id: 'p-003',
    slug: 'mini-jardin-chenille',
    nombre: 'Mini Jardín de Chenille',
    categoriaSlug: 'limpiapipas',
    categoria: 'Detalles de Limpiapipas',
    descripcion:
      'Set de seis flores de limpiapipas en tonos pastel, presentadas en maceta de cerámica pequeña. Un detalle alegre para escritorio o repisa.',
    precio: 59,
    tiempoElaboracion: '3 días hábiles',
    disponibilidad: 'Disponible',
    codigo: 'LL-CH-003',
    imagenes: [
      'https://images.hostinger.com/84a58670-3892-45b6-a1e9-5d24210b3f2a.png',
    ],
    caracteristicas: {
      material: 'Limpiapipas de chenille, cerámica esmaltada',
      tecnica: 'Torsión y modelado manual',
      dimensiones: '18 cm de alto x 10 cm de base',
      peso: '210 g',
      colores: 'Rosa, lila, celeste, mantequilla',
      idealPara: 'Detalles de oficina, regalos rápidos',
      cuidados: 'Sacudir el polvo suavemente. No lavar.',
    },
  },
  {
    id: 'p-004',
    slug: 'ramillete-chenille-cumple',
    nombre: 'Ramillete Chenille Cumpleaños',
    categoriaSlug: 'limpipapipas',
    categoria: 'Detalles de Limpiapipas',
    descripcion:
      'Ramillete de nueve flores de chenille con cartel personalizado y caja de regalo. Ideal para sorprender sin gastar de más.',
    precio: 89,
    tiempoElaboracion: '4 días hábiles',
    disponibilidad: 'Disponible',
    codigo: 'LL-CH-011',
    imagenes: [
      'https://images.hostinger.com/90c630ea-11e2-4b31-b4c5-fd86c0de75f0.png',
      'https://images.hostinger.com/84a58670-3892-45b6-a1e9-5d24210b3f2a.png',
    ],
    caracteristicas: {
      material: 'Chenille, cartulina texturada, cinta',
      tecnica: 'Armado y rotulado a mano',
      dimensiones: '30 cm de alto',
      peso: '260 g',
      colores: 'A elección del cliente',
      idealPara: 'Cumpleaños y graduaciones',
      cuidados: 'Mantener alejado del agua.',
    },
  },
  {
    id: 'p-005',
    slug: 'flor-crochet-algodon',
    nombre: 'Flores de Crochet en Algodón',
    categoriaSlug: 'tejidos',
    categoria: 'Tejidos Artesanales',
    descripcion:
      'Trío de flores tejidas a crochet en algodón peruano, con tallo flexible. Textura suave y acabado impecable.',
    precio: 75,
    tiempoElaboracion: '6 días hábiles',
    disponibilidad: 'Bajo pedido',
    codigo: 'LL-TJ-007',
    imagenes: [
      'https://images.hostinger.com/58f2d63f-e1fb-41a7-bdbb-a68a67ceb41a.png',
      'https://images.hostinger.com/ddd15f1b-a455-42db-9a4a-7986c4a43792.png',
    ],
    caracteristicas: {
      material: 'Algodón pima peruano, alambre forrado',
      tecnica: 'Crochet punto bajo y punto alto',
      dimensiones: '26 cm de alto por unidad',
      peso: '150 g el trío',
      colores: 'Beige, arena, dorado suave',
      idealPara: 'Decoración de interiores',
      cuidados: 'Lavado a mano en agua fría, secar en plano.',
    },
  },
  {
    id: 'p-006',
    slug: 'caja-eterna-lira',
    nombre: 'Caja Eterna Lira',
    categoriaSlug: 'cajas-regalo',
    categoria: 'Cajas de Regalo',
    descripcion:
      'Caja rígida forrada en lino con flores de cinta, tarjeta caligrafiada y espacio para un obsequio adicional.',
    precio: 179,
    tiempoElaboracion: '7 días hábiles',
    disponibilidad: 'Bajo pedido',
    codigo: 'LL-CR-002',
    imagenes: [
      'https://images.hostinger.com/61b9d2f0-afe0-4ef5-85db-4858d66853ae.png',
      'https://images.hostinger.com/f3d48a0e-d5e2-4ff4-9f23-f9efe875c6ea.png',
    ],
    caracteristicas: {
      material: 'Cartón rígido forrado en lino, cinta de raso',
      tecnica: 'Forrado y composición floral a mano',
      dimensiones: '25 x 25 x 12 cm',
      peso: '900 g',
      colores: 'Crema y dorado',
      idealPara: 'Regalos corporativos y fechas especiales',
      cuidados: 'Conservar en lugar seco.',
    },
  },
];

export const TESTIMONIOS = [
  {
    id: 't-1',
    nombre: 'Camila Rojas',
    ciudad: 'Lima',
    fecha: 'Marzo 2025',
    estrellas: 5,
    resena:
      'Pedí el ramo para el aniversario de mis papás y lloraron. Se ve mucho más bonito en persona, cada pétalo está perfecto.',
    producto: 'Ramo Eterno Aurora',
    foto: 'https://images.hostinger.com/0f559bf8-5c2e-44b6-bb06-d64b542e28fa.png',
  },
  {
    id: 't-2',
    nombre: 'Diego Paredes',
    ciudad: 'Arequipa',
    fecha: 'Enero 2025',
    estrellas: 5,
    resena:
      'Coordinamos todo por WhatsApp, me mandaron fotos del avance y llegó antes de lo prometido.',
    producto: 'Ramillete Chenille Cumpleaños',
    foto: 'https://images.hostinger.com/90c630ea-11e2-4b31-b4c5-fd86c0de75f0.png',
  },
  {
    id: 't-3',
    nombre: 'Rosa y Antonella Quispe',
    ciudad: 'Trujillo',
    fecha: 'Noviembre 2024',
    estrellas: 5,
    resena:
      'El tejido es finísimo. Lo tengo en la sala y todas mis visitas preguntan dónde lo compré.',
    producto: 'Flores de Crochet en Algodón',
    foto: 'https://images.hostinger.com/e7a092f4-7077-4bc9-882e-677b1bf4fb76.png',
  },
  {
    id: 't-4',
    nombre: 'Valeria Ninahuanca',
    ciudad: 'Cusco',
    fecha: 'Agosto 2024',
    estrellas: 5,
    resena:
      'Mi bouquet de novia sigue igual de hermoso un año después. Fue la mejor decisión para mi boda.',
    producto: 'Bouquet de Novia Lino',
    foto: 'https://images.hostinger.com/d2f883f9-dc34-44fb-8675-2bf4e598fff7.png',
  },
];

export const COLLAGE = [
  { src: 'https://images.hostinger.com/23da4864-eb64-43a6-8bba-740c72a0de94.png', alt: 'Manos atando cinta de raso', size: 'img-large' },
  { src: 'https://images.hostinger.com/866e625d-7171-4fd3-aeb3-02d4714d09f5.png', alt: 'Mesa de trabajo artesanal', size: 'img-small' },
  { src: 'https://images.hostinger.com/ddd15f1b-a455-42db-9a4a-7986c4a43792.png', alt: 'Artesana tejiendo a crochet', size: 'img-medium' },
  { src: 'https://images.hostinger.com/89ac3cac-b460-413b-b3ac-2508366136d5.png', alt: 'Ramo terminado envuelto con hilo dorado', size: 'img-medium' },
  { src: 'https://images.hostinger.com/61b9d2f0-afe0-4ef5-85db-4858d66853ae.png', alt: 'Caja de regalo lista para entregar', size: 'img-small' },
];

export const HERO_IMAGE = 'https://images.hostinger.com/5f63bded-c18c-489b-9ade-7d3d57195f44.png';
export const BANNER_PERSONALIZADO = 'https://images.hostinger.com/f3d48a0e-d5e2-4ff4-9f23-f9efe875c6ea.png';
