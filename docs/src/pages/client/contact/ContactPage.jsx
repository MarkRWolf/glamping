import { useEffect, useRef, useState } from "react";
import Info from "../../../components/info/Info";
import styles from "./contactPage.module.css";
import Wavy from "../../../components/wavy/Wavy";

const initForm = {
  name: "",
  email: "",
  message: "",
  subject: "",
};

function ContactPage() {
  const [form, setForm] = useState(initForm);
  const submitRef = useRef();
  const formRef = useRef();
  const nameRef = useRef();
  const [modal, setModal] = useState(false);

  useEffect(() => {
    const focusSearch = setTimeout(() => {
      nameRef.current.focus();
    }, 1000);
    return () => clearTimeout(focusSearch);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("https://glamping-v2.onrender.com/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });
    res.ok && setModal(true);
  };

  return (
    <>
      <Info borderRadius="2.5rem 0 0 0">
        <form ref={formRef} onSubmit={handleSubmit} className={styles.contactForm}>
          {modal && (
            <div className={styles.modal}>
              <div className={styles.message}>
                <h3 className={styles.thanks}>Hej {form.name},</h3>
                <h3 className={styles.thanks}>Tak for din besked!</h3>
                <h3 className={styles.thanks}>Du hører fra os snarest.</h3>
              </div>
              <div
                className={styles.outer}
                onClick={() => {
                  setForm(initForm);
                  setModal(false);
                }}
              >
                <Wavy color="#829b97" width="75%">
                  <h2>Tilbage</h2>
                </Wavy>
              </div>
            </div>
          )}
          <label>
            Navn
            <input
              type="text"
              ref={nameRef}
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
          </label>
          <label>
            Email
            <input
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
          </label>
          <label>
            Hvad drejer henvendelsen sig om?
            <input
              type="text"
              value={form.subject}
              onChange={(e) => setForm({ ...form, subject: e.target.value })}
            />
          </label>
          <label>
            Besked (Skriv datoer, hvis det drejer sig om booking)
            <textarea
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
            />
          </label>
          <div className={styles.outer} onClick={() => submitRef.current.click()}>
            <Wavy color="#829b97" width="75%">
              <h3 style={{ padding: "0.5rem" }}>Indsend</h3>
            </Wavy>
          </div>
          <button ref={submitRef} style={{ display: "none" }} type="submit">
            Submit
          </button>
        </form>
      </Info>
    </>
  );
}

export default ContactPage;
