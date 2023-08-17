import styles from "./Styles.module.scss";

export const Hero = () => {
  return (
    <section className={styles.heroSection}>
      <hgroup className={styles.heroHeading}>
        <h1>Pero</h1>
        <p>Create a clear path for your life</p>
      </hgroup>
      <p>
        Explore more than 70 different protocols to help you{" "}
        <span className="marked">achieve your goals</span>, and track your
        progress along the way.
      </p>
    </section>
  );
};
