import { useState } from "react";
import styles from "./form.module.css";
import useUserStore from "../../../store/userStore.js";
import Wavy from "../../wavy/Wavy";

const initUser = {
  name: "",
  email: "",
  password: "",
  file: null,
};

function AuthForm() {
  const [userInput, setUserInput] = useState(initUser);
  const [resMsg, setResMsg] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const { setLoggedIn, setToken } = useUserStore();

  const handleLogin = async (e) => {
    e.preventDefault();
    const { email, password } = userInput;

    try {
      const res = await fetch("https://glamping.onrender.com/api/auth/signIn", {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({ email: email.toLowerCase(), password }),
      });

      const data = await res.json();
      if (!res.ok) return setResMsg(data.message);
      setLoggedIn(true);
      setToken(data.data.token);
      setResMsg("User logged in!");
      setUserInput(initUser);
    } catch (error) {
      setResMsg(error.message);
      setUserInput((prev) => ({ ...prev, password: "" }));
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    const { name, email, password, file } = userInput;

    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("password", password);
    if (file) formData.append("file", file);

    try {
      const res = await fetch("https://glamping.onrender.com/api/user", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) return setResMsg(data.message);
      setLoggedIn(true);
      setToken(data.data.token);
      setResMsg("Signed up and logged in!");
      setUserInput(initUser);
    } catch (error) {
      setResMsg(error.message);
      setUserInput((prev) => ({ ...prev, password: "" }));
    }
  };

  return (
    <>
      <span className={styles.toggle} onClick={() => setIsLogin((prev) => !prev)}>
        <Wavy color="transparent" width="100%" border="1px solid white">
          <div>
            <span style={{ color: isLogin ? "rgb(223, 145, 0)" : "" }}>Login </span>/
            <span style={{ color: !isLogin ? "rgb(223, 145, 0)" : "" }}> Opret</span>
          </div>
        </Wavy>
      </span>
      {isLogin ? (
        <form onSubmit={handleLogin} className={styles.authForm}>
          <label>
            <input
              type="email"
              placeholder="Email"
              value={userInput.email}
              onChange={(e) => setUserInput((prev) => ({ ...prev, email: e.target.value }))}
            />
          </label>
          <label>
            <input
              type="password"
              placeholder="Password"
              value={userInput.password}
              onChange={(e) => setUserInput((prev) => ({ ...prev, password: e.target.value }))}
            />
          </label>
          <button type="submit">Login</button>
          {resMsg && <p>{resMsg}</p>}
        </form>
      ) : (
        <form onSubmit={handleSignup} className={styles.authForm}>
          <label>
            <input
              type="text"
              placeholder="Name"
              value={userInput.name}
              onChange={(e) => setUserInput((prev) => ({ ...prev, name: e.target.value }))}
            />
          </label>
          <label>
            <input
              type="email"
              placeholder="Email"
              value={userInput.email}
              onChange={(e) => setUserInput((prev) => ({ ...prev, email: e.target.value }))}
            />
          </label>
          <label>
            <input
              type="password"
              placeholder="Password"
              value={userInput.password}
              onChange={(e) => setUserInput((prev) => ({ ...prev, password: e.target.value }))}
            />
          </label>
          <div className={styles.fileInput}>
            <span>Billede {"(ikke påkrævet)"}</span>
            <input
              type="file"
              onChange={(e) => setUserInput((prev) => ({ ...prev, file: e.target.files[0] }))}
            />
          </div>
          <button type="submit">Opret</button>
          {resMsg && <p>{resMsg}</p>}
        </form>
      )}
    </>
  );
}

export default AuthForm;
