import { useQuery } from "@tanstack/react-query";
import styles from "./stays.module.css";
import Stay from "./stay/Stay";
import { Suspense } from "react";
import { serverURL } from "../../../settings";

function Stays() {
  return (
    <div className={styles.stays}>
      <Suspense>
        {useQuery({
          queryKey: ["stays"],
          queryFn: () =>
            fetch(`${serverURL}/api/stays`, {
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
