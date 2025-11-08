// store/useAuthModalStore.ts
import { create } from "zustand";

export const useAuthModalStore = create((set, get) => ({
  isSignInOpen: true,
  isSignUpOpen: false,

  openSignIn: () => set({ isSignInOpen: true }),
  closeSignIn: () => set({ isSignInOpen: false }),

  openSignUp: () => set({ isSignUpOpen: true }),
  closeSignUp: () => set({ isSignUpOpen: false }),

  changeSign: () => {
    const { isSignInOpen, isSignUpOpen } = get();
    if (isSignInOpen) {
      set({ isSignInOpen: false, isSignUpOpen: true });
    } else if (isSignUpOpen) {
      set({ isSignInOpen: true, isSignUpOpen: false });
    }
  },

  closeAll: () => set({ isSignInOpen: false, isSignUpOpen: false }),
}));
