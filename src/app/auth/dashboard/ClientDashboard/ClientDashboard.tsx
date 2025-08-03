"use client";

import type React from "react";
import { useEffect, useMemo, useState } from "react";
import {
  Package,
  Truck,
  CheckCircle,
  Clock,
  Star,
  Heart,
  ShoppingBag,
} from "lucide-react";
import DashboardCard from "../../../../components/atoms/DashboardCard/DashboardCard";
import { Button } from "../../../../components/atoms/Button/Button";
import styles from "./ClientDashboard.module.scss";

interface ClientDashboardProps {
  userName: string;
  userEmail: string;
}

type OrderStatus = "pending" | "shipped" | "delivered";
type TabKey = "all" | OrderStatus;

interface OrderItem {
  name: string;
  quantity: number;
  price: string;
}
interface Order {
  id: string;
  date: string;
  total: string;
  status: OrderStatus;
  statusText: string;
  items: OrderItem[];
  trackingNumber: string | null;
  estimatedDelivery: string;
}
interface FavoriteProduct {
  id: string;
  name: string;
  price: string;
  image: string;
}

const LS_FAVORITES_KEY = "client.favorites";

const ClientDashboard: React.FC<ClientDashboardProps> = ({
  userName,
  userEmail,
}) => {
  // prefer props, but fall back to localStorage (in case component used outside DashboardRouter)
  const displayName = userName || localStorage.getItem("userName") || "Usuario";
  const displayEmail =
    userEmail || localStorage.getItem("userEmail") || "usuario@example.com";

  const [activeTab, setActiveTab] = useState<TabKey>("all");

  const tabs: { key: TabKey; label: string }[] = [
    { key: "all", label: "Todos" },
    { key: "pending", label: "Procesando" },
    { key: "shipped", label: "Enviados" },
    { key: "delivered", label: "Entregados" },
  ];

  const orderHistory: Order[] = [
    {
      id: "#2024001",
      date: "2024-01-15",
      total: "$125.50",
      status: "delivered",
      statusText: "Entregado",
      items: [
        { name: "Camiseta 'Urban Vibes'", quantity: 1, price: "$45.00" },
        { name: "Gorra 'Street King'", quantity: 2, price: "$40.25" },
      ],
      trackingNumber: "UV123456789",
      estimatedDelivery: "2024-01-18",
    },
    {
      id: "#2024002",
      date: "2024-01-20",
      total: "$89.99",
      status: "shipped",
      statusText: "Enviado",
      items: [
        { name: "Sudadera 'Graffiti Flow'", quantity: 1, price: "$89.99" },
      ],
      trackingNumber: "UV987654321",
      estimatedDelivery: "2024-01-25",
    },
    {
      id: "#2024003",
      date: "2024-01-22",
      total: "$67.75",
      status: "pending",
      statusText: "Procesando",
      items: [{ name: "Pantalón 'City Style'", quantity: 1, price: "$67.75" }],
      trackingNumber: null,
      estimatedDelivery: "2024-01-28",
    },
  ];

  const [favorites, setFavorites] = useState<FavoriteProduct[]>(() => {
    try {
      const raw = localStorage.getItem(LS_FAVORITES_KEY);
      if (raw) return JSON.parse(raw) as FavoriteProduct[];
    } catch (err) {
      if (process.env.NODE_ENV !== "production") {
        console.warn("Failed to get favorites to localStorage:", err);
      }
    }
    return [
      {
        id: "1",
        name: "Camiseta 'Neon Dreams'",
        price: "$42.00",
        image: "/placeholder.svg?height=100&width=100",
      },
      {
        id: "2",
        name: "Chaqueta 'Urban Legend'",
        price: "$89.99",
        image: "/placeholder.svg?height=100&width=100",
      },
      {
        id: "3",
        name: "Zapatillas 'Street Runner'",
        price: "$125.00",
        image: "/placeholder.svg?height=100&width=100",
      },
    ];
  });

  useEffect(() => {
    try {
      localStorage.setItem(LS_FAVORITES_KEY, JSON.stringify(favorites));
    } catch (err) {
      if (process.env.NODE_ENV !== "production") {
        console.warn("Failed to write favorites to localStorage:", err);
      }
    }
  }, [favorites]);

  const filteredOrders = useMemo(
    () =>
      orderHistory.filter(
        (order) => activeTab === "all" || order.status === activeTab
      ),
    [activeTab]
  );

  const toggleFavorite = (id: string) => {
    setFavorites((prev) =>
      prev.some((f) => f.id === id) ? prev.filter((f) => f.id !== id) : prev
    );
  };

  const getStatusIcon = (status: OrderStatus) => {
    switch (status) {
      case "pending":
        return <Clock size={16} />;
      case "shipped":
        return <Truck size={16} />;
      case "delivered":
        return <CheckCircle size={16} />;
      default:
        return <Package size={16} />;
    }
  };

  const totalGastado = useMemo(
    () =>
      orderHistory
        .reduce(
          (sum, order) => sum + Number.parseFloat(order.total.replace("$", "")),
          0
        )
        .toFixed(2),
    []
  );

  return (
    <div className={styles.clientDashboard}>
      <div className={styles.dashboardHeader}>
        <div className={styles.welcomeSection}>
          <h1 className={styles.pageTitle}>Mi Dashboard</h1>
          <p className={styles.welcomeText}>
            ¡Hola {displayName}! Aquí tienes un resumen de tu actividad
          </p>
        </div>
        <div className={styles.quickStats}>
          <div className={styles.statItem}>
            <ShoppingBag size={20} />
            <div>
              <span className={styles.statNumber}>{orderHistory.length}</span>
              <span className={styles.statLabel}>Pedidos</span>
            </div>
          </div>
          <div className={styles.statItem}>
            <Heart size={20} />
            <div>
              <span className={styles.statNumber}>{favorites.length}</span>
              <span className={styles.statLabel}>Favoritos</span>
            </div>
          </div>
        </div>
      </div>

      <section className={styles.mainContent}>
        <div className={styles.contentGrid}>
          <div className={styles.leftColumn}>
            <DashboardCard title="Mis Pedidos" className={styles.ordersCard}>
              <div className={styles.orderTabs}>
                {tabs.map((tab) => (
                  <button
                    key={tab.key}
                    className={`${styles.tabBtn} ${
                      activeTab === tab.key ? styles.active : ""
                    }`}
                    onClick={() => setActiveTab(tab.key)}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              <div className={styles.ordersList}>
                {filteredOrders.map((order) => (
                  <div key={order.id} className={styles.orderCard}>
                    <div className={styles.orderHeader}>
                      <div className={styles.orderInfo}>
                        <h3 className={styles.orderId}>{order.id}</h3>
                        <span className={styles.orderDate}>{order.date}</span>
                      </div>
                      <div
                        className={`${styles.orderStatus} ${
                          styles[order.status]
                        }`}
                      >
                        {getStatusIcon(order.status)}{" "}
                        <span>{order.statusText}</span>
                      </div>
                    </div>

                    <div className={styles.orderItems}>
                      {order.items.map((item, index) => (
                        <div key={index} className={styles.orderItem}>
                          <span className={styles.itemName}>
                            {item.quantity}x {item.name}
                          </span>
                          <span className={styles.itemPrice}>{item.price}</span>
                        </div>
                      ))}
                    </div>

                    <div className={styles.orderFooter}>
                      <div className={styles.orderTotal}>
                        <strong>Total: {order.total}</strong>
                      </div>
                      <div className={styles.orderActions}>
                        {order.trackingNumber && (
                          <Button variant="outline" size="sm">
                            Rastrear Pedido
                          </Button>
                        )}
                        <Button variant="secondary" size="sm">
                          Ver Detalles
                        </Button>
                      </div>
                    </div>

                    {order.status === "shipped" && (
                      <div className={styles.trackingInfo}>
                        <p>
                          <strong>Número de seguimiento:</strong>{" "}
                          {order.trackingNumber}
                        </p>
                        <p>
                          <strong>Entrega estimada:</strong>{" "}
                          {order.estimatedDelivery}
                        </p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </DashboardCard>
          </div>

          <div className={styles.rightColumn}>
            <DashboardCard title="Mi Perfil" className={styles.profileCard}>
              <div className={styles.profileHeader}>
                <div className={styles.avatar}>
                  <span>{displayName.charAt(0).toUpperCase()}</span>
                </div>
                <div className={styles.profileInfo}>
                  <h3>{displayName}</h3>
                  <p>{displayEmail}</p>
                </div>
              </div>

              <div className={styles.profileStats}>
                <div className={styles.profileStat}>
                  <span className={styles.statValue}>${totalGastado}</span>
                  <span className={styles.statLabel}>Total Gastado</span>
                </div>
                <div className={styles.profileStat}>
                  <span className={styles.statValue}>
                    {orderHistory.length}
                  </span>
                  <span className={styles.statLabel}>Pedidos Realizados</span>
                </div>
              </div>

              <div className={styles.profileActions}>
                <Button variant="primary" size="sm">
                  Editar Perfil
                </Button>
                <Button variant="outline" size="sm">
                  Configuración
                </Button>
              </div>
            </DashboardCard>

            <DashboardCard
              title="Productos Favoritos"
              className={styles.favoritesCard}
            >
              <div className={styles.favoritesList}>
                {favorites.map((product) => (
                  <div key={product.id} className={styles.favoriteItem}>
                    <div className={styles.productImage}>
                      <img
                        src={product.image || "/placeholder.svg"}
                        alt={product.name}
                      />
                    </div>
                    <div className={styles.productInfo}>
                      <h4>{product.name}</h4>
                      <span className={styles.productPrice}>
                        {product.price}
                      </span>
                    </div>
                    <button
                      className={styles.favoriteBtn}
                      onClick={() => toggleFavorite(product.id)}
                      title="Quitar de favoritos"
                      aria-label={`Quitar ${product.name} de favoritos`}
                    >
                      <Heart size={16} fill="currentColor" />
                    </button>
                  </div>
                ))}
              </div>
              <div className={styles.viewAllFavorites}>
                <Button variant="outline" size="sm">
                  Ver Todos los Favoritos
                </Button>
              </div>
            </DashboardCard>

            <DashboardCard
              title="Recomendaciones"
              className={styles.recommendationsCard}
            >
              <div className={styles.recommendationsList}>
                <div className={styles.recommendationItem}>
                  <Star size={16} />
                  <div>
                    <p>Nuevos productos de temporada</p>
                    <span>Descubre las últimas tendencias</span>
                  </div>
                </div>
                <div className={styles.recommendationItem}>
                  <Package size={16} />
                  <div>
                    <p>Productos similares a tus compras</p>
                    <span>Basado en tu historial</span>
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

export default ClientDashboard;
