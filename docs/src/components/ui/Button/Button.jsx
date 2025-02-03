import { Link } from "react-router-dom";
import styles from "./button.module.css";

function Button({
  children,
  setOpen,
  path = false,
  color = "#829b97",
  width = "100%",
  border = "none",
  padding = "1.5rem 2rem",
  fontSize = "2.5rem",
}) {
  return path ? (
    <Link
      to={path}
      className={styles.uiButton}
      style={{
        background: color,
        width: width,
        border: border,
        padding: padding,
        fontSize: fontSize,
      }}
    >
      {children}
    </Link>
  ) : (
    setOpen && (
      <div
        className={styles.uiButton}
        style={{
          background: color,
          width: width,
          border: border,
          padding: padding,
          fontSize: fontSize,
        }}
        onClick={() => setOpen((prev) => !prev)}
      >
        {children}
      </div>
    )
  );
}

export default Button;
