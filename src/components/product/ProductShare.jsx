import React, { useState } from 'react';
import './ProductShare.css';

const ProductShare = ({ product }) => {
  const [copied, setCopied] = useState(false);
  const currentUrl = window.location.href;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(currentUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const shareFacebook = () => {
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`, '_blank');
  };

  return (
    <div className="product-share">
      <span>Compartir producto:</span>
      <div className="share-buttons">
        <button onClick={shareFacebook} className="share-btn fb">Facebook</button>
        <button onClick={handleCopyLink} className="share-btn copy">
          {copied ? '¡Enlace copiado!' : 'Copiar enlace'}
        </button>
      </div>
    </div>
  );
};

export default React.memo(ProductShare);