"use client";

import type React from "react";
import { motion } from "framer-motion";
import { Button } from "../../atoms/Button/Button";
import VideoHero from "../../../assets/videos/VideoHero.mp4";
import styles from "./HeroSection.module.scss";
import { useNavigate } from "react-router-dom";

export const HeroSection: React.FC = () => {
  const navigate = useNavigate();

  const handleUniteClick = () => {
    navigate("/auth/register");
  };

  return (
    <section className={styles.heroSection}>
      {/* ✅ Video Background instead of <img> */}
      <video
        className={styles.backgroundVideo}
        src={VideoHero}
        autoPlay
        loop
        muted
        playsInline
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
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className={styles.buttonWrapper}
          transition={{ duration: 0.8, delay: 0.7 }}
        >
          <Button
            variant="secondary"
            onClick={handleUniteClick}
            className={styles.uniteButton}
          >
            ÚNETE
          </Button>
        </motion.div>
      </div>
    </section>
  );
};
