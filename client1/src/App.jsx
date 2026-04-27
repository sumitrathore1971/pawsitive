import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import LandingPage from "./pages/LandingPage/LandingPage";
import Footer from "./pages/Footer";
import LoginPage from "./pages/Auth/LoginPage";
import SignupPage from "./pages/Auth/SignupPage";

function App() {
  const location = useLocation();
  const isLanding = location.pathname === "/";
  return (
    <>
      <div>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
      {isLanding && <Footer />}
    </>
  );
}

export default App;
