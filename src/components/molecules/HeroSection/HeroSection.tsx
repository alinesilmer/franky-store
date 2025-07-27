"use client";

import type React from "react";

import { Play } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "../../atoms/Button/Button";
import styles from "./HeroSection.module.scss";

export const HeroSection: React.FC = () => {
  const handleUniteClick = () => {
    alert("¡Únete a la crew!");
    // Aquí podrías redirigir a una página de registro o colección
  };

  return (
    <section className={styles.heroSection}>
      {/* Usando <img> tag en lugar de Next/Image */}
      <img
        src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Captura%20de%20pantalla%202025-07-27%20123655-85M5on2i8adc9RPnxprM8wL9ePwoFZ.png"
        alt="Franky Crew Hero Background"
        className={styles.backgroundImage}
      />
      <div className={styles.overlay}></div>
      <div className={styles.content}>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className={styles.title}
        >
          FRANKY CREW
        </motion.h1>
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className={styles.playButton}
        >
          <Play size={64} color="white" fill="white" />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
        >
          <Button onClick={handleUniteClick} className={styles.uniteButton}>
            ÚNETE
          </Button>
        </motion.div>
      </div>
    </section>
  );
};
