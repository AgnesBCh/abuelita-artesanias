import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import WhatsAppButton from '../components/common/WhatsAppButton';
import Home from '../pages/Home';
import Catalog from '../pages/Catalog';
import ProductDetailPage from '../components/product/ProductDetailPage';

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/catalogo" element={<Catalog/>} />
        <Route path="/catalogo/:categoriaSlug" element={<Catalog />} />
        <Route path="/producto/:slug" element={<ProductDetailPage/>}/>
      </Routes>
      <WhatsAppButton />
      <Footer />
    </BrowserRouter>
  );
};

export default AppRouter;