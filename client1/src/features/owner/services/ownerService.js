import api from "@/services/api";

export const fetchMyPets = () => api.get("/pets/mine");
export const createPet = (payload) => api.post("/pets", payload);

export const fetchVerifiedCaregivers = () => api.get("/caregivers/verified");

export const fetchMyBookings = () => api.get("/bookings/mine");
export const createBooking = (payload) => api.post("/bookings", payload);
