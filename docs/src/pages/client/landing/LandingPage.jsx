import Info from "../../../components/info/Info";
import Button from "../../../components/ui/Button/Button";
import styles from "./landingPage.module.css";
import Reviews from "../../../components/reviews/Reviews";

function LandingPage() {
  return (
    <>
      <Info>
        <div className={styles.gitteDesktop}>
          <img src={`./image_00.jpg`} alt="Gitte" className={styles.gitteBg} />
          <img src={`./image_01.jpg`} alt="Gitte" className={styles.gitteBg} />
          <img src={`./image_02.jpg`} alt="Gitte" className={styles.gitteBg} />
          <img src={`./image_03.jpg`} alt="Gitte" className={styles.gitteBg} />
          <img src={`./gitte.jpg`} alt="Gitte" className={styles.gitte} />
        </div>
        <div className={styles.gitteMobile}>
          <img src={`./gitte.jpg`} alt="Gitte" className={styles.gitte} />
        </div>
        <Button path="/ophold" width="75%">
          Se vores ophold
        </Button>
      </Info>
      <Reviews />
    </>
  );
}

export default LandingPage;
