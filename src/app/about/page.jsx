import styles from "./styles.module.scss";

export default async function About() {
  return (
    <main className={styles.main}>
      <hgroup>
        <h1>About</h1>
        <p>About Pero</p>
      </hgroup>
      <section>
        <div className={styles.dualSection}>
          <div className={styles.textBox}>
            <h2>We all want to be the best versions of ourselves</h2>
            <p>
              But figuring out exactly what to do, how to do it and when to do
              it can be a daunting task. We are constantly bombarded with
              opinions and advice, keeping track of it can seem nearly
              impossible.
            </p>
            <p>
              Pero helps you find the exact protocols that will fit you and your
              needs. We have over 70 different protocols to choose from, and we
              are always adding more.
            </p>
          </div>
          <div className={styles.imgBox}></div>
        </div>
      </section>
    </main>
  );
}
