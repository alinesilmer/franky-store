"use client";
import React, { useState } from "react";
import { Mail, Phone, MapPin, Clock } from "lucide-react";
import { Button } from "../../../components/atoms/Button/Button";
import styles from "./Contact.module.scss";

/* ---------- Types ---------- */
interface FormState {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}
type FieldName = Exclude<keyof FormState, "message">;

const Contact: React.FC = () => {
  /* ---------- State ---------- */
  const [formData, setFormData] = useState<FormState>({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Enviando:", formData);
    setStatus("¡Mensaje enviado con éxito! Te responderemos pronto.");
    setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
  };

  const fields: { name: FieldName; placeholder: string; type: string }[] = [
    { name: "name", placeholder: "Nombre", type: "text" },
    { name: "email", placeholder: "E-mail", type: "email" },
    { name: "phone", placeholder: "Teléfono", type: "text" },
    { name: "subject", placeholder: "Motivo", type: "text" },
  ];

  /* WhatsApp CTA */
  const whatsappURL =
    "https://wa.me/5493794129951?text=" +
    encodeURIComponent("¡Hola! Estoy interesado en una asesoría mayorista.");

  /* ---------- JSX ---------- */
  return (
    <div className={styles.pageWrapper}>
      {/* Hero */}
      <section className={styles.heroSection}>
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>Contáctanos</h1>
        </div>
      </section>

      {/* Contact */}
      <section className={styles.contactSection}>
        <div className={styles.container}>
          <div className={styles.contactFlex}>
            <div className={styles.formWrapper}>
              <div className={styles.infoDescription}>
                <p>
                  Estamos disponibles para resolver tus dudas mediante este
                  formulario o directamente en nuestro local.
                </p>
              </div>
              {/* Form */}
              <div className={styles.formColumn}>
                <div className={styles.formCard}>
                  <header className={styles.formHeader}>
                    <h3 className={styles.formSubtitle}>
                      Formulario de Contacto
                    </h3>
                  </header>

                  <form onSubmit={handleSubmit} className={styles.contactForm}>
                    {fields.map((f) => (
                      <div key={f.name} className={styles.inputGroup}>
                        <input
                          className={styles.formInput}
                          type={f.type}
                          name={f.name}
                          placeholder={f.placeholder}
                          value={formData[f.name]}
                          onChange={handleChange}
                          required={f.name !== "phone"}
                        />
                      </div>
                    ))}

                    <div className={styles.inputGroup}>
                      <textarea
                        name="message"
                        placeholder="Mensaje"
                        value={formData.message}
                        onChange={handleChange}
                        className={styles.formTextarea}
                        required
                      />
                    </div>

                    <Button variant="outline" className={styles.submitButton}>
                      Enviar
                    </Button>

                    {status && <p className={styles.status}>{status}</p>}
                  </form>
                </div>
              </div>
            </div>
            {/* Info + cards */}
            <div className={styles.infoColumn}>
              <div className={styles.contactCards}>
                {[
                  {
                    icon: <Phone size={24} />,
                    title: "WhatsApp",
                    info: "+54 9 3794 129951",
                  },
                  {
                    icon: <Mail size={24} />,
                    title: "Correo",
                    info: "franky_store@gmail.com",
                  },
                  {
                    icon: <MapPin size={24} />,
                    title: "Dirección",
                    info: "Av. 3 de Abril 1619, Corrientes",
                  },
                  {
                    icon: <Clock size={24} />,
                    title: "Horarios",
                    info: "Lun-Sáb 09:30-12:30 / 17-20 hs",
                  },
                ].map((c) => (
                  <div key={c.title} className={styles.contactCard}>
                    <div className={styles.cardIcon}>{c.icon}</div>
                    <h4 className={styles.cardTitle}>{c.title}</h4>
                    <p className={styles.cardInfo}>{c.info}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Map */}
            <div className={styles.mapContainer}>
              <iframe
                className={styles.map}
                title="Ubicación Franky Store"
                loading="lazy"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3539.773692953311!2d-58.8309055!3d-27.476304!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94456d0b46539721%3A0xf0832902e1cb9921!2sFranky%20Store!5e0!3m2!1ses!2sar!4v1753756155184!5m2!1ses!2sar"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
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
