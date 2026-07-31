import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { products } from '../../data/products';
import ProductGallery from '../../components/product/ProductGallery';
import ProductInfo from '../../components/product/ProductInfo';
import ProductActions from '../../components/product/ProductActions';
import ProductSpecs from '../../components/product/ProductSpecs';
import ProductShare from '../../components/product/ProductShare';
import './ProductDetailPage.css';

const ProductDetailPage = () => {
  const { slug } = useParams();
  const product = products.find((p) => p.slug === slug);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  if (!product) {
    return <div className="not-found">Producto no encontrado.</div>;
  }

  const handleOpenLightbox = (index) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  return (
    <main className="product-detail-page">
      <div className="product-grid-container">
        {/* Columna de Galería */}
        <ProductGallery 
          imagenes={product.imagenes} 
          onImageClick={handleOpenLightbox} 
        />

        {/* Columna de Información y Acciones */}
        <div className="product-details-column">
          <ProductInfo product={product} />
          <ProductActions product={product} />
          <ProductShare product={product} />
        </div>
      </div>

      {/* Ficha Técnica Detallada */}
      <ProductSpecs caracteristicas={product.caracteristicas} />

      {/* Lightbox Modal simple */}
      {lightboxOpen && (
        <div className="lightbox-modal" onClick={() => setLightboxOpen(false)}>
          <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-lightbox" onClick={() => setLightboxOpen(false)}>×</button>
            <img src={product.imagenes[lightboxIndex]} alt="Ampliada" />
          </div>
        </div>
      )}
    </main>
  );
};

export default ProductDetailPage;