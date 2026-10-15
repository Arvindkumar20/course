import { API } from "./axios";

export const registerAPI = async (data) =>  API.post("/auth/sign-up", data);
export const loginAPI = async (data) =>  API.post("/auth/login", data);
