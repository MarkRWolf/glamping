import styles from "./contact.module.css";
function Contact({ contact }) {
  return (
    <div key={contact._id} className={styles.contact}>
      <div className={styles.row}>
        Name
        <p>{contact.name}</p>
      </div>
      <div className={styles.row}>
        Email
        <p>{contact.email}</p>
      </div>
      <div className={styles.row}>
        Subject
        <p>{contact.subject}</p>
      </div>
      <div className={styles.row}>
        Message
        <p>{contact.message}</p>
      </div>
    </div>
  );
}

export default Contact;
