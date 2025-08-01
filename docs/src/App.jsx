import useSettingStore from "../store/settingStore.js";
import { usePaths } from "./paths/usePaths";
import "./App.css";
import { useQuery } from "@tanstack/react-query";
import { serverURL } from "../settings.js";

function App() {
  // Random call because if a route doesn't fetch data, react doesn't behave the same.

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
  const { routes } = usePaths();
  return <div>{routes}</div>;
}

export default App;
