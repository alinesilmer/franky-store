"use client";

import React from "react";
import Card from "../../atoms/Card/Card";
import { Button } from "../../atoms/Button/Button";
import type { Product } from "../../../types/models";
import styles from "./ProductCard.module.scss";

interface ProductCardProps {
  product: Product;
  onEdit: (productId: string) => void;
  onDelete: (productId: string) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onEdit,
  onDelete,
}) => {
  const price =
    typeof product.price === "number"
      ? product.price
      : Number(product.price ?? 0);

  return (
    <div className={styles.productCardWrapper}>
      <Card imageSrc={product.image} imageAlt={product.name}>
        <h3 className={styles.productName}>{product.name}</h3>
        <p className={styles.productPrice}>${price.toFixed(2)}</p>
      </Card>

      <div className={styles.adminActions}>
        <Button
          variant="secondary"
          size="sm"
          onClick={() => onEdit(String(product.id))}
          aria-label={`Editar ${product.name}`}
        >
          Editar
        </Button>

        <Button
          variant="outline"
          size="sm"
          onClick={() => onDelete(String(product.id))}
          aria-label={`Eliminar ${product.name}`}
        >
          Eliminar
        </Button>
      </div>
    </div>
  );
};

export default ProductCard;
export { ProductCard };
export type { ProductCardProps };
