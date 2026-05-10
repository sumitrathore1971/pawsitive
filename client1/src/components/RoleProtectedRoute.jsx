import React, { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import api from "@/services/api";

const ROLE_TO_PATH = {
  PetOwner: "/owner/dashboard",
  Caregiver: "/caregiver/dashboard",
  Admin: "/admin/dashboard",
};

export default function RoleProtectedRoute({ requiredRole, children }) {
  const { user, loading, isAuthenticated } = useAuth();
  const location = useLocation();
  const [accessState, setAccessState] = useState({
    checking: true,
    shouldAddPet: false,
  });

  useEffect(() => {
    let ignore = false;

    async function checkPetGate() {
      const role = normalizeRole(user?.role);
      if (role !== "PetOwner") {
        if (!ignore) setAccessState({ checking: false, shouldAddPet: false });
        return;
      }

      if (location.pathname === "/owner/add-pet") {
        if (!ignore) setAccessState({ checking: false, shouldAddPet: false });
        return;
      }

      try {
        const { data } = await api.get("/pets/mine");
        const shouldAddPet = !Array.isArray(data?.pets) || data.pets.length === 0;
        if (!ignore) setAccessState({ checking: false, shouldAddPet });
      } catch {
        if (!ignore) setAccessState({ checking: false, shouldAddPet: false });
      }
    }

    if (!loading && isAuthenticated) checkPetGate();
    else setAccessState({ checking: false, shouldAddPet: false });

    return () => {
      ignore = true;
    };
  }, [loading, isAuthenticated, user?.role, location.pathname]);

  if (loading || accessState.checking) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-600 dark:text-gray-300 bg-slate-50 dark:bg-slate-950">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-orange-200 border-t-orange-500" />
      </div>
    );
  }

  if (!isAuthenticated) return <Navigate to="/login" replace />;

  const actualRole = normalizeRole(user?.role);
  const expectedRole = normalizeRole(requiredRole);

  if (actualRole !== expectedRole) {
    return <Navigate to={ROLE_TO_PATH[actualRole] || "/login"} replace />;
  }

  if (actualRole === "Caregiver" && user && !user.isVerified) {
    return <Navigate to="/caregiver/verification" replace />;
  }

  if (actualRole === "PetOwner" && accessState.shouldAddPet) {
    return <Navigate to="/owner/add-pet" replace />;
  }

  return children;
}

function normalizeRole(role) {
  const value = String(role || "").trim();
  if (!value) return value;

  const compact = value.replace(/\s+/g, "");
  const lower = compact.toLowerCase();

  if (lower === "petowner") return "PetOwner";
  if (lower === "caregiver") return "Caregiver";
  if (lower === "admin") return "Admin";
  return compact;
}

