import api from "@/services/api";

export const fetchAdminDashboard = () => api.get("/admin/dashboard");
