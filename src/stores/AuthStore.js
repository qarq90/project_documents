import { create } from "zustand";

export const useAuthStore = create((set) => ({
    userStore: null,
    providers: null,
    setUserStore: (userStore) => set({ userStore }),
    setProviders: (providers) => set({ providers }),
}));
