import styles from "./ShippingPayment.module.scss";
import { FaShippingFast, FaShieldAlt, FaCreditCard } from "react-icons/fa";

const ShippingPayment = () => {
  return (
    <section className={styles.section}>
      <div className="container">
        <h2 className={styles.sectionTitle}>ENVÍOS Y MÉTODOS DE PAGO</h2>
        <p className={styles.sectionDescription}>
          Pagá como quieras y recibí tu estilo donde estés. ¡Tu experiencia es
          lo primero!
        </p>

        <div className={styles.infoGrid}>
          <div className={styles.infoItem}>
            <FaShippingFast className={styles.icon} />
            <h3>Envíos Rápidos</h3>
            <p>
              Entregas a todo el país en tiempo récord. ¡Tu estilo no puede
              esperar!
            </p>
          </div>

          <div className={styles.infoItem}>
            <FaShieldAlt className={styles.icon} />
            <h3>Pagos Seguros</h3>
            <p>
              Aceptamos tarjetas, transferencias y pagos en efectivo. Tus datos
              están protegidos.
            </p>
          </div>

          <div className={styles.infoItem}>
            <FaCreditCard className={styles.icon} />
            <h3>Cuotas Sin Interés</h3>
            <p>
              Financiá tus compras en 3, 6 y 12 cuotas sin interés con tarjetas
              seleccionadas.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

{
  /*TODO: Faltan agregar las imágenes de tarjetas aceptadas;*/
}

export default ShippingPayment;
