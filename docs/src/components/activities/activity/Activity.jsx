import { useEffect, useRef, useState } from "react";
import styles from "./activity.module.css";
import Button from "../../ui/Button/Button";
import Wavy from "../../wavy/Wavy";
import { FaAngleUp, FaAngleDown, FaHeart } from "react-icons/fa";
import { useLocalStorage } from "@uidotdev/usehooks";

function Activity({ activity }) {
  const { title, description, date, time, pictureUrl } = activity;
  const [open, setOpen] = useState(false);
  const moreRef = useRef(null);
  const [myActivities, setMyActivities] = useLocalStorage("myActivities", []);
  const isLiked = myActivities.find((act) => act._id === activity._id);

  useEffect(() => {
    moreRef.current.style.height = open ? `${moreRef.current.scrollHeight}px` : "0px";
  }, [open]);

  return (
    <div key={activity._id} className={styles.activity}>
      <div className={styles.top}>
        <Wavy color="#c5b496">
          <div className={styles.title}>
            <h3>{title}</h3>
          </div>
        </Wavy>
      </div>
      <img src={pictureUrl} alt={"activity image"} />

      <div className={styles.bottom}>
        <Wavy color="#33626c" className={styles.info}>
          <div
            className={styles.likeBox}
            onClick={() =>
              setMyActivities((prev) =>
                isLiked ? prev.filter((p) => p._id !== activity._id) : [...prev, activity]
              )
            }
          >
            <FaHeart className={`${styles.like} ${isLiked && styles.liked}`} />
          </div>
          <div className={styles.time}>
            <h3>{date}</h3>
            <h3>kl. {time}</h3>
          </div>
          <Button
            setOpen={setOpen}
            color="#33626c"
            border="1px solid white"
            padding="0.5rem"
            fontSize="2rem"
            onClick={() => setOpen(!open)}
          >
            Læs mere {open ? <FaAngleUp /> : <FaAngleDown />}
          </Button>
          <div
            ref={moreRef}
            className={`${styles.more} ${open && styles.open}`}
            style={{ height: "0px", overflow: "hidden", transition: "height 0.3s ease" }}
          >
            <p>{description}</p>
          </div>
        </Wavy>
      </div>
    </div>
  );
}

export default Activity;
