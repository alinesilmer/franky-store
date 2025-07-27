import type React from "react";
import styles from "./FAQ.module.scss";

export const FAQ: React.FC = () => {
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

  return (
    <div className={styles.faqPage}>
      <section className={styles.hero}>
        <div className="container">
          <h1>PREGUNTAS FRECUENTES</h1>
          <p>Encuentra respuestas a tus dudas más comunes sobre Franky Crew.</p>
        </div>
      </section>

      <section className={styles.faqListSection}>
        <div className="container">
          {faqs.map((faq, index) => (
            <div key={index} className={styles.faqItem}>
              <h2 className={styles.question}>{faq.question}</h2>
              <p className={styles.answer}>{faq.answer}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
