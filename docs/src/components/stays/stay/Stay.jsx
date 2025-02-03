import Wavy from "../../wavy/Wavy";
import styles from "./stay.module.css";
import Button from "../../ui/Button/Button";

function Stay({ stay }) {
  return (
    <div key={stay._id} className={styles.stay}>
      <div className={styles.top}>
        <Wavy color="#c5b496" className={styles.info}>
          <div className={styles.stayInfo}>
            <h2>{stay.title}</h2>
            <h3>{stay.numberOfPersons} personer</h3>
            <h3>Fra {stay.price},-</h3>
          </div>
        </Wavy>
      </div>

      <img src={stay.pictureUrl} alt={stay.title} />

      <div className={styles.bottom}>
        <Button path={`/ophold/${stay._id}`} width="70%">
          Læs mere
        </Button>
      </div>
    </div>
  );
}

export default Stay;
