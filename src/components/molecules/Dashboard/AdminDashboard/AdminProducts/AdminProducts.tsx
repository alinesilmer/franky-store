"use client";

import type React from "react";
import { useState } from "react";
import { PlusCircle, Edit, Trash2, Search } from "lucide-react";
import DashboardCard from "../../../../atoms/DashboardCard/DashboardCard";
import { Button } from "../../../../atoms/Button/Button";
import { Input } from "../../../../atoms/Input/Input";
import type { Product } from "../../../../../types/product";
import { DUMMY_PRODUCTS } from "../../../../../lib/auth";
import styles from "./AdminProducts.module.scss";

const AdminProducts: React.FC = () => {
  const [products, setProducts] = useState<Product[]>(DUMMY_PRODUCTS);
  const [searchTerm, setSearchTerm] = useState("");
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddProduct = () => {
    console.log("Abrir formulario para añadir producto");
    // Implement modal or form for adding product
  };

  const handleEditProduct = (product: Product) => {
    setEditingProduct(product);
    console.log("Editar producto:", product.name);
    // Implement modal or form for editing product
  };

  const handleDeleteProduct = (productId: string) => {
    if (
      window.confirm("¿Estás seguro de que quieres eliminar este producto?")
    ) {
      setProducts(products.filter((p) => p.id !== productId));
      console.log("Producto eliminado:", productId);
    }
  };

  return (
    <div className={styles.adminProducts}>
      <h1 className={styles.pageTitle}>Gestión de Productos</h1>
      <p className={styles.pageSubtitle}>
        Administra tu inventario de productos, edita, elimina o añade nuevos.
      </p>

      <DashboardCard className={styles.productsOverviewCard}>
        <div className={styles.cardHeader}>
          <div className={styles.searchBar}>
            <Search size={20} className={styles.searchIcon} />
            <Input
              type="text"
              placeholder="Buscar productos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              aria-label="Buscar productos"
            />
          </div>
          <Button onClick={handleAddProduct} variant="primary" size="md">
            <PlusCircle size={18} /> Añadir Nuevo Producto
          </Button>
        </div>

        <div className={styles.productsTableContainer}>
          <table className={styles.productsTable}>
            <thead>
              <tr>
                <th>Imagen</th>
                <th>Nombre</th>
                <th>Precio</th>
                <th>Talles</th>
                <th>Colores</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.length > 0 ? (
                filteredProducts.map((product) => (
                  <tr key={product.id}>
                    <td>
                      <img
                        src={product.image || "/placeholder.svg"}
                        alt={product.name}
                        className={styles.productImage}
                      />
                    </td>
                    <td>{product.name}</td>
                    <td>${product.price.toFixed(2)}</td>
                    <td>
                      {product.sizes?.length ? product.sizes.join(", ") : "—"}
                    </td>

                    <td className={styles.colorSwatches}>
                      {product.colors?.length
                        ? product.colors.map((color, idx) => (
                            <span
                              key={idx}
                              className={styles.colorSwatch}
                              style={{ backgroundColor: color }}
                              title={color}
                            />
                          ))
                        : "—"}
                    </td>
                    <td>
                      <div className={styles.actions}>
                        <Button
                          variant="secondary"
                          size="sm"
                          onClick={() => handleEditProduct(product)}
                        >
                          <Edit size={16} />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDeleteProduct(product.id)}
                        >
                          <Trash2 size={16} />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className={styles.noResults}>
                    No se encontraron productos.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </DashboardCard>

      {/* Placeholder for Edit/Add Product Modal/Form */}
      {editingProduct && (
        <div className={styles.editProductModal}>
          <h3>Editar {editingProduct.name}</h3>
          {/* Form fields for editing */}
          <Button onClick={() => setEditingProduct(null)}>Cerrar</Button>
        </div>
      )}
    </div>
  );
};

export default AdminProducts;
