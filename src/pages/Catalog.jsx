import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { categories } from '../data/categories';
import { products } from '../data/products';
import './Catalog.css';

const Catalog = () => {
  const { categoriaSlug } = useParams();
  const navigate = useNavigate();
  
  const currentCategory = categoriaSlug || 'todos';
  const [priceFilter, setPriceFilter] = useState('todos');

  // 1. Filtrar por categoría
  let filtered = currentCategory === 'todos' 
    ? products 
    : products.filter(p => p.categoriaSlug === currentCategory);

  // 2. Filtrar por precio
  if (priceFilter === 'bajo') {
    filtered = filtered.filter(p => p.precio < 30);
  } else if (priceFilter === 'medio') {
    filtered = filtered.filter(p => p.precio >= 30 && p.precio <= 50);
  } else if (priceFilter === 'alto') {
    filtered = filtered.filter(p => p.precio > 50);
  }

  return (
    <div className="catalog-page">
      <header className="catalog-header">
        <h1>Catálogo de Productos</h1>
        <p>Explora nuestros detalles hechos a mano con amor</p>
      </header>

      {/* Selector de Categorías */}
      <div className="category-selector">
        <button 
          className={`filter-btn ${currentCategory === 'todos' ? 'active' : ''}`}
          onClick={() => navigate('/catalogo')}
        >
          Todos
        </button>
        {categories.map((cat) => (
          <button 
            key={cat.id}
            className={`filter-btn ${currentCategory === cat.slug ? 'active' : ''}`}
            onClick={() => navigate(`/catalogo/${cat.slug}`)}
          >
            {cat.nombre}
          </button>
        ))}
      </div>

      {/* Filtro de Precios */}
      <div className="price-filter-container">
        <span className="price-filter-label">Filtrar por precio:</span>
        <select 
          value={priceFilter} 
          onChange={(e) => setPriceFilter(e.target.value)}
          className="price-select"
        >
          <option value="todos">Cualquier precio</option>
          <option value="bajo">Menos de S/ 30.00</option>
          <option value="medio">S/ 30.00 - S/ 50.00</option>
          <option value="alto">Más de S/ 50.00</option>
        </select>
      </div>

      {/* Listado de Artículos */}
      <div className="products-grid">
        {filtered.length > 0 ? (
          filtered.map((product) => (
            <div 
              className="product-card" 
              key={product.id}
              onClick={() => navigate(`/producto/${product.slug}`)}
            >
              <div className="product-img-wrapper">
                <img src={product.imagenes[0]} alt={product.nombre} loading="lazy" />
              </div>
              <div className="product-info">
                <h3>{product.nombre}</h3>
                <p className="product-desc">{product.descripcion}</p>
                <div className="product-footer">
                  <span className="product-price">S/ {product.precio.toFixed(2)}</span>
                  <button className="btn-primary" style={{ padding: '8px 16px', fontSize: '13px' }}>
                    Ver Detalle
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="no-products">No hay productos disponibles con estos filtros.</p>
        )}
      </div>
    </div>
  );
};

export default Catalog;