import { Outlet } from "react-router-dom";
import Header from "./components/header/Header";
import Hero from "./components/hero/Hero";
import styles from "./layout.module.css";
import Footer from "./components/footer/Footer";

/* client layout */
const Layout = () => (
  <div className={styles.c}>
    <Header />
    <Hero />
    <div className={styles.page}>
      <div className={styles.main}>
        <Outlet />
      </div>
      <Footer />
    </div>
  </div>
);

/* backoffice layout */
const BackofficeLayout = () => (
  <div className={styles.b}>
    <Header path="backoffice" />
    <div className={styles.page}>
      <Outlet />
    </div>
  </div>
);

export { Layout, BackofficeLayout };
