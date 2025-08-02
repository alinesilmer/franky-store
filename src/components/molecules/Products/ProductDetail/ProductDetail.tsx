// ProductDetail.tsx
"use client";

import React, { useState, useEffect } from "react";
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

// --- Size guide lookup tables ---
const SIZE_GUIDE_DATA = {
  clothing: {
    title: "Guía de Tallas – Ropa",
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
    title: "Guía de Tallas – Calzado",
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
  const { productId } = useParams<{ productId?: string }>();
  const navigate = useNavigate();

  const [product, setProduct] = useState<Product | null>(null);
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [selectedColor, setSelectedColor] = useState<string>("");
  const [quantity, setQuantity] = useState<number>(1);
  const [isFavorite, setIsFavorite] = useState<boolean>(false);
  const [showSizeGuide, setShowSizeGuide] = useState<boolean>(false);
  const [expandedSections, setExpandedSections] = useState<{
    description: boolean;
    shipping: boolean;
    returns: boolean;
    care: boolean;
  }>({
    description: true,
    shipping: false,
    returns: false,
    care: false,
  });

  // Load product from PRODUCTS_DATA (fallback to /products)
  useEffect(() => {
    if (!productId) {
      navigate("/products");
      return;
    }
    const found = PRODUCTS_DATA.find((p) => p.id === productId);
    if (!found) {
      navigate("/products");
      return;
    }
    setProduct(found);
    setSelectedColor(found.colors?.[0] ?? "");
    setSelectedSize(found.sizes?.[0] ?? "");
  }, [productId, navigate]);

  // Lock scroll when size guide is open
  useEffect(() => {
    document.body.style.overflow = showSizeGuide ? "hidden" : "auto";
  }, [showSizeGuide]);

  if (!product) {
    return (
      <div className={styles.loading}>
        <div className={styles.loadingSpinner}>Cargando producto…</div>
      </div>
    );
  }

  // Fallbacks & derived values
  const images =
    product.images && product.images.length > 0
      ? product.images
      : [product.image];
  const colors = product.colors ?? [];
  const sizes = product.sizes ?? [];
  const rating = product.rating ?? 0;
  const reviewCount = product.reviewCount ?? 0;
  const inStock = product.inStock ?? true;
  const tags = product.tags ?? [];
  const category = product.category ?? "";
  const originalPrice = product.originalPrice;
  const discountPercentage = originalPrice
    ? Math.round(((originalPrice - product.price) / originalPrice) * 100)
    : 0;

  // Choose appropriate size guide
  const getSizeGuideData = () => {
    const lc = category.toLowerCase();
    const isShoes =
      lc.includes("zapato") ||
      lc.includes("calzado") ||
      product.name.toLowerCase().includes("zapato");
    return isShoes ? SIZE_GUIDE_DATA.shoes : SIZE_GUIDE_DATA.clothing;
  };
  const sizeGuideData = getSizeGuideData();

  const toggleSection = (sec: keyof typeof expandedSections) => {
    setExpandedSections((prev) => ({ ...prev, [sec]: !prev[sec] }));
  };

  const handleQuantityChange = (delta: number) => {
    setQuantity((q) => Math.max(1, q + delta));
  };

  const handleAddToCart = () => {
    if (!selectedSize) return alert("Por favor selecciona una talla");
    console.log("Añadir al carrito:", {
      productId: product.id,
      size: selectedSize,
      color: selectedColor,
      quantity,
    });
  };

  const handleBuyNow = () => {
    if (!selectedSize) return alert("Por favor selecciona una talla");
    console.log("Comprar ahora:", product.id);
  };

  const imageGalleryProps = {
    images,
    productName: product.name,
  };

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
              <p>
                Encuentra tu talla perfecta con nuestra guía de medidas (cm).
              </p>
              <div className={styles.sizeTable}>
                <table>
                  <thead>
                    <tr>
                      {sizeGuideData.headers.map((h, i) => (
                        <th key={i}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {sizeGuideData.rows.map((row, ri) => (
                      <tr
                        key={ri}
                        className={
                          selectedSize === row[0] ? styles.selectedRow : ""
                        }
                      >
                        {row.map((cell, ci) => (
                          <td
                            key={ci}
                            className={ci === 0 ? styles.sizeCell : ""}
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
                  ¿Necesitas ayuda? <a href="/contact">Contáctanos</a>
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
            Inicio / Productos /{" "}
            <span className={styles.currentPage}>{product.name}</span>
          </div>
        </div>
      </div>

      <div className={styles.container}>
        <div className={styles.productLayout}>
          {/* Image gallery */}
          <div className={styles.imageSection}>
            <ProductImageGallery {...imageGalleryProps} />
          </div>

          {/* Main info */}
          <div className={styles.productInfo}>
            {/* Category & actions */}
            <div className={styles.productHeader}>
              <div className={styles.categoryBadge}>{category}</div>
              <div className={styles.productActions}>
                <button
                  className={`${styles.favoriteBtn} ${
                    isFavorite ? styles.active : ""
                  }`}
                  onClick={() => setIsFavorite((v) => !v)}
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

            <h2 className={styles.productTitle}>{product.name}</h2>

            {/* Rating */}
            <div className={styles.ratingSection}>
              <div className={styles.stars}>
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    size={16}
                    fill={i < Math.floor(rating) ? "#fdd835" : "none"}
                    color="#fdd835"
                  />
                ))}
              </div>
              <span className={styles.ratingText}>
                {rating.toFixed(1)} ({reviewCount} reseñas)
              </span>
            </div>

            {/* Price */}
            <div className={styles.priceSection}>
              <div className={styles.priceContainer}>
                <span className={styles.currentPrice}>
                  ${product.price.toFixed(2)}
                </span>
                {originalPrice && (
                  <span className={styles.originalPrice}>
                    ${originalPrice.toFixed(2)}
                  </span>
                )}
                {discountPercentage > 0 && (
                  <span className={styles.discountBadge}>
                    -{discountPercentage}%
                  </span>
                )}
              </div>
              {originalPrice && (
                <div className={styles.savings}>
                  ¡Ahorras ${(originalPrice - product.price).toFixed(2)}!
                </div>
              )}
            </div>

            {/* Color selector */}
            <div className={styles.optionSection}>
              <h3 className={styles.optionTitle}>
                Color: <span>{selectedColor}</span>
              </h3>
              <div className={styles.colorOptions}>
                {colors.map((c) => (
                  <button
                    key={c}
                    className={`${styles.colorOption} ${
                      selectedColor === c ? styles.selected : ""
                    }`}
                    onClick={() => setSelectedColor(c)}
                    title={c}
                  >
                    <div
                      className={styles.colorSwatch}
                      style={{ backgroundColor: c }}
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Size selector */}
            <div className={styles.optionSection}>
              <h3 className={styles.optionTitle}>
                Talla: <span>{selectedSize}</span>
              </h3>
              <div className={styles.sizeOptions}>
                {sizes.map((s) => (
                  <button
                    key={s}
                    className={`${styles.sizeOption} ${
                      selectedSize === s ? styles.selected : ""
                    }`}
                    onClick={() => setSelectedSize(s)}
                  >
                    {s}
                  </button>
                ))}
              </div>
              <button
                className={styles.sizeGuideBtn}
                onClick={() => setShowSizeGuide(true)}
              >
                <Ruler size={16} /> Guía de tallas
              </button>
            </div>

            {/* Quantity */}
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

            {/* Actions */}
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

            {/* Stock */}
            <div className={styles.stockStatus}>
              {inStock ? (
                <span className={styles.inStock}>
                  ✓ En stock – Listo para enviar
                </span>
              ) : (
                <span className={styles.outOfStock}>⚠ Agotado</span>
              )}
            </div>
          </div>
        </div>

        {/* Expandable content */}
        <div className={styles.expandableSections}>
          {(
            [
              { key: "description", label: "Descripción y Características" },
              { key: "shipping", label: "Envío y Entrega" },
              { key: "returns", label: "Devoluciones y Cambios" },
            ] as const
          ).map(({ key, label }) => {
            const isOpen = expandedSections[key];
            return (
              <div className={styles.expandableSection} key={key}>
                <button
                  className={styles.sectionHeader}
                  onClick={() => toggleSection(key)}
                >
                  <h3>{label}</h3>
                  {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>

                {isOpen && (
                  <div className={styles.sectionContent}>
                    {key === "description" && (
                      <>
                        <p>{product.description}</p>
                        <ul className={styles.featureList}>
                          <li>Material de alta calidad</li>
                          <li>Diseño urbano y moderno</li>
                          <li>Corte cómodo y versátil</li>
                          <li>Fácil mantenimiento</li>
                        </ul>
                        <div className={styles.tags}>
                          {tags.map((t) => (
                            <span key={t} className={styles.tag}>
                              {t}
                            </span>
                          ))}
                        </div>
                      </>
                    )}
                    {key === "shipping" && (
                      <div className={styles.shippingOptions}>
                        <div className={styles.shippingOption}>
                          <Truck size={20} />
                          <div>
                            <h4>Envío Estándar</h4>
                            <p>3-5 días – Gratis +$50</p>
                          </div>
                          <span className={styles.shippingPrice}>$5.99</span>
                        </div>
                        <div className={styles.shippingOption}>
                          <Truck size={20} />
                          <div>
                            <h4>Envío Express</h4>
                            <p>1-2 días laborables</p>
                          </div>
                          <span className={styles.shippingPrice}>$12.99</span>
                        </div>
                      </div>
                    )}
                    {key === "returns" && (
                      <div className={styles.returnPolicy}>
                        <div className={styles.returnItem}>
                          <RotateCcw size={20} />
                          <div>
                            <h4>30 días para devoluciones</h4>
                            <p>En perfecto estado</p>
                          </div>
                        </div>
                        <div className={styles.returnItem}>
                          <Shield size={20} />
                          <div>
                            <h4>Garantía de Calidad</h4>
                            <p>Protegido contra defectos</p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Reviews & Recommendations */}
      <ProductReviews
        productId={product.id}
        rating={rating}
        reviewCount={reviewCount}
      />
      <ProductRecommendations
        currentProductId={product.id}
        category={category}
      />
    </div>
  );
};

export default ProductDetail;
