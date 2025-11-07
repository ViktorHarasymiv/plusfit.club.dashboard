import axios from "axios";
import { API_URL } from "../config/api";

// CHECK SESSION

export const checkSession = async () => {
  try {
    const res = await axios.get(`${API_URL}/auth/admin/session`, {
      withCredentials: true,
    });
    return res.data.success;
  } catch (err) {
    if (err.response?.status === 401) {
      return false;
    }
    throw err;
  }
};

// LOGIN

export const login = async (data) => {
  const res = await axios.post(`${API_URL}/auth/admin/login`, data, {
    withCredentials: true,
  });
  return res.data;
};

// RERFRESH SEEEION

export const refreshSession = async () => {
  const res = await axios.post(
    `${API_URL}/auth/refresh`,
    {},
    {
      withCredentials: true,
    }
  );

  return res.data;
};

// AUTH ME

export const getMe = async () => {
  const { data } = await axios.get(`${API_URL}/users/admin/me`, {
    withCredentials: true,
  });

  return data;
};

// LOGOUT

export const logout = async () => {
  await axios.post(`${API_URL}/auth/logout`, {}, { withCredentials: true });
};
