import React from 'react';
// import './ProductActions.css';

const ProductActions = ({ product }) => {
  const handleWhatsAppOrder = () => {
    const phoneNumber = "51999999999"; // Reemplaza con tu número real
    const message = `Hola, me interesa este producto: *${product.nombre}* (Ref: ${product.codigo}). ¿Podríamos coordinar un pedido?`;
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="product-actions">
      <button className="btn-whatsapp-order" onClick={handleWhatsAppOrder}>
        💬 Solicitar por WhatsApp
      </button>
    </div>
  );
};

export default React.memo(ProductActions);