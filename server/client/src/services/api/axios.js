import axios from "axios";

const userData = JSON.parse(localStorage.getItem("userData"));
export const API = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    Authorization: `Bearer ${userData.token}`,
  },
});
