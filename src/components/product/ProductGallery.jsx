import React, { useState } from 'react';
import './ProductGallery.css';

const ProductGallery = ({ imagenes = [], onImageClick }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  if (!imagenes.length) return null;

  return (
    <div className="product-gallery">
      {/* Imagen Principal con Zoom / Click para Lightbox */}
      <div 
        className="main-image-container" 
        onClick={() => onImageClick(selectedIndex)}
      >
        <img 
          src={imagenes[selectedIndex]} 
          alt="Vista principal del producto" 
          className="main-image fade-in"
          loading="eager"
        />
        <span className="zoom-hint">🔍 Click para ampliar</span>
      </div>

      {/* Miniaturas */}
      <div className="thumbnails-grid">
        {imagenes.map((img, index) => (
          <button
            key={index}
            className={`thumbnail-btn ${index === selectedIndex ? 'active' : ''}`}
            onClick={() => setSelectedIndex(index)}
          >
            <img src={img} alt={`Miniatura ${index + 1}`} loading="lazy" />
          </button>
        ))}
      </div>
    </div>
  );
};

export default React.memo(ProductGallery);