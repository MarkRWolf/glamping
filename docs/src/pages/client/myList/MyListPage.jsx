import { useLocalStorage } from "@uidotdev/usehooks";
import Info from "../../../components/info/Info";
import styles from "./myListPage.module.css";
import Activity from "../../../components/activities/activity/Activity";
import { useEffect } from "react";
import Button from "../../../components/ui/Button/Button";

function MyListPage() {
  const [myActivities, setMyActivities] = useLocalStorage("myActivities", []);

  useEffect(() => {
    // verify that user-liked items still exist in db
    const fetchActivities = async () => {
      const res = await fetch("https://glamping-v2.onrender.com/api/activities", {
        method: "GET",
        credentials: "include",
      });
      const data = await res.json();

      setMyActivities((prev) => {
        return prev.filter((activity) => data.data.find((act) => act._id === activity._id));
      });
    };
    fetchActivities();
  }, [myActivities]);

  return (
    <>
      <Info title="Antal Aktiviteter på listen:">
        <div className={styles.myActivities}>
          <h2 className={styles.amount}>{myActivities.length}</h2>
        </div>
        <Button path="/aktiviteter" width="75%" color="transparent" border="1px solid white">
          Aktiviteter
        </Button>
      </Info>

      <div className={styles.myList}>
        {myActivities.length &&
          myActivities.map((activity) => <Activity key={activity._id} activity={activity} />)}
      </div>
    </>
  );
}

export default MyListPage;
