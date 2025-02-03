import { Suspense } from "react";
import styles from "./contacts.module.css";
import { useQuery } from "@tanstack/react-query";
import Contact from "./contact/Contact";

function Contacts() {
  return (
    <div className={styles.container}>
      <div className={styles.inner}>
        <Suspense fallback={<p>Loading...</p>}>
          <div className={styles.contacts}>
            {useQuery({
              queryKey: ["contacts"],
              queryFn: () =>
                fetch("https://glamping.onrender.com/api/contacts", {
                  method: "GET",
                  credentials: "include",
                })
                  .then((res) => res.json())
                  .then((data) => data.data),
              suspense: true,
            })?.data?.map((cont) => <Contact contact={cont} key={cont._id} />) ?? (
              <p>No contacts found</p>
            )}
          </div>
        </Suspense>
      </div>
    </div>
  );
}

export default Contacts;
