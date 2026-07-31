import React from 'react';
import './WhatsAppButton.css'; // O pon los estilos en styles.css

const WhatsAppButton = () => {
  return (
    <a 
      href="https://wa.me/51999999999" /* Reemplaza con tu número real */
      className="whatsapp-float" 
      target="_blank" 
      rel="noopener noreferrer"
      aria-label="Contactar por WhatsApp"
    >
      <span style={{ fontSize: '24px' }}>💬</span>
    </a>
  );
};

export default WhatsAppButton;