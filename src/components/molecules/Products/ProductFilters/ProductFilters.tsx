"use client";
import type React from "react";
import { useState } from "react";
import {
  Filter,
  X,
  ChevronDown,
  ChevronUp,
  RotateCcw,
  Palette,
  Ruler,
  Tag,
  DollarSign,
  ArrowUpDown,
} from "lucide-react";
import type { ProductFilters as FilterType } from "../../../../types/product";
import styles from "./ProductFilters.module.scss";

interface ProductFiltersProps {
  filters: FilterType;
  onFiltersChange: (filters: Partial<FilterType>) => void;
  totalProducts: number;
}

const ProductFilters: React.FC<ProductFiltersProps> = ({
  filters,
  onFiltersChange,
  totalProducts,
}) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [expandedSections, setExpandedSections] = useState({
    price: true,
    colors: true,
    sizes: true,
    brands: true,
    sort: true,
  });

  const availableColors = [
    { name: "negro", hex: "#000000", label: "Negro" },
    { name: "blanco", hex: "#ffffff", label: "Blanco" },
    { name: "gris", hex: "#6b7280", label: "Gris" },
    { name: "azul", hex: "#3b82f6", label: "Azul" },
    { name: "rojo", hex: "#ef4444", label: "Rojo" },
    { name: "verde", hex: "#10b981", label: "Verde" },
    { name: "amarillo", hex: "#f59e0b", label: "Amarillo" },
    { name: "rosa", hex: "#ec4899", label: "Rosa" },
  ];

  const availableSizes = [
    { value: "XS", label: "XS" },
    { value: "S", label: "S" },
    { value: "M", label: "M" },
    { value: "L", label: "L" },
    { value: "XL", label: "XL" },
    { value: "XXL", label: "XXL" },
    { value: "38", label: "38" },
    { value: "39", label: "39" },
    { value: "40", label: "40" },
    { value: "41", label: "41" },
    { value: "42", label: "42" },
    { value: "43", label: "43" },
    { value: "44", label: "44" },
    { value: "45", label: "45" },
  ];

  const availableBrands = [
    "Urban Store",
    "Street Art Co.",
    "Urban Kicks",
    "City Wear",
    "King Caps",
    "Tech Time",
    "Graffiti Flow",
    "Street King",
  ];

  const sortOptions = [
    { value: "relevancia", label: "Relevancia" },
    { value: "precio-menor", label: "Precio: Menor a Mayor" },
    { value: "precio-mayor", label: "Precio: Mayor a Menor" },
    { value: "mas-popular", label: "Más Popular" },
    { value: "mas-nuevo", label: "Más Nuevo" },
    { value: "mejor-valorado", label: "Mejor Valorado" },
  ];

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const handlePriceChange = (index: number, value: number) => {
    const newRange: [number, number] = [...filters.priceRange];
    newRange[index] = value;
    onFiltersChange({ priceRange: newRange });
  };

  const handleColorToggle = (color: string) => {
    const newColors = filters.colors.includes(color)
      ? filters.colors.filter((c) => c !== color)
      : [...filters.colors, color];
    onFiltersChange({ colors: newColors });
  };

  const handleSizeToggle = (size: string) => {
    const newSizes = filters.sizes.includes(size)
      ? filters.sizes.filter((s) => s !== size)
      : [...filters.sizes, size];
    onFiltersChange({ sizes: newSizes });
  };

  const handleBrandToggle = (brand: string) => {
    const newBrands = filters.brands.includes(brand)
      ? filters.brands.filter((b) => b !== brand)
      : [...filters.brands, brand];
    onFiltersChange({ brands: newBrands });
  };

  const handleSortChange = (sortBy: string) => {
    onFiltersChange({ sortBy });
  };

  const clearAllFilters = () => {
    onFiltersChange({
      category: "todos",
      priceRange: [0, 500],
      colors: [],
      sizes: [],
      brands: [],
      sortBy: "relevancia",
    });
  };

  const hasActiveFilters =
    filters.category !== "todos" ||
    filters.priceRange[0] > 0 ||
    filters.priceRange[1] < 500 ||
    filters.colors.length > 0 ||
    filters.sizes.length > 0 ||
    filters.brands.length > 0 ||
    filters.sortBy !== "relevancia";

  const activeFiltersCount =
    (filters.category !== "todos" ? 1 : 0) +
    (filters.priceRange[0] > 0 || filters.priceRange[1] < 500 ? 1 : 0) +
    filters.colors.length +
    filters.sizes.length +
    filters.brands.length +
    (filters.sortBy !== "relevancia" ? 1 : 0);

  return (
    <div
      className={`${styles.productFilters} ${
        isCollapsed ? styles.collapsed : ""
      }`}
    >
      {/* Header del filtro */}
      <div className={styles.filtersHeader}>
        <div className={styles.headerContent}>
          <div className={styles.headerTitle}>
            <Filter size={20} />
            <h3>Filtros</h3>
            {activeFiltersCount > 0 && (
              <span className={styles.activeCount}>{activeFiltersCount}</span>
            )}
          </div>
          <button
            className={styles.collapseBtn}
            onClick={() => setIsCollapsed(!isCollapsed)}
          >
            {isCollapsed ? <ChevronDown size={16} /> : <ChevronUp size={16} />}
          </button>
        </div>

        <div className={styles.resultsInfo}>
          <span className={styles.resultsText}>{totalProducts} productos</span>
          {hasActiveFilters && (
            <button className={styles.clearAllBtn} onClick={clearAllFilters}>
              <RotateCcw size={14} />
              <span>Limpiar todo</span>
            </button>
          )}
        </div>
      </div>

      {/* Contenido de filtros */}
      <div className={styles.filtersContent}>
        {/* Ordenar por */}
        <div className={styles.filterSection}>
          <button
            className={styles.sectionHeader}
            onClick={() => toggleSection("sort")}
          >
            <div className={styles.sectionTitle}>
              <ArrowUpDown size={16} />
              <span>Ordenar por</span>
            </div>
            {expandedSections.sort ? (
              <ChevronUp size={16} />
            ) : (
              <ChevronDown size={16} />
            )}
          </button>

          {expandedSections.sort && (
            <div className={styles.sectionContent}>
              <div className={styles.sortOptions}>
                {sortOptions.map((option) => (
                  <label key={option.value} className={styles.radioOption}>
                    <input
                      type="radio"
                      name="sort"
                      value={option.value}
                      checked={filters.sortBy === option.value}
                      onChange={() => handleSortChange(option.value)}
                    />
                    <span className={styles.radioLabel}>{option.label}</span>
                  </label>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Rango de precio */}
        <div className={styles.filterSection}>
          <button
            className={styles.sectionHeader}
            onClick={() => toggleSection("price")}
          >
            <div className={styles.sectionTitle}>
              <DollarSign size={16} />
              <span>Precio</span>
            </div>
            {expandedSections.price ? (
              <ChevronUp size={16} />
            ) : (
              <ChevronDown size={16} />
            )}
          </button>

          {expandedSections.price && (
            <div className={styles.sectionContent}>
              <div className={styles.priceRange}>
                <div className={styles.priceInputs}>
                  <div className={styles.priceInput}>
                    <label>Mín</label>
                    <input
                      type="number"
                      value={filters.priceRange[0]}
                      onChange={(e) =>
                        handlePriceChange(0, Number(e.target.value))
                      }
                      min="0"
                      max="500"
                    />
                  </div>
                  <span className={styles.priceSeparator}>-</span>
                  <div className={styles.priceInput}>
                    <label>Máx</label>
                    <input
                      type="number"
                      value={filters.priceRange[1]}
                      onChange={(e) =>
                        handlePriceChange(1, Number(e.target.value))
                      }
                      min="0"
                      max="500"
                    />
                  </div>
                </div>

                <div className={styles.priceSlider}>
                  <input
                    type="range"
                    min="0"
                    max="500"
                    value={filters.priceRange[0]}
                    onChange={(e) =>
                      handlePriceChange(0, Number(e.target.value))
                    }
                    className={styles.rangeMin}
                  />
                  <input
                    type="range"
                    min="0"
                    max="500"
                    value={filters.priceRange[1]}
                    onChange={(e) =>
                      handlePriceChange(1, Number(e.target.value))
                    }
                    className={styles.rangeMax}
                  />
                </div>

                <div className={styles.priceLabels}>
                  <span>$0</span>
                  <span>$500+</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Colores */}
        <div className={styles.filterSection}>
          <button
            className={styles.sectionHeader}
            onClick={() => toggleSection("colors")}
          >
            <div className={styles.sectionTitle}>
              <Palette size={16} />
              <span>Colores</span>
              {filters.colors.length > 0 && (
                <span className={styles.selectedCount}>
                  ({filters.colors.length})
                </span>
              )}
            </div>
            {expandedSections.colors ? (
              <ChevronUp size={16} />
            ) : (
              <ChevronDown size={16} />
            )}
          </button>

          {expandedSections.colors && (
            <div className={styles.sectionContent}>
              <div className={styles.colorGrid}>
                {availableColors.map((color) => (
                  <button
                    key={color.name}
                    className={`${styles.colorOption} ${
                      filters.colors.includes(color.name) ? styles.selected : ""
                    }`}
                    onClick={() => handleColorToggle(color.name)}
                    style={{ "--color": color.hex } as React.CSSProperties}
                    title={color.label}
                  >
                    <div className={styles.colorSwatch} />
                    {filters.colors.includes(color.name) && (
                      <div className={styles.colorCheck}>✓</div>
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Tallas */}
        <div className={styles.filterSection}>
          <button
            className={styles.sectionHeader}
            onClick={() => toggleSection("sizes")}
          >
            <div className={styles.sectionTitle}>
              <Ruler size={16} />
              <span>Tallas</span>
              {filters.sizes.length > 0 && (
                <span className={styles.selectedCount}>
                  ({filters.sizes.length})
                </span>
              )}
            </div>
            {expandedSections.sizes ? (
              <ChevronUp size={16} />
            ) : (
              <ChevronDown size={16} />
            )}
          </button>

          {expandedSections.sizes && (
            <div className={styles.sectionContent}>
              <div className={styles.sizeGrid}>
                {availableSizes.map((size) => (
                  <button
                    key={size.value}
                    className={`${styles.sizeOption} ${
                      filters.sizes.includes(size.value) ? styles.selected : ""
                    }`}
                    onClick={() => handleSizeToggle(size.value)}
                  >
                    {size.label}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Marcas */}
        <div className={styles.filterSection}>
          <button
            className={styles.sectionHeader}
            onClick={() => toggleSection("brands")}
          >
            <div className={styles.sectionTitle}>
              <Tag size={16} />
              <span>Marcas</span>
              {filters.brands.length > 0 && (
                <span className={styles.selectedCount}>
                  ({filters.brands.length})
                </span>
              )}
            </div>
            {expandedSections.brands ? (
              <ChevronUp size={16} />
            ) : (
              <ChevronDown size={16} />
            )}
          </button>

          {expandedSections.brands && (
            <div className={styles.sectionContent}>
              <div className={styles.brandList}>
                {availableBrands.map((brand) => (
                  <label key={brand} className={styles.checkboxOption}>
                    <input
                      type="checkbox"
                      checked={filters.brands.includes(brand)}
                      onChange={() => handleBrandToggle(brand)}
                    />
                    <span className={styles.checkboxLabel}>{brand}</span>
                  </label>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Filtros activos */}
      {hasActiveFilters && (
        <div className={styles.activeFilters}>
          <h4 className={styles.activeFiltersTitle}>Filtros Activos:</h4>
          <div className={styles.activeFiltersList}>
            {filters.category !== "todos" && (
              <span className={styles.activeFilter}>
                Categoría: {filters.category}
                <button onClick={() => onFiltersChange({ category: "todos" })}>
                  <X size={12} />
                </button>
              </span>
            )}

            {(filters.priceRange[0] > 0 || filters.priceRange[1] < 500) && (
              <span className={styles.activeFilter}>
                ${filters.priceRange[0]} - ${filters.priceRange[1]}
                <button
                  onClick={() => onFiltersChange({ priceRange: [0, 500] })}
                >
                  <X size={12} />
                </button>
              </span>
            )}

            {filters.colors.map((color) => (
              <span key={color} className={styles.activeFilter}>
                {color}
                <button onClick={() => handleColorToggle(color)}>
                  <X size={12} />
                </button>
              </span>
            ))}

            {filters.sizes.map((size) => (
              <span key={size} className={styles.activeFilter}>
                Talla {size}
                <button onClick={() => handleSizeToggle(size)}>
                  <X size={12} />
                </button>
              </span>
            ))}

            {filters.brands.map((brand) => (
              <span key={brand} className={styles.activeFilter}>
                {brand}
                <button onClick={() => handleBrandToggle(brand)}>
                  <X size={12} />
                </button>
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductFilters;
