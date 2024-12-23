import { create } from "zustand";

export const useUIStore = create((set) => ({
    isSidebar: false,
    setIsSidebar: (isSidebar) => set({ isSidebar }),
    isLoader: false,
    setIsLoader: (isLoader) => set({ isLoader }),
    theme: true,
    setTheme: (theme) => set({ theme }),
}));
