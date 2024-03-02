import "./App.css";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Login from "./pages/Login";
import NewPassword from "./pages/NewPassword";
import PasswordRecovery from "./pages/PasswordRecovery";
import Register from "./pages/Register";
import { Navbar } from "./components/Navbars/Navbar";
import toast, { Toaster } from "react-hot-toast";
import Footer from "./components/Footer";
import MainCoachesList from "./pages/coaches/MainCoachesList";
import CoachDetails from "./pages/coaches/details/CoachDetails";
import { useCallback, useEffect } from "react";
import { Unauthorized } from "./Helpers/constants";
import eventBus from "./Helpers/eventBus";

function App() {
  const logOut = useCallback((data: string) => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("role");
    window.location.assign("/");
    if (data === Unauthorized) {
      toast.error("Baigėsi sesijos laikas. Prisijunkite");
    }
  }, []);

  useEffect(() => {
    eventBus.on("logOut", (data: string) => {
      logOut(data);
    });

    return () => {
      eventBus.remove("logOut", (data: string) => {
        logOut(data);
      });
    };
  }, [logOut]);

  return (
    <>
      <Toaster />
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="login" element={<Login />} />
          <Route path="recover" element={<PasswordRecovery />} />
          <Route path="newPassword" element={<NewPassword />} />
          <Route path="register" element={<Register />} />
          <Route path="allCoaches" element={<MainCoachesList />} />
          <Route path="coachDetails/:id" element={<CoachDetails />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
