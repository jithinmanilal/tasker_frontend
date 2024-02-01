import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useContext, useEffect } from "react";
import { jwtDecode } from 'jwt-decode';
import Home from "./pages/Home";
import Login from "./pages/Login";
import OtpLogin from "./pages/OtpLogin";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import { getUserDetails } from "./features/user";
import { UserContext } from "./context/UserContext";
import Update from "./pages/Update";

function App() {
  const userContext = useContext(UserContext)

  useEffect(() => {
    const verifyAccessToken = async () => {
      try {
        const now = Math.round(new Date().getTime() / 1000);
        const access_token = localStorage.getItem("access_token");
  
        if (access_token) {
          const decoded_token = jwtDecode(access_token);
          const is_valid = decoded_token && now < decoded_token.exp;
  
          if (is_valid) {
            await getUserDetails(userContext);
          }
        }
      } catch (error) {
        console.error("Error verifying access token:", error);
      }
    };
  
    verifyAccessToken();
  }, []);
  

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/otp-login" element={<OtpLogin />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/update/:taskId" element={<Update />} />
      </Routes>
    </Router>
  );
}

export default App;