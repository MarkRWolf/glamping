import { create } from "zustand";
import { persist } from "zustand/middleware";

const useSettingStore = create(
  persist(
    (set) => (
      /* set isMobile Bool below / above 1024px */
      typeof window !== "undefined" &&
        (window.addEventListener("resize", () => set({ isMobile: window.innerWidth <= 1024 })),
        set({ isMobile: window.innerWidth <= 1024 })),
      {
        isMobile: false,
        setIsMobile: (isMobile) => set({ isMobile }),
      }
    ),
    { name: "lang-store" }
  )
);

export default useSettingStore;
