import React, { useState } from 'react';
import './ContactForm.css';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    telefono: '',
    correo: '',
    asunto: '',
    mensaje: ''
  });

  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validar campos obligatorios
    if (!formData.nombre || !formData.telefono || !formData.correo || !formData.asunto || !formData.mensaje) {
      setError('Por favor, completa todos los campos obligatorios.');
      return;
    }

    setError('');

    // Construcción del mensaje para WhatsApp
    const phoneNumber = "51999999999"; // Reemplaza con tu número corporativo real
    const text = `Hola, soy ${formData.nombre}.\nTeléfono: ${formData.telefono}\nCorreo: ${formData.correo}\nAsunto: ${formData.asunto}\nMensaje: ${formData.mensaje}`;
    
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(text)}`;
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <section className="contact-section">
      <div className="contact-container">
        <div className="contact-intro">
          <span className="section-subtitle">Hablemos</span>
          <h2>Diseñemos algo especial juntos</h2>
          <p>¿Tienes una idea en mente, un evento corporativo o un regalo personalizado? Escríbenos y te atenderemos de inmediato por WhatsApp.</p>
        </div>

        <form className="contact-form" onSubmit={handleSubmit}>
          {error && <div className="form-error-banner">{error}</div>}

          <div className="form-row">
            <div className="form-group">
              <label>Nombre y Apellido *</label>
              <input 
                type="text" 
                name="nombre" 
                value={formData.nombre} 
                onChange={handleChange} 
                placeholder="Ej. Ana Pérez" 
              />
            </div>
            <div className="form-group">
              <label>Teléfono / Celular *</label>
              <input 
                type="tel" 
                name="telefono" 
                value={formData.telefono} 
                onChange={handleChange} 
                placeholder="Ej. 999999999" 
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Correo Electrónico *</label>
              <input 
                type="email" 
                name="correo" 
                value={formData.correo} 
                onChange={handleChange} 
                placeholder="ana@email.com" 
              />
            </div>
            <div className="form-group">
              <label>Asunto *</label>
              <input 
                type="text" 
                name="asunto" 
                value={formData.asunto} 
                onChange={handleChange} 
                placeholder="Ej. Pedido personalizado" 
              />
            </div>
          </div>

          <div className="form-group">
            <label>Mensaje / Detalles de tu solicitud *</label>
            <textarea 
              name="mensaje" 
              rows="4" 
              value={formData.mensaje} 
              onChange={handleChange} 
              placeholder="Quisiera cotizar un ramo de flores y..."
            ></textarea>
          </div>

          <button type="submit" className="btn-whatsapp-submit">
            Enviar a WhatsApp 💬
          </button>
        </form>
      </div>
    </section>
  );
};

export default ContactForm;