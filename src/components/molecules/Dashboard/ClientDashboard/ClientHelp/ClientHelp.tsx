"use client";

import type React from "react";
import { useState } from "react";
import {
  Mail,
  Phone,
  MessageSquare,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import DashboardCard from "../../../../atoms/DashboardCard/DashboardCard";
import { Button } from "../../../../atoms/Button/Button";
import styles from "./ClientHelp.module.scss";

interface FAQItem {
  question: string;
  answer: string;
}

const DUMMY_FAQS: FAQItem[] = [
  {
    question: "¿Cómo puedo rastrear mi pedido?",
    answer:
      "Puedes rastrear tu pedido en la sección 'Mis Pedidos' de tu dashboard. Haz clic en el ID del pedido para ver los detalles y el estado de envío.",
  },
  {
    question: "¿Cuál es la política de devoluciones?",
    answer:
      "Aceptamos devoluciones dentro de los 30 días posteriores a la compra, siempre que el producto esté sin usar y en su embalaje original. Consulta nuestra sección de 'Política de Devoluciones' para más información.",
  },
  {
    question: "¿Cómo puedo cambiar mi información de perfil?",
    answer:
      "Puedes actualizar tu nombre, email, dirección y otros datos en la sección 'Mi Perfil' de tu dashboard.",
  },
  {
    question: "¿Qué hago si mi producto llegó dañado?",
    answer:
      "Por favor, contáctanos inmediatamente con fotos del producto dañado y tu número de pedido. Te ayudaremos a procesar un reemplazo o reembolso.",
  },
  {
    question: "¿Ofrecen envío internacional?",
    answer:
      "Actualmente, solo realizamos envíos dentro de [País/Región]. Estamos trabajando para expandir nuestras opciones de envío en el futuro.",
  },
];

const ClientHelp: React.FC = () => {
  const [openFAQIndex, setOpenFAQIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenFAQIndex(openFAQIndex === index ? null : index);
  };

  const handleContactSupport = (method: "email" | "phone" | "chat") => {
    console.log(`Contactando soporte vía: ${method}`);
    if (method === "email") {
      window.location.href = "mailto:support@frankycrew.com";
    } else if (method === "phone") {
      alert("Llama a nuestro soporte: +XX XXX XXX XXX");
    } else if (method === "chat") {
      alert("Iniciando chat en vivo con soporte...");
    }
  };

  return (
    <div className={styles.clientHelp}>
      <h1 className={styles.pageTitle}>Centro de Ayuda</h1>
      <p className={styles.pageSubtitle}>
        Encuentra respuestas a tus preguntas o contacta con nuestro equipo de
        soporte.
      </p>

      <div className={styles.helpGrid}>
        <DashboardCard title="Preguntas Frecuentes" className={styles.faqCard}>
          <div className={styles.faqList}>
            {DUMMY_FAQS.map((faq, index) => (
              <div key={index} className={styles.faqItem}>
                <button
                  className={styles.faqQuestionHeader}
                  onClick={() => toggleFAQ(index)}
                  aria-expanded={openFAQIndex === index}
                  aria-controls={`faq-answer-${index}`}
                >
                  <h3 className={styles.faqQuestion}>{faq.question}</h3>
                  {openFAQIndex === index ? (
                    <ChevronUp size={20} />
                  ) : (
                    <ChevronDown size={20} />
                  )}
                </button>
                <div
                  id={`faq-answer-${index}`}
                  className={`${styles.faqAnswerContent} ${
                    openFAQIndex === index ? styles.open : ""
                  }`}
                  aria-hidden={openFAQIndex !== index}
                >
                  <p className={styles.faqAnswer}>{faq.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </DashboardCard>

        <DashboardCard title="Contactar Soporte" className={styles.contactCard}>
          <p className={styles.contactDescription}>
            ¿No encuentras lo que buscas? Nuestro equipo de soporte está aquí
            para ayudarte.
          </p>
          <div className={styles.contactOptions}>
            <Button
              variant="primary"
              size="md"
              onClick={() => handleContactSupport("email")}
            >
              <Mail size={20} /> Enviar Email
            </Button>
            <Button
              variant="secondary"
              size="md"
              onClick={() => handleContactSupport("phone")}
            >
              <Phone size={20} /> Llamar por Teléfono
            </Button>
            <Button
              variant="outline"
              size="md"
              onClick={() => handleContactSupport("chat")}
            >
              <MessageSquare size={20} /> Chat en Vivo
            </Button>
          </div>
        </DashboardCard>
      </div>
    </div>
  );
};

export default ClientHelp;
