import React from 'react';
import './Testimonials.css';

const testimonialsData = [
  {
    id: 1,
    cliente: "Sofía M.",
    ciudad: "Piura",
    fecha: "Hace 2 semanas",
    estrellas: 5,
    resena: "El ramo de tulipanes superó totalmente mis expectativas. Los detalles a mano son impecables y llegó justo para nuestro aniversario.",
    producto: "Ramo de Tulipanes de Limpiapipas",
    fotoCliente: "/assets/images/cliente-1.jpg"
  },
  {
    id: 2,
    cliente: "Valeria G.",
    ciudad: "Lima",
    fecha: "Hace 1 mes",
    estrellas: 5,
    resena: "Pedí un cactus personalizado para la oficina y todos me preguntan dónde lo compré. La atención y el empaque hermoso.",
    producto: "Cactus tierno en maceta",
    fotoCliente: "/assets/images/cliente-2.jpg"
  },
  {
    id: 3,
    cliente: "Lucía R.",
    ciudad: "Trujillo",
    fecha: "Hace 3 semanas",
    estrellas: 5,
    resena: "La virgen personalizada tiene unos acabados súper delicados. Se nota el amor y dedicación en cada hilo y detalle.",
    producto: "Imagen de Virgen Personalizada",
    fotoCliente: "/assets/images/cliente-3.jpg"
  }
];

const Testimonials = () => {
  return (
    <section className="testimonials-section">
      <div className="testimonials-header">
        <span className="section-subtitle">Comunidad Lira & Lino</span>
        <h2>Momentos reales, clientes felices</h2>
        <p>Historias de quienes ya confían en nuestros detalles artesanales.</p>
      </div>

      <div className="testimonials-grid">
        {testimonialsData.map((item) => (
          <div className="testimonial-card" key={item.id}>
            <div className="testimonial-image-wrapper">
              <img src={item.fotoCliente} alt={`Cliente ${item.cliente}`} loading="lazy" />
              <span className="product-tag">{item.producto}</span>
            </div>
            <div className="testimonial-content">
              <div className="testimonial-meta">
                <div className="stars">{"★".repeat(item.estrellas)}</div>
                <span className="date">{item.fecha}</span>
              </div>
              <p className="testimonial-review">"{item.resena}"</p>
              <div className="client-info">
                <strong>{item.cliente}</strong>
                {item.ciudad && <span className="city"> • {item.ciudad}</span>}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;