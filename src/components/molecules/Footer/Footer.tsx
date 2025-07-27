"use client";

import type React from "react";

import { Instagram, Facebook, Twitter, Mail } from "lucide-react";
import { Logo } from "../../atoms/Logo/Logo";
import styles from "./Footer.module.scss";

interface FooterProps {
  onNavigate: (path: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.brandInfo}>
          <Logo size="small" />
          <p>
            &copy; {new Date().getFullYear()} Franky Crew. Todos los derechos
            reservados.
          </p>
          <p>Moda urbana con actitud.</p>
        </div>

        <div className={styles.linksGroup}>
          <h3>Navegación</h3>
          <ul>
            <li>
              <a href="#" onClick={() => onNavigate("/")}>
                Inicio
              </a>
            </li>
            <li>
              <a href="#" onClick={() => onNavigate("/about-us")}>
                Nosotros
              </a>
            </li>
            <li>
              <a href="#" onClick={() => onNavigate("/products")}>
                Productos
              </a>
            </li>
            <li>
              <a href="#" onClick={() => onNavigate("/faq")}>
                FAQ
              </a>
            </li>
            <li>
              <a href="#" onClick={() => onNavigate("/contact")}>
                Contacto
              </a>
            </li>
          </ul>
        </div>

        <div className={styles.linksGroup}>
          <h3>Soporte</h3>
          <ul>
            <li>
              <a href="#" onClick={() => onNavigate("/shipping")}>
                Envíos y Devoluciones
              </a>
            </li>
            <li>
              <a href="#" onClick={() => onNavigate("/privacy")}>
                Política de Privacidad
              </a>
            </li>
            <li>
              <a href="#" onClick={() => onNavigate("/terms")}>
                Términos y Condiciones
              </a>
            </li>
          </ul>
        </div>

        <div className={styles.socialMedia}>
          <h3>Síguenos</h3>
          <div className={styles.socialIcons}>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
            >
              <Instagram size={24} />
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
            >
              <Facebook size={24} />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Twitter"
            >
              <Twitter size={24} />
            </a>
            <a
              href="mailto:info@frankycrew.com"
              aria-label="Correo Electrónico"
            >
              <Mail size={24} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
