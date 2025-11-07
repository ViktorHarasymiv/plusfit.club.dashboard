// store/useMenuStore.ts
import { create } from "zustand";

export const useMenuStore = create((set) => ({
  isPinned: false,
  isHover: false,
  togglePinned: () => set((state) => ({ isPinned: !state.isPinned })),
  setPinned: (value) => set({ isPinned: value }),
  setIsHover: (value) => set({ isHover: value }),
}));
