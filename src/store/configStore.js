import axios from "axios";
import { create } from "zustand";
import { API_URL } from "../config/api";

export const useConfigStore = create((set) => ({
  emotions: [],
  interests: [],
  categories: [],

  fetchEmotions: async () => {
    const res = await axios.get(`${API_URL}/emotions`);
    set({ emotions: res.data.data });
  },

  fetchInterests: async () => {
    const res = await axios.get(`${API_URL}/interests`);
    set({ interests: res.data.data });
  },

  fetchCategory: async () => {
    const res = await axios.get(`${API_URL}/categories`);
    set({ categories: res.data.data });
  },
}));
