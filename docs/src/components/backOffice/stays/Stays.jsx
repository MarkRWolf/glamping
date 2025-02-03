import { Suspense } from "react";
import styles from "./stays.module.css";
import { useQuery } from "@tanstack/react-query";
import StayForm from "./stayForm/StayForm";
import Stay from "./stay/Stay";

function Stays() {
  return (
    <div className={styles.container}>
      <div className={styles.inner}>
        <Suspense fallback={<p>Loading...</p>}>
          <div className={styles.stays}>
            {useQuery({
              queryKey: ["stays"],
              queryFn: () =>
                fetch("https://glamping-v2.onrender.com/api/stays", {
                  method: "GET",
                  credentials: "include",
                })
                  .then((res) => res.json())
                  .then((data) => data.data),
              suspense: true,
            })?.data?.map((s) => <Stay stay={s} key={s._id} />) ?? <p>No stays found</p>}
          </div>
        </Suspense>
        <hr style={{ height: "5rem", opacity: 0 }} />
        <StayForm />
      </div>
    </div>
  );
}

export default Stays;
