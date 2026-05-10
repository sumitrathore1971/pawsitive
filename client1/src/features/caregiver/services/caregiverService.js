import api from "@/services/api";

export const fetchCaregiverDashboard = () => api.get("/caregiver/dashboard");
