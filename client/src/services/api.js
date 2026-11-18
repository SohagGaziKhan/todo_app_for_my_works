import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: { "Content-Type": "application/json" },
});

// All todo-related API calls live here so components never call axios directly
export const todoApi = {
  getAll: (params) => api.get("/todos", { params }),
  getById: (id) => api.get(`/todos/${id}`),
  create: (data) => api.post("/todos", data),
  update: (id, data) => api.put(`/todos/${id}`, data),
  delete: (id) => api.delete(`/todos/${id}`),
};

export default api;
