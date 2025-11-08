import { create } from "zustand";

import { GET_SUBSCRIPTIONS_COUNT } from "../services/subscribeService.js";

export const useCountStore = create((set) => ({
  data: null,
  loading: false,
  error: null,

  fetchSubscCount: async (filter) => {
    set({ loading: true, error: null });

    try {
      const count = await GET_SUBSCRIPTIONS_COUNT(filter);
      set({ data: count, loading: false });
    } catch (error) {
      const count = error?.response?.data?.message || "Помилка завантаження";
      set({ error: count, loading: false });
    }
  },
}));
