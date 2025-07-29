"use client";

import type React from "react";
import { Link } from "react-router-dom";
import { Instagram, Mail, Phone } from "lucide-react";
import { Logo } from "../../../atoms/Logo/Logo";
import styles from "./Footer.module.scss";
import ArgentinaFlag from "../../../../assets/images/ArgentinaFlag.png";

const Footer: React.FC = () => (
  <footer className={styles.footer}>
    <div className={styles.container}>
      {/* Marca */}
      <div className={styles.brandInfo}>
        <div className={styles.logoWrapper}>
          <Logo size="medium" />
        </div>
        <h2 className={styles.title}>Franky Store</h2>
        <p className={styles.summary}>
          Franky te acompaña a romper esquemas.
          <br />
          Moda urbana con actitud.
        </p>
      </div>

      {/* Navegación */}
      <div className={styles.linksGroup}>
        <h3>Navegación</h3>
        <ul>
          <li>
            <Link to="/">Inicio</Link>
          </li>
          <li>
            <Link to="/about-us">Nosotros</Link>
          </li>
          <li>
            <Link to="/products">Productos</Link>
          </li>
          <li>
            <Link to="/faq">FAQ</Link>
          </li>
          <li>
            <Link to="/contact">Contacto</Link>
          </li>
        </ul>
      </div>

      {/* Soporte */}
      <div className={styles.linksGroup}>
        <h3>Soporte</h3>
        <ul>
          <li>
            <Link to="/shipping">Envíos y Devoluciones</Link>
          </li>
          <li>
            <Link to="/privacy">Política de Privacidad</Link>
          </li>
          <li>
            <Link to="/terms">Términos y Condiciones</Link>
          </li>
        </ul>
      </div>

      {/* Social */}
      <div className={styles.socialMedia}>
        <h3>Síguenos</h3>
        <div className={styles.socialIcons}>
          <a
            href="https://www.instagram.com/franky.store.ctes/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
          >
            <Instagram size={24} />
          </a>
          <a href="https://wa.me/3794129951" aria-label="WhatsApp">
            <Phone size={24} />
          </a>
          <a href="mailto:info@frankycrew.com" aria-label="Correo Electrónico">
            <Mail size={24} />
          </a>
        </div>
      </div>
    </div>

    {/* Sub-footer */}
    <div className={styles.subFooter}>
      <div className={styles.creditsWrapper}>
        <a
          href="https://www.instagram.com/devhorizontech/"
          className="creditsLink"
        >
          <p className={styles.credits}>
            &copy; {new Date().getFullYear()}. Desarrollado por Dev Horizon
          </p>
        </a>
      </div>
      <div className={styles.madeIn}>
        <img src={ArgentinaFlag} alt="Bandera de Argentina" />
        <span>Made in Argentina</span>
      </div>
    </div>
  </footer>
);

export default Footer;
