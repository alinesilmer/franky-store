"use client";
import type React from "react";
import { useState } from "react";
import { Button } from "../../../../components/atoms/Button/Button";
import DashboardCard from "../../../../components/atoms/DashboardCard/DashboardCard";
import ProductCard from "../../../../components/molecules/ProductCard/ProductCard";
import { DUMMY_PRODUCTS } from "../../../../lib/auth";
import {
  BarChart3,
  TrendingUp,
  Package,
  ShoppingCart,
  Users,
  DollarSign,
} from "lucide-react";
import styles from "./AdminDashboard.module.scss";

interface AdminDashboardProps {
  userName: string;
  userEmail: string;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ userName }) => {
  const [selectedTimeframe, setSelectedTimeframe] = useState<
    "week" | "month" | "year"
  >("month");

  const handleEditProduct = (productId: string) => {
    console.log(`Editar producto: ${productId}`);
  };

  const handleDeleteProduct = (productId: string) => {
    console.log(`Eliminar producto: ${productId}`);
  };

  const handleAddProduct = () => {
    console.log("Añadir nuevo producto");
  };

  const statsData = [
    {
      title: "Ventas Totales",
      value: "$12,847",
      change: "+12.5%",
      icon: DollarSign,
      trend: "up",
    },
    {
      title: "Pedidos",
      value: "156",
      change: "+8.2%",
      icon: ShoppingCart,
      trend: "up",
    },
    {
      title: "Productos",
      value: "89",
      change: "+2.1%",
      icon: Package,
      trend: "up",
    },
    {
      title: "Clientes",
      value: "1,247",
      change: "+15.3%",
      icon: Users,
      trend: "up",
    },
  ];

  const recentOrders = [
    {
      id: "#1001",
      customer: "María García",
      status: "Pendiente",
      amount: "$85.00",
      date: "2024-01-15",
    },
    {
      id: "#1002",
      customer: "Carlos López",
      status: "Procesando",
      amount: "$120.50",
      date: "2024-01-15",
    },
    {
      id: "#1003",
      customer: "Ana Martínez",
      status: "Enviado",
      amount: "$67.25",
      date: "2024-01-14",
    },
    {
      id: "#1004",
      customer: "Luis Rodríguez",
      status: "Entregado",
      amount: "$95.75",
      date: "2024-01-14",
    },
    {
      id: "#1005",
      customer: "Sofia Hernández",
      status: "Pendiente",
      amount: "$156.00",
      date: "2024-01-13",
    },
  ];

  return (
    <div className={styles.adminDashboard}>
      <div className={styles.dashboardHeader}>
        <div className={styles.welcomeSection}>
          <h1 className={styles.pageTitle}>Panel de Administrador</h1>
          <p className={styles.welcomeText}>Bienvenido de vuelta, {userName}</p>
        </div>
        <div className={styles.timeframeSelector}>
          {(["week", "month", "year"] as const).map((timeframe) => (
            <button
              key={timeframe}
              className={`${styles.timeframeBtn} ${
                selectedTimeframe === timeframe ? styles.active : ""
              }`}
              onClick={() => setSelectedTimeframe(timeframe)}
            >
              {timeframe === "week"
                ? "Semana"
                : timeframe === "month"
                ? "Mes"
                : "Año"}
            </button>
          ))}
        </div>
      </div>

      <section className={styles.statsSection}>
        <div className={styles.statsGrid}>
          {statsData.map((stat, index) => (
            <DashboardCard key={index} className={styles.statCard}>
              <div className={styles.statHeader}>
                <div className={styles.statIcon}>
                  <stat.icon size={24} />
                </div>
                <div className={styles.statChange}>
                  <TrendingUp size={16} />
                  <span>{stat.change}</span>
                </div>
              </div>
              <div className={styles.statContent}>
                <h3 className={styles.statValue}>{stat.value}</h3>
                <p className={styles.statTitle}>{stat.title}</p>
              </div>
            </DashboardCard>
          ))}
        </div>
      </section>

      <section className={styles.mainContent}>
        <div className={styles.contentGrid}>
          <div className={styles.leftColumn}>
            <DashboardCard
              title="Gestión de Productos"
              className={styles.productsCard}
            >
              <div className={styles.cardActions}>
                <p className={styles.sectionDescription}>
                  Administra tu inventario de productos
                </p>
                <Button variant="primary" size="sm" onClick={handleAddProduct}>
                  Añadir Producto
                </Button>
              </div>
              <div className={styles.productGrid}>
                {DUMMY_PRODUCTS.slice(0, 4).map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onEdit={handleEditProduct}
                    onDelete={handleDeleteProduct}
                  />
                ))}
              </div>
              <div className={styles.viewAllProducts}>
                <Button variant="outline" size="sm">
                  Ver Todos los Productos
                </Button>
              </div>
            </DashboardCard>

            <DashboardCard
              title="Análisis de Ventas"
              className={styles.analyticsCard}
            >
              <div className={styles.chartContainer}>
                <div className={styles.chartPlaceholder}>
                  <BarChart3 size={48} />
                  <p>Gráfico de ventas por {selectedTimeframe}</p>
                </div>
              </div>
            </DashboardCard>
          </div>

          <div className={styles.rightColumn}>
            <DashboardCard
              title="Pedidos Recientes"
              className={styles.ordersCard}
            >
              <div className={styles.ordersList}>
                {recentOrders.map((order) => (
                  <div key={order.id} className={styles.orderItem}>
                    <div className={styles.orderHeader}>
                      <span className={styles.orderId}>{order.id}</span>
                      <span
                        className={`${styles.orderStatus} ${
                          styles[order.status.toLowerCase()]
                        }`}
                      >
                        {order.status}
                      </span>
                    </div>
                    <div className={styles.orderDetails}>
                      <p className={styles.customerName}>{order.customer}</p>
                      <div className={styles.orderMeta}>
                        <span className={styles.orderAmount}>
                          {order.amount}
                        </span>
                        <span className={styles.orderDate}>{order.date}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className={styles.viewAllOrders}>
                <Button variant="outline" size="sm">
                  Ver Todos los Pedidos
                </Button>
              </div>
            </DashboardCard>

            <DashboardCard
              title="Actividad Reciente"
              className={styles.activityCard}
            >
              <div className={styles.activityList}>
                <div className={styles.activityItem}>
                  <div className={styles.activityIcon}>
                    <Package size={16} />
                  </div>
                  <div className={styles.activityContent}>
                    <p>Nuevo producto añadido</p>
                    <span>Hace 2 horas</span>
                  </div>
                </div>
                <div className={styles.activityItem}>
                  <div className={styles.activityIcon}>
                    <ShoppingCart size={16} />
                  </div>
                  <div className={styles.activityContent}>
                    <p>Pedido #1005 creado</p>
                    <span>Hace 4 horas</span>
                  </div>
                </div>
                <div className={styles.activityItem}>
                  <div className={styles.activityIcon}>
                    <Users size={16} />
                  </div>
                  <div className={styles.activityContent}>
                    <p>Nuevo cliente registrado</p>
                    <span>Hace 6 horas</span>
                  </div>
                </div>
              </div>
            </DashboardCard>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AdminDashboard;
