import { Link, useLocation } from "react-router-dom";
import styles from "./nav.module.css";
import burger from "./burger.module.css";
import { usePaths } from "../../paths/usePaths";
import { useRef } from "react";

function Nav({ path, isOpen, setIsOpen }) {
  const { clientPaths, backOfficePaths } = usePaths();
  const location = useLocation().pathname;
  const burgerRef = useRef(null);
  const paths =
    path === "client"
      ? clientPaths.map((p) => "/" + p.path)
      : path === "backoffice" &&
        backOfficePaths.map((p) => (p.path === "" ? "/backoffice" : "/backoffice/" + p.path));

  const handleNavigation = () => {
    setIsOpen(!isOpen);
    sessionStorage.setItem("isClientNavigation", "true");
  };

  return (
    <nav className={`${styles.nav} ${isOpen && styles.open}`}>
      <label className={`${burger.hamburger} ${isOpen && burger.open}`}>
        <input type="checkbox" ref={burgerRef} onClick={handleNavigation} />
        <svg viewBox="0 0 32 32">
          <path
            className={`${burger.line} ${burger.lineTopBottom} ${isOpen && burger.open}`}
            d="M27 10 13 10C10.8 10 9 8.2 9 6 9 3.5 10.8 2 13 2 15.2 2 17 3.8 17 6L17 26C17 28.2 18.8 30 21 30 23.2 30 25 28.2 25 26 25 23.8 23.2 22 21 22L7 22"
          ></path>
          <path className={`${burger.line} ${isOpen && burger.open}`} d="M7 16 27 16"></path>
        </svg>
      </label>
      <div className={`${styles.links} ${isOpen && styles.open}`}>
        {isOpen &&
          paths.map(
            (p) =>
              p !== "" && (
                <span key={p}>
                  <Link
                    to={p}
                    className={`${styles.link} ${p === location && styles.active} ${
                      open && styles.open
                    }`}
                    style={{
                      color: p === location ? "rgb(223, 145, 0)" : "whitesmoke",
                      textDecoration: "none",
                    }}
                    onClick={() => burgerRef.current.click()}
                  >
                    {p !== "" && p.split("/")[p.split("/").length - 1]}
                  </Link>
                </span>
              )
          )}
      </div>
    </nav>
  );
}

export default Nav;
