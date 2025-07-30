"use client";
import type React from "react";
import { useState } from "react";
import ProductCard from "../../ProductCard/ProductCard";
import type { Product } from "../../../../types/product";
import { ChevronLeft, ChevronRight } from "lucide-react";
import styles from "./ProductGrid.module.scss";

interface ProductGridProps {
  products: Product[];
  onProductClick: (productId: string) => void;
}

const ProductGrid: React.FC<ProductGridProps> = ({
  products,
  onProductClick,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const productsPerPage = 12;

  const totalPages = Math.ceil(products.length / productsPerPage);
  const startIndex = (currentPage - 1) * productsPerPage;
  const currentProducts = products.slice(
    startIndex,
    startIndex + productsPerPage
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleAddToCart = (productId: string) => {
    console.log("Añadir al carrito:", productId);
    // Implementar lógica del carrito
  };

  const handleAddToFavorites = (productId: string) => {
    console.log("Añadir a favoritos:", productId);
    // Implementar lógica de favoritos
  };

  if (products.length === 0) {
    return (
      <div className={styles.emptyState}>
        <div className={styles.emptyIcon}>📦</div>
        <h3 className={styles.emptyTitle}>No se encontraron productos</h3>
        <p className={styles.emptyDescription}>
          Intenta ajustar los filtros para encontrar lo que buscas
        </p>
      </div>
    );
  }

  return (
    <div className={styles.productGrid}>
      <div className={styles.gridHeader}>
        <div className={styles.viewControls}>
          <button
            className={`${styles.viewBtn} ${
              viewMode === "grid" ? styles.active : ""
            }`}
            onClick={() => setViewMode("grid")}
            title="Vista en cuadrícula"
          >
            <div className={styles.gridIcon}>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
            </div>
          </button>
          <button
            className={`${styles.viewBtn} ${
              viewMode === "list" ? styles.active : ""
            }`}
            onClick={() => setViewMode("list")}
            title="Vista en lista"
          >
            <div className={styles.listIcon}>
              <span></span>
              <span></span>
              <span></span>
            </div>
          </button>
        </div>

        <div className={styles.resultsInfo}>
          <span className={styles.resultsText}>
            Mostrando {startIndex + 1}-
            {Math.min(startIndex + productsPerPage, products.length)} de{" "}
            {products.length} productos
          </span>
        </div>
      </div>

      <div className={`${styles.productsContainer} ${styles[viewMode]}`}>
        {currentProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onProductClick={onProductClick}
            onAddToCart={handleAddToCart}
            onToggleFavorite={handleAddToFavorites}
          />
        ))}
      </div>

      {totalPages > 1 && (
        <div className={styles.pagination}>
          <button
            className={`${styles.pageBtn} ${styles.prevBtn}`}
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            <ChevronLeft size={16} />
            <span>Anterior</span>
          </button>

          <div className={styles.pageNumbers}>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
              if (
                page === 1 ||
                page === totalPages ||
                (page >= currentPage - 1 && page <= currentPage + 1)
              ) {
                return (
                  <button
                    key={page}
                    className={`${styles.pageNumber} ${
                      page === currentPage ? styles.active : ""
                    }`}
                    onClick={() => handlePageChange(page)}
                  >
                    {page}
                  </button>
                );
              } else if (page === currentPage - 2 || page === currentPage + 2) {
                return (
                  <span key={page} className={styles.ellipsis}>
                    ...
                  </span>
                );
              }
              return null;
            })}
          </div>

          <button
            className={`${styles.pageBtn} ${styles.nextBtn}`}
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            <span>Siguiente</span>
            <ChevronRight size={16} />
          </button>
        </div>
      )}
    </div>
  );
};

export default ProductGrid;
