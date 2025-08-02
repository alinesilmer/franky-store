"use client";

import type React from "react";
import { useEffect, useMemo, useRef, useState } from "react";
import { Search, Menu, X, User, ShoppingCart, Heart } from "lucide-react";
import { Logo } from "../../../atoms/Logo/Logo";
import { Input } from "../../../atoms/Input/Input";
import styles from "./Navbar.module.scss";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { DUMMY_PRODUCTS } from "../../../../lib/auth"; // ⬅️ ajusta si es necesario
import type { Product } from "../../../../types/product";

export const Navbar: React.FC = () => {
  const navigate = useNavigate();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const menuRef = useRef<HTMLDivElement | null>(null);
  const searchRef = useRef<HTMLDivElement | null>(null);

  // TODO: reemplazar por tu estado real de autenticación
  const isLogged = false;
  const userTarget = isLogged ? "/auth/dashboard" : "/auth/login";

  const closeMenu = () => setIsMenuOpen(false);

  // Live filtering of mock data
  const results: Product[] = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return [];
    return DUMMY_PRODUCTS.filter((p) => {
      const inName = p.name.toLowerCase().includes(q);
      const inDesc = p.description.toLowerCase().includes(q);
      return inName || inDesc;
    }).slice(0, 6);
  }, [searchQuery]);

  // Close on ESC + lock body scroll while menu is open
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (isMenuOpen) closeMenu();
        else if (isSearchOpen) setIsSearchOpen(false);
      }
    };
    document.addEventListener("keydown", onKey);

    const prevOverflow = document.body.style.overflow;
    if (isMenuOpen) document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow || "";
    };
  }, [isMenuOpen, isSearchOpen]);

  // Close search when clicking outside
  useEffect(() => {
    if (!isSearchOpen) return;
    const onDown = (e: MouseEvent) => {
      if (!searchRef.current) return;
      if (!searchRef.current.contains(e.target as Node)) {
        setIsSearchOpen(false);
      }
    };
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, [isSearchOpen]);

  // Focus input when opening search
  useEffect(() => {
    if (!isSearchOpen) return;
    const input = searchRef.current?.querySelector("input") as
      | HTMLInputElement
      | undefined;
    input?.focus();
  }, [isSearchOpen]);

  const handleSearch = () => {
    const q = searchQuery.trim();
    if (!q) return;
    setIsSearchOpen(false);
    navigate(`/products?q=${encodeURIComponent(q)}`);
    window.scrollTo(0, 0);
  };

  const handleSelectProduct = (p: Product) => {
    setIsSearchOpen(false);
    // Navega con un parámetro claro. En tu página /products podés leer productId o q.
    navigate(
      `/products?productId=${encodeURIComponent(p.id)}&q=${encodeURIComponent(
        searchQuery.trim()
      )}`
    );
    window.scrollTo(0, 0);
  };

  const handleNavLinkClick = (path: string) => {
    closeMenu();
    navigate(path);
    window.scrollTo(0, 0);
  };

  const menuVariants = {
    hidden: { x: "100%" },
    visible: {
      x: "0%",
      transition: { type: "spring", stiffness: 100, damping: 20 } as const,
    },
    exit: {
      x: "100%",
      transition: { duration: 0.25 },
    },
  };

  return (
    <nav className={styles.navbar}>
      {/* Left: búsqueda */}
      <div
        className={`${styles.leftSection} ${
          isSearchOpen ? styles.searchOpen : ""
        }`}
        ref={searchRef}
      >
        {!isSearchOpen && (
          <button
            className={styles.iconButton}
            onClick={() => setIsSearchOpen(true)}
            aria-label="Abrir búsqueda"
            type="button"
          >
            <Search size={24} />
          </button>
        )}

        <AnimatePresence initial={false}>
          {isSearchOpen && (
            <motion.div
              key="searchbar"
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: "min(520px, 72vw)", opacity: 1 }}
              exit={{ width: 0, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className={styles.searchContainer}
              role="search"
            >
              <Input
                type="text"
                placeholder="Buscar productos..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                className={styles.searchInput}
                aria-label="Buscar productos"
              />
              <button
                className={styles.searchButton}
                onClick={handleSearch}
                type="button"
                aria-label="Buscar"
              >
                <Search size={20} />
              </button>

              {/* Results */}
              <AnimatePresence initial={false}>
                {results.length > 0 && (
                  <motion.ul
                    key="results"
                    className={styles.searchResults}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 6 }}
                    transition={{ duration: 0.15 }}
                    role="listbox"
                  >
                    {results.map((p) => (
                      <li key={p.id}>
                        <button
                          type="button"
                          className={styles.resultItem}
                          onClick={() => handleSelectProduct(p)}
                          aria-label={`Ver ${p.name}`}
                        >
                          <img src={p.image} alt="" aria-hidden="true" />
                          <div className={styles.resultTexts}>
                            <span className={styles.resultName}>{p.name}</span>
                            <span className={styles.resultPrice}>
                              ${p.price.toFixed(2)}
                            </span>
                          </div>
                        </button>
                      </li>
                    ))}
                    <li className={styles.viewAllRow}>
                      <button
                        type="button"
                        className={styles.viewAllBtn}
                        onClick={handleSearch}
                      >
                        Ver todos los resultados
                      </button>
                    </li>
                  </motion.ul>
                )}
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Logo */}
      <Link to="/" className={styles.logoLink} aria-label="Ir al inicio">
        <Logo size="medium" />
      </Link>

      {/* Right: iconos + menú */}
      <div className={styles.rightSection}>
        {isLogged ? (
          <>
            <Link
              to="/cart"
              className={styles.iconButton}
              aria-label="Carrito de Compras"
            >
              <ShoppingCart size={24} />
            </Link>

            <Link
              to={userTarget}
              className={styles.iconButton}
              aria-label="Mi Cuenta"
            >
              <User size={24} />
            </Link>

            <Link
              to="/favorites"
              className={styles.iconButton}
              aria-label="Favoritos"
            >
              <Heart size={24} />
            </Link>
          </>
        ) : (
          <Link
            to={userTarget}
            className={styles.iconButton}
            aria-label="Mi Cuenta"
          >
            <User size={24} />
          </Link>
        )}

        <button
          className={styles.iconButton}
          onClick={() => setIsMenuOpen(true)}
          aria-label="Abrir Menú"
          type="button"
        >
          <Menu size={24} />
        </button>
      </div>

      {/* Backdrop + Menú móvil */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            <motion.button
              type="button"
              aria-label="Cerrar menú"
              className={styles.backdrop}
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={closeMenu}
            />

            <motion.div
              ref={menuRef}
              className={styles.mobileMenu}
              role="dialog"
              aria-modal="true"
              aria-label="Menú de navegación"
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={menuVariants}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className={styles.closeMenuButton}
                onClick={closeMenu}
                aria-label="Cerrar Menú"
                type="button"
              >
                <X size={28} />
              </button>

              <ul className={styles.menuList}>
                <li>
                  <button onClick={() => handleNavLinkClick("/")}>
                    Inicio
                  </button>
                </li>
                <li>
                  <button onClick={() => handleNavLinkClick("/about-us")}>
                    Nosotros
                  </button>
                </li>
                <li>
                  <button onClick={() => handleNavLinkClick("/products")}>
                    Productos
                  </button>
                </li>
                <li>
                  <button onClick={() => handleNavLinkClick("/faq")}>
                    FAQ
                  </button>
                </li>
                <li>
                  <button onClick={() => handleNavLinkClick("/contact")}>
                    Contacto
                  </button>
                </li>
                <li>
                  <button onClick={() => handleNavLinkClick(userTarget)}>
                    Mi Cuenta
                  </button>
                </li>
              </ul>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
};
