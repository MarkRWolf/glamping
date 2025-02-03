import styles from "./footer.module.css";
import { Link } from "react-router-dom";
import { ImFacebook2 } from "react-icons/im";
import { GrInstagram } from "react-icons/gr";
function Footer() {
  return (
    <div className={styles.footer}>
      <div className={styles.links}>
        <Link to={"/"}>
          <ImFacebook2 className={styles.link} />
        </Link>
        <Link to={"/"}>
          <GrInstagram className={styles.link} />
        </Link>
      </div>
      <div className={styles.site}>
        <Link to={"/"}>
          <img src="./logo.png" />
        </Link>
        <h2>Gittes Glamping</h2>
      </div>
    </div>
  );
}

export default Footer;
