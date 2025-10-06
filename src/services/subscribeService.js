import axios from "axios";

import { API_URL } from "../config/api";

export const GET_SUBSCRIPTIONS = async (page, perPage) => {
  try {
    const response = await axios.get(`${API_URL}/subscriptions`, {
      params: { page, perPage },
    });

    console.log("✅ Абонементи:", response.data.result.data);
    return response.data;
  } catch (error) {
    const message =
      error.response?.data?.message || "Не вдалося отримати абонементи";
    console.error("❌ Помилка:", message);
    throw new Error(message);
  }
};

export const DELETE_SUBSCRIPTIONS = async (id) => {
  try {
    const confirmed = window.confirm(
      "Ви впевнені, що хочете усунути підписника?"
    );
    if (!confirmed) {
      console.log("Усунення скасовано користувачем.");
      return null;
    }

    const response = await axios.delete(`${API_URL}/subscriptions/${id}`);

    console.log("Видалено:", id);
    return response.data;
  } catch (error) {
    const message =
      error.response?.data?.message || "Не вдалося отримати абонементи";
    console.error(" Помилка:", message);
    throw new Error(message);
  }
};

export const CREATE_SUBSCRIPTER = async (data) => {
  try {
    const response = await axios.post(`${API_URL}/subscriptions`, data);

    console.log("Успішно створено:", response.data);
    return response.data;
  } catch (error) {
    console.log(error);

    throw new Error("Під цими даними вже зареєстровано абонемент");
  }
};

export const EDIT_SUBSCRIPTIONS = async (id, data) => {
  try {
    const response = await axios.put(`${API_URL}/subscriptions/${id}`, data);

    console.log("Змінено:", id);
    return response.data;
  } catch (error) {
    console.error("Помилка:", error.response?.data || error.message);
  }
};
