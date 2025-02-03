import { useRef, useState } from "react";
import styles from "./activityForm.module.css";
import { useQueryClient } from "@tanstack/react-query";
const initForm = {
  title: "",
  description: "",
  date: "",
  time: "",
  file: null,
};
function ActivityForm() {
  const queryClient = useQueryClient();
  const imageRef = useRef();
  const [activity, setActivity] = useState(initForm);

  const handleSubmit = async (e) => {
    const { title, description, date, time, file } = activity;
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("date", date);
    formData.append("time", time);
    if (file) formData.append("file", file);

    try {
      const res = await fetch("https://glamping.onrender.com/api/activity", {
        method: "POST",
        body: formData,
        credentials: "include",
      });

      const data = await res.json();
      res.ok && setActivity(initForm);
      res.ok && queryClient.invalidateQueries(["activities"]);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={styles.formContainer}>
      <form onSubmit={handleSubmit}>
        <h2 className={styles.heading}>Add Activity</h2>
        <span className={styles.imgContainer}>
          <img
            onClick={() => imageRef.current.click()}
            style={{ cursor: "pointer" }}
            src={
              activity?.file
                ? URL.createObjectURL(activity.file)
                : "https://glamping.onrender.com/activities/default.jpg"
            }
            alt={"Activity picture"}
          />
          <div
            className={styles.overlay}
            style={{
              display: "flex",
              background: "rgba(20,20,20,0.4)",
            }}
          >
            Select New
          </div>
        </span>
        <label>
          Title
          <input
            type="text"
            placeholder="Title"
            value={activity.title}
            onChange={(e) => setActivity({ ...activity, title: e.target.value })}
          />
        </label>
        <label>
          Description
          <input
            type="text"
            placeholder="Description"
            value={activity.description}
            onChange={(e) => setActivity({ ...activity, description: e.target.value })}
          />
        </label>
        <label>
          Date
          <input
            type="text"
            placeholder="date"
            value={activity.date}
            onChange={(e) => setActivity({ ...activity, date: e.target.value })}
          />
        </label>

        <label>
          Time
          <input
            type="text"
            placeholder="time"
            value={activity.time}
            onChange={(e) => setActivity({ ...activity, time: e.target.value })}
          />
        </label>

        <input
          type="file"
          ref={imageRef}
          style={{ display: "none" }}
          onChange={(e) => setActivity((prev) => ({ ...prev, file: e.target.files[0] }))}
        />
        <button type="submit" className={styles.submitBtn}>
          Create
        </button>
      </form>
    </div>
  );
}

export default ActivityForm;

/* const activitySchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  location: { type: String, required: true },
  price: { type: Number, required: true },
  rating: { type: Number, required: true },
  pictureUrl: { type: String, required: true },
  created: { type: Date, default: new Date() },
}); */
