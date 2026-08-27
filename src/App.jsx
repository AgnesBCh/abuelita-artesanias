import React from 'react';
import { Route, Routes, BrowserRouter as Router, Link } from 'react-router-dom';
import ScrollToTop from '@/components/ScrollToTop.jsx';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';
import { AppProvider } from '@/context/AppContext.jsx';
import { AuthProvider } from '@/contexts/AuthContext.jsx';
import ProtectedRoute from '@/components/ProtectedRoute.jsx';
import Home from '@/pages/Home.jsx';
import Catalogo from '@/pages/Catalogo.jsx';
import ProductoDetalle from '@/pages/ProductoDetalle.jsx';
import Admin from '@/pages/Admin.jsx';
import Login from '@/pages/Login.jsx';
import AsistenteIA from '@/components/AsistenteIA.jsx';

function App() {
  return (
    <AuthProvider>
      <AppProvider>
        <Router>
          <ScrollToTop />
          <Header />
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/catalogo" element={<Catalogo />} />
              <Route path="/producto/:slug" element={<ProductoDetalle />} />
              <Route path="/admin/login" element={<Login />} />
              <Route
                path="/admin"
                element={
                  <ProtectedRoute redirectTo="/admin/login">
                    <Admin />
                  </ProtectedRoute>
                }
              />
              <Route
                path="*"
                element={
                  <div className="contenedor seccion text-center">
                    <h1 className="fuente-display text-5xl">404</h1>
                    <p className="mt-4 text-sm text-[rgba(44,44,44,0.65)]">Esta página no existe.</p>
                    <Link to="/" className="boton-oro mt-8">Volver al inicio</Link>
                  </div>
                }
              />
            </Routes>
          </main>
          <Footer />
          <AsistenteIA />
        </Router>
      </AppProvider>
    </AuthProvider>
  );
}

export default App;
