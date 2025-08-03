"use client";

import type React from "react";
import { useState } from "react";
import { Search, Eye, Truck, CheckCircle } from "lucide-react";
import DashboardCard from "../../../../atoms/DashboardCard/DashboardCard";
import { Input } from "../../../../atoms/Input/Input";
import { Button } from "../../../../atoms/Button/Button";
import styles from "./AdminOrders.module.scss";

interface Order {
  id: string;
  customerName: string;
  customerEmail: string;
  date: string;
  total: number;
  status: "Pendiente" | "Procesando" | "Enviado" | "Entregado" | "Cancelado";
  items: { name: string; qty: number; price: number }[];
}

const DUMMY_ORDERS: Order[] = [
  {
    id: "#1001",
    customerName: "Juan Pérez",
    customerEmail: "juan.perez@example.com",
    date: "2024-07-28",
    total: 125.5,
    status: "Pendiente",
    items: [{ name: "Camiseta 'Graffiti Vibes'", qty: 1, price: 35.0 }],
  },
  {
    id: "#1002",
    customerName: "Ana Gómez",
    customerEmail: "ana.gomez@example.com",
    date: "2024-07-27",
    total: 80.0,
    status: "Procesando",
    items: [{ name: "Sudadera 'Urban Flow'", qty: 1, price: 55.0 }],
  },
  {
    id: "#1003",
    customerName: "Luis Fernández",
    customerEmail: "luis.f@example.com",
    date: "2024-07-26",
    total: 210.75,
    status: "Enviado",
    items: [
      { name: "Pantalón Cargo 'Explorer'", qty: 1, price: 65.0 },
      { name: "Chaqueta 'Bomber Style'", qty: 1, price: 85.0 },
    ],
  },
  {
    id: "#1004",
    customerName: "Sofía Ruiz",
    customerEmail: "sofia.r@example.com",
    date: "2024-07-25",
    total: 45.0,
    status: "Entregado",
    items: [{ name: "Gorra 'Street King'", qty: 1, price: 25.0 }],
  },
  {
    id: "#1005",
    customerName: "Pedro Sánchez",
    customerEmail: "pedro.s@example.com",
    date: "2024-07-24",
    total: 99.99,
    status: "Cancelado",
    items: [{ name: "Zapatillas 'High Top'", qty: 1, price: 95.0 }],
  },
];

const AdminOrders: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>(DUMMY_ORDERS);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("Todos");

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customerEmail.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      filterStatus === "Todos" || order.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const handleUpdateStatus = (orderId: string, newStatus: Order["status"]) => {
    setOrders(
      orders.map((order) =>
        order.id === orderId ? { ...order, status: newStatus } : order
      )
    );
    console.log(`Pedido ${orderId} actualizado a: ${newStatus}`);
  };

  const handleViewDetails = (order: Order) => {
    console.log("Ver detalles del pedido:", order);
    // Implement modal or new page for order details
  };

  return (
    <div className={styles.adminOrders}>
      <h1 className={styles.pageTitle}>Gestión de Pedidos</h1>
      <p className={styles.pageSubtitle}>
        Administra y rastrea todos los pedidos de tus clientes.
      </p>

      <DashboardCard className={styles.ordersOverviewCard}>
        <div className={styles.cardHeader}>
          <div className={styles.searchFilterGroup}>
            <div className={styles.searchBar}>
              <Search size={20} className={styles.searchIcon} />
              <Input
                type="text"
                placeholder="Buscar por ID, cliente o email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                aria-label="Buscar pedidos"
              />
            </div>
            <select
              className={styles.statusFilter}
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              aria-label="Filtrar por estado"
            >
              <option value="Todos">Todos los estados</option>
              <option value="Pendiente">Pendiente</option>
              <option value="Procesando">Procesando</option>
              <option value="Enviado">Enviado</option>
              <option value="Entregado">Entregado</option>
              <option value="Cancelado">Cancelado</option>
            </select>
          </div>
        </div>

        <div className={styles.ordersTableContainer}>
          <table className={styles.ordersTable}>
            <thead>
              <tr>
                <th>ID Pedido</th>
                <th>Cliente</th>
                <th>Fecha</th>
                <th>Total</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.length > 0 ? (
                filteredOrders.map((order) => (
                  <tr key={order.id}>
                    <td>{order.id}</td>
                    <td>
                      <p className={styles.customerName}>
                        {order.customerName}
                      </p>
                      <span className={styles.customerEmail}>
                        {order.customerEmail}
                      </span>
                    </td>
                    <td>{order.date}</td>
                    <td>${order.total.toFixed(2)}</td>
                    <td>
                      <span
                        className={`${styles.orderStatusBadge} ${
                          styles[order.status.toLowerCase()]
                        }`}
                      >
                        {order.status}
                      </span>
                    </td>
                    <td>
                      <div className={styles.actions}>
                        <Button
                          variant="secondary"
                          size="sm"
                          onClick={() => handleViewDetails(order)}
                        >
                          Ver Detalles
                          <Eye size={16} />
                        </Button>
                        {order.status === "Pendiente" && (
                          <Button
                            variant="primary"
                            size="sm"
                            onClick={() =>
                              handleUpdateStatus(order.id, "Procesando")
                            }
                          >
                            Marcar como Procesando
                            <Truck size={16} />
                          </Button>
                        )}
                        {order.status === "Procesando" && (
                          <Button
                            variant="primary"
                            size="sm"
                            onClick={() =>
                              handleUpdateStatus(order.id, "Enviado")
                            }
                          >
                            Marcar como Enviado
                            <Truck size={16} />
                          </Button>
                        )}
                        {order.status === "Enviado" && (
                          <Button
                            variant="primary"
                            size="sm"
                            onClick={() =>
                              handleUpdateStatus(order.id, "Entregado")
                            }
                          >
                            Marcar como Entregado
                            <CheckCircle size={16} />
                          </Button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className={styles.noResults}>
                    No se encontraron pedidos.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </DashboardCard>
    </div>
  );
};

export default AdminOrders;
