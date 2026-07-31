import React from 'react';
import { useNavigate } from 'react-router-dom';
import url_hero_image from '../assets/images/banner.jpg';
import { categories } from '../data/categories';
import ImageCarousel from '../components/ui/ImageCarousel';
import Testimonials from '../components/testimonials/Testimonials';
import ContactForm from '../components/contactForm/ContactForm';
const Home = () => {
  const navigate = useNavigate();

  return (
    <main>
      {/* Hero Banner */}
      <section className="hero-section">
        <img src={url_hero_image} alt="Regalos hechos a mano" className="hero-image" />
        <div className="hero-overlay-btn">
          <button 
            className="btn-primary" 
            style={{ padding: '15px 40px', fontSize: '16px' }}
            onClick={() => navigate('/catalogo')}
          >
            Ver catálogo
          </button>
        </div>
      </section>

      {/* Categorías con carrusel automático y diseño curvo */}
      <section className="categories-container">
        {categories.map((cat) => (
          <div 
            className="category-card" 
            key={cat.id} 
            onClick={() => navigate(`/catalogo/${cat.slug}`)}
            style={{ cursor: 'pointer' }}
          >
            <div className="curved-img-wrapper">
              {/* Carrusel reutilizable con pausa en hover */}
              <ImageCarousel images={cat.imagenes} />
            </div>
            {/* El título se ubica en el espacio generado por el clip-path */}
            <h3>{cat.nombre}</h3>
          </div>
        ))}
      </section>

      {/* Sección Hecho con Amor (Estilo Collage exacto a tu imagen) */}
      <section className="storytelling-section">
        <h2 className="storytelling-title">Hecho con amor</h2>
        
        <div className="craft-collage">
          {/* Columna izquierda fotos pequeñas */}
          <div className="collage-col">
            <img src="/assets/images/c1.jpg" alt="Detalle" className="collage-img img-small" loading="lazy" />
            <img src="/assets/images/c2.jpg" alt="Detalle" className="collage-img img-small" loading="lazy" />
          </div>
          {/* Columna media-izquierda */}
          <div className="collage-col">
            <img src="/assets/images/c3.jpg" alt="Proceso" className="collage-img img-medium" loading="lazy" />
          </div>
          {/* Columna central principal (manos tejiendo) */}
          <div className="collage-col">
            <img src="/assets/images/c4.jpg" alt="Manos elaborando" className="collage-img img-large" loading="lazy" />
          </div>
          {/* Columna derecha fotos */}
          <div className="collage-col">
            <img src="/assets/images/c5.jpg" alt="Detalle" className="collage-img img-small" loading="lazy" />
            <img src="/assets/images/c6.jpg" alt="Detalle" className="collage-img img-small" loading="lazy" />
          </div>
        </div>
      </section>

      {/* Opiniones de Clientes */}

        <Testimonials/>

      {/* Banner de Pedidos Personalizados */}
      <section className="custom-order-banner">
        <h2>Pedidos Personalizados</h2>
        <button className="btn-primary" style={{ padding: '15px 35px', fontSize: '15px' }}>
          Solicitar Pedido
        </button>
      </section>
      <ContactForm/>
    </main>
  );
};

export default Home;