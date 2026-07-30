import React from 'react';

const Catalog = () => {
  const products = [
    { id: 1, name: "Flores de Cinta", price: "S/ 75.00", img: "url_flores.jpg" },
    { id: 2, name: "Muñeco de Chenilla", price: "S/ 80.00", img: "url_oso.jpg" },
    { id: 3, name: "Decoración Eventos", price: "S/ 160.00", img: "url_evento.jpg" },
    { id: 4, name: "Figuras Religiosas", price: "S/ 180.00", img: "url_virgen.jpg" },
    { id: 5, name: "Muñecos Gigantes", price: "S/ 299.00", img: "url_santa.jpg" },
    { id: 6, name: "Regalos a Medida", price: "S/ 120.00", img: "url_caja.jpg" },
    { id: 7, name: "Arte Floral", price: "S/ 140.00", img: "url_ramo.jpg" },
    { id: 8, name: "Personajes", price: "S/ 169.00", img: "url_blancanieves.jpg" }
  ];

  return (
    <section>
      <div className="catalog-header">
        <h1>NUESTRO CATÁLOGO DE ARTE MANUAL</h1>
        <p>Piezas únicas creadas con tiempo, paciencia y amor.</p>
      </div>

      <div className="filters">
        <button className="filter-btn">Categoría ⌄</button>
        <button className="filter-btn">Precio ⌄</button>
      </div>

      <div className="catalog-grid">
        {products.map((prod) => (
          <div className="product-card" key={prod.id}>
            <img src={prod.img} alt={prod.name} />
            <h4>{prod.name}</h4>
            <p>{prod.price}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Catalog;