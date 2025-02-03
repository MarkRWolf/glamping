import { useRef, useState } from "react";
import styles from "./StayForm.module.css";
import { useQueryClient } from "@tanstack/react-query";

const initStay = {
  title: "",
  description: "",
  infoTitle: "",
  numberOfPersons: "",
  price: 0,
  includes: "",
  file: null,
};

function StayForm() {
  const queryClient = useQueryClient();

  const [stay, setStay] = useState(initStay);
  const imageRef = useRef();

  const handleSubmit = async (e) => {
    const { title, description, infoTitle, numberOfPersons, price, includes, file } = stay;
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("infoTitle", infoTitle);
    formData.append("numberOfPersons", numberOfPersons);
    formData.append("price", price);
    formData.append("includes", includes);
    if (file) formData.append("file", file);

    try {
      const res = await fetch("https://glamping-v2.onrender.com/api/stay", {
        method: "POST",
        body: formData,
        credentials: "include",
      });

      const data = await res.json();
      if (res.ok) queryClient.invalidateQueries(["stays"]);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={styles.formContainer}>
      <form onSubmit={handleSubmit}>
        <span className={styles.imgContainer}>
          <img
            onClick={() => imageRef.current.click()}
            style={{ cursor: "pointer" }}
            src={
              stay?.file
                ? URL.createObjectURL(stay.file)
                : "https://glamping-v2.onrender.com/activities/default.jpg"
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
            value={stay.title}
            onChange={(e) => setStay({ ...stay, title: e.target.value })}
          />
        </label>

        <label>
          Description
          <input
            type="text"
            placeholder="Description"
            value={stay.description}
            onChange={(e) => setStay({ ...stay, description: e.target.value })}
          />
        </label>

        <label>
          Info Title
          <input
            placeholder="infotitle"
            value={stay.infoTitle}
            onChange={(e) => setStay({ ...stay, infoTitle: e.target.value })}
          />
        </label>
        <label>
          Persons
          <input
            type="text"
            placeholder="Number Of Persons e.g 2-4"
            value={stay.numberOfPersons}
            onChange={(e) => setStay({ ...stay, numberOfPersons: e.target.value })}
          />
        </label>
        <label>
          Price
          <input
            type="number"
            placeholder="Price"
            value={stay.price}
            onChange={(e) => setStay({ ...stay, price: e.target.value })}
          />
        </label>
        <label>
          Includes
          <input
            type="text"
            placeholder="Includes"
            value={stay.includes}
            onChange={(e) => setStay({ ...stay, includes: e.target.value })}
          />
        </label>
        <input
          type="file"
          ref={imageRef}
          style={{ display: "none" }}
          onChange={(e) => setStay((prev) => ({ ...prev, file: e.target.files[0] }))}
        />
        <button type="submit" className={styles.submitBtn}>
          Create
        </button>
      </form>
    </div>
  );
}

export default StayForm;
