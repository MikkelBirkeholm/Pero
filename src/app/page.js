import { Hero } from "@/components/LandingPage/Hero";
import styles from "./page.module.scss";
import { DemoModule } from "@/components/LandingPage/DemoModule";
import { cookies } from "next/headers";

export default async function Home() {
  return (
    <main className={styles.main}>
      <Hero />
      <DemoModule />
    </main>
  );
}
