import React from 'react';
import url_hero_image from './assets/banner/banner.jpg'
import url_limpiapipas from './assets/categories/limpiapipas.jpg'
import url_arreglo_floral from './assets/categories/arreglo_floral.jpg'
import url_regalo_a_medida from './assets/categories/regalo_a_medida.jpg'


const Home = () => {
  const categories = [
    { title: "Artesanal de Limpiapipas", img: url_limpiapipas },
    { title: "Regalos a Medida", img: url_regalo_a_medida },
    { title: "Arreglos Florales", img: url_arreglo_floral }
  ];

  return (
    <main>
      {/* Hero Banner */}
      <section className="hero-section">
        <img src={url_hero_image} alt="Regalos hechos a mano" className="hero-image" />
        <div className="hero-overlay-btn">
          <button className="btn-primary" style={{ padding: '15px 40px', fontSize: '16px' }}>
            Ver catálogo
          </button>
        </div>
      </section>

      {/* Categorías con diseño curvo */}
      <section className="categories-container">
        {categories.map((cat, index) => (
          <div className="category-card" key={index}>
            <div className="curved-img-wrapper">
              <img src={cat.img} alt={cat.title} />
            </div>
            {/* El título se ubica en el espacio generado por el clip-path */}
            <h3>{cat.title}</h3>
          </div>
        ))}
      </section>

      {/* Sección Hecho con Amor (Estilo Collage exacto a tu imagen) */}
      <section className="storytelling-section">
        <h2 className="storytelling-title">Hecho con amor</h2>
        
        <div className="craft-collage">
          {/* Columna izquierda fotos pequeñas */}
          <div className="collage-col">
            <img src="url_c1.jpg" alt="Detalle" className="collage-img img-small" />
            <img src="url_c2.jpg" alt="Detalle" className="collage-img img-small" />
          </div>
          {/* Columna media-izquierda */}
          <div className="collage-col">
            <img src="url_c3.jpg" alt="Proceso" className="collage-img img-medium" />
          </div>
          {/* Columna central principal (manos tejiendo) */}
          <div className="collage-col">
            <img src="url_c4.jpg" alt="Manos elaborando" className="collage-img img-large" />
          </div>
          {/* Columna derecha fotos */}
          <div className="collage-col">
            <img src="url_c5.jpg" alt="Detalle" className="collage-img img-small" />
            <img src="url_c6.jpg" alt="Detalle" className="collage-img img-small" />
          </div>
        </div>

        {/* Opiniones de Clientes */}
        <h3 style={{ fontFamily: 'var(--font-titulos)', fontSize: '28px', marginBottom: '30px', fontWeight: 400 }}>
          Opiniones de Clientes
        </h3>
        <div className="testimonials-container">
          <div className="testimonial-card">
            <p>“Calidad excepcional, mi hija lo ama!”</p>
            <span>- Maria G.</span>
          </div>
          <div className="testimonial-card">
            <p>“Regalo perfecto, muy recomendado”</p>
            <span>- Lucas M.</span>
          </div>
        </div>
      </section>

      {/* Banner de Pedidos Personalizados */}
      <section className="custom-order-banner">
        <h2>Pedidos Personalizados</h2>
        <button className="btn-primary" style={{ padding: '15px 35px', fontSize: '15px' }}>
          Solicitar Pedido
        </button>
      </section>

      {/* Sección de Contacto */}
      <section className="contact-section">
        <h2 style={{ fontFamily: 'var(--font-titulos)', fontSize: '36px', fontWeight: 400 }}>Contáctanos</h2>
        <p style={{ color: 'var(--color-oro)', marginTop: '8px' }}>¿Tienes una idea especial en mente? Escríbenos.</p>
        
        <form className="contact-form" onSubmit={(e) => e.preventDefault()}>
          <input type="text" placeholder="Tu nombre" className="contact-input" />
          <input type="email" placeholder="Tu correo electrónico" className="contact-input" />
          <textarea placeholder="Cuéntanos sobre tu idea o pedido personalizado..." className="contact-textarea"></textarea>
          <button type="submit" className="btn-primary" style={{ alignSelf: 'center', padding: '12px 35px' }}>
            Enviar Mensaje
          </button>
        </form>
      </section>
    </main>
  );
};

export default Home;