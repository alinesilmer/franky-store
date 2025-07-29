"use client";

import { Button } from "../../../components/atoms/Button/Button";

import type React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../../../components/molecules/Dashboard/DashboardLayout/DashboardLayout";
import DashboardCard from "../../../components/atoms/DashboardCard/DashboardCard";
import ProductCard from "../../../components/molecules/ProductCard/ProductCard";
import { DUMMY_PRODUCTS } from "../../../lib/auth";
import styles from "./Dashboard.module.scss";

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const [userRole, setUserRole] = useState<string | null>(null);
  const [userName, setUserName] = useState<string>("Usuario"); // Placeholder
  const [userEmail, setUserEmail] = useState<string>("usuario@example.com"); // Placeholder

  useEffect(() => {
    const role = localStorage.getItem("userRole");
    const storedUserName = localStorage.getItem("userName") || "Usuario";
    const storedUserEmail =
      localStorage.getItem("userEmail") || "usuario@example.com";

    if (!role) {
      navigate("/auth/login");
    } else {
      setUserRole(role);
      setUserName(storedUserName);
      setUserEmail(storedUserEmail);
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("userRole");
    localStorage.removeItem("userName");
    localStorage.removeItem("userEmail");
    navigate("/auth/login");
  };

  const handleEditProduct = (productId: string) => {
    console.log(`Editar producto: ${productId}`);
    // Implement actual edit logic or navigate to edit page
  };

  const handleDeleteProduct = (productId: string) => {
    console.log(`Eliminar producto: ${productId}`);
    // Implement actual delete logic
  };

  if (!userRole) {
    return (
      <div className={styles.loadingPage}>
        <div className={styles.loading}>Cargando dashboard...</div>
      </div>
    );
  }

  return (
    <DashboardLayout
      userRole={userRole}
      userName={userName}
      userEmail={userEmail}
      onLogout={handleLogout}
    >
      <h1 className={styles.pageTitle}>
        Panel de Control de {userRole === "admin" ? "Administrador" : "Cliente"}
      </h1>

      {userRole === "admin" && (
        <section className={styles.adminSection}>
          <DashboardCard title="Gestión de Productos">
            <p className={styles.sectionDescription}>
              Añadir, editar o eliminar productos de tu inventario.
            </p>
            <div className={styles.productManagementGrid}>
              {DUMMY_PRODUCTS.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onEdit={handleEditProduct}
                  onDelete={handleDeleteProduct}
                />
              ))}
            </div>
          </DashboardCard>

          <div className={styles.adminStatsGrid}>
            <DashboardCard title="Estadísticas de Ventas">
              <p>Gráfico de ventas aquí...</p>
              {/* Placeholder for a sales chart */}
              <div className={styles.placeholderChart}></div>
            </DashboardCard>
            <DashboardCard title="Nuevos Pedidos">
              <ul className={styles.orderList}>
                <li>Pedido #1001 - Pendiente</li>
                <li>Pedido #1002 - Procesando</li>
                <li>Pedido #1003 - Enviado</li>
              </ul>
            </DashboardCard>
          </div>
        </section>
      )}

      {userRole === "client" && (
        <section className={styles.clientSection}>
          <DashboardCard title="Mis Pedidos">
            <p className={styles.sectionDescription}>
              Aquí puedes ver el historial y el estado de tus pedidos.
            </p>
            <div className={styles.orderHistory}>
              <div className={styles.orderItem}>
                <h3>Pedido #2023001</h3>
                <p>Fecha: 15/07/2023</p>
                <p>Total: $85.00</p>
                <p>
                  Estado: <span className={styles.statusShipped}>Enviado</span>
                </p>
                <ul>
                  <li>1 x Camiseta "Graffiti Vibes"</li>
                  <li>1 x Gorra "Street King"</li>
                </ul>
              </div>
              <div className={styles.orderItem}>
                <h3>Pedido #2023002</h3>
                <p>Fecha: 20/07/2023</p>
                <p>Total: $55.00</p>
                <p>
                  Estado:{" "}
                  <span className={styles.statusDelivered}>Entregado</span>
                </p>
                <ul>
                  <li>1 x Sudadera "Urban Flow"</li>
                </ul>
              </div>
            </div>
          </DashboardCard>

          <DashboardCard title="Mi Perfil">
            <p className={styles.sectionDescription}>
              Gestiona la información de tu cuenta.
            </p>
            <div className={styles.profileInfo}>
              <p>
                <strong>Nombre:</strong> {userName}
              </p>
              <p>
                <strong>Email:</strong> {userEmail}
              </p>
              <Button variant="secondary" size="sm">
                Editar Perfil
              </Button>
            </div>
          </DashboardCard>
        </section>
      )}
    </DashboardLayout>
  );
};

export default Dashboard;
