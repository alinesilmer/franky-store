import type React from "react";
import { HeroSection } from "../../../components/molecules/HeroSection/HeroSection";
import { PromotionSection } from "../../../components/molecules/PromotionSection/PromotionSection";
import { NewsletterForm } from "../../../components/molecules/NewsletterForm/NewsletterForm";
import { ProductCard } from "../../../components/molecules/ProductCard/ProductCard";
import { DUMMY_PRODUCTS } from "../../../lib/auth"; // Usamos los productos dummy
import styles from "./Home.module.scss";

interface HomeProps {
  onNavigate: (path: string) => void;
}

export const Home: React.FC<HomeProps> = ({ onNavigate }) => {
  // Filtrar algunos productos para la sección "Nueva Colección"
  const newCollectionProducts = DUMMY_PRODUCTS.slice(0, 4);

  return (
    <div className={styles.homePage}>
      <HeroSection />

      <PromotionSection />

      <section className={styles.section}>
        <div className="container">
          <h2 className={styles.sectionTitle}>NUEVA COLECCIÓN</h2>
          <p className={styles.sectionDescription}>
            Descubre lo último en moda urbana. Estilo fresco y auténtico para la
            calle.
          </p>
          <div className={styles.productGrid}>
            {newCollectionProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onNavigate={onNavigate}
              />
            ))}
          </div>
        </div>
      </section>

      <section className={`${styles.section} ${styles.whyChooseUs}`}>
        <div className="container">
          <h2 className={styles.sectionTitle}>¿POR QUÉ ELEGIRNOS?</h2>
          <div className={styles.featuresGrid}>
            <div className={styles.featureItem}>
              <h3>Calidad Premium</h3>
              <p>
                Prendas diseñadas para durar, con los mejores materiales y
                acabados.
              </p>
            </div>
            <div className={styles.featureItem}>
              <h3>Diseños Exclusivos</h3>
              <p>
                Estilo único que no encontrarás en ningún otro lugar. ¡Destaca
                entre la multitud!
              </p>
            </div>
            <div className={styles.featureItem}>
              <h3>Comunidad Franky</h3>
              <p>
                Únete a una comunidad de amantes del streetwear y la cultura
                hip-hop.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className="container">
          <h2 className={styles.sectionTitle}>ENVÍOS Y MÉTODOS DE PAGO</h2>
          <div className={styles.infoGrid}>
            <div className={styles.infoItem}>
              <h3>Envíos Rápidos</h3>
              <p>
                Entregas a todo el país en tiempo récord. ¡Tu estilo no puede
                esperar!
              </p>
            </div>
            <div className={styles.infoItem}>
              <h3>Pagos Seguros</h3>
              <p>
                Aceptamos todas las tarjetas de crédito y débito, y opciones de
                pago en efectivo.
              </p>
            </div>
            <div className={styles.infoItem}>
              <h3>Devoluciones Fáciles</h3>
              <p>
                Si no estás satisfecho, te facilitamos el proceso de cambio o
                devolución.
              </p>
            </div>
          </div>
        </div>
      </section>

      <NewsletterForm />
    </div>
  );
};
