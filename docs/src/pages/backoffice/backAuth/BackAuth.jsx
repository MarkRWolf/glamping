import { useState } from "react";
import styles from "./backAuth.module.css";

const initUser = {
  email: "",
  password: "",
};

function BackAuth() {
  const [userInput, setUserInput] = useState(initUser);
  const [resMsg, setResMsg] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    const { email, password } = userInput;

    try {
      const res = await fetch("https://glamping.onrender.com/api/auth/adminSignIn", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
        credentials: "include",
      });
      const data = await res.json();
      setResMsg(data.message);
      if (res.ok) {
        // reload to run auth component again
        window.location.reload();
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleLogin} className={styles.form}>
      <input
        type="email"
        placeholder="Email"
        value={userInput.email}
        onChange={(e) => setUserInput({ ...userInput, email: e.target.value })}
      />
      <input
        type="password"
        placeholder="Password"
        value={userInput.password}
        onChange={(e) => setUserInput({ ...userInput, password: e.target.value })}
      />
      <button type="submit">Submit</button>
      {resMsg && <p>{resMsg}</p>}
    </form>
  );
}

export default BackAuth;
