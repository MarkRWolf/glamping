import { useQuery } from "@tanstack/react-query";
import { Suspense } from "react";

function Rerender() {
  const { data } = useQuery({
    queryKey: ["hello"],
    queryFn: () =>
      fetch("https://glamping.onrender.com/api/hello", {
        method: "GET",
        credentials: "include",
      })
        .then((res) => res.json())
        .then((data) => data.data),
    suspense: true,
  });

  return <Suspense fallback={null}>{null}</Suspense>;
}

export default Rerender;
