import React, { useState } from 'react';

const Header = ({ setView }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <header>
      <ul className="nav-links">
        <li className="nav-item" onClick={() => setView('catalog')}>Catálogo</li>
        <li 
          className="nav-item"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          Personalizados
          {isHovered && (
            <ul className="dropdown-menu">
              <li>Muñecos a medida</li>
              <li>Regalos corporativos</li>
              <li>Centros de mesa</li>
            </ul>
          )}
        </li>
      </ul>

      <div className="logo" onClick={() => setView('home')} style={{cursor: 'pointer'}}>
        Lira & Lino
      </div>

      <ul className="nav-links">
        <li className="nav-item">Eventos</li>
        <li>
          <button className="btn-primary" onClick={() => setView('catalog')}>
            Ver catálogo
          </button>
        </li>
      </ul>
    </header>
  );
};

export default Header;