const STOPWORDS = new Set([
  'a', 'al', 'algo', 'con', 'de', 'del', 'el', 'en', 'es', 'esta', 'este',
  'la', 'las', 'lo', 'los', 'me', 'mi', 'para', 'por', 'que', 'quiero', 'un',
  'una', 'unas', 'unos', 'y',
]);

const SINONIMOS = {
  aniversario: ['pareja', 'romantico', 'amor'],
  boda: ['novia', 'matrimonio', 'nupcial'],
  cumpleanos: ['cumple', 'regalo', 'celebracion'],
  decoracion: ['casa', 'hogar', 'escritorio', 'repisa'],
  economico: ['barato', 'accesible', 'presupuesto'],
  flores: ['floral', 'ramo', 'bouquet'],
  regalo: ['detalle', 'obsequio', 'sorpresa'],
  tejido: ['crochet', 'algodon', 'hilo'],
};

const normalizar = (valor) =>
  String(valor || '')
    .replace(/<[^>]*>/g, ' ')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

function tokens(valor) {
  const base = normalizar(valor)
    .split(' ')
    .filter((token) => token.length > 1 && !STOPWORDS.has(token));
  const ampliados = [...base];

  Object.entries(SINONIMOS).forEach(([concepto, palabras]) => {
    if (base.includes(concepto) || palabras.some((palabra) => base.includes(palabra))) {
      ampliados.push(concepto, ...palabras);
    }
  });

  return ampliados;
}

const textoProducto = (producto) => [
  producto.nombre,
  producto.categoria,
  producto.descripcion,
  producto.disponibilidad,
  producto.tiempoElaboracion,
  ...Object.values(producto.caracteristicas || {}),
].join(' ');

function presupuestoDe(consulta) {
  const texto = normalizar(consulta);
  const patrones = [
    /(?:menos de|hasta|maximo|presupuesto)\s*(?:s\/?\s*)?(\d+(?:[.,]\d+)?)/,
    /(?:s\/?\s*)(\d+(?:[.,]\d+)?)\s*(?:o menos|maximo)?/,
  ];
  for (const patron of patrones) {
    const coincidencia = texto.match(patron);
    if (coincidencia) return Number(coincidencia[1].replace(',', '.'));
  }
  return null;
}

function similitudCoseno(consulta, documento, idf) {
  const frecuencia = (lista) => lista.reduce((mapa, token) => {
    mapa.set(token, (mapa.get(token) || 0) + 1);
    return mapa;
  }, new Map());
  const q = frecuencia(consulta);
  const d = frecuencia(documento);
  const vocabulario = new Set([...q.keys(), ...d.keys()]);
  let producto = 0;
  let normaQ = 0;
  let normaD = 0;

  vocabulario.forEach((token) => {
    const peso = idf.get(token) || 1;
    const valorQ = (q.get(token) || 0) * peso;
    const valorD = (d.get(token) || 0) * peso;
    producto += valorQ * valorD;
    normaQ += valorQ ** 2;
    normaD += valorD ** 2;
  });

  return normaQ && normaD ? producto / Math.sqrt(normaQ * normaD) : 0;
}

function explicar(producto, consultaTokens, presupuesto) {
  const campos = [
    ['ocasión', producto.caracteristicas?.idealPara],
    ['colores', producto.caracteristicas?.colores],
    ['material', producto.caracteristicas?.material],
    ['categoría', producto.categoria],
  ];
  const coincidencias = campos
    .filter(([, valor]) => tokens(valor).some((token) => consultaTokens.includes(token)))
    .map(([nombre]) => nombre);

  if (presupuesto !== null && producto.precio <= presupuesto) coincidencias.push('presupuesto');
  if (!coincidencias.length) return 'Coincide con el significado general de tu búsqueda.';
  return `Buena opción por ${coincidencias.slice(0, 3).join(', ')}.`;
}

/**
 * Recomendador de contenido. No envía información del catálogo a terceros y
 * recalcula el ranking cuando PocketBase actualiza los productos.
 */
export function recomendarProductos(productos, consulta, limite = 6) {
  const consultaTokens = tokens(consulta);
  if (!consultaTokens.length || !productos.length) return [];

  const documentos = productos.map((producto) => tokens(textoProducto(producto)));
  const idf = new Map();
  new Set(documentos.flat()).forEach((token) => {
    const apariciones = documentos.filter((doc) => doc.includes(token)).length;
    idf.set(token, Math.log((productos.length + 1) / (apariciones + 1)) + 1);
  });

  const presupuesto = presupuestoDe(consulta);
  return productos
    .map((producto, indice) => {
      let puntuacion = similitudCoseno(consultaTokens, documentos[indice], idf);
      const texto = normalizar(textoProducto(producto));
      const coincidenciasExactas = consultaTokens.filter((token) => texto.includes(token)).length;
      puntuacion += coincidenciasExactas * 0.025;

      if (presupuesto !== null) {
        puntuacion += producto.precio <= presupuesto ? 0.22 : -Math.min(0.35, (producto.precio - presupuesto) / Math.max(presupuesto, 1));
      }
      if (normalizar(producto.disponibilidad).includes('disponible')) puntuacion += 0.025;

      return {
        producto,
        puntuacion,
        razon: explicar(producto, consultaTokens, presupuesto),
      };
    })
    .filter((resultado) => resultado.puntuacion > 0)
    .sort((a, b) => b.puntuacion - a.puntuacion || a.producto.precio - b.producto.precio)
    .slice(0, limite);
}

