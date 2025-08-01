"use client";

import type React from "react";
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import styles from "./FAQ.module.scss";

export const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: "¿Cuáles son los métodos de pago aceptados?",
      answer:
        "Aceptamos tarjetas de crédito (Visa, MasterCard, American Express), débito y pagos a través de plataformas como PayPal y Mercado Pago. También ofrecemos opciones de pago en efectivo en puntos de venta seleccionados.",
    },
    {
      question: "¿Cuánto tiempo tarda el envío?",
      answer:
        "El tiempo de envío estándar es de 3 a 7 días hábiles, dependiendo de tu ubicación. Ofrecemos opciones de envío express para entregas más rápidas.",
    },
    {
      question: "¿Puedo devolver o cambiar un producto?",
      answer:
        "Sí, aceptamos devoluciones y cambios dentro de los 30 días posteriores a la compra, siempre y cuando el producto esté en su estado original y con las etiquetas. Consulta nuestra política de devoluciones para más detalles.",
    },
    {
      question: "¿Cómo puedo saber mi talla correcta?",
      answer:
        "En la descripción de cada producto encontrarás una guía de tallas detallada. Si tienes dudas, no dudes en contactarnos para asesoramiento personalizado.",
    },
    {
      question: "¿Ofrecen envíos internacionales?",
      answer:
        "Actualmente, nuestros envíos están limitados a [País/Región]. Estamos trabajando para expandir nuestras operaciones a nivel internacional en el futuro.",
    },
    {
      question: "¿Cómo puedo contactar al servicio al cliente?",
      answer:
        "Puedes contactarnos a través de nuestro formulario en la sección de Contacto, enviando un correo electrónico a info@frankycrew.com, o a través de nuestras redes sociales.",
    },
  ];

  const toggleFAQ = (index: number) =>
    setOpenIndex((prev) => (prev === index ? null : index));

  return (
    <section className={styles.faqSection}>
      <div className="container">
        <div className={styles.faqContent}>
          {/* Intro + Image */}
          <div className={styles.faqIntro}>
            <h1 className={styles.sectionTitle}>
              Preguntas <span className={styles.highlight}>Frecuentes</span>
            </h1>
            <p className={styles.sectionDescription}>
              Encuentra respuestas a tus dudas más comunes sobre Franky Crew.
              Nuestro objetivo es brindarte toda la información necesaria para
              una experiencia de compra sin complicaciones.
            </p>

            <div className={styles.imageCluster}>
              <div className={styles.imageWrapper}>
                <img
                  src="https://i.pinimg.com/736x/c7/99/75/c79975e9cafed10bc41cfdbc13da66c3.jpg"
                  alt="Cliente explorando preguntas frecuentes"
                  loading="lazy"
                  decoding="async"
                />
              </div>
            </div>
          </div>

          {/* Items */}
          <div className={styles.faqItems}>
            {faqs.map((faq, index) => {
              const isOpen = openIndex === index;
              const headerId = `faq-header-${index}`;
              const panelId = `faq-panel-${index}`;

              return (
                <div
                  key={index}
                  className={`${styles.faqItem} ${
                    isOpen ? styles.faqItemOpen : ""
                  }`}
                >
                  <h2 className={styles.questionHeading} id={headerId}>
                    <button
                      className={styles.questionHeader}
                      onClick={() => toggleFAQ(index)}
                      aria-expanded={isOpen}
                      aria-controls={panelId}
                      aria-labelledby={headerId}
                      id={`${headerId}-btn`}
                      type="button"
                    >
                      <span className={styles.question}>{faq.question}</span>
                      <ChevronDown
                        size={24}
                        className={styles.icon}
                        aria-hidden="true"
                      />
                    </button>
                  </h2>

                  <div
                    id={panelId}
                    role="region"
                    aria-labelledby={`${headerId}-btn`}
                    className={styles.answerWrapper}
                  >
                    <div className={styles.answerContent}>
                      <p className={styles.answer}>{faq.answer}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
