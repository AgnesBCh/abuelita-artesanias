import React from 'react';
import { useNavigate } from 'react-router-dom';
import ImageCarousel from '../ui/ImageCarousel';
import './CategoryCard.css';

const CategoryCard = ({ categoria }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/catalogo/${categoria.slug}`);
  };

  return (
    <div className="category-card" onClick={handleClick}>
      <div className="category-carousel-wrapper">
        <ImageCarousel images={categoria.imagenes} />
      </div>
      <div className="category-info">
        <h3>{categoria.nombre}</h3>
        <p>{categoria.descripcion}</p>
      </div>
    </div>
  );
};

export default React.memo(CategoryCard);