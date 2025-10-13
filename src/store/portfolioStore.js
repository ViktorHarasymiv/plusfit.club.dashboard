import { create } from "zustand";
import { GET_PORTFOLIO } from "../services/portfolio";

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

  //   deleteMessage: async (messageId) => {
  //     try {
  //       await DELETE_MESSAGE({ messageId });

  //       const filteredMessages = get().messages.filter(
  //         (msg) => msg._id !== messageId
  //       );
  //       set({ messages: filteredMessages });
  //     } catch (error) {
  //       const message =
  //         error?.response?.data?.message || "Не вдалося видалити повідомлення";
  //       set({ error: message });
  //     }
  //   },

  setPage: (page) => set({ page }),
}));
