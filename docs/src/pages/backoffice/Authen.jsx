import { Suspense } from "react";
import { useQuery } from "@tanstack/react-query";
import BackAuth from "./backAuth/BackAuth";

function Authen({ children }) {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      {useQuery({
        queryKey: ["authStatus"],
        queryFn: () =>
          fetch("https://glamping.onrender.com/api/auth/token", {
            method: "POST",
            credentials: "include",
          })
            .then((res) => res.json())
            .then((data) => data.data),
        suspense: true,
      }).data === true ? (
        children
      ) : (
        <BackAuth />
      )}
    </Suspense>
  );
}

export default Authen;
