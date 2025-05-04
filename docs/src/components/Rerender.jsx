import { useQuery } from "@tanstack/react-query";
import { Suspense } from "react";
import { serverURL } from "../../settings";

function Rerender() {
  const { data } = useQuery({
    queryKey: ["hello"],
    queryFn: () =>
      fetch(`${serverURL}/api/hello`, {
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
