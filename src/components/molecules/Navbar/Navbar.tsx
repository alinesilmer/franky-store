"use client";

import type React from "react";

import { useState } from "react";
import { Search, Menu, X, User, ShoppingCart } from "lucide-react";
import { Logo } from "../../atoms/Logo/Logo";
import { Input } from "../../atoms/Input/Input";
import styles from "./Navbar.module.scss";
import { motion, AnimatePresence } from "framer-motion";

interface NavbarProps {
  onNavigate: (path: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onNavigate }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = () => {
    if (searchQuery.trim()) {
      alert(`Buscando: ${searchQuery}`);
      // En una aplicación React real, aquí podrías redirigir usando React Router
      // o pasar la consulta de búsqueda a un componente de resultados.
    }
  };

  const menuVariants = {
    hidden: { x: "100%" },
    visible: {
      x: "0%",
      transition: { type: "spring", stiffness: 100, damping: 20 } as const,
    },
    exit: {
      x: "100%",
      transition: { duration: 0.3 },
    },
  };

  const handleNavLinkClick = (path: string) => {
    setIsMenuOpen(false);
    onNavigate(path);
  };
  return (
    <nav className={styles.navbar}>
      <div className={styles.leftSection}>
        <button
          className={styles.iconButton}
          onClick={() => setIsSearchOpen(!isSearchOpen)}
          aria-label="Buscar"
        >
          <Search size={24} />
        </button>
        <AnimatePresence>
          {isSearchOpen && (
            <motion.div
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: "auto", opacity: 1 }}
              exit={{ width: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className={styles.searchContainer}
            >
              <Input
                type="text"
                placeholder="Buscar productos..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSearch()}
                className={styles.searchInput}
              />
              <button className={styles.searchButton} onClick={handleSearch}>
                <Search size={20} />
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <a
        href="#"
        onClick={() => handleNavLinkClick("/")}
        className={styles.logoLink}
      >
        <Logo size="medium" />
      </a>

      <div className={styles.rightSection}>
        <a
          href="#"
          onClick={() => handleNavLinkClick("/auth/login")}
          className={styles.iconButton}
          aria-label="Mi Cuenta"
        >
          <User size={24} />
        </a>
        <a
          href="#"
          onClick={() => handleNavLinkClick("/cart")}
          className={styles.iconButton}
          aria-label="Carrito de Compras"
        >
          <ShoppingCart size={24} />
        </a>
        <button
          className={styles.iconButton}
          onClick={() => setIsMenuOpen(true)}
          aria-label="Abrir Menú"
        >
          <Menu size={24} />
        </button>
      </div>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className={styles.mobileMenu}
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={menuVariants}
          >
            <button
              className={styles.closeMenuButton}
              onClick={() => setIsMenuOpen(false)}
              aria-label="Cerrar Menú"
            >
              <X size={32} />
            </button>
            <ul className={styles.menuList}>
              <li>
                <a href="#" onClick={() => handleNavLinkClick("/")}>
                  Inicio
                </a>
              </li>
              <li>
                <a href="#" onClick={() => handleNavLinkClick("/about-us")}>
                  Nosotros
                </a>
              </li>
              <li>
                <a href="#" onClick={() => handleNavLinkClick("/products")}>
                  Productos
                </a>
              </li>
              <li>
                <a href="#" onClick={() => handleNavLinkClick("/faq")}>
                  FAQ
                </a>
              </li>
              <li>
                <a href="#" onClick={() => handleNavLinkClick("/contact")}>
                  Contacto
                </a>
              </li>
              <li>
                <a href="#" onClick={() => handleNavLinkClick("/auth/login")}>
                  Mi Cuenta
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
