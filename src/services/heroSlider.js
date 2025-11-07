import axios from "axios";
import { API_URL } from "../config/api";

// GET

export const GET_SLIDE = async () => {
  try {
    const response = await axios.get(`${API_URL}/hero`);

    console.log("✅ Слайдер:", response.data.result.data);
    return response.data;
  } catch (error) {
    const portfolio =
      error.response?.data?.message || "Не вдалося отримати слайдер";
    console.error("❌ Помилка:", portfolio);
    throw new Error(portfolio);
  }
};

// CREATE

export const CREATE_SLIDE = async (data) => {
  try {
    const response = await axios.post(`${API_URL}/hero`, data);

    console.log("Успішно додано слайд:", response.data);
    return response.data;
  } catch (error) {
    console.log(error);

    throw new Error("Помился збереження фото");
  }
};

// DELETE

export const DELETE_SLIDE = async (slideId) => {
  try {
    const response = await axios.delete(`${API_URL}/hero/${slideId}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    const photo = error.response?.data?.message || "Не вдалося усунути фото";
    console.error("❌ Помилка:", photo);
    throw new Error(photo);
  }
};
