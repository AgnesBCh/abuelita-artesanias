import React, { useState, useEffect, useRef } from 'react';
import './ImageCarousel.css';

const ImageCarousel = ({ images = [], intervalTime = 3000 }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const isHoveredRef = useRef(false);

  useEffect(() => {
    if (!images || images.length <= 1) return;

    const interval = setInterval(() => {
      if (!isHoveredRef.current) {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
      }
    }, intervalTime);

    return () => clearInterval(interval);
  }, [images, intervalTime]);

  const handleMouseEnter = () => {
    isHoveredRef.current = true;
  };

  const handleMouseLeave = () => {
    isHoveredRef.current = false;
  };

  if (!images || images.length === 0) return null;

  return (
    <div 
      className="image-carousel-container"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div 
        className="carousel-track" 
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {images.map((imgSrc, index) => (
          <div className="carousel-slide" key={index}>
            <img 
              src={imgSrc} 
              alt={`Slide ${index + 1}`} 
              loading="lazy" 
              decoding="async"
            />
          </div>
        ))}
      </div>
      
      {/* Indicadores sutiles */}
      <div className="carousel-indicators">
        {images.map((_, idx) => (
          <span 
            key={idx} 
            className={`indicator-dot ${idx === currentIndex ? 'active' : ''}`}
          />
        ))}
      </div>
    </div>
  );
};

ImageCarousel.defaultProps = {
  images: []
};

export default React.memo(ImageCarousel);