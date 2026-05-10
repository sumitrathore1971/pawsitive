import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import Footer from "@/pages/Footer";
import LandingPage from "@/pages/LandingPage/LandingPage";
import LoginPage from "@/pages/Auth/LoginPage";
import SignupPage from "@/pages/Auth/SignupPage";
import RoleProtectedRoute from "@/components/RoleProtectedRoute";
import OwnerDashboard from "@/features/owner/pages/OwnerDashboard";
import AddPet from "@/features/owner/pages/AddPet";
import Services from "@/features/owner/pages/Services";
import Tracking from "@/features/owner/pages/Tracking";
import MyPets from "@/features/owner/pages/MyPets";
import BookingHistory from "@/features/owner/pages/BookingHistory";
import OwnerNotifications from "@/features/owner/pages/OwnerNotifications";
import OwnerSettings from "@/features/owner/pages/OwnerSettings";
import CaregiverDashboard from "@/features/caregiver/pages/CaregiverDashboard";
import Jobs from "@/features/caregiver/pages/Jobs";
import Earnings from "@/features/caregiver/pages/Earnings";
import VerificationPending from "@/features/caregiver/pages/VerificationPending";
import AdminDashboard from "@/features/admin/pages/AdminDashboard";
import VerifyCaregivers from "@/features/admin/pages/VerifyCaregivers";
import UserManagement from "@/features/admin/pages/UserManagement";

export default function AppRoutes() {
  const location = useLocation();
  const isLanding = location.pathname === "/";

  return (
    <>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />

        <Route
          path="/owner/dashboard"
          element={
            <RoleProtectedRoute requiredRole="PetOwner">
              <OwnerDashboard />
            </RoleProtectedRoute>
          }
        />
        <Route
          path="/owner/add-pet"
          element={
            <RoleProtectedRoute requiredRole="PetOwner">
              <AddPet />
            </RoleProtectedRoute>
          }
        />
        <Route
          path="/owner/book"
          element={
            <RoleProtectedRoute requiredRole="PetOwner">
              <Services />
            </RoleProtectedRoute>
          }
        />
        <Route
          path="/owner/services"
          element={
            <RoleProtectedRoute requiredRole="PetOwner">
              <Services />
            </RoleProtectedRoute>
          }
        />
        <Route
          path="/owner/pets"
          element={
            <RoleProtectedRoute requiredRole="PetOwner">
              <MyPets />
            </RoleProtectedRoute>
          }
        />
        <Route
          path="/owner/bookings"
          element={
            <RoleProtectedRoute requiredRole="PetOwner">
              <BookingHistory />
            </RoleProtectedRoute>
          }
        />
        <Route
          path="/owner/tracking/:bookingId"
          element={
            <RoleProtectedRoute requiredRole="PetOwner">
              <Tracking />
            </RoleProtectedRoute>
          }
        />
        <Route
          path="/owner/tracking"
          element={
            <RoleProtectedRoute requiredRole="PetOwner">
              <Tracking />
            </RoleProtectedRoute>
          }
        />
        <Route
          path="/owner/notifications"
          element={
            <RoleProtectedRoute requiredRole="PetOwner">
              <OwnerNotifications />
            </RoleProtectedRoute>
          }
        />
        <Route
          path="/owner/settings"
          element={
            <RoleProtectedRoute requiredRole="PetOwner">
              <OwnerSettings />
            </RoleProtectedRoute>
          }
        />

        <Route
          path="/caregiver/dashboard"
          element={
            <RoleProtectedRoute requiredRole="Caregiver">
              <CaregiverDashboard />
            </RoleProtectedRoute>
          }
        />
        <Route path="/caregiver/verification" element={<VerificationPending />} />
        <Route
          path="/caregiver/jobs"
          element={
            <RoleProtectedRoute requiredRole="Caregiver">
              <Jobs />
            </RoleProtectedRoute>
          }
        />
        <Route
          path="/caregiver/active-services"
          element={
            <RoleProtectedRoute requiredRole="Caregiver">
              <CaregiverDashboard />
            </RoleProtectedRoute>
          }
        />
        <Route
          path="/caregiver/earnings"
          element={
            <RoleProtectedRoute requiredRole="Caregiver">
              <Earnings />
            </RoleProtectedRoute>
          }
        />
        <Route
          path="/caregiver/history"
          element={
            <RoleProtectedRoute requiredRole="Caregiver">
              <Jobs />
            </RoleProtectedRoute>
          }
        />
        <Route
          path="/caregiver/notifications"
          element={
            <RoleProtectedRoute requiredRole="Caregiver">
              <CaregiverDashboard />
            </RoleProtectedRoute>
          }
        />
        <Route
          path="/caregiver/settings"
          element={
            <RoleProtectedRoute requiredRole="Caregiver">
              <CaregiverDashboard />
            </RoleProtectedRoute>
          }
        />

        <Route
          path="/admin/dashboard"
          element={
            <RoleProtectedRoute requiredRole="Admin">
              <AdminDashboard />
            </RoleProtectedRoute>
          }
        />
        <Route
          path="/admin/verify-caregivers"
          element={
            <RoleProtectedRoute requiredRole="Admin">
              <VerifyCaregivers />
            </RoleProtectedRoute>
          }
        />
        <Route
          path="/admin/users"
          element={
            <RoleProtectedRoute requiredRole="Admin">
              <UserManagement />
            </RoleProtectedRoute>
          }
        />
        <Route path="/admin/pet-owners" element={<RoleProtectedRoute requiredRole="Admin"><UserManagement /></RoleProtectedRoute>} />
        <Route path="/admin/pets" element={<RoleProtectedRoute requiredRole="Admin"><AdminDashboard /></RoleProtectedRoute>} />
        <Route path="/admin/bookings" element={<RoleProtectedRoute requiredRole="Admin"><AdminDashboard /></RoleProtectedRoute>} />
        <Route path="/admin/analytics" element={<RoleProtectedRoute requiredRole="Admin"><AdminDashboard /></RoleProtectedRoute>} />
        <Route path="/admin/notifications" element={<RoleProtectedRoute requiredRole="Admin"><AdminDashboard /></RoleProtectedRoute>} />
        <Route path="/admin/settings" element={<RoleProtectedRoute requiredRole="Admin"><AdminDashboard /></RoleProtectedRoute>} />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      {isLanding && <Footer />}
    </>
  );
}
