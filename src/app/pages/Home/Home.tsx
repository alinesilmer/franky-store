import type React from "react";
import { HeroSection } from "../../../components/molecules/HeroSection/HeroSection";
import { NewsletterForm } from "../../../components/molecules/NewsletterForm/NewsletterForm";
import styles from "./Home.module.scss";
import ShippingPayment from "../../../components/molecules/Home/ShippingPayment/ShippingPayment";
import Collection from "../../../components/molecules/Home/Collection/Collection";
import { WhyUs } from "../../../components/molecules/Home/WhyUs/WhyUs";
import DecoImage from "../../../components/molecules/Home/DecoImage/DecoImage";

const Home: React.FC = () => {
  return (
    <div className={styles.homePage}>
      <HeroSection />

      <Collection />

      <DecoImage />
      <WhyUs />
      <ShippingPayment />
      <NewsletterForm />
    </div>
  );
};

export default Home;
