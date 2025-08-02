"use client";
import React, { useState } from "react";
import { CheckCircle } from "lucide-react";
import { Button } from "../../../components/atoms/Button/Button";
import styles from "./PricingPlansSection.module.scss";

interface Plan {
  id: string;
  title: string;
  price: number;
  unit: string;
  features: string[];
}

const plans: Plan[] = [
  {
    id: "basic",
    title: "Básico",
    price: 9.99,
    unit: "/mes",
    features: [
      "Soporte por email",
      "Reservas de hasta 48 hrs",
      "Envío estándar gratuito",
    ],
  },
  {
    id: "pro",
    title: "Pro",
    price: 19.99,
    unit: "/mes",
    features: [
      "Soporte prioritario 24/7",
      "Reservas de hasta 5 días",
      "Envío express gratuito",
      "5% de descuento en todas las compras",
    ],
  },
  {
    id: "premium",
    title: "Premium",
    price: 29.99,
    unit: "/mes",
    features: [
      "Acceso VIP a lanzamientos",
      "Asesor de estilo personal",
      "Envío prioritario gratuito",
      "10% de descuento en todas las compras",
      "Regalo de bienvenida exclusivo",
    ],
  },
];

export const PricingPlansSection: React.FC = () => {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);

  return (
    <section className={styles.pricingSection}>
      <div className="container">
        <header className={styles.pricingHeader}>
          <h2 className={styles.sectionHeading}>
            Tenemos más beneficios para vos
          </h2>
          <p className={styles.pricingSubtitle}>
            Desbloquea beneficios exclusivos y lleva tu experiencia al siguiente
            nivel.
          </p>
        </header>
        <div className={styles.planGrid}>
          {plans.map((plan) => {
            const isSelected = selectedPlan === plan.id;
            return (
              <div
                key={plan.id}
                className={`${styles.planCard} ${
                  isSelected ? styles.selectedPlan : ""
                }`}
                onClick={() => setSelectedPlan(plan.id)}
              >
                <div className={styles.planHeader}>
                  <h3 className={styles.planName}>{plan.title}</h3>
                  <p className={styles.planPrice}>
                    ${plan.price.toFixed(2)}
                    <span className={styles.priceUnit}>{plan.unit}</span>
                  </p>
                </div>
                <ul className={styles.planFeatures}>
                  {plan.features.map((feat, i) => (
                    <li key={i}>
                      <CheckCircle size={20} className={styles.featureIcon} />
                      {feat}
                    </li>
                  ))}
                </ul>
                <Button
                  variant={isSelected ? "primary" : "outline"}
                  size="lg"
                  className={styles.planButton}
                >
                  {isSelected
                    ? `Plan ${plan.title} Seleccionado`
                    : `Elegir Plan ${plan.title}`}
                </Button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default PricingPlansSection;
