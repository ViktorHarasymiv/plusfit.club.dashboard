import { create } from "zustand";
import {
  DELETE_MESSAGE,
  GET_MESSAGE,
  PATCH_MESSAGE,
} from "../services/message.js";

export const useMessageStore = create((set, get) => ({
  messages: [],
  loading: false,
  error: null,

  fetchMessages: async () => {
    set({ loading: true, error: null });

    try {
      const data = await GET_MESSAGE();
      set({ messages: data.result.data, loading: false });
    } catch (error) {
      const message =
        error?.response?.data?.message || "Помилка завантаження повідомлень";
      set({ error: message, loading: false });
    }
  },

  patchMessage: async (messageId, updateData) => {
    try {
      const updated = await PATCH_MESSAGE({ messageId }, updateData);

      const updatedMessages = get().messages.map((msg) =>
        msg._id === messageId ? { ...msg, ...updated.result } : msg
      );

      set({ messages: updatedMessages });
    } catch (error) {
      const message =
        error?.response?.data?.message || "Не вдалося оновити повідомлення";
      set({ error: message });
    }
  },

  deleteMessage: async (messageId) => {
    try {
      await DELETE_MESSAGE({ messageId });

      const filteredMessages = get().messages.filter(
        (msg) => msg._id !== messageId
      );
      set({ messages: filteredMessages });
    } catch (error) {
      const message =
        error?.response?.data?.message || "Не вдалося видалити повідомлення";
      set({ error: message });
    }
  },

  setPage: (page) => set({ page }),
}));
