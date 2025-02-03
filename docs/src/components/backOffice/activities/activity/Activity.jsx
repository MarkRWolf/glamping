import { useEffect, useRef, useState } from "react";
import styles from "./activity.module.css";
import { useQueryClient } from "@tanstack/react-query";
import { FaRegEdit } from "react-icons/fa";
import { FaRegTrashCan, FaXmark } from "react-icons/fa6";
function Activity({ activity: activityData }) {
  const [activity, setActivity] = useState(activityData);
  const [editMode, setEditMode] = useState(false);
  const [editableData, setEditableData] = useState(activity);
  const [isHovering, setIsHovering] = useState(false);
  const [windowActive, setWindowActive] = useState(true);
  const [noti, setNoti] = useState(null);
  const [deleted, setDeleted] = useState(false);

  const fileInputRef = useRef();
  const descriptionRef = useRef();

  const queryClient = useQueryClient();

  useEffect(() => {
    window.addEventListener("focus", () => setWindowActive(true));
    window.addEventListener("blur", () => setWindowActive(false));

    return () => {
      window.removeEventListener("focus", () => setWindowActive(true));
      window.removeEventListener("blur", () => setWindowActive(false));
    };
  }, []);

  useEffect(() => {
    // Auto revalidate activities every 10 seconds
    const autoRevalidate = true; // // // // // // ^ if set to true
    setInterval(() => {
      autoRevalidate && windowActive && queryClient.invalidateQueries(["activities"]);
    }, 10 * 1000);
  }, []);

  useEffect(() => {
    // Check revalidated data, set msg if editMode
    if (activity === activityData) return;
    setActivity(activityData);
    setNoti(editMode && "Someone else has edited this activity, check the changes");
  }, [activityData]);

  useEffect(() => {
    if (descriptionRef.current) {
      descriptionRef.current.style.height = "auto";
      descriptionRef.current.style.height = `${descriptionRef.current.scrollHeight}px`;
    }
  }, [editableData.description, descriptionRef]);

  const submitChanges = async () => {
    const formData = new FormData();
    formData.append("id", editableData._id);
    formData.append("title", editableData.title);
    formData.append("description", editableData.description);
    formData.append("date", editableData.date);
    formData.append("time", editableData.time);
    editableData.file && formData.append("file", editableData.file);

    const res = await fetch(`https://glamping-v2.onrender.com/api/activity`, {
      method: "PUT",
      credentials: "include",
      body: formData,
    });
    const data = await res.json();
    if (res.ok) {
      setEditMode(false);
      setActivity(data.data);
      setDeleted(false);
      queryClient.invalidateQueries(["activities"]);
    }
  };

  const deleteActivity = async () => {
    const res = await fetch(`https://glamping-v2.onrender.com/api/activity/${activity._id}`, {
      method: "DELETE",
      credentials: "include",
    });
    const data = await res.json();
    if (res.ok) {
      queryClient.invalidateQueries(["activities"]);
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
            Title
            <input
              className={`${styles.input} ${styles.heading}`}
              type="text"
              disabled={!editMode}
              value={editMode ? editableData.title : activity.title}
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
                  : activity.pictureUrl
              }
              alt={"Activity picture"}
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
            Description
            <textarea
              disabled={!editMode}
              ref={descriptionRef}
              value={editMode ? editableData.description : activity.description}
              onChange={(e) => setEditableData({ ...editableData, description: e.target.value })}
            />
          </label>
          <label>
            Date
            <input
              className={styles.input}
              type="text"
              disabled={!editMode}
              value={editMode ? editableData.date : activity.date}
              onChange={(e) => setEditableData({ ...editableData, date: e.target.value })}
            />
          </label>
          <label>
            Time
            <input
              className={styles.input}
              type="text"
              disabled={!editMode}
              value={editMode ? editableData.time : activity.time}
              onChange={(e) => setEditableData({ ...editableData, time: e.target.value })}
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
            onClick={editMode ? submitChanges : deleted ? deleteActivity : undefined}
          >
            {editMode ? "Opdater" : deleted && "Slet"}
          </button>
          {noti && editMode && <p style={{ color: "rgb(223, 145, 0)" }}>{noti}</p>}
        </div>
      </div>
    </>
  );
}

export default Activity;
