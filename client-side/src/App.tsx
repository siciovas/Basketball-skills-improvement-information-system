import "./App.css";
import { Routes, Route, useNavigate } from "react-router-dom";
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
import CoachesList from "./pages/CoachesList";
import ManageCoach from "./pages/coaches/details/ManageCoach";
import Complaint from "./pages/Complaint";
import Checkout from "./pages/Checkout";
import AboutUs from "./pages/AboutUs";
import Profile from "./pages/profile/Profile";
import EditProfile from "./pages/profile/EditProfile";
import PayseraSuccessfulPayment from "./pages/PayseraSuccessfulPayment";
import HomePage from "./pages/HomePage";
import TrainingPlan from "./pages/TrainingPlan";
import AllOrders from "./pages/AllOrders";
import MyOrders from "./pages/MyOrders";
import Exercises from "./pages/Exercises";
import Skills from "./pages/Skills";

function App() {
  const navigate = useNavigate();
  const logOut = useCallback((data: string) => {
    if (data === Unauthorized) {
      toast.error("Baigėsi sesijos laikas. Prisijunkite");
    }
    localStorage.removeItem("accessToken");
    localStorage.removeItem("role");
    navigate("/login");
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
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="login" element={<Login />} />
        <Route path="recover" element={<PasswordRecovery />} />
        <Route path="newPassword" element={<NewPassword />} />
        <Route path="register" element={<Register />} />
        <Route path="aboutUs" element={<AboutUs />} />
        <Route path="allCoaches" element={<MainCoachesList />} />
        <Route path="coachDetails/:id" element={<CoachDetails />} />
        <Route path="manageCoaches" element={<CoachesList />} />
        <Route path="manageCoach/:id" element={<ManageCoach />} />
        <Route path="complaint/:id" element={<Complaint />} />
        <Route path="checkout/:id" element={<Checkout />} />
        <Route path="profile" element={<Profile />} />
        <Route path="editProfile" element={<EditProfile />} />
        <Route path="trainingPlan/:id" element={<TrainingPlan />} />
        <Route
          path="successfulPayment"
          element={<PayseraSuccessfulPayment />}
        />
        <Route path="allOrders" element={<AllOrders />} />
        <Route path="myOrders" element={<MyOrders />} />
        <Route path="exercises" element={<Exercises />} />
        <Route path="skills" element={<Skills />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
