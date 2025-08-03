"use client";

import type React from "react";
import { useState } from "react";
import { Search, Eye, Download } from "lucide-react";
import DashboardCard from "../../../../atoms/DashboardCard/DashboardCard";
import { Input } from "../../../../atoms/Input/Input";
import { Button } from "../../../../atoms/Button/Button";
import styles from "./ClientOrders.module.scss";

interface Order {
  id: string;
  date: string;
  total: number;
  status: "Pendiente" | "Procesando" | "Enviado" | "Entregado" | "Cancelado";
  items: { name: string; qty: number; price: number }[];
}

const DUMMY_CLIENT_ORDERS: Order[] = [
  {
    id: "#2024001",
    date: "2024-07-28",
    total: 85.0,
    status: "Enviado",
    items: [
      { name: "Camiseta 'Graffiti Vibes'", qty: 1, price: 35.0 },
      { name: "Gorra 'Street King'", qty: 1, price: 25.0 },
    ],
  },
  {
    id: "#2024002",
    date: "2024-07-25",
    total: 55.0,
    status: "Entregado",
    items: [{ name: "Sudadera 'Urban Flow'", qty: 1, price: 55.0 }],
  },
  {
    id: "#2024003",
    date: "2024-07-20",
    total: 120.0,
    status: "Pendiente",
    items: [
      { name: "Chaqueta 'Bomber Style'", qty: 1, price: 85.0 },
      { name: "Zapatillas 'High Top'", qty: 1, price: 95.0 },
    ],
  },
  {
    id: "#2024004",
    date: "2024-07-15",
    total: 45.0,
    status: "Entregado",
    items: [{ name: "Pantalón Cargo 'Explorer'", qty: 1, price: 65.0 }],
  },
  {
    id: "#2024005",
    date: "2024-07-10",
    total: 99.99,
    status: "Cancelado",
    items: [{ name: "Remera 'Vibras Veraniegas'", qty: 1, price: 28.0 }],
  },
];

const ClientOrders: React.FC = () => {
  const [orders] = useState<Order[]>(DUMMY_CLIENT_ORDERS);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("Todos");

  const filteredOrders = orders.filter((order) => {
    const matchesSearch = order.id
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesStatus =
      filterStatus === "Todos" || order.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const handleViewDetails = (order: Order) => {
    console.log("Ver detalles del pedido:", order);
    // Implement modal or new page for order details
  };

  const handleDownloadInvoice = (orderId: string) => {
    console.log("Descargar factura para pedido:", orderId);
    // Simulate file download
    alert(`Factura para el pedido ${orderId} descargada.`);
  };

  return (
    <div className={styles.clientOrders}>
      <h1 className={styles.pageTitle}>Mis Pedidos</h1>
      <p className={styles.pageSubtitle}>
        Consulta el historial y el estado de tus compras.
      </p>

      <DashboardCard className={styles.ordersOverviewCard}>
        <div className={styles.cardHeader}>
          <div className={styles.searchFilterGroup}>
            <div className={styles.searchBar}>
              <Search size={20} className={styles.searchIcon} />
              <Input
                type="text"
                placeholder="Buscar por ID de pedido..."
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
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDownloadInvoice(order.id)}
                        >
                          Descargar Factura
                          <Download size={16} />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className={styles.noResults}>
                    No tienes pedidos registrados.
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

export default ClientOrders;
