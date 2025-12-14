import { create } from "zustand";

export const useToastStore = create((set) => ({
  message: "",
  type: "info",
  visible: false,
  showToast: (message, type = "info", duration = 3000) => {
    set({ message, type, visible: true });

    setTimeout(() => {
      set({ visible: false });
    }, duration);
  },
  hideToast: () => set({ visible: false }),
}));
