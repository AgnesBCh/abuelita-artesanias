import React from 'react';
import './ProductSpecs.css';

const ProductSpecs = ({ caracteristicas }) => {
  if (!caracteristicas) return null;

  return (
    <div className="product-specs-section">
      <h3>Ficha Técnica</h3>
      <ul className="specs-list">
        {Object.entries(caracteristicas).map(([key, value]) => (
          <li key={key}>
            <span className="spec-key">{key.charAt(0).toUpperCase() + key.slice(1)}:</span>
            <span className="spec-value">
              {Array.isArray(value) ? value.join(', ') : value}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default React.memo(ProductSpecs);