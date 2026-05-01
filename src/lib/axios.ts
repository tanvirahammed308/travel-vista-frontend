import axios from "axios";

const api = axios.create({
  baseURL: "https://tripvista-gold.vercel.app",
   withCredentials: true,
});

export default api;
