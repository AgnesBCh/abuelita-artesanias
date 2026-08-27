const IMG = '/images/catalogo/';

export const CATEGORIAS_DEMO = [
  ['fc', 'flores-de-cinta', 'Flores de Cinta', 'FC', 'Ramos eternos de cinta, armados pétalo por pétalo.', 'ramo-varon.jpg'],
  ['ch', 'arte-chenille', 'Arte en Chenille', 'CH', 'Flores y figuras modeladas a mano con suaves limpiapipas.', 'girasol-naranja.jpg'],
  ['pc', 'peluches-cojines', 'Peluches y Cojines', 'PC', 'Compañeros suaves, cojines y detalles textiles para regalar.', 'animalitos-sorpresa.jpg'],
  ['ht', 'hogar-textil', 'Hogar Textil', 'HT', 'Organizadores y accesorios útiles cosidos artesanalmente.', 'porta-colonias.jpg'],
  ['na', 'navidad-artesanal', 'Navidad Artesanal', 'NA', 'Personajes y decoración textil para una Navidad entrañable.', 'familia-nieve-mesa.jpg'],
].map(([id, slug, nombre, siglas, descripcion, imagen]) => ({ id: `demo-cat-${id}`, slug, nombre, siglas, descripcion, imagenes: [`${IMG}${imagen}`] }));

const CATS = Object.fromEntries(CATEGORIAS_DEMO.map((c) => [c.slug, c]));

const ESPECIFICACIONES = [
  ['ramo-eterno-azul-rojo','Ramo Eterno Azul & Rojo','flores-de-cinta','ramo-varon.jpg',89,'Ramo de rosas satinadas azul, rojo y blanco con destellos dorados.','Cinta satinada, papel coreano y detalles de glitter','Plegado y armado manual de rosas','35 cm de alto x 24 cm de diámetro','Azul rey, rojo, blanco y dorado','Cumpleaños, graduaciones y regalos para él'],
  ['girasol-chenille-naranja','Girasol Naranja de Chenille','arte-chenille','girasol-naranja.jpg',39,'Girasol decorativo alegre y ligero para iluminar cualquier espacio.','Chenille aterciopelado y alambre flexible','Torsión y modelado manual','28 cm de alto','Naranja, amarillo y verde','Amistad, agradecimientos y escritorios'],
  ['rosa-grande-chenille','Rosa Grande de Chenille','arte-chenille','rosa-grande.jpg',45,'Rosa de gran formato con pétalos suaves que conserva su forma.','Chenille aterciopelado y tallo forrado','Modelado de pétalos y ensamblaje','32 cm de alto','Rojo y verde','Aniversarios y detalles románticos'],
  ['osito-miel-chenille','Osito Miel de Chenille','arte-chenille','osito-chenille.jpg',79,'Osito suave con pequeña colmena y detalles cosidos a mano.','Chenille grueso, fieltro y relleno suave','Modelado volumétrico y costura','30 cm de alto','Naranja, rojo, miel y marrón','Cumpleaños y regalos infantiles'],
  ['cojin-pajarito-amarillo','Cojín Pajarito Amarillo','peluches-cojines','almohada-amarilla.jpg',49,'Cojín suave y expresivo para sumar color a un dormitorio.','Tela polar y relleno siliconado','Corte, aplicación y costura','38 x 30 cm','Amarillo, celeste y naranja','Dormitorios infantiles y regalos divertidos'],
  ['atrancapuerta-arana','Atrancapuerta Arañita','hogar-textil','atrancapuerta-arana.jpg',42,'Pieza textil con peso interior que sujeta y decora la puerta.','Tela polar, relleno y peso interior','Costura reforzada y aplicación','25 x 18 cm','Negro y colores surtidos','Dormitorios y estudios'],
  ['animalitos-sorpresa','Animalitos Sorpresa','peluches-cojines','animalitos-sorpresa.jpg',35,'Mini gatitos, ositos y conejitos para pequeños recuerdos.','Tela polar, cintas y relleno suave','Costura y aplicación manual','18 a 22 cm','Rosa, blanco, miel y pastel','Fiestas y regalos infantiles'],
  ['mini-cojines-sorpresa','Mini Cojines Sorpresa','peluches-cojines','mini-almohadas.jpg',29,'Mini almohadas blandas con diseños variados y personalizables.','Tela suave y relleno siliconado','Costura y aplicación manual','20 x 20 cm','Surtidos y personalizables','Baby showers y cumpleaños'],
  ['porta-colonias-rosa','Organizador Porta Colonias','hogar-textil','porta-colonias.jpg',69,'Organizador acolchado con bolsillos para artículos de cuidado personal.','Algodón, guata, encaje y cintas','Acolchado y costura decorativa','42 x 28 cm','Rosa pastel y blanco','Tocadores y regalos para el hogar'],
  ['porta-medias-azul','Porta Medias Azul','hogar-textil','porta-medias-azul.jpg',62,'Organizador colgante dividido para medias y accesorios.','Tela estampada, guata y cinta','Costura reforzada','55 x 30 cm','Azul y blanco','Clósets y organización diaria'],
  ['porta-medias-rosado','Porta Medias Rosado','hogar-textil','porta-medias-rosado.jpg',62,'Organizador textil colgante para prendas pequeñas y accesorios.','Tela estampada, guata y aplicaciones','Costura reforzada','55 x 30 cm','Rosado y blanco','Clósets y regalos para el hogar'],
  ['rosario-textil','Rosario Textil Decorativo','hogar-textil','rosario-textil.jpg',38,'Rosario decorativo elaborado con pequeñas piezas textiles suaves.','Tela suave, cordón e hilo','Ensamblaje y costura manual','45 cm de largo','Blanco y personalizables','Bautizos y primera comunión'],
  ['set-organizador-bano','Set Organizador de Baño','hogar-textil','set-porta-bano.jpg',95,'Juego coordinado para ordenar y vestir el baño.','Tela lavable, guata y aplicaciones','Acolchado y costura','Set de tamaños variados','Personalizable','Casa nueva y organización'],
  ['bota-porta-champan','Bota Porta Champán','navidad-artesanal','bota-porta-champan.jpg',55,'Bota acolchada para presentar una botella como regalo.','Tela, guata y aplicaciones','Acolchado y costura','45 x 20 cm','Rojo, verde y dorado','Cenas y regalos corporativos'],
  ['duende-navideno-grande','Duende Navideño Grande','navidad-artesanal','duende-grande.jpg',119,'Duende de gran formato con vestuario hecho a mano.','Tela polar, fieltro y relleno','Costura, modelado y vestuario','65 cm de alto','Rojo, verde y dorado','Entradas, salas y vitrinas'],
  ['dulceros-navidenos','Dulceros Navideños','navidad-artesanal','dulceros-navidenos.jpg',32,'Personajes textiles con espacio para dulces.','Fieltro, polar y aplicaciones','Costura y aplicación','22 cm de alto','Rojo, verde y blanco','Intercambios y mesas navideñas'],
  ['muneco-nieve-azul','Muñeco de Nieve Azul','navidad-artesanal','muneco-nieve-azul.jpg',74,'Muñeco de nieve con abrigo azul y detalles brillantes.','Tela polar, guata y accesorios','Modelado y costura','38 cm de alto','Blanco, azul y plateado','Mesas y repisas'],
  ['muneco-nieve-verde','Muñeco de Nieve Verde','navidad-artesanal','muneco-nieve-verde.jpg',74,'Personaje suave con accesorios verdes cosidos a mano.','Tela polar, guata y accesorios','Modelado y costura','38 cm de alto','Blanco, verde y dorado','Mesas y repisas'],
  ['nieve-colgante-luna','Nieve Colgante en Luna','navidad-artesanal','nieve-luna.jpg',65,'Muñeco sobre luna acolchada para puertas o paredes.','Tela, guata y cordón','Acolchado y aplicación','48 cm de alto','Blanco, azul y dorado','Puertas y dormitorios'],
  ['familia-nieve-colgante','Familia de Nieve Colgante','navidad-artesanal','familia-nieve-colgante.jpg',82,'Composición vertical familiar, ligera y lista para colgar.','Tela polar, guata y cordón','Costura y ensamblaje','65 cm de largo','Blanco, rojo, verde y azul','Puertas y recibidores'],
  ['familia-nieve-mesa','Familia de Nieve para Mesa','navidad-artesanal','familia-nieve-mesa.jpg',129,'Escena familiar sobre base firme con múltiples detalles textiles.','Tela polar, guata y base rígida','Modelado y ensamblaje','52 x 34 cm','Blanco, rojo, verde y azul','Centros de mesa'],
  ['pareja-nieves-patinadores','Pareja de Nieves Patinadores','navidad-artesanal','nieves-patinadores.jpg',110,'Pareja de patinadores con vestuario acolchado.','Tela polar, guata y aplicaciones','Modelado y vestuario','42 cm por unidad','Blanco, rojo, verde y dorado','Escenas navideñas y vitrinas'],
  ['papanoel-estrella','Papá Noel en Estrella','navidad-artesanal','papanoel-estrella.jpg',79,'Papá Noel integrado en una estrella para colgar.','Tela, guata y cordón','Acolchado y aplicación','48 x 45 cm','Rojo, crema y dorado','Puertas y paredes'],
  ['papanoel-en-trono','Papá Noel en Trono','navidad-artesanal','papanoel-trono.jpg',139,'Papá Noel sentado con traje de fantasía trabajado en telas.','Tela polar, peluche y estructura','Modelado, costura y vestuario','55 cm de alto','Rojo, blanco y dorado','Salas y vitrinas'],
  ['papanoel-sobre-reno','Papá Noel sobre Reno','navidad-artesanal','papanoel-reno.jpg',125,'Escena textil de Papá Noel y reno para destacar la decoración.','Tela polar, guata y estructura','Modelado y ensamblaje','50 x 38 cm','Rojo, marrón y dorado','Consolas y vitrinas'],
  ['porta-reloj-reno','Reno Porta Reloj','navidad-artesanal','porta-reloj-reno.jpg',58,'Reno textil para exhibir un reloj o pequeño obsequio.','Tela polar, guata y aplicaciones','Costura y ensamblaje','32 cm de alto','Marrón, rojo y verde','Intercambios y regalos'],
  ['tapete-arbol-navidad','Tapete Árbol de Navidad','navidad-artesanal','tapete-arbol.jpg',149,'Tapete acolchado para la base del árbol con aplicaciones cosidas.','Tela resistente, guata y aplicaciones','Acolchado y costura','110 cm de diámetro','Rojo, verde y dorado','Base del árbol y sala'],
];

export const PRODUCTOS_DEMO = ESPECIFICACIONES.map(([slug,nombre,categoriaSlug,imagen,precio,descripcion,material,tecnica,dimensiones,colores,idealPara], index) => ({
  id: `demo-${String(index + 1).padStart(3, '0')}`, slug, nombre, categoriaSlug, categoria: CATS[categoriaSlug].nombre,
  descripcion, precio, tiempoElaboracion: categoriaSlug === 'navidad-artesanal' ? '5 a 8 días hábiles' : '3 a 5 días hábiles',
  disponibilidad: 'Bajo pedido', codigo: `LL-${CATS[categoriaSlug].siglas}-${String(index + 1).padStart(3, '0')}`,
  imagenes: [`${IMG}${imagen}`], caracteristicas: { material, tecnica, dimensiones, peso: 'Peso ligero; varía según personalización', colores, idealPara, cuidados: 'Limpiar a mano con paño húmedo y secar a la sombra.' },
}));

export const HERO_DEMO = '/images/brand/hero-artesania.png';
export const COLLAGE_DEMO = [
  { src: '/images/brand/proceso-peluche.png', alt: 'Manos cosiendo un peluche artesanal', size: 'img-large' },
  { src: '/images/catalogo/ramo-varon.jpg', alt: 'Ramo de cinta terminado', size: 'img-small' },
  { src: '/images/brand/proceso-chenille.png', alt: 'Manos modelando flores de chenille', size: 'img-medium' },
  { src: '/images/brand/proceso-empaque.png', alt: 'Empaque final de un regalo artesanal', size: 'img-medium' },
  { src: '/images/catalogo/familia-nieve-mesa.jpg', alt: 'Decoración textil terminada', size: 'img-small' },
];
