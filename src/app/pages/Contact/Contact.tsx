"use client";

import React, { useState } from "react";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Facebook,
  Twitter,
  Instagram,
  Youtube,
} from "lucide-react";
import { Input } from "../../../components/atoms/Input/Input";
import { Button } from "../../../components/atoms/Button/Button";
import styles from "./Contact.module.scss";

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    interestedIn: "",
    phoneNumber: "",
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
      interestedIn: "",
      phoneNumber: "",
      message: "",
    });
  };

  return (
    <div className={styles.pageWrapper}>
      <section className={styles.contactSection}>
        <h1 className={styles.sectionTitle}>Contáctanos</h1>
        <div className={styles.contactGrid}>
          {/* ➤ Form */}
          <div className={styles.formColumn}>
            <h2 className={styles.formSubtitle}>
              ¿Tienes una duda? Envíanos un Mensaje
            </h2>
            <p className={styles.formDescription}>
              Responderemos tu consulta lo más breve posible. En caso de no
              estar registrado, por favor, déjanos tu dirección de gmail o
              número de teléfono para aclarar tus dudas.
            </p>
            <form onSubmit={handleSubmit} className={styles.contactForm}>
              <div className={styles.row2}>
                <Input
                  name="name"
                  placeholder="Nombre"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
                <Input
                  name="email"
                  type="email"
                  placeholder="Correo Electrónico"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className={styles.row2}>
                <select
                  name="interestedIn"
                  value={formData.interestedIn}
                  onChange={handleChange}
                  className={styles.select}
                >
                  <option value="product">Producto</option>
                  <option value="product">Envío</option>
                  <option value="support">Ayuda</option>
                  <option value="other">Otro</option>
                </select>
                <Input
                  name="phoneNumber"
                  placeholder="Teléfono"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                />
              </div>
              <textarea
                name="message"
                placeholder="Mensaje"
                rows={6}
                value={formData.message}
                onChange={handleChange}
                className={styles.textarea}
                required
              />
              <Button type="submit" className={styles.submitButton}>
                Enviar
              </Button>
              {status && <p className={styles.status}>{status}</p>}
            </form>
          </div>

          {/* ➤ Info */}
          <div className={styles.infoColumn}>
            <div className={styles.accentSquareTop} />
            <h2 className={styles.infoTitle}>Info</h2>
            <ul className={styles.infoList}>
              <li>
                <Mail size={20} /> <span>info@getintouch.we</span>
              </li>
              <li>
                <Phone size={20} /> <span>+3794129951</span>
              </li>
              <li>
                <MapPin size={20} />{" "}
                <span>Av. 3 de Abril 1619, W3400 Corrientes</span>
              </li>
              <li>
                <Clock size={20} />{" "}
                <span>lun-sab de 09:30-12:30 y de 17:00-20:00 </span>
              </li>
            </ul>
            <div className={styles.social}>
              <Facebook size={20} />
              <Twitter size={20} />
              <Instagram size={20} />
              <Youtube size={20} />
            </div>
            <div className={styles.accentSquareBottom} />
          </div>
        </div>
      </section>

      {/* ➤ Map */}
      <section className={styles.mapSection}>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3539.773692953311!2d-58.8309055!3d-27.476304!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94456d0b46539721%3A0xf0832902e1cb9921!2sFranky%20Store!5e0!3m2!1ses!2sar!4v1753756155184!5m2!1ses!2sar"
          title="Our Location"
          className={styles.map}
        ></iframe>
      </section>
    </div>
  );
};

export default Contact;
