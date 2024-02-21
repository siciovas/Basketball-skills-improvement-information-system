import "./App.css";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Login from "./pages/Login";
import NewPassword from "./pages/NewPassword";
import PasswordRecovery from "./pages/PasswordRecovery";
import Register from "./pages/Register";
import { Navbar } from "./components/Navbars/Navbar";
import { Toaster } from "react-hot-toast";
import Footer from "./components/Footer";

function App() {
  return (
    <>
      <Toaster />
      <Navbar />
      <BrowserRouter>
        <Routes>
          <Route path="login" element={<Login />} />
          <Route path="recover" element={<PasswordRecovery />} />
          <Route path="newPassword" element={<NewPassword />} />
          <Route path="register" element={<Register />} />
        </Routes>
      </BrowserRouter>
      <Footer />
    </>
  );
}

export default App;
