// src/data/products.js
import limp1 from '../assets/images/limpiapipas.jpg';
import limp2 from '../assets/images/limpiapipas.jpg';
import flores1 from '../assets/images/flores.jpg';
import flores2 from '../assets/images/flores.jpg';
import regalo_a_medida1 from '../assets/images/regalo_a_medida.jpg'
import regalo_a_medida2 from '../assets/images/regalo_a_medida.jpg'

export const products = [
  {
    id: 1,
    slug: "ramo-tulipanes-limpiapipas",
    nombre: "Ramo de Tulipanes de Limpiapipas",
    categoriaSlug: "limpiapipas",
    categoria: "Artesanal de Limpiapipas",
    descripcion: "Hermoso ramo eterno elaborado enteramente a mano con alambre de chenille de alta calidad. Ideal para sorpresas inolvidables que perduran en el tiempo sin marchitarse.",
    precio: 25.00,
    tiempoElaboracion: "2 días hábiles",
    disponibilidad: "Disponible bajo pedido",
    codigo: "LYL-LIMP-001",
    imagenes: [limp1, limp2],
    caracteristicas: {
      material: "Alambre de chenille premium y tallos florales revestidos",
      tecnica: "Modelado y tejido manual artesanal",
      altura: "35 cm",
      ancho: "25 cm",
      profundidad: "20 cm",
      peso: "300 g",
      colores: ["Rosa pastel", "Blanco", "Amarillo", "Verde tierno"],
      personalizable: "Sí (elección de colores y cantidad de flores)",
      uso_recomendado: "Decoración de interiores y regalos especiales",
      idealPara: "Aniversarios, cumpleaños y detalles románticos",
      cuidados: "Evitar exposición prolongada al sol directo y limpiar con plumero suave."
    }
  },
  {
    id: 2,
    slug: "cactus",
    nombre: "Tierno cactus",
    categoriaSlug: "limpiapipas",
    categoria: "Artesanal de Limpiapipas",
    descripcion: "Hermoso ramo eterno elaborado enteramente a mano con alambre de chenille de alta calidad. Ideal para sorpresas inolvidables que perduran en el tiempo sin marchitarse.",
    precio: 25.00,
    tiempoElaboracion: "2 días hábiles",
    disponibilidad: "Disponible bajo pedido",
    codigo: "LYL-LIMP-002",
    imagenes: [limp1, limp2],
    caracteristicas: {
      material: "Alambre de chenille premium y tallos florales revestidos",
      tecnica: "Modelado y tejido manual artesanal",
      altura: "35 cm",
      ancho: "25 cm",
      profundidad: "20 cm",
      peso: "300 g",
      colores: ["Rosa pastel", "Blanco", "Amarillo", "Verde tierno"],
      personalizable: "Sí (elección de colores y cantidad de flores)",
      uso_recomendado: "Decoración de interiores y regalos especiales",
      idealPara: "Aniversarios, cumpleaños y detalles románticos",
      cuidados: "Evitar exposición prolongada al sol directo y limpiar con plumero suave."
    }
  },
   {
    id: 3,
    slug: "ramo de_flores_cinta",
    nombre: "Ramo de Flores en cinta",
    categoriaSlug: "flores",
    categoria: "Flores de Cinta",
    descripcion: "Hermoso ramo eterno elaborado enteramente a mano con alambre de chenille de alta calidad. Ideal para sorpresas inolvidables que perduran en el tiempo sin marchitarse.",
    precio: 25.00,
    tiempoElaboracion: "2 días hábiles",
    disponibilidad: "Disponible bajo pedido",
    codigo: "RM-FLOR-001",
    imagenes: [flores1, flores2],
    caracteristicas: {
      material: "Alambre de chenille premium y tallos florales revestidos",
      tecnica: "Modelado y tejido manual artesanal",
      altura: "35 cm",
      ancho: "25 cm",
      profundidad: "20 cm",
      peso: "300 g",
      colores: ["Rosa pastel", "Blanco", "Amarillo", "Verde tierno"],
      personalizable: "Sí (elección de colores y cantidad de flores)",
      uso_recomendado: "Decoración de interiores y regalos especiales",
      idealPara: "Aniversarios, cumpleaños y detalles románticos",
      cuidados: "Evitar exposición prolongada al sol directo y limpiar con plumero suave."
    }
  },
   {
    id: 4,
    slug: "cojines_navidenos",
    nombre: "Cojines Navideños",
    categoriaSlug: "regalos_a_medida",
    categoria: "Regalos a medida",
    descripcion: "Hermoso ramo eterno elaborado enteramente a mano con alambre de chenille de alta calidad. Ideal para sorpresas inolvidables que perduran en el tiempo sin marchitarse.",
    precio: 25.00,
    tiempoElaboracion: "2 días hábiles",
    disponibilidad: "Disponible bajo pedido",
    codigo: "CN-RAM-001",
    imagenes: [regalo_a_medida1, regalo_a_medida2],
    caracteristicas: {
      material: "Alambre de chenille premium y tallos florales revestidos",
      tecnica: "Modelado y tejido manual artesanal",
      altura: "35 cm",
      ancho: "25 cm",
      profundidad: "20 cm",
      peso: "300 g",
      colores: ["Rosa pastel", "Blanco", "Amarillo", "Verde tierno"],
      personalizable: "Sí (elección de colores y cantidad de flores)",
      uso_recomendado: "Decoración de interiores y regalos especiales",
      idealPara: "Aniversarios, cumpleaños y detalles románticos",
      cuidados: "Evitar exposición prolongada al sol directo y limpiar con plumero suave."
    }
  }
];