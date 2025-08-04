"use client";

import type React from "react";
import { useRef } from "react";
import { Button } from "../../../components/atoms/Button/Button";
import OwnerCard from "../../../components/molecules/OwnerCard/OwnerCard";
import styles from "./AboutUs.module.scss";
import { Link } from "react-router-dom";
import FrankyStore from "../../../assets/videos/frankystore.mp4";
import Owner from "../../../assets/images/Owner.png";
import PricingPlansSection from "../../../components/molecules/PricingPlanSection/PricingPlanSection";
import Innovation from "../../../assets/images/innovacion.jpg";
import Community from "../../../assets/images/comunidad.jpg";
import Vision from "../../../assets/images/vision.jpg";

interface Member {
  src: string;
  username: string;
}

interface ValueItem {
  title: string;
  text: string;
  image: string;
}

export const AboutUs: React.FC = () => {
  const galleryRef = useRef<HTMLDivElement>(null);

  const values: ValueItem[] = [
    {
      title: "Visión",
      text: "Ser el referente global en moda urbana, inspirando autenticidad y autoexpresión a través de diseños innovadores y una comunidad vibrante.",
      image: Vision,
    },
    {
      title: "Innovación",
      text: "Constantemente buscamos nuevas tendencias y tecnologías para ofrecer prendas únicas que definan el futuro del streetwear.",
      image: Innovation,
    },
    {
      title: "Comunidad",
      text: "Fomentamos un espacio donde la individualidad se celebra y las conexiones se fortalecen, construyendo una tribu unida por el estilo.",
      image: Community,
    },
  ];

  // Lista de miembros de la comunidad
  const members: Member[] = [
    {
      src: "https://i.pinimg.com/736x/cb/7c/d7/cb7cd7900b0a57889aa4758a7fe353bb.jpg",
      username: "@camiperez12",
    },
    {
      src: "https://i.pinimg.com/1200x/71/a0/9c/71a09c030af34c1982231916605f872a.jpg",
      username: "@gonza_victor",
    },
    {
      src: "https://i.pinimg.com/1200x/88/4e/8f/884e8f4af6e57462542c9ceba14a8e1b.jpg",
      username: "@analima",
    },
    {
      src: "https://i.pinimg.com/736x/32/7e/14/327e14904add507b7273d4c32d420264.jpg",
      username: "@lopezsanti_",
    },
    {
      src: "https://i.pinimg.com/736x/36/a9/1e/36a91ea8bf10221177ec67b98948fae5.jpg",
      username: "@juanchoomartinez",
    },
    {
      src: "https://i.pinimg.com/1200x/40/fd/07/40fd07df11dd0b6e77e0526dfcbc536a.jpg",
      username: "@lucianoramirez",
    },
  ];

  return (
    <div className={styles.aboutUsPage}>
      {/* Hero Section */}
      <section className={styles.heroSection}>
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>
            La Esencia de la
            <span className={styles.highlight}> Franky Crew</span>
          </h1>
          <p className={styles.heroSubtitle}>
            Más que una marca, somos un movimiento. Descubre nuestra historia,
            valores y la comunidad que nos impulsa.
          </p>
          <div className={styles.heroButtons}>
            <Link to="/products">
              <Button variant="primary" size="lg">
                Explora la Tienda
              </Button>
            </Link>
            <Link to="/auth/login">
              <Button variant="outline" size="lg">
                Únete a la Comunidad
              </Button>
            </Link>
          </div>
        </div>
        <div className={styles.heroImage}>
          <video
            src={FrankyStore}
            autoPlay
            muted
            loop
            playsInline
            className={styles.heroVideo}
          />
        </div>
      </section>

      {/* Values and Vision Section */}
      <section className={styles.valuesVisionSection}>
        <div className="container">
          <h2 className={styles.sectionHeading}>Nuestros Valores y Visión</h2>

          <div className={styles.valuesGrid}>
            {values.map((val) => (
              <div key={val.title} className={styles.valueCard}>
                <div className={styles.valueMedia}>
                  <img
                    src={val.image}
                    alt={`Imagen ${val.title}`}
                    loading="lazy"
                  />
                </div>
                <h3>{val.title}</h3>
                <p>{val.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* History Section */}
      <section className={styles.historySection}>
        <div className={styles.container}>
          <div className={styles.topSection}>
            <h2 className={styles.sectionHeading}>
              La Historia de Franky Store
            </h2>

            <div className={styles.historyWrapper}>
              {/* LEFT: Description */}
              <p className={styles.historyText}>
                Franky Store nació en [Año de Fundación] de un sueño en las
                calles de Corrientes, con la visión de traer la auténtica
                cultura urbana a tu armario. Lo que comenzó como una pequeña
                iniciativa, impulsada por la pasión por el hip-hop y el
                streetwear, ha crecido hasta convertirse en un referente para
                quienes buscan expresar su identidad a través de la moda. Cada
                colección es un capítulo de nuestra evolución, un reflejo de la
                energía vibrante de la ciudad y la creatividad sin límites.
              </p>
            </div>
            {/* RIGHT: OwnerCard */}
            <div className={styles.bottomSection}>
              <OwnerCard
                name="Franco 'Huevo'"
                title="Fundador"
                imageSrc={Owner}
                shortDescription="Un apasionado del streetwear y la cultura urbana, Franky fundó la tienda con la misión de fusionar moda y expresión."
                longDescription="Desde sus humildes comienzos diseñando camisetas en su garaje, Franky ha liderado Franky Crew con una visión inquebrantable. Su amor por el arte callejero, la música hip-hop y la moda auténtica se refleja en cada pieza de la colección. Cree firmemente que la ropa es una forma de arte y una extensión de la personalidad, y se dedica a empoderar a la comunidad a través del estilo."
              />
            </div>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className={styles.statsSection}>
        <div className="container">
          <div className={styles.statsGrid}>
            <div className={styles.statCard}>
              <span className={styles.statNumber}>150K+</span>
              <p className={styles.statDescription}>Clientes Satisfechos</p>
            </div>
            <div className={styles.statCard}>
              <span className={styles.statNumber}>500+</span>
              <p className={styles.statDescription}>Productos Únicos</p>
            </div>
            <div className={styles.statCard}>
              <span className={styles.statNumber}>2M+</span>
              <p className={styles.statDescription}>Envíos Realizados</p>
            </div>
            <div className={styles.statCard}>
              <span className={styles.statNumber}>800K+</span>
              <p className={styles.statDescription}>Seguidores en Instagram</p>
            </div>
          </div>
        </div>
      </section>

      {/* Join the Community Section */}
      <section className={styles.communitySection}>
        <div className="container">
          <h2 className={styles.sectionHeading}>
            Únete a Nuestra Tribu Urbana
          </h2>
          <p className={styles.communityText}>
            Más que una marca, somos una familia. Conecta con otros amantes del
            streetwear, comparte tu estilo y sé parte de la cultura Franky Crew.
            ¡Tu estilo, tu gente!
          </p>
          <div className={styles.communityGalleryWrapper}>
            <div className={styles.communityGallery} ref={galleryRef}>
              {members.map((member) => (
                <div key={member.username} className={styles.memberCard}>
                  <img
                    src={member.src}
                    alt={member.username}
                    className={styles.galleryImage}
                    loading="lazy"
                  />
                  <span className={styles.galleryUsername}>
                    {member.username}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Plans Section */}
      <PricingPlansSection />
    </div>
  );
};
