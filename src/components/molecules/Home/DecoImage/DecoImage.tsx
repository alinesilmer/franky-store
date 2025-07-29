import styles from "./DecoImage.module.scss";

export default function DecoImage() {
  return (
    <section className={styles.wrapper} aria-hidden="true">
      <div className={styles.backgroundImage}>
        <div className={styles.scroller}>
          <span className={styles.slide} />
          <span className={styles.slide} />
        </div>
      </div>
    </section>
  );
}
