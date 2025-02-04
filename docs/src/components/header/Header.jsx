import { Link, useLocation } from "react-router-dom";
import styles from "./header.module.css";
import Nav from "../nav/Nav";
import { useState, useEffect, useLayoutEffect } from "react";

function Header({ path = "client" }) {
  const location = useLocation().pathname;
  const [navOpen, setNavOpen] = useState(false);
  const [justNavigated, setJustNavigated] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [stickyTop, setStickyTop] = useState(false);
  const [stickyLeft, setStickyLeft] = useState(false);
  const isBackoffice = path === "backoffice";

  const handleNavigation = () => {
    setNavOpen(false);
    sessionStorage.setItem("isClientNavigation", "true");
  };

  useEffect(() => {
    if (isBackoffice) return;
    const isClientNavigation = sessionStorage.getItem("isClientNavigation");
    !isClientNavigation || (location === "/" && window.scrollTo(0, 0));

    sessionStorage.removeItem("isClientNavigation");

    location !== "/" && setJustNavigated(true);

    const timeout = setTimeout(() => {
      setJustNavigated(false);
      location !== "/" && window.scrollTo({ top: 200, behavior: "smooth" });
    }, 400);

    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      clearTimeout(timeout);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [location]);

  useLayoutEffect(() => {
    if (isBackoffice) return;
    // styles for sticky logo
    !navOpen
      ? justNavigated
        ? setStickyTop(false)
        : scrolled
        ? setStickyTop(true)
        : setStickyLeft(false)
      : setStickyLeft(false);

    const timeout = setTimeout(() => {
      !navOpen
        ? justNavigated
          ? setStickyLeft(false)
          : scrolled
          ? setStickyLeft(true)
          : setStickyTop(false)
        : setStickyTop(false);
    }, 300);

    return () => clearTimeout(timeout);
  }, [scrolled, navOpen]);

  return (
    <div className={styles.header}>
      <div className={styles.inner}>
        <Link
          to="/"
          className={`${styles.home} ${(isBackoffice || stickyTop) && styles.stickyTop} ${
            (isBackoffice || stickyLeft) && styles.stickyLeft
          }`}
          onClick={handleNavigation}
        >
          <img src="./logo.png" alt="Logo" />
        </Link>
        <Nav isOpen={navOpen} setIsOpen={setNavOpen} path={path} />
      </div>
    </div>
  );
}

export default Header;
