import React from 'react';
import './ProductInfo.css';

const ProductInfo = ({ product }) => {
  return (
    <div className="product-info-details">
      <span className="product-category-badge">{product.categoria}</span>
      <h1 className="product-title">{product.nombre}</h1>
      
      <div className="product-pricing-row">
        {product.precio && (
          <span className="product-price">S/ {product.precio.toFixed(2)}</span>
        )}
        <span className="product-code">Ref: {product.codigo}</span>
      </div>

      <p className="product-description">{product.descripcion}</p>

      <div className="product-meta-details">
        <p><strong>Disponibilidad:</strong> {product.disponibilidad}</p>
        <p><strong>Tiempo de elaboración:</strong> {product.tiempoElaboracion}</p>
      </div>
    </div>
  );
};

export default React.memo(ProductInfo);