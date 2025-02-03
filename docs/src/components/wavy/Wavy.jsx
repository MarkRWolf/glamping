import styles from "./wavy.module.css";
function Wavy({ children, color = "#c5b496", width = "100%", border = "none" }) {
  return (
    <div className={styles.wavy} style={{ background: color, width, border }}>
      {children}
    </div>
  );
}

export default Wavy;
