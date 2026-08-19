import React from 'react';
import { Helmet } from 'react-helmet';
import Hero from '@/components/home/Hero';
import CategoriasDestacadas from '@/components/home/CategoriasDestacadas';
import HechoConAmor from '@/components/home/HechoConAmor';
import Testimonios from '@/components/home/Testimonios';
import BannerPersonalizado from '@/components/home/BannerPersonalizado';
import ContactForm from '@/components/ContactForm';
import useCatalogo from '@/hooks/useCatalogo';

export default function Home() {
  const { categorias, cargando } = useCatalogo();

  return (
    <>
      <Helmet>
        <title>Lira & Lino | Regalos eternos hechos a mano en Perú</title>
        <meta
          name="description"
          content="Taller artesanal peruano de flores de cinta, detalles en chenille y tejidos a crochet. Regalos hechos a mano que no se marchitan."
        />
      </Helmet>

      <Hero />
      <CategoriasDestacadas categorias={categorias} cargando={cargando} />
      <HechoConAmor />
      <Testimonios />
      <BannerPersonalizado />
      <ContactForm />
    </>
  );
}
