import { useQuery } from "@tanstack/react-query";
import styles from "./activities.module.css";
import { Suspense } from "react";
import Activity from "./activity/Activity";

function Activities() {
  return (
    <div className={styles.activities}>
      <Suspense fallback={<p>Loading...</p>}>
        {useQuery({
          queryKey: ["activities"],
          queryFn: () =>
            fetch("https://glamping-v2.onrender.com/api/activities", {
              method: "GET",
              credentials: "include",
            })
              .then((res) => res.json())
              .then((data) => data.data),
          suspense: true,
        })?.data?.map((acti) => <Activity key={acti._id} activity={acti} />) ?? (
          <p>No activities found</p>
        )}
      </Suspense>
    </div>
  );
}

export default Activities;
