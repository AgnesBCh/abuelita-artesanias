import React, { useState } from 'react';
import Header from './Header';
import Home from './Home';
import Catalog from './Catalog';
import './styles.css';

const App = () => {
  const [currentView, setCurrentView] = useState('home');

  return (
    <div className="app-container">
      <Header setView={setCurrentView} />
      
      {currentView === 'home' ? <Home /> : <Catalog />}

      <footer>
        <div>Lira & Lino © 2026 | Hecho a Mano</div>
        <div>Contacto | Instagram | Facebook</div>
        <div>Políticas | Términos</div>
      </footer>
    </div>
  );
};

export default App;