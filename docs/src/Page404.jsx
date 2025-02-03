import { useEffect } from "react";

function Page404() {
  useEffect(() => {
    /* navigate home */
    setTimeout(() => {
      window.location.href = "/";
    }, 1500);
  }, []);

  return (
    <div style={{ color: "black", textAlign: "center", marginTop: "5rem", letterSpacing: "1.5px" }}>
      <h3>404 - Siden findes ikke</h3>
      <p>Du vil blive omdirigeret til forsiden...</p>
    </div>
  );
}

export default Page404;
