// src/data/categories.js
import limp1 from '../assets/images/limpiapipas.jpg';
import limp2 from '../assets/images/limpiapipas.jpg';
import flores1 from '../assets/images/flores.jpg';
import flores2 from '../assets/images/flores.jpg';
import regalo_a_medida1 from '../assets/images/regalo_a_medida.jpg'
import regalo_a_medida2 from '../assets/images/regalo_a_medida.jpg'


export const categories = [
  {
    id: 1,
    nombre: "Artesanal de Limpiapipas",
    slug: "limpiapipas",
    descripcion: "Figuras y detalles elaborados con alambre de chenille de alta calidad.",
    imagenPortada: limp1,
    imagenes: [limp1, limp2]
  },
  {
    id: 2,
    nombre: "Flores de Cinta",
    slug: "flores",
    descripcion: "Ramos eternos elaborados a mano con cinta al agua.",
    imagenPortada: flores1,
    imagenes: [flores1, flores2]
  },
  {
    id: 3,
    nombre: "Regalos a medida",
    slug: "regalos_a_medida",
    descripcion: "Imágenes devocionales personalizadas con detalles finos.",
    imagenPortada: regalo_a_medida1,
    imagenes: [regalo_a_medida1, regalo_a_medida2]
  }
];