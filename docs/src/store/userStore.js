import { create } from "zustand";
import { persist } from "zustand/middleware";

const useUserStore = create(
  persist(
    (set) => ({
      user: {},
      loggedIn: false,
      token: "",
      setUser: (user) => set({ user }),
      setLoggedIn: (loggedIn) => set({ loggedIn }),
      setToken: (token) => set({ token }),
    }),
    { name: "auth-store" }
  )
);

export default useUserStore;
