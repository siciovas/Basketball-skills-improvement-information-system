import './App.css'
import { Routes, Route, BrowserRouter } from 'react-router-dom'
import Login from './pages/Login'
import NewPassword from './pages/NewPassword'
import PasswordRecovery from './pages/PasswordRecovery'
import Register from './pages/Register'
import { Navbar } from './pages/Navbars/Navbar'

function App() {
  return (
    <>
      <Navbar/>
      <BrowserRouter>
        <Routes>
          <Route path="login" element={<Login />} />
          <Route path="recover" element={<PasswordRecovery />} />
          <Route path="newPassword" element={<NewPassword />} />
          <Route path="register" element={<Register />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App
