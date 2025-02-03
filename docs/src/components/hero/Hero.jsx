import { useEffect, useState } from "react";
import styles from "./hero.module.css";
import { useLocation } from "react-router-dom";
import useInfo from "../../hooks/useInfo";
import Button from "../ui/Button/Button";

function Hero() {
  const location = useLocation().pathname;
  const { heroInfo } = useInfo(location);
  const { title, subTitle, pictureUrl } = heroInfo;

  return (
    <div className={styles.hero}>
      <div className={styles.inner}>
        <img src={pictureUrl} alt="hero-image" />
        <span
          className={styles.overlay}
          style={{
            background: location === "/" ? "rgba(122, 122, 122, 0.685)" : "rgba(0, 0, 0, 0.35)",
          }}
        >
          <div className={styles.content}>
            {subTitle && <h3>{subTitle}</h3>}
            <h1>{title}</h1>
            {location === "/" && (
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                  marginTop: "2rem",
                }}
              >
                <Button path="/kontakt" width="75%" color="transparent" border="1px solid white">
                  BOOK NU
                </Button>
              </div>
            )}
          </div>
        </span>
      </div>
    </div>
  );
}

export default Hero;
