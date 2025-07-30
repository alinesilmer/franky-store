"use client";
import type React from "react";
import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import ProductsHero from "../../../components/molecules/Products/ProductsHero/ProductsHero";
import CategoryFilter from "../../../components/molecules/Products/CategoryFilter/CategoryFilter";
import OutfitCarousel from "../../../components/molecules/Products/OutfitCarousel/OutfitCarousel";
import ProductFilters from "../../../components/molecules/Products/ProductFilters/ProductFilters";
import ProductGrid from "../../../components/molecules/Products/ProductGrid/ProductGrid";
import { PRODUCTS_DATA, OUTFIT_COLLECTIONS } from "../../../lib/productsData";
import type {
  Product,
  ProductFilters as FilterType,
} from "../../../types/product";
import styles from "./Products.module.scss";

const Products: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [filteredProducts, setFilteredProducts] =
    useState<Product[]>(PRODUCTS_DATA);
  const [currentFilters, setCurrentFilters] = useState<FilterType>({
    category: searchParams.get("category") || "todos",
    priceRange: [0, 500],
    colors: [],
    sizes: [],
    brands: [],
    sortBy: "relevancia",
  });

  useEffect(() => {
    applyFilters();
  }, [currentFilters]);

  const applyFilters = () => {
    let filtered = [...PRODUCTS_DATA];

    // Filtrar por categoría
    if (currentFilters.category !== "todos") {
      filtered = filtered.filter(
        (product) => product.category === currentFilters.category
      );
    }

    // Filtrar por rango de precio
    filtered = filtered.filter(
      (product) =>
        product.price >= currentFilters.priceRange[0] &&
        product.price <= currentFilters.priceRange[1]
    );

    // Filtrar por colores
    if (currentFilters.colors.length > 0) {
      filtered = filtered.filter((product) =>
        product.colors.some((color) => currentFilters.colors.includes(color))
      );
    }

    // Filtrar por tallas
    if (currentFilters.sizes.length > 0) {
      filtered = filtered.filter((product) =>
        product.sizes.some((size) => currentFilters.sizes.includes(size))
      );
    }

    // Filtrar por marcas
    if (currentFilters.brands.length > 0) {
      filtered = filtered.filter((product) =>
        currentFilters.brands.includes(product.brand)
      );
    }

    // Ordenar productos
    switch (currentFilters.sortBy) {
      case "precio-menor":
        filtered.sort((a, b) => a.price - b.price);
        break;
      case "precio-mayor":
        filtered.sort((a, b) => b.price - a.price);
        break;
      case "mas-popular":
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case "mas-nuevo":
        filtered.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        break;
      default:
        // Relevancia - mantener orden original
        break;
    }

    setFilteredProducts(filtered);
  };

  const handleCategoryChange = (category: string) => {
    const newFilters = { ...currentFilters, category };
    setCurrentFilters(newFilters);
    setSearchParams({ category });
  };

  const handleFiltersChange = (filters: Partial<FilterType>) => {
    setCurrentFilters({ ...currentFilters, ...filters });
  };

  const handleProductClick = (productId: string) => {
    navigate(`/products/${productId}`);
  };

  return (
    <div className={styles.productsPage}>
      <ProductsHero />

      <div className={styles.outfitSection}>
        <OutfitCarousel collections={OUTFIT_COLLECTIONS} />
      </div>

      <div className={styles.categorySection}>
        <CategoryFilter
          selectedCategory={currentFilters.category}
          onCategoryChange={handleCategoryChange}
        />
      </div>

      <div className={styles.productsSection}>
        <div className={styles.container}>
          <div className={styles.productsLayout}>
            <aside className={styles.filtersAside}>
              <ProductFilters
                filters={currentFilters}
                onFiltersChange={handleFiltersChange}
                totalProducts={filteredProducts.length}
              />
            </aside>

            <main className={styles.productsMain}>
              <div className={styles.productsHeader}>
                <h2 className={styles.resultsTitle}>
                  {currentFilters.category === "todos"
                    ? "Todos los Productos"
                    : currentFilters.category.charAt(0).toUpperCase() +
                      currentFilters.category.slice(1)}
                </h2>
                <p className={styles.resultsCount}>
                  {filteredProducts.length} productos encontrados
                </p>
              </div>

              <ProductGrid
                products={filteredProducts}
                onProductClick={handleProductClick}
              />
            </main>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
