import { useEffect, useRef, useState } from "react";
import styles from "./stay.module.css";
import { FaRegEdit } from "react-icons/fa";
import { FaRegTrashCan, FaXmark } from "react-icons/fa6";
import { useQueryClient } from "@tanstack/react-query";

function Stay({ stay: stayData }) {
  const [stay, setStay] = useState(stayData);
  const [editMode, setEditMode] = useState(false);
  const [editableData, setEditableData] = useState(stay);
  const [isHovering, setIsHovering] = useState(false);
  const [windowActive, setWindowActive] = useState(true);
  const [noti, setNoti] = useState(null);
  const [deleted, setDeleted] = useState(false);

  const fileInputRef = useRef(null);
  const includesRef = useRef(null);
  const descriptionRef = useRef(null);
  const infoTitleRef = useRef(null);

  const queryClient = useQueryClient();

  useEffect(() => {
    window.addEventListener("focus", () => {
      setWindowActive(true);
    });
    window.addEventListener("blur", () => {
      setWindowActive(false);
    });
    return () => {
      window.removeEventListener("focus", () => setWindowActive(true));
      window.removeEventListener("blur", () => setWindowActive(false));
    };
  }, []);

  useEffect(() => {
    // Auto revalidate stays every 10 seconds
    const autoRevalidate = true; // // // // ^ if set to true
    setInterval(() => {
      autoRevalidate && windowActive && queryClient.invalidateQueries(["stays"]);
    }, 10 * 1000);
  }, []);

  useEffect(() => {
    // Check revalidated data, set msg if editMode
    if (stay === stayData) return;
    setStay(stayData);
    setNoti(editMode && "Someone else has edited this stay, check the changes");
  }, [stayData]);

  useEffect(() => {
    if (includesRef.current) {
      includesRef.current.style.height = "auto";
      includesRef.current.style.height = `${includesRef.current.scrollHeight}px`;
    }
  }, [editableData.includes, includesRef]);

  useEffect(() => {
    if (descriptionRef.current) {
      descriptionRef.current.style.height = "auto";
      descriptionRef.current.style.height = `${descriptionRef.current.scrollHeight}px`;
    }
  }, [editableData.description, descriptionRef]);

  useEffect(() => {
    if (infoTitleRef.current) {
      infoTitleRef.current.style.height = "auto";
      infoTitleRef.current.style.height = `${infoTitleRef.current.scrollHeight}px`;
    }
  }, [editableData.infoTitle, infoTitleRef]);

  const submitChanges = async () => {
    const formData = new FormData();
    formData.append("id", editableData._id);
    formData.append("title", editableData.title);
    formData.append("infoTitle", editableData.infoTitle);
    formData.append("description", editableData.description);
    formData.append("numberOfPersons", editableData.numberOfPersons);
    formData.append("price", editableData.price);
    formData.append("includes", editableData.includes);
    editableData.file && formData.append("file", editableData.file);

    const res = await fetch(`https://glamping-v2.onrender.com/api/stay`, {
      method: "PUT",
      credentials: "include",
      body: formData,
    });
    const data = await res.json();
    if (res.ok) {
      setEditMode(false);
      setStay(data.data);
      setDeleted(false);
      queryClient.invalidateQueries(["stays"]);
    }
  };

  const deleteStay = async () => {
    const res = await fetch(`https://glamping-v2.onrender.com/api/stay/${stay._id}`, {
      method: "DELETE",
      credentials: "include",
    });
    const data = await res.json();
    if (res.ok) {
      queryClient.invalidateQueries(["stays"]);
    }
  };

  return (
    <>
      <div className={styles.container}>
        <div className={styles.inner}>
          <div className={styles.controls}>
            {editMode ? (
              <FaXmark
                style={{ cursor: "pointer" }}
                onClick={() => {
                  setNoti(null);
                  setEditMode(!editMode);
                  setDeleted(false);
                }}
              />
            ) : (
              <FaRegEdit style={{ cursor: "pointer" }} onClick={() => setEditMode(!editMode)} />
            )}
            <FaRegTrashCan
              style={{ cursor: "pointer" }}
              onClick={() => setDeleted((prev) => !prev)}
            />
          </div>

          <label>
            title
            <input
              className={`${styles.input} ${styles.heading}`}
              type="text"
              disabled={!editMode}
              value={editMode ? editableData.title : stay.title}
              onChange={(e) => setEditableData({ ...editableData, title: e.target.value })}
            />
          </label>
          <span
            className={styles.imgContainer}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          >
            <img
              onClick={() => fileInputRef.current.click()}
              style={{ cursor: editMode ? "pointer" : "default" }}
              src={
                editMode && editableData.file
                  ? URL.createObjectURL(editableData.file)
                  : stay.pictureUrl
              }
              alt={"Stay picture"}
            />
            <div
              className={styles.overlay}
              style={{
                display: editMode && isHovering ? "flex" : "none",
                background: "rgba(20,20,20,0.4)",
              }}
            >
              Select New
            </div>
          </span>
          <label>
            infotitle
            <textarea
              className={styles.input}
              ref={infoTitleRef}
              disabled={!editMode}
              value={editMode ? editableData.infoTitle : stay.infoTitle}
              onChange={(e) => setEditableData({ ...editableData, infoTitle: e.target.value })}
            />
          </label>
          <label>
            description
            <textarea
              disabled={!editMode}
              ref={descriptionRef}
              value={editMode ? editableData.description : stay.description}
              onChange={(e) => setEditableData({ ...editableData, description: e.target.value })}
            />
          </label>
          <label>
            persons
            <input
              className={styles.input}
              type="text"
              disabled={!editMode}
              value={editMode ? editableData.numberOfPersons : stay.numberOfPersons}
              onChange={(e) =>
                setEditableData({ ...editableData, numberOfPersons: e.target.value })
              }
            />
          </label>
          <label>
            Price
            <input
              className={styles.input}
              type="number"
              disabled={!editMode}
              value={editMode ? editableData.price : stay.price}
              onChange={(e) =>
                setEditableData({ ...editableData, price: Number(e.target.value).toString() })
              }
            />
          </label>
          <label>
            Includes
            <textarea
              disabled={!editMode}
              ref={includesRef}
              value={editMode ? editableData.includes : stay.includes}
              onChange={(e) => setEditableData({ ...editableData, includes: e.target.value })}
            />
          </label>
          <input
            className={styles.input}
            ref={fileInputRef}
            type="file"
            disabled={!editMode}
            style={{ display: "none" }}
            onChange={(e) => setEditableData({ ...editableData, file: e.target.files[0] })}
          />
          <button
            className={styles.submitBtn}
            style={{ display: editMode ? "block" : deleted ? "block" : "none" }}
            onClick={editMode ? submitChanges : deleted ? deleteStay : undefined}
          >
            {editMode ? "Opdater" : deleted && "Slet"}
          </button>
          {noti && editMode && <p style={{ color: "rgb(223, 145, 0)" }}>{noti}</p>}
        </div>
      </div>
    </>
  );
}

export default Stay;
