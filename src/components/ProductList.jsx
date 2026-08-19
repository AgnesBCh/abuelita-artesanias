import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { getProducts } from '@/api/EcommerceApi';
import { Skeleton } from '@/components/ui/skeleton';

const ProductsList = ({ products: externalProducts, isLoading: externalLoading }) => {
  const [internalProducts, setInternalProducts] = useState([]);
  const [internalLoading, setInternalLoading] = useState(true);

  // If products are provided externally (via props), use them. Otherwise fetch internally.
  const isControlled = externalProducts !== undefined;
  const products = isControlled ? externalProducts : internalProducts;
  const isLoading = isControlled ? externalLoading : internalLoading;

  useEffect(() => {
    if (!isControlled) {
      const fetchProducts = async () => {
        try {
          setInternalLoading(true);
          const response = await getProducts();
          setInternalProducts(response.products || []);
        } catch (error) {
          console.error('Failed to fetch products:', error);
        } finally {
          setInternalLoading(false);
        }
      };
      fetchProducts();
    }
  }, [isControlled]);

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="space-y-4">
            <Skeleton className="aspect-square w-full rounded-xl" />
            <Skeleton className="h-4 w-2/3" />
            <Skeleton className="h-4 w-1/3" />
          </div>
        ))}
      </div>
    );
  }

  if (!products || products.length === 0) {
    return (
      <div className="text-center py-24 bg-muted/30 rounded-2xl border border-border border-dashed">
        <h3 className="text-xl font-semibold text-foreground mb-2">No products found</h3>
        <p className="text-muted-foreground">Try adjusting your filters to find what you're looking for.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map((product, index) => (
        <motion.div
          key={product.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: Math.min(index * 0.05, 0.5) }}
        >
          <Link to={`/product/${product.id}`} className="group block h-full">
            <div className="bg-card rounded-xl overflow-hidden card-hover border border-border h-full flex flex-col">
              <div className="relative aspect-square overflow-hidden bg-muted">
                <img
                  src={product.image || "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjMzc0MTUxIi8+CiAgPHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxOCIgZmlsbD0iIzlDQTNBRiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPk5vIEltYWdlPC90ZXh0Pgo8L3N2Zz4K"}
                  alt={product.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                {product.ribbon_text && (
                  <div className="absolute top-3 left-3 bg-primary text-primary-foreground text-xs font-bold px-2.5 py-1 rounded-full">
                    {product.ribbon_text}
                  </div>
                )}
              </div>
              <div className="p-4 flex flex-col flex-grow">
                <h3 className="font-medium text-foreground mb-1 line-clamp-2 group-hover:text-primary transition-colors">
                  {product.title}
                </h3>
                <div className="mt-auto pt-2 flex items-center justify-between">
                  <p className="text-primary font-semibold">
                    {product.variants?.[0]?.sale_price_formatted || product.variants?.[0]?.price_formatted || `$${(product.price_in_cents / 100).toFixed(2)}`}
                  </p>
                  {product.variants?.[0]?.sale_price_formatted && (
                    <p className="text-sm text-muted-foreground line-through">
                      {product.variants[0].price_formatted}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </Link>
        </motion.div>
      ))}
    </div>
  );
};

export default ProductsList;