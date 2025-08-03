"use client";

import type React from "react";
import { useState } from "react";
import { Heart, XCircle } from "lucide-react";
import DashboardCard from "../../../../atoms/DashboardCard/DashboardCard";
import { Button } from "../../../../atoms/Button/Button";
import type { Product } from "../../../../../types/product";
import { DUMMY_PRODUCTS } from "../../../../../lib/auth";
import styles from "./ClientFavorites.module.scss";

const ClientFavorites: React.FC = () => {
  // Filter some dummy products to act as favorites
  const [favoriteProducts, setFavoriteProducts] = useState<Product[]>(
    DUMMY_PRODUCTS.filter((_, index) => index % 2 === 0).slice(0, 6) // Example: every other product, up to 6
  );

  const handleRemoveFavorite = (productId: string) => {
    setFavoriteProducts(
      favoriteProducts.filter((product) => product.id !== productId)
    );
    console.log("Producto eliminado de favoritos:", productId);
  };

  return (
    <div className={styles.clientFavorites}>
      <h1 className={styles.pageTitle}>Mis Favoritos</h1>
      <p className={styles.pageSubtitle}>
        Aquí puedes ver los productos que has guardado para más tarde.
      </p>

      <DashboardCard className={styles.favoritesOverviewCard}>
        {favoriteProducts.length > 0 ? (
          <div className={styles.favoriteProductsGrid}>
            {favoriteProducts.map((product) => (
              <div key={product.id} className={styles.favoriteProductCard}>
                <img
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  className={styles.productImage}
                />
                <div className={styles.productInfo}>
                  <h3 className={styles.productName}>{product.name}</h3>
                  <p className={styles.productPrice}>
                    ${product.price.toFixed(2)}
                  </p>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleRemoveFavorite(product.id)}
                  className={styles.removeButton}
                >
                  <XCircle size={16} /> Eliminar
                </Button>
              </div>
            ))}
          </div>
        ) : (
          <div className={styles.noFavorites}>
            <Heart size={48} className={styles.noFavoritesIcon} />
            <p>
              Aún no tienes productos favoritos. ¡Explora nuestra tienda y añade
              algunos!
            </p>
            <Button variant="primary" size="md">
              Explorar Productos
            </Button>
          </div>
        )}
      </DashboardCard>
    </div>
  );
};

export default ClientFavorites;
