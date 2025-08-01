"use client";
import type React from "react";
import { useState } from "react";
import { Mail, Phone, MapPin, Clock } from "lucide-react";
import { Button } from "../../../components/atoms/Button/Button";
import styles from "./Contact.module.scss";

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    title: "",
    message: "",
  });
  const [status, setStatus] = useState("");

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Enviando formulario:", formData);
    setStatus("¡Mensaje enviado con éxito! Te responderemos pronto.");
    setFormData({
      name: "",
      email: "",
      subject: "",
      title: "",
      message: "",
    });
  };

  const whatsappNumber = "5493794129951";
  const whatsappMessage =
    "¡Hola, Franco! Estoy interesado en una asesoría personalizada para una compra mayorista. ¿Me podrías ayudar?";
  const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    whatsappMessage
  )}`;

  return (
    <div className={styles.pageWrapper}>
      {/* Hero Section */}
      <section className={styles.heroSection}>
        <div className={styles.heroOverlay} />
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>Contáctanos</h1>
        </div>
      </section>

      {/* Main Contact Section */}
      <section className={styles.contactSection}>
        <div className={styles.container}>
          <div className={styles.contactGrid}>
            {/* Contact Form */}
            <div className={styles.formColumn}>
              <div className={styles.formCard}>
                <div className={styles.formHeader}>
                  <h3 className={styles.formSubtitle}>
                    Formulario de Contacto
                  </h3>
                </div>

                <form onSubmit={handleSubmit} className={styles.contactForm}>
                  <div className={styles.inputGroup}>
                    <input
                      type="text"
                      name="name"
                      placeholder="Nombre"
                      value={formData.name}
                      onChange={handleChange}
                      className={styles.formInput}
                      required
                    />
                  </div>

                  <div className={styles.inputGroup}>
                    <input
                      type="email"
                      name="email"
                      placeholder="E-mail"
                      value={formData.email}
                      onChange={handleChange}
                      className={styles.formInput}
                      required
                    />
                  </div>

                  <div className={styles.inputGroup}>
                    <input
                      type="text"
                      name="phone"
                      placeholder="Número de Teléfono"
                      value={formData.title}
                      onChange={handleChange}
                      className={styles.formInput}
                    />
                  </div>

                  <div className={styles.inputGroup}>
                    <input
                      type="text"
                      name="subject"
                      placeholder="Motivo"
                      value={formData.subject}
                      onChange={handleChange}
                      className={styles.formInput}
                      required
                    />
                  </div>

                  <div className={styles.inputGroup}>
                    <textarea
                      name="message"
                      placeholder="Mensaje"
                      rows={5}
                      value={formData.message}
                      onChange={handleChange}
                      className={styles.formTextarea}
                      required
                    />
                  </div>

                  <Button variant="third" className={styles.submitButton}>
                    Enviar
                  </Button>

                  {status && <p className={styles.status}>{status}</p>}
                </form>
              </div>
            </div>

            {/* Contact Info */}
            <div className={styles.infoColumn}>
              <div className={styles.infoDescription}>
                <p>
                  En Franky valoramos la transparencia y la calidad en la
                  atención. Por esta razón, estamos disponibles para resolver
                  tus dudas, ya sea utilizando nuestro Formulario de Contacto o
                  en el propio local.
                </p>
              </div>

              <div className={styles.contactCards}>
                <div className={styles.contactCard}>
                  <div className={styles.cardIcon}>
                    <Phone size={24} />
                  </div>
                  <h4 className={styles.cardTitle}>WhatsApp</h4>
                  <p className={styles.cardInfo}>+54 9 3794 129951</p>
                </div>

                <div className={styles.contactCard}>
                  <div className={styles.cardIcon}>
                    <Mail size={24} />
                  </div>
                  <h4 className={styles.cardTitle}>Correo Electrónico</h4>
                  <p className={styles.cardInfo}>franky_store@gmail.com</p>
                </div>

                <div className={styles.contactCard}>
                  <div className={styles.cardIcon}>
                    <MapPin size={24} />
                  </div>
                  <h4 className={styles.cardTitle}>Dirección</h4>
                  <p className={styles.cardInfo}>
                    Av. 3 de Abril 1619, Corrientes Capital, Argentina
                  </p>
                </div>

                <div className={styles.contactCard}>
                  <div className={styles.cardIcon}>
                    <Clock size={24} />
                  </div>
                  <h4 className={styles.cardTitle}>Horario de Atención</h4>
                  <p className={styles.cardInfo}>
                    Lun-Sáb de 09:30 a 12:30 hrs - 17:00 a 20:00 hrs
                  </p>
                </div>
              </div>
            </div>
            {/* Map */}
            <div className={styles.mapContainer}>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3539.773692953311!2d-58.8309055!3d-27.476304!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94456d0b46539721%3A0xf0832902e1cb9921!2sFranky%20Store!5e0!3m2!1ses!2sar!4v1753756155184!5m2!1ses!2sar"
                title="Our Location"
                className={styles.map}
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={styles.ctaSection}>
        <div className={styles.ctaOverlay} />
        <div className={styles.ctaContent}>
          <span className={styles.ctaLabel}>Trabaja con Nosotros</span>
          <h2 className={styles.ctaTitle}>
            ¿Sos mayorista?
            <br />
            Te asesoramos de forma personalizada
          </h2>
          <a href={whatsappURL} target="_blank" rel="noopener noreferrer">
            <Button variant="primary" className={styles.ctaButton}>
              Quiero asesoría
            </Button>
          </a>
        </div>
      </section>
    </div>
  );
};

export default Contact;
