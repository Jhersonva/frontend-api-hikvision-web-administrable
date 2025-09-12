import axios from "axios";

const API_URL = "http://127.0.0.1:8000/api/admin";

export const login = async (credentials) => {
  const { data } = await axios.post(`${API_URL}/login`, credentials);
  return data;
};

export const register = async (userData) => {
  const { data } = await axios.post(`${API_URL}/register`, userData);
  return data;
};