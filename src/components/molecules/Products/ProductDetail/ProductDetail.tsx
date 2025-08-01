"use client";
import type React from "react";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Heart,
  Share2,
  Star,
  Plus,
  Minus,
  ShoppingCart,
  Truck,
  Shield,
  RotateCcw,
  ChevronDown,
  ChevronUp,
  X,
  Ruler,
} from "lucide-react";
import { Button } from "../../../atoms/Button/Button";
import ProductImageGallery from "../../../atoms/ProductImageGallery/ProductImageGallery";
import ProductReviews from "../../../atoms/ProductReviews/ProductReviews";
import ProductRecommendations from "../../../atoms/ProductRecommendations/ProductRecommendations";
import { PRODUCTS_DATA } from "../../../../lib/productsData";
import type { Product } from "../../../../types/product";
import styles from "./ProductDetail.module.scss";

// Size guide data
const SIZE_GUIDE_DATA = {
  clothing: {
    title: "Guía de Tallas - Ropa",
    headers: [
      "Talla",
      "Pecho (cm)",
      "Cintura (cm)",
      "Cadera (cm)",
      "Largo (cm)",
    ],
    rows: [
      ["XS", "86-91", "66-71", "91-96", "66"],
      ["S", "91-96", "71-76", "96-101", "68"],
      ["M", "96-101", "76-81", "101-106", "70"],
      ["L", "101-106", "81-86", "106-111", "72"],
      ["XL", "106-111", "86-91", "111-116", "74"],
      ["XXL", "111-116", "91-96", "116-121", "76"],
    ],
  },
  shoes: {
    title: "Guía de Tallas - Calzado",
    headers: ["Talla", "EU", "US", "UK", "Largo pie (cm)"],
    rows: [
      ["35", "35", "5", "2.5", "22.5"],
      ["36", "36", "6", "3.5", "23"],
      ["37", "37", "7", "4", "23.5"],
      ["38", "38", "7.5", "5", "24"],
      ["39", "39", "8.5", "6", "24.5"],
      ["40", "40", "9", "6.5", "25"],
      ["41", "41", "10", "7.5", "25.5"],
      ["42", "42", "10.5", "8", "26"],
      ["43", "43", "11.5", "9", "26.5"],
      ["44", "44", "12", "9.5", "27"],
    ],
  },
};

const ProductDetail: React.FC = () => {
  const { productId } = useParams<{ productId: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [selectedColor, setSelectedColor] = useState<string>("");
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);
  const [showSizeGuide, setShowSizeGuide] = useState(false);
  const [expandedSections, setExpandedSections] = useState({
    description: true,
    shipping: false,
    returns: false,
    care: false,
  });

  useEffect(() => {
    if (productId) {
      const foundProduct = PRODUCTS_DATA.find((p) => p.id === productId);
      if (foundProduct) {
        setProduct(foundProduct);
        setSelectedColor(foundProduct.colors[0]);
        setSelectedSize(foundProduct.sizes[0]);
      } else {
        navigate("/products");
      }
    }
  }, [productId, navigate]);

  // Close modal when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const modal = document.querySelector(`.${styles.sizeGuideModal}`);
      const modalContent = document.querySelector(`.${styles.modalContent}`);

      if (
        modal &&
        modalContent &&
        !modalContent.contains(event.target as Node)
      ) {
        setShowSizeGuide(false);
      }
    };

    if (showSizeGuide) {
      document.addEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "unset";
    };
  }, [showSizeGuide]);

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert("Por favor selecciona una talla");
      return;
    }
    console.log("Añadir al carrito:", {
      productId: product?.id,
      size: selectedSize,
      color: selectedColor,
      quantity,
    });
  };

  const handleBuyNow = () => {
    if (!selectedSize) {
      alert("Por favor selecciona una talla");
      return;
    }
    console.log("Comprar ahora:", product?.id);
  };

  const handleQuantityChange = (change: number) => {
    setQuantity((prev) => Math.max(1, prev + change));
  };

  const getSizeGuideData = () => {
    if (!product) return SIZE_GUIDE_DATA.clothing;

    // Determine if it's shoes or clothing based on category or product type
    const isShoes =
      product.category.toLowerCase().includes("zapato") ||
      product.category.toLowerCase().includes("calzado") ||
      product.name.toLowerCase().includes("zapato");

    return isShoes ? SIZE_GUIDE_DATA.shoes : SIZE_GUIDE_DATA.clothing;
  };

  const discountPercentage = product?.originalPrice
    ? Math.round(
        ((product.originalPrice - product.price) / product.originalPrice) * 100
      )
    : 0;

  if (!product) {
    return (
      <div className={styles.loading}>
        <div className={styles.loadingSpinner}>Cargando producto...</div>
      </div>
    );
  }

  const sizeGuideData = getSizeGuideData();

  return (
    <div className={styles.productDetail}>
      {/* Size Guide Modal */}
      {showSizeGuide && (
        <div className={styles.sizeGuideModal}>
          <div className={styles.modalContent}>
            <div className={styles.modalHeader}>
              <div className={styles.modalTitleSection}>
                <Ruler className={styles.modalIcon} size={24} />
                <h2 className={styles.modalTitle}>{sizeGuideData.title}</h2>
              </div>
              <button
                className={styles.closeBtn}
                onClick={() => setShowSizeGuide(false)}
              >
                <X size={24} />
              </button>
            </div>

            <div className={styles.modalBody}>
              <div className={styles.sizeGuideInfo}>
                <p>
                  Encuentra tu talla perfecta con nuestra guía de medidas. Todas
                  las medidas están en centímetros.
                </p>
                <div className={styles.measurementTips}>
                  <h4>💡 Consejos para medir:</h4>
                  <ul>
                    <li>Mide sobre ropa interior o ropa ajustada</li>
                    <li>Mantén la cinta métrica paralela al suelo</li>
                    <li>No aprietes demasiado la cinta</li>
                    <li>Si estás entre dos tallas, elige la mayor</li>
                  </ul>
                </div>
              </div>

              <div className={styles.sizeTable}>
                <table>
                  <thead>
                    <tr>
                      {sizeGuideData.headers.map((header, index) => (
                        <th key={index}>{header}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {sizeGuideData.rows.map((row, rowIndex) => (
                      <tr
                        key={rowIndex}
                        className={
                          selectedSize === row[0] ? styles.selectedRow : ""
                        }
                      >
                        {row.map((cell, cellIndex) => (
                          <td
                            key={cellIndex}
                            className={cellIndex === 0 ? styles.sizeCell : ""}
                          >
                            {cell}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className={styles.modalFooter}>
                <p className={styles.helpText}>
                  ¿Necesitas ayuda? <a href="/contact">Contáctanos</a> y te
                  ayudaremos a encontrar tu talla perfecta.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Breadcrumb */}
      <div className={styles.breadcrumb}>
        <div className={styles.container}>
          <button
            className={styles.backBtn}
            onClick={() => navigate("/products")}
          >
            <ArrowLeft size={20} />
            <span>Volver a Productos</span>
          </button>
          <div className={styles.breadcrumbPath}>
            <span>Inicio</span>
            <span>/</span>
            <span>Productos</span>
            <span>/</span>
            <span className={styles.currentPage}>{product.name}</span>
          </div>
        </div>
      </div>

      <div className={styles.container}>
        <div className={styles.productLayout}>
          {/* Galería de imágenes */}
          <div className={styles.imageSection}>
            <ProductImageGallery
              images={product.images}
              productName={product.name}
            />
          </div>

          {/* Información del producto */}
          <div className={styles.productInfo}>
            <div className={styles.productHeader}>
              <div className={styles.categoryBadge}>{product.category}</div>
              <div className={styles.productActions}>
                <button
                  className={`${styles.favoriteBtn} ${
                    isFavorite ? styles.active : ""
                  }`}
                  onClick={() => setIsFavorite(!isFavorite)}
                >
                  <Heart
                    size={20}
                    fill={isFavorite ? "currentColor" : "none"}
                  />
                </button>
                <button className={styles.shareBtn}>
                  <Share2 size={20} />
                </button>
              </div>
            </div>

            <h1 className={styles.productTitle}>{product.name}</h1>

            {/* Rating */}
            <div className={styles.ratingSection}>
              <div className={styles.stars}>
                {Array.from({ length: 5 }, (_, i) => (
                  <Star
                    key={i}
                    size={16}
                    fill={i < Math.floor(product.rating) ? "#fdd835" : "none"}
                    color="#fdd835"
                  />
                ))}
              </div>
              <span className={styles.ratingText}>
                {product.rating} ({product.reviewCount} reseñas)
              </span>
            </div>

            {/* Precio */}
            <div className={styles.priceSection}>
              <div className={styles.priceContainer}>
                <span className={styles.currentPrice}>
                  ${product.price.toFixed(2)}
                </span>
                {product.originalPrice && (
                  <span className={styles.originalPrice}>
                    ${product.originalPrice.toFixed(2)}
                  </span>
                )}
                {discountPercentage > 0 && (
                  <span className={styles.discountBadge}>
                    -{discountPercentage}%
                  </span>
                )}
              </div>
              {product.originalPrice && (
                <div className={styles.savings}>
                  ¡Ahorras ${(product.originalPrice - product.price).toFixed(2)}
                  !
                </div>
              )}
            </div>

            {/* Selector de color */}
            <div className={styles.optionSection}>
              <h3 className={styles.optionTitle}>
                Color: <span>{selectedColor}</span>
              </h3>
              <div className={styles.colorOptions}>
                {product.colors.map((color) => (
                  <button
                    key={color}
                    className={`${styles.colorOption} ${
                      selectedColor === color ? styles.selected : ""
                    }`}
                    onClick={() => setSelectedColor(color)}
                    title={color}
                  >
                    <div
                      className={styles.colorSwatch}
                      style={{
                        backgroundColor:
                          color === "negro"
                            ? "#000"
                            : color === "blanco"
                            ? "#fff"
                            : color === "gris"
                            ? "#6b7280"
                            : color === "azul"
                            ? "#3b82f6"
                            : color === "rojo"
                            ? "#ef4444"
                            : "#10b981",
                      }}
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Selector de talla */}
            <div className={styles.optionSection}>
              <h3 className={styles.optionTitle}>
                Talla: <span>{selectedSize}</span>
              </h3>
              <div className={styles.sizeOptions}>
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    className={`${styles.sizeOption} ${
                      selectedSize === size ? styles.selected : ""
                    }`}
                    onClick={() => setSelectedSize(size)}
                  >
                    {size}
                  </button>
                ))}
              </div>
              <button
                className={styles.sizeGuideBtn}
                onClick={() => setShowSizeGuide(true)}
              >
                <Ruler size={16} />
                Guía de tallas
              </button>
            </div>

            {/* Cantidad */}
            <div className={styles.quantitySection}>
              <h3 className={styles.optionTitle}>Cantidad:</h3>
              <div className={styles.quantityControls}>
                <button
                  className={styles.quantityBtn}
                  onClick={() => handleQuantityChange(-1)}
                  disabled={quantity <= 1}
                >
                  <Minus size={16} />
                </button>
                <span className={styles.quantityValue}>{quantity}</span>
                <button
                  className={styles.quantityBtn}
                  onClick={() => handleQuantityChange(1)}
                >
                  <Plus size={16} />
                </button>
              </div>
            </div>

            {/* Botones de acción */}
            <div className={styles.actionButtons}>
              <Button
                variant="third"
                size="lg"
                onClick={handleAddToCart}
                className={styles.addToCartBtn}
              >
                <ShoppingCart size={20} />
                <span>Añadir al Carrito</span>
              </Button>
              <Button
                variant="third"
                size="lg"
                onClick={handleBuyNow}
                className={styles.buyNowBtn}
              >
                Comprar Ahora
              </Button>
            </div>

            {/* Stock status */}
            <div className={styles.stockStatus}>
              {product.inStock ? (
                <span className={styles.inStock}>
                  ✓ En stock - Listo para enviar
                </span>
              ) : (
                <span className={styles.outOfStock}>⚠ Agotado</span>
              )}
            </div>
          </div>
        </div>

        {/* Secciones expandibles */}
        <div className={styles.expandableSections}>
          {/* Descripción */}
          <div className={styles.expandableSection}>
            <button
              className={styles.sectionHeader}
              onClick={() => toggleSection("description")}
            >
              <h3>Descripción y Características</h3>
              {expandedSections.description ? (
                <ChevronUp size={20} />
              ) : (
                <ChevronDown size={20} />
              )}
            </button>
            {expandedSections.description && (
              <div className={styles.sectionContent}>
                <p>{product.description}</p>
                <ul className={styles.featureList}>
                  <li>Material de alta calidad</li>
                  <li>Diseño urbano y moderno</li>
                  <li>Corte cómodo y versátil</li>
                  <li>Fácil cuidado y mantenimiento</li>
                </ul>
                <div className={styles.tags}>
                  {product.tags.map((tag) => (
                    <span key={tag} className={styles.tag}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Envío */}
          <div className={styles.expandableSection}>
            <button
              className={styles.sectionHeader}
              onClick={() => toggleSection("shipping")}
            >
              <h3>Envío y Entrega</h3>
              {expandedSections.shipping ? (
                <ChevronUp size={20} />
              ) : (
                <ChevronDown size={20} />
              )}
            </button>
            {expandedSections.shipping && (
              <div className={styles.sectionContent}>
                <div className={styles.shippingOptions}>
                  <div className={styles.shippingOption}>
                    <div className={styles.shippingIcon}>
                      <Truck size={20} />
                    </div>
                    <div className={styles.shippingDetails}>
                      <h4>Envío Estándar</h4>
                      <p>3-5 días laborables - Gratis en pedidos +$50</p>
                    </div>
                    <span className={styles.shippingPrice}>$5.99</span>
                  </div>
                  <div className={styles.shippingOption}>
                    <div className={styles.shippingIcon}>
                      <Truck size={20} />
                    </div>
                    <div className={styles.shippingDetails}>
                      <h4>Envío Express</h4>
                      <p>1-2 días laborables</p>
                    </div>
                    <span className={styles.shippingPrice}>$12.99</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Devoluciones */}
          <div className={styles.expandableSection}>
            <button
              className={styles.sectionHeader}
              onClick={() => toggleSection("returns")}
            >
              <h3>Devoluciones y Cambios</h3>
              {expandedSections.returns ? (
                <ChevronUp size={20} />
              ) : (
                <ChevronDown size={20} />
              )}
            </button>
            {expandedSections.returns && (
              <div className={styles.sectionContent}>
                <div className={styles.returnPolicy}>
                  <div className={styles.returnItem}>
                    <RotateCcw size={20} />
                    <div>
                      <h4>30 días para devoluciones</h4>
                      <p>
                        Devuelve tu producto en perfecto estado dentro de 30
                        días
                      </p>
                    </div>
                  </div>
                  <div className={styles.returnItem}>
                    <Shield size={20} />
                    <div>
                      <h4>Garantía de calidad</h4>
                      <p>
                        Todos nuestros productos tienen garantía de fabricación
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Reseñas */}
        <ProductReviews
          productId={product.id}
          rating={product.rating}
          reviewCount={product.reviewCount}
        />

        {/* Recomendaciones */}
        <ProductRecommendations
          currentProductId={product.id}
          category={product.category}
        />
      </div>
    </div>
  );
};

export default ProductDetail;
