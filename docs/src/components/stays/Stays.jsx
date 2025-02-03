import { useQuery } from "@tanstack/react-query";
import styles from "./stays.module.css";
import Stay from "./stay/Stay";
import { Suspense } from "react";

function Stays() {
  return (
    <div className={styles.stays}>
      <Suspense>
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
        })?.data?.map((stay) => <Stay key={stay._id} stay={stay} />) ?? <p>No stays found</p>}
      </Suspense>
    </div>
  );
}

export default Stays;
