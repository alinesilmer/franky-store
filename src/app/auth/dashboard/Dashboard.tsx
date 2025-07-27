"use client";

import type React from "react";

import { useEffect, useState } from "react";
import { Button } from "../../../components/atoms/Button/Button";
import styles from "./Dashboard.module.scss";
import { DUMMY_PRODUCTS } from "../../../lib/auth";
import { ProductCard } from "../../../components/molecules/ProductCard/ProductCard";

interface DashboardProps {
  onNavigate: (path: string) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ onNavigate }) => {
  const [userRole, setUserRole] = useState<string | null>(null);

  useEffect(() => {
    const role = localStorage.getItem("userRole");
    if (!role) {
      onNavigate("/auth/login"); // Redirigir si no hay rol (no logueado)
    } else {
      setUserRole(role);
    }
  }, [onNavigate]);

  const handleLogout = () => {
    localStorage.removeItem("userRole");
    onNavigate("/auth/login");
  };

  if (!userRole) {
    return (
      <div className={styles.dashboardPage}>
        <div className={styles.loading}>Cargando...</div>
      </div>
    );
  }

  return (
    <div className={styles.dashboardPage}>
      <div className={styles.dashboardHeader}>
        <h1>
          Panel de Control de{" "}
          {userRole === "admin" ? "Administrador" : "Cliente"}
        </h1>
        <Button onClick={handleLogout} variant="outline">
          Cerrar Sesión
        </Button>
      </div>

      {userRole === "admin" && (
        <div className={styles.adminSection}>
          <h2>Gestión de Productos</h2>
          <p>
            Aquí el administrador puede añadir, editar o eliminar productos.
          </p>
          <div className={styles.productManagementGrid}>
            {DUMMY_PRODUCTS.map((product) => (
              <div key={product.id} className={styles.adminProductItem}>
                <ProductCard product={product} onNavigate={onNavigate} />
                <div className={styles.adminActions}>
                  <Button variant="secondary" size="sm">
                    Editar
                  </Button>
                  <Button variant="outline" size="sm">
                    Eliminar
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {userRole === "client" && (
        <div className={styles.clientSection}>
          <h2>Mis Pedidos</h2>
          <p>Aquí el cliente puede ver el historial de sus pedidos.</p>
          <div className={styles.orderHistory}>
            <div className={styles.orderItem}>
              <h3>Pedido #12345</h3>
              <p>Fecha: 15/07/2025</p>
              <p>
                Estado: <span className={styles.statusShipped}>Enviado</span>
              </p>
              <ul>
                <li>Camiseta "Graffiti Vibes" x1</li>
                <li>Gorra "Street King" x1</li>
              </ul>
              <p>Total: $60.000</p>
            </div>
            <div className={styles.orderItem}>
              <h3>Pedido #12344</h3>
              <p>Fecha: 01/07/2025</p>
              <p>
                Estado:{" "}
                <span className={styles.statusDelivered}>Entregado</span>
              </p>
              <ul>
                <li>Sudadera "Urban Flow" x1</li>
              </ul>
              <p>Total: $55.000</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
