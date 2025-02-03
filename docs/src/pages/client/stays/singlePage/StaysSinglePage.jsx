import { useParams } from "react-router-dom";
import Info from "../../../../components/info/Info";
import styles from "./staysSinglePage.module.css";
import { useQuery } from "@tanstack/react-query";
import { Suspense } from "react";
import Button from "../../../../components/ui/Button/Button";
function StaysSinglePage() {
  const { id } = useParams();

  const { data: stay } = useQuery({
    queryKey: ["stay", id],
    queryFn: () =>
      fetch(`https://glamping-v2.onrender.com/api/ophold/${id}`, {
        method: "GET",
        credentials: "include",
      })
        .then((res) => res.json())
        .then((data) => data.data),
  });

  return (
    <>
      <Info borderRadius="2.5rem 0 0 0">
        <Suspense fallback={<div>Loading...</div>}>
          {stay && (
            <>
              <div className={styles.includes}>
                {stay.includes.split(",").map((inc, index) => (
                  <p key={index}>{inc}</p>
                ))}
              </div>
              <div className={styles.price}>
                <h3>Pris {stay.price},-</h3>
              </div>
              <Button path={`/kontakt`} width="75%">
                Book nu
              </Button>
            </>
          )}
        </Suspense>
      </Info>
    </>
  );
}

export default StaysSinglePage;
