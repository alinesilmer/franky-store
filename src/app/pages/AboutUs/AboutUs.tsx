import type React from "react";
import styles from "./AboutUs.module.scss";

export const AboutUs: React.FC = () => {
  return (
    <div className={styles.aboutUsPage}>
      <section className={styles.hero}>
        <div className="container">
          <h1>SOBRE NOSOTROS</h1>
          <p>
            La historia de Franky Crew: Pasión por la moda urbana y la cultura
            hip-hop.
          </p>
        </div>
      </section>

      <section className={styles.contentSection}>
        <div className="container">
          <div className={styles.textBlock}>
            <h2>Nuestra Misión</h2>
            <p>
              En Franky Crew, no solo vendemos ropa; creamos una declaración.
              Nuestra misión es empoderar a la comunidad urbana a través de
              prendas que reflejan autenticidad, creatividad y un espíritu
              indomable. Creemos que la moda es una forma de expresión, y cada
              pieza que diseñamos cuenta una historia.
            </p>
            <p>
              Desde nuestros inicios, nos hemos dedicado a fusionar la alta
              calidad con diseños innovadores, inspirados en el arte callejero,
              la música y la energía de la ciudad. Cada costura, cada estampado,
              está pensado para aquellos que viven la vida a su propio ritmo.
            </p>
          </div>
          <div className={styles.imageBlock}>
            <img
              src="/placeholder.svg?height=400&width=600"
              alt="Equipo Franky Crew"
            />
          </div>
        </div>
      </section>

      <section className={styles.contentSection}>
        <div className="container">
          <div className={styles.imageBlock}>
            <img
              src="/placeholder.svg?height=400&width=600"
              alt="Arte Urbano"
            />
          </div>
          <div className={styles.textBlock}>
            <h2>Nuestra Inspiración</h2>
            <p>
              La cultura hip-hop es el corazón de Franky Crew. Nos inspira su
              audacia, su capacidad de transformar lo ordinario en
              extraordinario y su mensaje de autoexpresión. Cada colección es un
              tributo a los pioneros y a la nueva generación que sigue
              redefiniendo el estilo urbano.
            </p>
            <p>
              Trabajamos con artistas locales y diseñadores emergentes para
              asegurar que nuestras prendas no solo sean moda, sino también
              arte. Nos enorgullece ser parte del movimiento que celebra la
              individualidad y la creatividad sin límites.
            </p>
          </div>
        </div>
      </section>

      <section className={styles.callToAction}>
        <div className="container">
          <h2>Únete a la Familia Franky</h2>
          <p>
            Sé parte de nuestra historia. Descubre nuestras colecciones y
            expresa tu estilo.
          </p>
          <a href="/products" className={styles.ctaButton}>
            Ver Productos
          </a>
        </div>
      </section>
    </div>
  );
};
