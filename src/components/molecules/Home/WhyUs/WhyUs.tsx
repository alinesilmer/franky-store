"use client";

import React from "react";
import {
  Truck,
  ShieldCheck,
  Percent,
  LifeBuoy,
  Smile,
  Star,
} from "lucide-react";
import styles from "./WhyUs.module.scss";

interface WhyUs {
  id: number;
  image: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  title: string;
  description: string;
}

const reasons: WhyUs[] = [
  {
    id: 1,
    image:
      "https://i.pinimg.com/1200x/b6/ab/5e/b6ab5ea2810e2cbf73da946038a0f319.jpg",
    icon: Truck,
    title: "Envíos Rápidos",
    description:
      "Recibí tu compra en 24–48 hs en todo el país con seguimiento en tiempo real.",
  },
  {
    id: 2,
    image:
      "https://i.pinimg.com/736x/6b/53/3d/6b533d4bd915b2dd6e76cc77e6ac8c7f.jpg",
    icon: ShieldCheck,
    title: "Pagos Seguros",
    description:
      "Tus datos están protegidos con encriptación SSL y procesadores confiables.",
  },
  {
    id: 3,
    image:
      "https://i.pinimg.com/736x/98/b7/2b/98b72bf2b5cb52e884233fe5325a9ad2.jpg",
    icon: Percent,
    title: "Precios Competitivos",
    description:
      "Encuentra prendas de autor a los mejores precios del mercado, sin sacrificar calidad.",
  },
  {
    id: 4,
    image:
      "https://i.pinimg.com/736x/a1/c7/4a/a1c74a7de45dbed0daeb20a18ecc37c3.jpg",
    icon: LifeBuoy,
    title: "Asesoría Personalizada",
    description:
      "Te ayudamos a encontrar el outfit perfecto según tu estilo y ocasión.",
  },
  {
    id: 5,
    image:
      "https://i.pinimg.com/736x/30/9e/47/309e47a311a7e1be7e60ca734d48251b.jpg",
    icon: Smile,
    title: "Buena Vibra",
    description:
      "Fundadores apasionados que transmiten energía positiva en cada diseño.",
  },
  {
    id: 6,
    image:
      "https://i.pinimg.com/1200x/9f/36/44/9f36443e8b969ebc7dec9d9ed032cb1f.jpg",
    icon: Star,
    title: "Originalidad",
    description:
      "Colecciones únicas y auténticas, diseñadas para destacar en la calle.",
  },
];

export const WhyUs: React.FC = () => (
  <section className={styles.reasonsSection}>
    <div className={styles.container}>
      <h2 className={styles.title}>
        ¿Por qué elegir <span>Franky Store</span>?
      </h2>
      <p className={styles.subtitle}>
        Te ofrecemos lo mejor para tu estilo urbano.
      </p>

      <div className={styles.grid}>
        {reasons.map((r) => {
          const Icon = r.icon;
          return (
            <div key={r.id} className={styles.card}>
              <img src={r.image} alt={r.title} className={styles.cardImage} />
              <div className={styles.cardHeader}>
                <Icon size={32} className={styles.icon} />
                <h3 className={styles.cardTitle}>{r.title}</h3>
              </div>
              <div className={styles.overlay}>
                <p className={styles.description}>{r.description}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  </section>
);

export default WhyUs;
