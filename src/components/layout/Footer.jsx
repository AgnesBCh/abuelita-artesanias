import React from 'react';
// import './Footer.css'; // O pon tus estilos directamente en styles.css

const Footer = () => {
  return (
    <footer className="footer-section">
        <div>Lira & Lino &copy; {new Date().getFullYear()} Todos los derechos reservados.</div>
        <div>Contacto | Instagram | Facebook</div>
        <div>Políticas | Términos</div>
    </footer>
  );
};

export default Footer;