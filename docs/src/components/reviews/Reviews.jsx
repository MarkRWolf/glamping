import { useQuery } from "@tanstack/react-query";
import Wavy from "../wavy/Wavy";
import styles from "./reviews.module.css";
import { useState } from "react";
import { GoChevronDown, GoChevronUp } from "react-icons/go";

function Reviews() {
  const [shownReviews, setShownReviews] = useState(3);

  const { data } = useQuery({
    queryKey: ["reviews"],
    queryFn: () =>
      fetch("https://glamping-v2.onrender.com/api/reviews", {
        method: "GET",
        credentials: "include",
      })
        .then((res) => res.json())
        .then((data) => data.data),
    suspense: true,
  });

  return (
    <div className={styles.reviewsContainer}>
      <Wavy>
        <h2>Vores gæster udtaler</h2>
      </Wavy>
      <div className={styles.reviews}>
        {data?.map(
          (review, index) =>
            index < shownReviews && (
              <div className={styles.review} key={review._id}>
                <Wavy color="#819a96">
                  <div className={styles.reviewInfo}>
                    <h3>
                      {review.name}, {review.age} år <br />
                      Har været på {review.stay}
                    </h3>
                    <p>{review.review}</p>
                  </div>
                </Wavy>
              </div>
            )
        ) ?? <p>No reviews found</p>}
        {data?.length && (
          <div
            className={styles.moreBtn}
            onClick={() =>
              setShownReviews((prev) =>
                prev === data?.length
                  ? prev - 3 < 3
                    ? 3
                    : 3
                  : prev + 3 > data?.length
                  ? data?.length
                  : prev - 3 < 3
                  ? 3
                  : prev + 3
              )
            }
          >
            <Wavy width="80%">
              <div className={styles.showMore}>
                <h3>{shownReviews < data?.length ? "Vis flere" : "Vis færre"}</h3>
                {shownReviews}/{data?.length}
                {shownReviews < data?.length ? (
                  <GoChevronDown className={styles.arrow} />
                ) : (
                  <GoChevronUp className={styles.arrow} />
                )}
              </div>
            </Wavy>
          </div>
        )}
      </div>
    </div>
  );
}

export default Reviews;
