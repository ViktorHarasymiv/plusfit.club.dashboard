import axios from "axios";
import { API_URL } from "../config/api";

// GET

export const GET_MESSAGE = async () => {
  try {
    const response = await axios.get(`${API_URL}/message`, {});

    console.log("✅ Повідомлення:", response.data.result.data);
    return response.data;
  } catch (error) {
    const message =
      error.response?.data?.message || "Не вдалося отримати повідомлення";
    console.error("❌ Помилка:", message);
    throw new Error(message);
  }
};

// DELETE

export const DELETE_MESSAGE = async ({ messageId }) => {
  try {
    const response = await axios.delete(`${API_URL}/message/${messageId}`);
    return response.data;
  } catch (error) {
    const message =
      error.response?.data?.message || "Не вдалося усунути повідомлення";
    console.error("❌ Помилка:", message);
    throw new Error(message);
  }
};

// PATCH

export const PATCH_MESSAGE = async ({ messageId }, data) => {
  try {
    const response = await axios.patch(`${API_URL}/message/${messageId}`, data);

    return response.data;
  } catch (error) {
    const message =
      error.response?.data?.message || "Не вдалося оновити повідомлення";
    console.error("❌ Помилка:", message);
    throw new Error(message);
  }
};
