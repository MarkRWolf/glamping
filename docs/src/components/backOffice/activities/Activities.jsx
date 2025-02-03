import { Suspense } from "react";
import styles from "./activities.module.css";
import { useQuery } from "@tanstack/react-query";
import ActivityForm from "./activityForm/ActivityForm";
import Activity from "./activity/Activity";

function Activities() {
  return (
    <div className={styles.container}>
      <div className={styles.inner}>
        <Suspense fallback={<p>Loading...</p>}>
          <div className={styles.activities}>
            {useQuery({
              queryKey: ["activities"],
              queryFn: () =>
                fetch("https://glamping.onrender.com/api/activities", {
                  method: "GET",
                  credentials: "include",
                })
                  .then((res) => res.json())
                  .then((data) => data.data),
              suspense: true,
            })?.data?.map((acti) => <Activity activity={acti} key={acti._id} />) ?? (
              <p>No activities found</p>
            )}
          </div>
        </Suspense>
        <hr style={{ height: "5rem", opacity: 0 }} />
        <ActivityForm />
      </div>
    </div>
  );
}

export default Activities;
