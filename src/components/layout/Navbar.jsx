import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Navbar.css'; // Asegúrate de tener los estilos abajo

const Navbar = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
    setMobileMenuOpen(false);
  };

  return (
    <header className="navbar-header">
      {/* Botón hamburguesa para móviles */}
      <button 
        className="mobile-menu-toggle" 
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        aria-label="Abrir menú"
      >
        ☰
      </button>

      {/* Enlaces Izquierda */}
      <ul className={`nav-links ${mobileMenuOpen ? 'active' : ''}`}>
        <li className="nav-item" onClick={() => handleNavigation('/catalogo')}>
          Catálogo
        </li>
        <li 
          className="nav-item has-dropdown"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <span>Personalizados</span>
          {isHovered && (
            <ul className="dropdown-menu">
              <li onClick={() => handleNavigation('/catalogo/limpiapipas')}>Muñecos a medida</li>
              <li onClick={() => handleNavigation('/catalogo/flores')}>Regalos corporativos</li>
              <li onClick={() => handleNavigation('/catalogo/virgenes')}>Centros de mesa</li>
            </ul>
          )}
        </li>
      </ul>

      {/* Logo Central (Regresa al Home) */}
      <div className="logo" onClick={() => handleNavigation('/')}>
        Lira & Lino
      </div>

      {/* Enlaces Derecha */}
      <ul className={`nav-links ${mobileMenuOpen ? 'active' : ''}`}>
        {/* Nota: Eventos se puede enfocar a una sección especial o catálogo general */}
        <li className="nav-item" onClick={() => handleNavigation('/catalogo')}>
          Eventos
        </li>
        <li>
          <button className="btn-primary" onClick={() => handleNavigation('/catalogo')}>
            Ver catálogo
          </button>
        </li>
      </ul>
    </header>
  );
};

export default Navbar;