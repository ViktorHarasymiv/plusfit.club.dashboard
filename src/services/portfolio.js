import axios from "axios";
import { API_URL } from "../config/api";

// GET

export const GET_PORTFOLIO = async () => {
  try {
    const response = await axios.get(`${API_URL}/portfolio`);

    console.log("✅ Портфоліо:", response.data.result.data);
    return response.data;
  } catch (error) {
    const portfolio =
      error.response?.data?.message || "Не вдалося отримати портфоліо";
    console.error("❌ Помилка:", portfolio);
    throw new Error(portfolio);
  }
};

//

export const ADD_PHOTO = async (data) => {
  try {
    const response = await axios.post(`${API_URL}/portfolio`, data);

    console.log("Успішно додано фото:", response.data);
    return response.data;
  } catch (error) {
    console.log(error);

    throw new Error("Помился збереження фото");
  }
};

// DELETE

export const DELETE_PHOTO = async (photoId, filename) => {
  try {
    const response = await axios.delete(`${API_URL}/portfolio/${photoId}`, {
      data: { filename },
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
