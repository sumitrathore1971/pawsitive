import api from "@/services/api";

export const loginRequest = (payload) => api.post("/auth/login", payload);
export const signupRequest = (payload) => api.post("/auth/signup", payload);
