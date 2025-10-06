import { API_URL } from "../config/api";

export const checkSession = async () => {
  const response = await fetch(`${API_URL}/auth/check-session`, {
    method: "GET",
    credentials: "include",
  });

  if (!response.ok) throw new Error("Session check failed");
  return await response.json();
};

export const loginRequest = async (email, password) => {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
    credentials: "include",
  });

  const result = await response.json();
  if (!response.ok) throw new Error(result.message);
  return result;
};

export const logoutRequest = async () => {
  await fetch(`${API_URL}/auth/logout`, {
    method: "POST",
    credentials: "include",
  });
};
