import { useLocation } from "react-router-dom";
import useInfo from "../../hooks/useInfo";
import styles from "./info.module.css";
function Info({ children, title, description, borderRadius = "2.5rem 0 2.5rem 0" }) {
  const location = useLocation().pathname;
  const { info } = useInfo(location);

  return (
    <div className={styles.info} style={{ borderRadius }}>
      <h2>{title ? title : info?.infoTitle}</h2>
      {description ? <p>{description}</p> : <p>{info?.description}</p>}
      {children}
    </div>
  );
}

export default Info;
