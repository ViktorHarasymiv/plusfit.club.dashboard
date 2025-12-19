import axios from "axios";
import { API_URL } from "../config/api";

export const CREATE_POST = async (data) => {
  try {
    const response = await axios.post(`${API_URL}/posts`, data);

    console.log("Успішно створено:", response.data);
    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error("Під цими даними вже зареєстровано абонемент");
  }
};
