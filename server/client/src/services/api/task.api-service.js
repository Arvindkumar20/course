import { API } from "./axios";

export const createTaskAPI = async (data) => API.post("/task", data);
export const updateTaskAPI = async (data, id) => API.put(`/task/${id}`, data);
export const loadAllTaskAPI = async () => API.get(`/task`);
export const deleteTaskAPI = async (id) => API.delete(`/task/${id}`);
