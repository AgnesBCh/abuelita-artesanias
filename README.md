# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.


src/
│
├── assets/                 # Recursos estáticos globales (fuentes, iconos SVG, imágenes base)
│   ├── images/
│   ├── icons/
│   └── fonts/
│
├── components/             # Componentes organizados por nivel de atomicidad y dominio
│   ├── common/             # Elementos globales independientes (Botones, Badges, WhatsAppButton)
│   ├── layout/             # Estructuras de página (Navbar, Footer, Layout principal)
│   ├── home/               # Componentes exclusivos de la página de inicio (Hero, Storytelling)
│   ├── catalog/            # Componentes de la vista de catálogo (Filtros, Grid de productos)
│   ├── product/            # Tarjetas específicas (ProductCard, CategoryCard con carrusel integrado)
│   └── ui/                 # Primitivas visuales genéricas (Carousel reutilizable, Modales)
│
├── pages/                  # Vistas o pantallas principales conectadas al enrutador (Home, Catalog, ProductDetail)
│
├── hooks/                  # Custom Hooks reutilizables (ej. useInterval, useCarouselHover)
│
├── services/               # Capa de servicios o adaptadores de datos (si en el futuro se conecta a una API o CMS)
│
├── data/                   # Mock data centralizada y tipada (categories.js, products.js, testimonials.js)
│
├── utils/                  # Funciones utilitarias puras (formateo de precios, manejo de slugs)
│
├── styles/                 # Estilos globales, variables CSS, mixins o configuraciones de Tailwind
│
├── constants/              # Constantes de la aplicación (rutas, endpoints, configuración general)
│
├── routes/                 # Configuración de React Router (AppRouter.jsx)
│
├── context/                # Context API para estado global si es necesario (ej. Carrito de compras)
│
└── App.jsx                 # Punto de entrada raíz que inicializa proveedores y rutas