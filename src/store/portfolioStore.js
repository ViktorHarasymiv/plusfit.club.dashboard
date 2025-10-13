import { create } from "zustand";
import { DELETE_PHOTO, GET_PORTFOLIO } from "../services/portfolio";

export const usePortfolioStore = create((set) => ({
  portfolio: [],
  loading: false,
  error: null,

  fetchPortfolio: async () => {
    set({ loading: true, error: null });

    try {
      const data = await GET_PORTFOLIO();
      set({ portfolio: data.result.data, loading: false });
    } catch (error) {
      const portfolio =
        error?.response?.data?.portfolio || "Помилка завантаження портфоліо";
      set({ error: portfolio, loading: false });
    }
  },
  setPage: (page) => set({ page }),

  deletePhoto: async (photoId, filename) => {
    set({ loading: true, error: null });
    try {
      const res = await DELETE_PHOTO(photoId, filename);
      set({ data: res.data.result.data, loading: false });
    } catch (error) {
      error?.response?.data?.portfolio || "Помилка усунені фото";
      set({ error: "Помилка при видалені", loading: false });
    }
  },
}));
