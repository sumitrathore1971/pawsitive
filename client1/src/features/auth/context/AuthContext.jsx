import { createContext, useContext, useEffect, useMemo, useState } from "react";
import api, { setAuthToken } from "@/services/api";

const AuthContext = createContext(null);

const normalizeRole = (role) => {
  const value = String(role || "").trim().replace(/\s+/g, "");
  const lower = value.toLowerCase();
  if (lower === "petowner") return "PetOwner";
  if (lower === "caregiver") return "Caregiver";
  if (lower === "admin") return "Admin";
  return value;
};

const normalizeUser = (user) => {
  if (!user) return null;
  if (user.id) return user;
  if (user._id) return { ...user, id: user._id };
  return user;
};

const roleToPath = (role) => {
  switch (normalizeRole(role)) {
    case "PetOwner":
      return "/owner/dashboard";
    case "Caregiver":
      return "/caregiver/dashboard";
    case "Admin":
      return "/admin/dashboard";
    default:
      return "/login";
  }
};

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem("jwt") || null);
  const [user, setUser] = useState(() => {
    try {
      const cached = localStorage.getItem("user");
      return cached ? JSON.parse(cached) : null;
    } catch {
      localStorage.removeItem("user");
      return null;
    }
  });
  const [loading, setLoading] = useState(true);
  const [flashMessage, setFlashMessage] = useState(null);

  useEffect(() => {
    setAuthToken(token);
  }, [token]);

  useEffect(() => {
    async function bootstrap() {
      try {
        if (!token) return;
        const { data } = await api.get("/auth/me");
        const next = normalizeUser(data.user);
        setUser(next);
        localStorage.setItem("user", JSON.stringify(next));
      } catch {
        setToken(null);
        localStorage.removeItem("jwt");
        localStorage.removeItem("user");
      } finally {
        setLoading(false);
      }
    }
    if (token) bootstrap();
    else {
      localStorage.removeItem("user");
      setUser(null);
      setLoading(false);
    }
  }, [token]);

  const showFlashMessage = (message, type = "success") => {
    setFlashMessage({ message, type });
    window.setTimeout(() => setFlashMessage(null), 5000);
  };

  const login = async ({ email, password }) => {
    try {
      const { data } = await api.post("/auth/login", {
        email: String(email || "").trim().toLowerCase(),
        password,
      });
      const nextUser = normalizeUser(data.user);
      localStorage.setItem("jwt", data.token);
      localStorage.setItem("user", JSON.stringify(nextUser));
      setToken(data.token);
      setUser(nextUser);
      showFlashMessage(`Welcome back, ${nextUser.name}!`, "success");
      return roleToPath(nextUser.role);
    } catch (error) {
      const message =
        error?.response?.data?.message ||
        "Unable to login right now. Please try again.";
      showFlashMessage(message, "error");
      throw error;
    }
  };

  const signup = async (payload) => {
    try {
      const { data } = await api.post("/auth/signup", {
        ...payload,
        email: String(payload?.email || "").trim().toLowerCase(),
      });
      const nextUser = normalizeUser(data.user);
      localStorage.setItem("jwt", data.token);
      localStorage.setItem("user", JSON.stringify(nextUser));
      setToken(data.token);
      setUser(nextUser);
      showFlashMessage(`Welcome, ${nextUser.name}!`, "success");
      return roleToPath(nextUser.role);
    } catch (error) {
      const message =
        error?.response?.data?.message ||
        "Unable to signup right now. Please try again.";
      showFlashMessage(message, "error");
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem("jwt");
    localStorage.removeItem("user");
    setToken(null);
    setUser(null);
    showFlashMessage("Logged out successfully.", "success");
  };

  const value = useMemo(
    () => ({
      user,
      token,
      loading,
      login,
      signup,
      logout,
      isAuthenticated: !!token,
      flashMessage,
      showFlashMessage,
      setUser,
    }),
    [user, token, loading, flashMessage]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuthContext() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuthContext must be used within AuthProvider");
  return context;
}
