import React from "react";
import "./App.css";
import { Box } from "@chakra-ui/react";
import Login from "./pages/Login";
import PasswordRecovery from "./pages/PasswordRecovery";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import NewPassword from "./pages/NewPassword";
import Register from "./pages/Register";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="login" element={<Login />} />
        <Route path="recover" element={<PasswordRecovery />} />
        <Route path="newPassword" element={<NewPassword />} />
        <Route path="register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
